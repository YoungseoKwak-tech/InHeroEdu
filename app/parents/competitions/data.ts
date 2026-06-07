/**
 * STEM competition database for the parent hub (/parents/competitions).
 *
 * Curated list of the US STEM competitions that matter most for college
 * admissions, with the fields Korean parents ask about: grade range,
 * difficulty, application/contest timing, and which majors they signal for.
 *
 * Kept factual and conservative. Timing is the typical annual window and can
 * shift year to year — framed as "보통(typically)" in the UI. Expand this list
 * over time; the /parents number band reads its length.
 */

export type CompetitionCategory =
  | "수학"
  | "컴퓨터과학"
  | "생물·의학"
  | "화학"
  | "물리"
  | "연구 프로젝트"
  | "종합 과학"
  | "로봇·공학"
  | "비즈니스·혁신"
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
  // ── 수학 ──
  {
    name: "AMC 10/12 → AIME → USAMO", nameKo: "미국 수학 올림피아드 경로", emoji: "➗",
    category: "수학", grade: "G9–12 (AMC 10은 G10 이하)", difficulty: "최상위",
    timing: "AMC 11월 · AIME 2월 · USAMO 3월", team: false,
    majors: ["수학", "컴퓨터과학", "공학", "경제·금융"],
    blurb: "미국 최대 규모 수학 경시. AMC 고득점 → AIME → USAMO로 이어지는 단계형 경로로, 이공계 지원의 강력한 신호.",
  },
  // ── 컴퓨터과학 ──
  {
    name: "USACO", nameKo: "미국 컴퓨팅 올림피아드", emoji: "💻",
    category: "컴퓨터과학", grade: "G7–12", difficulty: "고급",
    timing: "12·1·2월 월별 온라인 대회", team: false,
    majors: ["컴퓨터과학", "소프트웨어 공학", "데이터 사이언스"],
    blurb: "알고리즘 프로그래밍 대회. Bronze→Silver→Gold→Platinum 승급제라 실력만큼 단계가 올라가 CS 지원에 직접 어필.",
  },
  // ── 생물·의학 ──
  {
    name: "USABO", nameKo: "미국 생물 올림피아드", emoji: "🧬",
    category: "생물·의학", grade: "G9–12", difficulty: "고급",
    timing: "등록 12–1월 · Open Exam 2월 · Semifinal 3월", team: false,
    majors: ["생물학", "생명공학", "의예(Pre-med)", "신경과학"],
    blurb: "전국 생물 경시. 상위 입상은 4명의 국가대표(IBO) 선발로 이어지며, 의·생명 계열 지원의 대표 스펙.",
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
  // ── 화학 ──
  {
    name: "USNCO", nameKo: "미국 화학 올림피아드", emoji: "⚗️",
    category: "화학", grade: "G9–12", difficulty: "고급",
    timing: "지역(Local) 3월 · 전국(National) 4월", team: false,
    majors: ["화학", "화학공학", "의예(Pre-med)", "재료공학"],
    blurb: "전국 화학 경시. 지역 시험 통과 후 전국 시험, 상위권은 국가대표 캠프로. AP Chemistry와 시너지가 큼.",
  },
  // ── 물리 ──
  {
    name: "F=ma → USAPhO", nameKo: "미국 물리 올림피아드 경로", emoji: "🪐",
    category: "물리", grade: "G9–12", difficulty: "최상위",
    timing: "F=ma 1–2월 · USAPhO 3–4월", team: false,
    majors: ["물리학", "전기·기계공학", "항공우주", "수학"],
    blurb: "F=ma 시험 통과자가 USAPhO에 진출하는 단계형 물리 경시. 이공계 최상위 지원에서 강한 변별력.",
  },
  // ── 연구 프로젝트 ──
  {
    name: "Regeneron ISEF", nameKo: "국제 과학·공학 페어", emoji: "🔬",
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
  // ── 종합 과학 ──
  {
    name: "Science Olympiad", nameKo: "사이언스 올림피아드", emoji: "🧪",
    category: "종합 과학", grade: "G9–12 (팀)", difficulty: "중급",
    timing: "지역·주 겨울~봄 · 전국 5월", team: true,
    majors: ["과학·공학 전반"],
    blurb: "23개 종목(생물·화학·물리·공학 등)을 팀으로 나눠 겨루는 종합 대회. 팀워크와 폭넓은 STEM 역량을 보여줌.",
  },
  // ── 로봇·공학 ──
  {
    name: "FIRST Robotics (FRC/FTC)", nameKo: "퍼스트 로보틱스", emoji: "🤖",
    category: "로봇·공학", grade: "G9–12 (팀)", difficulty: "중급",
    timing: "시즌 1–4월 (지역→챔피언십)", team: true,
    majors: ["기계·전기공학", "컴퓨터과학", "로봇공학"],
    blurb: "로봇을 직접 설계·제작·프로그래밍해 겨루는 팀 대회. 리더십·협업·엔지니어링을 동시에 보여줄 수 있음.",
  },
  // ── 비즈니스·혁신 ──
  {
    name: "Conrad Challenge", nameKo: "콘래드 챌린지 (창업·혁신)", emoji: "🚀",
    category: "비즈니스·혁신", grade: "G6–12 (팀)", difficulty: "중급",
    timing: "등록 가을 · 단계별 심사 → 결선 봄", team: true,
    majors: ["창업", "공학", "경영", "디자인"],
    blurb: "실제 사회 문제를 해결하는 창업형 프로젝트 대회. 팀으로 제품·사업계획을 만들어 STEM+기업가정신을 어필.",
  },
  {
    name: "DECA", nameKo: "데카 (비즈니스·마케팅)", emoji: "📈",
    category: "비즈니스·혁신", grade: "G9–12", difficulty: "중급",
    timing: "지역·주 겨울 · 국제(ICDC) 봄", team: false,
    majors: ["경영", "마케팅", "경제·금융", "기업가정신"],
    blurb: "경영·마케팅·금융 역할극 및 사례 발표 대회. 비즈니스 계열 지원자의 대표적 활동.",
  },
  // ── 기타 ──
  {
    name: "NACLO", nameKo: "북미 컴퓨터 언어학 올림피아드", emoji: "🗣️",
    category: "기타", grade: "G6–12", difficulty: "중급",
    timing: "1–2월 (Open · Invitational)", team: false,
    majors: ["언어학", "컴퓨터과학", "인지과학"],
    blurb: "사전 지식 없이 논리로 푸는 언어학 퍼즐 대회. 수학·CS·인문 융합형 학생에게 독특한 강점이 됨.",
  },
];
