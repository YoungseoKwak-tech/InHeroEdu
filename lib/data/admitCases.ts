/**
 * 합격 사례 — REAL, PUBLICLY-REPORTED admit stories.
 *
 * ⚖️ LEGAL/ETHICAL: Every entry is a REAL student who voluntarily went public
 * in major news media. We summarize the publicly reported FACTS (school, major,
 * activities, outcome) in our own words and CITE the source. We do NOT reproduce
 * any essay text verbatim (facts aren't copyrightable; essay prose is). Always
 * render with the source link. Add cases only from a citable public source.
 */
export type CaseField =
  | "STEM·연구" | "의예·생명" | "정책·사회" | "법·정치"
  | "인문·글쓰기" | "사회임팩트·창업" | "예술·음악" | "교육·국제";

export interface AdmitCase {
  id: number;
  name: string;        // real name as publicly reported
  year: number;        // admissions cycle year reported
  location: string;    // high school / city / state as reported
  field: CaseField;
  majorKo: string;     // intended major/field (as reported)
  admitted: string;    // where admitted (as reported)
  chose: string;       // where they enrolled (as reported), or "" if unknown
  activities: string[];// reported activities, in our words
  spike: string;       // the through-line of the profile
  analysis: string[];  // our commentary on why the profile stood out
  source: { title: string; url: string };
}

