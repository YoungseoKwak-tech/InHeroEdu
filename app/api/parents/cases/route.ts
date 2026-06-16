/**
 * GET /api/parents/cases — admit-case list, server-gated.
 *
 * The real admit cases used to ship to the browser inside the client bundle
 * (CreditGate only CSS-blurred them). Now non-holders receive just the 2 free
 * preview cases; the full list is returned only to a holder of the
 * res:/parents/cases unlock (admins exempt). Client fetches via authFetch.
 */
import { NextRequest, NextResponse } from "next/server";
import { ADMIT_CASES } from "@/lib/data/admitCases";
import { getUnlockContext, hasAnyUnlock } from "@/lib/serverUnlock";

export const dynamic = "force-dynamic";

const UNLOCK_KEY = "res:/parents/cases";
const PREVIEW = 2;

export async function GET(req: NextRequest) {
  const ctx = await getUnlockContext(req);
  const unlocked = hasAnyUnlock(ctx, [UNLOCK_KEY]);
  const cases = unlocked ? ADMIT_CASES : ADMIT_CASES.slice(0, PREVIEW);
  return NextResponse.json(
    { cases, total: ADMIT_CASES.length, locked: !unlocked },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
