/**
 * GET /api/parents/story/file — auth-gated stream of the 합격 수기 PDF.
 *
 * The PDF lives OUTSIDE /public (in /private-docs) so it can't be fetched by a
 * raw URL. Access requires a signed-in user; for accounts whose unlocks are
 * server-synced (profiles.credit_unlocks), we additionally require the
 * res:/parents/story unlock. The client reader fetches this via authFetch
 * (Bearer token), so the session check works.
 */
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

const UNLOCK_KEY = "res:/parents/story";
const FILE_PATH = path.join(process.cwd(), "private-docs", "ivy-engineering-journey.pdf");

export async function GET(req: NextRequest) {
  const auth = await requireAuthenticatedUser(req);
  if (auth instanceof NextResponse) return auth; // 401 if not signed in
  const user = auth;

  // If this account's unlocks are tracked server-side, enforce the purchase.
  // If we can't read them (older schema / no row), fall back to login-only.
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("credit_unlocks")
      .eq("id", user.id)
      .maybeSingle();
    if (!error && data && Array.isArray(data.credit_unlocks)) {
      if (!data.credit_unlocks.includes(UNLOCK_KEY)) {
        return NextResponse.json({ error: "locked" }, { status: 403 });
      }
    }
  } catch { /* can't verify server-side → login gate already passed */ }

  try {
    const bytes = await readFile(FILE_PATH);
    return new NextResponse(new Uint8Array(bytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="ivy-engineering-journey.pdf"',
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "not-found" }, { status: 404 });
  }
}
