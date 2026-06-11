import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { listStoredOrdersForUser } from "@/lib/orderStore";
import { createAdminClient } from "@/lib/supabase";
import { TEXTBOOK_PRICE_USD } from "@/lib/textbookPricing";
import { normalizeCourseAccessSubjectId } from "@/lib/course-access";
import { courses } from "@/lib/data/courses";

interface NicePayBillingKeyRow {
  id: string;
  provider: string | null;
  service_id: string;
  subject_id: string | null;
  status: string;
  next_billing_at: string | null;
  last_billed_at: string | null;
  last_order_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

const courseNameById = new Map(courses.map((course) => [course.id, course.subjectEn]));

function isMissingSchemaObject(error: { message?: string } | null | undefined) {
  const message = error?.message ?? "";
  return /schema cache|could not find|relation .* does not exist/i.test(message);
}

function subjectNameFromServiceId(serviceId: string) {
  const [, rawSubjectId] = serviceId.split(":");
  const subjectId = normalizeCourseAccessSubjectId(rawSubjectId);
  return subjectId ? courseNameById.get(subjectId) ?? subjectId : null;
}

function englishOrderName(serviceId: string, fallback: string) {
  const normalizedServiceId = serviceId.toLowerCase();

  if (normalizedServiceId === "all_subjects" || normalizedServiceId === "novapass") {
    return "All Subject Elite Pass";
  }

  if (normalizedServiceId === "one_subject") {
    return "One Subject Elite Pass";
  }

  if (normalizedServiceId.startsWith("one_subject:") || normalizedServiceId.startsWith("single:")) {
    const subjectName = subjectNameFromServiceId(normalizedServiceId.replace(/^single:/, "one_subject:"));
    return subjectName ? `One Subject Elite Pass — ${subjectName}` : "One Subject Elite Pass";
  }

  if (normalizedServiceId.startsWith("textbook:")) {
    const subjectId = normalizedServiceId.slice("textbook:".length);
    const subjectName = courseNameById.get(subjectId) ?? subjectId;
    return `${subjectName} Textbook`;
  }

  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(fallback) ? "InHero purchase" : fallback;
}

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  try {
    const supabase = createAdminClient();

    const [orders, purchasesRes, productsRes, billingKeysRes] = await Promise.all([
      listStoredOrdersForUser(supabase, user.id),
      supabase
        .from("textbook_purchases")
        .select("subject_id, order_id")
        .eq("user_id", user.id),
      supabase
        .from("textbook_products")
        .select("subject_id, title, pdf_url, price_krw, status"),
      supabase
        .from("nicepay_billing_keys")
        .select(
          "id, provider, service_id, subject_id, status, next_billing_at, last_billed_at, last_order_id, created_at, updated_at"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ]);

    if (purchasesRes.error) {
      return NextResponse.json({ error: purchasesRes.error.message }, { status: 500 });
    }

    if (productsRes.error) {
      return NextResponse.json({ error: productsRes.error.message }, { status: 500 });
    }

    if (billingKeysRes.error && !isMissingSchemaObject(billingKeysRes.error)) {
      return NextResponse.json({ error: billingKeysRes.error.message }, { status: 500 });
    }

    const productMap = new Map(
      (productsRes.data ?? []).map((product) => [product.subject_id, product])
    );

    const normalizedOrders = orders
      .filter((order) => order.status === "paid")
      .map((order) => ({
        id: order.id,
        service_id: order.serviceId,
        order_name: englishOrderName(order.serviceId, order.orderName),
        amount: Number(order.amount ?? 0),
        currency: order.currency,
        status: order.status,
        created_at: order.createdAt,
      }));

    const manuals = (purchasesRes.data ?? [])
      .map((purchase) => {
        const product = productMap.get(purchase.subject_id);

        return {
          subjectId: purchase.subject_id,
          orderId: purchase.order_id,
          title: product?.title ?? purchase.subject_id,
          pdfUrl: product?.pdf_url ?? null,
          priceAmount: product ? TEXTBOOK_PRICE_USD : null,
          priceCurrency: product ? "USD" : null,
          status: product?.status ?? null,
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title, "en"));

    const subscriptions = ((billingKeysRes.error ? [] : billingKeysRes.data ?? []) as NicePayBillingKeyRow[]).map((subscription) => ({
      id: subscription.id,
      provider: subscription.provider ?? "nicepay",
      service_id: subscription.service_id,
      subject_id: subscription.subject_id,
      status: subscription.status,
      next_billing_at: subscription.next_billing_at,
      last_billed_at: subscription.last_billed_at,
      last_order_id: subscription.last_order_id,
      created_at: subscription.created_at,
      updated_at: subscription.updated_at,
      can_cancel: subscription.status === "active",
    }));

    return NextResponse.json({
      orders: normalizedOrders,
      manuals,
      subscriptions,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load billing." },
      { status: 500 }
    );
  }
}
