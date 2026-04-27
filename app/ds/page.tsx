import type { Metadata } from "next";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Design System",
  description: "깨비즈 웹 디자인 시스템 내부 참고 페이지",
  robots: { index: false, follow: false },
};

type ScaleStep = { step: string; hex: string; bg: string; fg: string };

const ORANGE_SCALE: ScaleStep[] = [
  { step: "50", hex: "#FFF5F0", bg: "bg-orange-50", fg: "text-orange-900" },
  { step: "100", hex: "#FFE4D5", bg: "bg-orange-100", fg: "text-orange-900" },
  { step: "200", hex: "#FFCAB0", bg: "bg-orange-200", fg: "text-orange-900" },
  { step: "300", hex: "#FFA980", bg: "bg-orange-300", fg: "text-orange-900" },
  { step: "400", hex: "#FF8A55", bg: "bg-orange-400", fg: "text-orange-900" },
  { step: "500", hex: "#FC6F3D", bg: "bg-orange-500", fg: "text-cool-gray-25" },
  { step: "600", hex: "#E5572A", bg: "bg-orange-600", fg: "text-cool-gray-25" },
  { step: "700", hex: "#B83F1C", bg: "bg-orange-700", fg: "text-cool-gray-25" },
  { step: "800", hex: "#7E2C12", bg: "bg-orange-800", fg: "text-cool-gray-25" },
  { step: "900", hex: "#4D1808", bg: "bg-orange-900", fg: "text-cool-gray-25" },
];

const COOL_GRAY_SCALE: ScaleStep[] = [
  { step: "25", hex: "#FAFBFC", bg: "bg-cool-gray-25", fg: "text-cool-gray-900" },
  { step: "50", hex: "#F4F5F7", bg: "bg-cool-gray-50", fg: "text-cool-gray-900" },
  { step: "75", hex: "#ECEEF1", bg: "bg-cool-gray-75", fg: "text-cool-gray-900" },
  { step: "100", hex: "#DFE3E8", bg: "bg-cool-gray-100", fg: "text-cool-gray-900" },
  { step: "200", hex: "#C9CED4", bg: "bg-cool-gray-200", fg: "text-cool-gray-900" },
  { step: "300", hex: "#A8AFB7", bg: "bg-cool-gray-300", fg: "text-cool-gray-900" },
  { step: "400", hex: "#818892", bg: "bg-cool-gray-400", fg: "text-cool-gray-25" },
  { step: "500", hex: "#5F656D", bg: "bg-cool-gray-500", fg: "text-cool-gray-25" },
  { step: "600", hex: "#444A52", bg: "bg-cool-gray-600", fg: "text-cool-gray-25" },
  { step: "700", hex: "#2D3239", bg: "bg-cool-gray-700", fg: "text-cool-gray-25" },
  { step: "800", hex: "#1A1E23", bg: "bg-cool-gray-800", fg: "text-cool-gray-25" },
  { step: "900", hex: "#0B0E12", bg: "bg-cool-gray-900", fg: "text-cool-gray-25" },
];

type ColorToken = {
  name: string;
  varName: string;
  className: string;
  fgClassName?: string;
  note?: string;
};

const THEME_COLORS: ColorToken[] = [
  { name: "background", varName: "--background", className: "bg-background", fgClassName: "text-foreground" },
  { name: "foreground", varName: "--foreground", className: "bg-foreground", fgClassName: "text-background" },
  { name: "primary", varName: "--primary", className: "bg-primary", fgClassName: "text-primary-foreground", note: "= orange-500" },
  { name: "primary-foreground", varName: "--primary-foreground", className: "bg-primary-foreground", fgClassName: "text-primary" },
  { name: "secondary", varName: "--secondary", className: "bg-secondary", fgClassName: "text-secondary-foreground" },
  { name: "muted", varName: "--muted", className: "bg-muted", fgClassName: "text-muted-foreground" },
  { name: "muted-foreground", varName: "--muted-foreground", className: "bg-muted-foreground", fgClassName: "text-muted" },
  { name: "accent", varName: "--accent", className: "bg-accent", fgClassName: "text-accent-foreground" },
  { name: "destructive", varName: "--destructive", className: "bg-destructive", fgClassName: "text-background" },
  { name: "border", varName: "--border", className: "bg-border", fgClassName: "text-foreground" },
  { name: "input", varName: "--input", className: "bg-input", fgClassName: "text-foreground" },
  { name: "ring", varName: "--ring", className: "bg-ring", fgClassName: "text-foreground" },
  { name: "card", varName: "--card", className: "bg-card", fgClassName: "text-card-foreground" },
  { name: "popover", varName: "--popover", className: "bg-popover", fgClassName: "text-popover-foreground" },
];

