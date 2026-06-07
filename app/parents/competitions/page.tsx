import type { Metadata } from "next";
import CompetitionsClient from "./CompetitionsClient";

export const metadata: Metadata = {
  title: "미국 입시 STEM 대회 데이터베이스 — InHero 학부모",
  description:
    "USABO·USACO·ISEF·Conrad 등 미국 대학 입시 STEM 대회를 학년·난이도·신청 시기·추천 전공별로 정리. 자녀에게 맞는 활동을 한눈에.",
  alternates: { canonical: "/parents/competitions" },
  robots: { index: false, follow: false },
};

export default function CompetitionsPage() {
  return <CompetitionsClient />;
}
