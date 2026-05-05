"use client";

import { useEffect, useState } from "react";
import EarlyAccessModal from "@/components/shared/EarlyAccessModal";

const SUBJECT_COLORS: Record<string, string> = {
  "AP Biology": "#1D9E75",
  "AP Chemistry": "#1D9E75",
  "AP Calculus": "#BA7517",
  AMC: "#3C3489",
  SAT: "#854F0B",
  "AP Stats": "#0F6E56",
};

const SUBJECT_EMOJIS: Record<string, string> = {
  "AP Biology": "🧬",
  "AP Chemistry": "⚗️",
  "AP Calculus": "∫",
  AMC: "🔢",
  SAT: "📝",
  "AP Stats": "📊",
};

interface FlashcardSet {
  id: string;
  subject: string;
  title: string;
  card_count: number;
  created_at: string;
}

const SAMPLE_SETS: FlashcardSet[] = [
  { id: "s1", subject: "AP Biology", title: "Core Mitochondria Terms", card_count: 5, created_at: "2024-01-01" },
  { id: "s2", subject: "AP Biology", title: "DNA Replication Essentials", card_count: 5, created_at: "2024-01-01" },
  { id: "s3", subject: "AP Chemistry", title: "Periodic Trends", card_count: 6, created_at: "2024-01-01" },
  { id: "s4", subject: "AP Calculus", title: "Derivative Formulas", card_count: 6, created_at: "2024-01-01" },
  { id: "s5", subject: "AMC", title: "Core Formula Set", card_count: 5, created_at: "2024-01-01" },
  { id: "s6", subject: "SAT", title: "High-Frequency Vocabulary", card_count: 6, created_at: "2024-01-01" },
];

export default function FlashcardsPage() {
  const [sets, setSets] = useState<FlashcardSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    fetchSets();
  }, [subject]);

  async function fetchSets() {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (subject) p.set("subject", subject);
      const res = await fetch(`/api/flashcards/sets?${p}`);
      const data = await res.json();
      const fetched: FlashcardSet[] = data.sets ?? [];
      const filtered = subject ? SAMPLE_SETS.filter((s) => s.subject === subject) : SAMPLE_SETS;
      setSets(fetched.length > 0 ? fetched : filtered);
    } catch {
      const filtered = subject ? SAMPLE_SETS.filter((s) => s.subject === subject) : SAMPLE_SETS;
      setSets(filtered);
    } finally {
      setLoading(false);
    }
  }

  const subjects = Array.from(new Set(sets.map((s) => s.subject)));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <EarlyAccessModal
        isOpen={showGate}
        onClose={() => setShowGate(false)}
        title="Flashcard study is coming soon"
        description="You can preview the decks now, and the actual study and quiz flow will open for the first cohort as the rollout expands."
      />

      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xl">🃏</div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Flashcards</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Memorize core terms faster with interactive cards</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-4 text-white flex items-center gap-4 flex-wrap">
            <span className="text-2xl">🎯</span>
            <div className="flex-1">
              <p className="font-bold text-sm">How flashcard study works</p>
              <p className="text-xs text-primary-100 mt-0.5">Flip each card and sort it into 😊 Know it / 🤔 Unsure / 😅 Hard</p>
            </div>
            <div className="text-xs bg-white/20 rounded-xl px-3 py-2">
              <span className="font-bold">Quiz mode</span> is included →
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!loading && subjects.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6">
            <button onClick={() => setSubject("")} className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${subject === "" ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
              All
            </button>
            {subjects.map((s) => {
              const color = SUBJECT_COLORS[s] ?? "#1D9E75";
              return (
                <button
                  key={s}
                  onClick={() => setSubject(s)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors text-white"
                  style={{ backgroundColor: subject === s ? color : undefined, opacity: subject && subject !== s ? 0.5 : 1, ...(subject !== s ? { backgroundColor: "#e5e7eb", color: "#374151" } : {}) }}
                >
                  {SUBJECT_EMOJIS[s] ?? "📚"} {s}
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="flex gap-1.5">{[0, 1, 2].map((i) => <div key={i} className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}</div>
          </div>
        ) : sets.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🃏</p>
            <p className="text-sm mb-2">No flashcard sets are available yet.</p>
            <p className="text-xs text-gray-300">Run `new-features-schema.sql` in Supabase to seed the sample deck data.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sets.map((set) => {
              const color = SUBJECT_COLORS[set.subject] ?? "#1D9E75";
              const emoji = SUBJECT_EMOJIS[set.subject] ?? "📚";
              return (
                <div key={set.id} className="card p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${color}18` }}>
                      {emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full text-white mb-1" style={{ backgroundColor: color }}>
                        {set.subject}
                      </span>
                      <p className="font-bold text-gray-900 dark:text-white text-sm leading-snug">{set.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <span>🃏 {set.card_count} cards</span>
                    <span>{new Date(set.created_at).toLocaleDateString("en-US")}</span>
                  </div>

                  <div className="flex gap-2">
                    <button type="button" onClick={() => setShowGate(true)} className="flex-1 text-center py-2 rounded-xl text-xs font-semibold text-white transition-opacity" style={{ backgroundColor: color }}>
                      📖 Study mode
                    </button>
                    <button type="button" onClick={() => setShowGate(true)} className="flex-1 text-center py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      ✏️ Quiz mode
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
