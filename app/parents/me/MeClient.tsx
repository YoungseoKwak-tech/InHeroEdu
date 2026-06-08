"use client";

/**
 * /parents/me — 나의 페이지. The signed-in parent's own profile: 학부모 성함,
 * 자녀 학년(G2–G12), 자녀 학교 유형, 휴대폰, 카카오 수신동의 — all editable and
 * saved back through /api/profile (same fields that show in /admin/students).
 * Not logged in → routes to the parent signup gate.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";
import { getMyCode, getReferrals, addReferral, totalReferralCredits, getReferredBy, REFERRAL_REWARD, type Referral } from "@/lib/referrals";

const GREEN = "#00b85f";
const GRADE_OPTIONS = Array.from({ length: 11 }, (_, i) => `G${i + 2}`);
const SCHOOL_TYPE_OPTIONS = [
  "국제학교", "보딩스쿨 (Boarding)", "외국인학교", "미국 현지 학교",
  "특목고·자사고", "일반고", "홈스쿨링", "기타",
];

interface Profile { name: string | null; grade: string | null; school: string | null; phone: string | null; marketing_consent: boolean }

const QUICK_LINKS = [
  { emoji: "📝", label: "AP 문제은행", route: "/parents/question-bank" },
  { emoji: "📘", label: "AP 개념정리", route: "/parents/core-notes" },
  { emoji: "📒", label: "단어장", route: "/parents/vocab" },
  { emoji: "🏛️", label: "미국 대학 분석", route: "/parents/colleges" },
  { emoji: "🏆", label: "합격 활동 분석", route: "/parents/activities" },
  { emoji: "🎯", label: "미국 입시 대회", route: "/parents/competitions" },
];

export default function MeClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  // Referral receipt (client-only state to avoid hydration mismatch).
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [myCode, setMyCode] = useState("");
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setReferrals(getReferrals());
    setMyCode(getMyCode());
    setReferredBy(getReferredBy());
  }, []);

  useEffect(() => {
    (async () => {
      const session = await getClientSession();
      if (!session?.user) {
        window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/me" } }));
        setLoading(false);
        return;
      }
      try {
        const res = await authFetch("/api/profile");
        const json = await res.json();
        setEmail(json.email ?? session.user.email ?? null);
        const p: Profile = json.profile ?? {};
        setName(p.name ?? "");
        setGrade(p.grade ?? "");
        setSchool(p.school ?? "");
        setPhone(p.phone ?? "");
        setConsent(!!p.marketing_consent);
      } catch {
        setMsg({ kind: "error", text: "프로필을 불러오지 못했어요." });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function save() {
    if (saving) return;
    setSaving(true); setMsg(null);
    try {
      const res = await authFetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, grade, school, phone, marketing_consent: consent }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "저장 실패");
      setMsg({ kind: "ok", text: "✅ 저장됐습니다." });
    } catch (e) {
      setMsg({ kind: "error", text: e instanceof Error ? e.message : String(e) });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: GREEN }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 20px 90px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: GREEN, letterSpacing: "0.04em", marginBottom: 8 }}>👤 나의 페이지</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 6 }}>
          내 정보 · 자녀 정보
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 26 }}>
          가입 시 입력한 정보를 언제든 수정할 수 있어요. 자녀 학년·학교 유형을 정확히 입력하면 맞춤 입시 자료와 알림을 받아보실 수 있습니다.
        </p>

        {loading ? (
          <p style={{ fontSize: 14, color: "#94a3b8", padding: "30px 0", textAlign: "center" }}>불러오는 중…</p>
        ) : !email ? (
          <div style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 14, padding: "30px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 15, color: "#334155", margin: "0 0 16px" }}>로그인하시면 나의 페이지를 볼 수 있어요.</p>
            <button onClick={() => window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/me" } }))}
              style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
              로그인 / 가입하기
            </button>
          </div>
        ) : (
          <>
            {/* Profile card */}
            <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "24px 24px", marginBottom: 20 }}>
              <Field label="이메일">
                <div style={{ fontSize: 14.5, color: "#475569", padding: "11px 0" }}>{email}</div>
              </Field>

              <Field label="아이디">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="아이디" style={inputStyle} />
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="자녀 학년">
                  <select value={grade} onChange={(e) => setGrade(e.target.value)} style={{ ...inputStyle, cursor: "pointer", color: grade ? "#1a1a1f" : "#94a3b8" }}>
                    <option value="">선택</option>
                    {GRADE_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </Field>
                <Field label="자녀 학교 유형">
                  <select value={school} onChange={(e) => setSchool(e.target.value)} style={{ ...inputStyle, cursor: "pointer", color: school ? "#1a1a1f" : "#94a3b8" }}>
                    <option value="">선택</option>
                    {SCHOOL_TYPE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="휴대폰 번호 (카카오 알림)">
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-1234-5678" inputMode="numeric" style={inputStyle} />
              </Field>

              <label style={{ display: "flex", alignItems: "flex-start", gap: 9, cursor: "pointer", marginTop: 6 }}>
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                  style={{ marginTop: 2, width: 16, height: 16, accentColor: GREEN, cursor: "pointer", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.55 }}>
                  새 개념정리·대회·입시 자료 업데이트를 카카오톡으로 받겠습니다. <span style={{ color: "#94a3b8" }}>(광고성 정보 수신 동의)</span>
                </span>
              </label>

              {msg && (
                <div style={{ marginTop: 16, fontSize: 13.5, fontWeight: 600, color: msg.kind === "ok" ? "#047a45" : "#dc2626" }}>{msg.text}</div>
              )}

              <button onClick={save} disabled={saving}
                style={{ marginTop: 20, width: "100%", background: "#1a1a1f", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontWeight: 800, fontSize: 14.5, cursor: saving ? "default" : "pointer", opacity: saving ? 0.6 : 1 }}>
                {saving ? "저장 중…" : "저장하기"}
              </button>
            </section>

            {/* Quick links */}
            <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "20px 22px", marginBottom: 20 }}>
              <h2 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 14px" }}>바로가기</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {QUICK_LINKS.map((q) => (
                  <button key={q.route} onClick={() => router.push(q.route)}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, padding: "16px 6px", background: "#f7f8fa", border: "1px solid #eceef1", borderRadius: 12, cursor: "pointer" }}>
                    <span style={{ fontSize: 24 }}>{q.emoji}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#334155", textAlign: "center" }}>{q.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Referral receipt */}
            <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "22px 22px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                <h2 style={{ fontSize: 15, fontWeight: 800, margin: 0 }}>🎁 추천 영수증</h2>
                <span style={{ marginLeft: "auto", fontSize: 12.5, color: "#64748b" }}>
                  추천으로 받은 크레딧 <strong style={{ color: "#a16207" }}>🪙 {totalReferralCredits().toLocaleString()}</strong>
                </span>
              </div>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: "0 0 14px" }}>
                친구·지인이 아래 코드로 가입하면 가입 한 명당 <strong style={{ color: "#a16207" }}>🪙 {REFERRAL_REWARD} 크레딧</strong>이 적립돼요.
              </p>

              <div style={{ display: "flex", gap: 10, alignItems: "center", background: "#f7f8fa", border: "1px dashed #cbd5e1", borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>내 추천 코드</span>
                <span style={{ fontSize: 16, fontWeight: 850, color: "#1a1a1f", letterSpacing: "0.04em" }}>{(name.trim() || myCode) || "—"}</span>
                <button onClick={() => { navigator.clipboard?.writeText(name.trim() || myCode).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                  style={{ marginLeft: "auto", background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12.5, fontWeight: 800, cursor: "pointer" }}>
                  {copied ? "복사됨!" : "복사"}
                </button>
              </div>

              {referrals.length === 0 ? (
                <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: "10px 0" }}>아직 내 코드로 가입한 사람이 없어요. 코드를 공유해보세요!</p>
              ) : (
                <div style={{ border: "1px solid #eceef1", borderRadius: 10, overflow: "hidden" }}>
                  {referrals.slice().reverse().map((r, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: i < referrals.length - 1 ? "1px solid #f1f3f5" : "none", fontSize: 13 }}>
                      <span style={{ color: "#94a3b8", minWidth: 64 }}>{new Date(r.date).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" })}</span>
                      <span style={{ color: "#1a1a1f", fontWeight: 600, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name} 님 가입</span>
                      <span style={{ color: GREEN, fontWeight: 800 }}>+{r.reward} 🪙</span>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={() => setReferrals(addReferral(`친구 ${referrals.length + 1}`))}
                style={{ marginTop: 14, width: "100%", background: "#fffbeb", border: "1.5px solid #f1d27a", color: "#a16207", borderRadius: 10, padding: "11px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
                ＋ 데모: 내 코드로 가입 시뮬레이션 (+{REFERRAL_REWARD} 크레딧)
              </button>
              {referredBy && (
                <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", margin: "12px 0 0" }}>가입 시 입력한 추천인: <strong style={{ color: "#475569" }}>{referredBy}</strong></p>
              )}
              <p style={{ fontSize: 11, color: "#cbd5e1", textAlign: "center", margin: "8px 0 0" }}>※ 데모 영수증입니다(계정 영구 저장·결제 연동 전).</p>
            </section>

            <p style={{ fontSize: 12.5, color: "#94a3b8", textAlign: "center" }}>
              학생 본인이신가요? <a href="https://inheroedu.com" target="_blank" rel="noopener noreferrer" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>학생 사이트 →</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 13px", borderRadius: 10, border: "1.5px solid #d7dce2",
  fontSize: 15, outline: "none", background: "#fff", boxSizing: "border-box", appearance: "none",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 6, letterSpacing: "0.02em" }}>{label}</label>
      {children}
    </div>
  );
}
