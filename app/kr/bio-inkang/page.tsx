import type { Metadata } from "next";
import Link from "next/link";

/**
 * /kr/bio-inkang — "바이오 인강" 정확 일치(exact-match) 한국어 SEO 랜딩.
 * 구글에서 "바이오 인강 / 생물 인강 / AP 바이오 인강 / IB 바이오 인강"을 검색하면
 * 이 페이지가 노출되도록, 해당 문구를 <title>·<h1>·소제목·본문·JSON-LD에 반복 배치한다.
 * 실제 도구(코어노트·문제은행·교재·강의)로 연결한다. /mock-exams 랜딩과 동일한 패턴.
 */

const PHRASE = "바이오 인강";
const INK = "#0f1720";
const SUB = "#475467";
const GREEN = "#1D9E75";
const MAXW = 1100;
const PADX = "clamp(16px, 4vw, 40px)";

export const metadata: Metadata = {
  title: "바이오 인강 — AP·IB·내신 생물 인터넷강의 | 코어노트·문제은행",
  description:
    "바이오 인강 한 곳에서 끝내기. 아이비리그생이 만든 AP 바이오 인강, IB Biology 인강, 내신·Honors 생물 인강 — 핵심개념 코어노트, 단원별 문제은행, 디지털 교재, AI 튜터까지. 지금 무료로 시작하세요.",
  keywords: [
    "바이오 인강",
    "생물 인강",
    "AP 바이오 인강",
    "IB 바이오 인강",
    "AP Biology 인강",
    "IB Biology 인강",
    "생명과학 인강",
    "미국 생물 인강",
    "바이올로지 인강",
    "AP 생물 인강",
    "내신 생물 인강",
    "InHero",
  ],
  alternates: { canonical: "/kr/bio-inkang" },
  openGraph: {
    type: "website",
    url: "https://inheroedu.com/kr/bio-inkang",
    title: "바이오 인강 — AP·IB·내신 생물 인터넷강의",
    description:
      "AP 바이오 인강 · IB Biology 인강 · 내신 생물 인강. 코어노트 + 문제은행 + 디지털 교재 + AI 튜터를 한 곳에서.",
    siteName: "InHero",
    locale: "ko_KR",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "바이오 인강 — AP·IB·내신 생물 인터넷강의 | InHero",
    description: "AP·IB·내신 바이오 인강을 코어노트·문제은행·교재와 함께 한 곳에서.",
  },
};

/** 과목별 트랙 — 각 트랙 안에 실제 도구(강의·코어노트·문제은행·교재)로 연결한다. */
const TRACKS = [
  {
    tag: "AP",
    title: "AP 바이오 인강 (AP Biology)",
    color: "#1D9E75",
    summary:
      "AP Biology 8개 단원을 개념 중심으로 정복하는 AP 바이오 인강. 세포·유전·진화·생태까지, 시험에 나오는 핵심만 한국어 코어노트로 정리하고 단원별 문제로 바로 확인합니다.",
    links: [
      { href: "/kr/courses/ap-biology", name: "AP 바이오 인강 바로가기", desc: "AP Biology 강의·개념 정리 (한국어)" },
      { href: "/core-notes", name: "AP 바이오 코어노트", desc: "단원별 핵심개념 요약 노트 (영어·한국어 병기)" },
      { href: "/question-bank/ap-biology", name: "AP 바이오 문제은행", desc: "단원별 실전 MCQ + 해설" },
      { href: "/textbooks/ap-biology", name: "AP 바이오 디지털 교재", desc: "AP Biology Ultimate 원서형 교재" },
    ],
  },
  {
    tag: "IB",
    title: "IB 바이오 인강 (IB Biology)",
    color: "#7C5CFC",
    summary:
      "IB Biology(SL·HL)를 Paper 유형에 맞춰 준비하는 IB 바이오 인강. 6개 대단원 코어노트와 Paper 스타일 문제로 개념과 시험 감각을 동시에 잡습니다.",
    links: [
      { href: "/core-notes", name: "IB 바이오 코어노트", desc: "IB Biology 단원별 개념 노트 (영어·한국어)" },
      { href: "/textbooks/ib-biology-ultimate", name: "IB 바이오 디지털 교재", desc: "IB Biology Ultimate 교재" },
      { href: "/mock-exams", name: "IB 바이오 실전 연습", desc: "IB Paper 유형 문제 풀이" },
    ],
  },
  {
    tag: "내신",
    title: "내신·Honors 바이오 인강",
    color: "#F59E0B",
    summary:
      "미국 고교 내신(Honors Biology) 대비 바이오 인강. 학교 진도에 맞춰 개념을 다지고 서술형·객관식으로 마무리합니다.",
    links: [
      { href: "/kr/courses/honors-biology", name: "Honors 바이오 인강", desc: "Honors Biology 강의 (한국어)" },
      { href: "/kr/courses/core-biology", name: "기초 생물 인강", desc: "Biology 기초 개념 강의" },
      { href: "/textbooks/honors-biology-ultimate", name: "Honors 바이오 교재", desc: "Honors Biology Ultimate 교재" },
    ],
  },
];

