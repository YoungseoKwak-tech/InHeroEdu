"use client";

/**
 * /parents — Korean parent acquisition landing ("secret" shareable link).
 *
 * Why this exists: the main landing speaks to students ("ambitious students'
 * universe"), but the Korean inbound is parents asking "what AP should my kid
 * take / where are the materials?". This page leads with the assets parents
 * actually want and frames InHero as a trusted US-admissions hub, not an "AI
 * startup".
 *
 * Two kinds of cards:
 *  - Interactive student tools (Question Bank, Core Notes, textbooks) → GATED:
 *    clicking opens the signup modal (redirectTo lands them on the asset).
 *  - Info/lead-magnet content (STEM competition DB, …) → OPEN white-UI pages
 *    that build trust; their own pages carry the signup CTA.
 *
 * Counts come from public endpoints (seeded with current values as a fallback);
 * only real, live assets are featured — no dead buttons.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";
import { COMPETITIONS } from "./competitions/data";

const GREEN = "#00FF88";

/** "#22D3EE" → "34,211,238" for rgba() glows tied to each card's accent. */
function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

interface Asset {
  emoji: string;
  title: string;
  desc: string;
  unit: string;
  route: string;
  /** "qb" | "cn" | "tb" pull a live count; a number is a static count. */
  count: "qb" | "cn" | "tb" | number;
  accent: string;
  /** true → signup gate; false → open white-UI content page. */
  gated: boolean;
}

const ASSETS: Asset[] = [
  {
    emoji: "📝", title: "AP 문제 은행", count: "qb", unit: "개 문제", accent: "#00FF88", gated: true,
    route: "/question-bank",
    desc: "College Board 스타일 실전 문제. 틀리면 비슷한 문제로 바로 복습해 자녀의 약점을 메웁니다.",
  },
  {
    emoji: "📘", title: "핵심 노트", count: "cn", unit: "개 노트", accent: "#7B61FF", gated: true,
    route: "/core-notes",
    desc: "일타강사처럼 풀어낸 AP 개념 노트. '전자 배치와 주기율표'처럼 한눈에 이해되는 한국어 설명.",
  },
  {
    emoji: "🎯", title: "STEM 대회 데이터베이스", count: COMPETITIONS.length, unit: "개 대회", accent: "#FF5C8A", gated: false,
    route: "/parents/competitions",
    desc: "USABO·USACO·ISEF·Conrad… 학부모가 가장 많이 묻는 STEM 대회를 학년·난이도·신청 시기·추천 전공별로 정리.",
  },
  {
    emoji: "🗺️", title: "학년별 로드맵", count: 4, unit: "개 학년", accent: "#22D3EE", gated: false,
    route: "/parents/roadmap",
    desc: "9~12학년 학업·시험·활동·에세이를 학년별로 정리. 지금 자녀 학년에 무엇을 해야 하는지 한눈에.",
  },
  {
    emoji: "📘", title: "AP 과목 선택 가이드", count: 8, unit: "개 전공", accent: "#34D399", gated: false,
    route: "/parents/ap-guide",
    desc: "'○○ 전공이면 AP 뭘 들어야 하나요?' — 전공별 추천 AP 조합을 정리. 가장 많이 받는 질문의 답.",
  },
  {
    emoji: "📚", title: "AP 디지털 교재", count: "tb", unit: "권 교재", accent: "#FFB800", gated: true,
    route: "/library",
    desc: "Limits부터 무한급수까지, AP 풀 커리큘럼을 담은 디지털 교재. Bio·Chem·Physics·Calc까지.",
  },
  {
    emoji: "💬", title: "학부모 라운지", count: -1, unit: "", accent: "#F472B6", gated: false,
    route: "/parents/lounge",
    desc: "'G10인데 AP 몇 개?', 'Conrad 해보신 분?' — 미국 입시를 준비하는 학부모들이 묻고 답하는 정보 나눔방.",
  },
];

