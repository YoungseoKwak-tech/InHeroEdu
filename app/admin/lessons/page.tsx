"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { courses } from "@/lib/data/courses";
import { lessons as lessonDict } from "@/lib/data/lessons";
import { authFetch } from "@/lib/client-auth";
import { resolveCourseId, getCourseIdVariants } from "@/lib/courseAliases";
import ScriptGenerator from "@/components/admin/ScriptGenerator";
import LessonScriptEditor from "@/components/admin/LessonScriptEditor";
import OverlaysEditor from "@/components/admin/OverlaysEditor";
import VideoUploader from "@/components/admin/VideoUploader";
import TextbookTab from "@/components/admin/TextbookTab";
import BatchGeneratePanel from "@/components/admin/BatchGeneratePanel";
import type { LessonPart } from "@/lib/lesson-player-types";

type Tab = "generator" | "script" | "overlays" | "textbook" | "batch";
type OverlayPart = Exclude<LessonPart, { type: "video" }>;
const ADMIN_LESSONS_STATE_KEY = "inhero-admin-lessons-state";

interface ScriptRecord {
  lesson_id: string;
  script: string | null;
  overlays: OverlayPart[] | null;
  materials_url: string | null;
  video_url: string | null;
  script_generated_at: string | null;
  updated_at: string | null;
}

/** A lesson row from /api/admin/lessons */
interface LessonRow {
  id: string;
  course_id: string;
  unit_number: number;
  unit_title: string;
  lesson_number: number;
  title: string;
  topics: string[];
  exam_tip: string;
  hasScript: boolean;
}

/** Item for static (non-unit) courses (legacy lessonIds) */
interface AdminItem {
  id: string;
  title: string;
  subtitle: string;
  courseId: string;
  order: number;
  kind: "lesson" | "unit";
}

/** Build sidebar metadata from courses.ts — static items only for courses with lessonIds */
const ALL_COURSES = courses.map((c) => {
  const items: AdminItem[] = [];

  if (c.lessonIds.length > 0) {
    c.lessonIds.forEach((lid) => {
      const l = lessonDict[lid];
      if (!l) return;
      items.push({
        id: l.id,
        title: l.titleEn,
        subtitle: `Lesson ${l.order} · ${l.duration}`,
        courseId: c.id,
        order: l.order,
        kind: "lesson",
      });
    });
  }

  return {
    courseId: c.id,
    courseName: c.subjectEn,
    icon: c.icon,
    category: c.category,
    /** True for AP/CB courses that use the lessons DB instead of lessonIds */
    hasUnits: !!(c.units?.length) && c.lessonIds.length === 0,
    items,
  };
});

const CATEGORY_ORDER = ["AP", "Honors", "Core", "Competition", "Test Prep"];
const BY_CATEGORY = CATEGORY_ORDER.map((cat) => ({
  category: cat,
  courses: ALL_COURSES.filter((c) => c.category === cat),
})).filter((g) => g.courses.length > 0);

