import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { listStoredOrdersForUser } from "@/lib/orderStore";
import { createAdminClient } from "@/lib/supabase";
import { TEXTBOOK_PRICE_USD } from "@/lib/textbookPricing";
import { normalizeCourseAccessSubjectId } from "@/lib/course-access";
import { courses } from "@/lib/data/courses";

interface NicePayBillingKeyRow {
  id: string;
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

const PAYPAL_MANAGE_URL = "https://www.paypal.com/myaccount/autopay/";

const courseNameById = new Map(courses.map((course) => [course.id, course.subjectEn]));

function isMissingSchemaObject(error: { message?: string } | null | undefined) {
  const message = error?.message ?? "";
  return /schema cache|could not find|relation .* does not exist/i.test(message);
}

function getBillingPeriodDays() {
  const days = Number(process.env.NICEPAY_BILLING_PERIOD_DAYS ?? "30");
  return Number.isFinite(days) && days > 0 ? days : 30;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readString(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}

function addDaysIso(value: string | null, days: number) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

function getLegacyProviderPayload(raw: Record<string, unknown>) {
  return asRecord(raw.raw_toss_response);
}

function getRawProviderResponse(raw: Record<string, unknown>) {
  const direct = asRecord(raw.raw_provider_response);
  if (direct) return direct;

  const legacy = getLegacyProviderPayload(raw);
  return asRecord(legacy?.raw_provider_response);
}

function getOrderProvider(raw: Record<string, unknown>, hasProviderSubscriptionId: boolean) {
  const provider = readString(raw.provider);
  if (provider) return provider.toLowerCase();

  const legacyProvider = readString(getLegacyProviderPayload(raw)?.provider);
  if (legacyProvider) return legacyProvider.toLowerCase();

  return hasProviderSubscriptionId ? "paypal" : "unknown";
}

function normalizeSubscriptionStatus(status: string | null, fallback: string) {
  const normalized = (status ?? fallback).toLowerCase();
  switch (normalized) {
    case "active":
    case "approved":
      return "active";
    case "cancelled":
    case "canceled":
      return "cancelled";
    case "suspended":
    case "past_due":
      return "past_due";
    case "expired":
      return "expired";
    default:
      return normalized || "unknown";
  }
}

function getProviderNextBillingAt(rawProviderResponse: Record<string, unknown> | null) {
  const billingInfo = asRecord(rawProviderResponse?.billing_info);
  return (
    readString(billingInfo?.next_billing_time) ??
    readString(billingInfo?.next_billing_at) ??
    readString(rawProviderResponse?.next_billing_time) ??
    readString(rawProviderResponse?.next_billing_at)
  );
}

function inferSubjectIdFromServiceId(serviceId: string) {
  const normalized = serviceId.toLowerCase();
  if (!normalized.includes(":")) return null;

  const [baseServiceId, rawSubjectId] = normalized.split(":");
  if (baseServiceId !== "one_subject" && baseServiceId !== "single") return null;
  return normalizeCourseAccessSubjectId(rawSubjectId);
}

function isSubscriptionOrder(order: Awaited<ReturnType<typeof listStoredOrdersForUser>>[number]) {
  const serviceId = order.serviceId.toLowerCase();
  if (serviceId.startsWith("textbook:") || serviceId.startsWith("credits:")) return false;
  return order.kind === "subscription" || Boolean(order.providerSubscriptionId);
}

function subjectNameFromServiceId(serviceId: string) {
  const [, rawSubjectId] = serviceId.split(":");
  const subjectId = normalizeCourseAccessSubjectId(rawSubjectId);
  return subjectId ? courseNameById.get(subjectId) ?? subjectId : null;
}

function englishOrderName(serviceId: string, fallback: string) {
  const normalizedServiceId = serviceId.toLowerCase();

  if (normalizedServiceId === "all_subjects" || normalizedServiceId === "novapass") {
    return "All Subject Elite Pass";
  }

  if (normalizedServiceId === "one_subject") {
    return "One Subject Elite Pass";
  }

  if (normalizedServiceId.startsWith("one_subject:") || normalizedServiceId.startsWith("single:")) {
    const subjectName = subjectNameFromServiceId(normalizedServiceId.replace(/^single:/, "one_subject:"));
    return subjectName ? `One Subject Elite Pass — ${subjectName}` : "One Subject Elite Pass";
  }

  if (normalizedServiceId.startsWith("textbook:")) {
    const subjectId = normalizedServiceId.slice("textbook:".length);
    const subjectName = courseNameById.get(subjectId) ?? subjectId;
    return `${subjectName} Textbook`;
  }

  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(fallback) ? "InHero purchase" : fallback;
}

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  try {
    const supabase = createAdminClient();

    const [orders, purchasesRes, productsRes, billingKeysRes] = await Promise.all([
      listStoredOrdersForUser(supabase, user.id),
      supabase
        .from("textbook_purchases")
        .select("subject_id, order_id")
        .eq("user_id", user.id),
      supabase
        .from("textbook_products")
        .select("subject_id, title, pdf_url, price_krw, status"),
      supabase
        .from("nicepay_billing_keys")
        .select(
          "id, provider, service_id, subject_id, status, next_billing_at, last_billed_at, last_order_id, created_at, updated_at"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ]);

    if (purchasesRes.error) {
      return NextResponse.json({ error: purchasesRes.error.message }, { status: 500 });
    }

    if (productsRes.error) {
      return NextResponse.json({ error: productsRes.error.message }, { status: 500 });
    }

    if (billingKeysRes.error && !isMissingSchemaObject(billingKeysRes.error)) {
      return NextResponse.json({ error: billingKeysRes.error.message }, { status: 500 });
    }

    const productMap = new Map(
      (productsRes.data ?? []).map((product) => [product.subject_id, product])
    );

    const normalizedOrders = orders
      .filter((order) => order.status === "paid")
      .map((order) => ({
        id: order.id,
        provider: getOrderProvider(order.raw, Boolean(order.providerSubscriptionId)),
        service_id: order.serviceId,
        order_name: englishOrderName(order.serviceId, order.orderName),
        amount: Number(order.amount ?? 0),
        currency: order.currency,
        kind: order.kind,
        provider_subscription_id: order.providerSubscriptionId,
        status: order.status,
        created_at: order.createdAt,
        paid_at: readString(order.raw.paid_at) ?? order.createdAt,
      }));

    const manuals = (purchasesRes.data ?? [])
      .map((purchase) => {
        const product = productMap.get(purchase.subject_id);

        return {
          subjectId: purchase.subject_id,
          orderId: purchase.order_id,
          title: product?.title ?? purchase.subject_id,
          pdfUrl: product?.pdf_url ?? null,
          priceAmount: product ? TEXTBOOK_PRICE_USD : null,
          priceCurrency: product ? "USD" : null,
          status: product?.status ?? null,
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title, "en"));

    const nicePaySubscriptions = ((billingKeysRes.error ? [] : billingKeysRes.data ?? []) as NicePayBillingKeyRow[]).map((subscription) => ({
      id: subscription.id,
      provider: subscription.provider ?? "nicepay",
      service_id: subscription.service_id,
      subject_id: subscription.subject_id,
      status: normalizeSubscriptionStatus(subscription.status, "unknown"),
      next_billing_at: subscription.next_billing_at,
      last_billed_at: subscription.last_billed_at,
      last_order_id: subscription.last_order_id,
      created_at: subscription.created_at,
      updated_at: subscription.updated_at,
      access_through: subscription.next_billing_at,
      can_cancel: subscription.status.toLowerCase() === "active",
      manage_url: null,
    }));

    const nicePaySubscriptionIds = new Set(nicePaySubscriptions.map((subscription) => subscription.id));
    const billingPeriodDays = getBillingPeriodDays();
    const orderBackedSubscriptions = orders
      .filter((order) => order.status === "paid" && isSubscriptionOrder(order))
      .filter((order) => !order.providerSubscriptionId || !nicePaySubscriptionIds.has(order.providerSubscriptionId))
      .map((order) => {
        const rawProviderResponse = getRawProviderResponse(order.raw);
        const provider = getOrderProvider(order.raw, Boolean(order.providerSubscriptionId));
        const providerStatus = readString(rawProviderResponse?.status);
        const status = normalizeSubscriptionStatus(providerStatus, order.status === "paid" ? "active" : order.status);
        const paidAt = readString(order.raw.paid_at) ?? order.createdAt;
        const nextBillingAt = getProviderNextBillingAt(rawProviderResponse) ?? addDaysIso(paidAt, billingPeriodDays);

        return {
          id: order.providerSubscriptionId ?? `order:${order.id}`,
          provider,
          service_id: order.serviceId,
          subject_id: inferSubjectIdFromServiceId(order.serviceId),
          status,
          next_billing_at: status === "active" ? nextBillingAt : null,
          last_billed_at: paidAt,
          last_order_id: order.id,
          created_at: order.createdAt,
          updated_at: readString(order.raw.paid_at) ?? order.createdAt,
          access_through: nextBillingAt,
          can_cancel: false,
          manage_url: provider === "paypal" ? PAYPAL_MANAGE_URL : null,
        };
      });

    const subscriptions = [...nicePaySubscriptions, ...orderBackedSubscriptions].sort((a, b) => {
      const aActive = a.status === "active" ? 1 : 0;
      const bActive = b.status === "active" ? 1 : 0;
      if (aActive !== bActive) return bActive - aActive;
      return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
    });

    return NextResponse.json({
      orders: normalizedOrders,
      manuals,
      subscriptions,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load billing." },
      { status: 500 }
    );
  }
}
