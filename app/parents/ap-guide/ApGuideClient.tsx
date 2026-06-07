"use client";

import ParentHubShell from "@/components/parents/ParentHubShell";

interface Major {
  name: string; emoji: string; accent: string;
  core: string[];      // 핵심 (꼭 듣는 게 좋은)
  recommended: string[]; // 추천
  note: string;
}

const MAJORS: Major[] = [
  {
    name: "생명·의예 (Biomedical / Pre-med)", emoji: "🧬", accent: "#16a34a",
    core: ["AP Biology", "AP Chemistry", "AP Calculus AB/BC"],
    recommended: ["AP Physics 1/2", "AP Psychology", "AP Statistics"],
    note: "의·생명 계열은 생물·화학이 필수. 수학(미적분)과 통계로 정량 역량까지 보여주면 강력.",
  },
  {
    name: "컴퓨터과학 (Computer Science)", emoji: "💻", accent: "#2563eb",
    core: ["AP Computer Science A", "AP Calculus BC"],
    recommended: ["AP Statistics", "AP Physics C", "AP CS Principles"],
    note: "CS A로 프로그래밍 역량, Calc BC로 수학 깊이를 증명. 통계는 데이터/ML 관심을 어필.",
  },
  {
    name: "공학 (Engineering)", emoji: "⚙️", accent: "#d97706",
    core: ["AP Calculus BC", "AP Physics C (Mechanics / E&M)"],
    recommended: ["AP Chemistry", "AP Computer Science A"],
    note: "공학은 Calc BC + Physics C가 핵심 조합. 세부 전공(화공·CS 등)에 따라 화학·CS 추가.",
  },
  {
    name: "경제·경영·금융 (Economics / Business)", emoji: "📈", accent: "#7c3aed",
    core: ["AP Macroeconomics", "AP Microeconomics", "AP Statistics"],
    recommended: ["AP Calculus AB/BC", "AP US Government"],
    note: "거시·미시 경제와 통계가 기본. 정량 전공(금융·계량경제)이면 미적분까지 권장.",
  },
  {
    name: "수학·물리 (Math / Physics)", emoji: "🪐", accent: "#dc2626",
    core: ["AP Calculus BC", "AP Physics C"],
    recommended: ["AP Statistics", "AP Computer Science A"],
    note: "최상위 수학·물리 지원은 Calc BC + Physics C가 사실상 기본. 가능하면 더 높은 수학까지.",
  },
  {
    name: "사회과학·정치·국제 (Social Science / Poli Sci)", emoji: "🏛️", accent: "#0891b2",
    core: ["AP US Government", "AP Comparative Government", "AP US/World History"],
    recommended: ["AP Macroeconomics", "AP Microeconomics", "AP English Language", "AP Psychology"],
    note: "정치·국제는 정부·역사가 중심. 경제와 영어(Language)로 분석·글쓰기 역량을 보강.",
  },
  {
    name: "인문·영문 (Humanities / English)", emoji: "📚", accent: "#be185d",
    core: ["AP English Language", "AP English Literature"],
    recommended: ["AP US/World/European History", "AP Psychology", "AP Art History"],
    note: "영어 두 과목으로 읽기·쓰기 역량을 확실히. 역사·심리로 인문 폭을 보여줌.",
  },
  {
    name: "환경·지속가능성 (Environmental)", emoji: "🌱", accent: "#059669",
    core: ["AP Environmental Science", "AP Biology"],
    recommended: ["AP Chemistry", "AP Statistics", "AP Human Geography"],
    note: "환경과학 + 생물이 기본. 화학·통계로 과학적 깊이, 인문지리로 사회적 맥락까지.",
  },
];

function Pills({ items, color, bg }: { items: string[]; color: string; bg: string }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {items.map((s) => (
        <span key={s} style={{ fontSize: 12.5, fontWeight: 600, color, background: bg, border: `1px solid ${color}33`, borderRadius: 6, padding: "4px 10px" }}>{s}</span>
      ))}
    </div>
  );
}

export default function ApGuideClient() {
  return (
    <ParentHubShell
      eyebrow="📚 AP 과목 선택 가이드"
      title="전공별로 어떤 AP를 들어야 할까?"
      intro={
        <>
          "우리 아이가 ○○ 전공이면 AP 뭘 들어야 하나요?" — 가장 많이 받는 질문을 전공별로 정리했습니다.
          관심 <strong>전공에 맞는 AP 조합</strong>을 확인하고, 자녀의 학년·역량에 맞춰 선택하세요.
          <br />
          <span style={{ fontSize: 12.5, color: "#94a3b8" }}>※ 일반적인 권장 조합입니다. 학교 개설 과목·난이도를 고려해 무리하지 않는 선에서 선택하세요.</span>
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {MAJORS.map((m) => (
          <article key={m.name} style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 14, padding: "20px 22px", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ fontSize: 20 }}>{m.emoji}</span>{m.name}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.06em", marginBottom: 6 }}>핵심 (꼭 권장)</div>
                <Pills items={m.core} color={m.accent} bg={`${m.accent}12`} />
              </div>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.06em", marginBottom: 6 }}>추천 (여력 되면)</div>
                <Pills items={m.recommended} color="#475569" bg="#f1f5f9" />
              </div>
            </div>
            <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, margin: "14px 0 0", paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>{m.note}</p>
          </article>
        ))}
      </div>
    </ParentHubShell>
  );
}
