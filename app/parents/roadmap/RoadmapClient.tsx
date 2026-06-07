"use client";

import ParentHubShell from "@/components/parents/ParentHubShell";

interface Track { label: string; emoji: string; items: string[]; }
interface Phase { season: string; tasks: string[]; }
interface Grade {
  grade: string;
  tag: string;
  tagColor: string;
  summary: string;
  focus: string;            // 이 시기 한 문장 핵심
  tracks: Track[];
  timeline: Phase[];        // 가을 / 겨울 / 봄 / 여름
  pitfalls: string[];       // 흔히 하는 실수
  parentTip: string;        // 부모 팁
}

const GRADES: Grade[] = [
  {
    grade: "6학년 (G6)", tag: "탐색 시작", tagColor: "#0d9488",
    summary: "중학교의 시작 — 입시 압박은 전혀 없는 시기. 독서 습관·수학 기초·다양한 경험이 평생 자산이 됩니다.",
    focus: "입시가 아니라 '기초 체력'. 매일 읽는 아이로 키우고, 수학 기초를 탄탄히, 여러 가지를 경험하게 하세요.",
    tracks: [
      { label: "학업", emoji: "📘", items: [
        "학교 수업 충실 + 수학 기초 탄탄히 (분수·비례·정수 — 이후 모든 수학의 토대)",
        "영어 독서 습관화 — 매일 읽기 (어휘·문해력이 훗날 SAT·에세이로 직결)",
        "글쓰기 기초 — 일기·독후감으로 표현력 기르기",
      ] },
      { label: "탐색·활동", emoji: "🧭", items: [
        "운동·악기·미술·코딩 등 다양하게 경험 (좋아하는 것 '발견'이 목적)",
        "도서관·박물관·체험으로 호기심 자극",
        "작은 책임감 기르기 (집안일·반려동물 등)",
      ] },
      { label: "수학·대회 (선택)", emoji: "🧮", items: [
        "수학을 좋아하면 MATHCOUNTS·AMC 8 가볍게 경험",
        "독서·글쓰기 대회도 부담 없이 도전",
      ] },
    ],
    timeline: [
      { season: "가을", tasks: ["새 학년 적응", "독서·수학 루틴 만들기"] },
      { season: "겨울~봄", tasks: ["다양한 활동 체험", "(관심 시) 수학 대회 맛보기"] },
      { season: "여름", tasks: ["독서 + 캠프·체험으로 관심 분야 탐색"] },
    ],
    pitfalls: [
      "너무 이른 입시 압박 — 6학년은 '경험과 습관'의 시기",
      "선행만 시키고 독서를 놓치는 것",
      "한 가지만 강요 — 다양한 경험이 더 중요",
    ],
    parentTip: "성적표보다 '책 읽는 아이'로 키우는 게 입시에 가장 큰 투자입니다. 다양한 경험을 함께 만들어 주세요.",
  },
  {
    grade: "7학년 (G7)", tag: "관심 싹 틔우기", tagColor: "#0891b2",
    summary: "좋아하는 것 2~3개를 찾아 꾸준히 이어가는 시기. 고교 수학 가속 여부를 점검할 첫 분기점입니다.",
    focus: "관심을 좁히고 꾸준함을 쌓기. 그리고 '8학년 Algebra 1' 진입이 가능한지 수학 트랙을 점검할 때.",
    tracks: [
      { label: "학업", emoji: "📘", items: [
        "수학 트랙 점검 — 8학년에 Algebra 1 진입이 가능한지 확인 (고교 수학 가속의 분기점)",
        "독서 수준 높이기 (논픽션·고전으로 폭 넓히기)",
        "학교 성적 꾸준히 — 좋은 습관 유지",
      ] },
      { label: "탐색·활동", emoji: "🧭", items: [
        "좋아하는 활동 2~3개로 좁혀 꾸준히 (동아리·스포츠·악기)",
        "봉사·지역사회 활동 가볍게 시작",
        "팀·프로젝트에서 작은 리더 역할 경험",
      ] },
      { label: "수학·대회 (선택)", emoji: "🧮", items: [
        "AMC 8(11월)·MATHCOUNTS 도전 (수학 좋아하면)",
        "과학·글쓰기 대회 경험",
      ] },
    ],
    timeline: [
      { season: "가을", tasks: ["활동 좁히기", "수학 트랙 상담 (8학년 Algebra 1 준비)"] },
      { season: "겨울~봄", tasks: ["AMC 8·MATHCOUNTS 등", "꾸준한 활동 이어가기"] },
      { season: "여름", tasks: ["관심 분야 깊이 — 캠프·온라인 강의·자기 프로젝트"] },
    ],
    pitfalls: [
      "수학 가속 타이밍을 놓치는 것 — 8학년 Algebra 1이 Calculus 경로의 열쇠",
      "활동을 매년 바꿔 꾸준함이 안 쌓이는 것",
    ],
    parentTip: "7~8학년 수학 트랙이 고등학교 AP Calculus 가능 여부를 좌우합니다. 학교 카운슬러와 수학 진도를 꼭 상담하세요.",
  },
  {
    grade: "8학년 (G8)", tag: "고교 준비", tagColor: "#ca8a04",
    summary: "고등학교 준비의 도약대. Algebra 1·외국어·9학년 과목 선택이 고교 4년의 출발선을 정합니다.",
    focus: "고교 준비의 핵심 해. Algebra 1 이수와 9학년 과목 선택을 미리 설계하면 고등학교가 훨씬 수월해집니다.",
    tracks: [
      { label: "학업", emoji: "📘", items: [
        "Algebra 1 이수 목표 (가능하면 Geometry까지) — 11~12학년 Calculus 경로 확보",
        "외국어 시작 — 4년 이수를 위해 일찍 출발",
        "9학년 과목 선택(Honors 등) 신중히 — 고교 첫 출발선",
        "독서·작문 계속 강화",
      ] },
      { label: "탐색·활동", emoji: "🧭", items: [
        "관심 분야 1~2개에 '깊이' 만들기 시작",
        "봉사 꾸준히 — 고교까지 이어갈 활동 찾기",
        "리더십·프로젝트 경험 쌓기",
      ] },
      { label: "대회·시험 (선택)", emoji: "🧮", items: [
        "AMC 8·MATHCOUNTS·과학 대회 등 (좋아하면)",
        "(일부) 고교 placement test 대비",
      ] },
    ],
    timeline: [
      { season: "가을", tasks: ["Algebra 1 수강", "9학년 과목·고교 선택 리서치"] },
      { season: "겨울", tasks: ["고교 과목 선택·신청", "AMC 8(11월) 결과 점검"] },
      { season: "봄", tasks: ["고교 등록·오리엔테이션", "여름 계획 세우기"] },
      { season: "여름", tasks: ["독서 + 관심 분야 심화", "고교 적응 준비"] },
    ],
    pitfalls: [
      "8학년을 '쉬어가는 해'로 보는 것 — 고교 과목·수학 트랙이 여기서 결정됨",
      "외국어를 늦게 시작해 4년 이수를 못 채우는 것",
    ],
    parentTip: "8학년은 '고등학교 준비'의 핵심입니다. 9학년 과목 선택과 수학·외국어 트랙을 미리 설계해 두면 고교 4년이 수월해집니다.",
  },
  {
    grade: "9학년 (G9)", tag: "기초 다지기", tagColor: "#16a34a",
    summary: "성적 관리 습관을 잡고 관심 분야를 넓게 탐색하는 시기. 화려한 스펙보다 기본기·GPA·꾸준함이 먼저입니다.",
    focus: "점수보다 '습관'. 9학년 GPA도 최종 성적표에 그대로 남고, 이때 만든 공부·생활 루틴이 4년을 좌우합니다.",
    tracks: [
      { label: "학업", emoji: "📘", items: [
        "모든 과목 A 목표 — 9학년 성적도 입시 GPA에 그대로 포함됨",
        "Honors 위주로 난이도 적응, 여유 있으면 입문형 AP 1개 (AP Human Geography · AP CSP · AP Environmental Science)",
        "수학 트랙 점검 — Algebra 2 / Pre-Calc까지 가는 속도가 11학년 AP Calculus 진입을 결정",
        "영어 독해·작문 기본기 다지기 (이후 SAT·에세이의 토대)",
        "노트 정리·시간관리·과제 마감 같은 '공부 시스템' 자체를 습관으로",
      ] },
      { label: "시험", emoji: "📝", items: [
        "PSAT 8/9 응시 가능하면 경험 (점수보다 형식 익히기)",
        "본격 SAT 준비는 아직 X — 대신 독서량을 늘려 어휘·독해 실력을 쌓기",
        "수학 개념 빈틈 없이 — SAT Math는 중학~9학년 개념의 누적",
      ] },
      { label: "활동", emoji: "🎭", items: [
        "동아리 4~6개를 폭넓게 체험해 진짜 좋아하는 1~2개 발견",
        "봉사활동 시작 — '같은 곳에서 꾸준히' (총 시간보다 지속성)",
        "운동·악기·예술 등 장기 취미 시작 (4년 누적되면 강력한 스펙)",
        "교내 활동부터 — 외부 대회는 10학년부터도 늦지 않음",
      ] },
    ],
    timeline: [
      { season: "가을", tasks: ["수업 적응 + 첫 학기 GPA 관리", "동아리 가입·탐색 시작"] },
      { season: "겨울~봄", tasks: ["좋아하는 동아리 1~2개로 좁히기", "봉사 루틴 만들기", "(있으면) PSAT 8/9"] },
      { season: "여름", tasks: ["독서 리스트 + 온라인 강의로 관심 분야 탐색", "봉사 지속 — 무리한 유료 캠프는 불필요"] },
    ],
    pitfalls: [
      "'9학년은 입시와 무관'이라는 착각 — GPA는 9학년부터 카운트",
      "첫 AP 욕심내다 GPA를 망치는 것 — 기초가 먼저",
      "동아리 가입만 하고 활동은 안 하는 것 — 직책·기여가 핵심",
    ],
    parentTip: "이 시기엔 사교육보다 독서·수면·루틴이 더 중요합니다. 점수를 다그치기보다 '꾸준한 습관'을 함께 만들어 주세요.",
  },
  {
    grade: "10학년 (G10)", tag: "방향 잡기", tagColor: "#2563eb",
    summary: "관심 분야를 1~2개로 좁히고 '깊이'를 만들기 시작하는 해. 첫 AP·첫 대회·첫 여름 프로그램에 도전합니다.",
    focus: "'넓이'에서 '깊이'로. 활동 1~2개에 직책·프로젝트를 만들고, 11학년 정점을 위한 준비를 깔아둡니다.",
    tracks: [
      { label: "학업", emoji: "📘", items: [
        "AP 2~3개 (전공 방향의 핵심 과목: AP Biology · Chemistry · World History · CSA 등)",
        "수학 가속 점검 — 11학년 AP Calculus / Statistics 진입을 위해 Pre-Calc 진도 확인",
        "전공 관심 과목 심화 — 어려운 과목을 듣는 것 자체가 'rigor'로 평가됨",
        "GPA 유지 (10학년 성적도 핵심)",
      ] },
      { label: "시험", emoji: "📝", items: [
        "PSAT 10 응시 (11학년 PSAT/NMSQT 리허설)",
        "SAT/ACT 진단 1회로 현재 위치 파악",
        "기초 학습은 시작하되 본격 준비는 11학년 — 지금은 학교 공부 + 독서",
      ] },
      { label: "활동·대회", emoji: "🏆", items: [
        "1~2개 활동에 '깊이' — 직책·프로젝트·기여 만들기",
        "첫 STEM 대회 도전: AMC 10 · Science Olympiad · 지역 대회",
        "의미 있는 첫 여름 프로그램 탐색·지원 (마감은 보통 겨울~봄)",
        "봉사·취미 지속 — 3~4년 누적이 곧 입시 스토리",
      ] },
      { label: "탐색·준비", emoji: "🧭", items: [
        "전공·진로 방향을 가볍게 좁히기 ('나는 무엇에 관심 있나?')",
        "Coursera·edX 등으로 전공 깊이 쌓기",
      ] },
    ],
    timeline: [
      { season: "가을", tasks: ["AP 2~3개 수강, 활동에 직책 만들기", "여름 프로그램 리서치 시작"] },
      { season: "겨울", tasks: ["여름 프로그램·대회 지원 (마감 주의)", "PSAT 10 응시"] },
      { season: "봄", tasks: ["5월 첫 AP 시험", "대회 응시 (AMC 등)", "SAT/ACT 진단"] },
      { season: "여름", tasks: ["첫 본격 여름 활동 (연구 보조·인턴·대학 프로그램·자기 프로젝트)", "SAT 준비 '시동'"] },
    ],
    pitfalls: [
      "너무 많은 활동을 얕게 — '넓이'보다 '깊이'",
      "여름 프로그램 마감(겨울~봄)을 놓치는 것",
      "AP를 과하게 잡아 GPA가 떨어지는 것",
    ],
    parentTip: "겨울에 '다가오는 여름 계획'을 자녀와 함께 세우면 1년이 완전히 달라집니다. 여름 프로그램 마감이 의외로 이릅니다.",
  },
  {
    grade: "11학년 (G11)", tag: "가장 중요한 해", tagColor: "#dc2626",
    summary: "입시의 핵심 시기. AP·SAT·활동·연구가 동시에 정점에 오르고, 여름부터 에세이 준비가 시작됩니다.",
    focus: "11학년 여름이 입시의 8할. 봄까지 '여름 활동 + 에세이' 플랜을 확정해 두는 것이 합격을 가릅니다.",
    tracks: [
      { label: "학업", emoji: "📘", items: [
        "AP 3~5개 (전공 심화 중심) — 가장 어려운 커리큘럼이 최고 rigor",
        "GPA가 가장 무겁게 평가되는 학년 — 끝까지 관리",
        "추천서 써 줄 선생님 2명과 관계 형성 (수업 적극 참여)",
      ] },
      { label: "시험", emoji: "📝", items: [
        "PSAT/NMSQT (10월) — National Merit 자격 (장학·타이틀)",
        "SAT/ACT 본격 응시: 봄 1회 + 가을 1회 (필요 시 재응시)",
        "5월 AP 시험 (수강 과목 전부)",
        "목표 점수는 지원 대학 합격생 중간 50% 구간 이상 (탑 대학은 SAT 1500+ 수준)",
      ] },
      { label: "활동·연구", emoji: "🔬", items: [
        "Research / 독립 프로젝트 본격화 (교수 멘토십·논문·발표 목표)",
        "전국 단위 대회 입상 도전, 리더십 정점 (회장·창립자)",
        "전공과 연결된 '대표 활동(spike)' 완성",
      ] },
      { label: "에세이·지원", emoji: "✍️", items: [
        "여름부터 Common App 메인 에세이 브레인스토밍·초고",
        "대학 리스트 1차 작성 (reach / match / safety)",
        "추천서 선생님께 사전 부탁(봄~여름), Activities 리스트 정리",
      ] },
    ],
    timeline: [
      { season: "가을", tasks: ["AP 풀 로드 수강", "PSAT/NMSQT (10월)", "SAT 1차 준비"] },
      { season: "겨울", tasks: ["SAT/ACT 응시", "대학 리스트 초안", "추천서 사전 부탁"] },
      { season: "봄", tasks: ["SAT/ACT 응시", "5월 AP 시험", "연구·대회 정점, 추천서 확정"] },
      { season: "여름 ★", tasks: ["Common App 에세이 초고~완성", "대학별 보충 에세이 시작", "대표 여름 활동 (연구·인턴·집중 프로그램)", "가을 SAT 마지막 준비"] },
    ],
    pitfalls: [
      "SAT에만 매몰되어 GPA·활동을 소홀히 — 셋 다 봐야 함",
      "에세이를 12학년 가을로 미뤄 마감 폭탄을 맞는 것 (여름에 끝내야)",
      "활동을 양으로만 늘려 spike 없이 산만해지는 것",
    ],
    parentTip: "11학년 봄에 '여름 + 에세이' 일정을 확정하세요. 이 여름을 어떻게 쓰느냐가 합격에 가장 큰 영향을 줍니다.",
  },
  {
    grade: "12학년 (G12)", tag: "마무리·지원", tagColor: "#7c3aed",
    summary: "지원서를 완성하고 제출하는 해. 도전적 과목은 유지하되(senioritis 주의) 에세이·마감·재정보조 관리가 전부입니다.",
    focus: "마감 캘린더가 곧 전략. EA/ED·RD·재정보조 일정을 한 장에 정리하고, 합격 후에도 성적을 끝까지 유지하세요.",
    tracks: [
      { label: "학업", emoji: "📘", items: [
        "도전적인 과목 유지 (전공 AP 마무리) — senioritis 금물",
        "1학기 성적까지 반영(midyear report), 합격 후에도 끝까지 — 성적 급락 시 합격 취소 사례 존재",
      ] },
      { label: "시험", emoji: "📝", items: [
        "SAT/ACT 마지막 응시 (보통 10~11월이 마지노선)",
        "필요 시 AP 추가 응시 및 점수 send",
      ] },
      { label: "지원·에세이", emoji: "🎓", items: [
        "Common App + 대학별 보충 에세이 완성·제출",
        "마감: EA/ED 보통 11/1·11/15 · RD 보통 1/1~1/15",
        "추천서·성적표(school report) 발송 확인, 인터뷰 준비",
      ] },
      { label: "재정·결과", emoji: "💰", items: [
        "재정보조: FAFSA(10월 오픈) · CSS Profile 신청 — 마감 엄수",
        "12월 ED/EA 결과 → 필요 시 RD 지원 전략 조정",
        "3~4월 RD 결과 비교(재정보조 포함) → 5/1 입학 확정, waitlist 대응",
      ] },
    ],
    timeline: [
      { season: "가을", tasks: ["에세이 완성", "EA/ED 제출 (11월)", "마지막 SAT/ACT", "FAFSA·CSS 신청"] },
      { season: "겨울", tasks: ["RD 제출 (1월)", "ED/EA 결과 대응", "인터뷰"] },
      { season: "봄", tasks: ["RD 결과·합격 비교", "5/1 입학 확정(deposit)", "final report 발송"] },
    ],
    pitfalls: [
      "에세이를 미루다 마감 직전 몰려 질이 떨어지는 것",
      "합격 후 성적 급락 → 합격 취소",
      "재정보조 마감(FAFSA/CSS)을 놓치는 것",
    ],
    parentTip: "마감 캘린더를 함께 만들어 주세요. 특히 재정보조 서류는 부모의 몫이 큽니다 — 10월부터 미리 챙기는 게 안전합니다.",
  },
];

