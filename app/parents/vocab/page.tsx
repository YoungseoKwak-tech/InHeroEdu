import type { Metadata } from "next";
import VocabClient from "./VocabClient";

export const metadata: Metadata = {
  title: "과목별 필수 영어 단어장 (한국어→영어) — InHero 학부모",
  description:
    "AP 과목별 필수 용어를 한국어 뜻으로 보고 영어로 외우는 단어장. 미국 입시의 핵심인 어휘력을 빠르게 채웁니다. 목록·플래시카드·오늘의 단어 모드.",
  alternates: { canonical: "/parents/vocab" },
  robots: { index: false, follow: false },
};

export default function ParentsVocabPage() {
  return <VocabClient />;
}
