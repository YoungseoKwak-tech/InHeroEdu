import { NextRequest, NextResponse } from "next/server";
import {
  getLemonSqueezyCustomData,
  verifyLemonSqueezyWebhookSignature,
} from "@/lib/lemonsqueezy";
import { getStoredOrder, markStoredOrderPaid } from "@/lib/orderStore";
import { createAdminClient } from "@/lib/supabase";

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

function isPaidOrderEvent(eventName: string | undefined) {
  return eventName === "order_created" || eventName === "subscription_created";
}

function getProviderOrderId(payload: Record<string, unknown>) {
  const data = payload.data;
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return null;
  }

  const id = (data as Record<string, unknown>).id;
  return typeof id === "string" ? id : null;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  try {
    verifyLemonSqueezyWebhookSignature(rawBody, req.headers.get("X-Signature"));
  } catch (error) {
    console.error("[api/payments/lemonsqueezy/webhook] signature failed", {
      message: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  try {
    const event = JSON.parse(rawBody) as Record<string, unknown>;
    const meta = event.meta;
    const eventName =
      typeof meta === "object" && meta !== null && !Array.isArray(meta)
        ? String((meta as Record<string, unknown>).event_name ?? "")
        : "";

    if (!isPaidOrderEvent(eventName)) {
      return NextResponse.json({ ok: true, ignored: eventName || "unknown" });
    }

    const customData = getLemonSqueezyCustomData(event);
    const localOrderId =
      typeof customData.localOrderId === "string" ? customData.localOrderId : null;

    if (!localOrderId) {
      console.error("[api/payments/lemonsqueezy/webhook] missing local order id", {
        eventName,
        providerOrderId: getProviderOrderId(event),
      });
      return NextResponse.json({ error: "missing local order id" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const storedOrder = await getStoredOrder(supabase, localOrderId);
    if (!storedOrder) {
      console.error("[api/payments/lemonsqueezy/webhook] order not found", {
        localOrderId,
        providerOrderId: getProviderOrderId(event),
      });
      return NextResponse.json({ error: "order not found" }, { status: 404 });
    }

    if (storedOrder.status !== "paid") {
      await markStoredOrderPaid(supabase, localOrderId, {
        userId: storedOrder.userId,
        provider: "lemonsqueezy",
        providerOrderId: getProviderOrderId(event),
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
    console.error("[api/payments/lemonsqueezy/webhook] failed", {
      message,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: message || "webhook failed" }, { status: 500 });
  }
}
