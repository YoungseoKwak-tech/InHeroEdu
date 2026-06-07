import type { Metadata } from "next";
import ApGuideClient from "./ApGuideClient";

export const metadata: Metadata = {
  title: "전공별 AP 과목 선택 가이드 — InHero 학부모",
  description:
    "생명·CS·공학·경제·인문 등 전공별로 어떤 AP를 들어야 하는지 정리. 자녀의 관심 전공에 맞는 AP 조합을 한눈에.",
  alternates: { canonical: "/parents/ap-guide" },
  robots: { index: false, follow: false },
};

export default function ApGuidePage() {
  return <ApGuideClient />;
}
