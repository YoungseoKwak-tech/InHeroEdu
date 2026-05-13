import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  hydrateClubMembers,
  toClubPublic,
  type ClubMemberRow,
  type ClubRow,
} from "@/lib/clubs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/clubs/[slug] — club room + member showcase. */
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const supabase = createAdminClient();
  const slug = String(params.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const { data: club } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!club) return NextResponse.json({ error: "club not found" }, { status: 404 });

  const { data: memberRows } = await supabase
    .from("club_members")
    .select("*")
    .eq("club_id", (club as ClubRow).id);

  const members = await hydrateClubMembers((memberRows ?? []) as ClubMemberRow[]);

  const user = await getAuthenticatedUser(req);
  const isMember =
    !!user && (memberRows ?? []).some((m) => m.user_id === user.id);

  return NextResponse.json({
    ok: true,
    club: toClubPublic(club as ClubRow, members.length),
    members,
    isMember,
  });
}
