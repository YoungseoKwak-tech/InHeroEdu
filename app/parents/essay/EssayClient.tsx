"use client";

/**
 * /parents/essay — a real Cornell Engineering (Biomedical) admit essay,
 * broken down paragraph by paragraph with very detailed Korean analysis of
 * what works. Real content shared by the founder (their own admit essay).
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";
import CreditGate from "@/components/parents/CreditGate";
import { CREDIT_COSTS, CREDIT_EVENT } from "@/lib/credits";
import { TAG_COLOR, TAKEAWAYS, type Segment } from "@/lib/data/cornellMainEssay";

const GREEN = "#00b85f";

export default function EssayClient() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [opening, setOpening] = useState(false);
  // The essay text + analysis is served by /api/parents/essay/analysis — only
  // unlock holders RECEIVE it, so it never ships to the browser. Re-fetch on a
  // credit change so a fresh unlock reveals it.
  const [segments, setSegments] = useState<Segment[]>([]);
  useEffect(() => { getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {}); }, []);
  useEffect(() => {
    const load = () => authFetch("/api/parents/essay/analysis").then((r) => r.json())
      .then((d) => setSegments(Array.isArray(d?.segments) ? d.segments : [])).catch(() => {});
    load();
    window.addEventListener(CREDIT_EVENT, load);
    return () => window.removeEventListener(CREDIT_EVENT, load);
  }, []);

  // The essay PDF is served only through an auth + unlock-gated API (no public
  // URL). Fetch it with the Bearer token, then open the blob in a new tab.
  const openEssayPdf = async () => {
    if (opening) return;
    setOpening(true);
    try {
      const r = await authFetch("/api/parents/essay/file");
      if (r.status === 401) { window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/essay" } })); return; }
      if (r.status === 403) { window.alert("이 자료는 잠금 해제 후 볼 수 있어요."); return; }
      if (!r.ok) { window.alert("PDF를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."); return; }
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      window.alert("PDF를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setOpening(false);
    }
  };
  const mentor = () => {
    if (loggedIn) router.push("/dm/yng0802");
    else window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/dm/yng0802" } }));
  };

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", cursor: "auto", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "36px 20px 100px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#b45309", background: "#fef3c7", borderRadius: 6, padding: "3px 9px" }}>🏆 합격 에세이 분석</span>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#047857", background: "#e9fbf2", borderRadius: 6, padding: "3px 9px" }}>Cornell · Biomedical Engineering</span>
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14 }}>
          코넬 공대 합격 에세이, 한 문단씩 뜯어보기
        </h1>
        <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, marginBottom: 18 }}>
          실제 <strong>코넬대학교 공과대학(생의공학)</strong> 합격생의 Common App 메인 에세이입니다. '죽은 해파리(dead jellyfish)'라는
          하나의 메타포로 한국 출신의 정체성을 가치로 바꿔낸 글을, <strong>무엇이 왜 잘 됐는지</strong> 문단마다 기법·원리·“약하게 썼다면”까지 쪼개 분석했습니다.
        </p>
        <CreditGate
          gateKey="res:/parents/essay"
          cost={CREDIT_COSTS.ADMIT_ITEM}
          title="✍️ 코넬 공대 합격 에세이 — 원문 + 문단별 분석 잠금해제 (25 크레딧)"
          desc="실제 합격생 본인의 Common App 메인 에세이 원문(PDF)과 설계도·문단별 상세 분석(기법·원리·‘약하게 썼다면’)을 볼 수 있어요. 위 소개글만 무료 미리보기예요."
        >
        <button onClick={openEssayPdf} disabled={opening}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "none", cursor: opening ? "default" : "pointer", color: "#1a1a1f", border: "1.5px solid #1a1a1f", borderRadius: 9, padding: "10px 18px", fontSize: 13.5, fontWeight: 800, marginBottom: 26, opacity: opening ? 0.6 : 1 }}>
          {opening ? "여는 중…" : "📄 원문 에세이 전체 PDF 보기 →"}
        </button>

        {/* Architecture overview */}
        <div style={{ background: "linear-gradient(180deg,#fbfcfe,#fff)", border: "1px solid #e2e6ea", borderRadius: 14, padding: "22px 24px", marginBottom: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#7c3aed", marginBottom: 12 }}>먼저 — 이 에세이의 '설계도'</div>
          <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.8, margin: "0 0 14px" }}>
            <strong>주제 한 줄:</strong> 쓸모없어 보이는 것도 맥락을 바꾸면 가치가 있다 — 죽은 해파리처럼, 내 한국 배경도.
          </p>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#475569", marginBottom: 8 }}>서사의 흐름(arc)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 16, fontSize: 12.5, color: "#475569" }}>
            {["갈등 — 침묵하는 이방인", "전환 — 해파리 연구", "깨달음 — 재맥락화", "행동 — Ska 리더십", "정직한 성장"].map((s, i, a) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "#f1f5f9", borderRadius: 6, padding: "5px 10px", fontWeight: 700 }}>{s}</span>
                {i < a.length - 1 && <span style={{ color: "#cbd5e1" }}>→</span>}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#475569", marginBottom: 8 }}>'죽은 해파리' 메타포가 세 번 등장</div>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            <li style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.7 }}><strong>① 해변(문자 그대로)</strong> — 해파리를 밟고 '쓸모가 있나?' 질문</li>
            <li style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.7 }}><strong>② 실험실(과학)</strong> — 해파리의 반투과막에 진짜 가치가 있음을 발견</li>
            <li style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.7 }}><strong>③ 정체성(자아)</strong> — '쓸모없어 보이는 내 배경'도 재맥락화하면 가치가 있음</li>
          </ul>
        </div>

        {/* Segment-by-segment */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {segments.map((seg, i) => (
            <section key={i} style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 16, padding: "22px 24px" }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#7c3aed", margin: "0 0 4px" }}>{seg.label}</h2>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, margin: "0 0 14px" }}>{seg.gist}</p>
              <blockquote style={{ margin: "0 0 18px", padding: "14px 16px", background: "#f7f8fa", borderLeft: "3px solid #cbd5e1", borderRadius: 8, fontSize: 13.5, color: "#475569", lineHeight: 1.7, fontStyle: "italic" }}>
                "{seg.en}"
              </blockquote>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {seg.notes.map((n, k) => (
                  <div key={k}>
                    <span style={{ display: "inline-block", fontSize: 11, fontWeight: 800, color: "#fff", background: TAG_COLOR[n.tag] ?? "#475569", borderRadius: 6, padding: "2px 9px", marginBottom: 6 }}>{n.tag}</span>
                    <p style={{ fontSize: 14.5, color: "#334155", lineHeight: 1.9, margin: 0 }}>{n.text}</p>
                    {n.weak && (
                      <p style={{ fontSize: 13, color: "#b91c1c", lineHeight: 1.7, margin: "8px 0 0", padding: "9px 12px", background: "#fef2f2", borderRadius: 8 }}>
                        <strong>✗ 약하게 썼다면:</strong> {n.weak}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        </CreditGate>

        {/* Takeaways */}
        <section style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 16, padding: "24px 24px", marginTop: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px" }}>✍️ 이 에세이에서 배울 7가지</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {TAKEAWAYS.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "#1a1a1f", color: "#fff", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: "#1a1a1f", marginBottom: 3 }}>{t.t}</div>
                  <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.75, margin: 0 }}>{t.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mentor CTA */}
        <div style={{ background: "linear-gradient(135deg,#1e1b4b,#4c1d95)", borderRadius: 16, padding: "28px 26px", marginTop: 24, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🎓</div>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>내 자녀 에세이도 이렇게 봐줄 멘토가 필요하신가요?</div>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 13.5, lineHeight: 1.7, marginBottom: 18, maxWidth: 440, margin: "0 auto 18px" }}>
            이 에세이를 쓴 코넬 공대 합격생 멘토에게 1:1로 직접 물어보세요. 에세이 방향·소재·구조를 함께 잡아드립니다.
          </p>
          <button onClick={mentor} style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "13px 30px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" }}>
            멘토에게 1:1로 물어보기 →
          </button>
        </div>

        <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 22, lineHeight: 1.7 }}>
          ※ 실제 합격생 본인이 공유한 에세이입니다. 표현·아이디어를 그대로 베끼는 것은 표절이며, '기법'을 배워 자신만의 이야기에 적용하세요.
        </p>
      </div>
    </div>
  );
}
