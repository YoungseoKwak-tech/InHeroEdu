/**
 * GET /api/core-notes/korean?lessonId=ap-chemistry-u1-l1
 *
 * Core Note의 한국어 일타강사 스토리텔링 버전. lib/data/coreNotesKo의
 * 정적 콘텐츠(직접 작성)를 그대로 서빙합니다 — 런타임 AI 생성 없음.
 * 아직 작성되지 않은 노트는 404 + "not-ready"로 응답합니다.
 *
 * 첫 레슨(과목별 taster)은 무료, 나머지는 과목 잠금해제(500/1000)가 있어야
 * 본문을 받습니다. 미보유자는 sections를 비운 잠금 응답을 받아요.
 */
import { NextRequest, NextResponse } from "next/server";
import { getCoreNoteKo } from "@/lib/data/coreNotesKo";
import { getCoreNotes } from "@/lib/coreNotes";
import { getUnlockContext, hasAnyUnlock } from "@/lib/serverUnlock";

export const dynamic = "force-dynamic";

const CN_ALL_KEY = "parents:core-notes";

// "ap-environmental-science-u2-l3" → "ap-environmental-science"
function subjectFromLessonId(id: string): string {
  const m = id.match(/^(.+)-u\d+/i);
  return m ? m[1] : id;
}

export async function GET(req: NextRequest) {
  const lessonId = new URL(req.url).searchParams.get("lessonId")?.trim();
  if (!lessonId) return NextResponse.json({ error: "lessonId required" }, { status: 400 });

  const note = getCoreNoteKo(lessonId);
  if (!note) return NextResponse.json({ error: "not-ready" }, { status: 404 });

  // The first lesson of each subject is a free taster; the rest is paid.
  const subject = subjectFromLessonId(lessonId);
  let isTaster = false;
  try {
    const subjectNotes = await getCoreNotes(subject);
    isTaster = subjectNotes[0]?.lessonId === lessonId;
  } catch { /* if we can't tell, fall through to the unlock check (fail closed) */ }

  if (!isTaster) {
    const ctx = await getUnlockContext(req);
    const unlocked = hasAnyUnlock(ctx, [CN_ALL_KEY, `${CN_ALL_KEY}:${subject}`]);
    if (!unlocked) {
      return NextResponse.json(
        { note: { ...note, overview: null, sections: [] }, locked: true },
        { headers: { "Cache-Control": "private, no-store" } }
      );
    }
  }

  return NextResponse.json(
    { note },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
