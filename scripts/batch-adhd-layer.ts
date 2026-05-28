/**
 * scripts/batch-adhd-layer.ts
 *
 * Generate TAP_QUICK overlays for every lesson in a course in one run.
 * Mirrors /api/overlay/adhd-layer (same prompt, same Haiku model, same
 * epistemic-prerequisite guard), but iterates over the lessons table and
 * uses the service role directly so it doesn't need a logged-in admin
 * session.
 *
 * Cost: ~$0.005 per lesson (Claude Haiku 4.5). 60 lessons ≈ $0.30 total.
 *
 * Run:
 *   npx tsx scripts/batch-adhd-layer.ts
 *   npx tsx scripts/batch-adhd-layer.ts --course ap-biology
 *   npx tsx scripts/batch-adhd-layer.ts --limit 3            # pilot run
 *   npx tsx scripts/batch-adhd-layer.ts --force              # regenerate
 *
 * Idempotent by default: skips any lesson that already has at least one
 * tap_quick overlay. Pass --force to regenerate (this WILL create duplicates;
 * clean up via admin first).
 */

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

// Auto-load .env.local so the user doesn't have to source it manually.
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
  } catch {
    /* .env.local missing — fall through to process.env */
  }
})();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("[batch] missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
if (!ANTHROPIC_KEY) {
  console.error("[batch] missing ANTHROPIC_API_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const anthropic = new Anthropic({ apiKey: ANTHROPIC_KEY });

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 2400;
const DELAY_BETWEEN_CALLS_MS = 600;
const MAX_OVERLAYS_PER_LESSON = 5;

// ── Inlined helpers (kept self-contained on purpose — script is standalone) ──

interface ScriptSection { title: string; timestamp: string; content: string; }
function parseScript(script: string): ScriptSection[] {
  if (!script) return [];
  const lines = script.split("\n");
  const sections: ScriptSection[] = [];
  let current: ScriptSection | null = null;
  for (const line of lines) {
    const match = line.match(/^##\s+(.+?)(?:\s+\(([^)]+)\))?\s*$/);
    if (match) {
      if (current) sections.push({ ...current, content: current.content.trimEnd() });
      current = { title: match[1].trim(), timestamp: match[2] ?? "", content: "" };
    } else if (current) {
      current.content += line + "\n";
    }
  }
  if (current) sections.push({ ...current, content: current.content.trimEnd() });
  return sections;
}

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
interface AdhdOverlay {
  section_ref: string;
  kind: "predict" | "trap" | "connect";
  question: string;
  options: TapOption[];
  rule?: string;
  hint?: string;
  followup?: {
    question: string;
    options: TapOption[];
  };
}

function extractJsonValue(raw: string): unknown {
  const stripped = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const firstBracket = stripped.indexOf("[");
  const firstBrace = stripped.indexOf("{");
  const startIdx =
    firstBracket === -1 ? firstBrace :
    firstBrace === -1 ? firstBracket :
    Math.min(firstBracket, firstBrace);
  if (startIdx === -1) return null;
  const open = stripped[startIdx];
  const close = open === "[" ? "]" : "}";
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = startIdx; i < stripped.length; i++) {
    const ch = stripped[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') { inString = true; continue; }
    if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) {
        try { return JSON.parse(stripped.slice(startIdx, i + 1)); } catch { return null; }
      }
    }
  }
  return null;
}

function buildPrompt(lessonTitle: string, subject: string, fullScript: string, sectionTitles: string[]): string {
  return `You are InHero's ADHD Layer Generator. The lesson video already has animations and an instructor explaining. Your job is to insert 3-5 single-tap pulse overlays at the BEST animation-pause moments — right before reveals (predict), right after misleading claims (trap), or between two related mechanisms (connect).

LESSON: ${lessonTitle}
SUBJECT: ${subject}

SECTION TITLES (in order):
${sectionTitles.map((t, i) => `  [${i}] ${t}`).join("\n")}

FULL SCRIPT (use this to pick the best moments):
${fullScript.slice(0, 6000)}

RULES:
1. Generate EXACTLY 3-5 overlays. Distribute across different sections — don't cluster.
2. Each overlay = ONE tap from the student, under 5 seconds.
3. Skip HOOK / WRAP sections. Concentrate on HERO EXPLAIN sections + the sections that follow them (SPARK / GAP CRUNCH).
4. Skip sections that are obviously already overlay-heavy (questions, sprints, teach-back).
5. Question must be ≤14 words. Options must be ≤6 words each. No college-textbook tone.
6. EXACTLY ONE correct option per overlay. Wrong options must reflect REAL student misconceptions, not strawmen.
7. section_ref MUST match one of the section titles above EXACTLY (case-sensitive copy).

KIND vs PLACEMENT (epistemic prerequisite rule — DO NOT VIOLATE):

  The overlay fires immediately BEFORE the clip for its section_ref. So timing
  is implied by where you attach.

  - "predict" → attach to the section where the concept is ABOUT to be taught
    (e.g., HERO EXPLAIN 1). Fires before content → primes intuition.
  - "trap" or "connect" → attach to the section AFTER the one where the
    concept was taught (a trap about HE1 content goes on SPARK; a trap about
    HE2 content goes on GAP CRUNCH). NEVER attach a trap or connect to the
    same section where its concept is taught.

  Pattern:
    HOOK  →  predict about HE1  →  HERO EXPLAIN 1  →  trap about HE1
    →  SPARK  →  predict about HE2  →  HERO EXPLAIN 2  →  trap about HE2
    →  GAP CRUNCH  →  …

FOLLOWUP (REQUIRED — pedagogy depends on this):
Each overlay needs a "followup" — a SIMILAR question testing the SAME concept
with different wording / a different scenario. Shown ONLY when the student
gets the original wrong. So it must:
- Test the same underlying insight (same rule)
- Use a different molecule / number / context
- Be answerable from the same reasoning, not from memorizing the first answer
- 2-3 options, exactly 1 correct

Return JSON ONLY — an array, no other keys:
[
  {
    "section_ref": "EXACT section title from list above",
    "kind": "predict" | "trap" | "connect",
    "question": "≤14 word prompt",
    "options": [
      { "label": "≤6 words", "correct": true,  "feedback": "≤18 word why-correct" },
      { "label": "≤6 words", "correct": false, "feedback": "≤22 word why-wrong + what tripped most students" }
    ],
    "rule": "optional ≤20 word general rule (omit if not useful)",
    "hint": "optional ≤14 word hint without giving away answer (omit if not useful)",
    "followup": {
      "question": "≤14 word same-concept retry, NEW scenario",
      "options": [
        { "label": "≤6 words", "correct": true,  "feedback": "≤18 word why-correct" },
        { "label": "≤6 words", "correct": false, "feedback": "≤22 word why-wrong" }
      ]
    }
  }
]`;
}

// Validate an overlay; return null if OK, otherwise a short reason string.
function validateOverlay(o: AdhdOverlay): string | null {
  if (!o.question || typeof o.question !== "string") return "missing question";
  if (!Array.isArray(o.options) || o.options.length < 2) return "needs ≥2 options";
  const correctCount = o.options.filter((opt) => opt.correct === true).length;
  if (correctCount !== 1) return `expected 1 correct, got ${correctCount}`;
  if (!o.section_ref) return "missing section_ref";
  return null;
}

// Epistemic prerequisite guard — shift trap/connect off the HERO EXPLAIN
// section onto the next section so it fires AFTER the content it tests.
function applyEpistemicGuard(sections: ScriptSection[], item: AdhdOverlay): string {
  const ref = item.section_ref.trim();
  const matchedSection = sections.find(
    (s) => s.title.toUpperCase() === ref.toUpperCase() ||
           s.title.toUpperCase().includes(ref.toUpperCase()) ||
           ref.toUpperCase().includes(s.title.toUpperCase())
  );
  let finalRef = matchedSection?.title ?? ref;
  if (matchedSection && (item.kind === "trap" || item.kind === "connect")) {
    const upper = matchedSection.title.toUpperCase();
    if (upper.includes("HERO EXPLAIN")) {
      const idx = sections.findIndex((s) => s.title === matchedSection.title);
      const next = sections[idx + 1];
      if (next) finalRef = next.title;
    }
  }
  return finalRef;
}

// ── Main loop ──────────────────────────────────────────────────────────────

function parseArg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return undefined;
  if (i === process.argv.length - 1) return "";
  return process.argv[i + 1];
}

async function getNextPosition(lessonId: string): Promise<number> {
  const { data } = await supabase
    .from("overlays")
    .select("position")
    .eq("lesson_id", lessonId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data?.position ?? -1) + 1;
}

async function processLesson(
  lesson: { id: string; title: string; course_id: string | null },
  script: string,
): Promise<{ created: number; errors: string[] }> {
  const sections = parseScript(script);
  if (sections.length === 0) {
    return { created: 0, errors: ["no sections parsed"] };
  }
  const sectionTitles = sections.map((s) => s.title);
  const prompt = buildPrompt(lesson.title, lesson.course_id ?? "", script, sectionTitles);

  let parsed: AdhdOverlay[] = [];
  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: "user", content: prompt }],
    });
    const raw = response.content[0]?.type === "text" ? response.content[0].text : "[]";
    const result = extractJsonValue(raw);
    if (Array.isArray(result)) parsed = result as AdhdOverlay[];
    else if (result && typeof result === "object" && Array.isArray((result as { overlays?: AdhdOverlay[] }).overlays)) {
      parsed = (result as { overlays?: AdhdOverlay[] }).overlays ?? [];
    }
  } catch (err) {
    return { created: 0, errors: [`Anthropic: ${err instanceof Error ? err.message : String(err)}`] };
  }

  if (parsed.length === 0) return { created: 0, errors: ["no overlays generated"] };

  let position = await getNextPosition(lesson.id);
  let created = 0;
  const errors: string[] = [];

  for (const item of parsed.slice(0, MAX_OVERLAYS_PER_LESSON)) {
    const invalid = validateOverlay(item);
    if (invalid) {
      errors.push(`${invalid}: ${item.question?.slice(0, 40) ?? "(no q)"}`);
      continue;
    }
    const finalRef = applyEpistemicGuard(sections, item);
    // Drop a malformed followup rather than reject the whole row.
    let followup = item.followup;
    if (followup) {
      const fOpts = Array.isArray(followup.options) ? followup.options : [];
      const fCorrect = fOpts.filter((o) => o.correct === true).length;
      if (!followup.question || fOpts.length < 2 || fCorrect !== 1) {
        followup = undefined;
      }
    }
    const { error } = await supabase.from("overlays").insert({
      lesson_id: lesson.id,
      type: "tap_quick",
      data: {
        question: item.question,
        options: item.options,
        rule: item.rule,
        hint: item.hint,
        kind: item.kind ?? "predict",
        followup,
      },
      script_section_ref: finalRef,
      position,
    });
    if (error) {
      errors.push(`insert: ${error.message.slice(0, 80)}`);
      continue;
    }
    created++;
    position++;
  }

  return { created, errors };
}

