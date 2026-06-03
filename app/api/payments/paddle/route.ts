import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { bindCourseAccessServiceId, buildCourseBoundOrderName } from "@/lib/course-access";
import { courses } from "@/lib/data/courses";
import { createPendingOrder } from "@/lib/orderStore";
import {
  getPaymentCatalogEntry,
  getTextbookPaymentEntry,
} from "@/lib/paymentCatalog";
import {
  getPaddleClientToken,
  getPaddleEnvironment,
  getPaddlePriceIdForService,
} from "@/lib/paddle";
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

    const clientToken = getPaddleClientToken();
    if (!clientToken) {
      return NextResponse.json(
        { error: "Paddle client token missing", scope: "paddle_config" },
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
    const priceId = getPaddlePriceIdForService(boundServiceId);

    if (!priceId) {
      return NextResponse.json(
        { error: `Paddle price missing for ${boundServiceId}`, scope: "paddle_config" },
        { status: 503 }
      );
    }

    const localOrderId = randomUUID();
    const safeReturnTo = getSafeReturnTo(returnTo);

    await createPendingOrder(supabase, {
      id: localOrderId,
      userId: authedUser.id,
      serviceId: boundServiceId,
      orderName: boundOrderName,
      amount: entry.amountUSD,
      currency: "USD",
      kind: entry.kind,
      provider: "paddle",
      customerName,
      customerEmail: authedUser.email ?? customerEmail,
    });

    return NextResponse.json({
      provider: "paddle",
      environment: getPaddleEnvironment(),
      clientToken,
      priceId,
      localOrderId,
      serviceId: boundServiceId,
      subjectId: subjectId ?? null,
      orderName: boundOrderName,
      returnTo: safeReturnTo,
      customer: {
        email: authedUser.email ?? customerEmail ?? "",
        name: customerName ?? "InHero Student",
      },
      customData: {
        localOrderId,
        serviceId: boundServiceId,
        subjectId: subjectId ?? null,
        source: "inhero",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[api/payments/paddle] failed", {
      message,
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    });
    return NextResponse.json(
      { error: message || "server error", scope: "paddle_checkout" },
      { status: 500 }
    );
  }
}
