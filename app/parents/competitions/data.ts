/**
 * US high-school competition database for the parent hub
 * (/parents/competitions). Curated across ALL fields that matter for college
 * admissions — not just STEM: math, CS, science, research, business/econ,
 * humanities/writing, debate/speech, history/social science, language, arts.
 *
 * Kept factual and conservative. Timing is the typical annual window and shifts
 * year to year — framed as "보통(typically)" in the UI; always confirm on each
 * competition's official site. Expand over time; the /parents count reads length.
 */

export type CompetitionCategory =
  | "수학"
  | "컴퓨터과학"
  | "생물·의학"
  | "화학"
  | "물리"
  | "종합 과학"
  | "연구 프로젝트"
  | "로봇·공학"
  | "비즈니스·경제"
  | "인문·글쓰기"
  | "토론·스피치"
  | "사회·역사"
  | "언어"
  | "예술"
  | "기타";

export interface Competition {
  name: string;        // commonly used English name
  nameKo: string;      // short Korean gloss
  emoji: string;
  category: CompetitionCategory;
  grade: string;       // typical eligible grades
  difficulty: "입문" | "중급" | "고급" | "최상위";
  timing: string;      // typical annual window (KO)
  majors: string[];    // majors this signals for
  team: boolean;       // team-based?
  blurb: string;       // one-line KO description
}

