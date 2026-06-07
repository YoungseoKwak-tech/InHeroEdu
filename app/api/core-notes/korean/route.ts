/**
 * GET /api/core-notes/korean?lessonId=ap-chemistry-u1-l1
 *
 * Core Note의 한국어 일타강사 스토리텔링 버전. lib/data/coreNotesKo의
 * 정적 콘텐츠(직접 작성)를 그대로 서빙합니다 — 런타임 AI 생성 없음.
 * 아직 작성되지 않은 노트는 404 + "not-ready"로 응답하고, 프런트가
 * 준비 중 안내를 띄웁니다.
 */
import { NextRequest, NextResponse } from "next/server";
import { getCoreNoteKo } from "@/lib/data/coreNotesKo";

export async function GET(req: NextRequest) {
  const lessonId = new URL(req.url).searchParams.get("lessonId")?.trim();
  if (!lessonId) return NextResponse.json({ error: "lessonId required" }, { status: 400 });

  const note = getCoreNoteKo(lessonId);
  if (!note) return NextResponse.json({ error: "not-ready" }, { status: 404 });

  return NextResponse.json(
    { note },
    { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } }
  );
}