export default function ParentsClient() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  // Seed with current real numbers so the page is convincing even if a fetch
  // is slow/blocked; live values overwrite on load.
  const [counts, setCounts] = useState<{ qb: number; cn: number; tb: number }>({ qb: 11975, cn: 735, tb: 6 });

  useEffect(() => {
    getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {});
    fetch("/api/question-bank/bank?countOnly=true").then((r) => r.json())
      .then((d) => { if (typeof d?.total === "number") setCounts((c) => ({ ...c, qb: d.total })); }).catch(() => {});
    fetch("/api/core-notes?countOnly=true").then((r) => r.json())
      .then((d) => { if (typeof d?.total === "number") setCounts((c) => ({ ...c, cn: d.total })); }).catch(() => {});
    fetch("/api/textbooks").then((r) => r.json())
      .then((d) => { if (Array.isArray(d?.textbooks)) setCounts((c) => ({ ...c, tb: d.textbooks.length })); }).catch(() => {});
  }, []);

  const countFor = (a: Asset): number =>
    typeof a.count === "number" ? a.count : counts[a.count];

  // Gate: gated tools open the signup modal pointed at the asset; open info
  // pages just navigate.
  const open = (a: Asset) => {
    if (!a.gated || loggedIn) {
      router.push(a.route);
    } else {
      window.dispatchEvent(
        new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: a.route } })
      );
    }
  };

  const stats = [
    { label: "AP 문제", value: counts.qb.toLocaleString() + "개" },
    { label: "핵심 노트", value: counts.cn.toLocaleString() + "개" },
    { label: "STEM 대회", value: COMPETITIONS.length + "개" },
    { label: "AP 교재", value: counts.tb + "권" },
  ];

  return (
    <div style={{ background: "transparent", minHeight: "100vh", padding: "120px 24px 120px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: GREEN, marginBottom: 18, textAlign: "center" }}>
          INHERO 학부모 전용 · 시크릿
        </p>

        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5.2vw, 3.4rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", lineHeight: 1.1, textAlign: "center", marginBottom: 20, textShadow: "0 0 40px rgba(0,255,136,0.12)" }}>
          코넬 공대생이 정리한<br />AP · SAT · STEM 활동 허브
        </h1>

        <p style={{ fontSize: 16.5, color: "rgba(255,255,255,0.62)", lineHeight: 1.8, textAlign: "center", maxWidth: 620, margin: "0 auto 28px" }}>
          미국 대학 입시에 필요한 자료·문제·활동 정보를 한 곳에.
          자녀가 <strong style={{ color: "#fff" }}>지금 바로</strong> 쓸 수 있는 핵심만 모았습니다.
        </p>

        {/* Number band */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px 28px", marginBottom: 44 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center", minWidth: 96 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 800, color: GREEN, letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Asset cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          {ASSETS.map((a) => {
            const rgb = hexToRgb(a.accent);
            return (
              <button
                key={a.route}
                onClick={() => open(a)}
                style={{
                  textAlign: "left", display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 20,
                  padding: "24px 26px", borderRadius: 14, border: `1px solid rgba(${rgb},0.28)`,
                  background: `linear-gradient(135deg, rgba(${rgb},0.05), rgba(0,0,10,0.7))`,
                  backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", cursor: "none",
                  transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms, box-shadow 240ms", width: "100%",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = "translateY(-3px)"; el.style.borderColor = `rgba(${rgb},0.55)`; el.style.boxShadow = `0 22px 50px rgba(${rgb},0.16)`; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = ""; el.style.borderColor = `rgba(${rgb},0.28)`; el.style.boxShadow = ""; }}
              >
                <div style={{ fontSize: 40, lineHeight: 1, filter: `drop-shadow(0 0 14px rgba(${rgb},0.4))` }}>{a.emoji}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 700, color: "#fff" }}>{a.title}</span>
                    {countFor(a) >= 0 && (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: a.accent }}>
                        {countFor(a).toLocaleString()}{a.unit}
                      </span>
                    )}
                    {!a.gated && (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 4, padding: "2px 7px" }}>무료 열람</span>
                    )}
                  </div>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>{a.desc}</p>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: a.accent, whiteSpace: "nowrap" }}>열기 →</div>
              </button>
            );
          })}
        </div>

        {/* Primary gate CTA */}
        <div style={{ textAlign: "center" }}>
          <button onClick={() => open(ASSETS[0])} className="hud-btn"
            style={{ background: GREEN, color: "#000", fontWeight: 800, fontSize: 15, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em", padding: "16px 40px", borderRadius: 6, border: "none", cursor: "none" }}>
            무료 가입하고 모든 자료 보기 →
          </button>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.42)", marginTop: 14 }}>
            {loggedIn ? "이미 로그인되어 있습니다. 위 자료를 바로 열어보세요." : "무료 가입 한 번이면 위 자료를 모두 열어볼 수 있습니다. 카드 필요 없음."}
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 26 }}>
            학생이신가요? <Link href="/" style={{ color: "rgba(0,255,136,0.7)", textDecoration: "none" }}>InHero 둘러보기 →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
