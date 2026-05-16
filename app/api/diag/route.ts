import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 4096;

/**
 * POST /api/diag
 *
 * Temporary diagnostic sink. Any JSON body posted here is logged via
 * console.error so it shows up in Vercel function logs at error level
 * (queryable with `vercel logs --level error` or by --query "diag").
 *
 * Used by the browser-side PdfThumbnailBackfill component to surface
 * client-side failures that would otherwise be silently swallowed.
 *
 * Auth-gated so an anonymous attacker can't spam the log stream.
 * Remove when no longer needed.
 */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const raw = await req.text().catch(() => "");
  const truncated = raw.length > MAX_BODY ? `${raw.slice(0, MAX_BODY)}…(truncated)` : raw;
  console.error("[diag]", user.id, truncated);
  return NextResponse.json({ ok: true });
}
