"use client";

/**
 * CreditGate — wraps paid parent-portal content. If the item is already
 * unlocked, renders children. Otherwise shows a paywall: spend `cost` credits to
 * unlock, or (if the balance is short) pop the charge modal via
 * `inhero:open-charge`. Unlock state + balance live in lib/credits (localStorage).
 *
 * Real payment is not wired yet — this is the gating layer the user asked for
 * first; credits are topped up via the (currently demo) CreditWidget.
 */

import { useEffect, useState, type ReactNode } from "react";
import { getBalance, isUnlocked, spendAndUnlock, CREDIT_EVENT } from "@/lib/credits";

const GREEN = "#00b85f";

export default function CreditGate({
  gateKey, cost, title, desc, children,
}: { gateKey: string; cost: number; title: string; desc?: string; children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const sync = () => { setUnlocked(isUnlocked(gateKey)); setBalance(getBalance()); };
    sync();
    window.addEventListener(CREDIT_EVENT, sync);
    return () => window.removeEventListener(CREDIT_EVENT, sync);
  }, [gateKey]);

  // Avoid SSR/first-paint flash — decide only after reading localStorage.
  if (unlocked === null) return null;
  if (unlocked) return <>{children}</>;

  const enough = balance >= cost;
  const handleUnlock = () => {
    if (spendAndUnlock(gateKey, cost)) setUnlocked(true);
    else window.dispatchEvent(new Event("inhero:open-charge"));
  };

  return (
    <div style={{ position: "relative", borderRadius: 16, border: "1px solid #e6e8ec", background: "linear-gradient(180deg,#fff, #f7f8fa)", padding: "34px 28px", textAlign: "center", overflow: "hidden" }}>
      <div style={{ fontSize: 30, marginBottom: 10 }}>🔒</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a1f", marginBottom: 6 }}>{title}</div>
      {desc && <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 18px" }}>{desc}</p>}

      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e6e8ec", borderRadius: 999, padding: "7px 16px", marginBottom: 16 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: GREEN }}>🪙 {cost.toLocaleString()}</span>
        <span style={{ fontSize: 12.5, color: "#94a3b8" }}>크레딧</span>
        <span style={{ fontSize: 12, color: "#cbd5e1" }}>·</span>
        <span style={{ fontSize: 12.5, color: enough ? "#64748b" : "#dc2626" }}>보유 {balance.toLocaleString()}</span>
      </div>

      <div>
        <button onClick={handleUnlock} style={{ background: enough ? GREEN : "#1a1a1f", color: "#fff", border: "none", borderRadius: 10, padding: "13px 28px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" }}>
          {enough ? `잠금 해제 · ${cost.toLocaleString()} 크레딧 사용` : "크레딧 충전하기 →"}
        </button>
      </div>
      <p style={{ fontSize: 11.5, color: "#b0b8c1", marginTop: 14 }}>한 번 열면 계속 볼 수 있어요 · 충전은 마이페이지 크레딧에서</p>
    </div>
  );
}
