import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  hydrateMeetingNotes,
  type ClubMeetingNoteRow,
  type ClubRole,
  type ClubRow,
} from "@/lib/clubs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WRITER_ROLES: ClubRole[] = ["founder", "cofounder", "secretary"];

/** GET /api/clubs/[slug]/notes — list meeting notes (newest first). */
export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = String(params.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = createAdminClient();
  const { data: club } = await supabase
    .from("clubs")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (!club) return NextResponse.json({ error: "club not found" }, { status: 404 });

  const { data: rows } = await supabase
    .from("club_meeting_notes")
    .select("*")
    .eq("club_id", (club as { id: string }).id)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(50);

  const notes = await hydrateMeetingNotes((rows ?? []) as ClubMeetingNoteRow[]);
  return NextResponse.json({ ok: true, notes });
}

/** POST /api/clubs/[slug]/notes { title, body, meetingAt? } — founder/cofounder/secretary writes. */
export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const slug = String(params.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  let body: { title?: string; body?: string; meetingAt?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const noteBody = String(body.body ?? "").trim();
  if (title.length < 3 || title.length > 140) {
    return NextResponse.json({ error: "Title must be 3–140 characters." }, { status: 400 });
  }
  if (noteBody.length < 1 || noteBody.length > 16000) {
    return NextResponse.json({ error: "Body must be 1–16000 characters." }, { status: 400 });
  }
  let meetingAt: string | null = null;
  if (body.meetingAt) {
    const d = new Date(body.meetingAt);
    if (Number.isNaN(d.getTime())) {
      return NextResponse.json({ error: "Invalid meeting date." }, { status: 400 });
    }
    meetingAt = d.toISOString();
  }

  const supabase = createAdminClient();
  const { data: club } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!club) return NextResponse.json({ error: "club not found" }, { status: 404 });

  // Permission: founder/cofounder/secretary.
  const { data: allMembers } = await supabase
    .from("club_members")
    .select("user_id, role")
    .eq("club_id", (club as ClubRow).id);
  const meRow = ((allMembers ?? []) as { user_id: string; role: ClubRole }[]).find(
    (m) => m.user_id === user.id
  );
  if (!meRow || !WRITER_ROLES.includes(meRow.role)) {
    return NextResponse.json(
      { error: "Only founder / co-founder / secretary can post notes." },
      { status: 403 }
    );
  }

  const { data: inserted, error } = await supabase
    .from("club_meeting_notes")
    .insert({
      club_id: (club as ClubRow).id,
      author_id: user.id,
      title,
      body: noteBody,
      meeting_at: meetingAt,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const [note] = await hydrateMeetingNotes([inserted as ClubMeetingNoteRow]);
  return NextResponse.json({ ok: true, note });
}
