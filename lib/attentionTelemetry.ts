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

import { authFetch, getAccessToken } from "@/lib/client-auth";

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
  event_id: string;
  session_id: string;
  lesson_id: string | null;
  event_type: AttentionEventType;
  seq: number;
  occurred_at: string; // ISO
  client_sent_at?: string;
  schema_version: 1;
  payload: Record<string, unknown>;
  owner_key: string | null;
}

type WireEvent = Omit<BufferedEvent, "owner_key">;
type StoredEvent = BufferedEvent & {
  owner_key: string;
  stored_at: number;
};

interface SessionState {
  sessionId: string;
  lessonId: string | null;
  // Inactivity tracker. We treat "no pointer / key / touch event for
  // INACTIVITY_MS" as a drift signal; the next input event ends the window.
  lastInputAt: number;
  inactivityFired: boolean;
  nextSeq: number;
}

const FLUSH_INTERVAL_MS = 8000;
const MAX_BUFFER_SIZE = 24;
const MAX_RETAINED_EVENTS = MAX_BUFFER_SIZE * 4;
const MAX_DURABLE_EVENTS_PER_OWNER = 500;
const KEEPALIVE_BYTE_LIMIT = 60_000;
const INACTIVITY_MS = 30_000;
const INACTIVITY_CHECK_MS = 5_000;
const ENDPOINT = "/api/attention/events";
const OUTBOX_DB_NAME = "inhero-attention-telemetry";
const OUTBOX_DB_VERSION = 1;
const OUTBOX_STORE = "attention_outbox";
const RETRY_BASE_MS = 2_000;
const RETRY_MAX_MS = 60_000;

let session: SessionState | null = null;
let buffer: BufferedEvent[] = [];
let flushTimer: ReturnType<typeof setInterval> | null = null;
let inactivityTimer: ReturnType<typeof setInterval> | null = null;
let inputListenersAttached = false;
let pageLifecycleAttached = false;
let flushInFlight = false;
let flushAgainRequested = false;
let cachedAccessToken: string | null = null;
let tokenRefreshPromise: Promise<void> | null = null;
let outboxDbPromise: Promise<IDBDatabase | null> | null = null;
let retryTimer: ReturnType<typeof setTimeout> | null = null;
let consecutiveFailures = 0;
let nextRetryAt = 0;

function uuidish(): string {
  const cryptoRef = typeof globalThis !== "undefined" ? globalThis.crypto : undefined;
  if (typeof cryptoRef?.randomUUID === "function") {
    return cryptoRef.randomUUID();
  }

  const bytes = new Uint8Array(16);
  if (typeof cryptoRef?.getRandomValues === "function") {
    cryptoRef.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ].join("-");
}

function nowIso() {
  return new Date().toISOString();
}

function base64UrlToString(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  if (typeof atob === "function") {
    return atob(padded);
  }
  return "";
}

function currentOwnerKey() {
  if (!cachedAccessToken) return null;
  const [, payload] = cachedAccessToken.split(".");
  if (!payload) return null;
  try {
    const parsed = JSON.parse(base64UrlToString(payload)) as { sub?: unknown };
    return typeof parsed.sub === "string" ? parsed.sub : null;
  } catch {
    return null;
  }
}

function isOnline() {
  return typeof navigator === "undefined" || navigator.onLine !== false;
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

function replayDurableQueue() {
  void drainDurableQueue().then(() => flush());
}

function onOnline() {
  consecutiveFailures = 0;
  nextRetryAt = 0;
  replayDurableQueue();
}

function attachPageLifecycle() {
  if (pageLifecycleAttached || typeof window === "undefined") return;
  pageLifecycleAttached = true;
  // pagehide is more reliable than beforeunload for mobile/iOS. We use
  // keepalive fetch so the Authorization header survives unload too.
  window.addEventListener("pagehide", flushSync);
  window.addEventListener("beforeunload", flushSync);
  window.addEventListener("online", onOnline);
}

function detachPageLifecycle() {
  if (!pageLifecycleAttached || typeof window === "undefined") return;
  pageLifecycleAttached = false;
  window.removeEventListener("pagehide", flushSync);
  window.removeEventListener("beforeunload", flushSync);
  window.removeEventListener("online", onOnline);
}

function trimBufferToCap() {
  if (buffer.length <= MAX_RETAINED_EVENTS) return;
  buffer = buffer.slice(buffer.length - MAX_RETAINED_EVENTS);
}

function transactionDone(tx: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onabort = () => reject(tx.error);
    tx.onerror = () => reject(tx.error);
  });
}

function openOutboxDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  if (outboxDbPromise) return outboxDbPromise;

  outboxDbPromise = new Promise((resolve) => {
    const request = indexedDB.open(OUTBOX_DB_NAME, OUTBOX_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.objectStoreNames.contains(OUTBOX_STORE)
        ? request.transaction?.objectStore(OUTBOX_STORE)
        : db.createObjectStore(OUTBOX_STORE, { keyPath: "event_id" });

      if (store && !store.indexNames.contains("owner_key")) {
        store.createIndex("owner_key", "owner_key", { unique: false });
      }
      if (store && !store.indexNames.contains("stored_at")) {
        store.createIndex("stored_at", "stored_at", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      outboxDbPromise = null;
      resolve(null);
    };
    request.onblocked = () => resolve(null);
  });

  return outboxDbPromise;
}

function stampOwner(events: BufferedEvent[] = buffer) {
  const ownerKey = currentOwnerKey();
  if (!ownerKey) return;
  let changed = false;
  for (const event of events) {
    if (!event.owner_key) {
      event.owner_key = ownerKey;
      changed = true;
    }
  }
  if (changed) {
    void persistEvents(events.filter((event) => event.owner_key === ownerKey));
  }
}

async function persistEvents(events: BufferedEvent[]) {
  const storable = events.filter((event): event is BufferedEvent & { owner_key: string } => Boolean(event.owner_key));
  if (!storable.length) return;

  const db = await openOutboxDb();
  if (!db) return;

  try {
    const tx = db.transaction(OUTBOX_STORE, "readwrite");
    const store = tx.objectStore(OUTBOX_STORE);
    const storedAt = Date.now();
    for (const event of storable) {
      store.put({ ...event, stored_at: storedAt } satisfies StoredEvent);
    }
    await transactionDone(tx);
    void trimStoredEvents(storable[0].owner_key);
  } catch {
    // IndexedDB can be blocked by private mode/quota. Memory buffer still works.
  }
}

async function deleteStoredEvents(eventIds: string[]) {
  if (!eventIds.length) return;
  const db = await openOutboxDb();
  if (!db) return;

  try {
    const tx = db.transaction(OUTBOX_STORE, "readwrite");
    const store = tx.objectStore(OUTBOX_STORE);
    for (const eventId of eventIds) {
      store.delete(eventId);
    }
    await transactionDone(tx);
  } catch {
    // Duplicate-safe event_id means stale outbox rows can be replayed later.
  }
}

async function loadStoredEvents(ownerKey: string, limit = MAX_BUFFER_SIZE): Promise<StoredEvent[]> {
  const db = await openOutboxDb();
  if (!db) return [];

  return new Promise((resolve) => {
    const tx = db.transaction(OUTBOX_STORE, "readonly");
    const store = tx.objectStore(OUTBOX_STORE);
    const index = store.index("owner_key");
    const request = index.openCursor(IDBKeyRange.only(ownerKey));
    const events: StoredEvent[] = [];

    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) {
        events.sort((a, b) => a.stored_at - b.stored_at || a.seq - b.seq);
        resolve(events.slice(0, limit));
        return;
      }
      events.push(cursor.value as StoredEvent);
      cursor.continue();
    };
    request.onerror = () => resolve([]);
  });
}

async function trimStoredEvents(ownerKey: string) {
  const events = await loadStoredEvents(ownerKey, MAX_DURABLE_EVENTS_PER_OWNER + 100);
  if (events.length <= MAX_DURABLE_EVENTS_PER_OWNER) return;
  const toDelete = events
    .slice(0, events.length - MAX_DURABLE_EVENTS_PER_OWNER)
    .map((event) => event.event_id);
  await deleteStoredEvents(toDelete);
}

async function drainDurableQueue() {
  await refreshAccessToken();
  const ownerKey = currentOwnerKey();
  if (!ownerKey) return;

  const stored = await loadStoredEvents(ownerKey, MAX_BUFFER_SIZE);
  if (!stored.length) return;

  const seen = new Set(buffer.map((event) => event.event_id));
  const replayable = stored.filter((event) => !seen.has(event.event_id));
  if (!replayable.length) return;

  buffer = [...replayable, ...buffer];
  trimBufferToCap();
}

function scheduleRetry() {
  consecutiveFailures += 1;
  const delay = Math.min(RETRY_MAX_MS, RETRY_BASE_MS * 2 ** Math.min(consecutiveFailures - 1, 6));
  nextRetryAt = Date.now() + delay;
  if (retryTimer || typeof window === "undefined") return;

  retryTimer = setTimeout(() => {
    retryTimer = null;
    replayDurableQueue();
  }, delay);
}

