"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SUBJECTS, SUBJECT_CATEGORIES, CATEGORY_LABELS, getSubjectsByCategory } from "@/lib/subjects";

export default function QuestionBankPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/question-bank?countOnly=true")
      .then((r) => r.json())
      .then((data) => setCounts(data.counts ?? {}))
      .finally(() => setLoading(false));
  }, []);

  const totalQuestions = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xl">
              🏦
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">문제은행</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                과목별 문제 풀기 · 채점 · 오답 분석
              </p>
            </div>
          </div>
          {!loading && (
            <p className="text-sm text-gray-400 mt-4">
              총 <span className="font-bold text-primary-500">{totalQuestions.toLocaleString()}</span>개 문제
            </p>
          )}
        </div>
      </div>

      {/* Subject grid by category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        ) : (
          SUBJECT_CATEGORIES.map((cat) => {
            const subjects = getSubjectsByCategory(cat);
            const hasAny = subjects.some((s) => (counts[s.id] ?? 0) > 0);
            return (
              <div key={cat}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {CATEGORY_LABELS[cat]}
                  </h2>
                  <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
                  {!hasAny && (
                    <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                      준비 중
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {subjects.map((subject) => {
                    const count = counts[subject.id] ?? 0;
                    const isEmpty = count === 0;
                    return (
                      <Link
                        key={subject.id}
                        href={isEmpty ? "#" : `/question-bank/${subject.id}`}
                        className={`group card p-4 flex flex-col gap-2 transition-all ${
                          isEmpty
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:shadow-md hover:-translate-y-0.5"
                        }`}
                        onClick={(e) => isEmpty && e.preventDefault()}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ backgroundColor: subject.color }}
                        >
                          {subject.name.slice(0, 2)}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                            {subject.name}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          {count > 0 ? (
                            <span className="text-xs font-semibold text-primary-500">
                              {count}문제
                            </span>
                          ) : (
                            <span className="text-xs text-gray-300 dark:text-gray-600">준비 중</span>
                          )}
                          {count > 0 && (
                            <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary-400 transition-colors"
                              fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
