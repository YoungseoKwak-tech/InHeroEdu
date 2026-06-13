import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  timingSafeEqual,
} from "crypto";
import { PRICING } from "@/lib/pricing";
import type { PaymentCurrency, PaymentKind } from "@/lib/paymentCatalog";

export const NICEPAY_JS_SDK_URL = "https://pay.nicepay.co.kr/v1/js/";
export const NICEPAY_APPROVAL_TIMEOUT_MS = 15_000;

const NICEPAY_API_BASE =
  readEnv("NICEPAY_API_BASE_URL")?.replace(/\/+$/, "") ??
  "https://api.nicepay.co.kr";

type NicePayPlan = "one_subject" | "all_subjects";

export type NicePayQuote = {
  plan: NicePayPlan;
  displayAmountUSD: number;
  chargeAmount: number;
  chargeCurrency: PaymentCurrency;
  kind: PaymentKind;
  orderName: string;
};

type NicePayFetchOptions = {
  method?: "GET" | "POST";
  body?: Record<string, unknown>;
  timeoutMs?: number;
};

type NicePayEncryptResult = {
  ciphertext: string;
  iv: string;
  tag: string;
};

function readEnv(name: string) {
  const value = process.env[name]?.trim();
  return value || null;
}

export function getNicePayClientId() {
  return readEnv("NICEPAY_CLIENT_ID") ?? readEnv("NEXT_PUBLIC_NICEPAY_CLIENT_ID") ?? "";
}

function getNicePaySecretKey() {
  return readEnv("NICEPAY_SECRET_KEY") ?? "";
}

function getNicePayEncryptionSecret() {
  return readEnv("NICEPAY_BILLING_KEY_SECRET") ?? getNicePaySecretKey();
}

export function isNicePayConfigured() {
  return Boolean(getNicePayClientId() && getNicePaySecretKey());
}

export function getNicePayMethod() {
  return readEnv("NICEPAY_METHOD") ?? "card";
}

function getNicePayCurrency(): PaymentCurrency {
  const value = (readEnv("NICEPAY_CURRENCY") ?? "KRW").toUpperCase();
  if (value === "USD" || value === "KRW") return value;
  throw new Error("NICEPAY_CURRENCY must be USD or KRW");
}

function getSubscriptionPlan(serviceId: string): (typeof PRICING.subscriptions)[number] | null {
  return PRICING.subscriptions.find((plan) => plan.id === serviceId) ?? null;
}

export function normalizeNicePayPlan(serviceId: string): NicePayPlan | null {
  const baseServiceId = serviceId.split(":")[0];
  if (baseServiceId === "one_subject" || baseServiceId === "all_subjects") {
    return baseServiceId;
  }
  return null;
}

export function getNicePayQuote(serviceId: string): NicePayQuote | null {
  const plan = normalizeNicePayPlan(serviceId);
  if (!plan) return null;

  const entry = getSubscriptionPlan(plan);
  if (!entry) return null;

  const currency = getNicePayCurrency();
  const chargeAmount =
    currency === "USD"
      ? Number(entry.priceUSD)
      : Number(entry.priceKRW);

  if (!Number.isFinite(chargeAmount) || chargeAmount <= 0) {
    throw new Error(`missing NICEPAY charge amount for ${plan}`);
  }

  return {
    plan,
    displayAmountUSD: Number(entry.priceUSD),
    chargeAmount,
    chargeCurrency: currency,
    kind: "subscription",
    orderName: entry.nameEn,
  };
}

export function assertRequestedNicePayPrice({
  serviceId,
  requestedChargeAmount,
}: {
  serviceId: string;
  requestedChargeAmount?: unknown;
}) {
  const quote = getNicePayQuote(serviceId);
  if (!quote) {
    throw new Error("invalid NICEPAY plan");
  }

  if (requestedChargeAmount !== undefined && requestedChargeAmount !== null) {
    const numeric = Number(requestedChargeAmount);
    if (!Number.isFinite(numeric) || numeric !== quote.chargeAmount) {
      throw new Error("NICEPAY charge amount mismatch");
    }
  }

  return quote;
}

function createNicePayAuthHeader() {
  const clientId = getNicePayClientId();
  const secretKey = getNicePaySecretKey();
  if (!clientId) throw new Error("missing NICEPAY_CLIENT_ID");
  if (!secretKey) throw new Error("missing NICEPAY_SECRET_KEY");
  return `Basic ${Buffer.from(`${clientId}:${secretKey}`).toString("base64")}`;
}

