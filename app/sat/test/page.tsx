import SatTestClient from "./SatTestClient";
import { getSatForm, SAT_FORMS } from "@/lib/sat/forms";

export const metadata = {
  title: "SAT 모의고사 (Bluebook 모드) — InHero",
  description: "디지털 SAT 형식의 적응형 모의고사 — 모듈 타이머, 적응형 2단계, Desmos 계산기, 400–1600 예상 점수.",
};

export default async function SatTestPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string }>;
}) {
  const { form } = await searchParams;
  const chosen = getSatForm(form) ?? SAT_FORMS[0];
  return <SatTestClient form={chosen} />;
}
