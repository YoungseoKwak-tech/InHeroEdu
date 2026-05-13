import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { toPublic, type BadgeRow, type ProfilePublicRow } from "@/lib/trajectory";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/profile/me
 * Returns the current user's trajectory profile, or { profile: null } if
 * they have not gone through onboarding yet (= modal should prompt them).
 */
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();
  const { data: profile, error: profileErr } = await supabase
    .from("profiles_public")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileErr) {
    return NextResponse.json({ error: profileErr.message }, { status: 500 });
  }
  if (!profile) {
    return NextResponse.json({ ok: true, profile: null });
  }

  const { data: badges } = await supabase
    .from("badges")
    .select("*")
    .eq("user_id", user.id);

  return NextResponse.json({
    ok: true,
    profile: toPublic(profile as ProfilePublicRow, (badges ?? []) as BadgeRow[]),
  });
}
