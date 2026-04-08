import { PRICING, krw, usd, KAKAO_LINK } from "@/lib/pricing";
import PaymentButton from "@/components/PaymentButton";

export default function TutoringSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3">
            개인 과외 / TUTORING
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            1:1 과외 · 에세이 · 활동 컨설팅
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            일정 예약은 카카오톡으로 진행됩니다
          </p>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-500 dark:text-gray-400">서비스</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">단위</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">가격 (KRW)</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">가격 (USD)</th>
                  <th className="py-4 px-4" />
                </tr>
              </thead>
              <tbody>
                {PRICING.tutoring.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-50 dark:border-gray-800 ${
                      idx % 2 !== 0 ? "bg-gray-50/50 dark:bg-gray-800/20" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
                      {item.desc && (
                        <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                      )}
                      {item.badge && (
                        <span className="inline-block mt-1 text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center text-xs text-gray-500">{item.unit}</td>
                    <td className="py-4 px-4 text-right font-bold text-gray-900 dark:text-white">
                      {krw(item.priceKRW)}
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-gray-400">
                      {usd(item.priceUSD)}
                    </td>
                    <td className="py-4 px-4">
                      <PaymentButton
                        serviceId={item.id}
                        amount={item.priceKRW}
                        orderName={item.name}
                        label="결제"
                        className="text-xs font-semibold py-2 px-4 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 mb-3">일정 조율 · 문의</p>
          <a
            href={KAKAO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FEE500] hover:bg-yellow-400 text-gray-900 font-bold text-sm py-3 px-8 rounded-2xl transition-colors shadow-md"
          >
            💬 카카오톡 예약하기
          </a>
        </div>
      </div>
    </section>
  );
}
