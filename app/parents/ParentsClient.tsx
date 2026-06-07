"use client";

/**
 * /parents — Korean parent acquisition landing ("secret" shareable link).
 *
 * Why this exists: the main landing speaks to students ("ambitious students'
 * universe"), but the Korean inbound is parents asking "what AP should my kid
 * take / where are the materials?". This page leads with the killer assets
 * parents actually want — the live Question Bank, Core Notes, and AP textbooks
 * — then gates the click behind a 5-second signup, reusing the global auth
 * modal (inhero:open-auth) with redirectTo so signup lands them right on the
 * thing they wanted.
 *
 * Only real, live assets are featured (counts fetched from public endpoints);
 * no dead buttons.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";

const GREEN = "#00FF88";

interface Asset {
  emoji: string;
  title: string;
  desc: string;
  unit: string;
  route: string;
  countKey: "qb" | "cn" | "tb";
  accent: string;
}

const ASSETS: Asset[] = [
  {
    emoji: "📝",
    title: "AP 문제 은행",
    desc: "College Board 스타일 실전 문제. 틀리면 비슷한 문제로 바로 복습해 자녀의 약점을 메웁니다.",
    unit: "개 문제",
    route: "/question-bank",
    countKey: "qb",
    accent: "#00FF88",
  },
  {
    emoji: "📘",
    title: "핵심 노트",
    desc: "일타강사처럼 풀어낸 AP 개념 노트. '전자 배치와 주기율표'처럼 한눈에 이해되는 한국어 설명.",
    unit: "개 노트",
    route: "/core-notes",
    countKey: "cn",
    accent: "#7B61FF",
  },
  {
    emoji: "📚",
    title: "AP 디지털 교재",
    desc: "Limits부터 무한급수까지, AP 풀 커리큘럼을 담은 디지털 교재. Bio·Chem·Physics·Calc까지.",
    unit: "권 교재",
    route: "/library",
    countKey: "tb",
    accent: "#FFB800",
  },
];

export default function ParentsClient() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  // Seed with the current real numbers so the page is convincing even if a
  // fetch is slow/blocked; live values overwrite on load.
  const [counts, setCounts] = useState({ qb: 11975, cn: 735, tb: 6 });

  useEffect(() => {
    getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {});
    fetch("/api/question-bank/bank?countOnly=true")
      .then((r) => r.json())
      .then((d) => { if (typeof d?.total === "number") setCounts((c) => ({ ...c, qb: d.total })); })
      .catch(() => {});
    fetch("/api/core-notes?countOnly=true")
      .then((r) => r.json())
      .then((d) => { if (typeof d?.total === "number") setCounts((c) => ({ ...c, cn: d.total })); })
      .catch(() => {});
    fetch("/api/textbooks")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d?.textbooks)) setCounts((c) => ({ ...c, tb: d.textbooks.length })); })
      .catch(() => {});
  }, []);

  // The gate: signed-in parents go straight in; everyone else gets the signup
  // modal pre-pointed at the asset they wanted, so signup lands them there.
  const open = (route: string) => {
    if (loggedIn) {
      router.push(route);
    } else {
      window.dispatchEvent(
        new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: route } })
      );
    }
  };

  return (
    <div style={{ background: "transparent", minHeight: "100vh", padding: "120px 24px 120px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        {/* Eyebrow */}
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: GREEN, marginBottom: 18, textAlign: "center" }}>
          INHERO 학부모 전용 · 시크릿
        </p>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.1rem, 5.5vw, 3.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", lineHeight: 1.08, textAlign: "center", marginBottom: 20, textShadow: "0 0 40px rgba(0,255,136,0.12)" }}>
          미국 대학 입시,<br />혼자 준비하지 마세요.
        </h1>

        {/* Subcopy */}
        <p style={{ fontSize: 16.5, color: "rgba(255,255,255,0.62)", lineHeight: 1.8, textAlign: "center", maxWidth: 600, margin: "0 auto 14px" }}>
          아이비리그 선배들이 만든 AP·SAT 자료와 {counts.qb.toLocaleString()}개의 실전 문제.
          자녀가 <strong style={{ color: "#fff" }}>지금 바로</strong> 쓸 수 있는 핵심만 모았습니다.
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textAlign: "center", marginBottom: 48 }}>
          Cornell 공대생이 직접 정리 · 13개 AP 독학 마스터
        </p>

        {/* Asset cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          {ASSETS.map((a) => {
            const rgb = a.accent === "#00FF88" ? "0,255,136" : a.accent === "#7B61FF" ? "123,97,255" : "255,184,0";
            const count = counts[a.countKey];
            return (
              <button
                key={a.route}
                onClick={() => open(a.route)}
                style={{
                  textAlign: "left",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems: "center",
                  gap: 20,
                  padding: "24px 26px",
                  borderRadius: 14,
                  border: `1px solid rgba(${rgb},0.28)`,
                  background: `linear-gradient(135deg, rgba(${rgb},0.05), rgba(0,0,10,0.7))`,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  cursor: "none",
                  transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms, box-shadow 240ms",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-3px)";
                  el.style.borderColor = `rgba(${rgb},0.55)`;
                  el.style.boxShadow = `0 22px 50px rgba(${rgb},0.16)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "";
                  el.style.borderColor = `rgba(${rgb},0.28)`;
                  el.style.boxShadow = "";
                }}
              >
                <div style={{ fontSize: 40, lineHeight: 1, filter: `drop-shadow(0 0 14px rgba(${rgb},0.4))` }}>{a.emoji}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 700, color: "#fff" }}>{a.title}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: a.accent }}>
                      {count.toLocaleString()}{a.unit}
                    </span>
                  </div>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>{a.desc}</p>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: a.accent, whiteSpace: "nowrap" }}>
                  열기 →
                </div>
              </button>
            );
          })}
        </div>

        {/* Primary gate CTA */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => open("/question-bank")}
            className="hud-btn"
            style={{
              background: GREEN,
              color: "#000",
              fontWeight: 800,
              fontSize: 15,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.06em",
              padding: "16px 40px",
              borderRadius: 6,
              border: "none",
              cursor: "none",
            }}
          >
            5초 가입하고 전부 열기 →
          </button>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.42)", marginTop: 14 }}>
            {loggedIn
              ? "이미 로그인되어 있습니다. 위 자료를 바로 열어보세요."
              : "무료 가입 한 번이면 위 자료를 모두 열어볼 수 있습니다. 카드 필요 없음."}
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 26 }}>
            학생이신가요?{" "}
            <Link href="/" style={{ color: "rgba(0,255,136,0.7)", textDecoration: "none" }}>
              InHero 둘러보기 →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
