import type { Metadata } from "next";
import HeroSection from "@/components/pricing/HeroSection";
import FreeSection from "@/components/pricing/FreeSection";
import SubscriptionSection from "@/components/pricing/SubscriptionSection";
import GradeSection from "@/components/pricing/GradeSection";
import CompetitionSection from "@/components/pricing/CompetitionSection";
import TutoringSection from "@/components/pricing/TutoringSection";
import ConsultingSection from "@/components/pricing/ConsultingSection";
import MaterialsSection from "@/components/pricing/MaterialsSection";
import FAQSection from "@/components/pricing/FAQSection";
import { KAKAO_LINK } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "요금제 | InHero",
  description: "무료부터 Ivy Track 컨설팅까지 — 과외 1시간 가격으로 한 달 무제한",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <HeroSection />
      <FreeSection />
      <SubscriptionSection />
      <GradeSection />
      <CompetitionSection />
      <TutoringSection />
      <ConsultingSection />
      <MaterialsSection />
      <FAQSection />

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              아직 고민되신다면
            </h2>
            <p className="text-primary-100 mb-8 max-w-lg mx-auto text-sm">
              카카오톡으로 무료 상담을 신청해주세요.
              학생 상황에 맞는 플랜을 함께 찾아드립니다.
            </p>
            <a
              href={KAKAO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FEE500] hover:bg-yellow-400 text-gray-900 font-bold text-sm py-3.5 px-10 rounded-2xl transition-colors shadow-lg"
            >
              💬 카카오톡 무료 상담
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
