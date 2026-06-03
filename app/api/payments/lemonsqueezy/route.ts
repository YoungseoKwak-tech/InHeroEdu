import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { bindCourseAccessServiceId, buildCourseBoundOrderName } from "@/lib/course-access";
import { courses } from "@/lib/data/courses";
import {
  createLemonSqueezyCheckout,
  getLemonSqueezyVariantIdForService,
  isLemonSqueezyConfigured,
} from "@/lib/lemonsqueezy";
import { createPendingOrder } from "@/lib/orderStore";
import {
  getPaymentCatalogEntry,
  getTextbookPaymentEntry,
} from "@/lib/paymentCatalog";
import { createAdminClient } from "@/lib/supabase";

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

function getRequestOrigin(req: NextRequest) {
  const forwardedProto = req.headers.get("x-forwarded-proto") ?? "https";
  const forwardedHost = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (forwardedHost) return `${forwardedProto}://${forwardedHost}`;
  return new URL(req.url).origin;
}

export async function POST(req: NextRequest) {
  try {
    const authedUser = await requireAuthenticatedUser(req);
    if (authedUser instanceof NextResponse) {
      return authedUser;
    }

    const { serviceId, subjectId, customerName, customerEmail, returnTo } =
      await req.json();

    if (!serviceId) {
      return NextResponse.json({ error: "serviceId required" }, { status: 400 });
    }

    if (!isLemonSqueezyConfigured()) {
      return NextResponse.json(
        { error: "Lemon Squeezy is not configured", scope: "lemonsqueezy_config" },
        { status: 503 }
      );
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
    const boundCourseName = subjectId
      ? courses.find((course) => course.id === subjectId)?.subjectEn ?? subjectId
      : null;
    const boundOrderName = buildCourseBoundOrderName(
      entry.orderName,
      entry.serviceId,
      boundCourseName
    );
    const variantId = getLemonSqueezyVariantIdForService(boundServiceId);

    if (!variantId) {
      return NextResponse.json(
        {
          error: `Lemon Squeezy variant missing for ${boundServiceId}`,
          scope: "lemonsqueezy_config",
        },
        { status: 503 }
      );
    }

    const localOrderId = randomUUID();
    const safeReturnTo = getSafeReturnTo(returnTo);
    const origin = getRequestOrigin(req);
    const successUrl = new URL("/payment/success", origin);
    successUrl.searchParams.set("provider", "lemonsqueezy");
    successUrl.searchParams.set("localOrderId", localOrderId);
    successUrl.searchParams.set("serviceId", boundServiceId);
    if (subjectId) successUrl.searchParams.set("subjectId", subjectId);
    if (safeReturnTo) successUrl.searchParams.set("returnTo", safeReturnTo);

    await createPendingOrder(supabase, {
      id: localOrderId,
      userId: authedUser.id,
      serviceId: boundServiceId,
      orderName: boundOrderName,
      amount: entry.amountUSD,
      currency: "USD",
      kind: entry.kind,
      provider: "lemonsqueezy",
      customerName,
      customerEmail: authedUser.email ?? customerEmail,
    });

    const checkout = await createLemonSqueezyCheckout({
      variantId,
      localOrderId,
      orderName: boundOrderName,
      userEmail: authedUser.email ?? customerEmail ?? "",
      userName: customerName ?? "InHero Student",
      serviceId: boundServiceId,
      subjectId: subjectId ?? null,
      returnTo: safeReturnTo,
      successUrl: successUrl.toString(),
    });

    return NextResponse.json({
      provider: "lemonsqueezy",
      checkoutUrl: checkout.checkoutUrl,
      checkoutId: checkout.checkoutId,
      localOrderId,
      serviceId: boundServiceId,
      subjectId: subjectId ?? null,
      orderName: boundOrderName,
      returnTo: safeReturnTo,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[api/payments/lemonsqueezy] failed", {
      message,
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    });
    return NextResponse.json(
      { error: message || "server error", scope: "lemonsqueezy_checkout" },
      { status: 500 }
    );
  }
}
