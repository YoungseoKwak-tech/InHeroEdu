"use client";

/**
 * /parents/lounge — 학부모 라운지 (parent Q&A board).
 *
 * Parents want info exchange, not "community". Reuses the existing Q&A backend
 * (questions_qa / answers_qa) scoped to subject="parent-lounge"; threads open in
 * the existing /qa/[id] view. Reading is open; posting a question is gated to
 * signed-in users (opens the global auth modal otherwise).
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";
import { resolveAuthor, specialAuthorForEmail } from "@/lib/specialAuthors";
import { spendAndUnlock } from "@/lib/credits";
import { isAdminEmail } from "@/lib/adminEmails";

const SUBJECT = "parent-lounge";
const FREE_POSTS = 3;  // 처음 3회 질문 등록은 무료
const POST_COST = 5;   // 이후 질문 등록 1건당 크레딧
const postCountKey = (uid: string) => `inhero-qa-posts:${uid}`;

interface Question {
  id: string;
  nickname: string;
  title: string;
  content: string;
  view_count: number;
  answer_count: number;
  created_at: string;
}

function timeAgo(iso: string): string {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 60) return "방금";
  if (d < 3600) return `${Math.floor(d / 60)}분 전`;
  if (d < 86400) return `${Math.floor(d / 3600)}시간 전`;
  return `${Math.floor(d / 86400)}일 전`;
}

export default function LoungeClient() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; nickname: string } | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [freeUsed, setFreeUsed] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getClientSession().then((s) => {
      if (s?.user) {
        const m = (s.user.user_metadata ?? {}) as Record<string, unknown>;
        const persona = specialAuthorForEmail(s.user.email);
        const nickname = persona?.name || (m.handle as string) || (m.name as string) || s.user.email?.split("@")[0] || "학부모";
        setUser({ id: s.user.id, nickname });
        setIsAdmin(isAdminEmail(s.user.email));
        try { setFreeUsed(Number(localStorage.getItem(postCountKey(s.user.id)) || "0")); } catch { /* ignore */ }
      }
    }).catch(() => {});
    load();
  }, []);

  function load() {
    setLoading(true);
    fetch(`/api/qa/questions?subject=${SUBJECT}&sort=latest`)
      .then((r) => r.json())
      .then((d) => setQuestions(d?.questions ?? []))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }

  function askClicked() {
    if (!user) {
      window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/lounge" } }));
      return;
    }
    setShowForm((v) => !v);
  }

  async function submit() {
    if (!user || !title.trim() || !content.trim() || posting) return;
    const key = postCountKey(user.id);
    const used = Number(localStorage.getItem(key) || "0");
    // 처음 3회는 무료, 이후부터 건당 5크레딧 차감 (고유 키로 매번 부과 + 계정 동기화).
    // 관리자는 크레딧 없이 무제한.
    if (!isAdmin && used >= FREE_POSTS) {
      const paid = spendAndUnlock(`qa-post:${user.id}:${Date.now()}`, POST_COST);
      if (!paid) { window.dispatchEvent(new Event("inhero:open-charge")); return; }
    }
    setPosting(true);
    try {
      const res = await fetch("/api/qa/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, nickname: user.nickname, subject: SUBJECT, title, content }),
      });
      const d = await res.json();
      if (d?.question) {
        setQuestions((q) => [d.question, ...q]);
        setTitle(""); setContent(""); setShowForm(false);
        try { localStorage.setItem(key, String(used + 1)); } catch { /* ignore */ }
        setFreeUsed(used + 1);
      }
    } finally {
      setPosting(false);
    }
  }

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: "#00b85f" }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 20px 100px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#dc2680", letterSpacing: "0.04em", marginBottom: 10 }}>💬 학부모 라운지</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
          미국 입시, 같이 묻고 답해요
        </h1>
        <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.75, marginBottom: 24 }}>
          "G10인데 AP 몇 개가 적당할까요?", "Conrad Challenge 해보신 분?" — 미국 입시를 준비하는 학부모들이 정보를 나누는 공간입니다.
        </p>

        {/* Ask bar */}
        <div style={{ marginBottom: 24 }}>
          <button onClick={askClicked} style={{ width: "100%", textAlign: "left", background: "#fff", border: "1px solid #e6e8ec", borderRadius: 12, padding: "16px 18px", fontSize: 14.5, color: showForm ? "#1a1a1f" : "#94a3b8", cursor: "pointer", fontWeight: 500 }}>
            {showForm ? "✕ 작성 취소" : (user ? "✏️  궁금한 점을 질문해보세요…" : "✏️  질문하려면 무료 가입하기")}
          </button>

          {showForm && user && (
            <div style={{ marginTop: 12, background: "#fff", border: "1px solid #e6e8ec", borderRadius: 12, padding: 16 }}>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목 (예: G10 자녀, AP 몇 개가 적당할까요?)" maxLength={120}
                style={{ width: "100%", border: "1px solid #e6e8ec", borderRadius: 8, padding: "11px 13px", fontSize: 14.5, marginBottom: 10, outline: "none", boxSizing: "border-box", background: "#fff", color: "#1a1a1f" }} />
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="자세한 내용을 적어주세요. (자녀 학년, 관심 전공 등을 함께 적으면 더 좋은 답을 받을 수 있어요.)" rows={4}
                style={{ width: "100%", border: "1px solid #e6e8ec", borderRadius: 8, padding: "11px 13px", fontSize: 14, marginBottom: 12, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", background: "#fff", color: "#1a1a1f" }} />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button onClick={submit} disabled={posting || !title.trim() || !content.trim()}
                  style={{ background: posting || !title.trim() || !content.trim() ? "#cbd5e1" : "#1a1a1f", color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 800, fontSize: 13.5, cursor: posting ? "default" : "pointer" }}>
                  {posting ? "등록 중…" : isAdmin ? "질문 등록" : freeUsed < FREE_POSTS ? `질문 등록 (무료 ${FREE_POSTS - freeUsed}회 남음)` : `질문 등록 (${POST_COST}크레딧)`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* List */}
        {loading ? (
          <p style={{ color: "#94a3b8", fontSize: 14 }}>불러오는 중…</p>
        ) : questions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 20px", background: "#fff", border: "1px dashed #cbd5e1", borderRadius: 14 }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>💬</div>
            <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>아직 질문이 없습니다</p>
            <p style={{ fontSize: 13.5, color: "#64748b" }}>첫 질문을 남기고 다른 학부모들과 정보를 나눠보세요.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {questions.map((q) => (
              <Link key={q.id} href={`/qa/${q.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <article style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 12, padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ textAlign: "center", minWidth: 48 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: q.answer_count > 0 ? "#00b85f" : "#cbd5e1" }}>{q.answer_count}</div>
                    <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 600 }}>답변</div>
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px", color: "#1a1a1f", lineHeight: 1.4 }}>{q.title}</p>
                    <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.55, margin: "0 0 8px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{q.content}</p>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>
                      {resolveAuthor({ nickname: q.nickname }).crown
                        ? <span style={{ fontWeight: 800, color: "#92400e" }}>👑 코넬맘</span>
                        : q.nickname} · {timeAgo(q.created_at)} · 조회 {q.view_count}</div>
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
