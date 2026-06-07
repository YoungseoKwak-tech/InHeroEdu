"use client";

/**
 * /parents/colleges — US college analysis database, WHITE UI.
 *
 * Follows the /parents/competitions pattern: clean white portal surface,
 * open to view as a lead magnet, signup CTA gates the interactive tools.
 * Each school renders as an accordion card — collapsed shows the headline
 * numbers parents scan for; expanded shows 인재상, 입시 포인트, programs,
 * internships, essay angle, and the Korean-applicant note.
 */

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";
import { COLLEGES, type College, type CollegeCategory } from "./data";

const GREEN = "#00b85f";

const CATEGORY_ORDER: CollegeCategory[] = [
  "아이비리그", "최상위 사립", "최상위 주립", "리버럴 아츠 칼리지",
];

const CATEGORY_DESC: Record<CollegeCategory, string> = {
  "아이비리그": "동부 8개 사립 명문 — 각 학교의 인재상이 뚜렷하게 다릅니다.",
  "최상위 사립": "아이비 밖의 최상위 사립 — STEM·경영·예술 특화가 분명한 학교들.",
  "최상위 주립": "주립 플래그십 — 합격률 숫자보다 전공별·주외 쿼터를 봐야 합니다.",
  "리버럴 아츠 칼리지": "소수정예 학부 중심 — 한국 인지도는 낮지만 미국 내 평가는 아이비급.",
};

