export default function HeroSection() {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 text-primary-500 text-sm font-semibold mb-4 bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-full">
          💡 투명한 요금제
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
          과외 1시간 가격으로{" "}
          <span className="text-primary-500">한 달 무제한</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          일반 과외 1회 비용(₩130,000)으로 한 달 내내 무제한 강의 + AI 즉시 설명.
          <br />
          과목당 단가를 낮추고 합격 확률을 높이세요.
        </p>

        {/* Comparison bar */}
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">일반 과외 1회</p>
            <p className="text-2xl font-black text-gray-400 line-through">₩130,000</p>
            <p className="text-xs text-gray-400 mt-1">1시간 · 1과목 · 1회</p>
          </div>
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-4 text-center ring-2 ring-primary-400">
            <p className="text-xs text-primary-500 font-semibold mb-1">InHero 3과목 패스</p>
            <p className="text-2xl font-black text-primary-600 dark:text-primary-400">₩199,000</p>
            <p className="text-xs text-primary-500 mt-1 font-semibold">3과목 · AI 전체 · 한 달</p>
          </div>
        </div>
      </div>
    </div>
  );
}
