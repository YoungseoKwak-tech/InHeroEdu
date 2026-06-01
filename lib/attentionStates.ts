import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase";

export const ATTENTION_MODEL_VERSION = 1;

export const ATTENTION_STATES = [
  "focused_flow",
  "productive_struggle",
  "passive_drift",
  "overloaded",
  "quick_scan",
] as const;

export type AttentionState = (typeof ATTENTION_STATES)[number];

type StateScores = Record<AttentionState, number>;

interface AttentionFeatureRow {
  id: number;
  user_id: string;
  session_id: string;
  lesson_id: string | null;
  bin_count: number;
  wall_clock_duration_ms: number;
  feature_pipeline_version: number;
  latency_mean: number | null;
  replay_mean: number | null;
  visibility_mean: number | null;
  inactivity_mean: number | null;
  total_events: number | null;
  isi_burstiness: number | null;
  isi_fano_factor: number | null;
  p_seek_back_after_wrong: number | null;
  p_replay_then_correct: number | null;
  confusion_loops: number | null;
  session_accuracy: number | null;
  computed_at: string;
}

interface ObservationVector {
  activity: number;
  friction: number;
  drift: number;
  mastery: number;
  volatility: number;
  confusion: number;
  duration_minutes: number;
  event_rate_per_min: number;
  missingness: number;
}

interface StateInference {
  feature: AttentionFeatureRow;
  rawState: AttentionState;
  smoothedState: AttentionState;
  confidence: number;
  posterior: StateScores;
  emissionScores: StateScores;
  observations: ObservationVector;
}

const FEATURE_SELECT = [
  "id",
  "user_id",
  "session_id",
  "lesson_id",
  "bin_count",
  "wall_clock_duration_ms",
  "feature_pipeline_version",
  "latency_mean",
  "replay_mean",
  "visibility_mean",
  "inactivity_mean",
  "total_events",
  "isi_burstiness",
  "isi_fano_factor",
  "p_seek_back_after_wrong",
  "p_replay_then_correct",
  "confusion_loops",
  "session_accuracy",
  "computed_at",
].join(", ");

const TRANSITION_PRIOR: Record<AttentionState, StateScores> = {
  focused_flow: {
    focused_flow: 0.66,
    productive_struggle: 0.14,
    passive_drift: 0.07,
    overloaded: 0.05,
    quick_scan: 0.08,
  },
  productive_struggle: {
    focused_flow: 0.16,
    productive_struggle: 0.58,
    passive_drift: 0.07,
    overloaded: 0.14,
    quick_scan: 0.05,
  },
  passive_drift: {
    focused_flow: 0.08,
    productive_struggle: 0.08,
    passive_drift: 0.64,
    overloaded: 0.12,
    quick_scan: 0.08,
  },
  overloaded: {
    focused_flow: 0.06,
    productive_struggle: 0.18,
    passive_drift: 0.14,
    overloaded: 0.56,
    quick_scan: 0.06,
  },
  quick_scan: {
    focused_flow: 0.16,
    productive_struggle: 0.08,
    passive_drift: 0.12,
    overloaded: 0.06,
    quick_scan: 0.58,
  },
};

