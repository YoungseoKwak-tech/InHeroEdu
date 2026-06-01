import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase";
import {
  burstinessGB,
  channelFeatures,
  fanoFactor,
  isiEntropy,
  mean as meanOf,
} from "@/lib/attentionFeatures";
import { inferAndStoreAttentionStateForSession } from "@/lib/attentionStates";

const BIN_WIDTH_MS = 5_000;
const RESAMPLER_VERSION = 1;
const FEATURE_PIPELINE_VERSION = 1;
const SEEK_BACK_WINDOW_MS = 30_000;
const FANO_WINDOW_BINS = 6;
const MAX_EVENTS_PER_SESSION = 10_000;
const MAX_FEATURE_BINS = 1_440; // 2h at 5s/bin; keeps direct DFT bounded.

type JsonPayload = Record<string, unknown>;

interface RawEvent {
  user_id: string;
  session_id: string;
  lesson_id: string | null;
  event_type: string;
  occurred_at: string;
  payload: JsonPayload | null;
}

interface SessionKey {
  user_id: string;
  session_id: string;
  lesson_id: string | null;
}

interface QueueJob extends SessionKey {
  id: number;
  last_event_at: string | null;
  event_count: number;
  attempts: number;
}

interface BinAccum {
  bin_index: number;
  bin_start_ms: number;
  click_count: number;
  overlay_event_count: number;
  events_total: number;
  latencies: number[];
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

function payloadOf(event: RawEvent): JsonPayload {
  return event.payload && typeof event.payload === "object" && !Array.isArray(event.payload)
    ? event.payload
    : {};
}

function numericPayload(payload: JsonPayload, key: string): number | null {
  const n = Number(payload[key]);
  return Number.isFinite(n) ? n : null;
}

function variance(xs: number[]): number {
  if (xs.length < 2) return 0;
  const avg = xs.reduce((a, b) => a + b, 0) / xs.length;
  const sq = xs.reduce((a, b) => a + (b - avg) ** 2, 0);
  return sq / xs.length;
}

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
    const bin = bins[bi];
    if (!bin) continue;
    const binStart = sessionStartMs + bi * BIN_WIDTH_MS;
    const binEnd = binStart + BIN_WIDTH_MS;
    const overlapStart = Math.max(startMs, binStart);
    const overlapEnd = Math.min(endMs, binEnd);
    const overlap = overlapEnd - overlapStart;
    if (overlap > 0) bin[field] += overlap;
  }
}

