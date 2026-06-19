import type { Metadata } from "next";
import Link from "next/link";
import { aiDisclosure, merchantInfo } from "@/lib/legal";

export const metadata: Metadata = {
  title: "AI 생성 콘텐츠 안내",
  description:
    "InHero의 디지털 교재(Originals)와 한국어 핵심 노트는 아이비리그 재학생이 설계한 요점정리 프롬프트로 AI가 생성하고 사람이 검수한 학습 보조 자료입니다. 제작 방식·검수·한계를 안내합니다.",
  alternates: { canonical: "/ai-disclosure" },
};

export default function AiDisclosurePage() {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "120px 22px 100px",
        color: "#1a1a1f",
        fontFamily: "'Inter', sans-serif",
        lineHeight: 1.8,
      }}
    >
      <p style={{ color: "#047a45", fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>
        InHero Legal
      </p>
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>
        {aiDisclosure.pageTitle}
      </h1>
      <p style={{ fontSize: 15, color: "#334155", marginBottom: 28 }}>{aiDisclosure.pageIntro}</p>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          border: "1px solid #cfe9dc",
          background: "#f1faf5",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 34,
          fontSize: 14,
          color: "#1a4a36",
        }}
      >
        <span style={{ fontSize: 18, flexShrink: 0 }}>🤖</span>
        <span>{aiDisclosure.inline}</span>
      </div>

      {aiDisclosure.sections.map((s) => (
        <section key={s.title} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{s.title}</h2>
          <p style={{ fontSize: 14.5, color: "#334155" }}>{s.body}</p>
        </section>
      ))}

      <section style={{ borderTop: "1px solid #e6e8ec", paddingTop: 22, marginTop: 8 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>문의</h2>
        <p style={{ fontSize: 14.5, color: "#334155" }}>
          본 안내나 콘텐츠 오류에 대한 문의는 이메일(
          <a href={`mailto:${merchantInfo.email}`} style={{ color: "#047a45" }}>{merchantInfo.email}</a>
          )로 보내주시면 신속히 검토·반영하겠습니다.
        </p>
        <p style={{ marginTop: 18, fontSize: 13 }}>
          <Link href="/terms" style={{ color: "#047a45" }}>이용약관</Link>
          <span style={{ color: "#cbd5e1", margin: "0 8px" }}>|</span>
          <Link href="/privacy" style={{ color: "#047a45" }}>개인정보처리방침</Link>
          <span style={{ color: "#cbd5e1", margin: "0 8px" }}>|</span>
          <Link href="/refund" style={{ color: "#047a45" }}>환불정책</Link>
          <span style={{ color: "#cbd5e1", margin: "0 8px" }}>|</span>
          <Link href="/ai-disclosure" style={{ color: "#047a45" }}>AI 생성 콘텐츠 안내</Link>
        </p>
      </section>
    </main>
  );
}
