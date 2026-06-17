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
    const n = (data as { subjects?: unknown[] }).subjects?.length ?? 0;
    console.log(`✓ ${name} — ${n} subjects`);
  } catch (e) {
    console.warn(`! ${name} — keeping existing JSON (build failed): ${(e as Error).message}`);
  }
}

async function main() {
  await writeSafely("questionBankSubjects.json", buildQuestionBank);
  await writeSafely("coreNotesSubjects.json", buildCoreNotes);
  console.log("done.");
}

main().then(() => process.exit(0)).catch(() => process.exit(0));
