import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  deriveSlugFromName,
  toClubPublic,
  validateClubSlug,
  type ClubRow,
} from "@/lib/clubs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/clubs — list active clubs with member counts. */
export async function GET() {
  const supabase = createAdminClient();
  const { data: clubs, error } = await supabase
    .from("clubs")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const clubIds = (clubs ?? []).map((c) => c.id);
  const countByClub = new Map<string, number>();
  if (clubIds.length > 0) {
    const { data: members } = await supabase
      .from("club_members")
      .select("club_id")
      .in("club_id", clubIds);
    for (const m of members ?? []) {
      countByClub.set(m.club_id, (countByClub.get(m.club_id) ?? 0) + 1);
    }
  }

  return NextResponse.json({
    ok: true,
    clubs: (clubs ?? []).map((c) =>
      toClubPublic(c as ClubRow, countByClub.get(c.id) ?? 0)
    ),
  });
}

const CREATE_RATE_LIMIT = 3;
const CREATE_RATE_WINDOW_MS = 24 * 60 * 60 * 1000;

/** POST /api/clubs { name, mission, heroBlurb?, glyph?, accent?, slug? } — create. */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: {
    name?: string;
    mission?: string;
    heroBlurb?: string | null;
    glyph?: string;
    accent?: string;
    slug?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const mission = String(body.mission ?? "").trim();
  if (name.length < 3 || name.length > 60) {
    return NextResponse.json({ error: "Name must be 3–60 characters." }, { status: 400 });
  }
  if (mission.length < 10 || mission.length > 400) {
    return NextResponse.json({ error: "Mission must be 10–400 characters." }, { status: 400 });
  }
  const heroBlurb = typeof body.heroBlurb === "string" ? body.heroBlurb.trim() : null;
  if (heroBlurb && heroBlurb.length > 200) {
    return NextResponse.json({ error: "Hero blurb max 200 characters." }, { status: 400 });
  }
  const glyph = (body.glyph ?? "✦").toString().slice(0, 4) || "✦";
  const accent = /^#[0-9a-fA-F]{6}$/.test(body.accent ?? "")
    ? body.accent!
    : "#5eead4";

  const slugInput = (body.slug && body.slug.trim()) || deriveSlugFromName(name);
  const slugCheck = validateClubSlug(slugInput);
  if (!slugCheck.ok) {
    return NextResponse.json({ error: slugCheck.reason }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Require a Trajectory profile.
  const profilesAll = await supabase.from("profiles_public").select("user_id");
  const hasProfile = ((profilesAll.data ?? []) as { user_id: string }[]).some(
    (p) => p.user_id === user.id
  );
  if (!hasProfile) {
    return NextResponse.json(
      { error: "Claim your trajectory handle before founding a club." },
      { status: 403 }
    );
  }

  // Rate limit: how many clubs has this user created in the last 24h?
  const since = new Date(Date.now() - CREATE_RATE_WINDOW_MS).toISOString();
  const { count: recentCount } = await supabase
    .from("clubs")
    .select("*", { count: "exact", head: true })
    .eq("created_by", user.id)
    .gte("created_at", since);
  if (typeof recentCount === "number" && recentCount >= CREATE_RATE_LIMIT) {
    return NextResponse.json(
      { error: `Cap is ${CREATE_RATE_LIMIT} clubs per 24h.` },
      { status: 429 }
    );
  }

  // Check slug uniqueness.
  const { data: existing } = await supabase
    .from("clubs")
    .select("slug")
    .eq("slug", slugCheck.slug)
    .maybeSingle();
  if (existing) {
    return NextResponse.json({ error: "That club slug is taken." }, { status: 409 });
  }

  const { data: club, error: insertErr } = await supabase
    .from("clubs")
    .insert({
      slug: slugCheck.slug,
      name,
      mission,
      hero_blurb: heroBlurb,
      glyph,
      accent,
      sort_order: 200, // user-created sort after curated ones
      is_active: true,
      created_by: user.id,
      is_user_created: true,
    })
    .select()
    .single();
  if (insertErr || !club) {
    return NextResponse.json(
      { error: insertErr?.message ?? "Insert failed" },
      { status: 500 }
    );
  }

  // Make creator the founder.
  const { error: memberErr } = await supabase
    .from("club_members")
    .insert({
      club_id: (club as ClubRow).id,
      user_id: user.id,
      role: "founder",
      is_featured: true,
    });
  if (memberErr) {
    return NextResponse.json({ error: memberErr.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    club: toClubPublic(club as ClubRow, 1),
  });
}
