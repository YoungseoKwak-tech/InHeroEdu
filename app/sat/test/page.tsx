import SatTestClient from "./SatTestClient";
import { SAT_FORM_1 } from "@/lib/sat/form1";

export const metadata = {
  title: "SAT 모의고사 (Bluebook 모드) — InHero",
  description: "디지털 SAT 형식의 적응형 모의고사 — 모듈 타이머, 적응형 2단계, Desmos 계산기, 400–1600 예상 점수.",
};

export default function SatTestPage() {
  return <SatTestClient form={SAT_FORM_1} />;
}
