"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function FailInner() {
  const params = useSearchParams();
  const errorCode = params.get("code") ?? "";
  const errorMsg = params.get("message") ?? "결제가 취소되었거나 오류가 발생했습니다.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-4xl">✗</div>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">결제 실패</h1>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">{errorMsg}</p>
        {errorCode && (
          <p className="text-xs text-gray-400 mt-1">오류 코드: {errorCode}</p>
        )}
      </div>
      <div className="flex gap-3">
        <Link href="/pricing" className="btn-secondary text-sm py-2.5 px-6">요금제 보기</Link>
        <Link href="/" className="btn-primary text-sm py-2.5 px-6">홈으로</Link>
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
