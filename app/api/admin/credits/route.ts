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
import { parseCreditServiceId } from "@/lib/creditPackages";
import { auditCredits } from "@/lib/unlockCosts";

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

  // Real payments (credit top-ups / purchases) live in the `orders` table with
  // paid_at timestamps — surface those so admins see WHEN each user paid.
  type Payment = { paidAt: string | null; amount: number; currency: string; serviceId: string; orderName: string | null; provider: string | null };
  const paymentsByUser = new Map<string, Payment[]>();
  for (const part of chunk(ids, 200)) {
    const { data } = await supabase
      .from("orders")
      .select("user_id, service_id, order_name, amount, amount_krw, currency, status, paid_at, created_at, provider")
      .eq("status", "paid")
      .in("user_id", part);
    for (const o of (data ?? []) as Record<string, unknown>[]) {
      const uid = String(o.user_id ?? "");
      if (!uid) continue;
      const list = paymentsByUser.get(uid) ?? [];
      list.push({
        paidAt: (typeof o.paid_at === "string" ? o.paid_at : null) ?? (typeof o.created_at === "string" ? o.created_at : null),
        amount: Number(o.amount ?? o.amount_krw ?? 0),
        currency: typeof o.currency === "string" ? o.currency : "KRW",
        serviceId: typeof o.service_id === "string" ? o.service_id : "",
        orderName: typeof o.order_name === "string" ? o.order_name : null,
        provider: typeof o.provider === "string" ? o.provider : null,
      });
      paymentsByUser.set(uid, list);
    }
  }
  for (const list of paymentsByUser.values()) {
    list.sort((a, b) => new Date(b.paidAt ?? 0).getTime() - new Date(a.paidAt ?? 0).getTime());
  }

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
      payments: paymentsByUser.get(u.id) ?? [],
      createdAt: u.created_at ?? null,
    };
  });

  // Audit each account: welcome + confirmed paid credits vs implied spend +
  // balance. An anomaly = unlocked/holds more than legitimately funded, i.e.
  // credits leaked in without a real payment (Christina-style). This lets the
  // dashboard split 결제완료 / 무료지급(welcome) / 비정상(unpaid) unlocks.
  const audited = rows.map((r) => {
    const paidCredits = r.payments.reduce((sum, pay) => {
      const pkg = parseCreditServiceId(pay.serviceId);
      return sum + (pkg?.credits ?? 0);
    }, 0);
    const audit = auditCredits({ balance: r.credits, unlocks: r.unlocks, paidCredits });
    return { ...r, paidCredits, audit };
  });

  // Anomalies first, then most active spenders/payers, then newest.
  audited.sort((a, b) =>
    Number(b.audit.anomaly) - Number(a.audit.anomaly) ||
    (b.unlocks.length + b.payments.length) - (a.unlocks.length + a.payments.length) ||
    new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
  );

  const anomalyCount = audited.filter((r) => r.audit.anomaly).length;
  return NextResponse.json({ users: audited, anomalyCount });
}
