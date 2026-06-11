/**
 * Import a JSON array of bank questions into the `questions` table.
 * Usage: node --env-file=.env.local scripts/question-bank-seed/_insert.mjs <file.json> [...more]
 *
 * Each item: { subject, topic, difficulty, type?, question_text,
 *   option_a, option_b, option_c, option_d, option_e?, correct_answer (A-E),
 *   explanation, explanation_korean?, unit? (number) }
 * Dedupes against existing rows by (subject, question_text).
 */
import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error("missing supabase env"); process.exit(1); }
const sb = createClient(url, key, { auth: { persistSession: false } });

const files = process.argv.slice(2);
if (!files.length) { console.error("no files"); process.exit(1); }

function norm(q) {
  const ca = String(q.correct_answer ?? "").trim().toUpperCase();
  if (!q.question_text || !q.option_a || !q.option_b || !q.option_c || !q.option_d) return null;
  if (!["A", "B", "C", "D", "E"].includes(ca)) return null;
  const tags = [];
  if (q.unit != null && Number.isFinite(Number(q.unit))) tags.push(`unit:${Number(q.unit)}`);
  if (Array.isArray(q.tags)) for (const t of q.tags) if (typeof t === "string") tags.push(t);
  return {
    subject: String(q.subject).trim(),
    topic: q.topic ? String(q.topic).trim() : null,
    difficulty: q.difficulty ? String(q.difficulty).trim() : "medium",
    type: q.type ? String(q.type).trim() : "mcq",
    question_text: String(q.question_text).trim(),
    option_a: String(q.option_a), option_b: String(q.option_b),
    option_c: String(q.option_c), option_d: String(q.option_d),
    option_e: q.option_e != null ? String(q.option_e) : null,
    correct_answer: ca,
    explanation: q.explanation ? String(q.explanation) : null,
    explanation_korean: q.explanation_korean ? String(q.explanation_korean) : null,
    tags: tags.length ? tags : null,
  };
}

let totalIn = 0, totalInserted = 0, totalSkipped = 0;
for (const file of files) {
  let arr;
  try { arr = JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) { console.error("bad json", file, e.message); continue; }
  if (!Array.isArray(arr)) { console.error("not array", file); continue; }
  const rows = arr.map(norm).filter(Boolean);
  totalIn += rows.length;
  // dedupe within file by question_text
  const seen = new Set();
  const dedup = rows.filter((r) => { const k = r.subject + "||" + r.question_text; if (seen.has(k)) return false; seen.add(k); return true; });

  // skip ones already in DB (by subject+question_text)
  const bySubject = new Map();
  for (const r of dedup) { const a = bySubject.get(r.subject) ?? []; a.push(r); bySubject.set(r.subject, a); }
  const toInsert = [];
  for (const [subject, list] of bySubject) {
    const existing = new Set();
    for (let i = 0; i < list.length; i += 500) {
      const chunk = list.slice(i, i + 500);
      const { data } = await sb.from("questions").select("question_text").eq("subject", subject).in("question_text", chunk.map((r) => r.question_text));
      (data ?? []).forEach((d) => existing.add(d.question_text));
    }
    for (const r of list) { if (!existing.has(r.question_text)) toInsert.push(r); else totalSkipped++; }
  }

  for (let i = 0; i < toInsert.length; i += 500) {
    const chunk = toInsert.slice(i, i + 500);
    const { error } = await sb.from("questions").insert(chunk);
    if (error) { console.error("insert error", file, error.message); break; }
    totalInserted += chunk.length;
  }
  console.log(`${file}: parsed ${rows.length}, inserted ${toInsert.length}`);
}
console.log(`\nTOTAL parsed ${totalIn}, inserted ${totalInserted}, skipped(existing) ${totalSkipped}`);
