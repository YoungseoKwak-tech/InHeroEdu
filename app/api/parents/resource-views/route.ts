/**
 * Real view counts for the 추천 자료 board.
 *   GET  → { views: { [routeKey]: number } }   absolute counts from `resource_views`
 *   POST { key, baseline } → increments that resource's count (seeding from the
 *         code baseline the first time a row is created), returns the new count.
 *
 * Gracefully no-ops (empty / ok:false) if the `resource_views` table doesn't
 * exist yet, so the board still renders the in-code baseline numbers.
 *
 * One-time table (run in Supabase SQL editor to activate real counts):
 *   create table if not exists resource_views (
 *     key text primary key,
 *     views integer not null default 0,
 *     updated_at timestamptz not null default now()
 *   );
 *   alter table resource_views enable row level security;  -- service role bypasses
 */
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("resource_views").select("key, views");
    if (error) return NextResponse.json({ views: {} });
    const views: Record<string, number> = {};
    for (const row of data ?? []) views[String(row.key)] = Number(row.views) || 0;
    return NextResponse.json({ views });
  } catch {
    return NextResponse.json({ views: {} });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { key, baseline } = await req.json();
    if (typeof key !== "string" || !key) {
      return NextResponse.json({ error: "key required" }, { status: 400 });
    }
    const base = Number.isFinite(baseline) ? Math.max(0, Math.floor(baseline)) : 0;
    const supabase = createAdminClient();

    const { data: existing, error: selErr } = await supabase
      .from("resource_views").select("views").eq("key", key).maybeSingle();
    if (selErr) return NextResponse.json({ ok: false }); // table missing → graceful

    if (existing) {
      const next = (Number(existing.views) || 0) + 1;
      await supabase.from("resource_views")
        .update({ views: next, updated_at: new Date().toISOString() }).eq("key", key);
      return NextResponse.json({ ok: true, views: next });
    }
    const seeded = base + 1;
    await supabase.from("resource_views").insert({ key, views: seeded });
    return NextResponse.json({ ok: true, views: seeded });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
