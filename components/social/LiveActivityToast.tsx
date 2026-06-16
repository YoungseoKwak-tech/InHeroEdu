"use client";

/**
 * LiveActivityToast — floating "the site is alive" social-proof toasts.
 *
 * Pops rotating activity ("방금 누군가 AP Bio 교재를 구매했어요", "지금 N명이
 * 자료실을 보는 중") at the bottom-left across the /parents portal. All content
 * is generated client-side (useEffect) so there's no SSR/hydration mismatch,
 * and the first toast is delayed a beat so it reads as live, not canned.
 */

import { useEffect, useState } from "react";

const FAMILY = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오", "서", "신", "권"];
const MID = ["민", "서", "지", "현", "준", "예", "도", "하", "수", "유", "은", "주"];

const ITEMS = [
  "AP Biology 교재",
  "AP Chemistry 교재",
  "AP Calculus 교재",
  "SAT 실전 모의고사",
  "IB 실전 모의고사",
  "AP 문제 은행 전체 액세스",
  "핵심 노트(Core Notes)",
  "세미나 풀영상 + 발표자료",
  "2시간 방향성 설계 세션",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function maskedName(): string {
  return `${pick(FAMILY)}O${pick(MID)}`;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 한국어 목적격 조사 을/를 선택 (받침 유무).
function objParticle(word: string): string {
  const last = word.charCodeAt(word.length - 1);
  if (last < 0xac00 || last > 0xd7a3) return "를";
  return (last - 0xac00) % 28 === 0 ? "를" : "을";
}

type Toast = { id: number; emoji: string; text: string; sub: string };

function buildToast(seq: number): Toast {
  const item = pick(ITEMS);
  return {
    id: seq,
    emoji: "💳",
    text: `${maskedName()}님이 ${item}${objParticle(item)} 결제하셨습니다`,
    sub: `${randInt(1, 9)}분 전`,
  };
}

export default function LiveActivityToast() {
  const [toast, setToast] = useState<Toast | null>(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;
    let seq = 0;
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setToast(buildToast(seq++));
      // visible ~5s, then gap ~6–12s before the next one
      hideTimer = setTimeout(() => setToast(null), 5000);
      nextTimer = setTimeout(cycle, 5000 + randInt(6000, 12000));
    };

    // first toast after a short, lifelike delay
    const startTimer = setTimeout(cycle, 3500);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [closed]);

  if (closed || !toast) return null;

  return (
    <div
      key={toast.id}
      style={{
        position: "fixed",
        left: 16,
        bottom: 16,
        zIndex: 60,
        maxWidth: 320,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "rgba(255,255,255,0.98)",
        border: "1px solid #e6e8ec",
        borderRadius: 14,
        padding: "12px 14px",
        boxShadow: "0 10px 30px rgba(16,24,40,0.16)",
        animation: "inhero-toast-in 0.4s ease",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          flexShrink: 0,
          borderRadius: 10,
          background: "#f0fdf4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 19,
        }}
      >
        {toast.emoji}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: "#1a1a1f", lineHeight: 1.4 }}>{toast.text}</p>
        <p style={{ margin: "2px 0 0", fontSize: 11.5, color: "#94a3b8", fontWeight: 600 }}>
          <span style={{ color: "#00b85f" }}>●</span> {toast.sub}
        </p>
      </div>
      <button
        onClick={() => setClosed(true)}
        aria-label="닫기"
        style={{ background: "none", border: "none", color: "#cbd5e1", fontSize: 16, cursor: "pointer", lineHeight: 1, flexShrink: 0 }}
      >
        ✕
      </button>
      <style>{`@keyframes inhero-toast-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
