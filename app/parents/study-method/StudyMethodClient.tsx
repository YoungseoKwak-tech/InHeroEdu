"use client";

/**
 * /parents/study-method — 자기주도 공부법.
 *
 * Weaves world-famous, evidence-based study methods (Feynman, Pomodoro,
 * spaced repetition, active recall, deep work, sleep science, eat-the-frog…)
 * with how the 합격 수기 author actually applied each one, self-directed, in
 * 《내가 아이비리그 공대에 오기까지》. White portal styling.
 */

import Link from "next/link";
import ReviewsStrip from "@/components/parents/ReviewsStrip";

const GREEN = "#00b85f";
const BLUE = "#2563eb";
const PURPLE = "#7c3aed";
const KAKAO_CHAT = "http://pf.kakao.com/_ZchdX/chat";

// InHero 기능으로 그대로 실천하는 자기주도 루틴 — 단계마다 해당 기능으로 라우팅
const ROUTINE: { n: number; emoji: string; title: string; desc: string; ctas: { label: string; href: string; color: string }[] }[] = [
  {
    n: 1, emoji: "🔤", title: "단어가 기본이다",
    desc: "모든 독해와 개념의 토대는 어휘예요. 과목별 필수 용어를 매일 조금씩 — 한국어 뜻을 보고 영어 단어를 떠올리는 '인출 연습'으로.",
    ctas: [{ label: "단어장 시작하기 →", href: "/parents/vocab", color: GREEN }],
  },
  {
    n: 2, emoji: "🇰🇷", title: "한국어로 개념을 먼저 잡는다",
    desc: "낯선 개념을 영어로 바로 파면 두 배로 힘들어요. 모국어로 '큰 흐름'부터 잡아 이해의 뼈대를 세웁니다.",
    ctas: [{ label: "AP 개념정리 (한국어)", href: "/parents/core-notes", color: PURPLE }],
  },
  {
    n: 3, emoji: "🌐", title: "영어로 정리해 굳힌다",
    desc: "흐름을 잡았으면 같은 개념을 영어 원문으로 다시 — 영어+한국어 스플릿뷰로 시험에서 쓰는 영어 표현까지 내 것으로 만듭니다.",
    ctas: [{ label: "개념정리 영어+한국어 보기", href: "/parents/core-notes", color: BLUE }],
  },
  {
    n: 4, emoji: "📝", title: "문제를 풀고 해설을 꼼꼼히 본다",
    desc: "맞은 문제도 '왜 맞았는지', 틀린 문제는 '왜 틀렸는지'까지. 한국어 해설로 틀린 이유를 끝까지 파고듭니다.",
    ctas: [
      { label: "AP 문제은행", href: "/parents/question-bank", color: GREEN },
      { label: "SAT 모의고사·해설", href: "/parents/sat", color: BLUE },
    ],
  },
  {
    n: 5, emoji: "📒", title: "단권화 — 한 권으로 모은다",
    desc: "개념·용어·오답·해설을 흩어두지 말고 '내 한 권'으로 단권화하세요. 시험 직전엔 이 한 권만 봅니다.",
    ctas: [
      { label: "개념정리로 단권화", href: "/parents/core-notes", color: PURPLE },
      { label: "단어장 오답노트", href: "/parents/vocab", color: GREEN },
    ],
  },
];

