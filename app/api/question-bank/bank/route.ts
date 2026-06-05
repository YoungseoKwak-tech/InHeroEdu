/**
 * GET /api/question-bank/bank
 *   ?subject=ap-biology   filter by course id (optional)
 *   ?countOnly=true       return per-subject counts only
 *
 * Serves the aggregated bank built from lesson overlays + the admin
 * questions table (see lib/questionBank). Open to everyone — the bank is
 * a free study surface; only deep AI/course features are gated.
 */
import { NextRequest, NextResponse } from "next/server";
import { buildBankQuestions, countBySubject } from "@/lib/questionBank";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject")?.trim() || undefined;
    const countOnly = searchParams.get("countOnly") === "true";

    if (countOnly) {
      const all = await buildBankQuestions();
      return NextResponse.json({
        subjects: countBySubject(all),
        total: all.length,
      });
    }

    const questions = await buildBankQuestions(subject);
    return NextResponse.json({ questions, total: questions.length });
  } catch (e) {
    console.error("[question-bank/bank]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
