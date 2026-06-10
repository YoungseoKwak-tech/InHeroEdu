"use client";

/**
 * Parent-portal credit widget: live balance pill + 충전(charge) modal + 로그아웃.
 * Self-contained — reads/writes localStorage via lib/credits and listens for
 * `inhero:open-charge` so locked content can pop the charge modal.
 */

import { useEffect, useState } from "react";
import { getBalance, chargeServer, hydrateCredits, CREDIT_EVENT, WELCOME_CREDITS } from "@/lib/credits";
import { createBrowserClient } from "@/lib/supabase";
import { authFetch } from "@/lib/client-auth";
import { CREDIT_PACKAGES, type CreditPackage } from "@/lib/creditPackages";
import { checkoutNotice } from "@/lib/legal";
import { getClientSession } from "@/lib/client-auth";
import { getMyCode, REFERRAL_REWARD } from "@/lib/referrals";

const GREEN = "#00b85f";
// adminOnly packages (e.g. the 1,000원 real-payment test) only show to the founder.
const FOUNDER_EMAILS = new Set(["yeongseo0802@gmail.com"]);

// Real checkout is on when NicePay is enabled; otherwise the buttons fall back
// to the demo top-up so the flow still works in dev.
// Demo charge mode by default — real NicePay payment only when the flag is
// explicitly "true". (Production NicePay credentials are empty, so defaulting
// to "on" surfaced a "결제 준비 실패" error; demo mode is clean until keys are set.)
const NICEPAY_ENABLED = process.env.NEXT_PUBLIC_NICEPAY_ENABLED === "true";
const NICEPAY_SDK_URL = "https://pay.nicepay.co.kr/v1/js/";

function loadNicePayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const w = window as unknown as { AUTHNICE?: unknown };
    if (w.AUTHNICE) return resolve();
    const existing = document.querySelector(`script[src="${NICEPAY_SDK_URL}"]`) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("NICEPAY SDK load failed")));
      return;
    }
    const s = document.createElement("script");
    s.src = NICEPAY_SDK_URL; s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("NICEPAY SDK load failed"));
    document.head.appendChild(s);
  });
}

