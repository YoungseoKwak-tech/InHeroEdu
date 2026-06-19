import type { Metadata } from "next";
import Link from "next/link";
import PromoBanner from "@/components/parents/PromoBanner";

export const metadata: Metadata = {
  title: "TOEFL Practice Test — Just Like the Real Exam",
  description:
    "Practice the TOEFL iBT just like the real exam. All four sections — Reading, Listening, Speaking, Writing. Practice with a 5-attempt pass for 200 credits or unlimited access for 500 credits.",
  keywords: ["TOEFL practice test", "TOEFL iBT practice", "TOEFL mock exam", "TOEFL Reading Listening Speaking Writing", "InHero"],
  alternates: { canonical: "/toefl" },
  openGraph: {
    type: "website",
    url: "https://inheroedu.com/toefl",
    title: "TOEFL Practice Test — Just Like the Real Exam",
    description: "All four TOEFL iBT sections in the real format — 5 attempts for 200 credits or unlimited for 500 credits.",
    siteName: "InHero",
  },
};

const MINT = "#00FFB2";

const SECTIONS = [
  { tag: "Reading", title: "Reading · 35 min", desc: "Two ~700-word academic passages · 10 questions each (20 total). Real question types: factual, inference, vocabulary, rhetorical purpose, sentence simplification, insert text, and summary. Auto-graded with explanations right after you finish.", color: "#1D9E75" },
  { tag: "Listening", title: "Listening · ~36 min", desc: "2 conversations + 3 lectures (28 questions total). Play the audio, listen, and answer in MCQ format — gist, detail, function, attitude, and organization types. Transcript revealed after grading.", color: "#7DD3FC" },
  { tag: "Speaking", title: "Speaking · 16 min", desc: "4 tasks (1 independent + 3 integrated). 15–30 sec prep → 45–60 sec response, with mic recording + speech-to-text transcription, then rubric-based self-scoring.", color: "#F59E0B" },
  { tag: "Writing", title: "Writing · ~29 min", desc: "Integrated (reading + listening summary) + Academic Discussion (opinion). Timed, with a live word count and rubric-based self-scoring.", color: "#A78BFA" },
];

const FAQ = [
  { q: "How many credits does a TOEFL practice test cost?", a: "TOEFL and SAT practice tests give you 5 attempts for 200 credits. Unlock the 500-credit pass for unlimited practice with no attempt limit." },
  { q: "Is the format the same as the real exam?", a: "It mirrors the real TOEFL iBT — same sections, question types, and timers. Listening plays audio, Speaking has prep/response timers and recording, and Writing reproduces the time limits and word counts exactly." },
  { q: "How are the questions written?", a: "We analyzed the real TOEFL iBT — its section structure, all 8 reading question types (factual, negative factual, inference, rhetorical purpose, vocabulary, sentence simplification, insert text, summary), the listening question types (gist, function, attitude, organization, connecting content), and the exam's time allocation — then wrote brand-new, original practice questions using the same design principles. Three full test sets let you practice every type without gaps." },
  { q: "Are these official past exam questions?", a: "No — these aren't copies of ETS's official questions. They're carefully crafted practice questions with the same format, types, and difficulty. That means you can practice as much as you want, just like the real thing, with no copyright concerns." },
];

export default function ToeflLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": "https://inheroedu.com/toefl", name: "TOEFL Practice Test", url: "https://inheroedu.com/toefl",
        description: "Practice the TOEFL iBT just like the real exam — all four sections: Reading, Listening, Speaking, and Writing." },
      { "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <div style={{ background: "#05070d", minHeight: "100vh", color: "#e8edf4", fontFamily: "Inter, sans-serif" }}>
      <PromoBanner ctaHref="/toefl/test?pay=1" sticky={false} />
      <div style={{ padding: "48px 22px 120px" }}>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,255,178,0.7)", marginBottom: 14 }}>📝 TOEFL iBT · Practice Test</p>
        <h1 style={{ fontSize: "clamp(2rem, 5.4vw, 3.4rem)", fontWeight: 850, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
          The TOEFL,<br />just like the real exam.
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 28, maxWidth: 660 }}>
          All four TOEFL iBT sections — <strong style={{ color: "#fff" }}>Reading, Listening, Speaking, and Writing</strong> — in the exact format of the real exam:
          auto-grading with explanations, listening audio playback, speaking recording, and writing timers. Practice with a 5-attempt pass for 200 credits, or go unlimited for 500.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
          <Link href="/toefl/test" style={{ display: "inline-block", background: MINT, color: "#05070d", borderRadius: 12, padding: "14px 28px", fontWeight: 850, fontSize: 16, textDecoration: "none" }}>
            ▶ Start the practice test →
          </Link>
          <Link href="/toefl/sample" style={{ display: "inline-block", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 12, padding: "14px 24px", fontWeight: 800, fontSize: 15, textDecoration: "none" }}>
            🎁 Try a free sample
          </Link>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 40px", lineHeight: 1.65 }}>
          The sample is <strong style={{ color: "#fff" }}>free · no login required</strong> — try the real format and timer before you start. Full test: <strong style={{ color: "#fff" }}>200 credits = 5 attempts</strong> · <strong style={{ color: "#fff" }}>500 credits = unlimited</strong>
        </p>

        <div style={{ display: "grid", gap: 14, marginBottom: 44 }}>
          {SECTIONS.map((s) => (
            <div key={s.tag} style={{ display: "flex", alignItems: "center", gap: 18, borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", padding: "18px 20px" }}>
              <span style={{ fontSize: 12, fontWeight: 900, color: "#05070d", background: s.color, borderRadius: 8, padding: "6px 10px", flexShrink: 0 }}>{s.tag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{s.title}</div>
                <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", marginTop: 4, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Frequently asked questions</h2>
        <div style={{ display: "grid", gap: 14 }}>
          {FAQ.map((f) => (
            <div key={f.q} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "18px 20px", background: "rgba(255,255,255,0.02)" }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Q. {f.q}</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", margin: 0, lineHeight: 1.7 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
