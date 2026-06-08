/**
 * Core Notes 한국어 스토리텔링 버전 — AP World History Unit 1 (1.1–1.6).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_WORLD_HISTORY_U1_KO: CoreNote[] = [
  {
    lessonId: "ap-world-history-u1-l1",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 1,
    lessonNum: 1,
    unitName: "The Global Tapestry (c. 1200–1450)",
    title: "송 왕조 중국 (Song Dynasty China) — 관료제와 혁신",
    subtitle:
      "그 시대 가장 앞선 국가 — 시험으로 뽑은 학자들이 운영하고, 상업 혁명이 동력을 댔습니다.",
    overview:
      "1200년 무렵, 송 왕조 중국 (Song China)은 지구상에서 가장 번영하고 기술적으로 앞선 사회였다고 해도 과언이 아니에요. 두 가지가 이를 이끌었습니다 — 과거 시험(civil service exam)을 통해 능력으로 사람을 뽑아 채운 정부, 그리고 새 벼·새 화폐·드디어 대규모로 확산된 옛 발명품들이 일으킨 경제 호황. 이 둘을 따라가면 송의 위력이 한눈에 보여요.",
    objectives: [
      "과거 시험과 신유학(Neo-Confucianism)이 송의 통치를 어떻게 형성했는지 설명할 수 있다.",
      "송 경제 혁명의 원인과 결과를 식별할 수 있다.",
      "송 사회에서 불교와 유교적 가치의 역할을 서술할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "능력에 의한 통치 (어느 정도는)",
        subtitle: null,
        body:
          "송은 과거 시험(civil service exam)을 확대했어요 — 유교 경전 숙달을 시험해 관리를 선발한 거죠. 이론상 이건 세습 귀족의 지배가 아니라 학자-신사층(scholar-gentry)의 능력주의를 만들었습니다. 신유학(Neo-Confucianism) — 유교 윤리에 불교·도교 사상을 섞은 부흥 사상 — 이 공식 이념이 되어 위계, 효(filial piety), 교육을 강조했어요.",
        keyIdea:
          "과거 시험은 정부를 유럽보다 더 능력 위주로 만들었습니다 — 하지만 부유한 가문은 가정교사를 둘 형편이 됐으니, 엘리트가 여전히 지배했어요.",
        table: null,
        terms: [
          {
            term: "과거 시험 (Civil service exam)",
            def: "유교 경전을 시험해 관리를 선발한 능력 기반 시험.",
          },
          {
            term: "학자-신사층 (Scholar-gentry)",
            def: "송 관료제를 채운 교육받은 엘리트 계층.",
          },
          {
            term: "신유학 (Neo-Confucianism)",
            def: "위계와 의무를 강조한, (불교·도교 요소가 섞인) 부흥된 유교.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "경제 혁명",
        subtitle: null,
        body:
          "(베트남에서 온) 빨리 익는 참파 벼(Champa rice)는 1년에 두 번 수확을 가능하게 해 인구 폭증을 이끌었어요. 상업은 폭발적으로 성장했습니다 — 송은 세계 최초의 지폐(paper money)를 발행했고, 남북을 잇는 거대한 대운하(Grand Canal)를 운영했으며, 실크로드와 인도양을 따라 수출할 철·강철·도자기를 대량 생산했어요.",
        keyIdea:
          "송 왕조 중국은 주요 '수출국'이었습니다 (비단·도자기) — 그 물건 값을 치르려 외국 은이 흘러들어왔어요.",
        table: {
          headers: ["원인", "결과"],
          rows: [
            ["참파 벼 (2회 수확)", "인구 급증, 도시 성장"],
            ["지폐 & 신용", "교역과 상업의 호황"],
            ["대운하 (Grand Canal)", "값싼 내륙 운송, 통합된 경제"],
            ["철·강철·도자기", "교역로를 따른 주요 수출품"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "신앙과 사회",
        subtitle: null,
        body:
          "불교, 특히 선종(Chan/Zen) 학파는 여전히 영향력이 있었고, 신유학은 가부장적 사회 질서를 강화했어요 — 엘리트 사이에서 신분 표지로 전족(foot binding)이 퍼진 것도 여기 포함됩니다. 유교의 효(filial piety)는 가정과 국가 양쪽을 똑같이 구조화했어요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "참파 벼 (Champa rice)",
            def: "베트남에서 온 빨리 익고 가뭄에 강한 벼로, 중국 인구를 늘렸다.",
          },
          {
            term: "효 (Filial piety)",
            def: "부모와 연장자에 대한 존경과 복종이라는 유교적 의무.",
          },
        ],
        traps: [
          "과거 시험은 이론상 '능력주의'지만, 준비에는 부(富)가 필요했어요 — 기회의 평등을 과장하면 안 됩니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u1-l2",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 1,
    lessonNum: 2,
    unitName: "The Global Tapestry (c. 1200–1450)",
    title: "다르 알이슬람 (Dar al-Islam) — 정치적 분열, 문화적 통일",
    subtitle:
      "칼리프국들은 정치적으로 쪼개졌지만, 공유된 신앙·언어·교역이 이슬람 세계를 그 어느 때보다 단단히 엮었어요.",
    overview:
      "1200년 무렵 통일된 아바스 칼리프국(Abbasid Caliphate)은 경쟁하는 여러 국가로 갈라졌는데, 종종 튀르크계(Turkic) 같은 새로운 세력이 통치했어요. 하지만 정치적으로 나뉘었다고 문화적으로 나뉜 건 아니었습니다 — 이 국가들을 가로질러 다르 알이슬람(Dar al-Islam), 곧 '이슬람의 집'이 뻗어 있었어요. 종교, 아랍어, 학문, 상업으로 묶인 세계였죠.",
    objectives: [
      "아바스 이후 이슬람 세계의 정치적 분열을 설명할 수 있다.",
      "다르 알이슬람을 통일한 문화적·지적 성취를 서술할 수 있다.",
      "교역과 수피즘(Sufism)이 어떻게 이슬람을 전파했는지 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "정치적 분열",
        subtitle: null,
        body:
          "아바스의 권력이 약해지면서 새로운 이슬람 국가들이 일어났는데, 흔히 이슬람으로 개종한 뒤 통치한 튀르크계 군사 집단이 이끌었어요. 권력은 군인과 술탄에게 넘어갔고, 칼리프는 종교적 상징 인물로 남았습니다.",
        keyIdea:
          "정치 지도는 쪼개졌지만, 이슬람·아랍어·교역이 이슬람 세계를 문화적으로 연결한 채 유지했어요 — 바로 그게 '다르 알이슬람'의 핵심입니다.",
        table: {
          headers: ["국가", "비고"],
          rows: [
            ["아바스 칼리프국 (Abbasid Caliphate)", "쇠퇴 중; 칼리프가 상징 인물이 됨"],
            ["셀주크 튀르크 (Seljuk Turks)", "정치·군사 권력을 장악한 튀르크 집단"],
            ["맘루크 (Mamluks, 이집트)", "옛 노예 군인들이 통치한 국가"],
            ["델리 술탄국 (Delhi Sultanate)", "북인도에 이슬람 통치가 수립됨"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "학문의 황금기",
        subtitle: null,
        body:
          "바그다드의 지혜의 집(House of Wisdom) 같은 중심지의 학자들은 그리스·로마 문헌을 번역·보존했고(이는 후에 유럽으로 흘러가 르네상스를 촉발하는 데 일조했죠), 수학(대수학), 천문학, 의학에서 독창적인 진전을 이뤘어요. 이 지적 융성은 분열된 국가들이 함께 물려받은 공동 유산이었습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "다르 알이슬람 (Dar al-Islam)",
            def: "'이슬람의 집' — 이슬람 신앙으로 통일된 땅과 공동체.",
          },
          {
            term: "지혜의 집 (House of Wisdom)",
            def: "고전 지식을 보존하고 확장한 바그다드의 학문 중심지.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "이슬람은 어떻게 퍼졌나",
        subtitle: null,
        body:
          "이슬람은 정복보다 연결을 통해 확장됐어요. 이슬람 상인들이 교역로를 따라 신앙을 실어 날랐고, 수피즘(Sufism) — 신비주의적이고 유연한 형태의 이슬람 — 은 아프리카와 남·동남아시아 전역에서 현지 문화와 어우러지며 개종자를 얻었습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "수피즘 (Sufism)",
            def: "신비주의 이슬람으로, 유연하고 개인적인 영성이 교역로를 따라 개종을 쉽게 했다.",
          },
        ],
        traps: [
          "'분열'은 '정치적'이고, '통일'은 '문화적/종교적'입니다. 시험은 이 둘을 의도적으로 대비시켜요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u1-l3",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 1,
    lessonNum: 3,
    unitName: "The Global Tapestry (c. 1200–1450)",
    title: "남아시아와 동남아시아 — 힌두교, 불교, 그리고 교역",
    subtitle:
      "종교적으로 다양한 국가들 — 그 다수는 인도양 교역(Indian Ocean trade) 장악으로 세워지고 부유해졌어요.",
    overview:
      "이 시대 남아시아와 동남아시아는 힌두교, 불교, 그리고 점점 커지는 이슬람 세력에 의해 형성됐어요 — 그리고 무엇보다 교역이 컸습니다. 바다 기반 국가들은 지나가는 배에 세금을 매겨 부유해졌고, 육지 기반 왕국들은 거대한 사원을 세웠어요.",
    objectives: [
      "남아시아의 종교적 다양성과 상호작용(힌두·불교·이슬람)을 서술할 수 있다.",
      "동남아시아의 바다 기반 국가와 육지 기반 국가를 대비할 수 있다.",
      "인도양 교역이 이 국가들을 어떻게 형성했는지 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "남아시아: 많은 신앙, 하나의 아대륙",
        subtitle: null,
        body:
          "힌두교가 여전히 우세했지만, 델리 술탄국(Delhi Sultanate)은 북부에 이슬람 통치를 가져와 수 세기에 걸친 힌두–무슬림의 상호작용(그리고 긴장)을 낳았어요. 모든 카스트가 다가갈 수 있는 신에 대한 개인적 헌신을 강조한 박티 운동(bhakti movement)은 수피즘의 감성적 영성과 닮았습니다 — 둘 다 종교를 더 개인적으로 만들고 사회적 장벽을 넘었어요.",
        keyIdea:
          "박티(힌두)와 수피즘(이슬람)은 둘 다 누구에게나 열린 개인적 헌신을 강조했어요 — 두 신앙 사이를 잇는 조용한 다리였죠.",
        table: null,
        terms: [
          {
            term: "박티 운동 (Bhakti movement)",
            def: "신에 대한 개인적 사랑을 강조하고 카스트를 넘어 열린 힌두 신앙 운동.",
          },
          {
            term: "델리 술탄국 (Delhi Sultanate)",
            def: "북인도 상당 부분을 통치한 이슬람 왕조들 (1206–1526).",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "동남아시아: 바다 국가 대 육지 국가",
        subtitle: null,
        body:
          "지리가 이 지역을 두 종류의 권력으로 갈랐어요. 바다 기반 국가는 핵심 해협을 통과하는 해상 교역을 장악하고 세금을 매겨 부유해졌고, 육지 기반 국가는 농업에서 부를 끌어내 거대한 사원 복합단지를 세웠습니다.",
        keyIdea:
          "바다 기반 국가 = '교역' 통행세에서 나온 부; 육지 기반 국가 = '농업'과 기념비적 건축에서 나온 부.",
        table: {
          headers: ["국가", "유형", "유명한 점"],
          rows: [
            ["스리비자야 (Srivijaya)", "바다 기반 (불교)", "말라카 해협을 지나는 배에 과세"],
            ["마자파힛 (Majapahit)", "바다 기반 (불교)", "교역을 장악한 자바 기반 해상 세력"],
            ["크메르 제국 (Khmer Empire)", "육지 기반 (힌두→불교)", "앙코르 와트(Angkor Wat) 사원 복합단지"],
            ["수코타이 (Sukhothai)", "육지 기반 (불교)", "초기 태국 왕국"],
          ],
        },
        terms: [],
        traps: [
          "앙코르 와트(Angkor Wat)는 '힌두'로 시작했다가 후에 불교가 됐어요 — 교역과 접촉을 통한 종교 융합(syncretism)의 전형적 예입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u1-l4",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 1,
    lessonNum: 4,
    unitName: "The Global Tapestry (c. 1200–1450)",
    title: "말리 제국 (Mali Empire) — 사하라 횡단 교역과 이슬람",
    subtitle:
      "금과 소금으로 워낙 부유해서, 한 왕의 순례가 대륙 너머의 경제를 뒤흔든 서아프리카 제국.",
    overview:
      "말리(Mali)는 사하라 횡단 교역(trans-Saharan trade)을 장악하며 서아프리카에서 일어섰어요 — 낙타 대상(隊商)이 사막을 가로질러 금을 북쪽으로, 소금을 남쪽으로 날랐죠. 그 교역에 세금을 매긴 덕에 말리 통치자들은 어마어마하게 부유해졌고, 이는 이 지역 엘리트층에 이슬람이 퍼지는 데 일조했습니다.",
    objectives: [
      "사하라 횡단 금–소금 교역이 어떻게 말리에 동력을 댔는지 설명할 수 있다.",
      "만사 무사(Mansa Musa)의 역할과 서아프리카 이슬람 전파를 서술할 수 있다.",
      "이슬람과 전통 신앙의 혼합을 인식할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "금과 소금에서 나온 부",
        subtitle: null,
        body:
          "사하라는 낙타 대상이 가로지른 모래의 바다였어요 — 낙타와 낙타 안장이 그 길을 가능하게 했죠. 서아프리카는 금이 풍부했지만 소금이 필요했고(보존과 건강을 위해), 북아프리카는 소금이 있고 금을 갈망했습니다. 말리는 그 교환의 길목에 걸터앉아 세금을 매겼어요.",
        keyIdea:
          "말리는 모든 걸 '생산'할 필요가 없었어요 — 지나가는 교역을 '장악'하고 과세함으로써 부유해진 거죠.",
        table: {
          headers: ["북쪽으로 흐른 것", "남쪽으로 흐른 것"],
          rows: [
            ["금", "소금"],
            ["노예가 된 사람들, 상아", "직물, 말, 책"],
            ["", "이슬람 (상인들이 실어 나름)"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "만사 무사와 이슬람",
        subtitle: null,
        body:
          "말리의 가장 유명한 통치자 만사 무사(Mansa Musa)는 1324년 메카로 순례(하지, hajj)를 떠났는데, 가는 길에 금을 워낙 많이 나눠줘 이집트에 인플레이션을 일으켰다고 전해져요. 그는 학자와 건축가를 데려와 팀북투(Timbuktu)를 명성 높은 이슬람 학문 중심지로 만들었습니다. 이슬람은 엘리트를 통일했고 말리를 더 넓은 다르 알이슬람과 연결했어요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "사하라 횡단 교역 (Trans-Saharan trade)",
            def: "사하라를 가로질러 서아프리카 금을 소금·물품과 교환한 낙타 대상 교역.",
          },
          {
            term: "만사 무사 (Mansa Musa)",
            def: "1324년 하지로 제국의 막대한 부를 과시한 말리 통치자.",
          },
          {
            term: "팀북투 (Timbuktu)",
            def: "유명한 이슬람 학문 중심지가 된 말리의 도시.",
          },
        ],
        traps: [
          "이슬람은 주로 '통치자'와 상인 사이에 퍼졌어요; 많은 평민은 전통 신앙을 유지했습니다(혼합적 융합).",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u1-l5",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 1,
    lessonNum: 5,
    unitName: "The Global Tapestry (c. 1200–1450)",
    title: "유럽 접촉 이전의 아메리카 — 아스텍과 잉카",
    subtitle:
      "아프로-유라시아와 단절된 채, 수백만을 다스리는 문제를 놀랍도록 다른 방식으로 풀어낸 두 강력한 제국.",
    overview:
      "아프로-유라시아가 대양을 가로질러 교역하는 동안, 아메리카는 따로 발전했어요. 두 제국이 지배했습니다 — 메소아메리카의 아스텍(Aztec)과 안데스의 잉카(Inca)예요. 둘 다 노동과 공물 체계로 수백만을 다스렸지만, 그 방식은 달랐어요.",
    objectives: [
      "아스텍의 정치·경제·종교 조직을 서술할 수 있다.",
      "잉카의 행정(도로, 미타, 키푸)을 서술할 수 있다.",
      "각 제국이 자원과 노동을 어떻게 추출했는지 비교할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "아스텍과 잉카를 나란히",
        subtitle: null,
        body:
          "아스텍은 수도 테노치티틀란(Tenochtitlan)을 호수 위에 세웠고, 치남파(chinampas, 떠 있는 정원)로 농사를 지으며 정복한 민족에게 부과한 공물 체계(tribute system)로 국가를 운영했어요. 잉카는 안데스를 따라 뻗어, 거대한 도로망, 미타(mit'a)라는 노동세, 그리고 매듭 끈(키푸, quipu)으로 한 기록 관리로 묶여 있었습니다 — 그것도 문자 체계 없이요.",
        keyIdea:
          "두 제국 모두 '노동'과 '공물'을 추출해 거대한 인구를 지탱했어요 — 아스텍은 물품으로, 잉카는 의무 노동으로.",
        table: {
          headers: ["특징", "아스텍", "잉카"],
          rows: [
            ["지역", "메소아메리카 (멕시코)", "안데스 (남아메리카)"],
            ["수도", "테노치티틀란 (호수 위)", "쿠스코 (Cusco)"],
            ["국가 재원", "정복한 민족의 공물", "미타 (노동세)"],
            ["기록", "그림 문자", "키푸 (매듭 끈)"],
            ["농업 위업", "치남파 (떠 있는 정원)", "계단식 산비탈"],
          ],
        },
        terms: [
          {
            term: "치남파 (Chinampas)",
            def: "집약 농업을 가능하게 한 아스텍의 떠 있는 정원 경작지.",
          },
          {
            term: "미타 (Mit'a)",
            def: "도로·계단밭·건축에 쓰인 잉카의 의무 공공 노동세.",
          },
          {
            term: "키푸 (Quipu)",
            def: "기록 관리를 위한 잉카의 매듭 끈 체계 (문자 체계 없음).",
          },
        ],
        traps: [],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u1-l6",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 1,
    lessonNum: 6,
    unitName: "The Global Tapestry (c. 1200–1450)",
    title: "후고전 국가 비교 — 연속성의 패턴",
    subtitle:
      "중국, 이슬람 세계, 인도, 아프리카, 아메리카를 가로질러, 통치자들은 똑같은 세 가지 권력 도구에 손을 뻗었어요.",
    overview:
      "이 종합 수업은 개별 국가에서 한 걸음 물러나 패턴을 봅니다. 거대한 차이에도 불구하고, 송 왕조 중국부터 말리, 잉카까지 국가들은 공통의 도구 세트로 통치를 정당화하고 재원을 댔어요 — 관료제(bureaucracy), 종교(religion), 그리고 교역/공물(trade/tribute).",
    objectives: [
      "국가들이 권력을 정당화하고 공고히 하는 데 쓴 공통 방법을 식별할 수 있다.",
      "신념 체계가 지역을 가로질러 정치 질서를 어떻게 강화했는지 설명할 수 있다.",
      "후고전 세계의 연속성과 변화를 분석할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "공유된 권력의 도구 세트",
        subtitle: null,
        body:
          "국가들을 비교하면 패턴이 확 드러나요 — 각 국가는 통치를 위해 행정을 썼고, 통치를 정당화하려 신념 체계를 썼으며, 그 비용을 대려 교역이나 공물을 썼습니다. 구체적인 내용은 달랐지만, 전략은 같았어요.",
        keyIdea:
          "관료제 + 종교 + 교역/공물 = 이 시대에 거대한 국가를 하나로 묶는 보편적 레시피.",
        table: {
          headers: ["국가", "통치를 정당화한 수단", "통치 재원을 댄 수단"],
          rows: [
            ["송 왕조 중국 (Song China)", "신유학, 시험 기반 관료제", "상업, 세금"],
            ["다르 알이슬람 국가들", "이슬람", "지역 간 교역"],
            ["델리 술탄국 (Delhi Sultanate)", "힌두 다수 위의 이슬람", "토지세"],
            ["말리 (Mali)", "이슬람 + 전통적 권위", "사하라 횡단 교역 통행세"],
            ["아스텍 / 잉카 (Aztec / Inca)", "국가 종교", "공물 / 미타 노동"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "연속성과 변화",
        subtitle: null,
        body:
          "연속성: 주요 신념 체계(유교, 이슬람, 힌두교, 불교)와 장거리 교역망이 지속되고 더 깊어졌어요. 변화: '누가' 통치하느냐가 바뀌었습니다 — 새로운 집단(튀르크계, 곧이어 몽골)이 권력을 장악했고, 국가는 더 커지고 상업적으로 더 연결됐어요.",
        keyIdea:
          "종합 문제가 '연속성 대 변화'를 물으면, 신념 체계 & 교역 = 연속성; 통치 집단 & 규모 = 변화입니다.",
        table: null,
        terms: [
          {
            term: "정당성 (Legitimacy)",
            def: "통치할 권리에 대한 인정으로, 종종 종교나 전통이 부여한다.",
          },
          {
            term: "공물 체계 (Tribute system)",
            def: "국가 재원을 대려 종속 민족에게서 물품/노동을 추출하는 것.",
          },
        ],
        traps: [],
        example: null,
      },
    ],
  },
];