export default function CreditWidget({ loggedIn }: { loggedIn: boolean }) {
  const [balance, setBalance] = useState<number | null>(null);
  const [charge, setCharge] = useState(false);
  const [buying, setBuying] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [isFounder, setIsFounder] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [refCopied, setRefCopied] = useState(false);

  useEffect(() => { try { setRefCode(getMyCode()); } catch { /* ignore */ } }, []);

  function copyReferral() {
    const msg = `InHero 학부모 자료실 — 제 추천 코드 "${refCode}"로 가입하면 둘 다 크레딧 받아요! https://inheroedu.com/parents`;
    navigator.clipboard?.writeText(msg).catch(() => {});
    setRefCopied(true);
    setTimeout(() => setRefCopied(false), 1600);
  }
  useEffect(() => {
    getClientSession().then((s) => setIsFounder(!!s?.user?.email && FOUNDER_EMAILS.has(s.user.email.toLowerCase()))).catch(() => {});
  }, []);
  const packages = CREDIT_PACKAGES.filter((p) => !p.adminOnly || isFounder);

  // Buy a credit package via NicePay (real); demo top-up if NicePay is off.
  async function buyPackage(pkg: CreditPackage) {
    if (!NICEPAY_ENABLED) { chargeServer(pkg.credits); setCharge(false); return; }
    setBuying(pkg.id); setErr(null);
    try {
      const res = await authFetch("/api/payments/nicepay/credits-prepare", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkg.id, returnTo: "/parents" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.clientId || !data.orderId) throw new Error(data.error || "결제 준비에 실패했어요.");
      await loadNicePayScript();
      const w = window as unknown as { AUTHNICE?: { requestPay: (p: Record<string, unknown>) => void } };
      if (!w.AUTHNICE) throw new Error("결제 모듈을 불러오지 못했어요.");
      w.AUTHNICE.requestPay({
        clientId: data.clientId, method: data.method ?? "card", orderId: data.orderId,
        amount: data.amount, goodsName: data.goodsName, returnUrl: data.returnUrl,
        ...(data.mallReserved ? { mallReserved: data.mallReserved } : {}),
        fnError: (r: { errorMsg?: string; errorCode?: string }) => {
          setBuying(null);
          setErr(r?.errorMsg || (r?.errorCode ? `결제 오류: ${r.errorCode}` : "결제가 취소되었습니다."));
        },
      });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "결제 중 오류가 발생했어요.");
      setBuying(null);
    }
  }

  // Pull the account balance/unlocks when signed in (cross-device persistence).
  useEffect(() => { if (loggedIn) hydrateCredits(); }, [loggedIn]);

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
              {packages.map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, border: `1.5px solid ${p.best ? GREEN : "#e6e8ec"}`, borderRadius: 12, padding: "12px 14px", background: p.best ? "rgba(0,184,95,0.05)" : "#fff" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1f" }}>🪙 {p.credits} 크레딧 {p.best && <span style={{ fontSize: 10.5, fontWeight: 800, color: "#fff", background: GREEN, borderRadius: 999, padding: "2px 8px", marginLeft: 4 }}>BEST</span>}</div>
                    <div style={{ fontSize: 12.5, color: "#64748b", marginTop: 2 }}>{NICEPAY_ENABLED ? `${p.krw.toLocaleString()}원 · ${p.note}` : `데모 모드 · 무료 충전 · ${p.note}`}</div>
                  </div>
                  <button onClick={() => buyPackage(p)} disabled={buying === p.id}
                    style={{ background: buying === p.id ? "#9ca3af" : GREEN, color: "#fff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 13, fontWeight: 800, cursor: buying === p.id ? "default" : "pointer", whiteSpace: "nowrap" }}>
                    {buying === p.id ? "결제 중…" : NICEPAY_ENABLED ? "결제" : "충전"}
                  </button>
                </div>
              ))}
            </div>

            {/* Referral reward */}
            <div style={{ marginTop: 14, background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: "13px 14px" }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: "#92400e", marginBottom: 4 }}>🎁 지인 추천하고 크레딧 받기</div>
              <p style={{ fontSize: 12.5, color: "#a16207", lineHeight: 1.6, margin: "0 0 10px" }}>
                지인이 내 추천 코드로 가입하면 <strong>🪙 {REFERRAL_REWARD} 크레딧</strong>이 바로 적립돼요. (가입 한 명당)
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <code style={{ flex: 1, minWidth: 0, fontSize: 14, fontWeight: 800, color: "#1a1a1f", background: "#fff", border: "1px dashed #fcd34d", borderRadius: 8, padding: "9px 12px", letterSpacing: "0.04em", overflow: "hidden", textOverflow: "ellipsis" }}>{refCode || "…"}</code>
                <button onClick={copyReferral}
                  style={{ flexShrink: 0, background: refCopied ? "#475569" : "#92400e", color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>
                  {refCopied ? "복사됨!" : "추천 링크 복사"}
                </button>
              </div>
            </div>

            {err && <p style={{ fontSize: 12.5, color: "#dc2626", marginTop: 10 }}>{err}</p>}
            {NICEPAY_ENABLED && (
              <p style={{ fontSize: 11.5, color: "#64748b", marginTop: 14, lineHeight: 1.7, background: "#f7f8fa", borderRadius: 8, padding: "10px 12px" }}>
                모든 가격은 <strong>VAT 포함</strong>이며, 일회성 크레딧 충전입니다(자동 결제·정기 구독 없음).<br />
                ※ {checkoutNotice}
              </p>
            )}
            <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 10, lineHeight: 1.6 }}>
              {NICEPAY_ENABLED ? (
                <>
                  NicePay 안전 결제(카드)로 진행됩니다. 가입 시 웰컴 크레딧 {WELCOME_CREDITS}개를 즉시 드려요.{" "}
                  <a href="/terms" target="_blank" rel="noopener" style={{ color: "#64748b", textDecoration: "underline" }}>이용약관</a>
                  {" · "}
                  <a href="/refund" target="_blank" rel="noopener" style={{ color: "#64748b", textDecoration: "underline" }}>환불정책</a>
                </>
              ) : (
                <>현재 <strong>데모 충전 모드</strong>입니다 — 버튼을 누르면 크레딧이 무료로 충전됩니다(실결제 없음). 가입 시 웰컴 크레딧 {WELCOME_CREDITS}개를 즉시 드려요.</>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
