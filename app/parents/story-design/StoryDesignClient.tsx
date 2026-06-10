"use client";

/**
 * /parents/story-design — 아이비리그 스토리 설계 (자기주도 캠프).
 *
 * Landing/scaffold for the deep-dive program where a student designs THEIR OWN
 * admissions story (major narrative → activities/research → essay spine →
 * execution roadmap), self-directed, the way the 합격 수기 author did it.
 * White portal styling to match the other /parents pages.
 */

import Link from "next/link";

const GREEN = "#00b85f";
const PURPLE = "#7c3aed";
const KAKAO_CHAT = "http://pf.kakao.com/_ZchdX/chat";

const PHASES = [
  { n: 1, emoji: "🔍", title: "강점·관심 발굴", desc: "성적·시험 너머의 진짜 동기와 강점을 찾아 '이 학생만의 각도'를 잡습니다." },
  { n: 2, emoji: "🧬", title: "전공 서사 설계", desc: "지원 전공을 관통하는 한 줄 서사(narrative)를 만들고, 그게 왜 설득력 있는지 검증합니다." },
  { n: 3, emoji: "🏆", title: "활동·리서치 설계", desc: "서사를 증명하는 활동·리서치·프로젝트를 직접 기획 — 만들어진 스펙이 아니라 자기 손으로." },
  { n: 4, emoji: "✍️", title: "에세이 축 잡기", desc: "공통원서·보충 에세이로 이어질 핵심 모먼트와 메시지를 미리 설계합니다." },
  { n: 5, emoji: "🗺️", title: "실행 로드맵", desc: "G9~G12 학년별로 '언제 무엇을' 직접 실행할지 — 끝까지 혼자 갈 수 있는 지도를 그립니다." },
];

export default function StoryDesignClient() {
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
        <section style={{ background: "linear-gradient(160deg,#0a0a14,#1b1340 55%,#2d1a5e)", borderRadius: "0 0 22px 22px", padding: "46px 32px 42px", textAlign: "center", boxShadow: "0 16px 40px rgba(20,10,50,0.28)" }}>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#c4b5fd", background: "rgba(196,181,253,0.14)", borderRadius: 7, padding: "4px 12px", letterSpacing: "0.04em" }}>🧭 자기주도 캠프</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem,5.5vw,2.9rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, margin: "18px 0 14px" }}>
            내 아이비리그 스토리,<br /><span style={{ color: "#a78bfa" }}>직접 설계</span>한다
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            컨설팅이 짜주는 입시가 아니라, 학생이 스스로 자기 서사를 설계하는 심화 프로그램.
            합격 수기의 그 자기주도 방식을 단계별 캠프로 옮겼습니다.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 26 }}>
            <a href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FEE500", color: "#191600", textDecoration: "none", borderRadius: 12, padding: "14px 26px", fontSize: 15, fontWeight: 800 }}>
              💬 캠프 상담 신청
            </a>
            <Link href="/parents/story"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.5)", borderRadius: 12, padding: "14px 24px", fontSize: 15, fontWeight: 700 }}>
              먼저 합격 수기 보기 →
            </Link>
          </div>
        </section>

        {/* What it is */}
        <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "30px 28px", margin: "24px 0" }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: PURPLE, letterSpacing: "0.04em", marginBottom: 10 }}>왜 ‘설계’인가</div>
          <p style={{ fontSize: 15, color: "#334155", lineHeight: 1.9, margin: 0 }}>
            아이비리그 합격생의 공통점은 ‘남이 만들어준 스펙’이 아니라 <strong>자기만의 서사</strong>가 있었다는 거예요.
            이 캠프는 정답을 떠먹여 주지 않습니다. 학생이 자기 강점에서 출발해 전공 서사를 잡고,
            그 서사를 증명할 활동·리서치·에세이를 <strong>직접 기획·실행</strong>하도록 설계 과정을 함께합니다.
          </p>
        </section>

        {/* Phases */}
        <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "28px 28px" }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 4px" }}>🛠️ 설계 5단계</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 20px" }}>각 단계는 학생이 직접 만들어내는 결과물(deliverable)로 끝납니다.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PHASES.map((p) => (
              <div key={p.n} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 10, background: PURPLE, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800 }}>{p.n}</div>
                <div>
                  <div style={{ fontSize: 15.5, fontWeight: 800, color: "#1a1a1f", marginBottom: 3 }}>{p.emoji} {p.title}</div>
                  <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", textAlign: "center", marginTop: 26, background: "#1a1a1f", color: "#fff", textDecoration: "none", borderRadius: 10, padding: "15px", fontSize: 15, fontWeight: 800 }}>
            🧭 우리 아이 스토리 설계 상담받기 →
          </a>
        </section>
      </div>
    </div>
  );
}
