import type { Metadata } from "next";
import ReplayClient from "./ReplayClient";

export const metadata: Metadata = {
  title: "무료 세미나 다시보기 — 아이비리그 자기주도 완전정복 | InHero 학부모",
  description: "사교육 없이 코넬 공대에 간 학생의 무료 세미나 풀영상 다시보기 + 발표자료(PDF). 로그인하면 바로 시청.",
  alternates: { canonical: "/parents/seminar/replay" },
  robots: { index: false, follow: false },
};

export default function SeminarReplayPage() {
  return <ReplayClient />;
}
