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

        {translated && (
          <div className="rounded-2xl border bg-muted/40 p-6">
            <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-muted-foreground">
              {character.mbti} · {character.mode}
            </p>
            <p className="text-base leading-relaxed text-pretty whitespace-pre-wrap">
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
