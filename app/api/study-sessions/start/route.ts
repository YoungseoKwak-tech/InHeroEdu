// POST /api/study-sessions/start
//
// Opens a study session row. Returns session_id which the client
// holds in memory and replays on heartbeat / end. Auto-closes any
// previously open sessions for this user that have been idle for
// more than 5 minutes — defends against the case where the
// previous reader tab was closed without firing /end.

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Body {
  activity_type?: string;
  resource_id?: string | null;
  resource_type?: string | null;
  subject_slug?: string | null;
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => null)) as Body | null;
  const activity_type = body?.activity_type ?? "reading";
  const resource_id = body?.resource_id ?? null;
  const resource_type = body?.resource_type ?? null;
  const subject_slug = body?.subject_slug ?? null;

  const sb = createAdminClient();

  // Auto-close any stale open sessions for this user (started > 5
  // min ago and never ended). Their duration is "now − started_at".
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  await sb
    .from("study_sessions")
    .update({
      ended_at: new Date().toISOString(),
      duration_seconds: 60 * 5, // capped: we don't know when they actually stopped
    })
    .eq("user_id", user.id)
    .is("ended_at", null)
    .lt("started_at", fiveMinAgo);

  const { data, error } = await sb
    .from("study_sessions")
    .insert({
      user_id: user.id,
      activity_type,
      resource_id,
      resource_type,
      subject_slug,
    })
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "failed to start" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, session_id: data.id });
}
