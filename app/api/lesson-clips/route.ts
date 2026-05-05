import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser, requireAuthenticatedUser } from "@/lib/auth";
import { deleteClip, getLessonClips } from "@/lib/lessonClips";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const lessonId = req.nextUrl.searchParams.get("lessonId");
  if (!lessonId) {
    return NextResponse.json({ error: "lessonId required" }, { status: 400 });
  }

  try {
    const clips = await getLessonClips(lessonId);
    return NextResponse.json({ ok: true, data: clips });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[lesson-clips GET]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let body: { clipId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  if (!body.clipId) {
    return NextResponse.json({ error: "clipId required" }, { status: 400 });
  }

  try {
    const clips = await deleteClip(body.clipId);
    return NextResponse.json({ ok: true, data: clips });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[lesson-clips DELETE]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
