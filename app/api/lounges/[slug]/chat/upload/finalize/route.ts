import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser, isAdminEmail } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { hydrateChatMessages, type ChatMessageRow } from "@/lib/chat";
import { isDocGroup, type DocGroup } from "@/lib/docGroups";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "chat-attachments";
const IMAGE_MIMES = new Set([
  "image/jpeg", "image/png", "image/gif", "image/webp", "image/heic", "image/heif",
]);

/**
 * POST /api/lounges/[slug]/chat/upload/finalize
 *   body: JSON {
 *     path, fileName, fileSize, mimeType,
 *     caption?, group?, replyToId?
 *   }
 *
 * Called after the client uploads to the signed URL from /sign. Verifies
 * path ownership (must start with the caller's user id), creates the
 * chat_messages row, dual-writes to lounge_resources, and returns the
 * hydrated message.
 */
export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const slug = String(params.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const body = (await req.json().catch(() => null)) as {
    path?: string;
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
    caption?: string;
    group?: string;
    replyToId?: string | null;
  } | null;
  if (!body) return NextResponse.json({ error: "invalid body" }, { status: 400 });

  const path = typeof body.path === "string" ? body.path : "";
  const fileName = typeof body.fileName === "string" ? body.fileName : "";
  const fileSize = typeof body.fileSize === "number" ? body.fileSize : 0;
  const mimeType = typeof body.mimeType === "string" ? body.mimeType : "application/octet-stream";
  const caption = typeof body.caption === "string" ? body.caption.trim() : "";
  const replyToId = typeof body.replyToId === "string" && body.replyToId.length > 0 ? body.replyToId : null;
  const groupRaw = typeof body.group === "string" ? body.group : "";
  const group: DocGroup | null = groupRaw && isDocGroup(groupRaw) ? groupRaw : null;

  if (!path) return NextResponse.json({ error: "path required" }, { status: 400 });
  if (!fileName) return NextResponse.json({ error: "fileName required" }, { status: 400 });

  // Anti-spoofing: the signed URL's path is minted with the user's id
  // baked in. Reject any finalize call where path doesn't carry our id.
  const expectedPathPrefix = `lounge/${slug}/${user.id}-`;
  if (!path.startsWith(expectedPathPrefix)) {
    return NextResponse.json({ error: "path does not belong to this user" }, { status: 403 });
  }

  // this-week is admin-only — match the multipart route.
  if (group === "this-week" && !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "this-week is admin-only" }, { status: 403 });
  }

  const supabase = createAdminClient();

  // Lounge lookup.
  const { data: lounge } = await supabase
    .from("lounges")
    .select("id, slug, name")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!lounge) return NextResponse.json({ error: "lounge not found" }, { status: 404 });
  const loungeRow = lounge as { id: string; slug: string; name: string };

  // Verify the file actually exists in storage (anti-replay: don't let a
  // forged finalize call create a row pointing at nothing).
  const dirIdx = path.lastIndexOf("/");
  const dir = dirIdx >= 0 ? path.slice(0, dirIdx) : "";
  const base = dirIdx >= 0 ? path.slice(dirIdx + 1) : path;
  const { data: listed } = await supabase.storage
    .from(BUCKET)
    .list(dir, { limit: 100, search: base });
  const exists = (listed ?? []).some((entry) => entry.name === base);
  if (!exists) {
    return NextResponse.json({ error: "upload not found in storage" }, { status: 404 });
  }

  const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const publicUrl = publicUrlData.publicUrl;
  const isImage = IMAGE_MIMES.has(mimeType);
  const messageType = isImage ? "image" : "file";

  // ── Dedup guard: same lounge + same uploader + same fileName +
  // same fileSize within the last 24h. The chat upload UI lets a
  // student re-tap the same file (or get an upload retried), and
  // without this check each click creates a fresh chat_messages
  // row — observed in the AP Bio lounge where one file was
  // uploaded 11 times in May 2026. If we find a recent match, we
  // return that existing message and remove the freshly-uploaded
  // (now orphan) storage object.
  if (!isImage) {
    const dedupSince = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: recents } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("context_type", "lounge")
      .eq("context_id", loungeRow.id)
      .eq("author_id", user.id)
      .eq("is_deleted", false)
      .gte("created_at", dedupSince)
      .order("created_at", { ascending: false })
      .limit(20);
    const existing = (recents ?? []).find((m) => {
      const meta = (m as { attachment_meta: Record<string, unknown> | null }).attachment_meta ?? {};
      return meta.fileName === fileName && meta.size === fileSize;
    });
    if (existing) {
      void supabase.storage.from(BUCKET).remove([path]);
      const [message] = await hydrateChatMessages([existing as ChatMessageRow], user.id);
      return NextResponse.json({ ok: true, message, dedup: true });
    }
  }

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
    fileName,
    size: fileSize,
    mimeType,
    storagePath: path,
    isInheroOfficial: isAdminEmail(user.email),
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

  // Dual-write to lounge_resources for /library before hydrating so the
  // freshly returned message already includes the library resource id.
  if (group) {
    const insertedRow = inserted as { id: string; created_at: string };
    const resourceIdFallback = insertedRow.id;
    let resourceId: string | null = resourceIdFallback;
    const { data: resourceRow, error: resourceErr } = await supabase
      .from("lounge_resources")
      .insert({
        chat_message_id: insertedRow.id,
        lounge_id: loungeRow.id,
        author_id: user.id,
        folder_type: group,
        title: caption || fileName || "Untitled",
        attachment_url: publicUrl,
        attachment_meta: attachmentMeta,
        file_name: fileName,
        file_size: fileSize,
        mime_type: mimeType,
        is_inhero_official: isAdminEmail(user.email),
        review_status: "approved",
        created_at: insertedRow.created_at,
      })
      .select("id")
      .single();
    if (resourceErr && !/relation .* does not exist/i.test(resourceErr.message)) {
      console.error("[chat/upload/finalize] lounge_resources mirror failed:", resourceErr.message);
    }

    resourceId = (resourceRow as { id: string } | null | undefined)?.id ?? resourceIdFallback;
    if (resourceId) {
      await supabase
        .from("chat_messages")
        .update({
          attachment_meta: { ...attachmentMeta, resourceId },
        })
        .eq("id", insertedRow.id);
    }

    let [message] = await hydrateChatMessages([inserted as ChatMessageRow], user.id);
    if (message?.attachment && resourceId) {
      message = {
        ...message,
        attachment: {
          ...message.attachment,
          resourceId,
        },
      };
    }

    return NextResponse.json({ ok: true, message });
  }

  const [message] = await hydrateChatMessages([inserted as ChatMessageRow], user.id);

  return NextResponse.json({ ok: true, message });
}
