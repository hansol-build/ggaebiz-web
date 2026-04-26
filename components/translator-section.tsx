"use client";

import * as React from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CHARACTER_MODES } from "@/lib/characters";
import { cn } from "@/lib/utils";

const HINT_BUTTONS = [
  { label: "청소 해!", text: "방 좀 치워!" },
  { label: "공부 해!", text: "공부 좀 해!" },
  { label: "연락 해!", text: "연락 좀 자주 해!" },
];

export function TranslatorSection() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);

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

  const handleTranslate = () => {
    if (!input.trim()) return;
    setShowResult(false);
    setIsLoading(true);
    // AI API 미정 — 와꾸용 가짜 로딩
    window.setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 700);
  };

  return (
    <section className="px-4 pb-12 sm:pb-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className="mx-auto w-full max-w-md"
        >
          <CarouselContent>
            {CHARACTER_MODES.map((c) => (
              <CarouselItem key={c.id}>
                <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-6 text-center shadow-sm">
                  <span className="text-xs font-semibold tracking-[0.3em] text-muted-foreground">
                    {c.mbti}
                  </span>
                  <div
                    className={cn(
                      "flex aspect-square w-40 items-center justify-center rounded-2xl text-6xl",
                      c.bgClass
                    )}
                    aria-label={`${c.name} placeholder image`}
                  >
                    {c.emoji}
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-semibold">{c.mode}</p>
                    <p className="text-sm text-muted-foreground text-pretty">
                      {c.intro}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex flex-col gap-3">
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="하고 싶은 말을 입력해줘…"
            className="min-h-24 text-base"
          />
          <div className="flex flex-wrap gap-2">
            {HINT_BUTTONS.map((hint) => (
              <Button
                key={hint.label}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setInput(hint.text)}
              >
                {hint.label}
              </Button>
            ))}
          </div>
          <Button
            type="button"
            size="lg"
            onClick={handleTranslate}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? "번역 중…" : `${character.name} 톤으로 번역하기`}
          </Button>
        </div>

        {showResult && (
          <div className="rounded-2xl border bg-muted/40 p-6">
            <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-muted-foreground">
              {character.mbti} · {character.mode}
            </p>
            <p className="text-base leading-relaxed text-pretty">
              [여기에 {character.name} 톤으로 번역된 결과가 표시됩니다]
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
