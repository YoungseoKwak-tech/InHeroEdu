import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createAdminClient } from "@/lib/supabase";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createPendingOrder } from "@/lib/orderStore";
import { courses } from "@/lib/data/courses";
import {
  bindCourseAccessServiceId,
  buildCourseBoundOrderName,
} from "@/lib/course-access";
import {
  getPaymentCatalogEntry,
  getTextbookPaymentEntry,
} from "@/lib/paymentCatalog";
import {
  createPayPalSubscription,
  createPayPalOrder,
  ensurePayPalSubscriptionPlan,
  getPayPalMode,
} from "@/lib/paypal";
import { attachStoredOrderProviderDetails } from "@/lib/orderStore";

function getSafeReturnTo(value: unknown) {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed || !trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return null;
  }

  // Backslashes can be normalized by browsers into URL separators, so reject
  // them instead of trying to repair a suspicious redirect target.
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
    const authedUser = await requireAuthenticatedUser(req);
    if (authedUser instanceof NextResponse) {
      return authedUser;
    }

    const {
      serviceId,
      subjectId,
      customerName,
      customerEmail,
      returnTo,
    } = await req.json();

    if (!serviceId) {
      return NextResponse.json({ error: "serviceId required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    let entry = getPaymentCatalogEntry(serviceId);

    if (serviceId === "textbook" && subjectId) {
      const { data: product, error: productError } = await supabase
        .from("textbook_products")
        .select("title, status")
        .eq("subject_id", subjectId)
        .eq("status", "available")
        .single();

      if (productError || !product) {
        return NextResponse.json({ error: "textbook not available" }, { status: 404 });
      }

      entry = getTextbookPaymentEntry(product.title, subjectId);
    }

    if (!entry) {
      return NextResponse.json({ error: "invalid service" }, { status: 400 });
    }

    const boundServiceId = bindCourseAccessServiceId(entry.serviceId, subjectId);
    const boundCourseName =
      subjectId
        ? courses.find((course) => course.id === subjectId)?.subjectEn ?? subjectId
        : null;
    const boundOrderName = buildCourseBoundOrderName(
      entry.orderName,
      entry.serviceId,
      boundCourseName
    );

    const localOrderId = randomUUID();
    const origin = req.nextUrl.origin;
    const safeReturnTo = getSafeReturnTo(returnTo);
    const successUrl = new URL("/payment/success", origin);
    successUrl.searchParams.set("provider", "paypal");
    successUrl.searchParams.set("localOrderId", localOrderId);
    successUrl.searchParams.set("serviceId", boundServiceId);
    if (subjectId) {
      successUrl.searchParams.set("subjectId", subjectId);
    }
    if (safeReturnTo) {
      successUrl.searchParams.set("returnTo", safeReturnTo);
    }

    const failUrl = new URL("/payment/fail", origin);
    failUrl.searchParams.set("provider", "paypal");
    failUrl.searchParams.set("serviceId", boundServiceId);
    if (subjectId) {
      failUrl.searchParams.set("subjectId", subjectId);
    }
    if (safeReturnTo) {
      failUrl.searchParams.set("returnTo", safeReturnTo);
    }

    await createPendingOrder(supabase, {
      id: localOrderId,
      userId: authedUser.id,
      serviceId: boundServiceId,
      orderName: boundOrderName,
      amount: entry.amountUSD,
      currency: "USD",
      kind: entry.kind,
      customerName,
      customerEmail: authedUser.email ?? customerEmail,
    });

    const paymentMode = await getPayPalMode();

    if (entry.kind === "subscription") {
      const planId = await ensurePayPalSubscriptionPlan(entry);
      const subscription = await createPayPalSubscription({
        localOrderId,
        planId,
        returnUrl: successUrl.toString(),
        cancelUrl: failUrl.toString(),
        customerName,
        customerEmail: authedUser.email ?? customerEmail,
      });

      await attachStoredOrderProviderDetails(supabase, localOrderId, {
        providerSubscriptionId: subscription.id,
        rawResponse: subscription,
      });

      return NextResponse.json({
        kind: "subscription",
        localOrderId,
        approveUrl: subscription.approveUrl,
        planId,
        amount: entry.amountUSD,
        currency: entry.currency,
        orderName: boundOrderName,
        paymentMode,
      });
    }

    const order = await createPayPalOrder({
      localOrderId,
      amountUSD: entry.amountUSD,
      orderName: entry.orderName,
      returnUrl: successUrl.toString(),
      cancelUrl: failUrl.toString(),
      customerEmail: authedUser.email ?? customerEmail,
    });

    await attachStoredOrderProviderDetails(supabase, localOrderId, {
      providerOrderId: order.id,
      rawResponse: order,
    });

    return NextResponse.json({
      kind: "one_time",
      localOrderId,
      approveUrl: order.approveUrl,
      paypalOrderId: order.id,
      amount: entry.amountUSD,
      currency: entry.currency,
      orderName: boundOrderName,
      paymentMode,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[api/payments/paypal] failed", {
      message,
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    });
    return NextResponse.json(
      { error: message || "server error", scope: "paypal_checkout" },
      { status: 500 }
    );
  }
}
