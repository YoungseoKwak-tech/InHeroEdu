"use client";

/**
 * /parents/lectures — 인강(온라인 강의) 강좌 상세 페이지 (한국어).
 *
 * Korean online-lecture course page in the InHero house style: instructor
 * profiles → course highlight → 수업 안내 → 강의 특징 → 강의 구성(커리큘럼) →
 * 수강 후기 → 수강 대상 → 수강신청 CTA. Content here is the AP Biology series as
 * a template; swap the data arrays to add more instructors/courses.
 */

import { useState } from "react";
import ParentHubShell from "@/components/parents/ParentHubShell";

const GREEN = "#00b85f";
const PINK = "#dc2680";
const INK = "#1a1a1f";
const SUB = "#475569";
const FAINT = "#94a3b8";
const BORDER = "#e6e8ec";
const CARD = "0 1px 2px rgba(16,24,40,0.04)";

const INSTRUCTORS = [
  { name: "Roy Lee", emoji: "🧬", role: "대표강사 · AP Biology", cred: "호주 명문 UQ 의대 출신 의사", accent: GREEN },
  { name: "Sarah Lim", emoji: "📘", role: "AP Science", cred: "NYU 유학생 출신 강사", accent: "#1f6feb" },
  { name: "Caits Lee", emoji: "📗", role: "SAT·AP 전문", cred: "압구정 AP학원 BioChem 10년 강사경력", accent: PINK },
];

const FEATURES = [
  { icon: "🌱", title: "초심자도 최고수준까지", desc: "기본이 부족해도 OK! 초심자로 시작해 AP Biology 최고수준까지 자연스럽게 향상되는 실력." },
  { icon: "🧩", title: "챕터별 맞춤 수강", desc: "챕터별로 정리된 구성으로 학교 진도에 맞춰 전체 수강하거나, 필요한 부분만 선택적으로 수강." },
  { icon: "🎯", title: "성적과 점수 동시에", desc: "퀄리티는 학생이 알아본다. 학생 눈높이에 맞춘 수업으로 학교성적과 시험점수를 동시에." },
];

// College Board AP Biology — 8개 유닛 커리큘럼 (이론 + 실전 문제풀이 통합)
const CURRICULUM = [
  { u: 1, name: "Chemistry of Life", desc: "물·생체분자·효소 — 생명의 화학적 토대", lessons: 6, min: 330 },
  { u: 2, name: "Cell Structure & Function", desc: "세포 소기관·막·수송, 원핵/진핵 비교", lessons: 6, min: 350 },
  { u: 3, name: "Cellular Energetics", desc: "효소·호흡·광합성의 에너지 흐름", lessons: 5, min: 300 },
  { u: 4, name: "Cell Communication & Cell Cycle", desc: "신호전달·세포주기·체크포인트", lessons: 5, min: 300 },
  { u: 5, name: "Heredity", desc: "감수분열·멘델 유전·연관과 교차", lessons: 5, min: 300 },
  { u: 6, name: "Gene Expression & Regulation", desc: "복제·전사·번역·조절·생명공학", lessons: 7, min: 400 },
  { u: 7, name: "Natural Selection", desc: "진화의 증거·Hardy-Weinberg·종분화", lessons: 6, min: 340 },
  { u: 8, name: "Ecology", desc: "개체군·군집·생태계·에너지 흐름", lessons: 5, min: 280 },
];

const AUDIENCE = [
  "새로 바뀐 AP Biology 시험에서 고득점을 노리는 학생",
  "현재 학교에서 AP Biology를 수강하는 학생",
  "기본지식이 부족하지만 AP/SAT Biology 시험을 준비하는 학생",
  "암기보다 이해를 먼저 하고 싶은 학생",
  "독학으로 심도 있는 Biology 수업을 듣고 싶은 학생",
  "지루한 수동적 수업을 벗어나 생물학의 진짜 흥미를 느끼고 싶은 학생",
];

const REVIEW = {
  name: "수강생 후기 · AP Biology",
  body:
    "재밌는 강의 덕분에 힘든 공부를 즐겁게 만들어주신 Roy쌤!! 바이오가 다들 엄청 어렵다고 해서 두려움과 함께 시작했는데, 선생님의 유쾌하고 센스있는 수업 자료가 정말 큰 도움이 됐어요. 질문을 거의 매주 올렸는데 항상 길고 정성스럽게, 무엇보다 친근하게 답변해주셔서 질문하기가 편했어요. 강의를 들으면서 선생님은 생물학의 '모든 것'을 알고 있다고 자주 느꼈어요. Roy쌤 강의면 AP Biology는 문제 없다고 제가 장담합니다!",
};

