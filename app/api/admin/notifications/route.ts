import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Row = {
  id: string;
  source: string;
  context_type: string | null;
  context_id: string | null;
  context_slug: string | null;
  context_name: string | null;
  source_id: string | null;
  preview_author_handle: string | null;
  preview_text: string | null;
  is_read: boolean;
  created_at: string;
};

function shape(row: Row) {
  return {
    id: row.id,
    source: row.source,
    contextType: row.context_type,
    contextSlug: row.context_slug,
    contextName: row.context_name,
    sourceId: row.source_id,
    authorHandle: row.preview_author_handle,
    preview: row.preview_text,
    isRead: row.is_read,
    createdAt: row.created_at,
  };
}

export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("admin_notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data ?? []) as Row[];
  const unreadCount = rows.filter((r) => !r.is_read).length;
  return NextResponse.json({
    ok: true,
    unreadCount,
    items: rows.map(shape),
  });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const body = (await req.json().catch(() => ({}))) as {
    ids?: string[];
    all?: boolean;
  };

  const supabase = createAdminClient();

  if (body.all) {
    const { error } = await supabase
      .from("admin_notifications")
      .update({ is_read: true })
      .eq("is_read", false);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  const ids = Array.isArray(body.ids) ? body.ids.filter((s) => typeof s === "string") : [];
  if (ids.length === 0) {
    return NextResponse.json({ error: "no ids" }, { status: 400 });
  }

  const { error } = await supabase
    .from("admin_notifications")
    .update({ is_read: true })
    .in("id", ids);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
