"use client";

import { useEffect, useRef, useState } from "react";
import { authFetch } from "@/lib/client-auth";

const GRADE_OPTIONS = [
  "9th grade",
  "10th grade",
  "11th grade",
  "12th grade",
  "Gap year",
  "Other",
];

const SUBJECT_SUGGESTIONS = [
  "AP Biology",
  "AP Chemistry",
  "AP Calculus BC",
  "AP US History",
  "AP English Lit",
  "AP Physics C",
  "SAT Math",
  "SAT Reading",
  "AMC",
  "Cornell admissions",
];

export interface StudyProfileValue {
  grade: string | null;
  subjects: string[];
  goals: string | null;
}

interface Props {
  /** When set, the modal pre-fills (used for "edit profile"). */
  initial?: StudyProfileValue;
  onComplete: (profile: StudyProfileValue) => void;
  onCancel?: () => void;
}

/**
 * StudyProfileSetup — blocking modal that powers the AI brief. The
 * three fields (grade, subjects, goals) are what the brief generator
 * uses to write a section structure for this student.
 */
export default function StudyProfileSetup({ initial, onComplete, onCancel }: Props) {
  const [grade, setGrade] = useState<string>(initial?.grade ?? "");
  const [subjects, setSubjects] = useState<string[]>(initial?.subjects ?? []);
  const [draftSubject, setDraftSubject] = useState("");
  const [goals, setGoals] = useState<string>(initial?.goals ?? "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onCancel) onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  function addSubject(raw: string) {
    const v = raw.trim();
    if (!v) return;
    if (subjects.includes(v) || subjects.length >= 12) return;
    setSubjects([...subjects, v]);
    setDraftSubject("");
    inputRef.current?.focus();
  }
  function removeSubject(s: string) {
    setSubjects(subjects.filter((x) => x !== s));
  }

  async function submit() {
    if (busy) return;
    const cleanGrade = grade.trim() || null;
    const cleanGoals = goals.trim() || null;
    if (!cleanGrade && subjects.length === 0 && !cleanGoals) {
      setErr("Pick a grade, add a subject, or describe a goal — anything to start from.");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const res = await authFetch("/api/my-space/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade: cleanGrade,
          subjects,
          goals: cleanGoals,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      onComplete({ grade: cleanGrade, subjects, goals: cleanGoals });
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  }

  return (
    <div
      className="sp-backdrop"
      onClick={onCancel}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        className="sp-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Set up your study profile"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sp-head">
          <div className="sp-eyebrow">FOR YOU · SETUP</div>
          <div className="sp-title">Tell us what you&apos;re studying.</div>
          <div className="sp-sub">
            Three quick fields. We&apos;ll surface what matters this week, drawn from your
            saves and active lounges.
          </div>
        </div>

        {err && <div className="sp-err">{err}</div>}

        <div className="sp-field">
          <label className="sp-label">Grade</label>
          <div className="sp-grid">
            {GRADE_OPTIONS.map((g) => (
              <button
                key={g}
                type="button"
                className={`sp-chip ${grade === g ? "is-active" : ""}`}
                onClick={() => setGrade(grade === g ? "" : g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="sp-field">
          <label className="sp-label">Subjects · {subjects.length}/12</label>
          <div className="sp-subject-row">
            {subjects.map((s) => (
              <span key={s} className="sp-subject-pill">
                {s}
                <button
                  type="button"
                  className="sp-subject-x"
                  aria-label={`Remove ${s}`}
                  onClick={() => removeSubject(s)}
                >
                  ✕
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              className="sp-subject-input"
              value={draftSubject}
              onChange={(e) => setDraftSubject(e.target.value)}
              placeholder="Add a subject…"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addSubject(draftSubject);
                } else if (e.key === "Backspace" && !draftSubject && subjects.length > 0) {
                  removeSubject(subjects[subjects.length - 1]);
                }
              }}
              maxLength={60}
              disabled={busy || subjects.length >= 12}
            />
          </div>
          <div className="sp-suggestions">
            {SUBJECT_SUGGESTIONS.filter((s) => !subjects.includes(s)).slice(0, 6).map((s) => (
              <button
                key={s}
                type="button"
                className="sp-suggestion"
                onClick={() => addSubject(s)}
                disabled={busy || subjects.length >= 12}
              >
                + {s}
              </button>
            ))}
          </div>
        </div>

        <div className="sp-field">
          <label className="sp-label">What are you working toward?</label>
          <textarea
            className="sp-textarea"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="e.g. 5 on AP Bio + Cornell early decision. Weakest unit: cell signaling."
            rows={3}
            maxLength={500}
            disabled={busy}
          />
        </div>

        <div className="sp-actions">
          {onCancel && (
            <button
              type="button"
              className="sp-cancel"
              onClick={onCancel}
              disabled={busy}
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            className="sp-go"
            onClick={() => void submit()}
            disabled={busy}
          >
            {busy ? "Saving…" : "Build my brief →"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .sp-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.62);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: sp-fade 180ms ease;
        }
        @keyframes sp-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .sp-panel {
          width: 100%;
          max-width: 32rem;
          max-height: 88vh;
          overflow-y: auto;
          padding: 1.4rem 1.5rem 1.2rem;
          background: rgba(10, 6, 18, 0.98);
          border: 1px solid rgba(244, 201, 93, 0.28);
          border-radius: 16px;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(244, 201, 93, 0.05) inset;
          color: #f3f3fb;
        }
        .sp-head { margin-bottom: 1rem; }
        .sp-eyebrow {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          color: #f4c95d;
          margin-bottom: 0.4rem;
        }
        .sp-title {
          font-family: Cormorant Garamond, serif;
          font-size: 1.55rem;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 0.4rem;
        }
        .sp-sub {
          font-size: 0.9rem;
          line-height: 1.5;
          color: rgba(216, 217, 230, 0.82);
        }

        .sp-err {
          margin: 0.6rem 0;
          padding: 0.55rem 0.7rem;
          background: rgba(255, 139, 126, 0.08);
          border: 1px solid rgba(255, 139, 126, 0.3);
          border-radius: 0.4rem;
          color: #ff8b7e;
          font-size: 0.82rem;
        }

        .sp-field { margin-top: 1.1rem; }
        .sp-label {
          display: block;
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: rgba(94, 234, 212, 0.85);
          margin-bottom: 0.5rem;
        }
        .sp-grid { display: flex; flex-wrap: wrap; gap: 0.35rem; }
        .sp-chip {
          padding: 0.42rem 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          color: rgba(216, 217, 230, 0.85);
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.12s, background 0.12s, color 0.12s;
        }
        .sp-chip:hover {
          border-color: rgba(94, 234, 212, 0.4);
          color: #f3f3fb;
        }
        .sp-chip.is-active {
          background: rgba(94, 234, 212, 0.14);
          border-color: rgba(94, 234, 212, 0.5);
          color: #5eead4;
        }

        .sp-subject-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          padding: 0.45rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        .sp-subject-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.32rem 0.55rem;
          background: rgba(94, 234, 212, 0.14);
          border: 1px solid rgba(94, 234, 212, 0.4);
          border-radius: 999px;
          font-size: 0.8rem;
          color: #5eead4;
        }
        .sp-subject-x {
          background: transparent;
          border: 0;
          color: rgba(94, 234, 212, 0.7);
          font-size: 0.65rem;
          cursor: pointer;
          padding: 0;
        }
        .sp-subject-x:hover { color: #fff; }
        .sp-subject-input {
          flex: 1;
          min-width: 8rem;
          background: transparent;
          border: 0;
          outline: 0;
          color: #f3f3fb;
          font: inherit;
          font-size: 0.86rem;
          padding: 0.32rem;
        }
        .sp-subject-input::placeholder { color: rgba(216, 217, 230, 0.5); }
        .sp-suggestions {
          margin-top: 0.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
        }
        .sp-suggestion {
          padding: 0.32rem 0.6rem;
          background: transparent;
          border: 1px dashed rgba(255, 255, 255, 0.14);
          border-radius: 999px;
          color: rgba(148, 163, 184, 0.78);
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
        }
        .sp-suggestion:hover {
          border-color: rgba(94, 234, 212, 0.4);
          color: #5eead4;
        }
        .sp-suggestion:disabled { opacity: 0.45; cursor: default; }

        .sp-textarea {
          width: 100%;
          padding: 0.7rem 0.8rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          font: inherit;
          font-size: 0.92rem;
          line-height: 1.5;
          color: #f3f3fb;
          resize: vertical;
          min-height: 4.5rem;
        }
        .sp-textarea::placeholder { color: rgba(216, 217, 230, 0.5); }
        .sp-textarea:focus { outline: 1px solid rgba(94, 234, 212, 0.5); }

        .sp-actions {
          margin-top: 1.4rem;
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
        .sp-cancel {
          padding: 0.6rem 1rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          color: rgba(216, 217, 230, 0.85);
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          cursor: pointer;
        }
        .sp-cancel:hover { color: #f3f3fb; border-color: rgba(255, 255, 255, 0.25); }
        .sp-go {
          padding: 0.6rem 1.15rem;
          background: #f4c95d;
          color: #111014;
          border: 0;
          border-radius: 999px;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          cursor: pointer;
        }
        .sp-go:disabled { opacity: 0.55; cursor: default; }
        .sp-go:hover:not(:disabled) { filter: brightness(1.05); }
      `}</style>
    </div>
  );
}
