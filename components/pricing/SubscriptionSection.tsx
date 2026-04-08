import { PRICING, krw, usd } from "@/lib/pricing";
import PaymentButton from "@/components/PaymentButton";

export default function SubscriptionSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3">
            구독 / SUBSCRIPTION
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            과목 구독 패스
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            원하는 과목만 골라서 월 구독 — 언제든지 취소 가능
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING.subscriptions.map((plan) => (
            <div
              key={plan.id}
              className={`relative card p-8 flex flex-col ${
                plan.badge
                  ? "ring-2 ring-primary-400 dark:ring-primary-500 shadow-xl shadow-primary-100 dark:shadow-primary-900/20"
                  : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold px-4 py-1.5 rounded-full bg-primary-500 text-white whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <p className="font-extrabold text-gray-900 dark:text-white text-lg">{plan.name}</p>
                <p className="text-xs text-gray-400">{plan.nameEn}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    {krw(plan.priceKRW)}
                  </span>
                  <span className="text-sm text-gray-400">/ {plan.period}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{usd(plan.priceUSD)} / mo</p>
              </div>

              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-primary-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <PaymentButton
                serviceId={plan.id}
                amount={plan.priceKRW}
                orderName={plan.name}
                label="구독 시작하기"
                className={`w-full text-sm font-bold py-3 px-4 rounded-xl transition-all ${
                  plan.badge
                    ? "bg-primary-500 hover:bg-primary-600 text-white shadow-md"
                    : "border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-600"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
