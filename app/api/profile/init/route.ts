import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { emitActivity } from "@/lib/activity";
import {
  AMBITION_TAGS,
  FOUNDING_COHORT_CAP,
  GRAD_YEARS,
  toPublic,
  validateHandle,
  type BadgeRow,
  type ProfilePublicRow,
} from "@/lib/trajectory";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TAG_IDS = new Set<string>(AMBITION_TAGS.map((t) => t.id));
const YEAR_SET = new Set(GRAD_YEARS);

/**
 * POST /api/profile/init { handle, graduationYear, ambitionTags }
 * Creates (or updates if not yet finalized) the user's trajectory
 * profile. Grants founding_cohort badge if total profile count is still
 * under FOUNDING_COHORT_CAP. Idempotent: re-submitting updates the row.
 */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: { handle?: string; graduationYear?: number; ambitionTags?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  // Validate handle
  const v = validateHandle(String(body.handle ?? ""));
  if (!v.ok) return NextResponse.json({ error: v.reason }, { status: 400 });

  // Validate year
  const year = typeof body.graduationYear === "number" ? body.graduationYear : NaN;
  if (!YEAR_SET.has(year)) {
    return NextResponse.json({ error: "Pick a valid graduation year." }, { status: 400 });
  }

  // Validate tags — 1..3 from preset list
  const rawTags = Array.isArray(body.ambitionTags) ? body.ambitionTags : [];
  const tags = rawTags
    .map((t) => String(t).trim())
    .filter((t, i, arr) => TAG_IDS.has(t) && arr.indexOf(t) === i)
    .slice(0, 3);
  if (tags.length === 0) {
    return NextResponse.json({ error: "Pick at least one ambition tag." }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Re-check handle availability at the moment of insert (race-safe via the
  // case-insensitive unique index — we'll let the DB enforce on conflict).
  const { data: clash } = await supabase
    .from("profiles_public")
    .select("user_id")
    .ilike("display_handle", v.handle)
    .maybeSingle();
  if (clash && clash.user_id !== user.id) {
    return NextResponse.json({ error: "Handle already taken." }, { status: 409 });
  }

  const now = new Date().toISOString();
  const { data: row, error } = await supabase
    .from("profiles_public")
    .upsert(
      {
        user_id: user.id,
        display_handle: v.handle,
        graduation_year: year,
        ambition_tags: tags,
        updated_at: now,
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) {
    // Unique violation on handle index
    if (error.code === "23505") {
      return NextResponse.json({ error: "Handle already taken." }, { status: 409 });
    }
    console.error("[/api/profile/init] upsert error", { userId: user.id, code: error.code, message: error.message });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  console.log("[/api/profile/init] upserted profile", { userId: user.id, handle: v.handle, rowUserId: (row as ProfilePublicRow | null)?.user_id });

  // Immediate read-back via the same admin client — proves the row truly
  // committed (vs. PostgREST returning the would-be row without persisting).
  const { data: verifyRow, error: verifyErr } = await supabase
    .from("profiles_public")
    .select("user_id, display_handle")
    .eq("user_id", user.id)
    .maybeSingle();
  console.log("[/api/profile/init] immediate verify", {
    userId: user.id,
    found: !!verifyRow,
    verifyHandle: (verifyRow as { display_handle?: string } | null)?.display_handle,
    verifyError: verifyErr?.message ?? null,
  });

  // Detect whether this was a fresh row vs. an update (compare timestamps).
  const isFirstClaim =
    !verifyRow ||
    new Date((row as ProfilePublicRow).created_at).getTime() >=
      new Date((row as ProfilePublicRow).updated_at).getTime() - 1000;

  // Award founding_cohort if we're still under the cap.
  const { count } = await supabase
    .from("profiles_public")
    .select("*", { count: "exact", head: true });
  let awardedFoundingCohort = false;
  if (typeof count === "number" && count <= FOUNDING_COHORT_CAP) {
    const { data: priorBadges } = await supabase
      .from("badges")
      .select("badge_type")
      .eq("user_id", user.id);
    const already = ((priorBadges ?? []) as { badge_type: string }[]).some(
      (b) => b.badge_type === "founding_cohort"
    );
    await supabase
      .from("badges")
      .upsert(
        { user_id: user.id, badge_type: "founding_cohort" },
        { onConflict: "user_id,badge_type" }
      );
    if (!already) awardedFoundingCohort = true;
  }

  // Activity emits: profile_claimed (first time only) + badge_earned.
  if (isFirstClaim) {
    void emitActivity("profile_claimed", {
      actorUserId: user.id,
      subjectType: "profile",
      subjectId: user.id,
      payload: { handle: v.handle, graduationYear: year },
    });
  }
  if (awardedFoundingCohort) {
    void emitActivity("badge_earned", {
      actorUserId: user.id,
      subjectType: "badge",
      subjectId: "founding_cohort",
      payload: { badgeType: "founding_cohort", handle: v.handle },
    });
  }

  const { data: badges } = await supabase
    .from("badges")
    .select("*")
    .eq("user_id", user.id);

  return NextResponse.json({
    ok: true,
    profile: toPublic(row as ProfilePublicRow, (badges ?? []) as BadgeRow[]),
  });
}
