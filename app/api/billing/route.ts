import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { inferStoredOrderCurrency } from "@/lib/paymentCatalog";
import { createAdminClient } from "@/lib/supabase";
import { TEXTBOOK_PRICE_USD } from "@/lib/textbookPricing";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();

  const [ordersRes, purchasesRes, productsRes] = await Promise.all([
    supabase
      .from("orders")
      .select("id, service_id, order_name, amount_krw, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("textbook_purchases")
      .select("subject_id, order_id")
      .eq("user_id", user.id),
    supabase
      .from("textbook_products")
      .select("subject_id, title, pdf_url, price_krw, status"),
  ]);

  if (ordersRes.error) {
    return NextResponse.json({ error: ordersRes.error.message }, { status: 500 });
  }

  if (purchasesRes.error) {
    return NextResponse.json({ error: purchasesRes.error.message }, { status: 500 });
  }

  if (productsRes.error) {
    return NextResponse.json({ error: productsRes.error.message }, { status: 500 });
  }

  const productMap = new Map(
    (productsRes.data ?? []).map((product) => [product.subject_id, product])
  );

  const orders = (ordersRes.data ?? []).map((order) => ({
    id: order.id,
    service_id: order.service_id,
    order_name: order.order_name,
    amount: Number(order.amount_krw ?? 0),
    currency: inferStoredOrderCurrency(order.service_id ?? "", Number(order.amount_krw ?? 0)),
    status: order.status,
    created_at: order.created_at,
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
    orders,
    manuals,
  });
}
