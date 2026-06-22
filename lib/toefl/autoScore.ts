/**
 * Free, on-device TOEFL Speaking/Writing auto-scorer — no API, no cost.
 *
 * Approximates the official 0–4 rubric from a rich set of objective text
 * signals computed in the browser:
 *   • Length / time-fill          • On-topic keyword coverage (prompt)
 *   • Integrated-source coverage  • Organization (sentence count + transition VARIETY)
 *   • Lexical range (adjusted TTR + academic-word ratio)
 *   • Mechanics (writing: sentence completeness + punctuation + capitalization)
 *   • Fluency (speaking: words-per-minute) with filler + repetition penalties
 *
 * Each signal → 0..1, combined with task-specific weights → 0–4 band / 0–30,
 * plus specific Korean feedback that names the actual weak spots. It can't judge
 * meaning like an LLM, but it's instant, consistent, calibrated, and $0.
 */

export interface AutoScoreMetric { label: string; ok: boolean }
export interface AutoScoreResult {
  overall: number;          // 0–4
  scaled: number;           // 0–30
  metrics: AutoScoreMetric[];
  feedback: string;         // Korean
  tips: string[];           // Korean
}

const FILLERS = ["um", "uh", "er", "you know", "i mean", "kind of", "sort of", "basically", "literally", "actually", "well", "so yeah"];
const STOPWORDS = new Set(["the", "a", "an", "and", "or", "but", "of", "to", "in", "on", "for", "with", "that", "this", "these", "those", "is", "are", "was", "were", "be", "been", "being", "it", "its", "as", "at", "by", "from", "i", "you", "he", "she", "they", "we", "my", "your", "their", "our", "me", "him", "her", "them", "do", "does", "did", "can", "will", "would", "should", "could", "have", "has", "had", "not", "no", "so", "if", "then", "than", "about", "into", "more", "most", "some", "any", "all", "also", "just", "very", "really", "too", "much", "many", "thing", "things", "people", "want", "like", "get", "got", "make", "made", "good", "bad", "lot", "lots", "going", "think", "know"]);

// Transition words grouped by rhetorical function — variety (distinct groups) matters more than raw count.
const TRANSITION_GROUPS: Record<string, string[]> = {
  addition: ["in addition", "moreover", "furthermore", "also", "besides", "additionally"],
  contrast: ["however", "in contrast", "on the other hand", "although", "whereas", "while", "nevertheless", "yet"],
  cause: ["because", "therefore", "as a result", "consequently", "thus", "since", "due to", "so that"],
  example: ["for example", "for instance", "such as", "in particular", "specifically", "to illustrate"],
  sequence: ["first", "second", "third", "next", "then", "finally", "to begin"],
  conclusion: ["in conclusion", "overall", "in summary", "to sum up", "ultimately"],
};

// ~ Academic Word List sample — presence signals lexical sophistication.
const ACADEMIC = new Set(["analyze", "approach", "area", "assess", "assume", "benefit", "concept", "consist", "context", "create", "data", "define", "derive", "distribute", "economy", "environment", "establish", "estimate", "evident", "factor", "finance", "formula", "function", "identify", "income", "indicate", "individual", "interpret", "involve", "issue", "labor", "legal", "method", "occur", "percent", "period", "policy", "principle", "process", "require", "research", "respond", "role", "section", "significant", "similar", "source", "specific", "structure", "theory", "vary", "achieve", "acquire", "approximate", "attribute", "consequence", "constant", "contribute", "demonstrate", "dominant", "emphasis", "ensure", "exclude", "framework", "fundamental", "generate", "hypothesis", "implement", "implication", "infrastructure", "innovation", "mechanism", "perspective", "phenomenon", "preliminary", "primary", "resource", "sustain", "technology", "transition", "ultimate", "validity"]);

