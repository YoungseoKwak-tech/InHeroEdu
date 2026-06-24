"use client";

/**
 * ConsultOffer — the "500+ credits = free 1:1 Ivy mentor consult" reward,
 * surfaced at the 500-credit purchase points (SAT/AP mock pages) where the
 * margin is made. Mirrors the banner on the /parents home. CTA opens the charge
 * modal (inhero:open-charge).
 */
export default function ConsultOffer({ style }: { style?: React.CSSProperties }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("inhero:open-charge"))}
      style={{
        textAlign: "left", cursor: "pointer", border: "none", borderRadius: 16, padding: "18px 20px",
        background: "linear-gradient(120deg,#1a1333,#3b2370 55%,#7c3aed)", color: "#fff",
        boxShadow: "0 12px 32px rgba(60,35,112,0.32)", display: "flex", alignItems: "center", gap: 16,
        flexWrap: "wrap", width: "100%", ...style,
      }}
    >
      <span style={{ fontSize: 34, lineHeight: 1 }}>🎓</span>
      <span style={{ flex: 1, minWidth: 210 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 900, color: "#fde68a", background: "rgba(253,224,71,0.16)", border: "1px solid rgba(253,224,71,0.4)", borderRadius: 999, padding: "3px 10px", marginBottom: 8, letterSpacing: "0.02em" }}>⚡ 선착순 한정 혜택</span>
        <span style={{ display: "block", fontSize: 17, fontWeight: 850, letterSpacing: "-0.02em", lineHeight: 1.35 }}>500 크레딧 이상 결제 시 — 아이비리그생 1:1 컨설팅</span>
        <span style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 5, lineHeight: 1.6 }}>
          현역 아이비리그 재학생과 <strong style={{ color: "#fff" }}>30분~1시간 1:1 컨설팅</strong>을 무료로 — 입시 전략·과목 선택·활동 설계까지. <strong style={{ color: "#fde68a" }}>선착순 마감</strong>이에요.
        </span>
      </span>
      <span style={{ flexShrink: 0, background: "#fff", color: "#5b21b6", borderRadius: 9, padding: "11px 20px", fontSize: 13.5, fontWeight: 850, whiteSpace: "nowrap" }}>혜택 신청하기 →</span>
    </button>
  );
}
