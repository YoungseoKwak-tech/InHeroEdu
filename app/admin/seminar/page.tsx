"use client";

import { useEffect, useMemo, useState } from "react";
import { getClientSession } from "@/lib/client-auth";

interface Applicant {
  email: string;
  appliedAt: string;
  name: string | null;
  phone: string | null;
  grade: string | null;
  school: string | null;
  role: string | null;
  memo: string | null;
  userId: string | null;
}

function fmt(v: string) {
  try { return new Date(v).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }); } catch { return v; }
}

export default function AdminSeminarPage() {
  const [apps, setApps] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const session = await getClientSession();
      if (!session) { setError("로그인이 필요합니다."); setLoading(false); return; }
      const res = await fetch("/api/admin/seminar-applications", {
        headers: { authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) { setError("관리자 권한이 필요합니다."); setLoading(false); return; }
      const data = await res.json();
      setApps(data.applicants ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(
    () => apps.filter((a) =>
      [a.name, a.email, a.phone, a.grade, a.school].filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q.toLowerCase()))
    ),
    [apps, q]
  );

  function exportCsv() {
    const head = ["구분", "이름", "이메일", "연락처", "학년", "학교", "메모", "신청일시(KST)"];
    const lines = [head.join(",")].concat(
      filtered.map((a) =>
        [a.role, a.name, a.email, a.phone, a.grade, a.school, a.memo, fmt(a.appliedAt)]
          .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")
      )
    );
    const blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `seminar-applications-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) return <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}>불러오는 중…</div>;
  if (error) return <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#c0392b", fontWeight: 600 }}>{error}</div>;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 20px 80px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>세미나 신청자</h1>
          <p style={{ color: "#5b6b7b", fontSize: 14, marginTop: 6 }}>2026-06-13 (토) 20:00 KST · 총 <b style={{ color: "#00b85f" }}>{apps.length}</b>명 신청</p>
        </div>
        <button onClick={exportCsv} style={{ background: "#0b1622", color: "#fff", border: "none", borderRadius: 10, padding: "10px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          CSV 내보내기
        </button>
      </div>

      <input
        value={q} onChange={(e) => setQ(e.target.value)} placeholder="이름·이메일·연락처·학교 검색"
        style={{ width: "100%", marginTop: 18, padding: "11px 14px", border: "1px solid #d8dee5", borderRadius: 10, fontSize: 14, boxSizing: "border-box" }}
      />

      <div style={{ marginTop: 16, overflowX: "auto", border: "1px solid #e6ebf0", borderRadius: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ background: "#f6f8fa", textAlign: "left" }}>
              {["구분", "이름", "이메일", "연락처", "학년", "학교", "메모", "신청일시 (KST)"].map((h) => (
                <th key={h} style={{ padding: "11px 14px", fontWeight: 700, color: "#3a4756", borderBottom: "1px solid #e6ebf0", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={(a.userId ?? a.email) + i} style={{ borderBottom: "1px solid #eef2f5" }}>
                <td style={{ padding: "11px 14px" }}>{a.role ?? <span style={{ color: "#aab4bf" }}>—</span>}</td>
                <td style={{ padding: "11px 14px", fontWeight: 600 }}>{a.name ?? <span style={{ color: "#aab4bf" }}>—</span>}</td>
                <td style={{ padding: "11px 14px" }}>{a.email}</td>
                <td style={{ padding: "11px 14px", whiteSpace: "nowrap" }}>{a.phone ?? <span style={{ color: "#aab4bf" }}>—</span>}</td>
                <td style={{ padding: "11px 14px" }}>{a.grade ?? <span style={{ color: "#aab4bf" }}>—</span>}</td>
                <td style={{ padding: "11px 14px" }}>{a.school ?? <span style={{ color: "#aab4bf" }}>—</span>}</td>
                <td style={{ padding: "11px 14px", maxWidth: 220, color: "#3a4756" }}>{a.memo ?? <span style={{ color: "#aab4bf" }}>—</span>}</td>
                <td style={{ padding: "11px 14px", whiteSpace: "nowrap", color: "#5b6b7b" }}>{fmt(a.appliedAt)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} style={{ padding: "28px 14px", textAlign: "center", color: "#9aa6b2" }}>신청자가 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
