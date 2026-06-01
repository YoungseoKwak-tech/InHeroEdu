/**
 * scripts/audit-content.ts
 *
 * One-shot diagnostic. Asks the production DB which lessons actually
 * have student-visible content (clip_url or video_url or overlays) and
 * groups the result by course. The catalog UI should never claim more
 * than what comes back here.
 *
 * Run:  npx tsx scripts/audit-content.ts
 */

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

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
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("[audit] missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

interface LessonRow {
  id: string;
  course_id: string;
  title: string;
  unit_number: number | null;
  lesson_number: number | null;
}

async function fetchAll<T>(table: string, columns: string, filter?: (q: ReturnType<typeof supabase.from>) => unknown): Promise<T[]> {
  const out: T[] = [];
  const PAGE = 1000;
  let offset = 0;
  for (;;) {
    let q = supabase.from(table).select(columns).range(offset, offset + PAGE - 1);
    if (filter) q = filter(q) as typeof q;
    const { data, error } = await q;
    if (error) {
      console.error(`[audit] ${table}: ${error.message}`);
      return out;
    }
    if (!data || data.length === 0) break;
    out.push(...(data as T[]));
    if (data.length < PAGE) break;
    offset += PAGE;
  }
  return out;
}

async function main() {
  console.log("[audit] connecting to:", SUPABASE_URL);
  console.log("[audit] fetching lessons, lesson_clips (clip_url not null), overlays, lesson_scripts (video_url not null)…\n");

  const [lessons, clipRows, overlayRows, scriptRows] = await Promise.all([
    fetchAll<LessonRow>("lessons", "id, course_id, title, unit_number, lesson_number"),
    fetchAll<{ lesson_id: string }>("lesson_clips", "lesson_id", (q) => q.not("clip_url", "is", null)),
    fetchAll<{ lesson_id: string }>("overlays", "lesson_id"),
    fetchAll<{ lesson_id: string }>("lesson_scripts", "lesson_id", (q) => q.not("video_url", "is", null)),
  ]);

  const clipCount = new Map<string, number>();
  for (const r of clipRows) clipCount.set(r.lesson_id, (clipCount.get(r.lesson_id) ?? 0) + 1);
  const overlayCount = new Map<string, number>();
  for (const r of overlayRows) overlayCount.set(r.lesson_id, (overlayCount.get(r.lesson_id) ?? 0) + 1);
  const hasVideo = new Set(scriptRows.map((r) => r.lesson_id));

  // Per-lesson — only lessons WITH any content
  const withContent = lessons
    .map((l) => ({
      ...l,
      clips: clipCount.get(l.id) ?? 0,
      overlays: overlayCount.get(l.id) ?? 0,
      video_url: hasVideo.has(l.id),
    }))
    .filter((r) => r.clips > 0 || r.overlays > 0 || r.video_url)
    .sort((a, b) => {
      if (a.course_id !== b.course_id) return a.course_id.localeCompare(b.course_id);
      return (a.unit_number ?? 0) - (b.unit_number ?? 0) || (a.lesson_number ?? 0) - (b.lesson_number ?? 0);
    });

  console.log(`=== Q1: lessons with ANY content (${withContent.length} rows) ===\n`);
  console.log("course_id".padEnd(28) + "u.l".padEnd(8) + "lesson_id".padEnd(40) + "clips overlays video  title");
  console.log("-".repeat(120));
  for (const r of withContent) {
    const ul = `${r.unit_number ?? "-"}.${r.lesson_number ?? "-"}`;
    console.log(
      r.course_id.padEnd(28) +
      ul.padEnd(8) +
      r.id.padEnd(40) +
      String(r.clips).padEnd(6) +
      String(r.overlays).padEnd(9) +
      (r.video_url ? "yes  " : "no   ") +
      " " +
      r.title
    );
  }
  console.log("");

  // Per-course summary
  const perCourse = new Map<string, { playable: number; total: number }>();
  for (const l of lessons) {
    const c = perCourse.get(l.course_id) ?? { playable: 0, total: 0 };
    c.total += 1;
    if ((clipCount.get(l.id) ?? 0) > 0 || hasVideo.has(l.id)) c.playable += 1;
    perCourse.set(l.course_id, c);
  }
  const sortedCourses = [...perCourse.entries()].sort((a, b) => (b[1].playable - a[1].playable) || a[0].localeCompare(b[0]));

  console.log("=== Q2: per-course summary ===\n");
  console.log("course_id".padEnd(28) + "playable  total");
  console.log("-".repeat(48));
  for (const [cid, c] of sortedCourses) {
    console.log(cid.padEnd(28) + String(c.playable).padEnd(10) + String(c.total));
  }
  console.log("");

  // Aggregate
  console.log("=== Q3: aggregate ===\n");
  console.log(`total_lessons_metadata     : ${lessons.length}`);
  console.log(`lessons_with_clips         : ${clipCount.size}`);
  console.log(`lessons_with_video_url     : ${hasVideo.size}`);
  console.log(`lessons_with_overlays      : ${overlayCount.size}`);
  console.log(`courses_in_lessons_table   : ${new Set(lessons.map((l) => l.course_id)).size}`);
  console.log("");
  console.log("[audit] done.");
}

main().catch((err) => { console.error("[audit] fatal:", err); process.exit(1); });
