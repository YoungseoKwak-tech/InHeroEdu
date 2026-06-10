"use client";

/**
 * /parents/story — 합격 수기 landing. The cover, 목차, and 프롤로그 are FREE.
 * The 200-credit charge happens only when the reader is opened via a "책 읽기"
 * button (→ /parents/story/read), gated by a shared res:/parents/story unlock
 * so it's bought once.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StoryReviewWidget from "@/components/StoryReviewWidget";
import { authFetch, getClientSession } from "@/lib/client-auth";
import { isUnlocked, spendAndUnlock, getBalance, hydrateCredits, CREDIT_EVENT, CREDIT_COSTS } from "@/lib/credits";
import {
  STORY_META, TOC_PROLOGUE, TOC_PARTS, TOC_EPILOGUE, TOC_APPENDIX,
  PROLOGUE_OPENING, PROLOGUE_BODY,
} from "./data";

const GREEN = "#00b85f";
const READ_KEY = "res:/parents/story";
const READ_COST = CREDIT_COSTS.SUBJECT; // 200
const READ_HREF = "/parents/story/read";

export default function StoryLanding() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [owned, setOwned] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    const sync = () => { setOwned(isUnlocked(READ_KEY)); setBalance(getBalance()); };
    sync();
    window.addEventListener(CREDIT_EVENT, sync);
    getClientSession().then(async (s) => {
      setLoggedIn(!!s?.user);
      // Pull server-side credits/unlocks so spending syncs to the account and
      // the gated reader (which checks profiles.credit_unlocks) doesn't 403.
      if (s?.user) { await hydrateCredits().catch(() => {}); sync(); }
    }).catch(() => {});
    return () => window.removeEventListener(CREDIT_EVENT, sync);
  }, []);

  // "책 읽기" — free landing, but opening the reader costs 200 credits (once).
  function readBook() {
    if (!loggedIn) {
      window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: READ_HREF } }));
      return;
    }
    if (owned || isUnlocked(READ_KEY)) { router.push(READ_HREF); return; }
    setShowGate(true);
  }

  // Spend server-authoritatively so profiles.credit_unlocks records the unlock
  // BEFORE the reader's file API checks it — otherwise it 403s ("locked").
  async function confirmSpend() {
    setShowGate(false);
    try {
      const res = await authFetch("/api/credits/spend", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemKey: READ_KEY, cost: READ_COST }),
      });
      const d = await res.json().catch(() => ({}));
      if (d?.migrated === false) {
        // Account credits not server-backed → local fallback.
        if (!spendAndUnlock(READ_KEY, READ_COST)) { window.dispatchEvent(new CustomEvent("inhero:open-charge")); return; }
      } else if (!d?.ok) {
        window.dispatchEvent(new CustomEvent("inhero:open-charge")); return; // insufficient on server
      } else {
        await hydrateCredits().catch(() => {}); // mirror server unlock + balance locally
      }
      setOwned(true);
      router.push(READ_HREF);
    } catch {
      if (spendAndUnlock(READ_KEY, READ_COST)) { setOwned(true); router.push(READ_HREF); }
      else window.dispatchEvent(new CustomEvent("inhero:open-charge"));
    }
  }

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: GREEN }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 20px 100px" }}>
        {/* Hero / cover */}
        <section style={{ background: "linear-gradient(160deg,#0a0a14,#1b1340 55%,#2d1a5e)", borderRadius: "0 0 22px 22px", padding: "44px 30px 40px", textAlign: "center", boxShadow: "0 16px 40px rgba(20,10,50,0.28)" }}>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#c4b5fd", background: "rgba(196,181,253,0.14)", borderRadius: 7, padding: "4px 12px", letterSpacing: "0.04em" }}>🎓 합격 수기</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem,6vw,3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.12, margin: "18px 0 14px" }}>
            {STORY_META.title}
          </h1>
          <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 4px" }}>{STORY_META.sub1}</p>
          <p style={{ fontSize: 15.5, fontWeight: 700, color: "#a78bfa", lineHeight: 1.6, margin: 0 }}>{STORY_META.sub2}</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "18px 0 0" }}>{STORY_META.tagline}</p>

          <button onClick={readBook}
            style={{ display: "inline-flex", alignItems: "center", gap: 9, marginTop: 26, background: GREEN, color: "#03120c", border: "none", cursor: "pointer", borderRadius: 12, padding: "15px 34px", fontSize: 16, fontWeight: 800, boxShadow: "0 10px 26px rgba(0,184,95,0.32)" }}>
            📖 {owned ? "책 읽기" : "책 읽기 (200 크레딧)"} <span aria-hidden="true">→</span>
          </button>
          <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", margin: "12px 0 0" }}>
            {owned ? "이미 잠금 해제됨 · 바로 읽을 수 있어요" : "목차·프롤로그는 무료 · 전체 책은 200 크레딧으로 한 번만 잠금 해제"}
          </p>
        </section>

        {/* Prologue */}
        <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "30px 28px", margin: "24px 0" }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#7c3aed", letterSpacing: "0.05em", marginBottom: 18 }}>프롤로그 — 아무도 없었다</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24, paddingLeft: 14, borderLeft: "3px solid #ede9fe" }}>
            {PROLOGUE_OPENING.map((line, i) => (
              <p key={i} style={{ fontSize: 15.5, fontWeight: 700, color: "#1a1a1f", letterSpacing: "-0.01em", lineHeight: 1.6, margin: 0 }}>{line}</p>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {PROLOGUE_BODY.map((para, i) => (
              <p key={i} style={{ fontSize: 14.5, color: "#334155", lineHeight: 1.9, margin: 0 }}>{para}</p>
            ))}
          </div>
          <button onClick={readBook}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22, color: GREEN, background: "none", border: "none", cursor: "pointer", fontWeight: 800, fontSize: 14.5 }}>
            이어서 읽기 (전체 책) →
          </button>
        </section>

        {/* Table of contents */}
        <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "28px 28px" }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 4px" }}>📑 목차</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 22px" }}>프롤로그부터 부록까지 — 자기주도 입시의 전 과정</p>

          {/* Prologue row */}
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1f", padding: "10px 0", borderBottom: "1px solid #f1f3f5" }}>{TOC_PROLOGUE}</div>

          {TOC_PARTS.map((part) => (
            <div key={part.title} style={{ marginTop: 18 }}>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: "#5b21b6", marginBottom: 8 }}>{part.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {part.chapters.map((c) => (
                  <div key={c.n} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "7px 0", borderBottom: "1px solid #f5f6f8" }}>
                    <span style={{ flexShrink: 0, fontSize: 12, fontWeight: 800, color: "#cbd5e1", fontFamily: "'JetBrains Mono', monospace", minWidth: 34 }}>{c.n}장</span>
                    <span style={{ fontSize: 14, color: "#334155", lineHeight: 1.5 }}>{c.t}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1f", padding: "16px 0 10px", marginTop: 8, borderTop: "1px solid #f1f3f5" }}>{TOC_EPILOGUE}</div>

          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "#5b21b6", marginBottom: 8 }}>부록</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {TOC_APPENDIX.map((a) => (
                <div key={a} style={{ fontSize: 14, color: "#334155", padding: "7px 0", borderBottom: "1px solid #f5f6f8", lineHeight: 1.5 }}>{a}</div>
              ))}
            </div>
          </div>

          <button onClick={readBook}
            style={{ display: "block", width: "100%", textAlign: "center", marginTop: 26, background: "#1a1a1f", color: "#fff", border: "none", cursor: "pointer", borderRadius: 10, padding: "15px", fontSize: 15, fontWeight: 800 }}>
            📖 {owned ? "지금 책 읽기 →" : "전체 책 읽기 (200 크레딧) →"}
          </button>
        </section>
      </div>

      {/* Credit confirm modal */}
      {showGate && (
        <div onClick={() => setShowGate(false)}
          style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(10,10,20,0.55)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 18, padding: "26px 26px", maxWidth: 380, width: "100%", textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
            <div style={{ fontSize: 38 }}>📖</div>
            <h3 style={{ fontSize: 18, fontWeight: 850, margin: "10px 0 6px", color: "#1a1a1f" }}>전체 책을 200 크레딧으로 읽으시겠습니까?</h3>
            <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6, margin: "0 0 6px" }}>‘내가 아이비리그 공대에 오기까지’ 전체 본문(230페이지)이 열립니다.</p>
            <p style={{ fontSize: 12.5, color: "#94a3b8", margin: "0 0 18px" }}>보유 크레딧 {balance.toLocaleString()}개 · 한 번만 차감되고 이후엔 무료로 다시 읽기</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowGate(false)} style={{ flex: 1, background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>취소</button>
              <button onClick={confirmSpend} style={{ flex: 2, background: GREEN, color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>🪙 200 크레딧 사용</button>
            </div>
          </div>
        </div>
      )}

      {/* Reader reviews — small docked widget on the right */}
      <StoryReviewWidget />
    </div>
  );
}
