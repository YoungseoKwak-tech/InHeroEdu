import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CreateBody {
  name?: string;
  description?: string;
  coverResourceId?: string;
}

// GET /api/my-space/collections
//   Returns the viewer's collections plus aggregate counts so the
//   Saved tab can render chips ("All Saved · 24", "AP Bio · 7") in
//   one round trip.
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();

  const [collectionsRes, savesRes] = await Promise.all([
    supabase
      .from("user_collections")
      .select("id, name, description, cover_resource_id, is_private, created_at, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false }),
    supabase
      .from("user_saved_resources")
      .select("collection_id")
      .eq("user_id", user.id),
  ]);

  if (collectionsRes.error) {
    return NextResponse.json({ error: collectionsRes.error.message }, { status: 500 });
  }
  if (savesRes.error) {
    return NextResponse.json({ error: savesRes.error.message }, { status: 500 });
  }

  const counts: Record<string, number> = {};
  let totalSaved = 0;
  let unfiledCount = 0;
  for (const row of (savesRes.data ?? []) as { collection_id: string | null }[]) {
    totalSaved += 1;
    if (row.collection_id === null) unfiledCount += 1;
    else counts[row.collection_id] = (counts[row.collection_id] ?? 0) + 1;
  }

  const collections = ((collectionsRes.data ?? []) as Array<{
    id: string;
    name: string;
    description: string | null;
    cover_resource_id: string | null;
    is_private: boolean;
    created_at: string;
    updated_at: string;
  }>).map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description,
    coverResourceId: c.cover_resource_id,
    isPrivate: c.is_private,
    createdAt: c.created_at,
    updatedAt: c.updated_at,
    count: counts[c.id] ?? 0,
  }));

  return NextResponse.json({ collections, counts, totalSaved, unfiledCount });
}

// POST /api/my-space/collections
//   body: { name, description?, coverResourceId? }
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => ({}))) as CreateBody;
  const name = body.name?.trim();
  if (!name || name.length > 80) {
    return NextResponse.json({ error: "invalid name" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("user_collections")
    .insert({
      user_id: user.id,
      name,
      description: body.description?.trim() || null,
      cover_resource_id: body.coverResourceId ?? null,
    })
    .select("id, name, description, cover_resource_id, is_private, created_at, updated_at")
    .single();
  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "insert failed" }, { status: 500 });
  }

  return NextResponse.json({
    collection: {
      id: data.id,
      name: data.name,
      description: data.description,
      coverResourceId: data.cover_resource_id,
      isPrivate: data.is_private,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      count: 0,
    },
  });
}