async function nicePayFetch<T>(
  path: string,
  { method = "POST", body, timeoutMs = NICEPAY_APPROVAL_TIMEOUT_MS }: NicePayFetchOptions = {}
): Promise<T> {
  const response = await fetch(`${NICEPAY_API_BASE}${path}`, {
    method,
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      Authorization: createNicePayAuthHeader(),
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = (await response.json().catch(() => ({}))) as T & {
    resultMsg?: string;
    message?: string;
  };

  if (!response.ok) {
    const message = data.resultMsg ?? data.message ?? `NICEPAY API ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export function getNicePayResultCode(payload: Record<string, unknown>) {
  return String(
    // Auth callback (브라우저 returnUrl) uses authResultCode; the server
    // approval response uses resultCode. Read both so a successful card auth
    // (authResultCode "0000") isn't misread as auth_failed.
    payload.authResultCode ??
      payload.AuthResultCode ??
      payload.resultCode ??
      payload.ResultCode ??
      payload.result_code ??
      payload.code ??
      ""
  );
}

export function getNicePayResultMessage(payload: Record<string, unknown>) {
  return String(
    payload.authResultMsg ??
      payload.AuthResultMsg ??
      payload.resultMsg ??
      payload.ResultMsg ??
      payload.result_message ??
      payload.message ??
      "NICEPAY payment failed"
  );
}

export function getNicePayTid(payload: Record<string, unknown>) {
  const tid = payload.tid ?? payload.TID ?? payload.paymentKey;
  return typeof tid === "string" ? tid : null;
}

export function getNicePayOrderId(payload: Record<string, unknown>) {
  const orderId = payload.orderId ?? payload.Moid ?? payload.moid;
  return typeof orderId === "string" ? orderId : null;
}

export function getNicePayAmount(payload: Record<string, unknown>) {
  const amount = Number(payload.amount ?? payload.Amt ?? payload.totalAmount);
  return Number.isFinite(amount) ? amount : null;
}

export function isNicePaySuccess(payload: Record<string, unknown>) {
  const code = getNicePayResultCode(payload);
  const status = String(payload.status ?? payload.Status ?? "").toUpperCase();
  return code === "0000" || status === "PAID" || status === "DONE";
}

function sha256Hex(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function safeCompareHex(left: string, right: string) {
  const a = Buffer.from(left, "hex");
  const b = Buffer.from(right, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export function verifyNicePayAuthSignature(payload: Record<string, unknown>) {
  const authToken = String(payload.authToken ?? payload.AuthToken ?? "");
  const amount = String(payload.amount ?? payload.Amt ?? "");
  const signature = String(payload.signature ?? payload.Signature ?? "");
  const clientId = getNicePayClientId();
  const secretKey = getNicePaySecretKey();

  if (!authToken || !amount || !signature || !clientId || !secretKey) {
    return true;
  }

  const expected = sha256Hex(`${authToken}${clientId}${amount}${secretKey}`);
  return safeCompareHex(expected, signature);
}

export function verifyNicePayApprovalSignature(payload: Record<string, unknown>) {
  const tid = String(payload.tid ?? payload.TID ?? "");
  const amount = String(payload.amount ?? payload.Amt ?? "");
  const ediDate = String(payload.ediDate ?? payload.EdiDate ?? "");
  const signature = String(payload.signature ?? payload.Signature ?? "");
  const secretKey = getNicePaySecretKey();

  if (!tid || !amount || !ediDate || !signature || !secretKey) {
    return true;
  }

  const expected = sha256Hex(`${tid}${amount}${ediDate}${secretKey}`);
  return safeCompareHex(expected, signature);
}

export function buildNicePayReservedData(input: {
  localOrderId: string;
  userId: string;
  serviceId: string;
  subjectId?: string | null;
  plan: string;
  returnTo?: string | null;
}) {
  return Buffer.from(JSON.stringify(input), "utf8").toString("base64url");
}

export async function approveNicePayPayment({
  tid,
  amount,
}: {
  tid: string;
  amount: number;
}) {
  return nicePayFetch<Record<string, unknown>>(`/v1/payments/${encodeURIComponent(tid)}`, {
    body: { amount },
  });
}

export async function registerNicePayBillingKey({
  orderId,
  encData,
  customerName,
  customerEmail,
}: {
  orderId: string;
  encData: string;
  customerName?: string | null;
  customerEmail?: string | null;
}) {
  return nicePayFetch<Record<string, unknown>>("/v1/subscribe/regist", {
    body: {
      orderId,
      encData,
      ...(customerName ? { buyerName: customerName } : {}),
      ...(customerEmail ? { buyerEmail: customerEmail } : {}),
    },
  });
}

export async function approveNicePayBillingPayment({
  billingKey,
  orderId,
  amount,
  goodsName,
  customerEmail,
}: {
  billingKey: string;
  orderId: string;
  amount: number;
  goodsName: string;
  customerEmail?: string | null;
}) {
  return nicePayFetch<Record<string, unknown>>(
    `/v1/subscribe/${encodeURIComponent(billingKey)}/payments`,
    {
      body: {
        orderId,
        amount,
        goodsName,
        ...(customerEmail ? { buyerEmail: customerEmail } : {}),
      },
    }
  );
}

function getAesKey() {
  const secret = getNicePayEncryptionSecret();
  if (!secret) throw new Error("missing NICEPAY_BILLING_KEY_SECRET");
  return createHash("sha256").update(secret).digest();
}

export function encryptNicePayBillingKey(value: string): NicePayEncryptResult {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getAesKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    ciphertext: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
  };
}

export function decryptNicePayBillingKey(input: NicePayEncryptResult) {
  const decipher = createDecipheriv(
    "aes-256-gcm",
    getAesKey(),
    Buffer.from(input.iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(input.tag, "base64"));
  return Buffer.concat([
    decipher.update(Buffer.from(input.ciphertext, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

export function getNicePayBillingKeyFromResponse(payload: Record<string, unknown>) {
  const value = payload.bid ?? payload.BID ?? payload.billingKey ?? payload.billing_key;
  return typeof value === "string" && value ? value : null;
}
