"use client";

/**
 * VideoUploader
 *
 * Client-side direct upload to Supabase Storage bucket "lesson-videos".
 * After upload, POSTs the public URL to /api/upload/video to persist it
 * in lesson_scripts.video_url.
 *
 * Props:
 *   lessonId    — the DB lesson ID
 *   currentUrl  — existing video_url (if any) for display
 *   onSaved     — called with the new public URL after successful save
 */

import { useState, useRef } from "react";
import { createBrowserClient } from "@/lib/supabase";
import { authFetch } from "@/lib/client-auth";
import { formatStorageUploadLimit } from "@/lib/storageUpload";

interface Props {
  lessonId: string;
  currentUrl?: string | null;
  onSaved?: (url: string) => void;
}

interface PreparedVideoUpload {
  bucket: string;
  path: string;
  token: string;
  publicUrl: string;
}

function formatUploadError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (/maximum allowed size/i.test(message)) {
    return `Video too large. The current storage limit is ${formatStorageUploadLimit()} per file.`;
  }
  return message;
}

export default function VideoUploader({ lessonId, currentUrl, onSaved }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [savedUrl, setSavedUrl] = useState<string | null>(currentUrl ?? null);

  async function handleFile(file: File) {
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setError("Please select a video file.");
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      const supabase = createBrowserClient();
      const prepareRes = await authFetch("/api/admin/prepare-video-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, fileName: file.name }),
      });
      if (!prepareRes.ok) {
        const j = await prepareRes.json().catch(() => ({})) as { error?: string };
        throw new Error(j.error ?? `Prepare upload failed (${prepareRes.status})`);
      }
      const prepared = await prepareRes.json() as PreparedVideoUpload;

      const { error: uploadError } = await supabase.storage
        .from(prepared.bucket)
        .uploadToSignedUrl(prepared.path, prepared.token, file, {
          contentType: file.type,
        });

      if (uploadError) throw new Error(uploadError.message);
      setProgress(80);

      setProgress(90);

      const res = await authFetch("/api/upload/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, videoUrl: prepared.publicUrl }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(j.error ?? `HTTP ${res.status}`);
      }

      setProgress(100);
      setSavedUrl(prepared.publicUrl);
      onSaved?.(prepared.publicUrl);
    } catch (err) {
      setError(formatUploadError(err));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="vu-root">
      <div className="vu-header">
        <span className="vu-label">Video Upload</span>
        {savedUrl && (
          <a href={savedUrl} target="_blank" rel="noreferrer" className="vu-saved-link">
            ▶ View current video
          </a>
        )}
      </div>

      <div
        className={`vu-dropzone ${uploading ? "vu-uploading" : ""}`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          onChange={handleChange}
        />
        {uploading ? (
          <div className="vu-progress-wrap">
            <div className="vu-progress-bar" style={{ width: `${progress}%` }} />
            <span className="vu-progress-label">Uploading… {progress}%</span>
          </div>
        ) : (
          <div className="vu-idle">
            <span className="vu-icon">🎬</span>
            <span className="vu-idle-text">
              {savedUrl ? "Replace video" : "Drop video here or click to browse"}
            </span>
            <span className="vu-idle-sub">MP4, MOV, WEBM accepted</span>
          </div>
        )}
      </div>

      {error && <p className="vu-error">{error}</p>}

      <style>{`
        .vu-root {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .vu-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .vu-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #555;
        }
        .vu-saved-link {
          font-size: 0.68rem;
          color: #00FFB2;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .vu-saved-link:hover { opacity: 0.8; }
        .vu-dropzone {
          border: 1px dashed #222;
          border-radius: 0.75rem;
          padding: 1.5rem 1rem;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          background: #0d0d0d;
          position: relative;
          overflow: hidden;
        }
        .vu-dropzone:hover:not(.vu-uploading) {
          border-color: #333;
          background: #111;
        }
        .vu-uploading { cursor: default; }
        .vu-idle {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
        }
        .vu-icon { font-size: 1.5rem; }
        .vu-idle-text { font-size: 0.78rem; color: #666; text-align: center; }
        .vu-idle-sub  { font-size: 0.65rem; color: #333; }
        .vu-progress-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .vu-progress-bar {
          height: 4px;
          background: #00FFB2;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .vu-progress-label {
          font-size: 0.72rem;
          color: #555;
          text-align: center;
        }
        .vu-error {
          font-size: 0.72rem;
          color: #E85A4A;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
