import Link from "next/link";
import { PRICING } from "@/lib/pricing";

export default function FreeSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3">
            무료 / FREE
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            먼저 무료로 경험해보세요
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING.free.map((item) => (
            <div key={item.id} className="card p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-xl">
                {item.id === "trial" ? "🎓" : item.id === "ai_counseling" ? "💬" : "🗺️"}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.nameEn}</p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex-1">{item.desc}</p>
              <p className="text-2xl font-black text-emerald-500">무료</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/courses" className="btn-primary text-sm py-2.5 px-8">
            무료로 시작하기
          </Link>
        </div>
      </div>
    </section>
  );
}
