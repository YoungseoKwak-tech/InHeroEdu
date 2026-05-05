import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { logOverlayResponse } from "@/lib/overlayResponses";

export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  try {
    await logOverlayResponse({
      studentId:   user.id,
      lessonId:    String(body.lessonId ?? ""),
      subjectId:   body.subjectId != null ? String(body.subjectId) : null,
      overlayId:   body.overlayId ? String(body.overlayId) : null,
      overlayType: String(body.overlayType ?? ""),
      conceptName: body.conceptName != null ? String(body.conceptName) : null,
      response:    body.response != null ? String(body.response) : null,
      score:       body.score != null ? Number(body.score) : null,
      correct:     body.correct != null ? Boolean(body.correct) : null,
      gapType:     body.gapType != null ? String(body.gapType) : null,
      questionIdx: body.questionIdx != null ? Number(body.questionIdx) : null,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[overlay-responses POST]", err);
    return NextResponse.json({ error: "Failed to log response" }, { status: 500 });
  }
}
