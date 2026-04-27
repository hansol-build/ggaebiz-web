// 키키(ENFP) 캐릭터 톤으로 잔소리를 번역해주는 Gemini 2.5 Flash 연동 테스트
// 실행: node scripts/test-gemini-kiki.mjs

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

function loadEnvLocal() {
  const envPath = resolve(ROOT, ".env.local");
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

const KIKI_SYSTEM_PROMPT = `너는 깨비즈 캐릭터 "키키"야. MBTI는 ENFP, 에너지 넘치고 감성적이며 공감 능력이 뛰어난 성격이야.

사용자가 누군가에게 하고 싶은 잔소리를 입력하면, 상대방이 기분 나쁘지 않으면서도 동기부여를 받을 수 있게 키키 톤으로 번역해줘.

[톤 가이드라인]
- 따뜻하고 긍정적인 말투, 친근한 반말
- 공감과 응원을 먼저 건넨 뒤 자연스럽게 행동을 유도
- 이모지 1~3개 정도 적절히 활용 (✨🎵💕🌿 등)
- 명령조나 비난조 금지, 함께 하자는 뉘앙스 살리기
- 2~3문장, 너무 길지 않게

[출력 형식]
번역된 문장만 출력해. 따옴표나 부연 설명, "키키:" 같은 접두어는 붙이지 마.`;

const TEST_INPUTS = [
  "방 좀 치워!",
  "공부 좀 해!",
  "연락 좀 자주 해!",
];

const MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function translateAsKiki(userText, apiKey, { maxRetries = 3 } = {}) {
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: KIKI_SYSTEM_PROMPT }] },
    contents: [{ role: "user", parts: [{ text: userText }] }],
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      maxOutputTokens: 512,
      // 잔소리 번역은 가벼운 작업이라 thinking 비활성화 (thinking 토큰이 출력 한도를 갉아먹는 문제 방지)
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    const response = await fetch(`${ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (response.ok) {
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error(`응답에서 텍스트를 찾을 수 없음: ${JSON.stringify(data)}`);
      }
      return text.trim();
    }

    const errorBody = await response.text();
    lastError = new Error(`Gemini API ${response.status}: ${errorBody}`);

    // 일시적 오류만 재시도 (429 rate limit, 5xx 서버 오류)
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === maxRetries) break;

    const backoff = 2 ** attempt * 1000; // 1s → 2s → 4s
    console.log(`   ⏳ ${response.status} 발생, ${backoff}ms 후 재시도 (${attempt + 1}/${maxRetries})`);
    await sleep(backoff);
  }
  throw lastError;
}

async function main() {
  loadEnvLocal();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ .env.local에서 GEMINI_API_KEY를 찾을 수 없어");
    process.exit(1);
  }

  console.log(`🌟 키키(ENFP) 톤 번역 테스트 — 모델: ${MODEL}\n`);

  let failed = 0;
  for (const input of TEST_INPUTS) {
    console.log(`👤 입력: ${input}`);
    try {
      const start = Date.now();
      const result = await translateAsKiki(input, apiKey);
      const ms = Date.now() - start;
      console.log(`✨ 키키: ${result}`);
      console.log(`   (${ms}ms)\n`);
    } catch (err) {
      failed += 1;
      console.error(`❌ 번역 실패: ${err.message}\n`);
    }
  }

  if (failed > 0) {
    console.error(`총 ${failed}건 실패`);
    process.exit(1);
  }
  console.log("✅ 모든 테스트 완료");
}

main().catch((err) => {
  console.error("예상치 못한 오류:", err);
  process.exit(1);
});
