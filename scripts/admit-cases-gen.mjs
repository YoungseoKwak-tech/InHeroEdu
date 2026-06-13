/**
 * Generates ~100 COMPOSITE admit-profile cases for /parents/cases.
 *
 * LEGAL / ETHICAL: these are ORIGINAL, fictional composites synthesized from
 * publicly known US-admissions patterns. No real individuals, no scraped or
 * verbatim essays, no PII. Orgs are generic ("a regional hospital", "a local
 * nonprofit") — never named real people/schools-of-origin. Clearly labeled as
 * 재구성 예시 in the UI. This is the legally-safe alternative to reposting
 * Reddit/internet essays (which would be copyright infringement).
 *
 *   node scripts/admit-cases-gen.mjs  → writes lib/data/admitCases.ts
 */
import fs from "node:fs";

function mulberry32(a){return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const rnd = mulberry32(20260613);
const pick = (a)=>a[Math.floor(rnd()*a.length)];
const shuffle=(a)=>{const r=a.slice();for(let i=r.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;};

const TIERS = [
  { key: "ivy", ko: "아이비+ (Ivy/Stanford/MIT 급)" },
  { key: "t20", ko: "Top 20" },
  { key: "t50", ko: "Top 50 / 주립 명문" },
];

// archetype: spike theme + essay angles + analysis insights (all original)
const ARCHETYPES = [
  { key:"research", ko:"연구 몰입형", spike:"한 분야를 끝까지 파고든 자기주도 연구",
    essays:["호기심에서 시작한 작은 질문이 1년 넘는 탐구로 이어진 과정","실패한 실험에서 배운 '데이터가 나를 반박할 때'의 겸손","연구 주제가 자신의 정체성·동네 문제와 맞닿은 지점"],
    why:["스파이크가 선명하다 — 활동이 흩어지지 않고 한 줄기로 수렴","'결과'보다 '사고 과정'을 보여줘 지적 성숙도를 증명","교내 자원이 부족한 환경에서 스스로 길을 낸 자기주도성"]},
  { key:"entrepreneur", ko:"창업·메이커형", spike:"문제를 발견하고 직접 만들어 해결",
    essays:["실패한 첫 제품에서 고객의 '진짜 문제'를 다시 정의한 이야기","수익보다 사용자 한 명의 변화를 좇은 동기","기술이 아니라 사람을 향했던 프로젝트의 출발점"],
    why:["impact를 숫자로 보여주되 동기는 사람 중심이라 진정성 있음","주도성과 회복탄력성(실패→재시도)이 동시에 드러남","교과 밖에서 만든 결과물이 전공 적합성을 자연 증명"]},
  { key:"social", ko:"사회운동·임팩트형", spike:"지역 사회의 구체적 문제를 지속적으로 해결",
    essays:["봉사 '시간'이 아니라 한 사람과의 관계가 바꾼 관점","내가 속한 공동체의 불편을 '내 일'로 받아들인 순간","도움을 주려다 오히려 배운 것의 역전"],
    why:["일회성 봉사가 아니라 다년간의 지속성과 리더십이 보임","'시혜'가 아닌 '연대'의 태도가 성숙하게 드러남","지역 문제→구체적 행동의 연결이 명확"]},
  { key:"stem-comp", ko:"STEM 경시·올림피아드형", spike:"수학·과학 경시 깊이 + 가르침으로 확장",
    essays:["경쟁의 승부욕을 넘어 '아름다운 문제'에 끌린 이유","후배를 가르치며 비로소 이해한 개념의 이야기","한 문제를 며칠씩 붙들었던 몰입의 즐거움"],
    why:["학문적 깊이를 수상이 아니라 사고로 증명","경시 실력을 '나눔(튜터링·동아리)'으로 확장해 이기심 우려 해소","전공 적합성과 지적 열정이 일치"]},
  { key:"arts", ko:"예술·창작형", spike:"독창적 작품 세계 + 꾸준한 발표",
    essays:["작품에 자신의 이중 정체성을 녹여낸 과정","관객/독자의 반응이 창작관을 바꾼 전환점","'잘 그리기'에서 '말하기'로 넘어간 예술관의 변화"],
    why:["포트폴리오·발표 이력으로 진정성과 지속성 입증","기술이 아니라 '관점'이 있는 창작자임을 서사로 증명","정량 지표가 약한 분야를 스토리로 강하게 보완"]},
  { key:"humanities", ko:"인문·글쓰기형", spike:"읽고 쓰고 토론으로 세상을 해석",
    essays:["한 권의 책이 오래된 신념을 흔든 경험","가족의 언어와 학교의 언어 사이에서 자란 정체성","역사 속 한 인물에게 던진 편지 형식의 성찰"],
    why:["탁월한 문장력 자체가 인문 전공 적합성의 증거","사고의 결이 섬세하고 독창적 관점이 있음","활동(교지·토론·아카이브)이 글쓰기 정체성으로 수렴"]},
  { key:"interdisc", ko:"융합·경계횡단형", spike:"두 분야를 잇는 독특한 교차점",
    essays:["예술과 코드, 생물과 음악처럼 두 세계를 잇게 된 계기","'전공을 못 고르는 게 아니라 잇고 싶은 것'이라는 재정의","경계에서만 보이는 문제를 발견한 순간"],
    why:["흔한 단일 스파이크와 차별화되는 독창적 포지셔닝","융합형 전공·커리큘럼과의 적합성이 자연스럽게 드러남","호기심의 폭과 깊이를 동시에 증명"]},
  { key:"resilience", ko:"역경 극복·성장형", spike:"개인적 어려움을 의미로 전환",
    essays:["가정의 사정으로 일찍 어른이 되어야 했던 시간의 재해석","언어·이주·건강 등 장벽을 넘으며 만든 자신만의 관점","'약점'이라 여긴 것이 강점이 된 전환"],
    why:["역경 자체가 아니라 '그로부터 무엇을 했는가'에 초점","맥락(환경)을 고려한 성취의 무게가 전달됨","공감과 성숙함이 진정성 있게 드러남"]},
  { key:"leadership", ko:"리더십·조직형", spike:"조직을 키우고 사람을 움직인 경험",
    essays:["리더가 '앞에서 끄는 것'이 아님을 배운 실패담","물려받은 동아리를 다음 세대에 더 좋게 넘긴 이야기","갈등을 중재하며 배운 경청의 힘"],
    why:["직책이 아니라 '변화시킨 결과'로 리더십을 증명","겸손과 책임감이 함께 드러나 호감","다년간의 헌신과 승계까지 보여 지속성 입증"]},
  { key:"environment", ko:"환경·지속가능성형", spike:"기후·환경 문제에 대한 구체적 실천",
    essays:["눈앞의 강/숲/동네에서 출발한 환경 행동","데이터로 동네의 문제를 측정해 정책에 닿은 과정","소비를 줄이는 실험을 1년간 기록한 이야기"],
    why:["글로벌 이슈를 '내 동네'의 구체적 행동으로 환원","측정·기록·정책 제안까지 이어진 실행력","가치관과 활동이 일관되게 정렬"]},
];

// major pools with composite, generic activity specifics
const MAJORS = [
  { en:"Computer Science", ko:"컴퓨터과학", acts:["오픈소스 프로젝트에 기여하고 별 수백 개를 받음","지역 비영리를 위한 무료 웹앱을 만들어 운영","교내 코딩 동아리를 만들어 후배 30명을 가르침","머신러닝으로 동네 데이터 문제를 분석"]},
  { en:"Biology / Pre-med", ko:"생물·의예", acts:["지역 병원·연구실에서 보조로 참여","공중보건 캠페인을 기획해 또래에게 전파","교내 과학 저널을 창간","희귀질환 환자 가족을 위한 정보 아카이브 구축"]},
  { en:"Mechanical Engineering", ko:"기계공학", acts:["로보틱스 팀에서 설계를 맡아 지역 대회 입상","저비용 보조기구를 설계해 시제품 제작","교내 메이커스페이스를 운영","태양광 소형 장치를 직접 제작"]},
  { en:"Economics", ko:"경제학", acts:["교내 투자/경제 동아리를 운영","지역 소상공인 데이터를 분석한 리포트 발간","금융 문해력 워크숍을 또래에게 진행","경제 블로그/뉴스레터를 꾸준히 발행"]},
  { en:"English / Creative Writing", ko:"영문·문예창작", acts:["교지 편집장으로 다년간 활동","문학 웹진을 창간해 또래 작품을 큐레이션","지역 도서관에서 글쓰기 워크숍을 운영","단편을 청소년 공모전에 꾸준히 출품"]},
  { en:"Political Science", ko:"정치학", acts:["모의국회·토론에서 다년간 활동","지역 이슈 캠페인을 조직","청소년 정책 제안을 지자체에 제출","시민 교육 팟캐스트를 운영"]},
  { en:"Environmental Science", ko:"환경과학", acts:["지역 하천 수질을 1년간 측정·기록","교내 제로웨이스트 캠페인을 주도","시민과학 프로젝트에 데이터 기여","환경 다큐 단편을 제작"]},
  { en:"Visual / Performing Arts", ko:"미술·공연예술", acts:["개인전/공연을 지역에서 개최","온라인에 작품을 꾸준히 발표하며 팔로워 형성","지역 아동에게 예술 수업을 무료로 진행","학교 축제의 미술/무대를 총괄"]},
  { en:"Mathematics", ko:"수학", acts:["수학 경시에서 다년간 입상","수학 저널/문제집을 직접 제작","후배를 위한 무료 수학 캠프를 운영","수학으로 실제 데이터를 모델링"]},
  { en:"Sociology / Public Policy", ko:"사회학·공공정책", acts:["지역 이주민 가정을 돕는 멘토링을 운영","사회 문제를 다룬 설문·리서치를 발표","공공도서관과 협업한 프로그램을 기획","불평등 이슈 캠페인을 조직"]},
];

const cases = [];
let id = 1;
// Build ~100: iterate archetype × major with tier variation, keep variety
const combos = shuffle(
  ARCHETYPES.flatMap((a) => MAJORS.map((m) => ({ a, m })))
);
for (const { a, m } of combos) {
  if (cases.length >= 100) break;
  const tier = pick(TIERS);
  const acts = shuffle(m.acts).slice(0, 3 + Math.floor(rnd()*2)); // 3-4 activities
  const essay = pick(a.essays);
  const why = shuffle(a.why).slice(0, 2 + Math.floor(rnd()*2));
  cases.push({
    id: id++,
    archetype: a.ko,
    archetypeKey: a.key,
    tier: tier.key,
    tierKo: tier.ko,
    majorEn: m.en,
    majorKo: m.ko,
    profile: `${m.ko} 지망 · ${a.ko}`,
    spike: a.spike,
    activities: acts,
    essayAngle: essay,
    whyItWorked: why,
  });
}

const header = `/**
 * 합격 사례 100선 — COMPOSITE, FICTIONAL admit profiles.
 *
 * ⚠️ LEGAL: Auto-generated original composites from public US-admissions
 * patterns. NOT real individuals, NOT scraped/verbatim essays, no PII. Always
 * render with the "재구성 예시" disclaimer. Regenerate: node scripts/admit-cases-gen.mjs
 */
export interface AdmitCase {
  id: number;
  archetype: string;
  archetypeKey: string;
  tier: "ivy" | "t20" | "t50";
  tierKo: string;
  majorEn: string;
  majorKo: string;
  profile: string;
  spike: string;
  activities: string[];
  essayAngle: string;
  whyItWorked: string[];
}

export const ADMIT_CASES: AdmitCase[] = ${JSON.stringify(cases, null, 2)};
`;

fs.writeFileSync(new URL("../lib/data/admitCases.ts", import.meta.url), header);
console.log(`Wrote ${cases.length} composite admit cases → lib/data/admitCases.ts`);
