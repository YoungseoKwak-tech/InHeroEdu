// Real AP exam Section I (multiple-choice) length + time per subject, used to
// shape Bluebook-style practice tests. Counts/minutes follow the 2026 AP
// Central exam-format pages. Do not add a subject here unless its Section I
// MCQ count and timing have been verified against the current official format.
export type ApCalculatorPolicy =
  | "none"
  | "all"
  | { startsAtQuestion: number; note: string };

export interface ApExamPart {
  label: string;
  startsAtQuestion: number;
  endsAtQuestion: number;
  minutes: number;
  calculator: boolean;
}

export interface ApExamSpec {
  mcq: number;
  minutes: number;
  calculator: ApCalculatorPolicy;
  parts?: ApExamPart[];
}

export const AP_EXAM_CONFIG: Record<string, ApExamSpec> = {
  "ap-biology": { mcq: 60, minutes: 90, calculator: "all" },
  "ap-chemistry": { mcq: 60, minutes: 90, calculator: "all" },
  "ap-environmental-science": { mcq: 80, minutes: 90, calculator: "all" },
  "ap-psychology": { mcq: 75, minutes: 90, calculator: "none" },
  "ap-us-government": { mcq: 55, minutes: 80, calculator: "none" },
  "ap-us-history": { mcq: 55, minutes: 55, calculator: "none" },
  "ap-world-history": { mcq: 55, minutes: 55, calculator: "none" },
  "ap-human-geography": { mcq: 60, minutes: 60, calculator: "none" },
  "ap-english-language": { mcq: 45, minutes: 60, calculator: "none" },
  "ap-microeconomics": { mcq: 60, minutes: 70, calculator: "all" },
  "ap-macroeconomics": { mcq: 60, minutes: 70, calculator: "all" },
  "ap-statistics": { mcq: 40, minutes: 90, calculator: "all" },
  "ap-calculus-ab": {
    mcq: 45,
    minutes: 105,
    calculator: { startsAtQuestion: 31, note: "Part A 1-30번은 계산기 금지, Part B 31-45번은 그래핑 계산기 필요." },
    parts: [
      { label: "Part A", startsAtQuestion: 1, endsAtQuestion: 30, minutes: 60, calculator: false },
      { label: "Part B", startsAtQuestion: 31, endsAtQuestion: 45, minutes: 45, calculator: true },
    ],
  },
  "ap-calculus-bc": {
    mcq: 45,
    minutes: 105,
    calculator: { startsAtQuestion: 31, note: "Part A 1-30번은 계산기 금지, Part B 31-45번은 그래핑 계산기 필요." },
    parts: [
      { label: "Part A", startsAtQuestion: 1, endsAtQuestion: 30, minutes: 60, calculator: false },
      { label: "Part B", startsAtQuestion: 31, endsAtQuestion: 45, minutes: 45, calculator: true },
    ],
  },
  "ap-computer-science-a": { mcq: 42, minutes: 90, calculator: "none" },
  "ap-physics-1": { mcq: 40, minutes: 80, calculator: "all" },
  "ap-physics-2": { mcq: 40, minutes: 80, calculator: "all" },
  "ap-physics-c-mechanics": { mcq: 40, minutes: 80, calculator: "all" },
  "ap-english-literature": { mcq: 55, minutes: 60, calculator: "none" },
  "ap-european-history": { mcq: 55, minutes: 55, calculator: "none" },
};

export const DEFAULT_EXAM_SPEC: ApExamSpec = { mcq: 50, minutes: 80, calculator: "none" };
export const PRACTICE_SETS = 5; // up to Test 1–5; the start screen and exam-set
// cap the count to however many non-overlapping sets a subject's pool supports.

export const AP_EXAM_COURSE_IDS = Object.keys(AP_EXAM_CONFIG);

export function isSupportedApExamCourse(courseId: string | null | undefined): courseId is keyof typeof AP_EXAM_CONFIG {
  return !!courseId && Object.prototype.hasOwnProperty.call(AP_EXAM_CONFIG, courseId);
}

export function examSpecFor(courseId: string | null | undefined): ApExamSpec {
  return (courseId && AP_EXAM_CONFIG[courseId]) || DEFAULT_EXAM_SPEC;
}

export function apExamPartsFor(courseId: string | null | undefined): ApExamPart[] {
  const spec = examSpecFor(courseId);
  return spec.parts ?? [
    {
      label: "Section I",
      startsAtQuestion: 1,
      endsAtQuestion: spec.mcq,
      minutes: spec.minutes,
      calculator: spec.calculator === "all",
    },
  ];
}

export function isApCalculatorAllowed(courseId: string | null | undefined, questionIndex: number): boolean {
  const parts = apExamPartsFor(courseId);
  const current = parts.find(
    (part) => questionIndex + 1 >= part.startsAtQuestion && questionIndex + 1 <= part.endsAtQuestion
  );
  if (current) return current.calculator;

  const policy = examSpecFor(courseId).calculator;
  if (policy === "all") return true;
  if (policy === "none") return false;
  return questionIndex + 1 >= policy.startsAtQuestion;
}

export function apCalculatorNote(courseId: string | null | undefined): string | null {
  const policy = examSpecFor(courseId).calculator;
  if (policy === "all") return "이 과목은 Section I에서 계산기를 사용할 수 있어요.";
  if (policy === "none") return null;
  return policy.note;
}
