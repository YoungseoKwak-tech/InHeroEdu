"use client";

import type { TranscriptSegment, ClickableTerm } from "@/lib/data/lessons";

interface TranscriptProps {
  segments: TranscriptSegment[];
  onTermClick: (term: string, termEn: string) => void;
  activeTerm: string | null;
}

export default function Transcript({ segments, onTermClick, activeTerm }: TranscriptProps) {
  function renderSegmentText(segment: TranscriptSegment) {
    let text = segment.text;
    const parts: Array<{ type: "text" | "term"; content: string; termData?: ClickableTerm }> = [];

    // Sort terms by position in text (longest first to avoid partial matches)
    const sortedTerms = [...segment.clickableTerms].sort(
      (a, b) => b.term.length - a.term.length
    );

    // Find all term positions
    interface Match {
      start: number;
      end: number;
      termData: ClickableTerm;
    }
    const matches: Match[] = [];

    for (const termData of sortedTerms) {
      const idx = text.indexOf(termData.term);
      if (idx !== -1) {
        // Check if this position overlaps with existing matches
        const overlaps = matches.some(
          (m) => idx < m.end && idx + termData.term.length > m.start
        );
        if (!overlaps) {
          matches.push({ start: idx, end: idx + termData.term.length, termData });
        }
      }
    }

    // Sort matches by position
    matches.sort((a, b) => a.start - b.start);

    let lastIdx = 0;
    for (const match of matches) {
      if (match.start > lastIdx) {
        parts.push({ type: "text", content: text.slice(lastIdx, match.start) });
      }
      parts.push({ type: "term", content: match.termData.term, termData: match.termData });
      lastIdx = match.end;
    }
    if (lastIdx < text.length) {
      parts.push({ type: "text", content: text.slice(lastIdx) });
    }

    return parts;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-bold text-gray-900 dark:text-white">강의 대본</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
          보라색 용어를 클릭하세요
        </span>
      </div>
      <div className="space-y-5">
        {segments.map((segment, idx) => {
          const parts = renderSegmentText(segment);
          return (
            <div key={idx} className="flex gap-3">
              {/* Timestamp */}
              <span className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-1 flex-shrink-0 w-10">
                {segment.time}
              </span>
              {/* Text */}
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {parts.map((part, pIdx) => {
                  if (part.type === "text") {
                    return <span key={pIdx}>{part.content}</span>;
                  }
                  const isActive = activeTerm === part.content;
                  return (
                    <button
                      key={pIdx}
                      onClick={() =>
                        onTermClick(part.termData!.term, part.termData!.termEn)
                      }
                      className={`font-semibold underline decoration-dotted underline-offset-2 transition-all duration-150 rounded px-0.5 ${
                        isActive
                          ? "bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 decoration-primary-500"
                          : "text-primary-600 dark:text-primary-400 decoration-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      }`}
                    >
                      {part.content}
                    </button>
                  );
                })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
