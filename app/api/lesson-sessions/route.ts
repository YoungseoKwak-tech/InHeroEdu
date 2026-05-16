import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import {
  upsertLessonSessionSummaryV1,
  type LessonSessionSummaryV1Input,
} from "@/lib/learning-tracking";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  if (!isObject(body) || typeof body.lessonId !== "string" || typeof body.sessionId !== "string") {
    return NextResponse.json({ error: "lessonId and sessionId are required" }, { status: 400 });
  }

  try {
    await upsertLessonSessionSummaryV1({
      userId: user.id,
      session: body as unknown as LessonSessionSummaryV1Input,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "failed to save lesson session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
