"use client";

/**
 * /parents/story — 합격 수기 HUB. Splits into three windows:
 *   ① 합격 학생 스토리 (책 『내가 아이비리그 공대에 오기까지』) → /parents/story/book
 *   ② 합격 활동 분석 → /parents/activities
 *   ③ 합격 에세이 분석 → /parents/essay
 * The book is now one part of 합격 수기, not the whole thing.
 */

import Link from "next/link";

const GREEN = "#00b85f";

const CARDS = [
  {
    emoji: "📖",
    title: "합격 학생 스토리",
    sub: "『내가 아이비리그 공대에 오기까지』",
    desc: "사교육 없이 코넬 공대에 간 공학도가 직접 쓴 자기주도 입시 수기. 목차·프롤로그는 무료, 본문은 열람권으로 읽어요.",
    href: "/parents/story/book",
    cta: "스토리 읽기",
    note: "목차·프롤로그 무료",
    noteKind: "free" as const,
  },
  {
    emoji: "🏆",
    title: "합격 활동 분석",
    sub: "실제 합격생 Common App 활동 10개",
    desc: "아이비리그 합격생의 활동 10개를 공개하고, 책 출간·논문·웹 프로젝트까지 직접 만드는 법을 단계별로.",
    href: "/parents/activities",
    cta: "활동 열람",
    note: "열람권",
    noteKind: "pass" as const,
  },
  {
    emoji: "✍️",
    title: "합격 에세이 분석",
    sub: "실제 코넬 공대 합격 에세이",
    desc: "코넬 공과대학 합격생의 Common App 메인 에세이를 한 문단씩 쪼개, 무엇이 왜 잘 됐는지 한국어로 자세히.",
    href: "/parents/essay",
    cta: "에세이 열람",
    note: "열람권",
    noteKind: "pass" as const,
  },
  {
    emoji: "🗂️",
    title: "실제 합격 사례 모음",
    sub: "언론 공개 합격생 사례 + 출처",
    desc: "본인이 직접 공개한 실제 합격생들의 전공·활동·결과를 '왜 통했나' 분석과 함께 — 사례마다 출처 링크. (공개 사실 기반 · 에세이 원문 미포함)",
    href: "/parents/cases",
    cta: "사례 보기",
    note: "미리보기 무료 · 25크레딧",
    noteKind: "pass" as const,
  },
];

export default function StoryHub() {
  return (
    <div style={{ minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 20px 90px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", marginBottom: 10 }}>🎓 합격 수기</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.6vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 10 }}>
          합격까지의 모든 것 — 스토리 · 활동 · 에세이
        </h1>
        <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.7, marginBottom: 28 }}>
          사교육 없이 아이비리그 공대에 간 합격생의 실제 기록을 세 갈래로 나눠 열람하세요. 합격생의 <strong>스토리(책)</strong>, 실제 <strong>합격 활동</strong>, 실제 <strong>합격 에세이</strong>까지.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
          {CARDS.map((c) => (
            <Link key={c.href} href={c.href} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", background: "#fff", border: "1px solid #e2e6ea", borderRadius: 16, padding: "24px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 34 }}>{c.emoji}</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: c.noteKind === "pass" ? "#7c3aed" : "#047a45", background: c.noteKind === "pass" ? "#faf7ff" : "#e9fbf2", borderRadius: 999, padding: "4px 10px" }}>{c.note}</span>
              </div>
              <h2 style={{ fontSize: 19, fontWeight: 800, margin: "16px 0 4px", letterSpacing: "-0.01em" }}>{c.title}</h2>
              <div style={{ fontSize: 13, fontWeight: 700, color: GREEN, marginBottom: 8 }}>{c.sub}</div>
              <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65, flex: 1 }}>{c.desc}</p>
              <span style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", background: GREEN, color: "#fff", borderRadius: 10, padding: "10px 18px", fontWeight: 800, fontSize: 14 }}>{c.cta} →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
