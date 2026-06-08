"use client";

/**
 * /parents/feedback — 자료요청 & 피드백 board. Parents submit a resource request
 * or platform feedback; it persists and immediately appears in the list below
 * (반영). Login optional. Not a nav tab — reached from a /parents card.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";

const GREEN = "#00b85f";

type Kind = "request" | "feedback" | "bug";
interface Item {
  id: string; kind: Kind; nickname: string | null; body: string;
  status: string; upvotes: number; created_at: string;
}

const KIND_META: Record<Kind, { label: string; emoji: string; color: string; bg: string }> = {
  request: { label: "자료요청", emoji: "📂", color: "#047a45", bg: "#e9fbf2" },
  feedback: { label: "피드백", emoji: "💡", color: "#6d28d9", bg: "#f3eefe" },
  bug: { label: "오류신고", emoji: "🐞", color: "#b91c1c", bg: "#fee2e2" },
};
const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  open: { label: "접수", color: "#475569", bg: "#f1f5f9" },
  reviewing: { label: "검토중", color: "#b45309", bg: "#fef3c7" },
  done: { label: "반영완료", color: "#047a45", bg: "#dcfce7" },
};

function timeAgo(iso: string): string {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 60) return "방금";
  if (d < 3600) return `${Math.floor(d / 60)}분 전`;
  if (d < 86400) return `${Math.floor(d / 3600)}시간 전`;
  return new Date(iso).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" });
}

export default function FeedbackClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [kind, setKind] = useState<Kind>("request");
  const [nickname, setNickname] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  async function load() {
    try {
      const res = await fetch("/api/parents/feedback");
      const json = await res.json();
      setItems(json.items ?? []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);

  async function submit() {
    if (text.trim().length < 2 || submitting) return;
    setSubmitting(true); setMsg(null);
    try {
      const res = await authFetch("/api/parents/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, nickname: nickname.trim() || null, body: text.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "전송 실패");
      // Reflect immediately.
      if (json.item) setItems((cur) => [json.item, ...cur]);
      setText("");
      setMsg({ kind: "ok", text: "✅ 접수됐습니다. 아래 목록에 바로 반영됐어요!" });
    } catch (e) {
      setMsg({ kind: "error", text: e instanceof Error ? e.message : String(e) });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: GREEN }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 20px 100px" }}>
        {/* Header */}
        <p style={{ fontSize: 13, fontWeight: 700, color: GREEN, letterSpacing: "0.04em", marginBottom: 10 }}>📮 자료요청 &amp; 피드백</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.7rem,4.5vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
          필요한 자료, 직접 요청하세요
        </h1>
        <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, marginBottom: 26 }}>
          원하는 AP 과목·자료, 개선 아이디어, 오류 신고를 남겨주세요. 입력하면 <strong>아래 목록에 바로 반영</strong>되고,
          검토 후 실제 자료·기능으로 만들어 드립니다.
        </p>

        {/* Submit form */}
        <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "22px 22px", marginBottom: 28 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            {(Object.keys(KIND_META) as Kind[]).map((k) => {
              const on = kind === k;
              const m = KIND_META[k];
              return (
                <button key={k} onClick={() => setKind(k)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, border: on ? `1.5px solid ${m.color}` : "1.5px solid #e2e6ea", background: on ? m.bg : "#fff", color: on ? m.color : "#64748b", borderRadius: 999, padding: "8px 16px", fontSize: 13.5, fontWeight: 800, cursor: "pointer" }}>
                  <span>{m.emoji}</span>{m.label}
                </button>
              );
            })}
          </div>

          <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임 (선택)"
            style={{ width: "100%", border: "1.5px solid #d7dce2", borderRadius: 10, padding: "11px 13px", fontSize: 14.5, outline: "none", boxSizing: "border-box", marginBottom: 10 }} />
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} maxLength={2000}
            placeholder={kind === "request" ? "예: AP Physics C 한국어 개념정리가 있으면 좋겠어요." : kind === "feedback" ? "예: 단어장에 발음 듣기 기능이 있으면 좋겠어요." : "예: 문제은행에서 채점이 안 되는 문항이 있어요."}
            style={{ width: "100%", border: "1.5px solid #d7dce2", borderRadius: 10, padding: "12px 13px", fontSize: 14.5, outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6, fontFamily: "inherit" }} />

          {msg && <div style={{ marginTop: 12, fontSize: 13.5, fontWeight: 600, color: msg.kind === "ok" ? "#047a45" : "#dc2626" }}>{msg.text}</div>}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{text.length}/2000 · 로그인 없이도 가능</span>
            <button onClick={submit} disabled={submitting || text.trim().length < 2}
              style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14.5, fontWeight: 800, cursor: submitting || text.trim().length < 2 ? "default" : "pointer", opacity: submitting || text.trim().length < 2 ? 0.5 : 1 }}>
              {submitting ? "전송 중…" : "요청 보내기 →"}
            </button>
          </div>
        </section>

        {/* List */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #1a1a1f" }}>
          <h2 style={{ fontSize: 16.5, fontWeight: 800, margin: 0 }}>접수된 요청 · 피드백</h2>
          <span style={{ fontSize: 12.5, color: "#94a3b8", fontWeight: 600 }}>{items.length}건</span>
        </div>

        {loading ? (
          <p style={{ fontSize: 14, color: "#94a3b8", padding: "30px 0", textAlign: "center" }}>불러오는 중…</p>
        ) : items.length === 0 ? (
          <p style={{ fontSize: 14, color: "#94a3b8", padding: "30px 0", textAlign: "center" }}>아직 접수된 요청이 없어요. 첫 요청을 남겨보세요!</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {items.map((it) => {
              const km = KIND_META[it.kind] ?? KIND_META.request;
              const sm = STATUS_META[it.status] ?? STATUS_META.open;
              return (
                <div key={it.id} style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 12, padding: "15px 17px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: km.color, background: km.bg, borderRadius: 6, padding: "2px 9px" }}>{km.emoji} {km.label}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: sm.color, background: sm.bg, borderRadius: 6, padding: "2px 9px" }}>{sm.label}</span>
                    <span style={{ marginLeft: "auto", fontSize: 12, color: "#94a3b8" }}>
                      {it.nickname ? `${it.nickname} · ` : ""}{timeAgo(it.created_at)}
                    </span>
                  </div>
                  <p style={{ fontSize: 14.5, color: "#1f2937", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{it.body}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
