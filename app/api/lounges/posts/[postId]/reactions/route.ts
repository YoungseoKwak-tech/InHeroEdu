import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { REACTION_KINDS, type ReactionKind } from "@/lib/lounges";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KIND_SET = new Set<string>(REACTION_KINDS);

/** POST /api/lounges/posts/[postId]/reactions { kind } — toggle. */
export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const postId = String(params.postId ?? "").trim();
  if (!postId) return NextResponse.json({ error: "postId required" }, { status: 400 });

  let body: { kind?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const kind = String(body.kind ?? "").trim();
  if (!KIND_SET.has(kind)) {
    return NextResponse.json({ error: "invalid kind" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Post must exist + be visible.
  const { data: post } = await supabase
    .from("lounge_posts")
    .select("id")
    .eq("id", postId)
    .eq("is_deleted", false)
    .maybeSingle();
  if (!post) return NextResponse.json({ error: "post not found" }, { status: 404 });

  // Toggle: if existing → delete, else insert.
  const { data: existing } = await supabase
    .from("lounge_reactions")
    .select("post_id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .eq("kind", kind)
    .maybeSingle();

  let active: boolean;
  if (existing) {
    const { error } = await supabase
      .from("lounge_reactions")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .eq("kind", kind);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    active = false;
  } else {
    const { error } = await supabase
      .from("lounge_reactions")
      .insert({ post_id: postId, user_id: user.id, kind });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    active = true;
  }

  // Updated count + my-state for this kind.
  const { count } = await supabase
    .from("lounge_reactions")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId)
    .eq("kind", kind);

  return NextResponse.json({
    ok: true,
    kind: kind as ReactionKind,
    active,
    count: count ?? 0,
  });
}
