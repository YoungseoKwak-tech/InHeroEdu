"use client";

/**
 * /parents/math — 수학 교육. White portal page (colleges/competitions pattern):
 * US math track table, per-course topics (EN+KO), Korean middle-school
 * curriculum, and a US↔KR level summary + 서술형/단답형 culture note.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";
import {
  TRACKS, US_TRACK_TABLE, US_COURSE_TOPICS, KR_MIDDLE_SCHOOL,
  LEVEL_SUMMARY, INTRO_TEXT, STYLE_DIFFERENCE,
} from "./data";

const GREEN = "#00b85f";
const TRACK_COLOR: Record<string, string> = {
  Regular: "#64748b",
  Honor: "#2563eb",
  "Highly Advanced": "#7c3aed",
};

export default function MathClient() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [openCourse, setOpenCourse] = useState<string | null>(US_COURSE_TOPICS[0]?.course ?? null);

  useEffect(() => { getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {}); }, []);

  const gateToTools = () => {
    if (loggedIn) router.push("/parents/question-bank");
    else window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/question-bank" } }));
  };

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: GREEN }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 100px" }}>
        {/* Header */}
        <p style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", letterSpacing: "0.04em", marginBottom: 10 }}>📐 미국 수학 교육과정</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
          미국 수학, <span style={{ color: "#2563eb" }}>한국 과정과 비교</span>하면
        </h1>
        <p style={{ fontSize: 15.5, color: "#475569", lineHeight: 1.8, marginBottom: 28 }}>
          {INTRO_TEXT}
        </p>

        {/* 1) US track table */}
        <Section emoji="🇺🇸" title="학년별 수학 트랙 (Regular · Honor · Highly Advanced)"
          desc="같은 학년이라도 트랙에 따라 과정이 1~2년씩 앞서갑니다. 자녀가 어느 트랙에 있는지부터 확인하세요.">
          <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid #e6e8ec" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560, fontSize: 13.5 }}>
              <thead>
                <tr style={{ background: "#1e3a5f" }}>
                  <th style={thStyle}>학년</th>
                  {TRACKS.map((t) => (
                    <th key={t} style={{ ...thStyle, color: "#fff" }}>{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {US_TRACK_TABLE.map((row, i) => (
                  <tr key={row.grade} style={{ background: i % 2 === 0 ? "#eef3fb" : "#dbe6f5" }}>
                    <td style={{ ...tdStyle, fontWeight: 800, color: "#1e3a5f" }}>{row.grade}</td>
                    <td style={tdStyle}>{row.regular}</td>
                    <td style={tdStyle}>{row.honor}</td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: "#5b21b6" }}>{row.advanced}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 12 }}>
            {TRACKS.map((t) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#475569" }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: TRACK_COLOR[t] }} />{t}
              </span>
            ))}
          </div>
        </Section>

        {/* 2) US course topics */}
        <Section emoji="📚" title="미국 과목별 배우는 단원"
          desc="각 과정에서 다루는 핵심 단원입니다. 영어 용어 옆에 한국어 뜻을 함께 적었어요. 과목을 눌러 펼쳐보세요.">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {US_COURSE_TOPICS.map((c) => {
              const open = openCourse === c.course;
              return (
                <div key={c.course} style={{ border: open ? "1.5px solid #2563eb" : "1px solid #e6e8ec", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
                  <button onClick={() => setOpenCourse(open ? null : c.course)} aria-expanded={open}
                    style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "15px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 22 }}>{c.emoji}</span>
                    <span>
                      <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.01em" }}>{c.course}</span>
                      <span style={{ display: "block", fontSize: 12.5, color: "#94a3b8", marginTop: 2 }}>{c.blurb}</span>
                    </span>
                    <span style={{ marginLeft: "auto", fontSize: 18, color: "#94a3b8", transform: open ? "rotate(90deg)" : "none", transition: "transform 180ms" }}>›</span>
                  </button>
                  {open && (
                    <div style={{ padding: "0 18px 18px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 8 }}>
                      {c.topics.map((t) => (
                        <div key={t.en} style={{ display: "flex", flexDirection: "column", gap: 2, background: "#f5f8fd", border: "1px solid #e3ebf6", borderRadius: 9, padding: "9px 12px" }}>
                          <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1a1a1f" }}>{t.en}</span>
                          <span style={{ fontSize: 12.5, color: "#5b6b7f" }}>{t.ko}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* 3) US↔KR level summary */}
        <Section emoji="⚖️" title="미국 과정 ↔ 한국 수준 한눈에"
          desc="자녀의 미국 과정이 한국 기준으로 어느 정도 수준인지 가늠해보세요.">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {LEVEL_SUMMARY.map((l) => (
              <div key={l.course} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #e6e8ec", borderRadius: 10, padding: "12px 16px" }}>
                <span style={{ fontSize: 13.5, fontWeight: 800, color: "#2563eb", minWidth: 140 }}>{l.course}</span>
                <span style={{ fontSize: 12, color: "#cbd5e1" }}>≈</span>
                <span style={{ fontSize: 13.5, color: "#334155" }}>{l.level}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 4) Korean middle-school curriculum */}
        <Section emoji="🇰🇷" title="참고 — 한국 중학교 수학 과정"
          desc="비교를 위한 한국 중학교 1~3학년 학기별 단원입니다.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
            {KR_MIDDLE_SCHOOL.map((sem) => (
              <div key={sem.label} style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1f", marginBottom: 12, paddingBottom: 8, borderBottom: "2px solid #1e3a5f" }}>{sem.label}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {sem.units.map((u) => (
                    <div key={u.roman}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a5f", marginBottom: 3 }}>{u.roman}. {u.title}</div>
                      <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 2 }}>
                        {u.lessons.map((ls) => (
                          <li key={ls} style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.55 }}>{ls}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 5) Style difference */}
        <section style={{ background: "linear-gradient(135deg,#0a0a14,#13131f)", borderRadius: 16, padding: "26px 26px", marginTop: 8, marginBottom: 36 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.01em" }}>✍️ 미국 수학 vs 한국 수학 — 서술형 vs 단답형</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.8, margin: 0 }}>{STYLE_DIFFERENCE}</p>
        </section>

        {/* CTA */}
        <div style={{ textAlign: "center", paddingTop: 28, borderTop: "1px solid #e6e8ec" }}>
          <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>자녀 트랙에 맞는 AP·수학 학습을 시작하세요</div>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 20 }}>AP 문제 은행 · 개념정리 · 단어장까지, 무료 가입 한 번이면 전부.</p>
          <button onClick={gateToTools} style={{ background: "#1a1a1f", color: "#fff", border: "none", borderRadius: 8, padding: "14px 34px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" }}>
            무료 가입하고 모든 자료 보기 →
          </button>
        </div>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "12px 14px", fontSize: 13, fontWeight: 800, color: "#fff", textAlign: "center", whiteSpace: "nowrap",
};
const tdStyle: React.CSSProperties = {
  padding: "12px 14px", textAlign: "center", color: "#1a1a1f", borderTop: "1px solid rgba(255,255,255,0.5)",
};

function Section({ emoji, title, desc, children }: { emoji: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 4px" }}>{emoji} {title}</h2>
      <p style={{ fontSize: 13.5, color: "#94a3b8", lineHeight: 1.7, margin: "0 0 16px" }}>{desc}</p>
      {children}
    </section>
  );
}
