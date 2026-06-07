"use client";

/**
 * /parents/materials — WHITE "아이비리그 학생 자료방".
 *
 * Surfaces the library's INHERO ORIGINAL notes (Ivy students' handwritten AP
 * study notes) in a white card grid. Real content via /api/library/feed
 * (auth-gated): signed-in parents see the notes; logged-out sees a signup gate.
 * Cards open the existing reader (/library/[id]/read).
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";

const GREEN = "#00b85f";

interface FeedItem {
  id: string;
  title: string;
  isInheroOfficial: boolean;
  previewPage1Url: string | null;
  previewStatus: string | null;
  totalPages: number | null;
  downloadCount: number;
  upvoteCount: number;
  commentCount: number;
  lounge: { slug: string; name: string } | null;
  author: { handle: string } | null;
}

export default function MaterialsClient() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => setLoggedIn(false));
    authFetch("/api/library/feed?official=official")
      .then((r) => r.json())
      .then((d) => setItems(Array.isArray(d?.items) ? d.items.filter((i: FeedItem) => i.isInheroOfficial) : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const gateSignup = () =>
    window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/materials" } }));

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", cursor: "auto", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 20px 90px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10, flexWrap: "wrap" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", margin: 0 }}>🎓 아이비리그 학생 자료방</p>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#b45309", background: "#fef3c7", borderRadius: 6, padding: "2px 9px" }}>⭐ INHERO ORIGINAL</span>
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.6vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 10 }}>
          아이비리그 학생이 직접 쓴 AP 노트
        </h1>
        <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.7, marginBottom: 24 }}>
          Cornell 등 아이비리그 재학생이 손으로 정리한 실제 AP 학습 노트입니다. 표지를 눌러 바로 읽어보세요.
        </p>

        {loading ? (
          <p style={{ color: "#94a3b8", fontSize: 14, padding: "30px 0", textAlign: "center" }}>자료를 불러오는 중…</p>
        ) : items.length === 0 ? (
          <GateCard loggedIn={loggedIn} onSignup={gateSignup} />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18 }}>
            {items.map((it) => (
              <Link key={it.id} href={`/library/${it.id}/read`} style={{ textDecoration: "none", color: "inherit" }}>
                <article style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 2px rgba(16,24,40,0.04)", transition: "transform 180ms, box-shadow 200ms" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(16,24,40,0.12)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 2px rgba(16,24,40,0.04)"; }}>
                  {/* preview */}
                  <div style={{ position: "relative", height: 230, background: "#f1f3f5", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {it.previewPage1Url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={it.previewPage1Url} alt={it.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                    ) : (
                      <div style={{ textAlign: "center", color: "#94a3b8" }}>
                        <div style={{ fontSize: 38 }}>📕</div>
                        <div style={{ fontSize: 12, marginTop: 6 }}>미리보기 생성 중…</div>
                      </div>
                    )}
                    <span style={{ position: "absolute", top: 10, left: 10, fontSize: 9.5, fontWeight: 900, letterSpacing: "0.06em", color: "#7c5500", background: "#fde68a", borderRadius: 5, padding: "3px 8px" }}>⭐ INHERO ORIGINAL</span>
                    {!!it.totalPages && it.totalPages > 1 && (
                      <span style={{ position: "absolute", top: 10, right: 10, fontSize: 11, fontWeight: 900, color: "#fff", background: "#dc2626", borderRadius: 6, padding: "3px 9px", boxShadow: "0 2px 8px rgba(220,38,38,0.4)" }}>📄 {it.totalPages}p</span>
                    )}
                  </div>
                  {/* meta */}
                  <div style={{ padding: "13px 15px 15px" }}>
                    <div style={{ fontSize: 14.5, fontWeight: 800, color: "#1a1a1f", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: 40 }}>{it.title}</div>
                    {!!it.totalPages && it.totalPages > 1 && (
                      <div style={{ fontSize: 12.5, fontWeight: 800, color: "#dc2626", marginTop: 6 }}>📄 총 {it.totalPages}페이지</div>
                    )}
                    {it.lounge && <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 6 }}>📕 {it.lounge.name}</div>}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                      {it.author && <span style={{ fontSize: 12, color: "#64748b", fontStyle: "italic", fontWeight: 600 }}>by {it.author.handle}</span>}
                      <span style={{ fontSize: 11, color: "#cbd5e1", display: "flex", gap: 8 }}>
                        <span>↓ {it.downloadCount}</span><span>▲ {it.upvoteCount}</span><span>💬 {it.commentCount}</span>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GateCard({ loggedIn, onSignup }: { loggedIn: boolean | null; onSignup: () => void }) {
  return (
    <div style={{ background: "linear-gradient(135deg,#0a0a14,#13131f)", borderRadius: 16, padding: "44px 28px", textAlign: "center" }}>
      <div style={{ fontSize: 38, marginBottom: 12 }}>🔒</div>
      <div style={{ color: "#fff", fontSize: 19, fontWeight: 800, marginBottom: 8 }}>
        {loggedIn ? "아직 등록된 자료가 없습니다" : "아이비리그 학생 자료방"}
      </div>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7, marginBottom: 22, maxWidth: 420, margin: "0 auto 22px" }}>
        {loggedIn
          ? "곧 더 많은 아이비리그 학생 노트가 올라옵니다."
          : "Cornell 등 아이비리그 재학생이 직접 쓴 AP 노트를 보려면 무료 가입이 필요합니다. 카드 필요 없음."}
      </p>
      {!loggedIn && (
        <button onClick={onSignup} style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "13px 30px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" }}>
          무료 가입하고 자료방 입장 →
        </button>
      )}
    </div>
  );
}