// 세계적 공부법 × 책의 자기주도 실전
const WOVEN = [
  {
    method: "파인만 테크닉",
    who: "Richard Feynman · 노벨물리학상",
    idea: "“쉽게 설명하지 못하면 제대로 아는 게 아니다.” 개념을 초등학생도 알 만큼 내 말로 풀어쓴다.",
    book: "단권화 자체 교재 — 교재 문장 그대로가 아니라 ‘내 말로’ 설명. 핵심개념→내 설명→연결관계→빈출유형→오답노트 5구조로 단원마다 한 권.",
  },
  {
    method: "액티브 리콜 (인출 연습)",
    who: "인지심리학 · 가장 입증된 학습법",
    idea: "다시 읽기(re-read)보다, 안 보고 떠올리기(retrieval)가 기억을 훨씬 강하게 만든다.",
    book: "‘혼자 먼저’ 원칙 — 막혀도 10~15분은 안 보고 씨름. 무엇을 모르는지가 드러난 뒤에야 자료/AI를 본다.",
  },
  {
    method: "간격 반복 (Spaced Repetition)",
    who: "Ebbinghaus 망각곡선",
    idea: "잊을 만할 때 다시 보면 장기기억에 새겨진다. 한 번에 몰아서가 아니라 간격을 두고.",
    book: "“매일 하는 것이 가끔 많이 하는 것보다 강하다.” 아침마다 전날 공부를 플래시카드/정리본으로 짧게 복습.",
  },
  {
    method: "포모도로 + 싱글태스킹",
    who: "Francesco Cirillo",
    idea: "25분 집중 / 5분 휴식. 한 번에 한 가지만. 멀티태스킹은 환상이다.",
    book: "“한 블록에 하나만.” 수업·과제·연구를 시간 블록으로 쪼개 각 블록엔 한 가지에만 몰입.",
  },
  {
    method: "딥 워크 · 타임블로킹",
    who: "Cal Newport",
    idea: "방해 없는 깊은 몰입 시간을 하루에 ‘블록’으로 확보하는 것이 성과를 만든다.",
    book: "블록 스케줄링 — ‘월 오전 수업 / 월 오후 연구’처럼. 공부 시간과 연구·프로젝트 시간을 분리.",
  },
  {
    method: "Eat the Frog",
    who: "Brian Tracy · Mark Twain",
    idea: "가장 하기 싫고 어려운 일을 하루 중 가장 먼저(에너지 높을 때) 해치운다.",
    book: "“가장 어려운 과제/공부는 에너지가 가장 높은 시간(오후 3시쯤)에.” 미루지 않는 구조로 배치.",
  },
  {
    method: "수면이 성적이다",
    who: "Matthew Walker · 《Why We Sleep》",
    idea: "수면 부족은 기억 고착·집중을 무너뜨린다. 잠은 학습의 일부다.",
    book: "시험 전날 밤샘 금지 — 전날 10~11시 취침, 최소 7~8시간. “밤새운 시험은 실력의 80%, 충분히 잔 시험은 100~110%.”",
  },
  {
    method: "시각적 직관 먼저",
    who: "3Blue1Brown",
    idea: "공식 암기 전에 ‘이게 무엇을 하는가’를 그림·직관으로 이해하면 응용이 풀린다.",
    book: "선형대수는 계산이 아니라 직관 먼저(‘행렬이 뭘 하는가’를 이미지로). 공식만 외우면 응용 문제에서 완전히 막힌다.",
  },
  {
    method: "코넬 노트법",
    who: "Cornell University",
    idea: "한 장을 단서(cue)·노트·요약 3칸으로 나눠 적고, 요약 칸으로 스스로 인출 테스트.",
    book: "시험 전날 ‘핵심 공식/개념 정리본’ — 전체 교재가 아니라 이 한 장만 빠르게 돌려 본다.",
  },
  {
    method: "인터리빙 (섞어 풀기)",
    who: "인지과학 (Rohrer·Bjork)",
    idea: "한 유형만 몰아 풀기보다, 여러 유형을 섞어 풀면 ‘언제 무엇을 쓰는지’ 판단력이 는다.",
    book: "AMC ‘한 문제, 두 가지 풀이’ — 같은 문제를 다른 방법으로 다시 풀어 사고를 넓힌다.",
  },
  {
    method: "기억궁전 (장소법)",
    who: "고대 그리스 · 기억력 챔피언",
    idea: "익숙한 공간에 정보를 배치해 떠올리는 암기법 — 순수 암기가 꼭 필요할 때 강력.",
    book: "단, 책의 원칙은 ‘이해 > 암기’. 외운 건 시험 끝나면 사라지고, 이해한 건 대학까지 연결된다 — 암기법은 이해 위에서만.",
  },
];

