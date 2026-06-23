"use client";

/**
 * /parents/cases — 합격 사례 (실제 보도 기반).
 *
 * REAL admit stories that the students themselves made public in major news.
 * Facts summarized in our own words + a source link; NO essay text reproduced.
 * Distinct from the founder's own exclusive 합격 수기·활동·에세이. Filter by
 * field / major. The full list is gated at 25 credits (2 free previews).
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CreditGate from "@/components/parents/CreditGate";
import { type AdmitCase } from "@/lib/data/admitCases";
import { CREDIT_EVENT } from "@/lib/credits";
import { authFetch } from "@/lib/client-auth";

const GREEN = "#00b85f";

export default function CasesClient() {
  const [major, setMajor] = useState("all");
  const [field, setField] = useState("all");
  // Served by /api/parents/cases — non-holders only RECEIVE the 2 previews, so
  // the paid list never ships to the browser. Re-fetch on a credit change so a
  // fresh unlock pulls the full set.
  const [cases, setCases] = useState<AdmitCase[]>([]);
  useEffect(() => {
    const load = () => authFetch("/api/parents/cases").then((r) => r.json())
      .then((d) => setCases(Array.isArray(d?.cases) ? d.cases : [])).catch(() => {});
    load();
    window.addEventListener(CREDIT_EVENT, load);
    return () => window.removeEventListener(CREDIT_EVENT, load);
  }, []);

  const majors = useMemo(() => [...new Set(cases.map((c) => c.majorKo))].sort(), [cases]);
  const fields = useMemo(() => [...new Set(cases.map((c) => c.field))], [cases]);

  const filtered = cases.filter(
    (c) => (major === "all" || c.majorKo === major) && (field === "all" || c.field === field)
  );

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents/story" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 합격까지의 모든 것</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: GREEN }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px 100px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", letterSpacing: "0.04em", marginBottom: 10 }}>🗂️ 실제 합격 사례</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
          언론에 공개된 <span style={{ color: "#2563eb" }}>실제 합격생</span> 사례
        </h1>
        <p style={{ fontSize: 15.5, color: "#475569", lineHeight: 1.8, marginBottom: 18 }}>
          본인이 직접 언론에 공개한 <strong>실제 합격생</strong>들의 전공·활동·결과를, <strong>"왜 통했는지"</strong> 분석과 함께 정리했습니다. 각 사례마다 <strong>출처 링크</strong>를 답니다.
        </p>

        {/* Legal disclaimer — prominent */}
        <div style={{ background: "#fffbeb", border: "1.5px solid #f1d27a", borderRadius: 12, padding: "13px 16px", marginBottom: 26, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 16 }}>⚖️</span>
          <p style={{ margin: 0, fontSize: 12.5, color: "#92591a", lineHeight: 1.65 }}>
            본 사례들은 <strong>본인이 직접 언론·공개 매체에 공개한 실제 합격생</strong>의 정보를, 공개된 <strong>사실(학교·활동·결과)</strong>만 우리 말로 정리하고 <strong>출처를 명시</strong>한 것입니다.
            에세이 원문은 포함하지 않으며, 분석 코멘트는 InHero의 해석입니다. (InHero의 <strong>독점 합격 수기·활동·에세이</strong>는 <Link href="/parents/story" style={{ color: "#a16207", textDecoration: "underline" }}>합격까지의 모든 것</Link>에서 별도로 제공됩니다.)
          </p>
        </div>

        {/* Free preview — 2 sample cases */}
        <div style={{ fontSize: 12.5, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.04em", margin: "0 0 10px" }}>무료 미리보기</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 26 }}>
          {cases.slice(0, 2).map((c) => <CaseCard key={c.id} c={c} />)}
        </div>

        <CreditGate
          gateKey="res:/parents/cases"
          cost={25}
          title="🗂️ 실제 합격 사례 전체 잠금해제 (25 크레딧)"
          desc="전공·분야로 거를 수 있는 실제 합격생 사례 전체를 열람합니다. 위 미리보기 2개는 무료예요. (언론 공개 사실 + 출처 명시 · 에세이 원문 미포함)"
        >
          {/* Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 22 }}>
            <Select label="전공" value={major} onChange={setMajor} options={[["all", "전체 전공"], ...majors.map((m) => [m, m] as [string, string])]} />
            <Select label="분야" value={field} onChange={setField} options={[["all", "전체 분야"], ...fields.map((f) => [f, f] as [string, string])]} />
            <span style={{ alignSelf: "center", fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>{filtered.length}개 사례</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.map((c) => <CaseCard key={c.id} c={c} />)}
            {filtered.length === 0 && <p style={{ color: "#94a3b8", fontSize: 14, textAlign: "center", padding: 40 }}>해당 조건의 사례가 없습니다.</p>}
          </div>
        </CreditGate>
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
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
        <span style={{ fontSize: 16.5, fontWeight: 850, color: "#1a1a1f" }}>{c.name}</span>
        <span style={{ fontSize: 12.5, color: "#94a3b8" }}>· {c.year}</span>
        <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: "#2563eb", background: "#eef3fb", borderRadius: 6, padding: "3px 9px" }}>{c.field}</span>
      </div>
      <div style={{ fontSize: 12.5, color: "#64748b", marginBottom: 12 }}>{c.location}</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        <Pill label="전공" value={c.majorKo} />
        <Pill label="합격" value={c.admitted} />
        {c.chose && <Pill label="선택" value={c.chose} accent />}
      </div>

      <p style={{ margin: "0 0 12px", fontSize: 14.5, color: "#334155", lineHeight: 1.6 }}>
        <strong style={{ color: "#1a1a1f" }}>스파이크</strong> — {c.spike}
      </p>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: "#64748b", marginBottom: 6 }}>활동</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: "#475569", lineHeight: 1.75 }}>
          {c.activities.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </div>

      <div style={{ background: "#f7f8fa", borderRadius: 10, padding: "12px 14px", marginBottom: 12 }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: "#16a34a", marginBottom: 5 }}>✅ 왜 통했나 (InHero 분석)</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: "#334155", lineHeight: 1.7 }}>
          {c.analysis.map((w, i) => <li key={i}>{w}</li>)}
        </ul>
      </div>

      <a href={c.source.url} target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b", textDecoration: "none", borderBottom: "1px dotted #cbd5e1" }}>
        📰 출처: {c.source.title} ↗
      </a>
    </div>
  );
}

function Pill({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, background: accent ? "#ecfdf3" : "#f1f5f9", border: `1px solid ${accent ? "#a7f3d0" : "#e2e8f0"}`, borderRadius: 8, padding: "4px 10px" }}>
      <span style={{ fontWeight: 800, color: accent ? "#047a45" : "#94a3b8" }}>{label}</span>
      <span style={{ color: "#334155", fontWeight: 600 }}>{value}</span>
    </span>
  );
}
