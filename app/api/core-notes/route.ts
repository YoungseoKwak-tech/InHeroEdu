/**
 * GET /api/core-notes
 *   ?countOnly=true     per-subject note counts (for the subject chips)
 *   ?subject=ap-biology notes for one subject
 *
 * Core Notes are condensed, exam-focused study cards derived from the lesson
 * scripts (see lib/coreNotes). Public read — notes are study aids, not gated.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAllCoreNotes, getCoreNotes, countBySubject } from "@/lib/coreNotes";

export const dynamic = "force-dynamic";

const MAX_NOTES = 400;

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
    return NextResponse.json({ notes: notes.slice(0, MAX_NOTES), total: notes.length });
  } catch (e) {
    console.error("[core-notes]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
