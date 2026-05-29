/**
 * Lounges — shared types + helpers for the lounge feed.
 */

import { createAdminClient } from "@/lib/supabase";
import { loadMentorProfiles, type MentorPublic } from "@/lib/mentors";
import {
  getBadgeMeta,
  type BadgeMeta,
  type BadgeRow,
  type ProfilePublicRow,
} from "@/lib/trajectory";

export const POST_TYPES = ["discussion", "question", "resource_share"] as const;
export type PostType = (typeof POST_TYPES)[number];

export const REACTION_KINDS = ["up", "fire", "check"] as const;
export type ReactionKind = (typeof REACTION_KINDS)[number];

export const REACTION_META: Record<ReactionKind, { glyph: string; accent: string; label: string }> = {
  up:    { glyph: "▲", accent: "#5eead4", label: "Up" },
  fire:  { glyph: "✦", accent: "#F4C95D", label: "Fire" },
  check: { glyph: "✓", accent: "#5DCAA5", label: "Cite" },
};

export const POST_TYPE_LABEL: Record<PostType, string> = {
  discussion:     "Discussion",
  question:       "Question",
  resource_share: "Resource",
};

// Rate limit — N posts per user per hour.
export const POST_RATE_LIMIT = 6;
export const POST_RATE_WINDOW_MS = 60 * 60 * 1000;

