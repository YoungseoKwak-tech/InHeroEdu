"use client";

import { useState, useEffect } from "react";

interface Question {
  id?: string;
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

interface QuestionEditModalProps {
  question: Question | null;
  subjectId: string;
  onClose: () => void;
  onSaved: () => void;
}

const emptyQuestion = (subject: string): Question => ({
  subject,
  topic: "",
  difficulty: "medium",
  type: "multiple_choice",
  question_text: "",
  option_a: "",
  option_b: "",
  option_c: "",
  option_d: "",
  option_e: "",
  correct_answer: "",
  explanation: "",
  explanation_korean: "",
  tags: [],
});

export default function QuestionEditModal({
  question,
  subjectId,
  onClose,
  onSaved,
}: QuestionEditModalProps) {
  const [form, setForm] = useState<Question>(emptyQuestion(subjectId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(question ?? emptyQuestion(subjectId));
  }, [question, subjectId]);

  function set(key: keyof Question, value: string | string[]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.question_text.trim() || !form.correct_answer.trim()) {
      setError("문제 텍스트와 정답은 필수입니다.");
      return;
    }
    setSaving(true);
    setError("");

    const method = form.id ? "PUT" : "POST";
    const payload = form.id ? form : { ...form };

    try {
      const res = await fetch("/api/admin/questions", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "저장 실패");
      onSaved();
      onClose();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "저장 실패");
    } finally {
      setSaving(false);
    }
  }

  const isMultipleChoice = form.type === "multiple_choice";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4 pb-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-extrabold text-gray-900 dark:text-white">
            {form.id ? "문제 수정" : "문제 직접 추가"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Row: difficulty + type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">난이도</label>
              <select value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400">
                <option value="easy">쉬움 (Easy)</option>
                <option value="medium">중간 (Medium)</option>
                <option value="hard">어려움 (Hard)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">유형</label>
              <select value={form.type} onChange={(e) => set("type", e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400">
                <option value="multiple_choice">객관식</option>
                <option value="free_response">주관식</option>
              </select>
            </div>
          </div>

          {/* Topic */}
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">토픽</label>
            <input value={form.topic} onChange={(e) => set("topic", e.target.value)}
              placeholder="예: Cellular Respiration"
              className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>

          {/* Question */}
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">문제 텍스트 *</label>
            <textarea rows={4} value={form.question_text} onChange={(e) => set("question_text", e.target.value)}
              placeholder="Which of the following..."
              className="w-full resize-none border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>

          {/* Options (multiple choice only) */}
          {isMultipleChoice && (
            <div className="grid grid-cols-2 gap-3">
              {(["a", "b", "c", "d", "e"] as const).map((opt) => (
                <div key={opt}>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">
                    옵션 {opt.toUpperCase()}
                  </label>
                  <input
                    value={form[`option_${opt}` as keyof Question] as string}
                    onChange={(e) => set(`option_${opt}` as keyof Question, e.target.value)}
                    placeholder={`옵션 ${opt.toUpperCase()}`}
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Correct answer */}
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">
              정답 * {isMultipleChoice ? "(A/B/C/D/E)" : "(정답 텍스트)"}
            </label>
            <input value={form.correct_answer} onChange={(e) => set("correct_answer", e.target.value)}
              placeholder={isMultipleChoice ? "A" : "정답을 입력하세요"}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>

          {/* Explanation */}
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">해설 (영어)</label>
            <textarea rows={3} value={form.explanation} onChange={(e) => set("explanation", e.target.value)}
              className="w-full resize-none border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">해설 (한국어)</label>
            <textarea rows={3} value={form.explanation_korean} onChange={(e) => set("explanation_korean", e.target.value)}
              className="w-full resize-none border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400" />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-100 dark:border-gray-700">
          <button onClick={onClose} className="btn-secondary flex-1">취소</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 disabled:opacity-50">
            {saving ? "저장 중..." : "저장하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
