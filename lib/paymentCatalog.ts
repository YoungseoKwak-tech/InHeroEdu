import { PRICING } from "@/lib/pricing";
import { TEXTBOOK_PRICE_KRW, TEXTBOOK_PRICE_USD } from "@/lib/textbookPricing";

export type PaymentCurrency = "USD" | "KRW";

export const DEFAULT_PAYMENT_CURRENCY = "USD" as const;
export const DEFAULT_TOSS_METHOD = "FOREIGN_EASY_PAY";
export const DEFAULT_TOSS_PROVIDER = "PAYPAL";

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

export function findCatalogEntry(serviceId: string) {
  return getCatalogEntries().find((entry) => entry.id === serviceId) ?? null;
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
