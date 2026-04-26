export function HeroSection() {
  return (
    <section
      id="hero"
      className="px-4 pt-10 pb-4 text-center sm:pt-14 sm:pb-6"
    >
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          깨비즈 잔소리 번역기
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          잔소리, 제대로 해보자
        </h1>
        <p className="mt-3 text-muted-foreground text-pretty">
          하고 싶은 말을 깨비즈 캐릭터 톤으로 바꿔드립니다.
        </p>
      </div>
    </section>
  );
}
