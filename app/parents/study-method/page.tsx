import type { Metadata } from "next";
import StudyMethodClient from "./StudyMethodClient";

export const metadata: Metadata = {
  title: "자기주도 공부법 — InHero 학부모",
  description: "학원·과외 없이 아이비리그 공대까지 간 자기주도 공부법 — 계획·복습·개념정리·시험 전략을 학생이 스스로 굴리는 시스템.",
  alternates: { canonical: "/parents/study-method" },
};

export default function ParentStudyMethodPage() {
  return <StudyMethodClient />;
}