const EXAM_ROUTINE = [
  ["시험 2~3일 전", "전체 범위 한 번 훑기 · 약한 부분 집중 보완"],
  ["전날 낮", "핵심 공식/개념 정리본 만들기 (2시간 이내)"],
  ["전날 저녁", "가벼운 복습 1시간 이내 · 새 내용 절대 안 봄"],
  ["전날 밤", "10~11시 취침 · 최소 7~8시간 수면"],
  ["당일 아침", "정리본 30분 복습 · 아침 식사 필수"],
  ["입장 전", "핵심 공식만 마지막 확인 · 새 내용 X"],
];

const DAY_ROUTINE = [
  ["06:30", "기상 · 물 한 잔 · 오늘 할 것 목록 (5분)"],
  ["07:00", "아침 식사 · 전날 공부 간단 복습 (플래시카드/정리본)"],
  ["08:00", "첫 수업 블록"],
  ["15:00", "가장 어려운 과제/공부 — 에너지 있을 때"],
  ["17:00", "운동/산책 30분 · 뇌 환기"],
  ["19:00", "연구/프로젝트 블록 (수업 과제와 분리)"],
  ["21:00", "내일 수업 예습 · 막히는 부분 표시"],
  ["23:00", "취침"],
];

const SAT_MATH = [
  "문제 읽으며 핵심 조건에 밑줄, 질문(what is X)에 동그라미, 단위 확인(feet vs meters)",
  "계산은 전부 종이에 — 머릿속 암산 금지. 답 구한 뒤 ‘질문이 뭐였는지’ 다시 확인",
  "한 문제 3분 넘기지 않기 — 막히면 표시하고 넘어가, 쉬운 것부터",
];
const SAT_READ = [
  "정답은 반드시 텍스트 안에 있다 — 배경지식·추론으로 메우면 함정에 걸린다",
  "고를 때마다 근거 문장에 밑줄 — 밑줄 못 그으면 그 답은 틀린 것",
  "‘always·never·completely’ 같은 극단적 표현 선택지는 거의 오답",
];

const TOOLS = [
  { emoji: "📝", label: "AP 문제은행", route: "/parents/question-bank", note: "오답 분석·약점 점검" },
  { emoji: "📘", label: "AP 개념정리", route: "/parents/core-notes", note: "단권화 노트의 출발점" },
  { emoji: "📒", label: "단어장", route: "/parents/vocab", note: "간격 반복 암기" },
  { emoji: "✏️", label: "SAT 모의고사", route: "/parents/sat", note: "시간 압박 실전 연습" },
];

// 학년별 공부 전략
const GRADE_PLAN = [
  { g: "9학년", tag: "토대", items: ["GPA는 첫 학기부터 — 한 번 무너지면 회복이 가장 어렵다", "단권화 자체 교재 ‘만드는 연습’ 시작 (작게)", "관심 분야 탐색 — 스파이크의 씨앗 찾기", "공부 루틴·수면 습관 정착 (밤샘 금지부터)"] },
  { g: "10학년", tag: "설계", items: ["전공 관련 AP 1~2개 도전 → 5점 목표", "관심을 ‘프로젝트’로 — 독립 리서치/제작 시작", "SAT 진단 1회 + 단어 간격반복 시작", "수학 강하면 AMC 도전 (AoPS·기출)"] },
  { g: "11학년", tag: "결정", items: ["전공 관련 AP 집중 — 반드시 5점", "SAT 본격 — 12주 계획(진단→약점→실전→시간단축)", "추천서 선생님 관계 강화 (학기 초부터)", "리서치 확장 + 발표/대회로 완결"] },
  { g: "12학년", tag: "클로징", items: ["남은 AP 마무리, 성적 안정", "에세이 클로징 — 흩어진 점을 하나의 서사로", "보충(Why) 에세이 학교별 맞춤", "추천서·원서 일정 관리"] },
];

