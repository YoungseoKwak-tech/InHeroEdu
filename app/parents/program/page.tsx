import type { Metadata } from "next";
import ProgramClient from "./ProgramClient";

export const metadata: Metadata = {
  title: "Ivy League Operating System — InHero 시그니처 프로그램 | 학부모",
  description: "아이비리그 학생들은 무엇을 배우는가가 아니라 어떻게 배우는가. 자기발견 → 학습 → 사고 → 기회 → 빌더 → 아이비 블루프린트 6시즌, 매 강의마다 실제 결과물이 남는 트랜스포메이션 프로그램 + Researcher OS 트랙.",
  alternates: { canonical: "/parents/program" },
};

export default function ProgramPage() {
  return <ProgramClient />;
}