const TYPOGRAPHY_SAMPLES = [
  { tag: "Display", className: "font-heading text-5xl font-bold tracking-tight", sample: "잔소리, 제대로 해보자" },
  { tag: "H1", className: "font-heading text-4xl font-semibold tracking-tight", sample: "헤딩 1 · 4xl semibold" },
  { tag: "H2", className: "font-heading text-3xl font-semibold tracking-tight", sample: "헤딩 2 · 3xl semibold" },
  { tag: "H3", className: "font-heading text-2xl font-semibold", sample: "헤딩 3 · 2xl semibold" },
  { tag: "H4", className: "font-heading text-xl font-medium", sample: "헤딩 4 · xl medium" },
  { tag: "Body Large", className: "text-lg leading-relaxed", sample: "본문 대 · 사용자 친화적인 메시지를 강조할 때 사용합니다." },
  { tag: "Body", className: "text-base leading-relaxed", sample: "본문 · 깨비즈 캐릭터의 톤으로 메시지를 번역하는 데 도움을 줍니다." },
  { tag: "Body Small", className: "text-sm leading-relaxed text-muted-foreground", sample: "본문 소 · 보조 설명에 사용합니다." },
  { tag: "Caption", className: "text-xs tracking-[0.2em] uppercase text-muted-foreground", sample: "CAPTION · OVERLINE" },
  { tag: "Mono", className: "font-mono text-sm", sample: "const tone = 'jjini'" },
];

const SPACING_TOKENS = [
  { label: "1 (0.25rem)", widthClass: "w-1" },
  { label: "2 (0.5rem)", widthClass: "w-2" },
  { label: "3 (0.75rem)", widthClass: "w-3" },
  { label: "4 (1rem)", widthClass: "w-4" },
  { label: "6 (1.5rem)", widthClass: "w-6" },
  { label: "8 (2rem)", widthClass: "w-8" },
  { label: "12 (3rem)", widthClass: "w-12" },
  { label: "16 (4rem)", widthClass: "w-16" },
  { label: "24 (6rem)", widthClass: "w-24" },
  { label: "32 (8rem)", widthClass: "w-32" },
];

const RADIUS_TOKENS = [
  { label: "sm", className: "rounded-sm" },
  { label: "md", className: "rounded-md" },
  { label: "lg (base)", className: "rounded-lg" },
  { label: "xl", className: "rounded-xl" },
  { label: "2xl", className: "rounded-2xl" },
  { label: "3xl", className: "rounded-3xl" },
  { label: "full", className: "rounded-full" },
];

const SHADOW_TOKENS = [
  { label: "shadow-xs", className: "shadow-xs" },
  { label: "shadow-sm", className: "shadow-sm" },
  { label: "shadow", className: "shadow" },
  { label: "shadow-md", className: "shadow-md" },
  { label: "shadow-lg", className: "shadow-lg" },
  { label: "shadow-xl", className: "shadow-xl" },
  { label: "shadow-2xl", className: "shadow-2xl" },
];

const BUTTON_VARIANTS = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const;
const BUTTON_SIZES = ["xs", "sm", "default", "lg"] as const;
const ICON_SIZES = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const;

