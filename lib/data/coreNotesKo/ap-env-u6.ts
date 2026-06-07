/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 6 (6.1–6.8 전체).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U6_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u6-l1",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 6,
    lessonNum: 1,
    unitName: "Energy Resources and Consumption",
    title: "화석 연료 — 형성, 채굴, 환경 비용",
    subtitle: "석탄·석유·가스에 저장된 고대 햇빛이 현대 세계를 움직여요 — 그리고 기후 변화를 일으킵니다.",
    overview:
      "화석 연료(석탄·석유·천연가스)는 수백만 년에 걸쳐 묻힌 유기물에서 형성됐어요. 에너지 밀도가 높고 편리하지만 재생 불가능하고, 태우면 현대 환경 문제의 핵심인 CO₂와 오염물질을 방출합니다.",
    objectives: [
      "화석 연료가 어떻게 형성되고 왜 재생 불가능한지 설명할 수 있다.",
      "석탄·석유·천연가스를 비교할 수 있다.",
      "채굴과 연소의 환경 비용을 기술할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "세 가지 화석 연료",
        subtitle: null,
        body:
          "모두 수백만 년에 걸쳐 열과 압력 아래 묻힌 유기물에서 형성됐어요 — 그래서 인간 시간 척도에선 재생 불가능합니다. 형태와 태울 때의 '깨끗함'이 달라요.",
        keyIdea:
          "석탄이 가장 더럽고 천연가스가 가장 깨끗하게 타요 — 하지만 '전부' CO₂를 방출하고 재생 불가능합니다.",
        table: {
          headers: ["연료", "비고"],
          rows: [
            ["석탄 (Coal)", "가장 풍부하지만 가장 더러움 (에너지 단위당 CO₂·오염물질 최다)"],
            ["석유 (Oil/petroleum)", "운송 동력; 유출과 정제 오염"],
            ["천연가스 (Natural gas)", "가장 깨끗하게 타는 화석 연료지만 채굴 시 메탄 누출"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "채굴과 연소 비용",
        subtitle: null,
        body:
          "채굴은 환경을 해쳐요: 석탄 채굴(산정 제거 포함), 기름 유출, 가스용 프래킹(수압 파쇄)은 지하수를 오염시키고 메탄(강력한 온실가스)을 방출할 수 있어요. 화석 연료를 태우면 CO₂(기후 변화 유발)에 더해 스모그와 산성비를 일으키는 오염물질을 배출합니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "화석 연료 (Fossil fuels)",
            def: "고대 유기물에서 온 재생 불가능 에너지: 석탄·석유·천연가스.",
          },
          {
            term: "프래킹 (Fracking)",
            def: "가스/석유를 추출하는 수압 파쇄; 지하수 오염과 메탄 누출 위험.",
          },
          {
            term: "재생 불가능 (Nonrenewable)",
            def: "형성되는 것(수백만 년)보다 훨씬 빠르게 쓰이는 자원.",
          },
        ],
        traps: [
          "천연가스는 '더 깨끗하게' 타지만(CO₂ 적음) 채굴이 메탄을 '누출'해요 — 단기적으로 훨씬 강력한 온실가스입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u6-l2",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 6,
    lessonNum: 2,
    unitName: "Energy Resources and Consumption",
    title: "원자력 — 핵분열, 폐기물, 그리고 위험",
    subtitle: "원자를 쪼개면 막대한 무탄소 에너지가 나와요 — 방사성 폐기물과 드물지만 심각한 사고의 그늘과 함께.",
    overview:
      "원자력은 우라늄 원자를 쪼개(핵분열) 전기를 만들어요. CO₂ 배출 없이 엄청난 열을 방출합니다. 큰 단점은 오래가는 방사성 폐기물, 재앙적 사고 위험, 그리고 높은 비용이에요.",
    objectives: [
      "핵분열이 어떻게 전력을 만드는지 설명할 수 있다.",
      "원자력의 이익과 위험을 견줄 수 있다.",
      "폐기물 처리 과제와 주요 사고를 식별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "작동 원리와 매력",
        subtitle: null,
        body:
          "핵분열에서 중성자가 우라늄-235 핵을 쪼개 열을(그리고 더 많은 중성자를 방출해 연쇄 반응 유지) 냅니다. 그 열이 물을 끓여 터빈을 돌려요. 큰 장점: 크고 안정적인 무탄소 전기를 생산 — CO₂ 없음 — 해서 기후 변화 대응에 매력적입니다.",
        keyIdea:
          "원자력의 대표 이점: CO₂ 배출 '제로'로 막대한 전기 — 저탄소 전력원입니다.",
        table: null,
        terms: [
          {
            term: "핵분열 (Nuclear fission)",
            def: "무거운 핵(우라늄-235)을 쪼개 에너지를 방출하는 것.",
          },
          {
            term: "연쇄 반응 (Chain reaction)",
            def: "방출된 중성자가 더 많은 핵을 쪼개며 자생적으로 이어지는 핵분열.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "폐기물, 위험, 비용",
        subtitle: null,
        body:
          "단점이 심각해요. 사용후 연료는 수천 년간 위험하게 남는 방사성 폐기물인데, 널리 쓰이는 영구 처분장이 없습니다. 사고는 드물지만 재앙적일 수 있어요 — 체르노빌과 후쿠시마가 넓은 지역에 방사선을 방출했습니다. 발전소는 또 매우 비싸고 짓는 데 오래 걸려요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "방사성 폐기물 (Radioactive waste)",
            def: "수천 년간 위험하게 남는 사용후 핵연료.",
          },
          {
            term: "노심 용융 (Meltdown)",
            def: "원자로 노심이 과열되어 방사선을 방출할 수 있는 것(체르노빌·후쿠시마).",
          },
        ],
        traps: [
          "원자력은 CO₂를 '안' 내지만, 문제가 달라요: 오래가는 방사성 '폐기물'과 드물지만 심각한 사고 — 대기 오염이 아닙니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u6-l3",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 6,
    lessonNum: 3,
    unitName: "Energy Resources and Consumption",
    title: "태양 에너지 — 광전지와 수동형 시스템",
    subtitle: "태양은 한 시간에 인류가 1년 쓰는 것보다 많은 에너지를 보내요 — 비결은 그걸 붙잡는 것입니다.",
    overview:
      "태양 에너지는 재생 가능하고, 깨끗하고, 풍부해요. 두 주요 방식으로 활용합니다: 햇빛을 전기로 직접 바꾸는 광전지(PV) 셀, 그리고 건물 방향으로 열을 붙잡는 수동형 태양 설계. 주된 한계는 간헐성 — 해가 없으면 전력도 없죠.",
    objectives: [
      "광전지·능동형·수동형 태양을 구별할 수 있다.",
      "태양의 이익과 한계를 설명할 수 있다.",
      "간헐성을 저장 필요와 연결할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "태양을 붙잡는 방법들",
        subtitle: null,
        body:
          "광전지(PV) 셀은 햇빛을 전기로 직접 바꿔요. 능동형 태양은 펌프/팬으로 태양열로 데운 물이나 공기를 옮깁니다. 수동형 태양은 기계가 필요 없어요 — 영리한 건물 설계(남향 창·축열체)로 열을 자연스레 붙잡아 저장합니다.",
        keyIdea:
          "수동형 태양은 기계 장비가 '전혀' 필요 없어요 — 방향과 재료뿐. PV는 전기를, 수동형은 열을 만듭니다.",
        table: {
          headers: ["유형", "작동 방식"],
          rows: [
            ["광전지 (Photovoltaic, PV)", "셀이 햇빛을 전기로 직접 변환"],
            ["능동형 태양 (Active solar)", "펌프/팬이 태양열로 데운 물·공기를 순환"],
            ["수동형 태양 (Passive solar)", "건물 설계가 열을 붙잡음 — 기계 없음"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "이익과 간헐성 문제",
        subtitle: null,
        body:
          "태양은 재생 가능하고, 작동 중 오염을 안 내며, 오프그리드로 작동해요. 단점: 간헐적(해가 빛날 때만 생산), 넓은 공간 필요, PV 패널 제조에 자체 발자국이 있습니다. 간헐성 때문에 태양은 배터리 저장이나 백업 그리드와 짝지어져요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "광전지 셀 (Photovoltaic cell)",
            def: "햇빛을 전기로 직접 변환하는 장치.",
          },
          {
            term: "수동형 태양 (Passive solar)",
            def: "기계 없이 태양열을 붙잡아 저장하는 건물 설계.",
          },
          {
            term: "간헐적 (Intermittent)",
            def: "특정 시간에만 가용한 에너지(해/바람) — 저장이나 백업 필요.",
          },
        ],
        traps: [
          "태양의 주된 약점은 '간헐성'(해 없음 = 전력 없음)이라, 에너지 '저장'이 중요해요 — 작동 중 오염이 아닙니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u6-l4",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 6,
    lessonNum: 4,
    unitName: "Energy Resources and Consumption",
    title: "풍력, 수력, 지열 에너지",
    subtitle: "세 가지 재생 에너지 더 — 각각 깨끗하고 강력하지만, 알맞은 지리에 묶여 있어요.",
    overview:
      "태양 외에도 세 주요 재생 에너지가 깨끗하게 전기를 만들어요: 풍력(터빈), 수력(흐르는 물), 지열(지구의 열). 모두 연소 배출을 피하지만 위치에 의존하고 자체 생태적 맞교환을 안고 있습니다.",
    objectives: [
      "풍력·수력·지열이 어떻게 전력을 만드는지 설명할 수 있다.",
      "각각의 이익과 단점을 식별할 수 있다.",
      "각각을 알맞은 지리와 연결할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "세 재생 에너지 비교",
        subtitle: null,
        body:
          "각각 자연 에너지 흐름을 전기로 바꾸고, 각각 위치에 의존해요.",
        keyIdea:
          "셋 다 깨끗하지만 '지리'에 묶여요 — 풍력은 바람, 수력은 강, 지열은 뜨거운 지각이 필요합니다.",
        table: {
          headers: ["원천", "전력 출처", "단점"],
          rows: [
            ["풍력 (Wind)", "바람이 돌리는 터빈", "간헐적; 새/박쥐 폐사; 바람 부는 곳 필요"],
            ["수력 (Hydroelectric)", "떨어지는/흐르는 물(댐)", "댐이 강·물고기·퇴적물 흐름을 해침"],
            ["지열 (Geothermal)", "지구 내부 열", "지질 활동 지역으로 제한"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "맞교환",
        subtitle: null,
        body:
          "풍력은 가장 빠르게 성장하는 가장 싼 재생 에너지 중 하나지만 간헐적이고 새/박쥐를 해칠 수 있어요. 수력은 안정적이고 대규모지만 댐이 앞서 본 생태 비용(막힌 물고기, 갇힌 퇴적물)을 안고 있습니다. 지열은 꾸준하고 저배출이지만 지구의 열이 표면 가까운 곳(예: 아이슬란드)에서만 실용적이에요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "수력 발전 (Hydroelectric power)",
            def: "흐르는/떨어지는 물에서 나오는 전기, 보통 댐을 통해.",
          },
          {
            term: "지열 에너지 (Geothermal energy)",
            def: "지구 내부 열에서 나오는 에너지; 위치 제한적이지만 꾸준함.",
          },
        ],
        traps: [
          "태양/풍력과 달리 수력과 지열은 간헐적이지 '않아요' — 꾸준한 '기저부하' 전력을 제공합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u6-l5",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 6,
    lessonNum: 5,
    unitName: "Energy Resources and Consumption",
    title: "바이오연료와 바이오매스 에너지",
    subtitle: "살아있는 물질에서 온 에너지 — 원칙적으로 재생 가능하지만, 복잡한 탄소·식량 이야기를 안고 있어요.",
    overview:
      "바이오매스(목재·작물·폐기물)와 바이오연료(에탄올·바이오디젤 등)는 최근까지 살아있던 물질에서 온 에너지예요. 재생 가능하고 이론상 탄소 중립일 수 있지만, 태우면 오염되고 연료 작물이 식량·토지와 경쟁합니다.",
    objectives: [
      "바이오매스와 바이오연료를 정의할 수 있다.",
      "'탄소 중립' 주장과 그 한계를 설명할 수 있다.",
      "식량 대 연료, 오염 문제를 식별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "살아있는 물질에서 온 에너지",
        subtitle: null,
        body:
          "바이오매스는 에너지를 위해 태우는 유기물이에요 — 장작·작물 잔여물·축산 폐기물 — 수십억 명에게 여전히 취사/난방의 주연료입니다. 바이오연료는 작물에서 정제한 액체 연료예요: 에탄올(옥수수/사탕수수에서)과 바이오디젤. 작물이 다시 자라기에 재생 가능합니다.",
        keyIdea:
          "바이오연료/바이오매스는 '재생 가능'해요(작물이 다시 자람) — 하지만 태우면 여전히 CO₂와 대기 오염물질을 방출합니다.",
        table: null,
        terms: [
          {
            term: "바이오매스 (Biomass)",
            def: "에너지를 위해 태우는 유기물(목재·작물·폐기물).",
          },
          {
            term: "에탄올 (Ethanol)",
            def: "옥수수나 사탕수수 같은 작물로 만들어 휘발유에 섞는 바이오연료.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "탄소 중립과 함정들",
        subtitle: null,
        body:
          "바이오연료는 태울 때 방출되는 CO₂가 식물이 자라며 흡수한 것과 대략 같아 탄소 중립이라 불려요 — 하지만 이는 작물을 기르고·수확하고·정제하는 데 쓴 화석 연료를 무시합니다. 더 큰 문제: 식량 대 연료 논쟁(농지와 옥수수가 식량에서 연료로 전용되어 식량 가격 상승), 연료 작물용 삼림 벌채, 바이오매스 연소로 인한 실내 공기 오염이에요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "탄소 중립 (Carbon-neutral)",
            def: "성장 중 흡수한 만큼만 CO₂를 방출하는 것(이상화된 주장).",
          },
          {
            term: "식량 대 연료 (Food vs. fuel)",
            def: "작물/토지를 식량으로 쓸지 바이오연료로 쓸지의 갈등.",
          },
        ],
        traps: [
          "'탄소 중립'은 근사치일 뿐이에요 — 바이오연료를 기르고 가공하는 데 여전히 화석 연료를 태우고, 연료 작물이 '식량'과 경쟁합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u6-l6",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 6,
    lessonNum: 6,
    unitName: "Energy Resources and Consumption",
    title: "에너지 보존과 효율",
    subtitle: "더 적게 쓰거나(보존), 같은 에너지로 더 많이 얻거나(효율) — 둘은 다릅니다.",
    overview:
      "에너지 문제의 해법은 새 발전소만이 아니에요. 효율(같은 일에 더 적은 에너지)과 보존(전체 에너지를 덜 씀)이 가장 싸고 빠른 도구입니다. 그리고 열역학 제1법칙(양)과 제2법칙(질) 모두에서 손실이 일어나요.",
    objectives: [
      "제1법칙(양) 대 제2법칙(질) 효율 손실을 구별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "효율 손실은 두 법칙에서 옵니다. 제1법칙(양)은 에너지가 보존되지만 일부가 쓸모없는 형태로 새는 것을, 제2법칙(질)은 에너지 변환마다 일부가 저급 폐열로 흩어져 질이 떨어지는 것을 말해요. 열병합 발전(CHP)은 그 폐열을 활용해 전체 효율을 높이고, 건물 에너지 사용은 단열·HVAC·조명 효율 개선으로 줄입니다.",
        keyIdea:
          "효율 = 에너지 입력 단위당 더 많은 출력. 보존 = 전체 에너지를 덜 씀. 둘은 다른 전략이에요.",
        table: null,
        terms: [
          {
            term: "열병합 발전 (Cogeneration, CHP)",
            def: "폐열을 활용해 전체 효율을 높이는 것.",
          },
          {
            term: "건물 에너지 사용 (Building energy use)",
            def: "단열·HVAC·조명 효율 개선.",
          },
        ],
        traps: [
          "효율과 보존을 혼동하기 — 효율은 에너지 입력 단위당 더 많은 출력을 얻는 것이고, 보존은 전체 에너지를 덜 쓰는 것이에요. AP는 두 전략을 모두 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u6-l7",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 6,
    lessonNum: 7,
    unitName: "Energy Resources and Consumption",
    title: "에너지 믹스 — 전 세계와 미국 패턴",
    subtitle: "어떤 원천이 전기와 운송을 떠받치는가 — 그리고 화석 연료 의존의 지정학.",
    overview:
      "에너지 믹스는 화석 연료·원자력·재생 에너지가 전 세계와 미국에서 차지하는 비율을 말해요. 전기 그리드와 운송 부문은 서로 다른 원천에 의존하고, 화석 연료 의존은 에너지 안보와 지정학적 함의를 가집니다.",
    objectives: [
      "전 세계와 미국에서 화석 연료·원자력·재생 에너지의 비율 기여를 파악할 수 있다.",
      "전기 그리드 대 운송 부문의 에너지 원천을 구별할 수 있다.",
      "화석 연료 의존의 에너지 안보·지정학적 함의를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "에너지 믹스 — 전 세계와 미국 패턴",
        subtitle: null,
        body:
          "전 세계와 미국 에너지 믹스는 여전히 화석 연료가 지배하지만, 전기 그리드(석탄·가스·원자력·재생 혼합)와 운송 부문(거의 석유)은 원천이 달라요. 화석 연료 의존은 수입국을 가격 변동과 공급 차단에 취약하게 만들어 — 에너지 안보가 지정학적 사안이 됩니다.",
        keyIdea:
          "전기와 운송은 다른 원천에 의존해요. 운송은 석유에 깊이 묶여 있어 전환이 더 어렵습니다.",
        table: null,
        terms: [],
        traps: [
          "구식 에너지 믹스 비율을 제시하기 — AP는 현재 데이터 표를 주므로, 다른 연도의 암기 비율에 의존하지 말고 주어진 데이터를 읽어야 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u6-l8",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 6,
    lessonNum: 8,
    unitName: "Energy Resources and Consumption",
    title: "에너지 정책 — 경제, 보조금, 인센티브",
    subtitle: "가격을 바꾸면 행동이 바뀌어요 — 정책은 어떤 에너지가 싸 보이게 만드느냐로 전환을 좌우합니다.",
    overview:
      "에너지 정책은 경제적 지렛대로 에너지 선택을 형성해요. 화석 연료 보조금과 재생 에너지 인센티브가 시장을 어느 쪽으로 기울이고, 에너지 전환의 비용-편익 분석이 정책 결정을 안내합니다. 탄소세와 배출권 거래제가 핵심 도구예요.",
    objectives: [
      "화석 연료 보조금 대 재생 에너지 인센티브를 비교할 수 있다.",
      "에너지 전환의 비용-편익 분석을 할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "정책은 가격을 통해 작동해요. 화석 연료 보조금은 화석 에너지를 인위적으로 싸게 만들고, 재생 에너지 인센티브(세액 공제·보조금)는 청정 에너지를 더 경쟁력 있게 만듭니다. 탄소 가격 책정에는 두 방식이 있어요: 탄소세(배출에 고정 가격을 매겨 가격을 올림 → 수요 감소/대안 전환)와 배출권 거래제(cap-and-trade, 총 배출 상한을 정하고 배출권을 거래). 각각 메커니즘과 맞교환이 다릅니다.",
        keyIdea:
          "탄소세 = 가격을 고정하고 배출량은 시장이 결정. 배출권 거래제 = 배출량을 고정하고 가격은 시장이 결정.",
        table: null,
        terms: [
          {
            term: "탄소세 vs 배출권 거래제 (Carbon tax vs. cap-and-trade)",
            def: "메커니즘과 맞교환 — 탄소세는 가격을 고정, 배출권 거래제는 총량을 고정.",
          },
        ],
        traps: [
          "메커니즘 없이 정책을 기술하기 — AP FRQ는 탄소세가 '어떻게' 배출을 줄이는지(가격 인상 → 수요 감소/대안 전환)를 묻지, 단지 줄인다는 사실만 묻지 않습니다.",
        ],
        example: null,
      },
    ],
  },
];
