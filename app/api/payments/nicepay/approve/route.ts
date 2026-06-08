import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import {
  getStoredOrder,
  markStoredOrderFailed,
  markStoredOrderPaid,
} from "@/lib/orderStore";
import { grantPurchasedCredits } from "@/lib/credits-server";
import {
  approveNicePayPayment,
  getNicePayAmount,
  getNicePayOrderId,
  getNicePayResultMessage,
  getNicePayTid,
  isNicePaySuccess,
  verifyNicePayApprovalSignature,
  verifyNicePayAuthSignature,
} from "@/lib/nicepay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getSafeReturnTo(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || !trimmed.startsWith("/") || trimmed.startsWith("//")) return null;
  if (trimmed.includes("\\")) return null;

  try {
    const parsed = new URL(trimmed, "https://inhero.local");
    if (parsed.origin !== "https://inhero.local") return null;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return null;
  }
}

function setParams(target: URL, params: Record<string, string | null | undefined>) {
  for (const [key, value] of Object.entries(params)) {
    if (value) target.searchParams.set(key, value);
  }
}

function buildSuccessUrl(req: NextRequest, input: {
  localOrderId: string;
  serviceId: string;
  returnTo?: string | null;
}) {
  const url = new URL("/payment/success", req.nextUrl.origin);
  setParams(url, {
    provider: "nicepay",
    localOrderId: input.localOrderId,
    serviceId: input.serviceId,
    returnTo: input.returnTo,
  });
  return url;
}

function buildFailUrl(req: NextRequest, input: {
  serviceId?: string | null;
  code?: string | null;
  message?: string | null;
  returnTo?: string | null;
}) {
  const url = new URL("/payment/fail", req.nextUrl.origin);
  setParams(url, {
    provider: "nicepay",
    serviceId: input.serviceId,
    code: input.code,
    message: input.message,
    returnTo: input.returnTo,
  });
  return url;
}

async function parseNicePayCallback(req: NextRequest) {
  const payload: Record<string, unknown> = {};
  req.nextUrl.searchParams.forEach((value, key) => {
    payload[key] = value;
  });

  if (req.method === "GET") return payload;

  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const json = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    return { ...payload, ...json };
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await req.formData();
    form.forEach((value, key) => {
      payload[key] = typeof value === "string" ? value : value.name;
    });
    return payload;
  }

  const text = await req.text().catch(() => "");
  if (text) {
    const params = new URLSearchParams(text);
    params.forEach((value, key) => {
      payload[key] = value;
    });
  }
  return payload;
}

