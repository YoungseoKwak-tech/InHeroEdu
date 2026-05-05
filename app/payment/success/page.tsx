"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";

function SuccessInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const paymentKey = params.get("paymentKey");
    const orderId = params.get("orderId");
    const amount = params.get("amount");
    const serviceId = params.get("serviceId");
    const subjectId = params.get("subjectId");

    if (!paymentKey || !orderId || !amount) {
      setStatus("error");
      setErrorMsg("결제 정보가 없습니다.");
      return;
    }

    authFetch("/api/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentKey, orderId, amount: Number(amount), serviceId, subjectId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          const nextUrl = new URL("/billing", window.location.origin);
          nextUrl.searchParams.set("payment", "success");
          if ((data.order?.serviceId as string | undefined)?.startsWith("textbook:")) {
            nextUrl.searchParams.set("focus", "manuals");
          }
          setTimeout(() => router.push(`${nextUrl.pathname}${nextUrl.search}`), 1800);
        } else {
          setStatus("error");
          setErrorMsg(data.error ?? "결제 확인 실패");
        }
      })
      .catch(() => {
        setStatus("error");
        setErrorMsg("네트워크 오류가 발생했어요.");
      });
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
        <p className="text-gray-500 text-sm">결제를 확인하는 중입니다…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">✗</div>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">결제 확인 실패</h1>
          <p className="text-gray-500 text-sm">{errorMsg}</p>
        </div>
        <Link href="/pricing" className="btn-primary text-sm py-2.5 px-6">요금제로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-4xl">✓</div>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">결제 완료!</h1>
        <p className="text-gray-500">잠시 후 billing으로 이동해 결제 내역과 접근 권한을 보여드릴게요…</p>
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
