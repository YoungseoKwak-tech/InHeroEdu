"use client";

import { useState } from "react";
import { PRICING, krw, usd } from "@/lib/pricing";
import PaymentButton from "@/components/PaymentButton";

const tabLabels: Record<string, string> = {
  grade9: "9학년",
  grade10: "10학년",
  grade11: "11학년",
  grade12: "12학년",
  grade9to12: "전체 4년",
};

export default function GradeSection() {
  const [active, setActive] = useState("grade9");
  const pkg = PRICING.gradePackages.find((p) => p.id === active)!;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3">
            학년별 패키지
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            학년에 맞는 커리큘럼
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {PRICING.gradePackages.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all ${
                active === p.id
                  ? "bg-primary-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {tabLabels[p.id]}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="max-w-lg mx-auto">
          <div className={`relative card p-8 ${pkg.badge ? "ring-2 ring-primary-400" : ""}`}>
            {pkg.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="text-xs font-bold px-4 py-1.5 rounded-full bg-primary-500 text-white whitespace-nowrap">
                  {pkg.badge}
                </span>
              </div>
            )}
            <div className="mb-4">
              <p className="font-extrabold text-gray-900 dark:text-white text-xl">{pkg.name}</p>
              <p className="text-xs text-gray-400">{pkg.nameEn} · {pkg.period}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-black text-gray-900 dark:text-white">{krw(pkg.priceKRW)}</span>
                <span className="text-sm text-gray-400">/ 월</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{usd(pkg.priceUSD)} / mo</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">{pkg.desc}</p>
            </div>
            <ul className="space-y-2 mb-6">
              {pkg.includes.map((inc) => (
                <li key={inc} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-primary-500 font-bold">✓</span>
                  {inc}
                </li>
              ))}
            </ul>
            <PaymentButton
              serviceId={pkg.id}
              amount={pkg.priceKRW}
              orderName={pkg.name}
              label="패키지 시작하기"
              className="w-full btn-primary text-sm py-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
