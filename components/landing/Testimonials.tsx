const testimonials = [
  {
    name: "김민준",
    grade: "고3 · AP Biology 5점",
    school: "InHero 1기 수료",
    avatar: "😊",
    quote:
      "AI가 제 틀린 문제 패턴을 기억하고 있다가 두 달 뒤에 '저번에 이 개념 헷갈려했는데 오늘 문제랑 연결돼요'라고 짚어줬어요. 그냥 답 알려주는 AI랑은 차원이 달랐습니다.",
    stars: 5,
  },
  {
    name: "이서연",
    grade: "고2 · AP Chemistry 준비 중",
    school: "서울 대원외고",
    avatar: "👩‍🎓",
    quote:
      "영어 지문에서 막힐 때 AI가 '이건 개념 이해 문제가 아니라 영어 문장 구조 문제예요'라고 딱 짚어줬어요. 그 말 한 마디에 공부 방향이 완전히 바뀌었어요.",
    stars: 5,
  },
  {
    name: "박현우",
    grade: "고3 · AMC 12 AIME 진출",
    school: "InHero 수학 트랙",
    avatar: "🧑‍💻",
    quote:
      "답을 알려주는 게 아니라 '왜 이렇게 생각했는지'를 물어보는 AI예요. 처음엔 불편했는데 그게 진짜 실력을 키워주는 방식이었어요. 사고 방식 자체가 바뀌었습니다.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">
            실제 학생들의 이야기
          </h2>
          <p className="section-sub">
            사고가 바뀌면 결과가 바뀐다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-8 hover:shadow-lg transition-shadow duration-300">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t.grade}
                  </div>
                  <div className="text-xs text-primary-500 font-medium">
                    {t.school}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "2,400+", label: "활성 학생" },
            { num: "4년", label: "AI 사고 기억 기간" },
            { num: "세계 최초", label: "Bilingual Thinking AI" },
            { num: "4.9/5", label: "평균 강의 평점" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-primary-500 mb-1">
                {stat.num}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
