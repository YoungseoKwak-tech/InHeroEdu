"use client";

/**
 * MaterialPreviewModal — the "click a note → blurred teaser + description +
 * reviews → buy" sales sheet shown for every Ivy student note. Used on both the
 * /parents hub and the /parents/materials list so the gated purchase experience
 * is identical everywhere (and large files can't be downloaded ungated).
 *
 * The modal owns its own buy flow (spendAndUnlockAccount). On a successful
 * unlock it calls onUnlocked(material) — the caller decides where to send the
 * user (inline reader vs. download).
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBalance, spendAndUnlockAccount, CREDIT_EVENT, CREDIT_COSTS } from "@/lib/credits";
import { materialPitch, materialSellingPoints, NOTE_REVIEWS } from "@/lib/materialPitch";

const GREEN = "#00b85f";
const MATERIAL_COST = CREDIT_COSTS.NOTE_UNIT; // 50

export interface PreviewMaterial {
  id: string;
  title: string;
  totalPages: number | null;
  previewPage1Url: string | null;
  lounge: { name?: string | null } | null;
}

export default function MaterialPreviewModal({
  material,
  onClose,
  onUnlocked,
}: {
  material: PreviewMaterial | null;
  onClose: () => void;
  onUnlocked: (m: PreviewMaterial) => void;
}) {
  const [buying, setBuying] = useState(false);
  const [needCharge, setNeedCharge] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const sync = () => setBalance(getBalance());
    sync();
    window.addEventListener(CREDIT_EVENT, sync);
    return () => window.removeEventListener(CREDIT_EVENT, sync);
  }, [material?.id]);

  useEffect(() => { setNeedCharge(false); }, [material?.id]);

  if (!material) return null;
  const m = material;
  const pitch = materialPitch(m);

  async function buy() {
    if (buying) return;
    setBuying(true); setNeedCharge(false);
    try {
      const result = await spendAndUnlockAccount(`material:${m.id}`, MATERIAL_COST);
      if (result.ok) { onClose(); onUnlocked(m); }
      else if (result.reason === "insufficient") setNeedCharge(true);
      else if (result.reason === "account_anomaly") window.alert("크레딧 기록 확인이 필요해요. 결제 없이 열린 기록이 있어 관리자에게 문의해 주세요.");
      else window.alert("크레딧 차감 확인 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setBuying(false);
    }
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 230, background: "rgba(15,23,42,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(540px, 96vw)", maxHeight: "92vh", overflowY: "auto", background: "#fff", borderRadius: 18, boxShadow: "0 24px 70px rgba(0,0,0,0.4)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "16px 20px 10px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 800, color: "#7c3aed", background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 999, padding: "4px 11px" }}>🔍 미리보기</span>
          <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 18, color: "#94a3b8", cursor: "pointer" }}>✕</button>
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 850, margin: "0 20px 2px", letterSpacing: "-0.01em", color: "#1a1a1f" }}>{m.title}</h3>
        <p style={{ fontSize: 12.5, fontWeight: 800, color: "#b45309", margin: "0 20px 12px" }}>✍️ {pitch.headline}</p>

        {/* Page-1 peek — only a sliver is readable; the rest is heavily blurred */}
        <div style={{ position: "relative", margin: "0 20px", borderRadius: 12, overflow: "hidden", border: "1px solid #e6e8ec", background: "#f1f5f9", maxHeight: 320 }}>
          {m.previewPage1Url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={m.previewPage1Url} alt={`${m.title} 미리보기`} style={{ display: "block", width: "100%", height: "auto" }} />
          ) : (
            <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 13 }}>📄 미리보기</div>
          )}
          <div style={{ position: "absolute", left: 0, right: 0, top: "22%", bottom: 0, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", background: "linear-gradient(180deg, rgba(241,245,249,0) 0%, rgba(241,245,249,0.6) 30%, rgba(241,245,249,0.97) 80%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 16, gap: 4 }}>
            <span style={{ fontSize: 22 }}>🔒</span>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: "#334155" }}>전체{m.totalPages ? ` ${m.totalPages}페이지` : ""} — 잠금 해제 후 열람</span>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>미리보기는 1페이지 일부만 보여드려요</span>
          </div>
        </div>

        {/* 설명 */}
        <div style={{ margin: "14px 20px 0", background: "#fffdf7", border: "1px solid #f5e9c8", borderRadius: 12, padding: "13px 15px" }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: "#92400e", marginBottom: 8 }}>📝 이 노트는?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {materialSellingPoints(m).map((pt, i) => (
              <div key={i} style={{ fontSize: 12.5, color: "#3a3a3f", lineHeight: 1.5 }}>{pt}</div>
            ))}
          </div>
        </div>

        {/* 후기 */}
        <div style={{ margin: "12px 20px 0", background: "#fbfcfe", border: "1px solid #eef0f3", borderRadius: 12, padding: "13px 15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
            <span style={{ fontSize: 11.5, fontWeight: 900, color: "#475569" }}>💬 이 노트를 산 분들 후기</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#f59e0b" }}>★ 4.9 · {NOTE_REVIEWS.length}+</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {NOTE_REVIEWS.map((r, i) => (
              <div key={i}>
                <span style={{ fontSize: 11.5, color: "#f59e0b", letterSpacing: 1 }}>{"★".repeat(r.stars)}</span>
                <p style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.55, margin: "2px 0 2px" }}>“{r.text}”</p>
                <div style={{ fontSize: 10.5, color: "#94a3b8" }}>{r.name} · {r.role}</div>
              </div>
            ))}
          </div>
        </div>

        {needCharge && (
          <div style={{ margin: "12px 20px 0", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "10px 13px" }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#c2410c", marginBottom: 2 }}>🪙 {Math.max(0, MATERIAL_COST - balance)}크레딧 부족 — 친구 추천하면 +20!</div>
            <Link href="/parents/me" onClick={onClose} style={{ fontSize: 11.5, color: "#7c3aed", fontWeight: 700, textDecoration: "none" }}>내 추천코드 보기 →</Link>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, padding: "16px 20px 20px" }}>
          <button onClick={onClose} style={{ flex: 1, background: "#fff", border: "1.5px solid #e2e6ea", color: "#64748b", borderRadius: 10, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>닫기</button>
          <button onClick={buy} disabled={buying} style={{ flex: 2, background: GREEN, color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontWeight: 850, fontSize: 14, cursor: buying ? "default" : "pointer", opacity: buying ? 0.7 : 1 }}>
            {buying ? "확인 중…" : `🪙 ${MATERIAL_COST} 크레딧으로 보기 (보유 ${balance.toLocaleString()})`}
          </button>
        </div>
      </div>
    </div>
  );
}
