import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { createPendingOrder } from "@/lib/orderStore";
import { getCreditPackage, creditServiceId } from "@/lib/creditPackages";
import {
  buildNicePayReservedData,
  getNicePayClientId,
  getNicePayMethod,
  isNicePayConfigured,
} from "@/lib/nicepay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getSafeReturnTo(value: unknown) {
  if (typeof value !== "string") return null;
  const t = value.trim();
  if (!t || !t.startsWith("/") || t.startsWith("//") || t.includes("\\")) return null;
  try {
    const parsed = new URL(t, "https://inhero.local");
    if (parsed.origin !== "https://inhero.local") return null;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return null;
  }
}

/** POST /api/payments/nicepay/credits-prepare { packageId, returnTo } */
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(req);
    if (user instanceof NextResponse) return user;

    if (!isNicePayConfigured()) {
      return NextResponse.json({ error: "NICEPAY is not configured", scope: "nicepay_config" }, { status: 503 });
    }

    const { packageId, customerName, returnTo } = await req.json().catch(() => ({}));
    const pkg = getCreditPackage(String(packageId ?? ""));
    if (!pkg) return NextResponse.json({ error: "invalid packageId" }, { status: 400 });

    const serviceId = creditServiceId(pkg.id);
    const localOrderId = randomUUID();
    const safeReturnTo = getSafeReturnTo(returnTo) ?? "/parents";

    const supabase = createAdminClient();
    await createPendingOrder(supabase, {
      id: localOrderId,
      userId: user.id,
      serviceId,
      orderName: pkg.name,
      amount: pkg.krw,
      currency: "KRW",
      kind: "one_time",
      provider: "nicepay",
      customerName,
      customerEmail: user.email ?? undefined,
    });

    const returnUrl = new URL("/api/payments/nicepay/approve", req.nextUrl.origin);
    returnUrl.searchParams.set("returnTo", safeReturnTo);

    return NextResponse.json({
      provider: "nicepay",
      mode: "one_time",
      clientId: getNicePayClientId(),
      method: getNicePayMethod(),
      orderId: localOrderId,
      amount: pkg.krw,
      currency: "KRW",
      goodsName: pkg.name,
      returnUrl: returnUrl.toString(),
      mallReserved: buildNicePayReservedData({
        localOrderId,
        userId: user.id,
        serviceId,
        plan: "credits",
        returnTo: safeReturnTo,
      }),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[nicepay/credits-prepare] failed", message);
    return NextResponse.json({ error: message || "server error", scope: "nicepay_credits_prepare" }, { status: 500 });
  }
}
