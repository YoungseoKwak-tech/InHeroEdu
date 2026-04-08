import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { serviceId, amount, orderName } = await req.json();

    if (!serviceId || !amount || !orderName) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .insert({
        service_id: serviceId,
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

    // Use the DB UUID as Toss orderId
    return NextResponse.json({
      clientKey: process.env.TOSS_CLIENT_KEY,
      orderId: data.id,
      amount,
      orderName,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
