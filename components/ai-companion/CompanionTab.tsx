"use client";

import { useState, useRef, useEffect } from "react";

interface Msg { role: "user" | "assistant"; content: string }
interface Profile {
  strengths: string[];
  interests: string[];
  college_adjustments: Record<string, unknown>;
}

const OPENER = "안녕하세요! 저는 InHero AI 컴패니언이에요 😊\n요즘 공부하면서 어떤 과목이 가장 재미있어요? 아니면 힘든 점이 있으면 편하게 얘기해줘요.";

export default function CompanionTab() {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", content: OPENER }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>({ strengths: [], interests: [], college_adjustments: {} });
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  async function send() {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput("");
    setLoading(true);
    const history = msgs.map(m => ({ role: m.role, content: m.content }));
    setMsgs(prev => [...prev, { role: "user", content: text }, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/ai/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
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
            } else if (ev.type === "profile" && ev.data) {
              setProfile(prev => ({
                strengths: Array.from(new Set([...prev.strengths, ...(ev.data.strengths ?? [])])),
                interests: Array.from(new Set([...prev.interests, ...(ev.data.interests ?? [])])),
                college_adjustments: { ...prev.college_adjustments, ...(ev.data.college_adjustments ?? {}) },
              }));
            }
          } catch { /* skip */ }
        }
      }
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  async function generateRoadmap() {
    setLoadingRoadmap(true);
    setRoadmap(null);
    try {
      const res = await fetch("/api/ai/companion/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      setRoadmap(data.roadmap ?? "생성 실패");
    } finally {
      setLoadingRoadmap(false);
    }
  }

  const hasProfile = profile.strengths.length > 0 || profile.interests.length > 0;

  return (
    <div className="flex flex-col gap-5">
      {/* Chat */}
      <div className="card overflow-hidden">
        <div className="h-[380px] overflow-y-auto p-5 space-y-4" id="companion-chat">
          {msgs.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-base flex-shrink-0 mt-0.5">💙</div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-primary-500 text-white rounded-tr-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm"
              }`}>
                {m.content || <Dots />}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 p-4 flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            rows={2}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="편하게 얘기해요... (Enter 전송)"
            className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 dark:text-gray-100 placeholder:text-gray-400"
          />
          <button onClick={send} disabled={!input.trim() || loading} className="btn-primary text-sm py-2.5 px-4 rounded-xl disabled:opacity-50">전송</button>
        </div>
        <p className="text-xs text-gray-400 text-center pb-3">💙 이 대화는 안전해요. 솔직하게 얘기해도 돼요.</p>
      </div>

      {/* Consultant view — sanitized, locked */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-base">🔒</span>
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">컨설턴트 전달 내용</h3>
          <span className="text-xs text-gray-400 ml-auto">원본 대화 미포함</span>
        </div>

        {!hasProfile ? (
          <p className="text-xs text-gray-400 leading-relaxed">대화를 나눌수록 학생의 강점과 관심사가 자동으로 파악됩니다. 아직 충분한 대화가 없어요.</p>
        ) : (
          <div className="space-y-3 mb-4">
            {profile.strengths.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">학생 강점</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.strengths.map(s => <Tag key={s} text={s} />)}
                </div>
              </div>
            )}
            {profile.interests.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">관심 분야</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.interests.map(s => <Tag key={s} text={s} color="emerald" />)}
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={generateRoadmap}
          disabled={!hasProfile || loadingRoadmap}
          className="w-full btn-primary text-sm py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingRoadmap ? "생성 중..." : "🗺 대학 로드맵 생성"}
        </button>
      </div>

      {/* Roadmap result */}
      {roadmap && (
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>🏛</span> 대학 로드맵
          </h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {roadmap}
          </div>
        </div>
      )}
    </div>
  );
}

function Tag({ text, color = "primary" }: { text: string; color?: "primary" | "emerald" }) {
  const c = color === "emerald"
    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800"
    : "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-primary-100 dark:border-primary-800";
  return <span className={`text-xs px-2.5 py-1 rounded-full border ${c}`}>{text}</span>;
}

function Dots() {
  return (
    <span className="flex gap-1 items-center py-0.5">
      {[0, 1, 2].map(i => (
        <span key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}
