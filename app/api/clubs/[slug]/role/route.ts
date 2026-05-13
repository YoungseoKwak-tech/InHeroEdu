import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { canAssignRoles, CLUB_ROLES, type ClubRole, type ClubRow } from "@/lib/clubs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ROLE_SET = new Set<string>(CLUB_ROLES);

/** POST /api/clubs/[slug]/role { handle, role } — founder assigns a role. */
export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const slug = String(params.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  let body: { handle?: string; role?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const handleInput = String(body.handle ?? "").trim();
  const role = String(body.role ?? "").trim();
  if (!handleInput) {
    return NextResponse.json({ error: "handle required" }, { status: 400 });
  }
  if (!ROLE_SET.has(role)) {
    return NextResponse.json({ error: "invalid role" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: club } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!club) return NextResponse.json({ error: "club not found" }, { status: 404 });

  const { data: allMembers } = await supabase
    .from("club_members")
    .select("user_id, role")
    .eq("club_id", (club as ClubRow).id);
  const meRow = ((allMembers ?? []) as { user_id: string; role: ClubRole }[]).find(
    (m) => m.user_id === user.id
  );
  if (!canAssignRoles(meRow?.role ?? null)) {
    return NextResponse.json({ error: "Only the founder can assign roles." }, { status: 403 });
  }

  // Resolve target handle → user_id.
  const { data: allProfiles } = await supabase
    .from("profiles_public")
    .select("user_id, display_handle");
  const target = ((allProfiles ?? []) as { user_id: string; display_handle: string }[]).find(
    (p) => p.display_handle.toLowerCase() === handleInput.toLowerCase()
  );
  if (!target) {
    return NextResponse.json({ error: "Handle not found." }, { status: 404 });
  }

  // Can't strip founder from themselves (must transfer instead).
  if (target.user_id === user.id && role !== "founder") {
    return NextResponse.json(
      { error: "Transfer founder to someone else first to step down." },
      { status: 400 }
    );
  }

  // If promoting target to founder, demote current founder to cofounder.
  if (role === "founder" && target.user_id !== user.id) {
    await supabase
      .from("club_members")
      .update({ role: "cofounder" })
      .eq("club_id", (club as ClubRow).id)
      .eq("user_id", user.id);
  }

  // Upsert target's role (will auto-add as member if not present).
  const targetMember = ((allMembers ?? []) as { user_id: string; role: ClubRole }[]).find(
    (m) => m.user_id === target.user_id
  );
  if (targetMember) {
    const { error } = await supabase
      .from("club_members")
      .update({ role })
      .eq("club_id", (club as ClubRow).id)
      .eq("user_id", target.user_id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabase
      .from("club_members")
      .insert({
        club_id: (club as ClubRow).id,
        user_id: target.user_id,
        role,
      });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, handle: target.display_handle, role });
}
