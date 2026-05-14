/**
 * Activity Stream — the live feed spine.
 *
 * Every meaningful action in the platform emits an activity_event row.
 * The feed reads from this table.
 */

import { createAdminClient } from "@/lib/supabase";
import { getBadgeMeta, type BadgeMeta, type ProfilePublicRow } from "@/lib/trajectory";

export const ACTIVITY_KINDS = [
  "profile_claimed",
  "lounge_post",
  "lounge_comment",
  "club_founded",
  "club_joined",
  "club_role_assigned",
  "club_note_added",
  "badge_earned",
] as const;
export type ActivityKind = (typeof ACTIVITY_KINDS)[number];

export interface ActivityEventRow {
  id: string;
  kind: ActivityKind;
  actor_user_id: string | null;
  subject_type: string | null;
  subject_id: string | null;
  payload: Record<string, unknown>;
  created_at: string;
}

export interface ActivityEventPublic {
  id: string;
  kind: ActivityKind;
  createdAt: string;
  actor: {
    handle: string;
    graduationYear: number | null;
  } | null;
  // Rendering-friendly fields filled per-kind.
  verb: string;
  targetLabel: string | null;
  targetHref: string | null;
  detail: string | null;
  accent: string;
  glyph: string;
  badgeMeta?: BadgeMeta | null;
}

/**
 * Best-effort fire-and-forget emit. Logs but never throws — emitting
 * should not break the caller if the table isn't yet provisioned.
 */
export async function emitActivity(
  kind: ActivityKind,
  args: {
    actorUserId: string | null;
    subjectType?: string | null;
    subjectId?: string | null;
    payload?: Record<string, unknown>;
  }
): Promise<void> {
  try {
    const supabase = createAdminClient();
    await supabase.from("activity_events").insert({
      kind,
      actor_user_id: args.actorUserId,
      subject_type: args.subjectType ?? null,
      subject_id: args.subjectId ?? null,
      payload: args.payload ?? {},
    });
  } catch (err) {
    console.warn("[activity.emit] failed", { kind, err: err instanceof Error ? err.message : String(err) });
  }
}

interface RenderInput {
  payload: Record<string, unknown>;
  subjectType: string | null;
  subjectId: string | null;
}

function asString(v: unknown): string | null {
  return typeof v === "string" && v.length > 0 ? v : null;
}

function renderEvent(kind: ActivityKind, i: RenderInput): {
  verb: string;
  targetLabel: string | null;
  targetHref: string | null;
  detail: string | null;
  accent: string;
  glyph: string;
  badgeMeta?: BadgeMeta | null;
} {
  const p = i.payload;
  switch (kind) {
    case "profile_claimed":
      return {
        verb: "claimed their trajectory",
        targetLabel: null,
        targetHref: null,
        detail: asString(p.handle) ? `${asString(p.handle)} just entered the cohort.` : null,
        accent: "#5eead4",
        glyph: "✦",
      };
    case "lounge_post": {
      const slug = asString(p.loungeSlug);
      const title = asString(p.title);
      const postType = asString(p.postType) ?? "discussion";
      const verbs: Record<string, string> = {
        discussion: "posted a discussion in",
        question: "asked a question in",
        resource_share: "dropped a resource in",
        open_call: "opened a call in",
      };
      return {
        verb: verbs[postType] ?? "posted in",
        targetLabel: asString(p.loungeName) ?? slug,
        targetHref: slug ? `/lounges/${slug}` : null,
        detail: title,
        accent: postType === "question" ? "#F4C95D" : postType === "resource_share" ? "#A99CFF" : "#5eead4",
        glyph: postType === "question" ? "?" : postType === "resource_share" ? "◆" : "▲",
      };
    }
    case "lounge_comment":
      return {
        verb: "replied in",
        targetLabel: asString(p.loungeName) ?? asString(p.loungeSlug),
        targetHref: asString(p.loungeSlug) ? `/lounges/${asString(p.loungeSlug)}` : null,
        detail: asString(p.snippet),
        accent: "#94a3b8",
        glyph: "↳",
      };
    case "club_founded":
      return {
        verb: "founded",
        targetLabel: asString(p.clubName) ?? asString(p.clubSlug),
        targetHref: asString(p.clubSlug) ? `/clubs/${asString(p.clubSlug)}` : null,
        detail: asString(p.mission),
        accent: asString(p.accent) ?? "#F4C95D",
        glyph: asString(p.glyph) ?? "◆",
      };
    case "club_joined":
      return {
        verb: "took a seat in",
        targetLabel: asString(p.clubName) ?? asString(p.clubSlug),
        targetHref: asString(p.clubSlug) ? `/clubs/${asString(p.clubSlug)}` : null,
        detail: null,
        accent: asString(p.accent) ?? "#5eead4",
        glyph: asString(p.glyph) ?? "✦",
      };
    case "club_role_assigned":
      return {
        verb: `was named ${asString(p.role) ?? "member"} of`,
        targetLabel: asString(p.clubName) ?? asString(p.clubSlug),
        targetHref: asString(p.clubSlug) ? `/clubs/${asString(p.clubSlug)}` : null,
        detail: null,
        accent: asString(p.accent) ?? "#F4C95D",
        glyph: "⌖",
      };
    case "club_note_added":
      return {
        verb: "logged a meeting for",
        targetLabel: asString(p.clubName) ?? asString(p.clubSlug),
        targetHref: asString(p.clubSlug) ? `/clubs/${asString(p.clubSlug)}` : null,
        detail: asString(p.title),
        accent: asString(p.accent) ?? "#5eead4",
        glyph: "✎",
      };
    case "badge_earned": {
      const badgeType = asString(p.badgeType) ?? "";
      const meta = badgeType ? getBadgeMeta(badgeType) : null;
      return {
        verb: "earned",
        targetLabel: meta?.label ?? "a badge",
        targetHref: null,
        detail: meta?.blurb ?? null,
        accent: meta?.accent ?? "#F4C95D",
        glyph: meta?.glyph ?? "✦",
        badgeMeta: meta,
      };
    }
  }
}

export async function hydrateActivityEvents(
  rows: ActivityEventRow[]
): Promise<ActivityEventPublic[]> {
  if (rows.length === 0) return [];
  const supabase = createAdminClient();
  const actorIds = Array.from(new Set(rows.map((r) => r.actor_user_id).filter((x): x is string => !!x)));

  let actorMap = new Map<string, { handle: string; graduationYear: number | null }>();
  if (actorIds.length > 0) {
    const { data } = await supabase
      .from("profiles_public")
      .select("user_id, display_handle, graduation_year")
      .in("user_id", actorIds);
    actorMap = new Map<string, { handle: string; graduationYear: number | null }>(
      ((data ?? []) as Pick<ProfilePublicRow, "user_id" | "display_handle" | "graduation_year">[]).map((p) => [
        p.user_id,
        { handle: p.display_handle, graduationYear: p.graduation_year },
      ])
    );
  }

  return rows.map((r) => {
    const actor = r.actor_user_id ? actorMap.get(r.actor_user_id) ?? null : null;
    const render = renderEvent(r.kind, {
      payload: r.payload ?? {},
      subjectType: r.subject_type,
      subjectId: r.subject_id,
    });
    return {
      id: r.id,
      kind: r.kind,
      createdAt: r.created_at,
      actor,
      ...render,
    };
  });
}
