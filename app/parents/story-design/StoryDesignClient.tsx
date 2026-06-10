"use client";

/**
 * /parents/story-design — 아이비리그 스토리 설계 (자기주도 캠프).
 *
 * Content from the 합격 수기 book 《내가 아이비리그 공대에 오기까지》: spike
 * discovery, story branding (10 activities = 1 story), Common App essay
 * structure, research start, grade-by-grade roadmap. White portal styling.
 */

import Link from "next/link";

const GREEN = "#00b85f";
const PURPLE = "#7c3aed";
const KAKAO_CHAT = "http://pf.kakao.com/_ZchdX/chat";

// 설계 5단계 (자기주도)
const PHASES = [
  { n: 1, emoji: "🔍", title: "스파이크 발굴", desc: "성적 너머의 진짜 관심·강점을 찾아 ‘이 학생만의 각도’를 잡는다. 스파이크 없는 학생은 없다 — 못 찾은 것뿐." },
  { n: 2, emoji: "🧬", title: "전공 서사 연결", desc: "흩어진 점(활동·관심)을 한 줄 서사로 연결. ‘수학·공학으로 세상의 문제를 직접 해결하는 사람’처럼." },
  { n: 3, emoji: "🏆", title: "활동·리서치 설계", desc: "서사를 증명할 활동을 직접 기획·실행. 만들어진 스펙이 아니라, 완결된 프로젝트가 증거다." },
  { n: 4, emoji: "✍️", title: "에세이 축 잡기", desc: "공통원서로 이어질 핵심 모먼트·메시지를 미리 설계. 구조가 잡히면 문장은 따라온다." },
  { n: 5, emoji: "🗺️", title: "학년별 실행 로드맵", desc: "9~12학년, ‘언제 무엇을’ 직접 실행할지 — 끝까지 혼자 갈 수 있는 지도를 그린다." },
];

// 스파이크 발굴 — 핵심 질문(책 20문항 중 발췌)
const SPIKE_Q = [
  "주말에 아무도 시키지 않아도 하는 것은?",
  "유튜브·책에서 반복적으로 찾아보는 주제는?",
  "‘왜 아직 해결이 안 됐지?’라는 생각이 드는 문제는?",
  "시간 가는 줄 모르고 빠져든 경험은?",
  "교과서가 부족해 혼자 더 찾아본 주제는?",
  "내가 만든 것·고친 것·개선한 것은?",
  "전혀 다른 두 가지가 같은 원리로 작동한다고 느낀 적은?",
  "10년 뒤 어떤 문제를 푸는 사람이 되고 싶은가?",
];

// 평범한 경험을 특별하게 — 5단계 구조
const SPIKE_STRUCTURE = ["관찰", "질문", "탐구", "발견", "적용"];

// 스토리 연결 3질문
const STORY_Q = [
  "시키지 않아도 ‘혼자’ 한 것은 무엇인가?",
  "시간 가는 줄 모르고 ‘빠져든’ 것은 무엇인가?",
  "이것들 중 ‘서로 연결되는’ 것이 있는가?",
];

// Common App 에세이 구조 (650자)
const ESSAY_STRUCT = [
  { part: "도입 (~100자)", desc: "구체적 장면으로 시작 — 독자를 그 순간으로 데려간다." },
  { part: "전개 (~200자)", desc: "그 상황에서 내가 어떻게 행동했는가. Show, don’t tell." },
  { part: "전환 (~150자)", desc: "생각이 바뀌거나 발견·결심이 생기는 순간 — 에세이의 핵심." },
  { part: "통찰 (~200자)", desc: "이 경험이 나/전공/미래와 어떻게 연결되는가. 진실하면 된다." },
];

// 학년별 로드맵
const ROADMAP = [
  ["9학년", "전부의 시작 — GPA 습관과 관심 탐색의 토대를 만든다"],
  ["10학년", "스파이크를 설계하는 해 — 관심을 프로젝트·활동으로 구체화"],
  ["11학년", "모든 게 결정되는 해 — AP·SAT·리서치·추천서 관계가 집중되는 시기"],
  ["12학년", "클로징의 기술 — 에세이로 흩어진 점을 하나의 서사로 닫는다"],
];

