import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import {
  getOverlays,
  createOverlay,
  deleteOverlay,
  reorderOverlays,
} from "@/lib/overlays";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const lessonId = req.nextUrl.searchParams.get("lessonId");
  if (!lessonId) {
    return NextResponse.json({ error: "lessonId required" }, { status: 400 });
  }

  try {
    const rows = await getOverlays(lessonId);
    return NextResponse.json({ ok: true, data: rows });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[overlays GET]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: { lessonId?: string; type?: string; data?: Record<string, unknown>; scriptSectionRef?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { lessonId, type, data, scriptSectionRef = "" } = body;
  if (!lessonId || !type || !data) {
    return NextResponse.json({ error: "lessonId, type, and data required" }, { status: 400 });
  }

  try {
    const row = await createOverlay(lessonId, type, data, scriptSectionRef);
    return NextResponse.json({ ok: true, data: row });
  } catch (err) {
    console.error("[overlays POST]", err);
    return NextResponse.json({ error: "Failed to create overlay" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  try {
    await deleteOverlay(body.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[overlays DELETE]", err);
    return NextResponse.json({ error: "Failed to delete overlay" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: { lessonId?: string; orderedIds?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { lessonId, orderedIds } = body;
  if (!lessonId || !Array.isArray(orderedIds)) {
    return NextResponse.json({ error: "lessonId and orderedIds required" }, { status: 400 });
  }

  try {
    await reorderOverlays(lessonId, orderedIds);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[overlays PATCH]", err);
    return NextResponse.json({ error: "Failed to reorder overlays" }, { status: 500 });
  }
}
