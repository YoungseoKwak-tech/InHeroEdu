/**
 * Precompute the subject-list payloads for the exam (question bank) and Core
 * Notes grids into static JSON, so the runtime serves them INSTANTLY instead of
 * rebuilding the whole dataset on every cold start.
 *
 * Why: /api/question-bank/{bank?countOnly,subjects} call getAllBankQuestions()
 * (~12s to build ~12k MCQs) and /api/core-notes?countOnly calls
 * getAllCoreNotes() (pages the lesson_scripts table). Those counts only change
 * on deploy, so we compute them once here and ship the result.
 *
 * Output: lib/data/precomputed/{questionBankSubjects.json, coreNotesSubjects.json}
 *
 * Fail-safe: any error leaves the existing committed JSON untouched and exits 0,
 * so a flaky DB during a deploy's prebuild can never break the build.
 *
 *   npx tsx scripts/precompute-subject-lists.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Load .env.local so the data builders that hit Supabase have credentials.
(function loadEnv() {
  try {
    const text = readFileSync(".env.local", "utf8");
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const k = line.slice(0, eq);
      if (!process.env[k]) process.env[k] = line.slice(eq + 1).replace(/^"|"$/g, "");
    }
  } catch { /* no .env.local (CI uses real env) */ }
})();

const OUT = join(process.cwd(), "lib", "data", "precomputed");
const MIN_EXAM_MCQ = 30; // keep in sync with /api/question-bank/subjects
// First N valid questions per subject, shipped as a static free sample so the
// /parents bank renders INSTANTLY (no ~12s pool build on cold start). 10 are
// served free; the extra few act as the locked teaser behind the paywall.
const PREVIEW_PER_SUBJECT = 14;

async function buildQuestionBank() {
  const { getAllBankQuestions, countBySubject } = await import("@/lib/questionBank");
  const all = await getAllBankQuestions();
  const base = countBySubject(all);
  const validByKey = new Map<string, number>();
  for (const q of all) {
    if (Array.isArray(q.options) && q.options.length >= 2) {
      const key = q.courseId ?? q.subjectLabel;
      validByKey.set(key, (validByKey.get(key) ?? 0) + 1);
    }
  }
  const subjects = base.map((s) => {
    const key = s.courseId ?? s.label;
    const examPool = validByKey.get(key) ?? 0;
    return { ...s, examPool, examReady: examPool >= MIN_EXAM_MCQ };
  });
  return { subjects, total: all.length };
}

// Static preview payload keyed by the bank course id: per-subject unit counts +
// the first PREVIEW_PER_SUBJECT valid questions (fully shaped). Served verbatim
// for the default (locked) browse so cold loads are instant.
async function buildQuestionBankPreview() {
  const { getAllBankQuestions } = await import("@/lib/questionBank");
  const all = await getAllBankQuestions();
  const byCourse = new Map<string, typeof all>();
  for (const q of all) {
    if (!q.courseId) continue;
    if (!Array.isArray(q.options) || q.options.length < 2) continue;
    const arr = byCourse.get(q.courseId) ?? [];
    arr.push(q);
    byCourse.set(q.courseId, arr);
  }
  const out: Record<string, unknown> = {};
  for (const [courseId, qs] of byCourse) {
    const unitCounts = new Map<number, number>();
    for (const q of qs) if (q.unit != null) unitCounts.set(q.unit, (unitCounts.get(q.unit) ?? 0) + 1);
    const units = [...unitCounts.entries()].map(([unit, count]) => ({ unit, count })).sort((a, b) => a.unit - b.unit);
    const questions = qs.slice(0, PREVIEW_PER_SUBJECT).map((q) => ({
      id: q.id, subjectLabel: q.subjectLabel, emoji: q.emoji, unit: q.unit,
      prompt: q.prompt, options: q.options, explanation: q.explanation ?? null,
      explanationKorean: q.explanationKorean ?? null, similar: q.similar ?? null,
    }));
    out[courseId] = { label: qs[0]?.subjectLabel ?? courseId, emoji: qs[0]?.emoji ?? "📘", total: qs.length, units, questions };
  }
  return out;
}

async function buildCoreNotes() {
  const { getAllCoreNotes, countBySubject } = await import("@/lib/coreNotes");
  const all = await getAllCoreNotes();
  return { subjects: countBySubject(all), total: all.length };
}

async function writeSafely(name: string, build: () => Promise<unknown>) {
  try {
    const data = await build();
    mkdirSync(OUT, { recursive: true });
    writeFileSync(join(OUT, name), JSON.stringify(data, null, 2), "utf8");
    const n = Array.isArray((data as { subjects?: unknown[] }).subjects)
      ? (data as { subjects: unknown[] }).subjects.length
      : data && typeof data === "object" && !Array.isArray(data)
        ? Object.keys(data).length
        : 0;
    console.log(`✓ ${name} — ${n} subjects`);
  } catch (e) {
    console.warn(`! ${name} — keeping existing JSON (build failed): ${(e as Error).message}`);
  }
}

async function main() {
  await writeSafely("questionBankSubjects.json", buildQuestionBank);
  await writeSafely("questionBankPreview.json", buildQuestionBankPreview);
  await writeSafely("coreNotesSubjects.json", buildCoreNotes);
  console.log("done.");
}

main().then(() => process.exit(0)).catch(() => process.exit(0));
