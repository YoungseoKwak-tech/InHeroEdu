import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { hydrateDrops, type DropRow } from "@/lib/drops";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/drops/[slug] — single published drop, hydrated. */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const slug = String(rawSlug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = createAdminClient();
  const { data: row } = await supabase
    .from("drops")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (!row) return NextResponse.json({ error: "drop not found" }, { status: 404 });

  const [drop] = await hydrateDrops([row as DropRow]);
  return NextResponse.json({ ok: true, drop });
}

/** PATCH /api/drops/[slug] (admin) — edit fields. */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const { slug: rawSlug } = await params;
  const slug = String(rawSlug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

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
    isFeatured?: boolean;
    isPublished?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data: existing } = await supabase
    .from("drops")
    .select("id, slug, is_featured")
    .eq("slug", slug)
    .maybeSingle();
  if (!existing) return NextResponse.json({ error: "drop not found" }, { status: 404 });

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.title === "string") {
    const t = body.title.trim();
    if (t.length < 3 || t.length > 180) {
      return NextResponse.json({ error: "Title must be 3–180 chars." }, { status: 400 });
    }
    patch.title = t;
  }
  if (typeof body.kicker === "string") patch.kicker = body.kicker.trim().toUpperCase();
  if (typeof body.summary === "string") {
    const s = body.summary.trim();
    if (s.length < 10 || s.length > 400) {
      return NextResponse.json({ error: "Summary must be 10–400 chars." }, { status: 400 });
    }
    patch.summary = s;
  }
  if (body.subjectTag !== undefined) patch.subject_tag = body.subjectTag;
  if (body.body !== undefined) patch.body = body.body;
  if (body.linkUrl !== undefined) patch.link_url = body.linkUrl;
  if (body.linkLabel !== undefined) patch.link_label = body.linkLabel;
  if (typeof body.accent === "string" && /^#[0-9a-fA-F]{6}$/.test(body.accent)) {
    patch.accent = body.accent;
  }
  if (typeof body.glyph === "string") patch.glyph = body.glyph.slice(0, 4) || "◆";
  if (typeof body.isPublished === "boolean") patch.is_published = body.isPublished;

  // If promoting to featured, demote any other featured drop first.
  if (body.isFeatured === true) {
    await supabase
      .from("drops")
      .update({ is_featured: false })
      .eq("is_featured", true);
    patch.is_featured = true;
  } else if (body.isFeatured === false) {
    patch.is_featured = false;
  }

  const { data: updated, error } = await supabase
    .from("drops")
    .update(patch)
    .eq("id", (existing as { id: string }).id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const [drop] = await hydrateDrops([updated as DropRow]);
  return NextResponse.json({ ok: true, drop });
}

/** DELETE /api/drops/[slug] (admin) — hard delete. */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const { slug: rawSlug } = await params;
  const slug = String(rawSlug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase.from("drops").delete().eq("slug", slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
