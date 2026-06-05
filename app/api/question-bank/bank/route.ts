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
import { buildBankQuestions, getAllBankQuestions, countBySubject } from "@/lib/questionBank";

export const dynamic = "force-dynamic";

// The page only renders the first ~150 cards; sending all ~2,200 questions
// (multi-MB JSON) is what made the response slow. Cap the payload and
// return the true `total` so the UI can still say "showing N of M".
const DEFAULT_LIMIT = 150;
const MAX_LIMIT = 400;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject")?.trim() || undefined;
    const countOnly = searchParams.get("countOnly") === "true";

    if (countOnly) {
      const all = await getAllBankQuestions();
      return NextResponse.json({
        subjects: countBySubject(all),
        total: all.length,
      });
    }

    const limitParam = parseInt(searchParams.get("limit") ?? "", 10);
    const limit = Math.min(
      MAX_LIMIT,
      Number.isFinite(limitParam) && limitParam > 0 ? limitParam : DEFAULT_LIMIT
    );

    const all = await buildBankQuestions(subject);
    return NextResponse.json({ questions: all.slice(0, limit), total: all.length });
  } catch (e) {
    console.error("[question-bank/bank]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
