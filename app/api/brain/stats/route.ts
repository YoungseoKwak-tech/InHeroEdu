// GET /api/brain/stats
//
// Returns the 5 brain stats for the viewer. All computed from
// raw tables — study_sessions, student_chapter_progress,
// chat_messages (curiosity), etc. No precomputed cache (yet).

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isoDaysAgo(n: number): string {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();
}

// Streak = consecutive days (counting today) with at least one
// session of total > 5 minutes. Walks backward from today; stops
// at the first gap.
function computeStreak(daySeconds: Map<string, number>): number {
  let streak = 0;
  const MS = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  for (let i = 0; i < 365; i++) {
    const day = new Date(today.getTime() - i * MS);
    const key = day.toISOString().slice(0, 10);
    const secs = daySeconds.get(key) ?? 0;
    if (secs >= 5 * 60) {
      streak += 1;
    } else if (i === 0) {
      // Today not yet qualifying — keep counting from yesterday.
      continue;
    } else {
      break;
    }
  }
  return streak;
}

function bestStreak(daySeconds: Map<string, number>): number {
  const sortedKeys = Array.from(daySeconds.keys()).sort();
  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const key of sortedKeys) {
    const secs = daySeconds.get(key) ?? 0;
    if (secs < 5 * 60) {
      if (run > best) best = run;
      run = 0;
      prev = null;
      continue;
    }
    const day = new Date(key + "T00:00:00Z");
    if (prev && day.getTime() - prev.getTime() === 24 * 60 * 60 * 1000) {
      run += 1;
    } else {
      run = 1;
    }
    if (run > best) best = run;
    prev = day;
  }
  return best;
}

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;
  const sb = createAdminClient();

  // ── Sessions: last 60 days, used by streak + focus + growth.
  const sessionsSince = isoDaysAgo(60);
  const { data: sessions } = await sb
    .from("study_sessions")
    .select("started_at, duration_seconds")
    .eq("user_id", user.id)
    .gte("started_at", sessionsSince);

  const daySeconds = new Map<string, number>();
  for (const s of sessions ?? []) {
    const key = (s.started_at as string).slice(0, 10);
    daySeconds.set(key, (daySeconds.get(key) ?? 0) + ((s.duration_seconds as number | null) ?? 0));
  }

  const streak = computeStreak(daySeconds);
  const best = bestStreak(daySeconds);

  // Focus = longest single session in the past 7 days.
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  let longestThisWeek = 0;
  for (const s of sessions ?? []) {
    const t = new Date(s.started_at as string).getTime();
    if (t >= sevenDaysAgo) {
      const d = (s.duration_seconds as number | null) ?? 0;
      if (d > longestThisWeek) longestThisWeek = d;
    }
  }
  const fourteenDaysAgo = sevenDaysAgo - 7 * 24 * 60 * 60 * 1000;
  let longestPrevWeek = 0;
  for (const s of sessions ?? []) {
    const t = new Date(s.started_at as string).getTime();
    if (t >= fourteenDaysAgo && t < sevenDaysAgo) {
      const d = (s.duration_seconds as number | null) ?? 0;
      if (d > longestPrevWeek) longestPrevWeek = d;
    }
  }
  const focusDeltaMin = Math.round((longestThisWeek - longestPrevWeek) / 60);

  // Growth = this-week study time vs last-week, as percentage.
  let thisWeekSec = 0, lastWeekSec = 0;
  for (const s of sessions ?? []) {
    const t = new Date(s.started_at as string).getTime();
    const d = (s.duration_seconds as number | null) ?? 0;
    if (t >= sevenDaysAgo) thisWeekSec += d;
    else if (t >= fourteenDaysAgo) lastWeekSec += d;
  }
  const growthPct = lastWeekSec > 0
    ? Math.round(((thisWeekSec - lastWeekSec) / lastWeekSec) * 100)
    : thisWeekSec > 0 ? 100 : 0;

  // ── Mastery: completed chapters across all textbooks.
  const { data: completed } = await sb
    .from("student_chapter_progress")
    .select("chapter_id, status, completed_at")
    .eq("user_id", user.id)
    .eq("status", "completed");
  const masteredCount = completed?.length ?? 0;
  const masteredThisWeek = (completed ?? []).filter((r) => {
    const t = r.completed_at ? new Date(r.completed_at as string).getTime() : 0;
    return t >= sevenDaysAgo;
  }).length;

  // Total chapters available (across published textbooks) — sum
  // of textbooks.total_chapters.
  const { data: tbs } = await sb
    .from("textbooks")
    .select("total_chapters")
    .eq("is_published", true);
  const totalChapters = (tbs ?? []).reduce((sum, t) => sum + ((t.total_chapters as number | null) ?? 0), 0);

  // ── Curiosity: messages authored by user in lounges in last
  // 7 days (proxy for "asking questions"). Cheap approximation
  // until we have a real AI-tutor surface.
  const { count: curiosityCount } = await sb
    .from("chat_messages")
    .select("id", { count: "exact", head: true })
    .eq("author_id", user.id)
    .eq("context_type", "lounge")
    .eq("is_deleted", false)
    .gte("created_at", new Date(sevenDaysAgo).toISOString());
  const { count: curiosityPrevWeek } = await sb
    .from("chat_messages")
    .select("id", { count: "exact", head: true })
    .eq("author_id", user.id)
    .eq("context_type", "lounge")
    .eq("is_deleted", false)
    .gte("created_at", new Date(fourteenDaysAgo).toISOString())
    .lt("created_at", new Date(sevenDaysAgo).toISOString());
  const curiosityDelta = (curiosityCount ?? 0) - (curiosityPrevWeek ?? 0);

  // Per-day session seconds for the heatmap (last 60 days).
  const heatmap = Array.from(daySeconds.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, seconds]) => ({ day, seconds }));

  return NextResponse.json({
    ok: true,
    stats: {
      mastery: { mastered: masteredCount, total: totalChapters, delta_this_week: masteredThisWeek },
      consistency: { streak, best },
      focus: { longest_minutes_this_week: Math.round(longestThisWeek / 60), delta_minutes: focusDeltaMin },
      curiosity: { questions_this_week: curiosityCount ?? 0, delta: curiosityDelta },
      growth: { percent_change: growthPct, this_week_min: Math.round(thisWeekSec / 60), last_week_min: Math.round(lastWeekSec / 60) },
    },
    heatmap,
  });
}
