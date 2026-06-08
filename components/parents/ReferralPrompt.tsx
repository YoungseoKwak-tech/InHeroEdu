"use client";

/**
 * Asks a newly-signed-in user for a referrer's ID/code (once). If they were
 * referred, the referrer earns 20 credits. Shown only after login.
 */

import { useEffect, useState } from "react";
import { referralAnswered, answerReferral, REFERRAL_REWARD } from "@/lib/referrals";

const GREEN = "#00b85f";

export default function ReferralPrompt({ loggedIn }: { loggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (loggedIn && !referralAnswered()) setOpen(true);
  }, [loggedIn]);

  if (!open) return null;

  const close = (c: string) => { answerReferral(c); setOpen(false); };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 210, background: "rgba(15,23,42,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "min(420px, 96vw)", background: "#fff", borderRadius: 16, padding: "26px 24px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <p style={{ fontSize: 26, margin: "0 0 8px" }}>🎁</p>
        <h3 style={{ fontSize: 19, fontWeight: 850, margin: "0 0 8px", color: "#1a1a1f" }}>추천인이 있으신가요?</h3>
        <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65, margin: "0 0 16px" }}>
          추천인 아이디(코드)를 입력하면 추천해 주신 분께 <strong style={{ color: "#a16207" }}>🪙 {REFERRAL_REWARD} 크레딧</strong>이 적립됩니다. 없으면 건너뛰셔도 돼요.
        </p>
        <input autoFocus value={code} onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && close(code)}
          placeholder="추천인 아이디 / 코드 (예: IH3K9Q)"
          style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #d7dce2", fontSize: 15, outline: "none", boxSizing: "border-box", marginBottom: 14 }} />
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => close("")} style={{ flex: 1, background: "#fff", border: "1.5px solid #e2e6ea", color: "#64748b", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            건너뛰기
          </button>
          <button onClick={() => close(code)} style={{ flex: 2, background: GREEN, color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
            추천인 등록
          </button>
        </div>
      </div>
    </div>
  );
}
