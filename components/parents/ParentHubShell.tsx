"use client";

/**
 * Shared white-UI shell for parent content pages (roadmap, AP guide, …).
 *
 * Parents expect Naver/blog-style white, readable layouts, so content pages
 * render on a clean white surface over the cosmic background. The shell owns
 * the top bar, the header, and the signup CTAs (which reuse the global auth
 * modal); each page supplies its own body as children.
 */

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";
import CreditWidget from "@/components/parents/CreditWidget";

export default function ParentHubShell({
  eyebrow,
  title,
  intro,
  ctaTitle = "자녀의 활동·학습을 InHero에서 시작하세요",
  ctaDesc = "AP 문제 은행 · 핵심 노트 · 디지털 교재까지, 무료 가입 한 번이면 전부.",
  maxWidth = 880,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  ctaTitle?: string;
  ctaDesc?: string;
  /** Content column width. Wider (e.g. 1280) for tool-heavy pages like SAT. */
  maxWidth?: number;
  children: ReactNode;
}) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => { getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {}); }, []);

  const gate = () => {
    if (loggedIn) router.push("/question-bank");
    else window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/question-bank" } }));
  };

  // Don't tell an already-signed-in parent to "sign up" again — swap the copy
  // to a continue/explore prompt (gate() already routes them to the content).
  const ctaTitleShown = loggedIn ? "자녀의 활동·학습, InHero에서 이어가세요" : ctaTitle;
  const ctaDescShown = loggedIn ? "AP 문제 은행 · 핵심 노트 · 디지털 교재까지 전부 이용하실 수 있어요." : ctaDesc;
  const ctaTopLabel = loggedIn ? "자료 보러 가기 →" : "무료 가입 →";
  const ctaBottomLabel = loggedIn ? "모든 자료 보기 →" : "무료 가입하고 모든 자료 보기 →";

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
              In<span style={{ color: "#00b85f" }}>Hero</span> · 학부모
            </span>
            {loggedIn && <CreditWidget loggedIn={loggedIn} />}
          </div>
        </div>
      </div>

      <div style={{ maxWidth, margin: "0 auto", padding: "40px 20px 100px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#dc2680", letterSpacing: "0.04em", marginBottom: 10 }}>{eyebrow}</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>{title}</h1>
        <div style={{ fontSize: 15.5, color: "#475569", lineHeight: 1.8, marginBottom: 28 }}>{intro}</div>

        <div style={{ background: "linear-gradient(135deg,#0a0a14,#13131f)", borderRadius: 14, padding: "20px 22px", marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{ctaTitleShown}</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>{ctaDescShown}</div>
          </div>
          <button onClick={gate} style={{ background: "#00FF88", color: "#000", border: "none", borderRadius: 8, padding: "12px 22px", fontWeight: 800, fontSize: 13.5, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer", whiteSpace: "nowrap" }}>
            {ctaTopLabel}
          </button>
        </div>

        {children}

        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 36, borderTop: "1px solid #e6e8ec" }}>
          <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>{ctaTitleShown}</div>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 20 }}>{ctaDescShown}</p>
          <button onClick={gate} style={{ background: "#1a1a1f", color: "#fff", border: "none", borderRadius: 8, padding: "14px 34px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" }}>
            {ctaBottomLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
