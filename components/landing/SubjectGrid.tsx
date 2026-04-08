import Link from "next/link";

const subjects = [
  {
    id: "ap-biology",
    name: "AP Biology",
    korean: "AP 생물학",
    icon: "🧬",
    lessons: 47,
    color: "from-green-400 to-emerald-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    available: true,
  },
  {
    id: "ap-chemistry",
    name: "AP Chemistry",
    korean: "AP 화학",
    icon: "⚗️",
    lessons: 52,
    color: "from-blue-400 to-cyan-500",
    textColor: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    available: false,
  },
  {
    id: "ap-calculus-bc",
    name: "AP Calculus BC",
    korean: "AP 미적분 BC",
    icon: "∫",
    lessons: 61,
    color: "from-primary-400 to-violet-500",
    textColor: "text-primary-600 dark:text-primary-400",
    bg: "bg-primary-50 dark:bg-primary-900/20",
    available: false,
  },
  {
    id: "amc",
    name: "AMC 10/12",
    korean: "AMC 경시",
    icon: "🏆",
    lessons: 38,
    color: "from-orange-400 to-amber-500",
    textColor: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    available: false,
  },
];

export default function SubjectGrid() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">제공 과목</h2>
          <p className="section-sub">
            아이비리그 준비에 필요한 모든 AP 과목
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {subjects.map((subj) => (
            <Link
              key={subj.id}
              href={subj.available ? `/courses/${subj.id}` : "/courses"}
              className="relative group"
            >
              <div className="card p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                {!subj.available && (
                  <div className="absolute inset-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-[1px] flex items-center justify-center rounded-2xl z-10">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm">
                      준비 중
                    </span>
                  </div>
                )}

                {/* Gradient top bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${subj.color} rounded-full mb-5`} />

                {/* Icon */}
                <div className={`w-14 h-14 ${subj.bg} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4`}>
                  {subj.icon}
                </div>

                <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base mb-1">
                  {subj.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{subj.korean}</p>
                <span className={`text-xs font-semibold ${subj.textColor}`}>
                  {subj.lessons}개 강의
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/courses"
            className="btn-secondary text-sm inline-flex items-center gap-2"
          >
            전체 강의 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
