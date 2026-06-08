"use client";

/**
 * White-portal flip preview of the digital textbook spreads — same page images
 * as the main-site Field Manual slider (/textbook-preview/slide-0X.png), shown
 * as a flipping carousel above the textbook covers on /parents. Auto-advances,
 * with arrows + dots; clicking enters the library.
 */

import { useEffect, useRef, useState } from "react";

interface Slide { image: string; manual: string; title: string; subtitle: string; caption: string; }

const SLIDES: Slide[] = [
  {
    image: "/textbook-preview/slide-01.png", manual: "FIELD MANUAL · 01 / 4",
    title: "아키텍트의 손글씨 노트", subtitle: "손글씨 · 군더더기 없음 · 순수 논리",
    caption: "타이핑된 본문 옆에 만점자급 손글씨 주석이 함께 놓입니다. 공부 팁이 아니라, 시험 당일 머릿속에서 재생될 바로 그 설명입니다.",
  },
  {
    image: "/textbook-preview/slide-02.png", manual: "FIELD MANUAL · 02 / 4",
    title: "복잡한 메커니즘, 한 장으로", subtitle: "복잡한 과정 → 하나의 결정적 다이어그램",
    caption: "다들 대충 넘어가는 어려운 과정을, 손으로 단계별로 풀어 라벨까지 붙여 정리했습니다. 왼쪽 본문 + 오른쪽 손그림 = 한 펼침면, 두 겹의 이해.",
  },
  {
    image: "/textbook-preview/slide-03.png", manual: "FIELD MANUAL · 03 / 4",
    title: "시험급 MCQ + FRQ", subtitle: "킬러 문제, 군더더기 0",
    caption: "실제 시험 난이도의 객관식·서술형 문제를 단원마다 수록. 개념을 읽고 바로 실전으로 점검합니다.",
  },
  {
    image: "/textbook-preview/slide-04.png", manual: "FIELD MANUAL · 04 / 4",
    title: "정답 + 채점 루브릭", subtitle: "모범답안과 루브릭까지",
    caption: "FRQ 채점 루브릭과 모범답안이 설계상 포함되어, 혼자서도 정확히 채점하며 공부할 수 있습니다.",
  },
];

export default function TextbookFlipPreview() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(() => setIdx((i) => (i + 1) % SLIDES.length), 4200);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [idx, paused]);

  const s = SLIDES[idx];
  const go = (d: number) => setIdx((i) => (i + d + SLIDES.length) % SLIDES.length);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      style={{ display: "grid", gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)", gap: 22, alignItems: "stretch", marginBottom: 30 }} className="tfp-grid">
      {/* Page image in a device frame */}
      <div style={{ position: "relative", background: "linear-gradient(135deg,#0a0a14,#1a1a2e)", borderRadius: 16, padding: 14, boxShadow: "0 14px 40px rgba(10,10,20,0.25)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={s.image} src={s.image} alt={s.title} style={{ width: "100%", borderRadius: 8, display: "block", animation: "tfpIn 0.6s ease" }} />
        <span style={{ position: "absolute", bottom: 24, left: 26, fontFamily: "ui-monospace, monospace", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", color: "#fde68a", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(253,230,138,0.4)", borderRadius: 6, padding: "5px 11px" }}>{s.manual}</span>
      </div>

      {/* Text panel */}
      <div style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 16, padding: "26px 26px", display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.18em", color: "#b45309", marginBottom: 12 }}>ANNOTATED BY THE ARCHITECT</div>
        <h3 key={s.title} style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(1.6rem,3vw,2rem)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 6px", animation: "tfpIn 0.5s ease" }}>{s.title}</h3>
        <div style={{ fontStyle: "italic", color: "#b45309", fontWeight: 600, fontSize: 15, marginBottom: 16 }}>{s.subtitle}</div>
        <p key={s.caption} style={{ fontSize: 14.5, color: "#334155", lineHeight: 1.8, margin: "0 0 20px", animation: "tfpIn 0.5s ease" }}>{s.caption}</p>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {SLIDES.map((_, i) => <button key={i} aria-label={`슬라이드 ${i + 1}`} onClick={() => setIdx(i)} style={{ width: i === idx ? 20 : 8, height: 8, borderRadius: 4, border: "none", background: i === idx ? "#1a1a1f" : "#cbd5e1", cursor: "pointer", transition: "width 200ms", padding: 0 }} />)}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button aria-label="이전" onClick={() => go(-1)} style={arrowBtn}>←</button>
            <button aria-label="다음" onClick={() => go(1)} style={arrowBtn}>→</button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tfpIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @media (max-width: 760px) { .tfp-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

const arrowBtn: React.CSSProperties = {
  width: 40, height: 40, borderRadius: "50%", border: "1.5px solid #1a1a1f", background: "#fff",
  color: "#1a1a1f", fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
};
