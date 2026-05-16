import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RETENTION_DAYS = 30;

/**
 * GET /api/cron/cleanup-deleted-resources
 *
 * Vercel cron handler — fires daily at 03:00 UTC via vercel.json. Hard-
 * deletes lounge_resources rows that were soft-deleted (deleted_at set)
 * more than RETENTION_DAYS ago. The row's preview PNGs (and the
 * underlying attachment in chat-attachments) are not cleaned up here;
 * that's a separate sweep once we track storage paths reliably.
 *
 * Vercel signs cron invocations with the CRON_SECRET env var if set —
 * we verify via the Authorization header so a public hit can't trigger
 * a hard delete. In production set CRON_SECRET in the Vercel dashboard.
 */
export async function GET(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  if (expected) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${expected}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const supabase = createAdminClient();
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("lounge_resources")
    .delete()
    .not("deleted_at", "is", null)
    .lt("deleted_at", cutoff)
    .select("id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const count = (data ?? []).length;
  return NextResponse.json({
    ok: true,
    cutoff,
    retentionDays: RETENTION_DAYS,
    hardDeleted: count,
  });
}
