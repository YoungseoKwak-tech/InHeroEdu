/**
 * Drops — operator-curated content units.
 * One drop is "featured" at a time (the home prominence card).
 * Curator attribution joins profiles_public + mentor_profiles for the
 * "Curated by {handle} · Cornell ECE" line.
 */

import { createAdminClient } from "@/lib/supabase";
import { loadMentorProfiles, type MentorPublic } from "@/lib/mentors";
import type { ProfilePublicRow } from "@/lib/trajectory";

export interface DropRow {
  id: string;
  slug: string;
  kicker: string;
  title: string;
  subject_tag: string | null;
  summary: string;
  body: string | null;
  link_url: string | null;
  link_label: string | null;
  curated_by: string | null;
  accent: string;
  glyph: string;
  is_featured: boolean;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface DropCurator {
  handle: string;
  graduationYear: number | null;
  mentor: MentorPublic | null;
}

export interface DropPublic {
  slug: string;
  kicker: string;
  title: string;
  subjectTag: string | null;
  summary: string;
  body: string | null;
  linkUrl: string | null;
  linkLabel: string | null;
  accent: string;
  glyph: string;
  isFeatured: boolean;
  publishedAt: string;
  curator: DropCurator | null;
}

export function validateDropSlug(raw: string): { ok: true; slug: string } | { ok: false; reason: string } {
  const s = raw.trim().toLowerCase();
  if (!/^[a-z][a-z0-9-]{2,63}$/.test(s)) {
    return { ok: false, reason: "Slug: 3–64 chars, start with a letter, lowercase + digits + hyphens." };
  }
  if (s.includes("--")) return { ok: false, reason: "No consecutive hyphens." };
  return { ok: true, slug: s };
}

export function deriveDropSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 64);
}

export async function hydrateDrops(rows: DropRow[]): Promise<DropPublic[]> {
  if (rows.length === 0) return [];
  const curatorIds = Array.from(
    new Set(rows.map((r) => r.curated_by).filter((x): x is string => !!x))
  );

  const supabase = createAdminClient();
  const [profilesRes, mentorMap] = await Promise.all([
    curatorIds.length === 0
      ? Promise.resolve({ data: [] })
      : supabase
          .from("profiles_public")
          .select("user_id, display_handle, graduation_year")
          .in("user_id", curatorIds),
    loadMentorProfiles(curatorIds),
  ]);

  const profileMap = new Map<string, Pick<ProfilePublicRow, "display_handle" | "graduation_year">>(
    ((profilesRes.data ?? []) as Pick<ProfilePublicRow, "user_id" | "display_handle" | "graduation_year">[]).map(
      (p) => [p.user_id, { display_handle: p.display_handle, graduation_year: p.graduation_year }]
    )
  );

  return rows.map((r) => {
    let curator: DropCurator | null = null;
    if (r.curated_by) {
      const p = profileMap.get(r.curated_by);
      if (p) {
        curator = {
          handle: p.display_handle,
          graduationYear: p.graduation_year,
          mentor: mentorMap.get(r.curated_by) ?? null,
        };
      }
    }
    return {
      slug: r.slug,
      kicker: r.kicker,
      title: r.title,
      subjectTag: r.subject_tag,
      summary: r.summary,
      body: r.body,
      linkUrl: r.link_url,
      linkLabel: r.link_label,
      accent: r.accent,
      glyph: r.glyph,
      isFeatured: r.is_featured,
      publishedAt: r.published_at,
      curator,
    };
  });
}
