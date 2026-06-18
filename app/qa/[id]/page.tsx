"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getStoredUserId, getStoredUsername, saveUsername } from "@/lib/username";
import { useLang } from "@/app/contexts/LanguageContext";
import { getClientSession } from "@/lib/client-auth";
import { resolveAuthor, specialAuthorForEmail, type SpecialAuthor } from "@/lib/specialAuthors";
import { TierBadge } from "@/components/parents/TierBadge";

/** 👑 crown badge for special author personas (코넬맘). */
function CrownBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
      style={{ background: "linear-gradient(135deg,#fef3c7,#fde68a)", color: "#92400e", border: "1px solid #fcd34d" }}>
      👑 Cornell Mom
    </span>
  );
}

interface Question {
  id: string;
  user_id: string;
  nickname: string;
  subject: string | null;
  title: string;
  content: string;
  view_count: number;
  answer_count: number;
  created_at: string;
  role?: "student" | "parent" | null;
}

interface Answer {
  id: string;
  question_id: string;
  user_id: string;
  nickname: string;
  content: string;
  is_ai: boolean;
  is_expert: boolean;
  is_accepted: boolean;
  likes: number;
  created_at: string;
  role?: "student" | "parent" | null;
}

const SUBJECT_COLORS: Record<string, string> = {
  "AP Bio":   "#1D9E75",
  "AP Chem":  "#1D9E75",
  "AP Calc":  "#BA7517",
  "AMC":      "#3C3489",
  "SAT":      "#854F0B",
  "AP Stats": "#0F6E56",
  "AP CS":    "#444441",
};

// 학부모 라운지(입시 Q&A): 질문 남기기·학부모/학생 소통은 무료, '전문가 답변'만 계정당 3회 무료.
const FREE_EXPERT = 3;
const expertKey = (uid: string) => `inhero-qa-expert:${uid}`;

