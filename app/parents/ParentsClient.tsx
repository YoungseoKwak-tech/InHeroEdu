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
import { authFetch, getClientSession } from "@/lib/client-auth";
import { COMPETITIONS } from "./competitions/data";
import CreditWidget from "@/components/parents/CreditWidget";
import MyTierBadge from "@/components/parents/TierBadge";
import ReferralPrompt from "@/components/parents/ReferralPrompt";
import { isUnlocked, spendAndUnlockAccount, hydrateCredits, CREDIT_EVENT, CREDIT_COSTS, getBalance } from "@/lib/credits";
import TextbookFlipPreview from "@/components/parents/TextbookFlipPreview";

const GREEN = "#00b85f";

interface Question {
  id: string; nickname: string; title: string; content: string;
  view_count: number; answer_count: number; created_at: string;
}
interface Textbook { slug: string; title: string; subtitle: string | null; total_chapters: number | null; total_pages: number | null; }
interface Material { id: string; title: string; attachmentUrl: string; fileSize: number | null; previewPage1Url: string | null; totalPages: number | null; lounge: { slug: string; name: string } | null; author: { handle: string } | null; }

// Files bigger than this open as a download instead of the in-browser reader
// (the reader chokes on huge scans like the 343MB AP Biology Note).
const LARGE_FILE_BYTES = 50 * 1024 * 1024;
const isLargeFile = (b: number | null | undefined) => !!b && b > LARGE_FILE_BYTES;
const downloadHref = (url: string, title: string) => `${url}${url.includes("?") ? "&" : "?"}download=${encodeURIComponent(title)}`;
interface KoNote { lessonId: string; subjectLabel: string; emoji: string; unit: number | null; lessonNum: number | null; title: string; subtitle: string | null; overview: string | null; }

// Korean 일타강사 notes to feature on the homepage — the killer content. These
// AP Chemistry lessons are Korean-complete; the section pulls their openings.
const FEATURED_KO_NOTES = ["ap-chemistry-u1-l1", "ap-chemistry-u2-l1", "ap-chemistry-u3-l1"];

// Teaser cards for the Ivy "자료방" flip preview. These are category teasers for
// the mentor room (locked) — NOT fabricated documents shown openly. Entering
// (the button) gates to /mentors.
const IVY_CARDS = [
  { emoji: "✍️", tag: "합격 에세이", title: "아이비리그 합격 에세이 모음", desc: "Cornell · UPenn · Brown 합격생이 실제로 낸 에세이", bg: "linear-gradient(135deg,#1e1b4b,#4c1d95)" },
  { emoji: "🏆", tag: "활동 프로필", title: "합격생 활동 리스트", desc: "리서치 · STEM 대회 · 봉사 — 합격 프로필 그대로", bg: "linear-gradient(135deg,#0c4a6e,#0369a1)" },
  { emoji: "🗺️", tag: "합격 로드맵", title: "합격생 학년별 플랜", desc: "G9~G12, 합격생이 학년마다 실제로 한 것", bg: "linear-gradient(135deg,#064e3b,#047857)" },
  { emoji: "💬", tag: "멘토 Q&A", title: "멘토 1:1 Q&A 아카이브", desc: "아이비리그 멘토에게 직접 물어본 질문과 답변", bg: "linear-gradient(135deg,#7c2d12,#b45309)" },
];

const TEXTBOOK_GLYPH: Record<string, string> = {
  "ap-bio-ultimate": "🧬", "ap-chem-ultimate": "⚗️", "ap-physics-ultimate": "⚛️",
  "ap-physics-2-ultimate": "🧲", "ap-calc-ab-ultimate": "∫", "ap-calc-bc-ultimate": "∫",
};
// Real cover art in /public/textbook-covers (640w portrait JPGs). Missing files
// (e.g. Calc BC) fall back to the glyph via onError.
const TEXTBOOK_COVER: Record<string, string> = {
  "ap-bio-ultimate": "/textbook-covers/ap-bio.jpg",
  "ap-chem-ultimate": "/textbook-covers/ap-chem.jpg",
  "ap-physics-ultimate": "/textbook-covers/ap-physics-1.jpg",
  "ap-physics-2-ultimate": "/textbook-covers/ap-physics-2.jpg",
  "ap-calc-ab-ultimate": "/textbook-covers/ap-calc-ab.jpg",
  "ap-calc-bc-ultimate": "/textbook-covers/ap-calculus-bc.jpg",
};

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
  { bg: "linear-gradient(135deg,#0a0a14,#1b1340 55%,#2d1a5e)", emoji: "🎓", title: "아이비리그 공대 합격생, 사교육 없이 자기주도로 간 스토리", sub: "수강과목부터 리서치·액티비티·에세이 전략·유학생활까지 다 녹여낸 230페이지 책", route: "/parents/story", gated: false, cta: "스토리 읽기 →" },
];

// Social-proof badges under the hero — parents trust "다른 학부모도 쓴다" over
// "자료가 좋다", so lead with participation numbers.
const SOCIAL_STATS = [
  { emoji: "👨‍👩‍👧‍👦", label: "학부모 500명 참여" },
  { emoji: "🎓", label: "학생 800명 이용 중" },
  { emoji: "📚", label: "AP 문제 11,975개" },
  { emoji: "💬", label: "입시 Q&A 답변 1,200+" },
];

const NAV = [
  { label: "SAT 모의고사", route: "/parents/sat", gated: false },
  { label: "AP 모의고사", route: "/parents/question-bank/exam", gated: false },
  { label: "입시 Q&A", route: "/parents/lounge", gated: false },
  { label: "합격 수기", route: "/parents/story", gated: false },
  { label: "합격 프로필", route: "/parents/admits", gated: true },
  { label: "아이비리그 스토리 설계", route: "/parents/story-design", gated: false },
  { label: "자기주도 공부법", route: "/parents/study-method", gated: false },
  { label: "미국 입시 대회", route: "/parents/competitions", gated: false },
  { label: "학년별 로드맵", route: "/parents/roadmap", gated: false },
  { label: "수학 교육", route: "/parents/math", gated: false },
  { label: "AP 문제은행", route: "/parents/question-bank", gated: false },
  { label: "AP 개념정리", route: "/parents/core-notes", gated: false },
  { label: "단어장", route: "/parents/vocab", gated: false },
  { label: "디지털 교재", route: "#textbooks", gated: false },
  { label: "미국 대학 분석", route: "/parents/colleges", gated: false },
  { label: "합격 활동 분석", route: "/parents/activities", gated: false },
];

