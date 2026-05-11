import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { FACULTY, isFacultyId } from "@/lib/faculty";

export const runtime = "nodejs";

type AssetKind = "image" | "intro_video";

interface AssetRow {
  faculty_id: string;
  image_url: string | null;
  intro_video_url: string | null;
  intro_video_uploaded_at: string | null;
  updated_at: string;
}

// GET — list all faculty + current illustration & intro-video URLs
export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("faculty_assets")
    .select("faculty_id, image_url, intro_video_url, intro_video_uploaded_at, updated_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const assetMap = new Map<string, AssetRow>(
    ((data ?? []) as AssetRow[]).map((row) => [row.faculty_id, row])
  );
  const faculty = FACULTY.map((meta) => {
    const row = assetMap.get(meta.id);
    return {
      ...meta,
      imageUrl: row?.image_url ?? null,
      introVideoUrl: row?.intro_video_url ?? null,
      introVideoUploadedAt: row?.intro_video_uploaded_at ?? null,
      updatedAt: row?.updated_at ?? null,
    };
  });

  return NextResponse.json({ ok: true, faculty });
}

// POST — save a previously-uploaded URL to faculty_assets.
// Client flow: get signed URL from /api/admin/faculty/sign-upload, upload
// directly to storage, then POST { facultyId, kind, url } here to persist.
export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let body: { facultyId?: string; kind?: AssetKind; url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const facultyId = String(body.facultyId ?? "").trim();
  if (!isFacultyId(facultyId)) {
    return NextResponse.json({ error: "invalid facultyId" }, { status: 400 });
  }
  const kind: AssetKind = body.kind === "intro_video" ? "intro_video" : "image";
  const url = String(body.url ?? "").trim();
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });

  const now = new Date().toISOString();
  const supabase = createAdminClient();

  const patch: Record<string, unknown> = {
    faculty_id: facultyId,
    uploaded_by: admin.id,
    updated_at: now,
  };
  if (kind === "image") {
    patch.image_url = url;
  } else {
    patch.intro_video_url = url;
    patch.intro_video_uploaded_at = now;
  }

  const { error } = await supabase
    .from("faculty_assets")
    .upsert(patch, { onConflict: "faculty_id" });

  if (error) {
    return NextResponse.json({ error: `DB save failed: ${error.message}` }, { status: 500 });
  }

  return NextResponse.json({ ok: true, facultyId, kind, url });
}

// DELETE — clear an asset URL (kind="image" or "intro_video")
export async function DELETE(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let body: { facultyId?: string; kind?: AssetKind };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const facultyId = String(body.facultyId ?? "").trim();
  if (!isFacultyId(facultyId)) {
    return NextResponse.json({ error: "invalid facultyId" }, { status: 400 });
  }
  const kind: AssetKind = body.kind === "intro_video" ? "intro_video" : "image";

  const supabase = createAdminClient();
  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  if (kind === "image") patch.image_url = null;
  else {
    patch.intro_video_url = null;
    patch.intro_video_uploaded_at = null;
  }

  const { error } = await supabase
    .from("faculty_assets")
    .update(patch)
    .eq("faculty_id", facultyId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
