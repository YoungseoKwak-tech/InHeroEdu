/**
 * GET /api/parents/colleges — college database, server-gated.
 *
 * The full per-school analysis used to ship in the client bundle (CreditGate
 * only CSS-blurred it). Now non-holders receive a small preview; the full list
 * is returned only to a holder of the res:/parents/colleges unlock (admins
 * exempt). `total` is always sent so the marketing count stays accurate.
 */
import { NextRequest, NextResponse } from "next/server";
import { COLLEGES } from "@/app/parents/colleges/data";
import { getUnlockContext, hasAnyUnlock } from "@/lib/serverUnlock";

export const dynamic = "force-dynamic";

const UNLOCK_KEY = "res:/parents/colleges";
const PREVIEW = 4;

export async function GET(req: NextRequest) {
  const ctx = await getUnlockContext(req);
  const unlocked = hasAnyUnlock(ctx, [UNLOCK_KEY]);
  const colleges = unlocked ? COLLEGES : COLLEGES.slice(0, PREVIEW);
  return NextResponse.json(
    { colleges, total: COLLEGES.length, locked: !unlocked },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
