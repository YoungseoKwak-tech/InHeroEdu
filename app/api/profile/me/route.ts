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
    console.error("[/api/profile/me] read error", { userId: user.id, message: profileErr.message });
    return NextResponse.json({ error: profileErr.message }, { status: 500 });
  }
  if (!profile) {
    console.log("[/api/profile/me] no profile for user", { userId: user.id });
    return NextResponse.json({ ok: true, profile: null });
  }
  console.log("[/api/profile/me] profile found", { userId: user.id, handle: (profile as ProfilePublicRow).display_handle });

  const { data: badges } = await supabase
    .from("badges")
    .select("*")
    .eq("user_id", user.id);

  return NextResponse.json({
    ok: true,
    profile: toPublic(profile as ProfilePublicRow, (badges ?? []) as BadgeRow[]),
  });
}
