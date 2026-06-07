import type { Metadata } from "next";
import EssayClient from "./EssayClient";

export const metadata: Metadata = {
  title: "코넬 공대 합격 에세이 분석 — InHero 학부모",
  description:
    "실제 코넬대 공과대학(생의공학) 합격생의 Common App 메인 에세이를 한 문단씩 쪼개 분석. 무엇이 왜 잘 됐는지 한국어로 자세히.",
  alternates: { canonical: "/parents/essay" },
  robots: { index: false, follow: false },
};

export default function ParentEssayPage() {
  return <EssayClient />;
}
