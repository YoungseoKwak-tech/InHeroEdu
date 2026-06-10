"use client";

/**
 * /parents/study-method — 자기주도 공부법.
 *
 * Content excerpted/condensed from the 합격 수기 book 《내가 아이비리그 공대에
 * 오기까지》 (AI-era self-study loop, 단권화 교재, 시험 전날 루틴, 오답 분석,
 * Cornell ECE 하루 루틴 + 핵심 원칙). White portal styling.
 */

import Link from "next/link";

const GREEN = "#00b85f";
const BLUE = "#2563eb";
const KAKAO_CHAT = "http://pf.kakao.com/_ZchdX/chat";

// 핵심 원칙 (부록 G)
const PRINCIPLES = [
  { emoji: "📅", title: "매일 > 가끔 몰아서", desc: "매일 하는 것이 가끔 많이 하는 것보다 강하다. 꾸준함이 밤샘을 이긴다." },
  { emoji: "⚡", title: "어려운 건 에너지 높을 때", desc: "가장 어려운 과제·공부를 하루 중 에너지가 가장 높은 시간에 배치한다." },
  { emoji: "🎯", title: "한 블록에 하나만", desc: "멀티태스킹은 없다. 한 시간 블록엔 한 가지에만 집중한다." },
  { emoji: "🧪", title: "공부 ≠ 연구/프로젝트", desc: "수업 공부 시간과 리서치·프로젝트 시간을 분리한다. 섞으면 둘 다 흐려진다." },
  { emoji: "😴", title: "수면은 협상 대상 아님", desc: "최소 7시간. 밤새운 시험은 실력의 80%, 충분히 잔 시험은 100~110%." },
];

// AI 시대 자기주도학습 루틴 — 3단계
const AI_LOOP = [
  { step: "1단계 · 10~15분", title: "혼자 먼저", desc: "AI 없이 혼자 씨름한다. 무엇을 모르는지, 어디서 막히는지를 명확히 만든다." },
  { step: "2단계", title: "답이 아닌 피드백 요청", desc: "AI에 답을 묻지 않는다. ‘이 접근이 맞나’ ‘논리에 허점은’ ‘놓친 건’ 같은 피드백만 요청." },
  { step: "3단계", title: "내가 직접 해결", desc: "AI가 가리킨 방향을 보고, 다시 내 방식으로 푼다. 따라가는 게 아니라 내가 푼다." },
];

// 단권화 자체 교재 — 5구조
const NOTE_STRUCT = [
  "핵심 개념 목록 — 이 단원에서 반드시 알아야 할 개념 5~10개",
  "개념 설명 — 교재 문장 그대로가 아니라 ‘내 말’로 설명",
  "연결 관계 — 이 개념이 다른 개념과 어떻게 이어지는가",
  "자주 나오는 문제 유형 — 시험에서 어떻게 출제되는가",
  "오답 노트 — 내가 틀린 문제와 ‘왜’ 틀렸는지",
];

// 시험 전날 루틴
const EXAM_ROUTINE = [
  { when: "시험 2~3일 전", what: "전체 범위 한 번 훑기 · 약한 부분 집중 보완" },
  { when: "전날 낮", what: "핵심 공식/개념 정리본 만들기 (2시간 이내)" },
  { when: "전날 저녁", what: "가벼운 복습 1시간 이내 · 새 내용 절대 안 봄" },
  { when: "전날 밤", what: "10~11시 취침 · 최소 7~8시간 수면" },
  { when: "당일 아침", what: "정리본 30분 복습 · 아침 식사 필수" },
  { when: "입장 전", what: "핵심 공식만 마지막 확인 · 새 내용 X" },
];

// Cornell ECE 하루 루틴 (수업 있는 날)
const DAY_ROUTINE = [
  ["06:30", "기상 · 물 한 잔 · 오늘 할 것 목록 (5분)"],
  ["07:00", "아침 식사 · 전날 공부 간단 복습 (플래시카드/정리본)"],
  ["08:00", "첫 번째 수업 블록"],
  ["13:00", "두 번째 수업 또는 자습 블록"],
  ["15:00", "가장 어려운 과제/공부 — 에너지 있을 때"],
  ["17:00", "운동/산책 30분 · 뇌 환기"],
  ["19:00", "연구/프로젝트 블록 (수업 과제와 분리)"],
  ["21:00", "내일 수업 예습 · 막히는 부분 표시"],
  ["23:00", "취침"],
];

const TOOLS = [
  { emoji: "📝", label: "AP 문제은행", route: "/parents/question-bank", note: "오답 분석·약점 점검" },
  { emoji: "📘", label: "AP 개념정리", route: "/parents/core-notes", note: "단권화 노트의 출발점" },
  { emoji: "📒", label: "단어장", route: "/parents/vocab", note: "간격 반복 암기" },
  { emoji: "✏️", label: "SAT 모의고사", route: "/parents/sat", note: "시간 압박 실전 연습" },
];

