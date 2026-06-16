"use client";

/**
 * /parents/ivy-prompts — 아이비리그 입시 AI 프롬프트 모음집.
 *
 * Prompts come from /api/parents/ivy-prompts: the first 2 are a free taster
 * (full body), the rest arrive body-stripped until the res:/parents/ivy-prompts
 * unlock is purchased. Unlock spends credits server-side; on success we re-fetch
 * the full pack. Each prompt has a one-tap copy button.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";
import { authFetch } from "@/lib/client-auth";
import { spendAndUnlockAccount, getBalance, hydrateCredits, isUnlocked, CREDIT_EVENT } from "@/lib/credits";

const GREEN = "#00b85f";
const UNLOCK_KEY = "res:/parents/ivy-prompts";

interface Prompt { id: string; category: string; emoji: string; title: string; desc: string; prompt: string }

export default function IvyPromptsClient() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [locked, setLocked] = useState(true);
  const [cost, setCost] = useState(250);
  const [total, setTotal] = useState(0);
  const [preview, setPreview] = useState(2);
  const [copied, setCopied] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const load = () => authFetch("/api/parents/ivy-prompts").then((r) => r.json())
      .then((d) => {
        setPrompts(Array.isArray(d?.prompts) ? d.prompts : []);
        setLocked(!!d?.locked); setCost(Number(d?.cost ?? 250));
        setTotal(Number(d?.total ?? 0)); setPreview(Number(d?.preview ?? 2));
      }).catch(() => {});
    load();
    window.addEventListener(CREDIT_EVENT, load);
    return () => window.removeEventListener(CREDIT_EVENT, load);
  }, []);

  const copy = async (p: Prompt) => {
    try { await navigator.clipboard.writeText(p.prompt); setCopied(p.id); setTimeout(() => setCopied(null), 1600); } catch { /* ignore */ }
  };

  const unlock = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const session = await getClientSession().catch(() => null);
      if (!session?.user) {
        window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/ivy-prompts" } }));
        return;
      }
      await hydrateCredits().catch(() => {});
      const r = await spendAndUnlockAccount(UNLOCK_KEY, cost);
      if (r.ok) setLocked(false); // CREDIT_EVENT re-fetch fills the bodies
      else if (r.reason === "insufficient") window.dispatchEvent(new Event("inhero:open-charge"));
      else window.alert("크레딧 차감 확인 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    } finally { setBusy(false); }
  };

  const owned = !locked || isUnlocked(UNLOCK_KEY);
  const categories = useMemo(() => [...new Set(prompts.map((p) => p.category))], [prompts]);

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 20px 100px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", letterSpacing: "0.04em", marginBottom: 10 }}>🤖 AI 아이비리그 프롬프트</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
          ChatGPT·Claude에 붙여넣는 <span style={{ color: "#7c3aed" }}>미국 입시 프롬프트</span>
        </h1>
        <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, marginBottom: 8 }}>
          에세이 소재 발굴부터 활동 설계·보충 에세이·인터뷰·추천서까지. <strong>대신 써주는 게 아니라</strong>, 학생의 진짜 이야기를 더 깊이 끌어내는 <strong>코칭형 프롬프트 {total}개</strong>. <code>[대괄호]</code>만 본인 내용으로 바꿔 그대로 붙여넣으세요.
        </p>
        <p style={{ fontSize: 12.5, color: "#94a3b8", lineHeight: 1.7, marginBottom: 24 }}>
          앞 {preview}개는 무료 미리보기예요. {!owned && `전체 ${total}개는 ${cost} 크레딧으로 한 번만 잠금 해제.`}
        </p>

        {!owned && (
          <div style={{ background: "linear-gradient(135deg,#1e1b4b,#4c1d95)", borderRadius: 14, padding: "18px 20px", marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
            <div style={{ color: "#fff" }}>
              <div style={{ fontWeight: 800, fontSize: 15.5, marginBottom: 3 }}>🔓 프롬프트 {total}개 전체 잠금해제</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12.5 }}>한 번 열면 계속 볼 수 있어요 · 보유 {getBalance().toLocaleString()} 크레딧</div>
            </div>
            <button onClick={unlock} disabled={busy} style={{ background: GREEN, color: "#03120c", border: "none", borderRadius: 10, padding: "13px 24px", fontWeight: 800, fontSize: 14.5, cursor: busy ? "default" : "pointer", opacity: busy ? 0.7 : 1, whiteSpace: "nowrap" }}>
              {busy ? "확인 중…" : `🪙 ${cost} 크레딧으로 잠금해제`}
            </button>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
          {categories.map((c) => (
            <span key={c} style={{ fontSize: 12, fontWeight: 700, color: "#6d28d9", background: "#f5f3ff", border: "1px solid #e0d7fb", borderRadius: 999, padding: "5px 12px" }}>{c}</span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {prompts.map((p, i) => {
            const isLockedCard = !p.prompt;
            return (
              <article key={p.id} style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 14, padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 20 }}>{p.emoji}</span>
                  <span style={{ fontSize: 15.5, fontWeight: 800, letterSpacing: "-0.01em" }}>{p.title}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#6d28d9", background: "#f5f3ff", borderRadius: 5, padding: "2px 8px" }}>{p.category}</span>
                  {i < preview && <span style={{ fontSize: 10.5, fontWeight: 800, color: "#047857", background: "#e9fbf2", borderRadius: 5, padding: "2px 8px" }}>무료</span>}
                </div>
                <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6, margin: "0 0 12px" }}>{p.desc}</p>

                {isLockedCard ? (
                  <button onClick={unlock} disabled={busy} style={{ width: "100%", textAlign: "center", background: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: 10, padding: "16px", fontSize: 13.5, fontWeight: 700, color: "#7c3aed", cursor: "pointer" }}>
                    🔒 잠금 해제하면 전체 프롬프트가 보여요 — {cost} 크레딧
                  </button>
                ) : (
                  <div style={{ position: "relative" }}>
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "16px 16px 18px", fontSize: 12.5, lineHeight: 1.7, fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}>{p.prompt}</pre>
                    <button onClick={() => copy(p)} style={{ position: "absolute", top: 10, right: 10, background: copied === p.id ? GREEN : "rgba(255,255,255,0.12)", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>
                      {copied === p.id ? "✓ 복사됨" : "📋 복사"}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
