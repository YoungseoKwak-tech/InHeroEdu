import type { Metadata } from "next";
import SatClient from "./SatClient";

export const metadata: Metadata = {
  title: "디지털 SAT 적응형 모의고사 (Bluebook 모드) — InHero 학부모",
  description:
    "실제 Bluebook처럼 적응형 2단계 모듈·타이머·Desmos 계산기·grid-in·400–1600 예상 점수를 갖춘 디지털 SAT 모의고사. 자녀가 무료로 실전처럼 연습할 수 있어요.",
  alternates: { canonical: "/parents/sat" },
  robots: { index: false, follow: false },
};

export default function ParentsSatPage() {
  return <SatClient />;
}
