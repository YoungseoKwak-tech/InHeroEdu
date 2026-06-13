"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";

function SuccessInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "pending" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const provider = params.get("provider");
    const serviceId = params.get("serviceId");
    const subjectId = params.get("subjectId");
    let cancelled = false;

    const isPayPal =
      provider === "paypal" ||
      params.has("localOrderId") ||
      params.has("token") ||
      params.has("subscription_id");
    const isNicePay = provider === "nicepay";

    let body: Record<string, unknown> | null = null;

    if (isNicePay) {
      const localOrderId = params.get("localOrderId") ?? params.get("orderId");

      if (!localOrderId) {
        setStatus("error");
        setErrorMsg("Payment info missing.");
        return;
      }

      body = {
        provider: "nicepay",
        localOrderId,
        serviceId,
        subjectId,
      };
    } else if (isPayPal) {
      const localOrderId = params.get("localOrderId") ?? params.get("orderId");
      const paypalOrderId = params.get("token");
      const subscriptionId = params.get("subscription_id") ?? params.get("ba_token");

      if (!localOrderId) {
        setStatus("error");
        setErrorMsg("Payment info missing.");
        return;
      }

      body = {
        provider: "paypal",
        localOrderId,
        serviceId,
        subjectId,
        ...(paypalOrderId ? { paypalOrderId } : {}),
        ...(subscriptionId ? { subscriptionId } : {}),
      };
    } else {
      const paymentKey = params.get("paymentKey");
      const orderId = params.get("orderId");
      const amount = params.get("amount");

      if (!paymentKey || !orderId || !amount) {
        setStatus("error");
        setErrorMsg("Payment info missing.");
        return;
      }

      body = { paymentKey, orderId, amount: Number(amount), serviceId, subjectId };
    }

    async function confirmPayment(attempt = 0) {
      const response = await authFetch("/api/payments/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => ({}));

      if (cancelled) return;

      if (response.status === 202 && attempt < 12) {
        setTimeout(() => confirmPayment(attempt + 1), 1500);
        return;
      }

      if (response.status === 202) {
        setStatus("pending");
        setErrorMsg(
          data.error ??
            "Payment is still being verified. Please check billing again in a moment."
        );
        return;
      }

        if (data.success) {
          setStatus("success");
          // If the buyer came from a specific in-product page (e.g. the
          // "Course Locked" CTA on a lesson), send them back there so
          // they land on the thing they actually tried to unlock.
          // Only accept same-origin paths to avoid open-redirect.
          const returnToParam = params.get("returnTo");
          const safeReturnTo =
            returnToParam &&
            returnToParam.startsWith("/") &&
            !returnToParam.startsWith("//") &&
            !returnToParam.includes("\\")
              ? returnToParam
              : null;
          if (safeReturnTo) {
            setTimeout(() => router.push(safeReturnTo), 1800);
            return;
          }
          const nextUrl = new URL("/billing", window.location.origin);
          nextUrl.searchParams.set("payment", "success");
          if ((data.order?.serviceId as string | undefined)?.startsWith("textbook:")) {
            nextUrl.searchParams.set("focus", "manuals");
          }
          setTimeout(() => router.push(`${nextUrl.pathname}${nextUrl.search}`), 1800);
        } else {
          setStatus("error");
          setErrorMsg(data.error ?? "Payment confirmation failed.");
        }
    }

    confirmPayment().catch(() => {
      if (cancelled) return;
        setStatus("error");
        setErrorMsg("Network error.");
    });

    return () => {
      cancelled = true;
    };
  }, [params, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-gray-500 text-sm">Confirming your payment…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">✗</div>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">Payment confirmation failed</h1>
          <p className="text-gray-500 text-sm">{errorMsg}</p>
        </div>
        <Link href="/pricing" className="btn-primary text-sm py-2.5 px-6">Back to pricing</Link>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-4xl">…</div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Payment is being verified</h1>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">{errorMsg}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/billing" className="btn-primary text-sm py-2.5 px-6">Check billing</Link>
          <Link href="/pricing" className="btn-secondary text-sm py-2.5 px-6">Back to pricing</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-4xl">✓</div>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Payment complete!</h1>
        <p className="text-gray-500">Redirecting to billing to show your purchase and access…</p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-3 h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    }>
      <SuccessInner />
    </Suspense>
  );
}
