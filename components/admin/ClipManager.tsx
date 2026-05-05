"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { createBrowserClient } from "@/lib/supabase";
import { authFetch } from "@/lib/client-auth";
import type { ScriptSection } from "@/lib/parseScript";
import type { OverlayRow } from "@/lib/overlays";
import {
  getClipBaseTitle,
  getClipPartNumber,
  isClipSectionTitle,
  normalizeClipTitle,
} from "@/lib/lessonClipUtils";
import { formatStorageUploadLimit, getStorageUploadLimitBytes } from "@/lib/storageUpload";

interface LessonClipLocal {
  id: string;
  section_title: string;
  section_index: number;
  clip_url: string | null;
}

interface Props {
  lessonId: string;
  sections: ScriptSection[];
  overlays: OverlayRow[];
}

interface PreparedClipUpload {
  bucket: string;
  path: string;
  token: string;
  publicUrl: string;
}

const MAX_CLIP_BYTES = getStorageUploadLimitBytes();
const MAX_CLIP_LABEL = formatStorageUploadLimit(MAX_CLIP_BYTES);

function formatUploadError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (/unauthorized/i.test(message)) {
    return "Your admin session expired. Refresh and sign in again.";
  }
  if (/forbidden/i.test(message)) {
    return "This account does not have admin access to upload lesson clips.";
  }
  if (/maximum allowed size/i.test(message)) {
    return `Clip too large. The current storage limit is ${MAX_CLIP_LABEL} per file.`;
  }
  return message;
}

// 8px dot color per overlay type
const TYPE_DOT: Record<string, string> = {
  spark:           "#C9A84C",
  gap_crunch:      "#E85A4A",
  teach_back:      "#5DCAA5",
  question_sprint: "#9F97ED",
  analyzer:        "#378ADD",
};

