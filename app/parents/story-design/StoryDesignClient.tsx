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

// 보충 에세이 — 아이비리그 학교별 핵심 특성
const IVY_WHY = [
  ["Harvard", "리더십·사회 기여 — 내 능력을 세상에 어떻게 쓸 것인가"],
  ["Yale", "지적 호기심·커뮤니티 — 학문 간 연결, 학교 문화 기여"],
  ["Princeton", "연구 중심·독립심 — 학부 연구 기회, 구체적 학문 목표"],
  ["Columbia", "도시와의 연결·다양성 — Core Curriculum, 뉴욕 환경"],
  ["Penn", "실용성·학제간 — Wharton 연계, 실질적 임팩트"],
  ["Dartmouth", "커뮤니티·전통 — 긴밀한 학교 문화, D-plan 유연성"],
  ["Brown", "자기주도·Open Curriculum — 내가 설계하는 교육"],
  ["Cornell", "실용 공학·다양성 — 분야 간 연결, 구체적 연구/산업 목표"],
];

// 리서치 주제 찾는 3가지 길
const RESEARCH_FIND = [
  { t: "Future Work에서", d: "관심 분야 최근 논문의 ‘Future Work’ 섹션 — 아직 안 풀린 것에서 주제가 나온다." },
  { t: "주변 문제에서", d: "학교·집·지역의 해결 안 된 문제를, 내 기술·지식으로 접근할 수 있는가." },
  { t: "두 분야 교차점", d: "공학×생물, 수학×경제처럼 두 분야가 만나는 곳에 탐구되지 않은 것이 많다." },
];

// 교수 컨택 이메일 3단락
const EMAIL_STRUCT = [
  ["1단락 (2~3문장)", "나는 누구·왜 연락했나 — 교수의 특정 논문을 읽었고, 내 관심사와 어떻게 연결되는지 한 문장."],
  ["2단락 (3~4문장)", "지금 하는 것과 막힌 것 — 내 프로젝트를 구체적으로, 진지하게 공부한 흔적이 보이게."],
  ["3단락 (1~2문장)", "구체적 요청 — ‘30분 미팅 가능한지’. 교수 시간을 최소로 요청해야 답장률이 오른다."],
];

// 고등학생 참가 가능 학술 대회
const COMPETITIONS = ["Intel ISEF", "Regeneron STS", "Siemens Competition", "JSHS", "NANO Korea", "과학 전람회"];

// 리더십을 숫자로 — 전환 질문
const LEADERSHIP_NUMQ = [
  "참여 전과 후, 무엇이 달라졌는가?",
  "내 기여로 몇 명이 영향을 받았는가?",
  "내가 만든 것의 규모는 어떻게 측정하나?",
  "이전 vs 현재 데이터로 성장이 보이는가?",
];