export const ADMIT_CASES: AdmitCase[] = [
  {
    id: 1, name: "Thinh Pham", year: 2025, location: "George Bush High School · Fort Bend, TX", field: "STEM·연구",
    majorKo: "컴퓨터과학 (헬스케어 AI)",
    admitted: "아이비리그 8개 전원 + Stanford·Rice 등 (장학금 총 $2.8M)", chose: "MIT",
    activities: ["로보틱스 팀 주장", "Summer Science Program(SSP) 천체물리 연구 참여", "또래 코딩 멘토링", "스타트업/웹 개발(웹마스터) 경험"],
    spike: "헬스케어를 위한 AI — 연구·개발과 리더십이 한 줄기로 수렴",
    analysis: ["수상 나열이 아니라 '무엇을 만들고 싶은가(의료 AI)'라는 방향성이 선명", "로보틱스 리더십 + 실제 연구 경험이 전공 적합성을 동시에 증명", "최상위 합격을 모두 받고도 본인 목표(MIT)를 택한 주체성"],
    source: { title: "ABC13 Houston", url: "https://abc13.com/post/george-bush-high-school-student-thinh-pham-accepted-nations-ivy-league-schools-chooses-mit/16154882/" },
  },
  {
    id: 2, name: "Ashley Adirika", year: 2022, location: "Miami Beach Senior High School · FL", field: "정책·사회",
    majorKo: "사회정책 (경제 불평등)",
    admitted: "아이비리그 8개 전원", chose: "Harvard",
    activities: ["유색인종 소녀 멘토링 단체 'Our Story Our Worth' 창립", "토론팀", "학생회 활동"],
    spike: "경제적 불평등 해소 — 정책 관심을 직접 만든 조직으로 실천",
    analysis: ["관심사(불평등)를 글이 아니라 '내가 만든 단체'로 증명한 주도성", "리더십과 사회적 가치가 일관되게 정렬", "거대 담론을 자신의 공동체 단위로 환원해 진정성 확보"],
    source: { title: "CNN", url: "https://www.cnn.com/2022/06/12/us/ashley-adirika-ivy-league-colleges-cec" },
  },
  {
    id: 3, name: "Ahmed Muhammad", year: 2021, location: "Oakland Technical High School · CA", field: "사회임팩트·창업",
    majorKo: "공학·과학교육",
    admitted: "Stanford (1세대 대학생)", chose: "Stanford",
    activities: ["저가 과학 실험 키트 비영리 'Kits Cubed' 창립 — 오클랜드에서만 2,000명 이상 아동에 보급", "고교 중 대학 수업 9과목 수강", "농구 바시티 포인트가드", "또래 튜터링"],
    spike: "동네 아이들의 과학 접근성 — 조카와의 실험에서 출발해 비영리로 확장",
    analysis: ["개인 경험(조카 돌봄)에서 출발한 동기라 진정성이 높음", "impact를 구체적 숫자(2,000+)로 보여줌", "1세대·지역사회 맥락에서의 성취가 더 큰 무게를 가짐"],
    source: { title: "CNN", url: "https://www.cnn.com/2020/12/25/us/cali-teen-science-stanford-trnd/index.html" },
  },
  {
    id: 4, name: "Craig McFarland", year: 2020, location: "Stanton College Prep · Jacksonville, FL", field: "의예·생명",
    majorKo: "생화학 + 언어학",
    admitted: "아이비리그 8개 전원", chose: "Yale",
    activities: ["발레딕토리언 (가중 GPA 4.98)", "프랑스어·스페인어·아랍어 등 다개국어 구사", "토론·육상", "지역 Ethics Bowl 최우수상"],
    spike: "언어와 생명과학의 교차 — 의료를 국경 너머로 (Doctors Without Borders 지향)",
    analysis: ["압도적 학업 + 다개국어라는 독특한 융합 포지셔닝", "생화학+언어학을 잇는 '왜'가 분명(국경없는의사회)", "깊이(학업)와 폭(언어·활동)을 동시에 증명"],
    source: { title: "Asian Journal", url: "https://asianjournal.com/usa/dateline-usa/fil-am-student-accepted-to-all-8-ivy-league-schools-commits-to-yale-university/" },
  },
  {
    id: 5, name: "Jeramy Botwe", year: 2019, location: "Tomball · Houston, TX", field: "의예·생명",
    majorKo: "의예 (신경계 질환 연구)",
    admitted: "아이비리그 8개 전원 + Stanford·UChicago 등", chose: "",
    activities: ["발레딕토리언 (GPA 4.51)", "다발성경화증(MS)·ALS 치료 연구 지향", "가나 출신 한부모 가정에서 성장"],
    spike: "신경계 난치병 연구 — 의학 연구라는 분명한 목표",
    analysis: ["'의사'가 아니라 '특정 질환 연구'까지 구체화된 목표가 인상적", "최상위 학업이 맥락(한부모 가정)과 함께 더 빛남", "방향이 명확해 지원서 전체가 일관됨"],
    source: { title: "The Ivy Institute (집계 페이지)", url: "https://theivyinst.org/students-accepted-to-all-eight-ivy-league-schools" },
  },
  {
    id: 6, name: "Mekhi Johnson", year: 2018, location: "Gilman School · Baltimore, MD", field: "법·정치",
    majorKo: "정치학 (법학 지향)",
    admitted: "아이비리그 8개 전원", chose: "Penn",
    activities: ["교지·문예지 편집", "재즈밴드·드럼라인·뮤지컬·아카펠라 합창", "Diversity Council 회장", "저소득 지역 초등생 멘토링"],
    spike: "예술적 다재다능 + 다양성 리더십이 결합된 인문형 프로필",
    analysis: ["학업 외 예술 활동의 폭이 넓어 입체적 인물상", "Diversity Council 리더십이 가치관을 드러냄", "활동들이 '표현'과 '공동체'라는 테마로 묶임"],
    source: { title: "The Daily Pennsylvanian", url: "https://www.thedp.com/article/2018/04/upenn-penn-philadelphia-ivy-league-admission-acceptance-mekhi-johnson-university-decision-college" },
  },
  {
    id: 7, name: "Samantha O'Sullivan", year: 2018, location: "Washington, D.C.", field: "STEM·연구",
    majorKo: "STEM (우주·과학)",
    admitted: "아이비리그 8개 전원", chose: "Harvard",
    activities: ["AP 10과목 이수, 10학년에 AP 수학 수강", "대학(GWU) 수학 5과목 수강", "3년 연속 학급 회장", "흑인 소녀 STEM 멘토링 지향"],
    spike: "수학·과학 심화 + STEM 다양성 멘토링",
    analysis: ["교과를 한참 앞선 수학 깊이가 학문적 열정을 증명", "리더십(학급 회장)과 사회적 사명(STEM 멘토링)의 결합", "성취를 다음 세대로 환원하려는 태도"],
    source: { title: "The Ivy Institute (집계 페이지)", url: "https://theivyinst.org/students-accepted-to-all-eight-ivy-league-schools" },
  },
  {
    id: 8, name: "Venus Nnadi", year: 2018, location: "Stuyvesant High School · NY", field: "법·정치",
    majorKo: "법 (민권 변호사 지향)",
    admitted: "아이비리그 8개 전원", chose: "",
    activities: ["Black Students League 공동 회장", "육상팀 주장", "AP 9과목", "노숙·소외 학생 지원 봉사"],
    spike: "민권 — 리더십·봉사·학업이 하나의 가치로 정렬",
    analysis: ["진로(민권 변호사)와 활동(흑인 학생회·봉사)이 완벽히 일치", "리더십과 운동(주장)으로 균형 잡힌 인물상", "명문고에서의 최상위 학업"],
    source: { title: "The Ivy Institute (집계 페이지)", url: "https://theivyinst.org/students-accepted-to-all-eight-ivy-league-schools" },
  },
  {
    id: 9, name: "Anna Rezk", year: 2018, location: "High Tech High School · Bayonne, NJ", field: "사회임팩트·창업",
    majorKo: "이공·우등 트랙",
    admitted: "아이비리그 8개 전원 (전액 장학)", chose: "",
    activities: ["AP·우등 중심 학업", "아버지 별세 후 동생들 양육을 도움", "이집트 이민 가정 배경"],
    spike: "역경을 책임감으로 — 가정을 지키며 학업을 놓지 않은 회복탄력성",
    analysis: ["성취를 '환경'과 함께 읽으면 무게가 크게 달라짐", "8개교 전액 장학은 학업+인성+맥락의 종합 평가 결과", "가족 돌봄 경험이 성숙함의 증거"],
    source: { title: "The Ivy Institute (집계 페이지)", url: "https://theivyinst.org/students-accepted-to-all-eight-ivy-league-schools" },
  },
  {
    id: 10, name: "Harold Ekeh", year: 2015, location: "Elmont · Long Island, NY", field: "의예·생명",
    majorKo: "생화학 (신경외과 지향)",
    admitted: "아이비리그 8개 전원", chose: "Yale",
    activities: ["8세에 나이지리아에서 이민", "최상위 학업", "의학 연구·신경외과의 목표"],
    spike: "이민 서사 + 의학 — 정체성을 진로로 연결",
    analysis: ["이민 경험을 동력으로 전환한 서사가 강력", "구체적 진로(신경외과) 목표가 지원서를 응집", "역경 맥락에서의 학업 성취"],
    source: { title: "FOX News", url: "https://www.foxnews.com/us/ny-student-accepted-at-all-8-ivy-universities-picks-harvard" },
  },
  {
    id: 11, name: "Munira Khalif", year: 2015, location: "Mounds Park Academy · MN", field: "교육·국제",
    majorKo: "교육·국제개발",
    admitted: "아이비리그 8개 전원", chose: "Harvard",
    activities: ["전 세계 교육 접근성 향상을 위한 활동", "교육 비영리 공동 설립", "UN 등 국제 무대에서 청소년 대표로 활동", "소말리아계 미국인"],
    spike: "교육 평등 — 글로벌 활동가로서의 일관된 헌신",
    analysis: ["글로벌 이슈를 다년간 실제 활동으로 끌고 간 지속성", "국제 무대 경험이 영향력의 규모를 증명", "정체성·가치·활동이 하나로 묶임"],
    source: { title: "The Ivy Institute (집계 페이지)", url: "https://theivyinst.org/students-accepted-to-all-eight-ivy-league-schools" },
  },
  {
    id: 12, name: "Kwasi Enin", year: 2014, location: "William Floyd High School · Shirley, NY", field: "의예·생명",
    majorKo: "의예",
    admitted: "아이비리그 8개 전원", chose: "Yale",
    activities: ["비올라 연주(음악)", "다양한 교내 활동과 최상위 학업", "가나 이민 가정"],
    spike: "의학을 향하면서도 음악으로 폭을 보여준 균형형",
    analysis: ["전형적 의예 트랙에 음악이라는 인간적 깊이를 더함", "이민 가정 맥락의 성취", "초기 '올 아이비' 화제의 대표 사례"],
    source: { title: "The Daily Pennsylvanian", url: "https://www.thedp.com/article/2015/05/students-accepted-all-eight-ivy-league-schools-make-choices" },
  },
  {
    id: 13, name: "Ifeoma White-Thorpe", year: 2017, location: "Morris Hills High School · NJ", field: "인문·글쓰기",
    majorKo: "글로벌 보건",
    admitted: "아이비리그 8개 전원 + Stanford", chose: "Harvard",
    activities: ["시·글쓰기에 대한 깊은 애정", "수상 경력의 에세이/문예", "글로벌 보건 진로 지향"],
    spike: "글쓰기 — 본인이 직접 '시와 글이 나를 돋보이게 했다'고 밝힌 강점",
    analysis: ["정량 스펙이 아니라 '목소리(글)'로 차별화한 사례", "인문적 강점과 진로(보건)의 결합", "본인이 강점을 명확히 인식하고 활용"],
    source: { title: "FOX News", url: "https://www.foxnews.com/us/new-york-high-school-senior-accepted-at-8-ivy-league-schools" },
  },
  {
    id: 14, name: "Augusta Uwamanzu-Nna", year: 2016, location: "Elmont Memorial High School · NY", field: "STEM·연구",
    majorKo: "과학·공학",
    admitted: "아이비리그 8개 전원", chose: "Harvard",
    activities: ["발레딕토리언", "과학 연구 지향", "나이지리아 이민 가정"],
    spike: "과학 연구 + 이민 서사",
    analysis: ["학업 최상위 + 연구 지향의 정석적 STEM 프로필", "이민 가정 맥락에서의 성취", "Elmont에서 화제가 된 '올 아이비' 주인공"],
    source: { title: "FOX News", url: "https://www.foxnews.com/us/ny-student-accepted-at-all-8-ivy-universities-picks-harvard" },
  },
  {
    id: 15, name: "Victor Agbafe", year: 2015, location: "Cape Fear Academy · Wilmington, NC", field: "의예·생명",
    majorKo: "의예·과학",
    admitted: "아이비리그 8개 전원 + Stanford 등 (총 14개교)", chose: "Harvard",
    activities: ["최상위 학업", "글쓰기·토론 활동", "의학 진로 지향"],
    spike: "의학을 향한 학업+글쓰기 균형형",
    analysis: ["14개 최상위교 합격으로 종합 경쟁력을 입증", "학업과 인문 활동의 균형", "분명한 진로 방향"],
    source: { title: "The Ivy Institute (집계 페이지)", url: "https://theivyinst.org/students-accepted-to-all-eight-ivy-league-schools" },
  },
  {
    id: 16, name: "Ivan Vazquez", year: 2020, location: "Capital High School · Boise, ID", field: "법·정치",
    majorKo: "사회과학",
    admitted: "아이비리그 8개 전원", chose: "",
    activities: ["바시티 스포츠", "모의재판(Mock Trial)", "형의 Brown 합격에서 받은 자극"],
    spike: "운동과 모의재판 — 작은 도시 출신의 자기확신",
    analysis: ["대도시 명문고가 아닌 환경에서의 성취(맥락 가산)", "운동+법(모의재판)의 균형형", "'할 수 있다'는 자기확신과 적극적 참여"],
    source: { title: "The Ivy Institute (집계 페이지)", url: "https://theivyinst.org/students-accepted-to-all-eight-ivy-league-schools" },
  },
  {
    id: 17, name: "Stefan Stoykov", year: 2015, location: "North Central High School · Indianapolis, IN", field: "STEM·연구",
    majorKo: "과학·공학",
    admitted: "아이비리그 8개 전원", chose: "Harvard",
    activities: ["최상위 학업", "과학·연구 지향"],
    spike: "중서부 출신의 학업·연구형 STEM 프로필",
    analysis: ["동부 명문고 밀집 지역 밖에서의 성취", "정석적 학업·연구 강점", "초기 '올 아이비' 사례 중 하나"],
    source: { title: "The Daily Pennsylvanian", url: "https://www.thedp.com/article/2015/05/students-accepted-all-eight-ivy-league-schools-make-choices" },
  },
  {
    id: 18, name: "Alexander Roman", year: 2015, location: "St. Paul, MN", field: "STEM·연구",
    majorKo: "공학",
    admitted: "아이비리그 8개 전원", chose: "MIT",
    activities: ["최상위 학업", "공학·기술 지향"],
    spike: "공학 지향 — 아이비를 모두 받고 MIT 선택",
    analysis: ["분명한 공학 방향성", "최상위 합격 후 적합한 학교(MIT) 선택", "학업·기술 중심 프로필"],
    source: { title: "The Daily Pennsylvanian", url: "https://www.thedp.com/article/2015/05/students-accepted-all-eight-ivy-league-schools-make-choices" },
  },
];
