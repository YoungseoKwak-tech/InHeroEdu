import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface BillingKeyRow {
  id: string;
  user_id: string;
  provider: string | null;
  service_id: string;
  subject_id: string | null;
  status: string;
  next_billing_at: string | null;
  last_billed_at: string | null;
  last_order_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

function mapSubscriptionResponse(row: Omit<BillingKeyRow, "user_id">) {
  return {
    id: row.id,
    provider: row.provider ?? "nicepay",
    service_id: row.service_id,
    subject_id: row.subject_id,
    status: row.status,
    next_billing_at: row.next_billing_at,
    last_billed_at: row.last_billed_at,
    last_order_id: row.last_order_id,
    created_at: row.created_at,
    updated_at: row.updated_at,
    access_through: row.next_billing_at,
    can_cancel: row.status.toLowerCase() === "active",
    manage_url: null,
  };
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { id } = await params;
  const subscriptionId = decodeURIComponent(id);
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("nicepay_billing_keys")
    .select("id, user_id, provider, service_id, subject_id, status, next_billing_at, last_billed_at, last_order_id, created_at, updated_at")
    .eq("id", subscriptionId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Subscription not found." }, { status: 404 });
  }

  const billingKey = data as BillingKeyRow;
  if (billingKey.status.toLowerCase() !== "active") {
    return NextResponse.json({
      ok: true,
      subscription: mapSubscriptionResponse(billingKey),
    });
  }

  const cancelledAt = new Date().toISOString();
  const { data: updated, error: updateError } = await supabase
    .from("nicepay_billing_keys")
    .update({
      status: "cancelled",
      last_error: null,
      updated_at: cancelledAt,
    })
    .eq("id", billingKey.id)
    .eq("user_id", user.id)
    .eq("status", "active")
    .select("id, provider, service_id, subject_id, status, next_billing_at, last_billed_at, last_order_id, created_at, updated_at")
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    subscription: mapSubscriptionResponse({
      id: updated.id,
      provider: updated.provider,
      service_id: updated.service_id,
      subject_id: updated.subject_id,
      status: updated.status,
      next_billing_at: updated.next_billing_at,
      last_billed_at: updated.last_billed_at,
      last_order_id: updated.last_order_id,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
    }),
  });
}
