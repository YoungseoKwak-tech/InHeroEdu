import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { createPendingOrder } from "@/lib/orderStore";
import { courses } from "@/lib/data/courses";
import {
  bindCourseAccessServiceId,
  buildCourseBoundOrderName,
} from "@/lib/course-access";
import {
  assertRequestedNicePayPrice,
  buildNicePayReservedData,
  getNicePayClientId,
  getNicePayMethod,
  isNicePayConfigured,
} from "@/lib/nicepay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getSafeReturnTo(value: unknown) {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed || !trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return null;
  }

  if (trimmed.includes("\\")) return null;

  try {
    const parsed = new URL(trimmed, "https://inhero.local");
    if (parsed.origin !== "https://inhero.local") return null;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return null;
  }
}

function getBuyerName(customerName: unknown, fallbackEmail?: string | null) {
  if (typeof customerName === "string" && customerName.trim()) {
    return customerName.trim();
  }

  return fallbackEmail?.split("@")[0] || "InHero Student";
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(req);
    if (user instanceof NextResponse) return user;

    if (!isNicePayConfigured()) {
      return NextResponse.json(
        { error: "NICEPAY is not configured", scope: "nicepay_config" },
        { status: 503 }
      );
    }

    const {
      serviceId,
      subjectId,
      amount,
      customerName,
      customerEmail,
      returnTo,
    } = await req.json();

    if (typeof serviceId !== "string" || !serviceId) {
      return NextResponse.json({ error: "serviceId required" }, { status: 400 });
    }

    const quote = assertRequestedNicePayPrice({
      serviceId,
      requestedChargeAmount: amount,
    });

    if (quote.plan === "one_subject" && !subjectId) {
      return NextResponse.json(
        { error: "subjectId required for one_subject" },
        { status: 400 }
      );
    }

    const boundServiceId = bindCourseAccessServiceId(serviceId, subjectId);
    const courseName =
      typeof subjectId === "string"
        ? courses.find((course) => course.id === subjectId)?.subjectEn ?? subjectId
        : null;
    const orderName = buildCourseBoundOrderName(
      quote.orderName,
      serviceId,
      courseName
    );
    const localOrderId = randomUUID();
    const safeReturnTo = getSafeReturnTo(returnTo);
    const buyerEmail = user.email ?? (typeof customerEmail === "string" ? customerEmail : null);
    const buyerName = getBuyerName(customerName, buyerEmail);

    const supabase = createAdminClient();
    await createPendingOrder(supabase, {
      id: localOrderId,
      userId: user.id,
      serviceId: boundServiceId,
      orderName,
      amount: quote.chargeAmount,
      currency: quote.chargeCurrency,
      kind: quote.kind,
      provider: "nicepay",
      customerName: buyerName,
      customerEmail: buyerEmail ?? undefined,
    });

    const origin = req.nextUrl.origin;
    const returnUrl = new URL("/api/payments/nicepay/approve", origin);
    if (safeReturnTo) returnUrl.searchParams.set("returnTo", safeReturnTo);

    return NextResponse.json({
      provider: "nicepay",
      mode: quote.kind === "subscription" ? "subscription_first_payment" : "one_time",
      clientId: getNicePayClientId(),
      method: getNicePayMethod(),
      orderId: localOrderId,
      amount: quote.chargeAmount,
      currency: quote.chargeCurrency,
      displayAmountUSD: quote.displayAmountUSD,
      goodsName: orderName,
      buyerName,
      buyerEmail,
      returnUrl: returnUrl.toString(),
      mallReserved: buildNicePayReservedData({
        localOrderId,
        userId: user.id,
        serviceId: boundServiceId,
        subjectId: typeof subjectId === "string" ? subjectId : null,
        plan: quote.plan,
        returnTo: safeReturnTo,
      }),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[api/payments/nicepay/prepare] failed", {
      message,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: message || "server error", scope: "nicepay_prepare" },
      { status: 500 }
    );
  }
}
