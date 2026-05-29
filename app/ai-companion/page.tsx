"use client";

import { useState } from "react";
import CompanionTab from "@/components/ai-companion/CompanionTab";
import SocraticTab from "@/components/ai-companion/SocraticTab";
import ReverseTutorTab from "@/components/ai-companion/ReverseTutorTab";
import { useLang } from "@/app/contexts/LanguageContext";

type Tab = "companion" | "socratic" | "reverse";

const COPY = {
  ko: {
    title: "AI Companion",
    subtitle: "Emotional support · Socratic tutoring · Reverse teaching",
    tabs: [
      { id: "companion" as const, emoji: "💙", label: "Open Chat", sub: "Support · Roadmap" },
      { id: "socratic" as const, emoji: "🏛", label: "Socratic AI", sub: "Guided by questions" },
      { id: "reverse" as const, emoji: "🔄", label: "Reverse Tutor", sub: "You teach the AI" },
    ],
  },
  en: {
    title: "AI Companion",
    subtitle: "Emotional support · Socratic tutoring · Reverse teaching",
    tabs: [
      { id: "companion" as const, emoji: "💙", label: "Open Chat", sub: "Support · Roadmap" },
      { id: "socratic" as const, emoji: "🏛", label: "Socratic AI", sub: "Guided by questions" },
      { id: "reverse" as const, emoji: "🔄", label: "Reverse Tutor", sub: "You teach the AI" },
    ],
  },
};

export default function AICompanionPage() {
  const { lang: _lang } = useLang();
  void _lang;
  const lang = "en" as "en" | "ko";
  const [tab, setTab] = useState<Tab>("companion");
  const copy = COPY[lang];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xl">🧠</div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{copy.title}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{copy.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {copy.tabs.map(t => (
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
