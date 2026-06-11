"use client";

/**
 * /parents/admits — 합격 프로필. School-by-school admit records: the admission
 * letter (합격증, shown as the hero), the Common App main essay, and the
 * supplemental essays. Sign-in gated like the rest of the parent portal.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";
import { ADMITS, type Admit } from "@/lib/data/admits";

const GREEN = "#00b85f";

export default function AdmitsClient() {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [activeId, setActiveId] = useState(ADMITS[0]?.id);
  const [zoom, setZoom] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const session = await getClientSession().catch(() => null);
      if (cancelled) return;
      if (session?.user) { setAllowed(true); return; }
      setAllowed(false);
      window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/admits" } }));
      router.replace("/parents");
    })();
    return () => { cancelled = true; };
  }, [router]);

  const admit: Admit | undefined = ADMITS.find((a) => a.id === activeId) ?? ADMITS[0];

  if (allowed !== true) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#eef1f4", color: "#64748b", fontSize: 14 }}>
        {allowed === null ? "확인 중…" : "로그인이 필요해요. 자료실로 이동합니다…"}
      </div>
    );
  }
  if (!admit) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ margin: "0 auto", padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 합격 프로필</span>
        </div>
      </div>

      <div style={{ margin: "0 auto", padding: "32px 40px 90px", maxWidth: 1080 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", marginBottom: 8 }}>🎓 합격 프로필</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.4vw,2.2rem)", fontWeight: 850, letterSpacing: "-0.03em", marginBottom: 10 }}>
          학교별 합격증 & 합격 에세이
        </h1>
        <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, marginBottom: 20, maxWidth: 680 }}>
          실제 합격생의 <strong>합격증(Admission Letter)</strong>과 그 학생이 제출한 <strong>Common App 메인 에세이</strong>·<strong>Supplemental 에세이</strong> 원본을 학교별로 모았어요. 합격을 만든 진짜 글을 그대로 읽어보세요.
        </p>

        {/* School chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}>
          {ADMITS.map((a) => {
            const on = a.id === admit.id;
            return (
              <button key={a.id} onClick={() => setActiveId(a.id)}
                style={{ display: "inline-flex", alignItems: "center", gap: 7, background: on ? "#fff" : "#f6f7f9", border: `1.5px solid ${on ? a.accent : "#e2e6ea"}`, borderRadius: 999, padding: "9px 15px", fontSize: 13.5, fontWeight: 800, color: on ? a.accent : "#475569", cursor: "pointer", boxShadow: on ? `0 2px 10px ${a.accent}22` : "none" }}>
                <span style={{ fontSize: 16 }}>{a.emoji}</span>{a.school}
              </button>
            );
          })}
        </div>

        {/* ── Admit profile ── */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,440px) minmax(0,1fr)", gap: 28, alignItems: "start" }} className="adm-grid">
          {/* LEFT — the 합격증 hero */}
          <div style={{ position: "sticky", top: 80 }} className="adm-left">
            <div style={{ position: "relative", background: "#fff", borderRadius: 18, border: `1px solid #e2e6ea`, boxShadow: "0 18px 50px rgba(15,23,42,0.14)", padding: 14, overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: admit.accent }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "4px 4px 12px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#e9fbf2", color: "#047a45", borderRadius: 999, padding: "5px 11px", fontSize: 12, fontWeight: 900 }}>✅ ADMITTED</span>
                <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>{admit.classOf}</span>
              </div>
              <button onClick={() => setZoom(admit.letterImage)} title="크게 보기"
                style={{ display: "block", width: "100%", border: "none", padding: 0, background: "none", cursor: "zoom-in", borderRadius: 10, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={admit.letterImage} alt={`${admit.school} 합격증`} style={{ display: "block", width: "100%", height: "auto", borderRadius: 10, border: "1px solid #eef0f3" }} />
              </button>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button onClick={() => setZoom(admit.letterImage)} style={{ flex: 1, background: "#1a1a1f", color: "#fff", border: "none", borderRadius: 10, padding: "11px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>🔍 크게 보기</button>
                <a href={admit.letterImage} download style={{ flex: 1, textAlign: "center", background: "#fff", color: "#1a1a1f", border: "1.5px solid #e2e6ea", borderRadius: 10, padding: "11px", fontWeight: 800, fontSize: 13, textDecoration: "none" }}>⬇ 합격증 저장</a>
              </div>
            </div>
          </div>

          {/* RIGHT — profile + essays */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Profile header */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e6ea", padding: "20px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <span style={{ fontSize: 34 }}>{admit.emoji}</span>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 850, margin: 0, letterSpacing: "-0.02em", color: admit.accent }}>{admit.school}</h2>
                  <p style={{ fontSize: 13, color: "#94a3b8", margin: "2px 0 0", fontWeight: 600 }}>{admit.schoolKo} · {admit.location}</p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 12 }}>
                {[admit.college, admit.major, admit.decision].map((t) => (
                  <span key={t} style={{ fontSize: 12, fontWeight: 700, color: "#334155", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 8, padding: "5px 11px" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Common App essay */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e6ea", padding: "20px 22px" }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#7c3aed", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>📝 Common App 메인 에세이</div>
              <h3 style={{ fontSize: 17, fontWeight: 850, margin: "0 0 7px", letterSpacing: "-0.01em" }}>{admit.commonApp.title}</h3>
              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, margin: "0 0 14px" }}>{admit.commonApp.blurb}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {admit.commonApp.analysisHref && (
                  <Link href={admit.commonApp.analysisHref} style={{ background: GREEN, color: "#fff", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 800, textDecoration: "none" }}>📖 문단별 분석 보기 →</Link>
                )}
                {admit.commonApp.pdf && (
                  <a href={admit.commonApp.pdf} target="_blank" rel="noopener noreferrer" style={{ background: "#fff", color: "#1a1a1f", border: "1.5px solid #e2e6ea", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 800, textDecoration: "none" }}>📄 원문 PDF</a>
                )}
              </div>
            </div>

            {/* Supplemental essays */}
            <div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
                <h3 style={{ fontSize: 17, fontWeight: 850, margin: 0, letterSpacing: "-0.01em" }}>✍️ Supplemental 에세이 <span style={{ color: "#94a3b8", fontWeight: 700, fontSize: 14 }}>{admit.supplements.length}편</span></h3>
                {admit.supplementFile && (
                  <a href={admit.supplementFile} download style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", textDecoration: "none" }}>⬇ 원본 받기</a>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {admit.supplements.map((e, i) => (
                  <article key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e6ea", padding: "20px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11.5, fontWeight: 900, color: "#fff", background: admit.accent, borderRadius: 7, padding: "3px 10px" }}>Essay {i + 1}</span>
                      {e.wordLimit && <span style={{ fontSize: 11.5, fontWeight: 700, color: "#94a3b8" }}>{e.wordLimit}</span>}
                    </div>
                    <p style={{ fontSize: 13, color: "#64748b", fontStyle: "italic", lineHeight: 1.65, margin: "0 0 14px", paddingLeft: 12, borderLeft: `3px solid ${admit.accent}33` }}>{e.prompt}</p>
                    {e.paragraphs.map((p, j) => (
                      <p key={j} style={{ fontSize: 14.5, color: "#1f2937", lineHeight: 1.85, margin: j === 0 ? 0 : "12px 0 0" }}>{p}</p>
                    ))}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for the 합격증 */}
      {zoom && (
        <div onClick={() => setZoom(null)} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(8,10,18,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "zoom-out" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoom} alt="합격증 원본" style={{ maxWidth: "min(900px,96vw)", maxHeight: "94vh", width: "auto", height: "auto", borderRadius: 8, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }} />
          <button onClick={() => setZoom(null)} style={{ position: "fixed", top: 18, right: 22, background: "rgba(255,255,255,0.15)", color: "#fff", border: "none", borderRadius: 999, width: 40, height: 40, fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
      )}

      <style>{`@media (max-width: 860px){ .adm-grid { grid-template-columns: 1fr !important; } .adm-left { position: static !important; } }`}</style>
    </div>
  );
}
