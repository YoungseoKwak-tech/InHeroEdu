import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import type { ClubRow } from "@/lib/clubs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST /api/clubs/[slug]/join — toggle membership (idempotent). */
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { slug: rawSlug } = await params;
  const slug = String(rawSlug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = createAdminClient();

  // Require a trajectory profile.
  const profilesAll = await supabase
    .from("profiles_public")
    .select("user_id");
  const hasProfile = ((profilesAll.data ?? []) as { user_id: string }[]).some(
    (p) => p.user_id === user.id
  );
  if (!hasProfile) {
    return NextResponse.json(
      { error: "Claim your trajectory handle before joining a club." },
      { status: 403 }
    );
  }

  // Find the club.
  const { data: club } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!club) return NextResponse.json({ error: "club not found" }, { status: 404 });

  // Toggle: if already a member, leave. Else join.
  const allMembers = await supabase
    .from("club_members")
    .select("club_id, user_id")
    .eq("club_id", (club as ClubRow).id);
  const existing = ((allMembers.data ?? []) as { club_id: string; user_id: string }[]).find(
    (m) => m.user_id === user.id
  );

  if (existing) {
    const { error } = await supabase
      .from("club_members")
      .delete()
      .eq("club_id", (club as ClubRow).id)
      .eq("user_id", user.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, isMember: false });
  } else {
    const { error } = await supabase
      .from("club_members")
      .insert({ club_id: (club as ClubRow).id, user_id: user.id });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, isMember: true });
  }
}
