/**
 * Question Bank aggregator.
 *
 * Pulls every practice question InHero has authored into one normalized
 * list, from three sources:
 *
 *   1. lesson_scripts.chapter_json.generated_questions — the full MCQ set
 *      generated for every script-generated lesson, across ALL subjects
 *      (~1,600 MCQs: Bio, Chem, Physics, Calc, USH). Each has choices, the
 *      correct letter, and an explanation. Siblings in the same lesson are
 *      paired as each other's "similar problem."
 *   2. lesson overlays (the AP Bio inline checks):
 *        - tap_quick      → 1 MCQ + a built-in `followup` (similar problem)
 *        - question_sprint → an array of MCQs, each with an explanation
 *   3. the admin `questions` table (manually authored bank questions)
 *
 * Every item carries its options, the correct flag, per-option feedback,
 * an explanation, and — when one exists — a `similar` question so a wrong
 * answer can immediately offer "try one like it," mirroring the in-lesson
 * experience.
 *
 * Server-side only (uses the admin client).
 */
import { createAdminClient } from "@/lib/supabase";
import { inferCourseIdFromLessonId } from "@/lib/learning-tracking";
import { getCourseIdVariants } from "@/lib/courseAliases";
import { courses } from "@/lib/data/courses";
import { normalizeCourseAccessSubjectId } from "@/lib/course-access";

export interface BankOption {
  label: string;
  correct: boolean;
  feedback?: string | null;
}

export interface BankQuestion {
  id: string;
  source: "lesson" | "admin";
  courseId: string | null;
  subjectLabel: string;
  emoji: string;
  lessonId: string | null;
  unit: number | null;
  prompt: string;
  options: BankOption[];
  explanation?: string | null;
  /** Pre-authored Korean solution, shown verbatim instead of on-demand translation. */
  explanationKorean?: string | null;
  /** A near-variant to offer when the student answers wrong. */
  similar?: { prompt: string; options: BankOption[] } | null;
  /** easy | medium | hard (authored `questions` rows); null for lesson-derived. */
  difficulty?: string | null;
}

const courseMeta = new Map(
  courses.map((c) => [c.id, { label: c.subjectEn, emoji: c.icon }])
);

function metaFor(courseId: string | null): { label: string; emoji: string } {
  if (courseId && courseMeta.has(courseId)) return courseMeta.get(courseId)!;
  return { label: courseId ?? "General", emoji: "📘" };
}

function unitFromLessonId(lessonId: string | null): number | null {
  if (!lessonId) return null;
  const m = lessonId.match(/-u(\d+)-l\d+/i);
  return m ? parseInt(m[1], 10) : null;
}

/** Clean an overlay options array of {label, correct, feedback}. */
function normTapOptions(raw: unknown): BankOption[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((o): o is Record<string, unknown> => !!o && typeof o === "object")
    .map((o) => ({
      label: String(o.label ?? "").trim(),
      correct: o.correct === true,
      feedback: typeof o.feedback === "string" ? o.feedback : null,
    }))
    .filter((o) => o.label.length > 0);
}

interface OverlayRow {
  id: string;
  lesson_id: string;
  type: string;
  data: Record<string, unknown> | null;
}

function fromTapQuick(row: OverlayRow): BankQuestion | null {
  const d = row.data ?? {};
  const prompt = String(d.question ?? "").trim();
  const options = normTapOptions(d.options);
  if (!prompt || options.length < 2 || !options.some((o) => o.correct)) return null;

  const courseId = inferCourseIdFromLessonId(row.lesson_id);
  const meta = metaFor(courseId);

  let similar: BankQuestion["similar"] = null;
  const fu = d.followup;
  if (fu && typeof fu === "object") {
    const fObj = fu as Record<string, unknown>;
    const fPrompt = String(fObj.question ?? "").trim();
    const fOpts = normTapOptions(fObj.options);
    if (fPrompt && fOpts.length >= 2) similar = { prompt: fPrompt, options: fOpts };
  }

  return {
    id: `lesson:${row.id}`,
    source: "lesson",
    courseId,
    subjectLabel: meta.label,
    emoji: meta.emoji,
    lessonId: row.lesson_id,
    unit: unitFromLessonId(row.lesson_id),
    prompt,
    options,
    explanation: typeof d.hint === "string" ? d.hint : null,
    similar,
  };
}

