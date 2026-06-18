import SatTestClient from "./SatTestClient";
import { getSatForm, SAT_FULL_LENGTH_FORMS } from "@/lib/sat/forms";

export const metadata = {
  title: "SAT Practice Test (Bluebook Mode) — InHero",
  description: "Adaptive practice test in the digital SAT format — module timers, two-stage adaptive modules, Desmos calculator, and a 400–1600 projected score.",
};

export default async function SatTestPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string; attempt?: string }>;
}) {
  const { form, attempt } = await searchParams;
  const chosen = getSatForm(form) ?? SAT_FULL_LENGTH_FORMS[0];
  return <SatTestClient form={chosen} attemptId={attempt} />;
}
