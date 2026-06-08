import type { Metadata } from "next";
import AmcClient from "./AmcClient";

export const metadata: Metadata = {
  title: "AMC 10/12 연습문제 — InHero 학부모",
  description:
    "AMC 10/12 스타일 실전 연습문제를 난이도별로. 보기를 눌러 바로 채점하고 한국어 풀이까지.",
  alternates: { canonical: "/parents/amc" },
  robots: { index: false, follow: false },
};

export default function ParentAmcPage() {
  return <AmcClient />;
}
