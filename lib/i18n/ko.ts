/**
 * Korean translations, keyed by the ENGLISH source string.
 *
 * Wrap UI strings with t("English text") and add the Korean here. Any string
 * without an entry falls back to English — so partial coverage degrades
 * gracefully and the site never shows an empty slot.
 *
 * Keep keys EXACTLY equal to the rendered English (including punctuation/case);
 * the lookup is a plain object access, not fuzzy. For strings with dynamic
 * pieces, translate the static frame and interpolate in the component.
 */
export const KO: Record<string, string> = {
  // ── Navbar ───────────────────────────────────────────────────────────
  Home: "홈",
  Courses: "강의",
  "Core Notes": "핵심 노트",
  "Question Bank": "문제 은행",
  Lounges: "라운지",
  Library: "라이브러리",
  Clubs: "클럽",
  "Study Type": "학습 유형",
  Pricing: "요금제",
  Login: "로그인",
  "Log in": "로그인",
  "Sign up": "회원가입",
  "Log out": "로그아웃",
  "LAUNCH →": "시작하기 →",
  Billing: "결제",
  Dashboard: "대시보드",
  "Mission Control": "미션 컨트롤",

  // ── Library / Originals ──────────────────────────────────────────────
  "Every resource. Every Lounge. One feed.": "모든 자료. 모든 라운지. 하나의 피드.",
  "INHERO ORIGINALS": "인히어로 오리지널",
  "FEATURED TEXTBOOKS": "추천 교재",
  "Open textbook": "교재 열기",
  ORIGINAL: "오리지널",
  chapters: "챕터",
  pages: "페이지",
  "The Ultimate Guide": "디 얼티밋 가이드",

  // ── Question Bank ────────────────────────────────────────────────────
  "INHERO QUESTION BANK": "인히어로 문제 은행",
  All: "전체",
  "All units": "전체 유닛",
  "Loading your questions…": "문제를 불러오는 중…",
  "Pulling practice problems from every InHero lesson.":
    "모든 인히어로 강의에서 연습 문제를 모으는 중입니다.",
  "No questions here yet.": "아직 문제가 없습니다.",
  "Try a similar one": "비슷한 문제 풀기",
  Explanation: "해설",

  // ── Pricing ──────────────────────────────────────────────────────────
  "Choose your plan": "요금제를 선택하세요",
  "Get started": "시작하기",
  "Most popular": "가장 인기",
  "per month": "월",
  Free: "무료",
  Monthly: "월간",
  Yearly: "연간",

  // ── Landing · Features ("Why InHero") ────────────────────────────────
  "MISSION BRIEFING": "미션 브리핑",
  "Why InHero?": "왜 인히어로인가?",
  "A new paradigm for the AI era — AI as a thinking trainer, not just an answer machine.":
    "AI 시대의 새로운 패러다임 — 정답 기계가 아니라, 사고력을 길러주는 AI 트레이너.",
  "World First": "세계 최초",
  "Thinking Evolution Memory": "사고 성장 메모리",
  "AI remembers every question, mistake, and reasoning shift from 9th through 12th grade. Four years of guided intellectual growth that no single teacher or counselor can replicate.":
    "9학년부터 12학년까지 모든 문제, 실수, 사고의 변화를 AI가 기억합니다. 어떤 교사나 카운슬러도 대신할 수 없는 4년간의 지적 성장을 함께합니다.",
  "47 Lessons Live": "47개 레슨 운영 중",
  "Hero Instructor Story": "히어로 강사 스토리",
  "Lessons built by a teacher who has lived inside both elite prep culture and real university classrooms. The story behind why this teacher teaches becomes part of the learning itself.":
    "엘리트 입시 문화와 실제 대학 강의실을 모두 경험한 선생님이 만든 강의. 왜 이 선생님이 가르치는가, 그 이야기 자체가 배움의 일부가 됩니다.",
  "AI Powered": "AI 기반",
  "Thinking Analyzer": "사고 분석기",
  "When you get stuck, AI pinpoints whether it's a concept gap, a reasoning gap, or a knowledge gap — and routes you to exactly the right fix. Not a hint. A diagnosis.":
    "막혔을 때, AI가 개념의 빈틈인지·추론의 빈틈인지·지식의 빈틈인지 정확히 짚어내고 딱 맞는 처방으로 안내합니다. 단순한 힌트가 아니라, 진단입니다.",

  // ── Landing · Subjects / Testimonials / CTA ──────────────────────────
  "EXPLORE THE UNIVERSE": "유니버스 탐험하기",
  "Select Your Mission": "당신의 미션을 선택하세요",
  "Every course designed around what AP actually tests":
    "AP가 실제로 평가하는 것에 맞춰 설계된 모든 강의",
  "MISSION REPORTS": "미션 리포트",
  "Signals From Early Learners": "초기 학습자들의 신호",
  "Not identity theater. The shift in thinking is what matters.":
    "보여주기식이 아닙니다. 중요한 건 사고방식의 변화입니다.",
  "FIRST COHORT — BOARDING NOW": "첫 기수 — 지금 탑승 중",
  "Master Every Mission.": "모든 미션을 정복하세요.",
  "The platform opens in measured rollout for the first cohort. Early pilots unlock learning logs, AI memory, and hero faculty access first.":
    "플랫폼은 첫 기수를 대상으로 단계적으로 오픈됩니다. 초기 파일럿은 학습 기록, AI 메모리, 히어로 강사진 이용 권한을 먼저 받습니다.",
  "Join the waitlist →": "대기자 명단 등록 →",
  "See pricing": "요금제 보기",

  // ── Common actions / chrome ──────────────────────────────────────────
  Continue: "계속",
  Cancel: "취소",
  Save: "저장",
  Back: "뒤로",
  Next: "다음",
  Loading: "불러오는 중",
  "Loading…": "불러오는 중…",
  "Coming soon": "출시 예정",
  Search: "검색",
  Settings: "설정",
  Profile: "프로필",
};
