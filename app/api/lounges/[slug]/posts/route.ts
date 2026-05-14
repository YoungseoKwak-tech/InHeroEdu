import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  hydratePostsWithAuthors,
  POST_RATE_LIMIT,
  POST_RATE_WINDOW_MS,
  POST_TYPES,
  type LoungePostRow,
  type PostType,
} from "@/lib/lounges";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST /api/lounges/[slug]/posts { title, body?, postType? } — create. */
export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const slug = String(params.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  let body: { title?: string; body?: string; postType?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const postBody = body.body != null ? String(body.body).trim() : null;
  const postType = (POST_TYPES.includes(body.postType as PostType) ? body.postType : "discussion") as PostType;

  if (title.length < 4 || title.length > 140) {
    return NextResponse.json({ error: "Title must be 4–140 characters." }, { status: 400 });
  }
  if (postBody && postBody.length > 4000) {
    return NextResponse.json({ error: "Body cannot exceed 4000 characters." }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Author must have an InHero trajectory profile.
  const { data: profile } = await supabase
    .from("profiles_public")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!profile) {
    return NextResponse.json(
      { error: "Claim your trajectory handle before posting." },
      { status: 403 }
    );
  }

  // Lounge lookup.
  const { data: lounge } = await supabase
    .from("lounges")
    .select("id, slug")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!lounge) return NextResponse.json({ error: "lounge not found" }, { status: 404 });

  // Rate-limit: count author's posts in the last window.
  const since = new Date(Date.now() - POST_RATE_WINDOW_MS).toISOString();
  const { count: recentCount } = await supabase
    .from("lounge_posts")
    .select("*", { count: "exact", head: true })
    .eq("author_id", user.id)
    .gte("created_at", since);
  if (typeof recentCount === "number" && recentCount >= POST_RATE_LIMIT) {
    return NextResponse.json(
      { error: `Slow down. ${POST_RATE_LIMIT} posts per hour cap.` },
      { status: 429 }
    );
  }

  const { data: inserted, error: insertErr } = await supabase
    .from("lounge_posts")
    .insert({
      lounge_id: lounge.id,
      author_id: user.id,
      title,
      body: postBody && postBody.length > 0 ? postBody : null,
      post_type: postType,
    })
    .select()
    .single();

  if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 });

  const [post] = await hydratePostsWithAuthors(
    [inserted as LoungePostRow],
    lounge.slug,
    user.id
  );

  return NextResponse.json({ ok: true, post });
}
