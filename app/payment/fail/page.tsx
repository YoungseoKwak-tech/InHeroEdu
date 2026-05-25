"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function FailInner() {
  const params = useSearchParams();
  const errorCode = params.get("code") ?? "";
  const errorMsg = params.get("message") ?? "Payment was cancelled or an error occurred.";
  const serviceId = params.get("serviceId") ?? "";
  const retryHref = serviceId === "textbook" || serviceId.startsWith("textbook:") ? "/textbooks" : "/pricing";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-4xl">✗</div>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Payment failed</h1>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">{errorMsg}</p>
        {errorCode && (
          <p className="text-xs text-gray-400 mt-1">Error code: {errorCode}</p>
        )}
      </div>
      <div className="flex gap-3">
        <Link href={retryHref} className="btn-secondary text-sm py-2.5 px-6">Try again</Link>
        <Link href="/" className="btn-primary text-sm py-2.5 px-6">Home</Link>
      </div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <FailInner />
    </Suspense>
  );
}
