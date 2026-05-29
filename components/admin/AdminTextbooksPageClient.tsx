"use client";

import { useState, useEffect, useRef } from "react";
import { authFetch } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";
import { TEXTBOOK_PRICE_KRW, textbookPriceLabelUSD } from "@/lib/textbookPricing";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import dynamic from "next/dynamic";

const PdfCover = dynamic(() => import("@/components/textbooks/PdfCover"), { ssr: false });

const SUBJECT_OPTIONS = [
  { id: "ap-biology",    label: "AP Biology",        chapters: 65 },
  { id: "ap-chemistry",  label: "AP Chemistry",       chapters: 60 },
  { id: "ap-physics",    label: "AP Physics C",       chapters: 55 },
  { id: "ap-calculus",   label: "AP Calculus BC",     chapters: 52 },
  { id: "ap-us-history", label: "AP US History",      chapters: 48 },
];

const BUILD_TAG = "UPLOAD PIPELINE v3 · 2026-05-04 22:15 KST";

interface Product {
  id: string;
  subject_id: string;
  title: string;
  pdf_url: string | null;
  price_krw: number;
  chapters: number;
  status: string;
}

interface PreparedUpload {
  path: string;
  token: string;
  publicUrl: string;
  subjectId: string;
  title: string;
  chapters: number;
}

