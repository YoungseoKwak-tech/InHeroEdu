import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  deriveDropSlug,
  hydrateDrops,
  validateDropSlug,
  type DropRow,
} from "@/lib/drops";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/drops?featured=1&limit=20
 *   featured=1 → only the currently-featured drop (newest first if multiple)
 *   Otherwise → newest published drops.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const featuredOnly = url.searchParams.get("featured") === "1";
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") ?? "20", 10) || 20));

  const supabase = createAdminClient();
  let query = supabase
    .from("drops")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (featuredOnly) query = query.eq("is_featured", true);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const drops = await hydrateDrops((data ?? []) as DropRow[]);
  return NextResponse.json({ ok: true, drops });
}

/**
 * POST /api/drops (admin only)
 *   { title, kicker, summary, subjectTag?, body?, linkUrl?, linkLabel?,
 *     accent?, glyph?, curatorHandle?, slug?, isFeatured? }
 */
export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let body: {
    title?: string;
    kicker?: string;
    summary?: string;
    subjectTag?: string | null;
    body?: string | null;
    linkUrl?: string | null;
    linkLabel?: string | null;
    accent?: string;
    glyph?: string;
    curatorHandle?: string;
    slug?: string;
    isFeatured?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const kicker = (body.kicker ?? "THIS WEEK'S DROP").toString().trim().toUpperCase();
  const summary = String(body.summary ?? "").trim();
  if (title.length < 3 || title.length > 180) {
    return NextResponse.json({ error: "Title must be 3–180 chars." }, { status: 400 });
  }
  if (summary.length < 10 || summary.length > 400) {
    return NextResponse.json({ error: "Summary must be 10–400 chars." }, { status: 400 });
  }

  const slugInput = (body.slug && body.slug.trim()) || deriveDropSlug(title);
  const slugCheck = validateDropSlug(slugInput);
  if (!slugCheck.ok) return NextResponse.json({ error: slugCheck.reason }, { status: 400 });

  const accent = /^#[0-9a-fA-F]{6}$/.test(body.accent ?? "") ? body.accent! : "#F4C95D";
  const glyph = (body.glyph ?? "◆").toString().slice(0, 4) || "◆";

  const supabase = createAdminClient();

  // Curator lookup by handle (defaults to admin's user_id if not provided).
  let curatorUserId: string | null = admin.id;
  if (body.curatorHandle && body.curatorHandle.trim()) {
    const { data: profiles } = await supabase
      .from("profiles_public")
      .select("user_id, display_handle");
    const target = ((profiles ?? []) as { user_id: string; display_handle: string }[]).find(
      (p) => p.display_handle.toLowerCase() === body.curatorHandle!.trim().toLowerCase()
    );
    if (!target) {
      return NextResponse.json({ error: `Curator handle "${body.curatorHandle}" not found.` }, { status: 404 });
    }
    curatorUserId = target.user_id;
  }

  // If marking featured, demote any currently-featured drop first.
  if (body.isFeatured === true) {
    await supabase.from("drops").update({ is_featured: false }).eq("is_featured", true);
  }

  const { data: row, error } = await supabase
    .from("drops")
    .insert({
      slug: slugCheck.slug,
      kicker,
      title,
      subject_tag: body.subjectTag ?? null,
      summary,
      body: body.body ?? null,
      link_url: body.linkUrl ?? null,
      link_label: body.linkLabel ?? null,
      curated_by: curatorUserId,
      accent,
      glyph,
      is_featured: body.isFeatured === true,
      is_published: true,
    })
    .select()
    .single();
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Drop slug already taken." }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const [drop] = await hydrateDrops([row as DropRow]);
  return NextResponse.json({ ok: true, drop });
}
