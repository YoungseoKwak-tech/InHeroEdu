"use client";

/**
 * /parents/study-method — 자기주도 공부법.
 *
 * The self-directed study system the 합격 수기 author used to reach an Ivy
 * engineering program without 학원/과외: how to plan, review, build concept
 * notes, and run exam prep on your own. White portal styling.
 */

import Link from "next/link";

const GREEN = "#00b85f";
const BLUE = "#2563eb";
const KAKAO_CHAT = "http://pf.kakao.com/_ZchdX/chat";

const PRINCIPLES = [
  { emoji: "🎯", title: "목표를 역설계한다", desc: "‘5점/합격’에서 거꾸로 — 시험 범위·마감에서 이번 주, 오늘 할 일을 스스로 쪼갭니다." },
  { emoji: "🔁", title: "복습은 간격을 둔다", desc: "한 번 보고 끝이 아니라, 잊을 만할 때 다시 — 간격 반복으로 장기기억에 새깁니다." },
  { emoji: "🧩", title: "개념을 내 말로 정리한다", desc: "외우지 않고, 핵심 개념·함정·예시를 직접 한 장으로 정리해 ‘설명할 수 있는’ 상태로." },
  { emoji: "📝", title: "실전으로 점검한다", desc: "문제은행·모의고사로 약점 단원을 찾아내고, 틀린 이유를 분석해 다시 메웁니다." },
  { emoji: "🧭", title: "스스로 피드백한다", desc: "남이 채점해주길 기다리지 않고, 주마다 ‘뭐가 됐고 뭐가 막혔는지’ 직접 회고합니다." },
];

const TOOLS = [
  { emoji: "📝", label: "AP 문제은행", route: "/parents/question-bank", note: "약점 단원 점검" },
  { emoji: "📘", label: "AP 개념정리", route: "/parents/core-notes", note: "한국어 일타강사 노트" },
  { emoji: "📒", label: "단어장", route: "/parents/vocab", note: "간격 반복 암기" },
  { emoji: "✏️", label: "SAT 모의고사", route: "/parents/sat", note: "실전 감각" },
];

export default function StudyMethodClient() {
  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: GREEN }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px 100px" }}>
        {/* Hero */}
        <section style={{ background: "linear-gradient(160deg,#0a1430,#10295e 55%,#1e3a8a)", borderRadius: "0 0 22px 22px", padding: "46px 32px 42px", textAlign: "center", boxShadow: "0 16px 40px rgba(10,20,50,0.28)" }}>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#bfdbfe", background: "rgba(191,219,254,0.14)", borderRadius: 7, padding: "4px 12px", letterSpacing: "0.04em" }}>🧠 자기주도 공부법</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem,5.5vw,2.9rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, margin: "18px 0 14px" }}>
            학원 없이, <span style={{ color: "#93c5fd" }}>스스로 굴러가는</span> 공부
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            합격 수기의 저자가 학원·과외 없이 아이비리그 공대까지 간 방법 —
            계획·복습·개념정리·시험 전략을 학생이 스스로 굴리는 시스템으로 정리했어요.
          </p>
        </section>

        {/* Principles */}
        <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "28px 28px", margin: "24px 0" }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 4px" }}>🧠 5가지 원칙</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 20px" }}>‘열심히’가 아니라 ‘스스로 굴러가게’ 만드는 다섯 가지.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#f5f8fd", border: "1px solid #e3ebf6", borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 10, background: BLUE, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800 }}>{i + 1}</div>
                <div>
                  <div style={{ fontSize: 15.5, fontWeight: 800, color: "#1a1a1f", marginBottom: 3 }}>{p.emoji} {p.title}</div>
                  <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools to run it */}
        <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "28px 28px" }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 4px" }}>🧰 이 공부법을 굴리는 도구</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 20px" }}>InHero 자료실 안에서 바로 시작할 수 있어요.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {TOOLS.map((t) => (
              <Link key={t.route} href={t.route} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12, background: "#f7f8fa", border: "1px solid #e6e8ec", borderRadius: 12, padding: "14px 16px", color: "#1a1a1f" }}>
                <span style={{ fontSize: 26 }}>{t.emoji}</span>
                <span>
                  <span style={{ display: "block", fontSize: 14.5, fontWeight: 800 }}>{t.label}</span>
                  <span style={{ display: "block", fontSize: 12.5, color: "#94a3b8", marginTop: 2 }}>{t.note}</span>
                </span>
              </Link>
            ))}
          </div>

          <a href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", textAlign: "center", marginTop: 24, background: "#1a1a1f", color: "#fff", textDecoration: "none", borderRadius: 10, padding: "15px", fontSize: 15, fontWeight: 800 }}>
            🧭 우리 아이 공부법 상담받기 →
          </a>
        </section>
      </div>
    </div>
  );
}
