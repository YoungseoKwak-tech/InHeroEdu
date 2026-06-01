/**
 * scripts/extract-features.ts
 *
 * Stage 2b feature extractor. For each session:
 *   * Pull bins from attention_signal_windows → per-channel
 *     {mean, var, cv, hjorth(A/M/C), PSD entropy, spectral energy, ZC,
 *      valid_bins}. Four channels (latency, replay, visibility, inactivity).
 *   * Pull raw events from attention_events → event-domain irregularity
 *     (Goh-Barabási burstiness, Fano factor, ISI entropy) + transition
 *     stats (P(seek-back | overlay wrong), P(correct after replay),
 *     mean visibility-return latency, confusion-loop count).
 *
 * Writes one row per (user_id, session_id, feature_pipeline_version) to
 * attention_features. Idempotent UPSERT — re-running overwrites.
 *
 * Run:
 *   npx tsx scripts/extract-features.ts
 *   npx tsx scripts/extract-features.ts --user <uuid>
 *   npx tsx scripts/extract-features.ts --session <uuid>
 *   npx tsx scripts/extract-features.ts --force
 */

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import {
  channelFeatures,
  burstinessGB,
  fanoFactor,
  isiEntropy,
  mean as meanOf,
} from "@/lib/attentionFeatures";

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
  } catch {}
})();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("[features] missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const FEATURE_PIPELINE_VERSION = 1;
const SEEK_BACK_WINDOW_MS = 30_000; // for P(seek-back | overlay wrong)
const FANO_WINDOW_BINS = 6;          // window size for Fano factor counts (~30s)

function parseArg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return undefined;
  if (i === process.argv.length - 1) return "";
  return process.argv[i + 1];
}

interface SessionKey { user_id: string; session_id: string; lesson_id: string | null; }
interface BinRow {
  bin_index: number;
  bin_start: string;
  mean_latency_ms: number | null;
  replay_count: number;
  visibility_hidden_ms: number;
  inactivity_ms: number;
  overlay_attempted: number;
  overlay_correct: number;
}
interface RawEvent {
  event_type: string;
  occurred_at: string;
  payload: Record<string, unknown> | null;
}

async function discoverSessions(opts: {
  user?: string;
  session?: string;
  force: boolean;
}): Promise<SessionKey[]> {
  let q = supabase
    .from("attention_signal_windows")
    .select("user_id, session_id, lesson_id, bin_index")
    .eq("bin_index", 0);
  if (opts.user) q = q.eq("user_id", opts.user);
  if (opts.session) q = q.eq("session_id", opts.session);
  const { data, error } = await q.limit(50000);
  if (error) { console.error("[features] discovery failed:", error.message); return []; }
  let sessions: SessionKey[] = (data ?? []).map((r) => ({
    user_id: r.user_id as string,
    session_id: r.session_id as string,
    lesson_id: (r.lesson_id as string | null) ?? null,
  }));

  if (!opts.force) {
    const ids = sessions.map((s) => s.session_id);
    if (ids.length > 0) {
      const { data: existing } = await supabase
        .from("attention_features")
        .select("session_id")
        .eq("feature_pipeline_version", FEATURE_PIPELINE_VERSION)
        .in("session_id", ids);
      const have = new Set((existing ?? []).map((r) => r.session_id as string));
      sessions = sessions.filter((s) => !have.has(s.session_id));
    }
  }
  return sessions;
}

async function loadBins(sessionId: string): Promise<BinRow[]> {
  const { data, error } = await supabase
    .from("attention_signal_windows")
    .select("bin_index, bin_start, mean_latency_ms, replay_count, visibility_hidden_ms, inactivity_ms, overlay_attempted, overlay_correct")
    .eq("session_id", sessionId)
    .order("bin_index", { ascending: true })
    .limit(10000);
  if (error) { console.error("[features] bin load:", error.message); return []; }
  return (data ?? []) as BinRow[];
}

async function loadRawEvents(sessionId: string): Promise<RawEvent[]> {
  const { data, error } = await supabase
    .from("attention_events")
    .select("event_type, occurred_at, payload")
    .eq("session_id", sessionId)
    .order("occurred_at", { ascending: true })
    .limit(10000);
  if (error) { console.error("[features] event load:", error.message); return []; }
  return (data ?? []) as RawEvent[];
}

interface TransitionFeatures {
  p_seek_back_after_wrong: number | null;
  p_replay_then_correct: number | null;
  mean_visibility_return_ms: number | null;
  confusion_loops: number;
}

