import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { getAuthenticatedUser } from "@/lib/auth";
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

async function confirmNicePayPayment({
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
      provider: "nicepay",
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
      orderId?: string;
      localOrderId?: string;
      paypalOrderId?: string;
      subscriptionId?: string;
      token?: string;
    };

    const supabase = createAdminClient();
    const authedUser = await getAuthenticatedUser(req);
    const authedUserId = authedUser?.id ?? null;

    const provider = body.provider ?? "paypal";

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

    if (provider === "nicepay") {
      const localOrderId = body.localOrderId ?? body.orderId;
      if (!localOrderId) {
        return NextResponse.json({ error: "missing order id" }, { status: 400 });
      }

      return confirmNicePayPayment({
        supabase,
        localOrderId,
        userId: authedUserId,
      });
    }

    return NextResponse.json(
      { error: "unsupported payment provider" },
      { status: 400 }
    );
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
