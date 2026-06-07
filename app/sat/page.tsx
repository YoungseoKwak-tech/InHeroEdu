import Link from "next/link";
import { SAT_FORM_1 } from "@/lib/sat/form1";

export const metadata = {
  title: "디지털 SAT 적응형 모의고사 — InHero",
  description:
    "실제 Bluebook처럼 — 적응형 2단계 모듈, 모듈별 타이머, Mark for review, Desmos 그래핑 계산기, grid-in, 400–1600 예상 점수까지. 무료로 풀어보세요.",
};

const MINT = "#00FFB2";

const FEATURES = [
  { icon: "🧭", title: "적응형 2단계 모듈", desc: "모듈 1 성적에 따라 모듈 2 난이도가 갈리는 실제 디지털 SAT 방식 그대로." },
  { icon: "⏱️", title: "모듈별 타이머", desc: "각 모듈에 제한 시간 — 시간 종료 시 자동 제출. 실전 페이스 훈련." },
  { icon: "🚩", title: "Mark for review", desc: "나중에 볼 문제 표시 + 문제 네비게이터 + 제출 전 리뷰 화면." },
  { icon: "🖩", title: "Desmos 계산기", desc: "Math 모듈에서 실제 시험과 동일한 Desmos 그래핑 계산기 내장." },
  { icon: "🔢", title: "MCQ + Grid-in", desc: "객관식과 주관식(grid-in) 입력 모두 지원 — 분수·소수 정답 인정." },
  { icon: "📊", title: "400–1600 예상 점수", desc: "섹션별 점수 + 적응형 경로를 반영한 총점 추정 + 전 문제 해설." },
];

export default function SatLandingPage() {
  const rwTotal = SAT_FORM_1.rw.m1.length + SAT_FORM_1.rw.m2easy.length;
  const mathTotal = SAT_FORM_1.math.m1.length + SAT_FORM_1.math.m2easy.length;

  return (
    <div style={{ background: "#05070d", minHeight: "100vh", color: "#e8edf4", padding: "72px 22px 120px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,255,178,0.7)", marginBottom: 14 }}>
          ✏️ DIGITAL SAT · 적응형 모의고사
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 850, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
          실제 Bluebook처럼,<br />적응형으로 풀어본다.
        </h1>
        <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 28, maxWidth: 620 }}>
          디지털 SAT와 동일한 구조의 적응형 모의고사예요. Reading & Writing → Math, 각 섹션이 2개의 타이머 모듈로 진행되고,
          모듈 1 성적에 따라 모듈 2 난이도가 갈립니다. (College Board 기출이 아닌 동일 형식의 오리지널 문항)
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
          <Link href="/sat/test" style={{ textDecoration: "none", background: MINT, color: "#05070d", fontWeight: 850, fontSize: 15, borderRadius: 999, padding: "14px 30px" }}>
            모의고사 시작하기 →
          </Link>
          <span style={{ display: "inline-flex", alignItems: "center", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            Practice Test 1 · R&W {rwTotal}문항 · Math {mathTotal}문항 · 적응형
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "18px 18px" }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{f.title}</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginTop: 30 }}>
          ※ 예상 점수는 적응형 경로를 반영한 추정치이며 실제 College Board 점수와 다를 수 있어요. v1은 Practice Test 1 한 세트로 시작하고, 문항은 계속 추가됩니다.
        </p>
      </div>
    </div>
  );
}
