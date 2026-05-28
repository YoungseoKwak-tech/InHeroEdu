/**
 * /api/streak
 *
 * Single source of truth for the student's TAP_QUICK streak — used by both
 * the in-lesson popup (which also keeps a local mirror for instant UI) and
 * the always-visible navbar pill.
 *
 *   GET    → { current_streak, highest_streak, current_tier, last_correct_at }
 *   PATCH  → body { correct: boolean }
 *            correct=true  → current_streak += 1, recompute tier, bump highest
 *            correct=false → current_streak = 0
 *
 * Server bypasses RLS via the admin client. The table also has RLS policies
 * scoping students to their own row in case anything ever talks to it from
 * the anon key.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { getTier, type StreakTier } from "@/lib/streakTiers";

export const dynamic = "force-dynamic";

interface StreakRow {
  user_id: string;
  current_streak: number;
  highest_streak: number;
  current_tier: StreakTier;
  last_correct_at: string | null;
  updated_at: string;
}

function emptyState(userId: string): StreakRow {
  return {
    user_id: userId,
    current_streak: 0,
    highest_streak: 0,
    current_tier: getTier(0).id as StreakTier,
    last_correct_at: null,
    updated_at: new Date().toISOString(),
  };
}

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("student_streak_state")
    .select("user_id, current_streak, highest_streak, current_tier, last_correct_at, updated_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("[/api/streak GET] query failed", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data: (data as StreakRow | null) ?? emptyState(user.id) });
}

export async function PATCH(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: { correct?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  if (typeof body.correct !== "boolean") {
    return NextResponse.json({ error: "correct (boolean) required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: existing, error: readErr } = await supabase
    .from("student_streak_state")
    .select("current_streak, highest_streak")
    .eq("user_id", user.id)
    .maybeSingle();
  if (readErr) {
    console.error("[/api/streak PATCH] read failed", readErr.message);
    return NextResponse.json({ error: readErr.message }, { status: 500 });
  }

  const prevCurrent = existing?.current_streak ?? 0;
  const prevHighest = existing?.highest_streak ?? 0;

  const nextCurrent = body.correct ? prevCurrent + 1 : 0;
  const nextHighest = Math.max(prevHighest, nextCurrent);
  const nextTier = getTier(nextCurrent).id as StreakTier;
  const nowIso = new Date().toISOString();

  const { data: row, error: upsertErr } = await supabase
    .from("student_streak_state")
    .upsert(
      {
        user_id: user.id,
        current_streak: nextCurrent,
        highest_streak: nextHighest,
        current_tier: nextTier,
        last_correct_at: body.correct ? nowIso : (existing ? undefined : null),
        updated_at: nowIso,
      },
      { onConflict: "user_id" }
    )
    .select("user_id, current_streak, highest_streak, current_tier, last_correct_at, updated_at")
    .single();

  if (upsertErr) {
    console.error("[/api/streak PATCH] upsert failed", upsertErr.message);
    return NextResponse.json({ error: upsertErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data: row as StreakRow });
}
