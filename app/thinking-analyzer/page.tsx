import AnalyzerForm from "@/components/thinking-analyzer/AnalyzerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사고력 분석 | InHero",
  description: "오답의 근본 원인을 CONCEPT / APPLICATION / LANGUAGE / LOGIC 4가지 유형으로 진단",
};

export default function ThinkingAnalyzerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xl">🔍</div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">사고력 분석</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">오답의 근본 원인을 4가지 유형으로 정밀 진단합니다</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { t: "CONCEPT_GAP",     c: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400" },
              { t: "APPLICATION_GAP", c: "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" },
              { t: "LANGUAGE_GAP",    c: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" },
              { t: "LOGIC_GAP",       c: "bg-violet-100 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400" },
            ].map(({ t, c }) => (
              <span key={t} className={`text-xs font-bold px-3 py-1.5 rounded-full ${c}`}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnalyzerForm />
      </div>
    </div>
  );
}
