import SampleExam, { type SampleItem } from "@/components/mock/SampleExam";
import { getToeflForm } from "@/lib/toefl/forms";

export const metadata = {
  title: "TOEFL Practice Test Sample (Free) — InHero",
  description: "See what the TOEFL iBT practice test is like with a free preview. A short sample with a real Reading passage, timer, and question navigator.",
};

const BLUE = "#1f6feb";

// First reading passage + its first 3 items from the real form — a free taste of
// the actual Reading section format and timer.
function buildItems(): SampleItem[] {
  const form = getToeflForm();
  const set = form.reading[0];
  if (!set) return [];
  return set.questions.slice(0, 3).map((q) => ({
    passage: set.passage,
    qtype: q.qtype,
    prompt: q.prompt,
    choices: q.choices ?? [],
    correct: q.correct ?? 0,
    explanation: q.explanation,
  }));
}

export default function ToeflSamplePage() {
  return (
    <SampleExam
      title="TOEFL Practice Test Sample"
      sectionLabel="TOEFL Reading · Sample"
      items={buildItems()}
      seconds={6 * 60}
      accent={BLUE}
      fullHref="/toefl/test"
      fullLabel="See full TOEFL practice test access →"
    />
  );
}
