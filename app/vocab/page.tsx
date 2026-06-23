"use client";

/**
 * 단어장 (Vocabulary) — light/premium student-facing page. Subject decks built from
 * the Korean Core Notes; see Korean meaning → recall the English term. The UI
 * itself lives in the shared <VocabStudy> (also used by /parents/vocab).
 */

import { useEffect, useState } from "react";
import VocabStudy from "@/components/vocab/VocabStudy";

const BG = "#ffffff";

export default function VocabPage() {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    fetch("/api/vocab?countOnly=true").then((r) => r.json()).then((d) => setTotal(d.total ?? 0)).catch(() => {});
  }, []);

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", color: "#0b1220" }}>
      <div style={{ background: "linear-gradient(180deg,#f6f8fb 0%, #ffffff 100%)", borderBottom: "1px solid #eef1f5", padding: "64px 22px 36px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#00b85f", fontWeight: 800, marginBottom: 12 }}>
            📒 VOCABULARY
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.9rem, 5vw, 3rem)", fontWeight: 800, color: "#0b1220", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 14 }}>
            See the meaning,<br />recall the term.
          </h1>
          <p style={{ fontSize: 15, color: "#5b6675", lineHeight: 1.7, margin: 0, maxWidth: 600 }}>
            {total > 0 ? `${total.toLocaleString()} ` : ""}must-know terms by subject — practice recalling the term from a
            meaning you already know, and build the vocabulary that's core to college admissions, fast.
          </p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 22px 120px" }}>
        <VocabStudy theme="light" />
      </div>
    </div>
  );
}
