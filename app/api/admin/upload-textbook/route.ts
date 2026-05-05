import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  try {
    const body = await req.json().catch(() => null) as {
      subjectId?: unknown;
      title?: unknown;
      chapters?: unknown;
    } | null;

    const subjectId = typeof body?.subjectId === "string" ? body.subjectId : "";
    const title = typeof body?.title === "string" ? body.title : "";
    const chaptersValue = body?.chapters;

    if (!subjectId) {
      return NextResponse.json({ error: "subjectId required" }, { status: 400 });
    }
    if (!title) {
      return NextResponse.json({ error: "title required" }, { status: 400 });
    }

    const chapters =
      typeof chaptersValue === "string" && chaptersValue.trim()
        ? Number(chaptersValue)
        : typeof chaptersValue === "number"
          ? chaptersValue
        : null;

    const path = `products/${subjectId}.pdf`;
    const supabase = createAdminClient();

    const { data, error } = await supabase.storage
      .from("textbooks")
      .createSignedUploadUrl(path, {
        upsert: true,
      });

    if (error || !data) {
      return NextResponse.json({ error: error?.message ?? "Failed to prepare upload" }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("textbooks").getPublicUrl(path);
    const version = Date.now();

    return NextResponse.json({
      path: data.path,
      token: data.token,
      publicUrl: `${publicUrl}?v=${version}`,
      subjectId,
      title,
      chapters: Number.isFinite(chapters) ? chapters : 65,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
