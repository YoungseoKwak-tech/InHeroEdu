/**
 * Upload authored question-bank seed files into the `questions` table.
 *
 *   node --env-file=.env.local scripts/question-bank-seed/upload.mjs [subject ...]
 *
 * Each JSON file in this directory is { subject, questions: [...] } where a
 * question is { topic, difficulty, type, question_text, option_a..option_e?,
 * correct_answer, explanation }. Idempotent: skips rows whose question_text
 * already exists for that subject.
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

  const { data: existing, error: exErr } = await sb
    .from("questions")
    .select("question_text")
    .eq("subject", subject);
  if (exErr) throw new Error(`${subject}: ${exErr.message}`);
  const seen = new Set((existing ?? []).map((r) => r.question_text));

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
