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
