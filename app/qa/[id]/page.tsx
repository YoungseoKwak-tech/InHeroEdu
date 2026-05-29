"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getStoredUserId, getStoredUsername, saveUsername } from "@/lib/username";
import { useLang } from "@/app/contexts/LanguageContext";

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

export default function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { lang } = useLang();
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

  useEffect(() => {
    if (!getStoredUsername()) setShowPrompt(true);
    loadData();
  }, [id]);

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

    // Auto-generate AI answer if none exists
    if (q && !ans.some((a: Answer) => a.is_ai)) {
      generateAIAnswer(q);
    }
  }

  async function generateAIAnswer(q: Question) {
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
      } else if (data.skipped) {
        // already exists, refresh
        const aRes  = await fetch(`/api/qa/answers?questionId=${id}`);
        const aData = await aRes.json();
        setAnswers(aData.answers ?? []);
      }
    } finally {
      setAiLoading(false);
    }
  }

  async function handleSubmitAnswer() {
    if (!answerText.trim() || submitting) return;
    const nick = anon ? copy.anonymous : (username || copy.anonymous);
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
    saveUsername(nameInput.trim());
    setUsername(nameInput.trim());
    setShowPrompt(false);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Name prompt */}
      {showPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="font-extrabold text-gray-900 dark:text-white mb-1">Pick a display name</h2>
            <p className="text-xs text-gray-400 mb-4">This is the name shown on your answer.</p>
            <input autoFocus value={nameInput} onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSetName()}
              placeholder="e.g. yk_apbio"
              className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400 mb-4"
            />
            <button onClick={handleSetName} disabled={!nameInput.trim()} className="w-full btn-primary disabled:opacity-40">Confirm</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/qa" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary-500 transition-colors w-fit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {copy.list}
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Question */}
        <div className="card p-6">
          {question.subject && (
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full text-white mb-3" style={{ backgroundColor: subjectColor }}>
              {question.subject}
            </span>
          )}
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white mb-4">{question.title}</h1>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{question.content}</p>
          <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400">
            <span className="font-semibold text-gray-600 dark:text-gray-300">{question.nickname}</span>
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

          {answers.length === 0 && !aiLoading ? (
            <div className="text-center py-10 text-gray-400 card">
              <p className="text-3xl mb-2">💭</p>
              <p className="text-sm">{copy.noAnswers}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {answers.map((a) => (
                <div key={a.id} className={`card p-5 ${a.is_accepted ? "ring-2 ring-emerald-400" : a.is_ai ? "ring-1 ring-primary-200 dark:ring-primary-800" : ""}`}>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${a.is_ai ? "bg-primary-500" : a.is_expert ? "bg-emerald-500" : "bg-gray-400"}`}>
                      {a.is_ai ? "AI" : a.nickname.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{a.nickname}</span>
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
            className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none mb-3"
          />
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300">
              <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} className="rounded" />
              {copy.anonymousAnswer}
              {!anon && username && <span className="text-xs text-gray-400">({username})</span>}
            </label>
            <button
              onClick={handleSubmitAnswer}
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
