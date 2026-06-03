import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import {
  getPaddleCustomData,
  isPaidPaddleTransaction,
  verifyPaddleWebhookSignature,
} from "@/lib/paddle";
import { getStoredOrder, markStoredOrderPaid } from "@/lib/orderStore";

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  try {
    verifyPaddleWebhookSignature(rawBody, req.headers.get("Paddle-Signature"));
  } catch (error) {
    console.error("[api/payments/paddle/webhook] signature failed", {
      message: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  try {
    const event = JSON.parse(rawBody) as {
      event_type?: string;
      data?: Record<string, unknown>;
    };
    const data = isRecord(event.data) ? event.data : {};

    if (!event.event_type?.startsWith("transaction.")) {
      return NextResponse.json({ ok: true, ignored: event.event_type ?? "unknown" });
    }

    if (!isPaidPaddleTransaction(data)) {
      return NextResponse.json({ ok: true, status: data.status ?? "unpaid" });
    }

    const customData = getPaddleCustomData(data);
    const localOrderId =
      typeof customData.localOrderId === "string" ? customData.localOrderId : null;

    if (!localOrderId) {
      console.error("[api/payments/paddle/webhook] missing local order id", {
        eventType: event.event_type,
        transactionId: data.id,
      });
      return NextResponse.json({ error: "missing local order id" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const storedOrder = await getStoredOrder(supabase, localOrderId);
    if (!storedOrder) {
      console.error("[api/payments/paddle/webhook] order not found", {
        localOrderId,
        transactionId: data.id,
      });
      return NextResponse.json({ error: "order not found" }, { status: 404 });
    }

    if (storedOrder.status !== "paid") {
      await markStoredOrderPaid(supabase, localOrderId, {
        userId: storedOrder.userId,
        provider: "paddle",
        providerOrderId: typeof data.id === "string" ? data.id : null,
        providerSubscriptionId:
          typeof data.subscription_id === "string" ? data.subscription_id : null,
        rawResponse: event,
      });
    }

    await unlockTextbookIfNeeded({
      supabase,
      userId: storedOrder.userId,
      serviceId: storedOrder.serviceId,
      orderId: localOrderId,
    });

    return NextResponse.json({ ok: true, localOrderId });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[api/payments/paddle/webhook] failed", {
      message,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: message || "webhook failed" }, { status: 500 });
  }
}
