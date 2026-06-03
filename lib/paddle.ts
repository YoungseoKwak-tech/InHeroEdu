import { createHmac, timingSafeEqual } from "crypto";

export type PaddleEnvironment = "sandbox" | "production";

type PaddleTransaction = Record<string, unknown>;

export function getPaddleEnvironment(): PaddleEnvironment {
  const value =
    process.env.PADDLE_ENV ??
    process.env.NEXT_PUBLIC_PADDLE_ENV ??
    "production";

  return value.toLowerCase() === "sandbox" ? "sandbox" : "production";
}

export function getPaddleClientToken() {
  return (
    process.env.PADDLE_CLIENT_TOKEN ??
    process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ??
    null
  );
}

export function getPaddlePriceIdForService(serviceId: string) {
  const normalized = serviceId.split(":")[0];

  if (normalized === "single") {
    return process.env.PADDLE_PRICE_SINGLE ?? null;
  }

  if (normalized === "novapass") {
    return process.env.PADDLE_PRICE_NOVAPASS ?? null;
  }

  if (normalized === "textbook") {
    return process.env.PADDLE_PRICE_TEXTBOOK ?? null;
  }

  return null;
}

function getPaddleApiBaseUrl() {
  return getPaddleEnvironment() === "sandbox"
    ? "https://sandbox-api.paddle.com"
    : "https://api.paddle.com";
}

export async function fetchPaddleTransaction(transactionId: string) {
  const apiKey = process.env.PADDLE_API_KEY;
  if (!apiKey) {
    throw new Error("missing paddle api key");
  }

  const res = await fetch(`${getPaddleApiBaseUrl()}/transactions/${transactionId}`, {
    method: "GET",
    signal: AbortSignal.timeout(15000),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });

  const payload = (await res.json().catch(() => ({}))) as {
    data?: PaddleTransaction;
    error?: { detail?: string; message?: string };
  };

  if (!res.ok || !payload.data) {
    throw new Error(
      payload.error?.detail ??
        payload.error?.message ??
        `Paddle transaction lookup failed (${res.status})`
    );
  }

  return payload.data;
}

export function isPaidPaddleTransaction(transaction: PaddleTransaction) {
  const status = String(transaction.status ?? "").toLowerCase();
  return status === "paid" || status === "completed";
}

export function getPaddleCustomData(value: unknown): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return {};
  }

  const record = value as Record<string, unknown>;
  const customData = record.custom_data ?? record.customData;
  if (
    typeof customData === "object" &&
    customData !== null &&
    !Array.isArray(customData)
  ) {
    return customData as Record<string, unknown>;
  }

  return {};
}

export function verifyPaddleWebhookSignature(rawBody: string, signature: string | null) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("missing paddle webhook secret");
  }

  if (!signature) {
    throw new Error("missing paddle signature");
  }

  const parts = new Map(
    signature.split(/[;,]/).map((part) => {
      const [key, ...value] = part.split("=");
      return [key?.trim(), value.join("=").trim()] as const;
    })
  );

  const timestamp = parts.get("ts");
  const expected = parts.get("h1");
  if (!timestamp || !expected) {
    throw new Error("invalid paddle signature");
  }

  const timestampSeconds = Number(timestamp);
  const toleranceSeconds = Number(process.env.PADDLE_WEBHOOK_TOLERANCE_SECONDS ?? 300);
  if (
    Number.isFinite(timestampSeconds) &&
    Math.abs(Date.now() / 1000 - timestampSeconds) > toleranceSeconds
  ) {
    throw new Error("stale paddle webhook");
  }

  const signedPayload = `${timestamp}:${rawBody}`;
  const actual = createHmac("sha256", secret).update(signedPayload).digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  const actualBuffer = Buffer.from(actual, "hex");

  if (
    expectedBuffer.length !== actualBuffer.length ||
    !timingSafeEqual(expectedBuffer, actualBuffer)
  ) {
    throw new Error("paddle signature mismatch");
  }
}