function fromQuestionSprint(row: OverlayRow): BankQuestion[] {
  const d = row.data ?? {};
  const list = Array.isArray(d.questions) ? d.questions : [];
  const courseId = inferCourseIdFromLessonId(row.lesson_id);
  const meta = metaFor(courseId);
  const unit = unitFromLessonId(row.lesson_id);

  const parsed = list
    .filter((q): q is Record<string, unknown> => !!q && typeof q === "object")
    .map((q) => {
      const prompt = String(q.question ?? "").trim();
      const rawOpts = Array.isArray(q.options) ? q.options : [];
      const correctIdx = typeof q.correct === "number" ? q.correct : -1;
      const options: BankOption[] = rawOpts.map((o, i) => ({
        label: String(o ?? "").trim(),
        correct: i === correctIdx,
      }));
      return {
        prompt,
        options,
        explanation: typeof q.explanation === "string" ? q.explanation : null,
      };
    })
    .filter((q) => q.prompt && q.options.length >= 2 && q.options.some((o) => o.correct));

  // Pair siblings in the same sprint as each other's "similar" question.
  return parsed.map((q, i) => {
    const sib = parsed[(i + 1) % parsed.length];
    const similar =
      parsed.length > 1 && sib ? { prompt: sib.prompt, options: sib.options } : null;
    return {
      id: `lesson:${row.id}:${i}`,
      source: "lesson" as const,
      courseId,
      subjectLabel: meta.label,
      emoji: meta.emoji,
      lessonId: row.lesson_id,
      unit,
      prompt: q.prompt,
      options: q.options,
      explanation: q.explanation,
      similar,
    };
  });
}

interface ScriptRow {
  lesson_id: string;
  chapter_json: Record<string, unknown> | null;
}

/** Pull the generated_questions.mcq array out of a lesson_scripts row. */
function fromGeneratedQuestions(row: ScriptRow): BankQuestion[] {
  const cj = row.chapter_json;
  if (!cj || typeof cj !== "object") return [];
  const gq = (cj as Record<string, unknown>).generated_questions;
  if (!gq || typeof gq !== "object") return [];
  const mcq = (gq as Record<string, unknown>).mcq;
  if (!Array.isArray(mcq)) return [];

  const courseId = inferCourseIdFromLessonId(row.lesson_id);
  const meta = metaFor(courseId);
  const unit = unitFromLessonId(row.lesson_id);

  const parsed = mcq
    .filter((q): q is Record<string, unknown> => !!q && typeof q === "object")
    .map((q) => {
      const prompt = String(q.question ?? "").trim();
      const choices = q.choices;
      const answer = String(q.answer ?? "").trim().toUpperCase();
      const options: BankOption[] = [];
      if (choices && typeof choices === "object" && !Array.isArray(choices)) {
        for (const letter of ["A", "B", "C", "D", "E"]) {
          const label = (choices as Record<string, unknown>)[letter];
          if (typeof label === "string" && label.trim()) {
            options.push({ label: label.trim(), correct: letter === answer });
          }
        }
      }
      return {
        prompt,
        options,
        explanation: typeof q.explanation === "string" ? q.explanation : null,
      };
    })
    .filter((q) => q.prompt && q.options.length >= 2 && q.options.some((o) => o.correct));

  // Pair siblings in the same lesson as each other's "similar" question.
  return parsed.map((q, i) => {
    const sib = parsed[(i + 1) % parsed.length];
    const similar =
      parsed.length > 1 && sib ? { prompt: sib.prompt, options: sib.options } : null;
    return {
      id: `script:${row.lesson_id}:${i}`,
      source: "lesson" as const,
      courseId,
      subjectLabel: meta.label,
      emoji: meta.emoji,
      lessonId: row.lesson_id,
      unit,
      prompt: q.prompt,
      options: q.options,
      explanation: q.explanation,
      similar,
    };
  });
}