export default function RoadmapClient() {
  return (
    <ParentHubShell
      eyebrow="🗺️ 학년별 로드맵"
      title="미국 대학 입시, 학년별로 무엇을 할까?"
      intro={
        <>
          6학년부터 12학년까지, <strong>학업 · 시험 · 활동 · 에세이</strong>를 학년별로 정리했습니다.
          각 학년의 <strong>핵심 · 트랙별 할 일 · 시기별 체크리스트 · 흔한 실수</strong>까지 한눈에 확인하세요.
          <br />
          <span style={{ fontSize: 12.5, color: "#94a3b8" }}>※ 일반적인 가이드입니다. 학생마다 상황이 다르니 우선순위는 유연하게 조정하세요. 시험·마감 일정은 매년 달라질 수 있으니 공식 사이트로 재확인하세요.</span>
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {GRADES.map((g) => (
          <article key={g.grade} style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 14, padding: "22px 22px", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
              <h2 style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>{g.grade}</h2>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", background: g.tagColor, borderRadius: 6, padding: "3px 10px" }}>{g.tag}</span>
            </div>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: "0 0 14px" }}>{g.summary}</p>

            {/* Focus 한 줄 핵심 */}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: `${g.tagColor}10`, border: `1px solid ${g.tagColor}33`, borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>🎯</span>
              <p style={{ fontSize: 13.5, color: "#1f2937", lineHeight: 1.65, margin: 0 }}>
                <strong style={{ color: g.tagColor }}>이 시기의 핵심 · </strong>{g.focus}
              </p>
            </div>

            {/* Tracks */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14 }}>
              {g.tracks.map((t) => (
                <div key={t.label} style={{ background: "#f7f8fa", borderRadius: 10, padding: "14px 15px" }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>{t.emoji} {t.label}</div>
                  <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                    {t.items.map((it, i) => (
                      <li key={i} style={{ fontSize: 13, color: "#334155", lineHeight: 1.6, paddingLeft: 16, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: g.tagColor, fontWeight: 800 }}>·</span>{it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 시기별 체크리스트 */}
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 10 }}>📅 시기별 체크리스트</div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`, gap: 10 }}>
                {g.timeline.map((p) => (
                  <div key={p.season} style={{ border: "1px solid #e6e8ec", borderRadius: 10, padding: "12px 13px" }}>
                    <div style={{ display: "inline-block", fontSize: 11.5, fontWeight: 800, color: "#fff", background: g.tagColor, borderRadius: 6, padding: "2px 9px", marginBottom: 9 }}>{p.season}</div>
                    <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                      {p.tasks.map((task, i) => (
                        <li key={i} style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.55, paddingLeft: 14, position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, color: "#94a3b8" }}>›</span>{task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 흔한 실수 + 부모 팁 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginTop: 16 }}>
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "13px 15px" }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: "#b91c1c", marginBottom: 8 }}>⚠️ 흔히 하는 실수</div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {g.pitfalls.map((p, i) => (
                    <li key={i} style={{ fontSize: 12.5, color: "#7f1d1d", lineHeight: 1.55, paddingLeft: 15, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "#dc2626", fontWeight: 800 }}>×</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "13px 15px" }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: "#15803d", marginBottom: 8 }}>👪 부모 팁</div>
                <p style={{ fontSize: 12.5, color: "#14532d", lineHeight: 1.65, margin: 0 }}>{g.parentTip}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ParentHubShell>
  );
}
