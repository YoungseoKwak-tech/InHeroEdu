"use client";

/**
 * /parents/cases — 합격 사례 100선.
 *
 * COMPOSITE, FICTIONAL admit profiles synthesized from public US-admissions
 * patterns (NOT real individuals / scraped essays). Distinct from the founder's
 * own exclusive 합격 수기·활동·에세이 (real, insider). A prominent disclaimer
 * keeps this legally safe (no copyright/PII). Filter by major / archetype / tier.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { ADMIT_CASES, type AdmitCase } from "@/lib/data/admitCases";

const GREEN = "#00b85f";
const TIER_LABEL: Record<string, string> = { ivy: "아이비+", t20: "Top 20", t50: "Top 50" };
const TIER_COLOR: Record<string, string> = { ivy: "#7c3aed", t20: "#2563eb", t50: "#0f766e" };

export default function CasesClient() {
  const [major, setMajor] = useState<string>("all");
  const [arch, setArch] = useState<string>("all");
  const [tier, setTier] = useState<string>("all");

  const majors = useMemo(() => [...new Set(ADMIT_CASES.map((c) => c.majorKo))].sort(), []);
  const archs = useMemo(() => [...new Set(ADMIT_CASES.map((c) => c.archetype))], []);

  const filtered = ADMIT_CASES.filter(
    (c) => (major === "all" || c.majorKo === major) && (arch === "all" || c.archetype === arch) && (tier === "all" || c.tier === tier)
  );

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents/story" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 합격까지의 모든 것</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: GREEN }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 100px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", letterSpacing: "0.04em", marginBottom: 10 }}>🗂️ 합격 사례 100선</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
          유형별 합격 프로필 <span style={{ color: "#2563eb" }}>100선</span>
        </h1>
        <p style={{ fontSize: 15.5, color: "#475569", lineHeight: 1.8, marginBottom: 18 }}>
          미국 입시에서 반복적으로 통하는 <strong>합격 패턴</strong>을 전공·유형별로 정리했습니다. 각 사례는 활동 구성, 에세이 접근법, 그리고 <strong>"왜 통했는지"</strong>를 함께 보여줍니다.
        </p>

        {/* Legal disclaimer — prominent */}
        <div style={{ background: "#fffbeb", border: "1.5px solid #f1d27a", borderRadius: 12, padding: "13px 16px", marginBottom: 26, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 16 }}>⚖️</span>
          <p style={{ margin: 0, fontSize: 12.5, color: "#92591a", lineHeight: 1.65 }}>
            본 100선은 공개된 합격 경향을 바탕으로 <strong>새로 재구성한 가상의 예시</strong>입니다. 특정 실존 인물·실제 에세이 원문·개인정보가 아니며, 입시 전략을 이해하기 위한 참고용입니다.
            (InHero의 <strong>실제 합격 수기·활동·에세이</strong>는 <Link href="/parents/story" style={{ color: "#a16207", textDecoration: "underline" }}>합격까지의 모든 것</Link>에서 별도로 제공됩니다.)
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 22 }}>
          <Select label="전공" value={major} onChange={setMajor} options={[["all", "전체 전공"], ...majors.map((m) => [m, m] as [string, string])]} />
          <Select label="유형" value={arch} onChange={setArch} options={[["all", "전체 유형"], ...archs.map((a) => [a, a] as [string, string])]} />
          <Select label="티어" value={tier} onChange={setTier} options={[["all", "전체"], ["ivy", "아이비+"], ["t20", "Top 20"], ["t50", "Top 50"]]} />
          <span style={{ alignSelf: "center", fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>{filtered.length}개 사례</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map((c) => <CaseCard key={c.id} c={c} />)}
          {filtered.length === 0 && <p style={{ color: "#94a3b8", fontSize: 14, textAlign: "center", padding: 40 }}>해당 조건의 사례가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#fff", border: "1px solid #e2e6ea", borderRadius: 9, padding: "7px 11px" }}>
      <span style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8" }}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ border: "none", outline: "none", background: "transparent", fontSize: 13.5, fontWeight: 600, color: "#1a1a1f", cursor: "pointer" }}>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}

function CaseCard({ c }: { c: AdmitCase }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 16, padding: "20px 22px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: "#fff", background: TIER_COLOR[c.tier], borderRadius: 6, padding: "3px 9px" }}>{TIER_LABEL[c.tier]}</span>
        <span style={{ fontSize: 13.5, fontWeight: 800, color: "#1a1a1f" }}>{c.majorKo}</span>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>· {c.majorEn}</span>
        <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: "#2563eb", background: "#eef3fb", borderRadius: 6, padding: "3px 9px" }}>{c.archetype}</span>
      </div>

      <p style={{ margin: "0 0 12px", fontSize: 14.5, color: "#334155", lineHeight: 1.6 }}>
        <strong style={{ color: "#1a1a1f" }}>스파이크</strong> — {c.spike}
      </p>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: "#64748b", marginBottom: 6 }}>대표 활동</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: "#475569", lineHeight: 1.75 }}>
          {c.activities.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </div>

      <div style={{ background: "#f7f8fa", borderRadius: 10, padding: "12px 14px", marginBottom: 12 }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: "#2563eb", marginBottom: 4 }}>✍️ 에세이 접근법</div>
        <p style={{ margin: 0, fontSize: 13.5, color: "#334155", lineHeight: 1.6 }}>{c.essayAngle}</p>
      </div>

      <div>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: "#16a34a", marginBottom: 5 }}>✅ 왜 통했나</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: "#475569", lineHeight: 1.75 }}>
          {c.whyItWorked.map((w, i) => <li key={i}>{w}</li>)}
        </ul>
      </div>
    </div>
  );
}