function safeNumber(value: number | null | undefined, fallback = 0): number {
  return Number.isFinite(value) ? Number(value) : fallback;
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function softmax(scores: StateScores): StateScores {
  const values = ATTENTION_STATES.map((state) => scores[state]);
  const max = Math.max(...values);
  const exp = ATTENTION_STATES.map((state) => Math.exp(scores[state] - max));
  const total = exp.reduce((sum, value) => sum + value, 0) || 1;
  return Object.fromEntries(
    ATTENTION_STATES.map((state, index) => [state, exp[index] / total]),
  ) as StateScores;
}

function bestState(scores: StateScores): AttentionState {
  let best: AttentionState = "focused_flow";
  for (const state of ATTENTION_STATES) {
    if (scores[state] > scores[best]) best = state;
  }
  return best;
}

function buildObservations(feature: AttentionFeatureRow): ObservationVector {
  const durationMinutes = Math.max(0.1, safeNumber(feature.wall_clock_duration_ms) / 60_000);
  const eventRate = safeNumber(feature.total_events) / durationMinutes;
  const latency = safeNumber(feature.latency_mean, 0);
  const replay = safeNumber(feature.replay_mean, 0);
  const visibility = safeNumber(feature.visibility_mean, 0);
  const inactivity = safeNumber(feature.inactivity_mean, 0);
  const accuracy = feature.session_accuracy;

  const missingSignals = [
    feature.latency_mean,
    feature.replay_mean,
    feature.visibility_mean,
    feature.inactivity_mean,
    feature.session_accuracy,
    feature.p_seek_back_after_wrong,
    feature.p_replay_then_correct,
  ].filter((value) => value === null || value === undefined).length;

  const friction = clamp01(
    Math.max(
      latency / 20_000,
      replay / 3,
      safeNumber(feature.p_seek_back_after_wrong, 0),
      safeNumber(feature.confusion_loops, 0) / 3,
    ),
  );

  const drift = clamp01(Math.max(visibility / 5_000, inactivity / 5_000));
  const activity = clamp01(eventRate / 12);
  const mastery = accuracy === null || accuracy === undefined ? 0.5 : clamp01(accuracy);
  const volatility = clamp01(
    Math.max(
      Math.abs(safeNumber(feature.isi_burstiness, 0)),
      safeNumber(feature.isi_fano_factor, 0) / 4,
    ),
  );
  const confusion = clamp01(
    Math.max(
      safeNumber(feature.confusion_loops, 0) / 3,
      safeNumber(feature.p_seek_back_after_wrong, 0),
      1 - mastery,
    ),
  );

  return {
    activity,
    friction,
    drift,
    mastery,
    volatility,
    confusion,
    duration_minutes: Number(durationMinutes.toFixed(2)),
    event_rate_per_min: Number(eventRate.toFixed(2)),
    missingness: clamp01(missingSignals / 7),
  };
}

function scoreEmissions(obs: ObservationVector): StateScores {
  const scores: StateScores = {
    focused_flow:
      1.3 * obs.mastery +
      0.8 * obs.activity +
      0.35 * (1 - obs.volatility) -
      1.1 * obs.friction -
      1.1 * obs.drift,

    productive_struggle:
      1.05 * obs.friction +
      0.75 * obs.activity +
      0.45 * obs.mastery +
      0.35 * obs.volatility -
      0.8 * obs.drift -
      0.35 * obs.confusion,

    passive_drift:
      1.35 * obs.drift +
      0.7 * (1 - obs.activity) +
      0.35 * (1 - obs.mastery) -
      0.35 * obs.friction,

    overloaded:
      1.05 * obs.confusion +
      0.95 * obs.friction +
      0.65 * (1 - obs.mastery) +
      0.35 * obs.drift +
      0.25 * obs.volatility,

    quick_scan:
      1.25 * obs.activity +
      0.55 * obs.volatility +
      0.35 * (1 - obs.friction) -
      0.45 * obs.drift,
  };

  if (obs.duration_minutes < 3 && obs.activity > 0.5) scores.quick_scan += 0.4;
  if (obs.missingness > 0.5) {
    scores.quick_scan -= 0.15;
    scores.focused_flow -= 0.15;
  }

  return softmax(scores);
}

function confidenceFor(posterior: StateScores, state: AttentionState) {
  const sorted = ATTENTION_STATES.map((s) => posterior[s]).sort((a, b) => b - a);
  const margin = (sorted[0] ?? 0) - (sorted[1] ?? 0);
  return clamp01(posterior[state] * 0.75 + margin * 0.25);
}

function inferSequence(features: AttentionFeatureRow[]): StateInference[] {
  if (features.length === 0) return [];

  const emissions = features.map((feature) => {
    const observations = buildObservations(feature);
    const posterior = scoreEmissions(observations);
    return { feature, observations, posterior, rawState: bestState(posterior) };
  });

  const dp: Array<StateScores> = [];
  const backpointers: Array<Record<AttentionState, AttentionState>> = [];
  const uniformPrior = Math.log(1 / ATTENTION_STATES.length);

  for (let t = 0; t < emissions.length; t++) {
    const current: Partial<StateScores> = {};
    const back: Partial<Record<AttentionState, AttentionState>> = {};

    for (const state of ATTENTION_STATES) {
      const emission = Math.log(Math.max(emissions[t]?.posterior[state] ?? 1e-9, 1e-9));
      if (t === 0) {
        current[state] = uniformPrior + emission;
        back[state] = state;
        continue;
      }

      let bestPrev: AttentionState = ATTENTION_STATES[0];
      let bestScore = Number.NEGATIVE_INFINITY;
      for (const prev of ATTENTION_STATES) {
        const prevScore = dp[t - 1]?.[prev] ?? Number.NEGATIVE_INFINITY;
        const transition = Math.log(Math.max(TRANSITION_PRIOR[prev][state], 1e-9));
        const candidate = prevScore + transition + emission;
        if (candidate > bestScore) {
          bestScore = candidate;
          bestPrev = prev;
        }
      }
      current[state] = bestScore;
      back[state] = bestPrev;
    }

    dp.push(current as StateScores);
    backpointers.push(back as Record<AttentionState, AttentionState>);
  }

  const lastScores = dp[dp.length - 1] as StateScores;
  const smoothed: AttentionState[] = new Array(features.length);
  smoothed[features.length - 1] = bestState(lastScores);

  for (let t = features.length - 1; t > 0; t--) {
    const nextState = smoothed[t] ?? "focused_flow";
    smoothed[t - 1] = backpointers[t]?.[nextState] ?? nextState;
  }

  return emissions.map((entry, index) => {
    const smoothedState = smoothed[index] ?? entry.rawState;
    return {
      feature: entry.feature,
      rawState: entry.rawState,
      smoothedState,
      confidence: confidenceFor(entry.posterior, smoothedState),
      posterior: entry.posterior,
      emissionScores: entry.posterior,
      observations: entry.observations,
    };
  });
}

async function loadFeatureSequence(
  supabase: SupabaseClient,
  userId: string,
  sessionId: string,
  limit: number,
) {
  const { data: current, error: currentError } = await supabase
    .from("attention_features")
    .select(FEATURE_SELECT)
    .eq("user_id", userId)
    .eq("session_id", sessionId)
    .eq("feature_pipeline_version", 1)
    .order("computed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (currentError) throw new Error(`load current feature failed: ${currentError.message}`);
  if (!current) return [];

  const currentFeature = current as unknown as AttentionFeatureRow;
  const { data, error } = await supabase
    .from("attention_features")
    .select(FEATURE_SELECT)
    .eq("user_id", userId)
    .eq("feature_pipeline_version", currentFeature.feature_pipeline_version)
    .lte("computed_at", currentFeature.computed_at)
    .order("computed_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`load feature sequence failed: ${error.message}`);

  const rows = ((data ?? []) as unknown as AttentionFeatureRow[]).filter(
    (row) => row.id !== null && row.session_id,
  );
  if (!rows.some((row) => row.id === currentFeature.id)) rows.push(currentFeature);

  return rows
    .sort((a, b) => Date.parse(a.computed_at) - Date.parse(b.computed_at))
    .slice(-limit);
}

async function storeInferences(supabase: SupabaseClient, inferences: StateInference[]) {
  if (inferences.length === 0) return;

  const rows = inferences.map((inference) => ({
    user_id: inference.feature.user_id,
    session_id: inference.feature.session_id,
    lesson_id: inference.feature.lesson_id,
    feature_id: inference.feature.id,
    feature_pipeline_version: inference.feature.feature_pipeline_version,
    model_version: ATTENTION_MODEL_VERSION,
    raw_state: inference.rawState,
    smoothed_state: inference.smoothedState,
    confidence: inference.confidence,
    posterior: inference.posterior,
    emission_scores: inference.emissionScores,
    observations: inference.observations,
    transition_prior: TRANSITION_PRIOR,
    inferred_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("attention_state_inferences")
    .upsert(rows, { onConflict: "user_id,session_id,model_version" });

  if (error) throw new Error(`state inference upsert failed: ${error.message}`);
}

export async function inferAndStoreAttentionStateForSession(
  userId: string,
  sessionId: string,
  opts: { sequenceLimit?: number } = {},
) {
  const supabase = createAdminClient();
  const features = await loadFeatureSequence(supabase, userId, sessionId, opts.sequenceLimit ?? 24);
  const inferences = inferSequence(features);
  await storeInferences(supabase, inferences);
  return inferences.find((inference) => inference.feature.session_id === sessionId) ?? null;
}

export async function getRecentAttentionStates(userId: string, limit = 50) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("attention_state_inferences")
    .select("*")
    .eq("user_id", userId)
    .eq("model_version", ATTENTION_MODEL_VERSION)
    .order("inferred_at", { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 200));

  if (error) throw new Error(`load attention states failed: ${error.message}`);
  return data ?? [];
}
