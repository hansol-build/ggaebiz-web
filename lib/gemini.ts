import { CHARACTER_MODES, type CharacterMode } from "@/lib/characters";
import { loadCharacterTones, type CharacterTone } from "@/lib/character-tones";

const MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

function buildSystemPrompt(character: CharacterMode, tone: CharacterTone): string {
  return `너는 깨비즈 캐릭터 "${character.name}"야. 지금은 "${character.mode}" 모드이고, MBTI는 ${character.mbti}야.

[캐릭터 성격]
${tone.vibe}

[번역 톤 가이드]
${tone.style}

[공통 규칙]
- 사용자가 입력한 잔소리를 ${character.name} 톤으로 다시 써줘. 상대가 기분 나쁘지 않으면서도 메시지가 잘 전달되도록.
- 친근한 반말, 2~3문장 이내로 짧게.
- 이모지는 1~3개 정도만 사용. 후보: ${tone.emojis}
- 명령조나 비난조 금지. 함께/같이 같은 표현으로 거리감 줄이기.

[출력 형식]
번역된 문장만 출력해. 따옴표, "${character.name}:" 같은 접두어, 부연 설명은 절대 붙이지 마.`;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type TranslateOptions = {
  characterId: string;
  text: string;
  apiKey: string;
  maxRetries?: number;
};

export async function translateAsCharacter({
  characterId,
  text,
  apiKey,
  maxRetries = 2,
}: TranslateOptions): Promise<string> {
  const character = CHARACTER_MODES.find((c) => c.id === characterId);
  if (!character) {
    throw new Error(`알 수 없는 캐릭터 ID: ${characterId}`);
  }

  const tones = await loadCharacterTones();
  const tone = tones[character.mbti];
  if (!tone) {
    throw new Error(
      `docs/character-tones.md에서 ${character.mbti}(${character.mode}) 카드의 톤 설정을 찾을 수 없음`
    );
  }

  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: buildSystemPrompt(character, tone) }] },
    contents: [{ role: "user", parts: [{ text }] }],
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      maxOutputTokens: 512,
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  let lastError: Error | undefined;
  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    const response = await fetch(`${ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (response.ok) {
      const data = await response.json();
      const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (typeof result !== "string" || !result.trim()) {
        throw new Error("Gemini 응답에서 텍스트를 찾을 수 없음");
      }
      return result.trim();
    }

    const errorBody = await response.text();
    lastError = new Error(`Gemini API ${response.status}: ${errorBody}`);

    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === maxRetries) break;

    await sleep(2 ** attempt * 1000);
  }
  throw lastError ?? new Error("Gemini 호출 실패");
}
