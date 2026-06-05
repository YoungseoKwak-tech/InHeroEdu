import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface BillingKeyRow {
  id: string;
  user_id: string;
  service_id: string;
  subject_id: string | null;
  status: string;
  next_billing_at: string | null;
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
    .select("id, user_id, service_id, subject_id, status, next_billing_at")
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
  if (billingKey.status !== "active") {
    return NextResponse.json({
      ok: true,
      subscription: {
        id: billingKey.id,
        service_id: billingKey.service_id,
        subject_id: billingKey.subject_id,
        status: billingKey.status,
        access_through: billingKey.next_billing_at,
      },
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
    .select("id, service_id, subject_id, status, next_billing_at")
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    subscription: {
      id: updated.id,
      service_id: updated.service_id,
      subject_id: updated.subject_id,
      status: updated.status,
      access_through: billingKey.next_billing_at,
    },
  });
}
