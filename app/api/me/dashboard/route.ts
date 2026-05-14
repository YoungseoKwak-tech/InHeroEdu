import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  toPublic,
  type BadgeRow,
  type ProfilePublicRow,
} from "@/lib/trajectory";
import { toMentorPublic, type MentorProfileRow } from "@/lib/mentors";
import { toVerificationPublic, type VerificationRow } from "@/lib/verifications";
import type { ClubMemberRow, ClubRole, ClubRow } from "@/lib/clubs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type UserTier = "member" | "verified_student" | "mentor";

const VERIFIED_BADGE_TYPES = new Set([
  "school_verified",
  "verified_ap5",
  "olympiad_qualifier",
  "research_contributor",
  "founder_circle",
  "mentor_approved",
]);

/**
 * GET /api/me/dashboard
 *   Single round-trip for the personal /me page. Returns the full picture
 *   so the navbar pill click loads instantly.
 */
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();

  // Resolve profile via JS filter (works around the PostgREST .eq quirk).
  const { data: allProfiles } = await supabase.from("profiles_public").select("*");
  const profileRow = ((allProfiles ?? []) as ProfilePublicRow[]).find((p) => p.user_id === user.id);
  if (!profileRow) {
    return NextResponse.json({ ok: true, hasProfile: false });
  }

  const [
    badgesRes,
    mentorRes,
    verifsRes,
    clubMembersRes,
    loungePostsRes,
  ] = await Promise.all([
    supabase.from("badges").select("*").eq("user_id", user.id),
    supabase
      .from("mentor_profiles")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_verified", true)
      .maybeSingle(),
    supabase.from("verifications").select("*"),
    supabase.from("club_members").select("club_id, role, is_featured, joined_at"),
    supabase
      .from("lounge_posts")
      .select("id", { count: "exact", head: true })
      .eq("author_id", user.id)
      .eq("is_deleted", false),
  ]);

  const badgeRows = (badgesRes.data ?? []) as BadgeRow[];
  const trajectory = toPublic(profileRow, badgeRows);

  const mentor = mentorRes.data ? toMentorPublic(mentorRes.data as MentorProfileRow) : null;

  // Tier derivation.
  let tier: UserTier = "member";
  if (mentor) tier = "mentor";
  else if (badgeRows.some((b) => VERIFIED_BADGE_TYPES.has(b.badge_type))) tier = "verified_student";

  // Own verifications.
  const verifications = ((verifsRes.data ?? []) as VerificationRow[])
    .filter((v) => v.user_id === user.id)
    .sort((a, b) => (a.submitted_at < b.submitted_at ? 1 : -1))
    .map(toVerificationPublic);

  // Own club memberships → resolve to club rows.
  const myMemberships = ((clubMembersRes.data ?? []) as Pick<ClubMemberRow, "club_id" | "role" | "is_featured" | "joined_at">[])
    .filter((m) => true); // can't pre-filter user_id since we didn't select it. Use a separate query.

  // Better: re-query with user_id filter (server-side, no quirky .eq risk because admin client + simple match).
  const { data: myMembershipsTyped } = await supabase
    .from("club_members")
    .select("club_id, user_id, role, is_featured, joined_at");
  const mine = ((myMembershipsTyped ?? []) as ClubMemberRow[]).filter((m) => m.user_id === user.id);
  const clubIds = mine.map((m) => m.club_id);
  let myClubs: Array<{
    slug: string; name: string; glyph: string; accent: string;
    role: ClubRole; isFeatured: boolean; joinedAt: string;
  }> = [];
  if (clubIds.length > 0) {
    const { data: clubs } = await supabase
      .from("clubs")
      .select("id, slug, name, glyph, accent")
      .in("id", clubIds);
    const clubMap = new Map<string, Pick<ClubRow, "slug" | "name" | "glyph" | "accent">>();
    for (const c of ((clubs ?? []) as Pick<ClubRow, "id" | "slug" | "name" | "glyph" | "accent">[])) {
      clubMap.set(c.id, { slug: c.slug, name: c.name, glyph: c.glyph, accent: c.accent });
    }
    myClubs = mine
      .map((m) => {
        const c = clubMap.get(m.club_id);
        if (!c) return null;
        return {
          slug: c.slug, name: c.name, glyph: c.glyph, accent: c.accent,
          role: m.role, isFeatured: m.is_featured, joinedAt: m.joined_at,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .sort((a, b) => (a.joinedAt < b.joinedAt ? 1 : -1));
  }

  return NextResponse.json({
    ok: true,
    hasProfile: true,
    tier,
    trajectory,
    mentor,
    verifications,
    clubs: myClubs,
    activity: {
      loungePosts: loungePostsRes.count ?? 0,
      clubsJoined: myClubs.length,
    },
  });
}
