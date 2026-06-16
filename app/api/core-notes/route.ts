/**
 * GET /api/core-notes
 *   ?countOnly=true     per-subject note counts (for the subject chips)
 *   ?subject=ap-biology notes for one subject
 *
 * Core Notes are condensed, exam-focused study cards derived from the lesson
 * scripts (see lib/coreNotes). First lesson per subject is a free taster; the
 * rest is paid (per-subject 500 / all 1000) and enforced here server-side.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAllCoreNotes, getCoreNotes, countBySubject, type CoreNote } from "@/lib/coreNotes";
import { getUnlockContext, hasAnyUnlock } from "@/lib/serverUnlock";

export const dynamic = "force-dynamic";

const MAX_NOTES = 400;
const CN_ALL_KEY = "parents:core-notes";

// Strip the paid body so a locked caller gets nav metadata only — never the
// concept text/terms/traps. (The left rail only needs title/unit/lessonId.)
function stripNote(n: CoreNote): CoreNote {
  return { ...n, sections: [] };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const countOnly = searchParams.get("countOnly") === "true";
    const subject = searchParams.get("subject")?.trim() || undefined;

    if (countOnly) {
      const all = await getAllCoreNotes();
      return NextResponse.json({ subjects: countBySubject(all), total: all.length });
    }

    const notes = await getCoreNotes(subject);

    // Enforce the per-subject / all-subjects unlock server-side. Holders and
    // admins get full content; everyone else gets the free first lesson plus
    // the rest as titles-only (body stripped) so the paywall can't be bypassed.
    if (subject) {
      const ctx = await getUnlockContext(req);
      const unlocked = hasAnyUnlock(ctx, [CN_ALL_KEY, `${CN_ALL_KEY}:${subject}`]);
      if (!unlocked) {
        const gated = notes.map((n, i) => (i === 0 ? n : stripNote(n)));
        return NextResponse.json({ notes: gated.slice(0, MAX_NOTES), total: notes.length, locked: true });
      }
    }

    return NextResponse.json({ notes: notes.slice(0, MAX_NOTES), total: notes.length, locked: false });
  } catch (e) {
    console.error("[core-notes]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
