import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/app-links";
import { cn } from "@/lib/utils";

export function DownloadCta() {
  return (
    <section
      id="download"
      className="bg-muted/50 px-4 py-20 sm:py-24"
      aria-labelledby="download-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center rounded-2xl border bg-card px-6 py-12 text-center shadow-sm ring-1 ring-foreground/5 sm:px-10">
        <h2
          id="download-heading"
          className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          지금 깨비즈를 받아보세요
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">
          iOS·Android에서 동일한 경험으로 이용할 수 있습니다. 스토어에서 앱을
          검색하거나 아래 버튼으로 이동하세요.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={APP_STORE_URL}
            className={cn(buttonVariants({ size: "lg" }), "min-w-[180px]")}
          >
            App Store
          </Link>
          <Link
            href={PLAY_STORE_URL}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-w-[180px]"
            )}
          >
            Google Play
          </Link>
        </div>
      </div>
    </section>
  );
}
