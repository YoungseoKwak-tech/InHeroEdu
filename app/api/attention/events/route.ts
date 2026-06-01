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
 *       {
 *         event_id,
 *         session_id,
 *         lesson_id,
 *         event_type,
 *         seq,
 *         occurred_at,
 *         client_sent_at,
 *         schema_version,
 *         payload
 *       }, ...
 *     ]
 *   }
 *
 * Unload flushes use fetch({ keepalive: true }) with Authorization headers.
 * We intentionally do not accept unauthenticated beacon writes because that
 * creates cross-user attribution and replay risk.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";

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
const MAX_PAYLOAD_BYTES = 4096;
const MAX_FUTURE_SKEW_MS = 5 * 60 * 1000;
const MAX_EVENT_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CONSENT_TYPES = ["attention_telemetry", "cognitive_logging"];

interface IncomingEvent {
  event_id?: unknown;
  session_id?: unknown;
  lesson_id?: unknown;
  event_type?: unknown;
  seq?: unknown;
  occurred_at?: unknown;
  client_sent_at?: unknown;
  schema_version?: unknown;
  payload?: unknown;
}

interface RollupSummary {
  sessionId: string;
  lessonId: string | null;
  count: number;
  firstEventAt: string;
  lastEventAt: string;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function parseIso(value: unknown, label: string): { ok: true; value: string; timestamp: number } | { ok: false; reason: string } {
  if (typeof value !== "string") {
    return { ok: false, reason: `${label} must be ISO string` };
  }
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return { ok: false, reason: `${label} not parseable` };
  }
  return { ok: true, value: new Date(parsed).toISOString(), timestamp: parsed };
}

function parseOptionalInteger(
  value: unknown,
  label: string,
  min: number,
  max: number
): { ok: true; value: number | null } | { ok: false; reason: string } {
  if (value === undefined) return { ok: true, value: null };
  if (typeof value !== "number" || !Number.isInteger(value) || value < min || value > max) {
    return { ok: false, reason: `${label} must be an integer between ${min} and ${max}` };
  }
  return { ok: true, value };
}

async function hasAttentionConsent(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("privacy_consents")
    .select("consent_type, consented")
    .eq("user_id", userId)
    .in("consent_type", CONSENT_TYPES);

  if (error) {
    console.error("[/api/attention/events] consent lookup failed", error.message);
    return false;
  }

  return (data || []).some((row) => row.consented === true);
}

function summarizeRollups(rows: Array<Record<string, unknown>>): RollupSummary[] {
  const summaries = new Map<string, RollupSummary>();

  for (const row of rows) {
    const sessionId = typeof row.session_id === "string" ? row.session_id : null;
    const occurredAt = typeof row.occurred_at === "string" ? row.occurred_at : null;
    if (!sessionId || !occurredAt) continue;

    const lessonId = typeof row.lesson_id === "string" ? row.lesson_id : null;
    const existing = summaries.get(sessionId);
    if (!existing) {
      summaries.set(sessionId, {
        sessionId,
        lessonId,
        count: 1,
        firstEventAt: occurredAt,
        lastEventAt: occurredAt,
      });
      continue;
    }

    existing.count += 1;
    if (!existing.lessonId && lessonId) existing.lessonId = lessonId;
    if (Date.parse(occurredAt) < Date.parse(existing.firstEventAt)) {
      existing.firstEventAt = occurredAt;
    }
    if (Date.parse(occurredAt) > Date.parse(existing.lastEventAt)) {
      existing.lastEventAt = occurredAt;
    }
  }

  return Array.from(summaries.values());
}

async function enqueueRollups(
  supabase: SupabaseClient,
  userId: string,
  rows: Array<Record<string, unknown>>,
) {
  const summaries = summarizeRollups(rows);
  if (summaries.length === 0) return;

  const results = await Promise.allSettled(
    summaries.map((summary) =>
      supabase.rpc("enqueue_attention_rollup", {
        p_user_id: userId,
        p_session_id: summary.sessionId,
        p_lesson_id: summary.lessonId,
        p_event_count: summary.count,
        p_first_event_at: summary.firstEventAt,
        p_last_event_at: summary.lastEventAt,
      }),
    ),
  );

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("[/api/attention/events] rollup enqueue failed", result.reason);
      continue;
    }
    if (result.value.error) {
      console.error("[/api/attention/events] rollup enqueue failed", result.value.error.message);
    }
  }
}

