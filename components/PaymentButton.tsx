"use client";

import { useState } from "react";

interface PaymentButtonProps {
  serviceId: string;
  amount: number;
  orderName: string;
  label?: string;
  className?: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TossPayments: (clientKey: string) => any;
  }
}

export default function PaymentButton({
  serviceId,
  amount,
  orderName,
  label = "결제하기",
  className = "btn-primary text-sm py-2.5 px-6",
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("inhero_name") ?? "" : ""
  );
  const [email, setEmail] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("inhero_email") ?? "" : ""
  );

  async function handlePay() {
    if (!name.trim() || !email.trim()) {
      setShowForm(true);
      return;
    }

    setLoading(true);
    try {
      // 1. Create order
      const res = await fetch("/api/payments/toss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, amount, orderName, customerName: name, customerEmail: email }),
      });
      const { clientKey, orderId, error } = await res.json();
      if (error || !clientKey) throw new Error(error ?? "order error");

      // 2. Save customer info
      localStorage.setItem("inhero_name", name);
      localStorage.setItem("inhero_email", email);

      // 3. Open Toss payment window
      const toss = window.TossPayments(clientKey);
      await toss.requestPayment("카드", {
        amount,
        orderId,
        orderName,
        customerName: name,
        customerEmail: email,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "오류가 발생했어요.";
      if (!msg.includes("PAY_PROCESS_CANCELED")) {
        alert(msg);
      }
      setLoading(false);
    }
  }

  if (showForm) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
        <button
          onClick={() => { setShowForm(false); handlePay(); }}
          disabled={!name.trim() || !email.trim()}
          className="btn-primary text-sm py-2.5 disabled:opacity-50"
        >
          결제 계속하기
        </button>
      </div>
    );
  }

  return (
    <button onClick={handlePay} disabled={loading} className={className}>
      {loading ? "처리 중…" : label}
    </button>
  );
}