// 과목별 공부법 — 과목마다 ‘틀리는 이유’가 다르다
const SUBJECT_PLAN = [
  {
    emoji: "📘", name: "AP 공통 원칙", color: "#2563eb",
    items: ["단권화 5구조로 단원마다 한 권: 핵심개념→내 말 설명→연결관계→빈출유형→오답노트", "전공 관련 AP는 반드시 5점, 관련 낮으면 4점이면 충분 — 개수 아닌 ‘선택과 결과’", "학교에 과목/시험이 없으면 커뮤니티컬리지·독학으로 길을 만든다", "College Board CED(학습목표)를 기준으로 — 시험은 그 목표대로 낸다"],
  },
  {
    emoji: "🧬", name: "AP Biology", color: "#1D9E75",
    items: ["암기 과목 같지만 핵심은 ‘과정의 흐름’ — 단권화로 process를 흐름도(diagram)로 그린다", "단원을 따로 외우지 말고 연결: 에너지(호흡·광합성)→정보(유전·발현)→상호작용(생태)", "FRQ는 실험 설계·그래프 해석·데이터 근거 — ‘왜 그런가’를 글로 쓰는 연습", "용어는 영어+한국어 병기, 헷갈리는 짝개념(유사분열 vs 감수분열 등)은 표로 비교"],
  },
  {
    emoji: "⚗️", name: "AP Chemistry", color: "#BA7517",
    items: ["개념과 계산이 동시 — 몰·단위 계산은 매일 소량, 반드시 종이에", "‘왜 이 반응이 일어나는가’(에너지·엔트로피)를 이해하면 평형·산염기가 한 번에 풀린다", "입자 그림(particulate)·그래프 해석 비중이 큼 — 그림으로 설명하는 연습", "빈출: 평형(Le Chatelier)·산염기·열화학·반응속도 — 오답노트로 약한 단원 집중"],
  },
  {
    emoji: "∫", name: "AP Calculus (AB · BC)", color: "#534AB7",
    items: ["공식 암기 ✗ — 극한·도함수(변화율)·적분(누적)의 ‘뜻’부터 이해", "그래프 ↔ 수식 ↔ 표 3중 표현을 자유롭게 오가는 연습 (FRQ 단골)", "계산기/비계산기 섹션 따로 훈련 · FRQ는 과정 다 써서 부분점수 확보", "BC = AB + 급수·매개변수·극좌표 — 수렴 판정법은 표로 정리"],
  },
  {
    emoji: "🔢", name: "SAT 수학 (800 루틴)", color: "#0f6e56",
    items: ["문제 읽으며 핵심 조건 밑줄 · 질문(what is X) 동그라미 · 단위 확인", "암산 금지 — 계산은 전부 종이에. 답 구한 뒤 ‘질문이 뭐였나’ 재확인", "한 문제 3분 룰 — 막히면 표시하고 넘어가, 쉬운 것부터", "틀리는 건 대개 개념 부족이 아니라 ‘잘못 읽기/계산 실수’"],
  },
  {
    emoji: "📖", name: "SAT 독해 (근거 추적)", color: "#854f0b",
    items: ["정답은 반드시 텍스트 안에 — 배경지식·추론으로 메우면 함정", "고를 때마다 근거 문장 밑줄, 못 그으면 그 답은 틀린 것", "‘always·never·completely’ 극단 표현 선택지는 거의 오답", "문제 먼저 읽고 해당 부분만 정확히 — 전체 정독은 비효율"],
  },
  {
    emoji: "📐", name: "수학 · AMC", color: "#7c3aed",
    items: ["이해 > 암기 — 외운 건 시험 끝나면 사라지고, 이해한 건 연결된다", "AMC: AoPS 교재 + 최근 5년 기출(처음엔 시간無, 나중 75분)", "한 문제, 두 가지 풀이 — 다른 방법으로 다시 풀어 사고 확장", "AMC 준비하면 SAT 수학은 자연히 오른다 (역은 성립 안 함)"],
  },
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
function Timeline({ rows, accent = BLUE }: { rows: string[][]; accent?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {rows.map(([a, b]) => (
        <div key={a} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid #f5f6f8" }}>
          <span style={{ flexShrink: 0, minWidth: 92, fontSize: 12.5, fontWeight: 800, color: accent }}>{a}</span>
          <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.55 }}>{b}</span>
        </div>
      ))}
    </div>
  );
}

