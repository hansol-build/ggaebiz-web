import { DownloadCta } from "@/components/download-cta";
import { HeroSection } from "@/components/hero-section";
import { SiteHeader } from "@/components/site-header";
import { TranslatorSection } from "@/components/translator-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <TranslatorSection />
        <DownloadCta />
        <footer className="border-t px-4 py-8 text-center text-sm text-muted-foreground">
          <p>깨비즈는 사장님의 하루를 더 단단하게 만들어 드립니다.</p>
          <p>문의는 언제든 고객센터로 편하게 남겨 주세요.</p>
          <p>© {new Date().getFullYear()} 깨비즈 (Ggaebiz). All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
