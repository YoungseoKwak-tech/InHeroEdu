import { PRICING, krw, usd } from "@/lib/pricing";
import PaymentButton from "@/components/PaymentButton";

export default function MaterialsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3">
            교재 & 문제은행 / MATERIALS
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            교재 · 문제은행
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING.materials.map((item) => (
            <div
              key={item.id}
              className={`relative card p-6 flex flex-col ${
                item.badge ? "ring-2 ring-teal-400" : ""
              }`}
            >
              {item.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold px-4 py-1.5 rounded-full bg-teal-500 text-white whitespace-nowrap">
                    {item.badge}
                  </span>
                </div>
              )}
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center text-xl mb-3">
                {item.id === "textbook" ? "📖" : item.id === "qbank_monthly" ? "🏦" : "📅"}
              </div>
              <p className="font-bold text-gray-900 dark:text-white">{item.name}</p>
              <p className="text-xs text-gray-400 mb-3">{item.nameEn}</p>

              {"subjects" in item && item.subjects.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {(item.subjects as readonly string[]).slice(0, 4).map((s) => (
                    <span key={s} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                  {(item.subjects as readonly string[]).length > 4 && (
                    <span className="text-xs text-gray-400">+{(item.subjects as readonly string[]).length - 4}</span>
                  )}
                </div>
              )}

              <div className="flex-1" />
              <div className="mb-4">
                <span className="text-2xl font-black text-gray-900 dark:text-white">{krw(item.priceKRW)}</span>
                <span className="text-sm text-gray-400"> / {item.unit}</span>
                <p className="text-xs text-gray-400 mt-0.5">{usd(item.priceUSD)}</p>
              </div>
              <PaymentButton
                serviceId={item.id}
                amount={item.priceKRW}
                orderName={item.name}
                label="구매하기"
                className="w-full text-sm font-bold py-2.5 rounded-xl border-2 border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
