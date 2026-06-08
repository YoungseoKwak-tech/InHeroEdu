/**
 * Client-side SAT attempt history (localStorage). No backend needed — each
 * finished test appends a record; the /sat page and results screen read it to
 * draw a score-trend graph.
 */

export interface SatAttempt {
  id: number;        // timestamp
  date: string;      // ISO
  formId: string;
  formTitle: string;
  rw: number;
  math: number;
  total: number;
}

const KEY = "inhero-sat-history";

export function readSatHistory(): SatAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SatAttempt[]) : [];
  } catch {
    return [];
  }
}

export function appendSatAttempt(a: Omit<SatAttempt, "id" | "date">): SatAttempt[] {
  const list = readSatHistory();
  const entry: SatAttempt = { ...a, id: Date.now(), date: new Date().toISOString() };
  const next = [...list, entry].slice(-50);
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  return next;
}
