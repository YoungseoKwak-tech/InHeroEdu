"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/app/contexts/LanguageContext";
import { t } from "@/lib/translations";
import { authFetch } from "@/lib/client-auth";
import UpgradePrompt from "@/components/ai-companion/UpgradePrompt";
import {
  EARLY_ACCESS_FALLBACK_MESSAGE,
  EARLY_ACCESS_LOADING_MESSAGE,
  getFeatureLimitMessage,
  getFeatureLockedMessage,
  getEarlyAccessDelayMs,
  hasReachedEarlyAccessLimit,
  incrementEarlyAccessUsage,
} from "@/lib/ai-access";

type Level = "유치원생" | "초등학생" | "중학생" | "고등학생" | "대학생";
interface Msg {
  role: "user" | "assistant";
  content: string;
  variant?: "default" | "locked" | "fallback" | "limit";
  showCta?: boolean;
}
interface Analysis {
  understanding_score: number;
  strengths: string[];
  gaps: string[];
  misconceptions: string[];
  next_step: string;
}

const LEVELS = {
  ko: [
    { id: "유치원생" as Level, emoji: "🧒", label: "유치원생", hint: "5살, 매우 단순한 반응" },
    { id: "초등학생" as Level, emoji: "📚", label: "초등학생", hint: "10살, 호기심 많음" },
    { id: "중학생" as Level, emoji: "🎮", label: "중학생", hint: "13살, 반은 귀찮음" },
    { id: "고등학생" as Level, emoji: "🏫", label: "고등학생", hint: "16살, 시험 관심" },
    { id: "대학생" as Level, emoji: "🎓", label: "대학생", hint: "20살, 깊은 질문" },
  ],
  en: [
    { id: "유치원생" as Level, emoji: "🧒", label: "Kindergartener", hint: "Age 5, very simple reactions" },
    { id: "초등학생" as Level, emoji: "📚", label: "Elementary", hint: "Age 10, very curious" },
    { id: "중학생" as Level, emoji: "🎮", label: "Middle School", hint: "Age 13, half-interested" },
    { id: "고등학생" as Level, emoji: "🏫", label: "High School", hint: "Age 16, exam-focused" },
    { id: "대학생" as Level, emoji: "🎓", label: "College", hint: "Age 20, asks deeper questions" },
  ],
};

const CONCEPTS = [
  "Cell Structure", "Mitochondria", "DNA Replication",
  "Photosynthesis", "Cell Division", "Natural Selection",
  "Enzyme Kinetics", "Acid-Base Chemistry",
];

function getOpener(level: Level): string {
  const lines: Record<Level, string> = {
    유치원생: "안녕하세요! 그게 뭐예요? 처음 들어봐요~ 🤔",
    초등학생: "오! 그거 뭔지 알려줘요! 게임이랑 비슷해요?",
    중학생: "그거 들어본 것 같긴 한데... 설명해줄 수 있어요?",
    고등학생: "AP 시험에 나온다고 들었어요. 제대로 알고 싶어요.",
    대학생: "설명해보세요. 몇 가지 질문할 수도 있어요.",
  };
  return lines[level];
}

function getEnglishOpener(level: Level): string {
  const lines: Record<Level, string> = {
    유치원생: "Hi! What is that? I've never heard of it before~ 🤔",
    초등학생: "Oh! Tell me what that is! Is it kind of like a game?",
    중학생: "I think I've heard of that... can you explain it?",
    고등학생: "I heard this shows up on AP exams. I want to understand it properly.",
    대학생: "Go ahead and explain it. I may challenge it with a few questions.",
  };
  return lines[level];
}

const COPY = {
  ko: {
    title: "역할 반전 (Reverse Tutor)",
    body: "AI가 학생이 되고 당신이 선생님이 되세요.\n설명할 수 없으면 진짜 이해한 게 아닙니다.",
    ageLabel: "AI 나이 선택",
    conceptLabel: "설명할 개념",
    customPlaceholder: "또는 직접 입력...",
    start: "세션 시작 →",
    score: "이해도 점수 / 100",
    strengths: "✅ 잘 설명한 부분",
    gaps: "⚠️ 보완할 부분",
    misconceptions: "❌ 잘못된 내용",
    nextStep: "💡 다음 단계",
    newSession: "새 세션 시작",
    roleMode: (level: string) => `${level} 역할 중`,
    endAndAnalyze: "세션 종료 & 분석",
    analyzing: "분석 중...",
  },
  en: {
    title: "Reverse Tutor",
    body: "The AI becomes the student and you become the teacher.\nIf you cannot explain it, you may not fully understand it yet.",
    ageLabel: "Choose the AI's Age",
    conceptLabel: "Concept to Explain",
    customPlaceholder: "Or type your own concept...",
    start: "Start Session →",
    score: "Understanding Score / 100",
    strengths: "✅ Strong Explanations",
    gaps: "⚠️ Areas to Improve",
    misconceptions: "❌ Misconceptions",
    nextStep: "💡 Next Step",
    newSession: "Start New Session",
    roleMode: (level: string) => `Playing as ${level}`,
    endAndAnalyze: "End Session & Analyze",
    analyzing: "Analyzing...",
  },
};

