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
import { getBalance, isUnlocked, spendAndUnlockAccount, hydrateCredits, CREDIT_EVENT } from "@/lib/credits";
import { getClientSession } from "@/lib/client-auth";
import { isAdminEmail } from "@/lib/adminEmails";

const GREEN = "#00b85f";

export default function CreditGate({
  gateKey, cost, title, desc, children,
  bundleKey, bundleCost, bundleLabel,
}: {
  gateKey: string; cost: number; title: string; desc?: string; children: ReactNode;
  // Optional "unlock everything" bundle (e.g. 전 과목 한 번에 · 1000). If the
  // bundle key is already unlocked, this gate counts as unlocked too.
  bundleKey?: string; bundleCost?: number; bundleLabel?: string;
}) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [balance, setBalance] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let alive = true;
    const sync = () => {
      if (!alive) return;
      setUnlocked(isUnlocked(gateKey) || (!!bundleKey && isUnlocked(bundleKey)));
      setBalance(getBalance());
    };
    hydrateCredits().catch(() => {}).finally(sync);
    window.addEventListener(CREDIT_EVENT, sync);
    return () => {
      alive = false;
      window.removeEventListener(CREDIT_EVENT, sync);
    };
  }, [gateKey, bundleKey]);

  // Admins get every gated item credit-free.
  useEffect(() => {
    getClientSession().then((s) => setIsAdmin(isAdminEmail(s?.user?.email))).catch(() => {});
  }, []);

  // Avoid SSR/first-paint flash — decide only after reading localStorage.
  if (unlocked === null) return null;
  if (unlocked || isAdmin) return <>{children}</>;

  const enough = balance >= cost;
  const bundleEnough = bundleKey ? balance >= (bundleCost ?? cost) : false;
  const handleUnlock = async (bundle?: boolean) => {
    if (pending) return;
    const k = bundle && bundleKey ? bundleKey : gateKey;
    const c = bundle && bundleKey ? (bundleCost ?? cost) : cost;
    setPending(true);
    try {
      const result = await spendAndUnlockAccount(k, c);
      setBalance(result.balance);
      if (result.ok) setUnlocked(true);
      else if (result.reason === "insufficient") window.dispatchEvent(new Event("inhero:open-charge"));
      else window.alert("크레딧 차감 확인 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div style={{ position: "relative", borderRadius: 16, border: "1px solid #e6e8ec", background: "#fff", overflow: "hidden", minHeight: 340 }}>
      {/* Teaser — about the top half is readable, the rest is blurred to entice purchase */}
      <div aria-hidden="true" style={{ maxHeight: 560, overflow: "hidden", pointerEvents: "none", userSelect: "none", padding: "2px 4px 0", color: "#334155" }}>
        {children}
      </div>

      {/* Progressive blur veil — top ~half readable, bottom half blurs + fades to white */}
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", bottom: 0, zIndex: 1, backdropFilter: "blur(7px)", WebkitBackdropFilter: "blur(7px)", background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 34%, rgba(255,255,255,0.97) 82%)" }} />

      {/* Unlock CTA pinned to the bottom over the blur */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 2, padding: "20px 24px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 26, marginBottom: 6 }}>🔒</div>
        <div style={{ fontSize: 17, fontWeight: 850, color: "#1a1a1f", marginBottom: 5 }}>{title}</div>
        {desc && <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, maxWidth: 440, margin: "0 auto 14px" }}>{desc}</p>}

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e6e8ec", borderRadius: 999, padding: "6px 15px", marginBottom: 13, boxShadow: "0 1px 3px rgba(16,24,40,0.06)" }}>
          <span style={{ fontSize: 15, fontWeight: 900, color: GREEN }}>🪙 {cost.toLocaleString()}</span>
          <span style={{ fontSize: 12.5, color: "#94a3b8" }}>크레딧</span>
          <span style={{ fontSize: 12, color: "#cbd5e1" }}>·</span>
          <span style={{ fontSize: 12.5, color: enough ? "#64748b" : "#dc2626" }}>보유 {balance.toLocaleString()}</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          <button disabled={pending} onClick={() => handleUnlock(false)} style={{ background: enough ? GREEN : "#1a1a1f", color: "#fff", border: "none", borderRadius: 10, padding: "13px 24px", fontWeight: 800, fontSize: 14.5, cursor: pending ? "default" : "pointer", opacity: pending ? 0.72 : 1, boxShadow: enough ? "0 8px 22px rgba(0,184,95,0.32)" : "none" }}>
            {pending ? "확인 중…" : enough ? `잠금 해제 · ${cost.toLocaleString()} 크레딧` : "크레딧 충전하기 →"}
          </button>
          {bundleKey && (
            <button disabled={pending} onClick={() => handleUnlock(true)} style={{ background: "#fff", color: "#1a1a1f", border: "1.5px solid #1a1a1f", borderRadius: 10, padding: "13px 24px", fontWeight: 800, fontSize: 14.5, cursor: pending ? "default" : "pointer", opacity: pending ? 0.72 : 1 }}>
              {bundleLabel ?? "전 과목 한 번에"} · {(bundleCost ?? cost).toLocaleString()} 크레딧{!bundleEnough ? " →" : ""}
            </button>
          )}
        </div>
        <p style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 12 }}>
          {bundleKey ? "원하는 과목만 200, 전 과목은 1,000 크레딧 · " : ""}한 번 열면 계속 볼 수 있어요
        </p>
      </div>
    </div>
  );
}