async function handleNicePayApproval(req: NextRequest) {
  const payload = await parseNicePayCallback(req);
  const localOrderId = getNicePayOrderId(payload);
  const tid = getNicePayTid(payload);
  const callbackAmount = getNicePayAmount(payload);
  const safeReturnTo = getSafeReturnTo(payload.returnTo ?? req.nextUrl.searchParams.get("returnTo"));
  const supabase = createAdminClient();

  if (!localOrderId) {
    return NextResponse.redirect(
      buildFailUrl(req, {
        code: "missing_order",
        message: "NICEPAY order id missing.",
        returnTo: safeReturnTo,
      }),
      303
    );
  }

  const storedOrder = await getStoredOrder(supabase, localOrderId);
  if (!storedOrder) {
    return NextResponse.redirect(
      buildFailUrl(req, {
        code: "order_not_found",
        message: "Payment order was not found.",
        returnTo: safeReturnTo,
      }),
      303
    );
  }

  if (storedOrder.status === "paid") {
    return NextResponse.redirect(
      buildSuccessUrl(req, {
        localOrderId,
        serviceId: storedOrder.serviceId,
        returnTo: safeReturnTo,
      }),
      303
    );
  }

  if (!tid) {
    await markStoredOrderFailed(supabase, localOrderId, payload, "nicepay");
    return NextResponse.redirect(
      buildFailUrl(req, {
        serviceId: storedOrder.serviceId,
        code: "missing_tid",
        message: "NICEPAY transaction id missing.",
        returnTo: safeReturnTo,
      }),
      303
    );
  }

  if (!isNicePaySuccess(payload)) {
    await markStoredOrderFailed(supabase, localOrderId, payload, "nicepay");
    return NextResponse.redirect(
      buildFailUrl(req, {
        serviceId: storedOrder.serviceId,
        code: "auth_failed",
        message: getNicePayResultMessage(payload),
        returnTo: safeReturnTo,
      }),
      303
    );
  }

  if (callbackAmount !== null && callbackAmount !== storedOrder.amount) {
    await markStoredOrderFailed(supabase, localOrderId, payload, "nicepay");
    return NextResponse.redirect(
      buildFailUrl(req, {
        serviceId: storedOrder.serviceId,
        code: "amount_mismatch",
        message: "Payment amount mismatch.",
        returnTo: safeReturnTo,
      }),
      303
    );
  }

  if (!verifyNicePayAuthSignature(payload)) {
    await markStoredOrderFailed(supabase, localOrderId, payload, "nicepay");
    return NextResponse.redirect(
      buildFailUrl(req, {
        serviceId: storedOrder.serviceId,
        code: "signature_mismatch",
        message: "Payment signature mismatch.",
        returnTo: safeReturnTo,
      }),
      303
    );
  }

  let approval: Record<string, unknown>;
  try {
    approval = await approveNicePayPayment({
      tid,
      amount: storedOrder.amount,
    });
  } catch (error) {
    const errorPayload = {
      callback: payload,
      approvalError: error instanceof Error ? error.message : "NICEPAY approval failed",
    };
    await markStoredOrderFailed(supabase, localOrderId, errorPayload, "nicepay");
    return NextResponse.redirect(
      buildFailUrl(req, {
        serviceId: storedOrder.serviceId,
        code: "approval_failed",
        message: errorPayload.approvalError,
        returnTo: safeReturnTo,
      }),
      303
    );
  }

  const approvedOrderId = getNicePayOrderId(approval);
  const approvedAmount = getNicePayAmount(approval);
  if (approvedOrderId && approvedOrderId !== localOrderId) {
    await markStoredOrderFailed(supabase, localOrderId, approval, "nicepay");
    return NextResponse.redirect(
      buildFailUrl(req, {
        serviceId: storedOrder.serviceId,
        code: "approved_order_mismatch",
        message: "Approved order id mismatch.",
        returnTo: safeReturnTo,
      }),
      303
    );
  }

  if (approvedAmount !== null && approvedAmount !== storedOrder.amount) {
    await markStoredOrderFailed(supabase, localOrderId, approval, "nicepay");
    return NextResponse.redirect(
      buildFailUrl(req, {
        serviceId: storedOrder.serviceId,
        code: "approved_amount_mismatch",
        message: "Approved amount mismatch.",
        returnTo: safeReturnTo,
      }),
      303
    );
  }

  if (!verifyNicePayApprovalSignature(approval)) {
    await markStoredOrderFailed(supabase, localOrderId, approval, "nicepay");
    return NextResponse.redirect(
      buildFailUrl(req, {
        serviceId: storedOrder.serviceId,
        code: "approval_signature_mismatch",
        message: "Approval signature mismatch.",
        returnTo: safeReturnTo,
      }),
      303
    );
  }

  if (!isNicePaySuccess(approval)) {
    await markStoredOrderFailed(supabase, localOrderId, approval, "nicepay");
    return NextResponse.redirect(
      buildFailUrl(req, {
        serviceId: storedOrder.serviceId,
        code: "not_paid",
        message: getNicePayResultMessage(approval),
        returnTo: safeReturnTo,
      }),
      303
    );
  }

  await markStoredOrderPaid(supabase, localOrderId, {
    userId: storedOrder.userId,
    provider: "nicepay",
    providerOrderId: tid,
    rawResponse: {
      callback: payload,
      approval,
    },
  });

  // Credit-package orders: grant the purchased credits to the account.
  if (storedOrder.serviceId.startsWith("credits:") && storedOrder.userId) {
    try {
      await grantPurchasedCredits(supabase, storedOrder.userId, storedOrder.serviceId);
    } catch (e) {
      console.error("[nicepay/approve] grantPurchasedCredits failed", e);
    }
  }

  return NextResponse.redirect(
    buildSuccessUrl(req, {
      localOrderId,
      serviceId: storedOrder.serviceId,
      returnTo: safeReturnTo,
    }),
    303
  );
}

export async function GET(req: NextRequest) {
  return handleNicePayApproval(req);
}

export async function POST(req: NextRequest) {
  return handleNicePayApproval(req);
}
