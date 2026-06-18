import type { Metadata } from "next";
import Link from "next/link";

/**
 * /mock-exams — public SEO landing targeting the exact query "SAT AP IB 모의고사".
 * The phrase appears in the <title>, <h1>, description, headings, and JSON-LD so
 * an exact-match search surfaces this page. Funnels to the real exam tools
 * (/sat, the Bluebook AP exam, the question bank).
 */

const PHRASE = "SAT · AP · IB 모의고사";

export const metadata: Metadata = {
  title: "SAT · AP · IB 모의고사 — 무료 실전 모의고사 | InHero",
  description:
    "SAT·AP·IB 모의고사를 한곳에서. 디지털 SAT 적응형 모의고사, College Board Bluebook 형식의 AP 실전 모의고사, IB 실전 문제까지 — 무료로 풀고 바로 채점·해설을 확인하세요.",
  keywords: [
    "SAT AP IB 모의고사",
    "SAT 모의고사",
    "AP 모의고사",
    "IB 모의고사",
    "디지털 SAT 모의고사",
    "Bluebook 모의고사",
    "AP 실전 모의고사",
    "무료 모의고사",
    "유학생 모의고사",
    "InHero",
  ],
  alternates: { canonical: "/mock-exams" },
  openGraph: {
    type: "website",
    url: "https://inheroedu.com/mock-exams",
    title: "SAT · AP · IB 모의고사 — 무료 실전 모의고사",
    description:
      "디지털 SAT 적응형 + AP Bluebook 형식 + IB 실전 — SAT·AP·IB 모의고사를 무료로 풀고 바로 채점·해설.",
    siteName: "InHero",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAT · AP · IB 모의고사 — 무료 실전 모의고사 | InHero",
    description: "SAT·AP·IB 모의고사를 한곳에서 — 무료로 풀고 바로 채점·해설.",
  },
};

const MINT = "#00FFB2";

const EXAMS = [
  {
    tag: "SAT",
    href: "/sat",
    title: "디지털 SAT 모의고사",
    desc: "실제 Bluebook처럼 적응형 2단계 모듈 · 모듈별 타이머 · Desmos 계산기 · 400–1600 예상 점수.",
    color: "#7DD3FC",
  },
  {
    tag: "AP",
    href: "/parents/question-bank/exam",
    title: "AP 실전 모의고사",
    desc: "College Board Bluebook 화면 그대로 — 과목별 실제 AP Section I(객관식) 분량·시간으로 구성된 모의고사.",
    color: "#1D9E75",
  },
  {
    tag: "IB",
    href: "/question-bank",
    title: "IB 실전 문제",
    desc: "IB 문제 스타일 그대로의 실전 문항 — 풀면 문항별 정답·해설이 바로 나옵니다.",
    color: "#A78BFA",
  },
  {
    tag: "TOEFL",
    href: "/toefl",
    title: "TOEFL iBT 모의고사",
    desc: "Reading·Listening·Speaking·Writing 4개 섹션을 실제 시험 형식으로 — 자동 채점·해설·음원·녹음·타이머.",
    color: "#F59E0B",
  },
];

const FAQ = [
  {
    q: "SAT AP IB 모의고사를 무료로 풀 수 있나요?",
    a: "네. InHero에서 SAT·AP·IB 모의고사 미리보기를 무료로 풀 수 있고, 풀이 직후 문항별 정답과 상세 해설을 바로 확인할 수 있습니다.",
  },
  {
    q: "실제 시험과 형식이 같나요?",
    a: "디지털 SAT는 실제 Bluebook과 동일한 적응형 2단계 모듈로, AP 모의고사는 College Board Bluebook 화면·분량·시간을 그대로 재현했습니다. IB는 실제 시험 문제 스타일을 따릅니다.",
  },
  {
    q: "문항은 어떻게 만들어지나요?",
    a: "실제 SAT·AP·IB·TOEFL의 섹션 구조와 문제 유형, 시간 배분을 분석해 같은 출제 원리로 새로 만든 오리지널 실전 문항입니다. 각 시험의 출제 방식을 그대로 적용했고, 정답·해설은 검수를 거칩니다.",
  },
  {
    q: "공식 기출문제인가요?",
    a: "공식 기출을 복제한 것이 아니라 동일한 형식·유형·난이도로 정교하게 출제한 연습 문제입니다. 그래서 저작권 걱정 없이 실전처럼 무제한 연습할 수 있어요.",
  },
];

