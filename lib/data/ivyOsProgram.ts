/**
 * Ivy League Operating System (ILOS) — InHero signature program structure.
 * Drives /parents/program. A transformation program (강의→과제→결과물→unlock),
 * not a lecture pack. Plus the separate Researcher OS signature track.
 */
export interface Lesson { n: number; title: string; note?: string }
export interface Module { title: string; lessons: Lesson[] }
export interface Season { n: number; code: string; title: string; goal: string; deliverable: string; emoji: string; modules: Module[] }

export const ILOS_META = {
  title: "Ivy League Operating System",
  subtitle: "아이비리그 학생들은 무엇을 배우는가가 아니라, 어떻게 배우는가",
  pitch: "공부법 강의가 아니라 운영체제(OS) 설치 프로그램. 강의를 마칠 때마다 실제 결과물이 하나씩 남습니다.",
  stats: ["6 Seasons", "25 Modules", "105 Lessons", "50시간+", "Notion 템플릿", "캡스톤 포함"],
  audience: ["국제학교·해외고 학생", "미국 대학 진학 준비생", "미국 대학 재학생", "자기주도 역량을 키우려는 학생"],
  loop: ["강의", "과제", "결과물", "피드백", "다음 unlock"],
  realProof: [
    "실제 Cornell 노트", "실제 AP 단권화 자료", "실제 연구노트", "실제 교수 컨택 이메일",
    "실제 Notion·캘린더", "실제 프로젝트 문서", "실제 TEDx 운영 자료", "실제 InHero 제작 과정",
  ],
};

