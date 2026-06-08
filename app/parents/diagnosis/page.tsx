import type { Metadata } from "next";
import DiagnosisClient from "./DiagnosisClient";

export const metadata: Metadata = {
  title: "우리 아이 학습 진단 — InHero 학부모",
  description:
    "12개 질문으로 우리 아이의 학습 유형을 진단하세요. 강점·보완점과 학부모 코칭 팁, 맞춤 InHero 자료까지 무료로.",
  alternates: { canonical: "/parents/diagnosis" },
  robots: { index: false, follow: false },
};

export default function ParentDiagnosisPage() {
  return <DiagnosisClient />;
}