export default function ReverseTutorTab() {
  const router = useRouter();
  const { lang: _lang } = useLang();
  // Platform is English-only — override locale so every t[lang] / COPY[lang]
  // / lang === 'ko' below resolves to the English branch without ripping out
  // the i18n scaffolding.
  void _lang;
  const lang = "en" as "en" | "ko";
  const tx = t[lang].aiCompanion.reverse;
  const copy = COPY[lang];
  const levels = LEVELS[lang];
  const [level, setLevel] = useState<Level | null>(null);
  const [concept, setConcept] = useState("");
  const [custom, setCustom] = useState("");
  const [started, setStarted] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ending, setEnding] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [setupError, setSetupError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const sessionStartRef = useRef<number>(Date.now());
  const sessionIdRef = useRef<string>(crypto.randomUUID());

  const compressAndSave = useCallback(async (messages: {role:string, content:string}[], subject: string) => {
    if (messages.length < 2) return;
    const durationMin = Math.round((Date.now() - sessionStartRef.current) / 60000);
    const rawSummary = messages.slice(-10).map(m => `${m.role}: ${m.content.slice(0, 120)}`).join('\n');
    try {
      await authFetch('/api/memory/compress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionIdRef.current, subject, durationMin: Math.max(1, durationMin), rawSummary }),
      });
    } catch {}
  }, []);

  useEffect(() => {
    return () => { compressAndSave(msgs, 'reverse_tutor'); };
  }, [compressAndSave]);

  useEffect(() => {
    if (msgs.length > 0 && msgs.length % 8 === 0) {
      compressAndSave(msgs, 'reverse_tutor');
    }
  }, [msgs.length, compressAndSave]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  function setAssistantState(index: number, next: Partial<Msg>) {
    setMsgs((prev) => {
      if (!prev[index] || prev[index].role !== "assistant") return prev;
      const updated = [...prev];
      updated[index] = { ...updated[index], ...next };
      return updated;
    });
  }

  async function showEarlyAccessMessage(index: number, kind: "locked" | "fallback" | "limit") {
    const content = kind === "fallback"
      ? EARLY_ACCESS_FALLBACK_MESSAGE
      : kind === "limit"
        ? getFeatureLimitMessage("reverse_tutor")
        : getFeatureLockedMessage("reverse_tutor");

    await new Promise((resolve) => setTimeout(resolve, getEarlyAccessDelayMs()));
    setAssistantState(index, { content, variant: kind, showCta: true });
  }

  const finalConcept = custom.trim() || concept;

  function start() {
    if (!level || !finalConcept) return;
    if (hasReachedEarlyAccessLimit("reverse_tutor")) {
      setSetupError(getFeatureLimitMessage("reverse_tutor"));
      return;
    }
    incrementEarlyAccessUsage("reverse_tutor");
    setSetupError("");
    setStarted(true);
    setMsgs([{ role: "assistant", content: lang === "ko" ? getOpener(level) : getEnglishOpener(level) }]);
  }

  async function send() {
    if (!input.trim() || loading || !level) return;
    const text = input.trim();
    const assistantIndex = msgs.length + 1;
    setInput("");
    setLoading(true);
    const history = msgs.map(m => ({ role: m.role, content: m.content }));
    setMsgs(prev => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: EARLY_ACCESS_LOADING_MESSAGE },
    ]);

    try {
      const res = await authFetch("/api/ai/reverse-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, level, concept: finalConcept, endSession: false, lang }),
      });
      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (data.status === "locked" || data.status === "fallback") {
          await showEarlyAccessMessage(assistantIndex, data.status);
          return;
        }
      }

      if (!res.body) {
        await showEarlyAccessMessage(assistantIndex, "locked");
        return;
      }

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let hasText = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6);
          if (raw === "[DONE]") continue;
          try {
            const ev = JSON.parse(raw);
            if (ev.type === "text") {
              hasText = hasText || Boolean(ev.content?.trim());
              setMsgs(prev => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", content: ev.content, variant: "default", showCta: false };
                return next;
              });
            }
          } catch { /* skip */ }
        }
      }
      if (!hasText) {
        await showEarlyAccessMessage(assistantIndex, "locked");
      }
    } catch {
      await showEarlyAccessMessage(assistantIndex, "fallback");
    } finally {
      setLoading(false);
    }
  }

  async function endSession() {
    if (!level) return;
    setEnding(true);
    const history = msgs.map(m => ({ role: m.role, content: m.content }));
    try {
      const res = await authFetch("/api/ai/reverse-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "", history, level, concept: finalConcept, endSession: true, lang }),
      });
      const data = await res.json();
      if (data.analysis) setAnalysis(data.analysis);
    } finally {
      setEnding(false);
    }
  }

  // ── Setup ────────────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="card p-7">
          <div className="text-center mb-7">
            <div className="text-4xl mb-3">🔄</div>
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">{copy.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line">{copy.body}</p>
          </div>

          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">{copy.ageLabel}</label>
          <div className="grid grid-cols-5 gap-2 mb-5">
            {levels.map(l => (
              <button key={l.id} onClick={() => setLevel(l.id)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all ${level === l.id ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-700 hover:border-primary-300"}`}>
                <span className="text-2xl">{l.emoji}</span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{l.label}</span>
              </button>
            ))}
          </div>
          {level && <p className="text-xs text-gray-400 text-center -mt-3 mb-5">{levels.find(l => l.id === level)?.hint}</p>}

          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">{copy.conceptLabel}</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {CONCEPTS.map(c => (
              <button key={c} onClick={() => { setConcept(c); setCustom(""); }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${concept === c && !custom ? "bg-primary-500 text-white border-primary-500" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-300"}`}>
                {c}
              </button>
            ))}
          </div>
          <input type="text" value={custom} onChange={e => { setCustom(e.target.value); setConcept(""); }}
            placeholder={copy.customPlaceholder}
            className="w-full mb-5 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          <button onClick={start} disabled={!level || !finalConcept} className="w-full btn-primary disabled:opacity-50">{copy.start}</button>
          {setupError ? <p className="mt-3 text-sm text-red-500 text-center">{setupError}</p> : null}
        </div>
      </div>
    );
  }

  // ── Analysis result ──────────────────────────────────────────────────────────
  if (analysis) {
    const levelInfo = levels.find(l => l.id === level)!;
    return (
      <div className="max-w-xl mx-auto">
        <div className="card p-7">
          <div className="text-center mb-6">
            <div className="text-5xl font-black text-primary-500 mb-1">{analysis.understanding_score}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{copy.score}</div>
            <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${analysis.understanding_score >= 80 ? "bg-emerald-500" : analysis.understanding_score >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                style={{ width: `${analysis.understanding_score}%` }} />
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {analysis.strengths.length > 0 && (
              <Section title={copy.strengths} items={analysis.strengths} color="emerald" />
            )}
            {analysis.gaps.length > 0 && (
              <Section title={copy.gaps} items={analysis.gaps} color="amber" />
            )}
            {analysis.misconceptions.length > 0 && (
              <Section title={copy.misconceptions} items={analysis.misconceptions} color="red" />
            )}
          </div>

          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 mb-5 border border-primary-100 dark:border-primary-800">
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-1">{copy.nextStep}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{analysis.next_step}</p>
          </div>

          <button onClick={() => { setStarted(false); setAnalysis(null); setMsgs([]); setLevel(null); setConcept(""); setCustom(""); }}
            className="w-full btn-primary">{copy.newSession}</button>
        </div>
      </div>
    );
  }

  // ── Chat ────────────────────────────────────────────────────────────────────
  const levelInfo = levels.find(l => l.id === level)!;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{levelInfo.emoji}</span>
          <span className="font-semibold text-sm text-gray-900 dark:text-white">{copy.roleMode(levelInfo.label)}</span>
          <span className="text-gray-400 mx-1">·</span>
          <span className="text-sm text-primary-500 font-medium">{finalConcept}</span>
        </div>
        <button onClick={endSession} disabled={ending || msgs.length < 4}
          className="text-sm font-semibold text-red-500 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          {ending ? copy.analyzing : copy.endAndAnalyze}
        </button>
      </div>

      <div className="text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-4 py-2.5 rounded-xl border border-primary-200 dark:border-primary-800">
        {lang === "ko" ? (
          <>
            💡 <strong>{levelInfo.label}</strong>에게 <strong>{finalConcept}</strong>을 쉽게 설명해보세요. 4회 이상 교환 후 세션 종료 가능.
          </>
        ) : (
          <>
            💡 Try explaining <strong>{finalConcept}</strong> clearly to the <strong>{levelInfo.label}</strong>. You can end the session after 4 or more exchanges.
          </>
        )}
      </div>

      <div className="card overflow-hidden">
        <div className="h-[360px] overflow-y-auto p-5 space-y-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">{levelInfo.emoji}</div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user" ? "bg-primary-500 text-white rounded-tr-sm" : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm"
              }`}>
                {m.content}
                {m.showCta && (
                  <UpgradePrompt
                    kind={m.variant === "limit" ? "limit" : m.variant === "fallback" ? "fallback" : "locked"}
                    feature="Reverse Tutor"
                    freeCount={3}
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="border-t border-gray-100 dark:border-gray-700 p-4 flex gap-2 items-end">
          <textarea rows={2} value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={tx.placeholder}
            className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 dark:text-gray-100 placeholder:text-gray-400" />
          <button onClick={send} disabled={!input.trim() || loading} className="btn-primary text-sm py-2.5 px-4 rounded-xl disabled:opacity-50">{tx.send}</button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, items, color }: { title: string; items: string[]; color: "emerald" | "amber" | "red" }) {
  const c = { emerald: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800", amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800", red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800" }[color];
  return (
    <div className={`rounded-xl p-4 border ${c}`}>
      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">{title}</p>
      <ul className="space-y-1">{items.map((item, i) => <li key={i} className="text-sm text-gray-700 dark:text-gray-300">• {item}</li>)}</ul>
    </div>
  );
}
