import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PatchBody {
  name?: string;
  description?: string | null;
  coverResourceId?: string | null;
  isPrivate?: boolean;
}

// PATCH /api/my-space/collections/[id]
//   Mutate any subset of name / description / cover / privacy.
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => ({}))) as PatchBody;
  const updates: Record<string, unknown> = {};
  if (typeof body.name === "string") {
    const trimmed = body.name.trim();
    if (!trimmed || trimmed.length > 80) {
      return NextResponse.json({ error: "invalid name" }, { status: 400 });
    }
    updates.name = trimmed;
  }
  if (body.description !== undefined) {
    updates.description = body.description?.trim() || null;
  }
  if (body.coverResourceId !== undefined) {
    updates.cover_resource_id = body.coverResourceId;
  }
  if (typeof body.isPrivate === "boolean") {
    updates.is_private = body.isPrivate;
  }
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "nothing to update" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("user_collections")
    .update(updates)
    .eq("id", params.id)
    .eq("user_id", user.id)
    .select("id, name, description, cover_resource_id, is_private, created_at, updated_at")
    .single();
  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "not found" }, { status: 404 });
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
    },
  });
}

// DELETE /api/my-space/collections/[id]
//   FK is ON DELETE SET NULL on user_saved_resources.collection_id,
//   so saves inside this collection fall back to "All Saved".
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("user_collections")
    .delete()
    .eq("id", params.id)
    .eq("user_id", user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
