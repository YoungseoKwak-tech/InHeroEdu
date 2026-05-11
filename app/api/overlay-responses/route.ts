import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { logOverlayResponse } from "@/lib/overlayResponses";
import {
  bestEffortPersistLearningEventV1,
  inferCourseIdFromLessonId,
} from "@/lib/learning-tracking";

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
    const lessonId = String(body.lessonId ?? "");
    const subjectId =
      body.subjectId != null
        ? String(body.subjectId)
        : inferCourseIdFromLessonId(lessonId);
    const overlayType = String(body.overlayType ?? "");

    await logOverlayResponse({
      studentId:   user.id,
      lessonId,
      subjectId,
      overlayId:   body.overlayId ? String(body.overlayId) : null,
      overlayType,
      conceptName: body.conceptName != null ? String(body.conceptName) : null,
      response:    body.response != null ? String(body.response) : null,
      score:       body.score != null ? Number(body.score) : null,
      correct:     body.correct != null ? Boolean(body.correct) : null,
      gapType:     body.gapType != null ? String(body.gapType) : null,
      questionIdx: body.questionIdx != null ? Number(body.questionIdx) : null,
    });

    const upperType = overlayType.toUpperCase();
    const isQuestionEvent =
      upperType === "QUESTION_SPRINT" && body.questionIdx != null;
    const eventType: "question_answered" | "overlay_submitted" = isQuestionEvent
      ? "question_answered"
      : "overlay_submitted";

    const sessionId =
      typeof body.sessionId === "string" && body.sessionId.trim()
        ? body.sessionId.trim()
        : null;
    const lessonLang =
      body.lessonLang === "ko" || body.lessonLang === "en"
        ? body.lessonLang
        : null;
    const sectionKey =
      typeof body.sectionKey === "string" && body.sectionKey.trim()
        ? body.sectionKey.trim()
        : null;
    const courseId =
      typeof body.courseId === "string" && body.courseId.trim()
        ? body.courseId.trim()
        : subjectId;

    void bestEffortPersistLearningEventV1({
      userId: user.id,
      event: {
        schemaVersion: 1,
        sessionId,
        lessonId,
        courseId,
        subjectId,
        lessonLocale: lessonLang,
        sectionKey,
        eventType,
        overlayId: body.overlayId ? String(body.overlayId) : null,
        conceptName: body.conceptName != null ? String(body.conceptName) : null,
        gapType: body.gapType != null ? String(body.gapType) : null,
        correct: body.correct != null ? Boolean(body.correct) : null,
        score: body.score != null ? Number(body.score) : null,
        valueText: body.response != null ? String(body.response) : null,
        payload: {
          source: "overlay_responses_legacy",
          overlayType,
          questionIdx: body.questionIdx != null ? Number(body.questionIdx) : null,
        },
        clientTs: new Date().toISOString(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[overlay-responses POST]", err);
    return NextResponse.json({ error: "Failed to log response" }, { status: 500 });
  }
}
