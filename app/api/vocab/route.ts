/**
 * GET /api/vocab
 *   ?countOnly=true   → { subjects, total }
 *   ?subject=ap-chemistry → { terms }
 *   (no params)       → { subjects, total, terms (first subject) }
 *
 * Serves the bilingual subject 단어장 aggregated from the Korean Core Notes
 * (see lib/vocab). Open to everyone — vocabulary is a free study hook.
 */
import { NextRequest, NextResponse } from "next/server";
import { getVocabSubjects, getVocabTerms, getTotalVocab } from "@/lib/vocab";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  if (searchParams.get("countOnly") === "true") {
    return NextResponse.json({ subjects: getVocabSubjects(), total: getTotalVocab() });
  }

  const subject = searchParams.get("subject")?.trim();
  if (subject) {
    return NextResponse.json({ terms: getVocabTerms(subject) });
  }

  const subjects = getVocabSubjects();
  return NextResponse.json({
    subjects,
    total: getTotalVocab(),
    terms: subjects[0] ? getVocabTerms(subjects[0].courseId) : [],
  });
}
