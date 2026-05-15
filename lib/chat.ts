/**
 * Chat — shared types + hydration + URL extraction for Library tab.
 */

import { createAdminClient } from "@/lib/supabase";
import { loadMentorProfiles, type MentorPublic } from "@/lib/mentors";
import {
  getBadgeMeta,
  type BadgeMeta,
  type BadgeRow,
  type ProfilePublicRow,
} from "@/lib/trajectory";

export type ChatMessageType = "text" | "image" | "file" | "drop" | "system";
export type ChatContextType = "lounge" | "club";

export const CHAT_TEXT_MAX = 4000;
// Slow-throttle rate limit (per user). Tunable.
export const CHAT_RATE_LIMIT = 30;
export const CHAT_RATE_WINDOW_MS = 60 * 1000;

export interface ChatMessageRow {
  id: string;
  context_type: ChatContextType;
  context_id: string;
  author_id: string | null;
  type: ChatMessageType;
  content: string | null;
  reply_to_id: string | null;
  attachment_url: string | null;
  attachment_meta: Record<string, unknown> | null;
  drop_id: string | null;
  is_pinned: boolean;
  is_deleted: boolean;
  edited_at: string | null;
  created_at: string;
}

export interface ChatAuthorPublic {
  handle: string;
  graduationYear: number | null;
  badges: { type: string; meta: BadgeMeta | null; metadata: Record<string, unknown> }[];
  mentor: MentorPublic | null;
}

export interface ChatReactionPublic {
  emoji: string;
  count: number;
  mine: boolean;
}

export const REACTION_EMOJI = ["👏", "🔥", "💡", "📌", "❤️", "✓", "🤔", "😂"] as const;

export interface ChatMessagePublic {
  id: string;
  type: ChatMessageType;
  content: string | null;
  createdAt: string;
  isPinned: boolean;
  isMine: boolean;
  author: ChatAuthorPublic | null;
  replyTo: { id: string; handle: string | null; snippet: string } | null;
  attachment: { url: string; meta: Record<string, unknown>; resourceId: string | null } | null;
  links: string[];
  reactions: ChatReactionPublic[];
}

// ── URL extraction ──────────────────────────────────────────────────
// Conservative regex: match http/https URLs only. Used to populate the
// "Links" section of Library tab from text messages.
const URL_REGEX = /\bhttps?:\/\/[^\s<>()"']+/gi;

export function extractUrls(text: string | null): string[] {
  if (!text) return [];
  const matches = text.match(URL_REGEX) ?? [];
  // De-dup + trim trailing punctuation
  const cleaned = matches
    .map((u) => u.replace(/[.,;:!?)\]]+$/g, ""))
    .filter((u, i, arr) => u.length > 0 && arr.indexOf(u) === i);
  return cleaned;
}

