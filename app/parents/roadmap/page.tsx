import type { Metadata } from "next";
import RoadmapClient from "./RoadmapClient";

export const metadata: Metadata = {
  title: "미국 대학 입시 학년별 로드맵 (G9–G12) — InHero 학부모",
  description:
    "9학년부터 12학년까지 미국 대학 입시 준비를 학업·시험·활동·에세이로 학년별 정리. 지금 자녀 학년에서 무엇에 집중할지 한눈에.",
  alternates: { canonical: "/parents/roadmap" },
  robots: { index: false, follow: false },
};

export default function RoadmapPage() {
  return <RoadmapClient />;
}
