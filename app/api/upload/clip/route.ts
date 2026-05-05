import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createClip } from "@/lib/lessonClips";

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: {
    lessonId?: string;
    sectionTitle?: string;
    sectionIndex?: number;
    clipUrl?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { lessonId, sectionTitle, sectionIndex, clipUrl } = body;
  if (!lessonId || !sectionTitle || sectionIndex == null || !clipUrl) {
    return NextResponse.json(
      { error: "lessonId, sectionTitle, sectionIndex, and clipUrl are required" },
      { status: 400 }
    );
  }

  try {
    const row = await createClip(lessonId, sectionTitle, sectionIndex, clipUrl);
    return NextResponse.json({ ok: true, data: row });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[upload/clip POST]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
