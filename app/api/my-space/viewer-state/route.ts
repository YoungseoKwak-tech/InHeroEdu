import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_IDS = 200;

// GET /api/my-space/viewer-state?ids=<id1>,<id2>,...
//   Batched viewer-state lookup for cards on the library feed.
//   Returns:
//     { saves: { [resourceId]: true },
//       reactions: { [resourceId]: string[] } }
//   so SaveButton / ReactionPicker can hydrate without one fetch per
//   card.
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const url = new URL(req.url);
  const raw = url.searchParams.get("ids") ?? "";
  const ids = Array.from(
    new Set(
      raw
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    )
  ).slice(0, MAX_IDS);

  if (ids.length === 0) {
    return NextResponse.json({ saves: {}, reactions: {} });
  }

  const supabase = createAdminClient();

  const [savesRes, reactionsRes] = await Promise.all([
    supabase
      .from("user_saved_resources")
      .select("resource_id")
      .eq("user_id", user.id)
      .in("resource_id", ids),
    supabase
      .from("user_resource_reactions")
      .select("resource_id, reaction_type")
      .eq("user_id", user.id)
      .in("resource_id", ids),
  ]);

  const saves: Record<string, true> = {};
  for (const row of (savesRes.data ?? []) as { resource_id: string }[]) {
    saves[row.resource_id] = true;
  }

  const reactions: Record<string, string[]> = {};
  for (const row of (reactionsRes.data ?? []) as {
    resource_id: string;
    reaction_type: string;
  }[]) {
    const list = reactions[row.resource_id] ?? [];
    list.push(row.reaction_type);
    reactions[row.resource_id] = list;
  }

  return NextResponse.json(
    { saves, reactions },
    { headers: { "Cache-Control": "private, no-store, must-revalidate" } }
  );
}
