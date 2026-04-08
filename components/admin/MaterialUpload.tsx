"use client";

import { useState, useRef, useCallback } from "react";
import type { Subject } from "@/lib/subjects";

interface UploadedFile {
  id: string;
  file: File;
  materialId: string | null;
  status: "pending" | "uploading" | "uploaded" | "analyzing" | "done" | "error";
  questionCount: number;
  errorMsg: string;
  hasText: boolean;
}

interface MaterialUploadProps {
  subject: Subject;
  onQuestionsGenerated: () => void;
}

export default function MaterialUpload({ subject, onQuestionsGenerated }: MaterialUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [questionCount, setQuestionCount] = useState(10);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function makeId() {
    return Math.random().toString(36).slice(2);
  }

  function addFiles(incoming: FileList | File[]) {
    const allowed = ["pdf", "png", "jpg", "jpeg", "txt"];
    const newFiles: UploadedFile[] = Array.from(incoming)
      .filter((f) => {
        const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
        return allowed.includes(ext);
      })
      .map((f) => ({
        id: makeId(),
        file: f,
        materialId: null,
        status: "pending",
        questionCount: 0,
        errorMsg: "",
        hasText: false,
      }));
    setFiles((prev) => [...prev, ...newFiles]);
  }

  function updateFile(id: string, patch: Partial<UploadedFile>) {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }

  async function uploadFile(item: UploadedFile) {
    if (item.status !== "pending" && item.status !== "error") return;
    updateFile(item.id, { status: "uploading", errorMsg: "" });

    const form = new FormData();
    form.append("file", item.file);
    form.append("subject", subject.id);

    try {
      const res = await fetch("/api/admin/upload-material", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      // Always treat as uploaded even if materialId is null (R2 not configured)
      updateFile(item.id, {
        status: data.materialId ? "uploaded" : "error",
        materialId: data.materialId ?? null,
        hasText: data.hasText ?? false,
        errorMsg: data.warning ?? "",
      });
    } catch (e: unknown) {
      updateFile(item.id, {
        status: "error",
        errorMsg: e instanceof Error ? e.message : "업로드 실패",
      });
    }
  }

  async function analyzeFile(item: UploadedFile) {
    if (!item.materialId || item.status === "analyzing") return;
    updateFile(item.id, { status: "analyzing" });

    try {
      const res = await fetch("/api/admin/analyze-material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materialId: item.materialId,
          subject: subject.id,
          count: questionCount,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "분석 실패");
      updateFile(item.id, { status: "done", questionCount: data.count });
      onQuestionsGenerated();
    } catch (e: unknown) {
      updateFile(item.id, {
        status: "error",
        errorMsg: e instanceof Error ? e.message : "분석 실패",
      });
    }
  }

  async function handleUploadAll() {
    const pending = files.filter((f) => f.status === "pending" || f.status === "error");
    for (const f of pending) await uploadFile(f);
  }

  async function handleAnalyzeAll() {
    const uploaded = files.filter((f) => f.status === "uploaded");
    for (const f of uploaded) await analyzeFile(f);
  }

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const onDragLeave = useCallback(() => setIsDragging(false), []);
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }, []);

  const statusLabel: Record<UploadedFile["status"], string> = {
    pending:   "대기 중",
    uploading: "업로드 중...",
    uploaded:  "업로드 완료",
    analyzing: "Claude 분석 중...",
    done:      "완료",
    error:     "오류",
  };

  const statusColor: Record<UploadedFile["status"], string> = {
    pending:   "text-gray-400",
    uploading: "text-blue-500",
    uploaded:  "text-primary-500",
    analyzing: "text-amber-500",
    done:      "text-emerald-500",
    error:     "text-red-500",
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-primary-400 bg-primary-50 dark:bg-primary-900/20"
            : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800/50"
        }`}
      >
        <div className="text-4xl mb-3">📂</div>
        <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
          파일을 드래그하거나 클릭해서 선택
        </p>
        <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG, JPEG, TXT 허용</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.txt"
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {/* Controls */}
      {files.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              문제 수:
            </label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              {[5, 10, 15, 20].map((n) => (
                <option key={n} value={n}>{n}개</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleUploadAll}
            disabled={files.every((f) => f.status !== "pending" && f.status !== "error")}
            className="btn-secondary text-xs py-1.5 px-4 disabled:opacity-40"
          >
            전체 업로드
          </button>
          <button
            onClick={handleAnalyzeAll}
            disabled={files.every((f) => f.status !== "uploaded")}
            className="btn-primary text-xs py-1.5 px-4 disabled:opacity-40"
          >
            ✨ 전체 분석
          </button>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <span className="text-lg flex-shrink-0">
                {item.file.name.endsWith(".pdf") ? "📄"
                  : item.file.name.match(/\.(png|jpg|jpeg)$/) ? "🖼️"
                  : "📝"}
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {item.file.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-400">
                    {(item.file.size / 1024).toFixed(1)} KB
                  </span>
                  {item.status === "analyzing" && (
                    <span className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  )}
                  <span className={`text-xs font-semibold ${statusColor[item.status]}`}>
                    {item.status === "done"
                      ? `✓ ${item.questionCount}개 문제 생성됨`
                      : statusLabel[item.status]}
                  </span>
                  {item.errorMsg && (
                    <span className="text-xs text-red-400 truncate">{item.errorMsg}</span>
                  )}
                  {item.status === "uploaded" && !item.hasText && (
                    <span className="text-xs text-amber-500">⚠ 텍스트 추출 제한 (PDF)</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                {(item.status === "pending" || item.status === "error") && (
                  <button
                    onClick={() => uploadFile(item)}
                    className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors"
                  >
                    업로드
                  </button>
                )}
                {item.status === "uploaded" && (
                  <button
                    onClick={() => analyzeFile(item)}
                    className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors"
                  >
                    분석하기
                  </button>
                )}
                <button
                  onClick={() => setFiles((prev) => prev.filter((f) => f.id !== item.id))}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length === 0 && (
        <p className="text-center text-sm text-gray-400 py-4">
          파일을 업로드하면 여기에 목록이 표시됩니다
        </p>
      )}
    </div>
  );
}
