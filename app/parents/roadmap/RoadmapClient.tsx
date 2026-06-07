"use client";

import ParentHubShell from "@/components/parents/ParentHubShell";

interface Track { label: string; emoji: string; items: string[]; }
interface Grade { grade: string; tag: string; tagColor: string; summary: string; tracks: Track[]; }

const GRADES: Grade[] = [
  {
    grade: "9학년 (G9)", tag: "기초 다지기", tagColor: "#16a34a",
    summary: "성적 관리 습관을 잡고, 관심 분야를 넓게 탐색하는 시기. 무리한 스펙보다 기본기와 GPA가 우선.",
    tracks: [
      { label: "학업", emoji: "📘", items: ["탄탄한 기초 + Honors 과목으로 난이도 적응", "여유 있으면 첫 AP 1개 (AP Human Geography, CSP 등 입문형)", "GPA 관리 습관 — 9학년 성적도 입시에 들어감"] },
      { label: "시험", emoji: "📝", items: ["PSAT 8/9로 시험 형식 경험", "독서·어휘 빌드업 (SAT 영어의 토대)"] },
      { label: "활동", emoji: "🎭", items: ["여러 동아리를 폭넓게 탐색해 관심 분야 찾기", "봉사활동 시작 (꾸준함이 핵심)"] },
    ],
  },
  {
    grade: "10학년 (G10)", tag: "방향 잡기", tagColor: "#2563eb",
    summary: "관심 분야를 1~2개로 좁히고 깊이를 만들기 시작. 첫 AP·첫 대회·첫 여름 프로그램에 도전.",
    tracks: [
      { label: "학업", emoji: "📘", items: ["AP 2~3개 (AP Biology·Chemistry·World History 등)", "전공 관심 분야의 핵심 과목 심화"] },
      { label: "시험", emoji: "📝", items: ["PSAT 10 응시", "SAT/ACT 기초 학습 시작 (본격 준비는 11학년)"] },
      { label: "활동", emoji: "🏆", items: ["1~2개 활동에 깊이 — 직책·기여 만들기", "첫 STEM 대회 도전 (Science Olympiad, AMC 10 등)", "여름 프로그램 탐색·지원"] },
    ],
  },
  {
    grade: "11학년 (G11)", tag: "가장 중요한 해", tagColor: "#dc2626",
    summary: "입시의 핵심 시기. AP·SAT·활동·연구가 모두 정점에 오르고, 여름부터 에세이 준비가 시작됨.",
    tracks: [
      { label: "학업", emoji: "📘", items: ["AP 3~5개 (전공 관련 심화 과목 중심)", "GPA가 가장 중요하게 평가되는 학년"] },
      { label: "시험", emoji: "📝", items: ["SAT/ACT 본격 응시 (봄·가을)", "5월 AP 시험"] },
      { label: "활동·연구", emoji: "🔬", items: ["Research / 의미 있는 프로젝트 시작", "대회 입상 목표, 리더십 정점", "여름: 연구·인턴·집중 프로그램"] },
      { label: "에세이·지원", emoji: "✍️", items: ["여름부터 Common App 에세이 브레인스토밍", "대학 리스트 작성, 추천서 선생님과 관계 형성"] },
    ],
  },
  {
    grade: "12학년 (G12)", tag: "마무리·지원", tagColor: "#7c3aed",
    summary: "지원서를 완성하고 제출하는 해. 도전적 과목을 유지하되(senioritis 주의), 에세이·마감 관리가 핵심.",
    tracks: [
      { label: "학업", emoji: "📘", items: ["도전적인 과목 유지 (전공 관련 AP 마무리)", "1학기 성적까지 반영 — 끝까지 관리"] },
      { label: "시험", emoji: "📝", items: ["SAT/ACT 마지막 응시 (가을)", "필요 시 AP 추가 응시"] },
      { label: "지원·에세이", emoji: "🎓", items: ["Common App + 대학별 보충 에세이 완성", "EA/ED 11월 · RD 1월 마감, 추천서·인터뷰", "장학금 · 재정보조(FAFSA/CSS) 신청"] },
    ],
  },
];

export default function RoadmapClient() {
  return (
    <ParentHubShell
      eyebrow="🗺️ 학년별 로드맵"
      title="미국 대학 입시, 학년별로 무엇을 할까?"
      intro={
        <>
          9학년부터 12학년까지, <strong>학업 · 시험 · 활동 · 에세이</strong>를 학년별로 정리했습니다.
          지금 자녀의 학년에서 무엇에 집중해야 하는지 한눈에 확인하세요.
          <br />
          <span style={{ fontSize: 12.5, color: "#94a3b8" }}>※ 일반적인 가이드입니다. 학생마다 상황이 다르니 우선순위는 유연하게 조정하세요.</span>
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {GRADES.map((g) => (
          <article key={g.grade} style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 14, padding: "22px 22px", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
              <h2 style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>{g.grade}</h2>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", background: g.tagColor, borderRadius: 6, padding: "3px 10px" }}>{g.tag}</span>
            </div>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: "0 0 16px" }}>{g.summary}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
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
          </article>
        ))}
      </div>
    </ParentHubShell>
  );
}