function wordsArr(s: string): string[] { return s.trim() ? s.trim().split(/\s+/) : []; }
function sentences(s: string): string[] { return s.split(/[.!?]+/).map((t) => t.trim()).filter((t) => t.split(/\s+/).length >= 2); }
function contentWords(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/).filter((w) => w.length >= 4 && !STOPWORDS.has(w));
}
function clamp01(n: number): number { return Math.max(0, Math.min(1, n)); }
function band(x: number, lo: number, hi: number): number { return clamp01((x - lo) / (hi - lo)); }

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
  const integrated = variant === "integrated";

  if (n < 5) {
    return { overall: 0, scaled: 0, metrics: [{ label: `길이 ${n}/${targetWords} 단어`, ok: false }], feedback: "답변이 거의 없어 채점할 수 없어요. 더 길게 작성/녹음해 주세요.", tips: ["주어진 시간을 충분히 활용해 답변을 완성하세요."] };
  }

  const sents = sentences(text);
  const low = ` ${text.toLowerCase().replace(/[^a-z\s]/g, " ").replace(/\s+/g, " ")} `;
  const cwords = contentWords(text);

  // ── Length ──
  const lengthScore = clamp01(n / Math.max(1, targetWords));

  // ── Topic relevance (prompt) ──
  const promptKeys = Array.from(new Set(contentWords(prompt)));
  const respSet = new Set(cwords);
  const promptHit = promptKeys.filter((k) => respSet.has(k)).length;
  const topicScore = promptKeys.length === 0 ? 0.6 : clamp01(promptHit / Math.min(promptKeys.length, 8));

  // ── Integrated source coverage ──
  let sourceScore = 0;
  if (integrated && sourceText) {
    const srcKeys = Array.from(new Set(contentWords(sourceText)));
    const srcHit = srcKeys.filter((k) => respSet.has(k)).length;
    sourceScore = srcKeys.length === 0 ? 0.5 : clamp01(srcHit / Math.min(srcKeys.length, 12));
  }

  // ── Organization (sentence count + transition variety) ──
  const groupsUsed = Object.values(TRANSITION_GROUPS).filter((arr) => arr.some((t) => low.includes(` ${t} `))).length;
  const orgScore = clamp01(band(sents.length, 1, 5) * 0.5 + band(groupsUsed, 0, 3) * 0.5);

  // ── Lexical range (adjusted diversity + academic words) ──
  const uniq = new Set(w.map((x) => x.toLowerCase())).size;
  const ttr = uniq / n;
  const expectedTtr = clamp01(1 - n / 400); // long texts naturally repeat → normalize
  const diversityScore = clamp01(band(ttr, 0.35 * (0.5 + expectedTtr), 0.72));
  const academicHits = new Set(cwords.filter((x) => ACADEMIC.has(x))).size;
  const academicScore = clamp01(band(academicHits, 0, 6));
  const lexScore = clamp01(diversityScore * 0.6 + academicScore * 0.4);

  // ── Repetition penalty (over-used content word) ──
  const freq = new Map<string, number>();
  for (const x of cwords) freq.set(x, (freq.get(x) ?? 0) + 1);
  const maxFreq = Math.max(0, ...freq.values());
  const repScore = clamp01(1 - band(cwords.length ? maxFreq / cwords.length : 0, 0.06, 0.18));

  // ── Mechanics (writing) ──
  let mechScore = 0;
  if (kind === "writing") {
    const avgLen = sents.length ? n / sents.length : n;
    const lenOk = band(avgLen, 6, 12) * (avgLen > 30 ? 0.5 : 1); // too-long = run-ons
    const caps = sents.filter((s) => /^[A-Z]/.test(s)).length;
    const capOk = sents.length ? caps / sents.length : 0;
    const hasPunct = /[.!?]/.test(text) ? 1 : 0;
    mechScore = clamp01(lenOk * 0.5 + capOk * 0.3 + hasPunct * 0.2);
  }

  // ── Fluency (speaking) ──
  let fluencyScore = 0;
  let wpm = 0;
  if (kind === "speaking" && respSec && respSec > 0) {
    wpm = Math.round(n / (respSec / 60));
    fluencyScore = wpm >= 110 && wpm <= 160 ? 1 : wpm < 110 ? clamp01(wpm / 110) : clamp01(1 - (wpm - 160) / 120);
    const fillers = FILLERS.reduce((sum, f) => sum + (low.split(` ${f} `).length - 1), 0);
    fluencyScore = clamp01(fluencyScore - (n ? (fillers / n) * 5 : 0));
  }

  // ── Weighted total ──
  type WMap = Record<string, number>;
  const sub: WMap = { length: lengthScore, topic: topicScore, source: sourceScore, org: orgScore, lex: lexScore, rep: repScore, mech: mechScore, fluency: fluencyScore };
  const weights: WMap = kind === "speaking"
    ? (integrated
        ? { topic: 0.14, source: 0.20, org: 0.18, lex: 0.16, fluency: 0.14, rep: 0.08, length: 0.10 }
        : { topic: 0.24, org: 0.20, lex: 0.18, fluency: 0.16, rep: 0.07, length: 0.15 })
    : (integrated
        ? { topic: 0.12, source: 0.24, org: 0.20, lex: 0.16, mech: 0.12, rep: 0.08, length: 0.08 }
        : { topic: 0.20, org: 0.22, lex: 0.20, mech: 0.13, rep: 0.10, length: 0.15 });
  let total = 0, wsum = 0;
  for (const k in weights) { total += (sub[k] ?? 0) * weights[k]; wsum += weights[k]; }
  const score01 = clamp01(total / (wsum || 1));

  const overall = Math.max(0, Math.min(4, Math.round(score01 * 4)));
  const scaled = Math.round(score01 * 30);

  // ── Metrics chips ──
  const metrics: AutoScoreMetric[] = [
    { label: `길이 ${n}/${targetWords} 단어`, ok: lengthScore >= 0.85 },
    { label: `주제 적합 ${Math.round(topicScore * 100)}%`, ok: topicScore >= 0.5 },
  ];
  if (integrated) metrics.push({ label: `지문 근거 ${Math.round(sourceScore * 100)}%`, ok: sourceScore >= 0.4 });
  metrics.push({ label: `연결어 ${groupsUsed}종`, ok: groupsUsed >= 2 });
  metrics.push({ label: `어휘 다양성 ${Math.round(ttr * 100)}%`, ok: diversityScore >= 0.5 });
  metrics.push({ label: `학술어휘 ${academicHits}개`, ok: academicScore >= 0.5 });
  if (maxFreq / Math.max(1, cwords.length) > 0.12) metrics.push({ label: "단어 반복 많음", ok: false });
  if (kind === "writing") metrics.push({ label: "문장 완성도", ok: mechScore >= 0.55 });
  if (kind === "speaking" && respSec) metrics.push({ label: `속도 ${wpm} WPM`, ok: fluencyScore >= 0.6 });

  // ── Specific Korean feedback ──
  const weak: string[] = [];
  if (lengthScore < 0.85) weak.push("분량");
  if (topicScore < 0.5) weak.push("주제 연결");
  if (integrated && sourceScore < 0.4) weak.push("지문 근거");
  if (orgScore < 0.55) weak.push("구성·연결어");
  if (lexScore < 0.5) weak.push("어휘 수준");
  if (repScore < 0.6) weak.push("단어 반복");
  if (kind === "writing" && mechScore < 0.55) weak.push("문장 완성도");
  if (kind === "speaking" && respSec && fluencyScore < 0.6) weak.push("말하기 속도");

  const strong: string[] = [];
  if (lengthScore >= 0.95) strong.push("충분한 분량");
  if (topicScore >= 0.65) strong.push("주제 적중");
  if (groupsUsed >= 3) strong.push("다양한 연결어");
  if (academicScore >= 0.6) strong.push("수준 높은 어휘");

  const feedback = weak.length === 0
    ? `훌륭해요${strong.length ? ` — ${strong.slice(0, 2).join("·")}` : ""}. 분량·주제·구성·어휘가 고르게 안정적이라 실제 시험에서도 통할 답변입니다.`
    : `${strong.length ? `${strong[0]}은 좋아요. ` : ""}다만 ${weak.slice(0, 3).join("·")} 쪽을 보완하면 점수가 확실히 올라갑니다.`;

  // ── Targeted tips ──
  const tips: string[] = [];
  if (lengthScore < 0.85) tips.push(`${targetWords}단어 이상으로 끝까지 전개하세요 (현재 ${n}단어).`);
  if (integrated && sourceScore < 0.4) tips.push("통합형은 지문/강의의 핵심 포인트를 직접 언급해 근거로 써야 합니다.");
  else if (topicScore < 0.5) tips.push("질문의 핵심 키워드를 답변 안에서 직접 사용하세요.");
  if (orgScore < 0.55) tips.push("First / For example / However / In conclusion 등 서로 다른 연결어로 구조를 잡으세요.");
  if (lexScore < 0.5) tips.push("같은 표현 반복을 줄이고 학술 어휘(analyze, significant, factor 등)를 섞어보세요.");
  if (kind === "writing" && mechScore < 0.55) tips.push("한 문장이 너무 길지 않게 끊고, 문장마다 대문자·마침표를 지키세요.");
  if (kind === "speaking" && respSec && fluencyScore < 0.6) tips.push(wpm < 110 ? "막힘 없이 조금 더 빠르게, 군더더기어(um, like)를 줄이세요." : "너무 빠르지 않게 또박또박 말하세요.");

  return { overall, scaled, metrics, feedback, tips: tips.slice(0, 3) };
}
