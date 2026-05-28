"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { authFetch } from "@/lib/client-auth";
import type { LessonPart } from "@/lib/lesson-player-types";
import type { OverlayRow } from "@/lib/overlays";
import { parseScript } from "@/lib/parseScript";
import ClipManager from "@/components/admin/ClipManager";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

type OverlayPart = Exclude<LessonPart, { type: "video" }>;

type OverlayType =
  | "spark"
  | "gap_crunch"
  | "teach_back"
  | "question_sprint"
  | "analyzer"
  | "confidence_check"
  | "next_move"
  | "tap_quick";

const OVERLAY_TYPES: OverlayType[] = [
  "spark",
  "gap_crunch",
  "teach_back",
  "question_sprint",
  "analyzer",
  "confidence_check",
  "next_move",
  "tap_quick",
];

const TYPE_CONFIG: Record<
  OverlayType,
  { label: string; icon: string; border: string; bg: string }
> = {
  spark: {
    label: "Spark",
    icon: "⚡",
    border: "#C9A84C",
    bg: "#0d1a10",
  },
  gap_crunch: {
    label: "Gap Crunch",
    icon: "🔴",
    border: "#E85A4A",
    bg: "#120a0a",
  },
  teach_back: {
    label: "Teach Back",
    icon: "🎓",
    border: "#5DCAA5",
    bg: "#091410",
  },
  question_sprint: {
    label: "Question Sprint",
    icon: "🏃",
    border: "#9F97ED",
    bg: "#0c0b18",
  },
  analyzer: {
    label: "Analyzer",
    icon: "🔬",
    border: "#5DAAF0",
    bg: "#090f18",
  },
  confidence_check: {
    label: "Confidence Check",
    icon: "◈",
    border: "#D4537E",
    bg: "#130a0e",
  },
  next_move: {
    label: "Next Move",
    icon: "→",
    border: "#7F77DD",
    bg: "#0c0b18",
  },
  tap_quick: {
    label: "Pulse · Tap",
    icon: "◎",
    border: "#00FFB2",
    bg: "#06140f",
  },
};

// ── Suggest overlay type from section title ───────────────────────────────
function suggestType(title: string): OverlayType | null {
  const t = title.toUpperCase();
  if (t.includes("PULSE") || t.includes("TAP") || t.includes("HERO EXPLAIN")) return "tap_quick";
  if (t.includes("GAP") || t.includes("CRUNCH"))                             return "gap_crunch";
  if (t.includes("SPARK"))                                                    return "spark";
  if (t.includes("TEACH") || t.includes("BACK"))                             return "teach_back";
  if (t.includes("SPRINT") || t.includes("QUESTION"))                        return "question_sprint";
  if (t.includes("ANALYZ") || t.includes("OVERVIEW") || t.includes("SUMMARY")) return "analyzer";
  if (t.includes("CONFIDENCE") || t.includes("IDENTITY") || t.includes("CHECK")) return "confidence_check";
  if (t.includes("NEXT") || t.includes("PREDICT") || t.includes("WHAT'S NEXT"))  return "next_move";
  return null;
}

interface Props {
  lessonId: string;
  lessonTitle: string;
  subject: string;
  unit: string;
  fullScript: string;
  selectedSection: string;
  initialOverlays?: OverlayPart[];
  onSave: (overlays: OverlayPart[]) => void;
}

// ── Convert DB rows to minimal OverlayPart[] for parent badge count ──────
function rowsToOverlayParts(rows: OverlayRow[]): OverlayPart[] {
  return rows.map((r) => {
    switch (r.type) {
      case "spark":           return { id: r.id, type: "SPARK", prompt: "" } as OverlayPart;
      case "gap_crunch":      return { id: r.id, type: "GAP_CRUNCH", statement: "", trap: "", correct: "", options: [] } as OverlayPart;
      case "teach_back":      return { id: r.id, type: "TEACH_BACK", prompt: "" } as OverlayPart;
      case "question_sprint": return { id: r.id, type: "QUESTION_SPRINT", question: "", options: [], correct: 0, explanation: "", wrongPattern: "" } as OverlayPart;
      case "analyzer":          return { id: r.id, type: "ANALYZER", gapType: "CONCEPT GAP", message: "" } as OverlayPart;
      case "confidence_check":  return { id: r.id, type: "SPARK", prompt: "" } as OverlayPart;
      case "next_move":         return { id: r.id, type: "SPARK", prompt: "" } as OverlayPart;
      case "tap_quick":         return { id: r.id, type: "SPARK", prompt: "" } as OverlayPart;
      default:                  return { id: r.id, type: "SPARK", prompt: "" } as OverlayPart;
    }
  });
}

// ── Rich card renderers ───────────────────────────────────────────────────