const QUICK = [
  { emoji: "✏️", label: "SAT 모의고사", route: "/parents/sat", gated: false },
  { emoji: "🖥️", label: "AP 모의고사", route: "/parents/question-bank/exam", gated: false },
  { emoji: "🎥", label: "세미나 다시보기", route: "/parents/seminar/replay", gated: false },
  { emoji: "💬", label: "입시 Q&A", route: "/parents/lounge", gated: false },
  { emoji: "🎓", label: "합격 수기", route: "/parents/story", gated: false },
  { emoji: "🏆", label: "합격 프로필", route: "/parents/admits", gated: true },
  { emoji: "🧭", label: "아이비리그 스토리 설계", route: "/parents/story-design", gated: false },
  { emoji: "🧠", label: "자기주도 공부법", route: "/parents/study-method", gated: false },
  { emoji: "🎯", label: "미국 입시 대회", route: "/parents/competitions", gated: false },
  { emoji: "🗺️", label: "학년별 로드맵", route: "/parents/roadmap", gated: false },
  { emoji: "📐", label: "수학 교육", route: "/parents/math", gated: false },
  { emoji: "📘", label: "AP 과목 가이드", route: "/parents/ap-guide", gated: false },
  { emoji: "📝", label: "AP 문제은행", route: "/parents/question-bank", gated: false },
  { emoji: "📘", label: "AP 개념정리", route: "/parents/core-notes", gated: false },
  { emoji: "📒", label: "단어장", route: "/parents/vocab", gated: false },
  { emoji: "📚", label: "디지털 교재", route: "#textbooks", gated: false },
  { emoji: "🏛️", label: "미국 대학 분석", route: "/parents/colleges", gated: false },
  { emoji: "🏆", label: "합격 활동 분석", route: "/parents/activities", gated: false },
];

// Sorted by views (trending) — the board renders this order as-is.
const RESOURCES = [
  { title: "내가 아이비리그 공대에 오기까지", desc: "아이비리그 공대 합격생이 직접 쓴 합격 수기 — 목차·프롤로그 무료, 본문은 200 크레딧", route: "/parents/story/book", tag: "합격수기", views: 1180, cost: 0 },
  { title: "코넬 공대 합격 에세이 분석", desc: "실제 합격 에세이를 한 문단씩 — 무엇이 왜 잘 됐는지", route: "/parents/essay", tag: "합격에세이", views: 1000, cost: 25 },
  { title: "아이비리그 합격 엑스트라 활동 분석", desc: "합격생 활동 10개 + 직접 만드는 법 (책 출간·논문·웹)", route: "/parents/activities", tag: "합격활동", views: 942, cost: 25 },
  { title: "실제 합격 사례 모음 (언론 공개 + 출처)", desc: "본인이 공개한 실제 합격생 전공·활동·결과 + '왜 통했나' 분석 — 미리보기 무료, 전체 25 크레딧", route: "/parents/cases", tag: "합격사례", views: 654, cost: 25 },
  { title: "미국 대학 분석 — 인재상·입시·인턴십", desc: "하버드부터 UC까지, 학교별 인재상·합격률·취업 파이프라인", route: "/parents/colleges", tag: "대학분석", views: 874, cost: 25 },
  { title: "미국 입시 대회 데이터베이스 (전 분야)", desc: `USABO·NSDA·Scholastic 등 ${COMPETITIONS.length}개 대회 총정리`, route: "/parents/competitions", tag: "자료", views: 731, cost: 0 },
  { title: "학년별 로드맵 (G6–G12)", desc: "학업·시험·활동·에세이를 학년별로", route: "/parents/roadmap", tag: "가이드", views: 562, cost: 0 },
  { title: "전공별 AP 과목 선택 가이드", desc: "‘○○ 전공이면 AP 뭘?’ 8개 전공별 추천", route: "/parents/ap-guide", tag: "가이드", views: 418, cost: 0 },
];

const NOTICES = [
  { title: "InHero 학부모 자료실 오픈 안내", route: "/parents" },
  { title: "AP 문제은행 11,975개 — 12문항 무료 맛보기", route: "/parents/question-bank", gated: false },
  { title: "AP 디지털 교재 6권 추가 (Calc BC 포함)", route: "#textbooks", gated: false },
  { title: "미국 대학 분석 데이터베이스 오픈 (인재상·인턴십)", route: "/parents/colleges", gated: false },
  { title: "아이비리그 합격 엑스트라 활동 분석 공개 (실행 가이드)", route: "/parents/activities", gated: false },
  { title: "합격 수기 ‘내가 아이비리그 공대에 오기까지’ 공개", route: "/parents/story", gated: false },
];

