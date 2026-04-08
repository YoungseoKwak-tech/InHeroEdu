import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import SubjectGrid from "@/components/landing/SubjectGrid";
import Testimonials from "@/components/landing/Testimonials";
import UniversityBanner from "@/components/UniversityBanner";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />
      <UniversityBanner />
      <Features />
      <SubjectGrid />
      <Testimonials />

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            새로운 교육 패러다임을 경험하세요
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            AI를 답 기계가 아닌 사고 훈련 도구로 — 지금 무료로 시작하세요.
            <br />
            신용카드 불필요 · 언제든지 취소 가능
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-white text-primary-600 font-bold py-4 px-8 rounded-2xl hover:bg-primary-50 transition-colors shadow-lg"
            >
              무료로 시작하기 →
            </Link>
            <Link
              href="/pricing"
              className="border-2 border-white/50 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white/10 transition-colors"
            >
              요금제 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
