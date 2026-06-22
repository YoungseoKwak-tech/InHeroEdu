"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/app/contexts/LanguageContext";
import AuthModal from "@/components/auth/AuthModal";
import AdminNotificationBell from "@/components/admin/AdminNotificationBell";
import NavbarStreakPill from "@/components/layout/NavbarStreakPill";
import { getSafeRedirectPath } from "@/lib/auth-redirect";
import { createBrowserClient } from "@/lib/supabase";
import { authFetch, getClientSession } from "@/lib/client-auth";
import { normalizeProfileFields } from "@/lib/profile";

const NAV_LINKS = [
  // { href: "/future",          label: "🌌 FUTURE" }, // hidden — restore when /future is demo-ready
  { href: "/my-plan",         label: "Home" },
  // { href: "/textbooks",       label: "TEXTBOOKS" }, // merged into LIBRARY (sidebar) — /textbooks redirects to /library
  { href: "/academy",         label: "Courses" },
  { href: "/core-notes",      label: "Core Notes" },
  { href: "/question-bank",   label: "Question Bank" },
  { href: "/vocab",           label: "Vocab" },
  { href: "/sat",             label: "SAT" },
  { href: "/toefl",           label: "TOEFL" },
  { href: "/lounges",         label: "Lounges" },
  { href: "/library",         label: "Library" },
  { href: "/clubs",           label: "Clubs" },
  // { href: "/trajectory",      label: "TRAJECTORY" }, // hidden — restore when /trajectory is demo-ready
  { href: "/study-type",      label: "Study Type" },
  { href: "/pricing",         label: "Pricing" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authRedirectTo, setAuthRedirectTo] = useState("/my-plan");
  const [scrolled, setScrolled] = useState(false);
  // Parent-portal questions open on the shared /qa/[id] route; that page signals
  // (inhero:chrome) when it's a parent-lounge thread so we hide the cosmic
  // chrome there too and keep the user inside the /parents world.
  const [parentChrome, setParentChrome] = useState(false);
  const pathname = usePathname();
  const { lang, toggle, t } = useLang();
  const supabase = createBrowserClient();
  const [user, setUser] = useState<{ email: string | undefined } | null>(null);
  // Defense-in-depth against React #418/#423 hydration mismatch — defer
  // any auth-dependent render branch until after first client effect.
  // useState(null) above is theoretically safe (server + client both null
  // initially), but if Supabase ever resolves a session synchronously
  // from cookie before paint, the auth UI would diverge.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Listen for the parent-chrome signal from parent-lounge /qa pages.
  useEffect(() => {
    const onChrome = (e: Event) => setParentChrome(!!(e as CustomEvent).detail?.parent);
    window.addEventListener("inhero:chrome", onChrome as EventListener);
    return () => window.removeEventListener("inhero:chrome", onChrome as EventListener);
  }, []);
  // Any real route change clears the parent-chrome override (the new page
  // re-signals if it's also a parent thread).
  useEffect(() => { setParentChrome(false); }, [pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const syncProfile = async (sessionUser: {
      email?: string;
      user_metadata?: Record<string, unknown>;
    }) => {
      const profile = normalizeProfileFields(sessionUser.user_metadata ?? {});
      if (!profile.name && !profile.grade && !profile.school && !profile.referral_student_email) return;
      await authFetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
    };

    getClientSession().then(async (session) => {
      setUser(session?.user ? { email: session.user.email } : null);
      if (session?.user) await syncProfile(session.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ? { email: session.user.email } : null);
        if (session?.user) await syncProfile(session.user);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleOpenAuth = (event: Event) => {
      const detail = (event as CustomEvent<{ mode?: "login" | "signup"; redirectTo?: string }>).detail;
      setAuthMode(detail?.mode === "login" ? "login" : "signup");
      setAuthRedirectTo(getSafeRedirectPath(detail?.redirectTo));
      setAuthOpen(true);
      setMenuOpen(false);
    };

    window.addEventListener("inhero:open-auth", handleOpenAuth);
    return () => window.removeEventListener("inhero:open-auth", handleOpenAuth);
  }, []);

  const handleSignOut = () => {
    // eslint-disable-next-line no-console
    console.log("[navbar] EJECT clicked");
    // Fire-and-forget signOut: previous version awaited the call,
    // which could hang forever if the supabase client refused to
    // resolve (expired refresh token, network blip on Google OAuth
    // session). That left EJECT looking unresponsive. Now we kick
    // off signOut + clear local storage + navigate without
    // serializing on the network call.
    try {
      void supabase.auth.signOut({ scope: "global" }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error("[navbar] signOut rejected", err);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[navbar] signOut threw", err);
    }
    try {
      if (typeof window !== "undefined") {
        Object.keys(window.localStorage)
          .filter((k) => k.startsWith("sb-") || k.toLowerCase().includes("supabase"))
          .forEach((k) => window.localStorage.removeItem(k));
        Object.keys(window.sessionStorage)
          .filter((k) => k.startsWith("sb-") || k.toLowerCase().includes("supabase"))
          .forEach((k) => window.sessionStorage.removeItem(k));
      }
    } catch {
      // Storage access blocked (e.g. private mode) — fall through.
    }
    // location.replace avoids leaving the signed-in page in history.
    window.location.replace("/");
  };

  // Full-screen exam runners (SAT/TOEFL practice + free samples) have their own
  // top chrome with a live timer. The site nav is `position: fixed`, so it
  // overlapped that timer — hide the nav on these routes (keep the AuthModal so
  // the signup gate still works).
  const isExamRunner = ["/sat/test", "/sat/sample", "/toefl/test", "/toefl/sample"]
    .some((p) => pathname?.startsWith(p));
  if (isExamRunner) {
    return (
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultMode={authMode}
        redirectTo={authRedirectTo}
      />
    );
  }

  // The parent hub (/parents/*) is a self-contained white community portal
  // with its own header — hide the cosmic site chrome there, but keep the
  // AuthModal mounted so the signup gate (inhero:open-auth) still works.
  // Parent-lounge Q&A threads live on /qa/[id] but should feel like /parents too.
  if (pathname?.startsWith("/parents") || parentChrome) {
    return (
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultMode={authMode}
        redirectTo={authRedirectTo}
        audience="parent"
      />
    );
  }

  return (
    <>
    {/* Spacer pushes page content below the fixed bar (only when the nav is
        shown — /parents and exam runners return early above, so no gap there). */}
    <div aria-hidden="true" style={{ height: 64 }} />
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "64px",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #eef1f5",
        boxShadow: scrolled ? "0 4px 18px rgba(16,24,40,0.06)" : "none",
        transition: "box-shadow 250ms ease",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <nav
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 22px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* Brand */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "21px", letterSpacing: "-0.03em", color: "#0b1220", lineHeight: 1 }}>
            In<span style={{ color: "#00b85f" }}>Hero</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "1px", flex: 1, justifyContent: "center" }} className="hidden md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "7px 9px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#5b6675",
                textDecoration: "none",
                borderRadius: "8px",
                transition: "color 160ms, background 160ms",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#0b1220"; el.style.background = "#f1f4f8"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#5b6675"; el.style.background = "transparent"; }}
            >
              {t(link.label)}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }} className="hidden md:flex">
          <button
            onClick={toggle}
            title={lang === "ko" ? "View the English site" : "한국어로 보기"}
            aria-label={lang === "ko" ? "Switch to English" : "한국어로 전환"}
            style={{
              padding: "7px 12px",
              borderRadius: "999px",
              border: "1px solid rgba(0,184,95,0.35)",
              background: "rgba(0,184,95,0.06)",
              color: "#0f8a52",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 800,
              whiteSpace: "nowrap",
              letterSpacing: "0.02em",
            }}
          >
            {lang === "ko" ? "EN" : "한국어"}
          </button>
          {!mounted ? (
            <div aria-hidden="true" style={{ width: 120, height: 32 }} />
          ) : user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <AdminNotificationBell />
              <NavbarStreakPill />
              <Link href="/billing" style={{ fontSize: "13px", fontWeight: 600, color: "#0f8a52", textDecoration: "none" }}>
                {t("Billing")}
              </Link>
              <Link
                href="/me"
                title="Your dashboard"
                style={{ fontSize: "13px", fontWeight: 600, color: "#5b6675", textDecoration: "none", transition: "color 160ms" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#0b1220")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#5b6675")}
              >
                {user.email?.split("@")[0]}
              </Link>
              <button
                onClick={handleSignOut}
                style={{ fontSize: "13px", fontWeight: 600, color: "#94a3b8", background: "none", border: "none", cursor: "pointer", transition: "color 160ms" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#dc2626")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#94a3b8")}
              >
                {t("Log out")}
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => { setAuthMode("login"); setAuthOpen(true); }}
                style={{ fontSize: "13.5px", fontWeight: 700, color: "#475569", background: "none", border: "none", cursor: "pointer", transition: "color 160ms", padding: "6px 8px" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#0b1220")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#475569")}
              >
                {t("Login")}
              </button>
              <button
                onClick={() => { setAuthMode("signup"); setAuthOpen(true); }}
                style={{ background: "#00b85f", color: "#fff", fontWeight: 800, fontSize: "13.5px", padding: "10px 20px", border: "none", borderRadius: "10px", cursor: "pointer", boxShadow: "0 6px 16px rgba(0,184,95,0.28)", transition: "transform 160ms" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-1px)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "")}
              >
                {t("Sign up")}
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{ padding: "8px", background: "none", border: "none", color: "#475569", cursor: "pointer" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            background: "#fff",
            borderTop: "1px solid #eef1f5",
            boxShadow: "0 14px 30px rgba(16,24,40,0.1)",
            padding: "14px 22px 22px",
            display: "flex",
            flexDirection: "column",
            gap: "1px",
          }}
        >
          <button
            onClick={() => { toggle(); setMenuOpen(false); }}
            style={{ alignSelf: "flex-start", marginBottom: "8px", padding: "7px 13px", borderRadius: "999px", border: "1px solid rgba(0,184,95,0.35)", background: "rgba(0,184,95,0.06)", color: "#0f8a52", fontSize: "12.5px", fontWeight: 800, cursor: "pointer" }}
          >
            {lang === "ko" ? "EN" : "한국어"}
          </button>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ padding: "12px 4px", fontSize: "14.5px", fontWeight: 600, color: "#1f2937", textDecoration: "none", borderBottom: "1px solid #f1f4f8" }}
              onClick={() => setMenuOpen(false)}
            >
              {t(link.label)}
            </Link>
          ))}

          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {!mounted ? (
              <div aria-hidden="true" style={{ height: 32 }} />
            ) : user ? (
              <>
                <Link href="/billing" style={{ color: "#0f8a52", textDecoration: "none", fontSize: "14px", fontWeight: 700, textAlign: "left", padding: "10px 4px" }} onClick={() => setMenuOpen(false)}>
                  {t("Billing")}
                </Link>
                <button onClick={handleSignOut} style={{ color: "#dc2626", background: "none", border: "none", fontSize: "14px", fontWeight: 700, cursor: "pointer", textAlign: "left", padding: "10px 4px" }}>
                  {t("Log out")}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setAuthMode("login"); setAuthOpen(true); setMenuOpen(false); }} style={{ color: "#475569", background: "none", border: "none", fontSize: "14px", fontWeight: 700, cursor: "pointer", textAlign: "left", padding: "10px 4px" }}>
                  {t("Login")}
                </button>
                <button onClick={() => { setAuthMode("signup"); setAuthOpen(true); setMenuOpen(false); }} style={{ width: "100%", background: "#00b85f", color: "#fff", fontWeight: 800, fontSize: "14.5px", padding: "13px 0", border: "none", borderRadius: "10px", cursor: "pointer" }}>
                  {t("Sign up")}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultMode={authMode}
        redirectTo={authRedirectTo}
      />
    </header>
    </>
  );
}
