import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { checkConsent, recordConsent } from "@/app/lib/privacyCompliance";

export const dynamic = "force-dynamic";

const ALLOWED_CONSENT_TYPES = new Set([
  "attention_telemetry",
  "cognitive_logging",
  "essay_analysis",
]);

function parseConsentType(value: unknown) {
  const consentType = typeof value === "string" ? value.trim() : "";
  return ALLOWED_CONSENT_TYPES.has(consentType) ? consentType : null;
}

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const consentType = parseConsentType(req.nextUrl.searchParams.get("type"));
  if (!consentType) {
    return NextResponse.json({ error: "invalid consent type" }, { status: 400 });
  }

  const consented = await checkConsent(user.id, consentType);
  return NextResponse.json({ ok: true, consentType, consented });
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: { consentType?: unknown; consented?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const consentType = parseConsentType(body.consentType);
  if (!consentType) {
    return NextResponse.json({ error: "invalid consent type" }, { status: 400 });
  }
  if (typeof body.consented !== "boolean") {
    return NextResponse.json({ error: "consented must be boolean" }, { status: 400 });
  }

  await recordConsent(user.id, consentType, body.consented);
  return NextResponse.json({ ok: true, consentType, consented: body.consented });
}
