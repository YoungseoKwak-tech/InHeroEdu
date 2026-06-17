"use client";

/**
 * /parents/seminar/replay — login-gated seminar replay.
 * The video + deck live in a PRIVATE bucket; signed URLs are fetched from
 * /api/parents/seminar/media only after the user is signed in. Anonymous
 * visitors see a "10초 가입하고 시청" gate.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";
import LiveStatBadge from "@/components/social/LiveStatBadge";

const GREEN = "#00b85f";

type Tab = "video" | "deck" | "book";

export default function ReplayClient() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [deckUrl, setDeckUrl] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<Tab>("video");

  useEffect(() => {
    let alive = true;
    (async () => {
      let session = null;
      try { session = await getClientSession(); } catch { /* treat as anon */ }
      if (!alive) return;
      if (!session?.user) { setAuthed(false); return; }
      setAuthed(true);
      try {
        const [v, d] = await Promise.all([
          authFetch("/api/parents/seminar/media?which=video").then((r) => r.json()).catch(() => null),
          authFetch("/api/parents/seminar/media?which=deck").then((r) => r.json()).catch(() => null),
        ]);
        if (!alive) return;
        if (v?.url) setVideoUrl(v.url); else setErr("영상을 불러오지 못했어요. 새로고침해 주세요.");
        if (d?.url) setDeckUrl(d.url);
      } catch {
        if (alive) setErr("불러오는 중 오류가 발생했어요. 새로고침해 주세요.");
      }
    })();
    return () => { alive = false; };
  }, []);

  function login() {
    window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", source: "seminar-replay", redirectTo: "/parents/seminar/replay" } }));
  }

  return (
    <div style={{ minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents/seminar" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 세미나</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "32px 20px 90px" }}>
        <div style={{ marginBottom: 26, background: "linear-gradient(135deg,#0b3b2e,#0e7c54 60%,#16a36b)", color: "#fff", borderRadius: 16, padding: "26px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", boxShadow: "0 10px 28px rgba(14,124,84,0.24)" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.01em" }}>📚 더 많은 자료 보기</h2>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.82)", margin: 0, lineHeight: 1.6 }}>
              합격 수기 · 합격 프로필 · AP 문제은행 · 미국 대학 분석까지, 학부모 자료실의 모든 자료를 둘러보세요.
            </p>
          </div>
          <Link href="/parents" style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0e7c54", textDecoration: "none", borderRadius: 10, padding: "13px 22px", fontWeight: 800, fontSize: 14, whiteSpace: "nowrap" }}>
            자료실 전체 보기 →
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", margin: 0 }}>🎥 무료 세미나 다시보기</p>
          <LiveStatBadge base={31} emoji="💳" label="오늘 결제" tone="#7c3aed" />
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.6vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>
          아이비리그 자기주도 완전정복 — 세미나 풀영상
        </h1>
        <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.7, marginBottom: 22 }}>
          사교육 없이 코넬 공대에 간 학생이 직접 진행한 무료 세미나 전체 영상입니다. 과목 선정 · 합격 활동(스파이크) · 합격 에세이 · GPA/SAT 전략까지.
        </p>

        {authed === null && (
          <p style={{ color: "#94a3b8", fontSize: 14, padding: "40px 0", textAlign: "center" }}>불러오는 중…</p>
        )}

        {authed === false && (
          <div style={{ background: "linear-gradient(160deg,#0a0a14,#1b1340 60%,#2d1a5e)", color: "#fff", borderRadius: 18, padding: "40px 28px", textAlign: "center", boxShadow: "0 16px 40px rgba(20,10,50,0.28)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔒🎥</div>
            <h2 style={{ fontSize: "clamp(1.4rem,3.4vw,2rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 10px", lineHeight: 1.25 }}>
              2시간 세미나, 로그인하면 바로 시청
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, margin: "0 auto 24px", maxWidth: 460 }}>
              강의 보려고 하는 로그인, <b style={{ color: "#fff" }}>10초면 가입</b>돼요. 가입하고 바로 <b style={{ color: "#5fe0a0" }}>2시간 세미나 풀영상 + 발표자료(PDF)</b>를 시청하세요.
            </p>
            <button onClick={login}
              style={{ background: GREEN, color: "#03120c", border: "none", borderRadius: 12, padding: "16px 36px", fontWeight: 800, fontSize: 17, cursor: "pointer", boxShadow: "0 10px 26px rgba(0,184,95,0.4)" }}>
              10초 만에 가입하고 시청하기 →
            </button>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 14 }}>이미 계정이 있으면 로그인하면 바로 재생됩니다.</p>
          </div>
        )}

        {authed === true && (
          <>
            {/* 탭 바 — 영상 / 발표자료 / 책 읽기 전환 */}
            <div role="tablist" aria-label="세미나 콘텐츠" style={{ display: "flex", gap: 6, background: "#fff", border: "1px solid #e2e6ea", borderRadius: 14, padding: 6, marginBottom: 20, boxShadow: "0 4px 14px rgba(0,0,0,0.05)" }}>
              {([
                ["video", "🎥 세미나 영상"],
                ["deck", "📑 발표자료"],
                ["book", "📖 책 읽기"],
              ] as [Tab, string][]).map(([id, label]) => {
                const active = tab === id;
                return (
                  <button key={id} role="tab" aria-selected={active} onClick={() => setTab(id)} type="button"
                    style={{ flex: 1, padding: "12px 10px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 14,
                      background: active ? GREEN : "transparent", color: active ? "#fff" : "#475569",
                      boxShadow: active ? "0 6px 16px rgba(0,184,95,0.3)" : "none", transition: "background 0.15s" }}>
                    {label}
                  </button>
                );
              })}
            </div>

            {/* 영상 탭 */}
            {tab === "video" && (
              <div style={{ background: "#000", borderRadius: 16, overflow: "hidden", border: "1px solid #e2e6ea", boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}>
                {videoUrl ? (
                  <video controls playsInline preload="metadata" style={{ width: "100%", display: "block", aspectRatio: "16 / 9", background: "#000" }}>
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <div style={{ aspectRatio: "16 / 9", display: "flex", alignItems: "center", justifyContent: "center", color: "#9aa6b2", fontSize: 14 }}>
                    {err || "영상 준비 중…"}
                  </div>
                )}
              </div>
            )}

            {/* 발표자료 탭 */}
            {tab === "deck" && (
              <div style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 16, padding: "22px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.01em" }}>📑 세미나 발표자료 (PDF)</h2>
                    <p style={{ fontSize: 13.5, color: "#64748b", margin: 0 }}>세미나에서 쓴 슬라이드 전체를 보고 다운로드하세요.</p>
                  </div>
                  {deckUrl && (
                    <a href={deckUrl} target="_blank" rel="noopener noreferrer"
                      style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8, background: GREEN, color: "#fff", textDecoration: "none", borderRadius: 10, padding: "12px 20px", fontWeight: 800, fontSize: 14 }}>
                      발표자료 열기 / 다운로드 →
                    </a>
                  )}
                </div>
                {deckUrl ? (
                  <div style={{ marginTop: 18, borderRadius: 12, overflow: "hidden", border: "1px solid #e6e8ec" }}>
                    <iframe src={`${deckUrl}#view=FitH`} title="세미나 발표자료" style={{ width: "100%", height: 540, border: "none", display: "block" }} />
                  </div>
                ) : (
                  <p style={{ marginTop: 18, color: "#9aa6b2", fontSize: 14 }}>발표자료 준비 중…</p>
                )}
              </div>
            )}

            {/* 책 읽기 탭 — 책은 유료 게이트라 임베드 대신 미리보기로 라우팅 */}
            {tab === "book" && (
              <div style={{ background: "linear-gradient(135deg,#0b1622,#143047)", color: "#fff", borderRadius: 16, padding: "30px 28px", boxShadow: "0 12px 32px rgba(11,22,34,0.2)" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#5fe0a0", letterSpacing: "0.03em", marginBottom: 10 }}>📖 합격 수기</div>
                <h2 style={{ fontSize: "clamp(1.3rem,3vw,1.7rem)", fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                  『내가 아이비리그 공대에 오기까지』
                </h2>
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.84)", lineHeight: 1.75, margin: "0 0 22px", maxWidth: 620 }}>
                  세미나의 토대가 된 <b style={{ color: "#fff" }}>230페이지 자기주도 입시 수기</b>. 사교육 없이 코넬 공대에 간 4년의 시행착오를 그대로 담았습니다. 목차·프롤로그는 무료로 바로 읽어보세요.
                </p>
                <Link href="/parents/story/book"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: GREEN, color: "#fff", textDecoration: "none", borderRadius: 12, padding: "15px 30px", fontWeight: 800, fontSize: 16, boxShadow: "0 10px 26px rgba(0,184,95,0.4)" }}>
                  책 읽으러 가기 →
                </Link>
              </div>
            )}

            {/* ───────────────── 프로그램 홍보 ───────────────── */}
            <div style={{ marginTop: 40, textAlign: "center" }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: GREEN, letterSpacing: "0.04em", marginBottom: 8 }}>NEXT STEP — 영상으로 끝내지 말고, 직접 함께</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.5rem,3.4vw,2rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 10px" }}>
                아이비리그 선배와 직접 함께하기
              </h2>
              <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
                세미나에서 본 방향 찾기·자기주도 시스템을, 코넬 공대 선배가 우리 아이에게 직접 적용해 줍니다. 가벼운 한 걸음부터, 인생을 바꾸는 4주까지.
              </p>
            </div>

            {/* 1단계 — 2시간 방향성 설계 세션 */}
            <div style={{ marginTop: 22, background: "linear-gradient(135deg,#0b3b2e,#0e7c54 58%,#16a36b)", color: "#fff", borderRadius: 18, padding: "30px 30px", boxShadow: "0 14px 34px rgba(14,124,84,0.28)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(255,255,255,0.16)", borderRadius: 999, padding: "5px 12px", fontSize: 12.5, fontWeight: 800, letterSpacing: "0.02em" }}>1단계 · 가볍게 시작</span>
                <span style={{ background: "#fff", color: "#0e7c54", borderRadius: 999, padding: "5px 12px", fontSize: 12.5, fontWeight: 800 }}>2시간 · $200</span>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.3rem,3vw,1.7rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 10px", lineHeight: 1.25 }}>
                2시간 방향성 설계 세션 — &ldquo;좋아하는 것 찾기&rdquo;
              </h3>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.75, margin: "0 0 18px", maxWidth: 620 }}>
                아이가 막연히 &ldquo;뭘 좋아하는지 모르겠다&rdquo;고 할 때, 선배가 단둘이 2시간을 들여 함께 찾습니다. 좋아하는 감정·동경 인물·핵심 가치를 끌어내 <b style={{ color: "#fff" }}>One Sentence Mission</b>과 첫 방향을 함께 그려요. 4주가 부담스럽다면 여기서부터.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "grid", gap: 8 }}>
                {[
                  "좋아하는 감정·주제 키워드 3개 도출",
                  "동경 인물에서 끌어낸 핵심 가치 3개",
                  "&ldquo;나는 ___를 통해 ___ 문제를 푸는 사람&rdquo; — 미션 한 문장 완성",
                  "다음 한 걸음(첫 발판) 로드맵까지",
                ].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 14, color: "rgba(255,255,255,0.92)" }}>
                    <span style={{ color: "#bff5d8", fontWeight: 900, flexShrink: 0 }}>✓</span>
                    <span dangerouslySetInnerHTML={{ __html: t }} />
                  </li>
                ))}
              </ul>
              <a href="https://open.kakao.com/o/kathleen0802" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0e7c54", textDecoration: "none", borderRadius: 12, padding: "15px 30px", fontWeight: 800, fontSize: 16, boxShadow: "0 8px 22px rgba(0,0,0,0.18)" }}>
                카카오톡 kathleen0802로 신청 →
              </a>
            </div>

            {/* 2단계 — 4주 몰입 스프린트 */}
            <div style={{ marginTop: 16, background: "linear-gradient(160deg,#0a0a14,#1b1340 60%,#2d1a5e)", color: "#fff", borderRadius: 18, padding: "30px 30px", boxShadow: "0 16px 40px rgba(20,10,50,0.28)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(255,255,255,0.14)", borderRadius: 999, padding: "5px 12px", fontSize: 12.5, fontWeight: 800, letterSpacing: "0.02em" }}>2단계 · 인생을 바꾸는 4주</span>
                <span style={{ background: GREEN, color: "#03120c", borderRadius: 999, padding: "5px 12px", fontSize: 12.5, fontWeight: 800 }}>4인 소그룹 · 대면+줌</span>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.3rem,3vw,1.7rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 10px", lineHeight: 1.25 }}>
                아이비리그 자기주도 4주 집중 스프린트
              </h3>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.75, margin: "0 0 18px", maxWidth: 620 }}>
                아이비리그 선배와 함께하는 <b style={{ color: "#5fe0a0" }}>4주 몰입 스프린트</b>. 주 2회 그룹 세션으로 8주 분량을 4주에 압축하고, 졸업 시 <b style={{ color: "#fff" }}>방향(Direction)·시스템(System)·결과물(Output) v1</b>과 평생 가는 자립형 학습 능력을 손에 쥐고 나옵니다.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 20 }}>
                {[
                  ["WEEK 1 · DISCOVER", "좋아하는 감정·동경 인물·미래 시뮬 → Direction Portfolio 완성, 트랙 선택"],
                  ["WEEK 2 · BUILD 착수", "단권화·Feynman·Architecture 확정 → 결과물 제작 착수"],
                  ["WEEK 3 · 자율 실행", "제작 몰입·또래 피드백·아이비 게스트 + 오답/시험 전략"],
                  ["WEEK 4 · 완결·발표", "결과물 v1 공개 + 자립 시스템 문서 + 면접 모의"],
                ].map(([w, d]) => (
                  <div key={w} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 14px" }}>
                    <p style={{ fontSize: 11.5, fontWeight: 800, color: "#5fe0a0", letterSpacing: "0.03em", margin: "0 0 6px" }}>{w}</p>
                    <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.55, margin: 0 }}>{d}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 20px" }}>
                그룹 32h + 1:1 4h + <b style={{ color: "#fff" }}>Founder Day 2회(종일)</b> + ★ <b style={{ color: "#fff" }}>1:1 Founder 하루 동행</b> — 선배의 진짜 하루를 단둘이 종일 곁에서 보며 평생 롤모델을 만나는 시간까지 포함.
              </p>
              <a href="https://open.kakao.com/o/kathleen0802" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: GREEN, color: "#03120c", textDecoration: "none", borderRadius: 12, padding: "15px 30px", fontWeight: 800, fontSize: 16, boxShadow: "0 10px 26px rgba(0,184,95,0.4)" }}>
                카카오톡 kathleen0802로 상담 신청 →
              </a>
            </div>

            <div style={{ marginTop: 16, background: "linear-gradient(135deg,#0b3b2e,#0e7c54 60%,#16a36b)", color: "#fff", borderRadius: 16, padding: "26px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", boxShadow: "0 10px 28px rgba(14,124,84,0.24)" }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.01em" }}>📚 더 많은 자료 보기</h2>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.82)", margin: 0, lineHeight: 1.6 }}>
                  합격 수기 · 합격 프로필 · AP 문제은행 · 미국 대학 분석까지, 학부모 자료실의 모든 자료를 둘러보세요.
                </p>
              </div>
              <Link href="/parents" style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0e7c54", textDecoration: "none", borderRadius: 10, padding: "13px 22px", fontWeight: 800, fontSize: 14, whiteSpace: "nowrap" }}>
                자료실 전체 보기 →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