export const ILOS_SEASONS: Season[] = [
  {
    n: 1, code: "SELF DISCOVERY SYSTEM", title: "자기 발견 시스템", emoji: "🧭",
    goal: "활동을 시작하기 전에 '나는 누구인가'부터.",
    deliverable: "Interest Portfolio (PDF ~20p) — 관심사·가치관·롤모델 지도 + 강점 분석",
    modules: [
      { title: "M1 · Why Do You Study?", lessons: [
        { n: 1, title: "동기의 본질", note: "성적보다 중요한 것 · Future Letter(10년 후의 나에게)" },
        { n: 2, title: "롤모델 분석 시스템", note: "공통 패턴 추출 → 가치관 발견 · 롤모델 10명 분석" },
        { n: 3, title: "좋아하는 '감정' 찾기", note: "직업이 아니라 감정(호기심·몰입·경외감) · Emotion Map" },
      ]},
      { title: "M2 · Personal Mind Map", lessons: [
        { n: 4, title: "관심사는 발견하는 것" }, { n: 5, title: "나만의 마인드맵 구축" },
        { n: 6, title: "점과 점 연결하기" }, { n: 7, title: "탐색의 기술", note: "→ Personal Interest Map" },
      ]},
      { title: "M3 · Identity Building", lessons: [
        { n: 8, title: "나를 한 문장으로" }, { n: 9, title: "강점 찾기" },
        { n: 10, title: "약점을 무기로" }, { n: 11, title: "스토리의 재료 모으기", note: "→ Personal Narrative v1" },
      ]},
    ],
  },
  {
    n: 2, code: "LEARNING SYSTEM", title: "학습 시스템", emoji: "🧠",
    goal: "아이비리그 학생의 학습 방식을 시스템화한다.",
    deliverable: "Personal Academic OS — 실제 Notion·Calendar·Drive·노트 시스템 구축",
    modules: [
      { title: "M4 · Learning Architecture", lessons: [
        { n: 12, title: "미국 대학 수업 구조" }, { n: 13, title: "교수는 무엇을 평가하는가" },
        { n: 14, title: "시험보다 중요한 것" }, { n: 15, title: "학습 시스템 설계" },
      ]},
      { title: "M5 · Notetaking Mastery", lessons: [
        { n: 16, title: "Cornell Notes", note: "실제 코넬 노트 공개" }, { n: 17, title: "Engineering Notes" },
        { n: 18, title: "Research Notes" }, { n: 19, title: "Digital Notes" }, { n: 20, title: "Second Brain 구축" },
      ]},
      { title: "M6 · Deep Understanding", lessons: [
        { n: 21, title: "개념 vs 암기" }, { n: 22, title: "교과서 읽는 법" }, { n: 23, title: "논문 읽는 법" },
        { n: 24, title: "Active Recall" }, { n: 25, title: "Spaced Repetition" }, { n: 26, title: "Interleaving" },
      ]},
      { title: "M7 · Language Layer (국제학생 핵심)", lessons: [
        { n: 27, title: "영어와 개념 분리하기" }, { n: 28, title: "수학 영어 정복" }, { n: 29, title: "과학 영어 정복" },
        { n: 30, title: "사회과학 영어 정복" }, { n: 31, title: "읽기 속도 향상" },
      ]},
      { title: "M8 · AI Learning", lessons: [
        { n: 32, title: "AI 시대 공부법" }, { n: 33, title: "ChatGPT 활용" }, { n: 34, title: "Claude 활용" },
        { n: 35, title: "NotebookLM 활용" }, { n: 36, title: "AI와 인간의 역할 분리", note: "→ AI Study Workflow" },
      ]},
    ],
  },
  {
    n: 3, code: "THINKING SYSTEM", title: "사고 시스템", emoji: "❓",
    goal: "문제를 푸는 사람이 아니라 문제를 발견하는 사람.",
    deliverable: "Question Bank — 100 Questions Project → 10개 선별 → 1개를 연구 주제로",
    modules: [
      { title: "M9 · Question Thinking", lessons: [
        { n: 37, title: "좋은 질문이란" }, { n: 38, title: "질문 만드는 법" }, { n: 39, title: "호기심 훈련" }, { n: 40, title: "100 Questions Project" },
      ]},
      { title: "M10 · Research Thinking", lessons: [
        { n: 41, title: "Research Mindset" }, { n: 42, title: "Gap 찾기" }, { n: 43, title: "가설 세우기" }, { n: 44, title: "Evidence 수집" }, { n: 45, title: "논리 구축" },
      ]},
      { title: "M11 · Systems Thinking", lessons: [
        { n: 46, title: "시스템 사고" }, { n: 47, title: "First Principles" }, { n: 48, title: "인과관계 이해" }, { n: 49, title: "복잡한 문제 분해" },
      ]},
      { title: "M12 · Communication Thinking", lessons: [
        { n: 50, title: "글쓰기 구조" }, { n: 51, title: "발표 구조" }, { n: 52, title: "설득 구조" }, { n: 53, title: "스토리텔링 구조" },
      ]},
    ],
  },
  {
    n: 4, code: "OPPORTUNITY SYSTEM", title: "기회 시스템", emoji: "📊",
    goal: "기회를 발견하고 잡는 법 — 해외에서도.",
    deliverable: "Opportunity Dashboard — 연구실·교수·인턴·여름 프로그램 자기 데이터베이스",
    modules: [
      { title: "M13 · Networking", lessons: [
        { n: 54, title: "멘토 찾기" }, { n: 55, title: "교수 활용" }, { n: 56, title: "Office Hours" }, { n: 57, title: "LinkedIn" },
      ]},
      { title: "M14 · Research Access (국제학생 → 미국 연구실)", lessons: [
        { n: 58, title: "연구실 찾기" }, { n: 59, title: "교수 컨택" }, { n: 60, title: "Cold Email", note: "실제 메일 공개" }, { n: 61, title: "연구실 인터뷰" },
      ]},
      { title: "M15 · Internship System", lessons: [
        { n: 62, title: "인턴 찾기" }, { n: 63, title: "이력서 작성" }, { n: 64, title: "포트폴리오 작성" }, { n: 65, title: "인터뷰 준비" },
      ]},
      { title: "M16 · Global Opportunities", lessons: [
        { n: 66, title: "교환학생" }, { n: 67, title: "Study Abroad" }, { n: 68, title: "Summer Program" }, { n: 69, title: "Scholarships" },
      ]},
    ],
  },
  {
    n: 5, code: "BUILDER SYSTEM", title: "빌더 시스템 (진짜 핵심)", emoji: "🛠️",
    goal: "관심사를 결과물로 전환 — 4개 트랙 중 반드시 하나 완성.",
    deliverable: "완성된 결과물 1개 — Research(논문)·Publishing(책)·Technology(앱/웹)·Community(조직/이벤트)",
    modules: [
      { title: "M17 · Project Design", lessons: [
        { n: 70, title: "좋은 프로젝트란" }, { n: 71, title: "아이디어 발굴" }, { n: 72, title: "프로젝트 설계" }, { n: 73, title: "실행 계획" },
      ]},
      { title: "M18 · Research Project (Track A)", lessons: [
        { n: 74, title: "독립 연구" }, { n: 75, title: "문헌조사" }, { n: 76, title: "실험 설계" }, { n: 77, title: "데이터 분석" }, { n: 78, title: "논문 작성" },
      ]},
      { title: "M19 · Publishing (Track B)", lessons: [
        { n: 79, title: "책 기획" }, { n: 80, title: "원고 작성" }, { n: 81, title: "편집" }, { n: 82, title: "Amazon KDP" }, { n: 83, title: "출판 후 브랜딩" },
      ]},
      { title: "M20 · Digital Building (Track C)", lessons: [
        { n: 84, title: "웹사이트 만들기" }, { n: 85, title: "앱 만들기" }, { n: 86, title: "AI 프로젝트" }, { n: 87, title: "포트폴리오 사이트", note: "실제 InHero 제작 과정" },
      ]},
      { title: "M21 · Leadership (Track D)", lessons: [
        { n: 88, title: "커뮤니티 만들기" }, { n: 89, title: "행사 기획" }, { n: 90, title: "TEDx 운영", note: "실제 운영 자료 공개" }, { n: 91, title: "팀 리딩" },
      ]},
    ],
  },
  {
    n: 6, code: "IVY BLUEPRINT", title: "아이비 블루프린트", emoji: "🗺️",
    goal: "모든 것을 하나의 대학 지원 전략으로 통합.",
    deliverable: "Life Blueprint — 1년·4년·대학·경력 계획 + 포트폴리오 + 에세이 전부 연결",
    modules: [
      { title: "M22 · Application Strategy", lessons: [
        { n: 92, title: "학교 리스트" }, { n: 93, title: "지원 전략" }, { n: 94, title: "전공 선택" },
      ]},
      { title: "M23 · Personal Narrative", lessons: [
        { n: 95, title: "스토리 마이닝" }, { n: 96, title: "에세이 소재 발굴" }, { n: 97, title: "주제 선정" }, { n: 98, title: "구조 설계" },
      ]},
      { title: "M24 · Application Materials", lessons: [
        { n: 99, title: "Common App" }, { n: 100, title: "Supplementals" }, { n: 101, title: "Recommendations" }, { n: 102, title: "Resume" },
      ]},
      { title: "M25 · Interview System", lessons: [
        { n: 103, title: "인터뷰 준비" }, { n: 104, title: "Mock Interview" }, { n: 105, title: "실전 대응" },
      ]},
    ],
  },
];

