/**
 * Ivy-admit Common App activity list for the parent hub (/parents/activities).
 *
 * A real admitted student's 10-slot Common App activity list, anonymized
 * (school / town / org names that identify the student are generalized).
 * The point of the page is NOT the list itself but the how-to: each activity
 * ships with a 실행 가이드 — concrete platforms, steps, and how to weave the
 * student's own story — so parents see a reproducible path, not a trophy.
 *
 * Char counts in the position/org/bullet fields mirror the actual Common App
 * limits (50/100/150) the original entries were written against.
 */

export interface ActivityResource {
  label: string;
  url: string;
}

export interface ActivityEntry {
  num: number;
  emoji: string;
  typeKo: string;        // Common App activity type, Korean gloss
  typeEn: string;        // as it appears on the Common App
  position: string;      // Position/Leadership description (max 50 chars)
  organization: string;  // Organization name (max 100 chars)
  bullets: string[];     // the 150-char description, bullet by bullet
  grades: string;
  timing: string;
  hoursPerWeek: string;
  weeksPerYear: string;
  analysis: string;      // why this entry works on an AO's desk
  guideTitle: string;    // 실행 가이드 headline
  guideIntro: string;    // what this activity actually is, demystified
  steps: string[];       // concrete replication steps
  resources: ActivityResource[];
  storyTip: string;      // how to weave the student's own story
}

