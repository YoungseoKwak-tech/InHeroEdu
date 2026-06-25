import SampleExam, { type SampleItem } from "@/components/mock/SampleExam";
import { loadSatForm, DEFAULT_SAT_FORM_ID } from "@/lib/sat/form-loader";
import type { SatForm } from "@/lib/sat/types";

export const metadata = {
  title: "SAT Practice Test Sample (Free Preview)",
  description: "Get a free preview of what the digital SAT practice test feels like. A short sample with the real timer, question navigator, and mark-for-review features.",
};

// Authentic taste — pulled straight from the real Practice Test 1 item bank, kept
// short so it's free. The full timed/adaptive exam lives behind the gate.
const MINT = "#00FFB2";

function buildItems(f: SatForm): SampleItem[] {
  const rw = (f?.rw.m1 ?? []).filter((q) => q.type === "mcq").slice(0, 2);
  const math = (f?.math.m1 ?? []).filter((q) => q.type === "mcq").slice(0, 1);
  return [...rw, ...math].map((q) => ({
    passage: q.passage,
    qtype: q.domain,
    prompt: q.prompt,
    choices: q.choices ?? [],
    correct: q.correct ?? 0,
    explanation: q.explanation,
  }));
}

export default async function SatSamplePage() {
  // Server-side, on-demand load of just the first form's chunk for the preview.
  const f = await loadSatForm(DEFAULT_SAT_FORM_ID);
  return (
    <SampleExam
      title="SAT Practice Test Sample"
      sectionLabel="Digital SAT · Sample"
      items={buildItems(f)}
      seconds={5 * 60}
      accent={MINT}
      fullHref="/parents/sat"
      fullLabel="See full SAT practice test plans →"
    />
  );
}
