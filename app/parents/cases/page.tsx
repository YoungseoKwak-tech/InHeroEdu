import type { Metadata } from "next";
import CasesClient from "./CasesClient";

export const metadata: Metadata = {
  title: "합격 사례 100선 — 유형별 합격 프로필 | InHero 학부모",
  description:
    "미국 입시에서 통하는 합격 패턴을 전공·유형별로 재구성한 100개 사례. 활동 구성·에세이 접근법·왜 통했는지까지. (공개 패턴 기반 재구성 예시)",
  alternates: { canonical: "/parents/cases" },
  robots: { index: false, follow: false },
};

export default function ParentCasesPage() {
  return <CasesClient />;
}
