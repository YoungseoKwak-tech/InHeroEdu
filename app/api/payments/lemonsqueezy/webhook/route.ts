import { NextRequest, NextResponse } from "next/server";
import {
  getLemonSqueezyCustomData,
  verifyLemonSqueezyWebhookSignature,
} from "@/lib/lemonsqueezy";
import {
  attachStoredOrderProviderDetails,
  getStoredOrder,
  getStoredOrderByProviderSubscriptionId,
  markStoredOrderInactive,
  markStoredOrderPaid,
  type StoredOrder,
} from "@/lib/orderStore";
import { createAdminClient } from "@/lib/supabase";

const GRANTING_SUBSCRIPTION_STATUSES = new Set(["on_trial", "active"]);
const RETAINING_SUBSCRIPTION_STATUSES = new Set([
  "paused",
  "past_due",
  "unpaid",
  "cancelled",
]);

function getStoredPlanParts(serviceId: string) {
  const [plan, subject] = serviceId.toLowerCase().split(":");
  return {
    plan,
    subject: subject ?? null,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getEventName(payload: Record<string, unknown>) {
  const meta = payload.meta;
  if (!isRecord(meta)) return "";
  const eventName = meta.event_name;
  return typeof eventName === "string" ? eventName : "";
}

function isSupportedEvent(eventName: string) {
  return (
    eventName === "order_created" ||
    eventName === "subscription_created" ||
    eventName === "subscription_updated" ||
    eventName === "subscription_expired"
  );
}

function isSubscriptionEvent(eventName: string) {
  return eventName.startsWith("subscription_");
}

function getProviderResourceId(payload: Record<string, unknown>) {
  const data = payload.data;
  if (!isRecord(data)) {
    return null;
  }

  const id = data.id;
  return typeof id === "string" ? id : null;
}

function getDataAttributes(payload: Record<string, unknown>) {
  const data = payload.data;
  if (!isRecord(data)) return {};
  const attributes = data.attributes;
  return isRecord(attributes) ? attributes : {};
}

function getSubscriptionStatus(payload: Record<string, unknown>) {
  const status = getDataAttributes(payload).status;
  return typeof status === "string" ? status.toLowerCase() : null;
}

function getCustomString(
  customData: Record<string, unknown>,
  keys: string[]
) {
  for (const key of keys) {
    const value = customData[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

async function resolveStoredOrder({
  supabase,
  localOrderId,
  providerSubscriptionId,
}: {
  supabase: ReturnType<typeof createAdminClient>;
  localOrderId: string | null;
  providerSubscriptionId: string | null;
}) {
  if (localOrderId) {
    return getStoredOrder(supabase, localOrderId);
  }

  if (providerSubscriptionId) {
    return getStoredOrderByProviderSubscriptionId(supabase, providerSubscriptionId);
  }

  return null;
}

function getEffectiveUserId(storedOrder: StoredOrder, customUserId: string | null) {
  if (storedOrder.userId && customUserId && storedOrder.userId !== customUserId) {
    return { error: "user mismatch" as const, userId: null };
  }

  return {
    error: null,
    userId: storedOrder.userId ?? customUserId,
  };
}

function validatePlanMapping({
  storedOrder,
  customPlan,
  customSubject,
  requireCustomPlan,
}: {
  storedOrder: StoredOrder;
  customPlan: string | null;
  customSubject: string | null;
  requireCustomPlan: boolean;
}) {
  const stored = getStoredPlanParts(storedOrder.serviceId);
  const plan = customPlan?.toLowerCase() ?? null;
  const subject = customSubject?.toLowerCase() ?? null;

  if (requireCustomPlan && !plan) {
    return "missing custom plan";
  }

  if (!plan) {
    return null;
  }

  if (plan !== "one_subject" && plan !== "all_subjects") {
    return "unsupported custom plan";
  }

  if (stored.plan !== plan) {
    return "plan mismatch";
  }

  if (plan === "one_subject") {
    if (!subject) {
      return "missing custom subject";
    }

    if (stored.subject !== subject) {
      return "subject mismatch";
    }
  }

  if (plan === "all_subjects" && stored.subject) {
    return "all_subjects cannot be subject-bound";
  }

  return null;
}

async function markPaidOnce({
  supabase,
  storedOrder,
  eventName,
  providerResourceId,
  userId,
  event,
}: {
  supabase: ReturnType<typeof createAdminClient>;
  storedOrder: StoredOrder;
  eventName: string;
  providerResourceId: string | null;
  userId: string;
  event: Record<string, unknown>;
}) {
  if (storedOrder.status === "paid") {
    if (
      isSubscriptionEvent(eventName) &&
      providerResourceId &&
      storedOrder.providerSubscriptionId !== providerResourceId
    ) {
      await attachStoredOrderProviderDetails(supabase, storedOrder.id, {
        providerSubscriptionId: providerResourceId,
        rawResponse: event,
      });
    }

    return;
  }

  await markStoredOrderPaid(supabase, storedOrder.id, {
    userId,
    provider: "lemonsqueezy",
    providerOrderId: eventName === "order_created" ? providerResourceId : null,
    providerSubscriptionId: isSubscriptionEvent(eventName) ? providerResourceId : null,
    rawResponse: event,
  });
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
    const eventName = getEventName(event);

    if (!isSupportedEvent(eventName)) {
      return NextResponse.json({ ok: true, ignored: eventName || "unknown" });
    }

    const customData = getLemonSqueezyCustomData(event);
    const localOrderId = getCustomString(customData, ["localOrderId", "local_order_id"]);
    const customUserId = getCustomString(customData, ["user_id", "userId"]);
    const customPlan = getCustomString(customData, ["plan"]);
    const customSubject = getCustomString(customData, ["subject", "subjectId"]);
    const providerResourceId = getProviderResourceId(event);
    const providerSubscriptionId = isSubscriptionEvent(eventName)
      ? providerResourceId
      : null;

    if (!localOrderId && !providerSubscriptionId) {
      console.error("[api/payments/lemonsqueezy/webhook] missing local order id", {
        eventName,
        providerResourceId,
      });
      return NextResponse.json({ error: "missing order mapping" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const storedOrder = await resolveStoredOrder({
      supabase,
      localOrderId,
      providerSubscriptionId,
    });

    if (!storedOrder) {
      console.error("[api/payments/lemonsqueezy/webhook] order not found", {
        localOrderId,
        providerSubscriptionId,
        providerResourceId,
      });
      return NextResponse.json({ error: "order not found" }, { status: 404 });
    }

    const { error: userError, userId } = getEffectiveUserId(storedOrder, customUserId);
    if (userError || !userId) {
      console.error("[api/payments/lemonsqueezy/webhook] invalid user mapping", {
        eventName,
        localOrderId: storedOrder.id,
        storedUserId: storedOrder.userId,
        customUserId,
      });
      return NextResponse.json({ error: "invalid user mapping" }, { status: 400 });
    }

    const planError = validatePlanMapping({
      storedOrder,
      customPlan,
      customSubject,
      requireCustomPlan:
        eventName === "order_created" || eventName === "subscription_created",
    });

    if (planError) {
      console.error("[api/payments/lemonsqueezy/webhook] invalid plan mapping", {
        eventName,
        localOrderId: storedOrder.id,
        storedServiceId: storedOrder.serviceId,
        customPlan,
        customSubject,
        planError,
      });
      return NextResponse.json({ error: "invalid plan mapping" }, { status: 400 });
    }

    if (eventName === "subscription_expired" || getSubscriptionStatus(event) === "expired") {
      if (storedOrder.status !== "expired") {
        await markStoredOrderInactive(supabase, storedOrder.id, "expired", {
          providerSubscriptionId,
          rawResponse: event,
        });
      }

      return NextResponse.json({ ok: true, localOrderId: storedOrder.id, revoked: true });
    }

    const subscriptionStatus = getSubscriptionStatus(event);
    const shouldRetain =
      subscriptionStatus !== null && RETAINING_SUBSCRIPTION_STATUSES.has(subscriptionStatus);
    const shouldGrant =
      eventName === "order_created" ||
      eventName === "subscription_created" ||
      (subscriptionStatus !== null && GRANTING_SUBSCRIPTION_STATUSES.has(subscriptionStatus));

    if (shouldRetain && storedOrder.status === "paid") {
      return NextResponse.json({
        ok: true,
        localOrderId: storedOrder.id,
        retained: subscriptionStatus,
      });
    }

    if (!shouldGrant) {
      console.warn("[api/payments/lemonsqueezy/webhook] ignored subscription status", {
        eventName,
        localOrderId: storedOrder.id,
        providerSubscriptionId,
        subscriptionStatus,
      });
      return NextResponse.json({
        ok: true,
        localOrderId: storedOrder.id,
        ignored: subscriptionStatus ?? eventName,
      });
    }

    await markPaidOnce({
      supabase,
      storedOrder,
      eventName,
      providerResourceId,
      userId,
      event,
    });

    return NextResponse.json({ ok: true, localOrderId: storedOrder.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[api/payments/lemonsqueezy/webhook] failed", {
      message,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: message || "webhook failed" }, { status: 500 });
  }
}
