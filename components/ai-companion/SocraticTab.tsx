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

interface Msg {
  role: "user" | "assistant";
  content: string;
  variant?: "default" | "locked" | "fallback" | "limit";
  showCta?: boolean;
}
interface Analysis { thinking_gap: string; confidence: number }

const TOPICS = [
  "Cellular Respiration", "DNA Replication", "Photosynthesis",
  "Mitosis vs Meiosis", "Natural Selection", "Enzyme Kinetics",
  "Acid-Base Chemistry", "Thermodynamics", "Derivatives", "Integration",
];

const GAP_LABELS = {
  ko: {
    concept: "개념 이해도",
    application: "응용력",
    language: "언어 이해도",
    logic: "논리력",
  },
  en: {
    concept: "Conceptual Understanding",
    application: "Application",
    language: "Language Comprehension",
    logic: "Logical Reasoning",
  },
};

const COPY = {
  ko: {
    introTitle: "소크라테스 모드",
    introBody: "AI는 절대 직접 답을 주지 않아요. 질문을 통해 스스로 발견하도록 유도합니다.",
    topicLabel: "주제 선택",
    customPlaceholder: "또는 직접 입력...",
    start: "세션 시작 →",
    starter: (topic: string) => `좋아요! **${topic}**에 대해 탐구해봐요 🔍\n\n이 주제에 대해 지금 알고 있는 것부터 말해줄 수 있어요?`,
    strictBadge: "답 직접 안 알려줌",
    analysis: "사고 패턴 분석",
    restart: "새로 시작",
  },
  en: {
    introTitle: "Socratic Mode",
    introBody: "The AI never gives the answer directly. It guides you to discover it through questions.",
    topicLabel: "Choose a Topic",
    customPlaceholder: "Or type your own topic...",
    start: "Start Session →",
    starter: (topic: string) => `Great! Let's explore **${topic}** 🔍\n\nCan you start by telling me what you already know about this topic?`,
    strictBadge: "No direct answers",
    analysis: "Thinking Pattern Analysis",
    restart: "Start Over",
  },
};

export default function SocraticTab() {
  const router = useRouter();
  const { lang } = useLang();
  const tx = t[lang].aiCompanion.socratic;
  const copy = COPY[lang];
  const [topic, setTopic] = useState("");
  const [custom, setCustom] = useState("");
  const [started, setStarted] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
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
    return () => { compressAndSave(msgs, 'socratic'); };
  }, [compressAndSave]);

  useEffect(() => {
    if (msgs.length > 0 && msgs.length % 8 === 0) {
      compressAndSave(msgs, 'socratic');
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
        ? getFeatureLimitMessage("socratic")
        : getFeatureLockedMessage("socratic");

    await new Promise((resolve) => setTimeout(resolve, getEarlyAccessDelayMs()));
    setAssistantState(index, { content, variant: kind, showCta: true });
  }

  const finalTopic = custom.trim() || topic;

  function start() {
    if (!finalTopic) return;
    setStarted(true);
    setMsgs([{ role: "assistant", content: copy.starter(finalTopic) }]);
  }

  async function send() {
    if (!input.trim() || loading) return;
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
      if (hasReachedEarlyAccessLimit("socratic")) {
        await showEarlyAccessMessage(assistantIndex, "limit");
        return;
      }

      incrementEarlyAccessUsage("socratic");
      const res = await authFetch("/api/ai/socratic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, topic: finalTopic, lang }),
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
            } else if (ev.type === "analysis" && ev.data) {
              setAnalyses(prev => [...prev, ev.data]);
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

  // Compute scores from accumulated analyses
  function computeScores() {
    const dims = ["concept", "application", "language", "logic"];
    return dims.map(dim => {
      const relevant = analyses.filter(a => a.thinking_gap === dim);
      const penalty = relevant.length > 0
        ? relevant.reduce((sum, a) => sum + a.confidence, 0) / relevant.length
        : 0;
      const score = Math.round(Math.max(0, 100 - penalty * (relevant.length / Math.max(analyses.length, 1))));
      return { dim, label: GAP_LABELS[lang][dim as keyof typeof GAP_LABELS.ko], score };
    });
  }

  if (!started) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="card p-7">
          <div className="text-center mb-7">
            <div className="text-4xl mb-3">🏛</div>
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">{copy.introTitle}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{copy.introBody}</p>
          </div>

          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">{copy.topicLabel}</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {TOPICS.map(t => (
              <button key={t} onClick={() => { setTopic(t); setCustom(""); }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${topic === t && !custom ? "bg-primary-500 text-white border-primary-500" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-300"}`}>
                {t}
              </button>
            ))}
          </div>
          <input type="text" value={custom} onChange={e => { setCustom(e.target.value); setTopic(""); }}
            placeholder={copy.customPlaceholder}
            className="w-full mb-5 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          <button onClick={start} disabled={!finalTopic} className="w-full btn-primary disabled:opacity-50">{copy.start}</button>
        </div>
      </div>
    );
  }

  const scores = computeScores();

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏛</span>
          <span className="font-semibold text-sm text-gray-900 dark:text-white">{finalTopic}</span>
          <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 ml-1">{copy.strictBadge}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowAnalysis(!showAnalysis)}
            disabled={analyses.length < 2}
            className="text-xs font-semibold text-primary-500 border border-primary-200 dark:border-primary-800 px-3 py-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            {copy.analysis}
          </button>
          <button onClick={() => { setStarted(false); setMsgs([]); setAnalyses([]); setShowAnalysis(false); }}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors">{copy.restart}</button>
        </div>
      </div>

      {/* Analysis card */}
      {showAnalysis && analyses.length >= 2 && (
        <div className="card p-5">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">{copy.analysis}</h3>
          <div className="grid grid-cols-2 gap-4">
            {scores.map(({ label, score }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">{label}</span>
                  <span className={`font-bold ${score >= 70 ? "text-emerald-600 dark:text-emerald-400" : score >= 50 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>{score}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${score >= 70 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat */}
      <div className="card overflow-hidden">
        <div className="h-[360px] overflow-y-auto p-5 space-y-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">🏛</div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user" ? "bg-primary-500 text-white rounded-tr-sm" : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm"
              }`}>
                {m.content}
                {m.showCta && (
                  <UpgradePrompt
                    kind={m.variant === "limit" ? "limit" : m.variant === "fallback" ? "fallback" : "locked"}
                    feature="Socratic Mode"
                    freeCount={5}
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
