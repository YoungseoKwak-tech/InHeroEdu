/**
 * GET /api/parents/essay/file — auth-gated stream of the Cornell admit-essay PDF.
 *
 * The essay was previously a static, guessable /public URL — anyone could
 * download it without paying. It now lives under an unguessable filename and is
 * served only to a signed-in user who actually holds the res:/parents/essay
 * unlock (admins exempt). The client opens it via authFetch (Bearer token).
 *
 * Strict enforcement: there is no legacy paid-reader base to protect (the file
 * used to be public), so we require the unlock key rather than the lenient
 * login-only fallback used by the older story route.
 */
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { requireAuthenticatedUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/adminEmails";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

const UNLOCK_KEY = "res:/parents/essay";
const FILE_CANDIDATES = [
  path.join(process.cwd(), "public", "parents-docs", "cornell-bme-essay-_q7m2x9p4k.pdf"),
  path.join(process.cwd(), "private-docs", "cornell-bme-essay.pdf"),
];

export async function GET(req: NextRequest) {
  const auth = await requireAuthenticatedUser(req);
  if (auth instanceof NextResponse) return auth; // 401 if not signed in
  const user = auth;

  if (!isAdminEmail(user.email)) {
    // Require the actual unlock. If we can't read the profile, fail closed.
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("credit_unlocks")
        .eq("id", user.id)
        .maybeSingle();
      const unlocks = Array.isArray(data?.credit_unlocks) ? (data!.credit_unlocks as string[]) : [];
      if (error || !unlocks.includes(UNLOCK_KEY)) {
        return NextResponse.json({ error: "locked" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "locked" }, { status: 403 });
    }
  }

  for (const filePath of FILE_CANDIDATES) {
    try {
      const bytes = await readFile(filePath);
      return new NextResponse(new Uint8Array(bytes), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'inline; filename="cornell-bme-essay.pdf"',
          "Cache-Control": "private, no-store",
        },
      });
    } catch { /* try next candidate */ }
  }
  return NextResponse.json({ error: "not-found" }, { status: 404 });
}
