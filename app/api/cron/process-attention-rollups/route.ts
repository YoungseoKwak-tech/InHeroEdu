import { NextRequest, NextResponse } from "next/server";
import { processAttentionRollupQueue } from "@/lib/attentionRollups";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  if (expected) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${expected}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await processAttentionRollupQueue({ limit: 25, leaseSeconds: 300 });
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("[cron:process-attention-rollups]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
