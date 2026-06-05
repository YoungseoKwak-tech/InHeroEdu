/**
 * scripts/generate-overlays.ts
 *
 * One-shot overlay generator. Reads the lesson_scripts row for a given
 * lesson, calls Claude to produce N pedagogically-grounded overlays
 * matching the existing AP Bio shape, and inserts them into the
 * overlays table.
 *
 * Run:
 *   npx tsx scripts/generate-overlays.ts --lesson ap-chemistry-u1-l1 --count 9
 *   npx tsx scripts/generate-overlays.ts --lesson ap-physics-1-u1-l1 --count 9
 *
 *   --count   total overlays to add (default 9). One spark + the rest tap_quick.
 *   --dry-run print the generated overlays but don't insert.
 *   --top-up  generate N-existing overlays instead of N total.
 *
 * Cost ≈ $0.10 per lesson with Sonnet, much less with Haiku.
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

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
if (!SB_URL || !SB_KEY) { console.error("[overlays] missing SUPABASE env"); process.exit(1); }
if (!ANTHROPIC_KEY) { console.error("[overlays] missing ANTHROPIC_API_KEY"); process.exit(1); }

const supabase = createClient(SB_URL, SB_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
const anthropic = new Anthropic({ apiKey: ANTHROPIC_KEY });

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return undefined;
  if (i === process.argv.length - 1) return "";
  return process.argv[i + 1];
}

const SECTION_REFS = [
  "HOOK",
  "HERO EXPLAIN 1",
  "HERO EXPLAIN 2",
  "GAP CRUNCH",
  "WRAP",
] as const;

interface GeneratedOverlay {
  type: "spark" | "tap_quick";
  script_section_ref: string;
  data: Record<string, unknown>;
}

const SYSTEM_PROMPT = `You design AP-exam-grade interactive overlays that sit inside a video lesson.

Output rules:
1. Return ONLY a valid JSON array, no commentary, no markdown fence.
2. Each item: { "type": "spark" | "tap_quick", "script_section_ref": "<HOOK|HERO EXPLAIN 1|HERO EXPLAIN 2|GAP CRUNCH|WRAP>", "data": {...} }.
3. The first item must be type "spark" with script_section_ref = "SPARK".
4. Remaining items are type "tap_quick".

SPARK data shape:
{
  "memoryAnchor": "vivid 1-2 sentence analogy or image that anchors the central concept",
  "whyItMatters": "the actual mechanism this analogy points to (1-2 sentences)",
  "examConnection": "specifically how the AP exam tests this idea (1 sentence)",
  "conceptUnlocked": "5-8 word name of the unlocking insight",
  "connectedConcepts": [4 short related concept titles]
}

TAP_QUICK data shape:
{
  "question": "the question the student sees",
  "kind": "predict" | "trap",
  "hint": "one short hint",
  "rule": "memorable rule that resolves the question",
  "options": [
    { "label": "answer text", "correct": true, "feedback": "why it's right" },
    { "label": "answer text", "correct": false, "feedback": "specific reason wrong" }
    // 2-3 options total. Exactly one correct.
  ],
  "followup": {
    "question": "different question testing the SAME underlying concept",
    "options": [ ... same shape as above, exactly one correct ]
  }
}

Pedagogy rules:
- "predict" = ask students to anticipate a result, then reveal the rule.
- "trap" = surface a common AP misconception, then disambiguate it.
- Distribute the tap_quick overlays across HOOK / HERO EXPLAIN 1 / HERO EXPLAIN 2 / GAP CRUNCH / WRAP in a reasonable order matching the script flow.
- Feedback strings MUST teach something — never just "Correct" or "Wrong".
- AP-grade rigor: invoke specific College Board CED-style language where it fits.
- No emoji. No markdown. Plain text only inside strings.`;

async function generateOverlays(lessonId: string, count: number, dryRun: boolean, topUp: boolean) {
  // Fetch lesson context
  const [lessonRes, scriptRes, existingRes] = await Promise.all([
    supabase.from("lessons").select("id, course_id, title, unit_number, lesson_number").eq("id", lessonId).maybeSingle(),
    supabase.from("lesson_scripts").select("script").eq("lesson_id", lessonId).maybeSingle(),
    supabase.from("overlays").select("id, type, position").eq("lesson_id", lessonId),
  ]);

  if (lessonRes.error) { console.error("[overlays] lessons query error:", lessonRes.error.message); return; }
  if (scriptRes.error) { console.error("[overlays] lesson_scripts query error:", scriptRes.error.message); return; }
  if (existingRes.error) { console.error("[overlays] overlays query error:", existingRes.error.message); return; }

  const lesson = lessonRes.data;
  const scriptRow = scriptRes.data;
  const existing = existingRes.data;

  if (!lesson) { console.error(`[overlays] lesson ${lessonId} not found`); return; }
  if (!scriptRow?.script) { console.error(`[overlays] no lesson_scripts.script for ${lessonId}`); return; }

  const existingCount = existing?.length ?? 0;
  const needed = topUp ? Math.max(0, count - existingCount) : count;
  if (needed === 0) {
    console.log(`[overlays] ${lessonId} already has ${existingCount} overlays, top-up to ${count} → nothing to do`);
    return;
  }

  console.log(`[overlays] ${lessonId}: existing=${existingCount}, requesting=${needed}, mode=${topUp ? "top-up" : "fresh"}`);

  const userPrompt = `Lesson: ${lesson.title}
Course: ${lesson.course_id}
Unit ${lesson.unit_number}, Lesson ${lesson.lesson_number}

The student is watching this video. Generate exactly ${needed} overlays.
${existingCount > 0 ? `(${existingCount} overlays already exist for this lesson — design NEW ones that don't duplicate the obvious low-hanging fruit.)` : ""}
${needed === 1 ? "Generate one SPARK overlay only." : `First overlay = spark. Remaining ${needed - 1} = tap_quick.`}

LESSON SCRIPT:
"""
${scriptRow.script}
"""

Return the JSON array now.`;

  console.log(`[overlays] calling Claude (script=${scriptRow.script.length} chars)…`);

  const resp = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 6000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = resp.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { text: string }).text)
    .join("\n")
    .trim();

  // Strip code fences if Claude added them despite instructions
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();

  let parsed: GeneratedOverlay[];
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("[overlays] failed to parse Claude output as JSON.");
    console.error("First 600 chars of output:\n", cleaned.slice(0, 600));
    throw err;
  }

  if (!Array.isArray(parsed)) {
    console.error("[overlays] expected array, got:", typeof parsed);
    return;
  }

  // Validate shape
  const validated: GeneratedOverlay[] = [];
  for (const o of parsed) {
    if (!o || typeof o !== "object") continue;
    if (o.type !== "spark" && o.type !== "tap_quick") continue;
    if (typeof o.script_section_ref !== "string") continue;
    if (!o.data || typeof o.data !== "object") continue;
    validated.push(o);
  }
  console.log(`[overlays] Claude returned ${parsed.length} overlays, ${validated.length} passed validation.`);

  if (dryRun) {
    console.log("\n--- DRY RUN — would insert ---");
    console.log(JSON.stringify(validated, null, 2));
    console.log(`\nTotal input ≈ ${resp.usage?.input_tokens} tokens, output ≈ ${resp.usage?.output_tokens} tokens.`);
    return;
  }

  // Position-assign: continue from existing max position
  const maxExistingPos = Math.max(-1, ...(existing ?? []).map((o) => (o as { position: number }).position ?? 0));
  const rows = validated.map((o, i) => ({
    lesson_id: lessonId,
    type: o.type,
    data: o.data,
    script_section_ref: o.script_section_ref,
    position: maxExistingPos + 1 + i,
  }));

  const { error } = await supabase.from("overlays").insert(rows);
  if (error) { console.error("[overlays] insert failed:", error.message); return; }

  console.log(`[overlays] ${lessonId}: inserted ${rows.length} new overlays (positions ${rows[0].position}…${rows[rows.length - 1].position}).`);
  console.log(`[overlays] tokens — in: ${resp.usage?.input_tokens}, out: ${resp.usage?.output_tokens}.`);
}

async function main() {
  const lessonId = arg("lesson");
  if (!lessonId) {
    console.error("Usage: npx tsx scripts/generate-overlays.ts --lesson <lesson_id> [--count 9] [--dry-run] [--top-up]");
    process.exit(1);
  }
  const count = parseInt(arg("count") ?? "9", 10);
  const dryRun = process.argv.includes("--dry-run");
  const topUp = process.argv.includes("--top-up");
  await generateOverlays(lessonId, count, dryRun, topUp);
}

main().catch((err) => { console.error("[overlays] fatal:", err); process.exit(1); });