// ── Hydration ───────────────────────────────────────────────────────
export async function hydrateChatMessages(
  rows: ChatMessageRow[],
  currentUserId: string | null
): Promise<ChatMessagePublic[]> {
  if (rows.length === 0) return [];

  const supabase = createAdminClient();
  const authorIds = Array.from(
    new Set(rows.map((r) => r.author_id).filter((x): x is string => !!x))
  );
  const replyIds = Array.from(
    new Set(rows.map((r) => r.reply_to_id).filter((x): x is string => !!x))
  );
  const messageIds = rows.map((r) => r.id);

  // Messages that have attachments — we'll look up their lounge_resources
  // row (linked by chat_message_id, UNIQUE) so the chat UI can route
  // attachment clicks into /library/[id]/read instead of leaking the
  // raw Supabase Storage URL.
  const attachmentMessageIds = rows
    .filter((r) => !!r.attachment_url)
    .map((r) => r.id);

  const [profilesRes, badgesRes, mentorMap, replyRowsRes, reactionsRes, resourcesRes] = await Promise.all([
    authorIds.length === 0
      ? Promise.resolve({ data: [] })
      : supabase.from("profiles_public").select("*").in("user_id", authorIds),
    authorIds.length === 0
      ? Promise.resolve({ data: [] })
      : supabase.from("badges").select("*").in("user_id", authorIds),
    loadMentorProfiles(authorIds),
    replyIds.length === 0
      ? Promise.resolve({ data: [] })
      : supabase.from("chat_messages").select("id, content, author_id").in("id", replyIds),
    messageIds.length === 0
      ? Promise.resolve({ data: [] })
      : supabase.from("chat_reactions").select("message_id, user_id, emoji").in("message_id", messageIds),
    attachmentMessageIds.length === 0
      ? Promise.resolve({ data: [] })
      : supabase
          .from("lounge_resources")
          .select("id, chat_message_id")
          .in("chat_message_id", attachmentMessageIds),
  ]);

  // Defensive: lounge_resources may not exist yet (migration not run);
  // in that case the .in() query fails. The map ends up empty and the
  // client falls back to the legacy raw-URL behaviour for old chats.
  const resourceByMessageId = new Map<string, string>();
  for (const row of (resourcesRes.data ?? []) as { id: string; chat_message_id: string | null }[]) {
    if (row.chat_message_id) resourceByMessageId.set(row.chat_message_id, row.id);
  }

  const profileMap = new Map<string, ProfilePublicRow>(
    ((profilesRes.data ?? []) as ProfilePublicRow[]).map((p) => [p.user_id, p])
  );
  const badgeMap = new Map<string, BadgeRow[]>();
  for (const b of (badgesRes.data ?? []) as BadgeRow[]) {
    const arr = badgeMap.get(b.user_id) ?? [];
    arr.push(b);
    badgeMap.set(b.user_id, arr);
  }
  const replyRows = (replyRowsRes.data ?? []) as { id: string; content: string | null; author_id: string | null }[];
  const replyMap = new Map<string, { content: string | null; author_id: string | null }>(
    replyRows.map((r) => [r.id, { content: r.content, author_id: r.author_id }])
  );

  // Aggregate reactions per message_id
  const reactionRows = (reactionsRes.data ?? []) as { message_id: string; user_id: string; emoji: string }[];
  const reactionAgg = new Map<string, Map<string, { count: number; mine: boolean }>>();
  for (const r of reactionRows) {
    const byEmoji = reactionAgg.get(r.message_id) ?? new Map<string, { count: number; mine: boolean }>();
    const cur = byEmoji.get(r.emoji) ?? { count: 0, mine: false };
    cur.count += 1;
    if (currentUserId && r.user_id === currentUserId) cur.mine = true;
    byEmoji.set(r.emoji, cur);
    reactionAgg.set(r.message_id, byEmoji);
  }

  function authorFor(userId: string | null): ChatAuthorPublic | null {
    if (!userId) return null;
    const profile = profileMap.get(userId);
    if (!profile) return null;
    return {
      handle: profile.display_handle,
      graduationYear: profile.graduation_year,
      badges: (badgeMap.get(userId) ?? []).map((b) => ({
        type: b.badge_type,
        meta: getBadgeMeta(b.badge_type),
        metadata: (b.badge_metadata as Record<string, unknown>) ?? {},
      })),
      mentor: mentorMap.get(userId) ?? null,
    };
  }

  return rows.map((r) => {
    const replyOriginal = r.reply_to_id ? replyMap.get(r.reply_to_id) : null;
    const replyAuthor = replyOriginal?.author_id ? authorFor(replyOriginal.author_id) : null;
    return {
      id: r.id,
      type: r.type,
      content: r.content,
      createdAt: r.created_at,
      isPinned: r.is_pinned,
      isMine: !!currentUserId && r.author_id === currentUserId,
      author: authorFor(r.author_id),
      replyTo: replyOriginal
        ? {
            id: r.reply_to_id!,
            handle: replyAuthor?.handle ?? null,
            snippet: (replyOriginal.content ?? "").slice(0, 120),
          }
        : null,
      attachment: r.attachment_url
        ? {
            url: r.attachment_url,
            meta: r.attachment_meta ?? {},
            resourceId: resourceByMessageId.get(r.id) ?? null,
          }
        : null,
      links: extractUrls(r.content),
      reactions: Array.from(reactionAgg.get(r.id)?.entries() ?? []).map(([emoji, agg]) => ({
        emoji,
        count: agg.count,
        mine: agg.mine,
      })),
    };
  });
}

// ── Library aggregation shape ──────────────────────────────────────
export interface LibraryItem {
  messageId: string;
  createdAt: string;
  author: { handle: string; mentor: MentorPublic | null } | null;
}

export interface LibraryPhoto extends LibraryItem {
  url: string;
  alt: string | null;
  width?: number;
  height?: number;
}

export interface LibraryFile extends LibraryItem {
  url: string;
  fileName: string;
  size?: number;
  mimeType?: string;
}

export interface LibraryLink extends LibraryItem {
  url: string;
  snippet: string;
}

export interface LibraryAggregate {
  photos: LibraryPhoto[];
  files: LibraryFile[];
  links: LibraryLink[];
}

export function aggregateLibrary(messages: ChatMessagePublic[]): LibraryAggregate {
  const photos: LibraryPhoto[] = [];
  const files: LibraryFile[] = [];
  const links: LibraryLink[] = [];

  for (const m of messages) {
    const author = m.author
      ? { handle: m.author.handle, mentor: m.author.mentor }
      : null;

    // image
    if (m.type === "image" && m.attachment) {
      const meta = m.attachment.meta as Record<string, unknown>;
      photos.push({
        messageId: m.id,
        createdAt: m.createdAt,
        author,
        url: m.attachment.url,
        alt: m.content ?? null,
        width: typeof meta.width === "number" ? meta.width : undefined,
        height: typeof meta.height === "number" ? meta.height : undefined,
      });
    }

    // file
    if (m.type === "file" && m.attachment) {
      const meta = m.attachment.meta as Record<string, unknown>;
      files.push({
        messageId: m.id,
        createdAt: m.createdAt,
        author,
        url: m.attachment.url,
        fileName: typeof meta.fileName === "string" ? meta.fileName : "file",
        size: typeof meta.size === "number" ? meta.size : undefined,
        mimeType: typeof meta.mimeType === "string" ? meta.mimeType : undefined,
      });
    }

    // links from text content
    for (const url of m.links) {
      links.push({
        messageId: m.id,
        createdAt: m.createdAt,
        author,
        url,
        snippet: (m.content ?? "").slice(0, 200),
      });
    }
  }

  // newest first
  photos.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  files.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  links.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return { photos, files, links };
}
