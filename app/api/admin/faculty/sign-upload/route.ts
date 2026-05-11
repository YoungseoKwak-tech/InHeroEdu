import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { isFacultyId } from "@/lib/faculty";

export const runtime = "nodejs";

type AssetKind = "image" | "intro_video";

const BUCKETS: Record<AssetKind, string> = {
  image: "faculty-assets",
  intro_video: "faculty-videos",
};

function safeExt(filename: string, fallback: string): string {
  const dot = filename?.lastIndexOf(".") ?? -1;
  if (dot >= 0 && dot < filename.length - 1) {
    return filename.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "");
  }
  return fallback;
}

export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let body: { facultyId?: string; kind?: AssetKind; filename?: string };
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
  const bucket = BUCKETS[kind];
  const ext = safeExt(body.filename ?? "", kind === "intro_video" ? "mp4" : "png");
  const path = `${facultyId}/${Date.now()}.${ext}`;

  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(path);

  if (error || !data) {
    return NextResponse.json(
      { error: `Could not create signed URL: ${error?.message ?? "unknown"}` },
      { status: 500 }
    );
  }

  const publicUrl = supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl;

  return NextResponse.json({
    ok: true,
    bucket,
    path: data.path,
    token: data.token,
    publicUrl,
  });
}
