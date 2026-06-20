"use client";

/**
 * /parents/sat — WHITE parent-portal SAT tab. Lists the available adaptive
 * practice tests; each links into the shared full-screen Bluebook runner.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ParentHubShell from "@/components/parents/ParentHubShell";
import { SAT_FULL_LENGTH_FORMS, formCounts } from "@/lib/sat/forms";
import SatHistory from "@/components/sat/SatHistory";
import CreditGate from "@/components/parents/CreditGate";
import { CREDIT_COSTS } from "@/lib/credits";
import { mockRemaining, mockTier, MOCK_PACK_LIMIT } from "@/lib/mockAccess";

const GREEN = "#00b85f";

const FEATURES = [
  "적응형 2단계 모듈 (모듈 1 성적 → 모듈 2 난이도)",
  "모듈별 타이머 · 종료 시 자동 제출",
  "Mark for review · 문제 네비게이터 · 리뷰 화면",
  "Math용 Desmos 그래핑 계산기 내장",
  "객관식 + 주관식(grid-in) 입력",
  "400–1600 예상 점수 + 문제를 풀면 문항별 단계별 상세 해설",
];

// Trust signal — defensible (deterministic answer keys + reviewed solutions),
// while staying clearly distinct from College Board's official tests.
function VerifiedBadge() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
      background: "#e9f9f0", border: `1px solid ${GREEN}55`, borderRadius: 12,
      padding: "12px 16px", marginBottom: 18,
    }}>
      <span style={{ fontSize: 12, fontWeight: 900, color: "#fff", background: GREEN, borderRadius: 999, padding: "4px 10px", whiteSpace: "nowrap" }}>✓ 검증 완료</span>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0a6b3d", lineHeight: 1.5 }}>
        실제 시험과 동일 형식 · 전 문항 정답·해설 검수 완료 — 풀면 문항별 상세 해설이 바로 나옵니다.
      </span>
    </div>
  );
}

export default function SatClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const shouldOpenCharge = params.has("pay") || params.has("charge");
    if (!shouldOpenCharge) return;

    params.delete("pay");
    params.delete("charge");
    const nextQuery = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`);

    const tier = mockTier("sat");
    const rem = mockRemaining("sat");
    if (tier === "none" || rem === 0) {
      const t = window.setTimeout(() => window.dispatchEvent(new Event("inhero:open-charge")), 500);
      return () => window.clearTimeout(t);
    }
  }, []);

  const startTest = (formId: string) => {
    const tier = mockTier("sat");
    const rem = mockRemaining("sat");
    if (tier === "none") {
      window.alert("SAT 모의고사 이용권이 필요해요. 200 크레딧 5회 또는 500 크레딧 무제한 중 선택해 주세요.");
      window.dispatchEvent(new CustomEvent("inhero:open-charge"));
      return;
    }
    if (rem === 0) {
      window.alert("5회 이용권을 모두 사용했어요. '무제한' 이용권(500 크레딧)으로 업그레이드하면 계속 응시할 수 있어요.");
      window.dispatchEvent(new CustomEvent("inhero:open-charge"));
      return;
    }
    const attempt = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    router.push(`/sat/test?form=${encodeURIComponent(formId)}&attempt=${encodeURIComponent(attempt)}`);
  };

  return (
    <ParentHubShell
      eyebrow="✏️ 디지털 SAT 모의고사"
      title="실제 Bluebook처럼, 적응형으로 연습하세요"
      intro={
        <>
          디지털 SAT와 동일한 구조의 <strong>적응형 모의고사</strong>입니다. Reading &amp; Writing → Math 순으로,
          각 섹션이 타이머가 있는 2개의 모듈로 진행되고 모듈 1 성적에 따라 모듈 2 난이도가 갈려요.
          <br />
          <span style={{ fontSize: 12.5, color: "#64748b" }}>실제 디지털 SAT의 적응형 2단계 모듈 구조와 문제 유형·시간 배분을 그대로 적용해 만든 오리지널 실전 문항입니다. 예상 점수는 추정치예요. <span style={{ color: "#94a3b8" }}>(College Board 공식 기출 복제 아님)</span></span>
        </>
      }
    >
      <VerifiedBadge />

      {/* Free sample — no login, no credits. Lets prospective buyers feel the
          real Bluebook chrome/timer before the paid gate. */}
      <Link href="/sat/sample" style={{
        display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", textDecoration: "none",
        background: "#f0fdf6", border: `1px solid ${GREEN}66`, borderRadius: 12, padding: "13px 16px", marginBottom: 18,
      }}>
        <span style={{ fontSize: 12, fontWeight: 900, color: "#fff", background: GREEN, borderRadius: 999, padding: "4px 10px", whiteSpace: "nowrap" }}>🎁 무료 샘플</span>
        <span style={{ flex: 1, minWidth: 180, fontSize: 13.5, fontWeight: 700, color: "#0a6b3d", lineHeight: 1.5 }}>
          결제 전에 <strong>무료 샘플</strong>로 실제 형식·타이머·해설을 먼저 풀어보세요 — 로그인 불필요.
        </span>
        <span style={{ fontSize: 13.5, fontWeight: 800, color: "#047a45", whiteSpace: "nowrap" }}>샘플 풀어보기 →</span>
      </Link>

      <SatHistory theme="light" />

      {/* Test picker — paid (ULTRA tier). Unlock once to access all forms. */}
      <CreditGate
        gateKey="parents:sat-mock:5"
        cost={CREDIT_COSTS.MOCK_5PACK}
        bundleKey="parents:sat-mock"
        bundleCost={CREDIT_COSTS.SAT_MOCK}
        bundleLabel="무제한"
        title="SAT 모의고사 이용권"
        desc="College Board와 동일한 적응형 디지털 SAT 모의고사. 5회 이용권(200) 또는 무제한(500) 중 선택하세요."
        fullBlur
        allowAdminBypass={false}
      >
      {mounted && (() => {
        const tier = mockTier("sat");
        const rem = mockRemaining("sat");
        return (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f7f8fa", border: "1px solid #e6e8ec", borderRadius: 999, padding: "7px 14px", marginBottom: 14, fontSize: 12.5, fontWeight: 800 }}>
            {tier === "unlimited"
              ? <span style={{ color: "#047a45" }}>♾️ 무제한 이용권 · 횟수 제한 없음</span>
              : <span style={{ color: (rem ?? 0) > 0 ? "#b45309" : "#dc2626" }}>🎟️ 5회 이용권 · 남은 횟수 {rem ?? 0}/{MOCK_PACK_LIMIT}</span>}
          </div>
        );
      })()}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {SAT_FULL_LENGTH_FORMS.map((f, i) => {
          const c = formCounts(f);
          return (
            <button key={f.id} onClick={() => startTest(f.id)} style={{
              textAlign: "left", cursor: "pointer", width: "100%", display: "flex", alignItems: "center", gap: 16,
              borderRadius: 14, border: "1px solid #e6e8ec", background: "#fff", padding: "18px 20px",
              boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
            }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: GREEN, width: 36, flexShrink: 0 }}>{i + 1}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1f" }}>
                  Practice Test {i + 1}
                  <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 800, color: "#fff", background: GREEN, borderRadius: 999, padding: "2px 8px" }}>풀 렝스</span>
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 3 }}>R&amp;W {c.rw}문항 · Math {c.math}문항 · 적응형</div>
              </div>
              <span style={{ fontSize: 13.5, fontWeight: 800, color: GREEN }}>시작하기 →</span>
            </button>
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
