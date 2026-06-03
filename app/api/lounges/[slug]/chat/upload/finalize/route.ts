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
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { slug: rawSlug } = await params;
  const slug = String(rawSlug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const body = (await req.json().catch(() => null)) as {
    path?: string;
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
    caption?: string;
    group?: string;
    replyToId?: string | null;
    publishToLibrary?: boolean;
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
  const publishToLibrary = body.publishToLibrary === true;

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

  // ── Dedup guard: only collapse immediate double-submits.
  // Keep this window intentionally short so a legitimate re-upload
  // (same filename) later still creates a fresh card.
  if (!isImage) {
    const DEDUP_WINDOW_MS = 45 * 1000;
    const dedupSince = new Date(Date.now() - DEDUP_WINDOW_MS).toISOString();
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
      return meta.fileName === fileName && meta.size === fileSize && meta.mimeType === mimeType;
    });
    if (existing) {
      const existingId = (existing as { id: string }).id;
      const { data: existingResource } = await supabase
        .from("lounge_resources")
        .select(
          "id, title, folder_type, attachment_url, mime_type, is_inhero_official, is_seeded, download_count, upvote_count, comment_count, created_at, preview_page_1_url, author_id"
        )
        .eq("chat_message_id", existingId)
        .is("deleted_at", null)
        .eq("review_status", "approved")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      // Only dedup when that matched message has a live library mirror.
      // If no live mirror exists (deleted or never mirrored), proceed with
      // a normal fresh insert below instead of silently suppressing upload.
      if (existingResource) {
        void supabase.storage.from(BUCKET).remove([path]);
        const [message] = await hydrateChatMessages([existing as ChatMessageRow], user.id);
        const resourceCard = {
          id: (existingResource as { id: string }).id,
          title: (existingResource as { title: string }).title,
          folder: (existingResource as { folder_type: DocGroup }).folder_type,
          attachmentUrl: (existingResource as { attachment_url: string }).attachment_url,
          mimeType: (existingResource as { mime_type: string | null }).mime_type,
          isImage:
            typeof (existingResource as { mime_type: string | null }).mime_type === "string" &&
            (existingResource as { mime_type: string | null }).mime_type!.startsWith("image/"),
          isInheroOfficial: (existingResource as { is_inhero_official: boolean }).is_inhero_official,
          isSeeded: (existingResource as { is_seeded: boolean }).is_seeded,
          isMine: (existingResource as { author_id: string | null }).author_id === user.id,
          downloadCount: (existingResource as { download_count: number }).download_count,
          upvoteCount: (existingResource as { upvote_count: number }).upvote_count,
          commentCount: (existingResource as { comment_count: number }).comment_count,
          createdAt: (existingResource as { created_at: string }).created_at,
          previewPage1Url: (existingResource as { preview_page_1_url: string | null }).preview_page_1_url,
          previewPage2Url: null,
          previewPage3Url: null,
          totalPages: null,
          previewStatus: null,
          lounge: { slug: loungeRow.slug, name: loungeRow.name },
          author: message?.author?.handle ? { handle: message.author.handle } : null,
        };
        return NextResponse.json({ ok: true, message, dedup: true, resource: resourceCard });
      }

      console.log("[finalize] dedup candidate ignored (no live mirror)", {
        chat_message_id: existingId,
        fileName,
        fileSize,
      });
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
    console.log("[finalize] inserting lounge_resources", {
      chat_message_id: insertedRow.id,
      lounge_id: loungeRow.id,
      folder: group,
      publishToLibrary,
    });
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
      .select("id, review_status, deleted_at")
      .single();
    if (resourceErr) {
      console.error("[finalize] lounge_resources INSERT failed:", resourceErr.message);
      return NextResponse.json(
        { error: `Could not publish to Library: ${resourceErr.message}` },
        { status: 500 }
      );
    }
    const resourceId = (resourceRow as { id: string } | null)?.id ?? null;
    if (!resourceId) {
      // Supabase returned no error AND no row — should not happen with
      // service_role + INSERT + .select().single(), but guard against it
      // so we don't return a fake card pointing at a non-existent row.
      console.error("[finalize] lounge_resources INSERT returned no row");
      return NextResponse.json(
        { error: "Library publish failed: no row returned" },
        { status: 500 }
      );
    }
    console.log("[finalize] lounge_resources INSERTed", { resourceId });

    await supabase
      .from("chat_messages")
      .update({
        attachment_meta: { ...attachmentMeta, resourceId },
      })
      .eq("id", insertedRow.id);

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

    const { data: profileRow } = await supabase
      .from("profiles_public")
      .select("display_handle")
      .eq("user_id", user.id)
      .maybeSingle();
    const displayHandle =
      typeof (profileRow as { display_handle?: unknown } | null)?.display_handle === "string"
        ? ((profileRow as { display_handle: string }).display_handle || null)
        : null;

    const resourceCard = resourceId
      ? {
          id: resourceId,
          title: caption || fileName || "Untitled",
          folder: group,
          attachmentUrl: publicUrl,
          mimeType,
          isImage,
          isInheroOfficial: isAdminEmail(user.email),
          isSeeded: false,
          isMine: true,
          downloadCount: 0,
          upvoteCount: 0,
          commentCount: 0,
          createdAt: insertedRow.created_at,
          previewPage1Url: null,
          previewPage2Url: null,
          previewPage3Url: null,
          totalPages: null,
          previewStatus: null,
          lounge: { slug: loungeRow.slug, name: loungeRow.name },
          author: displayHandle ? { handle: displayHandle } : null,
        }
      : null;

    return NextResponse.json({ ok: true, message, resource: resourceCard });
  }

  const [message] = await hydrateChatMessages([inserted as ChatMessageRow], user.id);

  return NextResponse.json({ ok: true, message });
}
