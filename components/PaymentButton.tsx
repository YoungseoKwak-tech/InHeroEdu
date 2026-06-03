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

type LoadingProvider = "paddle" | "paypal" | null;

type PaddleEvent = {
  name?: string;
  data?: {
    id?: string;
    transaction_id?: string;
    transactionId?: string;
  };
};

type PaddleCheckoutResponse = {
  clientToken?: string;
  environment?: "sandbox" | "production";
  priceId?: string;
  localOrderId?: string;
  serviceId?: string;
  subjectId?: string | null;
  returnTo?: string | null;
  customer?: {
    email?: string;
    name?: string;
  };
  customData?: Record<string, unknown>;
  error?: string;
  scope?: string;
};

type PaddleWindow = Window & {
  Paddle?: {
    Environment?: {
      set?: (environment: "sandbox" | "production") => void;
    };
    Initialize?: (options: {
      token: string;
      eventCallback?: (event: PaddleEvent) => void;
    }) => void;
    Checkout?: {
      open?: (options: {
        items: Array<{ priceId: string; quantity: number }>;
        customer?: { email?: string };
        customData?: Record<string, unknown>;
        settings?: {
          displayMode?: "overlay" | "inline";
          theme?: "light" | "dark";
          successUrl?: string;
        };
      }) => void;
    };
  };
};

let paddleScriptPromise: Promise<void> | null = null;
const paddleClientConfigured = Boolean(process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN);

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

function loadPaddleScript() {
  const paddleWindow = window as PaddleWindow;
  if (paddleWindow.Paddle) return Promise.resolve();
  if (paddleScriptPromise) return paddleScriptPromise;

  paddleScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Paddle checkout."));
    document.head.appendChild(script);
  });

  return paddleScriptPromise;
}

function buildSuccessUrl({
  localOrderId,
  serviceId,
  subjectId,
  returnTo,
  transactionId,
}: {
  localOrderId: string;
  serviceId?: string;
  subjectId?: string | null;
  returnTo?: string | null;
  transactionId?: string | null;
}) {
  const url = new URL("/payment/success", window.location.origin);
  url.searchParams.set("provider", "paddle");
  url.searchParams.set("localOrderId", localOrderId);
  if (serviceId) url.searchParams.set("serviceId", serviceId);
  if (subjectId) url.searchParams.set("subjectId", subjectId);
  if (returnTo) url.searchParams.set("returnTo", returnTo);
  if (transactionId) url.searchParams.set("transactionId", transactionId);
  return url.toString();
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

  async function launchPaddle(customerName: string, customerEmail: string) {
    setLoadingProvider("paddle");
    setError(null);
    try {
      const res = await authFetch("/api/payments/paddle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, subjectId, customerName, customerEmail, returnTo }),
      });

      const data = (await res.json().catch(() => ({}))) as PaddleCheckoutResponse;
      if (!res.ok || !data.clientToken || !data.priceId || !data.localOrderId) {
        const reason = data.error || `HTTP ${res.status}`;
        console.error("[PaymentButton] Paddle checkout failed", {
          status: res.status,
          scope: data.scope,
          error: data.error,
          serviceId,
          subjectId,
        });
        throw new Error(reason);
      }

      await loadPaddleScript();
      const paddleWindow = window as PaddleWindow;
      const paddle = paddleWindow.Paddle;
      if (!paddle?.Initialize || !paddle.Checkout?.open) {
        throw new Error("Paddle checkout unavailable.");
      }

      const successUrl = buildSuccessUrl({
        localOrderId: data.localOrderId,
        serviceId: data.serviceId,
        subjectId: data.subjectId,
        returnTo: data.returnTo,
      });

      if (data.environment === "sandbox") {
        paddle.Environment?.set?.("sandbox");
      }
      paddle.Initialize({
        token: data.clientToken,
        eventCallback: (event) => {
          if (event.name !== "checkout.completed") return;

          const transactionId =
            event.data?.transaction_id ??
            event.data?.transactionId ??
            event.data?.id ??
            null;

          window.location.href = buildSuccessUrl({
            localOrderId: data.localOrderId!,
            serviceId: data.serviceId,
            subjectId: data.subjectId,
            returnTo: data.returnTo,
            transactionId,
          });
        },
      });

      paddle.Checkout.open({
        items: [{ priceId: data.priceId, quantity: 1 }],
        customer: {
          email: data.customer?.email || customerEmail,
        },
        customData: data.customData,
        settings: {
          displayMode: "overlay",
          theme: "dark",
          successUrl,
        },
      });
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

  async function handlePaddleClick() {
    const customer = await getSignedInCustomer();
    if (!customer) return;
    await launchPaddle(customer.userName, customer.userEmail);
  }

  async function handlePayPalClick() {
    const customer = await getSignedInCustomer();
    if (!customer) return;
    await launchPayPal(customer.userName, customer.userEmail);
  }

  const loading = loadingProvider !== null;
  const usePaddlePrimary = paddleClientConfigured;
  const primaryLabel =
    loadingProvider === "paddle"
      ? "Opening secure checkout…"
      : loadingProvider === "paypal"
        ? "Opening PayPal…"
        : label;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: style?.width ?? "auto" }}>
      <button
        onClick={usePaddlePrimary ? handlePaddleClick : handlePayPalClick}
        disabled={loading}
        className={style ? undefined : className}
        style={style ? { ...style, opacity: loading ? 0.6 : 1, cursor: loading ? "default" : "pointer" } : undefined}
      >
        {primaryLabel}
      </button>
      {usePaddlePrimary && showPayPalBackup && (
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
          {loadingProvider === "paypal" ? "Opening PayPal…" : "PayPal backup (outside Korea)"}
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
        {usePaddlePrimary
          ? "Secure card checkout by Paddle. PayPal may block Korea-to-Korea payments."
          : "Global PayPal checkout is active. Korea-friendly card checkout is being connected."}
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
