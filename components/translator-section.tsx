"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CHARACTER_MODES, type CharacterMode } from "@/lib/characters";

const HINT_BUTTONS = [
  { label: "청소해", text: "방 좀 치워!" },
  { label: "공부해", text: "공부 좀 해!" },
  { label: "너 뭐해", text: "너 지금 뭐 하고 있어?" },
];

function CharacterCard({ character }: { character: CharacterMode }) {
  return (
    <div
      className={cn(
        "group/card relative mx-auto select-none",
        "aspect-[5/6] w-full max-w-[280px] sm:max-w-[320px]",
        "-rotate-[4deg] cursor-pointer",
        "transition-transform duration-300 ease-out will-change-transform",
        "hover:-rotate-[6deg] hover:scale-[1.05]"
      )}
    >
      <Image
        src={character.image}
        alt={`${character.mbti} ${character.mode}`}
        fill
        sizes="(max-width: 640px) 280px, 320px"
        className="object-contain"
        priority
      />
    </div>
  );
}

export function TranslatorSection() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [translated, setTranslated] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
    const handler = () => setCurrentIndex(api.selectedScrollSnap());
    api.on("select", handler);
    return () => {
      api.off("select", handler);
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
    <section className="px-4 pb-16 sm:pb-20">
      <div className="mx-auto flex w-full max-w-xl flex-col items-stretch gap-8 sm:gap-10">
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "center" }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {CHARACTER_MODES.map((c) => (
                <CarouselItem key={c.id} className="pl-0">
                  <div className="px-6 py-6 sm:py-8">
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

          <div className="mt-1 flex justify-center gap-1.5 sm:hidden">
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
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="translator-input" className="sr-only">
            잔소리 입력
          </label>
          <textarea
            id="translator-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="하고 싶은 말을 입력해줘…"
            rows={4}
            className={cn(
              "w-full resize-none rounded-2xl px-5 py-4",
              "bg-cool-gray-50 text-[15px] text-cool-gray-800 placeholder:text-cool-gray-400",
              "outline-none transition focus:bg-cool-gray-75",
              "focus-visible:ring-2 focus-visible:ring-orange-300/60"
            )}
          />

          <div className="flex flex-wrap gap-2">
            {HINT_BUTTONS.map((hint) => (
              <button
                key={hint.label}
                type="button"
                onClick={() => setInput(hint.text)}
                className={cn(
                  "rounded-2xl px-5 py-3 text-sm font-semibold",
                  "bg-cool-gray-50 text-cool-gray-700",
                  "transition hover:bg-cool-gray-75 active:scale-[0.98]"
                )}
              >
                {hint.label}
              </button>
            ))}
          </div>

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
        </div>

        {translated && (
          <div className="rounded-2xl bg-cool-gray-50 p-5 sm:p-6">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.24em] text-orange-600">
              {character.mbti} · {character.mode}
            </p>
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-cool-gray-800 text-pretty">
              {translated}
            </p>
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
          >
            {errorMessage}
          </div>
        )}
      </div>
    </section>
  );
}