function validate(raw: IncomingEvent): { ok: true; row: Record<string, unknown> } | { ok: false; reason: string } {
  if (raw.event_id !== undefined && (typeof raw.event_id !== "string" || !UUID_RE.test(raw.event_id))) {
    return { ok: false, reason: "event_id must be a UUID" };
  }
  if (typeof raw.session_id !== "string" || !UUID_RE.test(raw.session_id)) {
    return { ok: false, reason: "session_id must be a UUID" };
  }
  if (typeof raw.event_type !== "string" || !ALLOWED_EVENT_TYPES.has(raw.event_type)) {
    return { ok: false, reason: `unknown event_type` };
  }

  const seq = parseOptionalInteger(raw.seq, "seq", 0, Number.MAX_SAFE_INTEGER);
  if (!seq.ok) return seq;

  const occurred = parseIso(raw.occurred_at, "occurred_at");
  if (!occurred.ok) return occurred;

  const now = Date.now();
  if (occurred.timestamp > now + MAX_FUTURE_SKEW_MS) {
    return { ok: false, reason: "occurred_at too far in the future" };
  }
  if (occurred.timestamp < now - MAX_EVENT_AGE_MS) {
    return { ok: false, reason: "occurred_at too old" };
  }

  let clientSentAt: string | null = null;
  if (raw.client_sent_at !== undefined) {
    const clientSent = parseIso(raw.client_sent_at, "client_sent_at");
    if (!clientSent.ok) return clientSent;
    clientSentAt = clientSent.value;
  }

  const schemaVersion = parseOptionalInteger(raw.schema_version, "schema_version", 1, 10);
  if (!schemaVersion.ok) return schemaVersion;

  let payload: Record<string, unknown> = {};
  if (raw.payload !== undefined) {
    if (!isPlainObject(raw.payload)) {
      return { ok: false, reason: "payload must be an object" };
    }
    if (Object.keys(raw.payload).length > MAX_PAYLOAD_KEYS) {
      return { ok: false, reason: "payload too large" };
    }
    if (JSON.stringify(raw.payload).length > MAX_PAYLOAD_BYTES) {
      return { ok: false, reason: "payload too large" };
    }
    payload = raw.payload;
  }

  return {
    ok: true,
    row: {
      ...(typeof raw.event_id === "string" ? { event_id: raw.event_id } : {}),
      session_id: raw.session_id,
      lesson_id: typeof raw.lesson_id === "string" ? raw.lesson_id : null,
      event_type: raw.event_type,
      ...(seq.value !== null ? { seq: seq.value } : {}),
      occurred_at: occurred.value,
      ...(clientSentAt ? { client_sent_at: clientSentAt } : {}),
      schema_version: schemaVersion.value ?? 1,
      server_received_at: new Date().toISOString(),
      payload,
    },
  };
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();
  const consented = await hasAttentionConsent(supabase, user.id);
  if (!consented) {
    return NextResponse.json({ ok: true, accepted: 0, rejected: 0, consented: false });
  }

  let body: { events?: IncomingEvent[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body.events)) {
    return NextResponse.json({ ok: true, accepted: 0, rejected: 0 });
  }
  if (body.events.length > MAX_EVENTS_PER_BATCH) {
    return NextResponse.json(
      { error: "batch too large", max: MAX_EVENTS_PER_BATCH },
      { status: 413 }
    );
  }

  const incoming = body.events;
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

  const { error } = await supabase
    .from("attention_events")
    .upsert(rows, { onConflict: "user_id,event_id", ignoreDuplicates: true });
  if (error) {
    console.error("[/api/attention/events] insert failed", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await enqueueRollups(supabase, user.id, rows);

  return NextResponse.json({ ok: true, accepted: rows.length, rejected });
}
