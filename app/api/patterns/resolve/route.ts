import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { resolvePattern } from "@/lib/pattern-detector";

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { patternId } = await req.json();
  if (!patternId) {
    return NextResponse.json({ error: "patternId required" }, { status: 400 });
  }

  await resolvePattern(patternId, user.id);
  return NextResponse.json({ ok: true });
}
