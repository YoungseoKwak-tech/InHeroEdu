"use client";

/**
 * PromoBanner — high-conversion launch-promo bar that slides in at the very top
 * of the parent hub. Sells the two flagship paid hooks: real-exam mock tests
 * (SAT·AP·TOEFL) and the Ivy-League-extracted summary notes. CTA opens the
 * credit/charge modal (inhero:open-charge). Dismiss hides it for the day.
 */

import { useEffect, useState } from "react";

const DISMISS_KEY = "inhero-promo-dismissed";

function msUntilMidnight(): number {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  return end.getTime() - now.getTime();
}
function fmtCountdown(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function PromoBanner() {
  const [show, setShow] = useState(false);
  const [enter, setEnter] = useState(false);
  const [left, setLeft] = useState(msUntilMidnight());

  useEffect(() => {
    // Show unless dismissed today.
    let dismissedToday = false;
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      dismissedToday = raw === new Date().toDateString();
    } catch { /* ignore */ }
    if (dismissedToday) return;
    setShow(true);
    const t = setTimeout(() => setEnter(true), 60); // slide-in
    const id = setInterval(() => setLeft(msUntilMidnight()), 1000);
    return () => { clearTimeout(t); clearInterval(id); };
  }, []);

  if (!show) return null;

  const dismiss = () => {
    try { localStorage.setItem(DISMISS_KEY, new Date().toDateString()); } catch { /* ignore */ }
    setEnter(false);
    setTimeout(() => setShow(false), 240);
  };
  const buy = () => window.dispatchEvent(new CustomEvent("inhero:open-charge"));

  return (
    <div
      style={{
        position: "sticky", top: 0, zIndex: 120,
        transform: enter ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 240ms cubic-bezier(.2,.8,.2,1)",
        background: "linear-gradient(100deg, #b91c1c 0%, #ea580c 55%, #f59e0b 100%)",
        color: "#fff", boxShadow: "0 6px 20px rgba(185,28,28,0.28)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "9px 16px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.22)", borderRadius: 999, padding: "4px 11px", fontSize: 12.5, fontWeight: 900, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
          🔥 오픈 기념 파격 할인
        </span>

        <div style={{ flex: 1, minWidth: 200, lineHeight: 1.35 }}>
          <div style={{ fontSize: 14.5, fontWeight: 800 }}>
            실제 시험 그대로 <span style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>SAT·AP·TOEFL 실전 모의고사</span> + 아이비리그생이 직접 추출한 요점정리
          </div>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>
            지금 이용권 한 번이면 무제한 — 학원비보다 싸게, 합격생 노하우를 그대로.
          </div>
        </div>

        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 800, background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "5px 10px", whiteSpace: "nowrap" }}>
          ⏰ 마감까지 <span style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "0.02em" }}>{fmtCountdown(left)}</span>
        </span>

        <button
          onClick={buy}
          style={{ background: "#fff", color: "#b91c1c", border: "none", borderRadius: 10, padding: "9px 18px", fontWeight: 900, fontSize: 13.5, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
        >
          지금 혜택받기 →
        </button>

        <button onClick={dismiss} aria-label="닫기" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.85)", fontSize: 18, lineHeight: 1, cursor: "pointer", padding: "2px 4px", flexShrink: 0 }}>
          ✕
        </button>
      </div>
    </div>
  );
}
