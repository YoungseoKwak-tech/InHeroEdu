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
import { getClientSession } from "@/lib/client-auth";
import { isUnlocked, spendAndUnlockAccount, getBalance, hydrateCredits, CREDIT_EVENT, CREDIT_COSTS } from "@/lib/credits";
import { isAdminEmail } from "@/lib/adminEmails";
import {
  STORY_META, TOC_PROLOGUE, TOC_PARTS, TOC_EPILOGUE, TOC_APPENDIX,
  PROLOGUE_OPENING, PROLOGUE_BODY, PART6_PREVIEW,
} from "./data";

const GREEN = "#00b85f";
const READ_KEY = "res:/parents/story";
const READ_COST = CREDIT_COSTS.STORY_BOOK; // 220
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
      // Admins read everything credit-free — treat as already owned.
      if (isAdminEmail(s?.user?.email)) { setOwned(true); return; }
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
      const result = await spendAndUnlockAccount(READ_KEY, READ_COST);
      if (!result.ok) {
        if (result.reason === "insufficient") window.dispatchEvent(new CustomEvent("inhero:open-charge"));
        else window.alert("크레딧 차감 확인 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
        return;
      }
      setOwned(true);
      router.push(READ_HREF);
    } catch {
      window.alert("크레딧 차감 확인 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    }
  }

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents/story" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 합격 수기</Link>
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
            📖 {owned ? "책 읽기" : `책 읽기 (${READ_COST} 크레딧)`} <span aria-hidden="true">→</span>
          </button>
          <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", margin: "12px 0 0" }}>
            {owned ? "이미 잠금 해제됨 · 바로 읽을 수 있어요" : `목차·프롤로그는 무료 · 전체 책은 ${READ_COST} 크레딧으로 한 번만 잠금 해제`}
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

        {/* Part 6 — readable preview (합격 이후) */}
        <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "30px 28px", margin: "0 0 24px" }}>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#fff", background: "#7c3aed", borderRadius: 7, padding: "4px 11px", letterSpacing: "0.03em" }}>{PART6_PREVIEW.badge}</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: "14px 0 6px" }}>{PART6_PREVIEW.title}</h2>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, margin: "0 0 22px" }}>{PART6_PREVIEW.intro}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {PART6_PREVIEW.chapters.map((c) => (
              <div key={c.n} style={{ borderLeft: "3px solid #ede9fe", paddingLeft: 16 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#7c3aed", fontFamily: "'JetBrains Mono', monospace" }}>{c.n}장</span>
                  <h3 style={{ fontSize: 16.5, fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>{c.title}</h3>
                </div>
                <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.8, margin: "0 0 12px", fontWeight: 600 }}>{c.lead}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {c.points.map((p, i) => (
                    <div key={i} style={{ fontSize: 13.5, lineHeight: 1.7 }}>
                      <span style={{ fontWeight: 800, color: "#1a1a1f" }}>{p.h}</span>
                      <span style={{ color: "#475569" }}> — {p.b}</span>
                    </div>
                  ))}
                </div>
                {c.close && <p style={{ fontSize: 14.5, fontWeight: 800, color: "#5b21b6", fontStyle: "italic", margin: "12px 0 0" }}>“{c.close}”</p>}
              </div>
            ))}
          </div>

          <button onClick={readBook}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22, color: GREEN, background: "none", border: "none", cursor: "pointer", fontWeight: 800, fontSize: 14.5 }}>
            전체 책에서 이어 읽기 →
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
            📖 {owned ? "지금 책 읽기 →" : `전체 책 읽기 (${READ_COST} 크레딧) →`}
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
            <h3 style={{ fontSize: 18, fontWeight: 850, margin: "10px 0 6px", color: "#1a1a1f" }}>전체 책을 {READ_COST} 크레딧으로 읽으시겠습니까?</h3>
            <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6, margin: "0 0 6px" }}>‘내가 아이비리그 공대에 오기까지’ 전체 본문(230페이지)이 열립니다.</p>
            <p style={{ fontSize: 12.5, color: "#94a3b8", margin: "0 0 18px" }}>보유 크레딧 {balance.toLocaleString()}개 · 한 번만 차감되고 이후엔 무료로 다시 읽기</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowGate(false)} style={{ flex: 1, background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>취소</button>
              <button onClick={confirmSpend} style={{ flex: 2, background: GREEN, color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>🪙 {READ_COST} 크레딧 사용</button>
            </div>
          </div>
        </div>
      )}

      {/* Reader reviews — small docked widget on the right */}
      <StoryReviewWidget />
    </div>
  );
}
