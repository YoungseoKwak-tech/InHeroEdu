import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { getAuthenticatedUser } from "@/lib/auth";
import { inferStoredOrderCurrency } from "@/lib/paymentCatalog";

function createTossAuthHeader() {
  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    throw new Error("missing toss secret key");
  }

  return `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`;
}

async function confirmLegacyTextbookPayment({
  supabase,
  paymentKey,
  orderId,
  subjectId,
  userId,
}: {
  supabase: ReturnType<typeof createAdminClient>;
  paymentKey: string;
  orderId: string;
  subjectId: string;
  userId: string | null;
}) {
  const { data: product, error: productError } = await supabase
    .from("textbook_products")
    .select("title, price_krw, status")
    .eq("subject_id", subjectId)
    .eq("status", "available")
    .single();

  if (productError || !product) {
    return NextResponse.json({ error: "textbook not available" }, { status: 404 });
  }

  const tossRes = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: createTossAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paymentKey,
      orderId,
      amount: Number(product.price_krw),
    }),
  });

  const tossData = await tossRes.json();
  if (!tossRes.ok) {
    return NextResponse.json(
      { error: tossData.message ?? "payment failed" },
      { status: 400 }
    );
  }

  if (userId) {
    await supabase
      .from("textbook_purchases")
      .upsert(
        { user_id: userId, subject_id: subjectId, order_id: orderId },
        { onConflict: "user_id,subject_id" }
      );
  }

  return NextResponse.json({
    success: true,
    tossData,
    order: {
      id: orderId,
      serviceId: `textbook:${subjectId}`,
      orderName: product.title,
      amountKRW: product.price_krw,
      currency: "KRW",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { paymentKey, orderId, serviceId, subjectId } = await req.json();

    if (!paymentKey || !orderId) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const authedUser = await getAuthenticatedUser(req);
    const authedUserId = authedUser?.id ?? null;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, amount_krw, status, service_id, order_name, user_id")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      if (serviceId === "textbook" && subjectId) {
        return confirmLegacyTextbookPayment({
          supabase,
          paymentKey,
          orderId,
          subjectId,
          userId: authedUserId,
        });
      }

      return NextResponse.json({ error: "order not found" }, { status: 404 });
    }

    const tossRes = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        Authorization: createTossAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: Number(order.amount_krw),
      }),
    });

    const tossData = await tossRes.json();

    if (!tossRes.ok) {
      await supabase.from("orders").update({ status: "failed" }).eq("id", orderId);
      return NextResponse.json(
        { error: tossData.message ?? "payment failed" },
        { status: 400 }
      );
    }

    const effectiveUserId = authedUserId ?? order.user_id ?? null;
    const orderUpdate: { status: string; user_id?: string } = { status: "paid" };
    if (effectiveUserId && !order.user_id) {
      orderUpdate.user_id = effectiveUserId;
    }

    await supabase.from("orders").update(orderUpdate).eq("id", orderId);

    const orderServiceId: string = order.service_id ?? "";
    if (orderServiceId.startsWith("textbook:") && effectiveUserId) {
      const textbookSubjectId = orderServiceId.replace("textbook:", "");

      await supabase
        .from("textbook_purchases")
        .upsert(
          { user_id: effectiveUserId, subject_id: textbookSubjectId, order_id: orderId },
          { onConflict: "user_id,subject_id" }
        );
    }

    return NextResponse.json({
      success: true,
      tossData,
      order: {
        id: order.id,
        serviceId: order.service_id,
        orderName: order.order_name,
        amount: order.amount_krw,
        currency: inferStoredOrderCurrency(order.service_id ?? "", Number(order.amount_krw)),
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
