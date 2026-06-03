import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  hydrateCommentsWithAuthors,
  type LoungeCommentRow,
} from "@/lib/lounges";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST /api/lounges/posts/[postId]/comments { body } — add a reply. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { postId: rawPostId } = await params;
  const postId = String(rawPostId ?? "").trim();
  if (!postId) return NextResponse.json({ error: "postId required" }, { status: 400 });

  let body: { body?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const text = String(body.body ?? "").trim();
  if (text.length < 1 || text.length > 2000) {
    return NextResponse.json({ error: "Reply must be 1–2000 characters." }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Require a trajectory profile.
  const { data: profile } = await supabase
    .from("profiles_public")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!profile) {
    return NextResponse.json(
      { error: "Claim your trajectory handle before replying." },
      { status: 403 }
    );
  }

  // Verify post exists and isn't deleted.
  const { data: post } = await supabase
    .from("lounge_posts")
    .select("id")
    .eq("id", postId)
    .eq("is_deleted", false)
    .maybeSingle();
  if (!post) return NextResponse.json({ error: "post not found" }, { status: 404 });

  const { data: inserted, error } = await supabase
    .from("lounge_post_comments")
    .insert({ post_id: postId, author_id: user.id, body: text })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const [comment] = await hydrateCommentsWithAuthors([inserted as LoungeCommentRow]);
  return NextResponse.json({ ok: true, comment });
}
