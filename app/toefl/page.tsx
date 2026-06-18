import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TOEFL 모의고사 — 실제 시험처럼 무료로 | InHero",
  description:
    "TOEFL iBT 모의고사를 실제 시험처럼. Reading·Listening·Speaking·Writing 4개 섹션 — 자동 채점·해설, 듣기 음원 재생, 말하기 녹음, 쓰기 타이머까지 무료로 연습하세요.",
  keywords: ["TOEFL 모의고사", "토플 모의고사", "TOEFL iBT 연습", "토플 실전", "TOEFL Reading Listening Speaking Writing", "무료 토플", "InHero"],
  alternates: { canonical: "/toefl" },
  openGraph: {
    type: "website",
    url: "https://inheroedu.com/toefl",
    title: "TOEFL 모의고사 — 실제 시험처럼 무료로",
    description: "TOEFL iBT 4개 섹션을 실제 형식으로 — 자동 채점·해설·음원·녹음·타이머.",
    siteName: "InHero",
  },
};

const MINT = "#00FFB2";

const SECTIONS = [
  { tag: "Reading", title: "독해", desc: "학술 지문 + MCQ(사실·추론·어휘·문장삽입·요약). 풀이 직후 자동 채점·해설.", color: "#1D9E75" },
  { tag: "Listening", title: "듣기", desc: "대화·강의를 음성으로 재생(브라우저 TTS)하고 MCQ로 풀이. 스크립트는 채점 후 공개.", color: "#7DD3FC" },
  { tag: "Speaking", title: "말하기", desc: "4개 과제 · 준비/응답 타이머 · 마이크 녹음 후 바로 재생해 점검.", color: "#F59E0B" },
  { tag: "Writing", title: "쓰기", desc: "Integrated + Academic Discussion · 실전 타이머 · 실시간 단어 수.", color: "#A78BFA" },
];

const FAQ = [
  { q: "TOEFL 모의고사를 무료로 풀 수 있나요?", a: "네. InHero에서 TOEFL iBT 4개 섹션을 무료로 연습할 수 있고, Reading·Listening은 풀이 직후 자동 채점과 해설을 제공합니다." },
  { q: "실제 시험과 형식이 같나요?", a: "실제 TOEFL iBT와 동일한 섹션·문제 유형·타이머로 구성했습니다. 듣기는 음원 재생, 말하기는 준비/응답 타이머와 녹음, 쓰기는 제한 시간과 단어 수를 그대로 재현합니다." },
  { q: "문항은 어떻게 만들어지나요?", a: "실제 TOEFL iBT의 섹션 구조, 8가지 독해 문제 유형(사실·부정 사실·추론·수사적 목적·어휘·문장 단순화·문장 삽입·요약)과 듣기 문항 유형(요지·기능·태도·구조·연결), 그리고 시험 시간 배분을 분석해, 같은 출제 원리를 적용해 새로 만든 오리지널 실전 문항입니다. 3회차 풀세트로 유형을 빠짐없이 연습할 수 있어요." },
  { q: "공식 기출문제인가요?", a: "ETS의 공식 기출을 복제한 것이 아니라, 동일한 형식·유형·난이도로 정교하게 출제한 연습 문제입니다. 그래서 저작권 걱정 없이 실전처럼 무제한 연습할 수 있어요." },
];

export default function ToeflLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": "https://inheroedu.com/toefl", name: "TOEFL 모의고사", url: "https://inheroedu.com/toefl",
        description: "TOEFL iBT 모의고사를 실제 시험처럼 — Reading·Listening·Speaking·Writing 4개 섹션 무료 연습." },
      { "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <div style={{ background: "#05070d", minHeight: "100vh", color: "#e8edf4", padding: "72px 22px 120px", fontFamily: "Inter, sans-serif" }}>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,255,178,0.7)", marginBottom: 14 }}>📝 TOEFL iBT · 실전 모의고사</p>
        <h1 style={{ fontSize: "clamp(2rem, 5.4vw, 3.4rem)", fontWeight: 850, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
          TOEFL 모의고사,<br />실제 시험처럼.
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 28, maxWidth: 660 }}>
          TOEFL iBT의 <strong style={{ color: "#fff" }}>Reading·Listening·Speaking·Writing</strong> 네 섹션을 실제 시험 형식 그대로 —
          자동 채점·해설, 듣기 음원 재생, 말하기 녹음, 쓰기 타이머까지. 무료로 연습하세요.
        </p>

        <Link href="/toefl/test" style={{ display: "inline-block", background: MINT, color: "#05070d", borderRadius: 12, padding: "14px 28px", fontWeight: 850, fontSize: 16, textDecoration: "none", marginBottom: 40 }}>
          ▶ 모의고사 시작하기 (로그인 · 500 크레딧으로 3회차 전체)
        </Link>

        <div style={{ display: "grid", gap: 14, marginBottom: 44 }}>
          {SECTIONS.map((s) => (
            <div key={s.tag} style={{ display: "flex", alignItems: "center", gap: 18, borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", padding: "18px 20px" }}>
              <span style={{ fontSize: 12, fontWeight: 900, color: "#05070d", background: s.color, borderRadius: 8, padding: "6px 10px", flexShrink: 0 }}>{s.tag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{s.title}</div>
                <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", marginTop: 4, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 16 }}>자주 묻는 질문</h2>
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
