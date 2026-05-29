/**
 * scripts/resample-attention.ts
 *
 * Stage 2a resampler. Reads attention_events (irregular event stream),
 * folds events into uniform 5-second bins per (user, session), computes
 * multi-channel features with the missing-value policy described in the
 * attention_signal_windows migration, attaches lesson_section from the
 * sequence of clip_locked events, and UPSERTs the result.
 *
 * The point of this script: the Cornell RMG feature pipeline (Hjorth
 * params / PSD entropy / spectral energy / ZC) is defined for
 * uniformly-sampled signals. Stage 1's raw event stream is irregular.
 * This is the representation layer that makes that pipeline honestly
 * applicable downstream.
 *
 * Run:
 *   npx tsx scripts/resample-attention.ts
 *   npx tsx scripts/resample-attention.ts --user <uuid>
 *   npx tsx scripts/resample-attention.ts --session <uuid>
 *   npx tsx scripts/resample-attention.ts --since 2026-05-29T00:00:00Z
 *   npx tsx scripts/resample-attention.ts --force        # recompute existing
 */

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

(function loadEnv() {
  try {
    const text = readFileSync(".env.local", "utf8");
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const k = line.slice(0, eq);
      const v = line.slice(eq + 1).replace(/^"|"$/g, "");
      if (!process.env[k]) process.env[k] = v;
    }
  } catch { /* missing .env.local OK */ }
})();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("[resample] missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const BIN_WIDTH_MS = 5_000;
const RESAMPLER_VERSION = 1;

function parseArg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return undefined;
  if (i === process.argv.length - 1) return "";
  return process.argv[i + 1];
}

interface RawEvent {
  user_id: string;
  session_id: string;
  lesson_id: string | null;
  event_type: string;
  occurred_at: string;
  payload: Record<string, unknown> | null;
}

interface SessionKey {
  user_id: string;
  session_id: string;
  lesson_id: string | null;
}

interface BinAccum {
  bin_index: number;
  bin_start_ms: number;
  click_count: number;
  overlay_event_count: number;
  events_total: number;
  latencies: number[];        // collected to compute mean + variance at the end
  replay_count: number;
  seek_back_count: number;
  visibility_hidden_ms: number;
  inactivity_ms: number;
  tab_switch_count: number;
  overlay_attempted: number;
  overlay_correct: number;
  overlay_skipped: number;
  overlay_hint_used: number;
  lesson_section: string | null;
  active_overlay_kind: string | null;
}

function newBin(idx: number, startMs: number): BinAccum {
  return {
    bin_index: idx,
    bin_start_ms: startMs,
    click_count: 0,
    overlay_event_count: 0,
    events_total: 0,
    latencies: [],
    replay_count: 0,
    seek_back_count: 0,
    visibility_hidden_ms: 0,
    inactivity_ms: 0,
    tab_switch_count: 0,
    overlay_attempted: 0,
    overlay_correct: 0,
    overlay_skipped: 0,
    overlay_hint_used: 0,
    lesson_section: null,
    active_overlay_kind: null,
  };
}

/**
 * Split a [startMs, endMs] duration interval across overlapping bins
 * and add the per-bin portion to the named accumulator field.
 */
function spreadDuration(
  bins: BinAccum[],
  sessionStartMs: number,
  startMs: number,
  endMs: number,
  field: "visibility_hidden_ms" | "inactivity_ms",
) {
  if (endMs <= startMs) return;
  const firstBin = Math.max(0, Math.floor((startMs - sessionStartMs) / BIN_WIDTH_MS));
  const lastBin = Math.floor((endMs - sessionStartMs - 1) / BIN_WIDTH_MS);
  for (let bi = firstBin; bi <= lastBin && bi < bins.length; bi++) {
    const binStart = sessionStartMs + bi * BIN_WIDTH_MS;
    const binEnd = binStart + BIN_WIDTH_MS;
    const overlapStart = Math.max(startMs, binStart);
    const overlapEnd = Math.min(endMs, binEnd);
    const overlap = overlapEnd - overlapStart;
    if (overlap > 0) bins[bi][field] += overlap;
  }
}

