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
  title: "SAT · AP Mock Exams + IB Practice",
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

/**
 * Tracks organized BY SUBJECT, with real level/format tiers surfaced within each
 * (NOT invented per-question difficulty — there is no such data). Tiers map to the
 * real distinctions each tool exposes: SAT/TOEFL intro-sample vs real-length, AP by
 * exam subject, IB HL vs SL Paper-style.
 */
const TRACKS = [
  {
    tag: "SAT",
    title: "Digital SAT Mock Exam",
    color: "#7DD3FC",
    summary:
      "Just like the real Bluebook — adaptive two-stage modules, per-module timer, Desmos calculator, and a projected 400–1600 score.",
    levelLabel: "By format",
    tiers: [
      {
        level: "Sample",
        href: "/sat",
        name: "Intro practice module",
        desc: "A short, no-signup taste of the adaptive Bluebook flow to learn the screen and pacing.",
      },
      {
        level: "Full-length",
        href: "/sat",
        name: "Real-length adaptive exam",
        desc: "The full two-stage adaptive Reading & Writing and Math modules with real timing and a projected 400–1600 score.",
      },
    ],
  },
  {
    tag: "AP",
    title: "AP Practice Exam",
    color: "#1D9E75",
    summary:
      "The exact College Board Bluebook screen — a mock exam built to each subject's real AP Section I (multiple choice) length and timing.",
    levelLabel: "By exam",
    tiers: [
      {
        level: "By subject",
        href: "/parents/question-bank/exam",
        name: "AP Section I — choose your exam",
        desc: "Pick an AP subject and sit a Bluebook-style Section I (multiple choice) built to that exam's real question count and timing.",
      },
    ],
  },
  {
    tag: "IB",
    title: "IB Paper-Style Practice",
    color: "#A78BFA",
    summary:
      "A question bank for practicing IB Paper-style questions by subject — focused on per-question answers and explanations rather than a full timed mock exam.",
    levelLabel: "By level",
    tiers: [
      {
        level: "SL",
        href: "/question-bank",
        name: "Standard Level Paper practice",
        desc: "Standard Level Paper-style questions by subject, with correct answers and detailed explanations.",
      },
      {
        level: "HL",
        href: "/question-bank",
        name: "Higher Level Paper practice",
        desc: "Higher Level Paper-style questions by subject, with correct answers and detailed explanations.",
      },
    ],
  },
  {
    tag: "TOEFL",
    title: "TOEFL iBT Mock Exam",
    color: "#F59E0B",
    summary:
      "All four sections — Reading, Listening, Speaking, and Writing — in the real test format, with auto-scoring, explanations, audio, recording, and a timer.",
    levelLabel: "By format",
    tiers: [
      {
        level: "Sample",
        href: "/toefl",
        name: "Intro section sampler",
        desc: "A quick look at the iBT format across sections before committing to the full-length test.",
      },
      {
        level: "Full-length",
        href: "/toefl",
        name: "Real-length iBT mock exam",
        desc: "All four sections at real test length, with auto-scoring, explanations, audio, recording, and a timer.",
      },
    ],
  },
];

