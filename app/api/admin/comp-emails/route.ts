import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import {
  addDbCompEmail,
  getStaticCompEmails,
  listDbCompEmails,
  removeDbCompEmail,
} from "@/lib/textbookAccess";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  try {
    const dbRows = await listDbCompEmails();
    const envEmails = getStaticCompEmails();
    return NextResponse.json({
      ok: true,
      db: dbRows,
      envEmails, // surfaced read-only so the admin sees the floor (ADMIN_EMAILS + COMP_TEXTBOOK_EMAILS)
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "list failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let body: { email?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  try {
    const row = await addDbCompEmail({
      email,
      note: body.note ?? null,
      addedBy: admin.id,
    });
    return NextResponse.json({ ok: true, row });
  } catch (err) {
    const message = err instanceof Error ? err.message : "add failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }

  try {
    await removeDbCompEmail(email);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
