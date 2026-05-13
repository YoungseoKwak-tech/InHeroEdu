import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/lounges — list all active lounges (with post count). */
export async function GET() {
  const supabase = createAdminClient();
  const { data: lounges, error } = await supabase
    .from("lounges")
    .select("id, slug, name, subject_category, description, is_active, created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const loungeIds = (lounges ?? []).map((l) => l.id);
  let postCounts = new Map<string, number>();
  if (loungeIds.length > 0) {
    const { data: posts } = await supabase
      .from("lounge_posts")
      .select("lounge_id")
      .in("lounge_id", loungeIds)
      .eq("is_deleted", false);
    for (const p of posts ?? []) {
      postCounts.set(p.lounge_id, (postCounts.get(p.lounge_id) ?? 0) + 1);
    }
  }

  return NextResponse.json({
    ok: true,
    lounges: (lounges ?? []).map((l) => ({
      slug: l.slug,
      name: l.name,
      subjectCategory: l.subject_category,
      description: l.description,
      postCount: postCounts.get(l.id) ?? 0,
    })),
  });
}
