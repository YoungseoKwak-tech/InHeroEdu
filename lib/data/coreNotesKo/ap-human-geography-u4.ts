/**
 * Core Notes 한국어 스토리텔링 버전 — AP Human Geography Unit 4 (4.1–4.6).
 * 원본 내용 전량 보존(objectives·traps·diagram 등 포함) + 일타강사 내러티브.
 * 원본에 overview/body가 없으면 한국어 overview를 새로 추가.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_HUMAN_GEOGRAPHY_U4_KO: CoreNote[] = [
  {
    lessonId: "ap-human-geography-u4-l1",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 4,
    lessonNum: 1,
    unitName: "Political Patterns and Processes",
    title: "정치지리 핵심 개념 — 네이션과 스테이트, 헷갈리면 끝장입니다",
    subtitle:
      "'민족'과 '국가'는 다른 말이에요 — 이 한 끗 차이가 4단원 전체를 가릅니다.",
    overview:
      "정치지리의 출발점은 딱 세 단어예요 — 네이션(nation), 스테이트(state), 그리고 둘이 맞물린 민족국가(nation-state)입니다. 스테이트는 영토·주권·정부를 가진 '정치적 단위'(우리가 흔히 말하는 나라)고, 네이션은 같은 정체성을 공유하는 '문화적 집단'이에요. 이 둘이 안 맞아떨어질 때 무국적 민족(쿠르드족)과 다국가 민족(아랍)이 생깁니다. 시험에서 'state'를 '주(州)'나 '민족'으로 헷갈리면 그 문제는 통째로 날아가요.",
    objectives: [
      "민족 vs. 국가 vs. 민족국가 (Nation vs. state vs. nation-state)",
      "무국적 민족 (Stateless nations)",
      "다국가 민족 (Multi-state nations)",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "정치지리 핵심 개념",
        subtitle: null,
        body:
          "스테이트(state)는 정해진 영토, 영구 인구, 주권, 그리고 인정받는 정부를 갖춘 정치적 단위입니다 — 한국에서 말하는 '국가'예요(미국의 '주(state)'와는 전혀 다릅니다). 네이션(nation)은 공통의 언어·문화·역사·정체성으로 묶인 사람들의 집단이고요. 이 둘이 하나로 겹치면 — 즉 한 민족이 곧 한 국가를 이루면 — 민족국가(nation-state)가 됩니다(일본·아이슬란드가 교과서적 예시). 하지만 현실은 깔끔하지 않아요. 자기 국가가 없는 민족이 무국적 민족(stateless nation, 쿠르드족), 여러 국가에 흩어진 민족이 다국가 민족(multi-state nation, 아랍·한민족)입니다.",
        keyIdea:
          "스테이트 = 정치적 단위(영토·주권), 네이션 = 문화적 집단(정체성). 둘이 일치하면 민족국가.",
        table: {
          headers: ["용어", "정의 / 예시"],
          rows: [
            ["국가 (State)", "영토·주권·정부를 가진 정치 단위 (예: 프랑스)"],
            ["민족 (Nation)", "공통 문화·정체성을 가진 사람들 (예: 쿠르드족)"],
            ["민족국가 (Nation-state)", "민족과 국가가 일치 (예: 일본)"],
            ["무국적 민족 (Stateless nation)", "자기 국가가 없는 민족 (예: 쿠르드족·팔레스타인)"],
            ["다국가 민족 (Multi-state nation)", "여러 국가에 걸친 민족 (예: 아랍 민족)"],
          ],
        },
        terms: [
          {
            term: "국가 (State)",
            def: "정해진 영토·영구 인구·주권·정부를 갖춘 정치적 단위. 미국의 '주(州)'와 혼동 금지.",
          },
          {
            term: "민족 (Nation)",
            def: "공통의 언어·문화·역사·정체성으로 묶인 사람들의 집단. 정치 경계와 무관할 수 있음.",
          },
          {
            term: "무국적 민족 (Stateless nation)",
            def: "자기만의 주권국가를 갖지 못한 민족. 쿠르드족이 대표 사례.",
          },
          {
            term: "다국가 민족 (Multi-state nation)",
            def: "하나의 민족이 여러 국가에 걸쳐 분포하는 경우. 아랍 민족이 대표 사례.",
          },
        ],
        traps: [
          "쿠르드족은 무국적 민족의 고전적 예시이고, 아랍 민족은 여러 국가에 걸쳐 있습니다 — 'state'(정치 단위)와 'nation'(문화 집단)을 절대 혼동하지 마세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u4-l2",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 4,
    lessonNum: 2,
    unitName: "Political Patterns and Processes",
    title: "국경과 경계 — 선이 그어진 '순서'가 갈등을 만든다",
    subtitle:
      "어떻게 그었나(형태)보다, 언제 누가 그었나(기원)가 시험의 진짜 포인트입니다.",
    overview:
      "국경은 그냥 지도 위 선이 아니에요. 자를 대고 그은 기하학적 경계(직선 국경)냐, 강·산맥을 따른 자연적 경계냐 — 형태도 중요하지만, AP가 진짜 묻는 건 '경계가 생긴 순서'입니다. 정착보다 먼저 그어졌나(선행), 정착 후 문화에 맞춰 그어졌나(후행), 외부 세력이 문화를 무시하고 강제로 그었나(중첩), 아니면 지금은 사라졌지만 흔적이 남아있나(잔존). 특히 아프리카의 식민지 경계 같은 중첩 경계가 왜 분쟁의 뿌리인지를 설명할 수 있어야 점수가 나옵니다.",
    objectives: [
      "기하학적 경계 vs. 자연적 경계 (Geometric vs. natural boundaries)",
      "선행·후행·중첩 경계 (Antecedent, subsequent, superimposed boundaries)",
      "잔존 경계 (Relic boundaries)",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "국경과 경계",
        subtitle: null,
        body:
          "경계는 우선 '형태'로 나눠요. 기하학적 경계(geometric boundary)는 위도·경도나 직선으로 그은 인위적 선(미국–캐나다 49도선)이고, 자연적 경계(natural/physical boundary)는 강·산맥·호수 같은 지형을 따라 그어집니다(미국–멕시코의 리오그란데강). 하지만 시험이 더 좋아하는 건 '기원에 따른 분류'예요. 선행 경계(antecedent)는 사람이 많이 정착하기 전에 먼저 그어진 경계, 후행 경계(subsequent)는 사람들이 정착한 뒤 문화 차이에 맞춰 협상된 경계입니다. 중첩 경계(superimposed)는 외부(식민) 세력이 현지 문화 집단을 완전히 무시하고 위에서 강제로 그은 경계로 — 아프리카 식민지 국경이 그 전형이며, 한 민족을 둘로 쪼개거나 적대 집단을 한 나라에 묶어 수많은 분쟁의 근원이 됩니다. 잔존 경계(relic boundary)는 더 이상 공식 기능은 없지만 경관에 흔적이 남은 옛 경계예요(베를린 장벽).",
        keyIdea:
          "형태(기하학적/자연적)보다 '기원'(선행·후행·중첩·잔존)이 FRQ의 핵심. 중첩 경계 = 외부가 문화 무시하고 강제 = 분쟁의 뿌리.",
        table: {
          headers: ["경계 유형", "정의 / 예시"],
          rows: [
            ["기하학적 (Geometric)", "직선·위경도로 그은 인위적 선 (미국–캐나다 49도선)"],
            ["자연적 (Natural)", "강·산맥 등 지형을 따름 (리오그란데강)"],
            ["선행 (Antecedent)", "정착·문화 발달 이전에 그어짐"],
            ["후행 (Subsequent)", "정착 후 문화 차이에 맞춰 협상됨"],
            ["중첩 (Superimposed)", "외부 세력이 문화 무시하고 강제 (아프리카 식민 국경)"],
            ["잔존 (Relic)", "기능은 사라졌으나 흔적이 남음 (베를린 장벽)"],
          ],
        },
        terms: [
          {
            term: "기하학적 경계 (Geometric boundary)",
            def: "지형과 무관하게 직선이나 위·경도로 그은 인위적 경계.",
          },
          {
            term: "선행 경계 (Antecedent boundary)",
            def: "그 지역에 사람들이 정착하고 문화가 발달하기 전에 먼저 설정된 경계.",
          },
          {
            term: "후행 경계 (Subsequent boundary)",
            def: "정착이 이루어진 뒤 문화·민족 차이를 반영해 협상으로 그어진 경계.",
          },
          {
            term: "중첩 경계 (Superimposed boundary)",
            def: "외부(식민) 세력이 현지 문화 집단을 무시하고 강제로 부과한 경계.",
          },
          {
            term: "잔존 경계 (Relic boundary)",
            def: "더 이상 공식 기능은 없으나 경관에 자취가 남아 있는 옛 경계.",
          },
        ],
        traps: [
          "중첩 경계는 외부 세력이 문화 집단을 무시하고 그은 것(아프리카의 식민 국경)으로 — 이것이 수많은 아프리카 분쟁의 근본 원인입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u4-l3",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 4,
    lessonNum: 3,
    unitName: "Political Patterns and Processes",
    title: "국가의 모양과 크기 — 형태가 통치를 좌우한다",
    subtitle:
      "나라가 어떻게 생겼느냐가 통제·방어·국민통합의 난이도를 결정합니다.",
    overview:
      "국가의 '모양'은 단순한 지도 그림이 아니라 통치 능력을 좌우하는 요소예요. 뭉쳐 있어 다스리기 쉬운 밀집형(compact), 길쭉해서 통신·통제가 어려운 연장형(elongated), 조각조각 흩어진 분리형(fragmented), 손잡이처럼 튀어나온 돌출형(prorupted), 그리고 다른 나라를 통째로 둘러싼 천공형(perforated)까지. 여기에 한 국가에 둘러싸인 영토(고립영토)와 본국에서 떨어진 영토(외부영토) 개념이 붙습니다. 시험에서는 지도를 보여주고 모양을 식별하게 하거나, 그 모양이 통치에 주는 장단점을 설명하게 해요.",
    objectives: [
      "밀집형·연장형·분리형·돌출형·천공형 국가 (Compact, elongated, fragmented, prorupted, perforated states)",
      "고립영토 vs. 외부영토 (Enclave vs. exclave)",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "국가의 모양과 크기",
        subtitle: null,
        body:
          "밀집형 국가(compact state)는 중심에서 가장자리까지 거리가 비슷해 통치·방어·통신이 쉬워요(폴란드). 연장형 국가(elongated state)는 길고 가늘어서 한쪽 끝까지 통제·연결이 어렵습니다(칠레). 분리형 국가(fragmented state)는 영토가 여러 조각으로 나뉘어(섬나라 인도네시아, 본토와 떨어진 부분) 통합이 힘들죠. 돌출형 국가(prorupted state)는 본체에서 손잡이(panhandle)처럼 길게 뻗은 부분이 있는데, 보통 자원이나 바다로의 접근을 확보하거나 두 집단을 갈라놓기 위한 거예요(태국·나미비아). 천공형 국가(perforated state)는 다른 나라를 영토 안에 완전히 품고 있습니다(남아프리카공화국이 레소토를 둘러쌈). 마지막으로 고립영토(enclave)는 한 국가에 완전히 둘러싸인 영토, 외부영토(exclave)는 본국에서 떨어져 다른 나라들 사이에 고립된 본국의 일부입니다(러시아의 칼리닌그라드).",
        keyIdea:
          "돌출형 = 손잡이로 자원·바다 접근 / 천공형 = 다른 나라를 완전히 둘러쌈(남아공이 레소토를 둘러싼 것). 이 둘을 헷갈리면 안 됩니다.",
        table: {
          headers: ["모양", "특징 / 예시"],
          rows: [
            ["밀집형 (Compact)", "둥글고 뭉침, 통치 쉬움 (폴란드)"],
            ["연장형 (Elongated)", "길고 가늘어 통제 어려움 (칠레)"],
            ["분리형 (Fragmented)", "여러 조각으로 분리됨 (인도네시아)"],
            ["돌출형 (Prorupted)", "손잡이가 뻗어 자원·바다 접근 (나미비아)"],
            ["천공형 (Perforated)", "다른 나라를 완전히 둘러쌈 (남아공–레소토)"],
          ],
        },
        terms: [
          {
            term: "밀집형 국가 (Compact state)",
            def: "중심에서 가장자리까지 거리가 비슷해 통치·방어가 쉬운 둥근 형태의 국가.",
          },
          {
            term: "돌출형 국가 (Prorupted state)",
            def: "본체에서 손잡이처럼 길게 뻗은 부분을 가진 국가. 자원·해양 접근 확보 목적.",
          },
          {
            term: "천공형 국가 (Perforated state)",
            def: "영토 안에 다른 독립 국가를 완전히 둘러싸고 있는 국가.",
          },
          {
            term: "고립영토 (Enclave)",
            def: "다른 한 국가의 영토에 완전히 둘러싸인 영토.",
          },
          {
            term: "외부영토 (Exclave)",
            def: "본국에서 분리되어 다른 국가들 사이에 고립된 본국의 일부 (예: 칼리닌그라드).",
          },
        ],
        traps: [
          "돌출형 국가는 자원이나 바다로의 접근을 위한 손잡이(panhandle)를 가집니다. 천공형 국가는 다른 나라를 완전히 둘러쌉니다(남아프리카공화국이 레소토를 둘러쌈).",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u4-l4",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 4,
    lessonNum: 4,
    unitName: "Political Patterns and Processes",
    title: "구심력과 원심력 — 나라를 묶는 힘 vs. 쪼개는 힘",
    subtitle:
      "국가를 하나로 당기느냐, 갈가리 찢느냐 — 모든 정치 갈등은 이 두 힘의 줄다리기.",
    overview:
      "한 나라가 유지되느냐 분열되느냐는 두 힘의 균형에 달렸어요. 구심력(centripetal force)은 사람들을 하나로 끌어당기는 통합의 힘 — 공통 언어, 국가(國歌), 외부의 적, 강한 국가 정체성 같은 거죠. 반대로 원심력(centrifugal force)은 나라를 안에서 찢는 분열의 힘 — 민족 갈등, 종교 분쟁, 지역 자치 요구 같은 겁니다. 원심력이 극단으로 가면 권력이 지방으로 넘어가는 분권화(devolution)를 거쳐, 한 국가가 여러 적대적 소국으로 쪼개지는 발칸화(balkanization)까지 갑니다. FRQ에서는 반드시 '구체적 예시'를 들어야 점수가 나와요.",
    objectives: [
      "구심력으로서의 국가 정체성 (National identity as centripetal)",
      "원심력으로서의 분권화 (Devolution as centrifugal)",
      "발칸화 (Balkanization)",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "구심력과 원심력",
        subtitle: null,
        body:
          "구심력(centripetal force)은 국민을 하나로 묶어 국가의 안정과 통합을 높이는 힘입니다 — 공유된 국가 정체성, 공통 언어, 국기·국가(國歌) 같은 상징, 잘 작동하는 교통·통신망, 그리고 때로는 공동의 외부 위협이 그 예예요. 원심력(centrifugal force)은 반대로 국가를 분열·불안정하게 만드는 힘으로, 민족·종교 갈등, 경제적 불평등, 지역 자치 요구 등이 여기 속합니다. 원심력이 작동하면 중앙정부가 권력을 지역·지방 정부로 넘기는 분권화(devolution)가 일어나요(영국이 스코틀랜드·웨일스에 자치권 이양). 이런 분열 압력이 극에 달해 한 국가가 여러 개의 작고 흔히 적대적인 단위로 깨지는 과정을 발칸화(balkanization)라 부르며, 옛 유고슬라비아의 해체가 대표적 사례입니다.",
        keyIdea:
          "구심력 = 통합(공통 언어·국가·정체성), 원심력 = 분열(민족 갈등·자치 요구). 원심력 극단 = 분권화 → 발칸화.",
        table: {
          headers: ["힘", "효과 / 예시"],
          rows: [
            ["구심력 (Centripetal)", "통합·안정 (공통 언어, 국가, 공동의 적)"],
            ["원심력 (Centrifugal)", "분열·불안정 (민족 갈등, 종교 분쟁)"],
            ["분권화 (Devolution)", "중앙→지방 권력 이양 (영국→스코틀랜드)"],
            ["발칸화 (Balkanization)", "여러 적대적 소국으로 분열 (구 유고슬라비아)"],
          ],
        },
        terms: [
          {
            term: "구심력 (Centripetal force)",
            def: "국민을 하나로 묶어 국가의 통합과 안정을 강화하는 힘 (공통 언어·국가 정체성 등).",
          },
          {
            term: "원심력 (Centrifugal force)",
            def: "국가를 분열·불안정하게 만드는 힘 (민족 갈등·지역 자치 요구 등).",
          },
          {
            term: "분권화 (Devolution)",
            def: "중앙정부가 권력의 일부를 지역·지방 정부로 이양하는 과정.",
          },
          {
            term: "발칸화 (Balkanization)",
            def: "한 국가가 여러 개의 작고 흔히 적대적인 단위로 분열되는 과정.",
          },
        ],
        traps: [
          "구심력은 통합시키고(공통 언어, 국가), 원심력은 분열시킵니다(민족 갈등, 지역 자치 요구) — 항상 구체적인 예시를 제시하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u4-l5",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 4,
    lessonNum: 5,
    unitName: "Political Patterns and Processes",
    title: "초국가주의와 국제기구 — 주권을 내놓는 거래",
    subtitle:
      "여러 나라가 더 큰 몸체에 주권 일부를 양보 — 그 반대 방향이 브렉시트입니다.",
    overview:
      "초국가주의(supranationalism)는 셋 이상의 국가가 공동의 정치·경제·군사 목표를 위해 더 큰 조직에 뭉치는 것으로, 그 핵심은 '주권의 일부를 양보한다'는 점이에요. EU는 단일 화폐(유로)와 자유 이동까지 나아간 가장 깊은 통합 사례지만, 동시에 주권 상실 논란과 회원국 간 격차라는 도전도 안고 있죠. UN은 평화유지로, NAFTA/USMCA 같은 무역블록은 경제 통합으로 작동합니다. 그리고 이 흐름의 정반대 — 즉 초국가 기구에서 빠져나와 주권을 되찾으려는 움직임의 대표가 브렉시트(Brexit)예요. '주권을 넘긴다'는 방향성을 잡는 게 시험의 열쇠입니다.",
    objectives: [
      "EU 통합과 도전 과제 (EU integration and challenges)",
      "UN 평화유지 (UN peacekeeping)",
      "무역블록과 주권 (Trade blocs and sovereignty)",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "초국가주의와 국제기구",
        subtitle: null,
        body:
          "초국가주의(supranationalism)는 여러 국가가 경제·정치·군사적 이익을 위해 더 큰 조직으로 자발적으로 연합하는 것이며, 회원국은 그 대가로 주권의 일부를 양보합니다. 유럽연합(EU)이 가장 깊은 예로, 단일 시장·공동 화폐(유로)·국경 없는 이동까지 통합했지만 — 회원국 간 경제 격차, 주권 상실에 대한 반발, 이민 정책 갈등 같은 도전에 직면해 있어요. 국제연합(UN)은 분쟁 지역에 평화유지군을 파견해 국제 협력과 안정을 도모하고, 무역블록(trade bloc, NAFTA→USMCA·EU 단일시장)은 관세 인하와 자유무역으로 경제 통합을 추진합니다. 하지만 회원이 되면 정책 결정권 일부를 외부 기구에 넘겨야 하므로 주권과 긴장이 생겨요. 그 긴장이 폭발한 사례가 브렉시트(Brexit) — 영국이 초국가 기구(EU)보다 자국 주권을 다시 앞세우며 탈퇴한 것입니다.",
        keyIdea:
          "초국가주의 = 국가가 더 큰 조직에 주권 일부를 양보. 브렉시트 = 그 반대로 주권을 다시 주장한 대표 사례.",
        table: {
          headers: ["조직 / 개념", "기능 / 예시"],
          rows: [
            ["초국가주의 (Supranationalism)", "주권 일부 양보, 더 큰 조직에 연합"],
            ["유럽연합 (EU)", "단일 시장·유로·자유 이동까지 통합"],
            ["국제연합 (UN)", "평화유지·국제 협력"],
            ["무역블록 (Trade bloc)", "관세 인하·자유무역 (USMCA)"],
            ["브렉시트 (Brexit)", "주권 재주장, EU 탈퇴"],
          ],
        },
        terms: [
          {
            term: "초국가주의 (Supranationalism)",
            def: "여러 국가가 공동의 이익을 위해 더 큰 조직에 연합하며 주권 일부를 양보하는 것.",
          },
          {
            term: "주권 (Sovereignty)",
            def: "국가가 자국 영토와 정책을 스스로 통제하고 결정할 수 있는 권한.",
          },
          {
            term: "무역블록 (Trade bloc)",
            def: "관세 인하와 자유무역으로 경제를 통합하는 국가 간 협정·집단 (USMCA 등).",
          },
          {
            term: "브렉시트 (Brexit)",
            def: "영국이 유럽연합(EU)에서 탈퇴해 주권을 다시 주장한 사건.",
          },
        ],
        traps: [
          "초국가주의 = 국가가 더 큰 조직에 주권의 일부를 넘기는 것. 브렉시트는 한 국가가 초국가 회원 자격에 맞서 주권을 다시 주장한 대표적 사례입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u4-l6",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 4,
    lessonNum: 6,
    unitName: "Political Patterns and Processes",
    title: "선거지리 — 선거구를 어떻게 긋느냐가 결과를 바꾼다",
    subtitle:
      "표를 한 표도 안 바꾸고 선만 다시 그어 이기는 기술 — 게리맨더링입니다.",
    overview:
      "선거지리(electoral geography)는 '공간이 어떻게 선거 결과를 만드는가'를 다뤄요. 핵심은 게리맨더링(gerrymandering) — 한 정당에 유리하도록 선거구 경계를 의도적으로 비틀어 긋는 것입니다. 여기에 의석 수를 인구에 맞춰 재배분하는 의석재배분(reapportionment)과, 그 의석을 담을 선거구 경계를 다시 긋는 선거구재획정(redistricting)을 구분해야 해요. 게리맨더링은 상대 표를 여러 구로 흩뿌리는 '크래킹(cracking)'과 한 구에 몰아넣는 '패킹(packing)' 두 기법으로 작동하는데, FRQ는 실제 선거구 지도를 보여주고 어떤 기법인지 식별하라고 합니다.",
    objectives: [
      "게리맨더링 (Gerrymandering)",
      "의석재배분 vs. 선거구재획정 (Reapportionment vs. redistricting)",
      "투표 패턴과 지리 (Voting patterns and geography)",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "선거지리",
        subtitle: null,
        body:
          "민주주의에서 선거구를 어떻게 긋느냐는 결과를 통째로 바꿀 수 있어요. 먼저 두 절차를 구분하세요. 의석재배분(reapportionment)은 인구 조사 결과에 따라 각 지역(미국에서는 주)에 배정되는 의석 수를 다시 나누는 것이고, 선거구재획정(redistricting)은 그 의석을 채울 선거구의 경계선을 다시 긋는 것입니다. 이 경계 긋기를 한 정당이나 집단에 유리하게 의도적으로 왜곡하는 것이 게리맨더링(gerrymandering)이에요. 대표 기법은 둘 — 크래킹(cracking)은 상대 정당 유권자를 여러 선거구에 잘게 흩어 어디서도 다수가 못 되게 만드는 것이고, 패킹(packing)은 반대로 상대 유권자를 한 선거구에 빽빽이 몰아넣어 그들의 표가 나머지 구에서 '낭비'되게 만드는 것입니다. 그 결과 선거구가 기괴하게 구불구불한 모양이 되죠. 또 도시는 한 성향, 농촌은 다른 성향처럼 투표 패턴이 지리와 강하게 맞물린다는 점도 알아두세요.",
        keyIdea:
          "의석재배분 = 의석 '수' 재분배 / 선거구재획정 = 경계 '선' 다시 긋기. 게리맨더링 = 크래킹(분산) + 패킹(집중).",
        table: {
          headers: ["용어", "정의 / 예시"],
          rows: [
            ["의석재배분 (Reapportionment)", "인구에 따라 의석 '수'를 재배분"],
            ["선거구재획정 (Redistricting)", "선거구 '경계선'을 다시 그음"],
            ["게리맨더링 (Gerrymandering)", "특정 정당 유리하게 경계 왜곡"],
            ["크래킹 (Cracking)", "상대 유권자를 여러 구로 분산"],
            ["패킹 (Packing)", "상대 유권자를 한 구에 집중"],
          ],
        },
        terms: [
          {
            term: "게리맨더링 (Gerrymandering)",
            def: "특정 정당이나 집단에 유리하도록 선거구 경계를 의도적으로 왜곡해 긋는 것.",
          },
          {
            term: "의석재배분 (Reapportionment)",
            def: "인구 조사 결과에 따라 각 지역에 배정되는 의석 수를 다시 나누는 과정.",
          },
          {
            term: "선거구재획정 (Redistricting)",
            def: "의석을 채울 선거구의 경계선을 다시 긋는 과정.",
          },
          {
            term: "크래킹 (Cracking)",
            def: "상대 정당 유권자를 여러 선거구에 분산시켜 다수가 되지 못하게 하는 기법.",
          },
          {
            term: "패킹 (Packing)",
            def: "상대 정당 유권자를 한 선거구에 집중시켜 다른 구에서 표를 낭비시키는 기법.",
          },
        ],
        traps: [
          "게리맨더링은 '크래킹'(상대 유권자를 분산)이나 '패킹'(상대 유권자를 집중) 기법을 씁니다 — FRQ는 선거구 지도를 보여주고 어떤 기법인지 식별하라고 합니다.",
        ],
        example: null,
      },
    ],
  },
];
