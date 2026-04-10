"use client";

import { useState, useRef, useEffect } from "react";

type Level = "유치원생" | "초등학생" | "중학생" | "고등학생" | "대학생";
interface Msg { role: "user" | "assistant"; content: string }
interface Analysis {
  understanding_score: number;
  strengths: string[];
  gaps: string[];
  misconceptions: string[];
  next_step: string;
}

const LEVELS: { id: Level; emoji: string; hint: string }[] = [
  { id: "유치원생", emoji: "🧒", hint: "5살, 매우 단순한 반응" },
  { id: "초등학생", emoji: "📚", hint: "10살, 호기심 많음" },
  { id: "중학생", emoji: "🎮", hint: "13살, 반은 귀찮음" },
  { id: "고등학생", emoji: "🏫", hint: "16살, 시험 관심" },
  { id: "대학생", emoji: "🎓", hint: "20살, 깊은 질문" },
];

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

export default function ReverseTutorTab() {
  const [level, setLevel] = useState<Level | null>(null);
  const [concept, setConcept] = useState("");
  const [custom, setCustom] = useState("");
  const [started, setStarted] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ending, setEnding] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const finalConcept = custom.trim() || concept;

  function start() {
    if (!level || !finalConcept) return;
    setStarted(true);
    setMsgs([{ role: "assistant", content: getOpener(level) }]);
  }

  async function send() {
    if (!input.trim() || loading || !level) return;
    const text = input.trim();
    setInput("");
    setLoading(true);
    const history = msgs.map(m => ({ role: m.role, content: m.content }));
    setMsgs(prev => [...prev, { role: "user", content: text }, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/ai/reverse-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, level, concept: finalConcept, endSession: false }),
      });
      if (!res.body) return;
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
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
              setMsgs(prev => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", content: ev.content };
                return next;
              });
            }
          } catch { /* skip */ }
        }
      }
    } finally {
      setLoading(false);
    }
  }

  async function endSession() {
    if (!level) return;
    setEnding(true);
    const history = msgs.map(m => ({ role: m.role, content: m.content }));
    try {
      const res = await fetch("/api/ai/reverse-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "", history, level, concept: finalConcept, endSession: true }),
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
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">역할 반전 (Reverse Tutor)</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI가 학생이 되고 당신이 선생님이 되세요.<br />설명할 수 없으면 진짜 이해한 게 아닙니다.</p>
          </div>

          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">AI 나이 선택</label>
          <div className="grid grid-cols-5 gap-2 mb-5">
            {LEVELS.map(l => (
              <button key={l.id} onClick={() => setLevel(l.id)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all ${level === l.id ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-700 hover:border-primary-300"}`}>
                <span className="text-2xl">{l.emoji}</span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{l.id}</span>
              </button>
            ))}
          </div>
          {level && <p className="text-xs text-gray-400 text-center -mt-3 mb-5">{LEVELS.find(l => l.id === level)?.hint}</p>}

          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">설명할 개념</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {CONCEPTS.map(c => (
              <button key={c} onClick={() => { setConcept(c); setCustom(""); }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${concept === c && !custom ? "bg-primary-500 text-white border-primary-500" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-300"}`}>
                {c}
              </button>
            ))}
          </div>
          <input type="text" value={custom} onChange={e => { setCustom(e.target.value); setConcept(""); }}
            placeholder="또는 직접 입력..."
            className="w-full mb-5 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          <button onClick={start} disabled={!level || !finalConcept} className="w-full btn-primary disabled:opacity-50">세션 시작 →</button>
        </div>
      </div>
    );
  }

  // ── Analysis result ──────────────────────────────────────────────────────────
  if (analysis) {
    const levelInfo = LEVELS.find(l => l.id === level)!;
    return (
      <div className="max-w-xl mx-auto">
        <div className="card p-7">
          <div className="text-center mb-6">
            <div className="text-5xl font-black text-primary-500 mb-1">{analysis.understanding_score}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">이해도 점수 / 100</div>
            <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${analysis.understanding_score >= 80 ? "bg-emerald-500" : analysis.understanding_score >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                style={{ width: `${analysis.understanding_score}%` }} />
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {analysis.strengths.length > 0 && (
              <Section title="✅ 잘 설명한 부분" items={analysis.strengths} color="emerald" />
            )}
            {analysis.gaps.length > 0 && (
              <Section title="⚠️ 보완할 부분" items={analysis.gaps} color="amber" />
            )}
            {analysis.misconceptions.length > 0 && (
              <Section title="❌ 잘못된 내용" items={analysis.misconceptions} color="red" />
            )}
          </div>

          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 mb-5 border border-primary-100 dark:border-primary-800">
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-1">💡 다음 단계</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{analysis.next_step}</p>
          </div>

          <button onClick={() => { setStarted(false); setAnalysis(null); setMsgs([]); setLevel(null); setConcept(""); setCustom(""); }}
            className="w-full btn-primary">새 세션 시작</button>
        </div>
      </div>
    );
  }

  // ── Chat ────────────────────────────────────────────────────────────────────
  const levelInfo = LEVELS.find(l => l.id === level)!;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{levelInfo.emoji}</span>
          <span className="font-semibold text-sm text-gray-900 dark:text-white">{level} 역할 중</span>
          <span className="text-gray-400 mx-1">·</span>
          <span className="text-sm text-primary-500 font-medium">{finalConcept}</span>
        </div>
        <button onClick={endSession} disabled={ending || msgs.length < 4}
          className="text-sm font-semibold text-red-500 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          {ending ? "분석 중..." : "세션 종료 & 분석"}
        </button>
      </div>

      <div className="text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-4 py-2.5 rounded-xl border border-primary-200 dark:border-primary-800">
        💡 <strong>{level}</strong>에게 <strong>{finalConcept}</strong>을 쉽게 설명해보세요. 4회 이상 교환 후 세션 종료 가능.
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
                {m.content || <Dots />}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="border-t border-gray-100 dark:border-gray-700 p-4 flex gap-2 items-end">
          <textarea rows={2} value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={`${level}에게 설명해보세요...`}
            className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 dark:text-gray-100 placeholder:text-gray-400" />
          <button onClick={send} disabled={!input.trim() || loading} className="btn-primary text-sm py-2.5 px-4 rounded-xl disabled:opacity-50">전송</button>
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

function Dots() {
  return (
    <span className="flex gap-1 items-center py-0.5">
      {[0, 1, 2].map(i => <span key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
    </span>
  );
}
