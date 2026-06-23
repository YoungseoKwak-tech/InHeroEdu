"use client";

/**
 * AiTutor — the always-on InHero AI tutor, mounted globally in the root layout
 * so it floats on every page. A bottom-right bubble opens a chat panel; a
 * "🤖 AI에게 물어보기" popover appears when the student highlights text on the
 * page, passing that selection as context. Streams from /api/ai/tutor (SSE).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { authFetch, getClientSession } from "@/lib/client-auth";

const GREEN = "#00b85f";
const INK = "#0b1220";

interface Msg { role: "user" | "assistant"; content: string }

const SUGGESTIONS = [
  "이 개념 쉽게 설명해줘",
  "이 문제 단계별로 풀어줘",
  "비슷한 문제 하나 내줘",
  "시험에 어떻게 나와?",
];

export default function AiTutor() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState("");      // highlighted page text
  const [streaming, setStreaming] = useState(false);
  const [sel, setSel] = useState<{ text: string; x: number; y: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => setLoggedIn(false)); }, []);

  // Highlight-to-ask: show a small popover near a non-trivial text selection.
  useEffect(() => {
    const onUp = () => {
      const s = window.getSelection?.();
      const text = s?.toString().trim() ?? "";
      if (text.length < 8 || text.length > 2000 || !s || s.rangeCount === 0) { setSel(null); return; }
      const rect = s.getRangeAt(0).getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) { setSel(null); return; }
      setSel({ text, x: Math.min(rect.left + rect.width / 2, window.innerWidth - 90), y: Math.max(rect.top - 8, 44) });
    };
    document.addEventListener("mouseup", onUp);
    return () => document.removeEventListener("mouseup", onUp);
  }, []);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, streaming]);

  const send = useCallback(async (text: string, ctx?: string) => {
    const q = text.trim();
    if (!q || streaming) return;
    if (loggedIn === false) {
      window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup" } }));
      return;
    }
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);
    try {
      const r = await authFetch("/api/ai/tutor", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, context: ctx ?? context }),
      });
      if (r.status === 401) {
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: "로그인하면 AI 튜터를 쓸 수 있어요." }]);
        window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup" } }));
        return;
      }
      if (!r.ok || !r.body) { setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: "지금은 응답하기 어려워요. 잠시 후 다시 시도해 주세요." }]); return; }
      const reader = r.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6);
          if (payload === "[DONE]") continue;
          try {
            const t = JSON.parse(payload)?.text;
            if (typeof t === "string") setMessages((prev) => { const c = [...prev]; c[c.length - 1] = { role: "assistant", content: c[c.length - 1].content + t }; return c; });
          } catch { /* ignore partial */ }
        }
      }
    } catch {
      setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: "네트워크 오류가 났어요. 다시 시도해 주세요." }]);
    } finally {
      setStreaming(false);
    }
  }, [messages, context, streaming, loggedIn]);

  const askSelection = () => {
    if (!sel) return;
    setContext(sel.text);
    setOpen(true);
    setSel(null);
    send("드래그한 내용을 쉽게 설명해줘.", sel.text);
  };

  return (
    <>
      {/* Highlight-to-ask popover */}
      {sel && !open && (
        <button onClick={askSelection}
          style={{ position: "fixed", left: sel.x, top: sel.y, transform: "translate(-50%,-100%)", zIndex: 9998,
            background: INK, color: "#fff", border: "none", borderRadius: 999, padding: "8px 14px", fontSize: 12.5, fontWeight: 800,
            boxShadow: "0 8px 22px rgba(0,0,0,0.28)", cursor: "pointer", whiteSpace: "nowrap" }}>
          🤖 AI에게 물어보기
        </button>
      )}

      {/* Launcher */}
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="AI 튜터 열기"
          style={{ position: "fixed", right: 20, bottom: 20, zIndex: 9998, display: "inline-flex", alignItems: "center", gap: 9,
            background: `linear-gradient(135deg, ${GREEN}, #0a8f4d)`, color: "#03120c", border: "none", borderRadius: 999,
            padding: "13px 18px", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 10px 30px rgba(0,184,95,0.4)" }}>
          <span style={{ fontSize: 17 }}>🤖</span> AI 튜터
        </button>
      )}

      {/* Panel */}
      {open && (
        <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 9999, width: "min(400px, calc(100vw - 32px))", height: "min(620px, calc(100vh - 90px))",
          display: "flex", flexDirection: "column", background: "#fff", borderRadius: 18, overflow: "hidden",
          border: "1px solid #e6e8ec", boxShadow: "0 24px 60px rgba(11,18,32,0.28)", fontFamily: "'Inter', -apple-system, sans-serif" }}>
          {/* Header */}
          <div style={{ background: `linear-gradient(135deg, ${INK}, #16233c)`, color: "#fff", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🤖</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 14.5 }}>인히어로 AI 튜터</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)" }}>AP·SAT·IB · 한국어로 설명</div>
            </div>
            {context && <span title="드래그한 내용 참고 중" style={{ fontSize: 10.5, fontWeight: 700, color: "#03120c", background: GREEN, borderRadius: 999, padding: "3px 8px" }}>📎 선택 참고</span>}
            <button onClick={() => setOpen(false)} aria-label="닫기" style={{ background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", borderRadius: 8, width: 28, height: 28, fontSize: 16, cursor: "pointer" }}>✕</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px", background: "#f7f8fa", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.length === 0 && (
              <div style={{ color: "#64748b", fontSize: 13.5, lineHeight: 1.7 }}>
                안녕하세요! 👋 AP·SAT·IB 무엇이든 물어보세요. 페이지에서 <b>텍스트를 드래그</b>하면 그 부분을 바로 설명해 드려요.
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14 }}>
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => send(s)} style={{ fontSize: 12.5, fontWeight: 600, color: INK, background: "#fff", border: "1px solid #e2e6ea", borderRadius: 999, padding: "7px 12px", cursor: "pointer" }}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "88%",
                background: m.role === "user" ? INK : "#fff", color: m.role === "user" ? "#fff" : "#1a1a1f",
                border: m.role === "user" ? "none" : "1px solid #e6e8ec", borderRadius: 14, padding: "11px 14px",
                fontSize: 13.5, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {m.content || (streaming && i === messages.length - 1 ? "…" : "")}
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} style={{ display: "flex", gap: 8, padding: "12px", borderTop: "1px solid #eef1f5", background: "#fff" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={streaming ? "답변 생성 중…" : "질문을 입력하세요"} disabled={streaming}
              style={{ flex: 1, border: "1px solid #d7dce2", borderRadius: 10, padding: "11px 13px", fontSize: 13.5, outline: "none" }} />
            <button type="submit" disabled={streaming || !input.trim()}
              style={{ background: GREEN, color: "#03120c", border: "none", borderRadius: 10, padding: "0 16px", fontWeight: 800, fontSize: 14, cursor: streaming ? "default" : "pointer", opacity: streaming || !input.trim() ? 0.5 : 1 }}>↑</button>
          </form>
        </div>
      )}
    </>
  );
}
