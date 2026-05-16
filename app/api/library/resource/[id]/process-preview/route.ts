import { NextRequest, NextResponse } from "next/server";
import { generatePreviewsForResource } from "@/lib/previewGenerator";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/library/resource/[id]/process-preview
 *
 * Internal endpoint — fire-and-forget POSTed by the upload finalize
 * route after a resource row is inserted. Renders pages 1–3 to PNGs in
 * the resource_previews bucket and stamps preview_generation_status =
 * complete (or failed) on the row.
 *
 * Auth model: the upstream caller is server-side and uses the same
 * deploy, so this route is gated by a shared secret in the
 * `x-internal-preview-token` header. The secret is set in
 * PREVIEW_PROCESS_TOKEN; if unset (dev), the gate falls back to a
 * localhost host check.
 */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const expected = process.env.PREVIEW_PROCESS_TOKEN;
  const headerToken = req.headers.get("x-internal-preview-token");

  if (expected) {
    if (headerToken !== expected) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  } else {
    // Dev fallback: only allow same-host requests when no secret set.
    const host = req.headers.get("host") ?? "";
    if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
      return NextResponse.json(
        { error: "PREVIEW_PROCESS_TOKEN env var not configured" },
        { status: 401 }
      );
    }
  }

  const id = String(params.id ?? "").trim();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const result = await generatePreviewsForResource(id);
  const status = result.ok ? 200 : 500;
  return NextResponse.json(result, { status });
}
