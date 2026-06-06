/**
 * Upload authored question-bank seed files into the `questions` table.
 *
 *   node --env-file=.env.local scripts/question-bank-seed/upload.mjs [subject ...]
 *
 * Each JSON file in this directory is { subject, questions: [...] } where a
 * question is { unit, topic, difficulty, type, question_text,
 * option_a..option_e?, correct_answer, explanation }. The `unit` number is
 * stored as a `unit:N` tag (the questions table has no unit column) so the
 * bank can group authored questions by AP unit. Idempotent: skips rows whose
 * question_text already exists for that subject.
 */
import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const only = new Set(process.argv.slice(2));
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

let inserted = 0;
let skipped = 0;

for (const file of files) {
  const { subject, questions } = JSON.parse(readFileSync(join(dir, file), "utf8"));
  if (only.size && !only.has(subject)) continue;

  // PostgREST caps a select at 1000 rows, so page through every existing
  // question_text for this subject — otherwise rows beyond the first 1000
  // aren't recognized as duplicates and get re-inserted on every run.
  const seen = new Set();
  for (let from = 0; ; from += 1000) {
    const { data, error: exErr } = await sb
      .from("questions")
      .select("question_text")
      .eq("subject", subject)
      .order("question_text", { ascending: true })
      .range(from, from + 999);
    if (exErr) throw new Error(`${subject}: ${exErr.message}`);
    for (const r of data) seen.add(r.question_text);
    if (data.length < 1000) break;
  }

  const rows = questions
    .filter((q) => !seen.has(q.question_text))
    .map((q) => ({
      subject,
      topic: q.topic,
      difficulty: q.difficulty,
      type: q.type ?? "multiple_choice",
      question_text: q.question_text,
      option_a: q.option_a ?? null,
      option_b: q.option_b ?? null,
      option_c: q.option_c ?? null,
      option_d: q.option_d ?? null,
      option_e: q.option_e ?? null,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      tags: q.unit != null ? [`unit:${q.unit}`] : null,
    }));

  skipped += questions.length - rows.length;
  if (rows.length === 0) {
    console.log(`${subject}: nothing new (${questions.length} already present)`);
    continue;
  }

  const { error } = await sb.from("questions").insert(rows);
  if (error) throw new Error(`${subject}: ${error.message}`);
  inserted += rows.length;
  console.log(`${subject}: +${rows.length} (${file})`);
}

console.log(`\nDone. Inserted ${inserted}, skipped ${skipped} duplicates.`);