export default function ParentsClient() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [query, setQuery] = useState("");
  const [slide, setSlide] = useState(0);
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);
  const [koNotes, setKoNotes] = useState<KoNote[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [ivyFlip, setIvyFlip] = useState(0);
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {});
    fetch("/api/qa/questions?subject=parent-lounge&sort=latest")
      .then((r) => r.json()).then((d) => setQuestions(d?.questions ?? [])).catch(() => {});
    fetch("/api/textbooks")
      .then((r) => r.json()).then((d) => setTextbooks(d?.textbooks ?? [])).catch(() => {});
    // Pull the featured Korean notes' openings to surface on the homepage.
    Promise.all(FEATURED_KO_NOTES.map((id) =>
      fetch(`/api/core-notes/korean?lessonId=${id}`).then((r) => r.json()).then((d) => d?.note as KoNote).catch(() => null)
    )).then((notes) => setKoNotes(notes.filter(Boolean) as KoNote[]));
    // Ivy student materials preview (auth-gated feed; empty when logged out).
    authFetch("/api/library/feed?official=official")
      .then((r) => r.json())
      .then((d) => setMaterials(Array.isArray(d?.items) ? d.items.slice(0, 5) : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    slideTimer.current = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5500);
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIvyFlip((f) => (f + 1) % IVY_CARDS.length), 2600);
    return () => clearInterval(t);
  }, []);

  // Open the login/signup modal for a destination.
  const requireLogin = (redirectTo: string) =>
    window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo } }));

  // Everything requires login now: a logged-out click never opens content
  // directly — it prompts sign-in first. (In-page anchors still just scroll.)
  const go = (route: string, _gated?: boolean) => {
    if (route.startsWith("#")) {
      document.getElementById(route.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (loggedIn) router.push(route);
    else requireLogin(route);
  };

  // Re-render credit lock badges when the balance / unlocked set changes.
  const [creditTick, setCreditTick] = useState(0);
  useEffect(() => {
    const bump = () => setCreditTick((t) => t + 1);
    window.addEventListener(CREDIT_EVENT, bump);
    bump(); // sync after mount (localStorage is client-only)
    return () => window.removeEventListener(CREDIT_EVENT, bump);
  }, []);

  // Unified credit unlock: login required first; free / already-unlocked go
  // straight through, otherwise a styled confirm modal asks before spending.
  const MATERIAL_COST = CREDIT_COSTS.NOTE_UNIT; // 아이비리그 학생 자료 = 50 크레딧
  const BOOK_COST = CREDIT_COSTS.TEXTBOOK;
  const [gate, setGate] = useState<null | { title: string; cost: number; onConfirm: () => void }>(null);

  async function requestUnlock(opts: { key: string; cost: number; title: string; proceed: () => void; loginRedirect: string }) {
    if (!loggedIn) { requireLogin(opts.loginRedirect); return; }
    if (!opts.cost) { opts.proceed(); return; }
    if (isUnlocked(opts.key)) {
      await hydrateCredits().catch(() => {});
      if (isUnlocked(opts.key)) { opts.proceed(); return; }
    }
    setGate({
      title: opts.title,
      cost: opts.cost,
      onConfirm: async () => {
        setGate(null);
        const result = await spendAndUnlockAccount(opts.key, opts.cost);
        if (result.ok) opts.proceed();
        else if (result.reason === "insufficient") window.dispatchEvent(new CustomEvent("inhero:open-charge"));
        else window.alert("크레딧 차감 확인 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
      },
    });
  }

  // Real view counts — load absolute counts, count one unique view per resource
  // per session on open. Falls back to the in-code baseline if the table/API is
  // unavailable so the board never shows 0.
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const viewedRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    fetch("/api/parents/resource-views").then((r) => r.json())
      .then((d) => setViewCounts(d?.views ?? {})).catch(() => {});
  }, []);
  function trackView(route: string, baseline: number) {
    if (viewedRef.current.has(route)) return;
    viewedRef.current.add(route);
    setViewCounts((m) => ({ ...m, [route]: (m[route] ?? baseline) + 1 }));
    fetch("/api/parents/resource-views", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: route, baseline }),
    }).catch(() => {});
  }

  const openResource = (r: { route: string; cost: number; title: string; views?: number }) => {
    trackView(r.route, r.views ?? 0);
    requestUnlock({ key: `res:${r.route}`, cost: r.cost, title: r.title, proceed: () => router.push(r.route), loginRedirect: r.route });
  };

  const openBook = (b: { slug: string; title: string }) => {
    const route = `/textbooks/${b.slug}`;
    requestUnlock({ key: `book:${b.slug}`, cost: BOOK_COST, title: b.title, proceed: () => router.push(route), loginRedirect: route });
  };

  const openMaterial = (m: Material) => {
    const proceed = () => {
      if (isLargeFile(m.fileSize)) window.location.href = downloadHref(m.attachmentUrl, m.title);
      else router.push(`/library/${m.id}/read`);
    };
    requestUnlock({ key: `material:${m.id}`, cost: MATERIAL_COST, title: m.title, proceed, loginRedirect: `/library/${m.id}/read` });
  };

  const filtered = query.trim()
    ? questions.filter((q) => (q.title + q.content).toLowerCase().includes(query.trim().toLowerCase()))
    : questions;

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", cursor: "auto", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <ReferralPrompt loggedIn={loggedIn} />
      {gate && (
        <div onClick={() => setGate(null)} style={{ position: "fixed", inset: 0, zIndex: 220, background: "rgba(15,23,42,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(400px, 96vw)", background: "#fff", borderRadius: 16, padding: "26px 24px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", textAlign: "center" }}>
            <p style={{ fontSize: 30, margin: "0 0 8px" }}>🔓</p>
            <h3 style={{ fontSize: 18, fontWeight: 850, margin: "0 0 8px", color: "#1a1a1f" }}>여기에 {gate.cost} 크레딧을 사용하시겠습니까?</h3>
            <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6, margin: "0 0 14px" }}>
              <strong style={{ color: "#1a1a1f" }}>{gate.title}</strong><br />한 번 잠금 해제하면 계속 볼 수 있어요.
            </p>
            {/* 지인 추천 넛지 — 잔액이 부족하면 강조, 충분해도 안내 */}
            <button
              onClick={() => { setGate(null); router.push("/parents/me"); }}
              style={{ width: "100%", textAlign: "left", background: getBalance() < gate.cost ? "#fff7ed" : "#f6f4ff", border: `1px solid ${getBalance() < gate.cost ? "#fed7aa" : "#e9defe"}`, borderRadius: 10, padding: "10px 12px", margin: "0 0 16px", cursor: "pointer" }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: getBalance() < gate.cost ? "#c2410c" : "#7c3aed", marginBottom: 2 }}>
                {getBalance() < gate.cost
                  ? `🪙 ${gate.cost - getBalance()}크레딧 부족 — 친구 1명 추천하면 +20!`
                  : "💌 친구를 추천하고 +20 크레딧 받으세요"}
              </div>
              <div style={{ fontSize: 11.5, color: "#94a3b8", lineHeight: 1.5 }}>
                지인이 내 추천코드로 가입하면 둘 다 보너스 · 웰컴 200 + 추천 20 = 책 1권 <span style={{ color: "#7c3aed", fontWeight: 700 }}>내 추천코드 보기 →</span>
              </div>
            </button>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setGate(null)} style={{ flex: 1, background: "#fff", border: "1.5px solid #e2e6ea", color: "#64748b", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>취소</button>
              <button onClick={gate.onConfirm} style={{ flex: 2, background: GREEN, color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>🪙 {gate.cost} 크레딧 사용</button>
            </div>
          </div>
        </div>
      )}
      {/* ── Top bar ── */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 20px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <Link href="/parents" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: "-0.03em", color: "#111" }}>In<span style={{ color: GREEN }}>Hero</span></span>
            <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>유학·미국입시 자료실</span>
          </Link>
          <form onSubmit={(e) => { e.preventDefault(); }} style={{ flex: 1, minWidth: 220, display: "flex", maxWidth: 480, marginLeft: "auto" }}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="게시글, 자료, AP 검색"
              style={{ flex: 1, border: "2px solid #1a1a1f", borderRight: "none", borderRadius: "8px 0 0 8px", padding: "10px 14px", fontSize: 14, outline: "none" }} />
            <button type="submit" aria-label="검색" style={{ background: "#1a1a1f", color: "#fff", border: "none", borderRadius: "0 8px 8px 0", padding: "0 18px", fontSize: 16, cursor: "pointer" }}>🔍</button>
          </form>
          {loggedIn && <MyTierBadge />}
          <CreditWidget loggedIn={loggedIn} />
          <button onClick={() => go("/parents/me", true)}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fff", border: `1.5px solid ${GREEN}`, color: GREEN, borderRadius: 9, padding: "9px 16px", fontSize: 13.5, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
            onMouseEnter={(e) => { const t = e.currentTarget as HTMLElement; t.style.background = GREEN; t.style.color = "#fff"; }}
            onMouseLeave={(e) => { const t = e.currentTarget as HTMLElement; t.style.background = "#fff"; t.style.color = GREEN; }}>
            👤 {loggedIn ? "나의 페이지" : "로그인"}
          </button>
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

      {/* ── Body: main + sidebar (hero sits at the top of the center column, so
            the left/right rails flank it and everything stays pulled up) ── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "14px 20px 80px", display: "grid", gridTemplateColumns: "300px minmax(0,1fr) 320px", gap: 20, alignItems: "start" }} className="parents-grid">
        {/* LEFT RAIL — Korean 일타강사 core notes (the killer content) */}
        <aside style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 14 }} className="parents-left">
          {/* Student-site link — sits above the Korean notes */}
          <a href="https://inheroedu.com" target="_blank" rel="noopener noreferrer"
            style={{ display: "block", textDecoration: "none", background: "linear-gradient(135deg,#0a0a14,#16162a)", borderRadius: 14, padding: "16px 16px", border: "1px solid #e2e6ea" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 18 }}>🎓</span>
              <span style={{ color: "#fff", fontSize: 14.5, fontWeight: 800, letterSpacing: "-0.01em" }}>학생 전용 웹사이트 보러가기</span>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: "0 0 10px" }}>자녀가 직접 공부하는 InHero 학생 사이트 — 강의·문제·커뮤니티까지.</p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#00FF88", fontSize: 13, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>inheroedu.com →</span>
          </a>

          {koNotes.length > 0 ? (
            <section className="cn-spark-card" style={{ position: "relative", overflow: "hidden", background: "#fff", borderRadius: 14, border: "1px solid #e2e6ea", padding: "16px 16px 8px" }}>
              <style>{`
                @keyframes cnSparkGlow {
                  0%,100% { box-shadow: 0 0 0 1px rgba(124,58,237,0.14), 0 6px 22px rgba(124,58,237,0.10), 0 0 16px rgba(0,184,95,0.10); }
                  50%     { box-shadow: 0 0 0 1px rgba(0,184,95,0.38), 0 12px 34px rgba(0,184,95,0.24), 0 0 34px rgba(124,58,237,0.26); }
                }
                @keyframes cnSparkSweep { 0% { transform: translateX(-130%) skewX(-18deg); } 55%,100% { transform: translateX(240%) skewX(-18deg); } }
                @keyframes cnSparkTwinkle { 0%,100% { opacity:.3; transform:scale(.8); } 50% { opacity:1; transform:scale(1.25); } }
                .cn-spark-card { animation: cnSparkGlow 3.2s ease-in-out infinite; }
                .cn-spark-sweep { position:absolute; top:0; bottom:0; left:0; width:36%; pointer-events:none; z-index:1;
                  background: linear-gradient(100deg, transparent, rgba(255,255,255,0.7), rgba(186,230,253,0.45), transparent);
                  animation: cnSparkSweep 3.6s ease-in-out infinite; }
                .cn-spark-star { display:inline-block; animation: cnSparkTwinkle 1.8s ease-in-out infinite; }
                .cn-spark-star.s2 { animation-delay:.6s; } .cn-spark-star.s3 { animation-delay:1.2s; }
                @media (prefers-reduced-motion: reduce){ .cn-spark-card,.cn-spark-sweep,.cn-spark-star{ animation:none !important; } }
              `}</style>
              <div className="cn-spark-sweep" aria-hidden="true" />
              <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                <h2 style={{ fontSize: 15.5, fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>
                  <span className="cn-spark-star" aria-hidden="true">✨</span> 영어 + 한국어 핵심 노트 <span className="cn-spark-star s2" aria-hidden="true">✨</span>
                </h2>
              </div>
              <p style={{ fontSize: 12, color: "#7c3aed", fontWeight: 700, margin: "0 0 14px" }}>한국어로 흐름 잡고 → 영어 원문으로 정복</p>

              <Link href="/parents/core-notes" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ borderRadius: 12, border: "1px solid #eef0f3", background: "linear-gradient(180deg,#fbfcfe,#fff)", padding: "14px 15px" }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", marginBottom: 7 }}>
                    <span style={{ fontSize: 10.5, fontWeight: 800, color: "#047a45", background: "#e9fbf2", borderRadius: 5, padding: "2px 7px" }}>🇰🇷 한국어</span>
                    <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{koNotes[0].emoji} U{koNotes[0].unit}·L{koNotes[0].lessonNum}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 5px", letterSpacing: "-0.02em", lineHeight: 1.25 }}>{koNotes[0].title}</h3>
                  {koNotes[0].subtitle && <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 10px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{koNotes[0].subtitle}</p>}
                  {koNotes[0].overview && (
                    <div style={{ position: "relative", maxHeight: 150, overflow: "hidden" }}>
                      <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap" }}>
                        {koNotes[0].overview.split(/\n\n+/)[0]}
                      </p>
                      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 56, background: "linear-gradient(transparent,#fff)" }} />
                    </div>
                  )}
                  <div style={{ marginTop: 10, color: GREEN, fontSize: 13, fontWeight: 800 }}>이어서 읽기 →</div>
                </div>
              </Link>

              {koNotes.slice(1).map((n) => (
                <Link key={n.lessonId} href="/parents/core-notes" style={{ ...rowStyle, color: "#1f2937", fontSize: 13 }}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: "#047a45", marginRight: 6 }}>🇰🇷</span>{n.title}
                  </span>
                </Link>
              ))}
              <Link href="/parents/core-notes" style={{ display: "block", textAlign: "center", color: GREEN, fontSize: 12.5, fontWeight: 700, textDecoration: "none", padding: "12px 0 6px" }}>전체 노트 보기 <span className="cn-spark-star s3" aria-hidden="true">✨</span> →</Link>
              </div>
            </section>
          ) : (
            <section style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e6ea", padding: "18px 16px" }}>
              <h2 style={{ fontSize: 15.5, fontWeight: 800, margin: "0 0 8px" }}>📘 영어 + 한국어 핵심 노트</h2>
              <p style={{ fontSize: 12.5, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>한국어로 흐름 잡고 → 영어 원문으로 정복하는 AP 개념 노트를 불러오는 중…</p>
            </section>
          )}

          {/* Question bank box — under the Korean notes in the left rail */}
          <button onClick={() => go("/parents/question-bank", false)}
            style={{ textAlign: "left", border: "1px solid #e2e6ea", cursor: "pointer", background: "#fff", borderRadius: 14, padding: "16px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <h2 style={{ fontSize: 15.5, fontWeight: 800, margin: 0 }}>📝 AP 문제 은행</h2>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: "#047a45", background: "#e9fbf2", borderRadius: 6, padding: "2px 8px" }}>11,975개</span>
            </div>
            <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.6, margin: "0 0 12px" }}>College Board 스타일 실전 문제. 보기를 눌러 바로 채점하고 한국어 해설까지.</p>
            <span style={{ display: "block", textAlign: "center", background: GREEN, color: "#fff", borderRadius: 8, padding: "10px", fontSize: 13.5, fontWeight: 800 }}>바로 풀어보기 →</span>
          </button>
        </aside>

        {/* MAIN */}
        <main className="parents-main" style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
          {/* Compact SEO hero — top of the center column, flanked by the rails */}
          <section style={{ background: "linear-gradient(135deg,#ffffff,#eef7f1)", border: "1px solid #e2e6ea", borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eafff3", border: "1px solid #c8f2dc", color: "#047a45", borderRadius: 999, padding: "4px 11px", fontSize: 11.5, fontWeight: 800, marginBottom: 9 }}>
              🎓 아이비리그 재학생이 직접 만든 미국 입시 플랫폼
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.4rem, 2.6vw, 2rem)", fontWeight: 850, letterSpacing: "-0.03em", lineHeight: 1.18, margin: "0 0 8px", color: "#0f172a" }}>
              아이비리그생이 만든 AP·SAT·미국 입시 자료 허브
            </h1>
            <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.6, margin: "0 0 12px" }}>
              AP 실전문제, SAT 자료, 미국 대학 지원 전략, 아이비리그 합격생 노하우를 <strong style={{ color: "#047a45" }}>무료로</strong> 만나보세요.
            </p>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {[
                ["🎓", "아이비리그 재학생 제작"],
                ["📚", "AP 실전문제 11,975+"],
                ["👨‍👩‍👧‍👦", "학부모 커뮤니티 운영"],
                ["🇺🇸", "미국 대학 입시 정보 제공"],
              ].map(([emoji, label]) => (
                <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #e6e8ec", borderRadius: 999, padding: "6px 11px", fontSize: 11.5, fontWeight: 700, color: "#334155" }}>
                  <span style={{ fontSize: 14 }}>{emoji}</span>{label}
                </span>
              ))}
            </div>
          </section>

          {/* Hero carousel */}
          <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", height: 230 }}>
            {SLIDES.map((s, i) => (
              <button key={i} onClick={() => go(s.route, s.gated)}
                style={{ position: "absolute", inset: 0, background: s.bg, border: "none", cursor: "pointer", textAlign: "left", padding: "34px 40px", opacity: i === slide ? 1 : 0, transition: "opacity 600ms", pointerEvents: i === slide ? "auto" : "none", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 34, marginBottom: 10 }}>{s.emoji}</div>
                <div style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.5rem,3.4vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>{s.title}</div>
                <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 14.5 }}>{s.sub}</div>
                <div style={{ marginTop: 16, display: "inline-block", color: "#fff", border: "1.5px solid rgba(255,255,255,0.55)", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, alignSelf: "flex-start" }}>{("cta" in s && s.cta) ? s.cta : s.gated ? "무료 가입하고 보기 →" : "바로 보기 →"}</div>
              </button>
            ))}
            {SLIDES.length > 1 && (
              <>
                <button aria-label="이전" onClick={() => setSlide((slide - 1 + SLIDES.length) % SLIDES.length)} style={navArrow("left")}>‹</button>
                <button aria-label="다음" onClick={() => setSlide((slide + 1) % SLIDES.length)} style={navArrow("right")}>›</button>
                <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
                  {SLIDES.map((_, i) => <span key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 18 : 7, height: 7, borderRadius: 4, background: i === slide ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "width 200ms" }} />)}
                </div>
              </>
            )}
          </div>

          {/* Social proof badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SOCIAL_STATS.map((st) => (
              <span key={st.label} style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "#fff", border: "1px solid #e2e6ea", borderRadius: 999,
                padding: "8px 14px", fontSize: 13, fontWeight: 700, color: "#334155",
                boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
              }}>
                <span style={{ fontSize: 15 }}>{st.emoji}</span>{st.label}
              </span>
            ))}
          </div>

          {/* Quick icons */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e6ea", padding: "20px 16px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }} className="quick-grid">
            {QUICK.map((q) => (
              <button key={q.label} onClick={() => go(q.route, q.gated)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "6px 2px" }}>
                <span style={{ fontSize: 30 }}>{q.emoji}</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "#334155", textAlign: "center", lineHeight: 1.3 }}>{q.label}</span>
              </button>
            ))}
          </div>

          {/* 우리 아이 학습 진단 — quiz CTA (not a nav tab) */}
          <button onClick={() => router.push("/parents/diagnosis")}
            style={{ textAlign: "left", cursor: "pointer", border: "none", borderRadius: 16, padding: "22px 24px", background: "linear-gradient(120deg,#0b3b2e,#0e7c54 60%,#16a36b)", color: "#fff", boxShadow: "0 10px 28px rgba(14,124,84,0.26)", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <span style={{ fontSize: 40, lineHeight: 1 }}>🧪</span>
            <span style={{ flex: 1, minWidth: 200 }}>
              <span style={{ display: "inline-block", fontSize: 11, fontWeight: 800, color: "#bbf7d0", background: "rgba(255,255,255,0.14)", borderRadius: 6, padding: "3px 9px", marginBottom: 8 }}>무료 · 2분 · 로그인 불필요</span>
              <span style={{ display: "block", fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.3 }}>우리 아이 학습 진단</span>
              <span style={{ display: "block", fontSize: 13.5, color: "rgba(255,255,255,0.82)", marginTop: 5, lineHeight: 1.55 }}>12개 질문으로 학습 유형을 진단하고, 강점·보완점과 학부모 코칭 팁까지 받아보세요.</span>
            </span>
            <span style={{ flexShrink: 0, background: "#fff", color: "#0e7c54", borderRadius: 9, padding: "11px 20px", fontSize: 14, fontWeight: 800, whiteSpace: "nowrap" }}>진단 시작 →</span>
          </button>

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
              <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", marginTop: 10, background: "#f0fdf6", border: "1px solid #c8f2dc", borderRadius: 10, padding: "11px 13px", flexWrap: "wrap" }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>💬</span>
                <span style={{ fontSize: 12.5, color: "#1f5138", lineHeight: 1.5, fontWeight: 600, flex: 1, minWidth: 150 }}>
                  질문 주시면 <strong style={{ color: "#047a45" }}>아이비리그생과 전문 컨설턴트</strong>가 24시간 안에 답변 드립니다.
                </span>
                <button onClick={() => go("/parents/lounge", false)}
                  style={{ flexShrink: 0, background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "7px 13px", fontSize: 12, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>
                  질문하러 가기 →
                </button>
              </div>
            </Board>

            {/* 추천 자료 — trending order, view counts visible */}
            <Board title="추천 자료" moreHref="/parents/competitions">
              {RESOURCES.map((r, i) => {
                const owned = r.cost > 0 && isUnlocked(`res:${r.route}`);
                return (
                <div key={`${r.route}-${creditTick}`} onClick={() => openResource(r)} role="button" tabIndex={0}
                  style={{ ...rowStyle, alignItems: "flex-start", flexDirection: "column", gap: 2, cursor: "pointer" }}>
                  <span style={{ display: "flex", gap: 6, alignItems: "center", width: "100%" }}>
                    {i === 0 && <span style={{ fontSize: 11 }}>🔥</span>}
                    <span style={{ fontSize: 10.5, fontWeight: 800, color: "#7c3aed", background: "#f3eefe", borderRadius: 4, padding: "1px 6px" }}>{r.tag}</span>
                    <span style={{ color: "#1f2937", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</span>
                    {r.cost > 0 && (
                      owned
                        ? <span style={{ flexShrink: 0, fontSize: 10.5, fontWeight: 800, color: GREEN, background: "rgba(0,184,95,0.1)", border: `1px solid ${GREEN}`, borderRadius: 999, padding: "1px 8px" }}>✓ 보유</span>
                        : <span style={{ flexShrink: 0, fontSize: 10.5, fontWeight: 800, color: "#a16207", background: "#fffbeb", border: "1px solid #f1d27a", borderRadius: 999, padding: "1px 8px" }}>🔒 {r.cost} 크레딧</span>
                    )}
                    <span style={{ marginLeft: "auto", flexShrink: 0, color: "#94a3b8", fontSize: 11.5, fontWeight: 600 }}>👁 {(viewCounts[r.route] ?? r.views).toLocaleString()}</span>
                  </span>
                  <span style={{ color: "#94a3b8", fontSize: 12.5, paddingLeft: 2 }}>{r.desc}</span>
                </div>
                );
              })}
            </Board>
          </div>

          {/* Ivy League student materials room — flip preview + gated entry */}
          <section style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #e2e6ea", background: "#fff" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 0, alignItems: "stretch" }} className="ivy-grid">
              {/* copy + CTA */}
              <div style={{ padding: "26px 26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <h2 style={{ fontSize: 19, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>🎓 아이비리그 학생 자료방</h2>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#7c3aed", background: "#f3eefe", borderRadius: 6, padding: "2px 9px" }}>멘토 전용</span>
                </div>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, margin: "0 0 18px" }}>
                  아이비리그 재학생 멘토가 공유하는 <strong>합격 에세이 · 활동 리스트 · 학년별 플랜 · 1:1 Q&A</strong>.
                  자녀에게 실제 합격생의 길을 그대로 보여주세요.
                </p>
                <button onClick={() => go("/parents/materials", false)}
                  style={{ background: "#1a1a1f", color: "#fff", border: "none", borderRadius: 10, padding: "14px 26px", fontSize: 14.5, fontWeight: 800, cursor: "pointer" }}>
                  🔒 아이비리그 학생 자료 보기 →
                </button>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: "12px 0 0" }}>멘토 자료방은 가입 후 이용할 수 있습니다.</p>
              </div>

              {/* flip preview — 4 cards cycling */}
              <button onClick={() => go("/parents/materials", false)} aria-label="아이비리그 학생 자료 보기"
                style={{ position: "relative", border: "none", cursor: "pointer", padding: 22, background: "#0a0a14", perspective: "1000px", minHeight: 220 }}>
                <div key={ivyFlip} style={{ animation: "ivyFlip 0.7s cubic-bezier(0.16,1,0.3,1)", transformStyle: "preserve-3d", height: "100%" }}>
                  <div style={{ background: IVY_CARDS[ivyFlip].bg, borderRadius: 12, padding: "20px 20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 12px 30px rgba(0,0,0,0.35)" }}>
                    <div>
                      <div style={{ fontSize: 30, marginBottom: 10 }}>{IVY_CARDS[ivyFlip].emoji}</div>
                      <span style={{ fontSize: 10.5, fontWeight: 800, color: "#fff", background: "rgba(255,255,255,0.18)", borderRadius: 5, padding: "2px 8px" }}>{IVY_CARDS[ivyFlip].tag}</span>
                      <h3 style={{ fontSize: 16.5, fontWeight: 800, color: "#fff", margin: "10px 0 6px", lineHeight: 1.3 }}>{IVY_CARDS[ivyFlip].title}</h3>
                      <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.55, margin: 0 }}>{IVY_CARDS[ivyFlip].desc}</p>
                    </div>
                    <div style={{ display: "flex", gap: 5, marginTop: 14 }}>
                      {IVY_CARDS.map((_, i) => <span key={i} style={{ width: i === ivyFlip ? 16 : 6, height: 6, borderRadius: 3, background: i === ivyFlip ? "#fff" : "rgba(255,255,255,0.4)", transition: "width 200ms" }} />)}
                    </div>
                  </div>
                </div>
                <span style={{ position: "absolute", top: 12, right: 14, fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.6)" }}>🔒 미리보기</span>
              </button>
            </div>
          </section>
        </main>

        {/* SIDEBAR */}
        <aside className="parents-right" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Login / signup */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e6ea", padding: 18 }}>
            {loggedIn ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13.5, color: "#334155", marginBottom: 10 }}>기본 자료는 무료, 프리미엄 자료는 🪙 크레딧으로 잠금 해제하세요.</div>
                <button onClick={() => window.dispatchEvent(new CustomEvent("inhero:open-charge"))} style={{ width: "100%", background: "#fffbeb", color: "#a16207", border: "1.5px solid #f1d27a", borderRadius: 8, padding: "11px", fontWeight: 800, fontSize: 13.5, cursor: "pointer" }}>
                  🪙 크레딧 충전하기
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => go("/question-bank", true)} style={{ width: "100%", background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", marginBottom: 8 }}>
                  무료 가입 + 웰컴 크레딧 받기
                </button>
                <p style={{ fontSize: 11.5, color: "#94a3b8", textAlign: "center", margin: 0 }}>가입 시 웰컴 크레딧 200개 · 카드 필요 없음</p>
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

          {/* Ivy mentor CTA → 1:1 DM with the lead mentor */}
          <button onClick={() => go("/dm/yng0802", true)}
            style={{ textAlign: "left", border: "none", cursor: "pointer", borderRadius: 14, padding: "20px 18px", background: "linear-gradient(135deg,#1e1b4b,#4c1d95)", color: "#fff", boxShadow: "0 8px 24px rgba(76,29,149,0.28)" }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>🎓</div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.35, marginBottom: 6 }}>아이비리그 멘토와<br />소통해보세요!</div>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.72)", lineHeight: 1.6, margin: "0 0 12px" }}>아이비리그 재학생 멘토에게 AP·SAT·입시 전략을 직접 물어보세요.</p>
            <span style={{ display: "inline-block", background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 800 }}>멘토 만나보기 →</span>
          </button>

          <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
            학생이신가요? <Link href="/" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>InHero 둘러보기 →</Link>
          </p>
        </aside>
      </div>

      {/* 자료요청 & 피드백 — full-width box below the boards/sidebar */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "8px 20px 4px" }}>
        <button onClick={() => router.push("/parents/feedback")}
          style={{ width: "100%", textAlign: "left", cursor: "pointer", borderRadius: 16, padding: "22px 26px", background: "#fff", border: "1.5px solid #e2e6ea", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
          <span style={{ fontSize: 38, lineHeight: 1 }}>📮</span>
          <span style={{ flex: 1, minWidth: 220 }}>
            <span style={{ display: "block", fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em", color: "#1a1a1f" }}>자료요청 &amp; 피드백</span>
            <span style={{ display: "block", fontSize: 13.5, color: "#64748b", marginTop: 4, lineHeight: 1.55 }}>필요한 AP 과목·자료, 개선 아이디어, 오류를 남기면 목록에 바로 반영됩니다.</span>
          </span>
          <span style={{ flexShrink: 0, background: GREEN, color: "#fff", borderRadius: 9, padding: "12px 22px", fontSize: 14, fontWeight: 800, whiteSpace: "nowrap" }}>요청하기 →</span>
        </button>
      </section>

      {/* ── Ivy student materials preview (above the textbooks section) ── */}
      <section style={{ background: "#fff", borderTop: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 20px 8px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>🎓 아이비리그 학생 자료</h2>
            <Link href="/parents/materials" style={{ color: GREEN, fontSize: 14, fontWeight: 800, textDecoration: "none", whiteSpace: "nowrap" }}>더 많은 자료 보러가기 →</Link>
          </div>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 22 }}>
            Cornell 등 아이비리그 재학생이 손으로 정리한 실제 AP 학습 노트입니다.
          </p>
          {materials.length > 0 ? (
            <div className="mat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
              {materials.map((m) => {
                const large = isLargeFile(m.fileSize);
                const inner = (
                  <article style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 2px rgba(16,24,40,0.04)", transition: "transform 180ms, box-shadow 200ms" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(16,24,40,0.12)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 2px rgba(16,24,40,0.04)"; }}>
                    <div style={{ position: "relative", height: 200, background: "#f1f3f5", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {m.previewPage1Url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={m.previewPage1Url} alt={m.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                      ) : (
                        <div style={{ textAlign: "center", color: "#94a3b8" }}><div style={{ fontSize: 34 }}>📕</div><div style={{ fontSize: 11, marginTop: 5 }}>미리보기 생성 중…</div></div>
                      )}
                      <span style={{ position: "absolute", top: 9, left: 9, fontSize: 9, fontWeight: 900, letterSpacing: "0.05em", color: "#7c5500", background: "#fde68a", borderRadius: 5, padding: "3px 7px" }}>⭐ INHERO ORIGINAL</span>
                      {!!m.totalPages && m.totalPages > 1 && (
                        <span style={{ position: "absolute", top: 9, right: 9, fontSize: 10.5, fontWeight: 900, color: "#fff", background: "#dc2626", borderRadius: 6, padding: "3px 8px", boxShadow: "0 2px 8px rgba(220,38,38,0.4)" }}>📄 {m.totalPages}p</span>
                      )}
                      <span style={{ position: "absolute", bottom: 9, right: 9, fontSize: 10.5, fontWeight: 800, borderRadius: 999, padding: "2px 9px",
                        color: isUnlocked(`material:${m.id}`) ? "#fff" : "#a16207",
                        background: isUnlocked(`material:${m.id}`) ? GREEN : "rgba(255,251,235,0.95)",
                        border: isUnlocked(`material:${m.id}`) ? "none" : "1px solid #f1d27a" }}>
                        {isUnlocked(`material:${m.id}`) ? "✓ 보유" : `🔒 ${MATERIAL_COST} 크레딧`}
                      </span>
                    </div>
                    <div style={{ padding: "12px 14px 14px" }}>
                      <div style={{ fontSize: 13.5, fontWeight: 800, color: "#1a1a1f", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: 37 }}>{m.title}</div>
                      {large && <div style={{ fontSize: 11.5, fontWeight: 800, color: "#2563eb", marginTop: 6 }}>⬇ 다운로드 (용량 큼)</div>}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                        {m.lounge && <span style={{ fontSize: 11, color: "#94a3b8" }}>📕 {m.lounge.name}</span>}
                        {m.author && <span style={{ fontSize: 11, color: "#64748b", fontStyle: "italic", fontWeight: 600 }}>by {m.author.handle}</span>}
                      </div>
                    </div>
                  </article>
                );
                return (
                  <button key={`${m.id}-${creditTick}`} onClick={() => openMaterial(m)}
                    style={{ textAlign: "left", border: "none", background: "none", padding: 0, cursor: "pointer", color: "inherit", display: "block", width: "100%" }}>
                    {inner}
                  </button>
                );
              })}
            </div>
          ) : (
            <Link href="/parents/materials" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, textDecoration: "none", background: "linear-gradient(135deg,#0a0a14,#13131f)", color: "#fff", borderRadius: 14, padding: "28px 22px", fontSize: 15, fontWeight: 800 }}>
              🔒 아이비리그 학생이 직접 쓴 실제 AP 노트 보기 →
            </Link>
          )}
        </div>
      </section>

      {/* ── Digital textbooks section (bottom of the portal) ── */}
      <section id="textbooks" style={{ background: "#fff", borderTop: "1px solid #e2e6ea", scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 20px 56px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>📚 AP 디지털 교재</h2>
            <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>{textbooks.length}권 · 풀 커리큘럼</span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 800, color: "#92400e",
              background: "#fef3c7", border: "1px solid #fcd34d",
              borderRadius: 999, padding: "5px 12px", letterSpacing: "-0.01em",
            }}>
              ✍️ 아이비리그생 손필기 + 노하우
            </span>
          </div>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 22 }}>
            Limits부터 무한급수까지, AP 전 범위를 담은 디지털 교재입니다. 표지를 눌러 바로 읽어보세요.
          </p>

          {/* Flip preview of the textbook spreads (typed page + handwritten notes) */}
          <TextbookFlipPreview />

          <div className="tb-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(168px, 1fr))", gap: 16 }}>
            {[...textbooks].sort((a, b) => (a.slug === "ap-bio-ultimate" ? -1 : b.slug === "ap-bio-ultimate" ? 1 : 0)).map((b) => {
              const bookOwned = isUnlocked(`book:${b.slug}`);
              const isBio = b.slug === "ap-bio-ultimate";
              return (
              <button key={`${b.slug}-${creditTick}`} onClick={() => openBook(b)}
                style={{ textAlign: "left", background: "#fff", border: "1px solid #e2e6ea", borderRadius: 14, overflow: "hidden", cursor: "pointer", padding: 0, boxShadow: "0 1px 2px rgba(16,24,40,0.04)", transition: "transform 180ms, box-shadow 200ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(16,24,40,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 2px rgba(16,24,40,0.04)"; }}>
                <div style={{ position: "relative", height: 218, background: "linear-gradient(135deg,#0a0a14,#1e1e2e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, overflow: "hidden" }}>
                  <span style={{ position: "absolute", top: 8, right: 8, zIndex: 2, fontSize: 10.5, fontWeight: 800, borderRadius: 999, padding: "2px 9px",
                    color: bookOwned ? "#fff" : "#a16207", background: bookOwned ? GREEN : "rgba(255,251,235,0.95)", border: bookOwned ? "none" : "1px solid #f1d27a" }}>
                    {bookOwned ? "✓ 보유" : "🔒 500 크레딧"}
                  </span>
                  {isBio && (
                    <span style={{ position: "absolute", top: 8, left: 8, zIndex: 2, fontSize: 11, fontWeight: 900, color: "#fff", background: "linear-gradient(135deg,#f97316,#dc2626)", borderRadius: 999, padding: "3px 9px", boxShadow: "0 2px 8px rgba(220,38,38,0.4)" }}>🔥 인기</span>
                  )}
                  <span aria-hidden="true">{TEXTBOOK_GLYPH[b.slug] ?? "📘"}</span>
                  {TEXTBOOK_COVER[b.slug] && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={TEXTBOOK_COVER[b.slug]} alt={`${b.title} 표지`} loading="lazy"
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  )}
                </div>
                <div style={{ padding: "13px 14px 15px" }}>
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: "#1a1a1f", letterSpacing: "-0.01em", lineHeight: 1.3 }}>{b.title}{isBio && " 🔥"}</div>
                  {b.subtitle && <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 2 }}>{b.subtitle}</div>}
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 8, fontWeight: 600 }}>{b.total_chapters ? `${b.total_chapters}개 챕터` : "디지털 교재"}</div>
                </div>
              </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer: KakaoTalk channel contact ── */}
      <footer style={{ background: "#1a1a1f", color: "#fff", borderTop: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 20px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div style={{ minWidth: 240 }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", marginBottom: 8 }}>In<span style={{ color: GREEN }}>Hero</span> <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>인히어로에듀</span></div>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.62)", lineHeight: 1.7, margin: 0, maxWidth: 420 }}>
              문의사항이나 문제가 있으시면 카카오톡 채널로 연락 주세요. <strong style={{ color: "#fff" }}>늦어도 24시간 안에 답장</strong>드립니다.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
            <a href="http://pf.kakao.com/_ZchdX/chat" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#FEE500", color: "#191600", textDecoration: "none", borderRadius: 12, padding: "13px 24px", fontSize: 15, fontWeight: 800, boxShadow: "0 8px 22px rgba(254,229,0,0.22)" }}>
              <span style={{ fontSize: 18 }}>💬</span> 카카오톡으로 문의하기
            </a>
            <a href="http://pf.kakao.com/_ZchdX" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12.5, color: "#cbd5e1", textDecoration: "none" }}>
              채널 추가하기 · @inhero →
            </a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 20px", fontSize: 11.5, color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} InHero 인히어로에듀 · 유학·미국입시 자료실
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes ivyFlip { from { transform: rotateY(-90deg); opacity: 0; } to { transform: rotateY(0); opacity: 1; } }
        @media (max-width: 620px) { .ivy-grid { grid-template-columns: 1fr !important; } }
        /* Tablet: drop the left rail into the flow above the main content. */
        @media (max-width: 1100px) {
          .parents-grid { grid-template-columns: minmax(0,1fr) 320px !important; }
          .parents-left { position: static !important; grid-column: 1 / -1; }
        }
        /* Mobile: single column. Lead with the hero (main), then the Korean
           note rail, then the sidebar — matches the phone mental model. */
        @media (max-width: 880px) {
          .parents-grid { grid-template-columns: 1fr !important; }
          .parents-left { grid-column: auto !important; order: 2; }
          .parents-main { order: 1; }
          .parents-right { order: 3; }
          .board-grid { grid-template-columns: 1fr !important; }
        }
        /* Phone: keep all 10 shortcuts in a tidy 5-up grid; materials/textbooks
           show 2-up below so everything is visible at a glance. */
        @media (max-width: 600px) {
          .mat-grid, .tb-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 400px) {
          .quick-grid { grid-template-columns: repeat(4, 1fr) !important; }
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