export default function MockExamsLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://inheroedu.com/mock-exams",
        name: "SAT · AP · IB 모의고사",
        description:
          "SAT·AP·IB 모의고사를 한곳에서 — 디지털 SAT 적응형, AP Bluebook 형식, IB 실전 문제를 무료로 풀고 바로 채점·해설.",
        url: "https://inheroedu.com/mock-exams",
      },
      {
        "@type": "ItemList",
        itemListElement: EXAMS.map((e, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${e.tag} 모의고사`,
          url: `https://inheroedu.com${e.href}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div style={{ background: "#05070d", minHeight: "100vh", color: "#e8edf4", padding: "72px 22px 120px", fontFamily: "Inter, sans-serif" }}>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,255,178,0.7)", marginBottom: 14 }}>
          🖥️ 무료 실전 모의고사
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5.4vw, 3.4rem)", fontWeight: 850, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
          {PHRASE}
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32, maxWidth: 660 }}>
          <strong style={{ color: "#fff" }}>SAT·AP·IB 모의고사</strong>를 한곳에서. 디지털 SAT 적응형 모의고사,
          College Board Bluebook 형식의 AP 실전 모의고사, IB 실전 문제까지 — 무료로 풀고 풀이 직후
          문항별 정답과 상세 해설을 바로 확인하세요.
        </p>

        {/* Exam cards */}
        <div style={{ display: "grid", gap: 14, marginBottom: 44 }}>
          {EXAMS.map((e) => (
            <Link key={e.tag} href={e.href} style={{
              textDecoration: "none", display: "flex", alignItems: "center", gap: 18,
              borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", padding: "20px 22px",
            }}>
              <span style={{ fontSize: 13, fontWeight: 900, color: "#05070d", background: e.color, borderRadius: 8, padding: "6px 11px", flexShrink: 0 }}>{e.tag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>{e.title}</div>
                <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", marginTop: 4, lineHeight: 1.6 }}>{e.desc}</div>
              </div>
              <span style={{ fontSize: 15, fontWeight: 800, color: e.color, flexShrink: 0 }}>풀어보기 →</span>
            </Link>
          ))}
        </div>

        {/* Why section — phrase-rich body for relevance */}
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 14 }}>
          왜 InHero의 SAT·AP·IB 모의고사인가요?
        </h2>
        <ul style={{ margin: "0 0 44px", paddingLeft: 0, listStyle: "none", display: "grid", gap: 12 }}>
          {[
            "실제 시험과 동일한 형식 — 디지털 SAT 적응형 모듈, AP Bluebook 화면, IB 문제 스타일을 그대로 재현했습니다.",
            "풀이 직후 바로 채점 — 모든 SAT·AP·IB 모의고사 문항에 정답과 상세 해설이 제공됩니다.",
            "무료 미리보기 — 회원가입 없이도 과목별 모의고사를 맛볼 수 있어요.",
            "유학생 맞춤 — 아이비리그 재학생이 설계한 학습 흐름으로 실전 감각을 키웁니다.",
          ].map((t) => (
            <li key={t} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>
              <span style={{ color: MINT, flexShrink: 0 }}>✓</span>{t}
            </li>
          ))}
        </ul>

        {/* FAQ — mirrors the JSON-LD FAQPage */}
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 16 }}>
          자주 묻는 질문
        </h2>
        <div style={{ display: "grid", gap: 14 }}>
          {FAQ.map((f) => (
            <div key={f.q} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "18px 20px", background: "rgba(255,255,255,0.02)" }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Q. {f.q}</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", margin: 0, lineHeight: 1.7 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
