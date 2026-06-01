/**
 * lib/attentionFeatures.ts
 *
 * Pure feature kernels used by the Stage 2b extractor. No I/O, no
 * dependencies, no side effects — every function takes plain number arrays
 * and returns a number-or-null. Nulls are real (variance of a constant
 * signal is zero, Hjorth Mobility is then 0/0 = undefined), and downstream
 * is expected to respect them. This is the "representation validity" lever
 * — if a session produces NaN-heavy features, that means the source signal
 * was sparse/constant, not that the pipeline broke.
 *
 * Signal-processing references:
 *   * Hjorth, B. "EEG analysis based on time domain properties."
 *     Electroencephalogr. Clin. Neurophysiol. 29 (1970).
 *   * Stancin et al. "EEG Signal Features and their Application in Driver
 *     Drowsiness Detection Systems." Sensors 21 (2021). — the literal
 *     attention-state analogue of the Hjorth + PSD entropy stack used in
 *     the Cornell RMG paper (its Reference [17]).
 *   * Goh, K.-I. & Barabási, A.-L. "Burstiness and memory in complex
 *     systems." EPL 81 (2008). — burstiness coefficient B.
 *   * Cox & Lewis (1966) on Fano factor for point processes.
 *
 * Convention: when a feature is undefined for the input (e.g., variance of
 * a length-1 array), we return null rather than NaN so JSON serialization
 * and Postgres jsonb both treat it as a real missing value.
 */

const EPS = 1e-12;

// ── Basic statistics ─────────────────────────────────────────────────────

export function mean(xs: number[]): number | null {
  if (xs.length === 0) return null;
  let s = 0;
  for (const x of xs) s += x;
  return s / xs.length;
}

export function variance(xs: number[]): number | null {
  if (xs.length < 2) return null;
  const m = mean(xs) as number;
  let s = 0;
  for (const x of xs) s += (x - m) ** 2;
  return s / xs.length;
}

export function coefficientOfVariation(xs: number[]): number | null {
  const m = mean(xs);
  const v = variance(xs);
  if (m === null || v === null) return null;
  if (Math.abs(m) < EPS) return null; // ill-defined when mean is zero
  return Math.sqrt(v) / m;
}

// ── Hjorth parameters ───────────────────────────────────────────────────
// Activity   = variance(x)
// Mobility   = sqrt(var(x') / var(x))             where x' = first diff
// Complexity = mobility(x') / mobility(x)         (= mobility ratio)

export interface HjorthParams {
  activity: number | null;
  mobility: number | null;
  complexity: number | null;
}

function firstDifference(xs: number[]): number[] {
  if (xs.length < 2) return [];
  const out = new Array<number>(xs.length - 1);
  for (let i = 1; i < xs.length; i++) out[i - 1] = xs[i] - xs[i - 1];
  return out;
}

export function hjorthParams(xs: number[]): HjorthParams {
  if (xs.length < 3) return { activity: null, mobility: null, complexity: null };
  const activity = variance(xs);
  if (activity === null) return { activity: null, mobility: null, complexity: null };
  if (activity < EPS) {
    // Constant signal: Mobility = 0/0. We report Activity = 0 and the
    // higher-order derivatives as null so downstream models can spot the
    // "no variation" condition.
    return { activity: 0, mobility: null, complexity: null };
  }
  const dx = firstDifference(xs);
  const varDx = variance(dx);
  if (varDx === null) return { activity, mobility: null, complexity: null };
  const mobility = Math.sqrt(varDx / activity);
  if (varDx < EPS) {
    return { activity, mobility: 0, complexity: null };
  }
  const ddx = firstDifference(dx);
  const varDdx = variance(ddx);
  if (varDdx === null) return { activity, mobility, complexity: null };
  const mobilityDx = Math.sqrt(varDdx / varDx);
  const complexity = mobility > EPS ? mobilityDx / mobility : null;
  return { activity, mobility, complexity };
}

// ── Zero crossings (after mean removal) ─────────────────────────────────

export function zeroCrossings(xs: number[]): number | null {
  if (xs.length < 2) return null;
  const m = mean(xs) as number;
  let count = 0;
  for (let i = 1; i < xs.length; i++) {
    const prev = xs[i - 1] - m;
    const curr = xs[i] - m;
    if ((prev < 0 && curr >= 0) || (prev > 0 && curr <= 0)) count++;
  }
  return count;
}

// ── Power spectral density via direct DFT ───────────────────────────────
// We use a straight DFT rather than radix-2 FFT because input sizes are
// small (typically a few hundred bins) and the simplicity beats the cost
// of zero-padding to a power of two.

interface ComplexPair { re: number; im: number; }

function dft(xs: number[]): ComplexPair[] {
  const N = xs.length;
  const out: ComplexPair[] = new Array(N);
  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const angle = (-2 * Math.PI * k * n) / N;
      re += xs[n] * Math.cos(angle);
      im += xs[n] * Math.sin(angle);
    }
    out[k] = { re, im };
  }
  return out;
}

