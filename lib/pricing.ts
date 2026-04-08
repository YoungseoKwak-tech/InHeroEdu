export const PRICING = {
  free: [
    { id: "trial",        name: "첫 강의 무료체험",  nameEn: "Free Trial Lesson", price: 0, desc: "과목별 1강 무료" },
    { id: "ai_counseling",name: "고민상담 AI",        nameEn: "AI Counseling",     price: 0, desc: "마음 나누기 무제한" },
  ],

  subjects: {
    ap: [
      "AP Biology","AP Chemistry","AP Calculus BC","AP Calculus AB","AP Precalculus",
      "AP Physics C Mechanics","AP Physics C E&M","AP Physics 1",
      "AP Statistics","AP Computer Science A","AP CS Principles",
      "AP English Language","AP English Literature","AP US History",
      "AP World History","AP Psychology","AP Macroeconomics",
      "AP Microeconomics","AP Environmental Science",
    ],
    honors: [
      "Honors Biology","Honors Chemistry","Honors Physics",
      "Honors Precalculus","Honors English","Honors Algebra","Honors US History",
    ],
    core: [
      "Integrated Science","Geometry","Algebra","English",
      "US History","Chemistry","Biology","Physics",
    ],
    exams: ["SAT Math","SAT Reading & Writing","ACT","TOEFL"],
  },

  subscriptions: [
    {
      id: "single",
      name: "한 과목 패스", nameEn: "Single Subject Pass",
      priceKRW: 79000, priceUSD: 53,
      period: "월 / mo",
      features: ["선택 1과목 강의 무제한","AI 즉시 설명","사고력 분석","학습 대시보드"],
      badge: null as string | null,
    },
    {
      id: "three",
      name: "3과목 패스", nameEn: "3 Subject Pass",
      priceKRW: 199000, priceUSD: 94,
      period: "월 / mo",
      features: ["3과목 선택 강의 무제한","AI 컴패니언 전체 기능","사고력 분석 무제한","문제은행 부분 제공"],
      badge: "가장 인기 / Most Popular",
    },
  ],

  gradePackages: [
    {
      id: "grade9", name: "9학년 패키지", nameEn: "9th Grade Package",
      priceKRW: 290000, priceUSD: 211, period: "월 / mo",
      desc: "Core 전과목 + SAT 기초 + 리버스튜터세션",
      includes: ["Core 전과목","SAT 기초","리버스튜터세션 월 2회"],
      badge: null as string | null,
    },
    {
      id: "grade10", name: "10학년 패키지", nameEn: "10th Grade Package",
      priceKRW: 390000, priceUSD: 284, period: "월 / mo",
      desc: "Honors 2~3개 + SAT 본격 + 리버스튜터세션",
      includes: ["Honors 2~3과목 선택","SAT 집중","리버스튜터세션 월 2회"],
      badge: null as string | null,
    },
    {
      id: "grade11", name: "11학년 패키지", nameEn: "11th Grade Package",
      priceKRW: 490000, priceUSD: 357, period: "월 / mo",
      desc: "AP 4~5개 + SAT 완성 + 리버스튜터세션",
      includes: ["AP 4~5과목","SAT 완성","리버스튜터세션 월 2회"],
      badge: "핵심 / Critical Year",
    },
    {
      id: "grade12", name: "12학년 패키지", nameEn: "12th Grade Package",
      priceKRW: 590000, priceUSD: 430, period: "월 / mo",
      desc: "AP 마무리 + 리버스튜터세션",
      includes: ["AP 마무리","리버스튜터세션 월 2회"],
      badge: null as string | null,
    },
    {
      id: "novapass", name: "노바패스", nameEn: "Nova Pass",
      priceKRW: 990000, priceUSD: 721, period: "월 / mo",
      desc: "전 학년 커리큘럼 + 리버스튜터세션",
      includes: ["전 학년 커리큘럼","리버스튜터세션 무제한","대입 로드맵 자동 생성"],
      badge: "최고 가성비 / Best Value",
    },
  ],

  competitionPackages: [
    {
      id: "amc",              name: "AMC 10/12 집중반",        nameEn: "AMC 10/12 Intensive",
      priceKRW: 390000, priceUSD: 284, period: "월 / mo",
      desc: "AMC 전략 + 기출 분석 + 유형별 훈련",
      target: "AMC 목표 학생", badge: null as string | null,
    },
    {
      id: "aime",             name: "AIME 진출반",              nameEn: "AIME Qualifier",
      priceKRW: 590000, priceUSD: 430, period: "월 / mo",
      desc: "AIME 목표 + AMC 포함 + 심화 수학",
      target: "AMC 상위권 → AIME 진출 목표", badge: "심화 / Advanced",
    },
    {
      id: "scioly",           name: "Science Olympiad반",       nameEn: "Science Olympiad",
      priceKRW: 390000, priceUSD: 284, period: "월 / mo",
      desc: "과목별 전략 + 실험 이론 + 기출",
      target: "Science Olympiad 참가 팀", badge: null as string | null,
    },
    {
      id: "usabo",            name: "USABO 생물올림피아드",     nameEn: "USABO Biology Olympiad",
      priceKRW: 490000, priceUSD: 357, period: "월 / mo",
      desc: "AP Bio 심화 + 올림피아드 특화 훈련",
      target: "생물 올림피아드 목표", badge: null as string | null,
    },
    {
      id: "physics",          name: "Physics Bowl / F=ma반",   nameEn: "Physics Bowl / F=ma",
      priceKRW: 390000, priceUSD: 284, period: "월 / mo",
      desc: "AP Physics C + 대회 문제 특화",
      target: "물리 대회 목표", badge: null as string | null,
    },
    {
      id: "competition_allin",name: "대회 올인원 패키지",        nameEn: "Competition All-in-One",
      priceKRW: 890000, priceUSD: 648, period: "월 / mo",
      desc: "AMC + Science Olympiad + 선택 1개",
      target: "", badge: "패키지 할인 / Bundle Deal",
    },
  ],

  tutoring: [
    { id: "tutor_1h",        name: "1:1 과외 (1시간)",               nameEn: "1:1 Tutoring (1hr)",          priceKRW: 130000,  priceUSD: 95,   unit: "회 / session", badge: null as string | null, desc: "" },
    { id: "tutor_10pack",    name: "1:1 과외 10회 패키지",           nameEn: "10-Session Package",           priceKRW: 1100000, priceUSD: 800,  unit: "패키지",        badge: "15% 할인",           desc: "" },
    { id: "essay_single",    name: "에세이 컨설팅 (Common App 1편)", nameEn: "Essay Consulting (1 essay)",   priceKRW: 350000,  priceUSD: 255,  unit: "편 / essay",   badge: null as string | null, desc: "" },
    { id: "essay_full",      name: "에세이 풀패키지",                nameEn: "Full Essay Package",           priceKRW: 1500000, priceUSD: 1092, unit: "패키지",        badge: "인기 / Popular",     desc: "Common App Main + Supplement 전체" },
    { id: "activity_design", name: "대외활동 설계 세션 (1회)",       nameEn: "Activity Design Session",      priceKRW: 250000,  priceUSD: 182,  unit: "회 / session", badge: null as string | null, desc: "" },
    { id: "research_plan",   name: "논문/스타트업/비영리 기획 (1회)", nameEn: "Research/Startup Planning",    priceKRW: 300000,  priceUSD: 218,  unit: "회 / session", badge: null as string | null, desc: "" },
  ],

  consulting: [
    {
      id: "essential", name: "에센셜 패키지", nameEn: "Essential Package",
      priceKRW: 8900000, priceUSD: 6482, unit: "패키지", period: "12학년 1년",
      desc: "원서 전략 + 에세이 전체 + 합격 분석",
      includes: [
        "Common App + Supplement 에세이 전체",
        "지원 대학 리스트 전략",
        "합격 가능성 분석",
        "동아리/streak 대시보드 액세스",
        "월 2회 미팅",
      ],
      badge: null as string | null,
    },
    {
      id: "standard", name: "스탠다드 패키지", nameEn: "Standard Package",
      priceKRW: 18000000, priceUSD: 13102, unit: "패키지", period: "11~12학년 2년",
      desc: "에센셜 + AP 전략 + 대외활동 설계",
      includes: [
        "에센셜 전체 포함",
        "AP 과목 전략",
        "대외활동 설계 + 논문 기획",
        "SAT/ACT 전략",
        "동아리/streak 대시보드 액세스",
        "월 3회 미팅",
      ],
      badge: "추천 / Recommended",
    },
    {
      id: "premium", name: "프리미엄 패키지", nameEn: "Premium Package",
      priceKRW: 30000000, priceUSD: 21836, unit: "패키지", period: "9~12학년 4년",
      desc: "입학부터 합격까지 전부 + AI 기반 스토리라인",
      includes: [
        "스탠다드 전체 포함",
        "9학년부터 전략 수립",
        "AI 심리상담 기반 학생 identity 스토리라인",
        "논문 출판 지도",
        "스타트업/비영리 기획",
        "Ivy 네트워크 멘토링",
        "동아리/streak 대시보드 액세스",
        "월 4회 미팅 + 24/7 카카오톡",
      ],
      badge: "최고급 / Premium",
    },
  ],

  materials: [
    {
      id: "textbook", name: "과목별 교재 PDF", nameEn: "Subject Textbook PDF",
      priceKRW: 19000, priceUSD: 14, unit: "권 / book", badge: null as string | null,
      subjects: ["AP Biology","AP Chemistry","AP Calculus BC","AP Calculus AB","AP Physics","AMC 10/12","SAT Math","SAT R&W"],
    },
    {
      id: "qbank_monthly", name: "문제은행 월정액", nameEn: "Question Bank Monthly",
      priceKRW: 39000, priceUSD: 28, unit: "월 / mo", badge: null as string | null, subjects: [],
    },
    {
      id: "qbank_annual", name: "문제은행 연간", nameEn: "Question Bank Annual",
      priceKRW: 290000, priceUSD: 211, unit: "년 / yr", badge: "38% 할인", subjects: [],
    },
  ],
} as const;

export function krw(amount: number) {
  return `₩${amount.toLocaleString("ko-KR")}`;
}
export function usd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export const KAKAO_LINK = "https://open.kakao.com/o/kathleen0802";
