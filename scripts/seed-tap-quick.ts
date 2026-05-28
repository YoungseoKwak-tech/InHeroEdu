/**
 * scripts/seed-tap-quick.ts
 *
 * Step 3 of the "no-API-cost" ADHD-layer pipeline.
 *
 * Reads data/tap-quick-seeds.json (produced by Claude in the conversation)
 * and inserts each TAP_QUICK overlay into the `overlays` table.
 *
 * Idempotent: skips inserting if a TAP_QUICK overlay with the same
 * (lesson_id, script_section_ref, question) already exists.
 *
 * Run:
 *   npx tsx scripts/seed-tap-quick.ts
 *   npx tsx scripts/seed-tap-quick.ts --dry-run        # just report
 *   npx tsx scripts/seed-tap-quick.ts --lesson <id>    # one lesson only
 *
 * Expected seeds JSON shape:
 *   [
 *     {
 *       "lesson_id": "uuid",
 *       "title": "AP Bio 1.1 — Water",
 *       "overlays": [
 *         {
 *           "section_ref": "HERO EXPLAIN 1",
 *           "kind": "predict" | "trap" | "connect",
 *           "question": "1-sentence",
 *           "options": [
 *             { "label": "...", "correct": true,  "feedback": "..." },
 *             { "label": "...", "correct": false, "feedback": "..." }
 *           ],
 *           "rule": "optional",
 *           "hint": "optional"
 *         }
 *       ]
 *     }
 *   ]
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

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
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("[seed] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

interface SeedOption {
  label: string;
  correct: boolean;
  feedback: string;
}
interface SeedOverlay {
  section_ref: string;
  kind?: "predict" | "trap" | "connect";
  question: string;
  options: SeedOption[];
  rule?: string;
  hint?: string;
}
interface SeedLesson {
  lesson_id: string;
  title?: string;
  overlays: SeedOverlay[];
}

function parseArg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return undefined;
  if (i === process.argv.length - 1) return "";
  return process.argv[i + 1];
}

// Returns null if valid, otherwise a short reason string.
function validateOverlay(o: SeedOverlay): string | null {
  if (!o.question || typeof o.question !== "string") return "missing question";
  if (!Array.isArray(o.options) || o.options.length < 2) return "needs ≥2 options";
  const correctCount = o.options.filter((opt) => opt.correct === true).length;
  if (correctCount !== 1) return `expected exactly 1 correct, got ${correctCount}`;
  if (!o.section_ref || typeof o.section_ref !== "string") return "missing section_ref";
  return null;
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

async function alreadyExists(lessonId: string, sectionRef: string, question: string): Promise<boolean> {
  const { data } = await supabase
    .from("overlays")
    .select("id, data")
    .eq("lesson_id", lessonId)
    .eq("type", "tap_quick")
    .eq("script_section_ref", sectionRef);
  if (!data) return false;
  return data.some((r) => {
    const d = r.data as { question?: string } | null;
    return d?.question === question;
  });
}

async function main() {
  const dryRun = parseArg("dry-run") !== undefined;
  const onlyLesson = parseArg("lesson") || undefined;

  const seedsPath = resolve(process.cwd(), "data/tap-quick-seeds.json");
  if (!existsSync(seedsPath)) {
    console.error(`[seed] missing ${seedsPath}`);
    console.error("       Run export → ask Claude to produce this file → then re-run.");
    process.exit(1);
  }
  const seeds: SeedLesson[] = JSON.parse(readFileSync(seedsPath, "utf8"));
  console.log(`[seed] ${seeds.length} lessons loaded from ${seedsPath}`);

  let totalQueued = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let totalInvalid = 0;

  for (const lesson of seeds) {
    if (onlyLesson && lesson.lesson_id !== onlyLesson) continue;
    if (!Array.isArray(lesson.overlays) || lesson.overlays.length === 0) continue;

    const lessonLabel = lesson.title ? `${lesson.title} (${lesson.lesson_id})` : lesson.lesson_id;
    console.log(`\n[seed] ${lessonLabel}`);

    let position = await getNextPosition(lesson.lesson_id);

    for (const overlay of lesson.overlays) {
      const invalidReason = validateOverlay(overlay);
      if (invalidReason) {
        console.log(`  ✕ invalid: ${invalidReason} — ${overlay.question?.slice(0, 50) ?? "(no question)"}`);
        totalInvalid++;
        continue;
      }

      totalQueued++;

      const exists = await alreadyExists(lesson.lesson_id, overlay.section_ref, overlay.question);
      if (exists) {
        console.log(`  ⊙ skip (already seeded): ${overlay.question.slice(0, 50)}`);
        totalSkipped++;
        continue;
      }

      if (dryRun) {
        console.log(`  ⋯ would insert @ ${overlay.section_ref}: ${overlay.question.slice(0, 50)}`);
        continue;
      }

      const { error } = await supabase.from("overlays").insert({
        lesson_id: lesson.lesson_id,
        type: "tap_quick",
        data: {
          question: overlay.question,
          options: overlay.options,
          rule: overlay.rule,
          hint: overlay.hint,
          kind: overlay.kind ?? "predict",
        },
        script_section_ref: overlay.section_ref,
        position,
      });

      if (error) {
        console.log(`  ✕ insert failed: ${error.message}`);
        continue;
      }

      console.log(`  ✓ inserted @ ${overlay.section_ref}: ${overlay.question.slice(0, 50)}`);
      totalInserted++;
      position++;
    }
  }

  console.log(`\n[seed] done.`);
  console.log(`       queued:    ${totalQueued}`);
  console.log(`       inserted:  ${totalInserted}${dryRun ? " (dry-run — no DB writes)" : ""}`);
  console.log(`       skipped:   ${totalSkipped} (already in DB)`);
  console.log(`       invalid:   ${totalInvalid}`);
}

main().catch((err) => {
  console.error("[seed] fatal:", err);
  process.exit(1);
});
