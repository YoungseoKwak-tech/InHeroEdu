"use client";

/**
 * /parents/competitions — STEM competition database, WHITE UI.
 *
 * Parents are used to Naver/Kakao/blog-style white, readable layouts, so this
 * (and other parent content pages) render on a clean white surface over the
 * cosmic background. Open to view (lead magnet); a signup CTA gates the
 * interactive tools.
 */

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";
import { COMPETITIONS, type Competition, type CompetitionCategory } from "./data";

const DIFF_COLOR: Record<Competition["difficulty"], string> = {
  입문: "#16a34a",
  중급: "#2563eb",
  고급: "#d97706",
  최상위: "#dc2626",
};

const CATEGORY_ORDER: CompetitionCategory[] = [
  "수학", "컴퓨터과학", "생물·의학", "화학", "물리", "종합 과학",
  "연구 프로젝트", "로봇·공학", "비즈니스·경제",
  "인문·글쓰기", "토론·스피치", "사회·역사", "언어", "예술", "기타",
];

export default function CompetitionsClient() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => { getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {}); }, []);

  const gateToTools = () => {
    if (loggedIn) router.push("/question-bank");
    else window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/question-bank" } }));
  };

  const grouped = useMemo(() => {
    const map = new Map<CompetitionCategory, Competition[]>();
    for (const c of COMPETITIONS) {
      const arr = map.get(c.category) ?? [];
      arr.push(c);
      map.set(c.category, arr);
    }
    return CATEGORY_ORDER.filter((cat) => map.has(cat)).map((cat) => ({ cat, items: map.get(cat)! }));
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: "#00b85f" }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 20px 100px" }}>
        {/* Header */}
        <p style={{ fontSize: 13, fontWeight: 700, color: "#dc2680", letterSpacing: "0.04em", marginBottom: 10 }}>🏆 미국 입시 대회 데이터베이스</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
          미국 입시 대회, 전 분야 한눈에
        </h1>
        <p style={{ fontSize: 15.5, color: "#475569", lineHeight: 1.8, marginBottom: 8 }}>
          STEM뿐 아니라 <strong>인문·글쓰기 · 토론·스피치 · 비즈니스·경제 · 사회·역사 · 예술 · 언어</strong>까지,
          학부모가 가장 많이 묻는 {COMPETITIONS.length}개 주요 대회를 <strong>분야 · 학년 · 난이도 · 신청 시기 · 추천 전공</strong>으로 정리했습니다.
        </p>
        <p style={{ fontSize: 12.5, color: "#94a3b8", lineHeight: 1.7, marginBottom: 28 }}>
          ※ 신청·대회 시기는 해마다 조금씩 달라질 수 있으니 각 대회 공식 사이트에서 최신 일정을 확인하세요.
        </p>

        {/* Inline signup CTA */}
        <div style={{ background: "linear-gradient(135deg,#0a0a14,#13131f)", borderRadius: 14, padding: "20px 22px", marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>이 대회들을 준비할 AP 문제·노트가 필요하신가요?</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>무료 가입하면 11,975개 AP 문제 은행과 핵심 노트를 바로 이용할 수 있습니다.</div>
          </div>
          <button onClick={gateToTools} style={{ background: "#00FF88", color: "#000", border: "none", borderRadius: 8, padding: "12px 22px", fontWeight: 800, fontSize: 13.5, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer", whiteSpace: "nowrap" }}>
            무료 가입 →
          </button>
        </div>

        {/* Grouped list */}
        {grouped.map(({ cat, items }) => (
          <section key={cat} style={{ marginBottom: 34 }}>
            <h2 style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", letterSpacing: "0.02em", paddingBottom: 8, borderBottom: "2px solid #1a1a1f", marginBottom: 14, display: "inline-block" }}>
              {cat} <span style={{ color: "#94a3b8", fontWeight: 600 }}>· {items.length}</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((c) => (
                <article key={c.name} style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
                    <span style={{ fontSize: 20 }}>{c.emoji}</span>
                    <span style={{ fontSize: 16.5, fontWeight: 800, letterSpacing: "-0.01em" }}>{c.name}</span>
                    <span style={{ fontSize: 13, color: "#64748b" }}>{c.nameKo}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 800, color: "#fff", background: DIFF_COLOR[c.difficulty], borderRadius: 5, padding: "2px 9px" }}>{c.difficulty}</span>
                    {c.team && <span style={{ fontSize: 11.5, fontWeight: 700, color: "#7c3aed", background: "#f3eefe", borderRadius: 5, padding: "2px 9px" }}>팀</span>}
                  </div>
                  <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.7, margin: "0 0 12px" }}>{c.blurb}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "8px 16px", fontSize: 13 }}>
                    <Meta label="학년" value={c.grade} />
                    <Meta label="신청·대회 시기" value={c.timing} />
                    <Meta label="추천 전공" value={c.majors.join(" · ")} />
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 36, borderTop: "1px solid #e6e8ec" }}>
          <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>자녀의 활동·학습을 InHero에서 시작하세요</div>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 20 }}>AP 문제 은행 · 핵심 노트 · 디지털 교재까지, 무료 가입 한 번이면 전부.</p>
          <button onClick={gateToTools} style={{ background: "#1a1a1f", color: "#fff", border: "none", borderRadius: 8, padding: "14px 34px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" }}>
            무료 가입하고 모든 자료 보기 →
          </button>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.04em", marginBottom: 2 }}>{label}</div>
      <div style={{ color: "#1a1a1f", fontWeight: 500 }}>{value}</div>
    </div>
  );
}
