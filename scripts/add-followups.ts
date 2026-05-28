/**
 * scripts/add-followups.ts
 *
 * Backfills the `followup` field on existing tap_quick overlays in the DB.
 * Each overlay's followup is a same-concept retry question shown to students
 * only when they get the original wrong — closes the learning loop instead
 * of just showing feedback and moving on.
 *
 * Idempotent: skips overlays that already have a valid followup. Tiny prompt
 * per row (one question + same-concept retry), so cost is ~$0.0003 each —
 * about $0.10 to backfill 298 overlays.
 *
 * Run:
 *   npx tsx scripts/add-followups.ts
 *   npx tsx scripts/add-followups.ts --course ap-biology
 *   npx tsx scripts/add-followups.ts --limit 5         # pilot
 *   npx tsx scripts/add-followups.ts --force           # overwrite existing followups
 */

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

(function loadEnv() {
  try {
    const text = readFileSync(".env.local", "utf8");
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const k = line.slice(0, eq);
      const v = line.slice(eq + 1).replace(/^"|"$/g, "");
      if (!process.env[k]) process.env[k] = v;
    }
  } catch {}
})();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
if (!SUPABASE_URL || !SERVICE_KEY || !ANTHROPIC_KEY) {
  console.error("[followups] missing env vars");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const anthropic = new Anthropic({ apiKey: ANTHROPIC_KEY });

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 600;
const DELAY_MS = 400;

const COURSE_ID_VARIANT_GROUPS: string[][] = [
  ["ap-biology", "ap-bio"],
  ["ap-chemistry", "ap-chem"],
  ["ap-calculus-ab", "ap-calc-ab", "ap-calculus"],
  ["ap-physics-1", "ap-physics"],
  ["ap-physics-2", "ap-phys2"],
  ["ap-physics-c-mech", "ap-physics-c-mechanics"],
  ["ap-us-history", "ap-history", "apush"],
];
function getCourseIdVariants(courseId: string): string[] {
  const group = COURSE_ID_VARIANT_GROUPS.find((variants) => variants.includes(courseId));
  return group ? Array.from(new Set(group)) : [courseId];
}

interface TapOption { label: string; correct: boolean; feedback: string; }
interface TapQuickData {
  question?: string;
  options?: TapOption[];
  rule?: string;
  hint?: string;
  kind?: string;
  followup?: { question: string; options: TapOption[] };
}

function parseArg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return undefined;
  if (i === process.argv.length - 1) return "";
  return process.argv[i + 1];
}

function extractJsonObject(raw: string): unknown {
  const stripped = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const start = stripped.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < stripped.length; i++) {
    const ch = stripped[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') { inString = true; continue; }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        try { return JSON.parse(stripped.slice(start, i + 1)); } catch { return null; }
      }
    }
  }
  return null;
}

function buildFollowupPrompt(data: TapQuickData): string {
  const correctLabel = data.options?.find((o) => o.correct)?.label ?? "(unknown)";
  const ruleLine = data.rule ? `\nRULE / CONCEPT: ${data.rule}` : "";
  return `You're given an AP-Bio TAP_QUICK question and its correct answer. Generate ONE same-concept retry: a similar question testing the SAME underlying insight with a NEW scenario / different molecule / different number. The student will only see this if they got the original wrong, so it must be answerable from the same reasoning, NOT from memorizing the original answer.

ORIGINAL QUESTION: ${data.question ?? ""}
ORIGINAL OPTIONS: ${(data.options ?? []).map((o) => `${o.correct ? "✓" : "✕"} ${o.label}`).join(" | ")}
CORRECT ANSWER: ${correctLabel}${ruleLine}

CONSTRAINTS:
- ≤14 word question, plain English
- 2-3 options, each ≤6 words
- EXACTLY ONE correct option
- Each option has a feedback string (≤22 words why-wrong, ≤18 words why-correct)
- Use a DIFFERENT scenario than the original (different molecule, different number, different direction of the same principle)

Return JSON ONLY:
{
  "question": "...",
  "options": [
    { "label": "...", "correct": true,  "feedback": "..." },
    { "label": "...", "correct": false, "feedback": "..." }
  ]
}`;
}

