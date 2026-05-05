 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EarlyAccessModal from "@/components/shared/EarlyAccessModal";

const SUBJECTS = [
  { id: "", label: "All" },
  { id: "AP Bio", label: "AP Bio" },
  { id: "AP Chem", label: "AP Chem" },
  { id: "AP Calc", label: "AP Calc" },
  { id: "AMC", label: "AMC" },
  { id: "SAT", label: "SAT" },
  { id: "AP Stats", label: "AP Stats" },
  { id: "AP CS", label: "AP CS" },
  { id: "Other", label: "Other" },
];

const SUBJECT_COLORS: Record<string, string> = {
  "AP Bio": "#1D9E75",
  "AP Chem": "#1D9E75",
  "AP Calc": "#BA7517",
  AMC: "#3C3489",
  SAT: "#854F0B",
  "AP Stats": "#0F6E56",
  "AP CS": "#444441",
};

interface Question {
  id: string;
  nickname: string;
  subject: string | null;
  title: string;
  content: string;
  view_count: number;
  answer_count: number;
  created_at: string;
}

export default function QAPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [sort, setSort] = useState<"latest" | "popular">("latest");
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [subject, sort]);

  async function fetchQuestions() {
    setLoading(true);
    try {
      const p = new URLSearchParams({ sort });
      if (subject) p.set("subject", subject);
      const res = await fetch(`/api/qa/questions?${p}`);
      const data = await res.json();
      setQuestions(data.questions ?? []);
    } catch {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <EarlyAccessModal
        isOpen={showGate}
        onClose={() => setShowGate(false)}
        title="Q&A posting is coming soon"
        description="You can preview the Q&A board now. Posting and deeper interaction will open first for the first cohort."
      />

      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl">❓</div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Q&A</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Preview the board now. Posting opens for the first cohort.</p>
              </div>
            </div>
            <button onClick={() => setShowGate(true)} className="btn-primary text-sm py-2 px-5">
              + Ask a question
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div className="flex gap-2 flex-wrap">
            {SUBJECTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSubject(s.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  subject === s.id ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {([["latest", "Latest"], ["popular", "Popular"]] as const).map(([v, label]) => (
              <button key={v} onClick={() => setSort(v)} className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${sort === v ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex gap-1.5">{[0, 1, 2].map((i) => <div key={i} className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}</div>
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-16 text-gray-400 card">
            <p className="text-4xl mb-3">💬</p>
            <p className="text-sm">No questions yet. The board preview is live, and posting opens for the first cohort.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((q) => {
              const color = q.subject ? (SUBJECT_COLORS[q.subject] ?? "#1D9E75") : "#1D9E75";
              return (
                <Link key={q.id} href={`/qa/${q.id}`} className="card p-5 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all block">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {q.subject && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>
                          {q.subject}
                        </span>
                      )}
                      {q.answer_count > 0 && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                          {q.answer_count} answers
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{q.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{q.content}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>{q.nickname}</span>
                      <span>·</span>
                      <span>{q.view_count} views</span>
                      <span>·</span>
                      <span>{new Date(q.created_at).toLocaleDateString("en-US")}</span>
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
