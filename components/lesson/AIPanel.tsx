"use client";

import { useState, useRef, useEffect } from "react";

interface AIPanelProps {
  selectedTerm: string | null;
  selectedTermEn: string | null;
  lessonTopic: string;
  onClear: () => void;
}

type ExplainMode = "default" | "simpler" | "english";

export default function AIPanel({
  selectedTerm,
  selectedTermEn,
  lessonTopic,
  onClear,
}: AIPanelProps) {
  const [explanation, setExplanation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTerm, setCurrentTerm] = useState<string | null>(null);
  const [mode, setMode] = useState<ExplainMode>("default");
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedTerm && selectedTerm !== currentTerm) {
      setMode("default");
      fetchExplanation(selectedTerm, selectedTermEn, "default");
      setCurrentTerm(selectedTerm);
    }
  }, [selectedTerm]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [explanation]);

  async function fetchExplanation(
    term: string,
    termEn: string | null,
    explainMode: ExplainMode
  ) {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    setExplanation("");

    try {
      const res = await fetch("/api/ai/lesson-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          term,
          termEn,
          lessonTopic,
          mode: explainMode,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        setExplanation("설명을 가져오는 중 오류가 발생했어요. 다시 시도해주세요.");
        setIsLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const chunk = parsed.text ?? "";
              setExplanation((prev) => prev + chunk);
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setExplanation("설명을 가져오는 중 오류가 발생했어요. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleSimpler() {
    if (!selectedTerm) return;
    setMode("simpler");
    fetchExplanation(selectedTerm, selectedTermEn, "simpler");
  }

  function handleEnglish() {
    if (!selectedTerm) return;
    setMode("english");
    fetchExplanation(selectedTerm, selectedTermEn, "english");
  }

  function handleReset() {
    if (!selectedTerm) return;
    setMode("default");
    fetchExplanation(selectedTerm, selectedTermEn, "default");
  }

  if (!selectedTerm && !isLoading && !explanation) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400 dark:text-gray-600">
        <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-3xl mb-4">
          🤖
        </div>
        <p className="font-semibold text-gray-600 dark:text-gray-400 mb-2">
          AI 즉시 설명
        </p>
        <p className="text-sm leading-relaxed">
          아래 강의 대본에서{" "}
          <span className="text-primary-500 font-semibold">보라색 용어</span>
          를 클릭하면 AI가 즉시 한국어로 설명해줘요
        </p>
        <div className="mt-6 flex flex-col gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary-400 rounded-full" />
            한국어 즉시 설명
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary-400 rounded-full" />
            더 쉬운 설명 요청 가능
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary-400 rounded-full" />
            영어 설명도 지원
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
            AI
          </div>
          {selectedTerm && (
            <div>
              <span className="font-bold text-gray-900 dark:text-white text-sm">
                {selectedTerm}
              </span>
              {selectedTermEn && (
                <span className="text-xs text-gray-400 dark:text-gray-500 ml-1.5">
                  ({selectedTermEn})
                </span>
              )}
            </div>
          )}
        </div>
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="닫기"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Explanation */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4"
      >
        {isLoading && explanation === "" ? (
          <div className="flex items-center gap-3 text-primary-500">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">설명 생성 중...</span>
          </div>
        ) : (
          <div className="ai-response text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {explanation}
            {isLoading && (
              <span className="inline-block w-0.5 h-4 bg-primary-500 ml-0.5 animate-pulse" />
            )}
          </div>
        )}
      </div>

      {/* Action buttons */}
      {!isLoading && explanation && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-2 flex-shrink-0">
          <div className="flex gap-2">
            <button
              onClick={handleSimpler}
              disabled={mode === "simpler"}
              className="flex-1 text-xs font-semibold py-2.5 px-3 rounded-xl border border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              🔄 다시 설명해줘
            </button>
            <button
              onClick={handleEnglish}
              disabled={mode === "english"}
              className="flex-1 text-xs font-semibold py-2.5 px-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              🇺🇸 영어로도 설명해줘
            </button>
          </div>
          {mode !== "default" && (
            <button
              onClick={handleReset}
              className="text-xs text-gray-400 hover:text-primary-500 transition-colors text-center"
            >
              원래 설명으로 돌아가기
            </button>
          )}
        </div>
      )}
    </div>
  );
}
