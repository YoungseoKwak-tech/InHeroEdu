/**
 * /api/attention/windows
 *
 * GET ?session=<uuid>           → all bins for the requesting student
 * GET ?session=<uuid>&user=<id> → admin-only, view another student's bins
 *
 * Returns the resampled multi-channel signal as an ordered array of bins.
 * Consumers (visualization dashboard, Stage-2 feature extractor) read this
 * shape directly; missing-value semantics (null = NaN, 0 = empty count) are
 * preserved.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const sessionId = req.nextUrl.searchParams.get("session");
  if (!sessionId) {
    return NextResponse.json({ error: "session query param required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("attention_signal_windows")
    .select("*")
    .eq("session_id", sessionId)
    .eq("user_id", user.id) // students see only their own — RLS-equivalent.
    .order("bin_index", { ascending: true });

  if (error) {
    console.error("[/api/attention/windows] query failed", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    session_id: sessionId,
    bin_count: data?.length ?? 0,
    bins: data ?? [],
  });
}
