"use client";

import { useState, useEffect, useCallback } from "react";
import type { Subject } from "@/lib/subjects";
import SubjectTree from "@/components/admin/SubjectTree";
import MaterialUpload from "@/components/admin/MaterialUpload";
import QuestionList from "@/components/admin/QuestionList";

type Tab = "upload" | "questions";

export default function AdminQuestionBankPage() {
  const [selected, setSelected] = useState<Subject | null>(null);
  const [tab, setTab] = useState<Tab>("upload");
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch question counts for all subjects
  const fetchCounts = useCallback(async () => {
    try {
      const res = await fetch("/api/question-bank?countOnly=true");
      const data = await res.json();
      setQuestionCounts(data.counts ?? {});
    } catch {}
  }, []);

  useEffect(() => { fetchCounts(); }, [fetchCounts]);

  function handleSelect(subject: Subject) {
    setSelected(subject);
    setTab("upload");
    setRefreshKey((k) => k + 1);
  }

  function handleQuestionsGenerated() {
    setRefreshKey((k) => k + 1);
    fetchCounts();
    // Switch to questions tab after generation
    setTimeout(() => setTab("questions"), 500);
  }

  function handleCountChange(count: number) {
    if (!selected) return;
    setQuestionCounts((prev) => ({ ...prev, [selected.id]: count }));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="사이드바 토글"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h1 className="font-extrabold text-gray-900 dark:text-white">🏦 문제은행 관리</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          총 <span className="font-bold text-gray-900 dark:text-white">
            {Object.values(questionCounts).reduce((a, b) => a + b, 0)}
          </span>개 문제
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-56 flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 overflow-y-auto">
            <SubjectTree
              selectedSubject={selected?.id ?? null}
              onSelect={handleSelect}
              questionCounts={questionCounts}
            />
          </aside>
        )}

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-24 text-gray-400">
              <div className="text-5xl mb-4">📂</div>
              <p className="font-semibold text-gray-600 dark:text-gray-400">과목을 선택해주세요</p>
              <p className="text-sm mt-2">왼쪽 폴더 트리에서 과목을 클릭하면 자료 업로드 및 문제 관리를 할 수 있습니다.</p>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              {/* Subject header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: selected.color }}
                >
                  {selected.name.slice(0, 2)}
                </div>
                <div>
                  <h2 className="font-extrabold text-gray-900 dark:text-white text-lg">{selected.name}</h2>
                  <p className="text-xs text-gray-400">{selected.folder}</p>
                </div>
                <span className="ml-auto text-sm text-gray-400">
                  {questionCounts[selected.id] ?? 0}개 문제
                </span>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
                {(["upload", "questions"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`text-sm font-semibold px-5 py-2 rounded-lg transition-all ${
                      tab === t
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                  >
                    {t === "upload" ? "📁 자료 업로드" : "📋 문제 목록"}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="card p-6">
                {tab === "upload" ? (
                  <MaterialUpload
                    key={selected.id}
                    subject={selected}
                    onQuestionsGenerated={handleQuestionsGenerated}
                  />
                ) : (
                  <QuestionList
                    key={`${selected.id}-${refreshKey}`}
                    subject={selected}
                    refreshKey={refreshKey}
                    onCountChange={handleCountChange}
                  />
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