export default function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { lang: _lang } = useLang();
  void _lang;
  const lang = "en" as "en" | "ko";
  const copy = {
    ko: {
      notFound: "Question not found",
      back: "Back",
      list: "Q&A list",
      views: "views",
      answers: "answers",
      aiTutor: "AI tutor",
      aiAnswer: "AI answer (instant) ✨",
      aiLoading: "AI is drafting an answer…",
      noAnswers: "No answers yet.",
      expert: "Expert answer ✓",
      accepted: "Accepted answer 🏆",
      helpful: "👍 Helpful",
      write: "Write an answer",
      answerPlaceholder: "Write a kind, detailed answer",
      anonymousAnswer: "Post anonymously",
      anonymous: "Anonymous",
      submit: "Post answer",
      submitting: "Posting…",
    },
    en: {
      notFound: "Question not found",
      back: "Back",
      list: "Q&A List",
      views: "Views",
      answers: "Answers",
      aiTutor: "AI Tutor",
      aiAnswer: "Instant AI Answer ✨",
      aiLoading: "AI is generating an answer...",
      noAnswers: "No answers yet.",
      expert: "Expert Answer ✓",
      accepted: "Accepted Answer 🏆",
      helpful: "👍 Helpful",
      write: "Write an Answer",
      answerPlaceholder: "Write a clear and helpful answer",
      anonymousAnswer: "Answer anonymously",
      anonymous: "Anonymous",
      submit: "Post Answer",
      submitting: "Posting...",
    },
  }[lang];

  const [question, setQuestion]   = useState<Question | null>(null);
  const [answers, setAnswers]     = useState<Answer[]>([]);
  const [loading, setLoading]     = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userId]                  = useState(() => getStoredUserId());
  const [username, setUsername]   = useState(() => getStoredUsername());
  const [showPrompt, setShowPrompt] = useState(false);
  const [nameInput, setNameInput]   = useState("");
  const [anon, setAnon]           = useState(false);
  // Persona for the signed-in account (코넬맘 👑 for the founder) — forces the
  // author name on everything this account posts.
  const [persona, setPersona]     = useState<SpecialAuthor | null>(null);
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [expertUsed, setExpertUsed] = useState(0);
  useEffect(() => {
    getClientSession().then((s) => {
      setPersona(specialAuthorForEmail(s?.user?.email));
      if (s?.user) {
        setAuthUserId(s.user.id);
        try { setExpertUsed(Number(localStorage.getItem(expertKey(s.user.id)) || "0")); } catch { /* ignore */ }
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    // Don't auto-open the name modal on load — its backdrop covered the answer
    // box so typing did nothing. We collect the name at submit time instead.
    loadData();
  }, [id]);

  // Tell the global navbar to hide its cosmic chrome for parent-lounge threads,
  // so "back/home" keeps the user inside the /parents portal (not the root site).
  useEffect(() => {
    const isParentThread = question?.subject === "parent-lounge";
    window.dispatchEvent(new CustomEvent("inhero:chrome", { detail: { parent: isParentThread } }));
    return () => { window.dispatchEvent(new CustomEvent("inhero:chrome", { detail: { parent: false } })); };
  }, [question?.subject]);

  async function loadData() {
    setLoading(true);
    const [qRes, aRes] = await Promise.all([
      fetch(`/api/qa/questions?id=${id}`),
      fetch(`/api/qa/answers?questionId=${id}`),
    ]);
    const qData = await qRes.json();
    const aData = await aRes.json();
    const q     = qData.question ?? null;
    const ans   = aData.answers  ?? [];
    setQuestion(q);
    setAnswers(ans);
    setLoading(false);

    // Auto-generate AI answer if none exists — except on the parent lounge
    // (입시 Q&A), where the expert answer is a deliberate, 3-free action the
    // user triggers via "전문가 답변 받기" (see requestExpertAnswer).
    if (q && q.subject !== "parent-lounge" && !ans.some((a: Answer) => a.is_ai)) {
      generateAIAnswer(q);
    }
  }

  async function generateAIAnswer(q: Question): Promise<boolean> {
    setAiLoading(true);
    try {
      const res  = await fetch("/api/qa/auto-answer", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ questionId: q.id, title: q.title, content: q.content, subject: q.subject, lang }),
      });
      const data = await res.json();
      if (data.answer && !data.skipped) {
        setAnswers((prev) => [data.answer, ...prev]);
        return true;
      } else if (data.skipped) {
        // already exists, refresh
        const aRes  = await fetch(`/api/qa/answers?questionId=${id}`);
        const aData = await aRes.json();
        setAnswers(aData.answers ?? []);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setAiLoading(false);
    }
  }

  // 전문가(AI) 답변 받기 — 계정당 3회 무료, 이후 크레딧 충전 유도.
  async function requestExpertAnswer() {
    if (!question || aiLoading) return;
    if (!authUserId) {
      window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: `/qa/${id}` } }));
      return;
    }
    const key  = expertKey(authUserId);
    const used = Number(localStorage.getItem(key) || "0");
    if (used >= FREE_EXPERT) {
      // 무료 3회 소진 — 충전 모달을 띄워 유료 전환 유도.
      window.dispatchEvent(new Event("inhero:open-charge"));
      return;
    }
    const ok = await generateAIAnswer(question);
    if (ok) {
      try { localStorage.setItem(key, String(used + 1)); } catch { /* ignore */ }
      setExpertUsed(used + 1);
    }
  }

  async function handleSubmitAnswer(nameOverride?: string) {
    if (!answerText.trim() || submitting) return;
    // Need a display name unless answering anonymously — prompt now (at submit),
    // so the answer box itself is never blocked by the modal backdrop. Once the
    // user confirms a name we re-enter here with nameOverride and post directly.
    // Founder account always posts as its persona (코넬맘) — skip the name prompt.
    const resolvedName = persona ? persona.name : anon ? copy.anonymous : (nameOverride || username);
    if (!persona && !anon && !resolvedName) { setShowPrompt(true); return; }
    const nick = persona ? persona.name : anon ? copy.anonymous : (resolvedName || copy.anonymous);
    setSubmitting(true);
    try {
      const res  = await fetch("/api/qa/answers", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ questionId: id, userId, nickname: nick, content: answerText.trim() }),
      });
      const data = await res.json();
      if (data.answer) {
        setAnswers((prev) => [...prev, data.answer]);
        setAnswerText("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLike(answerId: string) {
    await fetch("/api/qa/answers", {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ answerId, action: "like" }),
    });
    setAnswers((prev) => prev.map((a) => a.id === answerId ? { ...a, likes: a.likes + 1 } : a));
  }

  function handleSetName() {
    if (!nameInput.trim()) return;
    const name = nameInput.trim();
    saveUsername(name);
    setUsername(name);
    setShowPrompt(false);
    // Auto-post the answer the user already wrote, using the just-chosen name
    // (state update is async, so pass the name explicitly).
    void handleSubmitAnswer(name);
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-1.5">{[0,1,2].map(i => <div key={i} className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}</div>
    </div>
  );

  if (!question) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      <div className="text-center">
        <p className="text-4xl mb-3">🔍</p>
        <p>{copy.notFound}</p>
        <Link href="/qa" className="btn-primary text-sm mt-4 inline-block">{copy.back}</Link>
      </div>
    </div>
  );

  const subjectColor = question.subject ? (SUBJECT_COLORS[question.subject] ?? "#1D9E75") : "#1D9E75";
  // Parent-lounge posts arrive from the white /parents portal, so render this
  // shared (otherwise dark/cosmic) detail page on a light background to match.
  const isParent = question.subject === "parent-lounge";

  return (
    <div
      className={isParent ? "qa-light min-h-screen" : "min-h-screen bg-gray-50 dark:bg-gray-950"}
      style={isParent ? { background: "#eef1f4", position: "relative", zIndex: 10 } : undefined}
    >
      {isParent && (
        <style>{`
          .qa-light .card { background:#fff !important; border:1px solid #e2e6ea !important; box-shadow:0 1px 2px rgba(16,24,40,0.05) !important; }
          .qa-light .dark\\:text-white { color:#0f172a !important; }
          .qa-light .dark\\:text-gray-300 { color:#334155 !important; }
          .qa-light .dark\\:bg-gray-900 { background:#fff !important; }
          .qa-light .dark\\:bg-gray-800 { background:#fff !important; }
          .qa-light .dark\\:bg-gray-950 { background:#eef1f4 !important; }
          .qa-light .dark\\:border-gray-800 { border-color:#e6e8ec !important; }
          .qa-light .dark\\:border-gray-700 { border-color:#e2e6ea !important; }
        `}</style>
      )}
      {/* Name prompt */}
      {showPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="font-extrabold text-gray-900 dark:text-white mb-1">Pick a display name</h2>
            <p className="text-xs text-gray-400 mb-4">This is the name shown on your answer.</p>
            <input autoFocus value={nameInput} onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSetName()}
              placeholder="e.g. yk_apbio"
              className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 mb-4"
            />
            <button onClick={handleSetName} disabled={!nameInput.trim()} className="w-full btn-primary disabled:opacity-40">Confirm</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Link href={isParent ? "/parents/lounge" : "/qa"} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary-500 transition-colors w-fit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isParent ? "Admissions Q&A" : copy.list}
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Question */}
        <div className="card p-6">
          {question.subject && !isParent && (
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full text-white mb-3" style={{ backgroundColor: subjectColor }}>
              {question.subject}
            </span>
          )}
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white mb-4">{question.title}</h1>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{question.content}</p>
          <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400">
            {(() => {
              const ra = resolveAuthor({ userId: question.user_id, nickname: question.nickname });
              return ra.crown
                ? <CrownBadge />
                : <span className="font-semibold text-gray-600 dark:text-gray-300">{ra.name}</span>;
            })()}
            {question.role && <TierBadge tier={question.role} size="sm" />}
            <span>·</span>
            <span>{new Date(question.created_at).toLocaleString(lang === "ko" ? "ko-KR" : "en-US", { dateStyle: "medium", timeStyle: "short" })}</span>
            <span>·</span>
            <span>{copy.views} {question.view_count}</span>
          </div>
        </div>

        {/* Answers */}
        <div>
          <h2 className="font-extrabold text-gray-900 dark:text-white mb-4">
            {copy.answers} {answers.length}
          </h2>

          {/* AI loading */}
          {aiLoading && (
            <div className="card p-5 mb-4 border-l-4 border-primary-400">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center text-xs font-bold text-white">AI</div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{copy.aiTutor}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  {copy.aiAnswer}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}</div>
                <span>{copy.aiLoading}</span>
              </div>
            </div>
          )}

          {/* 전문가(AI) 답변 받기 — 입시 Q&A에서만, AI 답변이 아직 없을 때 노출. 계정당 3회 무료. */}
          {isParent && !aiLoading && !answers.some((a) => a.is_ai) && (
            <div className="card p-5 mb-4 border border-emerald-200 dark:border-emerald-800" style={{ background: "linear-gradient(135deg,#ecfdf5,#f0fdf4)" }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-lg">🎓</span>
                <span className="text-sm font-extrabold text-gray-900">Get an Expert Answer</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  {expertUsed < FREE_EXPERT ? `${FREE_EXPERT - expertUsed} free left` : "Free uses used up"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                Our expert AI, trained on the answers of Ivy League mentors, will respond to this question right away. Parent-to-student conversation is free, and expert answers are free for the first 3 per account.
              </p>
              <button
                onClick={requestExpertAnswer}
                disabled={aiLoading}
                className="btn-primary text-sm py-2 px-5 disabled:opacity-40"
              >
                {expertUsed < FREE_EXPERT ? "🎓 Get an Expert Answer" : "🎓 Get an Expert Answer (Add Credits)"}
              </button>
            </div>
          )}

          {answers.length === 0 && !aiLoading ? (
            <div className="text-center py-10 text-gray-400 card">
              <p className="text-3xl mb-2">💭</p>
              <p className="text-sm">{copy.noAnswers}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {answers.map((a) => (
                <div key={a.id} className={`card p-5 ${a.is_accepted ? "ring-2 ring-emerald-400" : a.is_ai ? "ring-1 ring-primary-200 dark:ring-primary-800" : ""}`}>
                  {(() => { const ra = resolveAuthor({ userId: a.user_id, nickname: a.nickname }); return (
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${a.is_ai ? "bg-primary-500" : ra.crown ? "bg-amber-500" : a.is_expert ? "bg-emerald-500" : "bg-gray-400"}`}>
                      {a.is_ai ? "AI" : ra.crown ? "👑" : ra.name.slice(0, 1).toUpperCase()}
                    </div>
                    {ra.crown
                      ? <CrownBadge />
                      : <span className="text-sm font-bold text-gray-900 dark:text-white">{ra.name}</span>}
                    {!a.is_ai && a.role && <TierBadge tier={a.role} size="sm" />}
                    {a.is_ai && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                        {copy.aiAnswer}
                      </span>
                    )}
                    {a.is_expert && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                        {copy.expert}
                      </span>
                    )}
                    {a.is_accepted && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                        {copy.accepted}
                      </span>
                    )}
                    <span className="ml-auto text-xs text-gray-400">
                      {new Date(a.created_at).toLocaleString(lang === "ko" ? "ko-KR" : "en-US", { dateStyle: "short", timeStyle: "short" })}
                    </span>
                  </div>
                  ); })()}
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{a.content}</p>
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-50 dark:border-gray-800">
                    <button
                      onClick={() => handleLike(a.id)}
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      {copy.helpful} {a.likes > 0 && <span className="text-primary-500 font-semibold">{a.likes}</span>}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Post answer */}
        <div className="card p-5">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">{copy.write}</h3>
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder={copy.answerPlaceholder}
            rows={4}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none mb-3"
          />
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300">
              <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} className="rounded" />
              {copy.anonymousAnswer}
              {!anon && username && <span className="text-xs text-gray-400">({username})</span>}
            </label>
            <button
              onClick={() => handleSubmitAnswer()}
              disabled={!answerText.trim() || submitting}
              className="btn-primary text-sm py-2 px-5 disabled:opacity-40"
            >
              {submitting ? copy.submitting : copy.submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
