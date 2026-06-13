/**
 * GET /api/parents/seminar/media?which=video|deck
 * Login-gated signed URLs for the seminar replay (private bucket). Anonymous
 * users get 401 so the replay can't be watched without an account.
 */
import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const BUCKET = "seminar-private";
const PATHS: Record<string, string> = {
  video: "2026-06-13/replay.mp4",
  deck: "2026-06-13/deck.pdf",
};

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user; // 401 if not signed in

  const which = new URL(req.url).searchParams.get("which") ?? "";
  const path = PATHS[which];
  if (!path) return NextResponse.json({ error: "invalid which" }, { status: 400 });

  const supabase = createAdminClient();
  const expiry = which === "video" ? 14400 : 3600; // 4h for the 2h video, 1h for the deck
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, expiry);
  if (error || !data?.signedUrl) {
    console.error("[seminar.media]", error);
    return NextResponse.json({ error: "sign failed" }, { status: 500 });
  }
  return NextResponse.json({ url: data.signedUrl });
}
