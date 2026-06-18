import SampleExam, { type SampleItem } from "@/components/mock/SampleExam";
import { getToeflForm } from "@/lib/toefl/forms";

export const metadata = {
  title: "TOEFL 모의고사 샘플 (무료 찍먹) — InHero",
  description: "TOEFL iBT 모의고사가 어떤 형식인지 무료로 미리 풀어보세요. 실제 Reading 지문·타이머·문제 네비게이터 그대로의 짧은 샘플.",
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
      title="TOEFL 모의고사 샘플"
      sectionLabel="TOEFL Reading · 샘플"
      items={buildItems()}
      seconds={6 * 60}
      accent={BLUE}
      fullHref="/toefl/test"
      fullLabel="전체 TOEFL 모의고사 이용권 보기 →"
    />
  );
}
