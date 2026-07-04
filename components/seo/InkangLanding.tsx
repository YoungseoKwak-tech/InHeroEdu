import type { Metadata } from "next";
import Link from "next/link";

/**
 * Shared renderer for the Korean "OO 인강" exact-match SEO landing pages
 * (/kr/bio-inkang was the first; this generalizes it). Each subject page passes
 * an InkangConfig; the keyword phrase is saturated across <title>, <h1>,
 * headings, body, and JSON-LD (WebPage + Course + ItemList + FAQPage +
 * BreadcrumbList) so an exact-match Google search surfaces the page.
 */

export interface InkangLink {
  href: string;
  name: string;
  desc: string;
}
export interface InkangTrack {
  tag: string;
  title: string;
  color: string;
  summary: string;
  links: InkangLink[];
}
export interface InkangFaq {
  q: string;
  a: string;
}
export interface InkangConfig {
  /** URL slug under /kr, e.g. "chem-inkang" → /kr/chem-inkang */
  slug: string;
  /** The exact-match keyword, e.g. "화학 인강" */
  phrase: string;
  /** Small uppercase eyebrow above the H1 */
  eyebrow: string;
  /** Accent color for hero CTA + chips */
  accent: string;
  /** <title> (brand suffix appended by the layout template) */
  title: string;
  /** meta + OG description */
  description: string;
  keywords: string[];
  /** Bold opening clause in the hero lede */
  heroStrong: string;
  /** Rest of the hero lede */
  heroLede: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  tracks: InkangTrack[];
  /** "포함된 것" cards — defaults provided if omitted */
  includes?: { emoji: string; title: string; desc: string }[];
  faq: InkangFaq[];
  /** JSON-LD Course node */
  courseName: string;
  courseDesc: string;
  /** ISO 8601 duration, e.g. "P8W" */
  courseWorkload?: string;
  /** Final CTA button */
  footerCta: { href: string; label: string };
}

const INK = "#0f1720";
const SUB = "#475467";
const MAXW = 1100;
const PADX = "clamp(16px, 4vw, 40px)";

const DEFAULT_INCLUDES = (phrase: string) => [
  { emoji: "📘", title: "개념 코어노트", desc: `아이비리그생이 만든 한국어 핵심개념 노트. ${phrase}의 뼈대.` },
  { emoji: "🧪", title: "단원별 문제은행", desc: "AP·IB 유형 객관식 + 즉시 해설로 개념을 시험 문제로 확인." },
  { emoji: "📕", title: "디지털 교재", desc: "AP·IB·Honors 원서형 교재를 온라인으로." },
  { emoji: "🤖", title: "AI 튜터", desc: "모르는 개념은 24시간 AI 튜터에게 한국어로 질문." },
];

