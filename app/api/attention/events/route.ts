/**
 * /api/attention/events
 *
 * POST a batch of behavioral events from lib/attentionTelemetry. Each event
 * is validated individually so a single bad row never sinks the whole
 * batch — the client treats partial success the same as full success.
 *
 * Body shape:
 *   {
 *     events: [
 *       { session_id, lesson_id, event_type, occurred_at, payload }, ...
 *     ]
 *   }
 *
 * The endpoint is also reachable via navigator.sendBeacon, which sends the
 * JSON blob with content-type application/json — the same handler picks it
 * up. Beacon requests skip Authorization headers, so unauthenticated unload
 * flushes are dropped silently rather than failing loudly.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const ALLOWED_EVENT_TYPES = new Set([
  "lesson_start",
  "lesson_complete",
  "video_play",
  "video_pause",
  "video_seek",
  "video_ended",
  "clip_locked",
  "visibility_hidden",
  "visibility_visible",
  "inactivity_start",
  "inactivity_end",
  "overlay_shown",
  "overlay_answered",
  "overlay_hint_used",
  "overlay_skipped",
]);

const MAX_EVENTS_PER_BATCH = 100;
const MAX_PAYLOAD_KEYS = 16;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface IncomingEvent {
  session_id?: unknown;
  lesson_id?: unknown;
  event_type?: unknown;
  occurred_at?: unknown;
  payload?: unknown;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function validate(raw: IncomingEvent): { ok: true; row: Record<string, unknown> } | { ok: false; reason: string } {
  if (typeof raw.session_id !== "string" || !UUID_RE.test(raw.session_id)) {
    return { ok: false, reason: "session_id must be a UUID" };
  }
  if (typeof raw.event_type !== "string" || !ALLOWED_EVENT_TYPES.has(raw.event_type)) {
    return { ok: false, reason: `unknown event_type` };
  }
  if (typeof raw.occurred_at !== "string") {
    return { ok: false, reason: "occurred_at must be ISO string" };
  }
  const parsed = Date.parse(raw.occurred_at);
  if (Number.isNaN(parsed)) {
    return { ok: false, reason: "occurred_at not parseable" };
  }
  let payload: Record<string, unknown> = {};
  if (raw.payload !== undefined) {
    if (!isPlainObject(raw.payload)) {
      return { ok: false, reason: "payload must be an object" };
    }
    if (Object.keys(raw.payload).length > MAX_PAYLOAD_KEYS) {
      return { ok: false, reason: "payload too large" };
    }
    payload = raw.payload;
  }
  return {
    ok: true,
    row: {
      session_id: raw.session_id,
      lesson_id: typeof raw.lesson_id === "string" ? raw.lesson_id : null,
      event_type: raw.event_type,
      occurred_at: new Date(parsed).toISOString(),
      payload,
    },
  };
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: { events?: IncomingEvent[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const incoming = Array.isArray(body.events) ? body.events.slice(0, MAX_EVENTS_PER_BATCH) : [];
  if (incoming.length === 0) {
    return NextResponse.json({ ok: true, accepted: 0, rejected: 0 });
  }

  const rows: Array<Record<string, unknown>> = [];
  let rejected = 0;
  for (const raw of incoming) {
    const r = validate(raw);
    if (!r.ok) { rejected++; continue; }
    rows.push({ user_id: user.id, ...r.row });
  }

  if (rows.length === 0) {
    return NextResponse.json({ ok: true, accepted: 0, rejected });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("attention_events").insert(rows);
  if (error) {
    console.error("[/api/attention/events] insert failed", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, accepted: rows.length, rejected });
}