function resampleSession(key: SessionKey, events: RawEvent[]): ResampledRow[] {
  if (events.length === 0) return [];

  const eventsSorted = [...events].sort(
    (a, b) => Date.parse(a.occurred_at) - Date.parse(b.occurred_at),
  );
  const first = eventsSorted[0];
  const last = eventsSorted[eventsSorted.length - 1];
  if (!first || !last) return [];

  const sessionStartMs = Date.parse(first.occurred_at);
  const sessionEndMs = Date.parse(last.occurred_at);
  if (!Number.isFinite(sessionStartMs) || !Number.isFinite(sessionEndMs)) return [];

  const binCount = Math.max(1, Math.ceil((sessionEndMs - sessionStartMs) / BIN_WIDTH_MS) + 1);
  const bins: BinAccum[] = Array.from({ length: binCount }, (_, i) =>
    newBin(i, sessionStartMs + i * BIN_WIDTH_MS),
  );

  let visibilityHiddenSinceMs: number | null = null;
  let inactivitySinceMs: number | null = null;
  let currentLessonSection: string | null = null;
  let currentOverlayKind: string | null = null;

  for (const event of eventsSorted) {
    const t = Date.parse(event.occurred_at);
    if (!Number.isFinite(t)) continue;
    const binIdx = Math.min(
      bins.length - 1,
      Math.max(0, Math.floor((t - sessionStartMs) / BIN_WIDTH_MS)),
    );
    const bin = bins[binIdx];
    if (!bin) continue;
    bin.events_total += 1;

    const payload = payloadOf(event);

    switch (event.event_type) {
      case "overlay_shown": {
        bin.overlay_event_count += 1;
        currentOverlayKind =
          typeof payload.kind === "string" ? payload.kind : currentOverlayKind;
        break;
      }
      case "overlay_answered": {
        bin.overlay_event_count += 1;
        bin.overlay_attempted += 1;
        if (payload.correct === true) bin.overlay_correct += 1;
        const latency = numericPayload(payload, "latency_ms");
        if (latency !== null && latency >= 0) bin.latencies.push(latency);
        if (typeof payload.kind === "string") currentOverlayKind = payload.kind;
        break;
      }
      case "overlay_skipped": {
        bin.overlay_event_count += 1;
        bin.overlay_skipped += 1;
        const latency = numericPayload(payload, "latency_ms");
        if (latency !== null && latency >= 0) bin.latencies.push(latency);
        break;
      }
      case "overlay_hint_used": {
        bin.overlay_event_count += 1;
        bin.overlay_hint_used += 1;
        break;
      }
      case "video_seek": {
        if (payload.direction === "back") bin.seek_back_count += 1;
        const from = numericPayload(payload, "from_sec");
        const to = numericPayload(payload, "to_sec");
        if (from !== null && to !== null && from - to > 1) bin.replay_count += 1;
        break;
      }
      case "video_play":
      case "video_pause":
      case "video_ended":
      case "clip_locked": {
        if (event.event_type === "clip_locked" && typeof payload.section_title === "string") {
          currentLessonSection = payload.section_title;
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
      default:
        break;
    }

    if (bin.lesson_section === null) bin.lesson_section = currentLessonSection;
    if (bin.active_overlay_kind === null) bin.active_overlay_kind = currentOverlayKind;
  }

  if (visibilityHiddenSinceMs !== null) {
    spreadDuration(bins, sessionStartMs, visibilityHiddenSinceMs, sessionEndMs, "visibility_hidden_ms");
  }
  if (inactivitySinceMs !== null) {
    spreadDuration(bins, sessionStartMs, inactivitySinceMs, sessionEndMs, "inactivity_ms");
  }

  let lastSection: string | null = null;
  let lastKind: string | null = null;
  for (const bin of bins) {
    if (bin.lesson_section !== null) lastSection = bin.lesson_section;
    else bin.lesson_section = lastSection;
    if (bin.active_overlay_kind !== null) lastKind = bin.active_overlay_kind;
    else bin.active_overlay_kind = lastKind;
  }

  return bins.map((bin) => {
    const meanLatency =
      bin.latencies.length > 0
        ? bin.latencies.reduce((sum, x) => sum + x, 0) / bin.latencies.length
        : null;
    const latencyVar = bin.latencies.length >= 2 ? variance(bin.latencies) : null;
    const accuracy =
      bin.overlay_attempted > 0 ? bin.overlay_correct / bin.overlay_attempted : null;
    return {
      user_id: key.user_id,
      session_id: key.session_id,
      lesson_id: key.lesson_id,
      bin_index: bin.bin_index,
      bin_start: new Date(bin.bin_start_ms).toISOString(),
      bin_end: new Date(bin.bin_start_ms + BIN_WIDTH_MS).toISOString(),
      click_count: bin.click_count,
      overlay_event_count: bin.overlay_event_count,
      events_total: bin.events_total,
      mean_latency_ms: meanLatency,
      latency_variance_ms2: latencyVar,
      replay_count: bin.replay_count,
      seek_back_count: bin.seek_back_count,
      visibility_hidden_ms: Math.round(bin.visibility_hidden_ms),
      inactivity_ms: Math.round(bin.inactivity_ms),
      tab_switch_count: bin.tab_switch_count,
      overlay_attempted: bin.overlay_attempted,
      overlay_correct: bin.overlay_correct,
      overlay_skipped: bin.overlay_skipped,
      overlay_hint_used: bin.overlay_hint_used,
      accuracy_in_bin: accuracy,
      lesson_section: bin.lesson_section,
      active_overlay_kind: bin.active_overlay_kind,
      resampler_version: RESAMPLER_VERSION,
    };
  });
}

function sampleEvenly<T>(items: T[], maxItems: number): T[] {
  if (items.length <= maxItems) return items;
  if (maxItems <= 1) return items.slice(0, 1);
  const sampled: T[] = [];
  const lastIndex = items.length - 1;
  for (let i = 0; i < maxItems; i++) {
    const idx = Math.round((i * lastIndex) / (maxItems - 1));
    const item = items[idx];
    if (item !== undefined) sampled.push(item);
  }
  return sampled;
}

function computeTransitionFeatures(events: RawEvent[]) {
  let wrongCount = 0;
  let wrongFollowedBySeekBack = 0;
  let replaysBetweenOverlays = false;
  let replayFollowedOverlays = 0;
  let replayFollowedCorrects = 0;
  let confusionLoops = 0;
  let inLoopAfterWrong = false;
  let lastHiddenMs: number | null = null;
  const visibilityReturnDurations: number[] = [];

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    if (!event) continue;
    const t = Date.parse(event.occurred_at);
    if (!Number.isFinite(t)) continue;
    const payload = payloadOf(event);

    if (event.event_type === "overlay_answered") {
      const correct = payload.correct === true;
      if (replaysBetweenOverlays) {
        replayFollowedOverlays += 1;
        if (correct) replayFollowedCorrects += 1;
      }
      replaysBetweenOverlays = false;

      if (!correct) {
        wrongCount += 1;
        for (let j = i + 1; j < events.length; j++) {
          const nextEvent = events[j];
          if (!nextEvent) continue;
          const t2 = Date.parse(nextEvent.occurred_at);
          if (!Number.isFinite(t2)) continue;
          if (t2 - t > SEEK_BACK_WINDOW_MS) break;
          if (nextEvent.event_type === "video_seek" && payloadOf(nextEvent).direction === "back") {
            wrongFollowedBySeekBack += 1;
            break;
          }
        }

        if (inLoopAfterWrong) {
          confusionLoops += 1;
          inLoopAfterWrong = false;
        }
        inLoopAfterWrong = true;
      } else {
        inLoopAfterWrong = false;
      }
    } else if (event.event_type === "video_seek" && payload.direction === "back") {
      replaysBetweenOverlays = true;
    } else if (event.event_type === "visibility_hidden") {
      lastHiddenMs = t;
    } else if (event.event_type === "visibility_visible" && lastHiddenMs !== null) {
      visibilityReturnDurations.push(t - lastHiddenMs);
      lastHiddenMs = null;
    }
  }

  return {
    p_seek_back_after_wrong: wrongCount > 0 ? wrongFollowedBySeekBack / wrongCount : null,
    p_replay_then_correct:
      replayFollowedOverlays > 0 ? replayFollowedCorrects / replayFollowedOverlays : null,
    mean_visibility_return_ms:
      visibilityReturnDurations.length > 0 ? meanOf(visibilityReturnDurations) : null,
    confusion_loops: confusionLoops,
  };
}

function computeIsiFeatures(events: RawEvent[]) {
  const times = events
    .map((event) => Date.parse(event.occurred_at))
    .filter((time) => Number.isFinite(time))
    .sort((a, b) => a - b);

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
  for (let i = 1; i < times.length; i++) {
    const curr = times[i];
    const prev = times[i - 1];
    if (curr !== undefined && prev !== undefined) intervals.push(curr - prev);
  }

  const start = times[0] ?? 0;
  const end = times[times.length - 1] ?? start;
  const windowMs = BIN_WIDTH_MS * FANO_WINDOW_BINS;
  const buckets = Math.max(2, Math.ceil((end - start) / windowMs));
  const counts = new Array<number>(buckets).fill(0);
  for (const time of times) {
    const idx = Math.min(buckets - 1, Math.max(0, Math.floor((time - start) / windowMs)));
    counts[idx] += 1;
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

  const featureBins = sampleEvenly(bins, MAX_FEATURE_BINS);
  const latencyValues: Array<number | null> = featureBins.map((bin) => bin.mean_latency_ms);
  const replayValues: Array<number | null> = featureBins.map((bin) => bin.replay_count);
  const visibilityValues: Array<number | null> = featureBins.map((bin) => bin.visibility_hidden_ms);
  const inactivityValues: Array<number | null> = featureBins.map((bin) => bin.inactivity_ms);

  const latency = channelFeatures(latencyValues);
  const replay = channelFeatures(replayValues);
  const visibility = channelFeatures(visibilityValues);
  const inactivity = channelFeatures(inactivityValues);
  const isi = computeIsiFeatures(events);
  const transitions = computeTransitionFeatures(events);

  const totalAttempted = bins.reduce((sum, bin) => sum + bin.overlay_attempted, 0);
  const totalCorrect = bins.reduce((sum, bin) => sum + bin.overlay_correct, 0);
  const sessionAccuracy = totalAttempted > 0 ? totalCorrect / totalAttempted : null;

  return {
    user_id: key.user_id,
    session_id: key.session_id,
    lesson_id: key.lesson_id,
    bin_count: bins.length,
    wall_clock_duration_ms: bins.length * BIN_WIDTH_MS,
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
    computed_at: new Date().toISOString(),
  };
}

async function loadEvents(
  supabase: SupabaseClient,
  job: QueueJob,
): Promise<RawEvent[]> {
  let query = supabase
    .from("attention_events")
    .select("user_id, session_id, lesson_id, event_type, occurred_at, payload")
    .eq("user_id", job.user_id)
    .eq("session_id", job.session_id)
    .order("occurred_at", { ascending: true })
    .limit(MAX_EVENTS_PER_SESSION);

  if (job.last_event_at) query = query.lte("occurred_at", job.last_event_at);

  const { data, error } = await query;
  if (error) throw new Error(`event load failed: ${error.message}`);
  return (data ?? []) as RawEvent[];
}

async function loadBins(supabase: SupabaseClient, job: QueueJob): Promise<BinRow[]> {
  const { data, error } = await supabase
    .from("attention_signal_windows")
    .select(
      "bin_index, bin_start, mean_latency_ms, replay_count, visibility_hidden_ms, inactivity_ms, overlay_attempted, overlay_correct",
    )
    .eq("user_id", job.user_id)
    .eq("session_id", job.session_id)
    .order("bin_index", { ascending: true })
    .limit(10_000);

  if (error) throw new Error(`bin load failed: ${error.message}`);
  return (data ?? []) as BinRow[];
}

async function upsertBins(supabase: SupabaseClient, rows: ResampledRow[]) {
  for (let offset = 0; offset < rows.length; offset += 500) {
    const chunk = rows.slice(offset, offset + 500);
    const { error } = await supabase
      .from("attention_signal_windows")
      .upsert(chunk, { onConflict: "user_id,session_id,bin_index" });
    if (error) throw new Error(`window upsert failed: ${error.message}`);
  }
}

async function finishJob(
  supabase: SupabaseClient,
  job: QueueJob,
  status: "done" | "failed",
  errorMessage: string | null,
  processedThroughAt: string | null,
) {
  const { error } = await supabase.rpc("finish_attention_rollup_job", {
    p_id: job.id,
    p_status: status,
    p_error: errorMessage,
    p_processed_through_at: processedThroughAt,
    p_processed_event_count: job.event_count,
  });
  if (error) {
    throw new Error(`finish job failed: ${error.message}`);
  }
}

async function processJob(supabase: SupabaseClient, job: QueueJob) {
  const events = await loadEvents(supabase, job);
  if (events.length === 0) {
    await finishJob(supabase, job, "done", null, job.last_event_at);
    return { bins: 0, features: 0, events: 0 };
  }

  const key: SessionKey = {
    user_id: job.user_id,
    session_id: job.session_id,
    lesson_id: job.lesson_id ?? events[events.length - 1]?.lesson_id ?? null,
  };

  const windows = resampleSession(key, events);
  if (windows.length > 0) {
    await upsertBins(supabase, windows);
  }

  const bins = await loadBins(supabase, job);
  const featureRow = buildFeatureRow(key, bins, events);
  let states = 0;
  if (featureRow) {
    const { error } = await supabase
      .from("attention_features")
      .upsert(featureRow, { onConflict: "user_id,session_id,feature_pipeline_version" });
    if (error) throw new Error(`feature upsert failed: ${error.message}`);

    try {
      const inference = await inferAndStoreAttentionStateForSession(job.user_id, job.session_id);
      states = inference ? 1 : 0;
    } catch (error) {
      console.error("[attention-rollups] state inference failed", error);
    }
  }

  const lastProcessed = events[events.length - 1]?.occurred_at ?? job.last_event_at;
  await finishJob(supabase, job, "done", null, lastProcessed);
  return { bins: windows.length, features: featureRow ? 1 : 0, states, events: events.length };
}

export async function processAttentionRollupQueue(opts: {
  limit?: number;
  leaseSeconds?: number;
  workerId?: string;
} = {}) {
  const supabase = createAdminClient();
  const workerId = opts.workerId || `cron-${Date.now().toString(36)}`;
  const { data, error } = await supabase.rpc("claim_attention_rollup_jobs", {
    p_limit: opts.limit ?? 25,
    p_lease_seconds: opts.leaseSeconds ?? 300,
    p_worker_id: workerId,
  });

  if (error) throw new Error(`claim rollup jobs failed: ${error.message}`);

  const jobs = (data ?? []) as QueueJob[];
  const results: Array<{
    id: number;
    session_id: string;
    ok: boolean;
    bins?: number;
    features?: number;
    states?: number;
    events?: number;
    error?: string;
  }> = [];

  for (const job of jobs) {
    try {
      const result = await processJob(supabase, job);
      results.push({ id: job.id, session_id: job.session_id, ok: true, ...result });
    } catch (err) {
      const message = err instanceof Error ? err.message : "unknown error";
      try {
        await finishJob(supabase, job, "failed", message, null);
      } catch (finishErr) {
        console.error("[attention-rollups] failed to mark job failed", finishErr);
      }
      results.push({ id: job.id, session_id: job.session_id, ok: false, error: message });
    }
  }

  return {
    workerId,
    claimed: jobs.length,
    succeeded: results.filter((result) => result.ok).length,
    failed: results.filter((result) => !result.ok).length,
    results,
  };
}