/** Power per non-DC, non-Nyquist frequency bin (one-sided). */
function powerSpectrum(xs: number[]): number[] {
  if (xs.length < 4) return [];
  const m = mean(xs) as number;
  const detrended = xs.map((x) => x - m);
  const fft = dft(detrended);
  // Keep frequencies 1..N/2-1 (drop DC, drop Nyquist on even-length).
  const half = Math.floor(fft.length / 2);
  const out: number[] = [];
  for (let k = 1; k < half; k++) {
    out.push(fft[k].re * fft[k].re + fft[k].im * fft[k].im);
  }
  return out;
}

export function spectralEnergy(xs: number[]): number | null {
  if (xs.length < 4) return null;
  const ps = powerSpectrum(xs);
  if (ps.length === 0) return null;
  let s = 0;
  for (const p of ps) s += p;
  return s;
}

export function psdEntropy(xs: number[]): number | null {
  if (xs.length < 4) return null;
  const ps = powerSpectrum(xs);
  if (ps.length === 0) return null;
  let total = 0;
  for (const p of ps) total += p;
  if (total < EPS) return 0; // constant signal → no spectral content → zero entropy
  let h = 0;
  for (const p of ps) {
    const q = p / total;
    if (q > EPS) h -= q * Math.log2(q);
  }
  return h;
}

// ── Event-domain (point-process) features ───────────────────────────────

/**
 * Goh & Barabási (2008) burstiness coefficient.
 *   B = (σ - μ) / (σ + μ)
 *   B = -1 : perfectly periodic
 *   B =  0 : Poisson
 *   B = +1 : maximally bursty
 */
export function burstinessGB(intervals: number[]): number | null {
  if (intervals.length < 2) return null;
  const m = mean(intervals) as number;
  const v = variance(intervals);
  if (v === null) return null;
  const s = Math.sqrt(v);
  const denom = s + m;
  if (denom < EPS) return null;
  return (s - m) / denom;
}

/**
 * Fano factor over fixed-width windows of event counts.
 *   F = variance(count) / mean(count)
 *   F = 1 : Poisson process
 *   F < 1 : underdispersed / regular
 *   F > 1 : overdispersed / bursty
 */
export function fanoFactor(counts: number[]): number | null {
  if (counts.length < 2) return null;
  const m = mean(counts) as number;
  if (Math.abs(m) < EPS) return null;
  const v = variance(counts);
  if (v === null) return null;
  return v / m;
}

/**
 * Shannon entropy of inter-event intervals binned into `nBins` log-spaced
 * buckets. Useful for separating "regular metronome" sessions from
 * "rare bursts surrounded by silence" sessions, both of which can have
 * similar means but very different temporal structure.
 */
export function isiEntropy(intervals: number[], nBins = 12): number | null {
  if (intervals.length < 4) return null;
  const positives = intervals.filter((x) => x > 0);
  if (positives.length < 4) return null;
  let mn = Infinity;
  let mx = -Infinity;
  for (const x of positives) {
    const lx = Math.log10(x);
    if (lx < mn) mn = lx;
    if (lx > mx) mx = lx;
  }
  if (mx - mn < EPS) return 0; // all intervals identical → entropy 0
  const range = mx - mn;
  const counts = new Array(nBins).fill(0) as number[];
  for (const x of positives) {
    const lx = Math.log10(x);
    let idx = Math.floor(((lx - mn) / range) * nBins);
    if (idx >= nBins) idx = nBins - 1;
    counts[idx]++;
  }
  const total = positives.length;
  let h = 0;
  for (const c of counts) {
    if (c === 0) continue;
    const p = c / total;
    h -= p * Math.log2(p);
  }
  return h;
}

// ── Convenience: full per-channel feature set ───────────────────────────

export interface ChannelFeatureSet {
  mean: number | null;
  var: number | null;
  cv: number | null;
  hjorth_activity: number | null;
  hjorth_mobility: number | null;
  hjorth_complexity: number | null;
  psd_entropy: number | null;
  spectral_energy: number | null;
  zc: number | null;
  valid_bins: number;
}

/**
 * Compute the standard per-channel feature set, splitting "aggregate mean"
 * (over non-null bins only) from "signal-processing features" (with NULL
 * imputed as 0 so the time-grid stays uniform). This is the documented
 * split called out in the migration:
 *   * mean / var / cv  → describe "when student does X, how much?"
 *   * Hjorth / PSD / ZC → describe activity pattern across the session
 *     INCLUDING the sparsity of action — NULL → 0 makes silence visible.
 */
export function channelFeatures(values: Array<number | null>): ChannelFeatureSet {
  const nonNull: number[] = [];
  for (const v of values) if (v !== null) nonNull.push(v);
  const filled = values.map((v) => (v === null ? 0 : v));

  const m = mean(nonNull);
  const v = variance(nonNull);
  const cv = coefficientOfVariation(nonNull);
  const h = hjorthParams(filled);
  const psd = psdEntropy(filled);
  const energy = spectralEnergy(filled);
  const zc = zeroCrossings(filled);

  return {
    mean: m,
    var: v,
    cv,
    hjorth_activity: h.activity,
    hjorth_mobility: h.mobility,
    hjorth_complexity: h.complexity,
    psd_entropy: psd,
    spectral_energy: energy,
    zc,
    valid_bins: nonNull.length,
  };
}
