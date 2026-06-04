import { PRICING } from "@/lib/pricing";
import { TEXTBOOK_PRICE_KRW, TEXTBOOK_PRICE_USD } from "@/lib/textbookPricing";

export type PaymentCurrency = "USD" | "KRW";
export type PaymentKind = "subscription" | "one_time";

export type PaymentCatalogEntry = {
  serviceId: string;
  orderName: string;
  amountUSD: number;
  currency: PaymentCurrency;
  kind: PaymentKind;
};

export const DEFAULT_PAYMENT_CURRENCY = "USD" as const;

type CatalogEntry = {
  id: string;
  name: string;
  priceUSD?: number;
  priceKRW?: number;
};

function getCatalogEntries(): CatalogEntry[] {
  return [
    ...PRICING.free.map((item) => ({
      id: item.id,
      name: item.name,
      priceUSD: item.price,
      priceKRW: item.price,
    })),
    ...PRICING.aiPlans.map((item) => ({
      id: item.id,
      name: item.name,
      priceUSD: item.priceUSD,
      priceKRW: item.priceKRW,
    })),
    ...PRICING.subscriptions.map((item) => ({
      id: item.id,
      name: item.name,
      priceUSD: item.priceUSD,
      priceKRW: item.priceKRW,
    })),
    ...PRICING.gradePackages.map((item) => ({
      id: item.id,
      name: item.name,
      priceUSD: item.priceUSD,
      priceKRW: item.priceKRW,
    })),
    ...PRICING.competitionPackages.map((item) => ({
      id: item.id,
      name: item.name,
      priceUSD: item.priceUSD,
      priceKRW: item.priceKRW,
    })),
    ...PRICING.tutoring.map((item) => ({
      id: item.id,
      name: item.name,
      priceUSD: item.priceUSD,
      priceKRW: item.priceKRW,
    })),
    ...PRICING.consulting.map((item) => ({
      id: item.id,
      name: item.name,
      priceUSD: item.priceUSD,
      priceKRW: item.priceKRW,
    })),
  ];
}

function isSubscriptionServiceId(serviceId: string) {
  return [
    ...PRICING.aiPlans.map((item) => item.id),
    ...PRICING.subscriptions.map((item) => item.id),
    ...PRICING.gradePackages.map((item) => item.id),
    ...PRICING.competitionPackages.map((item) => item.id),
  ].some((id) => id === serviceId);
}

export function findCatalogEntry(serviceId: string) {
  return getCatalogEntries().find((entry) => entry.id === serviceId) ?? null;
}

export function getPaymentCatalogEntry(serviceId: string): PaymentCatalogEntry | null {
  const entry = findCatalogEntry(serviceId);
  if (!entry || typeof entry.priceUSD !== "number") return null;

  return {
    serviceId,
    orderName: entry.name,
    amountUSD: entry.priceUSD,
    currency: "USD",
    kind: isSubscriptionServiceId(serviceId) ? "subscription" : "one_time",
  };
}

export function getTextbookPaymentEntry(title: string, subjectId: string): PaymentCatalogEntry {
  return {
    serviceId: `textbook:${subjectId}`,
    orderName: title,
    amountUSD: TEXTBOOK_PRICE_USD,
    currency: "USD",
    kind: "one_time",
  };
}

export function formatPayPalAmount(amountUSD: number) {
  return Number(amountUSD).toFixed(2);
}

export function buildUsdQuoteForService(serviceId: string): {
  amount: number;
  currency: "USD";
  orderName: string;
} | null {
  const entry = findCatalogEntry(serviceId);
  if (!entry || typeof entry.priceUSD !== "number" || entry.priceUSD <= 0) {
    return null;
  }

  return {
    amount: entry.priceUSD,
    currency: DEFAULT_PAYMENT_CURRENCY,
    orderName: entry.name,
  };
}

export function buildUsdQuoteForTextbook(title: string) {
  return {
    amount: TEXTBOOK_PRICE_USD,
    currency: "USD" as const,
    orderName: title,
  };
}

export function inferStoredOrderCurrency(serviceId: string, rawAmount: number): PaymentCurrency {
  if (serviceId.startsWith("textbook:")) {
    if (rawAmount === TEXTBOOK_PRICE_KRW) return "KRW";
    if (rawAmount === TEXTBOOK_PRICE_USD) return "USD";
    return rawAmount > TEXTBOOK_PRICE_USD * 100 ? "KRW" : "USD";
  }

  const entry = findCatalogEntry(serviceId);
  if (entry) {
    if (typeof entry.priceUSD === "number" && rawAmount === entry.priceUSD) return "USD";
    if (typeof entry.priceKRW === "number" && rawAmount === entry.priceKRW) return "KRW";
    if (typeof entry.priceUSD === "number" && typeof entry.priceKRW !== "number") return "USD";
    if (typeof entry.priceKRW === "number" && typeof entry.priceUSD !== "number") return "KRW";
  }

  return rawAmount >= 1000 ? "KRW" : "USD";
}

export function inferStoredOrderAmount(row: Record<string, unknown>) {
  const candidates = [
    row.amount,
    row.amount_krw,
    row.amountUSD,
    row.amount_usd,
    row.price,
    row.price_krw,
    row.price_usd,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "number" && Number.isFinite(candidate)) {
      return candidate;
    }
    if (typeof candidate === "string" && candidate.trim()) {
      const parsed = Number(candidate);
      if (!Number.isNaN(parsed)) return parsed;
    }
  }

  return 0;
}

export function inferStoredOrderCurrencyFromRow(row: Record<string, unknown>): PaymentCurrency {
  const explicitCurrency =
    typeof row.currency === "string" ? row.currency.toUpperCase() : "";
  if (explicitCurrency === "USD" || explicitCurrency === "KRW") {
    return explicitCurrency;
  }

  const legacyRaw =
    typeof row.raw_toss_response === "object" && row.raw_toss_response !== null
      ? (row.raw_toss_response as Record<string, unknown>)
      : null;
  if (row.provider === "paypal" || legacyRaw?.provider === "paypal") {
    return "USD";
  }

  if (typeof row.amount_krw === "number" || typeof row.price_krw === "number") return "KRW";
  if (typeof row.amount_usd === "number" || typeof row.amountUSD === "number" || typeof row.price_usd === "number") {
    return "USD";
  }

  const amount = inferStoredOrderAmount(row);
  return amount >= 1000 ? "KRW" : "USD";
}
