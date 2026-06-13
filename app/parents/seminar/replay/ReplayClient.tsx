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

const GREEN = "#00b85f";

export default function ReplayClient() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [deckUrl, setDeckUrl] = useState<string | null>(null);
  const [err, setErr] = useState("");

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
        <p style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", marginBottom: 10 }}>🎥 무료 세미나 다시보기</p>
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

            <div style={{ marginTop: 30, background: "#fff", border: "1px solid #e2e6ea", borderRadius: 16, padding: "22px 24px" }}>
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
              {deckUrl && (
                <div style={{ marginTop: 18, borderRadius: 12, overflow: "hidden", border: "1px solid #e6e8ec" }}>
                  <iframe src={`${deckUrl}#view=FitH`} title="세미나 발표자료" style={{ width: "100%", height: 540, border: "none", display: "block" }} />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
