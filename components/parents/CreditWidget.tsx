"use client";

/**
 * Parent-portal credit widget: live balance pill + 충전(charge) modal + 로그아웃.
 * Self-contained — reads/writes localStorage via lib/credits and listens for
 * `inhero:open-charge` so locked content can pop the charge modal.
 */

import { useEffect, useState } from "react";
import { getBalance, addCredits, CREDIT_EVENT, WELCOME_CREDITS } from "@/lib/credits";
import { createBrowserClient } from "@/lib/supabase";
import { checkoutNotice } from "@/lib/legal";

const GREEN = "#00b85f";

// Pricing benchmarked to the student passes at ₩1,550/$: 500 credits ≈ a
// one-subject pass ($49 ≈ ₩75,000). Round 원 endings for parent checkout.
const PACKAGES = [
  { credits: 200, price: "33,000원", note: "단발 충전" },
  { credits: 500, price: "75,000원", note: "★ 한 과목 전체패스 가치", best: true },
  { credits: 1000, price: "139,000원", note: "전 과목 가기 전 징검다리" },
];

export default function CreditWidget({ loggedIn }: { loggedIn: boolean }) {
  const [balance, setBalance] = useState<number | null>(null);
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    setBalance(getBalance());
    const refresh = () => setBalance(getBalance());
    const openCharge = () => setCharge(true);
    window.addEventListener(CREDIT_EVENT, refresh);
    window.addEventListener("inhero:open-charge", openCharge);
    return () => {
      window.removeEventListener(CREDIT_EVENT, refresh);
      window.removeEventListener("inhero:open-charge", openCharge);
    };
  }, []);

  function logout() {
    try {
      const sb = createBrowserClient();
      void sb.auth.signOut({ scope: "global" }).catch(() => {});
      Object.keys(localStorage).filter((k) => k.startsWith("sb-") || k.toLowerCase().includes("supabase")).forEach((k) => localStorage.removeItem(k));
    } catch { /* ignore */ }
    window.location.replace("/parents");
  }

  return (
    <>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <button onClick={() => setCharge(true)} title="크레딧 충전"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fffbeb", border: "1.5px solid #f1d27a", borderRadius: 9, padding: "8px 12px", fontSize: 13.5, fontWeight: 800, color: "#a16207", cursor: "pointer", whiteSpace: "nowrap" }}>
          🪙 {balance == null ? "—" : balance.toLocaleString()}
          <span style={{ color: GREEN }}>＋충전</span>
        </button>
        {loggedIn && (
          <button onClick={logout} title="로그아웃"
            style={{ background: "#fff", border: "1.5px solid #e2e6ea", color: "#64748b", borderRadius: 9, padding: "8px 12px", fontSize: 13.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
            로그아웃
          </button>
        )}
      </div>

      {charge && (
        <div onClick={() => setCharge(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(15,23,42,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(440px, 96vw)", background: "#fff", borderRadius: 16, padding: "24px 24px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h3 style={{ fontSize: 18, fontWeight: 850, margin: 0, color: "#1a1a1f" }}>크레딧 충전</h3>
              <button onClick={() => setCharge(false)} style={{ border: "none", background: "none", fontSize: 18, color: "#94a3b8", cursor: "pointer" }}>✕</button>
            </div>
            <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 16px", lineHeight: 1.6 }}>
              현재 잔액 <strong style={{ color: "#a16207" }}>🪙 {balance ?? 0}</strong> · 프리미엄 자료(합격 에세이·활동 분석 등)를 크레딧으로 잠금 해제하세요.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PACKAGES.map((p) => (
                <div key={p.credits} style={{ display: "flex", alignItems: "center", gap: 12, border: `1.5px solid ${p.best ? GREEN : "#e6e8ec"}`, borderRadius: 12, padding: "12px 14px", background: p.best ? "rgba(0,184,95,0.05)" : "#fff" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1f" }}>🪙 {p.credits} 크레딧 {p.best && <span style={{ fontSize: 10.5, fontWeight: 800, color: "#fff", background: GREEN, borderRadius: 999, padding: "2px 8px", marginLeft: 4 }}>BEST</span>}</div>
                    <div style={{ fontSize: 12.5, color: "#64748b", marginTop: 2 }}>{p.price} · {p.note}</div>
                  </div>
                  <button onClick={() => { addCredits(p.credits); setCharge(false); }}
                    style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>
                    충전
                  </button>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11.5, color: "#64748b", marginTop: 14, lineHeight: 1.7, background: "#f7f8fa", borderRadius: 8, padding: "10px 12px" }}>
              모든 가격은 <strong>VAT 포함</strong>입니다. 자료실 정기 구독권: 월 29,000원(VAT 포함·매월 자동 결제).<br />
              ※ {checkoutNotice}
            </p>
            <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 10, lineHeight: 1.6 }}>
              데모 충전입니다(실결제 연동 전). 가입 시 웰컴 크레딧 {WELCOME_CREDITS}개를 즉시 드려요.{" "}
              <a href="/terms" target="_blank" rel="noopener" style={{ color: "#64748b", textDecoration: "underline" }}>이용약관</a>
              {" · "}
              <a href="/refund" target="_blank" rel="noopener" style={{ color: "#64748b", textDecoration: "underline" }}>환불정책</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
