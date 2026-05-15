import {
  formatPayPalAmount,
  getPaymentCatalogEntry,
  type PaymentCatalogEntry,
} from "@/lib/paymentCatalog";

const LIVE_BASE_URL = "https://api-m.paypal.com";
const SANDBOX_BASE_URL = "https://api-m.sandbox.paypal.com";

type PayPalMode = "live" | "sandbox";

type PayPalLink = {
  href?: string;
  rel?: string;
  method?: string;
};

type TokenCache = {
  accessToken: string;
  expiresAt: number;
  baseUrl: string;
  mode: PayPalMode;
};

let tokenCache: TokenCache | null = null;

function readPayPalClientId() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.trim();
  if (!clientId) throw new Error("missing paypal client id");
  return clientId;
}

function getPayPalSecret() {
  const secret = process.env.PAYPAL_SECRET?.trim();
  if (!secret) throw new Error("missing paypal secret");
  return secret;
}

export function isPayPalConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.trim() &&
      process.env.PAYPAL_SECRET?.trim()
  );
}

function getExplicitBaseUrl() {
  const value = process.env.PAYPAL_API_BASE?.trim();
  return value ? value : null;
}

function getModeFromBaseUrl(baseUrl: string): PayPalMode {
  return baseUrl.includes("sandbox") ? "sandbox" : "live";
}

function isMissingResourceMessage(message: string) {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("not found") ||
    normalized.includes("resource not found") ||
    normalized.includes("specified resource does not exist") ||
    normalized.includes("does not exist")
  );
}

function getApprovalLink(links: unknown, preferredRel: string) {
  if (!Array.isArray(links)) return null;
  const match = (links as PayPalLink[]).find((link) => link.rel === preferredRel || link.rel === "approve");
  return typeof match?.href === "string" ? match.href : null;
}

async function fetchAccessToken(baseUrl: string) {
  const clientId = readPayPalClientId();
  const secret = getPayPalSecret();

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const text = await response.text();
  let payload: Record<string, unknown> = {};
  try {
    payload = text ? (JSON.parse(text) as Record<string, unknown>) : {};
  } catch {
    payload = {};
  }

  if (!response.ok) {
    throw new Error(String(payload.error_description ?? payload.message ?? response.statusText));
  }

  const accessToken = String(payload.access_token ?? "");
  const expiresIn = Number(payload.expires_in ?? 0);
  if (!accessToken || !expiresIn) {
    throw new Error("paypal access token missing");
  }

  return {
    accessToken,
    expiresAt: Date.now() + (expiresIn - 60) * 1000,
    baseUrl,
    mode: getModeFromBaseUrl(baseUrl),
  } satisfies TokenCache;
}

async function getPayPalContext(): Promise<TokenCache> {
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache;
  }

  const explicitBase = getExplicitBaseUrl();
  const baseUrls = explicitBase
    ? [explicitBase]
    : [LIVE_BASE_URL, SANDBOX_BASE_URL];

  let lastError: Error | null = null;

  for (const baseUrl of baseUrls) {
    try {
      tokenCache = await fetchAccessToken(baseUrl);
      return tokenCache;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("paypal auth failed");
    }
  }

  throw lastError ?? new Error("paypal auth failed");
}

async function paypalFetch<T>(
  path: string,
  init: RequestInit,
  acceptedStatuses: number[] = [200, 201]
): Promise<T> {
  const context = await getPayPalContext();
  const response = await fetch(`${context.baseUrl}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${context.accessToken}`,
      ...(init.headers ?? {}),
    },
  });

  if (acceptedStatuses.includes(response.status)) {
    if (response.status === 204) {
      return null as T;
    }

    const text = await response.text();
    return (text ? JSON.parse(text) : null) as T;
  }

  const text = await response.text();
  let payload: Record<string, unknown> = {};
  try {
    payload = text ? (JSON.parse(text) as Record<string, unknown>) : {};
  } catch {
    payload = {};
  }

  throw new Error(String(payload.message ?? payload.error_description ?? `${path} failed (${response.status})`));
}

function buildProductId(entry: PaymentCatalogEntry) {
  const safeId = entry.serviceId.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toUpperCase();
  return `INHERO-${entry.kind === "subscription" ? "SUB" : "ONE"}-${safeId}`.slice(0, 50);
}

function buildPlanName(entry: PaymentCatalogEntry) {
  return `${entry.orderName} Monthly`.slice(0, 127);
}

function buildPlanDescription(entry: PaymentCatalogEntry) {
  return `inhero:${entry.serviceId}:${entry.amountUSD}:USD:MONTH`.slice(0, 127);
}

async function ensureCatalogProduct(entry: PaymentCatalogEntry) {
  const productId = buildProductId(entry);

  try {
    await paypalFetch(`/v1/catalogs/products/${productId}`, { method: "GET" });
    return productId;
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (!isMissingResourceMessage(message)) {
      throw error;
    }
  }

  await paypalFetch(
    "/v1/catalogs/products",
    {
      method: "POST",
      headers: {
        "PayPal-Request-Id": productId,
      },
      body: JSON.stringify({
        id: productId,
        name: entry.orderName,
        description: `${entry.orderName} for InHero students`,
        type: "SERVICE",
      }),
    },
    [200, 201]
  );

  return productId;
}

