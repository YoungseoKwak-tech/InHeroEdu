import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createAdminClient } from "@/lib/supabase";
import { createPendingOrder, markStoredOrderFailed, markStoredOrderPaid } from "@/lib/orderStore";
import {
  approveNicePayBillingPayment,
  decryptNicePayBillingKey,
  getNicePayAmount,
  getNicePayQuote,
  getNicePayResultMessage,
  getNicePayTid,
  isNicePaySuccess,
} from "@/lib/nicepay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function getNextBillingAt() {
  const days = Number(process.env.NICEPAY_BILLING_PERIOD_DAYS ?? "30");
  const safeDays = Number.isFinite(days) && days > 0 ? days : 30;
  return new Date(Date.now() + safeDays * 24 * 60 * 60 * 1000).toISOString();
}

function assertCronAuthorized(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  if (!expected) return process.env.NODE_ENV !== "production";
  return req.headers.get("authorization") === `Bearer ${expected}`;
}

export async function GET(req: NextRequest) {
  if (!assertCronAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") ?? 25), 50);

  const { data: dueRows, error } = await supabase
    .from("nicepay_billing_keys")
    .select("*")
    .eq("status", "active")
    .lte("next_billing_at", new Date().toISOString())
    .order("next_billing_at", { ascending: true })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let processed = 0;
  let succeeded = 0;
  let failed = 0;

  for (const row of dueRows ?? []) {
    processed += 1;
    const quote = getNicePayQuote(String(row.service_id));
    if (!quote) {
      failed += 1;
      await supabase
        .from("nicepay_billing_keys")
        .update({
          status: "failed",
          last_error: "invalid NICEPAY billing service",
          updated_at: new Date().toISOString(),
        })
        .eq("id", row.id);
      continue;
    }

    const orderId = randomUUID();
    const orderName = quote.orderName;
    let billingKey: string;
    try {
      billingKey = decryptNicePayBillingKey({
        ciphertext: String(row.billing_key_ciphertext),
        iv: String(row.billing_key_iv),
        tag: String(row.billing_key_tag),
      });
    } catch (decryptError) {
      const message =
        decryptError instanceof Error ? decryptError.message : "billing key decrypt failed";
      failed += 1;
      await supabase
        .from("nicepay_billing_keys")
        .update({
          status: "failed",
          fail_count: Number(row.fail_count ?? 0) + 1,
          last_error: message,
          updated_at: new Date().toISOString(),
        })
        .eq("id", row.id);
      continue;
    }

    await createPendingOrder(supabase, {
      id: orderId,
      userId: String(row.user_id),
      serviceId: String(row.service_id),
      orderName,
      amount: quote.chargeAmount,
      currency: quote.chargeCurrency,
      kind: "subscription",
      provider: "nicepay",
      customerEmail: typeof row.customer_email === "string" ? row.customer_email : undefined,
    });

    const { data: billingRun, error: runError } = await supabase
      .from("nicepay_billing_runs")
      .insert({
        billing_key_id: row.id,
        user_id: row.user_id,
        order_id: orderId,
        status: "pending",
        amount: quote.chargeAmount,
        currency: quote.chargeCurrency,
      })
      .select("id")
      .single();

    if (runError || !billingRun) {
      failed += 1;
      await markStoredOrderFailed(
        supabase,
        orderId,
        { billingRunError: runError?.message ?? "billing run insert failed" },
        "nicepay"
      );
      continue;
    }

    let paymentResponse: Record<string, unknown>;
    try {
      paymentResponse = await approveNicePayBillingPayment({
        billingKey,
        orderId,
        amount: quote.chargeAmount,
        goodsName: orderName,
        customerEmail: typeof row.customer_email === "string" ? row.customer_email : null,
      });
    } catch (paymentError) {
      const message = paymentError instanceof Error ? paymentError.message : "billing approval failed";
      failed += 1;
      await Promise.all([
        markStoredOrderFailed(supabase, orderId, { billingApprovalError: message }, "nicepay"),
        supabase
          .from("nicepay_billing_runs")
          .update({
            status: "failed",
            error: message,
            processed_at: new Date().toISOString(),
          })
          .eq("id", billingRun.id),
        supabase
          .from("nicepay_billing_keys")
          .update({
            fail_count: Number(row.fail_count ?? 0) + 1,
            last_error: message,
            updated_at: new Date().toISOString(),
          })
          .eq("id", row.id),
      ]);
      continue;
    }

    const amount = getNicePayAmount(paymentResponse);
    if (!isNicePaySuccess(paymentResponse) || amount !== quote.chargeAmount) {
      const message = amount !== quote.chargeAmount
        ? "billing amount mismatch"
        : getNicePayResultMessage(paymentResponse);
      failed += 1;
      await Promise.all([
        markStoredOrderFailed(supabase, orderId, paymentResponse, "nicepay"),
        supabase
          .from("nicepay_billing_runs")
          .update({
            status: "failed",
            error: message,
            raw_provider_response: paymentResponse,
            processed_at: new Date().toISOString(),
          })
          .eq("id", billingRun.id),
        supabase
          .from("nicepay_billing_keys")
          .update({
            fail_count: Number(row.fail_count ?? 0) + 1,
            last_error: message,
            updated_at: new Date().toISOString(),
          })
          .eq("id", row.id),
      ]);
      continue;
    }

    await markStoredOrderPaid(supabase, orderId, {
      userId: String(row.user_id),
      provider: "nicepay",
      providerOrderId: getNicePayTid(paymentResponse),
      providerSubscriptionId: String(row.id),
      rawResponse: paymentResponse,
    });

    await Promise.all([
      supabase
        .from("nicepay_billing_runs")
        .update({
          status: "paid",
          provider_tid: getNicePayTid(paymentResponse),
          raw_provider_response: paymentResponse,
          processed_at: new Date().toISOString(),
        })
        .eq("id", billingRun.id),
      supabase
        .from("nicepay_billing_keys")
        .update({
          last_billed_at: new Date().toISOString(),
          next_billing_at: getNextBillingAt(),
          last_order_id: orderId,
          fail_count: 0,
          last_error: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", row.id),
    ]);

    succeeded += 1;
  }

  return NextResponse.json({ ok: true, processed, succeeded, failed });
}