interface AdminQuestionRow {
  id: string;
  subject: string | null;
  topic: string | null;
  question_text: string | null;
  option_a: string | null;
  option_b: string | null;
  option_c: string | null;
  option_d: string | null;
  option_e: string | null;
  correct_answer: string | null;
  explanation: string | null;
  explanation_korean: string | null;
  difficulty: string | null;
  tags: string[] | null;
}

/** Authored bank questions carry their AP unit as a `unit:N` tag (the
 *  questions table has no unit column). Pull it back out as a number so
 *  these sit alongside lesson-derived questions under the same unit. */
function unitFromTags(tags: string[] | null): number | null {
  if (!Array.isArray(tags)) return null;
  for (const t of tags) {
    const m = /^unit:(\d+)$/i.exec(String(t).trim());
    if (m) return parseInt(m[1], 10);
  }
  return null;
}

function fromAdminRow(row: AdminQuestionRow): BankQuestion | null {
  const prompt = (row.question_text ?? "").trim();
  if (!prompt) return null;
  const letters = ["A", "B", "C", "D", "E"] as const;
  const labels = [row.option_a, row.option_b, row.option_c, row.option_d, row.option_e];
  const correct = (row.correct_answer ?? "").trim().toUpperCase();
  const options: BankOption[] = labels
    .map((label, i) => ({
      label: (label ?? "").trim(),
      correct: letters[i] === correct,
    }))
    .filter((o) => o.label.length > 0);
  if (options.length < 2 || !options.some((o) => o.correct)) return null;

  const courseId = normalizeCourseAccessSubjectId(row.subject);
  const meta = metaFor(courseId);

  // Admin subjects may use ap_bio-style ids; normalize them so access
  // checks and subject filters use the same course id vocabulary.
  return {
    id: `admin:${row.id}`,
    source: "admin",
    courseId,
    subjectLabel: courseId ? meta.label : row.subject ?? row.topic ?? "Question Bank",
    emoji: courseId ? meta.emoji : "🏦",
    lessonId: null,
    unit: unitFromTags(row.tags),
    prompt,
    options,
    explanation: row.explanation,
    explanationKorean: row.explanation_korean,
    similar: null,
    difficulty: row.difficulty ?? null,
  };
}

function applyQuestionCorrections(q: BankQuestion): BankQuestion {
  if (q.id !== "script:ap-biology-u1-l8:1") return q;

  return {
    ...q,
    options: q.options.map((option, index) => {
      if (index === 1) {
        return {
          ...option,
          label: "Water leaves the cell because the cell has higher water potential than the solution",
          correct: true,
        };
      }
      return { ...option, correct: false };
    }),
    explanation:
      "Cell water potential = -0.7 MPa + 0.3 MPa = -0.4 MPa. The solution has water potential of -0.5 MPa. Water moves from higher water potential to lower water potential, so water moves from the cell (-0.4 MPa) into the solution (-0.5 MPa). Choice B is correct.",
  };
}

/**
 * The full aggregation is expensive (parses every lesson's chapter_json),
 * but the data only changes when admin regenerates scripts. Cache the
 * built array in-module with a TTL. On Vercel Fluid Compute instances are
 * reused across requests, so after the first build every subsequent
 * request — countOnly AND every subject filter — is served from memory
 * instead of re-querying + re-parsing.
 */
const BANK_TTL_MS = 10 * 60 * 1000; // 10 minutes
let bankCache: { at: number; data: BankQuestion[] } | null = null;
let bankInFlight: Promise<BankQuestion[]> | null = null;

// Per-subject builds. The full aggregation is ~170k rows (~60s cold), but the
// big `questions` table is keyed by course-id subjects, so a single subject can
// be fetched + built in ~1-2s. Keyed by normalized course id; concurrent
// callers for the same subject share one build.
const subjectBankCache = new Map<string, { at: number; data: BankQuestion[] }>();
const subjectBankInFlight = new Map<string, Promise<BankQuestion[]>>();

