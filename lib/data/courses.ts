export type Difficulty = "입문" | "중급" | "심화";
export type Category = "AP" | "Honors" | "Core" | "대회" | "시험";

export interface Course {
  id: string;
  subject: string;
  subjectEn: string;
  category: Category;
  description: string;
  topicCount: number;
  difficulty: Difficulty;
  color: string;
  icon: string;
  lessonIds: string[];
}

export const courses: Course[] = [
  // ── AP ──────────────────────────────────────────────────────────────────
  {
    id: "ap-biology",
    subject: "AP 생물학", subjectEn: "AP Biology", category: "AP",
    description: "세포 구조부터 유전학까지, AP Biology 전 범위를 체계적으로 학습합니다. AI가 사고 과정을 기억하며 4년을 함께 성장합니다.",
    topicCount: 47, difficulty: "중급", color: "from-green-500 to-emerald-600", icon: "🧬",
    lessonIds: ["cell-structure", "mitochondria", "dna-replication", "photosynthesis", "cell-division"],
  },
  {
    id: "ap-chemistry",
    subject: "AP 화학", subjectEn: "AP Chemistry", category: "AP",
    description: "원자 구조와 주기율표부터 열역학까지. AP Chemistry의 핵심 개념을 단계별로 마스터합니다.",
    topicCount: 52, difficulty: "심화", color: "from-blue-500 to-cyan-600", icon: "⚗️",
    lessonIds: [],
  },
  {
    id: "ap-calculus-bc",
    subject: "AP 미적분 BC", subjectEn: "AP Calculus BC", category: "AP",
    description: "극한의 정의부터 급수와 매개변수 방정식까지. AB 전 범위 포함, BC 추가 개념 완전 정복.",
    topicCount: 61, difficulty: "심화", color: "from-purple-500 to-violet-600", icon: "∫",
    lessonIds: [],
  },
  {
    id: "ap-calculus-ab",
    subject: "AP 미적분 AB", subjectEn: "AP Calculus AB", category: "AP",
    description: "미분과 적분의 핵심 개념을 체계적으로. Calculus BC 진입 전 탄탄한 기반을 쌓습니다.",
    topicCount: 48, difficulty: "중급", color: "from-orange-500 to-amber-600", icon: "∫",
    lessonIds: [],
  },
  {
    id: "ap-precalculus",
    subject: "AP 프리칼큘러스", subjectEn: "AP Precalculus", category: "AP",
    description: "Calculus로 가는 다리. 함수, 삼각함수, 극좌표를 완전 정복합니다.",
    topicCount: 38, difficulty: "입문", color: "from-yellow-500 to-orange-500", icon: "📐",
    lessonIds: [],
  },
  {
    id: "ap-physics-c-mech",
    subject: "AP 물리 C 역학", subjectEn: "AP Physics C Mechanics", category: "AP",
    description: "미적분 기반 역학. 뉴턴의 법칙부터 에너지, 운동량까지 심층 학습.",
    topicCount: 44, difficulty: "심화", color: "from-blue-600 to-indigo-600", icon: "⚙️",
    lessonIds: [],
  },
  {
    id: "ap-physics-c-em",
    subject: "AP 물리 C 전자기", subjectEn: "AP Physics C E&M", category: "AP",
    description: "전기장, 자기장, 맥스웰 방정식. AP Physics C E&M의 전 범위를 다룹니다.",
    topicCount: 40, difficulty: "심화", color: "from-indigo-600 to-purple-600", icon: "⚡",
    lessonIds: [],
  },
  {
    id: "ap-physics-1",
    subject: "AP 물리 1", subjectEn: "AP Physics 1", category: "AP",
    description: "대수 기반 물리의 시작. 역학과 파동, 전기의 기초 개념을 탄탄히 다집니다.",
    topicCount: 42, difficulty: "중급", color: "from-sky-500 to-blue-600", icon: "🔭",
    lessonIds: [],
  },
  {
    id: "ap-statistics",
    subject: "AP 통계", subjectEn: "AP Statistics", category: "AP",
    description: "데이터 분석부터 추론 통계까지. 실생활 문제를 수학적으로 해석하는 능력을 키웁니다.",
    topicCount: 36, difficulty: "중급", color: "from-teal-500 to-emerald-600", icon: "📊",
    lessonIds: [],
  },
  {
    id: "ap-computer-science-a",
    subject: "AP 컴퓨터과학 A", subjectEn: "AP Computer Science A", category: "AP",
    description: "Java 기반 객체지향 프로그래밍. 알고리즘과 자료구조의 기초를 체계적으로 배웁니다.",
    topicCount: 45, difficulty: "중급", color: "from-gray-600 to-gray-800", icon: "💻",
    lessonIds: [],
  },
  {
    id: "ap-cs-principles",
    subject: "AP 컴퓨터과학 원리", subjectEn: "AP CS Principles", category: "AP",
    description: "프로그래밍의 기초부터 인터넷, 데이터, 사이버 보안까지. 모든 학생을 위한 CS 입문.",
    topicCount: 32, difficulty: "입문", color: "from-gray-500 to-slate-600", icon: "🖥️",
    lessonIds: [],
  },
  {
    id: "ap-english-language",
    subject: "AP 영어 언어", subjectEn: "AP English Language", category: "AP",
    description: "논증 에세이와 수사학 분석. AP Lang 3점 이상을 위한 완전 전략.",
    topicCount: 38, difficulty: "중급", color: "from-red-500 to-rose-600", icon: "✍️",
    lessonIds: [],
  },
  {
    id: "ap-english-literature",
    subject: "AP 영어 문학", subjectEn: "AP English Literature", category: "AP",
    description: "시, 소설, 희곡 분석. 문학적 장치와 주제 분석 능력을 키웁니다.",
    topicCount: 35, difficulty: "심화", color: "from-rose-600 to-pink-700", icon: "📚",
    lessonIds: [],
  },
  {
    id: "ap-us-history",
    subject: "AP 미국사", subjectEn: "AP US History", category: "AP",
    description: "식민지 시대부터 현대까지. DBQ와 LEQ 작성법을 포함한 완전 학습.",
    topicCount: 55, difficulty: "중급", color: "from-amber-600 to-yellow-700", icon: "🗽",
    lessonIds: [],
  },
  {
    id: "ap-world-history",
    subject: "AP 세계사", subjectEn: "AP World History", category: "AP",
    description: "인류 문명의 시작부터 현재까지. 비교 분석과 역사적 사고력을 기릅니다.",
    topicCount: 58, difficulty: "중급", color: "from-lime-600 to-green-700", icon: "🌍",
    lessonIds: [],
  },
  {
    id: "ap-psychology",
    subject: "AP 심리학", subjectEn: "AP Psychology", category: "AP",
    description: "인간 행동과 정신 과정의 이해. 심리학 이론과 연구 방법론을 탐구합니다.",
    topicCount: 34, difficulty: "입문", color: "from-pink-500 to-fuchsia-600", icon: "🧠",
    lessonIds: [],
  },
  {
    id: "ap-macroeconomics",
    subject: "AP 거시경제", subjectEn: "AP Macroeconomics", category: "AP",
    description: "GDP, 인플레이션, 통화정책. 국가 경제의 작동 원리를 분석합니다.",
    topicCount: 30, difficulty: "중급", color: "from-green-600 to-lime-700", icon: "📈",
    lessonIds: [],
  },
  {
    id: "ap-microeconomics",
    subject: "AP 미시경제", subjectEn: "AP Microeconomics", category: "AP",
    description: "수요·공급부터 시장 구조까지. 경제적 의사결정의 원리를 마스터합니다.",
    topicCount: 28, difficulty: "중급", color: "from-emerald-700 to-teal-800", icon: "📉",
    lessonIds: [],
  },
  {
    id: "ap-environmental-science",
    subject: "AP 환경과학", subjectEn: "AP Environmental Science", category: "AP",
    description: "생태계, 에너지, 환경 문제. 과학적 데이터로 환경 이슈를 분석합니다.",
    topicCount: 38, difficulty: "중급", color: "from-green-400 to-teal-500", icon: "🌱",
    lessonIds: [],
  },

  // ── Honors ──────────────────────────────────────────────────────────────
  {
    id: "honors-biology",
    subject: "Honors 생물학", subjectEn: "Honors Biology", category: "Honors",
    description: "AP Biology 진입 전 탄탄한 기반. 세포, 유전, 진화의 핵심을 깊이 탐구합니다.",
    topicCount: 35, difficulty: "중급", color: "from-green-400 to-emerald-500", icon: "🧬",
    lessonIds: [],
  },
  {
    id: "honors-chemistry",
    subject: "Honors 화학", subjectEn: "Honors Chemistry", category: "Honors",
    description: "AP Chemistry로 가는 필수 기반. 원소, 반응, 결합의 원리를 체계적으로.",
    topicCount: 38, difficulty: "중급", color: "from-violet-400 to-purple-500", icon: "⚗️",
    lessonIds: [],
  },
  {
    id: "honors-physics",
    subject: "Honors 물리", subjectEn: "Honors Physics", category: "Honors",
    description: "역학, 파동, 광학, 전기의 기초. AP Physics 진입을 위한 완전 준비.",
    topicCount: 36, difficulty: "중급", color: "from-blue-400 to-indigo-500", icon: "🔭",
    lessonIds: [],
  },
  {
    id: "honors-precalculus",
    subject: "Honors 프리칼큘러스", subjectEn: "Honors Precalculus", category: "Honors",
    description: "삼각함수, 함수, 수열. AP Calculus AB/BC 성공을 위한 완전 기반.",
    topicCount: 32, difficulty: "중급", color: "from-amber-400 to-orange-500", icon: "📐",
    lessonIds: [],
  },
  {
    id: "honors-english",
    subject: "Honors 영어", subjectEn: "Honors English", category: "Honors",
    description: "문학 분석과 논증 쓰기. AP English로 가는 탄탄한 글쓰기 기반을 다집니다.",
    topicCount: 30, difficulty: "중급", color: "from-red-400 to-rose-500", icon: "📖",
    lessonIds: [],
  },
  {
    id: "honors-algebra",
    subject: "Honors 대수학", subjectEn: "Honors Algebra", category: "Honors",
    description: "방정식, 함수, 다항식. 고등 수학의 핵심 언어를 완전 정복합니다.",
    topicCount: 28, difficulty: "입문", color: "from-orange-400 to-red-500", icon: "➕",
    lessonIds: [],
  },
  {
    id: "honors-us-history",
    subject: "Honors 미국사", subjectEn: "Honors US History", category: "Honors",
    description: "AP US History 진입 전 필수 배경 지식. 사건 분석과 에세이 쓰기 기초.",
    topicCount: 40, difficulty: "입문", color: "from-yellow-500 to-amber-600", icon: "🗽",
    lessonIds: [],
  },

  // ── Core ────────────────────────────────────────────────────────────────
  {
    id: "integrated-science",
    subject: "통합과학", subjectEn: "Integrated Science", category: "Core",
    description: "물리·화학·생물·지구과학의 기초를 통합적으로. 모든 AP 과학의 시작점.",
    topicCount: 30, difficulty: "입문", color: "from-teal-400 to-green-500", icon: "🔬",
    lessonIds: [],
  },
  {
    id: "geometry",
    subject: "기하학", subjectEn: "Geometry", category: "Core",
    description: "증명, 도형, 넓이와 부피. 논리적 사고의 기초를 기하학으로 다집니다.",
    topicCount: 26, difficulty: "입문", color: "from-purple-400 to-violet-500", icon: "📐",
    lessonIds: [],
  },
  {
    id: "algebra",
    subject: "대수학", subjectEn: "Algebra", category: "Core",
    description: "방정식과 부등식, 함수의 기초. 모든 수학 과목의 언어를 배웁니다.",
    topicCount: 24, difficulty: "입문", color: "from-amber-400 to-yellow-500", icon: "➕",
    lessonIds: [],
  },
  {
    id: "core-english",
    subject: "영어", subjectEn: "English", category: "Core",
    description: "독해, 문법, 작문의 기초. 영어 실력의 뿌리를 탄탄히 만듭니다.",
    topicCount: 28, difficulty: "입문", color: "from-red-400 to-rose-500", icon: "📖",
    lessonIds: [],
  },
  {
    id: "us-history",
    subject: "미국사", subjectEn: "US History", category: "Core",
    description: "미국의 역사와 문화를 이해하는 필수 기반. 미국에서 공부하는 첫걸음.",
    topicCount: 32, difficulty: "입문", color: "from-yellow-400 to-amber-500", icon: "🗽",
    lessonIds: [],
  },
  {
    id: "core-chemistry",
    subject: "화학", subjectEn: "Chemistry", category: "Core",
    description: "원소, 화학 결합, 반응의 기초. Honors/AP Chemistry 진입 준비.",
    topicCount: 26, difficulty: "입문", color: "from-blue-400 to-cyan-500", icon: "⚗️",
    lessonIds: [],
  },
  {
    id: "core-biology",
    subject: "생물학", subjectEn: "Biology", category: "Core",
    description: "생명의 기본 원리. 세포, 유전, 생태계의 기초를 배웁니다.",
    topicCount: 28, difficulty: "입문", color: "from-green-400 to-emerald-500", icon: "🧬",
    lessonIds: [],
  },
  {
    id: "core-physics",
    subject: "물리학", subjectEn: "Physics", category: "Core",
    description: "힘, 에너지, 파동의 기초. 일상 속 물리 현상을 과학적으로 이해합니다.",
    topicCount: 26, difficulty: "입문", color: "from-sky-400 to-blue-500", icon: "🔭",
    lessonIds: [],
  },

  // ── 대회 ────────────────────────────────────────────────────────────────
  {
    id: "amc-10",
    subject: "AMC 10", subjectEn: "AMC 10", category: "대회",
    description: "경우의 수 기초부터 기출 유형 분석까지. AMC 10 고득점을 위한 체계적 전략.",
    topicCount: 36, difficulty: "중급", color: "from-violet-500 to-purple-600", icon: "🏆",
    lessonIds: [],
  },
  {
    id: "amc-12",
    subject: "AMC 12", subjectEn: "AMC 12", category: "대회",
    description: "AMC 10 심화 + 추가 개념. AIME 진출을 위한 최적화된 커리큘럼.",
    topicCount: 42, difficulty: "심화", color: "from-indigo-600 to-violet-700", icon: "🏆",
    lessonIds: [],
  },
  {
    id: "aime",
    subject: "AIME", subjectEn: "AIME", category: "대회",
    description: "AMC 상위 5% 이후의 세계. AIME 특화 전략과 심화 수학 개념을 다룹니다.",
    topicCount: 48, difficulty: "심화", color: "from-purple-700 to-indigo-800", icon: "🥇",
    lessonIds: [],
  },
  {
    id: "science-olympiad",
    subject: "사이언스 올림피아드", subjectEn: "Science Olympiad", category: "대회",
    description: "23개 이벤트 전략과 팀 협력. 과학 올림피아드 지역/전국 대회를 목표로.",
    topicCount: 40, difficulty: "심화", color: "from-teal-600 to-emerald-700", icon: "🔬",
    lessonIds: [],
  },
  {
    id: "usabo",
    subject: "생물 올림피아드", subjectEn: "USABO", category: "대회",
    description: "AP Bio 심화 + 올림피아드 특화 훈련. USABO Open과 Semifinal을 목표로.",
    topicCount: 44, difficulty: "심화", color: "from-green-700 to-emerald-800", icon: "🧬",
    lessonIds: [],
  },
  {
    id: "physics-bowl",
    subject: "피직스 볼", subjectEn: "Physics Bowl", category: "대회",
    description: "AP Physics C + 대회 문제 특화. Physics Bowl과 F=ma를 동시에 준비.",
    topicCount: 38, difficulty: "심화", color: "from-blue-700 to-indigo-800", icon: "⚡",
    lessonIds: [],
  },

  // ── 시험 ────────────────────────────────────────────────────────────────
  {
    id: "sat-math",
    subject: "SAT 수학", subjectEn: "SAT Math", category: "시험",
    description: "대수 방정식 전략부터 SAT Math 800점까지. 빈출 유형 분석과 시간 관리 전략.",
    topicCount: 29, difficulty: "중급", color: "from-amber-500 to-orange-600", icon: "📝",
    lessonIds: [],
  },
  {
    id: "sat-reading",
    subject: "SAT 읽기/쓰기", subjectEn: "SAT Reading & Writing", category: "시험",
    description: "SAT R&W 고득점 전략. 지문 유형별 접근법과 문법 규칙을 완전 정복.",
    topicCount: 33, difficulty: "중급", color: "from-rose-500 to-pink-600", icon: "📝",
    lessonIds: [],
  },
  {
    id: "act",
    subject: "ACT", subjectEn: "ACT", category: "시험",
    description: "ACT Math, English, Reading, Science 전 영역 전략. SAT와 비교해 최적 선택.",
    topicCount: 40, difficulty: "중급", color: "from-orange-500 to-red-600", icon: "📋",
    lessonIds: [],
  },
  {
    id: "toefl",
    subject: "TOEFL", subjectEn: "TOEFL", category: "시험",
    description: "Reading, Listening, Speaking, Writing 전 영역 완전 정복. 목표 점수 달성 전략.",
    topicCount: 36, difficulty: "중급", color: "from-red-500 to-rose-600", icon: "🌐",
    lessonIds: [],
  },
];
