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
import { getPaymentCatalogEntry } from "@/lib/paymentCatalog";
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

function getPlanSubjectRequirement(serviceId: string, subjectId: unknown) {
  if (serviceId === "one_subject") {
    const normalizedSubject = typeof subjectId === "string" ? subjectId.trim() : "";
    if (!normalizedSubject) {
      return { error: "subjectId required for one_subject", subjectId: null };
    }

    return { error: null, subjectId: normalizedSubject };
  }

  if (serviceId === "all_subjects") {
    return { error: null, subjectId: null };
  }

  return { error: "invalid Lemon Squeezy plan", subjectId: null };
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

    const planValidation = getPlanSubjectRequirement(serviceId, subjectId);
    if (planValidation.error) {
      return NextResponse.json({ error: planValidation.error }, { status: 400 });
    }

    const entry = getPaymentCatalogEntry(serviceId);

    if (!entry) {
      return NextResponse.json({ error: "invalid service" }, { status: 400 });
    }

    const boundServiceId = bindCourseAccessServiceId(entry.serviceId, planValidation.subjectId);
    const boundCourseName = planValidation.subjectId
      ? courses.find((course) => course.id === planValidation.subjectId)?.subjectEn ?? planValidation.subjectId
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
    if (planValidation.subjectId) successUrl.searchParams.set("subjectId", planValidation.subjectId);
    if (safeReturnTo) successUrl.searchParams.set("returnTo", safeReturnTo);

    const supabase = createAdminClient();

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
      userId: authedUser.id,
      userEmail: authedUser.email ?? customerEmail ?? "",
      userName: customerName ?? "InHero Student",
      serviceId: boundServiceId,
      subjectId: planValidation.subjectId,
      returnTo: safeReturnTo,
      successUrl: successUrl.toString(),
    });

    return NextResponse.json({
      provider: "lemonsqueezy",
      checkoutUrl: checkout.checkoutUrl,
      checkoutId: checkout.checkoutId,
      localOrderId,
      serviceId: boundServiceId,
      subjectId: planValidation.subjectId,
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
