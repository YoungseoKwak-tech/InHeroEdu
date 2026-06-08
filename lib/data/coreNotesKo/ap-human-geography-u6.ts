/**
 * Core Notes 한국어 스토리텔링 버전 — AP Human Geography Unit 6 (6.1–6.6).
 * 원본 구조 전량 보존(top fields·sections·table·terms·traps 포함) + 일타강사 내러티브.
 * 원본 overview/body가 null인 곳은 한국어 overview를 추가(2~4문장 + 시험 함정).
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_HUMAN_GEOGRAPHY_U6_KO: CoreNote[] = [
  {
    lessonId: "ap-human-geography-u6-l1",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 6,
    lessonNum: 1,
    unitName: "Cities and Urban Land-Use",
    title: "도시의 기원과 성장",
    subtitle:
      "왜 어떤 곳은 도시가 되고 어떤 곳은 안 되는가 — 입지와 중심지 이론으로 도시의 위계를 읽습니다.",
    overview:
      "도시는 아무 데나 생기지 않아요. 그 자리의 물리적 특성(입지, site)과 다른 곳과의 관계(상황, situation)가 도시의 운명을 결정합니다. 그리고 크리스탈러의 중심지 이론(central place theory)은 도시들이 서로 다른 '급'으로 위계를 이루며 배치된다는 걸 설명해요 — 작은 동네 가게부터 대도시까지. 시험 함정 하나: 임계치(threshold)와 도달범위(range)를 헷갈리면 안 됩니다. 임계치가 클수록 더 높은 차수의 중심지예요.",
    objectives: [
      "입지(site)와 상황(situation)을 구분할 수 있다.",
      "크리스탈러의 중심지 이론(central place theory)을 설명할 수 있다.",
      "도시 위계(urban hierarchy)를 이해할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "도시의 기원과 성장",
        subtitle: null,
        body:
          "입지(site)는 그 장소 '그 자체'의 절대적 특성이에요 — 지형, 수자원, 토양, 기후 같은 것. 반면 상황(situation)은 그 장소가 '다른 곳들과 어떤 관계에 있는가', 즉 상대적 위치를 말합니다. 예를 들어 어떤 도시가 강 합류점에 있다는 건 입지이고, 두 무역로의 교차점에 있다는 건 상황이에요. 크리스탈러의 중심지 이론은 한 걸음 더 나아가, 재화와 서비스를 제공하는 중심지들이 시장을 효율적으로 나눠 가지며 규칙적인 패턴으로 분포한다고 봅니다. 큰 도시(고차 중심지)는 드물고 멀리 떨어져 있으며 희귀한 서비스를 제공하고, 작은 마을(저차 중심지)은 촘촘하게 많으며 일상적 서비스만 제공해요. 이게 바로 도시 위계입니다.",
        keyIdea:
          "입지=절대적·내부적 특성, 상황=상대적·관계적 위치. 중심지 이론에서 임계치가 클수록 고차 중심지이고, 고차 중심지일수록 수가 적고 간격이 넓습니다.",
        table: null,
        terms: [
          {
            term: "입지 (Site)",
            def: "장소 그 자체의 절대적·물리적 특성(지형·수자원·토양·기후).",
          },
          {
            term: "상황 (Situation)",
            def: "다른 장소들과의 관계로 정의되는 상대적 위치.",
          },
          {
            term: "중심지 이론 (Central place theory)",
            def: "크리스탈러가 제시한, 중심지들이 위계를 이루며 규칙적으로 분포한다는 이론.",
          },
          {
            term: "임계치 (Threshold)",
            def: "어떤 서비스를 유지하는 데 필요한 최소 인구.",
          },
          {
            term: "도달범위 (Range)",
            def: "고객이 그 서비스를 이용하기 위해 이동하는 최대 거리.",
          },
        ],
        traps: [
          "중심지 이론: 임계치(threshold, 서비스를 유지할 최소 인구) vs. 도달범위(range, 고객이 이동하는 최대 거리) — 임계치가 클수록 더 높은 차수의 중심지입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u6-l2",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 6,
    lessonNum: 2,
    unitName: "Cities and Urban Land-Use",
    title: "도시 토지이용 모델",
    subtitle:
      "도시는 어떤 모양으로 자라는가 — 동심원·선형·다핵, 세 가지 고전 모델을 그림으로 구별합니다.",
    overview:
      "도시 내부가 어떻게 구획되는지를 설명하는 세 가지 고전 모델이 있어요. 버제스의 동심원 모델(CBD를 중심으로 한 동그라미 띠), 호이트의 선형 모델(교통로를 따라 뻗는 파이 조각), 해리스와 울만의 다핵 모델(여러 개의 중심핵). 셋 다 미국 도시를 설명하려고 만들어진 모델입니다. 시험 함정: FRQ는 도시 다이어그램을 주고 '어느 모델이냐'를 묻기 때문에 그림으로 즉시 구별할 수 있어야 해요.",
    objectives: [
      "동심원 모델(Concentric Zone, Burgess)을 설명할 수 있다.",
      "선형 모델(Sector, Hoyt)을 설명할 수 있다.",
      "다핵 모델(Multiple Nuclei, Harris & Ullman)을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "도시 토지이용 모델",
        subtitle: null,
        body:
          "동심원 모델(concentric zone model, 버제스)은 도시가 중심업무지구(CBD)를 핵으로 동그란 띠들이 바깥으로 퍼지는 구조라고 봐요 — 안쪽은 전이지대(공장·저소득 주거), 바깥쪽으로 갈수록 더 좋은 주거지가 나타납니다. 선형 모델(sector model, 호이트)은 이 동그라미를 비틀어서, 도시 성장이 철도·도로 같은 교통로를 따라 파이 조각(섹터) 형태로 뻗어나간다고 봐요 — 한번 고급 주거 섹터가 생기면 그 방향으로 계속 확장됩니다. 다핵 모델(multiple nuclei model, 해리스와 울만)은 도시가 단 하나의 중심이 아니라 여러 개의 독립적인 핵(공항·대학·산업단지 등) 주위로 성장한다고 봐요 — 자동차 시대의 분산된 대도시를 더 잘 설명합니다.",
        keyIdea:
          "동심원=CBD에서 퍼지는 동그란 띠, 선형=교통로를 따라가는 파이 조각, 다핵=여러 개의 독립 중심핵. FRQ는 그림을 주고 모델을 식별하라고 합니다.",
        table: null,
        terms: [
          {
            term: "동심원 모델 (Concentric Zone model)",
            def: "버제스의 모델. CBD를 중심으로 동그란 띠들이 바깥으로 퍼지는 구조.",
          },
          {
            term: "선형 모델 (Sector model)",
            def: "호이트의 모델. 교통로를 따라 파이 조각 형태로 성장하는 구조.",
          },
          {
            term: "다핵 모델 (Multiple Nuclei model)",
            def: "해리스와 울만의 모델. 여러 개의 독립적인 핵을 중심으로 성장하는 구조.",
          },
          {
            term: "중심업무지구 (CBD, Central Business District)",
            def: "상업·업무가 집중된 도시의 핵심 지역.",
          },
        ],
        traps: [
          "동심원 모델 = CBD에서 퍼지는 동그란 띠, 선형 모델 = 교통로를 따라가는 파이 조각, 다핵 모델 = 여러 개의 핵 — FRQ는 도시 다이어그램을 주고 어느 모델인지 식별하라고 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u6-l3",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 6,
    lessonNum: 3,
    unitName: "Cities and Urban Land-Use",
    title: "라틴아메리카·동남아시아·사하라 이남 도시 모델",
    subtitle:
      "미국 모델이 전부가 아니다 — 식민과 발전의 역사가 새긴 비서구 도시의 구조를 봅니다.",
    overview:
      "미국식 모델은 세계 모든 도시를 설명하지 못해요. 비서구권 도시들은 식민 지배, 급속한 도시화, 비공식 주거의 역사를 반영한 고유한 구조를 갖습니다. 그리핀-포드 모델(라틴아메리카), 맥기 모델(동남아시아), 사하라 이남 아프리카 도시 구조 — 셋 다 미국 모델과 종종 '반대'로 작동해요. 시험 함정: 그리핀-포드 모델에서는 부유층이 도심 인근의 상업 척추를 따라 살고, 빈민가(불량주거지대)는 도시 외곽에 있어 미국 모델과 정반대입니다.",
    objectives: [
      "그리핀-포드 라틴아메리카 모델(Griffin-Ford Latin American model)을 설명할 수 있다.",
      "맥기 모델(McGee model, 동남아시아)을 설명할 수 있다.",
      "사하라 이남 아프리카 도시 구조를 이해할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "라틴아메리카·동남아시아·사하라 이남 도시 모델",
        subtitle: null,
        body:
          "그리핀-포드 모델(Griffin-Ford model)은 라틴아메리카 도시를 설명해요. 식민 시대 CBD에서 상업 활동의 '척추(spine)'가 뻗어나가고, 그 척추를 따라 엘리트 주거지가 늘어섭니다. 반대로 가난한 무허가 정착촌(불량주거지대, disamenity zone)은 도시 가장자리로 밀려나죠 — 부유층이 외곽에 사는 미국과 정반대입니다. 맥기 모델(McGee model)은 동남아시아 도시를 다루는데, 서구식 CBD가 없는 대신 옛 항구를 중심으로 한 상업지구가 핵이 되고, 그 주위로 다양한 토지이용이 혼합됩니다. 사하라 이남 아프리카 도시는 보통 세 개의 CBD가 공존하는 게 특징이에요 — 식민 CBD, 전통 CBD, 그리고 시장 중심의 비공식 부문 — 식민 역사와 토착 구조가 겹쳐 있죠.",
        keyIdea:
          "비서구권 도시는 종종 미국 모델의 '반대' — 부유층이 중심부, 빈곤층이 외곽. 식민과 급속한 도시화의 역사를 읽어야 구조가 보입니다.",
        table: null,
        terms: [
          {
            term: "그리핀-포드 모델 (Griffin-Ford model)",
            def: "라틴아메리카 도시 모델. CBD에서 뻗는 상업 척추와 엘리트 주거, 외곽의 빈민가.",
          },
          {
            term: "맥기 모델 (McGee model)",
            def: "동남아시아 도시 모델. 서구식 CBD 대신 옛 항구 중심 상업지구가 핵.",
          },
          {
            term: "불량주거지대 (Disamenity zone)",
            def: "기반시설이 부족하고 위험한, 도시 내 빈곤 정착 지역.",
          },
          {
            term: "상업 척추 (Spine)",
            def: "CBD에서 뻗어나가는 고급 상업·주거 회랑.",
          },
        ],
        traps: [
          "그리핀-포드: CBD에서 뻗는 상업 활동의 척추를 따라 엘리트 주거가 늘어서고, 빈민가(불량주거지대)는 외곽에 있음 — 미국 모델의 정반대.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u6-l4",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 6,
    lessonNum: 4,
    unitName: "Cities and Urban Land-Use",
    title: "교외화와 스프롤",
    subtitle:
      "도시가 바깥으로 번져나간다 — 에지 시티와 붐버브, 그리고 무분별한 확산의 대가.",
    overview:
      "20세기 자동차의 등장과 함께 사람들은 도심을 떠나 교외로 흩어졌어요. 그 결과 단순한 베드타운을 넘어 일자리까지 갖춘 에지 시티(edge city), 폭발적으로 성장한 교외 붐버브(boomburb)가 생겨났습니다. 하지만 이런 무분별한 도시 확산(스프롤, sprawl)은 농지 잠식, 자동차 의존, 환경 비용이라는 대가를 치러요. 시험 함정: 에지 시티는 침실(주거)보다 일자리가 많다는 점에서, 직장이 없는 통근 교외(베드타운)와 반드시 구별해야 합니다.",
    objectives: [
      "에지 시티(edge cities)를 설명할 수 있다.",
      "붐버브(boomburbs)를 설명할 수 있다.",
      "도시 스프롤(urban sprawl)의 결과를 분석할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "교외화와 스프롤",
        subtitle: null,
        body:
          "교외화(suburbanization)는 인구와 활동이 도심에서 주변부로 이동하는 현상이에요. 초기 교외는 잠만 자는 베드타운(통근 교외)이었지만, 시간이 지나면서 교외 자체가 일자리를 갖게 됩니다. 에지 시티(edge city)는 고속도로 교차점 등에 형성된, 사무실·상업·일자리가 집중된 교외 중심지예요 — 버지니아의 타이슨스 코너(Tyson's Corner)가 대표적이고, 거주민보다 일자리가 더 많다는 게 핵심입니다. 붐버브(boomburb)는 인구 10만이 넘는데도 '도시'로 인식되지 않을 만큼 빠르게 성장한 교외 도시예요. 이 모든 확산이 합쳐지면 스프롤(sprawl)이 됩니다 — 저밀도로 끝없이 번지는 개발이 농지를 잠식하고, 자동차 없이는 살 수 없게 만들며, 통근 시간과 환경 오염을 늘려요.",
        keyIdea:
          "에지 시티는 일자리>거주의 교외 중심지(예: 타이슨스 코너), 붐버브는 급성장한 대형 교외. 스프롤은 저밀도 확산으로 농지·환경·자동차 의존 문제를 낳습니다.",
        table: null,
        terms: [
          {
            term: "교외화 (Suburbanization)",
            def: "인구와 활동이 도심에서 주변 교외로 이동하는 현상.",
          },
          {
            term: "에지 시티 (Edge city)",
            def: "교외에 형성된 일자리·상업 집중 중심지. 거주민보다 일자리가 많음.",
          },
          {
            term: "붐버브 (Boomburb)",
            def: "급성장한 인구 10만 이상의 대형 교외 도시.",
          },
          {
            term: "도시 스프롤 (Urban sprawl)",
            def: "저밀도로 무분별하게 외곽으로 번지는 도시 확산.",
          },
        ],
        traps: [
          "에지 시티(버지니아 타이슨스 코너)는 침실(주거)보다 일자리가 많음 — 일자리 중심이 없는 베드타운(통근 교외)과 반드시 구별하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u6-l5",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 6,
    lessonNum: 5,
    unitName: "Cities and Urban Land-Use",
    title: "도시 성장의 도전 과제",
    subtitle:
      "급속한 도시화의 그늘 — 비공식 정착촌, 열섬, 그리고 환경 정의의 문제.",
    overview:
      "도시가 빠르게 자랄수록 그늘도 깊어집니다. 수많은 사람이 합법적 권리도 기반시설도 없는 비공식 정착촌(무허가 도시)에 살고, 콘크리트와 아스팔트는 도시를 주변보다 뜨겁게 만드는 도시 열섬(urban heat island)을 낳아요. 게다가 오염과 위험은 가난한 지역에 불공평하게 집중되는데, 이게 환경 정의(environmental justice)의 핵심 문제입니다. 시험 함정: 무허가 정착촌은 지역마다 이름이 다르니(파벨라·부스티·비동빌) 외워야 하고, FRQ는 현실적인 개선 전략을 제안하라고 요구합니다.",
    objectives: [
      "비공식 정착촌/무허가 도시(informal settlements/squatter cities)를 이해할 수 있다.",
      "도시 열섬(urban heat island)을 설명할 수 있다.",
      "환경 정의(environmental justice)를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "도시 성장의 도전 과제",
        subtitle: null,
        body:
          "급속한 도시화는 주택 공급이 따라가지 못하는 상황을 만들어요. 그 결과 사람들은 법적 소유권도, 상수도·전기·하수 같은 공식 서비스도 없는 비공식 정착촌(무허가 도시, squatter settlements)에 모여 삽니다 — 브라질의 파벨라(favela), 인도의 부스티(bustee), 프랑스어권의 비동빌(bidonville)처럼 지역마다 이름이 달라요. 또 도시는 콘크리트·아스팔트·건물·자동차 때문에 열을 흡수·방출해 주변 농촌보다 몇 도씩 더 뜨거워지는데, 이게 도시 열섬 현상(urban heat island)입니다. 그리고 이런 열, 오염, 유해시설의 부담은 누구에게나 공평하게 나뉘지 않아요 — 가난하고 소외된 공동체에 집중되죠. 이 불평등을 바로잡으려는 원칙이 환경 정의(environmental justice)입니다.",
        keyIdea:
          "무허가 정착촌=법적 권리·공식 서비스 부재, 열섬=도시가 주변보다 뜨거움, 환경 정의=오염 부담의 불평등 시정. FRQ는 현실적 개선책을 묻습니다.",
        table: null,
        terms: [
          {
            term: "무허가 정착촌 (Squatter settlement)",
            def: "법적 소유권과 공식 서비스가 없는 비공식 주거 지역(파벨라·부스티·비동빌).",
          },
          {
            term: "도시 열섬 (Urban heat island)",
            def: "콘크리트·아스팔트·활동 때문에 도시가 주변 농촌보다 더 뜨거워지는 현상.",
          },
          {
            term: "환경 정의 (Environmental justice)",
            def: "환경적 부담과 혜택이 인종·소득과 무관하게 공평하게 분배되어야 한다는 원칙.",
          },
        ],
        traps: [
          "무허가 정착촌(파벨라·부스티·비동빌)은 법적 소유권과 공식 서비스가 없음 — 지역별 명칭을 알아두세요. FRQ는 현실적인 개선 전략을 제안하라고 요구합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u6-l6",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 6,
    lessonNum: 6,
    unitName: "Cities and Urban Land-Use",
    title: "도시 재생과 젠트리피케이션",
    subtitle:
      "쇠퇴한 도심을 되살린다는 것 — 레드라이닝의 상처, 젠트리피케이션의 명암, 스마트 성장의 대안.",
    overview:
      "쇠락한 도심을 되살리려는 노력은 늘 승자와 패자를 동시에 만들어요. 과거 레드라이닝(redlining)으로 투자가 끊겼던 동네에 다시 자본이 들어오면서 젠트리피케이션(gentrification)이 일어나는데, 부동산 가치가 오르면 정작 원래 살던 저소득 주민은 밀려납니다. 한편 스마트 성장(smart growth)과 뉴어버니즘(new urbanism)은 무분별한 확산 대신 걷기 좋고 복합용도인 도시를 지향해요. 시험 함정: 젠트리피케이션은 부동산 가치를 올려 저소득 주민을 내쫓으므로, FRQ는 '누가 이득을 보고 누가 손해를 보는지'를 묻습니다.",
    objectives: [
      "레드라이닝(redlining)과 투자 회피(disinvestment)를 설명할 수 있다.",
      "젠트리피케이션(gentrification)에 따른 주민 추방을 분석할 수 있다.",
      "스마트 성장(smart growth)과 뉴어버니즘(new urbanism)을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "도시 재생과 젠트리피케이션",
        subtitle: null,
        body:
          "레드라이닝(redlining)은 과거 은행·기관이 특정(주로 소수인종) 동네에 대출과 보험을 거부해 자본 유입을 막은 차별 관행이에요. 이렇게 투자가 끊긴 투자 회피(disinvestment) 상태가 오래 지속되면 동네는 쇠락합니다. 그러다 입지가 좋은 이런 지역에 다시 자본과 중산층이 유입되어 낡은 주택을 고치고 재개발하는 게 젠트리피케이션(gentrification)이에요. 겉보기엔 동네가 살아나는 것 같지만, 부동산 가치와 임대료가 오르면서 정작 원래 거주하던 저소득 주민은 살 곳을 잃고 추방(displacement)됩니다 — 그래서 승자와 패자가 분명한 현상이죠. 이에 대한 대안으로 스마트 성장(smart growth)은 외곽 확산 대신 기존 도심을 압축적으로 활용하자고 하고, 뉴어버니즘(new urbanism)은 걷기 좋고 대중교통 친화적이며 직주가 섞인 복합용도(mixed-use) 동네를 설계하자고 주장합니다.",
        keyIdea:
          "레드라이닝/투자 회피가 쇠퇴를 부르고, 젠트리피케이션이 가치를 올리며 저소득 주민을 추방. 뉴어버니즘은 걷기 좋은 복합용도 설계를 지향합니다.",
        table: null,
        terms: [
          {
            term: "레드라이닝 (Redlining)",
            def: "특정 동네에 대출·보험을 거부한 차별적 금융 관행.",
          },
          {
            term: "투자 회피 (Disinvestment)",
            def: "자본 유입이 끊겨 지역이 쇠락하는 과정.",
          },
          {
            term: "젠트리피케이션 (Gentrification)",
            def: "쇠락한 지역에 자본·중산층이 유입되어 가치가 오르고 저소득 주민이 추방되는 현상.",
          },
          {
            term: "뉴어버니즘 (New Urbanism)",
            def: "걷기 좋고 대중교통 친화적인 복합용도 도시 설계를 지향하는 운동.",
          },
          {
            term: "스마트 성장 (Smart growth)",
            def: "외곽 확산을 억제하고 기존 도심을 압축적으로 활용하려는 도시 계획 전략.",
          },
        ],
        traps: [
          "젠트리피케이션은 부동산 가치를 올려 저소득 주민을 추방함 — FRQ는 승자와 패자를 식별하라고 요구하고, 뉴어버니즘은 걷기 좋은 복합용도 설계를 옹호합니다.",
        ],
        example: null,
      },
    ],
  },
];
