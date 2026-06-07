import type { Metadata } from "next";
import ParentsClient from "./ParentsClient";

export const metadata: Metadata = {
  title: "미국 대학 입시 자료실 — InHero 학부모 전용",
  description:
    "아이비리그 선배들이 만든 AP·SAT 자료실. 11,975개 실전 문제, 일타강사 스타일 핵심 노트, AP 디지털 교재까지. 자녀의 미국 대학 입시를 위한 핵심 자료를 한눈에.",
  alternates: { canonical: "/parents" },
  openGraph: {
    title: "미국 대학 입시 자료실 — InHero 학부모 전용",
    description:
      "아이비리그 선배들이 만든 AP·SAT 자료실. 11,975개 실전 문제 · 핵심 노트 · AP 디지털 교재.",
    type: "website",
    url: "https://inheroedu.com/parents",
  },
  robots: { index: false, follow: false }, // "secret" shareable link — not indexed
};

export default function ParentsPage() {
  return <ParentsClient />;
}
