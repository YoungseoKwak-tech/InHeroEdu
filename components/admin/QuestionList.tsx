"use client";

import { useState, useEffect, useCallback } from "react";
import type { Subject } from "@/lib/subjects";
import QuestionEditModal from "./QuestionEditModal";

interface Question {
  id: string;
  subject: string;
  topic: string;
  difficulty: string;
  type: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_answer: string;
  explanation: string;
  explanation_korean: string;
  tags: string[];
}

interface QuestionListProps {
  subject: Subject;
  refreshKey: number;
  onCountChange: (count: number) => void;
}

const DIFF_LABEL: Record<string, string> = {
  easy: "쉬움",
  medium: "중간",
  hard: "어려움",
};

const DIFF_COLOR: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  hard: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
};

export default function QuestionList({ subject, refreshKey, onCountChange }: QuestionListProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filterDiff, setFilterDiff] = useState("");
  const [filterType, setFilterType] = useState("");
  const [editingQuestion, setEditingQuestion] = useState<Question | null | "new">(null);
  const limit = 20;

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      subject: subject.id,
      page: String(page),
      limit: String(limit),
    });
    if (filterDiff) params.set("difficulty", filterDiff);
    if (filterType) params.set("type", filterType);

    try {
      const res = await fetch(`/api/admin/questions?${params}`);
      const data = await res.json();
      setQuestions(data.questions ?? []);
      setTotal(data.total ?? 0);
      onCountChange(data.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, [subject.id, page, filterDiff, filterType, onCountChange]);

  useEffect(() => {
    setPage(1);
  }, [subject.id, filterDiff, filterType]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions, refreshKey]);

  async function handleDelete(id: string) {
    if (!confirm("이 문제를 삭제할까요?")) return;
    await fetch(`/api/admin/questions?id=${id}`, { method: "DELETE" });
    fetchQuestions();
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <select value={filterDiff} onChange={(e) => setFilterDiff(e.target.value)}
            className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400">
            <option value="">전체 난이도</option>
            <option value="easy">쉬움</option>
            <option value="medium">중간</option>
            <option value="hard">어려움</option>
          </select>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
            className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400">
            <option value="">전체 유형</option>
            <option value="multiple_choice">객관식</option>
            <option value="free_response">주관식</option>
          </select>
        </div>
        <button
          onClick={() => setEditingQuestion("new")}
          className="btn-primary text-sm py-2 px-4"
        >
          + 문제 직접 추가
        </button>
      </div>

      {/* Total count */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        총 <span className="font-bold text-gray-900 dark:text-white">{total}</span>개 문제
      </p>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-sm">문제가 없습니다. 자료를 업로드하거나 직접 추가해보세요.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 w-1/3">문제</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">토픽</th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">난이도</th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">유형</th>
                  <th className="py-3 px-3 w-20" />
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => (
                  <tr key={q.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="text-gray-900 dark:text-white line-clamp-2">
                        {q.question_text}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-gray-500 dark:text-gray-400 text-xs">{q.topic}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${DIFF_COLOR[q.difficulty] ?? ""}`}>
                        {DIFF_LABEL[q.difficulty] ?? q.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center text-xs text-gray-500">
                      {q.type === "multiple_choice" ? "객관식" : "주관식"}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3 justify-end">
                        <button onClick={() => setEditingQuestion(q)}
                          className="text-xs text-primary-500 hover:text-primary-700 font-semibold transition-colors">
                          수정
                        </button>
                        <button onClick={() => handleDelete(q.id)}
                          className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors">
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                ← 이전
              </button>
              <span className="text-xs py-1.5 px-3 text-gray-500">{page} / {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                다음 →
              </button>
            </div>
          )}
        </>
      )}

      {/* Edit modal */}
      {editingQuestion !== null && (
        <QuestionEditModal
          question={editingQuestion === "new" ? null : editingQuestion}
          subjectId={subject.id}
          onClose={() => setEditingQuestion(null)}
          onSaved={fetchQuestions}
        />
      )}
    </div>
  );
}
