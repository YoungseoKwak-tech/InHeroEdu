/**
 * lib/attentionTelemetry.ts
 *
 * Stage-1 telemetry client. Captures every observable lesson interaction as
 * a raw event in a single time-series stream, buffers locally, and POSTs in
 * batches. Stage-2 feature extraction (Hjorth params, PSD entropy, ZC, …)
 * runs server-side on the raw stream — same pattern as the Cornell RMG
 * paper, just with student-interaction signals instead of RF channels as
 * input.
 *
 * Usage:
 *
 *   import { startTelemetrySession, emit, endTelemetrySession } from "@/lib/attentionTelemetry";
 *
 *   useEffect(() => {
 *     startTelemetrySession({ lessonId });
 *     emit("lesson_start", {});
 *     return () => { emit("lesson_complete", {}); endTelemetrySession(); };
 *   }, [lessonId]);
 *
 *   emit("overlay_answered", { overlay_id, correct, latency_ms, kind });
 *
 * No-op if the user is signed out or the consent cookie has not been
 * granted — events buffer locally and are silently dropped at flush time.
 */

import { authFetch } from "@/lib/client-auth";

export type AttentionEventType =
  | "lesson_start"
  | "lesson_complete"
  | "video_play"
  | "video_pause"
  | "video_seek"
  | "video_ended"
  | "clip_locked"
  | "visibility_hidden"
  | "visibility_visible"
  | "inactivity_start"
  | "inactivity_end"
  | "overlay_shown"
  | "overlay_answered"
  | "overlay_hint_used"
  | "overlay_skipped";

interface BufferedEvent {
  session_id: string;
  lesson_id: string | null;
  event_type: AttentionEventType;
  occurred_at: string; // ISO
  payload: Record<string, unknown>;
}

interface SessionState {
  sessionId: string;
  lessonId: string | null;
  // Inactivity tracker. We treat "no pointer / key / touch event for
  // INACTIVITY_MS" as a drift signal; the next input event ends the window.
  lastInputAt: number;
  inactivityFired: boolean;
}

const FLUSH_INTERVAL_MS = 8000;
const MAX_BUFFER_SIZE = 24;
const INACTIVITY_MS = 30_000;
const INACTIVITY_CHECK_MS = 5_000;
const ENDPOINT = "/api/attention/events";

let session: SessionState | null = null;
let buffer: BufferedEvent[] = [];
let flushTimer: ReturnType<typeof setInterval> | null = null;
let inactivityTimer: ReturnType<typeof setInterval> | null = null;
let inputListenersAttached = false;
let pageLifecycleAttached = false;