function computeTransitionFeatures(events: RawEvent[]): TransitionFeatures {
  // P(seek-back within SEEK_BACK_WINDOW_MS | overlay_answered with correct=false)
  let wrongCount = 0;
  let wrongFollowedBySeekBack = 0;

  // P(next overlay correct | a replay/back-seek occurred since the previous overlay)
  let replaysBetweenOverlays = false;
  let replayFollowedOverlays = 0;
  let replayFollowedCorrects = 0;

  // Confusion-loop count: wrong → seek_back → wrong (chronological)
  let confusionLoops = 0;
  let inLoopAfterWrong = false; // saw wrong; waiting for seek_back; then waiting for next wrong

  // Visibility return latency
  let lastHiddenMs: number | null = null;
  const visibilityReturnDurations: number[] = [];

  for (let i = 0; i < events.length; i++) {
    const ev = events[i];
    const t = Date.parse(ev.occurred_at);

    if (ev.event_type === "overlay_answered") {
      const correct = ev.payload?.correct === true;
      if (replaysBetweenOverlays) {
        replayFollowedOverlays++;
        if (correct) replayFollowedCorrects++;
      }
      replaysBetweenOverlays = false;

      if (!correct) {
        wrongCount++;
        // Scan ahead for a seek-back within the window
        for (let j = i + 1; j < events.length; j++) {
          const ev2 = events[j];
          const t2 = Date.parse(ev2.occurred_at);
          if (t2 - t > SEEK_BACK_WINDOW_MS) break;
          if (ev2.event_type === "video_seek" && ev2.payload?.direction === "back") {
            wrongFollowedBySeekBack++;
            break;
          }
        }

        if (inLoopAfterWrong) {
          // Second consecutive wrong-after-seek-back = a confusion loop closed.
          confusionLoops++;
          inLoopAfterWrong = false;
        }
        inLoopAfterWrong = true;
      } else {
        inLoopAfterWrong = false;
      }
    } else if (ev.event_type === "video_seek" && ev.payload?.direction === "back") {
      replaysBetweenOverlays = true;
      // Don't reset inLoopAfterWrong here — we want to allow wrong→seek→wrong.
    } else if (ev.event_type === "visibility_hidden") {
      lastHiddenMs = t;
    } else if (ev.event_type === "visibility_visible" && lastHiddenMs !== null) {
      visibilityReturnDurations.push(t - lastHiddenMs);
      lastHiddenMs = null;
    }
  }

  return {
    p_seek_back_after_wrong: wrongCount > 0 ? wrongFollowedBySeekBack / wrongCount : null,
    p_replay_then_correct: replayFollowedOverlays > 0 ? replayFollowedCorrects / replayFollowedOverlays : null,
    mean_visibility_return_ms: visibilityReturnDurations.length > 0
      ? meanOf(visibilityReturnDurations) as number
      : null,
    confusion_loops: confusionLoops,
  };
}

function computeIsiFeatures(events: RawEvent[]) {
  const times = events.map((e) => Date.parse(e.occurred_at));
  if (times.length < 4) {
    return {
      total_events: times.length,
      isi_mean_ms: null,
      isi_burstiness: null,
      isi_fano_factor: null,
      isi_entropy: null,
    };
  }
  const intervals: number[] = [];
  for (let i = 1; i < times.length; i++) intervals.push(times[i] - times[i - 1]);

  // Fano factor: window the timeline into FANO_WINDOW_BINS-sized buckets and
  // count events per bucket. Reuses the resampler's bin_width × FANO_WINDOW_BINS
  // for a coarser scale (~30s) that's better-suited to Fano analysis.
  const start = times[0];
  const end = times[times.length - 1];
  const windowMs = 5_000 * FANO_WINDOW_BINS;
  const buckets = Math.max(2, Math.ceil((end - start) / windowMs));
  const counts = new Array(buckets).fill(0) as number[];
  for (const t of times) {
    const idx = Math.min(buckets - 1, Math.floor((t - start) / windowMs));
    counts[idx]++;
  }

  return {
    total_events: times.length,
    isi_mean_ms: meanOf(intervals),
    isi_burstiness: burstinessGB(intervals),
    isi_fano_factor: fanoFactor(counts),
    isi_entropy: isiEntropy(intervals),
  };
}

