/**
 * 우리 아이 학습 진단 — a 12-question Korean self/parent quiz that maps a
 * child's real study behaviors onto one of four learning profiles, each with
 * 학부모 코칭 팁 and recommended InHero resources. Self-contained scoring (no
 * external persona system) so it's simple and parent-readable.
 */

export type TypeKey = "bigpicture" | "builder" | "sprinter" | "explorer";

export interface DiagOption {
  label: string;
  scores: Partial<Record<TypeKey, number>>;
}
export interface DiagQuestion {
  id: string;
  q: string;
  options: DiagOption[];
}

export const QUESTIONS: DiagQuestion[] = [
  {
    id: "start_unit",
    q: "새 단원을 시작할 때 우리 아이는…",
    options: [
      { label: "전체 그림과 '왜 배우는지'부터 알고 싶어 한다", scores: { bigpicture: 2 } },
      { label: "1단원부터 순서대로 차근차근 나간다", scores: { builder: 2 } },
      { label: "일단 문제부터 풀어보며 감을 잡는다", scores: { sprinter: 2 } },
      { label: "흥미로워 보이는 부분부터 파고든다", scores: { explorer: 2 } },
    ],
  },
  {
    id: "understand",
    q: "'이제 이해했다'고 느끼는 순간은?",
    options: [
      { label: "개념들이 하나로 연결되는 패턴이 보일 때", scores: { bigpicture: 2 } },
      { label: "비슷한 문제를 여러 개 정확히 풀어낼 때", scores: { builder: 1, sprinter: 1 } },
      { label: "실전 시험처럼 시간 안에 풀어낼 때", scores: { sprinter: 2 } },
      { label: "스스로 다른 예시·응용을 만들어낼 때", scores: { explorer: 2 } },
    ],
  },
  {
    id: "exam_two_weeks",
    q: "시험 2주 전, 우리 아이의 모습은?",
    options: [
      { label: "이미 큰 틀은 끝내고 정리·복습 중", scores: { bigpicture: 1, builder: 1 } },
      { label: "매일 조금씩 꾸준히, 계획대로", scores: { builder: 2 } },
      { label: "막판에 몰아서 집중력이 폭발한다", scores: { sprinter: 2 } },
      { label: "관심 가는 과목만 깊게, 나머지는 미룬다", scores: { explorer: 2 } },
    ],
  },
  {
    id: "stuck",
    q: "안 풀리는 문제를 만나면 첫 반응은?",
    options: [
      { label: "구조를 분해해서 '왜 막혔는지' 분석한다", scores: { bigpicture: 2 } },
      { label: "예제·풀이를 다시 보고 같은 방식으로 시도", scores: { builder: 2 } },
      { label: "여러 방법을 빠르게 시도해본다", scores: { sprinter: 2 } },
      { label: "검색·영상 등으로 스스로 찾아본다", scores: { explorer: 2 } },
    ],
  },
  {
    id: "motivation",
    q: "공부의 '진짜 연료'는 무엇인가요?",
    options: [
      { label: "이해 자체의 즐거움 / 호기심", scores: { explorer: 1, bigpicture: 1 } },
      { label: "계획을 지켜냈다는 성취감", scores: { builder: 2 } },
      { label: "마감·경쟁의 긴장감", scores: { sprinter: 2 } },
      { label: "미래의 목표(대학·꿈)가 또렷할 때", scores: { bigpicture: 1, explorer: 1 } },
    ],
  },
  {
    id: "notes",
    q: "노트·정리 스타일에 가까운 것은?",
    options: [
      { label: "마인드맵·도식으로 큰 구조를 그린다", scores: { bigpicture: 2 } },
      { label: "깔끔하게 순서대로, 빠짐없이 정리", scores: { builder: 2 } },
      { label: "노트보다 문제 풀이 양으로 승부", scores: { sprinter: 2 } },
      { label: "자기만의 방식으로 자유롭게 메모", scores: { explorer: 2 } },
    ],
  },
  {
    id: "environment",
    q: "가장 집중이 잘 되는 환경은?",
    options: [
      { label: "조용히 깊게 사고할 수 있는 공간", scores: { bigpicture: 1, explorer: 1 } },
      { label: "정해진 시간·장소의 규칙적인 루틴", scores: { builder: 2 } },
      { label: "마감이 코앞일 때의 긴장된 몰입", scores: { sprinter: 2 } },
      { label: "주제를 자유롭게 넘나들 수 있을 때", scores: { explorer: 2 } },
    ],
  },
  {
    id: "feedback",
    q: "피드백을 받을 때 우리 아이는…",
    options: [
      { label: "'왜 그런지' 원리까지 듣고 싶어 한다", scores: { bigpicture: 2 } },
      { label: "구체적인 단계별 개선법을 원한다", scores: { builder: 2 } },
      { label: "점수·등수 등 결과 위주로 본다", scores: { sprinter: 2 } },
      { label: "스스로 고칠 수 있게 힌트만 원한다", scores: { explorer: 2 } },
    ],
  },
  {
    id: "subject_pref",
    q: "어떤 과제를 더 좋아하나요?",
    options: [
      { label: "개념·원리를 설명하는 서술형", scores: { bigpicture: 2 } },
      { label: "반복 연습이 명확한 문제집형", scores: { builder: 2 } },
      { label: "제한 시간 실전 모의고사형", scores: { sprinter: 2 } },
      { label: "자유 주제 리서치·프로젝트형", scores: { explorer: 2 } },
    ],
  },
  {
    id: "distraction",
    q: "딴짓·집중 흐트러짐의 주된 이유는?",
    options: [
      { label: "지엽적 암기·반복이 지루할 때", scores: { bigpicture: 2 } },
      { label: "거의 흐트러지지 않는다 (성실형)", scores: { builder: 2 } },
      { label: "마감이 멀면 동기가 안 생긴다", scores: { sprinter: 2 } },
      { label: "더 흥미로운 다른 주제로 새버린다", scores: { explorer: 2 } },
    ],
  },
  {
    id: "goal_style",
    q: "목표를 세우는 방식은?",
    options: [
      { label: "큰 비전을 먼저, 세부는 나중에", scores: { bigpicture: 2 } },
      { label: "주/일 단위로 잘게 쪼개 계획", scores: { builder: 2 } },
      { label: "마감 직전 단기 목표에 집중", scores: { sprinter: 2 } },
      { label: "그때그때 관심사 따라 유연하게", scores: { explorer: 2 } },
    ],
  },
  {
    id: "ideal_help",
    q: "지금 우리 아이에게 가장 필요한 도움은?",
    options: [
      { label: "개념을 한눈에 풀어주는 설명", scores: { bigpicture: 2 } },
      { label: "체계적인 학년별 로드맵·반복 문제", scores: { builder: 2 } },
      { label: "실전 감각을 키우는 모의고사", scores: { sprinter: 2 } },
      { label: "관심을 활동·리서치로 잇는 방향", scores: { explorer: 2 } },
    ],
  },
];

