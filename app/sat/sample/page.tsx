import SampleExam, { type SampleItem } from "@/components/mock/SampleExam";
import { SAT_FORMS } from "@/lib/sat/forms";

export const metadata = {
  title: "SAT 모의고사 샘플 (무료 찍먹) — InHero",
  description: "디지털 SAT 모의고사가 어떤 형식인지 무료로 미리 풀어보세요. 실제 타이머·문제 네비게이터·표시 기능 그대로의 짧은 샘플.",
};

// Authentic taste — pulled straight from the real Practice Test 1 item bank, kept
// short so it's free. The full timed/adaptive exam lives behind the gate.
const MINT = "#00FFB2";

function buildItems(): SampleItem[] {
  const f = SAT_FORMS[0];
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

export default function SatSamplePage() {
  return (
    <SampleExam
      title="SAT 모의고사 샘플"
      sectionLabel="Digital SAT · 샘플"
      items={buildItems()}
      seconds={5 * 60}
      accent={MINT}
      fullHref="/parents/sat"
      fullLabel="전체 SAT 모의고사 이용권 보기 →"
    />
  );
}
