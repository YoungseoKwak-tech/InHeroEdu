import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  canEditClub,
  hydrateClubMembers,
  toClubPublic,
  type ClubMemberRow,
  type ClubRole,
  type ClubRow,
} from "@/lib/clubs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/clubs/[slug] — club room + member showcase + my-role. */
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
  const meRow = user
    ? ((memberRows ?? []) as ClubMemberRow[]).find((m) => m.user_id === user.id)
    : null;
  const isMember = !!meRow;
  const myRole: ClubRole | null = meRow?.role ?? null;

  return NextResponse.json({
    ok: true,
    club: toClubPublic(club as ClubRow, members.length),
    members,
    isMember,
    myRole,
  });
}

/** PATCH /api/clubs/[slug] — founder/cofounder edits club metadata. */
export async function PATCH(req: NextRequest, { params }: { params: { slug: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const slug = String(params.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  let body: {
    name?: string;
    mission?: string;
    heroBlurb?: string | null;
    glyph?: string;
    accent?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data: club } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!club) return NextResponse.json({ error: "club not found" }, { status: 404 });

  // Permission: founder or cofounder only.
  const { data: allMembers } = await supabase
    .from("club_members")
    .select("user_id, role")
    .eq("club_id", (club as ClubRow).id);
  const meRow = ((allMembers ?? []) as { user_id: string; role: ClubRole }[]).find(
    (m) => m.user_id === user.id
  );
  if (!canEditClub(meRow?.role ?? null)) {
    return NextResponse.json({ error: "Only founders/co-founders can edit." }, { status: 403 });
  }

  const patch: Record<string, unknown> = {};
  if (typeof body.name === "string") {
    const n = body.name.trim();
    if (n.length < 3 || n.length > 60) {
      return NextResponse.json({ error: "Name must be 3–60 characters." }, { status: 400 });
    }
    patch.name = n;
  }
  if (typeof body.mission === "string") {
    const m = body.mission.trim();
    if (m.length < 10 || m.length > 400) {
      return NextResponse.json({ error: "Mission must be 10–400 characters." }, { status: 400 });
    }
    patch.mission = m;
  }
  if (typeof body.heroBlurb === "string" || body.heroBlurb === null) {
    const h = body.heroBlurb?.toString().trim() ?? "";
    if (h.length > 200) {
      return NextResponse.json({ error: "Hero blurb max 200 characters." }, { status: 400 });
    }
    patch.hero_blurb = h.length > 0 ? h : null;
  }
  if (typeof body.glyph === "string") {
    const g = body.glyph.slice(0, 4) || "✦";
    patch.glyph = g;
  }
  if (typeof body.accent === "string" && /^#[0-9a-fA-F]{6}$/.test(body.accent)) {
    patch.accent = body.accent;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "no editable fields supplied" }, { status: 400 });
  }

  const { data: updated, error: updateErr } = await supabase
    .from("clubs")
    .update(patch)
    .eq("id", (club as ClubRow).id)
    .select()
    .single();
  if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 });

  return NextResponse.json({
    ok: true,
    club: toClubPublic(updated as ClubRow, 0),
  });
}
