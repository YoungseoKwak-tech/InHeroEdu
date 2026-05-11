import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { listStoredOrdersForUser } from "@/lib/orderStore";
import { createAdminClient } from "@/lib/supabase";
import { TEXTBOOK_PRICE_USD } from "@/lib/textbookPricing";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  try {
    const supabase = createAdminClient();

    const [orders, purchasesRes, productsRes] = await Promise.all([
      listStoredOrdersForUser(supabase, user.id),
      supabase
        .from("textbook_purchases")
        .select("subject_id, order_id")
        .eq("user_id", user.id),
      supabase
        .from("textbook_products")
        .select("subject_id, title, pdf_url, price_krw, status"),
    ]);

    if (purchasesRes.error) {
      return NextResponse.json({ error: purchasesRes.error.message }, { status: 500 });
    }

    if (productsRes.error) {
      return NextResponse.json({ error: productsRes.error.message }, { status: 500 });
    }

    const productMap = new Map(
      (productsRes.data ?? []).map((product) => [product.subject_id, product])
    );

    const normalizedOrders = orders.map((order) => ({
      id: order.id,
      service_id: order.serviceId,
      order_name: order.orderName,
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

    return NextResponse.json({
      orders: normalizedOrders,
      manuals,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load billing." },
      { status: 500 }
    );
  }
}
