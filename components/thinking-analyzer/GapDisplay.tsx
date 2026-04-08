"use client";

import type { GapResult, GapType } from "@/app/api/ai/thinking-analyzer/route";

const GAP_CONFIG: Record<GapType, { label: string; emoji: string; accent: string; bg: string; border: string }> = {
  CONCEPT_GAP:      { label: "개념 부재",       emoji: "🧩", accent: "text-red-600 dark:text-red-400",    bg: "bg-red-50 dark:bg-red-900/20",    border: "border-red-200 dark:border-red-800" },
  APPLICATION_GAP:  { label: "적용 실패",       emoji: "⚙️", accent: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-800" },
  LANGUAGE_GAP:     { label: "영어 이해 부족",   emoji: "🇺🇸", accent: "text-blue-600 dark:text-blue-400",  bg: "bg-blue-50 dark:bg-blue-900/20",  border: "border-blue-200 dark:border-blue-800" },
  LOGIC_GAP:        { label: "논리 오류",        emoji: "🔗", accent: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20", border: "border-violet-200 dark:border-violet-800" },
};

export default function GapDisplay({ result }: { result: GapResult }) {
  const cfg = GAP_CONFIG[result.gap_type];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className={`card p-6 border-2 ${cfg.border} ${cfg.bg}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{cfg.emoji}</span>
            <div>
              <div className={`text-xs font-black uppercase tracking-widest ${cfg.accent}`}>{result.gap_type}</div>
              <div className="text-lg font-extrabold text-gray-900 dark:text-white">{cfg.label}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">신뢰도</div>
            <div className={`text-xl font-black ${cfg.accent}`}>{result.confidence}%</div>
          </div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{result.diagnosis_ko}</p>
      </div>

      {/* What they got right */}
      <div className="card p-5">
        <Row icon="✅" label="잘 이해한 부분" text={result.understood_correctly} />
      </div>

      {/* Where it broke */}
      <div className="card p-5">
        <Row icon="❌" label="정확히 어디서 틀렸나" text={result.broke_at} />
      </div>

      {/* Language breakdown — only for LANGUAGE_GAP */}
      {result.gap_type === "LANGUAGE_GAP" && result.english_highlight && (
        <div className={`card p-5 border ${cfg.border} ${cfg.bg}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🇺🇸</span>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">헷갈린 영어 표현</h4>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2.5 border border-blue-200 dark:border-blue-800 mb-3">
            <code className="text-sm text-blue-700 dark:text-blue-300 font-mono">{result.english_highlight}</code>
          </div>
          {result.english_explanation_ko && (
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{result.english_explanation_ko}</p>
          )}
        </div>
      )}

      {/* Remedy */}
      <div className="card p-5 bg-gradient-to-br from-primary-50 to-violet-50 dark:from-primary-900/20 dark:to-violet-900/10 border border-primary-200 dark:border-primary-800">
        <Row icon="💊" label="처방: 이렇게 해요" text={result.remedy_ko} />
      </div>

      {/* Socratic follow-up */}
      <div className="card p-5 border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🏛</span>
          <h4 className="font-bold text-sm text-gray-900 dark:text-white">소크라테스 힌트</h4>
          <span className="text-xs text-gray-400">(스스로 생각해보세요)</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">&ldquo;{result.socratic_hint}&rdquo;</p>
      </div>
    </div>
  );
}

function Row({ icon, label, text }: { icon: string; label: string; text: string }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <h4 className="font-bold text-sm text-gray-900 dark:text-white">{label}</h4>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{text}</p>
    </>
  );
}
