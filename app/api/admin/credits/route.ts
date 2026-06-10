/**
 * GET /api/admin/credits — per-user credit usage for the admin dashboard.
 *
 * Credits have no separate ledger table; each paid unlock is recorded as a key
 * in profiles.credit_unlocks (qa-post:* = 5, parents:question-bank:* = 200,
 * res:/parents/story = 200, …). So that array IS the spend history. We return
 * each (non-test) user's balance + unlock keys; the client decodes keys into
 * human-readable "where/how spent" line items.
 */
import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

type AuthUser = { id: string; email?: string | null; created_at?: string | null };

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export async function GET(req: Request) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const supabase = createAdminClient();

  // All auth users (paginated), minus synthetic diagnostic/test accounts.
  const all: AuthUser[] = [];
  let page = 1;
  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) break;
    all.push(...((data.users ?? []) as AuthUser[]));
    if (!data.nextPage || data.users.length === 0) break;
    page = data.nextPage;
  }
  const users = all.filter((u) => {
    const e = (u.email ?? "").toLowerCase();
    return !!e && !e.endsWith(".test") && !e.includes("@inhero-diag.");
  });

  const ids = users.map((u) => u.id);
  const profiles: Record<string, unknown>[] = [];
  for (const part of chunk(ids, 200)) {
    const { data } = await supabase
      .from("profiles")
      .select("id, name, grade, school, credits, credit_unlocks")
      .in("id", part);
    if (data) profiles.push(...data);
  }
  const pmap = new Map(profiles.map((p) => [String(p.id), p]));

  const rows = users.map((u) => {
    const p = pmap.get(u.id) as { name?: string; grade?: string; school?: string; credits?: number; credit_unlocks?: unknown } | undefined;
    const unlocks = Array.isArray(p?.credit_unlocks) ? (p!.credit_unlocks as string[]) : [];
    return {
      id: u.id,
      email: u.email ?? null,
      name: p?.name ?? null,
      grade: p?.grade ?? null,
      school: p?.school ?? null,
      credits: Number(p?.credits ?? 0),
      unlocks,
      createdAt: u.created_at ?? null,
    };
  });

  // Most active spenders first (then newest).
  rows.sort((a, b) => b.unlocks.length - a.unlocks.length || new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());

  return NextResponse.json({ users: rows });
}
