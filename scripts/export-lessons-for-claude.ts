/**
 * scripts/export-lessons-for-claude.ts
 *
 * Step 1 of the "no-API-cost" ADHD-layer pipeline.
 *
 * Queries Supabase for every lesson with a script and writes a single JSON
 * file at data/lessons-export.json. That file is then fed back to Claude
 * (Max plan, $0 to InHero) which produces data/tap-quick-seeds.json.
 *
 * Run:
 *   npx tsx scripts/export-lessons-for-claude.ts
 *   npx tsx scripts/export-lessons-for-claude.ts --subject ap-biology
 *   npx tsx scripts/export-lessons-for-claude.ts --limit 10
 */

import { createClient } from "@supabase/supabase-js";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
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
  console.error("[export] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

interface LessonRow {
  id: string;
  title: string | null;
  course_id: string | null;
  unit_number: number | null;
  lesson_number: number | null;
}
interface ScriptRow {
  lesson_id: string;
  script: string | null;
}
interface ExportEntry {
  lesson_id: string;
  title: string;
  course_id: string;
  unit_number: number;
  lesson_number: number;
  script: string;
}

// Small inline variant of getCourseIdVariants (this script doesn't import from
// the app so it can run as a standalone Node process without the Next runtime).
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

function parseArg(name: string, fallback?: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1 || i === process.argv.length - 1) return fallback;
  return process.argv[i + 1];
}

async function main() {
  // Accept either --course or --subject; --subject is a legacy alias.
  const filterCourse = parseArg("course") ?? parseArg("subject");
  const limitArg = parseArg("limit");
  const limit = limitArg ? Number(limitArg) : undefined;

  console.log("[export] querying lessons…", { filterCourse, limit });

  let lessonsQuery = supabase
    .from("lessons")
    .select("id, title, course_id, unit_number, lesson_number")
    .order("course_id", { ascending: true })
    .order("unit_number", { ascending: true })
    .order("lesson_number", { ascending: true });

  if (filterCourse) {
    const variants = getCourseIdVariants(filterCourse);
    lessonsQuery = lessonsQuery.in("course_id", variants);
  }
  if (limit) lessonsQuery = lessonsQuery.limit(limit);

  const { data: lessonRows, error: lessonErr } = await lessonsQuery;
  if (lessonErr) {
    console.error("[export] lessons query failed:", lessonErr.message);
    process.exit(1);
  }
  const lessons = (lessonRows ?? []) as LessonRow[];
  console.log(`[export] ${lessons.length} lessons matched.`);

  if (lessons.length === 0) {
    console.log("[export] nothing to export.");
    process.exit(0);
  }

  const lessonIds = lessons.map((l) => l.id);
  const { data: scriptRows, error: scriptErr } = await supabase
    .from("lesson_scripts")
    .select("lesson_id, script")
    .in("lesson_id", lessonIds);
  if (scriptErr) {
    console.error("[export] lesson_scripts query failed:", scriptErr.message);
    process.exit(1);
  }
  const scriptByLesson = new Map<string, string>();
  for (const row of (scriptRows ?? []) as ScriptRow[]) {
    if (row.script && row.script.trim().length > 0) {
      scriptByLesson.set(row.lesson_id, row.script);
    }
  }
  console.log(`[export] ${scriptByLesson.size} lessons have scripts.`);

  const entries: ExportEntry[] = [];
  let missingScript = 0;
  for (const l of lessons) {
    const script = scriptByLesson.get(l.id);
    if (!script) {
      missingScript++;
      continue;
    }
    entries.push({
      lesson_id: l.id,
      title: l.title ?? "(untitled)",
      course_id: l.course_id ?? "unknown",
      unit_number: l.unit_number ?? 0,
      lesson_number: l.lesson_number ?? 0,
      script,
    });
  }

  console.log(`[export] writing ${entries.length} entries (${missingScript} skipped — no script).`);

  const dataDir = resolve(process.cwd(), "data");
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  const out = resolve(dataDir, "lessons-export.json");
  writeFileSync(out, JSON.stringify(entries, null, 2), "utf8");
  console.log(`[export] ✓ ${out}`);
}

main().catch((err) => {
  console.error("[export] fatal:", err);
  process.exit(1);
});
