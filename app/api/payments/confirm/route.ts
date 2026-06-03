import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { getAuthenticatedUser } from "@/lib/auth";
import { inferStoredOrderCurrency } from "@/lib/paymentCatalog";
import {
  getStoredOrder,
  markStoredOrderFailed,
  markStoredOrderPaid,
  type StoredOrder,
} from "@/lib/orderStore";
import {
  activatePayPalSubscription,
  capturePayPalOrder,
  getPayPalOrder,
  getPayPalSubscription,
} from "@/lib/paypal";

const PAYMENT_CONFIRM_TIMEOUT_MS = 15000;

function createTossAuthHeader() {
  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    throw new Error("missing toss secret key");
  }

  return `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function ensureOrderBelongsToUser(order: StoredOrder, userId: string | null) {
  if (!userId) {
    return NextResponse.json({ error: "authentication required" }, { status: 401 });
  }

  if (order.userId && order.userId !== userId) {
    return NextResponse.json({ error: "order does not belong to user" }, { status: 403 });
  }

  return null;
}

function toUsdMinorUnits(value: unknown) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;
  return Math.round(numeric * 100);
}

function getPurchaseUnits(payload: Record<string, unknown>) {
  const units = payload.purchase_units;
  return Array.isArray(units) ? units.filter(isRecord) : [];
}

function validatePayPalCapture({
  payload,
  localOrderId,
  paypalOrderId,
  expectedAmount,
  expectedCurrency,
}: {
  payload: Record<string, unknown>;
  localOrderId: string;
  paypalOrderId: string;
  expectedAmount: number;
  expectedCurrency: string;
}) {
  const responseOrderId = typeof payload.id === "string" ? payload.id : null;
  if (responseOrderId && responseOrderId !== paypalOrderId) {
    return "paypal order id mismatch";
  }

  const purchaseUnits = getPurchaseUnits(payload);
  const hasMatchingReference = purchaseUnits.some((unit) =>
    [unit.reference_id, unit.custom_id, unit.invoice_id].some(
      (value) => value === localOrderId
    )
  );

  if (!hasMatchingReference) {
    return "paypal order reference mismatch";
  }

  const expectedMinor = toUsdMinorUnits(expectedAmount);
  if (expectedMinor === null) return "stored order amount invalid";

  let capturedMinor = 0;
  let completedCaptureCount = 0;

  for (const unit of purchaseUnits) {
    const payments = isRecord(unit.payments) ? unit.payments : null;
    const captures = Array.isArray(payments?.captures)
      ? payments.captures.filter(isRecord)
      : [];

    for (const capture of captures) {
      if (String(capture.status ?? "").toUpperCase() !== "COMPLETED") {
        continue;
      }

      const amount = isRecord(capture.amount) ? capture.amount : null;
      const currency = String(amount?.currency_code ?? "").toUpperCase();
      const minorUnits = toUsdMinorUnits(amount?.value);

      if (currency !== expectedCurrency.toUpperCase()) {
        return "paypal capture currency mismatch";
      }
      if (minorUnits === null) {
        return "paypal capture amount invalid";
      }

      capturedMinor += minorUnits;
      completedCaptureCount += 1;
    }
  }

  if (completedCaptureCount === 0) {
    return "paypal completed capture missing";
  }

  if (capturedMinor !== expectedMinor) {
    return "paypal capture amount mismatch";
  }

  return null;
}

function validatePayPalSubscription({
  payload,
  localOrderId,
  subscriptionId,
}: {
  payload: Record<string, unknown>;
  localOrderId: string;
  subscriptionId: string;
}) {
  const responseSubscriptionId = typeof payload.id === "string" ? payload.id : null;
  if (responseSubscriptionId && responseSubscriptionId !== subscriptionId) {
    return "paypal subscription id mismatch";
  }

  if (payload.custom_id !== localOrderId) {
    return "paypal subscription reference mismatch";
  }

  return null;
}

function validateTossConfirmation(
  payload: Record<string, unknown>,
  orderId: string,
  expectedAmount: number
) {
  const responseOrderId = typeof payload.orderId === "string" ? payload.orderId : null;
  if (responseOrderId && responseOrderId !== orderId) {
    return "toss order id mismatch";
  }

  const status = String(payload.status ?? "").toUpperCase();
  if (status && status !== "DONE") {
    return `toss status: ${status}`;
  }

  const totalAmount = Number(payload.totalAmount ?? payload.amount);
  if (Number.isFinite(totalAmount) && totalAmount !== expectedAmount) {
    return "toss amount mismatch";
  }

  return null;
}

function mapStoredOrderForResponse(order: {
  id: string;
  serviceId: string;
  orderName: string;
  amount: number;
  currency: "USD" | "KRW";
  status: string;
}) {
  return {
    id: order.id,
    serviceId: order.serviceId,
    orderName: order.orderName,
    amount: order.amount,
    currency: order.currency,
    status: order.status,
  };
}

async function unlockTextbookIfNeeded({
  supabase,
  userId,
  serviceId,
  orderId,
}: {
  supabase: ReturnType<typeof createAdminClient>;
  userId: string | null;
  serviceId: string;
  orderId: string;
}) {
  if (!userId || !serviceId.startsWith("textbook:")) return;

  const subjectId = serviceId.replace("textbook:", "");
  await supabase
    .from("textbook_purchases")
    .upsert(
      { user_id: userId, subject_id: subjectId, order_id: orderId },
      { onConflict: "user_id,subject_id" }
    );
}

async function confirmLegacyTextbookPayment({
  supabase,
  paymentKey,
  orderId,
  subjectId,
  userId,
}: {
  supabase: ReturnType<typeof createAdminClient>;
  paymentKey: string;
  orderId: string;
  subjectId: string;
  userId: string | null;
}) {
  if (!userId) {
    return NextResponse.json({ error: "authentication required" }, { status: 401 });
  }

  const { data: product, error: productError } = await supabase
    .from("textbook_products")
    .select("title, price_krw, status")
    .eq("subject_id", subjectId)
    .eq("status", "available")
    .single();

  if (productError || !product) {
    return NextResponse.json({ error: "textbook not available" }, { status: 404 });
  }

  const tossRes = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    signal: AbortSignal.timeout(PAYMENT_CONFIRM_TIMEOUT_MS),
    headers: {
      Authorization: createTossAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paymentKey,
      orderId,
      amount: Number(product.price_krw),
    }),
  });

  const tossData = await tossRes.json();
  if (!tossRes.ok) {
    return NextResponse.json(
      { error: tossData.message ?? "payment failed" },
      { status: 400 }
    );
  }

  const tossValidationError = validateTossConfirmation(
    tossData,
    orderId,
    Number(product.price_krw)
  );
  if (tossValidationError) {
    return NextResponse.json({ error: tossValidationError }, { status: 400 });
  }

  await supabase
    .from("textbook_purchases")
    .upsert(
      { user_id: userId, subject_id: subjectId, order_id: orderId },
      { onConflict: "user_id,subject_id" }
    );

  return NextResponse.json({
    success: true,
    provider: "toss",
    tossData,
    order: {
      id: orderId,
      serviceId: `textbook:${subjectId}`,
      orderName: product.title,
      amount: product.price_krw,
      currency: "KRW",
      status: "paid",
    },
  });
}

async function confirmPayPalPayment({
  supabase,
  localOrderId,
  userId,
  paypalOrderId,
  subscriptionId,
}: {
  supabase: ReturnType<typeof createAdminClient>;
  localOrderId: string;
  userId: string | null;
  paypalOrderId?: string | null;
  subscriptionId?: string | null;
}) {
  const storedOrder = await getStoredOrder(supabase, localOrderId);
  if (!storedOrder) {
    return NextResponse.json({ error: "order not found" }, { status: 404 });
  }

  const ownershipError = ensureOrderBelongsToUser(storedOrder, userId);
  if (ownershipError) return ownershipError;

  if (storedOrder.status === "paid") {
    return NextResponse.json({
      success: true,
      provider: "paypal",
      order: mapStoredOrderForResponse(storedOrder),
    });
  }

  const effectiveUserId = userId;

  if (storedOrder.kind === "subscription") {
    const resolvedSubscriptionId =
      storedOrder.providerSubscriptionId ?? subscriptionId ?? null;

    if (!resolvedSubscriptionId) {
      return NextResponse.json({ error: "subscription id missing" }, { status: 400 });
    }

    let subscription: Record<string, unknown>;
    try {
      subscription = await getPayPalSubscription(resolvedSubscriptionId);
    } catch (error) {
      await markStoredOrderFailed(supabase, localOrderId, {
        error: error instanceof Error ? error.message : "subscription lookup failed",
      });
      return NextResponse.json({ error: "subscription lookup failed" }, { status: 400 });
    }

    let subscriptionStatus = String(subscription.status ?? "");
    if (subscriptionStatus === "APPROVED") {
      try {
        await activatePayPalSubscription(resolvedSubscriptionId);
        subscription = await getPayPalSubscription(resolvedSubscriptionId);
        subscriptionStatus = String(subscription.status ?? "");
      } catch {
        // Some flows auto-activate on approval. We'll accept APPROVED below if it persists.
      }
    }

    if (!["APPROVED", "ACTIVE"].includes(subscriptionStatus)) {
      if (["CANCELLED", "EXPIRED", "SUSPENDED"].includes(subscriptionStatus)) {
        await markStoredOrderFailed(supabase, localOrderId, subscription);
      }

      return NextResponse.json(
        { error: `subscription status: ${subscriptionStatus || "unknown"}` },
        { status: 400 }
      );
    }

    const subscriptionValidationError = validatePayPalSubscription({
      payload: subscription,
      localOrderId,
      subscriptionId: resolvedSubscriptionId,
    });
    if (subscriptionValidationError) {
      await markStoredOrderFailed(supabase, localOrderId, subscription);
      return NextResponse.json(
        { error: subscriptionValidationError },
        { status: 400 }
      );
    }

    await markStoredOrderPaid(supabase, localOrderId, {
      userId: effectiveUserId,
      providerSubscriptionId: resolvedSubscriptionId,
      rawResponse: subscription,
    });

    await unlockTextbookIfNeeded({
      supabase,
      userId: effectiveUserId,
      serviceId: storedOrder.serviceId,
      orderId: localOrderId,
    });

    return NextResponse.json({
      success: true,
      provider: "paypal",
      order: {
        ...mapStoredOrderForResponse(storedOrder),
        status: "paid",
      },
    });
  }

  const resolvedPayPalOrderId =
    storedOrder.providerOrderId ?? paypalOrderId ?? null;

  if (!resolvedPayPalOrderId) {
    return NextResponse.json({ error: "paypal order id missing" }, { status: 400 });
  }

  if (
    storedOrder.providerOrderId &&
    paypalOrderId &&
    storedOrder.providerOrderId !== paypalOrderId
  ) {
    return NextResponse.json(
      { error: "paypal order id mismatch" },
      { status: 400 }
    );
  }

  let captureResponse: Record<string, unknown>;
  try {
    captureResponse = await capturePayPalOrder(resolvedPayPalOrderId);
  } catch (error) {
    try {
      const orderState = await getPayPalOrder(resolvedPayPalOrderId);
      if (String(orderState.status ?? "") === "COMPLETED") {
        captureResponse = orderState;
      } else {
        throw error;
      }
    } catch (fallbackError) {
      await markStoredOrderFailed(supabase, localOrderId, {
        captureError:
          fallbackError instanceof Error ? fallbackError.message : "capture failed",
      });

      return NextResponse.json(
        {
          error:
            fallbackError instanceof Error
              ? fallbackError.message
              : "capture failed",
        },
        { status: 400 }
      );
    }
  }

  const captureStatus = String(captureResponse.status ?? "");
  if (captureStatus !== "COMPLETED") {
    await markStoredOrderFailed(supabase, localOrderId, captureResponse);
    return NextResponse.json(
      { error: `order status: ${captureStatus || "unknown"}` },
      { status: 400 }
    );
  }

  const captureValidationError = validatePayPalCapture({
    payload: captureResponse,
    localOrderId,
    paypalOrderId: resolvedPayPalOrderId,
    expectedAmount: storedOrder.amount,
    expectedCurrency: storedOrder.currency,
  });
  if (captureValidationError) {
    await markStoredOrderFailed(supabase, localOrderId, captureResponse);
    return NextResponse.json(
      { error: captureValidationError },
      { status: 400 }
    );
  }

  await markStoredOrderPaid(supabase, localOrderId, {
    userId: effectiveUserId,
    providerOrderId: resolvedPayPalOrderId,
    rawResponse: captureResponse,
  });

  await unlockTextbookIfNeeded({
    supabase,
    userId: effectiveUserId,
    serviceId: storedOrder.serviceId,
    orderId: localOrderId,
  });

  return NextResponse.json({
    success: true,
    provider: "paypal",
    order: {
      ...mapStoredOrderForResponse(storedOrder),
      status: "paid",
    },
  });
}

async function confirmLemonSqueezyPayment({
  supabase,
  localOrderId,
  userId,
}: {
  supabase: ReturnType<typeof createAdminClient>;
  localOrderId: string;
  userId: string | null;
}) {
  const storedOrder = await getStoredOrder(supabase, localOrderId);
  if (!storedOrder) {
    return NextResponse.json({ error: "order not found" }, { status: 404 });
  }

  const ownershipError = ensureOrderBelongsToUser(storedOrder, userId);
  if (ownershipError) return ownershipError;

  if (storedOrder.status === "paid") {
    return NextResponse.json({
      success: true,
      provider: "lemonsqueezy",
      order: mapStoredOrderForResponse(storedOrder),
    });
  }

  return NextResponse.json(
    { error: "payment is still processing" },
    { status: 202 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      provider?: string;
      paymentKey?: string;
      orderId?: string;
      localOrderId?: string;
      serviceId?: string;
      subjectId?: string;
      paypalOrderId?: string;
      subscriptionId?: string;
      token?: string;
    };

    const supabase = createAdminClient();
    const authedUser = await getAuthenticatedUser(req);
    const authedUserId = authedUser?.id ?? null;

    const provider = body.provider ?? (body.paymentKey ? "toss" : "paypal");

    if (provider === "paypal") {
      const localOrderId = body.localOrderId ?? body.orderId;
      if (!localOrderId) {
        return NextResponse.json({ error: "missing order id" }, { status: 400 });
      }

      return confirmPayPalPayment({
        supabase,
        localOrderId,
        userId: authedUserId,
        paypalOrderId: body.paypalOrderId ?? body.token,
        subscriptionId: body.subscriptionId ?? body.token,
      });
    }

    if (provider === "lemonsqueezy") {
      const localOrderId = body.localOrderId ?? body.orderId;
      if (!localOrderId) {
        return NextResponse.json({ error: "missing order id" }, { status: 400 });
      }

      return confirmLemonSqueezyPayment({
        supabase,
        localOrderId,
        userId: authedUserId,
      });
    }

    const paymentKey = body.paymentKey;
    const orderId = body.orderId;
    const serviceId = body.serviceId;
    const subjectId = body.subjectId;

    if (!paymentKey || !orderId) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, amount_krw, status, service_id, order_name, user_id")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      if (serviceId === "textbook" && subjectId) {
        return confirmLegacyTextbookPayment({
          supabase,
          paymentKey,
          orderId,
          subjectId,
          userId: authedUserId,
        });
      }

      return NextResponse.json({ error: "order not found" }, { status: 404 });
    }

    if (!authedUserId) {
      return NextResponse.json({ error: "authentication required" }, { status: 401 });
    }

    if (order.user_id && order.user_id !== authedUserId) {
      return NextResponse.json(
        { error: "order does not belong to user" },
        { status: 403 }
      );
    }

    if (order.status === "paid") {
      return NextResponse.json({
        success: true,
        provider: "toss",
        order: {
          id: order.id,
          serviceId: order.service_id,
          orderName: order.order_name,
          amount: order.amount_krw,
          currency: inferStoredOrderCurrency(
            order.service_id ?? "",
            Number(order.amount_krw)
          ),
          status: "paid",
        },
      });
    }

    const tossRes = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      signal: AbortSignal.timeout(PAYMENT_CONFIRM_TIMEOUT_MS),
      headers: {
        Authorization: createTossAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: Number(order.amount_krw),
      }),
    });

    const tossData = await tossRes.json();

    if (!tossRes.ok) {
      await supabase.from("orders").update({ status: "failed" }).eq("id", orderId);
      return NextResponse.json(
        { error: tossData.message ?? "payment failed" },
        { status: 400 }
      );
    }

    const tossValidationError = validateTossConfirmation(
      tossData,
      orderId,
      Number(order.amount_krw)
    );
    if (tossValidationError) {
      await supabase.from("orders").update({ status: "failed" }).eq("id", orderId);
      return NextResponse.json({ error: tossValidationError }, { status: 400 });
    }

    const effectiveUserId = authedUserId;
    const orderUpdate: { status: string; user_id?: string } = { status: "paid" };
    if (effectiveUserId && !order.user_id) {
      orderUpdate.user_id = effectiveUserId;
    }

    await supabase.from("orders").update(orderUpdate).eq("id", orderId);
    await unlockTextbookIfNeeded({
      supabase,
      userId: effectiveUserId,
      serviceId: order.service_id,
      orderId,
    });

    return NextResponse.json({
      success: true,
      provider: "toss",
      tossData,
      order: {
        id: order.id,
        serviceId: order.service_id,
        orderName: order.order_name,
        amount: order.amount_krw,
        currency: inferStoredOrderCurrency(
          order.service_id ?? "",
          Number(order.amount_krw)
        ),
        status: "paid",
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("[api/payments/confirm] failed", {
      message,
      stack: e instanceof Error ? e.stack : undefined,
      name: e instanceof Error ? e.name : undefined,
    });
    return NextResponse.json(
      { error: message || "server error", scope: "payment_confirm" },
      { status: 500 }
    );
  }
}
