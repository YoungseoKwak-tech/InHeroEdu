import type { Metadata } from "next";
import Link from "next/link";
import HomeHeroDualPath from "@/components/landing/HomeHeroDualPath";

export const metadata: Metadata = {
  title: "인히어로(InHero) | AI 기반 AP·SAT·미국 입시 학습 플랫폼",
  description:
    "인히어로(InHero)는 Ivy League 학생 강의와 AI 학습 패턴 분석을 결합해 AP, SAT, IB, 미국 입시 준비를 돕는 영어 기반 교육 플랫폼입니다.",
  keywords: [
    "인히어로",
    "인히어로 에듀",
    "InHero",
    "미국 입시",
    "AP 강의",
    "SAT 학습",
    "IB 준비",
    "아이비리그 튜터",
    "AI 교육 플랫폼",
  ],
  alternates: {
    canonical: "/kr",
    languages: {
      en: "/",
      ko: "/kr",
    },
  },
  openGraph: {
    title: "인히어로(InHero) | AI 기반 AP·SAT·미국 입시 학습 플랫폼",
    description:
      "인히어로(InHero)는 Ivy League 학생 강의와 AI 학습 패턴 분석을 결합해 AP, SAT, IB, 미국 입시 준비를 돕는 영어 기반 교육 플랫폼입니다.",
    type: "website",
    url: "https://inheroedu.com/kr",
    locale: "ko_KR",
    siteName: "InHero",
  },
  twitter: {
    card: "summary_large_image",
    title: "인히어로(InHero) | AI 기반 AP·SAT·미국 입시 학습 플랫폼",
    description:
      "인히어로(InHero)는 Ivy League 학생 강의와 AI 학습 패턴 분석을 결합해 AP, SAT, IB, 미국 입시 준비를 돕는 영어 기반 교육 플랫폼입니다.",
  },
};

const sections = [
  "인히어로(InHero)는 AP, SAT, IB, 미국 입시를 준비하는 학생들을 위한 영어 기반 AI 학습 플랫폼입니다.",
  "InHero는 Ivy League 학생들이 제작한 강의와 AI 학습 메모리를 결합해 학생이 어디에서 막히고, 어떤 방식으로 문제를 풀며, 어떤 개념에서 반복적으로 흔들리는지 기록합니다.",
  "단순한 온라인 강의가 아니라, 학생의 학습 패턴과 사고 흐름을 장기적으로 읽어 미국식 학업과 입시 방향성을 함께 설계하는 시스템입니다.",
  "현재 플랫폼의 수업, 문제풀이, AI 기능은 영어 기반으로 제공됩니다. 한국 학생과 학부모를 위한 안내는 이 페이지와 공식 블로그를 통해 제공됩니다.",
];

export default function KoreanLandingPage() {
  return (
    <>
      {/* Dual-path hero at the top — Korean copy via locale prop */}
      <HomeHeroDualPath locale="ko" />

      {/* Existing SEO/explainer content kept below so canonical content and
          keywords (인히어로, AP 강의, SAT 학습…) stay intact for organic search. */}
      <div
        style={{
          background:
            "radial-gradient(circle at top, rgba(0,255,136,0.12), transparent 32%), #05070C",
          color: "#F5F7FA",
          padding: "72px 24px",
        }}
      >
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "#00FF88",
              marginBottom: "14px",
              textTransform: "uppercase",
            }}
          >
            Korean Brand Guide
          </p>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              lineHeight: 1.05,
              fontWeight: 800,
              marginBottom: "16px",
            }}
          >
            인히어로(InHero)
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.8,
              color: "rgba(245,247,250,0.74)",
              maxWidth: "780px",
            }}
          >
            미국식 학업과 입시를 준비하는 학생을 위해 설계된 영어 기반 AI 학습 플랫폼입니다.
          </p>
        </div>

        <section
          style={{
            display: "grid",
            gap: "18px",
            padding: "28px",
            borderRadius: "24px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "28px",
          }}
        >
          {sections.map((paragraph) => (
            <p
              key={paragraph}
              style={{
                margin: 0,
                fontSize: "16px",
                lineHeight: 1.9,
                color: "rgba(245,247,250,0.78)",
              }}
            >
              {paragraph}
            </p>
          ))}
        </section>

        <section
          style={{
            padding: "28px",
            borderRadius: "24px",
            background: "rgba(0,255,136,0.06)",
            border: "1px solid rgba(0,255,136,0.16)",
            marginBottom: "28px",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px" }}>
            영어 기반 제품이라는 점
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: 1.8,
              color: "rgba(245,247,250,0.76)",
            }}
          >
            InHero의 실제 수업 화면, AI 기능, 문제풀이 경험, 강의 구조는 영어권 학업 환경에 맞춰
            설계되어 있습니다. AP, SAT, IB, 미국 대학 진학을 준비하는 학생에게 가장 자연스럽게
            맞도록 만든 영어 우선 플랫폼입니다.
          </p>
        </section>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <Link
            href="/kr/courses"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 18px",
              borderRadius: "12px",
              background: "#00FF88",
              color: "#02120A",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            한국어 강의 트랙 보기
          </Link>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 18px",
              borderRadius: "12px",
              background: "transparent",
              color: "#F5F7FA",
              textDecoration: "none",
              fontWeight: 700,
              border: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            영어 메인 사이트 보기
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
