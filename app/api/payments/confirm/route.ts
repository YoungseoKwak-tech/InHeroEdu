import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await req.json();

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }

    const secretKey = process.env.TOSS_SECRET_KEY!;
    const authHeader = `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`;

    // 1. Confirm with Toss
    const tossRes = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: { Authorization: authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ paymentKey, orderId, amount: Number(amount) }),
      }
    );

    const tossData = await tossRes.json();
    const supabase = createAdminClient();

    if (!tossRes.ok) {
      await supabase.from("orders").update({ status: "failed" }).eq("id", orderId);
      return NextResponse.json(
        { error: tossData.message ?? "payment failed" },
        { status: 400 }
      );
    }

    // 2. Mark paid
    await supabase.from("orders").update({ status: "paid" }).eq("id", orderId);

    return NextResponse.json({ success: true, tossData });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
