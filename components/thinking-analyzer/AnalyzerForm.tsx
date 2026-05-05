"use client";

import { useState, useEffect } from "react";
import type { GapResult } from "@/app/api/ai/thinking-analyzer/route";
import GapDisplay from "./GapDisplay";
import { authFetch } from "@/lib/client-auth";
import {
  getFeatureLimitMessage,
  hasReachedEarlyAccessLimit,
  incrementEarlyAccessUsage,
} from "@/lib/ai-access";

const SUBJECTS = ["AP Biology", "AP Chemistry", "AP Calculus BC", "AP Physics", "AMC 10/12", "SAT Math", "SAT Reading & Writing"];

export default function AnalyzerForm() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [question, setQuestion] = useState("");
  const [studentAnswer, setStudentAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GapResult | null>(null);
  const [error, setError] = useState("");

  // Pre-fill from question-bank practice (via sessionStorage)
  useEffect(() => {
    const raw = sessionStorage.getItem("inhero_analyzer_prefill");
    if (!raw) return;
    try {
      const { subject: s, question: q, studentAnswer: sa, correctAnswer: ca } = JSON.parse(raw);
      if (s) setSubject(s);
      if (q) setQuestion(q);
      if (sa) setStudentAnswer(sa);
      if (ca) setCorrectAnswer(ca);
    } catch {}
    sessionStorage.removeItem("inhero_analyzer_prefill");
  }, []);

  async function analyze() {
    if (!question.trim() || !studentAnswer.trim() || !correctAnswer.trim()) return;
    if (hasReachedEarlyAccessLimit("thinking_analyzer")) {
      setError(getFeatureLimitMessage("thinking_analyzer"));
      setResult(null);
      return;
    }
    setLoading(true);
    setError("");
    try {
      incrementEarlyAccessUsage("thinking_analyzer");
      const res = await authFetch("/api/ai/thinking-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          question,
          studentAnswer,
          correctAnswer,
          reasoning,
        }),
      });
      const data = await res.json();
      if (data?.status === "locked" || data?.status === "fallback") {
        setError(data.message ?? "Analyzer is still rolling out.");
        setResult(null);
        return;
      }
      setResult(data);
    } catch {
      setError("We could not analyze this response yet. Please try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left — input */}
      <div className="space-y-5">
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-sm">📝</span>
            Add your response details
          </h2>
          <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
            Free preview includes 1 full analysis. Unlock Strategy for deeper mistake diagnosis and ongoing use.
          </p>

          {/* Subject */}
          <div className="mb-5">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">Subject</label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(s => (
                <button key={s} onClick={() => setSubject(s)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${subject === s ? "bg-primary-500 text-white border-primary-500" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-300"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Field label="Question (paste the original English)" placeholder="Which of the following best describes..." value={question} onChange={setQuestion} rows={3} required />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Your answer" placeholder="e.g. A" value={studentAnswer} onChange={setStudentAnswer} rows={1} required />
            <Field label="Correct answer" placeholder="e.g. C" value={correctAnswer} onChange={setCorrectAnswer} rows={1} required />
          </div>
          <Field label="Why did you think that? (optional)" placeholder="I chose A because..." value={reasoning} onChange={setReasoning} rows={3} required={false} />

          <div className="flex gap-3 mt-2">
            <button onClick={analyze}
              disabled={loading || !question.trim() || !studentAnswer.trim() || !correctAnswer.trim()}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? <><Spinner /> Analyzing...</> : "🔍 Analyze mistake"}
            </button>
            {result && (
              <button onClick={() => { setResult(null); setError(""); }} className="btn-secondary text-sm px-4">Reset</button>
            )}
          </div>
          {error && <p className="mt-3 text-sm text-red-500 text-center">{error}</p>}
        </div>

        {/* Gap type legend */}
        <div className="card p-5">
          <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3">Four mistake categories</h3>
          <div className="space-y-2">
            {[
              { type: "CONCEPT_GAP", label: "Concept gap", desc: "The core idea is missing", c: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400" },
              { type: "APPLICATION_GAP", label: "Application gap", desc: "You know it but could not apply it", c: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400" },
              { type: "LANGUAGE_GAP", label: "Language gap", desc: "The concept is clear but the English is not", c: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400" },
              { type: "LOGIC_GAP", label: "Logic gap", desc: "The reasoning chain broke", c: "bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400" },
            ].map(item => (
              <div key={item.type} className={`flex items-center gap-3 p-3 rounded-xl border ${item.c}`}>
                <span className="text-xs font-black min-w-[120px]">{item.type}</span>
                <div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{item.label}</span>
                  <span className="text-xs text-gray-400 ml-2">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — result */}
      <div>
        {result ? (
          <GapDisplay result={result} />
        ) : (
          <div className="card p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-semibold text-gray-600 dark:text-gray-400 mb-2">Your mistake analysis will appear here</p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">We break down why the answer missed and what type of gap showed up in your reasoning.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, rows, required }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; rows: number; required: boolean;
}) {
  return (
    <div className="mb-4">
      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1 block">
        {label}{required && <span className="text-red-400">*</span>}
      </label>
      <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full resize-none border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400 placeholder:text-gray-300 dark:placeholder:text-gray-600" />
    </div>
  );
}

function Spinner() {
  return <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />;
}
