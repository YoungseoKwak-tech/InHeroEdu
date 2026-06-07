"use client";

/**
 * /parents — Korean parent hub, styled as a 유학 community portal
 * (Naver-cafe / 유학in style): white, board-based, info-dense. Parents read this
 * mental model instantly, which converts far better than the cosmic student
 * landing.
 *
 * Real data: the 입시 Q&A board + 최근 게시물 come from the parent lounge
 * (questions_qa, subject="parent-lounge"). Interactive tools (Question Bank,
 * Core Notes, textbooks) are signup-gated via the global auth modal; info pages
 * (STEM DB, roadmap, AP guide) are open.
 */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";
import { COMPETITIONS } from "./competitions/data";

const GREEN = "#00b85f";

interface Question {
  id: string; nickname: string; title: string; content: string;
  view_count: number; answer_count: number; created_at: string;
}

function timeAgo(iso: string): string {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 3600) return `${Math.max(1, Math.floor(d / 60))}분 전`;
  if (d < 86400) return `${Math.floor(d / 3600)}시간 전`;
  const days = Math.floor(d / 86400);
  if (days < 30) return `${days}일 전`;
  return new Date(iso).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" });
}
const dateShort = (iso: string) => new Date(iso).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" });

const SLIDES = [
  { bg: "linear-gradient(120deg,#064e3b,#0b8a5b)", emoji: "📝", title: "AP 문제 11,975개 · 무료", sub: "College Board 스타일 실전 문제 · 틀리면 비슷한 문제로 복습", route: "/question-bank", gated: true },
  { bg: "linear-gradient(120deg,#3b1d6e,#6d28d9)", emoji: "📚", title: "AP 디지털 교재 6권", sub: "Bio · Chem · Physics · Calc — 풀 커리큘럼 디지털 교재", route: "/library", gated: true },
  { bg: "linear-gradient(120deg,#831843,#be185d)", emoji: "🎯", title: `STEM 대회 ${COMPETITIONS.length}개 총정리`, sub: "USABO · USACO · ISEF · Conrad — 학년·난이도·시기·전공별", route: "/parents/competitions", gated: false },
];

const NAV = [
  { label: "입시 Q&A", route: "/parents/lounge", gated: false },
  { label: "STEM 대회", route: "/parents/competitions", gated: false },
  { label: "학년별 로드맵", route: "/parents/roadmap", gated: false },
  { label: "AP 과목 가이드", route: "/parents/ap-guide", gated: false },
  { label: "AP 문제은행", route: "/question-bank", gated: true },
  { label: "핵심노트", route: "/core-notes", gated: true },
  { label: "디지털 교재", route: "/library", gated: true },
];

const QUICK = [
  { emoji: "💬", label: "입시 Q&A", route: "/parents/lounge", gated: false },
  { emoji: "🎯", label: "STEM 대회", route: "/parents/competitions", gated: false },
  { emoji: "🗺️", label: "학년별 로드맵", route: "/parents/roadmap", gated: false },
  { emoji: "📘", label: "AP 과목 가이드", route: "/parents/ap-guide", gated: false },
  { emoji: "📝", label: "AP 문제은행", route: "/question-bank", gated: true },
  { emoji: "📚", label: "디지털 교재", route: "/library", gated: true },
];

const RESOURCES = [
  { title: "미국 입시 STEM 대회 데이터베이스", desc: `USABO·USACO·ISEF 등 ${COMPETITIONS.length}개 대회 총정리`, route: "/parents/competitions", tag: "자료" },
  { title: "학년별 로드맵 (G9–G12)", desc: "학업·시험·활동·에세이를 학년별로", route: "/parents/roadmap", tag: "가이드" },
  { title: "전공별 AP 과목 선택 가이드", desc: "‘○○ 전공이면 AP 뭘?’ 8개 전공별 추천", route: "/parents/ap-guide", tag: "가이드" },
];

const NOTICES = [
  { title: "InHero 학부모 자료실 오픈 안내", route: "/parents" },
  { title: "AP 문제은행 11,975개 무료 공개", route: "/question-bank", gated: true },
  { title: "AP 디지털 교재 6권 추가 (Calc BC 포함)", route: "/library", gated: true },
];

