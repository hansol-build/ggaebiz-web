import { NextResponse } from "next/server";

import { translateAsCharacter } from "@/lib/gemini";

export const runtime = "nodejs";

const MAX_INPUT_LENGTH = 500;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "요청 본문이 올바른 JSON이 아니야" },
      { status: 400 }
    );
  }

  const { characterId, text } = (payload ?? {}) as {
    characterId?: unknown;
    text?: unknown;
  };

  if (typeof characterId !== "string" || !characterId.trim()) {
    return NextResponse.json(
      { error: "characterId가 필요해" },
      { status: 400 }
    );
  }
  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json(
      { error: "번역할 문장을 입력해줘" },
      { status: 400 }
    );
  }
  if (text.length > MAX_INPUT_LENGTH) {
    return NextResponse.json(
      { error: `문장이 너무 길어 (최대 ${MAX_INPUT_LENGTH}자)` },
      { status: 400 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "서버에 GEMINI_API_KEY가 설정되지 않았어" },
      { status: 500 }
    );
  }

  try {
    const translated = await translateAsCharacter({
      characterId,
      text: text.trim(),
      apiKey,
    });
    return NextResponse.json({ translated });
  } catch (err) {
    console.error("[api/translate] 번역 실패", err);
    const message =
      err instanceof Error ? err.message : "번역 중 알 수 없는 오류 발생";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
