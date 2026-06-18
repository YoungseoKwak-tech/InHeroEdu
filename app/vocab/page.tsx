"use client";

/**
 * 단어장 (Vocabulary) — dark/mint student-facing page. Subject decks built from
 * the Korean Core Notes; see Korean meaning → recall the English term. The UI
 * itself lives in the shared <VocabStudy> (also used by /parents/vocab).
 */

import { useEffect, useState } from "react";
import VocabStudy from "@/components/vocab/VocabStudy";

const BG = "#05070d";

export default function VocabPage() {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    fetch("/api/vocab?countOnly=true").then((r) => r.json()).then((d) => setTotal(d.total ?? 0)).catch(() => {});
  }, []);

  return (
    <div style={{ background: BG, minHeight: "100vh", padding: "64px 22px 120px", fontFamily: "Inter, sans-serif", color: "#e8edf4" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,255,178,0.7)", marginBottom: 12 }}>
          📒 VOCABULARY
        </p>
        <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", fontWeight: 850, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 14 }}>
          See the meaning,<br />recall the term.
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 28, maxWidth: 600 }}>
          {total > 0 ? `${total.toLocaleString()} ` : ""}must-know terms by subject — practice recalling the term from a
          meaning you already know, and build the vocabulary that's core to college admissions, fast.
        </p>
        <VocabStudy theme="dark" />
      </div>
    </div>
  );
}
