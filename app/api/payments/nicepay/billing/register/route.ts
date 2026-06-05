import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { createPendingOrder, markStoredOrderFailed, markStoredOrderPaid } from "@/lib/orderStore";
import { courses } from "@/lib/data/courses";
import {
  bindCourseAccessServiceId,
  buildCourseBoundOrderName,
} from "@/lib/course-access";
import {
  approveNicePayBillingPayment,
  assertRequestedNicePayPrice,
  encryptNicePayBillingKey,
  getNicePayAmount,
  getNicePayBillingKeyFromResponse,
  getNicePayResultMessage,
  getNicePayTid,
  isNicePaySuccess,
  registerNicePayBillingKey,
} from "@/lib/nicepay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getNextBillingAt() {
  const days = Number(process.env.NICEPAY_BILLING_PERIOD_DAYS ?? "30");
  const safeDays = Number.isFinite(days) && days > 0 ? days : 30;
  return new Date(Date.now() + safeDays * 24 * 60 * 60 * 1000).toISOString();
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => ({}))) as {
    serviceId?: string;
    subjectId?: string;
    amount?: number;
    encData?: string;
    billingKey?: string;
    customerName?: string;
    customerEmail?: string;
  };

  if (!body.serviceId) {
    return NextResponse.json({ error: "serviceId required" }, { status: 400 });
  }

  let quote;
  try {
    quote = assertRequestedNicePayPrice({
      serviceId: body.serviceId,
      requestedAmountUSD: body.amount,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "invalid plan" },
      { status: 400 }
    );
  }

  if (quote.plan === "one_subject" && !body.subjectId) {
    return NextResponse.json(
      { error: "subjectId required for one_subject" },
      { status: 400 }
    );
  }

  if (!body.encData && !body.billingKey) {
    return NextResponse.json(
      { error: "encData required for billing key registration" },
      { status: 400 }
    );
  }

  if (
    body.billingKey &&
    process.env.NICEPAY_ALLOW_DIRECT_BILLING_KEY_STORE !== "true"
  ) {
    return NextResponse.json(
      { error: "direct billing key storage is disabled" },
      { status: 403 }
    );
  }

  const supabase = createAdminClient();
  const localOrderId = randomUUID();
  const boundServiceId = bindCourseAccessServiceId(body.serviceId, body.subjectId);
  const courseName = body.subjectId
    ? courses.find((course) => course.id === body.subjectId)?.subjectEn ?? body.subjectId
    : null;
  const orderName = buildCourseBoundOrderName(quote.orderName, body.serviceId, courseName);

  await createPendingOrder(supabase, {
    id: localOrderId,
    userId: user.id,
    serviceId: boundServiceId,
    orderName,
    amount: quote.chargeAmount,
    currency: quote.chargeCurrency,
    kind: "subscription",
    provider: "nicepay",
    customerName: body.customerName,
    customerEmail: user.email ?? body.customerEmail,
  });

  let registerResponse: Record<string, unknown> | null = null;
  let billingKey = body.billingKey ?? null;

  try {
    if (!billingKey && body.encData) {
      registerResponse = await registerNicePayBillingKey({
        orderId: localOrderId,
        encData: body.encData,
        customerName: body.customerName,
        customerEmail: user.email ?? body.customerEmail,
      });
      billingKey = getNicePayBillingKeyFromResponse(registerResponse);
    }

    if (!billingKey) {
      throw new Error("NICEPAY billing key missing from registration response");
    }
  } catch (error) {
    await markStoredOrderFailed(
      supabase,
      localOrderId,
      {
        billingRegisterError:
          error instanceof Error ? error.message : "billing key registration failed",
        registerResponse,
      },
      "nicepay"
    );
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "billing key registration failed" },
      { status: 400 }
    );
  }

  const encrypted = encryptNicePayBillingKey(billingKey);
  const { data: billingRow, error: billingInsertError } = await supabase
    .from("nicepay_billing_keys")
    .insert({
      user_id: user.id,
      service_id: boundServiceId,
      subject_id: body.subjectId ?? null,
      provider: "nicepay",
      status: "active",
      billing_key_ciphertext: encrypted.ciphertext,
      billing_key_iv: encrypted.iv,
      billing_key_tag: encrypted.tag,
      customer_email: user.email ?? body.customerEmail ?? null,
      raw_provider_response: registerResponse,
    })
    .select("id")
    .single();

  if (billingInsertError || !billingRow) {
    await markStoredOrderFailed(
      supabase,
      localOrderId,
      {
        billingStoreError: billingInsertError?.message ?? "billing key storage failed",
      },
      "nicepay"
    );
    return NextResponse.json(
      { error: billingInsertError?.message ?? "billing key storage failed" },
      { status: 500 }
    );
  }

  let firstCharge: Record<string, unknown>;
  try {
    firstCharge = await approveNicePayBillingPayment({
      billingKey,
      orderId: localOrderId,
      amount: quote.chargeAmount,
      goodsName: orderName,
      customerEmail: user.email ?? body.customerEmail,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "billing payment failed";
    await markStoredOrderFailed(supabase, localOrderId, { billingPaymentError: message }, "nicepay");
    await supabase
      .from("nicepay_billing_keys")
      .update({ status: "past_due", fail_count: 1, last_error: message })
      .eq("id", billingRow.id);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (!isNicePaySuccess(firstCharge) || getNicePayAmount(firstCharge) !== quote.chargeAmount) {
    const message =
      !isNicePaySuccess(firstCharge)
        ? getNicePayResultMessage(firstCharge)
        : "billing payment amount mismatch";
    await markStoredOrderFailed(supabase, localOrderId, firstCharge, "nicepay");
    await supabase
      .from("nicepay_billing_keys")
      .update({ status: "past_due", fail_count: 1, last_error: message })
      .eq("id", billingRow.id);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  await markStoredOrderPaid(supabase, localOrderId, {
    userId: user.id,
    provider: "nicepay",
    providerOrderId: getNicePayTid(firstCharge),
    providerSubscriptionId: billingRow.id,
    rawResponse: {
      registerResponse,
      firstCharge,
    },
  });

  await supabase
    .from("nicepay_billing_keys")
    .update({
      last_billed_at: new Date().toISOString(),
      next_billing_at: getNextBillingAt(),
      last_order_id: localOrderId,
      fail_count: 0,
      last_error: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", billingRow.id);

  return NextResponse.json({
    success: true,
    provider: "nicepay",
    mode: "billing",
    localOrderId,
    billingKeyId: billingRow.id,
    order: {
      id: localOrderId,
      serviceId: boundServiceId,
      orderName,
      amount: quote.chargeAmount,
      currency: quote.chargeCurrency,
      status: "paid",
    },
  });
}
