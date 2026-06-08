import type { Metadata } from "next";
import MeClient from "./MeClient";

export const metadata: Metadata = {
  title: "나의 페이지 — InHero 학부모",
  description: "내 정보와 자녀 정보(학년·학교 유형)를 확인하고 수정하세요.",
  alternates: { canonical: "/parents/me" },
  robots: { index: false, follow: false },
};

export default function ParentMePage() {
  return <MeClient />;
}