function clearRetryState() {
  consecutiveFailures = 0;
  nextRetryAt = 0;
  if (retryTimer) {
    clearTimeout(retryTimer);
    retryTimer = null;
  }
}

function pushEvent(eventType: AttentionEventType, payload: Record<string, unknown>) {
  const activeSession = session;
  if (!activeSession) return;
  const event: BufferedEvent = {
    event_id: uuidish(),
    session_id: activeSession.sessionId,
    lesson_id: activeSession.lessonId,
    event_type: eventType,
    seq: activeSession.nextSeq,
    occurred_at: nowIso(),
    schema_version: 1,
    payload,
    owner_key: currentOwnerKey(),
  };
  buffer.push(event);
  activeSession.nextSeq += 1;
  trimBufferToCap();
  if (event.owner_key) {
    void persistEvents([event]);
  }
  if (buffer.length >= MAX_BUFFER_SIZE) {
    void flush();
  }
}

function canRequeue(batch: BufferedEvent[]) {
  const activeSessionId = session?.sessionId;
  if (!activeSessionId) return false;
  return batch.every((event) => event.session_id === activeSessionId);
}

function requeueAtFront(batch: BufferedEvent[]) {
  if (!canRequeue(batch)) return;
  const capacity = MAX_RETAINED_EVENTS - buffer.length;
  if (capacity <= 0) return;
  const retained = batch.length > capacity ? batch.slice(batch.length - capacity) : batch;
  buffer = [...retained, ...buffer];
}

function markClientSent(batch: BufferedEvent[]) {
  const sentAt = nowIso();
  return batch.map((event) => ({ ...event, client_sent_at: sentAt }));
}

function toWireEvents(batch: BufferedEvent[]): WireEvent[] {
  return markClientSent(batch).map(({ owner_key: _ownerKey, ...event }) => event);
}

function refreshAccessToken() {
  if (tokenRefreshPromise) return tokenRefreshPromise;
  tokenRefreshPromise = getAccessToken()
    .then((token) => {
      cachedAccessToken = token;
      stampOwner();
    })
    .catch(() => {
      cachedAccessToken = null;
    })
    .finally(() => {
      tokenRefreshPromise = null;
    });
  return tokenRefreshPromise;
}

async function flush(): Promise<void> {
  if (buffer.length === 0) return;
  if (Date.now() < nextRetryAt) return;
  if (flushInFlight) {
    flushAgainRequested = true;
    return;
  }

  flushInFlight = true;
  try {
    do {
      flushAgainRequested = false;
      if (buffer.length === 0) return;

      // Atomic swap so a slow network request doesn't lose events emitted in
      // the meantime.
      const batch = buffer;
      buffer = [];
      await refreshAccessToken();
      stampOwner(batch);
      await persistEvents(batch);

      if (!isOnline()) {
        requeueAtFront(batch);
        scheduleRetry();
        return;
      }

      const body = JSON.stringify({ events: toWireEvents(batch) });

      try {
        const res = await authFetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });
        if (!res.ok) {
          requeueAtFront(batch);
          scheduleRetry();
          return;
        }
        clearRetryState();
        void deleteStoredEvents(batch.map((event) => event.event_id));
        void refreshAccessToken();
      } catch {
        // Network blip. Only requeue if the same session is still active;
        // otherwise old tail events could be written under a later session/user.
        requeueAtFront(batch);
        scheduleRetry();
        return;
      }
    } while (flushAgainRequested && buffer.length > 0);
  } finally {
    flushInFlight = false;
    if (flushAgainRequested && buffer.length > 0) {
      void flush();
    }
  }
}

function flushSync() {
  if (buffer.length === 0 || typeof window === "undefined") return;
  if (!cachedAccessToken) return;

  stampOwner(buffer);
  void persistEvents(buffer);

  const body = JSON.stringify({ events: toWireEvents(buffer) });
  if (body.length > KEEPALIVE_BYTE_LIMIT) return;

  try {
    const request = fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cachedAccessToken}`,
      },
      body,
      cache: "no-store",
      credentials: "same-origin",
      keepalive: true,
    });
    void request.catch(() => {});
    buffer = [];
  } catch {
    /* keep the buffer for the normal async flusher if the page survives */
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
    nextSeq: 1,
  };
  void refreshAccessToken().then(replayDurableQueue);
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
  detachPageLifecycle();
  if (flushTimer) { clearInterval(flushTimer); flushTimer = null; }
  if (inactivityTimer) { clearInterval(inactivityTimer); inactivityTimer = null; }
}

export function getCurrentSessionId(): string | null {
  return session?.sessionId ?? null;
}