function buildFeatureRow(key: SessionKey, bins: BinRow[], events: RawEvent[]) {
  if (bins.length === 0) return null;

  const latencyValues: Array<number | null> = bins.map((b) => b.mean_latency_ms);
  const replayValues: Array<number | null> = bins.map((b) => b.replay_count);
  const visibilityValues: Array<number | null> = bins.map((b) => b.visibility_hidden_ms);
  const inactivityValues: Array<number | null> = bins.map((b) => b.inactivity_ms);

  const latency = channelFeatures(latencyValues);
  const replay = channelFeatures(replayValues);
  const visibility = channelFeatures(visibilityValues);
  const inactivity = channelFeatures(inactivityValues);

  const isi = computeIsiFeatures(events);
  const transitions = computeTransitionFeatures(events);

  const totalAttempted = bins.reduce((a, b) => a + b.overlay_attempted, 0);
  const totalCorrect = bins.reduce((a, b) => a + b.overlay_correct, 0);
  const sessionAccuracy = totalAttempted > 0 ? totalCorrect / totalAttempted : null;

  const wallClockDurationMs = bins.length * 5_000;

  return {
    user_id: key.user_id,
    session_id: key.session_id,
    lesson_id: key.lesson_id,
    bin_count: bins.length,
    wall_clock_duration_ms: wallClockDurationMs,
    feature_pipeline_version: FEATURE_PIPELINE_VERSION,

    latency_mean: latency.mean,
    latency_var: latency.var,
    latency_cv: latency.cv,
    latency_hjorth_activity: latency.hjorth_activity,
    latency_hjorth_mobility: latency.hjorth_mobility,
    latency_hjorth_complexity: latency.hjorth_complexity,
    latency_psd_entropy: latency.psd_entropy,
    latency_spectral_energy: latency.spectral_energy,
    latency_zc: latency.zc,
    latency_valid_bins: latency.valid_bins,

    replay_mean: replay.mean,
    replay_var: replay.var,
    replay_cv: replay.cv,
    replay_hjorth_activity: replay.hjorth_activity,
    replay_hjorth_mobility: replay.hjorth_mobility,
    replay_hjorth_complexity: replay.hjorth_complexity,
    replay_psd_entropy: replay.psd_entropy,
    replay_spectral_energy: replay.spectral_energy,
    replay_zc: replay.zc,
    replay_valid_bins: replay.valid_bins,

    visibility_mean: visibility.mean,
    visibility_var: visibility.var,
    visibility_cv: visibility.cv,
    visibility_hjorth_activity: visibility.hjorth_activity,
    visibility_hjorth_mobility: visibility.hjorth_mobility,
    visibility_hjorth_complexity: visibility.hjorth_complexity,
    visibility_psd_entropy: visibility.psd_entropy,
    visibility_spectral_energy: visibility.spectral_energy,
    visibility_zc: visibility.zc,
    visibility_valid_bins: visibility.valid_bins,

    inactivity_mean: inactivity.mean,
    inactivity_var: inactivity.var,
    inactivity_cv: inactivity.cv,
    inactivity_hjorth_activity: inactivity.hjorth_activity,
    inactivity_hjorth_mobility: inactivity.hjorth_mobility,
    inactivity_hjorth_complexity: inactivity.hjorth_complexity,
    inactivity_psd_entropy: inactivity.psd_entropy,
    inactivity_spectral_energy: inactivity.spectral_energy,
    inactivity_zc: inactivity.zc,
    inactivity_valid_bins: inactivity.valid_bins,

    total_events: isi.total_events,
    isi_mean_ms: isi.isi_mean_ms,
    isi_burstiness: isi.isi_burstiness,
    isi_fano_factor: isi.isi_fano_factor,
    isi_entropy: isi.isi_entropy,

    p_seek_back_after_wrong: transitions.p_seek_back_after_wrong,
    p_replay_then_correct: transitions.p_replay_then_correct,
    mean_visibility_return_ms: transitions.mean_visibility_return_ms,
    confusion_loops: transitions.confusion_loops,

    session_accuracy: sessionAccuracy,
  };
}

async function main() {
  const opts = {
    user: parseArg("user"),
    session: parseArg("session"),
    force: process.argv.includes("--force"),
  };

  console.log("[features] discovering sessions…", opts);
  const sessions = await discoverSessions(opts);
  console.log(`[features] ${sessions.length} sessions to process (pipeline v${FEATURE_PIPELINE_VERSION})`);

  let success = 0;
  let failure = 0;
  for (let i = 0; i < sessions.length; i++) {
    const key = sessions[i];
    const [bins, events] = await Promise.all([loadBins(key.session_id), loadRawEvents(key.session_id)]);
    if (bins.length === 0) { console.log(`[${i + 1}/${sessions.length}] ${key.session_id}: no bins, skip`); continue; }

    const row = buildFeatureRow(key, bins, events);
    if (!row) { failure++; continue; }

    const { error } = await supabase
      .from("attention_features")
      .upsert(row, { onConflict: "user_id,session_id,feature_pipeline_version" });
    if (error) { console.log(`[${i + 1}/${sessions.length}] ${key.session_id}: ${error.message}`); failure++; continue; }

    success++;
    console.log(`[${i + 1}/${sessions.length}] ${key.session_id} → bins=${bins.length} events=${events.length} accuracy=${row.session_accuracy?.toFixed(2) ?? "n/a"}`);
  }

  console.log(`\n[features] done. success=${success} failure=${failure}`);
}

main().catch((err) => { console.error("[features] fatal:", err); process.exit(1); });
