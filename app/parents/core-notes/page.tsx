import type { Metadata } from "next";
import CoreNotesClient from "./CoreNotesClient";

export const metadata: Metadata = {
  title: "AP 개념정리 — InHero 학부모",
  description:
    "개념을 한눈에 이해되게 풀어낸 AP 개념정리. AP Chemistry는 일타강사 스타일 한국어로 완성, 다른 과목도 순차 한국어화 중.",
  alternates: { canonical: "/parents/core-notes" },
  robots: { index: false, follow: false },
};

export default function ParentCoreNotesPage() {
  return <CoreNotesClient />;
}
