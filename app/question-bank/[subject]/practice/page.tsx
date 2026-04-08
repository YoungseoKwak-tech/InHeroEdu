"use client";

import { useEffect, useState, use, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getSubjectById } from "@/lib/subjects";
import { Suspense } from "react";

interface Question {
  id: string;
  topic: string;
  difficulty: string;
  type: string;
  question_text: string;
  option_a: string | null;
  option_b: string | null;
  option_c: string | null;
  option_d: string | null;
  option_e: string | null;
  correct_answer: string;
  explanation: string;
  explanation_korean: string | null;
}

interface AttemptRecord {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

const DIFF_COLOR: Record<string, string> = {
  easy:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  hard:   "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
};
const DIFF_LABEL: Record<string, string> = { easy: "쉬움", medium: "중간", hard: "어려움" };

function PracticeInner({ subjectId }: { subjectId: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subject = getSubjectById(subjectId);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Practice state
  const [phase, setPhase] = useState<"practice" | "results">("practice");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showKorean, setShowKorean] = useState(false);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const params = new URLSearchParams({ subject: subjectId, limit: "20" });
    const diff = searchParams.get("difficulty");
    const type = searchParams.get("type");
    if (diff) params.set("difficulty", diff);
    if (type) params.set("type", type);

    fetch(`/api/question-bank?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.questions?.length) setError("풀 수 있는 문제가 없습니다.");
        setQuestions(data.questions ?? []);
      })
      .catch(() => setError("문제를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [subjectId, searchParams]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    setSelectedAnswer("");
    setSubmitted(false);
    setShowKorean(false);
  }, [currentIdx]);

  const currentQuestion = questions[currentIdx];
  const isCorrect =
    submitted &&
    currentQuestion &&
    selectedAnswer.toUpperCase() === currentQuestion.correct_answer.toUpperCase();

  async function handleSubmit() {
    if (!selectedAnswer.trim() || !currentQuestion) return;
    setSubmitted(true);

    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    const correct =
      selectedAnswer.toUpperCase() === currentQuestion.correct_answer.toUpperCase();

    const attempt: AttemptRecord = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect: correct,
      timeSpent,
    };
    setAttempts((prev) => [...prev, attempt]);

    // Save to DB (fire-and-forget)
    fetch("/api/question-bank/attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect: correct,
        timeSpent,
      }),
    }).catch(() => {});
  }

  function handleNext() {
    if (currentIdx + 1 >= questions.length) {
      setPhase("results");
    } else {
      setCurrentIdx((i) => i + 1);
    }
  }

  function handleThinkingAnalyzer() {
    if (!currentQuestion) return;
    const prefill = {
      subject: subject?.name ?? subjectId,
      question: currentQuestion.question_text,
      studentAnswer: selectedAnswer,
      correctAnswer: currentQuestion.correct_answer,
    };
    sessionStorage.setItem("inhero_analyzer_prefill", JSON.stringify(prefill));
    router.push("/thinking-analyzer");
  }

  const correctCount = attempts.filter((a) => a.isCorrect).length;
  const wrongAttempts = attempts.filter((a) => !a.isCorrect);
  const wrongTopics = Array.from(
    new Set(
      wrongAttempts
        .map((a) => {
          const q = questions.find((q) => q.id === a.questionId);
          return q?.topic ?? "";
        })
        .filter(Boolean)
    )
  );

  // ── Loading / Error ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !questions.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-400">
        <div className="text-4xl">📭</div>
        <p className="font-semibold">{error || "문제가 없습니다"}</p>
        <Link href={`/question-bank/${subjectId}`} className="btn-primary text-sm py-2.5 px-6">
          뒤로 가기
        </Link>
      </div>
    );
  }

  // ── Results phase ────────────────────────────────────────────────────────────
  if (phase === "results") {
    const accuracy = Math.round((correctCount / attempts.length) * 100);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <div className="text-center card p-10">
            <div className="text-5xl mb-4">
              {accuracy >= 80 ? "🎉" : accuracy >= 60 ? "👍" : "📚"}
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
              세션 완료!
            </h1>
            <div className="flex justify-center gap-6 mt-6">
              <div className="text-center">
                <p className="text-3xl font-black text-gray-900 dark:text-white">{correctCount}</p>
                <p className="text-xs text-gray-400 mt-1">정답</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-red-500">{attempts.length - correctCount}</p>
                <p className="text-xs text-gray-400 mt-1">오답</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-primary-500">{accuracy}%</p>
                <p className="text-xs text-gray-400 mt-1">정답률</p>
              </div>
            </div>
          </div>

          {wrongTopics.length > 0 && (
            <div className="card p-5">
              <h2 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">취약 토픽</h2>
              <div className="flex flex-wrap gap-2">
                {wrongTopics.map((t) => (
                  <span key={t} className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full border border-red-100 dark:border-red-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {wrongAttempts.length > 0 && (
            <div className="card p-5">
              <h2 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">
                틀린 문제 ({wrongAttempts.length}개)
              </h2>
              <div className="space-y-2">
                {wrongAttempts.map((a) => {
                  const q = questions.find((q) => q.id === a.questionId);
                  if (!q) return null;
                  return (
                    <div key={a.questionId} className="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-800">
                      <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">{q.question_text}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs">
                        <span className="text-red-500">내 답: {a.selectedAnswer}</span>
                        <span className="text-emerald-500">정답: {q.correct_answer}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/question-bank/${subjectId}`} className="btn-secondary text-sm py-3 flex-1 text-center">
              문제 목록으로
            </Link>
            <button
              onClick={() => {
                setAttempts([]);
                setCurrentIdx(0);
                setPhase("practice");
              }}
              className="btn-secondary text-sm py-3 flex-1"
            >
              🔄 다시 풀기
            </button>
            {wrongAttempts.length > 0 && (
              <button onClick={handleThinkingAnalyzer} className="btn-primary text-sm py-3 flex-1">
                🔍 사고력 심층 분석
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Practice phase ───────────────────────────────────────────────────────────
  const opts: { letter: string; text: string }[] = [];
  if (currentQuestion.type === "multiple_choice") {
    const optionMap: Record<string, string | null> = {
      A: currentQuestion.option_a,
      B: currentQuestion.option_b,
      C: currentQuestion.option_c,
      D: currentQuestion.option_d,
      E: currentQuestion.option_e,
    };
    for (const [letter, text] of Object.entries(optionMap)) {
      if (text) opts.push({ letter, text });
    }
  }

  const sessionCorrect = attempts.filter((a) => a.isCorrect).length;
  const sessionRate = attempts.length > 0 ? Math.round((sessionCorrect / attempts.length) * 100) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <Link href={`/question-bank/${subjectId}`} className="text-xs text-gray-400 hover:text-primary-500 transition-colors">
            ← {subject?.name}
          </Link>

          {/* Progress bar */}
          <div className="flex-1 max-w-xs">
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + (submitted ? 1 : 0)) / questions.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 text-center mt-1">
              {currentIdx + 1} / {questions.length}
            </p>
          </div>

          {sessionRate !== null && (
            <div className="text-xs text-right">
              <span className="font-bold text-primary-500">{sessionRate}%</span>
              <span className="text-gray-400 ml-1">정답률</span>
            </div>
          )}
        </div>
      </div>

      {/* Question card */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        <div className="card p-6 md:p-8">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${DIFF_COLOR[currentQuestion.difficulty] ?? ""}`}>
              {DIFF_LABEL[currentQuestion.difficulty] ?? currentQuestion.difficulty}
            </span>
            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2.5 py-1 rounded-full">
              {currentQuestion.type === "multiple_choice" ? "객관식" : "주관식"}
            </span>
            {currentQuestion.topic && (
              <span className="text-xs text-gray-400">{currentQuestion.topic}</span>
            )}
          </div>

          {/* Question */}
          <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white leading-relaxed mb-6">
            {currentQuestion.question_text}
          </p>

          {/* Options (multiple choice) */}
          {currentQuestion.type === "multiple_choice" && (
            <div className="space-y-2">
              {opts.map(({ letter, text }) => {
                let btnClass = "w-full text-left p-4 rounded-xl border text-sm transition-all ";
                if (!submitted) {
                  btnClass +=
                    selectedAnswer === letter
                      ? "border-primary-400 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-semibold"
                      : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300";
                } else {
                  if (letter === currentQuestion.correct_answer.toUpperCase()) {
                    btnClass += "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 font-semibold";
                  } else if (letter === selectedAnswer && !isCorrect) {
                    btnClass += "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 font-semibold";
                  } else {
                    btnClass += "border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-600";
                  }
                }
                return (
                  <button
                    key={letter}
                    disabled={submitted}
                    onClick={() => setSelectedAnswer(letter)}
                    className={btnClass}
                  >
                    <span className="font-bold mr-3">{letter}.</span>
                    {text}
                    {submitted && letter === currentQuestion.correct_answer.toUpperCase() && (
                      <span className="ml-2 text-emerald-500">✓</span>
                    )}
                    {submitted && letter === selectedAnswer && !isCorrect && (
                      <span className="ml-2 text-red-500">✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Free response */}
          {currentQuestion.type === "free_response" && (
            <textarea
              rows={3}
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={submitted}
              placeholder="답을 입력하세요..."
              className="w-full resize-none border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-70"
            />
          )}

          {/* Submit button */}
          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer.trim()}
              className="mt-5 w-full btn-primary py-3 disabled:opacity-40"
            >
              제출하기
            </button>
          )}
        </div>

        {/* Explanation (after submit) */}
        {submitted && (
          <div className={`card p-6 border-l-4 ${isCorrect ? "border-emerald-400" : "border-red-400"}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-lg ${isCorrect ? "text-emerald-500" : "text-red-500"}`}>
                {isCorrect ? "✓ 정답!" : "✗ 오답"}
              </span>
              {!isCorrect && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  정답: <strong className="text-emerald-600 dark:text-emerald-400">{currentQuestion.correct_answer}</strong>
                </span>
              )}
            </div>

            {/* Explanation toggle */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setShowKorean(false)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  !showKorean ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                }`}
              >
                🇺🇸 English
              </button>
              {currentQuestion.explanation_korean && (
                <button
                  onClick={() => setShowKorean(true)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                    showKorean ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                  }`}
                >
                  🇰🇷 한국어
                </button>
              )}
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {showKorean ? currentQuestion.explanation_korean : currentQuestion.explanation}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              {!isCorrect && (
                <button
                  onClick={handleThinkingAnalyzer}
                  className="btn-secondary text-sm py-2.5 flex items-center justify-center gap-2"
                >
                  🔍 사고력 분석으로 오답 분석
                </button>
              )}
              <button
                onClick={handleNext}
                className="btn-primary text-sm py-2.5 flex-1"
              >
                {currentIdx + 1 >= questions.length ? "결과 보기 →" : "다음 문제 →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PracticePage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectId } = use(params);
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    }>
      <PracticeInner subjectId={subjectId} />
    </Suspense>
  );
}
