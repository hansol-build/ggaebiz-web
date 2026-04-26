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
          <p>© {new Date().getFullYear()} 깨비즈 (Ggaebiz). All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
