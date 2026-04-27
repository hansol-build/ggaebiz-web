export type CharacterMode = {
  /** 캐릭터+모드 식별자 */
  id: string;
  /** 캐릭터 이름 (키키/부부/차차/누누/보보) */
  name: string;
  /** 모드 라벨 (예: "키키1", "부부2") */
  mode: string;
  /** 매칭된 MBTI 16종 */
  mbti: string;
  /** 카드 하단에 노출되는 표준 소개 한 줄 */
  intro: string;
  /** placeholder 카드 배경 색상 (Tailwind 클래스) */
  bgClass: string;
  /** placeholder 이모지 (실제 이미지 도착 시 교체) */
  emoji: string;
};

/** 5캐릭터 × 16모드 = 16카드, MBTI와 1:1 매핑.
 *  매핑은 임시값이며 확정 매핑이 정해지면 이 배열만 교체하면 된다. */
export const CHARACTER_MODES: CharacterMode[] = [
  // 키키 — 에너지 넘치고 감성적 (외향+감성 계열 4종)
  { id: "kiki-enfp", name: "키키", mode: "키키1", mbti: "ENFP", intro: "나는 호기심 따라 함께 가는 번역기야", bgClass: "bg-pink-100", emoji: "✨" },
  { id: "kiki-enfj", name: "키키", mode: "키키2", mbti: "ENFJ", intro: "나는 마음을 응원해주는 번역기야", bgClass: "bg-pink-100", emoji: "📚" },
  { id: "kiki-esfp", name: "키키", mode: "키키3", mbti: "ESFP", intro: "나는 분위기 띄우는 번역기야", bgClass: "bg-pink-100", emoji: "🎉" },
  { id: "kiki-esfj", name: "키키", mode: "키키4", mbti: "ESFJ", intro: "나는 곁에서 챙겨주는 번역기야", bgClass: "bg-pink-100", emoji: "💕" },
  // 부부 — 원칙주의자 (TJ 계열 3종)
  { id: "boobu-estj", name: "부부", mode: "부부1", mbti: "ESTJ", intro: "나는 또박또박 알리는 번역기야", bgClass: "bg-sky-100", emoji: "📋" },
  { id: "boobu-entj", name: "부부", mode: "부부2", mbti: "ENTJ", intro: "나는 큰 그림 짜주는 번역기야", bgClass: "bg-sky-100", emoji: "🗂️" },
  { id: "boobu-istj", name: "부부", mode: "부부3", mbti: "ISTJ", intro: "나는 차곡차곡 정리하는 번역기야", bgClass: "bg-sky-100", emoji: "📝" },
  // 차차 — 분석적 리더 (NT 계열 3종)
  { id: "chacha-entp", name: "차차", mode: "차차1", mbti: "ENTP", intro: "나는 이리저리 따져보는 번역기야", bgClass: "bg-violet-100", emoji: "💡" },
  { id: "chacha-intj", name: "차차", mode: "차차2", mbti: "INTJ", intro: "나는 한 수 앞 그리는 번역기야", bgClass: "bg-violet-100", emoji: "🧭" },
  { id: "chacha-intp", name: "차차", mode: "차차3", mbti: "INTP", intro: "나는 끝까지 파보는 번역기야", bgClass: "bg-violet-100", emoji: "🔍" },
  // 누누 — 따뜻하고 감성적 (내향 NF/SF 3종)
  { id: "nunu-infj", name: "누누", mode: "누누1", mbti: "INFJ", intro: "나는 마음을 어루만지는 번역기야", bgClass: "bg-amber-100", emoji: "💗" },
  { id: "nunu-infp", name: "누누", mode: "누누2", mbti: "INFP", intro: "나는 찬찬히 곱씹는 번역기야", bgClass: "bg-amber-100", emoji: "🌙" },
  { id: "nunu-isfj", name: "누누", mode: "누누3", mbti: "ISFJ", intro: "나는 가만히 챙겨주는 번역기야", bgClass: "bg-amber-100", emoji: "🍵" },
  // 보보 — 현실적이고 유쾌함 (SP 계열 3종)
  { id: "bobo-estp", name: "보보", mode: "보보1", mbti: "ESTP", intro: "나는 일단 부딪쳐보는 번역기야", bgClass: "bg-emerald-100", emoji: "🌿" },
  { id: "bobo-istp", name: "보보", mode: "보보2", mbti: "ISTP", intro: "나는 손에 익을 때까지 보는 번역기야", bgClass: "bg-emerald-100", emoji: "🛠️" },
  { id: "bobo-isfp", name: "보보", mode: "보보3", mbti: "ISFP", intro: "나는 분위기로 말하는 번역기야", bgClass: "bg-emerald-100", emoji: "🎵" },
];