function enroll() {
  window.dispatchEvent(
    new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/lectures" } })
  );
}

const totalLessons = CURRICULUM.reduce((s, c) => s + c.lessons, 0);

export default function LecturesPage() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <ParentHubShell
      eyebrow="🎥 인강 · AP BIOLOGY"
      title="Roy Lee 선생님의 NEW AP Biology 강의 시리즈"
      maxWidth={1040}
      ctaTitle="Roy쌤과 AP Biology, 지금 시작하세요"
      ctaDesc="이론과 실전 문제풀이를 한 번에. 무료 가입하고 첫 강의를 확인해 보세요."
      intro={
        <>
          호주 명문 UQ 의대 출신 의사, NYU 유학생, 압구정 AP학원 BioChem 10년 강사경력이 합쳐진{" "}
          <strong style={{ color: INK }}>SAT·AP 전문학원 경력</strong> 기반의 대한민국 유일무이한 강의. 학교 선배처럼
          자상하고 꼼꼼하게 알려주는 과학 인강의 끝판왕이에요.
        </>
      }
    >
      {/* 강사진 */}
      <SectionTitle eyebrow="INSTRUCTORS" title="강사진" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 40 }}>
        {INSTRUCTORS.map((t) => (
          <div key={t.name} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16, padding: "20px 20px", boxShadow: CARD }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 24, width: 46, height: 46, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `${t.accent}14`, flexShrink: 0 }}>{t.emoji}</span>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, color: INK }}>{t.name}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: t.accent }}>{t.role}</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, color: SUB, lineHeight: 1.6, margin: 0 }}>{t.cred}</p>
          </div>
        ))}
      </div>

      {/* 강좌 하이라이트 배너 */}
      <div style={{ background: "linear-gradient(135deg,#0b1220,#16233b)", color: "#fff", borderRadius: 20, padding: "clamp(24px,4vw,36px)", marginBottom: 40 }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.08em", color: "#5fe0a0", marginBottom: 10 }}>✦ NEW · AP BIOLOGY 강의 시리즈</div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 16px", lineHeight: 1.25 }}>
          이론과 실전 문제풀이를 동시에.
        </h2>
        <ul style={{ margin: "0 0 18px", padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
          {["College Board가 제시하는 Unit별 핵심내용 강의", "이론을 배운 뒤 곧바로 실전형 문제풀이로 능동적 학습"].map((t) => (
            <li key={t} style={{ display: "flex", gap: 9, fontSize: 14.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
              <span style={{ color: "#5fe0a0", flexShrink: 0, fontWeight: 800 }}>✓</span>{t}
            </li>
          ))}
        </ul>
        <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 15px", fontSize: 13, color: "rgba(255,255,255,0.78)", lineHeight: 1.6 }}>
          📢 <strong style={{ color: "#fff" }}>2026년 개정 교육과정(CED)</strong>은 시험 내용 변경 없이 일부 용어 정의·연관성만 보완됩니다. 본 강의로 2026년 AP Biology 시험 준비에 충분합니다.
        </div>
      </div>

      {/* 수업 안내 */}
      <SectionTitle eyebrow="ABOUT" title="수업 안내" />
      <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16, padding: "22px 24px", marginBottom: 40, boxShadow: CARD }}>
        <p style={{ fontSize: 14.5, color: SUB, lineHeight: 1.85, margin: 0 }}>
          미국 고등학교·대학교 유학생, 호주 명문 UQ 의사 출신 강사가 직접 전하는 AP Biology 이론 강의.
          온·오프라인을 통틀어 <strong style={{ color: INK }}>가장 체계적이고 탄탄한 구성</strong>으로 유례없는 깊이를 자랑합니다.
          SAT 전문 학원에서도 접할 수 없었던 오직 수험생을 위한 온라인 맞춤형 강의 —{" "}
          <strong style={{ color: PINK }}>요약·암기 중심 수업과는 차원이 다른 퀄리티</strong>를 직접 체험해 보세요.
        </p>
      </div>

      {/* 강의 특징 */}
      <SectionTitle eyebrow="WHY THIS COURSE" title="강의 특징" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, marginBottom: 40 }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16, padding: "20px 20px", boxShadow: CARD }}>
            <div style={{ fontSize: 26, marginBottom: 10 }}>{f.icon}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 800, color: INK, marginBottom: 6 }}>{f.title}</div>
            <p style={{ fontSize: 13.5, color: SUB, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* 강의 구성 / 커리큘럼 */}
      <SectionTitle eyebrow="CURRICULUM" title="강의 구성" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
        <Stat label="총 강의 분량" value="약 50시간" />
        <Stat label="유닛" value={`${CURRICULUM.length}개`} />
        <Stat label="강의 수" value={`${totalLessons}강`} />
        <Stat label="구성" value="이론 + 실전 통합" />
      </div>
      <p style={{ fontSize: 13.5, color: SUB, lineHeight: 1.7, margin: "0 0 16px" }}>
        College Board가 요구하는 AP Biology 모든 핵심 지식을 커버하고, 변화된 출제경향이 강조하는{" "}
        <strong style={{ color: INK }}>Organization of Units</strong>를 집중 대비합니다. 빠르지만 정확하게 — 무조건
        암기보다 논리적 흐름과 핵심 포인트를 잡습니다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 40 }}>
        {CURRICULUM.map((c) => {
          const isOpen = open === c.u;
          return (
            <div key={c.u} style={{ background: "#fff", border: `1px solid ${isOpen ? GREEN : BORDER}`, borderRadius: 14, overflow: "hidden", boxShadow: CARD }}>
              <button
                onClick={() => setOpen(isOpen ? null : c.u)}
                style={{ width: "100%", textAlign: "left", cursor: "pointer", background: isOpen ? "rgba(0,184,95,0.06)" : "#fff", border: "none", display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}
              >
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 900, color: "#fff", background: GREEN, borderRadius: 8, padding: "5px 10px", flexShrink: 0 }}>U{c.u}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15.5, fontWeight: 800, color: INK }}>{c.name}</div>
                  <div style={{ fontSize: 12.5, color: FAINT, marginTop: 2 }}>{c.lessons}강 · 약 {Math.round(c.min / 60)}시간</div>
                </div>
                <span style={{ color: FAINT, fontSize: 18, flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }}>⌄</span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 18px 16px 60px", fontSize: 13.5, color: SUB, lineHeight: 1.7 }}>
                  {c.desc} — 이론 강의 후 곧바로 해당 유닛의 실전형 문제풀이로 스스로 실력을 점검합니다.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 수강 후기 */}
      <SectionTitle eyebrow="REVIEW" title="수강생 후기" />
      <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16, padding: "22px 24px", marginBottom: 40, boxShadow: CARD }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ color: "#f5a623", fontSize: 15 }}>★★★★★</span>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: PINK }}>{REVIEW.name}</span>
        </div>
        <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.85, margin: 0, whiteSpace: "pre-wrap" }}>{REVIEW.body}</p>
      </div>

      {/* 수강 대상 */}
      <SectionTitle eyebrow="WHO IT'S FOR" title="이런 학생에게 추천해요" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10, marginBottom: 40 }}>
        {AUDIENCE.map((a) => (
          <div key={a} style={{ display: "flex", gap: 10, background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "13px 15px", fontSize: 13.5, color: SUB, lineHeight: 1.55, boxShadow: CARD }}>
            <span style={{ color: GREEN, flexShrink: 0, fontWeight: 900 }}>✓</span>{a}
          </div>
        ))}
      </div>

      {/* 수강신청 CTA */}
      <div style={{ background: "linear-gradient(135deg,#e9fbf2,#ffffff)", border: `1px solid ${GREEN}55`, borderRadius: 20, padding: "30px 26px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: 800, color: INK, letterSpacing: "-0.02em", margin: "0 0 10px" }}>
          Roy쌤과 AP Biology, 지금 시작하세요
        </h2>
        <p style={{ fontSize: 14.5, color: SUB, lineHeight: 1.7, margin: "0 0 20px" }}>
          이론과 실전 문제풀이를 한 번에 — 약 50시간 분량의 체계적인 강의. 무료 가입하고 첫 강의를 확인해 보세요.
        </p>
        <button onClick={enroll} style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 12, padding: "15px 34px", fontWeight: 800, fontSize: 15.5, cursor: "pointer", boxShadow: "0 10px 26px rgba(0,184,95,0.3)" }}>
          무료 가입하고 수강 시작 →
        </button>
      </div>
    </ParentHubShell>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", color: GREEN, marginBottom: 5 }}>{eyebrow}</div>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 21, fontWeight: 800, color: INK, letterSpacing: "-0.02em", margin: 0 }}>{title}</h2>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "10px 16px", minWidth: 120, boxShadow: CARD }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 800, color: INK }}>{value}</div>
      <div style={{ fontSize: 11.5, color: FAINT, marginTop: 2, fontWeight: 600 }}>{label}</div>
    </div>
  );
}
