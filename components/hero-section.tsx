import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/app-links";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b bg-gradient-to-b from-muted/40 to-background px-4 py-20 sm:py-28"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Ggaebiz · 깨비즈
        </p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
          사장님의 하루를 가볍게,
          <br className="hidden sm:block" /> 매출은 더 단단하게
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl">
          주문 받고 정산하고 손님 챙기는 일까지, 깨비즈 앱 하나로 깔끔하게
          정리해 드립니다.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={APP_STORE_URL}
            className={cn(buttonVariants({ size: "lg" }), "min-w-[180px]")}
          >
            App Store에서 받기
          </Link>
          <Link
            href={PLAY_STORE_URL}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-w-[180px]"
            )}
          >
            Google Play에서 받기
          </Link>
        </div>
      </div>
    </section>
  );
}
