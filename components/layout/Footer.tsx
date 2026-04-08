import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-extrabold text-xl mb-3">
              <span className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white text-xs font-black">
                IH
              </span>
              <span className="text-gray-900 dark:text-white">
                In<span className="text-primary-500">Hero</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Cornell 재학생이 만든<br />
              AP 전문 학습 플랫폼
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
              © 2025 InHero. All rights reserved.
            </p>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">강의</h3>
            <ul className="space-y-2.5">
              {["AP Biology", "AP Chemistry", "AP Calculus BC", "AMC 10/12", "SAT"].map((item) => (
                <li key={item}>
                  <Link href="/courses" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">회사</h3>
            <ul className="space-y-2.5">
              {[
                { label: "소개", href: "#" },
                { label: "요금제", href: "/pricing" },
                { label: "블로그", href: "#" },
                { label: "대입 컨설팅", href: "/pricing" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">연락처</h3>
            <ul className="space-y-2.5">
              <li className="text-sm text-gray-500 dark:text-gray-400">
                📧 hello@inhero.kr
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400">
                💬 카카오톡: @inhero
              </li>
              <li className="text-sm text-gray-500 dark:text-gray-400">
                🌐 Instagram: @inhero.kr
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            본 서비스는 교육 목적으로 제공되며 AP, SAT, AMC는 College Board 및 MAA의 등록 상표입니다.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-gray-400 hover:text-primary-500 transition-colors">개인정보처리방침</Link>
            <Link href="#" className="text-xs text-gray-400 hover:text-primary-500 transition-colors">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