function uuidish(): string {
  // crypto.randomUUID is widely supported; fall back to a Math.random hex
  // for very old browsers so telemetry doesn't crash the lesson player.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "ses-" + Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

function nowIso() {
  return new Date().toISOString();
}

function onInput() {
  if (!session) return;
  const previousLastInput = session.lastInputAt;
  session.lastInputAt = Date.now();
  if (session.inactivityFired) {
    // We were inactive — emit a closing event marking how long the gap was.
    session.inactivityFired = false;
    pushEvent("inactivity_end", { idle_ms: Date.now() - previousLastInput });
  }
}

function checkInactivity() {
  if (!session || session.inactivityFired) return;
  if (Date.now() - session.lastInputAt >= INACTIVITY_MS) {
    session.inactivityFired = true;
    pushEvent("inactivity_start", { threshold_ms: INACTIVITY_MS });
  }
}

function onVisibilityChange() {
  if (!session || typeof document === "undefined") return;
  if (document.hidden) pushEvent("visibility_hidden", {});
  else pushEvent("visibility_visible", {});
}

function attachInputListeners() {
  if (inputListenersAttached || typeof window === "undefined") return;
  inputListenersAttached = true;
  window.addEventListener("pointerdown", onInput, { passive: true });
  window.addEventListener("keydown", onInput, { passive: true });
  window.addEventListener("touchstart", onInput, { passive: true });
  window.addEventListener("scroll", onInput, { passive: true, capture: true });
  document.addEventListener("visibilitychange", onVisibilityChange);
}

function detachInputListeners() {
  if (!inputListenersAttached || typeof window === "undefined") return;
  inputListenersAttached = false;
  window.removeEventListener("pointerdown", onInput);
  window.removeEventListener("keydown", onInput);
  window.removeEventListener("touchstart", onInput);
  window.removeEventListener("scroll", onInput, true);
  document.removeEventListener("visibilitychange", onVisibilityChange);
}

function attachPageLifecycle() {
  if (pageLifecycleAttached || typeof window === "undefined") return;
  pageLifecycleAttached = true;
  // pagehide is more reliable than beforeunload for mobile/iOS. Use
  // sendBeacon so the request survives the unload race.
  window.addEventListener("pagehide", flushSync);
  window.addEventListener("beforeunload", flushSync);
}

function pushEvent(eventType: AttentionEventType, payload: Record<string, unknown>) {
  if (!session) return;
  buffer.push({
    session_id: session.sessionId,
    lesson_id: session.lessonId,
    event_type: eventType,
    occurred_at: nowIso(),
    payload,
  });
  if (buffer.length >= MAX_BUFFER_SIZE) {
    void flush();
  }
}

async function flush(): Promise<void> {
  if (buffer.length === 0) return;
  // Atomic swap so a slow network request doesn't lose events emitted in
  // the meantime.
  const batch = buffer;
  buffer = [];
  try {
    const res = await authFetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: batch }),
    });
    if (!res.ok) {
      // Server rejected the batch. Re-queue at the front so order is
      // preserved on the next flush attempt. Cap re-queue depth so a long
      // outage can't grow the buffer unboundedly.
      if (buffer.length + batch.length <= MAX_BUFFER_SIZE * 4) {
        buffer = [...batch, ...buffer];
      }
    }
  } catch {
    // Network blip — same re-queue logic.
    if (buffer.length + batch.length <= MAX_BUFFER_SIZE * 4) {
      buffer = [...batch, ...buffer];
    }
  }
}

function flushSync() {
  if (buffer.length === 0 || typeof navigator === "undefined") return;
  // sendBeacon for unload — does not return a Promise, queues the request.
  if (typeof navigator.sendBeacon === "function") {
    try {
      const blob = new Blob([JSON.stringify({ events: buffer })], {
        type: "application/json",
      });
      const ok = navigator.sendBeacon(ENDPOINT, blob);
      if (ok) buffer = [];
    } catch {
      /* fall through */
    }
  }
}

// ── Public API ─────────────────────────────────────────────────────────────

export function startTelemetrySession(opts: { lessonId?: string | null }) {
  if (typeof window === "undefined") return;
  if (session) endTelemetrySession(); // Replace any prior session cleanly.
  session = {
    sessionId: uuidish(),
    lessonId: opts.lessonId ?? null,
    lastInputAt: Date.now(),
    inactivityFired: false,
  };
  attachInputListeners();
  attachPageLifecycle();
  if (!flushTimer) flushTimer = setInterval(() => { void flush(); }, FLUSH_INTERVAL_MS);
  if (!inactivityTimer) inactivityTimer = setInterval(checkInactivity, INACTIVITY_CHECK_MS);
}

export function emit(eventType: AttentionEventType, payload: Record<string, unknown> = {}) {
  pushEvent(eventType, payload);
}

export function endTelemetrySession() {
  if (!session) return;
  // Final flush captures lesson_complete + any tail events.
  void flush();
  session = null;
  detachInputListeners();
  if (flushTimer) { clearInterval(flushTimer); flushTimer = null; }
  if (inactivityTimer) { clearInterval(inactivityTimer); inactivityTimer = null; }
}

export function getCurrentSessionId(): string | null {
  return session?.sessionId ?? null;
}