export default function AdminLessonsPage() {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(
    ALL_COURSES[0]?.courseId ?? null
  );
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("generator");
  const [scriptRecord, setScriptRecord] = useState<ScriptRecord | null>(null);
  const [loadingRecord, setLoadingRecord] = useState(false);
  const [loadedLessons, setLoadedLessons] = useState<Map<string, LessonRow[]>>(new Map());
  const [loadingCourses, setLoadingCourses] = useState<Set<string>>(new Set());
  const [courseLoadErrors, setCourseLoadErrors] = useState<Map<string, string>>(new Map());
  const [selectedSection, setSelectedSection] = useState<string>("");

  // Track which courses have been fetched (avoids double-fetch)
  const fetchedCourses = useRef<Set<string>>(new Set());
  const retryCounts = useRef<Map<string, number>>(new Map());

  // ── Derived selection state ─────────────────────────────────────────────
  // courses.ts ids and the data-layer ids can differ (e.g. courses.ts
  // "ap-physics-c-mech" vs the lessons table "ap-physics-c-mechanics").
  // /api/admin/lessons returns rows carrying the DB course_id, so a click
  // can set selectedCourseId to the long form while loadedLessons is keyed
  // by the short form. Resolve every selection lookup across id variants
  // so the right panel never goes blank on an aliased course.
  const selectedVariants = selectedCourseId ? getCourseIdVariants(selectedCourseId) : [];
  const variantMatch = (id: string | null | undefined) =>
    !!id && selectedVariants.includes(id);

  const selectedCourse = selectedCourseId
    ? courses.find((c) => variantMatch(c.id)) ?? null
    : null;

  const selectedLessonsList: LessonRow[] = selectedCourseId
    ? (selectedVariants.map((v) => loadedLessons.get(v)).find((arr) => arr && arr.length) ?? [])
    : [];

  const selectedLesson: LessonRow | null =
    selectedItemId && selectedCourseId
      ? (selectedLessonsList.find((l) => l.id === selectedItemId) ?? null)
      : null;

  const selectedStaticItem: AdminItem | null =
    selectedItemId && selectedCourseId
      ? (ALL_COURSES.find((c) => variantMatch(c.courseId))
          ?.items.find((i) => i.id === selectedItemId) ?? null)
      : null;

  const selectedTitle = selectedLesson?.title ?? selectedStaticItem?.title ?? null;
  const selectedKind: "lesson" | "unit" | null =
    selectedLesson ? "lesson" : selectedStaticItem?.kind ?? null;
  const selectedSubtitle = selectedLesson
    ? `Lesson ${selectedLesson.lesson_number} · ${selectedLesson.unit_title}`
    : selectedStaticItem?.subtitle ?? null;

  // ── Load lessons from API ───────────────────────────────────────────────
  const loadCourseLessons = useCallback(async (courseId: string, force = false) => {
    if (!force && fetchedCourses.current.has(courseId)) return;
    fetchedCourses.current.add(courseId);

    setLoadingCourses((prev) => new Set(prev).add(courseId));
    try {
      const res = await authFetch(`/api/admin/lessons?courseId=${courseId}`);
      if (res.ok) {
        const json = await res.json();
        setLoadedLessons((prev) => new Map(prev).set(courseId, json.data ?? []));
        setCourseLoadErrors((prev) => {
          const next = new Map(prev);
          next.delete(courseId);
          return next;
        });
        retryCounts.current.delete(courseId);
      } else {
        fetchedCourses.current.delete(courseId);
        const raw = await res.text().catch(() => "");
        let message = `Failed to load lessons (${res.status})`;
        try {
          const json = raw ? JSON.parse(raw) as { error?: string } : {};
          if (json.error) message = json.error;
        } catch {
          if (raw) message = raw;
        }

        const retries = retryCounts.current.get(courseId) ?? 0;
        if (res.status === 401 && retries < 2) {
          retryCounts.current.set(courseId, retries + 1);
          setCourseLoadErrors((prev) => new Map(prev).set(courseId, "Reconnecting admin session…"));
          setTimeout(() => {
            void loadCourseLessons(courseId, true);
          }, 500 * (retries + 1));
          return;
        }

        setCourseLoadErrors((prev) => new Map(prev).set(courseId, message));
      }
    } catch (error) {
      fetchedCourses.current.delete(courseId);
      const message = error instanceof Error ? error.message : "Unexpected error while loading lessons";
      setCourseLoadErrors((prev) => new Map(prev).set(courseId, message));
    } finally {
      setLoadingCourses((prev) => {
        const next = new Set(prev);
        next.delete(courseId);
        return next;
      });
    }
  }, []);

  useEffect(() => {
    if (!expandedCourse) return;
    const courseData = ALL_COURSES.find((c) => c.courseId === expandedCourse);
    if (!courseData?.hasUnits) return;
    if (loadingCourses.has(expandedCourse)) return;
    if ((loadedLessons.get(expandedCourse)?.length ?? 0) > 0) return;
    if (courseLoadErrors.has(expandedCourse)) return;

    void loadCourseLessons(expandedCourse);
  }, [expandedCourse, loadedLessons, loadingCourses, loadCourseLessons, courseLoadErrors]);

  function toggleCourse(courseId: string) {
    const isOpening = expandedCourse !== courseId;
    setExpandedCourse(isOpening ? courseId : null);

    if (isOpening) {
      const courseData = ALL_COURSES.find((c) => c.courseId === courseId);
      if (courseData?.hasUnits) {
        loadCourseLessons(courseId);
      }
    }
  }

  function toggleUnit(unitKey: string) {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(unitKey)) next.delete(unitKey);
      else next.add(unitKey);
      return next;
    });
  }

  function selectLesson(lesson: LessonRow) {
    setSelectedItemId(lesson.id);
    setSelectedCourseId(lesson.course_id);
    setScriptRecord(null);
    setSelectedSection("");
    setActiveTab("generator");
  }

  function selectStaticItem(item: AdminItem) {
    setSelectedItemId(item.id);
    setSelectedCourseId(item.courseId);
    setScriptRecord(null);
    setSelectedSection("");
    setActiveTab("generator");
  }

  // ── Persist / restore local state ─────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(ADMIN_LESSONS_STATE_KEY);
      if (!raw) return;

      const saved = JSON.parse(raw) as {
        selectedItemId?: string;
        selectedCourseId?: string;
        activeTab?: Tab;
        expandedCourse?: string | null;
      };

      if (saved.expandedCourse && ALL_COURSES.some((c) => c.courseId === saved.expandedCourse)) {
        setExpandedCourse(saved.expandedCourse);
        const courseData = ALL_COURSES.find((c) => c.courseId === saved.expandedCourse);
        if (courseData?.hasUnits) {
          loadCourseLessons(saved.expandedCourse);
        }
      }

      if (saved.selectedCourseId) {
        setSelectedCourseId(saved.selectedCourseId);
        if (saved.selectedItemId) setSelectedItemId(saved.selectedItemId);
      }

      if (saved.activeTab && ["generator", "script", "overlays", "textbook", "batch"].includes(saved.activeTab)) {
        setActiveTab(saved.activeTab as Tab);
      }
    } catch (error) {
      console.warn("[AdminLessonsPage] Failed to restore local state", error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        ADMIN_LESSONS_STATE_KEY,
        JSON.stringify({ selectedItemId, selectedCourseId, activeTab, expandedCourse })
      );
    } catch (error) {
      console.warn("[AdminLessonsPage] Failed to persist local state", error);
    }
  }, [selectedItemId, selectedCourseId, activeTab, expandedCourse]);

  // ── Fetch script record ────────────────────────────────────────────────
  const fetchRecord = useCallback(async (itemId: string) => {
    setLoadingRecord(true);
    try {
      const res = await authFetch(`/api/admin/lesson-scripts?lessonId=${itemId}`);
      if (res.ok) {
        const json = await res.json();
        setScriptRecord(json.data ?? null);
      }
    } finally {
      setLoadingRecord(false);
    }
  }, []);

  useEffect(() => {
    if (selectedItemId) fetchRecord(selectedItemId);
  }, [selectedItemId, fetchRecord]);

  // ── After script generated: auto-parse OVERLAYS JSON block ────────────
  function handleScriptGenerated(script: string) {
    setScriptRecord((prev) => ({
      ...(prev ?? {
        lesson_id: selectedItemId!,
        materials_url: null,
        video_url: null,
        script_generated_at: null,
        updated_at: null,
        overlays: null,
      }),
      script,
      lesson_id: selectedItemId!,
      script_generated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    const marker = "OVERLAYS JSON:";
    const markerIdx = script.indexOf(marker);
    if (markerIdx !== -1) {
      const jsonStart = script.indexOf("[", markerIdx);
      if (jsonStart !== -1) {
        let depth = 0, jsonEnd = jsonStart;
        for (let i = jsonStart; i < script.length; i++) {
          if (script[i] === "[") depth++;
          else if (script[i] === "]") {
            depth--;
            if (depth === 0) { jsonEnd = i; break; }
          }
        }
        try {
          const parsed = JSON.parse(script.slice(jsonStart, jsonEnd + 1));
          if (Array.isArray(parsed)) {
            setScriptRecord((prev) => prev ? { ...prev, overlays: parsed as OverlayPart[] } : prev);
          }
        } catch { /* noop */ }
      }
    }

    // Refresh hasScript dot for this lesson. Resolve the actual map key
    // across id variants (loadedLessons may be keyed by a different course
    // id form than selectedCourseId — see the derived-selection note above).
    if (selectedCourseId && selectedItemId) {
      setLoadedLessons((prev) => {
        const key =
          getCourseIdVariants(selectedCourseId).find((v) => prev.has(v)) ?? selectedCourseId;
        const lessons = prev.get(key);
        if (!lessons) return prev;
        return new Map(prev).set(
          key,
          lessons.map((l) => l.id === selectedItemId ? { ...l, hasScript: true } : l)
        );
      });
    }

    setActiveTab("script");
  }

  function handleScriptSaved(script: string) {
    setScriptRecord((prev) =>
      prev ? { ...prev, script, updated_at: new Date().toISOString() } : prev
    );
  }

  function handleOverlaysSaved(overlays: OverlayPart[]) {
    setScriptRecord((prev) =>
      prev ? { ...prev, overlays, updated_at: new Date().toISOString() } : prev
    );
  }

  // ── Group lessons by unit ─────────────────────────────────────────────
  function groupByUnit(lessons: LessonRow[]) {
    const map = new Map<number, { unitTitle: string; lessons: LessonRow[] }>();
    for (const l of lessons) {
      if (!map.has(l.unit_number)) {
        map.set(l.unit_number, { unitTitle: l.unit_title, lessons: [] });
      }
      map.get(l.unit_number)!.lessons.push(l);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a - b);
  }

  const hasSelection = !!(selectedTitle && selectedKind);
  const totalLessonsLoaded = Array.from(loadedLessons.values()).reduce((n, ls) => n + ls.length, 0);

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="alp-root">

      {/* ── Sidebar ── */}
      <aside className="alp-sidebar">
        <div className="alp-sidebar-header">
          <span className="alp-sidebar-title">All Courses</span>
          <span className="alp-sidebar-count">{ALL_COURSES.length}</span>
        </div>

        <div className="alp-course-tree">
          {BY_CATEGORY.map(({ category, courses: catCourses }) => (
            <div key={category}>
              <div className="alp-category-label">{category}</div>
              {catCourses.map(({ courseId, courseName, icon, hasUnits, items }) => {
                const isOpen = expandedCourse === courseId;
                const isLoadingCourse = loadingCourses.has(courseId);
                const courseLoadError = courseLoadErrors.get(courseId);
                const courseLessons = loadedLessons.get(courseId) ?? [];
                const unitGroups = hasUnits ? groupByUnit(courseLessons) : [];
                const itemCount = hasUnits ? courseLessons.length : items.length;

                return (
                  <div key={courseId}>
                    <button
                      className={`alp-course-btn ${isOpen ? "alp-course-btn-open" : ""}`}
                      onClick={() => toggleCourse(courseId)}
                    >
                      <span className="alp-course-icon">{icon}</span>
                      <span className="alp-course-name">{courseName}</span>
                      {isLoadingCourse
                        ? <span className="alp-spinner-xs" />
                        : <span className="alp-item-count">{itemCount || "—"}</span>
                      }
                      <span className="alp-chevron">{isOpen ? "▲" : "▼"}</span>
                    </button>

                    {isOpen && (
                      <div className="alp-item-list">
                        {/* ── AP/CB course: unit → lessons tree ── */}
                        {hasUnits && (
                          <>
                            {isLoadingCourse && (
                              <div className="alp-no-items">Loading lessons…</div>
                            )}
                            {!isLoadingCourse && courseLoadError && (
                              <div className="alp-no-items">{courseLoadError}</div>
                            )}
                            {!isLoadingCourse && !courseLoadError && unitGroups.length === 0 && (
                              <div className="alp-no-items">No lessons found — seed DB first</div>
                            )}
                            {unitGroups.map(([unitNum, { unitTitle, lessons }]) => {
                              const unitKey = `${courseId}-u${unitNum}`;
                              const isUnitOpen = expandedUnits.has(unitKey);
                              const scriptCount = lessons.filter((l) => l.hasScript).length;

                              return (
                                <div key={unitKey}>
                                  <button
                                    className="alp-unit-btn"
                                    onClick={() => toggleUnit(unitKey)}
                                  >
                                    <span className="alp-unit-chevron">{isUnitOpen ? "▾" : "▸"}</span>
                                    <span className="alp-unit-label">
                                      Unit {unitNum}
                                    </span>
                                    <span className="alp-unit-count">
                                      {scriptCount}/{lessons.length}
                                    </span>
                                  </button>

                                  {isUnitOpen && (
                                    <div className="alp-lesson-list">
                                      {lessons.map((lesson) => (
                                        <button
                                          key={lesson.id}
                                          className={`alp-lesson-btn ${selectedItemId === lesson.id ? "alp-lesson-btn-active" : ""}`}
                                          onClick={() => selectLesson(lesson)}
                                        >
                                          <span
                                            className="alp-script-dot"
                                            style={{ color: lesson.hasScript ? "#00FFB2" : "#333" }}
                                            title={lesson.hasScript ? "Script generated" : "No script"}
                                          >●</span>
                                          <span className="alp-lesson-num">{lesson.lesson_number}</span>
                                          <span className="alp-lesson-title">{lesson.title}</span>
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </>
                        )}

                        {/* ── Legacy course: flat lesson list ── */}
                        {!hasUnits && (
                          <>
                            {items.length === 0 ? (
                              <div className="alp-no-items">No lessons defined yet</div>
                            ) : (
                              items.map((item) => (
                                <button
                                  key={item.id}
                                  className={`alp-item-btn ${selectedItemId === item.id ? "alp-item-btn-active" : ""}`}
                                  onClick={() => selectStaticItem(item)}
                                >
                                  <span className="alp-item-order">{item.order}</span>
                                  <span className="alp-item-title">{item.title}</span>
                                </button>
                              ))
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main panel ── */}
      <main className="alp-main">
        {!hasSelection ? (
          <div className="alp-empty-state">
            <div className="alp-empty-icon">📝</div>
            <p className="alp-empty-title">Select a lesson</p>
            <p className="alp-empty-sub">
              Upload materials → Generate script → Edit overlays → Save
            </p>
            <p className="alp-empty-sub" style={{ marginTop: "0.25rem" }}>
              {ALL_COURSES.length} courses
              {totalLessonsLoaded > 0 && ` · ${totalLessonsLoaded} lessons loaded`}
            </p>
          </div>
        ) : (
          <>
            {/* Lesson header */}
            <div className="alp-item-header">
              <div>
                <p className="alp-item-breadcrumb">
                  {selectedCourse?.subjectEn}
                  <span className="alp-breadcrumb-sep">›</span>
                  <span className={`alp-kind-tag alp-kind-${selectedKind}`}>
                    {selectedKind === "lesson" ? "Lesson" : "Unit"}
                  </span>
                </p>
                <h1 className="alp-item-title-text">{selectedTitle}</h1>
                <p className="alp-item-subtitle">{selectedSubtitle}</p>
              </div>
              <div className="alp-item-meta">
                {scriptRecord?.script_generated_at && (
                  <span className="alp-meta-badge alp-meta-green">✓ Script generated</span>
                )}
                {scriptRecord?.materials_url && (
                  <span className="alp-meta-badge">📄 {scriptRecord.materials_url}</span>
                )}
                {scriptRecord?.overlays && scriptRecord.overlays.length > 0 && (
                  <span className="alp-meta-badge alp-meta-purple">
                    ⚡ {scriptRecord.overlays.length} overlays
                  </span>
                )}
                {loadingRecord && <span className="alp-spinner-sm" />}
              </div>
            </div>

            {/* Video uploader strip */}
            {selectedKind === "lesson" && selectedItemId && (
              <div className="alp-video-strip">
                <VideoUploader
                  lessonId={selectedItemId}
                  currentUrl={scriptRecord?.video_url ?? null}
                  onSaved={(url) =>
                    setScriptRecord((prev) =>
                      prev ? { ...prev, video_url: url } : prev
                    )
                  }
                />
              </div>
            )}

            {/* Tabs */}
            <div className="alp-tabs">
              {(["generator", "script", "overlays", "textbook", "batch"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`alp-tab ${activeTab === tab ? "alp-tab-active" : ""}`}
                >
                  {tab === "generator" && "✦ Script Generator"}
                  {tab === "script"    && "✎ Script Editor"}
                  {tab === "overlays"  && "⚡ Overlays Editor"}
                  {tab === "textbook"  && "📖 Textbook"}
                  {tab === "batch"     && "⚡ Batch Generate"}
                </button>
              ))}
              {selectedKind === "lesson" && selectedCourseId && selectedItemId && (
                  <a
                  href={`/courses/${resolveCourseId(selectedCourseId)}/${selectedItemId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="alp-tab alp-tab-link"
                >
                  ↗ View Live
                </a>
              )}
            </div>

            {/* Tab content */}
            <div className="alp-content">
              {activeTab === "generator" && (
                <ScriptGenerator
                  lessonId={selectedItemId!}
                  lessonTitle={selectedTitle!}
                  courseId={selectedCourseId!}
                  onScriptGenerated={handleScriptGenerated}
                />
              )}
              {activeTab === "script" && (
                <LessonScriptEditor
                  lessonId={selectedItemId!}
                  courseId={selectedCourseId!}
                  initialScript={scriptRecord?.script ?? ""}
                  onSave={handleScriptSaved}
                  onSelectionChange={setSelectedSection}
                />
              )}
              {activeTab === "overlays" && (
                <OverlaysEditor
                  lessonId={selectedItemId!}
                  lessonTitle={selectedTitle ?? ""}
                  subject={selectedCourse?.subjectEn ?? ""}
                  unit={selectedLesson?.unit_title ?? selectedStaticItem?.subtitle ?? ""}
                  fullScript={scriptRecord?.script ?? ""}
                  selectedSection={selectedSection}
                  initialOverlays={(scriptRecord?.overlays ?? []) as OverlayPart[]}
                  onSave={handleOverlaysSaved}
                />
              )}
              {activeTab === "textbook" && (
                <TextbookTab
                  lessonId={selectedItemId!}
                  lessonTitle={selectedTitle ?? ""}
                  subject={selectedCourse?.subjectEn ?? ""}
                  unit={selectedLesson?.unit_title ?? selectedStaticItem?.subtitle ?? ""}
                  category={selectedCourse?.category ?? ""}
                  script={scriptRecord?.script ?? ""}
                />
              )}
              {activeTab === "batch" && selectedCourseId && (
                <BatchGeneratePanel
                  courseId={selectedCourseId}
                  courseName={selectedCourse?.subjectEn ?? selectedCourseId}
                />
              )}
            </div>
          </>
        )}
      </main>

      <style>{`
        .alp-root {
          display: flex;
          min-height: calc(100vh - 4rem);
          background: #0a0a0a;
          font-family: 'Inter', system-ui, sans-serif;
          color: #e5e5e5;
        }

        /* ── Sidebar ── */
        .alp-sidebar {
          width: 260px;
          flex-shrink: 0;
          border-right: 1px solid #1a1a1a;
          display: flex;
          flex-direction: column;
          background: #0d0d0d;
          overflow: hidden;
        }
        .alp-sidebar-header {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #1a1a1a;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .alp-sidebar-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #555;
          flex: 1;
        }
        .alp-sidebar-count {
          font-size: 0.65rem;
          color: #444;
          background: #1a1a1a;
          padding: 0.1rem 0.45rem;
          border-radius: 9999px;
        }
        .alp-course-tree {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem 0 1rem;
        }
        .alp-category-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #333;
          padding: 0.6rem 0.85rem 0.2rem;
        }

        .alp-course-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.48rem 0.85rem;
          background: none;
          border: none;
          color: #777;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          transition: background 0.1s, color 0.1s;
        }
        .alp-course-btn:hover { background: #141414; color: #bbb; }
        .alp-course-btn-open { color: #e5e5e5; background: #141414; }
        .alp-course-icon { font-size: 0.85rem; flex-shrink: 0; }
        .alp-course-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.73rem;
        }
        .alp-item-count {
          font-size: 0.6rem;
          color: #3a3a3a;
          background: #1a1a1a;
          padding: 0.1rem 0.35rem;
          border-radius: 9999px;
          flex-shrink: 0;
        }
        .alp-chevron { font-size: 0.52rem; color: #3a3a3a; flex-shrink: 0; }

        /* ── Item list (wraps both unit tree and legacy flat list) ── */
        .alp-item-list {
          padding: 0.1rem 0 0.3rem 0;
        }
        .alp-no-items {
          font-size: 0.68rem;
          color: #333;
          padding: 0.3rem 1rem 0.3rem 2.2rem;
          font-style: italic;
        }

        /* ── Unit header row ── */
        .alp-unit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.32rem 0.85rem 0.32rem 1.6rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }
        .alp-unit-btn:hover .alp-unit-label { color: #888; }
        .alp-unit-chevron {
          font-size: 0.7rem;
          color: #333;
          width: 0.6rem;
          flex-shrink: 0;
        }
        .alp-unit-label {
          flex: 1;
          font-size: 0.65rem;
          font-weight: 700;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: color 0.1s;
        }
        .alp-unit-count {
          font-size: 0.58rem;
          color: #2a2a2a;
          background: #161616;
          padding: 0.08rem 0.3rem;
          border-radius: 9999px;
          flex-shrink: 0;
        }

        /* ── Lesson rows ── */
        .alp-lesson-list {
          padding: 0 0 0.2rem 0;
        }
        .alp-lesson-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          width: 100%;
          padding: 0.3rem 0.7rem 0.3rem 2.5rem;
          background: none;
          border: none;
          color: #555;
          font-size: 0.69rem;
          cursor: pointer;
          text-align: left;
          transition: background 0.1s, color 0.1s;
        }
        .alp-lesson-btn:hover { background: #141414; color: #aaa; }
        .alp-lesson-btn-active { background: #141414 !important; color: #e5e5e5 !important; }
        .alp-script-dot {
          font-size: 0.55rem;
          flex-shrink: 0;
          transition: color 0.15s;
        }
        .alp-lesson-num {
          font-size: 0.58rem;
          color: #2a2a2a;
          background: #161616;
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-weight: 700;
        }
        .alp-lesson-btn-active .alp-lesson-num { color: #555; }
        .alp-lesson-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }

        /* ── Legacy flat item list ── */
        .alp-item-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          width: 100%;
          padding: 0.38rem 0.55rem 0.38rem 2rem;
          background: none;
          border: none;
          color: #555;
          font-size: 0.71rem;
          cursor: pointer;
          text-align: left;
          border-radius: 0.35rem;
          transition: background 0.1s, color 0.1s;
        }
        .alp-item-btn:hover { background: #141414; color: #aaa; }
        .alp-item-btn-active { background: #141414 !important; color: #00FFB2 !important; }
        .alp-item-order {
          font-size: 0.58rem;
          color: #333;
          background: #1a1a1a;
          width: 1.15rem;
          height: 1.15rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-weight: 700;
        }
        .alp-item-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }

        /* ── Spinner ── */
        .alp-spinner-xs {
          width: 0.65rem; height: 0.65rem;
          border-radius: 50%;
          border: 1.5px solid #222;
          border-top-color: #555;
          animation: alp-spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        /* ── Main ── */
        .alp-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .alp-empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          color: #444;
          padding: 2rem;
          text-align: center;
        }
        .alp-empty-icon  { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .alp-empty-title { font-size: 0.9rem; font-weight: 600; color: #555; }
        .alp-empty-sub   { font-size: 0.75rem; color: #3a3a3a; }

        /* Item header */
        .alp-item-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 1.1rem 1.5rem 0.85rem;
          border-bottom: 1px solid #1a1a1a;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .alp-item-breadcrumb {
          font-size: 0.68rem;
          color: #555;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .alp-breadcrumb-sep { color: #333; }
        .alp-kind-tag {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 0.15rem 0.4rem;
          border-radius: 3px;
          text-transform: uppercase;
        }
        .alp-kind-lesson { background: rgba(0,255,178,0.08); color: #00FFB2; }
        .alp-kind-unit   { background: rgba(167,139,250,0.1); color: #A78BFA; }

        .alp-item-title-text { font-size: 1rem; font-weight: 800; color: #fff; }
        .alp-item-subtitle   { font-size: 0.7rem; color: #555; margin-top: 0.15rem; }

        .alp-item-meta { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }
        .alp-meta-badge {
          font-size: 0.63rem;
          font-weight: 600;
          padding: 0.18rem 0.5rem;
          background: #1a1a1a;
          border-radius: 9999px;
          color: #555;
          white-space: nowrap;
        }
        .alp-meta-green  { color: #00FFB2; background: rgba(0,255,178,0.06); }
        .alp-meta-purple { color: #A78BFA; background: rgba(167,139,250,0.08); }

        .alp-spinner-sm {
          width: 0.85rem; height: 0.85rem;
          border-radius: 50%;
          border: 2px solid #222;
          border-top-color: #00FFB2;
          animation: alp-spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes alp-spin { to { transform: rotate(360deg); } }

        /* Video strip */
        .alp-video-strip {
          padding: 0.75rem 1.5rem;
          border-bottom: 1px solid #141414;
          background: #0a0a0a;
        }

        /* Tabs */
        .alp-tabs {
          display: flex;
          border-bottom: 1px solid #1a1a1a;
          padding: 0 1.5rem;
          background: #0d0d0d;
        }
        .alp-tab {
          padding: 0.65rem 0.9rem;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          font-size: 0.76rem;
          font-weight: 600;
          color: #555;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
          white-space: nowrap;
          text-decoration: none;
        }
        .alp-tab:hover { color: #aaa; }
        .alp-tab-active { color: #00FFB2; border-bottom-color: #00FFB2; }
        .alp-tab-link { margin-left: auto; color: #444; }
        .alp-tab-link:hover { color: #888; }

        /* Content */
        .alp-content {
          flex: 1;
          padding: 1.25rem 1.5rem;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .alp-root      { flex-direction: column; }
          .alp-sidebar   { width: 100%; max-height: 40vh; border-right: none; border-bottom: 1px solid #1a1a1a; }
        }
      `}</style>
    </div>
  );
}