function variance(xs: number[]): number {
  if (xs.length < 2) return 0;
  const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
  const sq = xs.reduce((a, b) => a + (b - mean) ** 2, 0);
  return sq / xs.length;
}

interface ResampledRow {
  user_id: string;
  session_id: string;
  lesson_id: string | null;
  bin_index: number;
  bin_start: string;
  bin_end: string;
  click_count: number;
  overlay_event_count: number;
  events_total: number;
  mean_latency_ms: number | null;
  latency_variance_ms2: number | null;
  replay_count: number;
  seek_back_count: number;
  visibility_hidden_ms: number;
  inactivity_ms: number;
  tab_switch_count: number;
  overlay_attempted: number;
  overlay_correct: number;
  overlay_skipped: number;
  overlay_hint_used: number;
  accuracy_in_bin: number | null;
  lesson_section: string | null;
  active_overlay_kind: string | null;
  resampler_version: number;
}

function resampleSession(
  key: SessionKey,
  events: RawEvent[],
): ResampledRow[] {
  if (events.length === 0) return [];

  const eventsSorted = [...events].sort(
    (a, b) => Date.parse(a.occurred_at) - Date.parse(b.occurred_at),
  );
  const sessionStartMs = Date.parse(eventsSorted[0].occurred_at);
  const sessionEndMs = Date.parse(eventsSorted[eventsSorted.length - 1].occurred_at);
  const binCount = Math.max(1, Math.ceil((sessionEndMs - sessionStartMs) / BIN_WIDTH_MS) + 1);
  const bins: BinAccum[] = Array.from({ length: binCount }, (_, i) =>
    newBin(i, sessionStartMs + i * BIN_WIDTH_MS),
  );

  // Track open duration intervals as we scan forward in time.
  let visibilityHiddenSinceMs: number | null = null;
  let inactivitySinceMs: number | null = null;
  // Forward-fill content context across bins.
  let currentLessonSection: string | null = null;
  let currentOverlayKind: string | null = null;

  for (const ev of eventsSorted) {
    const t = Date.parse(ev.occurred_at);
    const binIdx = Math.min(
      bins.length - 1,
      Math.max(0, Math.floor((t - sessionStartMs) / BIN_WIDTH_MS)),
    );
    const bin = bins[binIdx];
    bin.events_total += 1;
    const payload = (ev.payload ?? {}) as Record<string, unknown>;

    switch (ev.event_type) {
      case "overlay_shown": {
        bin.overlay_event_count += 1;
        const kind = typeof payload.kind === "string" ? payload.kind : null;
        currentOverlayKind = kind ?? currentOverlayKind;
        break;
      }
      case "overlay_answered": {
        bin.overlay_event_count += 1;
        bin.overlay_attempted += 1;
        if (payload.correct === true) bin.overlay_correct += 1;
        const latency = Number(payload.latency_ms);
        if (Number.isFinite(latency) && latency >= 0) bin.latencies.push(latency);
        if (typeof payload.kind === "string") currentOverlayKind = payload.kind;
        break;
      }
      case "overlay_skipped": {
        bin.overlay_event_count += 1;
        bin.overlay_skipped += 1;
        const latency = Number(payload.latency_ms);
        if (Number.isFinite(latency) && latency >= 0) bin.latencies.push(latency);
        break;
      }
      case "overlay_hint_used": {
        bin.overlay_event_count += 1;
        bin.overlay_hint_used += 1;
        break;
      }
      case "video_seek": {
        if (payload.direction === "back") bin.seek_back_count += 1;
        // Heuristic: a backward seek of > 1s within a clip is treated as a
        // replay event. The script could also key off explicit replay event
        // types if those are added later.
        const from = Number(payload.from_sec);
        const to = Number(payload.to_sec);
        if (Number.isFinite(from) && Number.isFinite(to) && from - to > 1.0) {
          bin.replay_count += 1;
        }
        break;
      }
      case "video_play":
      case "video_pause":
      case "video_ended":
      case "clip_locked": {
        if (ev.event_type === "clip_locked") {
          const section = typeof payload.section_title === "string"
            ? payload.section_title
            : null;
          if (section) currentLessonSection = section;
        }
        bin.click_count += 1;
        break;
      }
      case "visibility_hidden": {
        if (visibilityHiddenSinceMs === null) visibilityHiddenSinceMs = t;
        bin.tab_switch_count += 1;
        break;
      }
      case "visibility_visible": {
        if (visibilityHiddenSinceMs !== null) {
          spreadDuration(bins, sessionStartMs, visibilityHiddenSinceMs, t, "visibility_hidden_ms");
          visibilityHiddenSinceMs = null;
        }
        break;
      }
      case "inactivity_start": {
        if (inactivitySinceMs === null) inactivitySinceMs = t;
        break;
      }
      case "inactivity_end": {
        if (inactivitySinceMs !== null) {
          spreadDuration(bins, sessionStartMs, inactivitySinceMs, t, "inactivity_ms");
          inactivitySinceMs = null;
        }
        break;
      }
      case "lesson_start":
      case "lesson_complete":
      default:
        // Counted in events_total above; no per-channel contribution.
        break;
    }

    // Forward-fill content context. Each bin records the section/kind that
    // was active *as the bin began* — assigned greedily after the first
    // event in each bin determines it.
    if (bin.lesson_section === null) bin.lesson_section = currentLessonSection;
    if (bin.active_overlay_kind === null) bin.active_overlay_kind = currentOverlayKind;
  }

  // Close any duration interval that was still open at session end.
  if (visibilityHiddenSinceMs !== null) {
    spreadDuration(bins, sessionStartMs, visibilityHiddenSinceMs, sessionEndMs, "visibility_hidden_ms");
  }
  if (inactivitySinceMs !== null) {
    spreadDuration(bins, sessionStartMs, inactivitySinceMs, sessionEndMs, "inactivity_ms");
  }

  // Forward-fill context across empty bins.
  let lastSection: string | null = null;
  let lastKind: string | null = null;
  for (const b of bins) {
    if (b.lesson_section !== null) lastSection = b.lesson_section;
    else b.lesson_section = lastSection;
    if (b.active_overlay_kind !== null) lastKind = b.active_overlay_kind;
    else b.active_overlay_kind = lastKind;
  }

  return bins.map((b) => {
    const meanLatency = b.latencies.length > 0
      ? b.latencies.reduce((a, x) => a + x, 0) / b.latencies.length
      : null;
    const latencyVar = b.latencies.length >= 2 ? variance(b.latencies) : null;
    const accuracy = b.overlay_attempted > 0
      ? b.overlay_correct / b.overlay_attempted
      : null;
    return {
      user_id: key.user_id,
      session_id: key.session_id,
      lesson_id: key.lesson_id,
      bin_index: b.bin_index,
      bin_start: new Date(b.bin_start_ms).toISOString(),
      bin_end: new Date(b.bin_start_ms + BIN_WIDTH_MS).toISOString(),
      click_count: b.click_count,
      overlay_event_count: b.overlay_event_count,
      events_total: b.events_total,
      mean_latency_ms: meanLatency,
      latency_variance_ms2: latencyVar,
      replay_count: b.replay_count,
      seek_back_count: b.seek_back_count,
      visibility_hidden_ms: Math.round(b.visibility_hidden_ms),
      inactivity_ms: Math.round(b.inactivity_ms),
      tab_switch_count: b.tab_switch_count,
      overlay_attempted: b.overlay_attempted,
      overlay_correct: b.overlay_correct,
      overlay_skipped: b.overlay_skipped,
      overlay_hint_used: b.overlay_hint_used,
      accuracy_in_bin: accuracy,
      lesson_section: b.lesson_section,
      active_overlay_kind: b.active_overlay_kind,
      resampler_version: RESAMPLER_VERSION,
    };
  });
}

