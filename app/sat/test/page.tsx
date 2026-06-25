import SatTestClient from "./SatTestClient";
import { DEFAULT_SAT_FORM_ID, hasSatForm } from "@/lib/sat/form-loader";

export const metadata = {
  title: "SAT Practice Test (Bluebook Mode)",
  description: "Adaptive practice test in the digital SAT format — module timers, two-stage adaptive modules, Desmos calculator, and a 400–1600 projected score.",
};

export default async function SatTestPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string; attempt?: string }>;
}) {
  const { form, attempt } = await searchParams;
  // Resolve to a known form id here (cheap, no payload). The heavy form data is
  // loaded on demand, client-side, inside the runner — so only the chosen
  // form's chunk is ever downloaded.
  const formId = hasSatForm(form) ? form! : DEFAULT_SAT_FORM_ID;
  return <SatTestClient formId={formId} attemptId={attempt} />;
}
