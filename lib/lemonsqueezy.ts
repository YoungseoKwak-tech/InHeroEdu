import { createHmac, timingSafeEqual } from "crypto";

type LemonSqueezyCheckoutResponse = {
  data?: {
    id?: string;
    attributes?: {
      url?: string;
    };
  };
  errors?: Array<{
    detail?: string;
    title?: string;
  }>;
};

export function isLemonSqueezyConfigured() {
  return Boolean(
    process.env.LEMONSQUEEZY_API_KEY &&
      process.env.LEMONSQUEEZY_STORE_ID &&
      process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  );
}

export function getLemonSqueezyVariantIdForService(serviceId: string) {
  const normalized = serviceId.split(":")[0];

  if (normalized === "one_subject") {
    return process.env.LEMONSQUEEZY_VARIANT_ONE_SUBJECT ?? null;
  }

  if (normalized === "all_subjects") {
    return process.env.LEMONSQUEEZY_VARIANT_ALL_SUBJECTS ?? null;
  }

  return null;
}

function getLemonSqueezyErrorMessage(payload: LemonSqueezyCheckoutResponse) {
  const first = payload.errors?.[0];
  return first?.detail ?? first?.title ?? "Lemon Squeezy checkout failed";
}

export async function createLemonSqueezyCheckout({
  variantId,
  localOrderId,
  orderName,
  userId,
  userEmail,
  userName,
  serviceId,
  subjectId,
  returnTo,
  successUrl,
}: {
  variantId: string;
  localOrderId: string;
  orderName: string;
  userId: string;
  userEmail: string;
  userName: string;
  serviceId: string;
  subjectId?: string | null;
  returnTo?: string | null;
  successUrl: string;
}) {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const plan = serviceId.split(":")[0];
  const subject = subjectId ?? serviceId.split(":")[1] ?? null;

  if (!apiKey || !storeId) {
    throw new Error("missing Lemon Squeezy API config");
  }

  const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    signal: AbortSignal.timeout(15000),
    headers: {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/vnd.api+json",
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email: userEmail,
            name: userName,
            custom: {
              localOrderId,
              user_id: userId,
              plan,
              subject,
              serviceId,
              subjectId,
              returnTo,
              source: "inhero",
            },
          },
          checkout_options: {
            embed: false,
            media: false,
            logo: true,
            desc: true,
            discount: true,
            dark: true,
          },
          product_options: {
            name: orderName,
            redirect_url: successUrl,
            receipt_button_text: "Return to InHero",
            receipt_link_url: successUrl,
          },
          test_mode: process.env.LEMONSQUEEZY_TEST_MODE === "true",
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: storeId,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: variantId,
            },
          },
        },
      },
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as LemonSqueezyCheckoutResponse;
  const checkoutUrl = payload.data?.attributes?.url;

  if (!response.ok || !checkoutUrl) {
    throw new Error(getLemonSqueezyErrorMessage(payload));
  }

  return {
    checkoutId: payload.data?.id ?? null,
    checkoutUrl,
  };
}

export function verifyLemonSqueezyWebhookSignature(
  rawBody: string,
  signature: string | null
) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("missing Lemon Squeezy webhook secret");
  }

  if (!signature) {
    throw new Error("missing Lemon Squeezy signature");
  }

  const actual = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(signature, "hex");
  const actualBuffer = Buffer.from(actual, "hex");

  if (
    expectedBuffer.length !== actualBuffer.length ||
    !timingSafeEqual(expectedBuffer, actualBuffer)
  ) {
    throw new Error("Lemon Squeezy signature mismatch");
  }
}

export function getLemonSqueezyCustomData(payload: unknown) {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return {};
  }

  const meta = (payload as Record<string, unknown>).meta;
  if (typeof meta !== "object" || meta === null || Array.isArray(meta)) {
    return {};
  }

  const customData = (meta as Record<string, unknown>).custom_data;
  if (
    typeof customData === "object" &&
    customData !== null &&
    !Array.isArray(customData)
  ) {
    return customData as Record<string, unknown>;
  }

  return {};
}