// 클럽 창설 5단계
const CLUB_STEPS = [
  "왜 이 클럽이 필요한가 정의 — 없던 이유 + 생기면 뭐가 달라지나",
  "학교 승인 — 신청서 + 담당 선생님 서명 (목적·활동계획·첫 미팅 날짜)",
  "첫 미팅 전 최소 5~10명 확보 — 한 명씩 직접 권유가 가장 효과적",
  "첫 미팅 제대로 — 목적·활동 계획·역할 분담. 첫 미팅이 기준을 만든다",
  "활동 기록 — 사진·참가자 수·결과. 나중에 입시의 증거가 된다",
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

        {/* Supplemental / Why essay */}
        <Card>
          <H2>🏫 보충 에세이 — Why Essay 전략</H2>
          <Sub>“Why Essay는 학교 설명이 아니다. 내가 왜 ‘거기서만’ 할 수 있는지다.” 구체성이 진지함의 증거. (학교 이름을 바꿔 끼울 수 없는 에세이여야 한다)</Sub>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
            {IVY_WHY.map(([s, d]) => (
              <div key={s} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "9px 0", borderBottom: "1px solid #f1f3f5" }}>
                <span style={{ flexShrink: 0, minWidth: 84, fontSize: 13, fontWeight: 800, color: PURPLE }}>{s}</span>
                <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.55 }}>{d}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: PURPLE, marginBottom: 4 }}>모든 에세이를 하나로 묶는 법</div>
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: 0 }}>
              쓰기 전에 한 문장을 적는다 — <b>“나는 ____하는 사람이다.”</b> 그 빈칸을 채우면, 모든 에세이가 그 한 문장을 서로 다른 방식으로 보여주게 쓴다.
              짧은 에세이는 <b>하나만, 구체적으로.</b>
            </p>
          </div>
        </Card>

        {/* Research */}
        <Card>
          <H2>🔬 리서치 들어가는 법</H2>
          <Sub>“독립 리서치는 규모가 아니라 구조의 문제.” 질문 → 방법 설계 → 실행 → 기록 → 다음 질문. 실험실이 없어도 인터넷 리서치·데이터 분석도 리서치다.</Sub>

          <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1a1f", margin: "4px 0 8px" }}>주제 찾는 3가지 길</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 10, marginBottom: 16 }}>
            {RESEARCH_FIND.map((r) => (
              <div key={r.t} style={{ background: "#f7f8fa", border: "1px solid #e6e8ec", borderRadius: 11, padding: "13px 14px" }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 4 }}>{r.t}</div>
                <p style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.6, margin: 0 }}>{r.d}</p>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1a1f", margin: "4px 0 8px" }}>교수 컨택 이메일 구조 (300~400단어)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
            {EMAIL_STRUCT.map(([a, b]) => (
              <div key={a} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid #f5f6f8" }}>
                <span style={{ flexShrink: 0, minWidth: 104, fontSize: 12.5, fontWeight: 800, color: PURPLE }}>{a}</span>
                <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.55 }}>{b}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.7, margin: "0 0 14px", background: "#eef2ff", borderRadius: 8, padding: "10px 12px" }}>
            연구실은 ‘교수가 받을 이유’가 있어야 한다 — <b>① 관련 사전 경험(완벽 안 해도 됨) ② 바로 쓸 기술 ③ 구체적 관심.</b>
            경험이 없으면 학교 학부연구 프로그램(URGE 등)이나 TA·Grader부터 관계를 만든다.
          </p>

          <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1a1f", marginBottom: 8 }}>발표로 완결 — 참가 가능 대회</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {COMPETITIONS.map((c) => (
              <span key={c} style={{ fontSize: 12, fontWeight: 700, color: "#1e3a8a", background: "#eef2ff", border: "1px solid #e0e7ff", borderRadius: 999, padding: "5px 12px" }}>{c}</span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#94a3b8", margin: "10px 0 0" }}>“발표가 완결을 만들고, 완결이 증거가 된다.”</p>
        </Card>

        {/* Leadership */}
        <Card>
          <H2>👑 리더십 만드는 법</H2>
          <Sub>“직책은 리더십이 아니다. 문제를 해결하는 것이 리더십. 그리고 없는 것을 만드는 게 가장 강한 리더십.” (멤버 → TEDx 대표 3년 — 직책은 문제를 풀다 보니 따라온 결과)</Sub>
          <div style={{ background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 10, padding: "13px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: PURPLE, marginBottom: 5 }}>리더십을 ‘숫자’로</div>
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: "0 0 8px" }}>
              ‘TEDx 대표’(말) ✗ → ‘TEDx 대표 · 인스타 도달률 <b>400%↑</b> · 스피커 지원 <b>1,000명</b> · 펀드 <b>300%↑</b>’(증거) ✓. 참여 전/후를 비교하면 거의 항상 숫자가 나온다.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px,1fr))", gap: 6 }}>
              {LEADERSHIP_NUMQ.map((q, i) => (
                <div key={i} style={{ fontSize: 12.5, color: "#5b21b6", lineHeight: 1.5 }}>· {q}</div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1a1f", marginBottom: 8 }}>클럽 창설 5단계 (0→1이 가장 강한 이야기)</div>
          <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {CLUB_STEPS.map((s, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#f7f8fa", borderRadius: 10, padding: "11px 13px" }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, background: PURPLE, color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <span style={{ fontSize: 13, color: "#334155", lineHeight: 1.6 }}>{s}</span>
              </li>
            ))}
          </ol>
        </Card>

        {/* Recommendation letters */}
        <Card>
          <H2>✉️ 추천서 전략 — 선생님을 자산으로</H2>
          <Sub>“이 학생은 수업을 잘 들었습니다”는 의미 없다. “이런 질문을 했고, 이렇게 생각하며, 이런 관점을 가졌다” 같은 <b>구체적·개인적</b> 추천서가 강하다. 그러려면 선생님이 나를 ‘개인’으로 알아야 한다.</Sub>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            <div style={{ background: "#f7f8fa", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 3 }}>관계 만드는 법</div>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.65, margin: 0 }}>수업 후 남아서 질문 — 단, <b>수업 내용을 넘어서는</b> 질문 (“오늘 이 개념이 ○○ 분야에도 적용되나요?”). 선생님은 ‘수업 이상을 생각하는 학생’을 기억한다.</p>
            </div>
            <div style={{ background: "#f7f8fa", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 3 }}>타이밍</div>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.65, margin: 0 }}>추천서 선생님은 <b>11학년 시작 전</b>에 이미 정해둔다 → 11학년 첫 학기부터 적극 참여·교류 → 12학년 초 갑자기 부탁하면 좋은 추천서가 안 나온다.</p>
            </div>
            <div style={{ background: "#f7f8fa", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 3 }}>선생님은 네트워크다</div>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.65, margin: 0 }}>추천서뿐 아니라 리서치·인턴십·컨퍼런스 기회가 선생님을 통해 온다. (대학에선 Office Hours가 같은 역할)</p>
            </div>
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
