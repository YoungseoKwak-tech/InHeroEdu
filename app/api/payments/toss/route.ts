import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import {
  buildUsdQuoteForService,
  buildUsdQuoteForTextbook,
  DEFAULT_TOSS_METHOD,
  DEFAULT_TOSS_PROVIDER,
} from "@/lib/paymentCatalog";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { serviceId, subjectId, userId } = await req.json();

    if (!serviceId) {
      return NextResponse.json({ error: "serviceId required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const clientKey = process.env.TOSS_CLIENT_KEY;
    let amount: number;
    let currency: "USD";
    let orderName: string;
    let resolvedServiceId = serviceId;

    if (!clientKey) {
      return NextResponse.json({ error: "payment key missing" }, { status: 500 });
    }

    if (serviceId === "textbook" && subjectId) {
      // Validate price from DB — never trust client
      const { data: product, error: productError } = await supabase
        .from("textbook_products")
        .select("title, status")
        .eq("subject_id", subjectId)
        .eq("status", "available")
        .single();

      if (productError || !product) {
        return NextResponse.json({ error: "textbook not available" }, { status: 404 });
      }

      const quote = buildUsdQuoteForTextbook(product.title);
      amount = quote.amount;
      currency = quote.currency;
      orderName = quote.orderName;
      resolvedServiceId = `textbook:${subjectId}`;

    } else {
      const quote = buildUsdQuoteForService(serviceId);
      if (!quote) {
        return NextResponse.json({ error: "invalid service" }, { status: 400 });
      }
      amount = quote.amount;
      currency = quote.currency;
      orderName = quote.orderName;
    }

    const orderId = randomUUID();
    const { data, error } = await supabase
      .from("orders")
      .insert({
        id: orderId,
        user_id: userId ?? null,
        service_id: resolvedServiceId,
        order_name: orderName,
        amount_krw: amount,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "db error" }, { status: 500 });
    }

    return NextResponse.json({
      clientKey,
      orderId: data.id,
      amount,
      currency,
      orderName,
      method: DEFAULT_TOSS_METHOD,
      provider: DEFAULT_TOSS_PROVIDER,
      paymentMode: clientKey.startsWith("live_") ? "live" : "test",
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("[api/payments/toss] failed", {
      message,
      stack: e instanceof Error ? e.stack : undefined,
      name: e instanceof Error ? e.name : undefined,
    });
    return NextResponse.json(
      { error: message || "server error", scope: "toss_checkout" },
      { status: 500 }
    );
  }
}