interface OverlayRow {
  id: string;
  lesson_id: string;
  data: TapQuickData;
}

function followupIsValid(f: TapQuickData["followup"]): boolean {
  if (!f) return false;
  if (!f.question || typeof f.question !== "string") return false;
  const opts = Array.isArray(f.options) ? f.options : [];
  if (opts.length < 2) return false;
  return opts.filter((o) => o.correct === true).length === 1;
}

async function processRow(row: OverlayRow): Promise<{ ok: boolean; reason?: string }> {
  let parsed: TapQuickData["followup"];
  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: "user", content: buildFollowupPrompt(row.data) }],
    });
    const raw = response.content[0]?.type === "text" ? response.content[0].text : "{}";
    const j = extractJsonObject(raw);
    if (j && typeof j === "object") parsed = j as TapQuickData["followup"];
  } catch (err) {
    return { ok: false, reason: `Anthropic: ${err instanceof Error ? err.message : String(err)}` };
  }

  if (!followupIsValid(parsed)) {
    return { ok: false, reason: "AI returned invalid followup shape" };
  }

  const newData = { ...row.data, followup: parsed };
  const { error } = await supabase
    .from("overlays")
    .update({ data: newData, updated_at: new Date().toISOString() })
    .eq("id", row.id);
  if (error) return { ok: false, reason: `update: ${error.message.slice(0, 80)}` };
  return { ok: true };
}

async function main() {
  const force = process.argv.includes("--force");
  const courseFilter = parseArg("course") ?? "ap-biology";
  const limitArg = parseArg("limit");
  const limit = limitArg ? Number(limitArg) : undefined;

  const variants = getCourseIdVariants(courseFilter);
  console.log(`[followups] course filter: ${courseFilter} (${variants.join(", ")})`);

  // 1. Get lesson IDs in the course
  const { data: lessons } = await supabase
    .from("lessons")
    .select("id")
    .in("course_id", variants);
  const lessonIds = (lessons ?? []).map((l) => l.id);
  if (lessonIds.length === 0) {
    console.log("[followups] no lessons matched");
    return;
  }

  // 2. All tap_quick overlays in those lessons
  const { data: overlays, error } = await supabase
    .from("overlays")
    .select("id, lesson_id, data")
    .eq("type", "tap_quick")
    .in("lesson_id", lessonIds);
  if (error) { console.error("[followups] query:", error.message); process.exit(1); }

  let todo = (overlays ?? []) as OverlayRow[];
  if (!force) {
    todo = todo.filter((r) => !followupIsValid(r.data.followup));
  }
  if (limit) todo = todo.slice(0, limit);

  console.log(`[followups] ${todo.length} overlays to backfill (force=${force})`);
  console.log(`            estimated cost: ~$${(todo.length * 0.0003).toFixed(2)}\n`);

  if (todo.length === 0) {
    console.log("[followups] nothing to do. Use --force to overwrite existing followups.");
    return;
  }

  let success = 0;
  let failure = 0;
  for (let i = 0; i < todo.length; i++) {
    const row = todo[i];
    const q = (row.data.question ?? "").slice(0, 55);
    process.stdout.write(`[${(i + 1).toString().padStart(3)}/${todo.length}] ${row.lesson_id}  ${q}  `);
    const result = await processRow(row);
    if (result.ok) {
      console.log("✓");
      success++;
    } else {
      console.log(`✕ ${result.reason ?? ""}`);
      failure++;
    }
    if (i < todo.length - 1) await new Promise((r) => setTimeout(r, DELAY_MS));
  }

  console.log(`\n[followups] done.  succeeded: ${success}  failed: ${failure}`);
}

main().catch((err) => {
  console.error("[followups] fatal:", err);
  process.exit(1);
});
