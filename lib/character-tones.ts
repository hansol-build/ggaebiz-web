import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export type CharacterTone = {
  vibe: string;
  style: string;
  emojis: string;
};

const TONE_FILE_PATH = resolve(process.cwd(), "docs/character-tones.md");

const REQUIRED_MBTI = [
  "ENFP", "ENFJ", "ESFP", "ESFJ",
  "ESTJ", "ENTJ", "ISTJ",
  "ENTP", "INTJ", "INTP",
  "INFJ", "INFP", "ISFJ",
  "ESTP", "ISTP", "ISFP",
] as const;

const LABEL_TO_FIELD: Record<string, keyof CharacterTone> = {
  성격: "vibe",
  "번역 톤": "style",
  "자주 쓰는 이모지": "emojis",
};

const HEADING_MBTI_PATTERN = /\(([A-Z]{4})\)\s*$/;

function parseToneMarkdown(raw: string): Record<string, CharacterTone> {
  // ## 또는 ### 헤더 모두에서 (MBTI) 패턴을 가진 섹션을 카드로 인식
  const sections = raw.split(/^#{2,3}\s+/m).slice(1);
  const result: Record<string, CharacterTone> = {};

  for (const section of sections) {
    const newlineIndex = section.indexOf("\n");
    if (newlineIndex === -1) continue;
    const headerLine = section.slice(0, newlineIndex).trim();
    const body = section.slice(newlineIndex + 1);

    const match = headerLine.match(HEADING_MBTI_PATTERN);
    if (!match) continue;
    const mbti = match[1];

    const tone: Partial<CharacterTone> = {};
    const labelLineRegex = /^\*\*([^*]+)\*\*\s*:\s*(.+)$/gm;
    for (const lineMatch of body.matchAll(labelLineRegex)) {
      const field = LABEL_TO_FIELD[lineMatch[1].trim()];
      if (field) tone[field] = lineMatch[2].trim();
    }

    if (tone.vibe && tone.style && tone.emojis) {
      result[mbti] = tone as CharacterTone;
    }
  }

  return result;
}

export async function loadCharacterTones(): Promise<Record<string, CharacterTone>> {
  const raw = await readFile(TONE_FILE_PATH, "utf8");
  const tones = parseToneMarkdown(raw);

  const missing = REQUIRED_MBTI.filter((mbti) => !tones[mbti]);
  if (missing.length > 0) {
    throw new Error(
      `docs/character-tones.md에서 다음 MBTI 카드 톤을 찾을 수 없음: ${missing.join(", ")}. ` +
        `각 카드에 "성격", "번역 톤", "자주 쓰는 이모지" 세 항목이 모두 채워져 있는지, ` +
        `헤더가 "## 모드명 (MBTI)" 형식인지 확인해줘.`
    );
  }

  return tones;
}
