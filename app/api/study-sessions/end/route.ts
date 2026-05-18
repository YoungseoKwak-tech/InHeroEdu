// POST /api/study-sessions/end
//
// Finalizes a session: sets ended_at + duration_seconds.
// Idempotent — repeated calls on a closed session no-op.
// Sessions shorter than 30 seconds are still recorded; the
// streak / brain-stat queries do their own thresholding.

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => null)) as { session_id?: string } | null;
  const sessionId = typeof body?.session_id === "string" ? body.session_id : "";
  if (!sessionId) return NextResponse.json({ error: "session_id required" }, { status: 400 });

  const sb = createAdminClient();
  const { data: session } = await sb
    .from("study_sessions")
    .select("started_at, user_id, ended_at")
    .eq("id", sessionId)
    .maybeSingle();
  if (!session || session.user_id !== user.id) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  if (session.ended_at) {
    return NextResponse.json({ ok: true, already_ended: true });
  }
  const now = Date.now();
  const duration = Math.max(0, Math.floor((now - new Date(session.started_at).getTime()) / 1000));
  await sb
    .from("study_sessions")
    .update({
      ended_at: new Date(now).toISOString(),
      duration_seconds: duration,
    })
    .eq("id", sessionId);

  // Log a recent-event so the /future history strip shows it.
  if (duration >= 60) {
    await sb.from("recent_events").insert({
      user_id: user.id,
      event_type: "session_logged",
      payload: { duration_seconds: duration, session_id: sessionId },
    });
  }

  return NextResponse.json({ ok: true, duration_seconds: duration });
}
