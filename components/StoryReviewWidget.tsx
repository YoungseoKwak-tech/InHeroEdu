"use client";

/**
 * Small floating "독자 후기" (reader reviews) widget for /parents/story.
 * Docks on the right on wide screens, collapses to a launcher pill on narrow.
 * Reviews are persisted via the existing QA questions table under the
 * dedicated subject "story-review" (kept out of the normal QA/lounge feeds).
 */

import { useEffect, useState } from "react";
import { getStoredUserId, getStoredUsername } from "@/lib/username";
import { addCredits } from "@/lib/credits";

const GREEN = "#00b85f";
const SUBJECT = "story-review";
const REVIEW_REWARD = 5;                      // 후기 작성 적립 크레딧
const REWARD_KEY = "inhero-review-rewarded";  // 1회만 적립(어뷰징 방지)

type Review = { id: string; nickname: string | null; title: string | null; content: string; created_at?: string };

export default function StoryReviewWidget() {
  const [isWide, setIsWide]       = useState(false);
  const [open, setOpen]           = useState(true);
  const [reviews, setReviews]     = useState<Review[]>([]);
  const [text, setText]           = useState("");
  const [name, setName]           = useState("");
  const [rating, setRating]       = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]           = useState(false);
  const [gotReward, setGotReward] = useState(false);
  const [rewarded, setRewarded]   = useState(true); // assume claimed until localStorage says otherwise

  useEffect(() => {
    const f = () => setIsWide(window.innerWidth >= 1100);
    f();
    window.addEventListener("resize", f);
    setName(getStoredUsername() || "");
    try { setRewarded(localStorage.getItem(REWARD_KEY) === "1"); } catch { /* ignore */ }
    return () => window.removeEventListener("resize", f);
  }, []);

  useEffect(() => {
    fetch(`/api/qa/questions?subject=${SUBJECT}`)
      .then((r) => r.json())
      .then((d) => setReviews(Array.isArray(d.questions) ? d.questions : []))
      .catch(() => {});
  }, []);

  // collapse by default on narrow screens
  useEffect(() => { setOpen(isWide); }, [isWide]);

  async function submit() {
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    const nickname = name.trim() || "익명";
    const title = "★".repeat(rating) + "☆".repeat(5 - rating);
    try {
      const res = await fetch("/api/qa/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: getStoredUserId(), nickname, subject: SUBJECT, title, content: text.trim() }),
      });
      const data = await res.json();
      if (data.question) {
        setReviews((prev) => [data.question, ...prev]);
        setText("");
        // 첫 후기에 한해 5크레딧 적립
        if (!rewarded) {
          addCredits(REVIEW_REWARD);
          try { localStorage.setItem(REWARD_KEY, "1"); } catch { /* ignore */ }
          setRewarded(true);
          setGotReward(true);
        }
        setDone(true);
        setTimeout(() => { setDone(false); setGotReward(false); }, 2600);
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Collapsed launcher (narrow screens)
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", bottom: 18, right: 16, zIndex: 60,
          background: GREEN, color: "#03120c", border: "none", borderRadius: 999,
          padding: "12px 18px", fontSize: 14, fontWeight: 800, cursor: "pointer",
          boxShadow: "0 8px 22px rgba(0,184,95,0.35)",
        }}
      >
        {rewarded ? "✍️ 후기 남기기" : "🎁 후기 쓰고 5크레딧"}
      </button>
    );
  }

  const containerStyle: React.CSSProperties = isWide
    ? { position: "fixed", top: 96, right: 24, width: 288, zIndex: 60, maxHeight: "calc(100vh - 130px)" }
    : { position: "fixed", bottom: 14, right: 12, width: "min(320px, 92vw)", zIndex: 60, maxHeight: "70vh" };

  return (
    <div style={{ ...containerStyle, display: "flex", flexDirection: "column", background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, boxShadow: "0 14px 40px rgba(20,10,50,0.16)", overflow: "hidden" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "linear-gradient(135deg,#1b1340,#2d1a5e)" }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>📣 독자 후기</span>
        <button onClick={() => setOpen(false)} aria-label="접기" style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 16, cursor: "pointer", lineHeight: 1, padding: 2 }}>—</button>
      </div>

      {/* recent reviews */}
      <div style={{ overflowY: "auto", padding: reviews.length ? "10px 12px" : "0 12px", flex: "1 1 auto" }}>
        {reviews.length === 0 ? (
          <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", padding: "16px 4px", margin: 0, lineHeight: 1.6 }}>아직 후기가 없어요.<br />첫 후기를 남겨주세요!</p>
        ) : (
          reviews.slice(0, 12).map((r) => (
            <div key={r.id} style={{ padding: "9px 0", borderBottom: "1px solid #f1f3f5" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 11, color: "#f59e0b", letterSpacing: "0.5px" }}>{r.title || "★★★★★"}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b" }}>{r.nickname || "익명"}</span>
              </div>
              <p style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.55, margin: 0, whiteSpace: "pre-wrap" }}>{r.content}</p>
            </div>
          ))
        )}
      </div>

      {/* composer */}
      <div style={{ borderTop: "1px solid #eef0f3", padding: "10px 12px", background: "#fafbfc" }}>
        {!rewarded && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: 8, padding: "6px 10px", marginBottom: 8, fontSize: 11.5, fontWeight: 800, color: "#92400e" }}>
            🎁 후기 남기면 5크레딧 적립!
          </div>
        )}
        {/* star picker */}
        <div style={{ display: "flex", gap: 2, marginBottom: 7 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)} aria-label={`${n}점`} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0, color: n <= rating ? "#f59e0b" : "#d4d8dd" }}>★</button>
          ))}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="이 책/자료에 대한 후기를 남겨주세요"
          rows={2}
          style={{ width: "100%", boxSizing: "border-box", border: "1px solid #e2e6ea", borderRadius: 9, padding: "8px 10px", fontSize: 12.5, resize: "none", outline: "none", lineHeight: 1.5, color: "#1a1a1f", background: "#fff" }}
        />
        <div style={{ display: "flex", gap: 6, marginTop: 7 }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름(선택)"
            style={{ flex: "1 1 0", minWidth: 0, boxSizing: "border-box", border: "1px solid #e2e6ea", borderRadius: 9, padding: "8px 10px", fontSize: 12, outline: "none", color: "#1a1a1f", background: "#fff" }}
          />
          <button
            onClick={submit}
            disabled={!text.trim() || submitting}
            style={{ flexShrink: 0, background: done ? "#475569" : GREEN, color: done ? "#fff" : "#03120c", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 12.5, fontWeight: 800, cursor: text.trim() && !submitting ? "pointer" : "default", opacity: !text.trim() || submitting ? 0.45 : 1 }}
          >
            {done ? (gotReward ? "🎉 +5 크레딧!" : "감사합니다!") : submitting ? "등록 중…" : "등록"}
          </button>
        </div>
      </div>
    </div>
  );
}
