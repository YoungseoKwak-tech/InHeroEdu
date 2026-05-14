import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { toMentorPublic, type MentorProfileRow } from "@/lib/mentors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/mentors → list all mentors (verified or not).
 */
export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("mentor_profiles")
    .select("*")
    .order("created_at", { ascending: true });
  return NextResponse.json({
    ok: true,
    mentors: ((data ?? []) as MentorProfileRow[]).map((r) => ({
      userId: r.user_id,
      ...toMentorPublic(r),
      isVerified: r.is_verified,
    })),
  });
}

/**
 * POST /api/admin/mentors
 *   { handle, university, universityRole, specialties[], introBlurb, avatarUrl?, isVerified? }
 *
 * Onboard a verified mentor by attaching a mentor_profiles row to a user
 * looked up by their handle.
 */
export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let body: {
    handle?: string;
    university?: string;
    universityRole?: string;
    specialties?: unknown;
    introBlurb?: string;
    avatarUrl?: string | null;
    isVerified?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const handle = String(body.handle ?? "").trim();
  const university = String(body.university ?? "").trim();
  const universityRole = String(body.universityRole ?? "").trim();
  const introBlurb = String(body.introBlurb ?? "").trim();
  const avatarUrl = typeof body.avatarUrl === "string" ? body.avatarUrl.trim() : null;
  const isVerified = body.isVerified !== false; // default true

  if (!handle) return NextResponse.json({ error: "handle required" }, { status: 400 });
  if (!university) return NextResponse.json({ error: "university required" }, { status: 400 });
  if (!universityRole) return NextResponse.json({ error: "universityRole required" }, { status: 400 });
  if (introBlurb.length < 10 || introBlurb.length > 400) {
    return NextResponse.json({ error: "introBlurb must be 10–400 chars" }, { status: 400 });
  }

  const specialties = Array.isArray(body.specialties)
    ? body.specialties
        .map((s) => String(s).trim())
        .filter((s, i, arr) => s.length > 0 && arr.indexOf(s) === i)
        .slice(0, 12)
    : [];

  const supabase = createAdminClient();
  // Resolve handle → user_id.
  const { data: allProfiles } = await supabase
    .from("profiles_public")
    .select("user_id, display_handle");
  const target = ((allProfiles ?? []) as { user_id: string; display_handle: string }[]).find(
    (p) => p.display_handle.toLowerCase() === handle.toLowerCase()
  );
  if (!target) {
    return NextResponse.json({ error: `No trajectory profile with handle "${handle}".` }, { status: 404 });
  }

  const { data: row, error } = await supabase
    .from("mentor_profiles")
    .upsert(
      {
        user_id: target.user_id,
        university,
        university_role: universityRole,
        specialties,
        intro_blurb: introBlurb,
        avatar_url: avatarUrl,
        is_verified: isVerified,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    ok: true,
    mentor: { userId: target.user_id, handle: target.display_handle, ...toMentorPublic(row as MentorProfileRow) },
  });
}
