import type { Metadata } from "next";
import CompetitionsClient from "./CompetitionsClient";

export const metadata: Metadata = {
  title: "미국 입시 대회 데이터베이스 (전 분야) — InHero 학부모",
  description:
    "STEM부터 인문·글쓰기·토론·비즈니스·예술까지, 미국 대학 입시 대회 전 분야를 학년·난이도·신청 시기·추천 전공별로 정리. 자녀에게 맞는 활동을 한눈에.",
  alternates: { canonical: "/parents/competitions" },
  robots: { index: false, follow: false },
};

export default function CompetitionsPage() {
  return <CompetitionsClient />;
}
