const features = [
  {
    icon: "🧠",
    title: "사고 진화 메모리",
    titleEn: "Thinking Evolution Memory",
    description:
      "AI가 9학년부터 12학년까지 학생이 질문한 것, 틀린 것, 어떻게 사고가 바뀌었는지를 전부 기억해요. 어떤 선생님도, 어떤 카운슬러도 할 수 없는 4년의 동반 성장.",
    badge: "세계 최초",
    color: "from-primary-500 to-violet-500",
    bgColor: "bg-primary-50 dark:bg-primary-900/20",
    highlight: true,
  },
  {
    icon: "🔤",
    title: "Bilingual Thinking Analyzer",
    titleEn: "Bilingual Thinking Analyzer",
    description:
      "한국어로 생각하다가 영어 문제에서 막히는 그 순간 — AI가 '개념 문제'인지 '언어 구조 문제'인지 정확히 짚어줘요. 전 세계 어디서도 이걸 시스템화한 플랫폼은 없어요.",
    badge: "독보적 차별점",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: "🖊️",
    title: "선생님의 서사",
    titleEn: "Teacher's Story",
    description:
      "한국 교육과 미국 교육, 두 세계를 직접 경험한 선생님이 손으로 써가며 설명하는 강의. '이 사람이 왜 이걸 가르치는가'라는 스토리가 그 자체로 콘텐츠예요.",
    badge: "47개 강의",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
];

export default function Features() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">
            왜 InHero인가요?
          </h2>
          <p className="section-sub max-w-xl mx-auto">
            AI를 답 기계가 아닌 사고 훈련 도구로 — AI 시대에 맞는 새로운 교육 패러다임
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`relative card p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                feature.highlight
                  ? "ring-2 ring-primary-400 dark:ring-primary-500"
                  : ""
              }`}
            >
              {feature.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ✨ 핵심 기능
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center text-2xl mb-6`}
              >
                {feature.icon}
              </div>

              {/* Badge */}
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${feature.color} text-white mb-4`}
              >
                {feature.badge}
              </span>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
