import { NextResponse } from "next/server";
import { getPayPalMode, isPayPalConfigured } from "@/lib/paypal";

export const dynamic = "force-dynamic";

export async function GET() {
  const configured = isPayPalConfigured();

  if (!configured) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        oauthReady: false,
        mode: null,
        error: "PayPal environment variables are missing.",
      },
      { status: 503 }
    );
  }

  try {
    const mode = await getPayPalMode();
    return NextResponse.json({
      ok: true,
      configured: true,
      oauthReady: true,
      mode,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        oauthReady: false,
        mode: null,
        error:
          error instanceof Error ? error.message : "PayPal runtime health check failed.",
      },
      { status: 502 }
    );
  }
}
