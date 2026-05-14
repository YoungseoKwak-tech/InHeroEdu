import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/dm/init { handle }
 *   Resolve recipient by handle, find or create a thread, return thread id.
 *   Threads are unique on the ORDERED pair (smaller_id, larger_id) so we
 *   sort the two participant UUIDs before lookup/insert.
 */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: { handle?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "invalid JSON" }, { status: 400 }); }

  const handle = String(body.handle ?? "").trim();
  if (!handle) return NextResponse.json({ error: "handle required" }, { status: 400 });

  const supabase = createAdminClient();

  // Resolve handle → user_id.
  const { data: allProfiles } = await supabase
    .from("profiles_public")
    .select("user_id, display_handle");
  const target = ((allProfiles ?? []) as { user_id: string; display_handle: string }[]).find(
    (p) => p.display_handle.toLowerCase() === handle.toLowerCase()
  );
  if (!target) {
    return NextResponse.json({ error: `No trajectory profile with handle "${handle}".` }, { status: 404 });
  }
  if (target.user_id === user.id) {
    return NextResponse.json({ error: "You can't DM yourself." }, { status: 400 });
  }
  const me = (allProfiles ?? []).find((p) => p.user_id === user.id);
  if (!me) {
    return NextResponse.json({ error: "Claim your trajectory handle before sending DMs." }, { status: 403 });
  }

  // Sort the pair so dm_threads is deterministic.
  const [userA, userB] = user.id < target.user_id
    ? [user.id, target.user_id]
    : [target.user_id, user.id];

  // Find or create. JS-side filter to dodge the PostgREST .eq quirk.
  const { data: allThreads } = await supabase
    .from("dm_threads")
    .select("id, user_a, user_b");
  const found = ((allThreads ?? []) as { id: string; user_a: string; user_b: string }[]).find(
    (t) => t.user_a === userA && t.user_b === userB
  );

  let threadId: string;
  if (found) {
    threadId = found.id;
  } else {
    const { data: inserted, error } = await supabase
      .from("dm_threads")
      .insert({ user_a: userA, user_b: userB })
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    threadId = (inserted as { id: string }).id;
  }

  return NextResponse.json({
    ok: true,
    threadId,
    other: { handle: target.display_handle },
  });
}