export const ILOS_CAPSTONE = [
  "Personal Narrative", "Interest Mind Map", "Academic System", "AI Workflow", "Research Proposal",
  "Portfolio Website", "LinkedIn Profile", "Resume", "College Roadmap", "4-Year Growth Blueprint",
];

export const ILOS_BUILD_WEEK = {
  title: "InHero Build Week",
  body: "8주마다 48시간 집중 빌드 — 논문 초안 완성 · 웹사이트 런칭 · 책 목차 완성 · 연구 제안서 제출. 학생이 진짜 돈을 내는 이유는 강의가 아니라 '내가 완성했다'는 경험.",
};

// ── Researcher OS — separate signature track ───────────────────────────────
export interface ResearchPhase { n: number; title: string; weeks: string; deliverable?: string }
export const RESEARCHER_OS = {
  title: "Researcher OS",
  subtitle: "혼자서 연구를 시작하고, 논문을 쓰고, 투고할 수 있는 학생 만들기",
  before: ["논문 없음", "연구 경험 없음", "교수 연결 없음", "어디서 시작할지 모름"],
  after: ["주제 발굴", "논문 읽기", "Literature Review", "연구 설계", "데이터 수집", "논문 작성", "저널 찾기", "투고", "수정", "다음 연구"],
  outputs: ["Research Interest Map", "Research Notebook", "Literature Database", "Research Proposal", "Draft Paper", "Submission Package", "Conference Presentation", "Future Research Pipeline"],
  phases: [
    { n: 1, title: "Finding Questions", weeks: "W1–4", deliverable: "연구 질문 100개" },
    { n: 2, title: "Literature Review", weeks: "W5–10", deliverable: "Literature Review 문서" },
    { n: 3, title: "Research Design", weeks: "W11–16", deliverable: "Research Proposal" },
    { n: 4, title: "Execution", weeks: "W17–22", deliverable: "Data Package" },
    { n: 5, title: "Academic Writing (IMRAD)", weeks: "W23–30", deliverable: "Full Draft" },
    { n: 6, title: "Publication", weeks: "W31–36", deliverable: "Submission-Ready Package" },
  ] as ResearchPhase[],
  ethics: "출판을 보장하지 않습니다. 연구 윤리·정직한 저널 선택·현실적 기대치를 함께 가르칩니다. 학생은 '논문 1편'이 아니라 '평생 연구할 수 있는 시스템'을 얻습니다.",
};
