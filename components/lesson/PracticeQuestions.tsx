"use client";

import { useState } from "react";
import type { PracticeQuestion } from "@/lib/data/lessons";

interface PracticeQuestionsProps {
  questions: PracticeQuestion[];
}

export default function PracticeQuestions({ questions }: PracticeQuestionsProps) {
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  function handleAnswer(questionId: string, idx: number) {
    if (answers[questionId] !== undefined) return;
    setAnswers((prev) => ({ ...prev, [questionId]: idx }));
  }

  function handleReveal(questionId: string) {
    setRevealed((prev) => ({ ...prev, [questionId]: true }));
  }

  const correct = Object.entries(answers).filter(([qId, ansIdx]) => {
    const q = questions.find((q) => q.id === qId);
    return q && ansIdx === q.correctIndex;
  }).length;

  const answered = Object.keys(answers).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
          연습 문제
        </h3>
        {answered > 0 && (
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            {correct}/{answered} 정답
            {answered === questions.length && (
              <span className="ml-2 text-primary-500">
                {correct === questions.length ? "🎉 완벽!" : "💪 계속 노력하세요!"}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-8">
        {questions.map((q, qIdx) => {
          const userAnswer = answers[q.id];
          const isAnswered = userAnswer !== undefined && userAnswer !== null;
          const isCorrect = isAnswered && userAnswer === q.correctIndex;
          const showExplanation = revealed[q.id] || isAnswered;

          return (
            <div key={q.id} className="card p-6">
              {/* Question */}
              <div className="flex gap-3 mb-5">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-bold flex items-center justify-center">
                  {qIdx + 1}
                </span>
                <p className="font-semibold text-gray-900 dark:text-white leading-relaxed">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5 ml-10">
                {q.options.map((option, optIdx) => {
                  let optionStyle =
                    "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 cursor-pointer";

                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      optionStyle =
                        "border-2 border-emerald-400 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 cursor-default";
                    } else if (optIdx === userAnswer) {
                      optionStyle =
                        "border-2 border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 cursor-default";
                    } else {
                      optionStyle =
                        "border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-default opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswer(q.id, optIdx)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-150 flex items-center gap-3 ${optionStyle}`}
                    >
                      <span className="font-bold flex-shrink-0 text-xs">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{option}</span>
                      {isAnswered && optIdx === q.correctIndex && (
                        <span className="ml-auto text-emerald-500">✓</span>
                      )}
                      {isAnswered && optIdx === userAnswer && optIdx !== q.correctIndex && (
                        <span className="ml-auto text-red-500">✗</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isAnswered ? (
                <div
                  className={`mt-5 ml-10 p-4 rounded-xl text-sm leading-relaxed ${
                    isCorrect
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                  }`}
                >
                  <div className="font-semibold mb-2">
                    {isCorrect ? "✅ 정답입니다!" : "❌ 오답입니다"}
                  </div>
                  <p>{q.explanation}</p>
                </div>
              ) : (
                <div className="mt-4 ml-10">
                  <button
                    onClick={() => handleReveal(q.id)}
                    className="text-xs text-gray-400 hover:text-primary-500 transition-colors underline"
                  >
                    정답 확인하기
                  </button>
                  {showExplanation && (
                    <div className="mt-3 p-4 rounded-xl text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      <div className="font-semibold mb-2">💡 정답: {String.fromCharCode(65 + q.correctIndex)}</div>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
