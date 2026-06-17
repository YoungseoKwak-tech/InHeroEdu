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
import { CORE_NOTES_KO, getCoreNoteKo } from "@/lib/data/coreNotesKo";
import { getUnlockContext, hasAnyUnlock } from "@/lib/serverUnlock";

export const dynamic = "force-dynamic";

const CN_ALL_KEY = "parents:core-notes";

// "ap-environmental-science-u2-l3" → "ap-environmental-science"
function subjectFromLessonId(id: string): string {
  const m = id.match(/^(.+)-u\d+/i);
  return m ? m[1] : id;
}

// First (taster) lesson per subject, computed once from the static Korean
// registry. Previously this called getCoreNotes(subject), which rebuilt the
// ENTIRE Core Notes set from the DB on every cold start (slow). The Ko data is
// static + ordered, so the free first lesson is derivable with no DB hit.
let tasterBySubject: Map<string, string> | null = null;
function firstKoLessonId(subject: string): string | null {
  if (!tasterBySubject) {
    const best = new Map<string, { lessonId: string; ord: number }>();
    for (const n of CORE_NOTES_KO.values()) {
      const subj = n.courseId ?? subjectFromLessonId(n.lessonId);
      const ord = (n.unit ?? 99) * 1000 + (n.lessonNum ?? 99);
      const cur = best.get(subj);
      if (!cur || ord < cur.ord) best.set(subj, { lessonId: n.lessonId, ord });
    }
    tasterBySubject = new Map([...best].map(([k, v]) => [k, v.lessonId]));
  }
  return tasterBySubject.get(subject) ?? null;
}

export async function GET(req: NextRequest) {
  const lessonId = new URL(req.url).searchParams.get("lessonId")?.trim();
  if (!lessonId) return NextResponse.json({ error: "lessonId required" }, { status: 400 });

  const note = getCoreNoteKo(lessonId);
  if (!note) return NextResponse.json({ error: "not-ready" }, { status: 404 });

  // The first lesson of each subject is a free taster; the rest is paid.
  const subject = subjectFromLessonId(lessonId);
  const isTaster = firstKoLessonId(subject) === lessonId;

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
