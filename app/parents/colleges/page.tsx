import type { Metadata } from "next";
import CollegesClient from "./CollegesClient";

export const metadata: Metadata = {
  title: "미국 대학 분석 — 인재상·입시·인턴십 총정리 | InHero 학부모",
  description:
    "하버드·MIT·스탠퍼드부터 UC·주립 명문까지, 미국 대학별 인재상·위치·합격률·시험 정책·얼리 전략·유학생 재정지원·인턴십 파이프라인을 한 페이지에 정리.",
  alternates: { canonical: "/parents/colleges" },
  robots: { index: false, follow: false },
};

export default function CollegesPage() {
  return <CollegesClient />;
}
