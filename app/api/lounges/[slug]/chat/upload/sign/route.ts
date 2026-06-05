import { NextRequest, NextResponse } from "next/server";
import { hasLoungeAccess, loungeLockedResponse } from "@/lib/loungeAccess";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { CHAT_RATE_LIMIT, CHAT_RATE_WINDOW_MS } from "@/lib/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "chat-attachments";
// 5 GB per file — Supabase Pro per-file ceiling. The bucket itself
// must have `file_size_limit` set to at least this value in Supabase
// Dashboard or via SQL, otherwise the signed-URL upload will error
// with "The object exceeded the maximum allowed size" regardless of
// what we check here.
const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024;

function noProfileResponse() {
  return NextResponse.json(
    {
      error: "Claim your trajectory handle before chatting.",
      code: "NO_PROFILE",
      onboardingUrl: "/onboarding",
    },
    { status: 403 }
  );
}

function safeFilename(raw: string): string {
  const base = raw.replace(/[^\w.\-]+/g, "_").slice(0, 80);
  return base.length > 0 ? base : "file";
}

/**
 * POST /api/lounges/[slug]/chat/upload/sign
 *   body: JSON { fileName, fileSize, mimeType }
 *
 * Mints a single-use signed upload URL for Supabase Storage. The client
 * then uploads the file directly to Supabase (no Vercel 4.5 MB body
 * limit), and POSTs to /finalize to materialize the chat_messages +
 * lounge_resources rows. Path embeds the user id so /finalize can
 * verify path ownership.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  // Elite gate — posting/chatting in lounges requires One Subject Elite+.
  if (!(await hasLoungeAccess(user.id, user.email))) {
    return NextResponse.json(loungeLockedResponse, { status: 403 });
  }

  const { slug: rawSlug } = await params;
  const slug = String(rawSlug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const body = (await req.json().catch(() => null)) as {
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
  } | null;
  if (!body) return NextResponse.json({ error: "invalid body" }, { status: 400 });

  const fileName = typeof body.fileName === "string" ? body.fileName : "";
  const fileSize = typeof body.fileSize === "number" ? body.fileSize : 0;
  if (!fileName) return NextResponse.json({ error: "fileName required" }, { status: 400 });
  if (fileSize <= 0) return NextResponse.json({ error: "fileSize required" }, { status: 400 });
  if (fileSize > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File too large. Max 5 GB." },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  // Profile gate.
  const { data: profiles } = await supabase.from("profiles_public").select("user_id");
  const hasProfile = ((profiles ?? []) as { user_id: string }[]).some((p) => p.user_id === user.id);
  if (!hasProfile) {
    return noProfileResponse();
  }

  // Lounge lookup.
  const { data: lounge } = await supabase
    .from("lounges")
    .select("id, slug")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!lounge) return NextResponse.json({ error: "lounge not found" }, { status: 404 });
  const loungeRow = lounge as { id: string; slug: string };

  // Rate limit on chat sends (uploads share the same budget).
  const since = new Date(Date.now() - CHAT_RATE_WINDOW_MS).toISOString();
  const { data: recentRows } = await supabase
    .from("chat_messages")
    .select("author_id, created_at")
    .gte("created_at", since)
    .eq("context_type", "lounge")
    .eq("context_id", loungeRow.id);
  const recentMine = ((recentRows ?? []) as { author_id: string | null }[]).filter(
    (r) => r.author_id === user.id
  ).length;
  if (recentMine >= CHAT_RATE_LIMIT) {
    return NextResponse.json({ error: `Slow down. ${CHAT_RATE_LIMIT}/min cap.` }, { status: 429 });
  }

  // Path: lounge/<slug>/<userId>-<timestamp>-<filename>
  // The user id is encoded so /finalize can verify the caller owns the path.
  const timestamp = Date.now();
  const cleanName = safeFilename(fileName || "file");
  const path = `lounge/${loungeRow.slug}/${user.id}-${timestamp}-${cleanName}`;

  const { data: signed, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUploadUrl(path);
  if (signErr) {
    return NextResponse.json({ error: `sign failed: ${signErr.message}` }, { status: 500 });
  }

  return NextResponse.json({
    path: signed.path,
    token: signed.token,
    signedUrl: signed.signedUrl,
    bucket: BUCKET,
  });
}
