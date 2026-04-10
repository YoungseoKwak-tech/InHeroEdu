"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStoredUserId, getStoredUsername, saveUsername } from "@/lib/username";

const SUBJECTS = [
  { id: "",         label: "전체" },
  { id: "AP Bio",   label: "AP Bio" },
  { id: "AP Chem",  label: "AP Chem" },
  { id: "AP Calc",  label: "AP Calc" },
  { id: "AMC",      label: "AMC" },
  { id: "SAT",      label: "SAT" },
  { id: "AP Stats", label: "AP Stats" },
  { id: "AP CS",    label: "AP CS" },
  { id: "기타",     label: "기타" },
];

const SUBJECT_COLORS: Record<string, string> = {
  "AP Bio":   "#1D9E75",
  "AP Chem":  "#1D9E75",
  "AP Calc":  "#BA7517",
  "AMC":      "#3C3489",
  "SAT":      "#854F0B",
  "AP Stats": "#0F6E56",
  "AP CS":    "#444441",
};

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

export default function QAPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading]     = useState(true);
  const [subject, setSubject]     = useState("");
  const [sort, setSort]           = useState<"latest" | "popular">("latest");
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState({ title: "", content: "", subject: "", nickname: "" });
  const [anon, setAnon]           = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userId]                  = useState(() => getStoredUserId());
  const [username, setUsername]   = useState(() => getStoredUsername());
  const [showPrompt, setShowPrompt] = useState(false);
  const [nameInput, setNameInput]   = useState("");

  useEffect(() => {
    if (!getStoredUsername()) setShowPrompt(true);
    else setForm((f) => ({ ...f, nickname: getStoredUsername() }));
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [subject, sort]);

  async function fetchQuestions() {
    setLoading(true);
    try {
      const p = new URLSearchParams({ sort });
      if (subject) p.set("subject", subject);
      const res  = await fetch(`/api/qa/questions?${p}`);
      const data = await res.json();
      setQuestions(data.questions ?? []);
    } catch { setQuestions([]); }
    finally { setLoading(false); }
  }

  async function handleSubmit() {
    if (!form.title.trim() || !form.content.trim() || submitting) return;
    const nick = anon ? "익명" : (form.nickname.trim() || username || "익명");
    setSubmitting(true);
    try {
      const res  = await fetch("/api/qa/questions", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ userId, nickname: nick, subject: form.subject || null, title: form.title, content: form.content }),
      });
      const data = await res.json();
      setForm({ title: "", content: "", subject: "", nickname: username });
      setShowForm(false);
      if (data.question?.id) router.push(`/qa/${data.question.id}`);
      else fetchQuestions();
    } finally {
      setSubmitting(false);
    }
  }

  function handleSetName() {
    if (!nameInput.trim()) return;
    saveUsername(nameInput.trim());
    setUsername(nameInput.trim());
    setForm((f) => ({ ...f, nickname: nameInput.trim() }));
    setShowPrompt(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Name prompt */}
      {showPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="font-extrabold text-gray-900 dark:text-white mb-1">닉네임을 입력해주세요</h2>
            <p className="text-xs text-gray-400 mb-4">질문/답변에 표시될 이름이에요</p>
            <input autoFocus value={nameInput} onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSetName()}
              placeholder="예: 서울학생123"
              className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400 mb-4"
            />
            <button onClick={handleSetName} disabled={!nameInput.trim()} className="w-full btn-primary disabled:opacity-40">확인</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl">❓</div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">질의응답 Q&A</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">모르는 것을 질문하면 AI + 선생님이 바로 답변해요</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary text-sm py-2 px-5"
            >
              + 질문하기
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Ask form */}
        {showForm && (
          <div className="card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-extrabold text-gray-900 dark:text-white">새 질문 작성</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <div className="space-y-3">
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="">과목 선택 (선택사항)</option>
                {SUBJECTS.filter((s) => s.id).map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="질문 제목을 입력하세요"
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="질문 내용을 자세히 적어주세요. 수식이나 코드는 그대로 입력해도 괜찮아요."
                rows={5}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
              />
              <div className="flex items-center gap-4 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300">
                  <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} className="rounded" />
                  익명으로 질문하기
                </label>
                {!anon && (
                  <input
                    value={form.nickname}
                    onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                    placeholder="닉네임"
                    className="border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                )}
                <div className="ml-auto flex gap-2">
                  <button onClick={() => setShowForm(false)} className="btn-secondary text-sm py-2 px-4">취소</button>
                  <button
                    onClick={handleSubmit}
                    disabled={!form.title.trim() || !form.content.trim() || submitting}
                    className="btn-primary text-sm py-2 px-4 disabled:opacity-40"
                  >
                    {submitting ? "등록 중..." : "질문 등록 →"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div className="flex gap-2 flex-wrap">
            {SUBJECTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSubject(s.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  subject === s.id
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {([["latest", "최신순"], ["popular", "인기순"]] as const).map(([v, label]) => (
              <button key={v} onClick={() => setSort(v)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${sort === v ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Question list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex gap-1.5">{[0,1,2].map(i => <div key={i} className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}</div>
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-16 text-gray-400 card">
            <p className="text-4xl mb-3">💬</p>
            <p className="text-sm">아직 질문이 없어요. 첫 번째 질문을 올려보세요!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((q) => {
              const color = q.subject ? (SUBJECT_COLORS[q.subject] ?? "#1D9E75") : "#1D9E75";
              return (
                <Link
                  key={q.id}
                  href={`/qa/${q.id}`}
                  className="card p-5 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all block"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {q.subject && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>
                          {q.subject}
                        </span>
                      )}
                      {q.answer_count > 0 && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                          답변 {q.answer_count}
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{q.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{q.content}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>{q.nickname}</span>
                      <span>·</span>
                      <span>조회 {q.view_count}</span>
                      <span>·</span>
                      <span>{new Date(q.created_at).toLocaleDateString("ko-KR")}</span>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
