import type { Metadata } from "next";
import MathClient from "./MathClient";

export const metadata: Metadata = {
  title: "미국 수학 교육과정 — 한국 과정과 비교 | InHero 학부모",
  description:
    "미국 수학 학년별 트랙(Regular·Honor·Highly Advanced), 과목별 단원(Algebra·Geometry·Pre-Calculus·Calculus), 한국 중학교 과정 비교, 미국 과정↔한국 수준 매칭과 서술형/단답형 차이까지.",
  alternates: { canonical: "/parents/math" },
  robots: { index: false, follow: false },
};

export default function MathPage() {
  return <MathClient />;
}