export default function StudyMethodClient() {
  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: GREEN }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 100px" }}>
        {/* Hero */}
        <section style={{ background: "linear-gradient(160deg,#0a1430,#10295e 55%,#1e3a8a)", borderRadius: "0 0 22px 22px", padding: "46px 32px 42px", textAlign: "center", boxShadow: "0 16px 40px rgba(10,20,50,0.28)" }}>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#bfdbfe", background: "rgba(191,219,254,0.14)", borderRadius: 7, padding: "4px 12px", letterSpacing: "0.04em" }}>🧠 자기주도 공부법</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.9rem,5vw,2.7rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.18, margin: "18px 0 14px" }}>
            세계적 공부법 <span style={{ color: "#93c5fd" }}>×</span> 아이비리그 자기주도 실전
          </h1>
          <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.72)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto" }}>
            <strong style={{ color: "#fff" }}>학년별·과목별</strong>로 정리한 자기주도 공부 전략 —
            합격 수기 《내가 아이비리그 공대에 오기까지》의 저자가 학원 없이 검증된 공부법을 어떻게 실전에 적용했는지 담았습니다.
          </p>
        </section>

        {/* InHero 기능으로 실천하는 자기주도 루틴 */}
        <Card>
          <H2>🧭 InHero로 실천하는 자기주도 루틴 5단계</H2>
          <Sub>공부법은 결국 ‘순서’예요. 단어 → 한국어 개념 → 영어 정리 → 해설 정독 → 단권화. 각 단계를 InHero 기능으로 그대로 실천하세요.</Sub>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ROUTINE.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: 14, alignItems: "flex-start", border: "1px solid #e6e8ec", borderRadius: 14, padding: "16px 18px", background: "#fff" }}>
                <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#0a1430,#1e3a8a)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 17 }}>{s.n}</div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 15.5, fontWeight: 850, letterSpacing: "-0.01em", marginBottom: 4 }}>{s.emoji} {s.title}</div>
                  <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, margin: "0 0 11px" }}>{s.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {s.ctas.map((c) => (
                      <Link key={c.href + c.label} href={c.href} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: c.color, color: "#fff", borderRadius: 9, padding: "8px 14px", fontSize: 12.5, fontWeight: 800, textDecoration: "none" }}>{c.label}</Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <ReviewsStrip />

        {/* 학년별 공부 전략 */}
        <Card>
          <H2>📅 학년별 공부 전략</H2>
          <Sub>같은 공부법도 학년마다 우선순위가 다르다. 우리 아이 학년부터 확인하세요.</Sub>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 12 }}>
            {GRADE_PLAN.map((gp) => (
              <div key={gp.g} style={{ background: "#f5f8fd", border: "1px solid #e3ebf6", borderRadius: 13, padding: "16px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 16, fontWeight: 900, color: "#1a1a1f" }}>{gp.g}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 800, color: "#fff", background: BLUE, borderRadius: 999, padding: "2px 9px" }}>{gp.tag}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                  {gp.items.map((it, i) => <li key={i} style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.6 }}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {/* 과목별 공부법 */}
        <Card>
          <H2>📚 과목별 공부법</H2>
          <Sub>과목마다 ‘틀리는 이유’가 다르다 — 과목별로 다르게 공략한다.</Sub>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SUBJECT_PLAN.map((s) => (
              <div key={s.name} style={{ border: "1px solid #e6e8ec", borderLeft: `4px solid ${s.color}`, borderRadius: 12, padding: "16px 18px", background: "#fff" }}>
                <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 8 }}>{s.emoji} {s.name}</div>
                <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                  {s.items.map((it, i) => <li key={i} style={{ fontSize: 13, color: "#334155", lineHeight: 1.6 }}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {/* WOVEN — famous method × book application (기본 원리) */}
        <Card>
          <H2>🌍 공부의 기본 원리 (검증된 공부법 × 책 실전)</H2>
          <Sub>학년·과목을 관통하는 토대. 왼쪽은 세계적으로 입증된 공부법, 아래 📖는 합격 수기 저자의 자기주도 적용.</Sub>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {WOVEN.map((w) => (
              <div key={w.method} style={{ background: "#f7f8fa", border: "1px solid #e6e8ec", borderRadius: 13, padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 800, color: "#1a1a1f" }}>{w.method}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: PURPLE, background: "#f3e8ff", borderRadius: 999, padding: "2px 9px" }}>{w.who}</span>
                </div>
                <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, margin: "0 0 8px" }}>{w.idea}</p>
                <p style={{ fontSize: 13.5, color: "#1e3a8a", lineHeight: 1.7, margin: 0, background: "#eef2ff", borderLeft: `3px solid ${BLUE}`, borderRadius: 8, padding: "9px 12px" }}>
                  <b>📖 책의 실전 ·</b> {w.book}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* 오답 분석 */}
        <Card>
          <H2>🔎 오답 ‘복습’이 아니라 ‘분석’</H2>
          <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.85, margin: 0 }}>
            틀린 문제를 다시 풀어 맞으면 넘어가는 건 <b>복습</b>일 뿐. 분석은 세 가지를 묻는다 —
            <b> ① 왜 처음에 틀렸나 ② 어떤 사고 과정이 잘못됐나 ③ 같은 유형에서 또 틀릴까.</b> 이걸 적는 게 진짜 오답 노트다.
          </p>
        </Card>

        {/* SAT */}
        <Card>
          <H2>📈 SAT — 열심히가 아니라 ‘올바르게’</H2>
          <Sub>40명 데이터에서 찾은 정체 원인: ①오답을 분석 아닌 복습만 함 ②수학·독해 따로 ③시간 제한 없이 연습. (수학 620·독해 510 → 780·720, 12주)</Sub>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 12 }}>
            <div style={{ background: "#f5f8fd", border: "1px solid #e3ebf6", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: BLUE, marginBottom: 8 }}>수학 800 루틴</div>
              <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                {SAT_MATH.map((t, i) => <li key={i} style={{ fontSize: 13, color: "#334155", lineHeight: 1.6 }}>{t}</li>)}
              </ul>
            </div>
            <div style={{ background: "#f5f8fd", border: "1px solid #e3ebf6", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: BLUE, marginBottom: 8 }}>독해 근거 추적</div>
              <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                {SAT_READ.map((t, i) => <li key={i} style={{ fontSize: 13, color: "#334155", lineHeight: 1.6 }}>{t}</li>)}
              </ul>
            </div>
          </div>
        </Card>

        {/* 시험 전날 루틴 */}
        <Card>
          <H2>🌙 시험 전날 루틴 (밤새우지 않는다)</H2>
          <Timeline rows={EXAM_ROUTINE} />
          <p style={{ fontSize: 12.5, color: "#94a3b8", marginTop: 12, marginBottom: 0 }}>“밤새운 시험은 실력의 80%, 충분히 잔 시험은 100~110%가 나온다.”</p>
        </Card>

        {/* 하루 루틴 */}
        <Card>
          <H2>⏱️ 하루 루틴 (Cornell ECE · 수업 있는 날)</H2>
          <Timeline rows={DAY_ROUTINE} accent="#1a1a1f" />
        </Card>

        {/* Office Hours / 자원 */}
        <Card>
          <H2>🙋 가장 저평가된 자원 — 질문과 Office Hours</H2>
          <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.85, margin: "0 0 10px" }}>
            “혼자 2시간 씨름하던 걸 Office Hours에서 20분에 푼다.” 선생님·교수에게 가는 건 시간 낭비가 아니라 가장 빠른 길이다.
            단, <b>‘잘 모르겠어요’는 질문이 아니다.</b>
          </p>
          <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            <li style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.6 }}>가기 전에 구체적 질문 1~3개 준비 (‘이 개념이 저 개념과 왜 연결되는지 모르겠습니다’)</li>
            <li style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.6 }}>내가 어디까지 이해했고 어디서 막혔는지 먼저 말하기</li>
            <li style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.6 }}>마무리에 추가 질문 하나 — “관련 자료/논문 있나요?”가 리서치 기회로 이어진다</li>
          </ul>
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
            📖 전체 맥락은 합격 수기 책에서 →
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
