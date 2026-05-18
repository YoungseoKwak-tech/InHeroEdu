// POST /api/study-sessions/heartbeat
//
// Bumps a live session's tentative duration. Idempotent — the
// finalized duration_seconds is written by /end, but heartbeats
// let us survive an unreliable unload (browser tab killed
// without beacon firing) by keeping an up-to-date estimate.

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
  const elapsed = Math.max(
    0,
    Math.floor((Date.now() - new Date(session.started_at).getTime()) / 1000),
  );
  await sb
    .from("study_sessions")
    .update({ duration_seconds: elapsed })
    .eq("id", sessionId);
  return NextResponse.json({ ok: true, duration_seconds: elapsed });
}