async function discoverSessions(opts: {
  user?: string;
  session?: string;
  since?: string;
  force: boolean;
}): Promise<SessionKey[]> {
  // Pull distinct (user, session, last lesson_id seen) from attention_events.
  let q = supabase
    .from("attention_events")
    .select("user_id, session_id, lesson_id, occurred_at")
    .order("occurred_at", { ascending: false });
  if (opts.user) q = q.eq("user_id", opts.user);
  if (opts.session) q = q.eq("session_id", opts.session);
  if (opts.since) q = q.gte("occurred_at", opts.since);
  const { data, error } = await q.limit(50000);
  if (error) { console.error("[resample] event scan failed:", error.message); return []; }
  const seen = new Map<string, SessionKey>();
  for (const r of (data ?? []) as RawEvent[]) {
    const key = `${r.user_id}|${r.session_id}`;
    if (!seen.has(key)) seen.set(key, {
      user_id: r.user_id,
      session_id: r.session_id,
      lesson_id: r.lesson_id ?? null,
    });
  }
  let sessions = Array.from(seen.values());

  if (!opts.force) {
    // Filter out sessions that already have rows in attention_signal_windows.
    // For each candidate, check existence of bin_index 0.
    const ids = sessions.map((s) => s.session_id);
    if (ids.length > 0) {
      const { data: existing } = await supabase
        .from("attention_signal_windows")
        .select("session_id")
        .in("session_id", ids)
        .eq("bin_index", 0);
      const have = new Set((existing ?? []).map((r) => r.session_id as string));
      sessions = sessions.filter((s) => !have.has(s.session_id));
    }
  }
  return sessions;
}