export default function ClipManager({ lessonId, sections, overlays }: Props) {
  const [clips, setClips]     = useState<LessonClipLocal[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deletingClipId, setDeletingClipId] = useState<string | null>(null);
  // progress per UI row key: 0–100 or undefined
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const clipSections = useMemo(
    () =>
      sections
        .map((section, originalIndex) => ({
          section,
          originalIndex,
          rowKey: `${normalizeClipTitle(section.title)}::${originalIndex}`,
        }))
        .filter(({ section }) => isClipSectionTitle(section.title)),
    [sections]
  );

  useEffect(() => {
    if (!lessonId) return;
    setLoadError(null);
    authFetch(`/api/lesson-clips?lessonId=${lessonId}`)
      .then(async (r) => {
        const j = await r.json().catch(() => ({})) as {
          ok?: boolean;
          data?: LessonClipLocal[];
          error?: string;
        };
        if (!r.ok || !j.ok) {
          throw new Error(j.error ?? `Failed to load clips (${r.status})`);
        }
        setClips(j.data ?? []);
      })
      .catch((error) => {
        setLoadError(formatUploadError(error));
      });
  }, [lessonId]);

  function clipsFor(title: string): LessonClipLocal[] {
    return clips
      .filter((clip) => normalizeClipTitle(clip.section_title) === normalizeClipTitle(title))
      .sort((a, b) => getClipPartNumber(a.section_title) - getClipPartNumber(b.section_title));
  }

  function overlayFor(title: string): OverlayRow | undefined {
    return overlays.find(
      (o) => o.script_section_ref?.toUpperCase() === title.toUpperCase()
    );
  }

  async function uploadSingleFile(
    file: File,
    section: ScriptSection,
    sectionIndex: number,
    rowKey: string,
    batchIndex: number,
    totalFiles: number
  ) {
    const supabase = createBrowserClient();
    setProgress((p) => ({ ...p, [rowKey]: Math.max(5, Math.round((batchIndex / totalFiles) * 100)) }));

    const prepareRes = await authFetch("/api/admin/prepare-clip-upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lessonId,
        sectionTitle: section.title,
        fileName: file.name,
      }),
    });
    if (!prepareRes.ok) {
      const j = await prepareRes.json().catch(() => ({})) as { error?: string };
      throw new Error(j.error ?? `Prepare upload failed (${prepareRes.status})`);
    }

    const prepared = await prepareRes.json() as PreparedClipUpload;

    const { error: upErr } = await supabase.storage
      .from(prepared.bucket)
      .uploadToSignedUrl(prepared.path, prepared.token, file, { contentType: file.type });
    if (upErr) throw new Error(upErr.message);
    setProgress((p) => ({ ...p, [rowKey]: Math.min(95, Math.round(((batchIndex + 0.75) / totalFiles) * 100)) }));

    const res = await authFetch("/api/upload/clip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lessonId,
        sectionTitle: section.title,
        sectionIndex,
        clipUrl: prepared.publicUrl,
      }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({})) as { error?: string };
      throw new Error(j.error ?? `HTTP ${res.status}`);
    }
    const j = await res.json() as { data: LessonClipLocal };
    setClips((prev) => [...prev, j.data].sort(
      (a, b) =>
        a.section_index - b.section_index ||
        getClipPartNumber(a.section_title) - getClipPartNumber(b.section_title)
    ));
  }

  async function handleFiles(files: File[], section: ScriptSection, sectionIndex: number, rowKey: string) {
    if (files.length === 0) return;
    if (files.some((file) => !file.type.startsWith("video/"))) {
      setErrors((e) => ({ ...e, [rowKey]: "Please select only video files." }));
      return;
    }
    if (files.some((file) => file.size > MAX_CLIP_BYTES)) {
      setErrors((e) => ({
        ...e,
        [rowKey]: `Clip too large. The current storage limit is ${MAX_CLIP_LABEL} per file.`,
      }));
      return;
    }

    setErrors((e) => { const n = { ...e }; delete n[rowKey]; return n; });
    setProgress((p) => ({ ...p, [rowKey]: 5 }));

    try {
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        await uploadSingleFile(file, section, sectionIndex, rowKey, index, files.length);
      }
      setProgress((p) => ({ ...p, [rowKey]: 100 }));
      setTimeout(() => setProgress((p) => { const n = { ...p }; delete n[rowKey]; return n; }), 900);
    } catch (err) {
      setErrors((e) => ({ ...e, [rowKey]: formatUploadError(err) }));
      setProgress((p) => { const n = { ...p }; delete n[rowKey]; return n; });
    } finally {
      if (inputRefs.current[rowKey]) inputRefs.current[rowKey]!.value = "";
    }
  }

  async function removeClip(clip: LessonClipLocal, rowKey: string) {
    setErrors((e) => { const n = { ...e }; delete n[rowKey]; return n; });
    setDeletingClipId(clip.id);

    try {
      const res = await authFetch("/api/lesson-clips", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clipId: clip.id }),
      });
      const j = await res.json().catch(() => ({})) as {
        ok?: boolean;
        data?: LessonClipLocal[];
        error?: string;
      };
      if (!res.ok || !j.ok) {
        throw new Error(j.error ?? `Delete failed (${res.status})`);
      }
      setClips(j.data ?? []);
    } catch (err) {
      setErrors((e) => ({ ...e, [rowKey]: formatUploadError(err) }));
    } finally {
      setDeletingClipId(null);
    }
  }

  if (clipSections.length === 0) return null;

  const uploaded = clipSections.filter(({ section }) =>
    clipsFor(section.title).some((clip) => !!clip.clip_url)
  ).length;

  return (
    <div className="cm-root">
      {/* Header */}
      <div className="cm-header">
        <span className="cm-label">VIDEO CLIPS</span>
        <span className="cm-count">{uploaded}/{clipSections.length} uploaded</span>
      </div>
      {loadError && <div className="cm-load-err">{loadError}</div>}

      {/* Rows */}
      {clipSections.map(({ section, originalIndex, rowKey }) => {
        const sectionClips = clipsFor(section.title);
        const overlay   = overlayFor(section.title);
        const dotColor  = overlay ? (TYPE_DOT[overlay.type] ?? "#2a4060") : "#1e3050";
        const pct       = progress[rowKey];
        const isLoading = pct !== undefined && pct < 100;
        const hasClip   = sectionClips.length > 0;
        const err       = errors[rowKey];
        const rowDeleting = sectionClips.some((clip) => clip.id === deletingClipId);

        return (
          <div key={rowKey} className="cm-row">
            {/* Dot badge */}
            <span
              className="cm-dot"
              style={{ background: hasClip ? dotColor : "transparent", borderColor: dotColor }}
              title={overlay ? overlay.type : "no overlay"}
            />

            {/* Title + timestamp */}
            <div className="cm-info">
              <span className="cm-title">{section.title}</span>
              {section.timestamp && (
                <span className="cm-ts">· {section.timestamp}</span>
              )}
            </div>

            {/* Status / progress */}
            <div className="cm-status">
              {isLoading ? (
                <div className="cm-bar-track">
                  <div className="cm-bar-fill" style={{ width: `${pct}%` }} />
                </div>
              ) : hasClip ? (
                <span className="cm-ok">
                  ✓ {sectionClips.length} clip{sectionClips.length !== 1 ? "s" : ""}
                  {sectionClips.length > 1 ? " · ordered" : ""}
                </span>
              ) : (
                <span className="cm-none">no clip</span>
              )}
            </div>

            {/* Upload button + hidden input */}
            <input
              type="file"
              accept="video/*"
              multiple
              style={{ display: "none" }}
              ref={(el) => { inputRefs.current[rowKey] = el; }}
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                if (files.length > 0) handleFiles(files, section, originalIndex, rowKey);
              }}
            />
            <button
              type="button"
              className="cm-btn"
              disabled={isLoading || rowDeleting}
              onClick={() => inputRefs.current[rowKey]?.click()}
            >
              {hasClip ? "Add clip ↑" : "Upload clip ↑"}
            </button>

            {sectionClips.length > 0 && (
              <div className="cm-parts">
                {sectionClips.length > 1 && (
                  <span className="cm-parts-hint">Plays in this order:</span>
                )}
                {sectionClips.map((clip, clipIndex) => {
                  const isDeleting = deletingClipId === clip.id;
                  const partNumber = clipIndex + 1;

                  return (
                    <div key={clip.id} className="cm-part-chip">
                      <span className="cm-part-order">{partNumber}</span>
                      <a
                        href={clip.clip_url ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="cm-part-link"
                      >
                        {getClipBaseTitle(clip.section_title) === clip.section_title
                          ? "Part 1"
                          : `Part ${getClipPartNumber(clip.section_title)}`}
                      </a>
                      <button
                        type="button"
                        className="cm-part-remove"
                        aria-label={`Remove part ${partNumber}`}
                        title="Remove clip"
                        disabled={isDeleting}
                        onClick={() => removeClip(clip, rowKey)}
                      >
                        {isDeleting ? "…" : "×"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {err && <div className="cm-err">{err}</div>}
          </div>
        );
      })}

      <style>{`
        .cm-root {
          margin-bottom: 1.25rem;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .cm-header {
          display: flex;
          align-items: center;
          padding: 0 0 6px;
          border-bottom: 0.5px solid #1a2838;
          margin-bottom: 2px;
        }
        .cm-note {
          font-size: 11px;
          color: #5f6f86;
          margin: 6px 0 10px;
        }
        .cm-load-err {
          font-size: 11px;
          color: #E85A4A;
          margin: 0 0 10px;
        }
        .cm-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #2a4060;
        }
        .cm-count {
          margin-left: auto;
          font-size: 11px;
          color: #1e3050;
        }
        .cm-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 0.5px solid #1a2838;
          flex-wrap: wrap;
        }
        .cm-row:last-child { border-bottom: none; }
        .cm-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid;
          flex-shrink: 0;
        }
        .cm-info {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
          overflow: hidden;
        }
        .cm-title {
          font-size: 13px;
          color: #94b0c8;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cm-ts {
          font-size: 11px;
          color: #3a5570;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .cm-status {
          flex-shrink: 0;
          min-width: 110px;
          display: flex;
          align-items: center;
        }
        .cm-parts {
          width: 100%;
          margin-left: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }
        .cm-parts-hint {
          font-size: 11px;
          color: #5f6f86;
          margin-right: 2px;
        }
        .cm-part-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #1f3550;
          background: #0b1220;
          padding: 3px 6px 3px 4px;
          border-radius: 999px;
        }
        .cm-part-order {
          min-width: 18px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #11243a;
          color: #8fb5db;
          font-size: 10px;
          font-weight: 700;
        }
        .cm-part-link {
          font-size: 11px;
          color: #5daaf0;
          text-decoration: none;
        }
        .cm-part-link:hover {
          opacity: 0.85;
        }
        .cm-part-remove {
          width: 18px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 999px;
          background: transparent;
          color: #6f8ba8;
          font-size: 12px;
          line-height: 1;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
          transition: background 0.12s ease, color 0.12s ease;
        }
        .cm-part-remove:hover:not(:disabled) {
          background: #15273a;
          color: #d7e8fa;
        }
        .cm-part-remove:disabled {
          opacity: 0.45;
          cursor: default;
        }
        .cm-ok   { font-size: 12px; color: #4CAF7E; font-weight: 500; }
        .cm-none { font-size: 12px; color: #2a4060; }
        .cm-bar-track {
          width: 72px;
          height: 2px;
          background: #0d1a24;
          border-radius: 1px;
          overflow: hidden;
        }
        .cm-bar-fill {
          height: 100%;
          background: #C9A84C;
          border-radius: 1px;
          transition: width 0.3s ease;
        }
        .cm-btn {
          padding: 5px 12px;
          background: transparent;
          border: 1px solid #2a4060;
          border-radius: 4px;
          color: #4a6a80;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          white-space: nowrap;
          flex-shrink: 0;
          transition: border-color 0.1s, color 0.1s;
        }
        .cm-btn:hover:not(:disabled) { border-color: #3a5a70; color: #7a9ab8; }
        .cm-btn:disabled { opacity: 0.35; cursor: default; }
        .cm-err {
          width: 100%;
          font-size: 11px;
          color: #E85A4A;
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
}