function Card({ children }: { children: React.ReactNode }) {
  return <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "26px 26px", margin: "20px 0" }}>{children}</section>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 6px" }}>{children}</h2>;
}
function Sub({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 16px", lineHeight: 1.6 }}>{children}</p>;
}

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
          <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.72)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto" }}>
            컨설팅이 짜주는 입시가 아니라, 학생이 스스로 자기 서사를 설계하는 심화 캠프.
            합격 수기 《내가 아이비리그 공대에 오기까지》의 실제 방법을 단계별로 옮겼습니다.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 26 }}>
            <a href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FEE500", color: "#191600", textDecoration: "none", borderRadius: 12, padding: "14px 26px", fontSize: 15, fontWeight: 800 }}>
              💬 캠프 상담 신청
            </a>
            <Link href="/parents/story"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.5)", borderRadius: 12, padding: "14px 24px", fontSize: 15, fontWeight: 700 }}>
              합격 수기 보기 →
            </Link>
          </div>
        </section>

        {/* Why design */}
        <Card>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: PURPLE, letterSpacing: "0.04em", marginBottom: 10 }}>왜 ‘설계’인가</div>
          <p style={{ fontSize: 15, color: "#334155", lineHeight: 1.9, margin: 0 }}>
            아이비리그 합격생의 공통점은 ‘남이 만들어준 스펙’이 아니라 <strong>자기만의 서사</strong>였어요.
            입학사정관은 활동 10개를 따로 보지 않습니다 — <strong>10개가 하나의 이야기</strong>를 말하는지를 봅니다.
            이 캠프는 정답을 떠먹여 주지 않고, 학생이 자기 강점에서 출발해 서사를 잡고
            그걸 증명할 활동·에세이를 <strong>직접 설계·실행</strong>하도록 함께합니다.
          </p>
        </Card>

        {/* Phases */}
        <Card>
          <H2>🛠️ 설계 5단계</H2>
          <Sub>각 단계는 학생이 직접 만들어내는 결과물로 끝납니다.</Sub>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PHASES.map((p) => (
              <div key={p.n} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 10, background: PURPLE, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800 }}>{p.n}</div>
                <div>
                  <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 3 }}>{p.emoji} {p.title}</div>
                  <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Spike discovery */}
        <Card>
          <H2>🔍 스파이크 발굴 질문</H2>
          <Sub>“평범한 경험을 특별하게 만드는 건 경험 자체가 아니라 바라보는 방식.” 빠르게 답하지 말고 충분히 생각하며 답해보세요.</Sub>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))", gap: 8 }}>
            {SPIKE_Q.map((q, i) => (
              <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: "#f7f8fa", borderRadius: 10, padding: "11px 13px" }}>
                <span style={{ flexShrink: 0, fontSize: 12, fontWeight: 800, color: PURPLE }}>Q{i + 1}</span>
                <span style={{ fontSize: 13, color: "#334155", lineHeight: 1.55 }}>{q}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: "#1a1a1f", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {SPIKE_STRUCTURE.map((s, i) => (
              <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#a78bfa" }}>{s}</span>
                {i < SPIKE_STRUCTURE.length - 1 && <span style={{ color: "#64748b" }}>→</span>}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", margin: "8px 0 0" }}>이 구조로 어떤 경험도 강한 이야기가 된다.</p>
        </Card>

        {/* Story branding */}
        <Card>
          <H2>🧬 스토리 브랜딩 — 만드는 게 아니라 연결하는 것</H2>
          <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.85, margin: "0 0 14px" }}>
            없는 경험을 지어내는 게 아니라, <b>이미 있는 점들을 연결</b>해 한 줄로 만든다. 지금까지 한 것을 전부 적고, 세 가지를 묻는다.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {STORY_Q.map((q, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 10, padding: "11px 13px" }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, background: PURPLE, color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.6 }}>{q}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: "#94a3b8", margin: "12px 0 0" }}>“연결되기 전엔 흩어진 점, 연결되고 나면 하나의 선이 된다.”</p>
        </Card>

        {/* Essay structure */}
        <Card>
          <H2>✍️ Common App 에세이 구조 (650자)</H2>
          <Sub>“좋은 에세이는 좋은 문장이 아니라 좋은 구조에서 나온다.” 첫 문장은 장면·질문·예상 밖 진술 중 하나로.</Sub>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ESSAY_STRUCT.map((e) => (
              <div key={e.part} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid #f1f3f5" }}>
                <span style={{ flexShrink: 0, minWidth: 96, fontSize: 12.5, fontWeight: 800, color: PURPLE }}>{e.part}</span>
                <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.6 }}>{e.desc}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: PURPLE, marginBottom: 4 }}>핵심 원칙 — Show, don’t tell</div>
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: 0 }}>
              ‘저는 끈기 있는 사람입니다’(말하기) ✗ → ‘300번째 실험 노트를 닫으며 301번째 가설을 적기 시작했다’(보여주기) ✓.
              형용사(amazing·passionate)는 지우고, 그걸 보여주는 장면으로 바꾼다.
            </p>
          </div>
        </Card>

        {/* Roadmap */}
        <Card>
          <H2>🗺️ 학년별 로드맵</H2>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {ROADMAP.map(([g, d]) => (
              <div key={g} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid #f5f6f8" }}>
                <span style={{ flexShrink: 0, minWidth: 64, fontSize: 13.5, fontWeight: 800, color: "#1a1a1f" }}>{g}</span>
                <span style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55 }}>{d}</span>
              </div>
            ))}
          </div>
          <Link href="/parents/roadmap" style={{ display: "inline-block", marginTop: 14, color: GREEN, fontWeight: 800, fontSize: 13.5, textDecoration: "none" }}>
            학년별 로드맵 자세히 →
          </Link>
        </Card>

        {/* CTA */}
        <Card>
          <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.8, margin: "0 0 16px", textAlign: "center" }}>
            스파이크 발굴부터 에세이 축까지, 우리 아이의 스토리를 함께 설계합니다.
          </p>
          <a href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", textAlign: "center", background: "#1a1a1f", color: "#fff", textDecoration: "none", borderRadius: 10, padding: "15px", fontSize: 15, fontWeight: 800 }}>
            🧭 우리 아이 스토리 설계 상담받기 →
          </a>
        </Card>
      </div>
    </div>
  );
}
