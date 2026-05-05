import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { getStorageUploadLimitBytes } from "@/lib/storageUpload";
import { createAdminClient } from "@/lib/supabase";

const BUCKET = "lesson-clips";
const MAX_UPLOAD_BYTES = getStorageUploadLimitBytes();

function fileExt(fileName: string) {
  const ext = fileName.split(".").pop()?.trim().toLowerCase();
  return ext || "mp4";
}

function safeSegment(value: string) {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() || "clip";
}

export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  try {
    const body = await req.json().catch(() => null) as {
      lessonId?: unknown;
      sectionTitle?: unknown;
      fileName?: unknown;
    } | null;

    const lessonId = typeof body?.lessonId === "string" ? body.lessonId : "";
    const sectionTitle = typeof body?.sectionTitle === "string" ? body.sectionTitle : "";
    const fileName = typeof body?.fileName === "string" ? body.fileName : "clip.mp4";

    if (!lessonId || !sectionTitle) {
      return NextResponse.json({ error: "lessonId and sectionTitle required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    if (bucketsError) {
      return NextResponse.json({ error: bucketsError.message }, { status: 500 });
    }

    if (!buckets.some((bucket) => bucket.name === BUCKET || bucket.id === BUCKET)) {
      const { error: createError } = await supabase.storage.createBucket(BUCKET, {
        public: true,
        fileSizeLimit: MAX_UPLOAD_BYTES,
      });
      if (createError && !/already exists/i.test(createError.message)) {
        return NextResponse.json({ error: createError.message }, { status: 500 });
      }
    } else {
      const { error: updateError } = await supabase.storage.updateBucket(BUCKET, {
        public: true,
        fileSizeLimit: MAX_UPLOAD_BYTES,
      });
      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
    }

    const path = `${lessonId}/${safeSegment(sectionTitle)}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt(fileName)}`;
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUploadUrl(path, { upsert: false });

    if (error || !data) {
      return NextResponse.json({ error: error?.message ?? "Failed to prepare upload" }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(path);

    return NextResponse.json({
      bucket: BUCKET,
      path: data.path,
      token: data.token,
      publicUrl,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Prepare upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
