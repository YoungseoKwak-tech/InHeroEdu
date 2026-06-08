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
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "64px",
        transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        background: scrolled ? "rgba(0,0,8,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,136,0.08)" : "1px solid transparent",
      }}
    >
      {/* Scanline overlay on scroll */}
      {scrolled && (
        <div className="scanlines" style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }} />
      )}

      <nav
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo + Mission Control subtitle */}
        <Link href="/" style={{ display: "flex", flexDirection: "column", textDecoration: "none", flexShrink: 0, gap: "1px" }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            letterSpacing: "-0.03em",
            color: "#fff",
            lineHeight: 1,
          }}>
            In<span style={{ color: "#00FF88" }}>Hero</span>
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "8px",
            letterSpacing: "0.18em",
            color: "#444466",
            textTransform: "uppercase",
            lineHeight: 1,
          }}>
            MISSION CONTROL
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1, justifyContent: "center" }} className="hidden md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "6px 7px",
                fontSize: "10.5px",
                fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.06em",
                color: "#444466",
                textDecoration: "none",
                borderRadius: "3px",
                transition: "color 200ms, background 200ms",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "#00FF88";
                el.style.background = "rgba(0,255,136,0.05)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "#444466";
                el.style.background = "transparent";
              }}
            >
              {t(link.label)}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }} className="hidden md:flex">
          {/* Language toggle — flips the whole site via a server-read cookie
              (see LanguageContext). Shows the language you'd switch TO. */}
          <button
            onClick={toggle}
            title={lang === "ko" ? "View the English site" : "한국어로 보기"}
            aria-label={lang === "ko" ? "Switch to English" : "한국어로 전환"}
            style={{
              padding: "7px 10px",
              borderRadius: "999px",
              border: "1px solid rgba(0,255,136,0.18)",
              background: "rgba(0,255,136,0.045)",
              color: "#00FF88",
              cursor: "none",
              fontSize: "10.5px",
              fontWeight: 800,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
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
              <Link
                href="/billing"
                style={{
                  fontSize: "11px",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#00FF88",
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                }}
              >
                {t("Billing")}
              </Link>
              <Link
                href="/me"
                title="Your dashboard"
                style={{
                  fontSize: "12px",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#8888AA",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "color 200ms",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#00FF88")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8888AA")}
              >
                {user.email?.split("@")[0]}
              </Link>
              <button
                onClick={handleSignOut}
                style={{
                  fontSize: "12px",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#444466",
                  background: "none",
                  border: "none",
                  cursor: "none",
                  transition: "color 200ms",
                  letterSpacing: "0.06em",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FF3B3B")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#444466")}
              >
                {t("Log out")}
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => { setAuthMode("login"); setAuthOpen(true); }}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.08em",
                  color: "#8888AA",
                  background: "none",
                  border: "none",
                  cursor: "none",
                  transition: "color 200ms",
                  padding: "6px 8px",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#E8E8F0")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8888AA")}
              >
                {t("Login")}
              </button>
              <button
                onClick={() => { setAuthMode("signup"); setAuthOpen(true); }}
                className="hud-btn"
                style={{
                  background: "#00FF88",
                  color: "#000",
                  fontWeight: 700,
                  fontSize: "12px",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.1em",
                  padding: "9px 20px",
                  border: "none",
                  cursor: "none",
                  transition: "all 200ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {t("LAUNCH →")}
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{
            padding: "8px",
            background: "none",
            border: "none",
            color: "#8888AA",
            cursor: "none",
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            background: "rgba(0,0,8,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(0,255,136,0.08)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {/* Language toggle (mobile) */}
          <button
            onClick={() => { toggle(); setMenuOpen(false); }}
            style={{
              alignSelf: "flex-start",
              marginBottom: "6px",
              padding: "7px 12px",
              borderRadius: "999px",
              border: "1px solid rgba(0,255,136,0.18)",
              background: "rgba(0,255,136,0.045)",
              color: "#00FF88",
              fontSize: "11px",
              fontWeight: 800,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.08em",
            }}
          >
            {lang === "ko" ? "EN" : "한국어"}
          </button>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "10px 4px",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.1em",
                color: "#444466",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
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
                <Link
                  href="/billing"
                  style={{
                    color: "#00FF88",
                    textDecoration: "none",
                    fontSize: "12px",
                    fontFamily: "'JetBrains Mono', monospace",
                    textAlign: "left",
                    padding: "10px 4px",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  BILLING
                </Link>
                <button
                  onClick={handleSignOut}
                  style={{ color: "#FF3B3B", background: "none", border: "none", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", cursor: "none", textAlign: "left", padding: "10px 4px" }}
                >
                  {t("Log out")}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setAuthMode("login"); setAuthOpen(true); setMenuOpen(false); }}
                  style={{ color: "#8888AA", background: "none", border: "none", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", cursor: "none", textAlign: "left", padding: "10px 4px" }}
                >
                  {t("Login")}
                </button>
                <button
                  onClick={() => { setAuthMode("signup"); setAuthOpen(true); setMenuOpen(false); }}
                  className="hud-btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}
                >
                  {t("LAUNCH →")}
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
  );
}
