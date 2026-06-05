/**
 * GET /api/me/study-summary
 *
 * Single round-trip powering the /dashboard page with the student's REAL
 * study history — no mock data. Aggregates:
 *
 *   - learning_events  → study days, correct answers, AI questions,
 *                        weak concepts, 28-day activity grid, day streak
 *   - lesson_progress + overlays → per-lesson completion (same definition
 *                        as /api/lesson-progress/summary: every overlay
 *                        checkpoint interacted at least once)
 *   - lessons          → titles + per-course lesson totals
 *
 * A brand-new account gets all-zero stats and empty lists — the dashboard
 * renders honest empty states instead of fabricated history.
 */
import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { inferCourseIdFromLessonId } from "@/lib/learning-tracking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_EVENTS = 5000;
const ACTIVITY_DAYS = 28;

interface EventRow {
  lesson_id: string | null;
  course_id: string | null;
  event_type: string;
  correct: boolean | null;
  concept_name: string | null;
  value_num: number | null;
  created_at: string;
}

function dayKey(iso: string): string {
  return iso.slice(0, 10); // UTC YYYY-MM-DD
}

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();

  const [eventsRes, progressRes, lessonsRes] = await Promise.all([
    supabase
      .from("learning_events")
      .select("lesson_id, course_id, event_type, correct, concept_name, value_num, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(MAX_EVENTS),
    supabase
      .from("lesson_progress")
      .select("lesson_id, part_id, created_at")
      .eq("user_id", user.id),
    supabase.from("lessons").select("id, title, course_id"),
  ]);

  if (eventsRes.error) {
    console.error("[study-summary] events:", eventsRes.error.message);
  }
  if (progressRes.error) {
    console.error("[study-summary] progress:", progressRes.error.message);
  }

  const events = (eventsRes.data ?? []) as EventRow[];
  const progressRows = (progressRes.data ?? []) as Array<{
    lesson_id: string;
    part_id: string;
    created_at: string;
  }>;
  const lessonRows = (lessonsRes.data ?? []) as Array<{
    id: string;
    title: string | null;
    course_id: string | null;
  }>;

  const lessonTitle = new Map<string, { title: string | null; courseId: string | null }>();
  const lessonsPerCourse = new Map<string, number>();
  for (const row of lessonRows) {
    lessonTitle.set(row.id, { title: row.title, courseId: row.course_id });
    if (row.course_id) {
      lessonsPerCourse.set(row.course_id, (lessonsPerCourse.get(row.course_id) ?? 0) + 1);
    }
  }

  // ── Per-lesson completion (same definition as lesson-progress/summary) ──
  const interactedParts = new Map<string, Set<string>>();
  for (const row of progressRows) {
    let set = interactedParts.get(row.lesson_id);
    if (!set) {
      set = new Set();
      interactedParts.set(row.lesson_id, set);
    }
    set.add(row.part_id);
  }

  const touchedLessonIds = Array.from(interactedParts.keys());
  const overlayCounts = new Map<string, number>();
  if (touchedLessonIds.length > 0) {
    const { data: overlayRows } = await supabase
      .from("overlays")
      .select("lesson_id")
      .in("lesson_id", touchedLessonIds.slice(0, 200));
    for (const row of (overlayRows ?? []) as Array<{ lesson_id: string }>) {
      overlayCounts.set(row.lesson_id, (overlayCounts.get(row.lesson_id) ?? 0) + 1);
    }
  }

  const completedLessons = new Set<string>();
  for (const [lessonId, parts] of interactedParts) {
    const total = overlayCounts.get(lessonId) ?? 0;
    if (total > 0 && parts.size >= total) completedLessons.add(lessonId);
  }

  // ── Per-subject progress ────────────────────────────────────────────────
  const completedPerCourse = new Map<string, number>();
  const startedPerCourse = new Map<string, number>();
  for (const lessonId of touchedLessonIds) {
    const courseId =
      lessonTitle.get(lessonId)?.courseId ?? inferCourseIdFromLessonId(lessonId);
    if (!courseId) continue;
    startedPerCourse.set(courseId, (startedPerCourse.get(courseId) ?? 0) + 1);
    if (completedLessons.has(lessonId)) {
      completedPerCourse.set(courseId, (completedPerCourse.get(courseId) ?? 0) + 1);
    }
  }

  // ── Event-derived stats ─────────────────────────────────────────────────
  const answerEvents = events.filter(
    (e) =>
      (e.event_type === "question_answered" || e.event_type === "overlay_submitted") &&
      typeof e.correct === "boolean"
  );
  const questionsAnswered = answerEvents.length;
  const questionsCorrect = answerEvents.filter((e) => e.correct === true).length;
  const aiQuestions = events.filter((e) => e.event_type === "chat_message_sent").length;

  // Study days: distinct UTC dates across events AND legacy progress rows.
  const activeDays = new Set<string>();
  for (const e of events) activeDays.add(dayKey(e.created_at));
  for (const p of progressRows) activeDays.add(dayKey(p.created_at));

  // 28-day activity grid (oldest → newest) + consecutive-day streak.
  const today = new Date();
  const last28: number[] = [];
  for (let i = ACTIVITY_DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    last28.push(activeDays.has(d.toISOString().slice(0, 10)) ? 1 : 0);
  }
  let streakDays = 0;
  for (let i = 0; ; i++) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const active = activeDays.has(d.toISOString().slice(0, 10));
    if (active) {
      streakDays++;
    } else if (i === 0) {
      continue; // today inactive doesn't break a streak ending yesterday
    } else {
      break;
    }
    if (i > 366) break;
  }

  // ── Recent lessons (latest activity per lesson, newest first) ───────────
  const lastSeen = new Map<string, string>();
  const secondsSpent = new Map<string, number>();
  for (const e of events) {
    if (!e.lesson_id) continue;
    if (!lastSeen.has(e.lesson_id)) lastSeen.set(e.lesson_id, e.created_at); // events are desc
    if (
      (e.event_type === "question_answered" || e.event_type === "overlay_submitted") &&
      typeof e.value_num === "number" &&
      e.value_num > 0 &&
      e.value_num < 3600
    ) {
      secondsSpent.set(e.lesson_id, (secondsSpent.get(e.lesson_id) ?? 0) + e.value_num);
    }
  }
  for (const p of progressRows) {
    const prev = lastSeen.get(p.lesson_id);
    if (!prev || p.created_at > prev) lastSeen.set(p.lesson_id, p.created_at);
  }

  const recentLessons = Array.from(lastSeen.entries())
    .sort((a, b) => (a[1] < b[1] ? 1 : -1))
    .slice(0, 3)
    .map(([lessonId, lastAt]) => {
      const meta = lessonTitle.get(lessonId);
      return {
        lessonId,
        courseId: meta?.courseId ?? inferCourseIdFromLessonId(lessonId),
        title: meta?.title ?? null,
        lastAt,
        secondsSpent: secondsSpent.get(lessonId) ?? 0,
        completed: completedLessons.has(lessonId),
      };
    });

  // ── Weak concepts (lowest accuracy, ≥2 graded answers, <80%) ────────────
  const conceptAgg = new Map<string, { correct: number; total: number; courseId: string | null }>();
  for (const e of answerEvents) {
    const concept =
      e.concept_name?.trim() ||
      (e.lesson_id ? lessonTitle.get(e.lesson_id)?.title ?? null : null);
    if (!concept) continue;
    const agg = conceptAgg.get(concept) ?? { correct: 0, total: 0, courseId: e.course_id };
    agg.total += 1;
    if (e.correct === true) agg.correct += 1;
    conceptAgg.set(concept, agg);
  }
  const weakTopics = Array.from(conceptAgg.entries())
    .map(([concept, agg]) => ({
      concept,
      courseId: agg.courseId,
      correct: agg.correct,
      total: agg.total,
      percent: Math.round((agg.correct / agg.total) * 100),
    }))
    .filter((t) => t.total >= 2 && t.percent < 80)
    .sort((a, b) => a.percent - b.percent)
    .slice(0, 3);

  // ── Continue target: most recently touched lesson ───────────────────────
  const mostRecent = recentLessons[0] ?? null;

  return NextResponse.json({
    ok: true,
    stats: {
      lessonsCompleted: completedLessons.size,
      lessonsStarted: touchedLessonIds.length,
      studyDays: activeDays.size,
      questionsAnswered,
      questionsCorrect,
      aiQuestions,
    },
    subjects: Array.from(
      new Set([...startedPerCourse.keys(), ...completedPerCourse.keys()])
    ).map((courseId) => ({
      courseId,
      completed: completedPerCourse.get(courseId) ?? 0,
      started: startedPerCourse.get(courseId) ?? 0,
      totalLessons: lessonsPerCourse.get(courseId) ?? null,
    })),
    lessonsPerCourse: Object.fromEntries(lessonsPerCourse),
    recentLessons,
    continueLesson: mostRecent
      ? {
          lessonId: mostRecent.lessonId,
          courseId: mostRecent.courseId,
          title: mostRecent.title,
        }
      : null,
    weakTopics,
    activity: {
      last28,
      streakDays,
    },
  });
}