async function loadEvents(sessionId: string): Promise<RawEvent[]> {
  const { data, error } = await supabase
    .from("attention_events")
    .select("user_id, session_id, lesson_id, event_type, occurred_at, payload")
    .eq("session_id", sessionId)
    .order("occurred_at", { ascending: true })
    .limit(10000);
  if (error) { console.error("[resample] event load:", error.message); return []; }
  return (data ?? []) as RawEvent[];
}

async function main() {
  const force = process.argv.includes("--force");
  const opts = {
    user: parseArg("user"),
    session: parseArg("session"),
    since: parseArg("since"),
    force,
  };

  console.log("[resample] discovering sessions…", opts);
  const sessions = await discoverSessions(opts);
  console.log(`[resample] ${sessions.length} sessions to process`);

  let totalBins = 0;
  let failures = 0;
  for (let i = 0; i < sessions.length; i++) {
    const key = sessions[i];
    const events = await loadEvents(key.session_id);
    if (events.length === 0) continue;
    const rows = resampleSession(key, events);
    if (rows.length === 0) continue;

    // Upsert in chunks of 500 to stay under request size limits.
    let upserted = 0;
    for (let off = 0; off < rows.length; off += 500) {
      const chunk = rows.slice(off, off + 500);
      const { error } = await supabase
        .from("attention_signal_windows")
        .upsert(chunk, { onConflict: "user_id,session_id,bin_index" });
      if (error) { console.log(`  ✕ ${key.session_id} chunk ${off}: ${error.message}`); failures++; break; }
      upserted += chunk.length;
    }
    totalBins += upserted;
    console.log(`[${i + 1}/${sessions.length}] ${key.session_id} → ${upserted} bins`);
  }

  console.log(`\n[resample] done. ${totalBins} bins across ${sessions.length} sessions (${failures} failures).`);
}

main().catch((err) => { console.error("[resample] fatal:", err); process.exit(1); });
