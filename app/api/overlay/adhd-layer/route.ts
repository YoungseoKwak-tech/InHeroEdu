/**
 * /api/overlay/adhd-layer
 *
 * Batch-generates ADHD-friendly TAP_QUICK overlays for a lesson:
 *  - Takes lesson script + section list.
 *  - Asks Claude (Haiku — cheap, structured) to pick 3-5 animation-pause moments
 *    that suit a 5-second predict / trap / connect tap.
 *  - Saves each as type="tap_quick" with script_section_ref pointing at the
 *    matching section title, so the existing timestamp merge picks them up.
 *
 * Cost: ~$0.005 per lesson at Haiku pricing. No per-student runtime cost.
 */

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getAnthropicApiKey } from "@/lib/env";
import { parseScript } from "@/lib/parseScript";
import { createOverlay } from "@/lib/overlays";

// Tolerant array-aware JSON extractor — parseJsonBlock only handles single
// objects, but this endpoint expects an array of overlays. Strip code fences,
// then take from first '[' to matching ']' (or first '{' to last '}' if the
// model returned a single object).
function extractJsonValue(raw: string): unknown {
  const stripped = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const firstBracket = stripped.indexOf("[");
  const firstBrace = stripped.indexOf("{");
  // Prefer the earliest start token
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
        try { return JSON.parse(stripped.slice(startIdx, i + 1)); }
        catch { return null; }
      }
    }
  }
  return null;
}

const client = new Anthropic({ apiKey: getAnthropicApiKey() });
const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 2400;

interface TapQuickOption {
  label: string;
  correct: boolean;
  feedback: string;
}
interface AdhdOverlay {
  section_ref: string;
  kind: "predict" | "trap" | "connect";
  question: string;
  options: TapQuickOption[];
  rule?: string;
  hint?: string;
}

const FALLBACK_OVERLAYS: AdhdOverlay[] = [];

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
    (e.g., HERO EXPLAIN 1). Fires before content → primes the student's
    intuition → the video then reveals if their guess was right. The student
    needs NO prior knowledge to answer — only intuition.

  - "trap" or "connect" → attach to the section AFTER the one where the
    concept was taught (e.g., a trap about HERO EXPLAIN 1 content goes on
    SPARK; a trap about HERO EXPLAIN 2 content goes on GAP CRUNCH). The
    student needs to ALREADY know the concept to answer — otherwise it's
    a guessing game, not validation. NEVER attach a trap or connect to the
    same section where its concept is taught.

  Pattern in this canonical lesson structure:
    HOOK  →  predict about HE1  →  HERO EXPLAIN 1  →  trap about HE1
    →  SPARK  →  predict about HE2  →  HERO EXPLAIN 2  →  trap about HE2
    →  GAP CRUNCH  →  …

Return JSON ONLY in this exact shape — an array, no other keys:
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
    "hint": "optional ≤14 word hint without giving away answer (omit if not useful)"
  }
]`;
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: {
    lessonId?: string;
    lessonTitle?: string;
    subject?: string;
    fullScript?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { lessonId, lessonTitle = "", subject = "", fullScript = "" } = body;
  if (!lessonId || !fullScript) {
    return NextResponse.json({ error: "lessonId and fullScript required" }, { status: 400 });
  }

  const sections = parseScript(fullScript);
  if (sections.length === 0) {
    return NextResponse.json({ error: "no sections parsed from script" }, { status: 400 });
  }

  const sectionTitles = sections.map((s) => s.title);
  const prompt = buildPrompt(lessonTitle, subject, fullScript, sectionTitles);

  let parsed: AdhdOverlay[] = FALLBACK_OVERLAYS;
  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: "user", content: prompt }],
    });
    const raw = response.content[0]?.type === "text" ? response.content[0].text : "[]";
    const result = extractJsonValue(raw);
    if (Array.isArray(result)) {
      parsed = result as AdhdOverlay[];
    } else if (result && typeof result === "object" && Array.isArray((result as { overlays?: AdhdOverlay[] }).overlays)) {
      parsed = (result as { overlays?: AdhdOverlay[] }).overlays ?? [];
    }
  } catch (err) {
    console.error("[adhd-layer] generation error", err);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    return NextResponse.json({ ok: false, error: "no overlays generated", generated: 0 });
  }

  // Validate + save each. Tolerate per-row failures.
  const created: Array<{ id: string; section_ref: string }> = [];
  const errors: string[] = [];

  for (const item of parsed.slice(0, 5)) {
    // Validate shape
    if (!item.question || !Array.isArray(item.options) || item.options.length < 2) {
      errors.push(`invalid shape: ${JSON.stringify(item).slice(0, 100)}`);
      continue;
    }
    const correctCount = item.options.filter((o) => o.correct === true).length;
    if (correctCount !== 1) {
      errors.push(`expected exactly 1 correct option in: ${item.question.slice(0, 40)}`);
      continue;
    }

    // Fuzzy-match section_ref to actual section title — case-insensitive contains.
    const ref = (item.section_ref ?? "").trim();
    const matchedSection = sections.find(
      (s) => s.title.toUpperCase() === ref.toUpperCase() ||
             s.title.toUpperCase().includes(ref.toUpperCase()) ||
             ref.toUpperCase().includes(s.title.toUpperCase())
    );
    let finalRef = matchedSection?.title ?? ref;

    // Epistemic prerequisite guard: a trap or connect placed on the section
    // where its concept is taught would fire BEFORE the content — turning the
    // overlay into a guessing game. Shift forward to the next section so it
    // fires AFTER. Predicts are exempt (they SHOULD fire before content).
    if (matchedSection && (item.kind === "trap" || item.kind === "connect")) {
      const upper = matchedSection.title.toUpperCase();
      if (upper.startsWith("HERO EXPLAIN") || upper.includes("HERO EXPLAIN")) {
        const matchedIdx = sections.findIndex((s) => s.title === matchedSection.title);
        const next = sections[matchedIdx + 1];
        if (next) {
          console.log(`[adhd-layer] guard: shifted ${item.kind} from "${matchedSection.title}" → "${next.title}"`);
          finalRef = next.title;
        }
      }
    }

    try {
      const row = await createOverlay(
        lessonId,
        "tap_quick",
        {
          question: item.question,
          options: item.options,
          rule: item.rule,
          hint: item.hint,
          kind: item.kind ?? "predict",
        },
        finalRef
      );
      created.push({ id: row.id, section_ref: finalRef });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`save failed: ${msg.slice(0, 80)}`);
    }
  }

  return NextResponse.json({
    ok: true,
    generated: created.length,
    created,
    errors: errors.length > 0 ? errors : undefined,
  });
}
