"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSafeRedirectPath } from "@/lib/auth-redirect";
import { getClientSession } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error(message)), ms);
    }),
  ]).finally(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });
}

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function finishOAuthSignIn() {
      const params = new URLSearchParams(window.location.search);
      const next = getSafeRedirectPath(params.get("next"));
      const providerError = params.get("error_description") || params.get("error");

      if (providerError) {
        setError(providerError);
        return;
      }

      try {
        const supabase = createBrowserClient();
        const code = params.get("code");

        if (code) {
          const { error: exchangeError } = await withTimeout(
            supabase.auth.exchangeCodeForSession(code),
            10_000,
            "Google sign-in took too long. Please try again.",
          );
          if (exchangeError) throw exchangeError;
        } else {
          const session = await withTimeout(
            getClientSession(),
            10_000,
            "Google sign-in session took too long. Please try again.",
          );
          if (!session) throw new Error("No Google sign-in session was returned.");
        }

        if (!cancelled) router.replace(next);
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    }

    finishOAuthSignIn();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <main
      style={{
        minHeight: "calc(100vh - 4rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "#00000A",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(12,12,18,0.94)",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        {error ? (
          <>
            <p style={{ color: "#f87171", fontWeight: 800, marginBottom: 8 }}>
              Google sign-in could not finish.
            </p>
            <p style={{ color: "rgba(255,255,255,0.62)", fontSize: 14, lineHeight: 1.6 }}>
              {error}
            </p>
            <Link
              href="/auth/login"
              style={{
                display: "inline-flex",
                marginTop: 20,
                padding: "0.75rem 1rem",
                borderRadius: 12,
                background: "#00FFB2",
                color: "#050505",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Try sign in again
            </Link>
          </>
        ) : (
          <>
            <div
              aria-hidden="true"
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.16)",
                borderTopColor: "#00FFB2",
                animation: "auth-spin 0.8s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p style={{ color: "rgba(255,255,255,0.72)", fontWeight: 700 }}>
              Finishing Google sign-in...
            </p>
            <style>{`@keyframes auth-spin { to { transform: rotate(360deg); } }`}</style>
          </>
        )}
      </div>
    </main>
  );
}