export const COMPETITIONS: Competition[] = [
  // ── 수학 ──────────────────────────────────────────────
  {
    name: "AMC 10/12 → AIME → USAMO", nameKo: "미국 수학 올림피아드 경로", emoji: "➗",
    category: "수학", grade: "G9–12 (AMC 10은 G10 이하)", difficulty: "최상위",
    timing: "AMC 11월 · AIME 2월 · USAMO 3월", team: false,
    majors: ["수학", "컴퓨터과학", "공학", "경제·금융"],
    blurb: "미국 최대 규모 수학 경시. AMC 고득점 → AIME → USAMO로 이어지는 단계형 경로로, 이공계 지원의 강력한 신호.",
  },
  {
    name: "MATHCOUNTS", nameKo: "매스카운츠", emoji: "🔢",
    category: "수학", grade: "G6–8 (중학)", difficulty: "중급",
    timing: "학교→지역(2월)→주(3월)→전국(5월)", team: true,
    majors: ["수학", "컴퓨터과학", "공학"],
    blurb: "중학생 대상 전국 수학 대회. 일찍 수학 트랙을 보여주려는 학생의 출발점으로, 고교 AMC의 발판이 됨.",
  },
  {
    name: "Math Tournaments (HMMT·PUMaC·CMIMC)", nameKo: "대학 주최 수학 토너먼트", emoji: "📐",
    category: "수학", grade: "G9–12 (팀+개인)", difficulty: "최상위",
    timing: "가을~겨울 (대학별 일정)", team: true,
    majors: ["수학", "컴퓨터과학", "물리"],
    blurb: "Harvard-MIT(HMMT)·Princeton(PUMaC)·CMU 등 명문대가 여는 초청형 수학 대회. 최상위권의 실력 무대.",
  },
  // ── 컴퓨터과학 ────────────────────────────────────────
  {
    name: "USACO", nameKo: "미국 컴퓨팅 올림피아드", emoji: "💻",
    category: "컴퓨터과학", grade: "G7–12", difficulty: "고급",
    timing: "12·1·2월 월별 온라인 대회", team: false,
    majors: ["컴퓨터과학", "소프트웨어 공학", "데이터 사이언스"],
    blurb: "알고리즘 프로그래밍 대회. Bronze→Silver→Gold→Platinum 승급제라 실력만큼 단계가 올라가 CS 지원에 직접 어필.",
  },
  {
    name: "Congressional App Challenge", nameKo: "의회 앱 챌린지", emoji: "📱",
    category: "컴퓨터과학", grade: "G9–12", difficulty: "입문",
    timing: "등록 여름 · 마감 11월 (지역구별)", team: true,
    majors: ["컴퓨터과학", "디자인", "창업"],
    blurb: "미 하원의원 지역구별로 열리는 앱 개발 대회. 진입 장벽이 낮아 CS 첫 프로젝트로 좋고 지역구 1등은 의미 있는 인정.",
  },
  {
    name: "CyberPatriot", nameKo: "사이버패트리어트 (보안)", emoji: "🛡️",
    category: "컴퓨터과학", grade: "G9–12 (팀)", difficulty: "중급",
    timing: "시즌 가을~겨울 · 결선 봄", team: true,
    majors: ["사이버보안", "컴퓨터과학", "정보시스템"],
    blurb: "전국 사이버보안 방어 대회. 가상 시스템의 취약점을 찾아 막는 실전형으로, 보안·CS 관심을 구체적으로 증명.",
  },
  {
    name: "Technovation Girls", nameKo: "테크노베이션 (앱·창업)", emoji: "👩‍💻",
    category: "컴퓨터과학", grade: "G5–12 (팀)", difficulty: "중급",
    timing: "봄 마감 · 세계 결선 여름", team: true,
    majors: ["컴퓨터과학", "창업", "사회혁신"],
    blurb: "사회 문제를 해결하는 모바일 앱+사업계획 대회(여학생 대상). CS와 기업가정신을 함께 보여줄 수 있음.",
  },
  // ── 생물·의학 ─────────────────────────────────────────
  {
    name: "USABO", nameKo: "미국 생물 올림피아드", emoji: "🧬",
    category: "생물·의학", grade: "G9–12", difficulty: "고급",
    timing: "등록 12–1월 · Open Exam 2월 · Semifinal 3월", team: false,
    majors: ["생물학", "생명공학", "의예(Pre-med)", "신경과학"],
    blurb: "전국 생물 경시. 상위 입상은 국가대표(IBO) 선발로 이어지며, 의·생명 계열 지원의 대표 스펙.",
  },
  {
    name: "Brain Bee", nameKo: "브레인 비 (신경과학)", emoji: "🧠",
    category: "생물·의학", grade: "G9–12", difficulty: "중급",
    timing: "지역 1–2월 · 전국 봄", team: false,
    majors: ["신경과학", "의예(Pre-med)", "심리학"],
    blurb: "신경과학 지식 경시. 진입 장벽이 낮아 의·생명 관심 학생의 첫 대회로 좋고, 지역→전국→국제로 확장 가능.",
  },
  {
    name: "HOSA", nameKo: "보건·의료 직업 대회", emoji: "🩺",
    category: "생물·의학", grade: "G9–12", difficulty: "중급",
    timing: "지역 겨울 · 주 봄 · 국제 컨퍼런스 6월", team: false,
    majors: ["의예(Pre-med)", "간호", "공중보건", "보건행정"],
    blurb: "보건·의료 분야 종목별 대회(임상, 지식, 발표 등). 의료 계열 진로를 일찍 보여주려는 학생에게 적합.",
  },
  // ── 화학 ─────────────────────────────────────────────
  {
    name: "USNCO", nameKo: "미국 화학 올림피아드", emoji: "⚗️",
    category: "화학", grade: "G9–12", difficulty: "고급",
    timing: "지역(Local) 3월 · 전국(National) 4월", team: false,
    majors: ["화학", "화학공학", "의예(Pre-med)", "재료공학"],
    blurb: "전국 화학 경시. 지역 시험 통과 후 전국 시험, 상위권은 국가대표 캠프로. AP Chemistry와 시너지가 큼.",
  },
  // ── 물리 ─────────────────────────────────────────────
  {
    name: "F=ma → USAPhO", nameKo: "미국 물리 올림피아드 경로", emoji: "🪐",
    category: "물리", grade: "G9–12", difficulty: "최상위",
    timing: "F=ma 1–2월 · USAPhO 3–4월", team: false,
    majors: ["물리학", "전기·기계공학", "항공우주", "수학"],
    blurb: "F=ma 시험 통과자가 USAPhO에 진출하는 단계형 물리 경시. 이공계 최상위 지원에서 강한 변별력.",
  },
  {
    name: "Physics Bowl", nameKo: "피직스 볼", emoji: "🎳",
    category: "물리", grade: "G9–12", difficulty: "중급",
    timing: "3–4월", team: false,
    majors: ["물리학", "공학"],
    blurb: "40문항 객관식 물리 대회(AAPT 주최). USAPhO보다 진입이 쉬워 물리 입문 학생의 도전 무대로 적합.",
  },
  // ── 종합 과학 ────────────────────────────────────────
  {
    name: "Science Olympiad", nameKo: "사이언스 올림피아드", emoji: "🧪",
    category: "종합 과학", grade: "G9–12 (팀)", difficulty: "중급",
    timing: "지역·주 겨울~봄 · 전국 5월", team: true,
    majors: ["과학·공학 전반"],
    blurb: "23개 종목(생물·화학·물리·공학 등)을 팀으로 나눠 겨루는 종합 대회. 팀워크와 폭넓은 STEM 역량을 보여줌.",
  },
  {
    name: "National Science Bowl", nameKo: "전국 사이언스 볼 (DOE)", emoji: "🔬",
    category: "종합 과학", grade: "G9–12 (팀)", difficulty: "고급",
    timing: "지역 1–3월 · 전국 봄(워싱턴 D.C.)", team: true,
    majors: ["과학·수학·공학 전반"],
    blurb: "미국 에너지부(DOE) 주최 과학·수학 퀴즈 대회. 빠른 응답형 팀전으로, 폭넓은 이과 지식을 증명.",
  },
  // ── 연구 프로젝트 ────────────────────────────────────
  {
    name: "Regeneron ISEF", nameKo: "국제 과학·공학 페어", emoji: "🔭",
    category: "연구 프로젝트", grade: "G9–12", difficulty: "최상위",
    timing: "지역·주 과학전 겨울~봄 → ISEF 5월", team: false,
    majors: ["전 STEM 분야 연구"],
    blurb: "세계 최대 고교 연구 대회. 지역 과학전에서 선발되어 진출하며, 독자적 연구 프로젝트를 가진 학생의 최고 무대.",
  },
  {
    name: "Regeneron STS", nameKo: "사이언스 탤런트 서치", emoji: "🏅",
    category: "연구 프로젝트", grade: "G12 (12학년만)", difficulty: "최상위",
    timing: "11월 마감 (가을)", team: false,
    majors: ["전 STEM 분야 연구"],
    blurb: "미국에서 가장 권위 있는 고교 연구 장학 대회. 12학년이 그동안의 연구를 제출하며, Top 40·300은 입시에서 큰 가치.",
  },
  {
    name: "JSHS", nameKo: "주니어 과학·인문 심포지엄", emoji: "🧫",
    category: "연구 프로젝트", grade: "G9–12", difficulty: "고급",
    timing: "지역 겨울 · 전국 봄", team: false,
    majors: ["STEM 연구 전반"],
    blurb: "미 국방부 후원 연구 발표 대회. 자신의 연구를 발표·심사받으며, 장학금과 함께 연구 역량을 인정받음.",
  },
  {
    name: "MIT THINK", nameKo: "MIT 씽크 (연구 제안)", emoji: "💡",
    category: "연구 프로젝트", grade: "G9–12", difficulty: "고급",
    timing: "1월 마감", team: false,
    majors: ["공학", "컴퓨터과학", "과학 전반"],
    blurb: "아직 시작 전인 연구 '제안서'를 평가 — 비용·완성된 결과가 없어도 아이디어로 도전 가능. MIT 학생 멘토링 제공.",
  },
  {
    name: "Genius Olympiad", nameKo: "지니어스 올림피아드 (환경)", emoji: "🌱",
    category: "연구 프로젝트", grade: "G9–12", difficulty: "중급",
    timing: "3월 마감 · 결선 6월", team: false,
    majors: ["환경과학", "공학", "지속가능성"],
    blurb: "환경을 주제로 한 프로젝트 대회(과학·로보틱스·예술·글쓰기 부문). 연구 입문 학생이 도전하기 좋은 난이도.",
  },
  // ── 로봇·공학 ────────────────────────────────────────
  {
    name: "FIRST Robotics (FRC/FTC)", nameKo: "퍼스트 로보틱스", emoji: "🤖",
    category: "로봇·공학", grade: "G9–12 (팀)", difficulty: "중급",
    timing: "시즌 1–4월 (지역→챔피언십)", team: true,
    majors: ["기계·전기공학", "컴퓨터과학", "로봇공학"],
    blurb: "로봇을 직접 설계·제작·프로그래밍해 겨루는 팀 대회. 리더십·협업·엔지니어링을 동시에 보여줄 수 있음.",
  },
  {
    name: "VEX Robotics", nameKo: "VEX 로보틱스", emoji: "⚙️",
    category: "로봇·공학", grade: "G9–12 (팀)", difficulty: "중급",
    timing: "시즌 가을~봄 · 세계대회 5월", team: true,
    majors: ["기계·전기공학", "로봇공학", "컴퓨터과학"],
    blurb: "세계 최대 규모의 로봇 대회 중 하나. FIRST보다 진입 비용이 낮아 더 많은 학교가 참가, 공학 실전 경험에 좋음.",
  },
  // ── 비즈니스·경제 ────────────────────────────────────
  {
    name: "DECA", nameKo: "데카 (비즈니스·마케팅)", emoji: "📈",
    category: "비즈니스·경제", grade: "G9–12", difficulty: "중급",
    timing: "지역·주 겨울 · 국제(ICDC) 봄", team: false,
    majors: ["경영", "마케팅", "경제·금융", "기업가정신"],
    blurb: "경영·마케팅·금융 역할극 및 사례 발표 대회. 비즈니스 계열 지원자의 대표적 활동.",
  },
  {
    name: "FBLA", nameKo: "미래 비즈니스 리더 (FBLA)", emoji: "💼",
    category: "비즈니스·경제", grade: "G9–12", difficulty: "중급",
    timing: "지역·주 겨울~봄 · 전국(NLC) 6–7월", team: false,
    majors: ["경영", "회계·금융", "마케팅", "정보시스템"],
    blurb: "DECA와 함께 양대 비즈니스 동아리 대회. 회계·경영·기술 등 폭넓은 종목으로 비즈니스 진로를 보여줌.",
  },
  {
    name: "Wharton Global Youth Investment", nameKo: "와튼 글로벌 투자 대회", emoji: "💹",
    category: "비즈니스·경제", grade: "G9–12 (팀)", difficulty: "고급",
    timing: "가을~겨울 · 결선 봄", team: true,
    majors: ["금융", "경제", "경영"],
    blurb: "펜실베이니아대 와튼스쿨이 여는 모의 투자 대회. 실제 시장 데이터로 포트폴리오를 운용하며 금융 역량을 증명.",
  },
  {
    name: "National Economics Challenge", nameKo: "전국 경제 챌린지", emoji: "📊",
    category: "비즈니스·경제", grade: "G9–12 (팀)", difficulty: "고급",
    timing: "주 예선 봄 · 전국 결선 5월", team: true,
    majors: ["경제", "금융", "정책"],
    blurb: "미국 경제교육협의회(CEE) 주최 경제 지식 대회. 미시·거시·시사경제를 겨루며 AP Econ과 시너지가 큼.",
  },
  {
    name: "Diamond Challenge", nameKo: "다이아몬드 챌린지 (창업)", emoji: "💎",
    category: "비즈니스·경제", grade: "G9–12 (팀)", difficulty: "중급",
    timing: "마감 가을~겨울 · 결선 봄", team: true,
    majors: ["창업", "경영", "사회혁신"],
    blurb: "델라웨어대 주최 고교 창업 대회. 사업 아이디어·소셜벤처를 제안·발표하며 기업가정신을 보여줌.",
  },
  {
    name: "Conrad Challenge", nameKo: "콘래드 챌린지 (혁신)", emoji: "🚀",
    category: "비즈니스·경제", grade: "G6–12 (팀)", difficulty: "중급",
    timing: "등록 가을 · 단계별 심사 → 결선 봄", team: true,
    majors: ["창업", "공학", "경영", "디자인"],
    blurb: "실제 사회 문제를 해결하는 창업형 프로젝트 대회. 팀으로 제품·사업계획을 만들어 STEM+기업가정신을 어필.",
  },
  // ── 인문·글쓰기 ──────────────────────────────────────
  {
    name: "Scholastic Art & Writing Awards", nameKo: "스콜라스틱 예술·글쓰기 어워드", emoji: "✍️",
    category: "인문·글쓰기", grade: "G7–12", difficulty: "중급",
    timing: "지역 마감 가을~겨울 · 전국 발표 봄", team: false,
    majors: ["문예창작", "영문학", "저널리즘", "예술"],
    blurb: "미국에서 가장 오래되고 권위 있는 학생 예술·글쓰기 공모전. 부문이 다양하고 National Medal은 인문계 강력 스펙.",
  },
  {
    name: "The Concord Review", nameKo: "콩코드 리뷰 (역사 에세이)", emoji: "📜",
    category: "인문·글쓰기", grade: "G9–12", difficulty: "최상위",
    timing: "분기별 마감 (상시)", team: false,
    majors: ["역사", "정치", "국제관계", "법(예비)"],
    blurb: "고교생 역사 연구 논문을 싣는 유일한 학술지. 게재 자체가 큰 권위로, 역사·인문 지원자의 정점급 스펙.",
  },
  {
    name: "John Locke Essay Competition", nameKo: "존 로크 에세이 대회", emoji: "🖋️",
    category: "인문·글쓰기", grade: "G9–12 (국제)", difficulty: "고급",
    timing: "마감 6–7월", team: false,
    majors: ["철학", "경제", "정치", "역사", "법(예비)"],
    blurb: "영국 John Locke Institute 주최 국제 에세이 대회(철학·정치·경제·역사·심리·신학·법). 논증력을 보여주는 무대.",
  },
  {
    name: "NYT Student Contests", nameKo: "뉴욕타임스 학생 공모전", emoji: "🗞️",
    category: "인문·글쓰기", grade: "G6–12", difficulty: "중급",
    timing: "종류별 연중 (사설·리뷰·팟캐스트 등)", team: false,
    majors: ["저널리즘", "영문학", "미디어", "사회과학"],
    blurb: "뉴욕타임스가 여는 다양한 글쓰기·미디어 공모전(사설, 개인 에세이, 단편 등). 진입이 쉬워 글쓰기 첫 도전에 좋음.",
  },
  {
    name: "Profile in Courage Essay", nameKo: "용기 있는 결단 에세이 (JFK)", emoji: "🏛️",
    category: "인문·글쓰기", grade: "G9–12", difficulty: "중급",
    timing: "1월 마감", team: false,
    majors: ["정치", "역사", "공공정책", "법(예비)"],
    blurb: "JFK 도서관 주최 에세이 대회. 정치적 용기를 보인 미국 공직자를 분석하며 정치·역사 관심을 보여줌.",
  },
  // ── 토론·스피치 ──────────────────────────────────────
  {
    name: "NSDA Speech & Debate", nameKo: "전국 스피치·토론 (NSDA)", emoji: "🎤",
    category: "토론·스피치", grade: "G9–12", difficulty: "고급",
    timing: "시즌 가을~봄 · 전국 토너먼트 6월", team: false,
    majors: ["정치", "법(예비)", "국제관계", "커뮤니케이션"],
    blurb: "미국 최대 토론·스피치 연맹. Public Forum·Lincoln-Douglas·Congress 등 종목별로, 논리·발표력을 강하게 증명.",
  },
  {
    name: "Model United Nations (MUN)", nameKo: "모의 유엔", emoji: "🌐",
    category: "토론·스피치", grade: "G9–12", difficulty: "중급",
    timing: "컨퍼런스 연중 (대학·지역 주최)", team: true,
    majors: ["국제관계", "정치", "법(예비)", "경제"],
    blurb: "각국 대표가 되어 국제 현안을 토론·협상하는 활동. 국제관계·정치 관심을 보여주고 Best Delegate 수상은 강점.",
  },
  {
    name: "National HS Ethics Bowl", nameKo: "전국 고교 윤리 토론", emoji: "⚖️",
    category: "토론·스피치", grade: "G9–12 (팀)", difficulty: "중급",
    timing: "지역 가을~겨울 · 전국 봄", team: true,
    majors: ["철학", "정치", "법(예비)", "의료윤리"],
    blurb: "실제 윤리 딜레마를 협력적으로 토론하는 대회(상대를 이기기보다 깊이를 겨룸). 철학·법·윤리 관심에 적합.",
  },
  {
    name: "We the People", nameKo: "위 더 피플 (헌법)", emoji: "📃",
    category: "토론·스피치", grade: "G9–12 (팀)", difficulty: "중급",
    timing: "주 예선 겨울 · 전국 봄", team: true,
    majors: ["정치", "법(예비)", "역사", "공공정책"],
    blurb: "미국 헌법·권리장전을 주제로 한 모의 청문회 대회. 정치·법·역사를 깊이 다루며 시민 역량을 보여줌.",
  },
  // ── 사회·역사 ────────────────────────────────────────
  {
    name: "National History Day (NHD)", nameKo: "전국 역사의 날", emoji: "🏺",
    category: "사회·역사", grade: "G6–12", difficulty: "중급",
    timing: "지역·주 봄 · 전국 6월", team: false,
    majors: ["역사", "인문", "사회과학", "교육"],
    blurb: "주제를 정해 역사 연구물(논문·전시·다큐·웹사이트)을 만드는 전국 대회. 역사·인문 연구 역량을 구체적으로 증명.",
  },
  {
    name: "US Academic Decathlon", nameKo: "학술 10종 경기", emoji: "🎓",
    category: "사회·역사", grade: "G9–12 (팀)", difficulty: "중급",
    timing: "지역·주 겨울 · 전국 봄", team: true,
    majors: ["다양한 전공 (종합)"],
    blurb: "예술·경제·수학·과학·문학·사회 등 10개 과목을 한 해 주제로 겨루는 종합 학술 대회. 폭넓은 학업 역량을 보여줌.",
  },
  {
    name: "Quiz Bowl (NAQT)", nameKo: "퀴즈 볼", emoji: "🔔",
    category: "사회·역사", grade: "G9–12 (팀)", difficulty: "중급",
    timing: "시즌 연중 · 전국 토너먼트 봄", team: true,
    majors: ["인문·과학 전반"],
    blurb: "역사·문학·과학·예술 전반의 지식을 빠르게 겨루는 팀 퀴즈 대회. 폭넓은 교양과 순발력을 보여줌.",
  },
  // ── 언어 ─────────────────────────────────────────────
  {
    name: "NACLO", nameKo: "북미 컴퓨터 언어학 올림피아드", emoji: "🗣️",
    category: "언어", grade: "G6–12", difficulty: "중급",
    timing: "1–2월 (Open · Invitational)", team: false,
    majors: ["언어학", "컴퓨터과학", "인지과학"],
    blurb: "사전 지식 없이 논리로 푸는 언어학 퍼즐 대회. 수학·CS·인문 융합형 학생에게 독특한 강점이 됨.",
  },
  {
    name: "National Latin/Language Exams", nameKo: "전국 라틴어·외국어 시험", emoji: "🏛",
    category: "언어", grade: "G6–12", difficulty: "입문",
    timing: "보통 2–3월", team: false,
    majors: ["고전학", "언어학", "문학", "법(예비)"],
    blurb: "National Latin Exam 등 외국어 전국 시험. 언어·고전 관심을 일찍 보여주는 출발점으로, 수상은 누적되면 강점.",
  },
  // ── 예술 ─────────────────────────────────────────────
  {
    name: "National YoungArts", nameKo: "영아츠 (예술 전 분야)", emoji: "🎭",
    category: "예술", grade: "G10–12 (15–18세)", difficulty: "고급",
    timing: "가을 마감 · 선정 발표 겨울", team: false,
    majors: ["시각·공연·문예 예술 전반"],
    blurb: "시각·공연·문학·디자인 등 예술 전 분야의 최고 권위 청소년 어워드. 예술 전공 지원자의 대표적 인정.",
  },
];
