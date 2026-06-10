"use client";

/**
 * /admin/credits — who spent credits, where, and how much.
 *
 * Reads /api/admin/credits (balance + credit_unlocks per user) and decodes each
 * unlock key into a human-readable line item. Admin-gated by the API.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";

interface CreditUser {
  id: string;
  email: string | null;
  name: string | null;
  grade: string | null;
  school: string | null;
  credits: number;
  unlocks: string[];
  payments: Payment[];
  createdAt: string | null;
}

interface Payment {
  paidAt: string | null;
  amount: number;
  currency: string;
  serviceId: string;
  orderName: string | null;
  provider: string | null;
}

function fmtDateTime(iso: string | null): string {
  if (!iso) return "시각 미상";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "시각 미상";
  return d.toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
}

type Decoded = { label: string; cost: number; cat: string };

function decodeUnlock(key: string): Decoded {
  if (key.startsWith("qa-post:")) return { label: "입시 Q&A 질문 등록", cost: 5, cat: "Q&A" };
  if (key === "parents:question-bank") return { label: "문제은행 · 전 과목", cost: 1000, cat: "문제은행" };
  if (key.startsWith("parents:question-bank:")) return { label: `문제은행 · ${key.split(":").pop()}`, cost: 200, cat: "문제은행" };
  if (key === "parents:core-notes") return { label: "핵심노트 · 전 과목", cost: 1000, cat: "핵심노트" };
  if (key.startsWith("parents:core-notes:")) return { label: `핵심노트 · ${key.split(":").pop()}`, cost: 200, cat: "핵심노트" };
  if (key === "res:/parents/story") return { label: "합격 수기 (책)", cost: 200, cat: "자료" };
  if (key === "res:/parents/essay") return { label: "합격 에세이 분석", cost: 250, cat: "자료" };
  if (key === "res:/parents/activities") return { label: "합격 활동 분석", cost: 250, cat: "자료" };
  if (key === "res:/parents/colleges") return { label: "미국 대학 분석", cost: 250, cat: "자료" };
  if (key.startsWith("res:")) return { label: key.replace("res:", ""), cost: 0, cat: "자료" };
  return { label: key, cost: 0, cat: "기타" };
}

function breakdown(unlocks: string[]) {
  const items = new Map<string, { count: number; total: number; cat: string }>();
  let total = 0;
  for (const k of unlocks) {
    const d = decodeUnlock(k);
    const e = items.get(d.label) ?? { count: 0, total: 0, cat: d.cat };
    e.count += 1;
    e.total += d.cost;
    items.set(d.label, e);
    total += d.cost;
  }
  const list = [...items.entries()].map(([label, v]) => ({ label, ...v })).sort((a, b) => b.total - a.total);
  return { list, total };
}

const CAT_COLOR: Record<string, string> = {
  "Q&A": "#7DD3FC",
  "문제은행": "#FCD34D",
  "핵심노트": "#86EFAC",
  "자료": "#C4B5FD",
  "기타": "#94A3B8",
};

export default function AdminCreditsPage() {
  const [users, setUsers] = useState<CreditUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [onlySpenders, setOnlySpenders] = useState(true);

  useEffect(() => {
    (async () => {
      const session = await getClientSession();
      if (!session) { setError("로그인이 필요합니다."); setLoading(false); return; }
      const res = await fetch("/api/admin/credits", { headers: { authorization: `Bearer ${session.access_token}` } });
      if (!res.ok) { setError("관리자 권한이 필요합니다."); setLoading(false); return; }
      const data = await res.json();
      setUsers(data.users ?? []);
      setLoading(false);
    })();
  }, []);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users
      .map((u) => ({ u, b: breakdown(u.unlocks) }))
      .filter(({ u, b }) => (onlySpenders ? (b.total > 0 || u.payments.length > 0) : true))
      .filter(({ u }) => !q || [u.email, u.name, u.grade, u.school].filter(Boolean).some((s) => String(s).toLowerCase().includes(q)));
  }, [users, search, onlySpenders]);

  const totals = useMemo(() => {
    let spent = 0, spenders = 0;
    for (const u of users) {
      const t = breakdown(u.unlocks).total;
      if (t > 0) { spent += t; spenders += 1; }
    }
    return { spent, spenders };
  }, [users]);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#fff", padding: "28px 20px 80px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <Link href="/admin/students" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 13 }}>← 학생/가입자</Link>
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", margin: "6px 0 2px" }}>💳 Credit Usage</h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 18 }}>
          누가 크레딧을 어디에 얼마나 썼는지 — {totals.spenders}명이 합계 {totals.spent.toLocaleString()} 크레딧 사용
        </p>

        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이메일·이름·학년·학교 검색…"
            style={{ flex: "1 1 240px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "11px 14px", color: "#fff", fontSize: 14, outline: "none" }}
          />
          <label style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>
            <input type="checkbox" checked={onlySpenders} onChange={(e) => setOnlySpenders(e.target.checked)} />
            크레딧 쓴 사람만
          </label>
        </div>

        {loading ? (
          <p style={{ color: "rgba(255,255,255,0.4)" }}>불러오는 중…</p>
        ) : error ? (
          <p style={{ color: "#fca5a5" }}>{error}</p>
        ) : rows.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.4)" }}>해당하는 사용자가 없습니다.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {rows.map(({ u, b }) => (
              <div key={u.id} style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>{u.name ?? u.email}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                      {u.name ? u.email : ""}{u.grade ? ` · ${u.grade}` : ""}{u.school ? ` · ${u.school}` : ""}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#FCD34D" }}>−{b.total.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>사용 · 잔액 {u.credits.toLocaleString()}</div>
                  </div>
                </div>
                {b.list.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                    {b.list.map((it) => (
                      <span key={it.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: CAT_COLOR[it.cat] ?? "#cbd5e1", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "5px 11px" }}>
                        {it.label}{it.count > 1 ? ` ×${it.count}` : ""} · {it.total.toLocaleString()}
                      </span>
                    ))}
                  </div>
                )}
                {u.payments.length > 0 && (
                  <div style={{ marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 10 }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>💳 실결제 내역 (충전·구매)</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {u.payments.map((pm, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, fontSize: 12.5, flexWrap: "wrap" }}>
                          <span style={{ color: "#86EFAC", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>🕒 {fmtDateTime(pm.paidAt)}</span>
                          <span style={{ color: "rgba(255,255,255,0.78)" }}>
                            {pm.orderName ?? pm.serviceId} · <strong>{pm.amount.toLocaleString()}{pm.currency === "KRW" ? "원" : ` ${pm.currency}`}</strong>{pm.provider ? ` · ${pm.provider}` : ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