export default function ParentsClient() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [query, setQuery] = useState("");
  const [slide, setSlide] = useState(0);
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {});
    fetch("/api/qa/questions?subject=parent-lounge&sort=latest")
      .then((r) => r.json()).then((d) => setQuestions(d?.questions ?? [])).catch(() => {});
  }, []);

  useEffect(() => {
    slideTimer.current = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5500);
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, []);

  const go = (route: string, gated: boolean) => {
    if (!gated || loggedIn) router.push(route);
    else window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: route } }));
  };

  const filtered = query.trim()
    ? questions.filter((q) => (q.title + q.content).toLowerCase().includes(query.trim().toLowerCase()))
    : questions;

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", cursor: "auto", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* ── Top bar ── */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 20px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <Link href="/parents" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: "-0.03em", color: "#111" }}>In<span style={{ color: GREEN }}>Hero</span></span>
            <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>유학·미국입시 자료실</span>
          </Link>
          <form onSubmit={(e) => { e.preventDefault(); }} style={{ flex: 1, minWidth: 220, display: "flex", maxWidth: 560, marginLeft: "auto" }}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="게시글, 자료, AP 검색"
              style={{ flex: 1, border: "2px solid #1a1a1f", borderRight: "none", borderRadius: "8px 0 0 8px", padding: "10px 14px", fontSize: 14, outline: "none" }} />
            <button type="submit" aria-label="검색" style={{ background: "#1a1a1f", color: "#fff", border: "none", borderRadius: "0 8px 8px 0", padding: "0 18px", fontSize: 16, cursor: "pointer" }}>🔍</button>
          </form>
        </div>
        {/* Nav tabs */}
        <nav style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px", display: "flex", gap: 4, overflowX: "auto" }}>
          {NAV.map((n) => (
            <button key={n.label} onClick={() => go(n.route, n.gated)}
              style={{ background: "none", border: "none", padding: "12px 14px", fontSize: 14.5, fontWeight: 700, color: "#334155", cursor: "pointer", whiteSpace: "nowrap", borderBottom: "3px solid transparent" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GREEN; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#334155"; }}>
              {n.label}{n.gated && <span style={{ fontSize: 10, color: "#cbd5e1", marginLeft: 3 }}>🔒</span>}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Body: main + sidebar ── */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 20px 80px", display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 22, alignItems: "start" }} className="parents-grid">
        {/* MAIN */}
        <main style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
          {/* Hero carousel */}
          <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", height: 230 }}>
            {SLIDES.map((s, i) => (
              <button key={i} onClick={() => go(s.route, s.gated)}
                style={{ position: "absolute", inset: 0, background: s.bg, border: "none", cursor: "pointer", textAlign: "left", padding: "34px 40px", opacity: i === slide ? 1 : 0, transition: "opacity 600ms", pointerEvents: i === slide ? "auto" : "none", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 34, marginBottom: 10 }}>{s.emoji}</div>
                <div style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.5rem,3.4vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>{s.title}</div>
                <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 14.5 }}>{s.sub}</div>
                <div style={{ marginTop: 16, display: "inline-block", color: "#fff", border: "1.5px solid rgba(255,255,255,0.55)", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, alignSelf: "flex-start" }}>{s.gated ? "무료 가입하고 보기 →" : "바로 보기 →"}</div>
              </button>
            ))}
            <button aria-label="이전" onClick={() => setSlide((slide - 1 + SLIDES.length) % SLIDES.length)} style={navArrow("left")}>‹</button>
            <button aria-label="다음" onClick={() => setSlide((slide + 1) % SLIDES.length)} style={navArrow("right")}>›</button>
            <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
              {SLIDES.map((_, i) => <span key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 18 : 7, height: 7, borderRadius: 4, background: i === slide ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "width 200ms" }} />)}
            </div>
          </div>

          {/* Quick icons */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e6ea", padding: "20px 16px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }} className="quick-grid">
            {QUICK.map((q) => (
              <button key={q.label} onClick={() => go(q.route, q.gated)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "6px 2px" }}>
                <span style={{ fontSize: 30 }}>{q.emoji}</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "#334155", textAlign: "center", lineHeight: 1.3 }}>{q.label}</span>
              </button>
            ))}
          </div>

          {/* Boards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="board-grid">
            {/* 입시 Q&A */}
            <Board title="입시 Q&A" moreHref="/parents/lounge">
              {filtered.length === 0 ? (
                <EmptyRow text={query ? "검색 결과가 없습니다." : "첫 질문을 남겨보세요."} />
              ) : filtered.slice(0, 6).map((q) => (
                <Link key={q.id} href={`/qa/${q.id}`} style={rowStyle}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#1f2937" }}>{q.title}</span>
                  <span style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                    <span style={{ color: GREEN, fontWeight: 700, fontSize: 12.5 }}>[{q.answer_count}]</span>
                    <span style={{ color: "#94a3b8", fontSize: 12 }}>{dateShort(q.created_at)}</span>
                  </span>
                </Link>
              ))}
            </Board>

            {/* 추천 자료 */}
            <Board title="추천 자료" moreHref="/parents/competitions">
              {RESOURCES.map((r) => (
                <Link key={r.route} href={r.route} style={{ ...rowStyle, alignItems: "flex-start", flexDirection: "column", gap: 2 }}>
                  <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 10.5, fontWeight: 800, color: "#7c3aed", background: "#f3eefe", borderRadius: 4, padding: "1px 6px" }}>{r.tag}</span>
                    <span style={{ color: "#1f2937", fontWeight: 600 }}>{r.title}</span>
                  </span>
                  <span style={{ color: "#94a3b8", fontSize: 12.5, paddingLeft: 2 }}>{r.desc}</span>
                </Link>
              ))}
            </Board>
          </div>
        </main>

        {/* SIDEBAR */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Login / signup */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e6ea", padding: 18 }}>
            {loggedIn ? (
              <div style={{ fontSize: 13.5, color: "#334155", textAlign: "center" }}>로그인되어 있습니다. 모든 자료를 이용하세요.</div>
            ) : (
              <>
                <button onClick={() => go("/question-bank", true)} style={{ width: "100%", background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", marginBottom: 8 }}>
                  무료 가입하고 모든 자료 보기
                </button>
                <p style={{ fontSize: 11.5, color: "#94a3b8", textAlign: "center", margin: 0 }}>가입 한 번이면 문제·노트·교재 전부 · 카드 필요 없음</p>
              </>
            )}
          </div>

          <SideCard title="공지사항">
            {NOTICES.map((n) => (
              <button key={n.title} onClick={() => go(n.route, !!n.gated)} style={sideRow}>{n.title}</button>
            ))}
          </SideCard>

          <SideCard title="최근 게시물" moreHref="/parents/lounge">
            {questions.length === 0 ? <EmptyRow text="아직 게시물이 없습니다." /> : questions.slice(0, 6).map((q) => (
              <Link key={q.id} href={`/qa/${q.id}`} style={{ ...sideRow, display: "flex", justifyContent: "space-between", gap: 8, textDecoration: "none" }}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: GREEN, marginRight: 6 }}>Q&A</span>{q.title}
                </span>
                <span style={{ color: "#cbd5e1", fontSize: 11.5, flexShrink: 0 }}>{dateShort(q.created_at)}</span>
              </Link>
            ))}
          </SideCard>

          <SideCard title="최근 댓글">
            <EmptyRow text="아직 댓글이 없습니다." />
          </SideCard>

          <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
            학생이신가요? <Link href="/" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>InHero 둘러보기 →</Link>
          </p>
        </aside>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .parents-grid { grid-template-columns: 1fr !important; }
          .board-grid { grid-template-columns: 1fr !important; }
          .quick-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

function navArrow(side: "left" | "right"): React.CSSProperties {
  return { position: "absolute", top: "50%", transform: "translateY(-50%)", [side]: 10, width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,0.3)", color: "#fff", border: "none", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } as React.CSSProperties;
}

const rowStyle: React.CSSProperties = {
  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10,
  padding: "11px 4px", borderBottom: "1px solid #f1f3f5", textDecoration: "none",
  fontSize: 14, color: "#1f2937",
};
const sideRow: React.CSSProperties = {
  display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
  borderBottom: "1px solid #f1f3f5", padding: "10px 2px", fontSize: 13.5, color: "#334155",
  cursor: "pointer", textDecoration: "none",
};

function Board({ title, moreHref, children }: { title: string; moreHref: string; children: React.ReactNode }) {
  return (
    <section style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e6ea", padding: "18px 18px 6px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, paddingBottom: 10, borderBottom: "2px solid #1a1a1f" }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>{title}</h2>
        <Link href={moreHref} style={{ color: "#94a3b8", textDecoration: "none", fontSize: 18, lineHeight: 1 }}>›</Link>
      </div>
      <div>{children}</div>
    </section>
  );
}

function SideCard({ title, moreHref, children }: { title: string; moreHref?: string; children: React.ReactNode }) {
  return (
    <section style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e6ea", padding: "16px 16px 6px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <h3 style={{ fontSize: 14.5, fontWeight: 800, margin: 0 }}>{title}</h3>
        {moreHref && <Link href={moreHref} style={{ color: "#cbd5e1", textDecoration: "none", fontSize: 16 }}>›</Link>}
      </div>
      <div>{children}</div>
    </section>
  );
}

function EmptyRow({ text }: { text: string }) {
  return <div style={{ padding: "16px 2px", fontSize: 13, color: "#94a3b8" }}>{text}</div>;
}