export default function AdminTextbooksPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [deletingSubjectId, setDeletingSubjectId] = useState<string | null>(null);
  const [pendingDeleteSubjectId, setPendingDeleteSubjectId] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await authFetch("/api/admin/textbook-products");
    if (res.ok) {
      setProducts(await res.json());
      return;
    }

    const j = await res.json().catch(() => ({})) as { error?: string };
    flash(j.error ?? `Failed to load textbooks (${res.status})`, false);
  }

  function flash(text: string, ok: boolean) {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 3500);
  }

  async function handleUpload(subjectId: string, title: string, file: File) {
    setUploading(subjectId);
    try {
      const chapters = SUBJECT_OPTIONS.find((sub) => sub.id === subjectId)?.chapters ?? 65;
      const res = await authFetch("/api/admin/upload-textbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectId, title, chapters }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(j.error ?? `Prepare upload failed (${res.status})`);
      }

      const upload = await res.json() as PreparedUpload;
      const supabase = createBrowserClient();
      const { error: uploadError } = await supabase.storage
        .from("textbooks")
        .uploadToSignedUrl(upload.path, upload.token, file, {
          contentType: "application/pdf",
        });

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      const saveRes = await authFetch("/api/admin/textbook-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject_id: upload.subjectId,
          title: upload.title,
          pdf_url: upload.publicUrl,
          chapters: upload.chapters,
          price_krw: TEXTBOOK_PRICE_KRW,
          status: "available",
        }),
      });

      if (!saveRes.ok) {
        const j = await saveRes.json().catch(() => ({})) as { error?: string };
        throw new Error(j.error ?? `Catalog save failed (${saveRes.status})`);
      }

      flash(`${title} uploaded`, true);
      await load();
    } catch (e: unknown) {
      flash(e instanceof Error ? e.message : String(e), false);
    } finally {
      setUploading(null);
    }
  }

  async function handleDelete(subjectId: string) {
    setDeletingSubjectId(subjectId);
    const res = await authFetch(`/api/admin/textbook-products?subject_id=${subjectId}`, { method: "DELETE" });
    if (!res.ok) {
      const j = await res.json().catch(() => ({})) as { error?: string };
      flash(j.error ?? `Remove failed (${res.status})`, false);
      setDeletingSubjectId(null);
      setPendingDeleteSubjectId(null);
      return;
    }
    flash("Removed", true);
    setDeletingSubjectId(null);
    setPendingDeleteSubjectId(null);
    void load();
  }

  async function toggleStatus(p: Product) {
    const next = p.status === "available" ? "draft" : "available";
    const res = await authFetch("/api/admin/textbook-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...p, status: next }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({})) as { error?: string };
      flash(j.error ?? `Status update failed (${res.status})`, false);
      return;
    }
    load();
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0B0905", color: "#EDE8DC", padding: "80px 24px 60px", fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.16em", color: "#C8923A", marginBottom: "10px" }}>
            ADMIN  ·  FIELD MANUALS
          </p>
          <h1 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.03em" }}>Textbook Products</h1>
          <p style={{ color: "#6A6050", marginTop: "8px", fontSize: "14px" }}>Upload a PDF per subject. First page is shown as the public cover.</p>
          <p style={{ color: "#8E7D5A", marginTop: "10px", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>
            {BUILD_TAG}
          </p>
        </div>

        {msg && (
          <div style={{ marginBottom: "24px", padding: "12px 20px", background: msg.ok ? "rgba(0,180,80,0.1)" : "rgba(220,50,50,0.1)", border: `1px solid ${msg.ok ? "rgba(0,180,80,0.3)" : "rgba(220,50,50,0.3)"}`, fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: msg.ok ? "#00C850" : "#DC3232" }}>
            {msg.text}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {SUBJECT_OPTIONS.map((sub) => {
            const existing = products.find((p) => p.subject_id === sub.id);
            const isUploading = uploading === sub.id;

            return (
              <SubjectRow
                key={sub.id}
                subject={sub}
                existing={existing ?? null}
                isUploading={isUploading}
                onUpload={(file) => handleUpload(sub.id, sub.label, file)}
                onDelete={() => setPendingDeleteSubjectId(sub.id)}
                onToggle={() => existing && toggleStatus(existing)}
              />
            );
          })}
        </div>
      </div>
      <ConfirmDialog
        open={pendingDeleteSubjectId !== null}
        title="Remove this textbook product?"
        message="The textbook product will be removed from the catalog."
        confirmLabel="Remove"
        loading={deletingSubjectId !== null}
        destructive
        onConfirm={() => {
          if (pendingDeleteSubjectId) void handleDelete(pendingDeleteSubjectId);
        }}
        onCancel={() => {
          if (deletingSubjectId === null) setPendingDeleteSubjectId(null);
        }}
      />
    </div>
  );
}

function SubjectRow({
  subject, existing, isUploading, onUpload, onDelete, onToggle,
}: {
  subject: { id: string; label: string; chapters: number };
  existing: Product | null;
  isUploading: boolean;
  onUpload: (file: File) => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.type !== "application/pdf") {
      alert("PDF only");
      return;
    }
    onUpload(f);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "24px", alignItems: "start", padding: "24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        {existing?.pdf_url ? (
          <div style={{ flexShrink: 0, width: "90px", boxShadow: "4px 6px 20px rgba(0,0,0,0.6)", border: "1px solid rgba(200,146,58,0.2)" }}>
            <PdfCover url={existing.pdf_url} width={90} />
          </div>
        ) : (
          <div style={{ flexShrink: 0, width: "90px", aspectRatio: "8.5/11", background: "#1A1208", border: "1px dashed rgba(200,146,58,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#4A3820", fontSize: "20px" }}>+</span>
          </div>
        )}

        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#C8923A", letterSpacing: "0.14em", marginBottom: "6px" }}>
            {subject.id.toUpperCase()}
          </div>
          <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>{subject.label}</div>
          <div style={{ fontSize: "13px", color: "#6A6050", marginBottom: "12px" }}>{subject.chapters} chapters</div>

          {existing && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", padding: "3px 10px", background: existing.status === "available" ? "rgba(0,180,80,0.12)" : "rgba(255,255,255,0.05)", color: existing.status === "available" ? "#00C850" : "#6A6050", border: `1px solid ${existing.status === "available" ? "rgba(0,180,80,0.25)" : "rgba(255,255,255,0.08)"}`, letterSpacing: "0.1em" }}>
                {existing.status.toUpperCase()}
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#6A6050" }}>
                {textbookPriceLabelUSD()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
        <input ref={inputRef} type="file" accept="application/pdf" style={{ display: "none" }} onChange={(e) => handleFiles(e.target.files)} />

        <button
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
          style={{ padding: "10px 20px", background: dragging ? "rgba(200,146,58,0.2)" : "rgba(200,146,58,0.1)", border: `1px solid ${dragging ? "#C8923A" : "rgba(200,146,58,0.3)"}`, color: "#C8923A", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.1em", cursor: "pointer", transition: "all 150ms", whiteSpace: "nowrap" }}
        >
          {isUploading ? "UPLOADING..." : existing ? "REPLACE PDF" : "UPLOAD PDF"}
        </button>

        {existing && (
          <>
            <button onClick={onToggle} style={{ padding: "8px 16px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#8888AA", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", cursor: "pointer" }}>
              {existing.status === "available" ? "SET DRAFT" : "SET LIVE"}
            </button>
            <button onClick={onDelete} style={{ padding: "8px 16px", background: "transparent", border: "1px solid rgba(220,50,50,0.2)", color: "#DC3232", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", cursor: "pointer" }}>
              REMOVE
            </button>
          </>
        )}
      </div>
    </div>
  );
}
