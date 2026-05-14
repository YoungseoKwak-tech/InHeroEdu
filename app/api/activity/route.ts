import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import {
  hydrateActivityEvents,
  type ActivityEventRow,
} from "@/lib/activity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/activity?limit=50&before=ISO
 *   Returns recent activity events, newest first, hydrated for display.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") ?? "50", 10) || 50));
  const before = url.searchParams.get("before");

  const supabase = createAdminClient();
  let query = supabase
    .from("activity_events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (before) {
    const d = new Date(before);
    if (!Number.isNaN(d.getTime())) {
      query = query.lt("created_at", d.toISOString());
    }
  }
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const events = await hydrateActivityEvents((data ?? []) as ActivityEventRow[]);
  return NextResponse.json({ ok: true, events });
}
