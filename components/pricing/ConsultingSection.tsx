import { PRICING, krw, usd, KAKAO_LINK } from "@/lib/pricing";

export default function ConsultingSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3">
            대입 컨설팅 / ADMISSIONS CONSULTING
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            아이비리그 합격 전략
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Cornell 재학생 직접 진행 · 상담 후 결제
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING.consulting.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative card p-8 flex flex-col ${
                pkg.badge?.includes("Recommended")
                  ? "ring-2 ring-rose-400 shadow-xl shadow-rose-100 dark:shadow-rose-900/20"
                  : ""
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold px-4 py-1.5 rounded-full bg-rose-500 text-white whitespace-nowrap">
                    {pkg.badge}
                  </span>
                </div>
              )}
              <div className="mb-4">
                <p className="font-extrabold text-gray-900 dark:text-white text-lg">{pkg.name}</p>
                <p className="text-xs text-gray-400">{pkg.nameEn} · {pkg.period}</p>
                <div className="mt-3">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">{krw(pkg.priceKRW)}</span>
                  <p className="text-xs text-gray-400 mt-0.5">{usd(pkg.priceUSD)}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">{pkg.desc}</p>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {pkg.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-rose-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                    {inc}
                  </li>
                ))}
              </ul>
              <a
                href={KAKAO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center text-sm font-bold py-3 px-4 rounded-xl bg-[#FEE500] hover:bg-yellow-400 text-gray-900 transition-colors"
              >
                💬 카카오톡 상담 신청
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          * 컨설팅 패키지는 상담 후 계약 진행됩니다. 금액은 VAT 별도.
        </p>
      </div>
    </section>
  );
}
