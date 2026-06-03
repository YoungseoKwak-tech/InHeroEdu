import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  hydratePostsWithAuthors,
  type LoungePostRow,
  type LoungeRow,
} from "@/lib/lounges";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/lounges/[slug] — lounge meta + most recent posts (hydrated). */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const supabase = createAdminClient();
  const { slug: rawSlug } = await params;
  const slug = String(rawSlug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const { data: lounge, error: loungeErr } = await supabase
    .from("lounges")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (loungeErr) return NextResponse.json({ error: loungeErr.message }, { status: 500 });
  if (!lounge) return NextResponse.json({ error: "lounge not found" }, { status: 404 });

  const { data: rawPosts, error: postsErr } = await supabase
    .from("lounge_posts")
    .select("*")
    .eq("lounge_id", (lounge as LoungeRow).id)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(50);

  if (postsErr) return NextResponse.json({ error: postsErr.message }, { status: 500 });

  // Look up current user (optional) so we can mark myReactions.
  const user = await getAuthenticatedUser(req);
  const posts = await hydratePostsWithAuthors(
    (rawPosts ?? []) as LoungePostRow[],
    (lounge as LoungeRow).slug,
    user?.id ?? null
  );

  return NextResponse.json({
    ok: true,
    lounge: {
      slug: (lounge as LoungeRow).slug,
      name: (lounge as LoungeRow).name,
      subjectCategory: (lounge as LoungeRow).subject_category,
      description: (lounge as LoungeRow).description,
    },
    posts,
  });
}
