/**
 * Clubs — shared types + helpers for flagship aspirational rooms.
 */

import { createAdminClient } from "@/lib/supabase";
import { loadMentorProfiles, type MentorPublic } from "@/lib/mentors";
import { getBadgeMeta, type BadgeMeta, type BadgeRow, type ProfilePublicRow } from "@/lib/trajectory";

export const CLUB_ROLES = ["founder", "cofounder", "secretary", "member", "curator"] as const;
export type ClubRole = (typeof CLUB_ROLES)[number];

export const CLUB_ROLE_LABEL: Record<ClubRole, string> = {
  founder:   "Founder",
  cofounder: "Co-founder",
  secretary: "Secretary",
  member:    "Member",
  curator:   "Curator",
};

export const CLUB_ROLE_RANK: Record<ClubRole, number> = {
  founder:   1,
  cofounder: 2,
  secretary: 3,
  curator:   4,
  member:    5,
};

export function canEditClub(role: ClubRole | null): boolean {
  return role === "founder" || role === "cofounder";
}
export function canAssignRoles(role: ClubRole | null): boolean {
  return role === "founder";
}

export interface ClubRow {
  id: string;
  slug: string;
  name: string;
  mission: string;
  hero_blurb: string | null;
  glyph: string;
  accent: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  created_by: string | null;
  is_user_created: boolean;
}

export interface ClubMemberRow {
  club_id: string;
  user_id: string;
  role: ClubRole;
  is_featured: boolean;
  joined_at: string;
}

export interface ClubMeetingNoteRow {
  id: string;
  club_id: string;
  author_id: string;
  title: string;
  body: string;
  meeting_at: string | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClubPublic {
  slug: string;
  name: string;
  mission: string;
  heroBlurb: string | null;
  glyph: string;
  accent: string;
  memberCount: number;
  isUserCreated: boolean;
}

export interface ClubMemberPublic {
  userId: string;
  handle: string;
  graduationYear: number | null;
  role: ClubRole;
  isFeatured: boolean;
  joinedAt: string;
  badges: { type: string; meta: BadgeMeta | null }[];
  mentor: MentorPublic | null;
}

export interface MeetingNotePublic {
  id: string;
  title: string;
  body: string;
  meetingAt: string | null;
  createdAt: string;
  author: { handle: string; graduationYear: number | null } | null;
}

export function toClubPublic(row: ClubRow, memberCount: number): ClubPublic {
  return {
    slug: row.slug,
    name: row.name,
    mission: row.mission,
    heroBlurb: row.hero_blurb,
    glyph: row.glyph,
    accent: row.accent,
    memberCount,
    isUserCreated: row.is_user_created,
  };
}

// Handle slug validation — lowercase letters, digits, hyphens, 3-32 chars.
const CLUB_SLUG_REGEX = /^[a-z][a-z0-9-]{2,31}$/;
const RESERVED_SLUGS = new Set([
  "new", "create", "admin", "settings", "members", "notes", "join", "leave",
]);

export function validateClubSlug(raw: string): { ok: true; slug: string } | { ok: false; reason: string } {
  const s = raw.trim().toLowerCase();
  if (!CLUB_SLUG_REGEX.test(s)) {
    return { ok: false, reason: "3–32 chars, start with a letter, lowercase + digits + hyphens only." };
  }
  if (RESERVED_SLUGS.has(s)) {
    return { ok: false, reason: "That slug is reserved." };
  }
  if (s.includes("--")) {
    return { ok: false, reason: "No consecutive hyphens." };
  }
  return { ok: true, slug: s };
}

export function deriveSlugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 32);
}

/** Hydrate club members with their trajectory handle + badges. */
export async function hydrateClubMembers(
  members: ClubMemberRow[]
): Promise<ClubMemberPublic[]> {
  if (members.length === 0) return [];
  const supabase = createAdminClient();
  const userIds = Array.from(new Set(members.map((m) => m.user_id)));

  const [profilesRes, badgesRes, mentorMap] = await Promise.all([
    supabase.from("profiles_public").select("*").in("user_id", userIds),
    supabase.from("badges").select("*").in("user_id", userIds),
    loadMentorProfiles(userIds),
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

  return members
    .map((m) => {
      const profile = profileMap.get(m.user_id);
      if (!profile) return null;
      const badges = (badgeMap.get(m.user_id) ?? []).map((b) => ({
        type: b.badge_type,
        meta: getBadgeMeta(b.badge_type),
      }));
      return {
        userId: m.user_id,
        handle: profile.display_handle,
        graduationYear: profile.graduation_year,
        role: m.role,
        isFeatured: m.is_featured,
        joinedAt: m.joined_at,
        badges,
        mentor: mentorMap.get(m.user_id) ?? null,
      } satisfies ClubMemberPublic;
    })
    .filter((m): m is ClubMemberPublic => m !== null)
    // Sort: role rank first (founders top), then featured, then joined_at desc.
    .sort((a, b) => {
      const ra = CLUB_ROLE_RANK[a.role] ?? 99;
      const rb = CLUB_ROLE_RANK[b.role] ?? 99;
      if (ra !== rb) return ra - rb;
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
    });
}

/** Look up a single user's role in a given club. Returns null if not a member. */
export async function getClubRole(
  clubId: string,
  userId: string
): Promise<ClubRole | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("club_members")
    .select("user_id, role")
    .eq("club_id", clubId);
  const rows = (data ?? []) as { user_id: string; role: ClubRole }[];
  const me = rows.find((r) => r.user_id === userId);
  return me?.role ?? null;
}

/** Hydrate meeting notes with author handle. */
export async function hydrateMeetingNotes(
  notes: ClubMeetingNoteRow[]
): Promise<MeetingNotePublic[]> {
  if (notes.length === 0) return [];
  const supabase = createAdminClient();
  const authorIds = Array.from(new Set(notes.map((n) => n.author_id)));
  const { data: profilesRes } = await supabase
    .from("profiles_public")
    .select("user_id, display_handle, graduation_year")
    .in("user_id", authorIds);
  const profileMap = new Map<string, { display_handle: string; graduation_year: number | null }>(
    ((profilesRes ?? []) as { user_id: string; display_handle: string; graduation_year: number | null }[]).map(
      (p) => [p.user_id, { display_handle: p.display_handle, graduation_year: p.graduation_year }]
    )
  );
  return notes.map((n) => {
    const profile = profileMap.get(n.author_id);
    return {
      id: n.id,
      title: n.title,
      body: n.body,
      meetingAt: n.meeting_at,
      createdAt: n.created_at,
      author: profile
        ? { handle: profile.display_handle, graduationYear: profile.graduation_year }
        : null,
    } satisfies MeetingNotePublic;
  });
}
