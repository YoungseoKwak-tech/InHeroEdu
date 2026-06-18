// Business info required by Korean PG (NicePay/PortOne) review. Real values
// below; env vars can still override per-environment.
export const merchantInfo = {
  companyName: process.env.NEXT_PUBLIC_MERCHANT_NAME || "InHero Edu(인히어로 에듀)",
  representative: process.env.NEXT_PUBLIC_MERCHANT_REPRESENTATIVE || "곽영서 (Youngseo Kwak)",
  businessRegistrationNumber:
    process.env.NEXT_PUBLIC_MERCHANT_REGISTRATION_NUMBER || "815-61-00887",
  address: process.env.NEXT_PUBLIC_MERCHANT_ADDRESS || "",
  phone: process.env.NEXT_PUBLIC_MERCHANT_PHONE || "",
  email: process.env.NEXT_PUBLIC_MERCHANT_EMAIL || "inheroedu@gmail.com",
  ecommerceRegistrationNumber:
    process.env.NEXT_PUBLIC_ECOMMERCE_REGISTRATION_NUMBER || "",
};

// Paid products shown at checkout (가격·상품 명시 — PG 심사 필수). VAT 포함.
export const creditProducts = [
  { label: "200 크레딧", price: "33,000원", note: "VAT 포함" },
  { label: "500 크레딧", price: "75,000원", note: "VAT 포함 · 권장 상품" },
  { label: "1,000 크레딧", price: "139,000원", note: "VAT 포함" },
  { label: "InHero 자료실 정기 구독권", price: "월 29,000원", note: "VAT 포함 · 매월 자동 결제" },
];

export const checkoutNotice =
  "본 상품은 결제 즉시 크레딧이 계정에 적립되며, 디지털 콘텐츠 특성상 크레딧을 사용한 이후에는 환불이 제한될 수 있습니다.";

export const refundPolicy = {
  title: "Refund and Cancellation Policy",
  summary:
    "Digital course subscriptions can be cancelled anytime before the next billing cycle. Refund eligibility depends on access usage and applicable consumer protection law.",
  items: [
    "If payment fails or is cancelled before approval, no access is granted and no charge is captured.",
    "Subscription cancellation stops future recurring billing. Access remains active through the paid period unless otherwise required by law.",
    "For billing errors, duplicate charges, or unauthorized payments, contact support within 7 days so we can investigate and reverse eligible payments.",
    "Digital content that has already been accessed may be partially or fully non-refundable where permitted by applicable law.",
    "Korean users may exercise statutory withdrawal/cancellation rights under applicable e-commerce and consumer protection rules.",
  ],
};

// AI 생성 콘텐츠 고지 (AI-generated content disclosure). InHero의 교재(Originals)
// 와 한국어 핵심 노트는 아이비리그 재학생이 설계한 요점정리 프롬프트로 AI가
// 생성한 학습 보조 자료입니다. 이 사실을 사이트 곳곳(교재·핵심노트 화면, 푸터,
// 전용 고지 페이지)에 일관되게 노출하기 위한 단일 소스입니다.
export const aiDisclosure = {
  // 교재·핵심노트 화면에 다는 한 줄 고지.
  badge: "AI 생성 학습자료",
  inline:
    "본 교재·핵심 노트는 아이비리그 재학생이 직접 설계한 요점정리 프롬프트로 AI가 정교하게 생성하고, 사람이 검수한 학습 보조 자료입니다.",
  // /ai-disclosure 페이지 본문.
  pageTitle: "AI 생성 콘텐츠 안내",
  pageIntro:
    "InHero가 제공하는 디지털 교재(Originals)와 한국어 핵심 노트는 인공지능(AI)으로 생성된 학습 보조 자료입니다. 어떻게 만들어지고, 어떻게 검수되며, 어떤 한계가 있는지 투명하게 안내합니다.",
  sections: [
    {
      title: "1. 어떻게 만들어지나요",
      body:
        "InHero의 교재와 핵심 노트는 아이비리그 및 미국 명문대 재학생·졸업생이 직접 설계한 ‘요점정리(개념 압축) 프롬프트’를 기반으로, 대규모 언어모델(LLM)이 단원별 핵심 개념을 구조화하여 생성합니다. 실제 명문대생이 시험을 준비하며 정리하는 방식 — 핵심 개념, 자주 나오는 함정, 예시 문제 — 을 프롬프트로 정교하게 체계화한 결과물입니다.",
    },
    {
      title: "2. 사람의 검수",
      body:
        "AI가 1차로 생성한 내용은 담당 에디터가 사실관계·수식·용어를 검토·수정하는 과정을 거칩니다. 다만 AI 생성물의 특성상 일부 오류나 부정확한 표현이 남아 있을 수 있으며, 모든 문장이 전문가의 개별 검증을 거쳤음을 보장하지는 않습니다.",
    },
    {
      title: "3. 공식 교재가 아닙니다",
      body:
        "본 자료는 College Board, IB, MAA 등 시험 주관 기관의 공식 교재·기출문제가 아니며, 이들 기관과 제휴·보증 관계가 없습니다. AP®, SAT®, AMC® 등은 각 기관의 등록상표이며, InHero의 자료는 해당 시험을 ‘대비’하기 위한 독립 제작 학습 보조물입니다.",
    },
    {
      title: "4. 정확성에 대한 한계",
      body:
        "AI 생성 콘텐츠는 참고용 학습 자료로 제공됩니다. 중요한 학습·진학 결정은 본 자료에만 의존하지 마시고 교과서, 공식 가이드, 교사·전문가의 조언과 함께 교차 확인하시기를 권장합니다. 오류를 발견하시면 고객센터로 알려 주시면 신속히 반영하겠습니다.",
    },
    {
      title: "5. 저작권",
      body:
        "AI로 생성·편집된 본 자료의 편집 저작권 및 구성은 InHero Edu에 있습니다. 구매(열람)한 자료의 무단 전재·복제·배포·캡처·재판매를 금합니다.",
    },
  ],
};
