"use client";

import { useState } from "react";
import { authFetch, getClientSession } from "@/lib/client-auth";

interface PaymentButtonProps {
  serviceId: string;
  amount: number;
  orderName: string;
  subjectId?: string;
  returnTo?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  showPayPalBackup?: boolean;
}

type LoadingProvider = "lemonsqueezy" | "paypal" | null;

type LemonSqueezyCheckoutResponse = {
  checkoutUrl?: string;
  localOrderId?: string;
  serviceId?: string;
  subjectId?: string | null;
  returnTo?: string | null;
  error?: string;
  scope?: string;
};

const lemonSqueezyPrimary =
  process.env.NEXT_PUBLIC_LEMONSQUEEZY_ENABLED === "true";

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
  showPayPalBackup = true,
}: PaymentButtonProps) {
  const [loadingProvider, setLoadingProvider] = useState<LoadingProvider>(null);
  const [error, setError] = useState<string | null>(null);

  async function launchPayPal(customerName: string, customerEmail: string) {
    setLoadingProvider("paypal");
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
        console.error("[PaymentButton] PayPal checkout failed", {
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
      setLoadingProvider(null);
    }
  }

  async function launchLemonSqueezy(customerName: string, customerEmail: string) {
    setLoadingProvider("lemonsqueezy");
    setError(null);
    try {
      const res = await authFetch("/api/payments/lemonsqueezy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, subjectId, customerName, customerEmail, returnTo }),
      });

      const data = (await res.json().catch(() => ({}))) as LemonSqueezyCheckoutResponse;
      if (!res.ok || !data.checkoutUrl || !data.localOrderId) {
        const reason = data.error || `HTTP ${res.status}`;
        console.error("[PaymentButton] Lemon Squeezy checkout failed", {
          status: res.status,
          scope: data.scope,
          error: data.error,
          serviceId,
          subjectId,
        });
        throw new Error(reason);
      }

      window.location.href = data.checkoutUrl;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
      setLoadingProvider(null);
    }
  }

  async function getSignedInCustomer() {
    const session = await getClientSession();

    if (!session?.user) {
      openAuthModal(returnTo);
      return null;
    }

    const userEmail = session.user.email ?? "";
    const userName =
      (session.user.user_metadata?.name as string | undefined) ||
      userEmail.split("@")[0] ||
      "InHero Student";

    return { userEmail, userName };
  }

  async function handleLemonSqueezyClick() {
    const customer = await getSignedInCustomer();
    if (!customer) return;
    await launchLemonSqueezy(customer.userName, customer.userEmail);
  }

  async function handlePayPalClick() {
    const customer = await getSignedInCustomer();
    if (!customer) return;
    await launchPayPal(customer.userName, customer.userEmail);
  }

  const loading = loadingProvider !== null;
  const useLemonSqueezyPrimary = lemonSqueezyPrimary;
  const primaryLabel =
    loadingProvider === "lemonsqueezy"
      ? "Opening secure checkout…"
      : loadingProvider === "paypal"
        ? "Opening PayPal…"
        : label;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: style?.width ?? "auto" }}>
      <button
        onClick={useLemonSqueezyPrimary ? handleLemonSqueezyClick : handlePayPalClick}
        disabled={loading}
        className={style ? undefined : className}
        style={style ? { ...style, opacity: loading ? 0.6 : 1, cursor: loading ? "default" : "pointer" } : undefined}
      >
        {primaryLabel}
      </button>
      {useLemonSqueezyPrimary && showPayPalBackup && (
        <button
          type="button"
          onClick={handlePayPalClick}
          disabled={loading}
          style={{
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 12,
            background: "rgba(255,255,255,0.035)",
            color: "rgba(255,255,255,0.68)",
            padding: "9px 12px",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loadingProvider === "paypal" ? "Opening PayPal…" : "PayPal backup"}
        </button>
      )}
      <div
        style={{
          color: "rgba(255,255,255,0.42)",
          fontSize: 11,
          lineHeight: 1.45,
          fontFamily: "ui-monospace, monospace",
        }}
      >
        {useLemonSqueezyPrimary
          ? "Secure global card checkout by Lemon Squeezy. PayPal remains as backup."
          : "Global PayPal checkout is active. Lemon Squeezy checkout is being connected."}
      </div>
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
