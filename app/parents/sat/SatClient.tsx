"use client";

/**
 * /parents/sat — WHITE parent-portal SAT tab. Lists the available adaptive
 * practice tests; each links into the shared full-screen Bluebook runner.
 */

import Link from "next/link";
import ParentHubShell from "@/components/parents/ParentHubShell";
import { SAT_FORMS, formCounts } from "@/lib/sat/forms";
import SatHistory from "@/components/sat/SatHistory";
import CreditGate from "@/components/parents/CreditGate";
import { CREDIT_COSTS } from "@/lib/credits";

const GREEN = "#00b85f";

const FEATURES = [
  "적응형 2단계 모듈 (모듈 1 성적 → 모듈 2 난이도)",
  "모듈별 타이머 · 종료 시 자동 제출",
  "Mark for review · 문제 네비게이터 · 리뷰 화면",
  "Math용 Desmos 그래핑 계산기 내장",
  "객관식 + 주관식(grid-in) 입력",
  "400–1600 예상 점수 + 전 문제 해설",
];

export default function SatClient() {
  return (
    <ParentHubShell
      eyebrow="✏️ 디지털 SAT 모의고사"
      title="실제 Bluebook처럼, 적응형으로 연습하세요"
      intro={
        <>
          디지털 SAT와 동일한 구조의 <strong>적응형 모의고사</strong>입니다. Reading &amp; Writing → Math 순으로,
          각 섹션이 타이머가 있는 2개의 모듈로 진행되고 모듈 1 성적에 따라 모듈 2 난이도가 갈려요.
          <br />
          <span style={{ fontSize: 12.5, color: "#94a3b8" }}>※ College Board 기출이 아닌 동일 형식의 오리지널 문항입니다. 예상 점수는 추정치예요.</span>
        </>
      }
    >
      <SatHistory theme="light" />

      {/* Test picker — paid (ULTRA tier). Unlock once to access all forms. */}
      <CreditGate
        gateKey="parents:sat-mock"
        cost={CREDIT_COSTS.SAT_MOCK}
        title="SAT 모의고사 패키지"
        desc="College Board와 동일한 적응형 디지털 SAT 모의고사 전체 이용권입니다. 한 번 열면 모든 회차를 계속 응시할 수 있어요."
      >
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {SAT_FORMS.map((f, i) => {
          const c = formCounts(f);
          const full = c.rw >= 50;
          return (
            <Link key={f.id} href={`/sat/test?form=${f.id}`} style={{
              textDecoration: "none", display: "flex", alignItems: "center", gap: 16,
              borderRadius: 14, border: "1px solid #e6e8ec", background: "#fff", padding: "18px 20px",
              boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
            }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: GREEN, width: 36, flexShrink: 0 }}>{i + 1}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1f" }}>
                  Practice Test {i + 1}
                  {full && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 800, color: "#fff", background: GREEN, borderRadius: 999, padding: "2px 8px" }}>풀 렝스</span>}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 3 }}>R&amp;W {c.rw}문항 · Math {c.math}문항 · 적응형</div>
              </div>
              <span style={{ fontSize: 13.5, fontWeight: 800, color: GREEN }}>시작하기 →</span>
            </Link>
          );
        })}
      </div>
      </CreditGate>

      <div style={{ borderRadius: 14, border: "1px solid #e6e8ec", background: "#f7f8fa", padding: "18px 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1a1f", marginBottom: 10 }}>실제 시험과 동일한 기능</div>
        <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "grid", gap: 8 }}>
          {FEATURES.map((t) => (
            <li key={t} style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.5, paddingLeft: 18, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: GREEN, fontWeight: 800 }}>✓</span>{t}
            </li>
          ))}
        </ul>
      </div>
    </ParentHubShell>
  );
}