async function main() {
  const force = process.argv.includes("--force");
  const courseFilter = parseArg("course") ?? "ap-biology";
  const limitArg = parseArg("limit");
  const limit = limitArg ? Number(limitArg) : undefined;

  const courseVariants = getCourseIdVariants(courseFilter);
  console.log(`[batch] course filter: ${courseFilter} (variants: ${courseVariants.join(", ")})`);

  // 1. All lessons in course
  const { data: lessons, error: le } = await supabase
    .from("lessons")
    .select("id, title, course_id, unit_number, lesson_number")
    .in("course_id", courseVariants)
    .order("unit_number", { ascending: true })
    .order("lesson_number", { ascending: true });
  if (le) { console.error("[batch] lessons query failed:", le.message); process.exit(1); }
  console.log(`[batch] ${lessons?.length ?? 0} lessons in course`);

  // 2. Scripts in one batch
  const lessonIds = (lessons ?? []).map((l) => l.id);
  const { data: scripts, error: se } = await supabase
    .from("lesson_scripts")
    .select("lesson_id, script")
    .in("lesson_id", lessonIds);
  if (se) { console.error("[batch] scripts query failed:", se.message); process.exit(1); }
  const scriptMap = new Map<string, string>();
  for (const row of (scripts ?? []) as { lesson_id: string; script: string | null }[]) {
    if (row.script && row.script.trim().length > 0) scriptMap.set(row.lesson_id, row.script);
  }

  // 3. Existing tap_quick by lesson
  const { data: existing } = await supabase
    .from("overlays")
    .select("lesson_id")
    .eq("type", "tap_quick")
    .in("lesson_id", lessonIds);
  const hasTapQuick = new Set((existing ?? []).map((o) => o.lesson_id as string));

  // 4. Filter what to process
  let todo = (lessons ?? []).filter((l) =>
    scriptMap.has(l.id) && (force || !hasTapQuick.has(l.id))
  );
  if (limit) todo = todo.slice(0, limit);

  console.log(`[batch] ${todo.length} lessons to process (force=${force})`);
  console.log(`        estimated cost: ~$${(todo.length * 0.005).toFixed(2)}\n`);

  if (todo.length === 0) {
    console.log("[batch] nothing to do. Use --force to regenerate existing.");
    return;
  }

  let totalCreated = 0;
  let totalLessonsWithInsertions = 0;
  let totalFailures = 0;

  for (let i = 0; i < todo.length; i++) {
    const lesson = todo[i];
    const script = scriptMap.get(lesson.id)!;
    console.log(`[${(i + 1).toString().padStart(2)}/${todo.length}] ${lesson.id} — ${lesson.title}`);

    try {
      const { created, errors } = await processLesson(lesson, script);
      totalCreated += created;
      if (created > 0) totalLessonsWithInsertions++;
      if (created === 0 && errors.length === 0) console.log(`           ⚠ 0 overlays generated`);
      else if (created > 0) console.log(`           ✓ ${created} inserted${errors.length ? ` (+${errors.length} skipped)` : ""}`);
      else { console.log(`           ✕ all rejected: ${errors[0]}`); totalFailures++; }
    } catch (err) {
      console.log(`           ✕ unexpected: ${err instanceof Error ? err.message : err}`);
      totalFailures++;
    }

    if (i < todo.length - 1) await new Promise((r) => setTimeout(r, DELAY_BETWEEN_CALLS_MS));
  }

  console.log(`\n[batch] done.`);
  console.log(`        lessons processed:       ${todo.length}`);
  console.log(`        lessons with insertions: ${totalLessonsWithInsertions}`);
  console.log(`        total overlays created:  ${totalCreated}`);
  console.log(`        lessons failed entirely: ${totalFailures}`);
}

main().catch((err) => {
  console.error("[batch] fatal:", err);
  process.exit(1);
});
