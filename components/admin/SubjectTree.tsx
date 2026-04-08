"use client";

import { useState } from "react";
import { SUBJECTS, SUBJECT_CATEGORIES, CATEGORY_LABELS, type Subject } from "@/lib/subjects";

interface SubjectTreeProps {
  selectedSubject: string | null;
  onSelect: (subject: Subject) => void;
  questionCounts: Record<string, number>;
}

export default function SubjectTree({
  selectedSubject,
  onSelect,
  questionCounts,
}: SubjectTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    AP: true,
    Honors: false,
    Core: false,
    "대회": false,
    "시험": false,
  });

  function toggle(cat: string) {
    setExpanded((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          과목 폴더
        </p>
      </div>
      <div className="py-2">
        {SUBJECT_CATEGORIES.map((cat) => {
          const subjects = SUBJECTS.filter((s) => s.category === cat);
          const isOpen = expanded[cat];
          const totalInCat = subjects.reduce(
            (acc, s) => acc + (questionCounts[s.id] ?? 0),
            0
          );

          return (
            <div key={cat}>
              {/* Category header */}
              <button
                onClick={() => toggle(cat)}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                    {CATEGORY_LABELS[cat]}
                  </span>
                </div>
                {totalInCat > 0 && (
                  <span className="text-xs text-gray-400 font-mono">{totalInCat}</span>
                )}
              </button>

              {/* Subject items */}
              {isOpen && (
                <div className="ml-2">
                  {subjects.map((subject) => {
                    const count = questionCounts[subject.id] ?? 0;
                    const isSelected = selectedSubject === subject.id;

                    return (
                      <button
                        key={subject.id}
                        onClick={() => onSelect(subject)}
                        className={`w-full flex items-center justify-between px-4 py-2 text-left transition-colors ${
                          isSelected
                            ? "bg-primary-50 dark:bg-primary-900/20"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: subject.color }}
                          />
                          <span
                            className={`text-xs truncate ${
                              isSelected
                                ? "font-semibold text-primary-600 dark:text-primary-400"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {subject.name}
                          </span>
                        </div>
                        {count > 0 && (
                          <span
                            className={`text-xs font-mono flex-shrink-0 ml-2 ${
                              isSelected ? "text-primary-500" : "text-gray-400"
                            }`}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
