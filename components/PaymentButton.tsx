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

type LoadingProvider = "nicepay" | "paypal" | null;

type NicePayPrepareResponse = {
  clientId?: string;
  method?: string;
  orderId?: string;
  amount?: number;
  goodsName?: string;
  returnUrl?: string;
  mallReserved?: string;
  error?: string;
  scope?: string;
};

type PayPalCheckoutResponse = {
  approveUrl?: string;
  error?: string;
  scope?: string;
};

const NICEPAY_SDK_URL = "https://pay.nicepay.co.kr/v1/js/";
const nicePayPrimary = process.env.NEXT_PUBLIC_NICEPAY_ENABLED !== "false";
const nicePaySupportedServices = new Set(["one_subject", "all_subjects"]);

// No payment provider is wired (both NicePay + PayPal public keys empty) →
// render a clean "준비 중" state instead of a button that 503s on click.
const PAYMENT_CONFIGURED = Boolean(
  (process.env.NEXT_PUBLIC_NICEPAY_CLIENT_ID || "").trim() ||
  (process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "").trim()
);

declare global {
  interface Window {
    AUTHNICE?: {
      requestPay: (payload: Record<string, unknown>) => void;
    };
  }
}

let nicePayScriptPromise: Promise<void> | null = null;

function loadNicePayScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("browser required"));
  }

  if (window.AUTHNICE) return Promise.resolve();
  if (nicePayScriptPromise) return nicePayScriptPromise;

  nicePayScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${NICEPAY_SDK_URL}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("NICEPAY SDK failed to load")),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.src = NICEPAY_SDK_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("NICEPAY SDK failed to load"));
    document.head.appendChild(script);
  });

  return nicePayScriptPromise;
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

function isNicePaySupportedService(serviceId: string) {
  return nicePaySupportedServices.has(serviceId.split(":")[0] ?? serviceId);
}

export default function PaymentButton({
  serviceId,
  amount,
  orderName,
  subjectId,
  returnTo,
  label = "Checkout",
  className = "btn-primary text-sm py-2.5 px-6",
  style,
  showPayPalBackup = true,
}: PaymentButtonProps) {
  const [loadingProvider, setLoadingProvider] = useState<LoadingProvider>(null);
  const [error, setError] = useState<string | null>(null);

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

  async function launchPayPal(customerName: string, customerEmail: string) {
    setLoadingProvider("paypal");
    setError(null);

    try {
      const res = await authFetch("/api/payments/paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          subjectId,
          customerName,
          customerEmail,
          returnTo,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as PayPalCheckoutResponse;
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

  async function launchNicePay(customerName: string, customerEmail: string) {
    setLoadingProvider("nicepay");
    setError(null);

    try {
      const res = await authFetch("/api/payments/nicepay/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          subjectId,
          amount,
          orderName,
          customerName,
          customerEmail,
          returnTo,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as NicePayPrepareResponse;
      if (!res.ok || !data.clientId || !data.orderId || !data.amount || !data.returnUrl) {
        const reason = data.error || `HTTP ${res.status}`;
        console.error("[PaymentButton] NICEPAY checkout failed", {
          status: res.status,
          scope: data.scope,
          error: data.error,
          serviceId,
          subjectId,
        });
        throw new Error(reason);
      }

      await loadNicePayScript();
      if (!window.AUTHNICE) {
        throw new Error("NICEPAY SDK unavailable.");
      }

      window.AUTHNICE.requestPay({
        clientId: data.clientId,
        method: data.method ?? "card",
        orderId: data.orderId,
        amount: data.amount,
        goodsName: data.goodsName ?? orderName,
        returnUrl: data.returnUrl,
        ...(data.mallReserved ? { mallReserved: data.mallReserved } : {}),
        fnError: (result: { errorCode?: string; errorMsg?: string }) => {
          setLoadingProvider(null);
          setError(
            result.errorMsg ??
              (result.errorCode
                ? `NICEPAY error: ${result.errorCode}`
                : "NICEPAY checkout was cancelled.")
          );
        },
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
      setLoadingProvider(null);
    }
  }

  async function handleNicePayClick() {
    const customer = await getSignedInCustomer();
    if (!customer) return;
    await launchNicePay(customer.userName, customer.userEmail);
  }

  async function handlePayPalClick() {
    const customer = await getSignedInCustomer();
    if (!customer) return;
    await launchPayPal(customer.userName, customer.userEmail);
  }

  // Payment not configured yet → clean disabled state, no failing checkout.
  if (!PAYMENT_CONFIGURED) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: style?.width ?? "auto" }}>
        <button
          type="button"
          disabled
          className={style ? undefined : className}
          style={style ? { ...style, opacity: 0.55, cursor: "not-allowed" } : { opacity: 0.55, cursor: "not-allowed" }}
        >
          결제 준비 중 · Coming soon
        </button>
        <div style={{ color: "rgba(255,255,255,0.42)", fontSize: 11, lineHeight: 1.45, fontFamily: "ui-monospace, monospace" }}>
          결제 연동 준비 중입니다. 곧 이용하실 수 있어요.
        </div>
      </div>
    );
  }

  const loading = loadingProvider !== null;
  const supportsNicePay = isNicePaySupportedService(serviceId);
  const useNicePayPrimary = nicePayPrimary && supportsNicePay;
  const primaryLabel =
    loadingProvider === "nicepay"
      ? "Opening NICEPAY…"
      : loadingProvider === "paypal"
        ? "Opening PayPal…"
        : label;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: style?.width ?? "auto" }}>
      <button
        onClick={useNicePayPrimary ? handleNicePayClick : handlePayPalClick}
        disabled={loading}
        className={style ? undefined : className}
        style={style ? { ...style, opacity: loading ? 0.6 : 1, cursor: loading ? "default" : "pointer" } : undefined}
      >
        {primaryLabel}
      </button>
      {nicePayPrimary && supportsNicePay && showPayPalBackup && (
        <button
          type="button"
          onClick={useNicePayPrimary ? handlePayPalClick : handleNicePayClick}
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
          {loadingProvider === "paypal"
            ? "Opening PayPal…"
            : loadingProvider === "nicepay"
              ? "Opening NICEPAY…"
              : useNicePayPrimary
                ? "International card / PayPal backup"
                : "Korea card / NICEPAY"}
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
        {nicePayPrimary
          ? supportsNicePay
            ? showPayPalBackup
              ? "Primary checkout opens NICEPAY. PayPal stays available as an international backup."
              : "Checkout opens NICEPAY."
            : "PayPal checkout is active for this item until NICEPAY support is enabled for it."
          : "PayPal checkout is active. NICEPAY can be re-enabled with NEXT_PUBLIC_NICEPAY_ENABLED."}
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
