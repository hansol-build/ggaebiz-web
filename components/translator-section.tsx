"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/ui/cool-mode";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { cn } from "@/lib/utils";
import { CHARACTER_MODES, type CharacterMode } from "@/lib/characters";

const HINT_BUTTONS = [
  { label: "청소해", text: "방 좀 치워!" },
  { label: "공부해", text: "공부 좀 해!" },
  { label: "너 뭐해", text: "너 지금 뭐 하고 있어?" },
];

// 진입 인트로: 빈 화면에 한 글자씩 타이핑되는 문구
const INTRO_TEXT = "안...녕...!?\n근데.. 넌.. 왜 말..을 그렇게.. 해?";
const INTRO_CHAR_MS = 100; // 글자당 타이핑 속도(ms)
const INTRO_DELAY = 350; // 타이핑 시작 전 대기(ms)
const INTRO_HOLD = 900; // 타이핑 완료 후 머무는 시간(ms)

// 진입 시 요소들이 위에서부터 순차적으로 등장하는 애니메이션
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.15 } },
};

// 입력 영역 내부(입력창·힌트·CTA)를 한 번 더 순차적으로 등장시키는 컨테이너
const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function CharacterCard({ character }: { character: CharacterMode }) {
  return (
    <motion.div
      className={cn(
        "group/card relative mx-auto select-none",
        "aspect-[5/6] w-full max-w-[280px] sm:max-w-[320px]",
        "cursor-pointer"
      )}
      animate={{ y: [0, -15, 0], rotate: [-3, 3, -3] }}
      transition={{
        y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 4.6, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* 호버 시 크기만 확대 — 좌우 회전·상하 움직임은 바깥 레이어에서 계속 유지 */}
      <motion.div
        className={cn(
          "h-full w-full rounded-[1.75rem]",
          "shadow-[0_14px_28px_-16px_rgba(17,17,26,0.2)]"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border-4 border-white/40">
          <Image
            src={character.image}
            alt={`${character.mbti} ${character.mode}`}
            fill
            sizes="(max-width: 640px) 280px, 320px"
            className="object-contain"
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TranslatorSection() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [dotsVisible, setDotsVisible] = React.useState(false);
  const dotsTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [translated, setTranslated] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [introDone, setIntroDone] = React.useState(false);

  // 타이핑 인트로가 끝나면(타이핑 시간 + 머무는 시간) 본 콘텐츠를 등장시킨다
  React.useEffect(() => {
    const typingMs = INTRO_DELAY + Array.from(INTRO_TEXT).length * INTRO_CHAR_MS;
    const timer = setTimeout(() => setIntroDone(true), typingMs + INTRO_HOLD);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
    const handler = () => {
      setCurrentIndex(api.selectedScrollSnap());
      setDotsVisible(true);
      if (dotsTimerRef.current) clearTimeout(dotsTimerRef.current);
      dotsTimerRef.current = setTimeout(() => setDotsVisible(false), 1500);
    };
    api.on("select", handler);
    return () => {
      api.off("select", handler);
      if (dotsTimerRef.current) clearTimeout(dotsTimerRef.current);
    };
  }, [api]);

  const character = CHARACTER_MODES[currentIndex];

  const handleTranslate = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTranslated(null);
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterId: character.id, text: trimmed }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        translated?: string;
        error?: string;
      };
      if (!response.ok || !data.translated) {
        throw new Error(data.error ?? "번역에 실패했어. 잠시 후 다시 시도해줘");
      }
      setTranslated(data.translated);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했어"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative px-4 pt-12 pb-16 sm:pt-16 sm:pb-20">
      {/* 진입 시 타이핑 인트로 (완료 후 페이드아웃) */}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-50 flex items-center justify-center bg-white px-8"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <TypingAnimation
              as="p"
              startOnView={false}
              duration={INTRO_CHAR_MS}
              delay={INTRO_DELAY}
              className="whitespace-pre-line text-center text-2xl leading-relaxed font-bold text-cool-gray-800 sm:text-3xl"
            >
              {INTRO_TEXT}
            </TypingAnimation>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 상단 배경 이미지 */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] sm:h-[560px] bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/translator-bg.jpg')" }}
      />
      {/* 흰색 → 투명 그라데이션 오버레이 */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] sm:h-[560px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 20%, rgba(255,255,255,1) 85%)",
        }}
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={introDone ? "show" : "hidden"}
        className="relative mx-auto flex w-full max-w-xl flex-col items-stretch gap-8 sm:gap-10"
      >
        <motion.div variants={itemVariants} className="relative">
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "center" }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {CHARACTER_MODES.map((c) => (
                <CarouselItem key={c.id} className="pl-0">
                  <div className="px-8 py-6 sm:py-8">
                    <CharacterCard character={c} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <button
            type="button"
            aria-label="이전 캐릭터"
            onClick={() => api?.scrollPrev()}
            className={cn(
              "absolute top-1/2 left-0 -translate-y-1/2",
              "hidden h-10 w-10 items-center justify-center rounded-full",
              "border border-cool-gray-100 bg-white text-cool-gray-600 shadow-sm",
              "transition hover:bg-cool-gray-50 active:scale-95",
              "sm:flex"
            )}
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            aria-label="다음 캐릭터"
            onClick={() => api?.scrollNext()}
            className={cn(
              "absolute top-1/2 right-0 -translate-y-1/2",
              "hidden h-10 w-10 items-center justify-center rounded-full",
              "border border-cool-gray-100 bg-white text-cool-gray-600 shadow-sm",
              "transition hover:bg-cool-gray-50 active:scale-95",
              "sm:flex"
            )}
          >
            <ChevronRightIcon className="size-5" />
          </button>

          <div
            className={cn(
              "mt-1 flex justify-center gap-1.5 sm:hidden",
              "transition-opacity duration-300",
              dotsVisible ? "opacity-100" : "opacity-0"
            )}
          >
            {CHARACTER_MODES.map((_, idx) => (
              <span
                key={idx}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  idx === currentIndex
                    ? "w-4 bg-orange-500"
                    : "w-1.5 bg-cool-gray-100"
                )}
              />
            ))}
          </div>
        </motion.div>

        <motion.div variants={groupVariants} className="flex flex-col gap-4">
          <label htmlFor="translator-input" className="sr-only">
            잔소리 입력
          </label>
          <motion.textarea
            variants={itemVariants}
            id="translator-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="하고 싶은 말을 입력해줘…"
            rows={2}
            className={cn(
              "w-full resize-none rounded-2xl px-5 py-4",
              "bg-cool-gray-50 text-[15px] text-cool-gray-800 placeholder:text-cool-gray-400",
              "outline-none transition-colors focus:bg-cool-gray-75",
              "focus-visible:ring-2 focus-visible:ring-orange-300/60"
            )}
          />

          <motion.div variants={itemVariants} className="flex gap-2">
            {HINT_BUTTONS.map((hint) => (
              <button
                key={hint.label}
                type="button"
                onClick={() => setInput(hint.text)}
                className={cn(
                  "flex-1 rounded-2xl px-3 py-3 text-center text-sm font-semibold",
                  "bg-cool-gray-50 text-cool-gray-700",
                  "transition hover:bg-cool-gray-75 active:scale-[0.98]"
                )}
              >
                {hint.label}
              </button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col">
            <CoolMode
              options={{
              particle: "/characters/particle-icon.png",
              size: 44,
              particleCount: 10,
              speedUp: 20,
            }}
          >
            <Button
              type="button"
              onClick={handleTranslate}
              disabled={isLoading || !input.trim()}
              className={cn(
                "h-14 w-full rounded-2xl text-base font-bold",
                "bg-orange-500 text-white shadow-[0_8px_20px_-8px_rgba(252,111,61,0.6)]",
                "hover:bg-orange-600 active:scale-[0.99]",
                "disabled:bg-orange-200 disabled:text-white disabled:shadow-none"
              )}
            >
              {isLoading ? "번역 중…" : `${character.name}톤으로 번역하기`}
            </Button>
            </CoolMode>
          </motion.div>
        </motion.div>

        {translated && (
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-cool-gray-50 p-5 sm:p-6"
          >
            <p className="mb-2 text-[11px] font-semibold tracking-[0.24em] text-orange-600">
              {character.mbti} · {character.mode}
            </p>
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-cool-gray-800 text-pretty">
              {translated}
            </p>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            variants={itemVariants}
            role="alert"
            className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
          >
            {errorMessage}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