export const ACTIVITIES: ActivityEntry[] = [
  {
    num: 1, emoji: "🎤",
    typeKo: "기타 클럽 활동", typeEn: "Other Club/Activity",
    position: "TEDx: ‘23 President, ‘22 Speaker Lead, ‘21 member",
    organization: "교내 TEDx 클럽",
    bullets: [
      "Lead organizer on TEDx official license application process",
      "MC & project lead for ‘22–23 conferences",
      "Recruited 40 new members with a social media campaign",
    ],
    grades: "10, 11, 12", timing: "연중", hoursPerWeek: "4시간", weeksPerYear: "40주",
    analysis: "3년 연속 참여 + 멤버→스피커 리드→회장으로 올라간 '승진 서사'가 한 줄에 담겨 있습니다. 특히 'TEDx 공식 라이선스 신청을 직접 주도했다'는 불릿이 핵심 — 클럽에 가입한 게 아니라 공식 인증 절차라는 어른의 일을 해냈다는 증거입니다. 모든 불릿이 동사로 시작하고 '40명'이라는 숫자로 끝납니다.",
    guideTitle: "우리 학교에 TEDx를 만드는 법",
    guideIntro: "TEDx는 TED 본사가 학교·지역 단위 행사에 내주는 공식 라이선스 프로그램입니다. 라이선스 신청은 무료이고, 고등학생도 교사 한 명의 지원만 있으면 'TEDxYouth@학교명' 형태로 신청할 수 있습니다. 합격생들이 TEDx를 좋아하는 이유는 '외부 기관의 공식 절차를 통과해 무언가를 학교에 가져온' 스토리가 되기 때문입니다.",
    steps: [
      "TED 공식 사이트에서 TEDx Youth 이벤트 규정을 정독 — 100명 이하 행사는 첫 라이선스로 가능",
      "지도교사(adviser) 한 명 섭외 후 라이선스 신청서 제출 (승인까지 보통 8~12주 — 11학년이라면 늦어도 가을에 시작)",
      "운영팀 구성: 큐레이션(연사 섭외) · 무대 · 마케팅 · 영상 4개 역할로 나눠 모집",
      "연사 라인업: 교내 학생 + 지역 교수·창업자에게 콜드 이메일 — '학생이 만든 공식 TEDx'라는 명분이 성공률을 높임",
      "행사 후 영상을 TEDx 유튜브 채널에 업로드 — 이것까지가 라이선스 의무이자 포트폴리오",
    ],
    resources: [
      { label: "TEDx 라이선스 신청 (공식)", url: "https://www.ted.com/participate/organize-a-local-tedx-event" },
      { label: "TEDxYouth 가이드", url: "https://www.ted.com/participate/organize-a-local-tedx-event/before-you-start/event-types" },
    ],
    storyTip: "라이선스 승인 과정에서 막힌 것(서류 반려, 연사 펑크)을 에세이 소재로 남겨두세요. '행사를 열었다'보다 '공식 절차와 씨름하며 어른들의 세계에서 협상했다'가 훨씬 강한 이야기입니다.",
  },
  {
    num: 2, emoji: "🔬",
    typeKo: "연구", typeEn: "Research",
    position: "Independent Research Analyst",
    organization: "Paper forthcoming: Jellyfish Semipermeable Membrane Skin Patch as a Wearable Sweat Biosensor",
    bullets: [
      "Designed & conducted self-initiated experiment under supervision of Honors Biology teacher",
      "Presented to biotech companies at 2023 NANO Korea Symposium",
    ],
    grades: "9, 10, 11, 12", timing: "연중", hoursPerWeek: "5시간", weeksPerYear: "35주",
    analysis: "리스트 전체의 '스파이크(전공 축)'를 만드는 엔트리입니다. 조직명 칸(100자)에 기관명 대신 논문 제목을 넣은 게 영리한 선택 — 읽는 순간 연구의 수준이 전달됩니다. 대학 랩이 아니라 '교내 생물 교사의 지도'라는 점이 오히려 진정성을 줍니다. 9학년부터 4년간 끌고 온 지속성이 바이오 전공 지원 서사의 척추가 됩니다.",
    guideTitle: "고등학생이 연구를 시작하고 논문까지 내는 법",
    guideIntro: "비싼 외부 연구 프로그램 없이도 가능합니다. 이 학생의 경로는 ① 일상 관찰에서 질문 찾기 → ② 교내 과학 교사를 멘토로 → ③ 자가 설계 실험 → ④ 고교생 대상 저널 투고 + 학회 발표였습니다. 핵심은 '고등학생이 심사받고 출판할 수 있는 저널'이 실제로 존재한다는 것입니다.",
    steps: [
      "주제 찾기: 수업 내용 × 일상 관찰의 교차점에서 질문을 만들기 (이 사례: 생물 수업의 반투막 + 웨어러블 기기 관심 → 해파리 막 바이오센서)",
      "Google Scholar로 선행 연구 10편 읽고 한 장짜리 연구 제안서 작성",
      "교내 과학 교사에게 제안서를 들고 가서 지도(supervision) 요청 — 장비는 학교 실험실 수준으로 설계",
      "한 학기~1년 실험 + 기록 (실패 데이터도 전부 보관 — 논문과 에세이의 재료)",
      "고교생 피어리뷰 저널에 투고: JEI·JSR 등 (심사 3~6개월, 게재료 무료~소액)",
      "투고와 별개로 과학전람회·산업 심포지엄 포스터 발표 신청 — '발표 실적'은 게재 전에도 만들 수 있음",
    ],
    resources: [
      { label: "JEI — Journal of Emerging Investigators (무료, 피어리뷰)", url: "https://emerginginvestigators.org" },
      { label: "JSR — Journal of Student Research", url: "https://www.jsr.org" },
      { label: "Google Scholar (선행 연구 검색)", url: "https://scholar.google.com" },
    ],
    storyTip: "'대학 교수 랩에 못 들어가서' 교내 교사와 시작한 것이 약점이 아니라 강점입니다 — 자원이 없는 환경에서 스스로 설계했다는 서사로 엮으세요. 연구 주제가 학생의 다른 활동(이 사례: 보건 봉사, 여성 엔지니어 플랫폼)과 한 줄로 이어지면 스파이크가 완성됩니다.",
  },
  {
    num: 3, emoji: "🧪",
    typeKo: "기타 클럽 활동", typeEn: "Other Club/Activity",
    position: "STEM Club President, Founder; 주 과학페어 Head Organizer",
    organization: "교내 STEM 클럽",
    bullets: [
      "Initiated club involvement in State Science Fair, secured $500 school grant",
      "Recruited 30 new members",
      "Designed American Cancer Society fundraiser",
    ],
    grades: "11, 12", timing: "학기 중", hoursPerWeek: "3시간", weeksPerYear: "24주",
    analysis: "'Founder(창립자)'라는 단어 하나가 이 엔트리의 무게를 만듭니다. 그리고 창립으로 끝나지 않고 ① 학교 예산 $500 확보 ② 멤버 30명 ③ 외부 기관(암협회) 모금까지 — 만들고, 돈을 끌어오고, 키웠다는 3단 증거가 150자 안에 들어 있습니다. 연구(활동 2)와 연결되는 '주 과학 페어' 조직 경험이 스파이크를 보강합니다.",
    guideTitle: "클럽을 '창립'하고 학교 예산까지 받는 법",
    guideIntro: "기존 클럽 임원보다 신생 클럽 창립자가 훨씬 강한 이유는 0→1을 증명하기 때문입니다. 미국 고등학교는 대부분 학생 클럽 신설 절차(지도교사 + 정관 + 활동계획서)가 공식화되어 있고, 학생회나 학교 활동처(Student Activities Office)에 예산 신청 제도가 있습니다.",
    steps: [
      "학교 활동처에서 클럽 신설 요건 확인 (보통: 지도교사 1명 + 창립 멤버 5~10명 + 한 장짜리 정관)",
      "기존 클럽과 겹치지 않는 정체성 설정 — '과학 클럽'이 아니라 '과학 페어 출전을 조직하는 클럽'처럼 동사형으로",
      "첫 학기에 가시적 목표 하나: 주(州) 과학 페어 단체 출전 등록 같은 외부 행사 참가",
      "예산 신청서 작성: 항목별 비용 + 기대 효과 한 장 — '$500 grant'는 이렇게 만들어진 숫자",
      "외부 비영리(암협회·적십자 등)와 연계한 모금 행사로 클럽의 사회적 임팩트 추가",
    ],
    resources: [
      { label: "ISEF 산하 지역·주 과학 페어 찾기", url: "https://www.societyforscience.org/isef/find-a-fair/" },
      { label: "American Cancer Society 고교 모금 프로그램", url: "https://www.cancer.org" },
    ],
    storyTip: "창립 동기를 '스펙'이 아니라 결핍에서 시작하세요 — '우리 학교엔 과학 페어에 나가는 통로가 없었다'는 문제 인식이 곧 에세이 첫 문단이 됩니다.",
  },
  {
    num: 4, emoji: "📕",
    typeKo: "저널리즘·출판", typeEn: "Journalism/Publication",
    position: "Author of self-published non-fiction book",
    organization: "“Mathematical Answers to Human Existence: Application of Calc III to Philosophy”",
    bullets: [
      "Relating self-love to orthogonal linearity and quantum relativity",
      "Self-published, 80 distributed copies",
      "Presented summary “book talk” at school meeting",
    ],
    grades: "11, 12", timing: "연중", hoursPerWeek: "6시간", weeksPerYear: "12주",
    analysis: "리스트에서 가장 '사람이 보이는' 엔트리. 미적분 III × 철학이라는 조합은 성적표로는 절대 전달되지 않는 지적 정체성을 보여줍니다. 80부라는 작은 숫자를 굳이 적은 것도 좋은 판단 — 부풀리지 않은 정직한 숫자가 신뢰를 만들고, 북토크로 '혼자 쓴 글'을 '공동체와 나눈 행위'로 확장했습니다.",
    guideTitle: "고등학생이 Amazon KDP로 책을 출간하는 법",
    guideIntro: "Amazon KDP(Kindle Direct Publishing)는 비용 0원으로 전자책과 종이책(주문형 인쇄)을 전 세계에 출판하는 플랫폼입니다. ISBN도 무료로 발급되고, 원고만 있으면 승인까지 72시간 안에 끝납니다. 입시에서 책 출간의 가치는 '작가'라는 타이틀이 아니라, 한 주제를 5~6만 단어 분량으로 끝까지 사유했다는 증거에 있습니다.",
    steps: [
      "주제 = 자기 전공 축 × 의외의 분야 교차점 (이 사례: 수학 × 철학. '전공 그 자체'보다 교차점이 기억에 남음)",
      "분량 부담 줄이기: 50~100쪽이면 충분 — 챕터 8~10개 아웃라인부터 잡고 주말마다 한 챕터",
      "Amazon KDP 계정 생성 → 원고(Word/PDF) 업로드 → 무료 Cover Creator로 표지 → 무료 ISBN 자동 발급",
      "페이퍼백 + Kindle 동시 출간 설정, 가격은 최저가로 (목적은 인세가 아니라 존재 증명)",
      "출간 후가 진짜: 학교에서 북토크, 도서관 기증, 관련 교사·교수에게 한 부씩 — '배포 80부'는 이렇게 만든 숫자",
    ],
    resources: [
      { label: "Amazon KDP (무료 셀프 출판)", url: "https://kdp.amazon.com" },
      { label: "KDP 페이퍼백 가이드", url: "https://kdp.amazon.com/en_US/help/topic/G201834180" },
    ],
    storyTip: "책의 '내용'을 에세이에 다시 쓰지 마세요. 쓰는 과정에서 생각이 바뀐 지점 — 증명하려던 명제가 틀렸음을 깨달은 순간 같은 — 이 입학사정관이 원하는 이야기입니다.",
  },
  {
    num: 5, emoji: "🧑‍🏫",
    typeKo: "지역 봉사 (튜터링)", typeEn: "Community Service (Volunteer)",
    position: "Tutor: Chemistry, Biology, Math",
    organization: "교내 National Honor Society 튜터링 센터",
    bullets: [
      "Tutored 40 students — outcomes incl. Honors Algebra II grades from D- to A-, biology grade from C+ to A",
      "Conducted weekly Socratic Habruta peer-led free debate",
    ],
    grades: "11, 12", timing: "학기 중", hoursPerWeek: "4시간", weeksPerYear: "10주",
    analysis: "흔한 '튜터링 봉사'를 특별하게 만드는 건 결과 추적입니다 — 'D-에서 A-로'라는 before/after가 들어가는 순간 봉사 시간 채우기가 아니라 교육 성과가 됩니다. 거기에 소크라테스식·하브루타라는 자기만의 방법론을 붙여 '어떻게 가르치는가'까지 보여줬습니다.",
    guideTitle: "튜터링 봉사를 '성과가 보이는 활동'으로 만드는 법",
    guideIntro: "튜터링은 가장 접근성 좋은 봉사이지만 그만큼 흔합니다. 차별화 공식은 두 가지뿐입니다: ① 학생별 성적 변화를 기록할 것 ② 자기만의 수업 방식을 이름 붙일 것. 둘 다 비용이 들지 않고, 누적 기록만 있으면 됩니다.",
    steps: [
      "교내 NHS(National Honor Society)·피어 튜터링 센터에 등록 — 없으면 교무처에 개설 제안 (그 자체가 활동 3 같은 '창립' 스토리)",
      "첫 세션에서 담당 학생의 현재 성적·목표를 메모 → 학기 말 변화를 같은 표에 기록",
      "가르치는 방식에 형식을 부여: 일방 설명 대신 질문 주고받기(소크라테스식), 짝 토론(하브루타) 등 — 방법에 이름이 붙으면 활동이 '프로그램'이 됨",
      "누적 인원·대표 성과 2~3개를 분기마다 정리 (Common App 불릿은 이 기록에서 그대로 나옴)",
    ],
    resources: [
      { label: "NHS (National Honor Society)", url: "https://www.nhs.us" },
    ],
    storyTip: "가장 안 풀리던 학생 한 명의 이야기를 확보하세요. '40명을 가르쳤다'는 칸에 쓰고, '한 명이 바뀌는 데 몇 주가 걸렸다'는 에세이에 씁니다.",
  },
  {
    num: 6, emoji: "🏥",
    typeKo: "지역 봉사 (의료·지역사회)", typeEn: "Community Service (Volunteer)",
    position: "Interact Club member; 한국 종합병원 volunteer",
    organization: "교내 Interact Club (로터리 산하) · 방학 중 한국 의료 봉사",
    bullets: [
      "Summer medical assistant, patient chart organizer in Korean hospital",
      "Tour guide, 지역 박물관",
      "Pediatric vaccine clinic volunteer",
    ],
    grades: "10, 11, 12", timing: "연중", hoursPerWeek: "1~10시간", weeksPerYear: "30주",
    analysis: "유학생만 쓸 수 있는 카드 — 미국 학기 중 봉사와 한국 방학 봉사를 한 칸에 묶어 '두 나라에 걸친 지속성'을 만들었습니다. 병원 차트 정리는 화려하지 않지만 Pre-med 서사(활동 2의 바이오센서 연구)와 정확히 같은 축 위에 있습니다. 시간을 '1~10시간'으로 정직하게 쓴 것도 신뢰 포인트.",
    guideTitle: "방학마다 한국에서 의료 봉사 기회를 만드는 법",
    guideIntro: "유학생의 여름·겨울 방학은 미국 학생에게 없는 자원입니다. 한국 대학병원·종합병원 다수가 청소년 자원봉사 프로그램을 상시 운영하고, 1365 자원봉사포털에서 기관별 모집을 검색할 수 있습니다. 의료 지망생이라면 '환자 곁의 일'(차트 정리, 안내, 접종 클리닉 보조)이 섀도잉보다 에세이 재료가 많습니다.",
    steps: [
      "방학 6~8주 전에 1365 포털·병원 사회공헌팀 페이지에서 청소년 봉사 모집 검색 (영문 봉사확인서 발급 가능 여부 확인)",
      "미국 학기 중에는 Interact(로터리 인터내셔널 산하 고교 클럽) 같은 정기 봉사 채널 하나를 유지 — '연중' 표기가 가능해짐",
      "병원·클리닉·박물관처럼 종류가 달라도 '사람을 직접 응대하는 일'이라는 공통점으로 한 칸에 묶기",
      "봉사 일지: 날짜·시간·한 일 한 줄 — 누적 시간과 에피소드가 모두 여기서 나옴",
    ],
    resources: [
      { label: "1365 자원봉사포털 (한국)", url: "https://www.1365.go.kr" },
      { label: "Rotary Interact (고교 봉사 클럽)", url: "https://www.rotary.org/en/get-involved/interact-clubs" },
    ],
    storyTip: "한국 병원에서 본 장면 하나(보호자 없는 환자, 접종을 무서워하던 아이)를 기록해 두세요 — '국제 학생'이라는 정체성과 의료 관심사가 교차하는 에세이 소재가 됩니다.",
  },
  {
    num: 7, emoji: "🗳️",
    typeKo: "학생회·정치", typeEn: "Student Govt./Politics",
    position: "‘21 IB Student VP, ‘21–’23 Student Council Member",
    organization: "IB 학생회 · 교내 학생회",
    bullets: [
      "Created IB academic materials & class schedule website",
      "Led budget allocation, Halloween event team",
      "Ran $1,800 prom funding initiative on treasurer team",
    ],
    grades: "9, 10, 11, 12", timing: "학기 중", hoursPerWeek: "5–6시간", weeksPerYear: "25주",
    analysis: "학생회는 가장 흔한 활동이지만, 이 엔트리는 직함이 아니라 산출물로 채워져 있습니다 — 자료 웹사이트(만든 것), 예산 배분(맡은 돈), $1,800 모금(만든 돈). '학생회 임원이었다'와 '학생회에서 무엇을 남겼다'의 차이가 정확히 이것입니다. 4년 연속 참여로 신뢰성도 확보.",
    guideTitle: "학생회 경력을 '산출물 목록'으로 바꾸는 법",
    guideIntro: "학생회에서 입시에 남는 것은 직함이 아니라 ① 만든 것 ② 움직인 돈 ③ 연 행사의 규모, 세 가지 숫자입니다. 임원이 아니어도 이 세 가지는 만들 수 있습니다.",
    steps: [
      "임기 시작 시 '졸업 후에도 남을 것 하나'를 정하기 — 이 사례는 IB 과목 자료·시간표 웹사이트 (Google Sites나 Notion으로도 충분)",
      "예산이 오가는 역할(재무팀·행사 예산)을 자원해서 맡기 — 금액이 곧 불릿의 숫자가 됨",
      "행사 하나를 처음부터 끝까지: 기획서 → 예산 → 홍보 → 집행 → 결과 보고의 풀사이클 경험 만들기",
      "학기마다 '만든 것/움직인 돈/참여 인원'을 한 줄씩 기록",
    ],
    resources: [
      { label: "Google Sites (무료 학급·학생회 사이트)", url: "https://sites.google.com" },
    ],
    storyTip: "리더십 에세이를 쓴다면 '당선'이 아니라 '반대를 설득한 회의' 장면에서 시작하세요. 직함 서사는 모두가 쓰고, 협상 서사는 드뭅니다.",
  },
  {
    num: 8, emoji: "🎸",
    typeKo: "음악 (보컬)", typeEn: "Music: Vocal",
    position: "Band Vocalist; Organizer, Dorm Band Songwriting",
    organization: "기숙사 유학생 밴드 — “music has no international barriers”",
    bullets: [
      "Dorm band connects international student body over music",
      "Lead vocalist/composer for 7-member collective",
      "Organized Lunar New Year music festival, 200 attendees",
    ],
    grades: "11, 12", timing: "학기 중", hoursPerWeek: "10–12시간", weeksPerYear: "20주",
    analysis: "스파이크(STEM)와 무관해 보이지만 전략적으로 중요한 엔트리 — 입학사정관이 '이 학생과 4년을 살고 싶은가'를 판단하는 칸입니다. 유학생 정체성을 약점이 아니라 공동체를 만드는 재료로 뒤집었고, 설 음악 축제 200명이라는 숫자로 '취미'를 '조직한 행사'로 끌어올렸습니다.",
    guideTitle: "취미를 '공동체를 만든 활동'으로 키우는 법",
    guideIntro: "10칸 중 1~2칸은 반드시 '좋아서 한 일'이어야 합니다 — 전부 전공·수상이면 오히려 설계된 리스트로 읽힙니다. 공식은 간단합니다: 혼자 하던 취미를 ① 모임으로 ② 모임을 공개 행사로 키우는 것.",
    steps: [
      "기숙사·교회·동네에서 같은 취미 3~5명을 모아 정기 모임화 (주 1회, 이름 붙이기)",
      "정체성 한 줄 만들기 — 이 사례의 “music has no international barriers”처럼 모임의 이유를 문장으로",
      "학교 행사 캘린더의 빈 곳(명절·국제 문화 주간)에 공연·전시를 제안 — 학교는 콘텐츠가 늘 부족함",
      "행사 참석 인원을 세어 두기 — '200 attendees'는 세었기 때문에 쓸 수 있는 숫자",
    ],
    resources: [
      { label: "BandLab (무료 작곡·합주 협업 툴)", url: "https://www.bandlab.com" },
    ],
    storyTip: "이 칸은 에세이의 '숨 쉬는 단락'이 됩니다 — 연구·성취 서사 사이에서 사람 냄새를 내는 용도. 행사 당일의 한 장면을 묘사형으로 적어 두세요.",
  },
  {
    num: 9, emoji: "💻",
    typeKo: "컴퓨터·기술", typeEn: "Computer/Technology",
    position: "Lead Q&A Website Designer, Developer",
    organization: "“The Women Engineers”: digital hub connecting aspiring female engineers with professional mentors",
    bullets: [
      "Coding self-study to full-stack web developer and content lead",
      "Recruited 10 mentor-experts",
      "1,100 Instagram followers and 35 active users since July 2023",
    ],
    grades: "12 (진행 중)", timing: "방학 중", hoursPerWeek: "10시간", weeksPerYear: "8주",
    analysis: "12학년 여름에 시작한 짧은 활동인데도 강력한 이유: '독학 → 풀스택 개발 → 실사용자 35명'이라는 학습-실행-검증 사이클이 완결돼 있기 때문입니다. 멘토 10명을 직접 영입한 것은 콜드 아웃리치 능력의 증거이고, 여성 엔지니어라는 주제는 학생의 정체성·전공 축과 일치합니다. '진행 중(on-going)' 표기로 대학에서도 계속할 일임을 시사합니다.",
    guideTitle: "코딩 독학 → 실서비스 런칭까지 가는 법",
    guideIntro: "포트폴리오용 토이 프로젝트와 입시에서 통하는 프로젝트의 차이는 실사용자입니다. 무료 커리큘럼(freeCodeCamp, The Odin Project)으로 8~12주 독학하면 풀스택 웹사이트를 만들 수 있고, Vercel·GitHub Pages로 배포 비용도 0원입니다. 남는 문제는 '무엇을, 누구를 위해'뿐입니다.",
    steps: [
      "주제 = 자기 정체성 × 해결하고 싶은 연결 문제 (이 사례: 여성 공학도 지망생 ↔ 현직 멘토)",
      "freeCodeCamp 또는 The Odin Project로 HTML/CSS/JS → React까지 한 트랙 완주 (방학 8주 집중)",
      "MVP는 Q&A 게시판 하나면 충분 — 기능 욕심보다 빨리 배포 (Vercel 무료)",
      "멘토 영입: LinkedIn에서 해당 분야 현직자에게 콜드 메시지 — '고등학생이 만든 무료 멘토링 허브'라는 명분은 응답률이 높음",
      "인스타그램 계정으로 콘텐츠 운영 — 팔로워·활성 사용자 수가 곧 Common App 불릿",
    ],
    resources: [
      { label: "freeCodeCamp (무료 풀스택 커리큘럼)", url: "https://www.freecodecamp.org" },
      { label: "The Odin Project", url: "https://www.theodinproject.com" },
      { label: "Vercel (무료 배포)", url: "https://vercel.com" },
    ],
    storyTip: "첫 콜드 메시지 10통이 전부 무시당한 경험까지 기록하세요. '35명의 사용자'보다 '11번째 메시지에 온 첫 답장'이 에세이에서는 더 비쌉니다.",
  },
  {
    num: 10, emoji: "💼",
    typeKo: "유급 노동", typeEn: "Work (Paid)",
    position: "Private tutor: SAT Math, standardized test prep",
    organization: "한국 중학생 대상 개인 과외",
    bullets: [
      "Raised student’s SAT Math score from 500 to 750 over 5 months",
      "Devised unique, student-tailored teaching strategies for math and confidence-building",
    ],
    grades: "11, 12", timing: "연중", hoursPerWeek: "3시간", weeksPerYear: "20주",
    analysis: "많은 학부모가 모르는 사실: 미국 입시에서 유급 노동(Work-Paid)은 감점이 아니라 가점입니다. 책임감·시간 관리·실전 능력의 증거로 읽히고, 특히 '500→750'이라는 성과 숫자가 있으면 평범한 아르바이트가 교육 성과 스토리가 됩니다. 봉사 튜터링(활동 5)과 짝을 이뤄 '가르치는 사람'이라는 일관된 축을 만듭니다.",
    guideTitle: "과외·아르바이트를 입시 자산으로 만드는 법",
    guideIntro: "10칸을 화려한 활동으로만 채울 필요가 없습니다. 입학사정관 설문에서 유급 노동은 꾸준히 높게 평가되는 항목입니다 — 단, '돈을 벌었다'가 아니라 '책임을 졌고 결과를 만들었다'로 써야 합니다.",
    steps: [
      "잘하는 과목 하나로 동생·지인·교회 커뮤니티에서 첫 학생 구하기 (시급보다 성과 데이터가 목적)",
      "시작 시점 점수·성적을 반드시 기록 — 이것이 없으면 'before/after' 불릿을 못 씀",
      "학생에게 맞춘 방법을 한 가지 '발명'하기 (개념 카드, 오답 패턴 노트 등) — 두 번째 불릿의 재료",
      "5~6개월 단위로 성과 정리: 점수 변화 + 가르친 시간 누적",
    ],
    resources: [
      { label: "Khan Academy SAT 연습 (수업 교재로 활용)", url: "https://www.khanacademy.org/sat" },
    ],
    storyTip: "'가르치다 보니 내가 배우는 방식이 보였다'는 메타 인지 서사는 교육·STEM 어느 전공과도 연결됩니다. 학생이 처음으로 혼자 문제를 풀어낸 날을 기록해 두세요.",
  },
];

