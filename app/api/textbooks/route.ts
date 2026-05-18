// GET /api/textbooks
//
// Lists every published textbook from the new textbook system
// (textbooks → textbook_units → textbook_chapters). Lightweight —
// just enough fields to render cards on /textbooks: slug, title,
// subtitle, author_name, totals, cover_url.
//
// Anonymous viewers see the same list (textbooks RLS allows
// SELECT for published rows), but we use the admin client here
// for consistency with the other GET endpoints in this group.

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("textbooks")
    .select("slug, title, subtitle, author_name, total_pages, total_chapters, total_units, cover_url")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, textbooks: data ?? [] });
}