function Card({ children }: { children: React.ReactNode }) {
  return <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "26px 26px", margin: "20px 0" }}>{children}</section>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 14px" }}>{children}</h2>;
}

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
          <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.72)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            합격 수기 《내가 아이비리그 공대에 오기까지》에서 발췌·정리한 자기주도 공부 시스템 —
            루틴·복습·단권화·시험 전략을 학생이 스스로 굴립니다.
          </p>
        </section>

        {/* 핵심 원칙 */}
        <Card>
          <H2>🧠 핵심 원칙 5</H2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#f5f8fd", border: "1px solid #e3ebf6", borderRadius: 12, padding: "15px 16px" }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: BLUE, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 800 }}>{i + 1}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 3 }}>{p.emoji} {p.title}</div>
                  <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI 시대 루틴 3단계 */}
        <Card>
          <H2>🤖 AI 시대 자기주도학습 루틴 — 3단계</H2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "-8px 0 16px" }}>“AI가 SAT 만점을 받는 시대. 답을 베끼면 사고력이 죽는다.” — 답이 아니라 피드백만 쓴다.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {AI_LOOP.map((s) => (
              <div key={s.step} style={{ background: "#eef2ff", border: "1px solid #e0e7ff", borderRadius: 12, padding: "15px 16px" }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: "#4338ca", marginBottom: 5 }}>{s.step}</div>
                <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* 단권화 교재 */}
        <Card>
          <H2>📓 단권화 — 자체 교재 만드는 법</H2>
          <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.8, margin: "-6px 0 14px" }}>
            “요약해서 쓰는 과정 자체가 학습이다. 글로 쓰려면 완전히 이해해야 하니까.” 단원마다 이 5구조로 한 권을 만든다.
          </p>
          <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {NOTE_STRUCT.map((s, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#f7f8fa", borderRadius: 10, padding: "11px 13px" }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, background: "#1a1a1f", color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.6 }}>{s}</span>
              </li>
            ))}
          </ol>
        </Card>

        {/* 오답 분석 */}
        <Card>
          <H2>🔎 오답 ‘복습’이 아니라 ‘분석’</H2>
          <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.85, margin: 0 }}>
            틀린 문제를 다시 풀어서 맞으면 넘어가는 건 <b>오답 복습</b>일 뿐, 분석이 아니다.
            분석은 세 가지를 묻는다 — <b>① 왜 처음에 틀렸나 ② 어떤 사고 과정이 잘못됐나 ③ 같은 유형에서 또 틀릴 가능성이 있나.</b>
            이걸 적어두는 게 진짜 오답 노트다.
          </p>
        </Card>

        {/* 시험 전날 루틴 */}
        <Card>
          <H2>🌙 시험 전날 루틴 (밤새우지 않는다)</H2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {EXAM_ROUTINE.map((r) => (
              <div key={r.when} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "9px 0", borderBottom: "1px solid #f1f3f5" }}>
                <span style={{ flexShrink: 0, minWidth: 96, fontSize: 12.5, fontWeight: 800, color: BLUE }}>{r.when}</span>
                <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.55 }}>{r.what}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: "#94a3b8", marginTop: 12, marginBottom: 0 }}>“밤새운 시험은 실력의 80%, 충분히 잔 시험은 100~110%가 나온다.”</p>
        </Card>

        {/* 하루 루틴 */}
        <Card>
          <H2>⏱️ Cornell ECE 하루 루틴 (수업 있는 날)</H2>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {DAY_ROUTINE.map(([t, w]) => (
              <div key={t} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "7px 0", borderBottom: "1px solid #f5f6f8" }}>
                <span style={{ flexShrink: 0, minWidth: 56, fontSize: 13, fontWeight: 800, color: "#1a1a1f", fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                <span style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.5 }}>{w}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 도구 */}
        <Card>
          <H2>🧰 이 공부법을 굴리는 도구</H2>
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
          <Link href="/parents/story" style={{ display: "block", textAlign: "center", marginTop: 20, color: BLUE, fontWeight: 800, fontSize: 14, textDecoration: "none" }}>
            📖 더 깊은 내용은 합격 수기 책에서 →
          </Link>
          <a href={KAKAO_CHAT} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", textAlign: "center", marginTop: 12, background: "#1a1a1f", color: "#fff", textDecoration: "none", borderRadius: 10, padding: "15px", fontSize: 15, fontWeight: 800 }}>
            🧭 우리 아이 공부법 상담받기 →
          </a>
        </Card>
      </div>
    </div>
  );
}