function SparkCard({ data }: { data: Record<string, unknown> }) {
  const concepts = (data.connectedConcepts as string[] | undefined) ?? [];
  return (
    <div className="oe-card-data">
      <div className="oe-data-row">
        <span className="oe-data-label">Concept Unlocked</span>
        <span className="oe-data-value oe-highlight-gold">{String(data.conceptUnlocked ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">Why It Matters</span>
        <span className="oe-data-value">{String(data.whyItMatters ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">Exam Connection</span>
        <span className="oe-data-value">{String(data.examConnection ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">Memory Anchor</span>
        <span className="oe-data-value oe-italic">{String(data.memoryAnchor ?? "")}</span>
      </div>
      {concepts.length > 0 && (
        <div className="oe-data-row">
          <span className="oe-data-label">Connected</span>
          <div className="oe-tags">
            {concepts.map((c, i) => (
              <span key={i} className="oe-tag oe-tag-gold">{c}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GapCrunchCard({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="oe-card-data">
      <div className="oe-data-row">
        <span className="oe-data-label">Gap Type</span>
        <span className="oe-tag oe-tag-red">{String(data.gapType ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">Headline</span>
        <span className="oe-data-value oe-highlight-red">{String(data.headline ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">What Students Think</span>
        <span className="oe-data-value">{String(data.whatStudentsThink ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">What Is Actually True</span>
        <span className="oe-data-value">{String(data.whatIsActuallyTrue ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">Exam Trap</span>
        <span className="oe-data-value oe-italic">{String(data.examTrap ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">Fix Prompt</span>
        <span className="oe-data-value">{String(data.fixPrompt ?? "")}</span>
      </div>
    </div>
  );
}

function TeachBackCard({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="oe-card-data">
      <div className="oe-data-row">
        <span className="oe-data-label">Target Concept</span>
        <span className="oe-tag oe-tag-teal">{String(data.targetConcept ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">Teach Prompt</span>
        <span className="oe-data-value oe-highlight-teal">{String(data.teachPrompt ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">If They Struggle</span>
        <span className="oe-data-value oe-italic">{String(data.ifTheyStruggle ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">Success Signal</span>
        <span className="oe-data-value">{String(data.successSignal ?? "")}</span>
      </div>
    </div>
  );
}

function QuestionSprintCard({ data }: { data: Record<string, unknown> }) {
  const questions = (data.questions as Array<{
    q: string;
    choices: string[];
    correct: string;
    trap: string;
    gapType: string;
  }> | undefined) ?? [];

  return (
    <div className="oe-card-data">
      {!!data.sprintFocus && (
        <div className="oe-data-row">
          <span className="oe-data-label">Sprint Focus</span>
          <span className="oe-data-value oe-italic">{String(data.sprintFocus)}</span>
        </div>
      )}
      {questions.map((q, i) => (
        <div key={i} className="oe-question-block">
          <div className="oe-question-num">Q{i + 1} · <span className="oe-tag oe-tag-purple" style={{ fontSize: "0.6rem" }}>{q.gapType}</span></div>
          <div className="oe-question-text">{q.q}</div>
          <div className="oe-choices">
            {(q.choices ?? []).map((c, ci) => (
              <div
                key={ci}
                className={`oe-choice ${c.startsWith(q.correct + ".") || c.charAt(0) === q.correct ? "oe-choice-correct" : ""}`}
              >
                {c}
              </div>
            ))}
          </div>
          {q.trap && (
            <div className="oe-trap">⚠ {q.trap}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function AnalyzerCard({ data }: { data: Record<string, unknown> }) {
  const conceptMap = (data.conceptMap as Array<{
    concept: string;
    weight: string;
    likelyGap: string;
  }> | undefined) ?? [];
  const prereqs = (data.prerequisiteCheck as string[] | undefined) ?? [];

  const weightColor: Record<string, string> = {
    high: "#ef4444",
    medium: "#f97316",
    low: "#6b7280",
  };

  return (
    <div className="oe-card-data">
      <div className="oe-data-row">
        <span className="oe-data-label">Lesson in One Line</span>
        <span className="oe-data-value oe-highlight-blue">{String(data.lessonInOneLine ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">Core Concepts</span>
        <span className="oe-tag oe-tag-blue">{String(data.coreConceptCount ?? 0)}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">Exam Frequency</span>
        <span className="oe-data-value">{String(data.examFrequency ?? "")}</span>
      </div>
      <div className="oe-data-row">
        <span className="oe-data-label">Hardest Moment</span>
        <span className="oe-data-value oe-italic">{String(data.hardestMoment ?? "")}</span>
      </div>
      {conceptMap.length > 0 && (
        <div className="oe-data-row">
          <span className="oe-data-label">Concept Map</span>
          <div className="oe-concept-map">
            {conceptMap.map((c, i) => (
              <div key={i} className="oe-concept-row">
                <span
                  className="oe-concept-dot"
                  style={{ background: weightColor[c.weight] ?? "#555" }}
                />
                <span className="oe-concept-name">{c.concept}</span>
                <span className="oe-tag" style={{ fontSize: "0.58rem", borderColor: "#333", color: "#666" }}>
                  {c.likelyGap}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {prereqs.length > 0 && (
        <div className="oe-data-row">
          <span className="oe-data-label">Prerequisites</span>
          <div className="oe-tags">
            {prereqs.map((p, i) => (
              <span key={i} className="oe-tag oe-tag-blue">{p}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TapQuickPreviewCard({ data }: { data: Record<string, unknown> }) {
  const options = (data.options as Array<{ label: string; correct: boolean; feedback: string }> | undefined) ?? [];
  const kind = String(data.kind ?? "");
  const kindColor: Record<string, string> = {
    predict: "#00FFB2",
    trap: "#FF6B5B",
    connect: "#A99CFF",
  };
  return (
    <div className="oe-card-data">
      {kind && (
        <div className="oe-data-row">
          <span className="oe-data-label">Kind</span>
          <span
            className="oe-tag"
            style={{ borderColor: (kindColor[kind] ?? "#00FFB2") + "55", color: kindColor[kind] ?? "#00FFB2" }}
          >
            {kind.toUpperCase()}
          </span>
        </div>
      )}
      <div className="oe-data-row">
        <span className="oe-data-label">Question</span>
        <span className="oe-data-value" style={{ color: "#00FFB2", fontWeight: 600 }}>
          {String(data.question ?? "")}
        </span>
      </div>
      {options.length > 0 && (
        <div className="oe-data-row">
          <span className="oe-data-label">Options</span>
          <div className="oe-choices">
            {options.map((opt, i) => (
              <div key={i} className={`oe-choice ${opt.correct ? "oe-choice-correct" : ""}`}>
                {opt.correct ? "✓ " : "✕ "}{opt.label}
                {opt.feedback && (
                  <div style={{ fontSize: "0.65rem", color: "#555", marginTop: "0.15rem", fontStyle: "italic" }}>
                    → {opt.feedback}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {!!data.rule && (
        <div className="oe-data-row">
          <span className="oe-data-label">Rule</span>
          <span className="oe-data-value oe-italic">🔑 {String(data.rule)}</span>
        </div>
      )}
      {!!data.hint && (
        <div className="oe-data-row">
          <span className="oe-data-label">Hint</span>
          <span className="oe-data-value oe-italic">💡 {String(data.hint)}</span>
        </div>
      )}
    </div>
  );
}

function OverlayCardContent({ row }: { row: OverlayRow }) {
  const type = row.type as OverlayType;
  switch (type) {
    case "spark":           return <SparkCard data={row.data} />;
    case "gap_crunch":      return <GapCrunchCard data={row.data} />;
    case "teach_back":      return <TeachBackCard data={row.data} />;
    case "question_sprint": return <QuestionSprintCard data={row.data} />;
    case "analyzer":        return <AnalyzerCard data={row.data} />;
    case "tap_quick":       return <TapQuickPreviewCard data={row.data} />;
    default:                return null;
  }
}

// ── Main component ────────────────────────────────────────────────────────

export default function OverlaysEditor({
  lessonId,
  lessonTitle,
  subject,
  unit,
  fullScript,
  selectedSection,
  onSave,
}: Props) {
  const [rows, setRows] = useState<OverlayRow[]>([]);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loadingType, setLoadingType] = useState<OverlayType | null>(null);
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const [generatingAdhd, setGeneratingAdhd] = useState(false);
  const [adhdMsg, setAdhdMsg] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedSectionIdx, setSelectedSectionIdx] = useState<number>(0);
  const [confirmImportOpen, setConfirmImportOpen] = useState(false);
  const [pendingDeleteOverlayId, setPendingDeleteOverlayId] = useState<string | null>(null);
  const [removingOverlayId, setRemovingOverlayId] = useState<string | null>(null);
  const dragIdx = useRef<number | null>(null);

  const sections = useMemo(() => parseScript(fullScript), [fullScript]);

  // Map section title (uppercased) → its timestamp, so each overlay card can
  // show a ✂ cut-point. Lets the admin know exactly where to slice their
  // HeyGen export when uploading clips for this lesson.
  const refToTimestamp = useMemo(() => {
    const m = new Map<string, string>();
    for (const s of sections) {
      if (s.timestamp) m.set(s.title.toUpperCase(), s.timestamp);
    }
    return m;
  }, [sections]);
  function timestampFor(ref: string | null): string | null {
    if (!ref) return null;
    const exact = refToTimestamp.get(ref.toUpperCase());
    if (exact) return exact;
    // Fuzzy: any stored title that includes the ref or vice-versa
    const upperRef = ref.toUpperCase();
    const entries = Array.from(refToTimestamp.entries());
    for (const [title, ts] of entries) {
      if (title.includes(upperRef) || upperRef.includes(title)) return ts;
    }
    return null;
  }

  const suggestedType = useMemo<OverlayType | null>(() => {
    if (selectedSectionIdx === 0) return null;
    const section = sections[selectedSectionIdx - 1];
    return section ? suggestType(section.title) : null;
  }, [selectedSectionIdx, sections]);

  // Reset section selection when lesson changes
  useEffect(() => { setSelectedSectionIdx(0); }, [lessonId]);

  // ── Fetch overlays from DB on mount or lessonId change ──────────────────
  useEffect(() => {
    if (!lessonId) return;
    console.log("[OverlaysEditor] fetching lessonId:", lessonId);
    setLoadingFetch(true);
    setFetchError(null);

    authFetch(`/api/overlays?lessonId=${lessonId}`)
      .then(async (res) => {
        const json = await res.json();
        console.log("[OverlaysEditor] response", res.status, json);
        if (json.ok) {
          setRows(json.data ?? []);
        } else {
          setFetchError(`${res.status}: ${json.error ?? "Unknown error"}`);
        }
      })
      .catch((err) => {
        console.error("[OverlaysEditor] fetch threw:", err);
        setFetchError("Network error — check console");
      })
      .finally(() => setLoadingFetch(false));
  }, [lessonId]);

  // ── Generate + save overlay ─────────────────────────────────────────────
  async function generate(type: OverlayType) {
    if (loadingType) return;
    setLoadingType(type);

    // Determine which content + ref to send to Claude
    const pickedSection = selectedSectionIdx > 0 ? sections[selectedSectionIdx - 1] : null;
    const scriptSection = pickedSection
      ? pickedSection.content
      : selectedSection || fullScript.slice(0, 800);
    const sectionRef = pickedSection
      ? pickedSection.title
      : selectedSection
        ? selectedSection.slice(0, 80)
        : "";

    try {
      // Step 1: AI generation
      const genRes = await authFetch("/api/overlay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          context: { lessonTitle, subject, unit, scriptSection, fullScript },
          studentId: "preview",
          subjectId: subject,
        }),
      });
      const genJson = await genRes.json();
      if (!genJson.ok) throw new Error(genJson.error ?? "AI generation failed");

      // Step 2: Save to DB
      const saveRes = await authFetch("/api/overlays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          type,
          data: genJson.data,
          scriptSectionRef: sectionRef,
        }),
      });
      const saveJson = await saveRes.json();
      if (!saveJson.ok) throw new Error(saveJson.error ?? "Save failed");

      const newRow: OverlayRow = saveJson.data;
      setRows((prev) => [...prev, newRow]);
      setExpandedId(newRow.id);
      onSave(rowsToOverlayParts([...rows, newRow]));
    } catch (err) {
      console.error("[OverlaysEditor] generate", err);
    } finally {
      setLoadingType(null);
    }
  }

  // ── Batch-generate ADHD-friendly TAP_QUICK overlays for this lesson ────
  async function generateAdhdLayer() {
    if (generatingAdhd || loadingType) return;
    setGeneratingAdhd(true);
    setAdhdMsg(null);
    try {
      const res = await authFetch("/api/overlay/adhd-layer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          lessonTitle,
          subject,
          fullScript,
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "ADHD layer generation failed");

      // Re-fetch the full overlay list so the new tap_quick rows show up.
      const listRes = await authFetch(`/api/overlays?lessonId=${lessonId}`);
      const listJson = await listRes.json();
      if (listJson.ok) {
        setRows(listJson.data ?? []);
        onSave(rowsToOverlayParts(listJson.data ?? []));
      }
      const errSuffix = Array.isArray(json.errors) && json.errors.length > 0
        ? ` (${json.errors.length} skipped)` : "";
      // Collect the timestamps the user needs to cut their video at — derived
      // from the section each overlay attached to.
      const cuts = (json.created as Array<{ section_ref: string }> | undefined ?? [])
        .map((c) => {
          const ts = timestampFor(c.section_ref);
          return ts ? `${c.section_ref.split(" ").slice(0, 3).join(" ")} (${ts})` : null;
        })
        .filter((x): x is string => x !== null);
      const cutSuffix = cuts.length > 0 ? ` · ✂ ${cuts.join(", ")}` : "";
      setAdhdMsg(`Generated ${json.generated ?? 0} pulse overlay${json.generated === 1 ? "" : "s"}${errSuffix}${cutSuffix}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[OverlaysEditor] generateAdhdLayer", msg);
      setAdhdMsg(`Error: ${msg}`);
    } finally {
      setGeneratingAdhd(false);
    }
  }

  // ── Import overlays from script's `## OVERLAYS JSON:` block ────────────
  async function importFromScript(forceReplace = false) {
    if (importing) return;
    if (!forceReplace && rows.length > 0) {
      setConfirmImportOpen(true);
      return;
    }

    setImporting(true);
    setConfirmImportOpen(false);
    setImportMsg(null);
    try {
      const res = await authFetch("/api/admin/import-overlays-from-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, replace: true }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "Import failed");

      const newRows: OverlayRow[] = json.data ?? [];
      setRows(newRows);
      onSave(rowsToOverlayParts(newRows));
      setImportMsg(`Imported ${json.count ?? newRows.length} overlay${(json.count ?? newRows.length) === 1 ? "" : "s"}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[OverlaysEditor] import", msg);
      setImportMsg(`Error: ${msg}`);
    } finally {
      setImporting(false);
    }
  }

  // ── Delete overlay ──────────────────────────────────────────────────────
  async function remove(id: string) {
    if (removingOverlayId) return;
    setRemovingOverlayId(id);
    try {
      await authFetch("/api/overlays", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const next = rows.filter((r) => r.id !== id);
      setRows(next);
      if (expandedId === id) setExpandedId(null);
      onSave(rowsToOverlayParts(next));
    } catch (err) {
      console.error("[OverlaysEditor] remove", err);
    } finally {
      setRemovingOverlayId(null);
      setPendingDeleteOverlayId(null);
    }
  }

  // ── Drag-and-drop reorder ───────────────────────────────────────────────
  function onDragStart(idx: number) { dragIdx.current = idx; }

  function onDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (dragIdx.current === null || dragIdx.current === idx) return;
    setRows((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx.current!, 1);
      next.splice(idx, 0, moved);
      dragIdx.current = idx;
      return next;
    });
  }

  async function onDragEnd() {
    dragIdx.current = null;
    try {
      await authFetch("/api/overlays", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, orderedIds: rows.map((r) => r.id) }),
      });
    } catch (err) {
      console.error("[OverlaysEditor] reorder", err);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="oe-root">
      {/* Clip manager — per-section video upload */}
      {sections.length > 0 && (
        <ClipManager lessonId={lessonId} sections={sections} overlays={rows} />
      )}

      {/* AI Generation buttons */}
      <div className="oe-gen-section">
        <div className="oe-gen-header">
          <span className="oe-gen-title">AI GENERATE</span>
          <div style={{ flex: 1 }} />
          <button
            type="button"
            className="oe-adhd-btn"
            onClick={() => void generateAdhdLayer()}
            disabled={generatingAdhd || importing || !!loadingType}
            title="Generate 3-5 ADHD-friendly TAP pulse overlays distributed across the lesson"
          >
            {generatingAdhd ? (
              <>
                <span className="oe-spinner" style={{ borderTopColor: "#00FFB2" }} />
                Pulsing…
              </>
            ) : (
              <>◎ Generate ADHD Layer</>
            )}
          </button>
          <button
            type="button"
            className="oe-import-btn"
            onClick={() => void importFromScript()}
            disabled={importing || generatingAdhd || !!loadingType}
            title="Parse `## OVERLAYS JSON:` block in the script and replace the overlays for this lesson"
          >
            {importing ? (
              <>
                <span className="oe-spinner" style={{ borderTopColor: "#9F97ED" }} />
                Importing…
              </>
            ) : (
              <>✦ Import from Script</>
            )}
          </button>
        </div>
        {adhdMsg && (
          <div
            className="oe-import-msg"
            style={{ color: adhdMsg.startsWith("Error") ? "#E85A4A" : "#00FFB2" }}
          >
            {adhdMsg}
          </div>
        )}
        {importMsg && (
          <div
            className="oe-import-msg"
            style={{ color: importMsg.startsWith("Error") ? "#E85A4A" : "#9F97ED" }}
          >
            {importMsg}
          </div>
        )}

        {/* Section selector */}
        <div className="oe-section-row">
          <label className="oe-section-label">Section</label>
          <select
            className="oe-section-select"
            value={selectedSectionIdx}
            onChange={(e) => setSelectedSectionIdx(Number(e.target.value))}
            disabled={!!loadingType}
          >
            <option value={0}>
              {sections.length === 0
                ? "Full Script"
                : `Full Script (${sections.length} sections)`}
            </option>
            {sections.map((s, i) => (
              <option key={i} value={i + 1}>
                {s.title}{s.timestamp ? ` · ${s.timestamp}` : ""}
              </option>
            ))}
          </select>
          {selectedSectionIdx === 0 && selectedSection && (
            <span className="oe-selection-hint">
              + highlighted text ({selectedSection.length} chars)
            </span>
          )}
        </div>

        {/* Suggestion label */}
        {suggestedType && (
          <div className="oe-suggest-row">
            <span className="oe-suggest-label">Suggested</span>
            <span
              className="oe-suggest-chip"
              style={{
                color: TYPE_CONFIG[suggestedType].border,
                borderColor: TYPE_CONFIG[suggestedType].border + "55",
                background: TYPE_CONFIG[suggestedType].bg,
              }}
            >
              {TYPE_CONFIG[suggestedType].icon} {TYPE_CONFIG[suggestedType].label}
            </span>
          </div>
        )}

        <div className="oe-gen-buttons">
          {OVERLAY_TYPES.map((type) => {
            const cfg = TYPE_CONFIG[type];
            const isLoading = loadingType === type;
            const isDisabled = !!loadingType;
            const isSuggested = suggestedType === type && !loadingType;
            return (
              <button
                key={type}
                onClick={() => generate(type)}
                disabled={isDisabled}
                className={`oe-gen-btn${isSuggested ? " oe-gen-btn-suggested" : ""}`}
                style={{
                  borderColor: isDisabled && !isLoading ? "#1e1e1e" : cfg.border,
                  color: isDisabled && !isLoading ? "#333" : cfg.border,
                  background: isLoading || isSuggested ? cfg.bg : "transparent",
                  // suggested: use the border color as the ring base via --suggest-color
                  ["--suggest-color" as string]: cfg.border,
                }}
              >
                {isLoading ? (
                  <>
                    <span className="oe-spinner" style={{ borderTopColor: cfg.border }} />
                    Generating…
                  </>
                ) : (
                  <>{cfg.icon} {cfg.label}</>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Overlay list */}
      <div className="oe-list-section">
        <div className="oe-list-header">
          <span className="oe-list-count">{rows.length} overlay{rows.length !== 1 ? "s" : ""}</span>
        </div>

        {loadingFetch && <div className="oe-state-text">Loading overlays…</div>}
        {fetchError && <div className="oe-state-text oe-state-error">{fetchError}</div>}

        {!loadingFetch && !fetchError && rows.length === 0 && (
          <div className="oe-state-text">No overlays yet — generate one above.</div>
        )}

        <div className="oe-list">
          {rows.map((row, idx) => {
            const type = row.type as OverlayType;
            const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG.spark;
            const isExpanded = expandedId === row.id;

            return (
              <div
                key={row.id}
                draggable
                onDragStart={() => onDragStart(idx)}
                onDragOver={(e) => onDragOver(e, idx)}
                onDragEnd={onDragEnd}
                className="oe-card"
                style={{ borderColor: isExpanded ? cfg.border + "66" : "#1e1e1e", background: isExpanded ? cfg.bg : "#0d0d0d" }}
              >
                {/* Card header */}
                <div
                  className="oe-card-header"
                  onClick={() => setExpandedId(isExpanded ? null : row.id)}
                >
                  <span className="oe-drag-handle" title="Drag to reorder">⠿</span>
                  <span
                    className="oe-type-badge"
                    style={{ borderColor: cfg.border, color: cfg.border }}
                  >
                    {cfg.icon} {cfg.label.toUpperCase()}
                  </span>
                  {row.script_section_ref && (
                    <span className="oe-section-ref" title={row.script_section_ref}>
                      {row.script_section_ref.slice(0, 32)}…
                    </span>
                  )}
                  {(() => {
                    const ts = timestampFor(row.script_section_ref);
                    return ts ? (
                      <span className="oe-cut-tag" title={`Cut your video at ${ts}`}>
                        ✂ {ts}
                      </span>
                    ) : null;
                  })()}
                  <div style={{ flex: 1 }} />
                  <span className="oe-pos-badge">#{idx + 1}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setPendingDeleteOverlayId(row.id); }}
                    className="oe-del-btn"
                    title="Delete overlay"
                  >
                    ✕
                  </button>
                  <span className="oe-chevron">{isExpanded ? "▲" : "▼"}</span>
                </div>

                {/* Card body — rich data display */}
                {isExpanded && (
                  <div className="oe-card-body">
                    <OverlayCardContent row={row} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ConfirmDialog
        open={confirmImportOpen}
        title="Replace existing overlays?"
        message={`This replaces all ${rows.length} existing overlay${rows.length === 1 ? "" : "s"} with a fresh import from the script.`}
        confirmLabel="Replace"
        loading={importing}
        destructive
        onConfirm={() => importFromScript(true)}
        onCancel={() => {
          if (!importing) setConfirmImportOpen(false);
        }}
      />
      <ConfirmDialog
        open={pendingDeleteOverlayId !== null}
        title="Delete this overlay?"
        message="This overlay will be removed from the lesson timeline."
        confirmLabel="Delete"
        loading={removingOverlayId !== null}
        destructive
        onConfirm={() => {
          if (pendingDeleteOverlayId) void remove(pendingDeleteOverlayId);
        }}
        onCancel={() => {
          if (removingOverlayId === null) setPendingDeleteOverlayId(null);
        }}
      />

      <style>{`
        .oe-root {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* ── Generation section ── */
        .oe-gen-section {
          border: 1px solid #1a1a1a;
          border-radius: 0.75rem;
          padding: 0.85rem 1rem;
          background: #080808;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .oe-gen-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }
        .oe-gen-title {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #555;
        }

        /* Generate-ADHD-layer button */
        .oe-adhd-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 0.4rem 0.8rem;
          border: 1px solid #00FFB266;
          color: #00FFB2;
          background: rgba(0,255,178,0.08);
          border-radius: 0.45rem;
          cursor: pointer;
          transition: filter 0.15s, opacity 0.15s, box-shadow 0.2s;
        }
        .oe-adhd-btn:hover:not(:disabled) {
          filter: brightness(1.3);
          box-shadow: 0 0 0 1px #00FFB2, 0 0 14px rgba(0,255,178,0.45);
        }
        .oe-adhd-btn:disabled { opacity: 0.4; cursor: default; }

        /* Import-from-script button */
        .oe-import-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 0.4rem 0.8rem;
          border: 1px solid #9F97ED66;
          color: #9F97ED;
          background: rgba(159,151,237,0.08);
          border-radius: 0.45rem;
          cursor: pointer;
          transition: filter 0.15s, opacity 0.15s, box-shadow 0.2s;
        }
        .oe-import-btn:hover:not(:disabled) {
          filter: brightness(1.3);
          box-shadow: 0 0 0 1px #9F97ED, 0 0 12px rgba(159,151,237,0.4);
        }
        .oe-import-btn:disabled { opacity: 0.4; cursor: default; }
        .oe-import-msg {
          font-size: 0.7rem;
          font-family: ui-monospace, monospace;
          padding: 0.3rem 0.5rem;
          border-radius: 0.3rem;
          background: rgba(255,255,255,0.02);
        }

        /* Section selector row */
        .oe-section-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .oe-section-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #444;
          flex-shrink: 0;
        }
        .oe-section-select {
          flex: 1;
          min-width: 0;
          background: #0f0f0f;
          border: 1px solid #2a2a2a;
          border-radius: 0.4rem;
          padding: 0.35rem 0.6rem;
          font-size: 0.75rem;
          color: #bbb;
          outline: none;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .oe-section-select:focus { border-color: #3a3a3a; }
        .oe-section-select:disabled { opacity: 0.4; cursor: default; }
        .oe-selection-hint {
          font-size: 0.62rem;
          color: #00FFB2;
          background: #00FFB211;
          border: 1px solid #00FFB222;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          flex-shrink: 0;
          white-space: nowrap;
        }

        /* Suggestion row */
        .oe-suggest-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .oe-suggest-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #3a3a3a;
        }
        .oe-suggest-chip {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.18rem 0.5rem;
          border-radius: 4px;
          border: 1px solid;
        }

        /* Suggested button ring pulse */
        .oe-gen-btn-suggested {
          box-shadow: 0 0 0 1px var(--suggest-color, #fff);
          animation: oe-suggest-pulse 1.8s ease-in-out infinite;
        }
        @keyframes oe-suggest-pulse {
          0%, 100% { box-shadow: 0 0 0 1px var(--suggest-color, #fff); }
          50%       { box-shadow: 0 0 0 3px var(--suggest-color, #fff), 0 0 8px var(--suggest-color, #fff); }
        }

        .oe-gen-buttons {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .oe-gen-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.4rem 0.8rem;
          border: 1px solid;
          border-radius: 0.45rem;
          cursor: pointer;
          transition: filter 0.15s, opacity 0.15s;
          min-width: 7rem;
          justify-content: center;
          letter-spacing: 0.02em;
        }
        .oe-gen-btn:disabled { cursor: default; opacity: 0.5; }
        .oe-gen-btn:not(:disabled):hover { filter: brightness(1.4); }

        /* Spinner */
        .oe-spinner {
          width: 10px;
          height: 10px;
          border: 2px solid transparent;
          border-radius: 50%;
          animation: oe-spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes oe-spin { to { transform: rotate(360deg); } }

        /* ── List section ── */
        .oe-list-section { display: flex; flex-direction: column; gap: 0.5rem; }
        .oe-list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .oe-list-count {
          font-size: 0.65rem;
          font-weight: 600;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .oe-state-text {
          font-size: 0.78rem;
          color: #444;
          text-align: center;
          padding: 1.25rem;
        }
        .oe-state-error { color: #ef4444; }

        .oe-list { display: flex; flex-direction: column; gap: 0.4rem; }

        /* ── Overlay card ── */
        .oe-card {
          border: 1px solid;
          border-radius: 0.65rem;
          transition: border-color 0.15s, background 0.15s;
        }
        .oe-card-header {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 0.75rem;
          cursor: pointer;
          user-select: none;
        }
        .oe-drag-handle {
          font-size: 1rem;
          color: #2a2a2a;
          cursor: grab;
          flex-shrink: 0;
        }
        .oe-drag-handle:hover { color: #555; }
        .oe-type-badge {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 0.18rem 0.45rem;
          border-radius: 4px;
          border: 1px solid;
          background: transparent;
          flex-shrink: 0;
        }
        .oe-section-ref {
          font-size: 0.6rem;
          color: #2a2a2a;
          font-family: monospace;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 10rem;
        }
        .oe-cut-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #00FFB2;
          background: rgba(0, 255, 178, 0.08);
          border: 1px solid rgba(0, 255, 178, 0.25);
          border-radius: 3px;
          padding: 0.1rem 0.35rem;
          flex-shrink: 0;
        }
        .oe-pos-badge {
          font-size: 0.6rem;
          color: #2a2a2a;
          font-family: monospace;
          flex-shrink: 0;
        }
        .oe-del-btn {
          font-size: 0.65rem;
          color: #2a2a2a;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.1rem 0.25rem;
          flex-shrink: 0;
          transition: color 0.15s;
        }
        .oe-del-btn:hover { color: #ef4444; }
        .oe-chevron { font-size: 0.55rem; color: #333; flex-shrink: 0; }

        .oe-card-body {
          padding: 0 0.75rem 0.85rem;
          border-top: 1px solid #1a1a1a;
          margin-top: -0.1rem;
          padding-top: 0.75rem;
        }

        /* ── Card data display ── */
        .oe-card-data { display: flex; flex-direction: column; gap: 0.55rem; }
        .oe-data-row {
          display: flex;
          flex-direction: column;
          gap: 0.18rem;
        }
        .oe-data-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #3a3a3a;
        }
        .oe-data-value {
          font-size: 0.78rem;
          color: #aaa;
          line-height: 1.55;
        }
        .oe-italic { font-style: italic; color: #777; }
        .oe-highlight-gold { color: #C9A84C; font-weight: 600; }
        .oe-highlight-red { color: #E85A4A; font-weight: 600; }
        .oe-highlight-teal { color: #5DCAA5; font-weight: 600; }
        .oe-highlight-blue { color: #5DAAF0; font-weight: 600; }

        /* Tags */
        .oe-tags { display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.1rem; }
        .oe-tag {
          font-size: 0.62rem;
          font-weight: 600;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          border: 1px solid #333;
          color: #555;
          background: transparent;
        }
        .oe-tag-gold  { border-color: #C9A84C44; color: #C9A84C; }
        .oe-tag-red   { border-color: #E85A4A44; color: #E85A4A; }
        .oe-tag-teal  { border-color: #5DCAA544; color: #5DCAA5; }
        .oe-tag-purple{ border-color: #9F97ED44; color: #9F97ED; }
        .oe-tag-blue  { border-color: #5DAAF044; color: #5DAAF0; }

        /* Question sprint */
        .oe-question-block {
          border: 1px solid #1a1a1a;
          border-radius: 0.5rem;
          padding: 0.6rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .oe-question-num {
          font-size: 0.6rem;
          font-weight: 700;
          color: #444;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .oe-question-text {
          font-size: 0.8rem;
          color: #ccc;
          line-height: 1.5;
          font-weight: 500;
        }
        .oe-choices { display: flex; flex-direction: column; gap: 0.2rem; }
        .oe-choice {
          font-size: 0.73rem;
          color: #555;
          padding: 0.2rem 0;
        }
        .oe-choice-correct { color: #4ade80; font-weight: 600; }
        .oe-trap {
          font-size: 0.68rem;
          color: #854d0e;
          font-style: italic;
          margin-top: 0.1rem;
        }

        /* Analyzer concept map */
        .oe-concept-map { display: flex; flex-direction: column; gap: 0.3rem; margin-top: 0.1rem; }
        .oe-concept-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .oe-concept-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .oe-concept-name {
          font-size: 0.73rem;
          color: #888;
          flex: 1;
        }
      `}</style>
    </div>
  );
}
