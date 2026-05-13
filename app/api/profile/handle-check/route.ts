import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { validateHandle } from "@/lib/trajectory";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/profile/handle-check { handle }
 * Returns { available, reason? }. Auth-gated so we don't expose handle
 * enumeration to anonymous traffic.
 */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: { handle?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ available: false, reason: "invalid JSON" }, { status: 400 });
  }

  const v = validateHandle(String(body.handle ?? ""));
  if (!v.ok) return NextResponse.json({ available: false, reason: v.reason });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("profiles_public")
    .select("user_id")
    .ilike("display_handle", v.handle)
    .maybeSingle();

  if (error) return NextResponse.json({ available: false, reason: error.message }, { status: 500 });

  // Allow if the matching row is the user's own (case-only change).
  if (data && data.user_id !== user.id) {
    return NextResponse.json({ available: false, reason: "Already taken." });
  }
  return NextResponse.json({ available: true, handle: v.handle });
}
