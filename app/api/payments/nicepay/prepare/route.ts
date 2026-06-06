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
  getNicePayTextbookQuote,
  isNicePayConfigured,
  type NicePayQuote,
} from "@/lib/nicepay";
import { isPublicTextbookProduct } from "@/lib/textbookProducts";

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

    const supabase = createAdminClient();
    const requestedSubjectId =
      typeof subjectId === "string" && subjectId.trim() ? subjectId.trim() : null;
    const textbookSubjectId = serviceId.startsWith("textbook:")
      ? serviceId.slice("textbook:".length).trim()
      : null;

    let quote: NicePayQuote;
    let boundServiceId: string;
    let orderName: string;
    let reservedSubjectId: string | null = requestedSubjectId;

    if (textbookSubjectId) {
      if (requestedSubjectId && requestedSubjectId !== textbookSubjectId) {
        return NextResponse.json(
          { error: "subjectId mismatch for textbook checkout" },
          { status: 400 }
        );
      }

      const { data: product, error: productError } = await supabase
        .from("textbook_products")
        .select("subject_id, title, pdf_url, price_krw, status")
        .eq("subject_id", textbookSubjectId)
        .maybeSingle();

      if (productError) {
        return NextResponse.json({ error: productError.message }, { status: 500 });
      }

      if (!product || !isPublicTextbookProduct(product)) {
        return NextResponse.json({ error: "textbook not available" }, { status: 404 });
      }

      quote = getNicePayTextbookQuote({
        title: `${product.title} e-book`,
        priceKrw: product.price_krw,
      });

      if (amount !== undefined && amount !== null) {
        const numericAmount = Number(amount);
        if (!Number.isFinite(numericAmount) || numericAmount !== quote.chargeAmount) {
          return NextResponse.json(
            { error: "NICEPAY charge amount mismatch" },
            { status: 400 }
          );
        }
      }

      boundServiceId = `textbook:${product.subject_id}`;
      orderName = quote.orderName;
      reservedSubjectId = product.subject_id;
    } else {
      quote = assertRequestedNicePayPrice({
        serviceId,
        requestedChargeAmount: amount,
      });

      if (quote.plan === "one_subject" && !requestedSubjectId) {
        return NextResponse.json(
          { error: "subjectId required for one_subject" },
          { status: 400 }
        );
      }

      boundServiceId = bindCourseAccessServiceId(serviceId, requestedSubjectId);
      const courseName = requestedSubjectId
        ? courses.find((course) => course.id === requestedSubjectId)?.subjectEn ??
          requestedSubjectId
        : null;
      orderName = buildCourseBoundOrderName(quote.orderName, serviceId, courseName);
    }

    const localOrderId = randomUUID();
    const safeReturnTo = getSafeReturnTo(returnTo);

    await createPendingOrder(supabase, {
      id: localOrderId,
      userId: user.id,
      serviceId: boundServiceId,
      orderName,
      amount: quote.chargeAmount,
      currency: quote.chargeCurrency,
      kind: quote.kind,
      provider: "nicepay",
      customerName,
      customerEmail: user.email ?? customerEmail,
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
      returnUrl: returnUrl.toString(),
      mallReserved: buildNicePayReservedData({
        localOrderId,
        userId: user.id,
        serviceId: boundServiceId,
        subjectId: reservedSubjectId,
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
