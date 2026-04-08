import { PRICING, krw, usd } from "@/lib/pricing";
import PaymentButton from "@/components/PaymentButton";

export default function CompetitionSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3">
            경시대회 / COMPETITION
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            대회 특화 패키지
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            AMC · AIME · Science Olympiad · USABO · Physics Bowl
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRICING.competitionPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative card p-6 flex flex-col ${
                pkg.badge ? "ring-2 ring-amber-400 dark:ring-amber-500" : ""
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold px-4 py-1.5 rounded-full bg-amber-500 text-white whitespace-nowrap">
                    {pkg.badge}
                  </span>
                </div>
              )}
              <div className="mb-4 flex-1">
                <p className="font-extrabold text-gray-900 dark:text-white">{pkg.name}</p>
                <p className="text-xs text-gray-400 mb-2">{pkg.nameEn}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{pkg.desc}</p>
                {pkg.target && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-2">
                    → {pkg.target}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <span className="text-2xl font-black text-gray-900 dark:text-white">{krw(pkg.priceKRW)}</span>
                <span className="text-sm text-gray-400"> / 월</span>
                <p className="text-xs text-gray-400">{usd(pkg.priceUSD)} / mo</p>
              </div>
              <PaymentButton
                serviceId={pkg.id}
                amount={pkg.priceKRW}
                orderName={pkg.name}
                label="신청하기"
                className="w-full text-sm font-bold py-2.5 rounded-xl border-2 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