export interface LoungeRow {
  id: string;
  slug: string;
  name: string;
  subject_category: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

export interface LoungePostRow {
  id: string;
  lounge_id: string;
  author_id: string;
  title: string;
  body: string | null;
  post_type: PostType;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoungeCommentRow {
  id: string;
  post_id: string;
  author_id: string;
  body: string;
  is_deleted: boolean;
  created_at: string;
}

export interface LoungeReactionRow {
  post_id: string;
  user_id: string;
  kind: ReactionKind;
  created_at: string;
}

// ── Public-facing shapes ────────────────────────────────────────────────
export interface AuthorPublic {
  handle: string;
  graduationYear: number | null;
  badges: { type: string; meta: BadgeMeta | null; metadata: Record<string, unknown> }[];
  mentor: MentorPublic | null;
}

export interface PostPublic {
  id: string;
  loungeSlug: string;
  title: string;
  body: string | null;
  postType: PostType;
  createdAt: string;
  author: AuthorPublic | null;
  reactionCounts: Record<ReactionKind, number>;
  myReactions: ReactionKind[];
  commentCount: number;
}

export interface CommentPublic {
  id: string;
  body: string;
  createdAt: string;
  author: AuthorPublic | null;
}

// ── Join helpers ────────────────────────────────────────────────────────
function authorFromMaps(
  authorId: string,
  profileMap: Map<string, ProfilePublicRow>,
  badgeMap: Map<string, BadgeRow[]>,
  mentorMap: Map<string, MentorPublic>
): AuthorPublic | null {
  const profile = profileMap.get(authorId);
  if (!profile) return null;
  const badges = (badgeMap.get(authorId) ?? []).map((b) => ({
    type: b.badge_type,
    meta: getBadgeMeta(b.badge_type),
    metadata: (b.badge_metadata as Record<string, unknown>) ?? {},
  }));
  return {
    handle: profile.display_handle,
    graduationYear: profile.graduation_year,
    badges,
    mentor: mentorMap.get(authorId) ?? null,
  };
}

export async function hydratePostsWithAuthors(
  posts: LoungePostRow[],
  loungeSlug: string,
  currentUserId: string | null
): Promise<PostPublic[]> {
  if (posts.length === 0) return [];
  const supabase = createAdminClient();
  const authorIds = Array.from(new Set(posts.map((p) => p.author_id)));
  const postIds = posts.map((p) => p.id);

  const [profilesRes, badgesRes, reactionsRes, commentCountsRes, mentorMap] = await Promise.all([
    supabase.from("profiles_public").select("*").in("user_id", authorIds),
    supabase.from("badges").select("*").in("user_id", authorIds),
    supabase.from("lounge_reactions").select("post_id, user_id, kind").in("post_id", postIds),
    supabase
      .from("lounge_post_comments")
      .select("post_id")
      .in("post_id", postIds)
      .eq("is_deleted", false),
    loadMentorProfiles(authorIds),
  ]);

  const profileMap = new Map<string, ProfilePublicRow>(
    ((profilesRes.data ?? []) as ProfilePublicRow[]).map((p) => [p.user_id, p])
  );
  const badgeMap = new Map<string, BadgeRow[]>();
  for (const b of (badgesRes.data ?? []) as BadgeRow[]) {
    const arr = badgeMap.get(b.user_id) ?? [];
    arr.push(b);
    badgeMap.set(b.user_id, arr);
  }
  const reactions = (reactionsRes.data ?? []) as Pick<LoungeReactionRow, "post_id" | "user_id" | "kind">[];
  const commentRows = (commentCountsRes.data ?? []) as { post_id: string }[];

  const reactionCountByPost = new Map<string, Record<ReactionKind, number>>();
  const myReactionsByPost = new Map<string, Set<ReactionKind>>();
  for (const r of reactions) {
    const counts =
      reactionCountByPost.get(r.post_id) ?? { up: 0, fire: 0, check: 0 };
    counts[r.kind] += 1;
    reactionCountByPost.set(r.post_id, counts);
    if (currentUserId && r.user_id === currentUserId) {
      const set = myReactionsByPost.get(r.post_id) ?? new Set<ReactionKind>();
      set.add(r.kind);
      myReactionsByPost.set(r.post_id, set);
    }
  }

  const commentCountByPost = new Map<string, number>();
  for (const c of commentRows) {
    commentCountByPost.set(c.post_id, (commentCountByPost.get(c.post_id) ?? 0) + 1);
  }

  return posts.map((p) => ({
    id: p.id,
    loungeSlug,
    title: p.title,
    body: p.body,
    postType: p.post_type,
    createdAt: p.created_at,
    author: authorFromMaps(p.author_id, profileMap, badgeMap, mentorMap),
    reactionCounts: reactionCountByPost.get(p.id) ?? { up: 0, fire: 0, check: 0 },
    myReactions: Array.from(myReactionsByPost.get(p.id) ?? []),
    commentCount: commentCountByPost.get(p.id) ?? 0,
  }));
}

export async function hydrateCommentsWithAuthors(
  comments: LoungeCommentRow[]
): Promise<CommentPublic[]> {
  if (comments.length === 0) return [];
  const supabase = createAdminClient();
  const authorIds = Array.from(new Set(comments.map((c) => c.author_id)));

  const [profilesRes, badgesRes, mentorMap] = await Promise.all([
    supabase.from("profiles_public").select("*").in("user_id", authorIds),
    supabase.from("badges").select("*").in("user_id", authorIds),
    loadMentorProfiles(authorIds),
  ]);
  const profileMap = new Map<string, ProfilePublicRow>(
    ((profilesRes.data ?? []) as ProfilePublicRow[]).map((p) => [p.user_id, p])
  );
  const badgeMap = new Map<string, BadgeRow[]>();
  for (const b of (badgesRes.data ?? []) as BadgeRow[]) {
    const arr = badgeMap.get(b.user_id) ?? [];
    arr.push(b);
    badgeMap.set(b.user_id, arr);
  }

  return comments.map((c) => ({
    id: c.id,
    body: c.body,
    createdAt: c.created_at,
    author: authorFromMaps(c.author_id, profileMap, badgeMap, mentorMap),
  }));
}

export function isAdminEmail(email: string | null | undefined): boolean {
  const localAdminFallback =
    process.env.NODE_ENV === "development" ? "yk777@cornell.edu,hyeonjei@gmail.com" : "";
  const list = (process.env.ADMIN_EMAILS ?? localAdminFallback)
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (!email) return false;
  return list.includes(email.trim().toLowerCase());
}
