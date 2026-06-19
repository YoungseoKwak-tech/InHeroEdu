"use client";

/**
 * /parents/activities — Ivy-admit Common App activity list, WHITE UI.
 *
 * Follows the /parents/colleges + /parents/competitions pattern: clean white
 * portal surface, open as a lead magnet, signup CTA gates the tools. The real
 * value is the 실행 가이드 attached to each entry — the activity list is shown
 * once at the top as a "이렇게 생겼다", then each card unpacks HOW to reproduce
 * that kind of activity (platforms, steps, story angle).
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";
import { CREDIT_EVENT, CREDIT_COSTS } from "@/lib/credits";
import CreditGate from "@/components/parents/CreditGate";
import { type ActivityEntry, type DeepGuide } from "./data";

const GREEN = "#00b85f";
const GUIDE_COST = 500; // each deep guide unlocks individually for 500 credits
const ITEM_COST = CREDIT_COSTS.ADMIT_ITEM; // 합격 활동 1건 열람당 25 크레딧

interface StrategyPoint { emoji: string; title: string; body: string }

export default function ActivitiesClient() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState<number | null>(1);
  // Served by /api/parents/activities — the paid detail (원문·분석·실행 가이드)
  // is stripped server-side for non-holders, so it never ships to the browser.
  // Re-fetch on a credit change so a fresh unlock pulls the full detail.
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [deepGuides, setDeepGuides] = useState<DeepGuide[]>([]);
  const [strategyPoints, setStrategyPoints] = useState<StrategyPoint[]>([]);
  const [commonAppRules, setCommonAppRules] = useState<string[]>([]);

  useEffect(() => { getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {}); }, []);

  useEffect(() => {
    const load = () => authFetch("/api/parents/activities").then((r) => r.json())
      .then((d) => {
        setActivities(Array.isArray(d?.activities) ? d.activities : []);
        setDeepGuides(Array.isArray(d?.guides) ? d.guides : []);
        setStrategyPoints(Array.isArray(d?.strategyPoints) ? d.strategyPoints : []);
        setCommonAppRules(Array.isArray(d?.commonAppRules) ? d.commonAppRules : []);
      }).catch(() => {});
    load();
    window.addEventListener(CREDIT_EVENT, load);
    return () => window.removeEventListener(CREDIT_EVENT, load);
  }, []);

  const gateToTools = () => {
    if (loggedIn) router.push("/question-bank");
    else window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/question-bank" } }));
  };

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: GREEN }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 20px 100px" }}>
        {/* Header */}
        <p style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", letterSpacing: "0.04em", marginBottom: 14 }}>🏆 아이비리그 합격 엑스트라 활동</p>

        {/* Big credential banner */}
        <div style={{ background: "linear-gradient(135deg,#1e1b4b,#4c1d95)", borderRadius: 16, padding: "26px 28px", marginBottom: 20, boxShadow: "0 12px 30px rgba(76,29,149,0.25)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: "#fff", background: "rgba(255,255,255,0.18)", borderRadius: 6, padding: "3px 10px", letterSpacing: "0.03em" }}>✅ 실제 합격 사례</span>
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.1rem, 5.5vw, 3.4rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.08 }}>
            아이비리그 <span style={{ color: "#a78bfa" }}>공대 합격생</span>
          </div>
          <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, margin: "12px 0 0" }}>
            생명과학·공학 트랙으로 아이비리그 공과대학에 합격한 학생의 실제 활동 리스트입니다.
          </p>
        </div>

        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
          합격생의 활동 10개, 그리고 <span style={{ color: "#7c3aed" }}>어떻게 만드는지</span>
        </h1>
        <p style={{ fontSize: 15.5, color: "#475569", lineHeight: 1.8, marginBottom: 8 }}>
          실제 아이비리그 합격생의 Common App 활동 리스트(10칸)를 그대로 공개합니다. 그런데 더 중요한 건 <strong>각 활동을 어떻게 직접 만들 수 있는가</strong>예요 —
          책 출간이면 Amazon KDP 단계, 논문이면 JEI·JSR 투고법, 웹 프로젝트면 무료 개발 코스까지. 카드를 누르면 실행 가이드가 열립니다.
        </p>
        <p style={{ fontSize: 12.5, color: "#94a3b8", lineHeight: 1.7, marginBottom: 28 }}>
          ※ 학생·학교를 특정하는 정보는 익명화했습니다. 활동을 그대로 베끼는 것이 아니라, 같은 <strong>구조와 전략</strong>을 자녀의 관심사로 재현하는 것이 목적입니다.
        </p>

        {/* Strategy points — why this list works */}
        <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 14, padding: "22px 22px 8px", marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 14px", letterSpacing: "-0.01em" }}>📌 이 리스트가 통하는 5가지 이유</h2>
          {strategyPoints.map((s) => (
            <div key={s.title} style={{ display: "flex", gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: "1px solid #f1f3f5" }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{s.emoji}</span>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 3 }}>{s.title}</div>
                <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.75, margin: 0 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Common App rules box */}
        <section style={{ background: "#f5f3ff", border: "1px solid #e0d7fb", borderRadius: 14, padding: "18px 20px", marginBottom: 36 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#6d28d9", letterSpacing: "0.03em", marginBottom: 10 }}>📋 Common App 활동란 기본 규칙</div>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            {commonAppRules.map((r, i) => (
              <li key={i} style={{ fontSize: 13.5, color: "#4c1d95", lineHeight: 1.6 }}>{r}</li>
            ))}
          </ul>
        </section>

        {/* Inline signup CTA */}
        <div style={{ background: "linear-gradient(135deg,#0a0a14,#13131f)", borderRadius: 14, padding: "20px 22px", marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>활동을 만들 시간을 벌어주는 AP 학습, InHero에서</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>무료 가입하면 11,975개 AP 문제 은행과 한국어 핵심 노트로 학업을 효율화하세요.</div>
          </div>
          <button onClick={gateToTools} style={{ background: "#00FF88", color: "#000", border: "none", borderRadius: 8, padding: "12px 22px", fontWeight: 800, fontSize: 13.5, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer", whiteSpace: "nowrap" }}>
            {loggedIn ? "자료 보러 가기 →" : "무료 가입 →"}
          </button>
        </div>

        {/* Deep build guides — KDP & journals */}
        <section style={{ marginBottom: 38 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", letterSpacing: "0.02em", paddingBottom: 8, borderBottom: "2px solid #047a45", marginBottom: 8, display: "inline-block" }}>
            🚀 핵심 활동, 직접 만드는 법 <span style={{ color: "#94a3b8", fontWeight: 600 }}>· 단계별 완벽 가이드</span>
          </h2>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, margin: "0 0 16px" }}>
            가장 강력한 두 활동 — <strong>고등학생도 할 수 있는 책 출간</strong>과 <strong>JEI·JSR 논문 출판</strong>을 기획부터 게재·활동 기재까지 그대로 따라 할 수 있게 정리했어요. 박스를 눌러 펼치세요.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {deepGuides.map((g) => <DeepGuideCard key={g.id} guide={g} />)}
          </div>
        </section>

        {/* Activity cards */}
        <h2 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", letterSpacing: "0.02em", paddingBottom: 8, borderBottom: "2px solid #1a1a1f", marginBottom: 18, display: "inline-block" }}>
          합격생 활동 10개 <span style={{ color: "#94a3b8", fontWeight: 600 }}>· 실행 가이드 포함</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {activities.map((a) => (
            <ActivityCard key={a.num} activity={a} isOpen={open === a.num}
              onToggle={() => setOpen(open === a.num ? null : a.num)} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 36, borderTop: "1px solid #e6e8ec" }}>
          <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>활동은 학업이 받쳐줄 때 빛납니다</div>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 20 }}>AP 문제 은행 · 핵심 노트 · 디지털 교재까지, 무료 가입 한 번이면 전부.</p>
          <button onClick={gateToTools} style={{ background: "#1a1a1f", color: "#fff", border: "none", borderRadius: 8, padding: "14px 34px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" }}>
            {loggedIn ? "모든 자료 보기 →" : "무료 가입하고 모든 자료 보기 →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ activity: a, isOpen, onToggle }: { activity: ActivityEntry; isOpen: boolean; onToggle: () => void }) {
  return (
    <article style={{ background: "#fff", border: isOpen ? "1.5px solid #7c3aed" : "1px solid #e6e8ec", borderRadius: 14, overflow: "hidden", boxShadow: isOpen ? "0 8px 24px rgba(124,58,237,0.10)" : "0 1px 2px rgba(16,24,40,0.04)", transition: "box-shadow 200ms" }}>
      {/* Collapsed header */}
      <button onClick={onToggle} aria-expanded={isOpen}
        style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "18px 20px", display: "block" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#cbd5e1", fontFamily: "'JetBrains Mono', monospace" }}>{String(a.num).padStart(2, "0")}</span>
          <span style={{ fontSize: 20 }}>{a.emoji}</span>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.01em" }}>{a.position}</span>
          <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 800, color: "#7c3aed", background: "#f3eefe", borderRadius: 5, padding: "2px 9px", whiteSpace: "nowrap" }}>{a.typeKo}</span>
          <span style={{ fontSize: 18, color: "#94a3b8", transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 180ms", lineHeight: 1 }}>›</span>
        </div>
        <div style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.55 }}>{a.organization}</div>
      </button>

      {/* Expanded detail */}
      {isOpen && (
        <div style={{ padding: "0 20px 22px", borderTop: "1px solid #f1f3f5" }}>
          <CreditGate
            gateKey={`res:/parents/activities/item:${a.num}`}
            cost={ITEM_COST}
            fullBlur
            title="🏆 이 합격 활동 열람 — 25 크레딧"
            desc="이 합격생 활동의 Common App 원문·분석·실행 가이드를 볼 수 있어요. 활동 제목·유형은 무료 미리보기이고, 열람은 활동 1건당 25 크레딧이에요."
          >
          {/* The raw Common App entry */}
          <div style={{ marginTop: 18, background: "#0f172a", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#64748b", letterSpacing: "0.05em", marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>COMMON APP — 원문</div>
            <Field label="Activity Type" value={a.typeEn} />
            <Field label="Position/Leadership" value={a.position} />
            <Field label="Organization" value={a.organization} />
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#475569", letterSpacing: "0.04em", marginBottom: 4 }}>DESCRIPTION</div>
              <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                {a.bullets.map((b, i) => <li key={i} style={{ fontSize: 12.5, color: "#cbd5e1", lineHeight: 1.6 }}>{b}</li>)}
              </ul>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 12, paddingTop: 12, borderTop: "1px solid #1e293b", fontSize: 11.5, color: "#94a3b8" }}>
              <span>학년 {a.grades}</span>
              <span>{a.timing}</span>
              <span>주 {a.hoursPerWeek}</span>
              <span>연 {a.weeksPerYear}</span>
            </div>
          </div>

          {/* Analysis */}
          <DetailBlock label="🔍 이 활동이 왜 강한가">
            <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.8, margin: 0 }}>{a.analysis}</p>
          </DetailBlock>

          {/* How-to guide — the main event */}
          <div style={{ marginTop: 18, background: "#f0fdf6", border: "1px solid #c8f2dc", borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#047a45", marginBottom: 6, letterSpacing: "-0.01em" }}>🛠 실행 가이드 — {a.guideTitle}</div>
            <p style={{ fontSize: 13.5, color: "#1f5138", lineHeight: 1.8, margin: "0 0 14px" }}>{a.guideIntro}</p>

            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#047a45", letterSpacing: "0.04em", marginBottom: 8 }}>STEP BY STEP</div>
            <ol style={{ margin: "0 0 16px", paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, counterReset: "step" }}>
              {a.steps.map((s, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                  <span style={{ fontSize: 13.5, color: "#1f5138", lineHeight: 1.65, paddingTop: 1 }}>{s}</span>
                </li>
              ))}
            </ol>

            {a.resources.length > 0 && (
              <>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: "#047a45", letterSpacing: "0.04em", marginBottom: 8 }}>🔗 바로 쓰는 플랫폼·링크</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                  {a.resources.map((r) => (
                    <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "#0369a1", textDecoration: "none", background: "#fff", border: "1px solid #c8f2dc", borderRadius: 8, padding: "9px 12px" }}>
                      <span>↗</span><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.label}</span>
                    </a>
                  ))}
                </div>
              </>
            )}

            <div style={{ background: "#fff", border: "1px dashed #7cc9a3", borderRadius: 8, padding: "12px 14px" }}>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: "#7c3aed", letterSpacing: "0.03em" }}>✍️ 스토리로 엮는 법</span>
              <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.75, margin: "5px 0 0" }}>{a.storyTip}</p>
            </div>
          </div>
          </CreditGate>
        </div>
      )}
    </article>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: "#475569", letterSpacing: "0.04em" }}>{label}: </span>
      <span style={{ fontSize: 12.5, color: "#e2e8f0", lineHeight: 1.5 }}>{value}</span>
    </div>
  );
}

