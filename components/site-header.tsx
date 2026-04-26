import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-heading text-lg font-bold tracking-tight"
        >
          깨비즈
        </Link>
        <Link
          href="#download"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          앱 다운로드
        </Link>
      </div>
    </header>
  );
}
