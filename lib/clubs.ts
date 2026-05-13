/**
 * Clubs — shared types + helpers for flagship aspirational rooms.
 */

import { createAdminClient } from "@/lib/supabase";
import { getBadgeMeta, type BadgeMeta, type BadgeRow, type ProfilePublicRow } from "@/lib/trajectory";

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
}

export interface ClubMemberRow {
  club_id: string;
  user_id: string;
  role: "member" | "curator";
  is_featured: boolean;
  joined_at: string;
}

export interface ClubPublic {
  slug: string;
  name: string;
  mission: string;
  heroBlurb: string | null;
  glyph: string;
  accent: string;
  memberCount: number;
}

export interface ClubMemberPublic {
  handle: string;
  graduationYear: number | null;
  role: "member" | "curator";
  isFeatured: boolean;
  joinedAt: string;
  badges: { type: string; meta: BadgeMeta | null }[];
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
  };
}

/** Hydrate club members with their trajectory handle + badges. */
export async function hydrateClubMembers(
  members: ClubMemberRow[]
): Promise<ClubMemberPublic[]> {
  if (members.length === 0) return [];
  const supabase = createAdminClient();
  const userIds = Array.from(new Set(members.map((m) => m.user_id)));

  const [profilesRes, badgesRes] = await Promise.all([
    supabase.from("profiles_public").select("*").in("user_id", userIds),
    supabase.from("badges").select("*").in("user_id", userIds),
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
        handle: profile.display_handle,
        graduationYear: profile.graduation_year,
        role: m.role,
        isFeatured: m.is_featured,
        joinedAt: m.joined_at,
        badges,
      } satisfies ClubMemberPublic;
    })
    .filter((m): m is ClubMemberPublic => m !== null)
    // Featured first, then by joined_at desc.
    .sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
    });
}
