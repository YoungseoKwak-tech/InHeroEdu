import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  hydrateCommentsWithAuthors,
  hydratePostsWithAuthors,
  isAdminEmail,
  type LoungeCommentRow,
  type LoungePostRow,
} from "@/lib/lounges";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/lounges/posts/[postId] — post + comments (hydrated). */
export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
  const postId = String(params.postId ?? "").trim();
  if (!postId) return NextResponse.json({ error: "postId required" }, { status: 400 });

  const supabase = createAdminClient();
  const { data: postRow, error: postErr } = await supabase
    .from("lounge_posts")
    .select("*")
    .eq("id", postId)
    .eq("is_deleted", false)
    .maybeSingle();
  if (postErr) return NextResponse.json({ error: postErr.message }, { status: 500 });
  if (!postRow) return NextResponse.json({ error: "post not found" }, { status: 404 });

  const { data: lounge } = await supabase
    .from("lounges")
    .select("slug")
    .eq("id", (postRow as LoungePostRow).lounge_id)
    .maybeSingle();
  if (!lounge) return NextResponse.json({ error: "lounge not found" }, { status: 404 });

  const user = await getAuthenticatedUser(req);
  const [post] = await hydratePostsWithAuthors(
    [postRow as LoungePostRow],
    lounge.slug,
    user?.id ?? null
  );

  const { data: commentRows } = await supabase
    .from("lounge_post_comments")
    .select("*")
    .eq("post_id", postId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: true });

  const comments = await hydrateCommentsWithAuthors(
    (commentRows ?? []) as LoungeCommentRow[]
  );

  return NextResponse.json({ ok: true, post, comments });
}

/** DELETE /api/lounges/posts/[postId] — author or admin soft-deletes. */
export async function DELETE(req: NextRequest, { params }: { params: { postId: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;
  const postId = String(params.postId ?? "").trim();
  if (!postId) return NextResponse.json({ error: "postId required" }, { status: 400 });

  const supabase = createAdminClient();
  const { data: post } = await supabase
    .from("lounge_posts")
    .select("id, author_id")
    .eq("id", postId)
    .maybeSingle();
  if (!post) return NextResponse.json({ error: "post not found" }, { status: 404 });

  const canDelete = post.author_id === user.id || isAdminEmail(user.email);
  if (!canDelete) return NextResponse.json({ error: "not allowed" }, { status: 403 });

  const { error } = await supabase
    .from("lounge_posts")
    .update({ is_deleted: true, updated_at: new Date().toISOString() })
    .eq("id", postId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
