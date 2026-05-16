import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import {
  persistLearningEventV1,
  type LearningEventV1Input,
} from "@/lib/learning-tracking";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asEventInput(body: unknown): LearningEventV1Input | null {
  if (!isObject(body)) return null;
  if (typeof body.lessonId !== "string") return null;
  if (typeof body.eventType !== "string") return null;
  return body as unknown as LearningEventV1Input;
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

  const eventsRaw = Array.isArray((body as { events?: unknown[] })?.events)
    ? (body as { events: unknown[] }).events
    : [body];

  const events = eventsRaw
    .map(asEventInput)
    .filter((value): value is LearningEventV1Input => value !== null);

  if (events.length === 0) {
    return NextResponse.json({ error: "no valid events" }, { status: 400 });
  }

  try {
    await Promise.all(events.map((event) => persistLearningEventV1({ userId: user.id, event })));
    return NextResponse.json({ ok: true, count: events.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "failed to persist events";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
