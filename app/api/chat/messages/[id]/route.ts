import { NextRequest, NextResponse } from "next/server";
import { isAdminEmail, requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * DELETE /api/chat/messages/[id]
 *   Soft-deletes a chat message. Authors and admins can delete. If the
 *   message has a mirrored lounge_resources row, hide that resource too.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { id: rawId } = await params;
  const id = String(rawId ?? "").trim();
  if (!id) return NextResponse.json({ error: "message id required" }, { status: 400 });

  const supabase = createAdminClient();
  const { data: message, error: lookupErr } = await supabase
    .from("chat_messages")
    .select("id, author_id, is_deleted")
    .eq("id", id)
    .maybeSingle();

  if (lookupErr) return NextResponse.json({ error: lookupErr.message }, { status: 500 });
  if (!message) return NextResponse.json({ error: "message not found" }, { status: 404 });

  const row = message as { id: string; author_id: string | null; is_deleted: boolean };
  if (row.is_deleted) return NextResponse.json({ ok: true });

  const canDelete = row.author_id === user.id || isAdminEmail(user.email);
  if (!canDelete) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const now = new Date().toISOString();
  const { error: updateErr } = await supabase
    .from("chat_messages")
    .update({ is_deleted: true, edited_at: now })
    .eq("id", id);

  if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 });

  const { error: resourceErr } = await supabase
    .from("lounge_resources")
    .update({ deleted_at: now, deleted_by: user.id })
    .eq("chat_message_id", id)
    .is("deleted_at", null);

  if (resourceErr && !/relation .* does not exist/i.test(resourceErr.message)) {
    return NextResponse.json({ error: resourceErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

