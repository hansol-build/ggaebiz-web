import { DownloadCta } from "@/components/download-cta";
import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <DownloadCta />
      <footer className="border-t px-4 py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} 깨비즈 (Ggaebiz). All rights reserved.</p>
      </footer>
    </main>
  );
}
