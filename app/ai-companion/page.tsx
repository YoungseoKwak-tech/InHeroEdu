"use client";

import { useState } from "react";
import CompanionTab from "@/components/ai-companion/CompanionTab";
import SocraticTab from "@/components/ai-companion/SocraticTab";
import ReverseTutorTab from "@/components/ai-companion/ReverseTutorTab";

type Tab = "companion" | "socratic" | "reverse";

const TABS: { id: Tab; emoji: string; label: string; sub: string }[] = [
  { id: "companion", emoji: "💙", label: "마음 나누기", sub: "감정 소통 · 로드맵" },
  { id: "socratic", emoji: "🏛", label: "소크라테스 AI", sub: "질문으로만 유도" },
  { id: "reverse", emoji: "🔄", label: "역할 반전", sub: "내가 선생님" },
];

export default function AICompanionPage() {
  const [tab, setTab] = useState<Tab>("companion");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xl">🧠</div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">AI 컴패니언</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">감정 소통 · 소크라테스 튜터 · 역할 반전 학습</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all -mb-px ${
                  tab === t.id ? "border-primary-500 text-primary-600 dark:text-primary-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}>
                <span>{t.emoji}</span>
                <span>{t.label}</span>
                <span className="hidden sm:inline text-xs font-normal text-gray-400">— {t.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {tab === "companion" && <CompanionTab />}
        {tab === "socratic" && <SocraticTab />}
        {tab === "reverse" && <ReverseTutorTab />}
      </div>
    </div>
  );
}
