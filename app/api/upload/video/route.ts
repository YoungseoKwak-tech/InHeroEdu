import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: { lessonId?: string; videoUrl?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { lessonId, videoUrl } = body;
  if (!lessonId || !videoUrl) {
    return NextResponse.json({ error: "lessonId and videoUrl required" }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("lesson_scripts")
      .upsert(
        { lesson_id: lessonId, video_url: videoUrl, updated_at: new Date().toISOString() },
        { onConflict: "lesson_id" }
      );

    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[upload/video POST]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
