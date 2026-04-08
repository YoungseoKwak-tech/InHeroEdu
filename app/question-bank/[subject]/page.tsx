"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { getSubjectById } from "@/lib/subjects";
import { useRouter } from "next/navigation";

interface Question {
  id: string;
  topic: string;
  difficulty: string;
  type: string;
  question_text: string;
}

const DIFF_LABEL: Record<string, string> = { easy: "쉬움", medium: "중간", hard: "어려움" };
const DIFF_COLOR: Record<string, string> = {
  easy:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  hard:   "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
};

export default function SubjectQuestionBankPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectId } = use(params);
  const subject = getSubjectById(subjectId);
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterDiff, setFilterDiff] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    if (!subject) return;
    setLoading(true);
    const params = new URLSearchParams({ subject: subjectId, limit: "50" });
    if (filterDiff) params.set("difficulty", filterDiff);
    if (filterType) params.set("type", filterType);

    fetch(`/api/question-bank?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data.questions ?? []);
        setTotal(data.total ?? 0);
      })
      .finally(() => setLoading(false));
  }, [subjectId, filterDiff, filterType, subject]);

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p>과목을 찾을 수 없습니다.</p>
          <Link href="/question-bank" className="btn-primary text-sm mt-4 inline-block">
            문제은행으로
          </Link>
        </div>
      </div>
    );
  }

  function startPractice() {
    const params = new URLSearchParams();
    if (filterDiff) params.set("difficulty", filterDiff);
    if (filterType) params.set("type", filterType);
    router.push(`/question-bank/${subjectId}/practice?${params}`);
  }

  // Group topics for filter
  const topics = Array.from(new Set(questions.map((q) => q.topic))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/question-bank" className="text-sm text-gray-400 hover:text-primary-500 flex items-center gap-1 mb-4 transition-colors">
            ← 문제은행
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: subject.color }}>
              {subject.name.slice(0, 2)}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{subject.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{subject.folder}</p>
            </div>
            <div className="ml-auto">
              <span className="text-2xl font-black text-primary-500">{total}</span>
              <span className="text-sm text-gray-400 ml-1">문제</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter sidebar */}
          <aside className="lg:w-52 flex-shrink-0">
            <div className="card p-5 space-y-5">
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">난이도</p>
                <div className="space-y-1">
                  {[{ v: "", l: "전체" }, { v: "easy", l: "쉬움" }, { v: "medium", l: "중간" }, { v: "hard", l: "어려움" }].map(({ v, l }) => (
                    <button key={v} onClick={() => setFilterDiff(v)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                        filterDiff === v
                          ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">유형</p>
                <div className="space-y-1">
                  {[{ v: "", l: "전체" }, { v: "multiple_choice", l: "객관식" }, { v: "free_response", l: "주관식" }].map(({ v, l }) => (
                    <button key={v} onClick={() => setFilterType(v)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                        filterType === v
                          ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {topics.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">토픽</p>
                  <div className="flex flex-wrap gap-1">
                    {topics.slice(0, 8).map((t) => (
                      <span key={t} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                    {topics.length > 8 && (
                      <span className="text-xs text-gray-400">+{topics.length - 8}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Question list */}
          <div className="flex-1">
            {/* Start button */}
            {total > 0 && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-bold text-gray-900 dark:text-white">{total}</span>개 문제
                </p>
                <button onClick={startPractice} className="btn-primary text-sm py-2.5 px-6">
                  🚀 풀기 시작
                </button>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            ) : questions.length === 0 ? (
              <div className="card p-12 text-center text-gray-400">
                <div className="text-4xl mb-3">📭</div>
                <p className="font-semibold text-gray-600 dark:text-gray-400">해당 조건의 문제가 없습니다</p>
                <p className="text-sm mt-2">필터를 변경해보세요</p>
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div key={q.id} className="card p-4 flex items-start gap-4">
                    <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${DIFF_COLOR[q.difficulty] ?? ""}`}>
                          {DIFF_LABEL[q.difficulty] ?? q.difficulty}
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                          {q.type === "multiple_choice" ? "객관식" : "주관식"}
                        </span>
                        {q.topic && (
                          <span className="text-xs text-gray-400">{q.topic}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        {q.question_text}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <button onClick={startPractice} className="btn-primary text-sm py-3 px-10">
                    🚀 {total}개 문제 풀기 시작
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
