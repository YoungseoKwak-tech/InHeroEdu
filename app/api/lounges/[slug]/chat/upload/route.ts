import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser, isAdminEmail } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  CHAT_RATE_LIMIT,
  CHAT_RATE_WINDOW_MS,
  hydrateChatMessages,
  type ChatMessageRow,
} from "@/lib/chat";
import { isDocGroup, type DocGroup } from "@/lib/docGroups";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "chat-attachments";
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
const IMAGE_MIMES = new Set([
  "image/jpeg", "image/png", "image/gif", "image/webp", "image/heic", "image/heif",
]);

function safeFilename(raw: string): string {
  // Strip extension-unsafe chars; keep alnum + . _ - and lowercase
  const base = raw.replace(/[^\w.\-]+/g, "_").slice(0, 80);
  return base.length > 0 ? base : "file";
}

/**
 * POST /api/lounges/[slug]/chat/upload
 *   multipart/form-data: { file: File, caption?: string, replyToId?: string }
 *
 * Uploads to Supabase Storage bucket "chat-attachments", then creates a
 * chat_messages row of type 'image' or 'file' depending on MIME.
 */
export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const slug = String(params.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "invalid form data" }, { status: 400 });
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: "file is empty" }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: `File too large. Max ${MAX_FILE_SIZE / (1024 * 1024)} MB.` }, { status: 400 });
  }
  const caption = String(form.get("caption") ?? "").trim();
  const replyToIdRaw = form.get("replyToId");
  const replyToId = typeof replyToIdRaw === "string" && replyToIdRaw.length > 0 ? replyToIdRaw : null;
  // Optional doc folder taxonomy. "this-week" is admin-only — drop on the floor
  // for non-admins so a tampered client can't sneak uploads into the free tier.
  const groupRaw = form.get("group");
  const group: DocGroup | null = typeof groupRaw === "string" && isDocGroup(groupRaw) ? groupRaw : null;
  if (group === "this-week" && !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "this-week is admin-only" }, { status: 403 });
  }

  const supabase = createAdminClient();

  // Profile gate.
  const { data: profiles } = await supabase.from("profiles_public").select("user_id");
  const hasProfile = ((profiles ?? []) as { user_id: string }[]).some((p) => p.user_id === user.id);
  if (!hasProfile) {
    return NextResponse.json({ error: "Claim your trajectory handle before chatting." }, { status: 403 });
  }

  // Lounge lookup.
  const { data: lounge } = await supabase
    .from("lounges")
    .select("id, slug, name")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!lounge) return NextResponse.json({ error: "lounge not found" }, { status: 404 });
  const loungeRow = lounge as { id: string; slug: string; name: string };

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

  // Path: lounge/<slug>/<timestamp>-<userId6>-<filename>
  const timestamp = Date.now();
  const userId6 = user.id.replace(/-/g, "").slice(0, 8);
  const cleanName = safeFilename(file.name || "file");
  const path = `lounge/${loungeRow.slug}/${timestamp}-${userId6}-${cleanName}`;

  // Upload via service-role client (bypasses RLS).
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, {
      contentType: file.type || "application/octet-stream",
      cacheControl: "31536000, immutable",
      upsert: false,
    });
  if (uploadErr) {
    return NextResponse.json({ error: `upload failed: ${uploadErr.message}` }, { status: 500 });
  }
  const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const publicUrl = publicUrlData.publicUrl;

  const isImage = IMAGE_MIMES.has(file.type);
  const messageType = isImage ? "image" : "file";

  // Validate reply target (if any).
  let validatedReplyId: string | null = null;
  if (replyToId) {
    const { data: target } = await supabase
      .from("chat_messages")
      .select("id, context_id, is_deleted")
      .eq("id", replyToId)
      .maybeSingle();
    if (target && (target as { context_id: string; is_deleted: boolean }).context_id === loungeRow.id) {
      validatedReplyId = replyToId;
    }
  }

  const attachmentMeta: Record<string, unknown> = {
    fileName: file.name || cleanName,
    size: file.size,
    mimeType: file.type || "application/octet-stream",
    storagePath: path,
    ...(group ? { group } : {}),
  };

  const { data: inserted, error } = await supabase
    .from("chat_messages")
    .insert({
      context_type: "lounge",
      context_id: loungeRow.id,
      author_id: user.id,
      type: messageType,
      content: caption || null,
      reply_to_id: validatedReplyId,
      attachment_url: publicUrl,
      attachment_meta: attachmentMeta,
    })
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const [message] = await hydrateChatMessages([inserted as ChatMessageRow], user.id);

  // Dual-write to lounge_resources for the /library feed. Defensive: if the
  // table doesn't exist yet (migration not applied), the chat upload still
  // succeeds — we just skip the feed mirror.
  if (group) {
    const insertedRow = inserted as { id: string; created_at: string };
    const { error: resourceErr } = await supabase
      .from("lounge_resources")
      .insert({
        chat_message_id: insertedRow.id,
        lounge_id: loungeRow.id,
        author_id: user.id,
        folder_type: group,
        title: caption || file.name || "Untitled",
        attachment_url: publicUrl,
        attachment_meta: attachmentMeta,
        file_name: file.name || cleanName,
        file_size: file.size,
        mime_type: file.type || "application/octet-stream",
        is_inhero_official: isAdminEmail(user.email),
        review_status: "approved",
        created_at: insertedRow.created_at,
      });
    if (resourceErr && !/relation .* does not exist/i.test(resourceErr.message)) {
      // Real error (constraint, FK, etc.) — log but don't fail the upload.
      console.error("[chat/upload] lounge_resources mirror failed:", resourceErr.message);
    }
  }

  return NextResponse.json({ ok: true, message });
}
