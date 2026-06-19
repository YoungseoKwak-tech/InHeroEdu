import precomputedSubjects from "../lib/data/precomputed/questionBankSubjects.json";
import {
  AP_EXAM_CONFIG,
  examSpecFor,
  isSupportedApExamCourse,
} from "../lib/apExamConfig";
import {
  DIGITAL_SAT_MODULE_SPEC,
  getSatForm,
  isFullLengthSatForm,
  SAT_FORMS,
  SAT_FULL_LENGTH_FORMS,
} from "../lib/sat/forms";

function fail(message: string): never {
  throw new Error(message);
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) fail(message);
}

const expectedApSectionI: Record<string, { mcq: number; minutes: number }> = {
  "ap-biology": { mcq: 60, minutes: 90 },
  "ap-chemistry": { mcq: 60, minutes: 90 },
  "ap-environmental-science": { mcq: 80, minutes: 90 },
  "ap-psychology": { mcq: 75, minutes: 90 },
  "ap-us-government": { mcq: 55, minutes: 80 },
  "ap-us-history": { mcq: 55, minutes: 55 },
  "ap-world-history": { mcq: 55, minutes: 55 },
  "ap-human-geography": { mcq: 60, minutes: 60 },
  "ap-english-language": { mcq: 45, minutes: 60 },
  "ap-microeconomics": { mcq: 60, minutes: 70 },
  "ap-macroeconomics": { mcq: 60, minutes: 70 },
  "ap-statistics": { mcq: 40, minutes: 90 },
  "ap-calculus-ab": { mcq: 45, minutes: 105 },
  "ap-calculus-bc": { mcq: 45, minutes: 105 },
  "ap-computer-science-a": { mcq: 42, minutes: 90 },
  "ap-physics-1": { mcq: 40, minutes: 80 },
  "ap-physics-2": { mcq: 40, minutes: 80 },
  "ap-physics-c-mechanics": { mcq: 40, minutes: 80 },
  "ap-english-literature": { mcq: 55, minutes: 60 },
  "ap-european-history": { mcq: 55, minutes: 55 },
};

for (const [courseId, expected] of Object.entries(expectedApSectionI)) {
  const actual = AP_EXAM_CONFIG[courseId];
  assert(actual, `Missing AP exam spec for ${courseId}`);
  assert(actual.mcq === expected.mcq, `${courseId} MCQ mismatch: ${actual.mcq} !== ${expected.mcq}`);
  assert(actual.minutes === expected.minutes, `${courseId} time mismatch: ${actual.minutes} !== ${expected.minutes}`);
}

for (const courseId of Object.keys(AP_EXAM_CONFIG)) {
  assert(courseId.startsWith("ap-"), `Non-AP course was added to AP exam config: ${courseId}`);
}

const calcAbPolicy = AP_EXAM_CONFIG["ap-calculus-ab"]?.calculator;
const calcBcPolicy = AP_EXAM_CONFIG["ap-calculus-bc"]?.calculator;
assert(typeof calcAbPolicy === "object" && calcAbPolicy.startsAtQuestion === 31, "AP Calc AB calculator policy must start at question 31");
assert(typeof calcBcPolicy === "object" && calcBcPolicy.startsAtQuestion === 31, "AP Calc BC calculator policy must start at question 31");

for (const courseId of ["ap-calculus-ab", "ap-calculus-bc"]) {
  const parts = AP_EXAM_CONFIG[courseId]?.parts ?? [];
  assert(parts.length === 2, `${courseId} must enforce two Section I parts`);
  assert(parts[0].startsAtQuestion === 1 && parts[0].endsAtQuestion === 30 && parts[0].minutes === 60 && !parts[0].calculator, `${courseId} Part A mismatch`);
  assert(parts[1].startsAtQuestion === 31 && parts[1].endsAtQuestion === 45 && parts[1].minutes === 45 && parts[1].calculator, `${courseId} Part B mismatch`);
}

assert(SAT_FULL_LENGTH_FORMS.length > 0, "No verified full-length SAT forms are exposed");
for (const form of SAT_FULL_LENGTH_FORMS) {
  assert(isFullLengthSatForm(form), `${form.id} is listed as full-length but fails official digital SAT module spec`);
}

for (const form of SAT_FORMS) {
  const verified = isFullLengthSatForm(form);
  if (!verified) assert(!getSatForm(form.id), `${form.id} is short but getSatForm still exposes it`);
}

assert(DIGITAL_SAT_MODULE_SPEC.rwQuestions === 27, "Digital SAT RW module question count changed unexpectedly");
assert(DIGITAL_SAT_MODULE_SPEC.rwTimeSec === 32 * 60, "Digital SAT RW module time changed unexpectedly");
assert(DIGITAL_SAT_MODULE_SPEC.mathQuestions === 22, "Digital SAT Math module question count changed unexpectedly");
assert(DIGITAL_SAT_MODULE_SPEC.mathTimeSec === 35 * 60, "Digital SAT Math module time changed unexpectedly");

const subjects = Array.isArray(precomputedSubjects.subjects) ? precomputedSubjects.subjects : [];
const apExamVisible = subjects.filter((subject) => {
  const courseId = subject.courseId;
  if (!courseId || !isSupportedApExamCourse(courseId) || !(subject.examReady ?? true)) return false;
  return (subject.examPool ?? subject.count) >= examSpecFor(courseId).mcq;
});

for (const subject of apExamVisible) {
  assert(subject.courseId?.startsWith("ap-"), `Non-AP subject would be visible in AP exam mode: ${subject.courseId}`);
}

const blockedNonAp = subjects
  .filter((subject) => subject.courseId && !subject.courseId.startsWith("ap-"))
  .map((subject) => subject.courseId);

console.log(JSON.stringify({
  ok: true,
  sat: {
    allForms: SAT_FORMS.length,
    fullLengthForms: SAT_FULL_LENGTH_FORMS.map((form) => form.id),
  },
  ap: {
    verifiedSpecs: Object.keys(expectedApSectionI).length,
    visibleSubjects: apExamVisible.map((subject) => subject.courseId),
  },
  nonApSubjectsKeptOutOfApExamMode: blockedNonAp.length,
}, null, 2));
