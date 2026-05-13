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

  // Deep diagnostic: pull every row and compare user_ids in JS so we can
  // see character-level differences if PostgREST's .eq filter is being
  // weird.
  const { data: allRows } = await supabase
    .from("profiles_public")
    .select("user_id, display_handle");
  const rows = (allRows ?? []) as { user_id: string; display_handle: string }[];
  const match = rows.find((r) => r.user_id === user.id);
  console.log("[/api/profile/me] deep diagnostic", {
    userIdRaw: JSON.stringify(user.id),
    userIdLen: user.id.length,
    rowCount: rows.length,
    rowUserIds: rows.map((r) => ({ id: JSON.stringify(r.user_id), len: r.user_id.length, handle: r.display_handle })),
    jsMatch: !!match,
  });

  // If JS-side comparison finds it, use that directly — bypass PostgREST .eq.
  if (match) {
    const fullRow = await supabase
      .from("profiles_public")
      .select("*")
      .eq("user_id", match.user_id)
      .maybeSingle();
    if (fullRow.data) {
      const { data: badges } = await supabase
        .from("badges")
        .select("*")
        .eq("user_id", match.user_id);
      return NextResponse.json({
        ok: true,
        profile: toPublic(fullRow.data as ProfilePublicRow, (badges ?? []) as BadgeRow[]),
      });
    }
    // Fallback: hydrate from the deep-diagnostic row even if .eq fails again.
    const { data: badges } = await supabase
      .from("badges")
      .select("*")
      .eq("user_id", match.user_id);
    const minimal: ProfilePublicRow = {
      user_id: match.user_id,
      display_handle: match.display_handle,
      ambition_tags: [],
      target_schools: [],
      graduation_year: null,
      bio: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return NextResponse.json({
      ok: true,
      profile: toPublic(minimal, (badges ?? []) as BadgeRow[]),
    });
  }

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
