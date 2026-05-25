"use client";

import { useState } from "react";
import { authFetch } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";

interface PaymentButtonProps {
  serviceId: string;
  amount: number;
  orderName: string;
  subjectId?: string;
  returnTo?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

function openAuthModal(returnTo?: string) {
  const safeReturnTo =
    typeof returnTo === "string" &&
    returnTo.startsWith("/") &&
    !returnTo.startsWith("//") &&
    !returnTo.includes("\\")
      ? returnTo
      : "/dashboard";

  window.dispatchEvent(
    new CustomEvent("inhero:open-auth", {
      detail: {
        mode: "signup",
        source: "payment",
        redirectTo: safeReturnTo,
      },
    })
  );
}

export default function PaymentButton({
  serviceId,
  subjectId,
  returnTo,
  label = "Checkout",
  className = "btn-primary text-sm py-2.5 px-6",
  style,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function launchPayPal(customerName: string, customerEmail: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch("/api/payments/paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, subjectId, customerName, customerEmail, returnTo }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        approveUrl?: string;
        error?: string;
        scope?: string;
      };
      if (!res.ok || !data.approveUrl) {
        const reason = data.error || `HTTP ${res.status}`;
        console.error("[PaymentButton] checkout failed", {
          status: res.status,
          scope: data.scope,
          error: data.error,
          serviceId,
          subjectId,
        });
        throw new Error(reason);
      }

      window.location.href = data.approveUrl;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
      setLoading(false);
    }
  }

  async function handleClick() {
    const supabase = createBrowserClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      openAuthModal(returnTo);
      return;
    }

    const userEmail = session.user.email ?? "";
    const userName =
      (session.user.user_metadata?.name as string | undefined) ||
      userEmail.split("@")[0] ||
      "InHero Student";

    await launchPayPal(userName, userEmail);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: style?.width ?? "auto" }}>
      <button
        onClick={handleClick}
        disabled={loading}
        className={style ? undefined : className}
        style={style ? { ...style, opacity: loading ? 0.6 : 1, cursor: loading ? "default" : "pointer" } : undefined}
      >
        {loading ? "Processing…" : label}
      </button>
      {error && (
        <div
          role="alert"
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.32)",
            color: "#fca5a5",
            fontSize: 12,
            lineHeight: 1.5,
            fontFamily: "ui-monospace, monospace",
            wordBreak: "break-word",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 4, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 10 }}>
            Checkout failed
          </div>
          {error}
        </div>
      )}
    </div>
  );
}
