/**
 * Mentors — verified Ivy/program mentors who anchor the ecosystem.
 * The PRESENCE of a row in mentor_profiles is the verified-mentor signal.
 */

import { createAdminClient } from "@/lib/supabase";

export interface MentorProfileRow {
  user_id: string;
  university: string;
  university_role: string;
  specialties: string[];
  intro_blurb: string;
  avatar_url: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface MentorPublic {
  university: string;
  universityRole: string;
  specialties: string[];
  introBlurb: string;
  avatarUrl: string | null;
}

export function toMentorPublic(row: MentorProfileRow): MentorPublic {
  return {
    university: row.university,
    universityRole: row.university_role,
    specialties: row.specialties,
    introBlurb: row.intro_blurb,
    avatarUrl: row.avatar_url,
  };
}

/** Fetch mentor profiles for a set of user IDs. Returns Map<user_id, MentorPublic>. */
export async function loadMentorProfiles(
  userIds: string[]
): Promise<Map<string, MentorPublic>> {
  if (userIds.length === 0) return new Map();
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("mentor_profiles")
    .select("*")
    .eq("is_verified", true)
    .in("user_id", userIds);
  const map = new Map<string, MentorPublic>();
  for (const row of (data ?? []) as MentorProfileRow[]) {
    map.set(row.user_id, toMentorPublic(row));
  }
  return map;
}

/** Single-user lookup by handle. */
export async function loadMentorByHandle(handle: string): Promise<MentorPublic | null> {
  const supabase = createAdminClient();
  const { data: profile } = await supabase
    .from("profiles_public")
    .select("user_id")
    .ilike("display_handle", handle)
    .maybeSingle();
  if (!profile) return null;
  const { data } = await supabase
    .from("mentor_profiles")
    .select("*")
    .eq("user_id", (profile as { user_id: string }).user_id)
    .eq("is_verified", true)
    .maybeSingle();
  return data ? toMentorPublic(data as MentorProfileRow) : null;
}