/** Cross-cutting strategy notes rendered above the list. */
export const STRATEGY_POINTS = [
  { emoji: "🎯", title: "스파이크가 보인다", body: "10칸이 따로 놀지 않습니다. 바이오센서 연구(2) → STEM 클럽·과학페어(3) → 병원 봉사(6) → 여성 엔지니어 플랫폼(9)이 '생명과학×공학'이라는 하나의 축으로 이어지고, 책(4)·밴드(8)가 사람의 입체감을 더합니다." },
  { emoji: "🔢", title: "모든 불릿에 숫자", body: "40명 모집, $500 예산, 80부 배포, 200명 참석, 500→750점. 형용사('열심히', '주도적으로')는 한 번도 안 나옵니다. 숫자는 검증 가능하다는 인상을 주고, 입학사정관은 칸당 10초 안에 숫자만 스캔합니다." },
  { emoji: "📈", title: "직함이 아니라 산출물", body: "회장·VP 같은 직함 뒤에는 반드시 만든 것(라이선스, 웹사이트, 행사)이 따라옵니다. '무슨 자리였나'가 아니라 '무엇이 남았나'로 쓰는 것 — 이것이 흔한 리스트와의 결정적 차이입니다." },
  { emoji: "🪜", title: "배치 순서 = 우선순위", body: "Common App은 중요한 순서대로 배치합니다. 리더십+공식 절차(TEDx)와 연구가 맨 위, 유급 과외가 맨 아래 — 입학사정관이 위에서부터 읽다 멈춰도 손해가 없도록 설계돼 있습니다." },
  { emoji: "✂️", title: "글자 수 제한을 역이용", body: "50/100/150자 제한 때문에 완전한 문장을 쓸 필요가 없습니다. 동사로 시작하는 전보문체 + 세미콜론·약어 활용 — 조직명 칸에 논문 제목이나 슬로건을 넣는 변칙도 허용됩니다." },
];

/** Common App activities-section ground rules, rendered as a reference box. */
export const COMMONAPP_RULES = [
  "활동 칸은 최대 10개 — 전부 채우는 것이 기본 전략 (이 학생도 10/10)",
  "직책·리더십 설명 50자 / 단체명 100자 / 활동 설명 150자 제한",
  "완전한 문장 불필요 — 동사 시작, 약어·세미콜론 허용",
  "학년(9–12)·시기(연중/학기 중/방학)·주당 시간·연간 주수를 함께 입력",
  "중요한 활동부터 위에서 아래로 — 순서 자체가 메시지",
];
