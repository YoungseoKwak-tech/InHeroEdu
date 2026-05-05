"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase";

interface PaymentButtonProps {
  serviceId: string;
  amount: number;
  orderName: string;
  subjectId?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TossPayments: (clientKey: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payment: (params: { customerKey: string }) => any;
    };
  }
}

function openAuthModal() {
  window.dispatchEvent(
    new CustomEvent("inhero:open-auth", {
      detail: { mode: "signup", source: "payment" },
    })
  );
}

export default function PaymentButton({
  serviceId,
  subjectId,
  label = "결제하기",
  className = "btn-primary text-sm py-2.5 px-6",
  style,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  async function launchToss(userId: string, customerName: string, customerEmail: string) {
    setLoading(true);

    try {
      const res = await fetch("/api/payments/toss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, subjectId, userId }),
      });

      const {
        clientKey,
        orderId,
        amount: serverAmount,
        currency,
        orderName: serverOrderName,
        method,
        provider,
        error,
      } = (await res.json()) as {
        clientKey?: string;
        orderId?: string;
        amount?: number;
        currency?: "USD" | "KRW";
        orderName?: string;
        method?: string;
        provider?: string;
        error?: string;
      };

      if (error || !clientKey || !orderId || !serverOrderName || typeof serverAmount !== "number") {
        throw new Error(error ?? "order error");
      }

      if (typeof window.TossPayments !== "function") {
        throw new Error("결제창을 아직 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
      }

      const toss = window.TossPayments(clientKey);
      const payment = toss.payment({ customerKey: userId });
      const successUrl = new URL("/payment/success", window.location.origin);
      successUrl.searchParams.set("serviceId", serviceId);
      if (subjectId) successUrl.searchParams.set("subjectId", subjectId);

      const failUrl = new URL("/payment/fail", window.location.origin);
      failUrl.searchParams.set("serviceId", serviceId);
      if (subjectId) failUrl.searchParams.set("subjectId", subjectId);

      await payment.requestPayment({
        method: method ?? "FOREIGN_EASY_PAY",
        provider: provider ?? "PAYPAL",
        amount: {
          value: serverAmount,
          currency: currency ?? "USD",
        },
        orderId,
        orderName: serverOrderName,
        customerName,
        customerEmail,
        metadata: {
          serviceId,
          ...(subjectId ? { subjectId } : {}),
        },
        successUrl: successUrl.toString(),
        failUrl: failUrl.toString(),
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "오류가 발생했어요.";
      if (!msg.includes("PAY_PROCESS_CANCELED")) {
        alert(msg);
      }
      setLoading(false);
    }
  }

  async function handleClick() {
    const supabase = createBrowserClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      openAuthModal();
      return;
    }

    const userEmail = session.user.email ?? "";
    const userName =
      (session.user.user_metadata?.name as string | undefined) ||
      userEmail.split("@")[0] ||
      "InHero Student";

    await launchToss(session.user.id, userName, userEmail);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={style ? undefined : className}
      style={style ? { ...style, opacity: loading ? 0.6 : 1, cursor: loading ? "default" : "pointer" } : undefined}
    >
      {loading ? "처리 중…" : label}
    </button>
  );
}