export interface Profile {
  key: TypeKey;
  emoji: string;
  title: string;
  oneLiner: string;
  strengths: string[];
  watchouts: string[];
  parentTips: string[];
  recos: { label: string; route: string }[];
}

export const PROFILES: Record<TypeKey, Profile> = {
  bigpicture: {
    key: "bigpicture",
    emoji: "🧭",
    title: "큰 그림 이해형",
    oneLiner: "개념과 '왜'를 먼저 잡아야 안심하는, 연결·응용에 강한 아이예요.",
    strengths: ["추상적 개념을 빠르게 이해", "서로 다른 단원을 연결하는 통찰", "서술형·응용 문제에 강함"],
    watchouts: ["단순 반복·암기를 지루해함", "디테일·계산 실수 관리 필요"],
    parentTips: [
      "세부 암기를 시키기 전에 '전체 구조와 왜 배우는지'를 먼저 보여주세요.",
      "‘이게 어디에 쓰이는지’ 실제 예시로 연결하면 몰입이 확 올라갑니다.",
      "지루해 보일 땐 더 어려운 개념적 도전을 주는 게 오히려 약입니다.",
    ],
    recos: [
      { label: "AP 개념정리 (일타강사식 풀이)", route: "/parents/core-notes" },
      { label: "수학 교육 — 핵심 개념 글", route: "/parents/math" },
      { label: "미국 대학 분석", route: "/parents/colleges" },
    ],
  },
  builder: {
    key: "builder",
    emoji: "🏗",
    title: "차곡차곡 빌더형",
    oneLiner: "체계적이고 꾸준하게 쌓아 올리는, 성실함이 가장 큰 무기인 아이예요.",
    strengths: ["계획을 세우고 지키는 성실함", "내신·꾸준함에서 안정적", "단계별 반복으로 확실하게 정착"],
    watchouts: ["큰 그림·창의적 도약은 약할 수 있음", "계획이 흐트러지면 불안해함"],
    parentTips: [
      "작은 목표 체크리스트로 '오늘 한 것'을 눈에 보이게 해주세요 — 성취감이 연료입니다.",
      "가끔은 '왜 이걸 배우나'를 함께 이야기해 큰 그림도 채워주세요.",
      "갑작스러운 변화보다 예측 가능한 루틴을 지켜주는 게 좋습니다.",
    ],
    recos: [
      { label: "학년별 로드맵 (G6–G12)", route: "/parents/roadmap" },
      { label: "AP 문제은행 (반복 연습)", route: "/parents/question-bank" },
      { label: "단어장 (체크·진도 관리)", route: "/parents/vocab" },
    ],
  },
  sprinter: {
    key: "sprinter",
    emoji: "🚀",
    title: "실전 몰입형",
    oneLiner: "마감과 긴장 속에서 폭발하는, 실전·순발력에 강한 아이예요.",
    strengths: ["압박 상황에서의 집중력", "실전 시험·순발력에 강함", "짧은 시간 고효율 학습"],
    watchouts: ["평소의 꾸준함·장기 계획이 약함", "벼락치기 의존 위험"],
    parentTips: [
      "긴 마감을 '미니 마감' 여러 개로 잘게 쪼개주면 동기가 계속 유지됩니다.",
      "실전 모의고사·타이머 학습으로 강점을 무기로 키워주세요.",
      "결과(점수)만이 아니라 과정의 꾸준함도 작게 칭찬해 균형을 잡아주세요.",
    ],
    recos: [
      { label: "SAT 모의고사", route: "/parents/sat" },
      { label: "AP 문제은행 (실전 모드)", route: "/parents/question-bank" },
      { label: "미국 입시 대회 (목표·마감 설정)", route: "/parents/competitions" },
    ],
  },
  explorer: {
    key: "explorer",
    emoji: "🔍",
    title: "자기주도 탐험형",
    oneLiner: "호기심으로 스스로 파고드는, 스파이크(특화) 잠재력이 큰 아이예요.",
    strengths: ["자기주도 학습·리서치 기질", "관심 분야를 깊게 파는 몰입", "창의적 연결·프로젝트 강점"],
    watchouts: ["우선순위·마감 관리가 약함", "관심 밖 과목은 미루기 쉬움"],
    parentTips: [
      "관심사를 활동·리서치·대회로 연결해주면 그게 곧 입시 '스파이크'가 됩니다.",
      "통제보다 자율을 존중하되, 마감·우선순위만 함께 잡아주세요.",
      "‘왜 이걸 해야 하나’가 납득되면 누구보다 강하게 달립니다.",
    ],
    recos: [
      { label: "합격 활동 분석 (직접 만드는 법)", route: "/parents/activities" },
      { label: "합격 수기 — 자기주도 스토리", route: "/parents/story" },
      { label: "미국 입시 대회 데이터베이스", route: "/parents/competitions" },
    ],
  },
};

export const TYPE_ORDER: TypeKey[] = ["bigpicture", "builder", "sprinter", "explorer"];
