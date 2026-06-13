"use client";

/**
 * /parents/seminar — Free parent-facing seminar landing page.
 * Login-gated quick-apply form (no external Google Form): clicking the CTA opens
 * an in-app form; the application is saved server-side and visible in
 * /admin/seminar.
 *
 * Seminar: 2026-06-13 (Sat) 20:00 KST, online (Zoom), free, first-come 30 seats.
 */

import { useEffect, useState } from "react";
import { getClientSession } from "@/lib/client-auth";

const GREEN = "#00b85f";
const DARK = "#0b1622";
const INK = "#1d2733";
const SUB = "#5b6b7b";

const SEATS = 30;
const SEMINAR_ISO = "2026-06-13T20:00:00+09:00";
const SEMINAR_LABEL = "2026년 6월 13일 (토) 오후 8시";

function useCountdown(targetIso: string) {
  const [left, setLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setLeft({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);
  return left;
}

const COVERS = [
  ["과목 선정", "AP·IB·SAT를 “개수”가 아니라 전공 스토리에 맞춰 고르는 법"],
  ["합격 활동(스파이크)", "평범한 활동을 합격으로 바꾸는 관점과 설계"],
  ["합격 에세이", "입학사정관이 “사람”을 읽게 만드는 소재 발굴과 구조"],
  ["GPA·SAT 전략", "9~12학년 학년별로 지금 당장 해야 할 것 / 미뤄도 되는 것"],
  ["상황 진단", "내 아이가 지금 어디서 막혀 있는지 정확히 짚는 5가지 질문"],
];

const CURRICULUM: { period: string; title: string; points: string[] }[] = [
  { period: "1교시", title: "상황 진단: 내 아이는 지금 어디 있는가", points: [
    "나 자신을 하나의 시스템으로 보는 법 (입력 → 처리 → 출력)",
    "현재 상태와 목표 사이의 간격(gap) 측정",
    "처음 만난 학생에게 던지는 5가지 진단 질문",
    "막히는 지점 4가지 유형(학업/스토리/활동/방향) — 우리 아이는 어디?",
  ] },
  { period: "2교시", title: "학업 전략: 과목 선정과 점수 설계", points: [
    "AP 선택의 기술: 개수가 아니라 스토리에 맞춘 선택",
    "SAT 500점 올리는 구조 — 오답을 “다시 푸는” 게 아니라 “패턴으로 보는” 법",
    "9학년 GPA가 4년을 따라다니는 이유, 학년별 우선순위",
    "수학을 무기로 만드는 법",
  ] },
  { period: "3교시", title: "합격 활동(스파이크) 설계", points: [
    "“특별한 경험”이 아니라 “평범한 경험을 보는 관점”이 소재를 만든다",
    "플랫폼이 없으면 직접 만든다 — 리서치·인턴·출판으로 이어지는 실제 경로",
    "10학년에 스파이크를 좁히면 11·12학년이 수월해지는 이유",
  ] },
  { period: "4교시", title: "합격 에세이", points: [
    "에세이가 합격을 결정하는 이유 (스펙은 최소 요건일 뿐)",
    "소재 찾는 법 + 에세이 소재 발굴 질문",
    "첫 문장부터 입학사정관이 “사람”을 읽게 만드는 구조",
    "컨설팅 거친 글과 직접 쓴 글의 결 차이",
  ] },
  { period: "5교시", title: "학년별 로드맵 & Q&A", points: [
    "9학년(기반) → 10학년(스파이크) → 11학년(결정) → 12학년(클로징)",
    "부모가 지금 당장 도울 수 있는 것 / 하지 말아야 할 것",
    "실시간 질의응답",
  ] },
];

const CRED = [
  "한국 특목고 국제반 회장",
  "미국 사립 보딩스쿨 최상위권",
  "교내 1,500명 중 AMC 1위",
  "AP 13과목 독학 · IBDP 수료",
  "반도체 대기업 최연소 인턴",
  "아마존 출판 · TEDx 운영",
  "과외·컨설팅 30명+ 직접 지도",
  "코넬대 전기컴퓨터공학과(ECE) 합격",
];

type ApplyState = "idle" | "loading" | "applied";

function CTAButton({ block, label, applied, loading, onClick }: {
  block?: boolean; label?: string; applied: boolean; loading: boolean; onClick: () => void;
}) {
  const text = applied ? "신청 완료 ✓" : loading ? "신청 중…" : label ?? "선착순 무료 신청하기";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={applied || loading}
      style={{
        display: block ? "block" : "inline-block",
        width: block ? "100%" : undefined,
        textAlign: "center",
        background: applied ? "#0f6e56" : GREEN,
        color: "#fff",
        fontWeight: 800,
        fontSize: 17,
        padding: "16px 34px",
        border: "none",
        borderRadius: 12,
        cursor: applied || loading ? "default" : "pointer",
        opacity: loading ? 0.85 : 1,
        boxShadow: "0 8px 24px rgba(0,184,95,0.32)",
        letterSpacing: "-0.01em",
      }}
    >
      {text}{!applied && !loading ? " →" : ""}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#3a4756", marginBottom: 6 }}>{label}</span>
      {children}
    </label>
  );
}
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 12px", border: "1px solid #d8dee5", borderRadius: 10,
  fontSize: 14.5, boxSizing: "border-box", background: "#fff", color: INK,
};