export async function ensurePayPalSubscriptionPlan(entry: PaymentCatalogEntry) {
  const productId = await ensureCatalogProduct(entry);
  const plans = await paypalFetch<{ plans?: Array<Record<string, unknown>> }>(
    `/v1/billing/plans?product_id=${encodeURIComponent(productId)}&page_size=20&total_required=true`,
    { method: "GET" }
  );

  const matchingPlan = (plans.plans ?? []).find(
    (plan) =>
      plan.name === buildPlanName(entry) &&
      plan.description === buildPlanDescription(entry)
  );

  if (matchingPlan && typeof matchingPlan.id === "string") {
    return matchingPlan.id;
  }

  const created = await paypalFetch<{ id: string }>(
    "/v1/billing/plans",
    {
      method: "POST",
      headers: {
        "PayPal-Request-Id": `PLAN-${entry.serviceId}-${entry.amountUSD}`,
      },
      body: JSON.stringify({
        product_id: productId,
        name: buildPlanName(entry),
        description: buildPlanDescription(entry),
        status: "ACTIVE",
        billing_cycles: [
          {
            frequency: {
              interval_unit: "MONTH",
              interval_count: 1,
            },
            tenure_type: "REGULAR",
            sequence: 1,
            total_cycles: 0,
            pricing_scheme: {
              fixed_price: {
                value: formatPayPalAmount(entry.amountUSD),
                currency_code: "USD",
              },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          payment_failure_threshold: 1,
        },
      }),
    }
  );

  return created.id;
}

export async function createPayPalOrder(input: {
  localOrderId: string;
  orderName: string;
  amountUSD: number;
  returnUrl: string;
  cancelUrl: string;
  customerEmail?: string | null;
}) {
  const response = await paypalFetch<{ id: string; links?: PayPalLink[] }>(
    "/v2/checkout/orders",
    {
      method: "POST",
      headers: {
        "PayPal-Request-Id": input.localOrderId,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        payment_source: {
          paypal: {
            ...(input.customerEmail ? { email_address: input.customerEmail } : {}),
            experience_context: {
              brand_name: "InHero",
              landing_page: "LOGIN",
              shipping_preference: "NO_SHIPPING",
              user_action: "PAY_NOW",
              return_url: input.returnUrl,
              cancel_url: input.cancelUrl,
            },
          },
        },
        purchase_units: [
          {
            reference_id: input.localOrderId,
            custom_id: input.localOrderId,
            description: input.orderName,
            invoice_id: input.localOrderId,
            amount: {
              currency_code: "USD",
              value: formatPayPalAmount(input.amountUSD),
            },
          },
        ],
      }),
    }
  );

  const approveUrl = getApprovalLink(response.links, "payer-action");
  if (!approveUrl) {
    throw new Error("paypal approval link missing");
  }

  return {
    id: response.id,
    approveUrl,
  };
}

function splitSubscriberName(name?: string | null) {
  const safeName = (name ?? "").trim();
  if (!safeName) {
    return { given_name: "InHero", surname: "Student" };
  }

  const parts = safeName.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return { given_name: parts[0].slice(0, 140), surname: "Student" };
  }

  return {
    given_name: parts[0].slice(0, 140),
    surname: parts.slice(1).join(" ").slice(0, 140),
  };
}

export async function createPayPalSubscription(input: {
  localOrderId: string;
  planId: string;
  returnUrl: string;
  cancelUrl: string;
  customerName?: string | null;
  customerEmail?: string | null;
}) {
  const response = await paypalFetch<{ id: string; status?: string; links?: PayPalLink[] }>(
    "/v1/billing/subscriptions",
    {
      method: "POST",
      headers: {
        "PayPal-Request-Id": input.localOrderId,
      },
      body: JSON.stringify({
        plan_id: input.planId,
        custom_id: input.localOrderId,
        ...(input.customerEmail || input.customerName
          ? {
              subscriber: {
                ...(input.customerEmail ? { email_address: input.customerEmail } : {}),
                name: splitSubscriberName(input.customerName),
              },
            }
          : {}),
        application_context: {
          brand_name: "InHero",
          locale: "en-US",
          user_action: "SUBSCRIBE_NOW",
          shipping_preference: "NO_SHIPPING",
          return_url: input.returnUrl,
          cancel_url: input.cancelUrl,
        },
      }),
    }
  );

  const approveUrl = getApprovalLink(response.links, "approve");
  if (!approveUrl) {
    throw new Error("paypal subscription approval link missing");
  }

  return {
    id: response.id,
    status: response.status ?? null,
    approveUrl,
  };
}

export async function capturePayPalOrder(paypalOrderId: string) {
  return paypalFetch<Record<string, unknown>>(
    `/v2/checkout/orders/${paypalOrderId}/capture`,
    {
      method: "POST",
      body: JSON.stringify({}),
    }
  );
}

export async function getPayPalOrder(paypalOrderId: string) {
  return paypalFetch<Record<string, unknown>>(
    `/v2/checkout/orders/${paypalOrderId}`,
    { method: "GET" }
  );
}

export async function getPayPalSubscription(subscriptionId: string) {
  return paypalFetch<Record<string, unknown>>(
    `/v1/billing/subscriptions/${subscriptionId}`,
    { method: "GET" }
  );
}

export async function activatePayPalSubscription(subscriptionId: string) {
  await paypalFetch(
    `/v1/billing/subscriptions/${subscriptionId}/activate`,
    {
      method: "POST",
      body: JSON.stringify({
        reason: "Buyer approved the subscription checkout.",
      }),
    },
    [204]
  );
}

export async function getPayPalMode() {
  const context = await getPayPalContext();
  return context.mode;
}
