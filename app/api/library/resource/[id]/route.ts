import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser, isAdminEmail } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { isDocGroup, type DocGroup } from "@/lib/docGroups";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ResourceRow {
  id: string;
  chat_message_id: string | null;
  lounge_id: string;
  author_id: string | null;
  folder_type: DocGroup;
  title: string;
  description: string | null;
  attachment_url: string;
  attachment_meta: Record<string, unknown> | null;
  file_name: string | null;
  file_size: number | null;
  mime_type: string | null;
  is_inhero_official: boolean;
  is_seeded: boolean;
  download_count: number;
  upvote_count: number;
  comment_count: number;
  created_at: string;
}

interface ChatMessageRowFallback {
  id: string;
  context_id: string;
  author_id: string | null;
  content: string | null;
  attachment_url: string | null;
  attachment_meta: Record<string, unknown> | null;
  created_at: string;
}

function stringMeta(meta: Record<string, unknown> | null, key: string): string | null {
  if (!meta) return null;
  const value = meta[key];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function numberMeta(meta: Record<string, unknown> | null, key: string): number | null {
  if (!meta) return null;
  const value = meta[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function folderFromMeta(meta: Record<string, unknown> | null): DocGroup {
  const raw = stringMeta(meta, "group");
  return raw && isDocGroup(raw) ? raw : "notes";
}

function mimeFromMeta(meta: Record<string, unknown> | null): string | null {
  return stringMeta(meta, "mimeType");
}

function titleFromFallback(message: ChatMessageRowFallback): string {
  const meta = message.attachment_meta;
  return (
    stringMeta(meta, "title") ??
    message.content ??
    stringMeta(meta, "fileName") ??
    "Untitled"
  );
}

async function loadFallbackResource(
  supabase: ReturnType<typeof createAdminClient>,
  id: string,
  userId: string
) {
  let { data: message, error } = await supabase
    .from("chat_messages")
    .select("id, context_id, author_id, content, attachment_url, attachment_meta, created_at")
    .eq("id", id)
    .eq("is_deleted", false)
    .maybeSingle();

  if (!message && !error) {
    const byResourceId = await supabase
      .from("chat_messages")
      .select("id, context_id, author_id, content, attachment_url, attachment_meta, created_at")
      .eq("attachment_meta->>resourceId", id)
      .eq("is_deleted", false)
      .maybeSingle();
    message = byResourceId.data;
    error = byResourceId.error;
  }

  if (error) {
    return { error };
  }
  if (!message) {
    return { data: null as null };
  }

  const row = message as ChatMessageRowFallback;
  if (!row.attachment_url) {
    return { data: null as null };
  }

  const meta = row.attachment_meta ?? {};
  const mimeType = mimeFromMeta(meta) ?? (stringMeta(meta, "fileName")?.toLowerCase().endsWith(".pdf") ? "application/pdf" : null);

  const [loungeRes, profileRes] = await Promise.all([
    supabase.from("lounges").select("id, slug, name").eq("id", row.context_id).maybeSingle(),
    row.author_id
      ? supabase
          .from("profiles_public")
          .select("user_id, display_handle")
          .eq("user_id", row.author_id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const lounge = loungeRes.data as { id: string; slug: string; name: string } | null;
  const profile = profileRes.data as { user_id: string; display_handle: string | null } | null;

  return {
    data: {
      resource: {
        id: row.id,
        title: titleFromFallback(row),
        description: null,
        folder: folderFromMeta(meta),
        attachmentUrl: row.attachment_url,
        fileName: stringMeta(meta, "fileName"),
        fileSize: numberMeta(meta, "size"),
        mimeType,
        isImage: row.attachment_url.startsWith("data:image/") || row.attachment_url.endsWith(".png") || row.attachment_url.endsWith(".jpg") || row.attachment_url.endsWith(".jpeg") || row.attachment_url.endsWith(".webp") || (mimeType?.startsWith("image/") ?? false),
        isPdf: mimeType === "application/pdf",
        isInheroOfficial: false,
        isSeeded: false,
        downloadCount: 0,
        upvoteCount: 0,
        commentCount: 0,
        createdAt: row.created_at,
        isMine: row.author_id === userId,
        lounge: lounge ? { slug: lounge.slug, name: lounge.name } : null,
        author: profile?.display_handle ? { handle: profile.display_handle } : null,
      },
    },
  };
}

/**
 * GET /api/library/resource/[id]
 *
 * Returns a single approved resource hydrated with author handle + lounge
 * slug/name. Used by /library/[resourceId] detail page.
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const id = String(params.id ?? "").trim();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = createAdminClient();

  const { data: row, error } = await supabase
    .from("lounge_resources")
    .select(
      "id, chat_message_id, lounge_id, author_id, folder_type, title, description, attachment_url, attachment_meta, file_name, file_size, mime_type, is_inhero_official, is_seeded, download_count, upvote_count, comment_count, created_at"
    )
    .eq("id", id)
    .eq("review_status", "approved")
    .is("deleted_at", null)
    .maybeSingle();

  if (error) {
    if (/relation .* does not exist/i.test(error.message)) {
      const fallback = await loadFallbackResource(supabase, id, user.id);
      if ("error" in fallback && fallback.error) {
        return NextResponse.json({ error: fallback.error.message }, { status: 500 });
      }
      if (!fallback.data) {
        return NextResponse.json({ error: "not found" }, { status: 404 });
      }
      return NextResponse.json(fallback.data, {
        headers: { "Cache-Control": "private, no-store, must-revalidate" },
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!row) {
    const fallback = await loadFallbackResource(supabase, id, user.id);
    if ("error" in fallback && fallback.error) {
      return NextResponse.json({ error: fallback.error.message }, { status: 500 });
    }
    if (!fallback.data) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json(fallback.data, {
      headers: { "Cache-Control": "private, no-store, must-revalidate" },
    });
  }

  const resource = row as ResourceRow;

  const [loungeRes, profileRes] = await Promise.all([
    supabase.from("lounges").select("id, slug, name").eq("id", resource.lounge_id).maybeSingle(),
    resource.author_id
      ? supabase
          .from("profiles_public")
          .select("user_id, display_handle")
          .eq("user_id", resource.author_id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const lounge = loungeRes.data as { id: string; slug: string; name: string } | null;
  const profile = profileRes.data as { user_id: string; display_handle: string | null } | null;

  return NextResponse.json(
    {
      resource: {
        id: resource.id,
        title: resource.title,
        description: resource.description,
        folder: resource.folder_type,
        attachmentUrl: resource.attachment_url,
        fileName: resource.file_name,
        fileSize: resource.file_size,
        mimeType: resource.mime_type,
        isImage: typeof resource.mime_type === "string" && resource.mime_type.startsWith("image/"),
        isPdf: resource.mime_type === "application/pdf",
        isInheroOfficial: resource.is_inhero_official,
        isSeeded: resource.is_seeded,
        downloadCount: resource.download_count,
        upvoteCount: resource.upvote_count,
        commentCount: resource.comment_count,
        createdAt: resource.created_at,
        isMine: resource.author_id === user.id,
        lounge: lounge ? { slug: lounge.slug, name: lounge.name } : null,
        author: profile?.display_handle ? { handle: profile.display_handle } : null,
      },
    },
    {
      headers: { "Cache-Control": "private, no-store, must-revalidate" },
    }
  );
}

/**
 * DELETE /api/library/resource/[id]
 *
 * Soft-deletes the resource. Allowed if the caller is the original
 * author OR an admin (isAdminEmail). Sets deleted_at + deleted_by; the
 * row stays in the DB so it can be recovered. Feed + GET queries
 * filter on deleted_at IS NULL. Hard-delete cron is a future round.
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const id = String(params.id ?? "").trim();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = createAdminClient();

  const { data: row, error: lookupErr } = await supabase
    .from("lounge_resources")
    .select("id, author_id, deleted_at, chat_message_id")
    .eq("id", id)
    .maybeSingle();
  if (lookupErr) {
    if (/relation .* does not exist/i.test(lookupErr.message)) {
      return NextResponse.json({ error: "library not yet provisioned" }, { status: 404 });
    }
    return NextResponse.json({ error: lookupErr.message }, { status: 500 });
  }
  if (!row) {
    // Some older cards used the chat_message id as the card id before
    // lounge_resources became the single source of truth. Let owners
    // delete those stale/fallback cards too, so a visible ⋯ menu never
    // turns into a confusing "not found".
    let { data: message, error: messageErr } = await supabase
      .from("chat_messages")
      .select("id, author_id, is_deleted")
      .eq("id", id)
      .maybeSingle();

    if (!message && !messageErr) {
      const byResourceId = await supabase
        .from("chat_messages")
        .select("id, author_id, is_deleted")
        .eq("attachment_meta->>resourceId", id)
        .maybeSingle();
      message = byResourceId.data;
      messageErr = byResourceId.error;
    }

    if (messageErr) return NextResponse.json({ error: messageErr.message }, { status: 500 });
    if (!message) {
      // Idempotent delete: a stale card can survive briefly in the browser
      // after its DB row was already removed/soft-deleted. Treat that as
      // success so the client can remove the card instead of crashing into
      // a confusing "not found" alert.
      return new Response(null, { status: 204 });
    }

    const msg = message as { id: string; author_id: string | null; is_deleted: boolean };
    if (msg.is_deleted) return new Response(null, { status: 204 });
    const canDeleteMessage = msg.author_id === user.id || isAdminEmail(user.email);
    if (!canDeleteMessage) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const now = new Date().toISOString();
    const { error: messageUpdateErr } = await supabase
      .from("chat_messages")
      .update({ is_deleted: true, edited_at: now })
      .eq("id", msg.id);
    if (messageUpdateErr) {
      return NextResponse.json({ error: messageUpdateErr.message }, { status: 500 });
    }

    const { error: resourceUpdateErr } = await supabase
      .from("lounge_resources")
      .update({ deleted_at: now, deleted_by: user.id })
      .eq("chat_message_id", msg.id)
      .is("deleted_at", null);
    if (resourceUpdateErr && !/relation .* does not exist/i.test(resourceUpdateErr.message)) {
      return NextResponse.json({ error: resourceUpdateErr.message }, { status: 500 });
    }

    return new Response(null, { status: 204 });
  }

  const r = row as {
    id: string;
    author_id: string | null;
    deleted_at: string | null;
    chat_message_id: string | null;
  };

  const isOwner = r.author_id === user.id;
  const isAdmin = isAdminEmail(user.email);
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const now = new Date().toISOString();
  if (!r.deleted_at) {
    const { error: updErr } = await supabase
      .from("lounge_resources")
      .update({ deleted_at: now, deleted_by: user.id })
      .eq("id", id);
    if (updErr) {
      return NextResponse.json({ error: updErr.message }, { status: 500 });
    }
  }

  if (r.chat_message_id) {
    const { error: messageUpdateErr } = await supabase
      .from("chat_messages")
      .update({ is_deleted: true, edited_at: now })
      .eq("id", r.chat_message_id)
      .eq("is_deleted", false);
    if (messageUpdateErr && !/relation .* does not exist/i.test(messageUpdateErr.message)) {
      return NextResponse.json({ error: messageUpdateErr.message }, { status: 500 });
    }
  }
  const { error: fallbackMessageUpdateErr } = await supabase
    .from("chat_messages")
    .update({ is_deleted: true, edited_at: now })
    .eq("attachment_meta->>resourceId", id)
    .eq("is_deleted", false);
  if (
    fallbackMessageUpdateErr &&
    !/relation .* does not exist/i.test(fallbackMessageUpdateErr.message)
  ) {
    return NextResponse.json({ error: fallbackMessageUpdateErr.message }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
