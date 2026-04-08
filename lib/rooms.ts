export interface Room {
  id: string;
  name: string;
  emoji: string;
  category: "study" | "club" | "general";
  description: string;
  color: string;
}

export const ROOMS: Room[] = [
  // Study rooms
  { id: "ap-bio",      name: "AP Biology",          emoji: "🧬", category: "study",   description: "세포, DNA, 진화 등 AP Bio 전범위", color: "#1D9E75" },
  { id: "ap-chem",     name: "AP Chemistry",         emoji: "⚗️", category: "study",   description: "반응, 열역학, 전기화학",            color: "#7F77DD" },
  { id: "ap-calc",     name: "AP Calculus",          emoji: "📐", category: "study",   description: "미분·적분 BC/AB 토론",              color: "#BA7517" },
  { id: "ap-physics",  name: "AP Physics",           emoji: "⚡", category: "study",   description: "역학, E&M, 실험 토론",              color: "#185FA5" },
  { id: "amc",         name: "AMC/AIME Math",        emoji: "🔢", category: "study",   description: "수학 경시 문제 공유 및 풀이",        color: "#3C3489" },
  { id: "sat",         name: "SAT/ACT Prep",         emoji: "📝", category: "study",   description: "시험 전략, 오답 분석, 점수 인증",    color: "#854F0B" },
  // Club rooms
  { id: "ivy-dreams",  name: "아이비리그 꿈꾸는 방", emoji: "🎓", category: "club",    description: "대입 전략, 합격 후기, 에세이 팁",    color: "#7F77DD" },
  { id: "startup",     name: "창업/스타트업 클럽",   emoji: "🚀", category: "club",    description: "사이드 프로젝트, 창업 아이디어",     color: "#D85A30" },
  { id: "research",    name: "논문/리서치 클럽",     emoji: "🔬", category: "club",    description: "리서치 주제 공유, 논문 작성 팁",     color: "#0F6E56" },
  { id: "eco-club",    name: "환경 과학 클럽",       emoji: "🌱", category: "club",    description: "환경 이슈, 프로젝트 아이디어",       color: "#1D9E75" },
  { id: "abroad",      name: "미국 유학 이야기",     emoji: "✈️", category: "club",    description: "비자, 생활, 학교 정보 공유",         color: "#185FA5" },
  // General
  { id: "general",     name: "자유게시판",           emoji: "💬", category: "general", description: "공부 자극, 일상, 뭐든 OK",           color: "#993556" },
  { id: "motivation",  name: "공부 자극방",          emoji: "🔥", category: "general", description: "오늘 목표 선언, 스트릭 인증",        color: "#CC0000" },
];

export function getRoomById(id: string): Room | undefined {
  return ROOMS.find((r) => r.id === id);
}

export const ROOM_CATEGORIES = {
  study:   "📚 스터디룸",
  club:    "🏠 동아리방",
  general: "💬 자유방",
} as const;
