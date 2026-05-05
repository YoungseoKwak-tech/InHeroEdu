/**
 * POST /api/admin/recover-textbooks
 * Scans Supabase Storage "textbooks" bucket and re-populates
 * lesson_textbooks DB rows for any file found.
 * Safe to run multiple times (upsert).
 */
import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

const TEXTBOOKS_BUCKET = "textbooks";

export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const supabase = createAdminClient();

  // List all lesson folders in the bucket
  const { data: folders, error: listErr } = await supabase.storage
    .from(TEXTBOOKS_BUCKET)
    .list("", { limit: 1000 });

  if (listErr) {
    return NextResponse.json({ error: `Storage list failed: ${listErr.message}` }, { status: 500 });
  }

  if (!folders || folders.length === 0) {
    return NextResponse.json({ recovered: 0, message: "Storage bucket is empty" });
  }

  let recovered = 0;
  const errors: string[] = [];

  // Each "folder" is a lessonId prefix
  for (const folder of folders) {
    const lessonId = folder.name;
    if (!lessonId) continue;

    // List files inside this lesson folder
    const { data: files, error: filesErr } = await supabase.storage
      .from(TEXTBOOKS_BUCKET)
      .list(lessonId, { limit: 100, sortBy: { column: "created_at", order: "desc" } });

    if (filesErr || !files || files.length === 0) continue;

    // Take the most recent .docx file
    const docxFile = files.find((f) => f.name.endsWith(".docx"));
    if (!docxFile) continue;

    const docxPath = `${lessonId}/${docxFile.name}`;

    const { error: upsertErr } = await supabase
      .from("lesson_textbooks")
      .upsert(
        { lesson_id: lessonId, status: "ready", docx_url: docxPath, error: null },
        { onConflict: "lesson_id" }
      );

    if (upsertErr) {
      errors.push(`${lessonId}: ${upsertErr.message}`);
    } else {
      recovered++;
    }
  }

  return NextResponse.json({
    recovered,
    errors: errors.length > 0 ? errors : undefined,
    message: `${recovered}개 교재 복구 완료`,
  });
}
