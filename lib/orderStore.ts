import type { SupabaseClient } from "@supabase/supabase-js";
import {
  inferStoredOrderAmount,
  inferStoredOrderCurrencyFromRow,
  type PaymentCurrency,
  type PaymentKind,
} from "@/lib/paymentCatalog";

export interface StoredOrder {
  id: string;
  userId: string | null;
  serviceId: string;
  orderName: string;
  amount: number;
  currency: PaymentCurrency;
  status: string;
  createdAt: string | null;
  providerOrderId: string | null;
  providerSubscriptionId: string | null;
  kind: PaymentKind | null;
  raw: Record<string, unknown>;
}

type PendingOrderInput = {
  id: string;
  userId: string | null;
  serviceId: string;
  orderName: string;
  amount: number;
  currency: PaymentCurrency;
  kind: PaymentKind;
  provider?: "paypal" | "nicepay";
  customerName?: string;
  customerEmail?: string;
};

type PaidOrderInput = {
  userId?: string | null;
  provider?: "paypal" | "nicepay";
  providerOrderId?: string | null;
  providerSubscriptionId?: string | null;
  rawResponse?: unknown;
};

type InactiveOrderStatus = "cancelled" | "expired" | "failed";

function looksLikeMissingColumn(error: unknown) {
  const message =
    typeof error === "object" && error !== null && "message" in error
      ? String((error as { message?: unknown }).message ?? "").toLowerCase()
      : "";

  return (
    message.includes("column") ||
    message.includes("schema cache") ||
    message.includes("could not find")
  );
}

function normalizeOrderRow(row: Record<string, unknown>): StoredOrder {
  const legacyRaw =
    typeof row.raw_toss_response === "object" && row.raw_toss_response !== null
      ? (row.raw_toss_response as Record<string, unknown>)
      : null;

  const legacyProviderOrderId =
    legacyRaw && typeof legacyRaw.provider_order_id === "string"
      ? legacyRaw.provider_order_id
      : null;

  const legacyProviderSubscriptionId =
    legacyRaw && typeof legacyRaw.provider_subscription_id === "string"
      ? legacyRaw.provider_subscription_id
      : null;

  return {
    id: String(row.id ?? ""),
    userId: typeof row.user_id === "string" ? row.user_id : null,
    serviceId: typeof row.service_id === "string" ? row.service_id : "",
    orderName:
      typeof row.order_name === "string"
        ? row.order_name
        : typeof row.service_id === "string"
          ? row.service_id
          : "Payment",
    amount: inferStoredOrderAmount(row),
    currency: inferStoredOrderCurrencyFromRow(row),
    status: typeof row.status === "string" ? row.status : "pending",
    createdAt: typeof row.created_at === "string" ? row.created_at : null,
    providerOrderId:
      typeof row.provider_order_id === "string"
        ? row.provider_order_id
        : typeof row.paypal_order_id === "string"
          ? row.paypal_order_id
          : legacyProviderOrderId,
    providerSubscriptionId:
      typeof row.provider_subscription_id === "string"
        ? row.provider_subscription_id
        : typeof row.paypal_subscription_id === "string"
          ? row.paypal_subscription_id
          : legacyProviderSubscriptionId,
    kind:
      row.kind === "subscription" || row.kind === "one_time"
        ? row.kind
        : row.payment_kind === "subscription" || row.payment_kind === "one_time"
          ? (row.payment_kind as PaymentKind)
          : null,
    raw: row,
  };
}

export async function createPendingOrder(
  supabase: SupabaseClient,
  input: PendingOrderInput
) {
  const modernPayload = {
    id: input.id,
    user_id: input.userId,
    service_id: input.serviceId,
    order_name: input.orderName,
    amount: input.amount,
    currency: input.currency,
    status: "pending",
    provider: input.provider ?? "paypal",
    kind: input.kind,
    customer_name: input.customerName ?? null,
    customer_email: input.customerEmail ?? null,
  };

  const modernResult = await supabase
    .from("orders")
    .insert(modernPayload)
    .select("id")
    .single();

  if (!modernResult.error) {
    return modernResult.data?.id ?? input.id;
  }

  if (!looksLikeMissingColumn(modernResult.error)) {
    throw modernResult.error;
  }

  const legacyResult = await supabase
    .from("orders")
    .insert({
      id: input.id,
      user_id: input.userId,
      service_id: input.serviceId,
      order_name: input.orderName,
      amount_krw: input.amount,
      status: "pending",
    })
    .select("id")
    .single();

  if (legacyResult.error) {
    throw legacyResult.error;
  }

  return legacyResult.data?.id ?? input.id;
}

type ProviderAttachmentInput = {
  provider?: "paypal" | "nicepay";
  providerOrderId?: string | null;
  providerSubscriptionId?: string | null;
  rawResponse?: unknown;
};

