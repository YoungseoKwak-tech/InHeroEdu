/**
 * GET /api/parents/story/file — auth-gated stream of the 합격 수기 PDF.
 *
 * Access requires a signed-in user; for accounts whose unlocks are
 * server-synced (profiles.credit_unlocks), we additionally require the
 * res:/parents/story unlock. The client reader fetches this via authFetch
 * (Bearer token), so the session check works.
 *
 * The PDF is read from /public under an UNGUESSABLE filename (never referenced
 * in client code), so the static URL stays undiscoverable while the file is
 * reliably bundled on Vercel. (The Turbopack production build does NOT honor
 * `outputFileTracingIncludes`, so reading from /private-docs 404'd in prod.)
 */
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { requireAuthenticatedUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/adminEmails";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

const UNLOCK_KEY = "res:/parents/story";
// /public is reliably deployed on Vercel; private-docs is a local-dev fallback.
const FILE_CANDIDATES = [
  path.join(process.cwd(), "public", "parents-docs", "ivy-journey-_v1x9k7q2.pdf"),
  path.join(process.cwd(), "private-docs", "ivy-engineering-journey.pdf"),
];

export async function GET(req: NextRequest) {
  const auth = await requireAuthenticatedUser(req);
  if (auth instanceof NextResponse) return auth; // 401 if not signed in
  const user = auth;

  // Admins read everything credit-free.
  const admin = isAdminEmail(user.email);

  // Strict: require the server-recorded res:/parents/story unlock (fail closed).
  // The old login-only fallback for empty unlock arrays let any signed-in user
  // read the book without paying. Unlocks are now server-authoritative (see
  // spendAndUnlockAccount), so a real purchase reliably records the key.
  if (!admin) {
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
          "Content-Disposition": 'inline; filename="ivy-engineering-journey.pdf"',
          "Cache-Control": "private, no-store",
        },
      });
    } catch { /* try next candidate */ }
  }
  return NextResponse.json({ error: "not-found" }, { status: 404 });
}