// PostgREST caps a single select at 1000 rows, so every table that can exceed
// that (the questions bank especially) must be read in pages or the bank
// silently sees only the first 1000 rows.
async function selectAllPaged<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  build: () => any
): Promise<T[]> {
  const PAGE = 1000;
  const rows: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await build().range(from, from + PAGE - 1);
    if (error) throw error;
    const batch = (data ?? []) as T[];
    rows.push(...batch);
    if (batch.length < PAGE) break;
  }
  return rows;
}

async function rebuildBank(): Promise<BankQuestion[]> {
  const supabase = createAdminClient();

  const [scriptRows, overlayRows, adminRows] = await Promise.all([
    selectAllPaged<ScriptRow>(() =>
      supabase
        .from("lesson_scripts")
        .select("lesson_id, chapter_json")
        .order("lesson_id", { ascending: true })
    ),
    selectAllPaged<OverlayRow>(() =>
      supabase
        .from("overlays")
        .select("id, lesson_id, type, data")
        .in("type", ["tap_quick", "question_sprint"])
        .order("id", { ascending: true })
    ),
    selectAllPaged<AdminQuestionRow>(() =>
      supabase
        .from("questions")
        .select(
          "id, subject, topic, question_text, option_a, option_b, option_c, option_d, option_e, correct_answer, explanation, explanation_korean, difficulty, tags"
        )
        .order("id", { ascending: true })
    ),
  ]);
  const scriptRes = { data: scriptRows };
  const overlayRes = { data: overlayRows };
  const adminRes = { data: adminRows };

  const out: BankQuestion[] = [];

  // Primary source: generated MCQs across every subject.
  for (const row of (scriptRes.data ?? []) as ScriptRow[]) {
    out.push(...fromGeneratedQuestions(row));
  }
  // Inline lesson checks (AP Bio) — carry authored followups (similar Qs).
  for (const row of (overlayRes.data ?? []) as OverlayRow[]) {
    if (row.type === "tap_quick") {
      const q = fromTapQuick(row);
      if (q) out.push(q);
    } else if (row.type === "question_sprint") {
      out.push(...fromQuestionSprint(row));
    }
  }
  // Admin-authored bank questions.
  for (const row of (adminRes.data ?? []) as AdminQuestionRow[]) {
    const q = fromAdminRow(row);
    if (q) out.push(q);
  }

  const corrected = out.map(applyQuestionCorrections);

  // Stable-ish ordering: subject, then unit, then prompt.
  corrected.sort((a, b) => {
    if (a.subjectLabel !== b.subjectLabel) return a.subjectLabel.localeCompare(b.subjectLabel);
    if ((a.unit ?? 99) !== (b.unit ?? 99)) return (a.unit ?? 99) - (b.unit ?? 99);
    return a.prompt.localeCompare(b.prompt);
  });

  return corrected;
}

/** Full normalized bank, cached. Concurrent callers share one rebuild. */
export async function getAllBankQuestions(): Promise<BankQuestion[]> {
  if (bankCache && Date.now() - bankCache.at < BANK_TTL_MS) {
    return bankCache.data;
  }
  if (bankInFlight) return bankInFlight;
  bankInFlight = rebuildBank()
    .then((data) => {
      bankCache = { at: Date.now(), data };
      return data;
    })
    .finally(() => {
      bankInFlight = null;
    });
  return bankInFlight;
}

/**
 * Build only one subject's questions by filtering the heavy tables to that
 * course up front — avoids the ~60s full build on a cold start. `variants` are
 * the course-id forms (e.g. ["ap-biology","ap-bio"]) used by lesson_ids and the
 * `questions.subject` column.
 */
