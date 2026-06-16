/**
 * GET /api/parents/essay/analysis — the Cornell essay text + paragraph-by-
 * paragraph analysis, server-gated.
 *
 * SEGMENTS (the actual admit-essay text and the breakdown of why each move
 * works) used to ship in the client bundle behind a CSS-blur gate. Now it is
 * returned ONLY to a holder of the res:/parents/essay unlock (admins exempt);
 * everyone else gets an empty list, so the essay never reaches the browser.
 */
import { NextRequest, NextResponse } from "next/server";
import { SEGMENTS } from "@/lib/data/cornellMainEssay";
import { getUnlockContext, hasAnyUnlock } from "@/lib/serverUnlock";

export const dynamic = "force-dynamic";

const UNLOCK_KEY = "res:/parents/essay";

export async function GET(req: NextRequest) {
  const ctx = await getUnlockContext(req);
  const unlocked = hasAnyUnlock(ctx, [UNLOCK_KEY]);
  return NextResponse.json(
    { segments: unlocked ? SEGMENTS : [], locked: !unlocked },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
