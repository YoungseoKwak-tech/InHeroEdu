import type { Metadata } from "next";
import AdmitsClient from "./AdmitsClient";

export const metadata: Metadata = {
  title: "합격 프로필 — 학교별 합격증·에세이 | InHero 학부모",
  description:
    "실제 합격생의 합격증(Admission Letter)과 Common App 메인 에세이·Supplemental 에세이를 학교별로. 코넬 공대 합격 원본 자료.",
  alternates: { canonical: "/parents/admits" },
  robots: { index: false, follow: false },
};

export default function ParentAdmitsPage() {
  return <AdmitsClient />;
}
