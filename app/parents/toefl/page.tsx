import type { Metadata } from "next";
import Link from "next/link";
import PromoBanner from "@/components/parents/PromoBanner";

/**
 * Korean TOEFL landing for the /parents acquisition channel. The main-site
 * /toefl is English; this is its Korean counterpart for 학부모. Both share the
 * same test runner (/toefl/test) — TOEFL content is English regardless.
 */
export const metadata: Metadata = {
  title: "TOEFL 모의고사 — 실제 시험과 똑같이 | InHero 학부모",
  description:
    "실제 TOEFL iBT와 똑같은 형식의 모의고사. Reading · Listening · Speaking · Writing 4개 섹션 전부. 200 크레딧 5회 또는 500 크레딧 무제한으로 실전처럼 연습하세요.",
  alternates: { canonical: "/parents/toefl" },
  robots: { index: false, follow: false },
};

const MINT = "#00FFB2";

const SECTIONS = [
  { tag: "Reading", title: "Reading · 35분", desc: "약 700단어 학술 지문 2개 · 각 10문항(총 20문항). 사실확인·추론·어휘·수사목적·문장단순화·문장삽입·요약 등 실제 문제 유형. 풀이 직후 자동 채점 + 해설.", color: "#1D9E75" },
  { tag: "Listening", title: "Listening · 약 36분", desc: "대화 2 + 강의 3 (총 28문항). 오디오를 듣고 MCQ로 답하세요 — 주제·세부·기능·태도·구성 유형. 채점 후 스크립트 공개.", color: "#7DD3FC" },
  { tag: "Speaking", title: "Speaking · 16분", desc: "4개 과제(독립 1 + 통합 3). 15–30초 준비 → 45–60초 답변, 마이크 녹음 + 음성→텍스트 변환, 루브릭 기반 자가 채점.", color: "#F59E0B" },
  { tag: "Writing", title: "Writing · 약 29분", desc: "통합형(읽기+듣기 요약) + 토론형(의견). 실시간 단어 수 표시와 타이머, 루브릭 기반 자가 채점.", color: "#A78BFA" },
];

const FAQ = [
  { q: "TOEFL 모의고사는 크레딧이 얼마인가요?", a: "TOEFL·SAT 모의고사는 200 크레딧으로 5회 응시할 수 있어요. 500 크레딧 무제한 이용권을 열면 응시 횟수 제한 없이 연습할 수 있습니다." },
  { q: "실제 시험과 형식이 같나요?", a: "실제 TOEFL iBT와 동일하게 — 같은 섹션·문제 유형·타이머로 구성했어요. Listening은 오디오 재생, Speaking은 준비/답변 타이머와 녹음, Writing은 시간 제한과 단어 수를 그대로 재현합니다." },
  { q: "문제는 어떻게 만들어졌나요?", a: "실제 TOEFL iBT의 섹션 구조, Reading 8개 문제 유형, Listening 문제 유형, 시험의 시간 배분을 분석한 뒤, 같은 설계 원리로 완전히 새로 만든 오리지널 연습 문제입니다. 3세트로 모든 유형을 빠짐없이 연습할 수 있어요." },
  { q: "ETS 기출문제인가요?", a: "아니요 — ETS 공식 문제를 복제한 게 아닙니다. 같은 형식·유형·난이도로 정교하게 제작한 연습 문제예요. 그래서 저작권 걱정 없이 실전처럼 마음껏 연습할 수 있습니다." },
];

export default function ParentsToeflLanding() {
  return (
    <div style={{ background: "#05070d", minHeight: "100vh", color: "#e8edf4", fontFamily: "Inter, sans-serif" }}>
      <PromoBanner ctaHref="/toefl/test?pay=1" sticky={false} />
      <div style={{ padding: "48px 22px 120px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,255,178,0.7)", marginBottom: 14 }}>📝 TOEFL iBT · 모의고사</p>
        <h1 style={{ fontSize: "clamp(2rem, 5.4vw, 3.4rem)", fontWeight: 850, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
          TOEFL,<br />실제 시험과 똑같이.
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 28, maxWidth: 660 }}>
          TOEFL iBT 4개 섹션 — <strong style={{ color: "#fff" }}>Reading · Listening · Speaking · Writing</strong> — 을 실제 시험과 똑같은 형식으로:
          자동 채점 + 해설, 리스닝 오디오 재생, 스피킹 녹음, 라이팅 타이머까지. 200 크레딧 5회 또는 500 크레딧 무제한으로 연습하세요.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
          <Link href="/toefl/test" style={{ display: "inline-block", background: MINT, color: "#05070d", borderRadius: 12, padding: "14px 28px", fontWeight: 850, fontSize: 16, textDecoration: "none" }}>
            ▶ 모의고사 시작하기 →
          </Link>
          <Link href="/toefl/sample" style={{ display: "inline-block", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 12, padding: "14px 24px", fontWeight: 800, fontSize: 15, textDecoration: "none" }}>
            🎁 무료 샘플 풀어보기
          </Link>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 40px", lineHeight: 1.65 }}>
          샘플은 <strong style={{ color: "#fff" }}>무료 · 로그인 불필요</strong> — 시작 전에 실제 형식과 타이머를 미리 확인하세요. 전체 시험: <strong style={{ color: "#fff" }}>200 크레딧 = 5회</strong> · <strong style={{ color: "#fff" }}>500 크레딧 = 무제한</strong>
        </p>

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
    </div>
  );
}
