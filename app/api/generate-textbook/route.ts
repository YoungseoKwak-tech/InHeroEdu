/**
 * Thin proxy to Modal PDF generator.
 * maxDuration=300 covers Modal's ~90s generation time with margin.
 */
export const maxDuration = 300;
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const modalUrl = process.env.MODAL_TEXTBOOK_URL;
    if (!modalUrl) {
      return NextResponse.json(
        { error: "MODAL_TEXTBOOK_URL not configured" },
        { status: 500 }
      );
    }

    const modalRes = await fetch(modalUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!modalRes.ok) {
      const errText = await modalRes.text().catch(() => `HTTP ${modalRes.status}`);
      return NextResponse.json({ error: `Modal error: ${errText}` }, { status: 500 });
    }

    const result = await modalRes.json() as { pdfUrl?: string; pages?: number };
    return NextResponse.json({ success: true, pdfUrl: result.pdfUrl ?? null, pages: result.pages ?? 0 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