function DeepGuideCard({ guide: g }: { guide: DeepGuide }) {
  const [open, setOpen] = useState(false);
  return (
    <article style={{ background: "#fff", border: open ? "1.5px solid #047a45" : "1px solid #e6e8ec", borderRadius: 14, overflow: "hidden", boxShadow: open ? "0 10px 28px rgba(4,122,69,0.10)" : "0 1px 2px rgba(16,24,40,0.04)", transition: "box-shadow 200ms" }}>
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        style={{ width: "100%", textAlign: "left", background: open ? "#f0fdf6" : "#fff", border: "none", cursor: "pointer", padding: "18px 20px", display: "block" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>{g.emoji}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16.5, fontWeight: 800, letterSpacing: "-0.01em" }}>{g.title}</div>
            <div style={{ fontSize: 13, color: "#475569", marginTop: 3, lineHeight: 1.5 }}>{g.tagline}</div>
          </div>
          <span style={{ flexShrink: 0, fontSize: 11.5, fontWeight: 800, color: "#047a45", background: "#e6f6ee", borderRadius: 999, padding: "4px 11px", whiteSpace: "nowrap" }}>{open ? "닫기" : "자세히 보기"}</span>
          <span style={{ flexShrink: 0, fontSize: 18, color: "#94a3b8", transform: open ? "rotate(90deg)" : "none", transition: "transform 180ms", lineHeight: 1 }}>›</span>
        </div>
      </button>

      {open && (
        <div style={{ padding: "4px 20px 24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "8px 0 16px" }}>
            {g.meta.map((m) => (
              <span key={m.label} style={{ fontSize: 12, color: "#334155", background: "#f1f5f9", borderRadius: 8, padding: "6px 11px" }}>
                <b style={{ color: "#0f172a" }}>{m.label}</b> · {m.value}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.85, margin: "0 0 18px" }}>{g.overview}</p>

          <CreditGate
            gateKey={`res:/parents/activities/guide:${g.id}`}
            cost={GUIDE_COST}
            title={`${g.emoji} ${g.title} — 잠금해제`}
            desc={`${g.tagline} — 6단계 상세 가이드 + 링크·흔한 실수·Common App 기재법까지. 500 크레딧으로 한 번만 잠금 해제.`}
          >

          {g.table && (
            <div style={{ overflowX: "auto", margin: "0 0 18px" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12.5 }}>
                <thead>
                  <tr>{g.table.headers.map((h, i) => (
                    <th key={i} style={{ textAlign: "left", padding: "8px 10px", background: "#f1f5f9", color: "#0f172a", fontWeight: 800, border: "1px solid #e2e8f0" }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {g.table.rows.map((row, r) => (
                    <tr key={r}>{row.map((c, ci) => (
                      <td key={ci} style={{ padding: "8px 10px", color: ci === 0 ? "#0f172a" : "#334155", fontWeight: ci === 0 ? 800 : 400, border: "1px solid #e2e8f0", lineHeight: 1.5 }}>{c}</td>
                    ))}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {g.phases.map((p, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: "#047a45", marginBottom: 10 }}>{p.title}</div>
              <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {p.steps.map((s, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{j + 1}</span>
                    <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.7, paddingTop: 1 }}>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          {g.links.length > 0 && (
            <>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#0369a1", letterSpacing: "0.04em", margin: "6px 0 8px" }}>🔗 바로 쓰는 링크</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
                {g.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "#0369a1", textDecoration: "none", background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 8, padding: "9px 12px" }}>
                    <span>↗</span><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.label}</span>
                  </a>
                ))}
              </div>
            </>
          )}

          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#c2410c", marginBottom: 8 }}>⚠️ 흔한 실수</div>
            <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
              {g.pitfalls.map((p, i) => <li key={i} style={{ fontSize: 13, color: "#7c2d12", lineHeight: 1.65 }}>{p}</li>)}
            </ul>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #e0d7fb", borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#6d28d9", marginBottom: 6 }}>📋 Common App에 적는 법</div>
            <p style={{ fontSize: 13, color: "#4c1d95", lineHeight: 1.7, margin: 0 }}>{g.commonApp}</p>
          </div>

          <div style={{ background: "#fff", border: "1px dashed #7cc9a3", borderRadius: 10, padding: "14px 16px" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#7c3aed" }}>✍️ 에세이 스토리로</span>
            <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.75, margin: "5px 0 0" }}>{g.storyTip}</p>
          </div>

          </CreditGate>
        </div>
      )}
    </article>
  );
}

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0f172a", letterSpacing: "0.02em", marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}