export async function attachStoredOrderProviderDetails(
  supabase: SupabaseClient,
  orderId: string,
  input: ProviderAttachmentInput
) {
  const modernUpdate = {
    provider_order_id: input.providerOrderId ?? undefined,
    provider_subscription_id: input.providerSubscriptionId ?? undefined,
    raw_provider_response: input.rawResponse ?? undefined,
  };

  const modernResult = await supabase.from("orders").update(modernUpdate).eq("id", orderId);
  if (!modernResult.error) return;

  if (!looksLikeMissingColumn(modernResult.error)) {
    throw modernResult.error;
  }

  const legacyPayload = {
    provider: input.provider ?? "paypal",
    provider_order_id: input.providerOrderId ?? null,
    provider_subscription_id: input.providerSubscriptionId ?? null,
    raw_provider_response: input.rawResponse ?? null,
  };

  const legacyResult = await supabase
    .from("orders")
    .update({ raw_toss_response: legacyPayload })
    .eq("id", orderId);

  if (legacyResult.error) {
    throw legacyResult.error;
  }
}

export async function getStoredOrder(
  supabase: SupabaseClient,
  orderId: string
): Promise<StoredOrder | null> {
  const result = await supabase.from("orders").select("*").eq("id", orderId).single();
  if (result.error || !result.data) return null;
  return normalizeOrderRow(result.data as Record<string, unknown>);
}

export async function getStoredOrderByProviderSubscriptionId(
  supabase: SupabaseClient,
  providerSubscriptionId: string
): Promise<StoredOrder | null> {
  const result = await supabase
    .from("orders")
    .select("*")
    .eq("provider_subscription_id", providerSubscriptionId)
    .maybeSingle();

  if (result.error || !result.data) return null;
  return normalizeOrderRow(result.data as Record<string, unknown>);
}

export async function listStoredOrdersForUser(
  supabase: SupabaseClient,
  userId: string
): Promise<StoredOrder[]> {
  const result = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (result.error) {
    throw result.error;
  }

  return (result.data ?? []).map((row) => normalizeOrderRow(row as Record<string, unknown>));
}

export async function markStoredOrderPaid(
  supabase: SupabaseClient,
  orderId: string,
  input: PaidOrderInput
) {
  const modernUpdate = {
    status: "paid",
    user_id: input.userId ?? undefined,
    provider_order_id: input.providerOrderId ?? undefined,
    provider_subscription_id: input.providerSubscriptionId ?? undefined,
    raw_provider_response: input.rawResponse ?? undefined,
    paid_at: new Date().toISOString(),
  };

  const modernResult = await supabase.from("orders").update(modernUpdate).eq("id", orderId);
  if (!modernResult.error) return;

  if (!looksLikeMissingColumn(modernResult.error)) {
    throw modernResult.error;
  }

  const legacyUpdate: Record<string, unknown> = { status: "paid" };
  if (input.userId) {
    legacyUpdate.user_id = input.userId;
  }
  if (input.rawResponse) {
    legacyUpdate.raw_toss_response = {
      provider: input.provider ?? "paypal",
      provider_order_id: input.providerOrderId ?? null,
      provider_subscription_id: input.providerSubscriptionId ?? null,
      raw_provider_response: input.rawResponse,
    };
  }

  const legacyResult = await supabase.from("orders").update(legacyUpdate).eq("id", orderId);
  if (legacyResult.error) {
    throw legacyResult.error;
  }
}

export async function markStoredOrderFailed(
  supabase: SupabaseClient,
  orderId: string,
  rawResponse?: unknown,
  provider: "paypal" | "nicepay" = "paypal"
) {
  const modernUpdate = {
    status: "failed",
    raw_provider_response: rawResponse ?? undefined,
  };

  const modernResult = await supabase.from("orders").update(modernUpdate).eq("id", orderId);
  if (!modernResult.error) return;

  if (!looksLikeMissingColumn(modernResult.error)) {
    throw modernResult.error;
  }

  const legacyResult = await supabase
    .from("orders")
    .update({
      status: "failed",
      ...(rawResponse ? { raw_toss_response: { provider, raw_provider_response: rawResponse } } : {}),
    })
    .eq("id", orderId);
  if (legacyResult.error) {
    throw legacyResult.error;
  }
}

export async function markStoredOrderInactive(
  supabase: SupabaseClient,
  orderId: string,
  status: InactiveOrderStatus,
  input: ProviderAttachmentInput = {}
) {
  const modernUpdate = {
    status,
    provider_order_id: input.providerOrderId ?? undefined,
    provider_subscription_id: input.providerSubscriptionId ?? undefined,
    raw_provider_response: input.rawResponse ?? undefined,
  };

  const modernResult = await supabase.from("orders").update(modernUpdate).eq("id", orderId);
  if (!modernResult.error) return;

  if (!looksLikeMissingColumn(modernResult.error)) {
    throw modernResult.error;
  }

  const legacyUpdate: Record<string, unknown> = { status };
  if (input.rawResponse) {
    legacyUpdate.raw_toss_response = {
      provider: input.provider ?? "paypal",
      provider_order_id: input.providerOrderId ?? null,
      provider_subscription_id: input.providerSubscriptionId ?? null,
      raw_provider_response: input.rawResponse,
    };
  }

  const legacyResult = await supabase.from("orders").update(legacyUpdate).eq("id", orderId);
  if (legacyResult.error) {
    throw legacyResult.error;
  }
}