// Flat list preserved for JSON-LD ItemList (one entry per track, original hrefs/titles).
const EXAMS = TRACKS.map((t) => ({ tag: t.tag, href: t.tiers[0].href, title: t.title }));

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

  const INK = "#0b1220", SUB = "#5b6675", FAINT = "#94a3b8", GREEN = "#00b85f";
  // Full-bleed: edge-filling shell instead of the old narrow 1080 cap.
  const MAXW = 1440, PADX = "clamp(16px, 3vw, 40px)";
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: INK, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <PromoBanner ctaHref="/parents/sat?pay=1" sticky={false} navOffset={64} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ background: "linear-gradient(180deg,#f6f8fb 0%, #ffffff 100%)", borderBottom: "1px solid #eef1f5" }}>
        <div style={{ maxWidth: MAXW, margin: "0 auto", padding: `52px ${PADX} 44px` }}>
          <p style={{ fontSize: 11.5, letterSpacing: "0.18em", textTransform: "uppercase", color: GREEN, fontWeight: 800, marginBottom: 12 }}>
            🖥️ Free practice exams
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5.4vw, 3.6rem)", fontWeight: 800, color: INK, letterSpacing: "-0.03em", lineHeight: 1.06, marginBottom: 16, maxWidth: 900 }}>
            {PHRASE}
          </h1>
          <p style={{ fontSize: 16, color: SUB, lineHeight: 1.8, marginBottom: 22, maxWidth: 720 }}>
            <strong style={{ color: INK }}>SAT and AP mock exams plus IB practice</strong>, all in one place. Adaptive digital SAT full mock exams,
            a College Board Bluebook-style AP Section I exam mode, and IB Paper-style questions — answer them and see the
            correct answers and detailed explanations right away.
          </p>
          {/* Track jump-chips — organize by subject up front */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TRACKS.map((t) => (
              <a key={t.tag} href={`#track-${t.tag}`} style={{
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                border: "1px solid #e8ecf1", background: "#fff", borderRadius: 999, padding: "7px 14px",
                fontSize: 13, fontWeight: 700, color: INK, boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
              }}>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: t.color, display: "inline-block" }} />
                {t.tag}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: `40px ${PADX} 100px` }}>
        {/* Tracks — one section per subject, level/format tiers inside each */}
        {TRACKS.map((t) => (
          <section key={t.tag} id={`track-${t.tag}`} style={{ marginBottom: 48, scrollMarginTop: 80 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, fontWeight: 900, color: "#fff", background: t.color, borderRadius: 8, padding: "6px 11px", flexShrink: 0 }}>{t.tag}</span>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: INK, letterSpacing: "-0.02em", margin: 0 }}>
                {t.title}
              </h2>
              <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: FAINT, fontWeight: 700, marginLeft: "auto" }}>
                {t.levelLabel}
              </span>
            </div>
            <p style={{ fontSize: 14.5, color: SUB, lineHeight: 1.7, margin: "0 0 18px", maxWidth: 760 }}>{t.summary}</p>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
              {t.tiers.map((tier) => (
                <Link key={tier.name} href={tier.href} style={{
                  textDecoration: "none", display: "flex", flexDirection: "column", gap: 10,
                  borderRadius: 16, border: "1px solid #e8ecf1", background: "#fff", padding: "22px 22px",
                  boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
                }}>
                  <span style={{
                    alignSelf: "flex-start", fontSize: 11.5, fontWeight: 800, letterSpacing: "0.06em",
                    color: t.color, background: "#f6f8fb", border: "1px solid #e8ecf1",
                    borderRadius: 999, padding: "4px 11px",
                  }}>{tier.level}</span>
                  <div style={{ fontSize: 17, fontWeight: 800, color: INK }}>{tier.name}</div>
                  <div style={{ fontSize: 13.5, color: SUB, lineHeight: 1.6, flex: 1 }}>{tier.desc}</div>
                  <span style={{ fontSize: 15, fontWeight: 800, color: GREEN, marginTop: 4 }}>Try it →</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Why section — phrase-rich body for relevance */}
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: INK, letterSpacing: "-0.02em", marginBottom: 14 }}>
          Why InHero&apos;s SAT · AP mock exams + IB practice?
        </h2>
        <ul style={{ margin: "0 0 48px", paddingLeft: 0, listStyle: "none", display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
          {[
            "Real SAT/AP flow — the digital SAT adaptive modules and AP Bluebook-style Section I match the real screen and timing.",
            "IB is clearly offered as a question bank — answer Paper-style questions and see the correct answers and detailed explanations.",
            "Instant scoring — supported SAT, AP, and IB practice questions come with answers and explanations.",
            "Free preview — get a taste of the exam-prep flow without even signing up.",
            "Built for international students — sharpen your exam instincts with a study flow designed by Ivy League students.",
          ].map((t) => (
            <li key={t} style={{ display: "flex", gap: 10, fontSize: 14.5, color: SUB, lineHeight: 1.65 }}>
              <span style={{ color: GREEN, flexShrink: 0, fontWeight: 800 }}>✓</span>{t}
            </li>
          ))}
        </ul>

        {/* FAQ — mirrors the JSON-LD FAQPage */}
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
          Frequently asked questions
        </h2>
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))" }}>
          {FAQ.map((f) => (
            <div key={f.q} style={{ border: "1px solid #e8ecf1", borderRadius: 14, padding: "18px 20px", background: "#fff", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: INK, margin: "0 0 8px" }}>Q. {f.q}</p>
              <p style={{ fontSize: 14, color: SUB, margin: 0, lineHeight: 1.7 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
