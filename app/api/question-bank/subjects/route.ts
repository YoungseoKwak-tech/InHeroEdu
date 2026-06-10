/**
 * GET /api/question-bank/subjects — cached per-subject counts only.
 *
 * The full bank (~12k MCQs) takes ~12s to build, and /bank?countOnly=true is
 * force-dynamic so it pays that cost on every cold start — which left the exam
 * page's subject dropdown empty for seconds. The subject list only changes on
 * deploy / script regen, so serve it via ISR: the CDN returns the cached counts
 * instantly and revalidates in the background.
 */
import { NextResponse } from "next/server";
import { getAllBankQuestions, countBySubject } from "@/lib/questionBank";

export const revalidate = 900; // seconds — background revalidate at most every 15 min

export async function GET() {
  try {
    const all = await getAllBankQuestions();
    return NextResponse.json(
      { subjects: countBySubject(all), total: all.length },
      { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=86400" } }
    );
  } catch {
    return NextResponse.json({ subjects: [], total: 0 }, { status: 200 });
  }
}
