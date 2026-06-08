import Link from "next/link";
import { SAT_FORMS, formCounts } from "@/lib/sat/forms";
import SatHistory from "@/components/sat/SatHistory";

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
  return (
    <div style={{ background: "#05070d", minHeight: "100vh", color: "#e8edf4", padding: "72px 22px 120px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,255,178,0.7)", marginBottom: 14 }}>
          ✏️ DIGITAL SAT · 적응형 모의고사
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 850, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
          실제 Bluebook처럼,<br />적응형으로 풀어본다.
        </h1>
        <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 30, maxWidth: 620 }}>
          디지털 SAT와 동일한 구조의 적응형 모의고사예요. Reading & Writing → Math, 각 섹션이 2개의 타이머 모듈로 진행되고,
          모듈 1 성적에 따라 모듈 2 난이도가 갈립니다. (College Board 기출이 아닌 동일 형식의 오리지널 문항)
        </p>

        <SatHistory theme="dark" />

        {/* Test picker */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {SAT_FORMS.map((f, i) => {
            const c = formCounts(f);
            const full = c.rw >= 50;
            return (
              <Link key={f.id} href={`/sat/test?form=${f.id}`} style={{
                textDecoration: "none", display: "flex", alignItems: "center", gap: 16,
                borderRadius: 16, border: "1px solid rgba(0,255,178,0.22)", background: "rgba(0,255,178,0.04)", padding: "18px 20px",
              }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: MINT, width: 40, flexShrink: 0 }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>
                    Practice Test {i + 1}{full && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 800, color: "#05070d", background: MINT, borderRadius: 999, padding: "2px 8px" }}>FULL-LENGTH</span>}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>R&W {c.rw}문항 · Math {c.math}문항 · 적응형</div>
                </div>
                <span style={{ fontSize: 13.5, fontWeight: 800, color: MINT }}>시작하기 →</span>
              </Link>
            );
          })}
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
          ※ 예상 점수는 적응형 경로를 반영한 추정치이며 실제 College Board 점수와 다를 수 있어요. Practice Test 1은 풀 렝스(R&W 54 · Math 44), Test 2·3은 추가 세트로 계속 확장됩니다.
        </p>
      </div>
    </div>
  );
}
