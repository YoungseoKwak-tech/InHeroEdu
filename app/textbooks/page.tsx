"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createBrowserClient } from "@/lib/supabase";
import PaymentButton from "@/components/PaymentButton";
import { textbookPriceLabelUSD } from "@/lib/textbookPricing";

const PdfCover = dynamic(() => import("@/components/textbooks/PdfCover"), { ssr: false });

interface Product {
  id: string;
  subject_id: string;
  title: string;
  pdf_url: string | null;
  price_krw: number;
  chapters: number;
  status: string;
}

// ── tiny starfield ──────────────────────────────────────────────────────────
function Stars({ count = 80 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 137.508) % 100}%`,
    top:  `${(i * 97.3)   % 100}%`,
    size: i % 7 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
    opacity: 0.08 + (i % 5) * 0.06,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {stars.map((s, i) => (
        <div key={i} style={{ position: "absolute", left: s.left, top: s.top, width: s.size, height: s.size, borderRadius: "50%", background: "#EDE8DC", opacity: s.opacity }} />
      ))}
    </div>
  );
}

// ── book card ───────────────────────────────────────────────────────────────
function BookCard({ product, owned }: { product: Product; owned: boolean }) {
  const BUY_STYLE: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: "11px 24px",
    background: "rgba(200,146,58,0.1)",
    border: "1px solid rgba(200,146,58,0.3)",
    color: "#C8923A",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.12em",
    cursor: "pointer",
    transition: "all 200ms",
    width: "100%",
    justifyContent: "center",
  };
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      {/* Cover */}
      <div style={{ position: "relative", transition: "transform 400ms cubic-bezier(0.16,1,0.3,1)", transform: hovered ? "translateY(-6px)" : "translateY(0)" }}>
        {/* Book shadow */}
        <div style={{ position: "absolute", bottom: "-12px", left: "6%", right: "6%", height: "20px", background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)", filter: "blur(8px)", transition: "opacity 400ms", opacity: hovered ? 0.8 : 0.4 }} />

        {/* Book spine illusion */}
        <div style={{ position: "absolute", left: 0, top: "2px", bottom: "2px", width: "10px", background: "linear-gradient(to right, rgba(0,0,0,0.6), transparent)", zIndex: 1, borderRadius: "1px 0 0 1px" }} />

        {/* Cover image */}
        <div style={{ position: "relative", overflow: "hidden", border: "1px solid rgba(200,146,58,0.15)", boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,146,58,0.12)" : "0 12px 40px rgba(0,0,0,0.5)" }}>
          {product.pdf_url ? (
            <PdfCover url={product.pdf_url} width={280} />
          ) : (
            <div style={{ width: "100%", aspectRatio: "8.5/11", background: "linear-gradient(160deg, #1A1208 0%, #0D0A06 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#4A3820", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.12em" }}>LOADING</span>
            </div>
          )}

          {/* Lock overlay for non-owners */}
          {!owned && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(10,8,5,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", backdropFilter: "blur(1px)", opacity: hovered ? 1 : 0, transition: "opacity 300ms" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8923A" strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.16em", color: "#C8923A" }}>GET ACCESS</span>
            </div>
          )}

          {/* Owned badge */}
          {owned && (
            <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,180,80,0.15)", border: "1px solid rgba(0,180,80,0.3)", padding: "3px 10px" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.14em", color: "#00C850" }}>OWNED</span>
            </div>
          )}
        </div>
      </div>

      {/* Meta */}
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#C8923A", letterSpacing: "0.14em", marginBottom: "6px" }}>
          {product.subject_id.replace(/-/g, " ").toUpperCase()}
        </div>
        <div style={{ fontSize: "17px", fontWeight: 700, color: "#EDE8DC", letterSpacing: "-0.02em", marginBottom: "4px", lineHeight: 1.2 }}>
          {product.title}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#6A6050", marginBottom: "16px" }}>
          {product.chapters} chapters
        </div>

        {owned ? (
          <a
            href={product.pdf_url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 24px", background: "rgba(0,180,80,0.1)", border: "1px solid rgba(0,180,80,0.25)", color: "#00C850", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", textDecoration: "none", transition: "background 200ms" }}
          >
            READ  →
          </a>
        ) : (
          <PaymentButton
            serviceId="textbook"
            subjectId={product.subject_id}
            amount={product.price_krw}
            orderName={product.title}
            label={`${textbookPriceLabelUSD()}  →`}
            style={BUY_STYLE}
          />
        )}
      </div>
    </div>
  );
}

// ── main page ───────────────────────────────────────────────────────────────
export default function TextbooksPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [purchased, setPurchased] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient();
  const featuredProduct = products[0] ?? null;

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id ?? "";
      const res = await fetch(`/api/textbook-products${userId ? `?userId=${userId}` : ""}`);
      if (res.ok) {
        const { products: p, purchased: pur } = await res.json();
        setProducts(p);
        setPurchased(pur);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div style={{ background: "#0B0905", minHeight: "100vh", color: "#EDE8DC", fontFamily: "'Space Grotesk', sans-serif", paddingTop: "64px" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "100px 24px 80px", overflow: "hidden" }}>
        <Stars count={100} />

        {/* Warm glow from below */}
        <div style={{ position: "absolute", bottom: "-60px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "200px", background: "radial-gradient(ellipse, rgba(200,146,58,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ marginBottom: "28px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", color: "#C8923A", textTransform: "uppercase" }}>
              Field Manuals  ·  InHero
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(44px, 7vw, 82px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: "28px" }}>
            The study guide<br />
            <em style={{ fontStyle: "italic", color: "#C8923A", fontWeight: 700 }}>built by the people</em><br />
            who aced it.
          </h1>

          <p style={{ fontSize: "17px", color: "#7A7060", lineHeight: 1.7, maxWidth: "520px", marginBottom: "16px" }}>
            Every Field Manual is final-reviewed by Ivy League students who scored 5s on the actual exam. AP-level depth. $29.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "1px", height: "32px", background: "rgba(200,146,58,0.3)" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#6A6050", letterSpacing: "0.08em" }}>
                SUBSCRIBERS GET ALL MANUALS FREE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKS GRID ───────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 100px" }}>

        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "300px", gap: "12px" }}>
            <div style={{ width: "20px", height: "20px", border: "1px solid #C8923A", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#6A6050", letterSpacing: "0.1em" }}>LOADING MANUALS</span>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#4A3820", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: "0.12em" }}>
            NO MANUALS PUBLISHED YET
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "64px 48px" }}>
            {products.map((p) => (
              <BookCard key={p.id} product={p} owned={purchased.includes(p.subject_id)} />
            ))}
          </div>
        )}
      </section>

      {/* ── IVY REVIEWED BAR ─────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "48px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>
          {[
            { num: "5",   label: "AP exam score — our reviewers" },
            { num: String(featuredProduct?.chapters ?? 65), label: `Chapters in ${featuredProduct?.title ?? "our first manual"}` },
            { num: "$29", label: "One-time. No subscription needed." },
            { num: "∞",   label: "Included free with any plan" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-0.04em", color: "#C8923A", lineHeight: 1, marginBottom: "8px" }}>{num}</div>
              <div style={{ fontSize: "13px", color: "#6A6050", lineHeight: 1.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT'S INSIDE ────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.18em", color: "#6A6050", marginBottom: "16px" }}>
          INSIDE EVERY CHAPTER
        </div>
        <h2 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "48px" }}>
          Not a summary. A real textbook.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
          {[
            { label: "3–4 Deep Sections",    desc: "350–500 words each, mechanism-first — not just definitions" },
            { label: "AP Exam Alert Boxes",  desc: "Flags every common trap that costs students points on the real exam" },
            { label: "Key Terms",            desc: "3–6 per section with full mechanistic definitions" },
            { label: "5 MCQs per chapter",   desc: "AP-level distractors with 80–120 word worked explanations" },
            { label: "3 FRQs per chapter",   desc: "Multi-part (a)(b)(c)(d) with full rubric and model answer" },
            { label: "Ivy Reviewed",         desc: "Final pass by students who scored 5s and got into top universities" },
          ].map(({ label, desc }) => (
            <div key={label} style={{ padding: "28px 24px", background: "#0B0905" }}>
              <div style={{ width: "6px", height: "6px", background: "#C8923A", marginBottom: "16px", opacity: 0.7 }} />
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#EDE8DC", marginBottom: "8px", lineHeight: 1.3 }}>{label}</div>
              <div style={{ fontSize: "13px", color: "#6A6050", lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "100px 24px", textAlign: "center", overflow: "hidden" }}>
        <Stars count={60} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "500px", height: "200px", background: "radial-gradient(ellipse, rgba(200,146,58,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", color: "#6A6050", marginBottom: "20px" }}>
            READY
          </div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "40px" }}>
            One textbook. One time.<br />
            <span style={{ color: "#C8923A" }}>$29.</span>
          </h2>

          {featuredProduct ? (
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <PaymentButton
                serviceId="textbook"
                subjectId={featuredProduct.subject_id}
                amount={featuredProduct.price_krw}
                orderName={featuredProduct.title}
                label={`GET ${featuredProduct.title.toUpperCase()}  →`}
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 40px", background: "#C8923A", color: "#0B0905", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "12px", letterSpacing: "0.14em", border: "none", cursor: "pointer", transition: "opacity 200ms" }}
              />
            </div>
          ) : (
            <div style={{ color: "#6A6050", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.12em" }}>
              NO LIVE MANUAL AVAILABLE YET
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
