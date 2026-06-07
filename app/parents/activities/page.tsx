import type { Metadata } from "next";
import ActivitiesClient from "./ActivitiesClient";

export const metadata: Metadata = {
  title: "아이비리그 합격 엑스트라 활동 — Common App 활동 리스트 분석 | InHero 학부모",
  description:
    "실제 아이비리그 합격생의 Common App 활동 10개를 공개하고, 각 활동을 직접 만드는 법까지. 책 출간(Amazon KDP)·논문(JEI·JSR)·웹 프로젝트 등 단계별 실행 가이드와 스토리 전략.",
  alternates: { canonical: "/parents/activities" },
  robots: { index: false, follow: false },
};

export default function ActivitiesPage() {
  return <ActivitiesClient />;
}
