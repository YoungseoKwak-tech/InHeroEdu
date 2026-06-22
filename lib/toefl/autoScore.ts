/**
 * Free, on-device TOEFL Speaking/Writing auto-scorer — no API, no cost.
 *
 * Approximates the official 0–4 rubric from objective text metrics computed in
 * the browser: length, on-topic keyword overlap, organization (sentences +
 * transitions), language range (vocabulary diversity), and — for speaking —
 * fluency (words-per-minute) with a filler penalty. Returns a 0–4 band, a 0–30
 * scaled estimate, metric chips, and Korean feedback/tips.
 *
 * It can't judge meaning like an LLM, but it's instant, consistent, and $0 —
 * good as the default, with the optional AI route layered on top when desired.
 */

export interface AutoScoreMetric { label: string; ok: boolean }
export interface AutoScoreResult {
  overall: number;          // 0–4
  scaled: number;           // 0–30
  metrics: AutoScoreMetric[];
  feedback: string;         // Korean
  tips: string[];           // Korean
}

const FILLERS = ["um", "uh", "er", "you know", "i mean", "kind of", "sort of", "basically", "literally"];
const CONNECTIVES = ["however", "because", "for example", "for instance", "although", "while", "in contrast", "therefore", "moreover", "in addition", "on the other hand", "as a result", "first", "second", "third", "finally", "furthermore", "so that", "such as", "in conclusion"];
const STOPWORDS = new Set(["the", "a", "an", "and", "or", "but", "of", "to", "in", "on", "for", "with", "that", "this", "these", "those", "is", "are", "was", "were", "be", "been", "it", "its", "as", "at", "by", "from", "i", "you", "he", "she", "they", "we", "my", "your", "their", "our", "do", "does", "did", "can", "will", "would", "should", "could", "have", "has", "had", "not", "so", "if", "then", "than", "about", "into", "more", "most", "some", "any", "also", "just", "very", "really", "thing", "things", "people", "because"]);

function wordsArr(s: string): string[] { return s.trim() ? s.trim().split(/\s+/) : []; }
function sentences(s: string): string[] { return s.split(/[.!?]+/).map((t) => t.trim()).filter((t) => t.length > 0); }
function contentWords(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/).filter((w) => w.length >= 4 && !STOPWORDS.has(w));
}
function clamp01(n: number): number { return Math.max(0, Math.min(1, n)); }

export function autoScore(opts: {
  kind: "speaking" | "writing";
  variant: "independent" | "integrated" | "discussion";
  text: string;
  prompt: string;
  sourceText?: string;
  respSec?: number;
  targetWords: number;
}): AutoScoreResult {
  const { kind, variant, text, prompt, sourceText, respSec, targetWords } = opts;
  const w = wordsArr(text);
  const n = w.length;
  const sents = sentences(text);
  const low = ` ${text.toLowerCase()} `;

  // ── sub-scores (0..1) ─────────────────────────────────────────────────────
  const lengthScore = clamp01(n / Math.max(1, targetWords));

  const promptKeys = Array.from(new Set(contentWords(`${prompt} ${variant === "independent" ? "" : sourceText ?? ""}`)));
  const respSet = new Set(contentWords(text));
  const matched = promptKeys.filter((k) => respSet.has(k)).length;
  const topicScore = promptKeys.length === 0 ? 0.6 : clamp01(matched / Math.min(promptKeys.length, 10));

  const connCount = CONNECTIVES.filter((c) => low.includes(` ${c} `) || low.includes(`${c} `)).length;
  const structureScore = clamp01((Math.min(sents.length, 5) / 5) * 0.6 + (Math.min(connCount, 3) / 3) * 0.4);

  const uniq = new Set(w.map((x) => x.toLowerCase())).size;
  const diversity = n === 0 ? 0 : uniq / n; // type-token ratio
  const languageScore = clamp01((diversity - 0.35) / 0.35); // ~0.35 low → 0.70 high

  let fluencyScore = 0;
  let wpm = 0;
  if (kind === "speaking" && respSec && respSec > 0) {
    wpm = Math.round(n / (respSec / 60));
    fluencyScore = wpm >= 110 && wpm <= 160 ? 1 : wpm < 110 ? clamp01(wpm / 110) : clamp01(1 - (wpm - 160) / 120);
    const fillers = FILLERS.reduce((sum, f) => sum + (low.split(f).length - 1), 0);
    fluencyScore = clamp01(fluencyScore - (n ? (fillers / n) * 4 : 0));
  }

  // ── weighted total ────────────────────────────────────────────────────────
  const score01 = kind === "speaking"
    ? topicScore * 0.30 + lengthScore * 0.20 + structureScore * 0.20 + languageScore * 0.15 + fluencyScore * 0.15
    : topicScore * 0.30 + lengthScore * 0.20 + structureScore * 0.27 + languageScore * 0.23;

  const overall = Math.max(0, Math.min(4, Math.round(score01 * 4)));
  const scaled = Math.round(score01 * 30);

  // ── metrics + feedback ────────────────────────────────────────────────────
  const metrics: AutoScoreMetric[] = [
    { label: `길이 ${n}/${targetWords} 단어`, ok: lengthScore >= 0.85 },
    { label: `주제 적합 ${Math.round(topicScore * 100)}%`, ok: topicScore >= 0.5 },
    { label: `연결어 ${connCount}개`, ok: connCount >= 2 },
    { label: `어휘 다양성 ${Math.round(diversity * 100)}%`, ok: languageScore >= 0.5 },
  ];
  if (kind === "speaking" && respSec) metrics.push({ label: `말하기 속도 ${wpm} WPM`, ok: fluencyScore >= 0.6 });

  const weak: string[] = [];
  if (lengthScore < 0.85) weak.push("분량");
  if (topicScore < 0.5) weak.push("주제 연결");
  if (structureScore < 0.6) weak.push("구성");
  if (languageScore < 0.5) weak.push("어휘");
  if (kind === "speaking" && respSec && fluencyScore < 0.6) weak.push("말하기 속도");

  const feedback = n < 5
    ? "답변이 거의 없어 채점할 수 없어요. 더 길게 작성/녹음해 주세요."
    : weak.length === 0
      ? "분량·주제·구성·어휘 모두 안정적이에요. 실제 시험에서도 통할 답변입니다."
      : `전반적으로 괜찮지만 ${weak.join("·")} 쪽을 보완하면 점수가 더 올라가요.`;

  const tips: string[] = [];
  if (lengthScore < 0.85) tips.push(`주어진 시간을 더 채워 ${targetWords}단어 이상으로 답하세요.`);
  if (topicScore < 0.5) tips.push("질문(통합형은 지문)의 핵심 키워드를 답변에 직접 사용하세요.");
  if (structureScore < 0.6) tips.push("First / For example / However 같은 연결어로 서론–근거–예시 구조를 잡으세요.");
  if (languageScore < 0.5) tips.push("같은 단어 반복을 줄이고 다양한 표현을 써보세요.");
  if (kind === "speaking" && respSec && fluencyScore < 0.6) tips.push(wpm < 110 ? "조금 더 막힘 없이 빠르게 말해보세요." : "너무 빠르지 않게, 또박또박 말해보세요.");

  return { overall, scaled, metrics, feedback, tips: tips.slice(0, 3) };
}