async function rebuildBankForSubject(variants: string[]): Promise<BankQuestion[]> {
  const supabase = createAdminClient();
  // PostgREST `or` of like-patterns on the lesson_id prefix (lesson_scripts /
  // overlays) + an `in` on the subject column (the big admin `questions` table).
  const orLessonId = variants.map((v) => `lesson_id.like.${v}-*`).join(",");

  const [scriptRows, overlayRows, adminRows] = await Promise.all([
    selectAllPaged<ScriptRow>(() =>
      supabase
        .from("lesson_scripts")
        .select("lesson_id, chapter_json")
        .or(orLessonId)
        .order("lesson_id", { ascending: true })
    ),
    selectAllPaged<OverlayRow>(() =>
      supabase
        .from("overlays")
        .select("id, lesson_id, type, data")
        .in("type", ["tap_quick", "question_sprint"])
        .or(orLessonId)
        .order("id", { ascending: true })
    ),
    selectAllPaged<AdminQuestionRow>(() =>
      supabase
        .from("questions")
        .select(
          "id, subject, topic, question_text, option_a, option_b, option_c, option_d, option_e, correct_answer, explanation, explanation_korean, difficulty, tags"
        )
        .in("subject", variants)
        .order("id", { ascending: true })
    ),
  ]);

  const out: BankQuestion[] = [];
  for (const row of scriptRows) out.push(...fromGeneratedQuestions(row));
  for (const row of overlayRows) {
    if (row.type === "tap_quick") {
      const q = fromTapQuick(row);
      if (q) out.push(q);
    } else if (row.type === "question_sprint") {
      out.push(...fromQuestionSprint(row));
    }
  }
  for (const row of adminRows) {
    const q = fromAdminRow(row);
    if (q) out.push(q);
  }

  // Keep only this subject's questions (admin subject forms outside `variants`
  // can't appear here, but generated/overlay courseIds are filtered to be safe).
  const filtered = out
    .filter((q) => q.courseId && variants.includes(q.courseId))
    .map(applyQuestionCorrections);
  filtered.sort((a, b) => {
    if ((a.unit ?? 99) !== (b.unit ?? 99)) return (a.unit ?? 99) - (b.unit ?? 99);
    return a.prompt.localeCompare(b.prompt);
  });
  return filtered;
}

/**
 * Build the normalized bank. `subject` filters by course id
 * (e.g. "ap-biology"); omit for everything.
 *
 * Fast paths, in order: (1) the full bank is already warm → filter in memory;
 * (2) this subject is cached → return it; (3) build just this subject from
 * filtered queries (~1-2s) instead of the whole ~170k-row bank (~60s). Falls
 * back to the full build only if the per-subject build comes back empty (a
 * variant-mapping miss), so a real subject can never render blank.
 */
export async function buildBankQuestions(subject?: string): Promise<BankQuestion[]> {
  if (!subject) return getAllBankQuestions();

  const normalizedSubject = normalizeCourseAccessSubjectId(subject) ?? subject;
  const subjectVariants = getCourseIdVariants(normalizedSubject);
  const filterWarm = (all: BankQuestion[]) =>
    all.filter((q) => q.courseId && subjectVariants.includes(q.courseId));

  // (1) Full bank already built this instance → just filter it (instant).
  if (bankCache && Date.now() - bankCache.at < BANK_TTL_MS) {
    return filterWarm(bankCache.data);
  }

  // (2) Per-subject cache / in-flight de-dupe.
  const cached = subjectBankCache.get(normalizedSubject);
  if (cached && Date.now() - cached.at < BANK_TTL_MS) return cached.data;
  const inFlight = subjectBankInFlight.get(normalizedSubject);
  if (inFlight) return inFlight;

  // (3) Build just this subject.
  const p = rebuildBankForSubject(subjectVariants)
    .then(async (data) => {
      // Safety net: empty likely means a variant/prefix mismatch, not a truly
      // empty subject — fall back to the full build so we never render blank.
      if (data.length === 0) {
        return filterWarm(await getAllBankQuestions());
      }
      subjectBankCache.set(normalizedSubject, { at: Date.now(), data });
      return data;
    })
    .finally(() => {
      subjectBankInFlight.delete(normalizedSubject);
    });
  subjectBankInFlight.set(normalizedSubject, p);
  return p;
}

/** Per-course counts for the landing chips. */
export function countBySubject(questions: BankQuestion[]): Array<{
  courseId: string | null;
  label: string;
  emoji: string;
  count: number;
}> {
  const map = new Map<string, { courseId: string | null; label: string; emoji: string; count: number }>();
  for (const q of questions) {
    const key = q.courseId ?? q.subjectLabel;
    const cur = map.get(key);
    if (cur) cur.count += 1;
    else map.set(key, { courseId: q.courseId, label: q.subjectLabel, emoji: q.emoji, count: 1 });
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}