function SectionHeader({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <header id={id} className="scroll-mt-24">
      <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </header>
  );
}

function ColorScaleStrip({
  title,
  scale,
}: {
  title: string;
  scale: ScaleStep[];
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6">
      <h3 className="font-heading text-lg font-semibold tracking-tight">{title}</h3>
      <div className="flex w-full overflow-hidden rounded-xl ring-1 ring-foreground/5">
        {scale.map((s) => (
          <div
            key={s.step}
            className={cn("flex flex-1 flex-col justify-end gap-1 px-2 py-6", s.bg, s.fg)}
          >
            <span className="text-[11px] font-semibold">{s.step}</span>
            <span className="text-[10px] font-mono opacity-80">{s.hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorSwatch({ token }: { token: ColorToken }) {
  return (
    <div className="overflow-hidden rounded-xl border ring-1 ring-foreground/5">
      <div className={cn("flex h-20 items-end justify-between p-3", token.className, token.fgClassName)}>
        <span className="text-xs font-medium">{token.name}</span>
        {token.note && <span className="text-[10px] font-mono opacity-80">{token.note}</span>}
      </div>
      <div className="flex items-center justify-between bg-card px-3 py-2 text-[11px] font-mono text-muted-foreground">
        <span>{token.varName}</span>
        <span>{token.className}</span>
      </div>
    </div>
  );
}

function ButtonMatrix({
  title,
  description,
  renderCell,
}: {
  title: string;
  description?: string;
  renderCell: (variant: (typeof BUTTON_VARIANTS)[number], size: (typeof BUTTON_SIZES)[number]) => React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-card px-4 py-3 text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-muted-foreground">
                size ↓ · variant →
              </th>
              {BUTTON_VARIANTS.map((v) => (
                <th
                  key={v}
                  className="border-l px-4 py-3 text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-muted-foreground"
                >
                  {v}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BUTTON_SIZES.map((s) => (
              <tr key={s} className="border-t">
                <td className="sticky left-0 z-10 border-t bg-card px-4 py-4 text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {s}
                </td>
                {BUTTON_VARIANTS.map((v) => (
                  <td key={v} className="border-l border-t px-4 py-4">
                    {renderCell(v, s)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">Internal · Reference</p>
            <h1 className="font-heading text-xl font-bold tracking-tight">깨비즈 디자인 시스템</h1>
          </div>
          <nav className="hidden gap-4 text-xs text-muted-foreground sm:flex">
            <a href="#colors" className="hover:text-foreground">Colors</a>
            <a href="#typography" className="hover:text-foreground">Typography</a>
            <a href="#spacing" className="hover:text-foreground">Spacing</a>
            <a href="#radius" className="hover:text-foreground">Radius</a>
            <a href="#shadow" className="hover:text-foreground">Shadow</a>
            <a href="#components" className="hover:text-foreground">Components</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12">
        {/* Colors */}
        <section className="flex flex-col gap-6">
          <SectionHeader
            id="colors"
            title="Color Palette"
            description="브랜드 컬러는 Orange (Primary)와 Cool Gray 두 축으로 구성됩니다. 각 단계는 Tailwind 토큰으로 등록되어 bg-orange-500, text-cool-gray-700 처럼 사용합니다."
          />

          <ColorScaleStrip title="Orange (Primary) · 500 = #FC6F3D" scale={ORANGE_SCALE} />
          <ColorScaleStrip title="Cool Gray" scale={COOL_GRAY_SCALE} />

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold tracking-tight">Semantic theme tokens</h3>
            <p className="text-xs text-muted-foreground">
              shadcn/ui가 사용하는 시맨틱 토큰입니다. <code className="font-mono text-[11px]">--primary</code>는
              <code className="font-mono text-[11px]"> --color-orange-500</code>을 가리킵니다.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {THEME_COLORS.map((token) => (
                <ColorSwatch key={token.name} token={token} />
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="flex flex-col gap-6">
          <SectionHeader
            id="typography"
            title="Typography"
            description="Pretendard Variable을 기본 폰트로 사용합니다. 헤딩은 font-heading 토큰을 사용하며, 본문은 한국어 가독성을 위해 leading-relaxed가 기본입니다."
          />
          <div className="flex flex-col divide-y rounded-xl border bg-card">
            {TYPOGRAPHY_SAMPLES.map((t) => (
              <div key={t.tag} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-baseline sm:gap-6">
                <div className="w-28 shrink-0 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                  {t.tag}
                </div>
                <div className={t.className}>{t.sample}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section className="flex flex-col gap-6">
          <SectionHeader
            id="spacing"
            title="Spacing"
            description="Tailwind 기본 스페이싱 스케일(4px 단위)을 사용합니다. p-*, gap-*, m-* 등에 동일하게 적용됩니다."
          />
          <div className="flex flex-col gap-2 rounded-xl border bg-card p-5">
            {SPACING_TOKENS.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="w-32 text-xs font-mono text-muted-foreground">{s.label}</div>
                <div className={cn("h-3 rounded-sm bg-primary", s.widthClass)} />
              </div>
            ))}
          </div>
        </section>

        {/* Radius */}
        <section className="flex flex-col gap-6">
          <SectionHeader
            id="radius"
            title="Border Radius"
            description="--radius 변수를 기준으로 sm·md·lg·xl·2xl·3xl 토큰이 파생됩니다. 카드는 xl, 컨테이너는 2xl을 권장합니다."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {RADIUS_TOKENS.map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4">
                <div className={cn("h-16 w-16 bg-primary/20 ring-1 ring-primary/40", r.className)} />
                <span className="text-[11px] font-mono text-muted-foreground">{r.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Shadow */}
        <section className="flex flex-col gap-6">
          <SectionHeader
            id="shadow"
            title="Shadow"
            description="Tailwind 기본 그림자 스케일을 사용합니다. 다크 모드에서는 자연스럽게 약화되도록 ring-1 ring-foreground/5 패턴과 함께 쓰는 것을 권장합니다."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {SHADOW_TOKENS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3">
                <div className={cn("h-20 w-20 rounded-xl bg-card", s.className)} />
                <span className="text-[11px] font-mono text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Components */}
        <section className="flex flex-col gap-10">
          <SectionHeader
            id="components"
            title="Components"
            description="shadcn/ui 기반 컴포넌트 쇼케이스. 실제 src에서 import 해서 그대로 사용합니다."
          />

          {/* Button matrices */}
          <div className="flex flex-col gap-8">
            <ButtonMatrix
              title="Button · text only"
              description="size(xs · sm · default · lg) × variant(6종) 매트릭스"
              renderCell={(variant, size) => (
                <Button variant={variant} size={size}>
                  확인
                </Button>
              )}
            />

            <ButtonMatrix
              title="Button · with leading icon"
              description="텍스트 앞에 아이콘이 붙는 패턴. 아이콘에 data-icon='inline-start' 속성을 주면 좌측 패딩이 자동 조정됩니다."
              renderCell={(variant, size) => (
                <Button variant={variant} size={size}>
                  <Plus data-icon="inline-start" />
                  확인
                </Button>
              )}
            />

            <ButtonMatrix
              title="Button · with trailing icon"
              description="아이콘에 data-icon='inline-end' 를 주면 우측 패딩이 줄어듭니다."
              renderCell={(variant, size) => (
                <Button variant={variant} size={size}>
                  확인
                  <Plus data-icon="inline-end" />
                </Button>
              )}
            />

            <ButtonMatrix
              title="Button · disabled"
              description="모든 사이즈/변형의 비활성 상태."
              renderCell={(variant, size) => (
                <Button variant={variant} size={size} disabled>
                  확인
                </Button>
              )}
            />

            {/* Icon-only buttons */}
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-semibold tracking-tight">Button · icon only</h3>
                <p className="text-xs text-muted-foreground">
                  아이콘 전용 사이즈(icon-xs · icon-sm · icon · icon-lg) × variant 매트릭스
                </p>
              </div>
              <div className="overflow-x-auto rounded-xl border bg-card">
                <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 bg-card px-4 py-3 text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-muted-foreground">
                        size ↓ · variant →
                      </th>
                      {BUTTON_VARIANTS.filter((v) => v !== "link").map((v) => (
                        <th
                          key={v}
                          className="border-l px-4 py-3 text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-muted-foreground"
                        >
                          {v}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ICON_SIZES.map((s) => (
                      <tr key={s} className="border-t">
                        <td className="sticky left-0 z-10 border-t bg-card px-4 py-4 text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-muted-foreground">
                          {s}
                        </td>
                        {BUTTON_VARIANTS.filter((v) => v !== "link").map((v) => (
                          <td key={v} className="border-l border-t px-4 py-4">
                            <Button variant={v} size={s} aria-label="추가">
                              <Plus />
                            </Button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Combined showcase row — like the reference image */}
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-semibold tracking-tight">Button · brand combination</h3>
                <p className="text-xs text-muted-foreground">
                  실제 화면에서 자주 등장하는 조합. neutral / primary / destructive 3개 톤을
                  filled · outline · ghost 스타일로 묶어서 보여줍니다.
                </p>
              </div>
              <div className="grid gap-4 rounded-xl border bg-card p-5 sm:grid-cols-3">
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                    Neutral
                  </span>
                  <div className="flex flex-col items-start gap-2">
                    <Button variant="secondary">
                      <Plus data-icon="inline-start" />
                      확인
                    </Button>
                    <Button variant="outline">
                      <Plus data-icon="inline-start" />
                      확인
                    </Button>
                    <Button variant="ghost">
                      <Plus data-icon="inline-start" />
                      확인
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-primary">
                    Primary
                  </span>
                  <div className="flex flex-col items-start gap-2">
                    <Button>
                      <Plus data-icon="inline-start" />
                      확인
                    </Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      <Plus data-icon="inline-start" />
                      확인
                    </Button>
                    <Button variant="ghost" className="text-primary hover:bg-primary/10">
                      <Plus data-icon="inline-start" />
                      확인
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-destructive">
                    Destructive
                  </span>
                  <div className="flex flex-col items-start gap-2">
                    <Button variant="destructive">
                      <Plus data-icon="inline-start" />
                      삭제
                    </Button>
                    <Button
                      variant="outline"
                      className="border-destructive/40 text-destructive hover:bg-destructive/10"
                    >
                      <Plus data-icon="inline-start" />
                      삭제
                    </Button>
                    <Button variant="ghost" className="text-destructive hover:bg-destructive/10">
                      <Plus data-icon="inline-start" />
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-tight">Textarea</h3>
            <div className="grid gap-4 rounded-xl border bg-card p-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">기본</label>
                <Textarea placeholder="하고 싶은 말을 입력해줘…" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">disabled</label>
                <Textarea placeholder="비활성 상태" disabled defaultValue="입력할 수 없음" />
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-tight">Card</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>기본 카드</CardTitle>
                  <CardDescription>가장 많이 쓰는 컨테이너 단위입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    카드 안에는 텍스트, 이미지, 폼 등 자유롭게 배치할 수 있습니다.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">확인</Button>
                </CardFooter>
              </Card>

              <Card size="sm">
                <CardHeader>
                  <CardTitle>컴팩트 카드</CardTitle>
                  <CardDescription>size=&quot;sm&quot; 변형입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    리스트나 사이드 정보를 담을 때 사용합니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>프로모 카드</CardTitle>
                  <CardDescription>orange 톤을 강조한 예시</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-orange-100 p-4 text-sm">
                    <p className="font-medium text-orange-700">잔소리, 제대로 해보자</p>
                    <p className="mt-1 text-cool-gray-600">
                      오렌지 100/200 배경에 700 텍스트는 명도 대비가 충분합니다.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm">앱 다운로드</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
