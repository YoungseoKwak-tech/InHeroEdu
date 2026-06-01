/**
 * GET /api/lesson-progress/summary?lessonIds=id1,id2,…
 *
 * Per-lesson completion summary for the signed-in student. Reads
 * lesson_progress (per-overlay interaction rows) + overlays (per-lesson
 * checkpoint count) and returns:
 *
 *   { ok, summary: { [lessonId]: { interacted, total, percent, complete } } }
 *
 * Powers the course Units page badges. "complete" means every overlay
 * checkpoint in the lesson has at least one interaction by this user.
 * "interacted" counts distinct part_ids — re-answering the same overlay
 * does not inflate the percentage.
 *
 * Anonymous / signed-out → returns an empty summary object so the client
 * can still render the page without an error branch.
 */
import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const MAX_LESSONS = 200;

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) {
    // Signed-out — return empty so the UI can render Watch/Coming Soon only.
    return NextResponse.json({ ok: true, summary: {} });
  }

  const raw = req.nextUrl.searchParams.get("lessonIds") ?? "";
  const lessonIds = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX_LESSONS);

  if (lessonIds.length === 0) {
    return NextResponse.json({ ok: true, summary: {} });
  }

  const supabase = createAdminClient();

  const [progressRes, overlayRes] = await Promise.all([
    supabase
      .from("lesson_progress")
      .select("lesson_id, part_id")
      .eq("user_id", user.id)
      .in("lesson_id", lessonIds),
    supabase
      .from("overlays")
      .select("lesson_id")
      .in("lesson_id", lessonIds),
  ]);

  if (progressRes.error) {
    console.error("[lesson-progress/summary] progress:", progressRes.error.message);
    return NextResponse.json({ error: progressRes.error.message }, { status: 500 });
  }
  if (overlayRes.error) {
    console.error("[lesson-progress/summary] overlays:", overlayRes.error.message);
    return NextResponse.json({ error: overlayRes.error.message }, { status: 500 });
  }

  // distinct part_id per lesson
  const interactedByLesson = new Map<string, Set<string>>();
  for (const row of progressRes.data ?? []) {
    const lid = row.lesson_id as string;
    const pid = row.part_id as string;
    if (!interactedByLesson.has(lid)) interactedByLesson.set(lid, new Set());
    interactedByLesson.get(lid)!.add(pid);
  }

  const overlayCountByLesson = new Map<string, number>();
  for (const row of overlayRes.data ?? []) {
    const lid = row.lesson_id as string;
    overlayCountByLesson.set(lid, (overlayCountByLesson.get(lid) ?? 0) + 1);
  }

  const summary: Record<
    string,
    { interacted: number; total: number; percent: number; complete: boolean }
  > = {};

  for (const id of lessonIds) {
    const interacted = interactedByLesson.get(id)?.size ?? 0;
    const total = overlayCountByLesson.get(id) ?? 0;
    const percent = total > 0 ? Math.min(100, Math.round((interacted / total) * 100)) : 0;
    const complete = total > 0 && interacted >= total;
    summary[id] = { interacted, total, percent, complete };
  }

  return NextResponse.json({ ok: true, summary });
}