export default function CollegesClient() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<CollegeCategory | "전체">("전체");
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => { getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {}); }, []);

  const gateToTools = () => {
    if (loggedIn) router.push("/question-bank");
    else window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/question-bank" } }));
  };

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = COLLEGES.filter((c) => {
      if (activeCat !== "전체" && c.category !== activeCat) return false;
      if (!q) return true;
      return (c.name + c.nameKo + c.location + c.programs.join(" ") + c.personaTitle).toLowerCase().includes(q);
    });
    const map = new Map<CollegeCategory, College[]>();
    for (const c of matches) {
      const arr = map.get(c.category) ?? [];
      arr.push(c);
      map.set(c.category, arr);
    }
    return CATEGORY_ORDER.filter((cat) => map.has(cat)).map((cat) => ({ cat, items: map.get(cat)! }));
  }, [query, activeCat]);

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: GREEN }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 20px 100px" }}>
        {/* Header */}
        <p style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", letterSpacing: "0.04em", marginBottom: 10 }}>🏛️ 미국 대학 분석 데이터베이스</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
          미국 명문대 {COLLEGES.length}곳, 인재상부터 인턴십까지
        </h1>
        <p style={{ fontSize: 15.5, color: "#475569", lineHeight: 1.8, marginBottom: 8 }}>
          유학원에서 듣는 정보를 한 페이지에 — 학교마다 <strong>어떤 학생을 원하는지(인재상) · 위치와 분위기 · 합격률과 시험 정책 ·
          얼리 전략 · 유학생 재정지원 · 인턴십과 취업 파이프라인</strong>까지 정리했습니다. 학교 이름을 누르면 상세 분석이 열립니다.
        </p>
        <p style={{ fontSize: 12.5, color: "#94a3b8", lineHeight: 1.7, marginBottom: 28 }}>
          ※ 합격률·SAT 범위·비용은 최근 기준 근사치이며, 시험 정책(SAT 필수/옵셔널)은 2024년 이후 해마다 바뀌고 있습니다.
          지원 전 반드시 각 대학 공식 입학처에서 최신 정보를 확인하세요.
        </p>

        {/* Search + category filter */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="학교명, 지역, 전공으로 검색 (예: CS, 뉴욕, 의공학)"
            style={{ width: "100%", border: "1.5px solid #d7dce2", borderRadius: 10, padding: "12px 16px", fontSize: 14.5, outline: "none", background: "#fff", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(["전체", ...CATEGORY_ORDER] as const).map((cat) => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                style={{
                  border: activeCat === cat ? "1.5px solid #1a1a1f" : "1.5px solid #e2e6ea",
                  background: activeCat === cat ? "#1a1a1f" : "#fff",
                  color: activeCat === cat ? "#fff" : "#475569",
                  borderRadius: 20, padding: "7px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                }}>
                {cat}{cat !== "전체" && <span style={{ opacity: 0.55, marginLeft: 5 }}>{COLLEGES.filter((c) => c.category === cat).length}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Inline signup CTA */}
        <div style={{ background: "linear-gradient(135deg,#0a0a14,#13131f)", borderRadius: 14, padding: "20px 22px", marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>이 학교들에 갈 AP 실력, InHero에서 준비하세요</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>무료 가입하면 11,975개 AP 문제 은행과 한국어 핵심 노트를 바로 이용할 수 있습니다.</div>
          </div>
          <button onClick={gateToTools} style={{ background: "#00FF88", color: "#000", border: "none", borderRadius: 8, padding: "12px 22px", fontWeight: 800, fontSize: 13.5, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer", whiteSpace: "nowrap" }}>
            무료 가입 →
          </button>
        </div>

        {/* Grouped accordion list */}
        {grouped.length === 0 && (
          <p style={{ fontSize: 14, color: "#94a3b8", textAlign: "center", padding: "40px 0" }}>검색 결과가 없습니다.</p>
        )}
        {grouped.map(({ cat, items }) => (
          <section key={cat} style={{ marginBottom: 38 }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", letterSpacing: "0.02em", paddingBottom: 8, borderBottom: "2px solid #1a1a1f", marginBottom: 6, display: "inline-block" }}>
              {cat} <span style={{ color: "#94a3b8", fontWeight: 600 }}>· {items.length}</span>
            </h2>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 14px", lineHeight: 1.6 }}>{CATEGORY_DESC[cat]}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((c) => (
                <CollegeCard key={c.name} college={c} isOpen={open === c.name}
                  onToggle={() => setOpen(open === c.name ? null : c.name)} />
              ))}
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 36, borderTop: "1px solid #e6e8ec" }}>
          <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>목표 대학이 정해졌다면, 이제 AP·SAT 준비를</div>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 20 }}>AP 문제 은행 · 핵심 노트 · 디지털 교재까지, 무료 가입 한 번이면 전부.</p>
          <button onClick={gateToTools} style={{ background: "#1a1a1f", color: "#fff", border: "none", borderRadius: 8, padding: "14px 34px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" }}>
            무료 가입하고 모든 자료 보기 →
          </button>
        </div>
      </div>
    </div>
  );
}

function CollegeCard({ college: c, isOpen, onToggle }: { college: College; isOpen: boolean; onToggle: () => void }) {
  return (
    <article style={{ background: "#fff", border: isOpen ? "1.5px solid #1a1a1f" : "1px solid #e6e8ec", borderRadius: 14, overflow: "hidden", boxShadow: isOpen ? "0 8px 24px rgba(16,24,40,0.08)" : "0 1px 2px rgba(16,24,40,0.04)", transition: "box-shadow 200ms" }}>
      {/* Collapsed header — always visible */}
      <button onClick={onToggle} aria-expanded={isOpen}
        style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "18px 20px", display: "block" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
          <span style={{ fontSize: 20 }}>{c.emoji}</span>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.01em" }}>{c.name}</span>
          <span style={{ fontSize: 13, color: "#64748b" }}>{c.nameKo}</span>
          <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 800, color: c.type === "사립" ? "#7c3aed" : "#0369a1", background: c.type === "사립" ? "#f3eefe" : "#e0f2fe", borderRadius: 5, padding: "2px 9px" }}>{c.type}</span>
          <span style={{ fontSize: 18, color: "#94a3b8", transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 180ms", lineHeight: 1 }}>›</span>
        </div>
        <div style={{ fontSize: 13.5, color: "#475569", fontWeight: 600, marginBottom: 8 }}>
          “{c.personaTitle}”
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12.5, color: "#64748b" }}>
          <span>📍 {c.location}</span>
          <span>🎯 합격률 {c.acceptRate}</span>
          <span>👥 {c.undergrads}</span>
        </div>
      </button>

      {/* Expanded detail */}
      {isOpen && (
        <div style={{ padding: "0 20px 22px", borderTop: "1px solid #f1f3f5" }}>
          {/* 인재상 */}
          <DetailBlock label="🧭 인재상 — 이 학교가 찾는 학생">
            <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.8, margin: 0 }}>{c.persona}</p>
          </DetailBlock>

          {/* 핵심 데이터 그리드 */}
          <DetailBlock label="📊 입시 핵심 데이터">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px 18px" }}>
              <Meta label="SAT (중간 50%)" value={c.satRange} />
              <Meta label="시험 정책 (변동 잦음)" value={c.testPolicy} />
              <Meta label="얼리 지원" value={c.earlyPlan} />
              <Meta label="유학생 재정지원" value={c.aidIntl} />
              <Meta label="연간 총비용" value={c.costBand} />
              <Meta label="캠퍼스 환경" value={c.setting} />
            </div>
          </DetailBlock>

          {/* 입시 포인트 */}
          <DetailBlock label="✅ 합격을 가르는 포인트">
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
              {c.admitPoints.map((p, i) => (
                <li key={i} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.7 }}>{p}</li>
              ))}
            </ul>
          </DetailBlock>

          {/* 대표 프로그램 */}
          <DetailBlock label="🎓 대표 학과·프로그램">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {c.programs.map((p) => (
                <span key={p} style={{ fontSize: 12.5, fontWeight: 700, color: "#0f172a", background: "#f1f5f9", borderRadius: 6, padding: "5px 11px" }}>{p}</span>
              ))}
            </div>
          </DetailBlock>

          {/* 인턴십·취업 */}
          <DetailBlock label="💼 인턴십·취업 파이프라인">
            <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.8, margin: 0 }}>{c.internships}</p>
          </DetailBlock>

          {/* 에세이 노트 */}
          <DetailBlock label="✍️ 에세이·서플먼트 포인트">
            <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.8, margin: 0 }}>{c.essayNote}</p>
          </DetailBlock>

          {/* 한국 학생 노트 */}
          <div style={{ marginTop: 16, background: "#f0fdf6", border: "1px solid #c8f2dc", borderRadius: 10, padding: "13px 16px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#047a45", letterSpacing: "0.04em", marginBottom: 5 }}>🇰🇷 한국 유학생 관점</div>
            <p style={{ fontSize: 13.5, color: "#1f5138", lineHeight: 1.75, margin: 0 }}>{c.koreanNote}</p>
          </div>
        </div>
      )}
    </article>
  );
}

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0f172a", letterSpacing: "0.02em", marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.04em", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13.5, color: "#1a1a1f", fontWeight: 500, lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}
