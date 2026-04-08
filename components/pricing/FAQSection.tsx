"use client";

import { useState } from "react";

const faqs = [
  {
    q: "무료 체험은 어떻게 하나요?",
    a: "회원가입 없이 과목별 1강을 무료로 수강할 수 있습니다. AI 고민상담과 컨설팅 진단도 무료예요.",
  },
  {
    q: "결제는 어떤 방법으로 가능한가요?",
    a: "신용카드 / 체크카드 / 카카오페이 / 네이버페이 등 토스페이먼츠가 지원하는 모든 결제 수단을 이용할 수 있습니다.",
  },
  {
    q: "구독을 중간에 취소할 수 있나요?",
    a: "네, 언제든지 취소 가능합니다. 취소하면 현재 결제 주기 종료 후 갱신되지 않으며, 남은 기간 동안은 계속 이용 가능합니다.",
  },
  {
    q: "환불 정책은 어떻게 되나요?",
    a: "결제 후 7일 이내, 강의 시청 이력이 없는 경우 전액 환불이 가능합니다. 강의 시청 후에는 이용약관에 따라 부분 환불이 적용됩니다.",
  },
  {
    q: "학년 패키지와 구독 패스의 차이는 무엇인가요?",
    a: "구독 패스는 과목 수로 구성된 월정액이고, 학년 패키지는 해당 학년에 최적화된 커리큘럼(과목 조합 + 대외활동 설계 세션 등)이 포함된 번들입니다.",
  },
  {
    q: "컨설팅 패키지는 어떻게 신청하나요?",
    a: "카카오톡 채널로 먼저 무료 상담을 신청해주세요. 학생 상황을 파악한 후 적합한 패키지를 안내해드립니다.",
  },
  {
    q: "해외(미국 등)에서도 결제 및 이용이 가능한가요?",
    a: "네. 해외 카드로도 결제 가능하며, 플랫폼은 인터넷만 있으면 어디서든 이용할 수 있습니다.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            자주 묻는 질문
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="card overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <span className="font-semibold text-gray-900 dark:text-white text-sm pr-4">
                  {faq.q}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                    open === idx ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === idx && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
