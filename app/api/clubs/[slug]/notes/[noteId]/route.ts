import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { canEditClub, type ClubRole, type ClubRow } from "@/lib/clubs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** DELETE /api/clubs/[slug]/notes/[noteId] — author or founder/cofounder deletes. */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string; noteId: string } }
) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const slug = String(params.slug ?? "").trim();
  const noteId = String(params.noteId ?? "").trim();
  if (!slug || !noteId) {
    return NextResponse.json({ error: "slug + noteId required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data: club } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!club) return NextResponse.json({ error: "club not found" }, { status: 404 });

  const { data: note } = await supabase
    .from("club_meeting_notes")
    .select("id, author_id, club_id")
    .eq("id", noteId)
    .eq("club_id", (club as ClubRow).id)
    .maybeSingle();
  if (!note) return NextResponse.json({ error: "note not found" }, { status: 404 });

  const { data: allMembers } = await supabase
    .from("club_members")
    .select("user_id, role")
    .eq("club_id", (club as ClubRow).id);
  const meRow = ((allMembers ?? []) as { user_id: string; role: ClubRole }[]).find(
    (m) => m.user_id === user.id
  );
  const isAuthor = (note as { author_id: string }).author_id === user.id;
  if (!isAuthor && !canEditClub(meRow?.role ?? null)) {
    return NextResponse.json({ error: "not allowed" }, { status: 403 });
  }

  const { error } = await supabase
    .from("club_meeting_notes")
    .update({ is_deleted: true, updated_at: new Date().toISOString() })
    .eq("id", noteId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