/** 포함 구성 — "바이오 인강"에 무엇이 딸려오는지. */
const INCLUDES = [
  { emoji: "📘", title: "개념 코어노트", desc: "아이비리그생이 만든 한국어 핵심개념 노트. 바이오 인강의 뼈대." },
  { emoji: "🧪", title: "단원별 문제은행", desc: "AP·IB 유형 객관식 + 즉시 해설로 개념을 시험 문제로 확인." },
  { emoji: "📕", title: "디지털 교재", desc: "AP·IB·Honors 바이오 원서형 교재를 온라인으로." },
  { emoji: "🤖", title: "AI 튜터", desc: "모르는 개념은 24시간 AI 튜터에게 한국어로 질문." },
];

/** 자주 묻는 질문 — JSON-LD FAQPage와 동일한 내용을 화면에도 노출. */
const FAQ = [
  {
    q: "바이오 인강, 어디서부터 시작하나요?",
    a: "과정(AP·IB·내신)을 고른 뒤 해당 바이오 인강의 코어노트로 개념을 잡고, 단원별 문제은행으로 바로 확인하는 순서를 추천합니다. 회원가입 없이도 미리보기가 가능합니다.",
  },
  {
    q: "AP 바이오 인강과 IB 바이오 인강 중 무엇을 들어야 하나요?",
    a: "다니는 학교 커리큘럼을 따르세요. AP 과정은 AP Biology 바이오 인강을, IB 과정은 IB Biology 바이오 인강을 선택하면 됩니다. 내신 대비는 Honors 바이오 인강을 추천합니다.",
  },
  {
    q: "바이오 인강이 한국어로 제공되나요?",
    a: "네. 모든 생물 코어노트는 영어·한국어 병기로 제공되어, 미국 교과 용어를 한국어 설명과 함께 익힐 수 있습니다.",
  },
  {
    q: "바이오 인강은 무료인가요?",
    a: "핵심 콘텐츠는 무료로 미리 볼 수 있고, 전체 문제은행·교재는 요금제로 잠금 해제됩니다. 먼저 무료로 체험해 보세요.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://inheroedu.com/kr/bio-inkang#webpage",
      name: "바이오 인강 — AP·IB·내신 생물 인터넷강의",
      description:
        "AP 바이오 인강, IB Biology 인강, 내신·Honors 생물 인강을 코어노트·문제은행·교재와 함께 한 곳에서 제공하는 바이오 인강.",
      inLanguage: "ko",
      url: "https://inheroedu.com/kr/bio-inkang",
    },
    {
      "@type": "Course",
      name: "바이오 인강 (AP Biology 인터넷강의)",
      description:
        "AP Biology 8개 단원을 한국어 코어노트와 단원별 문제로 정복하는 바이오 인강.",
      inLanguage: "ko",
      provider: {
        "@type": "Organization",
        name: "InHero",
        url: "https://inheroedu.com",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: "P8W",
      },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", category: "Free preview" },
    },
    {
      "@type": "ItemList",
      itemListElement: TRACKS.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.title,
        url: `https://inheroedu.com${t.links[0].href}`,
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
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: "https://inheroedu.com/kr" },
        { "@type": "ListItem", position: 2, name: "바이오 인강", item: "https://inheroedu.com/kr/bio-inkang" },
      ],
    },
  ],
};