export function inkangMetadata(cfg: InkangConfig): Metadata {
  const url = `https://inheroedu.com/kr/${cfg.slug}`;
  return {
    title: cfg.title,
    description: cfg.description,
    keywords: cfg.keywords,
    alternates: { canonical: `/kr/${cfg.slug}` },
    openGraph: {
      type: "website",
      url,
      title: cfg.title,
      description: cfg.description,
      siteName: "InHero",
      locale: "ko_KR",
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cfg.title} | InHero`,
      description: cfg.description,
    },
  };
}

function jsonLdFor(cfg: InkangConfig) {
  const url = `https://inheroedu.com/kr/${cfg.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        name: cfg.title,
        description: cfg.description,
        inLanguage: "ko",
        url,
      },
      {
        "@type": "Course",
        name: cfg.courseName,
        description: cfg.courseDesc,
        inLanguage: "ko",
        provider: { "@type": "Organization", name: "InHero", url: "https://inheroedu.com" },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          ...(cfg.courseWorkload ? { courseWorkload: cfg.courseWorkload } : {}),
        },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", category: "Free preview" },
      },
      {
        "@type": "ItemList",
        itemListElement: cfg.tracks.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.title,
          url: `https://inheroedu.com${t.links[0].href}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: cfg.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: "https://inheroedu.com/kr" },
          { "@type": "ListItem", position: 2, name: cfg.phrase, item: url },
        ],
      },
    ],
  };
}

export default function InkangLanding({ cfg }: { cfg: InkangConfig }) {
  const includes = cfg.includes ?? DEFAULT_INCLUDES(cfg.phrase);
  return (
    <main style={{ background: "#fff", color: INK, minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFor(cfg)) }} />

      {/* Hero */}
      <div style={{ background: `linear-gradient(180deg,${cfg.accent}11 0%, #ffffff 100%)`, borderBottom: "1px solid #eef1f5" }}>
        <div style={{ maxWidth: MAXW, margin: "0 auto", padding: `52px ${PADX} 44px` }}>
          <p style={{ fontSize: 11.5, letterSpacing: "0.18em", textTransform: "uppercase", color: cfg.accent, fontWeight: 800, marginBottom: 12 }}>
            {cfg.eyebrow}
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5.4vw, 3.6rem)", fontWeight: 800, color: INK, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 16, maxWidth: 900 }}>
            {cfg.phrase}
          </h1>
          <p style={{ fontSize: 16, color: SUB, lineHeight: 1.85, marginBottom: 22, maxWidth: 760 }}>
            <strong style={{ color: INK }}>{cfg.heroStrong}</strong> {cfg.heroLede}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link href={cfg.primaryCta.href} style={{ textDecoration: "none", background: cfg.accent, color: "#fff", borderRadius: 999, padding: "11px 22px", fontSize: 14, fontWeight: 800 }}>
              {cfg.primaryCta.label} →
            </Link>
            <Link href={cfg.secondaryCta.href} style={{ textDecoration: "none", background: "#fff", color: INK, border: "1px solid #e8ecf1", borderRadius: 999, padding: "11px 22px", fontSize: 14, fontWeight: 800 }}>
              {cfg.secondaryCta.label}
            </Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            {cfg.tracks.map((t) => (
              <a key={t.tag} href={`#track-${t.tag}`} style={{
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                border: "1px solid #e8ecf1", background: "#fff", borderRadius: 999, padding: "7px 14px",
                fontSize: 13, fontWeight: 700, color: INK,
              }}>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: t.color, display: "inline-block" }} />
                {t.tag} {cfg.phrase}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: `40px ${PADX} 90px` }}>
        {cfg.tracks.map((t) => (
          <section key={t.tag} id={`track-${t.tag}`} style={{ marginBottom: 46, scrollMarginTop: 80 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, fontWeight: 900, color: "#fff", background: t.color, borderRadius: 8, padding: "6px 11px", flexShrink: 0 }}>{t.tag}</span>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: INK, letterSpacing: "-0.02em", margin: 0 }}>
                {t.title}
              </h2>
            </div>
            <p style={{ fontSize: 15, color: SUB, lineHeight: 1.8, marginBottom: 16, maxWidth: 780 }}>{t.summary}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
              {t.links.map((l) => (
                <Link key={l.href + l.name} href={l.href} style={{
                  textDecoration: "none", border: "1px solid #e8ecf1", borderRadius: 12, padding: "16px 18px",
                  background: "#fff", boxShadow: "0 1px 2px rgba(16,24,40,0.04)", display: "block",
                }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 4 }}>{l.name}</div>
                  <div style={{ fontSize: 13, color: SUB, lineHeight: 1.6 }}>{l.desc}</div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section style={{ marginTop: 8, marginBottom: 46 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            {cfg.phrase}에 포함된 것
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
            {includes.map((c) => (
              <div key={c.title} style={{ border: "1px solid #eef1f5", borderRadius: 12, padding: "18px 18px", background: "#fbfdfc" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{c.emoji}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 4 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: SUB, lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            {cfg.phrase} 자주 묻는 질문
          </h2>
          <div style={{ display: "grid", gap: 10 }}>
            {cfg.faq.map((f) => (
              <div key={f.q} style={{ border: "1px solid #eef1f5", borderRadius: 12, padding: "16px 18px", background: "#fff" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 6 }}>Q. {f.q}</div>
                <div style={{ fontSize: 14, color: SUB, lineHeight: 1.75 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginTop: 30, textAlign: "center" }}>
          <Link href={cfg.footerCta.href} style={{ textDecoration: "none", background: INK, color: "#fff", borderRadius: 999, padding: "13px 28px", fontSize: 15, fontWeight: 800, display: "inline-block" }}>
            {cfg.footerCta.label} →
          </Link>
        </div>
      </div>
    </main>
  );
}