function ApplyModal({ token, onClose, onApplied }: { token: string; onClose: () => void; onApplied: () => void }) {
  const [role, setRole] = useState<"학부모" | "학생">("학부모");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [memo, setMemo] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submit() {
    if (!name.trim() || !phone.trim()) { setErr("이름과 연락처를 입력해 주세요."); return; }
    setBusy(true); setErr("");
    try {
      const res = await fetch("/api/seminar/apply", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ role, name: name.trim(), phone: phone.trim(), grade, school: school.trim(), memo: memo.trim() }),
      });
      if (!res.ok) { setErr("신청에 실패했습니다. 잠시 후 다시 시도해 주세요."); setBusy(false); return; }
      onApplied();
    } catch {
      setErr("네트워크 오류가 발생했습니다."); setBusy(false);
    }
  }

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(8,14,22,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 440, background: "#fff", borderRadius: 16, padding: "24px 22px", boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: INK }}>무료 세미나 신청</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: "#9aa6b2", cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
        <p style={{ fontSize: 13, color: SUB, marginTop: 6 }}>{SEMINAR_LABEL} (KST) · 온라인 Zoom · 무료</p>

        <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {(["학부모", "학생"] as const).map((r) => (
              <button key={r} onClick={() => setRole(r)} type="button"
                style={{ flex: 1, padding: "9px 0", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer",
                  border: `1px solid ${role === r ? GREEN : "#d8dee5"}`, background: role === r ? "rgba(0,184,95,0.10)" : "#fff", color: role === r ? GREEN : "#5b6b7b" }}>
                {r}
              </button>
            ))}
          </div>
          <Field label="신청자 이름 *"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" /></Field>
          <Field label="연락처 *"><input style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-0000-0000" inputMode="tel" /></Field>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <Field label="학생 학년">
                <select style={inputStyle} value={grade} onChange={(e) => setGrade(e.target.value)}>
                  <option value="">선택</option>
                  {["9학년", "10학년", "11학년", "12학년", "그 외"].map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </Field>
            </div>
            <div style={{ flex: 1 }}>
              <Field label="학교 (선택)"><input style={inputStyle} value={school} onChange={(e) => setSchool(e.target.value)} placeholder="학교명" /></Field>
            </div>
          </div>
          <Field label="궁금한 점 (선택)"><textarea style={{ ...inputStyle, minHeight: 64, resize: "vertical" }} value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="세미나에서 꼭 다뤄줬으면 하는 내용" /></Field>
          {err && <div style={{ color: "#c0392b", fontSize: 13, fontWeight: 600 }}>{err}</div>}
          <button onClick={submit} disabled={busy} type="button"
            style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 12, padding: "14px 0", fontWeight: 800, fontSize: 16, cursor: busy ? "default" : "pointer", opacity: busy ? 0.85 : 1 }}>
            {busy ? "신청 중…" : "신청 완료하기"}
          </button>
          <p style={{ fontSize: 11.5, color: "#90a0b0", textAlign: "center", margin: 0 }}>
            신청해 주시면 세미나 전날 Zoom 링크와 안내를 보내드립니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SeminarClient() {
  const left = useCountdown(SEMINAR_ISO);
  const [applyState, setApplyState] = useState<ApplyState>("idle");
  const [modalToken, setModalToken] = useState<string | null>(null);

  const INTENT_KEY = "inhero-seminar-apply-intent";

  // On load, if signed in, check whether they've already applied. If the user
  // just signed up to apply (intent flag set before the auth reload), auto-open
  // the apply form so they don't drop off after only signing up.
  useEffect(() => {
    let alive = true;
    (async () => {
      const s = await getClientSession();
      if (!alive || !s?.user) return;
      let applied = false;
      try {
        const r = await fetch("/api/seminar/apply", { headers: { authorization: `Bearer ${s.access_token}` } });
        if (r.ok) { const d = await r.json(); applied = !!d.applied; if (alive && applied) setApplyState("applied"); }
      } catch { /* ignore */ }
      if (!alive) return;
      let intent = false;
      try { intent = sessionStorage.getItem(INTENT_KEY) === "1"; } catch { /* ignore */ }
      if (intent && !applied) {
        try { sessionStorage.removeItem(INTENT_KEY); } catch { /* ignore */ }
        setModalToken(s.access_token); // 가입 직후 신청 팝업 자동 오픈
      }
    })();
    return () => { alive = false; };
  }, []);

  // CTA: require login first, then open the in-app quick-apply form.
  async function onApplyClick() {
    if (applyState !== "idle") return;
    const s = await getClientSession();
    if (!s?.user) {
      // Remember the intent across the post-signup reload so the apply popup
      // opens automatically once they're back, signed in.
      try { sessionStorage.setItem(INTENT_KEY, "1"); } catch { /* ignore */ }
      window.dispatchEvent(new CustomEvent("inhero:open-auth", {
        detail: { mode: "signup", source: "seminar", redirectTo: "/parents/seminar" },
      }));
      return;
    }
    setModalToken(s.access_token);
  }

  const cta = (block?: boolean, label?: string) => (
    <CTAButton block={block} label={label} applied={applyState === "applied"} loading={applyState === "loading"} onClick={onApplyClick} />
  );

  return (
    <div style={{ background: "#f6f8fa", color: INK, fontFamily: "inherit" }}>
      {modalToken && (
        <ApplyModal
          token={modalToken}
          onClose={() => setModalToken(null)}
          onApplied={() => { setApplyState("applied"); setModalToken(null); }}
        />
      )}

      {/* Hero */}
      <section style={{ background: DARK, color: "#fff", padding: "64px 20px 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <a href="/parents/seminar/replay"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textDecoration: "none", background: "rgba(0,184,95,0.14)", border: "1px solid rgba(0,184,95,0.5)", borderRadius: 14, padding: "14px 18px", marginBottom: 22 }}>
            <span style={{ color: "#dff7ec", fontWeight: 700, fontSize: 14.5 }}>🎥 세미나가 끝났어요 — <b style={{ color: "#fff" }}>풀영상 다시보기 + 발표자료(PDF)</b></span>
            <span style={{ flexShrink: 0, color: "#03120c", background: GREEN, fontWeight: 800, fontSize: 13.5, borderRadius: 10, padding: "8px 16px" }}>다시보기 →</span>
          </a>
          <span style={{ display: "inline-block", background: "rgba(0,184,95,0.18)", color: "#5fe0a0", border: "1px solid rgba(0,184,95,0.45)", borderRadius: 999, padding: "6px 14px", fontSize: 13, fontWeight: 700, marginBottom: 18 }}>
            무료 세미나 · 선착순 {SEATS}명
          </span>
          <h1 style={{ fontSize: 34, lineHeight: 1.32, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
            사교육 없이 코넬 공대 간 학생이 직접 푸는,<br />
            <span style={{ color: "#5fe0a0" }}>아이비리그 자기주도 완전정복</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: "#c7d3df", marginTop: 22 }}>
            컨설팅도, 학원도, 입시 코치도 없었습니다.<br />
            누가 지원서를 검토해 준 적조차 없었습니다.<br />
            그런데 <b style={{ color: "#fff" }}>코넬대 전기컴퓨터공학과(ECE)에 합격</b>했습니다.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "#9fb0c0", marginTop: 14 }}>
            한국 특목고 국제반 회장, 미국 사립 보딩스쿨 최상위권, 교내 1,500명 중 AMC 1위, AP 13과목 독학,
            반도체 대기업 최연소 인턴, 아마존 출판, TEDx 운영, 그리고 직접 지도한 학생만 30명 이상 —
            이 모든 걸 <b style={{ color: "#dde7f0" }}>“누군가 그려준 지도” 없이</b> 직접 찾아냈습니다.
            그 4년의 시행착오를 압축해, 지금 입시를 준비하는 학생과 학부모님께 <b style={{ color: "#dde7f0" }}>무료로</b> 공개합니다.
          </p>

          {/* Detail card */}
          <div style={{ marginTop: 30, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "22px 22px", display: "grid", gap: 12 }}>
            <Detail icon="📅" label="일시" value={`${SEMINAR_LABEL} (KST)`} />
            <Detail icon="📍" label="방식" value="온라인 Zoom (신청자에게 링크 발송)" />
            <Detail icon="💸" label="참가비" value={`무료 · 선착순 ${SEATS}명`} />
            {left && (
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                {[["일", left.d], ["시간", left.h], ["분", left.m], ["초", left.s]].map(([u, v]) => (
                  <div key={u as string} style={{ flex: 1, background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "10px 6px", textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#5fe0a0" }}>{String(v).padStart(2, "0")}</div>
                    <div style={{ fontSize: 11, color: "#9fb0c0", marginTop: 2 }}>{u}</div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: 8 }}>{cta(true)}</div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 26 }}>
            {CRED.map((c) => (
              <span key={c} style={{ fontSize: 12.5, color: "#aebccb", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "5px 11px" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* What we cover */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "56px 20px 10px" }}>
        <h2 style={{ fontSize: 25, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>이번 세미나에서 다루는 것</h2>
        <div style={{ display: "grid", gap: 12, marginTop: 22 }}>
          {COVERS.map(([t, d], i) => (
            <div key={t} style={{ display: "flex", gap: 14, background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "18px 18px" }}>
              <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: 8, background: "rgba(0,184,95,0.12)", color: GREEN, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: INK }}>{t}</div>
                <div style={{ fontSize: 14.5, color: SUB, marginTop: 4, lineHeight: 1.6 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 26, background: "#fff", border: `1px solid ${GREEN}33`, borderLeft: `4px solid ${GREEN}`, borderRadius: 12, padding: "20px 20px" }}>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.8, color: INK }}>
            합격 <b>“공식”</b>을 파는 자리가 아닙니다. <b style={{ color: GREEN }}>40명 이상의 학생</b> —
            수학 D에서 A, SAT 500점대에서 750점, 에세이 한 줄도 못 쓰던 학생이 합격 에세이를 쓰기까지 —
            <b> 검증된 데이터</b>로 이야기합니다.
          </p>
        </div>
      </section>

      {/* Curriculum */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "46px 20px 10px" }}>
        <h2 style={{ fontSize: 25, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>세션 커리큘럼</h2>
        <p style={{ fontSize: 14.5, color: SUB, marginTop: 8 }}>책 『내가 아이비리그 공대에 오기까지』의 목차를 그대로 세미나 모듈로 옮겼습니다.</p>
        <div style={{ display: "grid", gap: 14, marginTop: 22 }}>
          {CURRICULUM.map((m) => (
            <div key={m.period} style={{ background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "20px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ background: DARK, color: "#fff", fontWeight: 800, fontSize: 12.5, borderRadius: 8, padding: "5px 10px" }}>{m.period}</span>
                <h3 style={{ margin: 0, fontSize: 17.5, fontWeight: 800, color: INK, letterSpacing: "-0.01em" }}>{m.title}</h3>
              </div>
              <ul style={{ margin: "14px 0 0", paddingLeft: 0, listStyle: "none", display: "grid", gap: 9 }}>
                {m.points.map((p) => (
                  <li key={p} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "#3a4756", lineHeight: 1.6 }}>
                    <span style={{ color: GREEN, fontWeight: 800, flexShrink: 0 }}>✓</span><span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Bonus */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "40px 20px 0" }}>
        <div style={{ background: "linear-gradient(135deg,#0b1622,#143047)", color: "#fff", borderRadius: 16, padding: "28px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5fe0a0", letterSpacing: "0.04em" }}>참석자 무료 혜택</div>
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: "8px 0 0", letterSpacing: "-0.01em" }}>
            『내가 아이비리그 공대에 오기까지』 초입부 + 자기주도학습 체크리스트
          </h3>
          <p style={{ fontSize: 14.5, color: "#c7d3df", marginTop: 10, lineHeight: 1.7 }}>
            세미나에 참석하신 모든 분께 책 초입부와 학년별로 바로 쓰는 자기주도학습 체크리스트를 무료로 드립니다.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section id="apply" style={{ maxWidth: 860, margin: "0 auto", padding: "52px 20px 80px", textAlign: "center" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>{SEMINAR_LABEL}, 함께해요.</h2>
        <p style={{ fontSize: 15, color: SUB, marginTop: 10 }}>온라인 Zoom · 참가비 무료 · 선착순 {SEATS}명 마감</p>
        <div style={{ marginTop: 22 }}>{cta(false)}</div>
        <p style={{ fontSize: 12.5, color: "#90a0b0", marginTop: 16 }}>로그인 후 신청서를 작성하시면 접수됩니다.</p>
      </section>
    </div>
  );
}

function Detail({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 13, color: "#9fb0c0", width: 52, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 15.5, fontWeight: 700, color: "#fff" }}>{value}</span>
    </div>
  );
}
