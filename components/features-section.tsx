import { BarChart3, MessageCircle, Shield, Zap } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "빠른 시작",
    description:
      "복잡한 설정 없이 바로 쓸 수 있는 흐름으로, 오늘 바로 업무에 녹여 넣을 수 있습니다.",
  },
  {
    icon: BarChart3,
    title: "한눈에 보는 현황",
    description:
      "핵심 지표와 진행 상황을 정리해 보여 주어 의사결정에 필요한 정보를 놓치지 않습니다.",
  },
  {
    icon: MessageCircle,
    title: "원활한 소통",
    description:
      "팀·고객과의 대화와 알림을 한곳에 모아 컨텍스트 전환을 줄입니다.",
  },
  {
    icon: Shield,
    title: "안심하고 사용",
    description:
      "업무 데이터를 다루는 앱으로서 보안과 권한 관리를 염두에 둔 구조를 지향합니다.",
  },
] as const;

export function FeaturesSection() {
  return (
    <section id="features" className="border-b px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            깨비즈가 제공하는 것
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            작은 팀부터 성장하는 조직까지, 일상 업무에 맞춘 주요 기능을
            소개합니다.
          </p>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <Card className="h-full transition-colors hover:bg-muted/30">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