export default function BioInkangLanding() {
  return (
    <main style={{ background: "#fff", color: INK, minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div style={{ background: "linear-gradient(180deg,#f4faf7 0%, #ffffff 100%)", borderBottom: "1px solid #eef1f5" }}>
        <div style={{ maxWidth: MAXW, margin: "0 auto", padding: `52px ${PADX} 44px` }}>
          <p style={{ fontSize: 11.5, letterSpacing: "0.18em", textTransform: "uppercase", color: GREEN, fontWeight: 800, marginBottom: 12 }}>
            🧬 AP · IB · 내신 생물 인터넷강의
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5.4vw, 3.6rem)", fontWeight: 800, color: INK, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 16, maxWidth: 900 }}>
            바이오 인강
          </h1>
          <p style={{ fontSize: 16, color: SUB, lineHeight: 1.85, marginBottom: 22, maxWidth: 760 }}>
            <strong style={{ color: INK }}>AP 바이오 인강 · IB Biology 인강 · 내신 생물 인강</strong>을 한 곳에서. 아이비리그생이 만든 한국어
            핵심개념 코어노트, 단원별 문제은행, 디지털 교재, 그리고 24시간 AI 튜터까지 — 바이오 인강에 필요한 모든 것을 담았습니다.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link href="/kr/courses/ap-biology" style={{ textDecoration: "none", background: GREEN, color: "#fff", borderRadius: 999, padding: "11px 22px", fontSize: 14, fontWeight: 800 }}>
              AP 바이오 인강 시작하기 →
            </Link>
            <Link href="/core-notes" style={{ textDecoration: "none", background: "#fff", color: INK, border: "1px solid #e8ecf1", borderRadius: 999, padding: "11px 22px", fontSize: 14, fontWeight: 800 }}>
              바이오 코어노트 보기
            </Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            {TRACKS.map((t) => (
              <a key={t.tag} href={`#track-${t.tag}`} style={{
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                border: "1px solid #e8ecf1", background: "#fff", borderRadius: 999, padding: "7px 14px",
                fontSize: 13, fontWeight: 700, color: INK,
              }}>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: t.color, display: "inline-block" }} />
                {t.tag} 바이오 인강
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: `40px ${PADX} 90px` }}>
        {/* 트랙 — 과목별 바이오 인강 */}
        {TRACKS.map((t) => (
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

        {/* 포함 구성 */}
        <section style={{ marginTop: 8, marginBottom: 46 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            바이오 인강에 포함된 것
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
            {INCLUDES.map((c) => (
              <div key={c.title} style={{ border: "1px solid #eef1f5", borderRadius: 12, padding: "18px 18px", background: "#fbfdfc" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{c.emoji}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 4 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: SUB, lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: INK, letterSpacing: "-0.02em", marginBottom: 16 }}>
            바이오 인강 자주 묻는 질문
          </h2>
          <div style={{ display: "grid", gap: 10 }}>
            {FAQ.map((f) => (
              <div key={f.q} style={{ border: "1px solid #eef1f5", borderRadius: 12, padding: "16px 18px", background: "#fff" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 6 }}>Q. {f.q}</div>
                <div style={{ fontSize: 14, color: SUB, lineHeight: 1.75 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginTop: 30, textAlign: "center" }}>
          <Link href="/kr/courses" style={{ textDecoration: "none", background: INK, color: "#fff", borderRadius: 999, padding: "13px 28px", fontSize: 15, fontWeight: 800, display: "inline-block" }}>
            전체 바이오 인강·강의 보러가기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
