import type { Metadata } from "next";
import Link from "next/link";
import PromoBanner from "@/components/parents/PromoBanner";

/**
 * /mock-exams — public SEO landing for SAT/AP mock exams plus IB practice.
 * The phrase appears in the <title>, <h1>, description, headings, and JSON-LD so
 * an exact-match search surfaces this page. Funnels to the real exam tools
 * (/sat, the Bluebook AP exam, the question bank).
 */

const PHRASE = "SAT · AP Mock Exams + IB Practice";

export const metadata: Metadata = {
  title: "SAT · AP Mock Exams + IB Practice | InHero",
  description:
    "SAT, AP, and IB prep in one place. Take adaptive digital SAT full mock exams, a College Board Bluebook-style AP Section I exam mode, and IB Paper-style practice with full explanations.",
  keywords: [
    "SAT AP IB mock exams",
    "SAT mock exam",
    "AP mock exam",
    "IB mock exam",
    "digital SAT mock exam",
    "Bluebook mock exam",
    "AP practice exam",
    "free mock exam",
    "international student mock exam",
    "InHero",
  ],
  alternates: { canonical: "/mock-exams" },
  openGraph: {
    type: "website",
    url: "https://inheroedu.com/mock-exams",
    title: "SAT · AP Mock Exams + IB Practice",
    description:
      "Adaptive digital SAT + Bluebook-style AP + IB Paper-style practice — answer and get instant scoring and explanations.",
    siteName: "InHero",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAT · AP Mock Exams + IB Practice | InHero",
    description: "SAT and AP mock exams plus IB Paper-style practice, all in one place.",
  },
};

const MINT = "#00FFB2";

const EXAMS = [
  {
    tag: "SAT",
    href: "/sat",
    title: "Digital SAT Mock Exam",
    desc: "Just like the real Bluebook — adaptive two-stage modules, per-module timer, Desmos calculator, and a projected 400–1600 score.",
    color: "#7DD3FC",
  },
  {
    tag: "AP",
    href: "/parents/question-bank/exam",
    title: "AP Practice Exam",
    desc: "The exact College Board Bluebook screen — a mock exam built to each subject's real AP Section I (multiple choice) length and timing.",
    color: "#1D9E75",
  },
  {
    tag: "IB",
    href: "/question-bank",
    title: "IB Paper-Style Practice",
    desc: "A question bank for practicing IB Paper-style questions by subject. Right now it's focused on per-question answers and explanations rather than a full timed mock exam.",
    color: "#A78BFA",
  },
  {
    tag: "TOEFL",
    href: "/toefl",
    title: "TOEFL iBT Mock Exam",
    desc: "All four sections — Reading, Listening, Speaking, and Writing — in the real test format, with auto-scoring, explanations, audio, recording, and a timer.",
    color: "#F59E0B",
  },
];

const FAQ = [
  {
    q: "Can I try SAT, AP, and IB prep for free?",
    a: "Yes — SAT and AP run as full mock-exam flows, and IB is available as Paper-style practice focused on questions and explanations.",
  },
  {
    q: "Is the format the same as the real exam?",
    a: "The digital SAT follows the real Bluebook adaptive two-stage module structure, and the AP mock exam is built around the official Section I multiple-choice question count and timing. IB is a question bank for practicing Paper-style questions by subject — it's not yet a full timed mock exam covering IB Papers 1/2/3.",
  },
  {
    q: "How are the questions created?",
    a: "They're original questions written from scratch by analyzing the real question types and design principles of the SAT, AP, IB, and TOEFL. Exams that replicate the full flow (SAT/AP) match the official timing and question counts, while IB currently prioritizes the quality of Paper-style questions and explanations.",
  },
  {
    q: "Are these official past exam questions?",
    a: "No — rather than copying official past papers, these are carefully written practice questions in the same format, type, and difficulty. That means you can practice as much as you want, exam-style, with no copyright concerns.",
  },
];

export default function MockExamsLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://inheroedu.com/mock-exams",
        name: "SAT · AP Mock Exams + IB Practice",
        description:
          "SAT and AP mock exams plus IB Paper-style practice, all in one place — answer and get instant scoring and explanations.",
        url: "https://inheroedu.com/mock-exams",
      },
      {
        "@type": "ItemList",
        itemListElement: EXAMS.map((e, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: e.title,
          url: `https://inheroedu.com${e.href}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div style={{ background: "#05070d", minHeight: "100vh", color: "#e8edf4", fontFamily: "Inter, sans-serif" }}>
      <PromoBanner ctaHref="/parents/sat?pay=1" sticky={false} />
      <div style={{ padding: "48px 22px 120px" }}>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,255,178,0.7)", marginBottom: 14 }}>
          🖥️ Free practice exams
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5.4vw, 3.4rem)", fontWeight: 850, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
          {PHRASE}
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32, maxWidth: 660 }}>
          <strong style={{ color: "#fff" }}>SAT and AP mock exams plus IB practice</strong>, all in one place. Adaptive digital SAT full mock exams,
          a College Board Bluebook-style AP Section I exam mode, and IB Paper-style questions — answer them and see the
          correct answers and detailed explanations right away.
        </p>

        {/* Exam cards */}
        <div style={{ display: "grid", gap: 14, marginBottom: 44 }}>
          {EXAMS.map((e) => (
            <Link key={e.tag} href={e.href} style={{
              textDecoration: "none", display: "flex", alignItems: "center", gap: 18,
              borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", padding: "20px 22px",
            }}>
              <span style={{ fontSize: 13, fontWeight: 900, color: "#05070d", background: e.color, borderRadius: 8, padding: "6px 11px", flexShrink: 0 }}>{e.tag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>{e.title}</div>
                <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", marginTop: 4, lineHeight: 1.6 }}>{e.desc}</div>
              </div>
              <span style={{ fontSize: 15, fontWeight: 800, color: e.color, flexShrink: 0 }}>Try it →</span>
            </Link>
          ))}
        </div>

        {/* Why section — phrase-rich body for relevance */}
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 14 }}>
          Why InHero's SAT · AP mock exams + IB practice?
        </h2>
        <ul style={{ margin: "0 0 44px", paddingLeft: 0, listStyle: "none", display: "grid", gap: 12 }}>
          {[
            "Real SAT/AP flow — the digital SAT adaptive modules and AP Bluebook-style Section I match the real screen and timing.",
            "IB is clearly offered as a question bank — answer Paper-style questions and see the correct answers and detailed explanations.",
            "Instant scoring — supported SAT, AP, and IB practice questions come with answers and explanations.",
            "Free preview — get a taste of the exam-prep flow without even signing up.",
            "Built for international students — sharpen your exam instincts with a study flow designed by Ivy League students.",
          ].map((t) => (
            <li key={t} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>
              <span style={{ color: MINT, flexShrink: 0 }}>✓</span>{t}
            </li>
          ))}
        </ul>

        {/* FAQ — mirrors the JSON-LD FAQPage */}
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 16 }}>
          Frequently asked questions
        </h2>
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
