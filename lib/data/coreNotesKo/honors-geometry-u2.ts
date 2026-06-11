/**
 * Core Notes 한국어 스토리텔링 버전 — Honors Geometry Unit 2 (삼각형의 합동과 닮음).
 * 원본 내용 전량 보존(objectives·terms·traps·example) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_GEOMETRY_U2_KO: CoreNote[] = [
  {
    lessonId: "honors-geometry-u2-l1",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 2,
    lessonNum: 1,
    unitName: "삼각형의 합동과 닮음 (Triangle Congruence & Similarity)",
    title: "평행선과 횡단선 — 각의 관계를 지배하는 법칙",
    subtitle: "동위각·엇각·동측내각이 왜 성립하는지 '증명 가능한 언어'로 이해하는 순간 모든 각도 문제가 풀린다",
    overview:
      "학생들이 평행선 문제에서 가장 많이 하는 실수가 있어요 — '이 두 각이 같아 보이니까 같겠지'라는 직관에 의존하는 거예요. 하지만 시험에서 '왜 같은가'를 묻는 순간 직관은 아무 점수도 주지 않아요. 평행선(parallel lines)과 횡단선(transversal)이 만들 때 생기는 여덟 개의 각은 완벽하게 예측 가능한 세 가지 관계로 묶입니다 — 동위각(corresponding angles), 엇각(alternate interior angles), 동측내각(co-interior angles). 이 수업에서는 각 관계가 어떤 공준과 정리에서 출발하는지, 그리고 역방향으로 두 직선이 평행임을 증명하는 데 어떻게 활용하는지까지 완전히 체화해봐요.",
    objectives: [
      "평행선과 횡단선이 만나 생기는 여덟 개의 각에 각각 이름을 붙이고 위치 관계를 설명할 수 있다",
      "동위각 공준(Corresponding Angles Postulate)을 이용해 두 각이 합동임을 근거와 함께 서술할 수 있다",
      "엇각 정리(Alternate Interior Angles Theorem)와 동측내각 정리(Co-interior Angles Theorem)를 이단 증명에서 이유로 정확히 사용할 수 있다",
      "두 직선이 평행하기 위한 조건(역 정리)을 서술하고, 각도 관계로부터 두 직선이 평행한지 판단할 수 있다",
      "미지수가 포함된 각도 표현이 주어졌을 때 평행선 관계를 이용해 방정식을 세우고 x를 구할 수 있다",
    ],
    formulas: [
      "동위각 (Corresponding Angles): l ∥ m이면 ∠1 = ∠5 (위치가 같은 쪽)",
      "엇각 (Alternate Interior Angles): l ∥ m이면 ∠3 = ∠6 (평행선 안쪽, 반대편)",
      "동측내각 (Co-interior / Same-Side Interior): l ∥ m이면 ∠3 + ∠5 = 180°",
    ],
    sections: [
      {
        title: "평행선과 횡단선이 만드는 각의 쌍",
        subtitle: "여덟 개의 각을 세 그룹으로 분류하면 — 동위각·엇각·동측내각의 위치 논리",
        terms: [
          {
            term: "횡단선 (Transversal)",
            def: "두 개 이상의 직선을 서로 다른 점에서 가로지르는 직선. 평행선과 횡단선이 교차하면 두 교점에서 각각 네 개씩, 총 여덟 개의 각이 생깁니다. 이 여덟 각은 위치에 따라 내각(interior, 두 평행선 사이)과 외각(exterior, 두 평행선 바깥)으로 먼저 분류됩니다.",
          },
          {
            term: "동위각 (Corresponding angles)",
            def: "횡단선이 두 직선과 만날 때 같은 상대적 위치(왼쪽 위, 오른쪽 위 등)에 놓인 각의 쌍. 두 직선이 평행하면 동위각은 합동입니다(동위각 공준, Corresponding Angles Postulate). 예: ∠1과 ∠5 (둘 다 왼쪽 위 위치).",
          },
          {
            term: "엇각 (Alternate interior angles)",
            def: "두 직선 사이(내각)에 있으며 횡단선을 기준으로 서로 반대편에 놓인 각의 쌍. 두 직선이 평행하면 엇각은 합동입니다(엇각 정리, Alternate Interior Angles Theorem). 이 정리는 동위각 공준으로부터 맞꼭지각 정리를 경유해 증명됩니다.",
          },
          {
            term: "동측내각 (Co-interior / Same-side interior angles)",
            def: "두 직선 사이(내각)에 있으며 횡단선의 같은 쪽에 놓인 각의 쌍. 두 직선이 평행하면 동측내각의 합은 정확히 180°(보각)입니다(동측내각 정리, Co-interior Angles Theorem). '동측내각은 보각'이라고 암기하세요.",
          },
        ],
        traps: [
          "동위각(corresponding)과 엇각(alternate interior)을 그림 없이 이름만으로 혼동하는 학생이 많아요. 핵심은 위치입니다 — 동위각은 '같은 쪽, 같은 층', 엇각은 '다른 쪽, 안쪽'입니다. 문제에서 두 각이 평행선 바깥에 있으면 엇각이 아니라 엇외각(alternate exterior angles)이므로 내각·외각 구분을 먼저 하고 나서 공준·정리를 적용하세요.",
          "평행선의 역 정리를 증명 이유로 쓸 때 방향에 주의하세요. '평행 → 동위각 합동'은 공준이고, '동위각 합동 → 평행'은 역(Converse of the Corresponding Angles Postulate)으로 별도의 명칭이 있습니다. 두 직선이 평행임을 증명하는 문제에서는 반드시 역 버전(Converse)을 이유로 써야 원래 공준을 쓰면 채점자에게 논리가 역방향임을 지적받습니다.",
        ],
        example:
          "두 평행선 l ∥ m을 횡단선이 지납니다. ∠3 = 4x + 10이고 ∠5 = 2x + 50일 때, x와 각도를 구해봐요. ∠3과 ∠5는 동측내각(co-interior angles)이므로 합이 180°입니다. (4x + 10) + (2x + 50) = 180, 6x + 60 = 180, 6x = 120, x = 20. 따라서 ∠3 = 4(20) + 10 = 90°, ∠5 = 2(20) + 50 = 90°. 검증: 90 + 90 = 180° ✓. '두 각이 같아서 엇각인가, 합이 180이어서 동측내각인가'를 먼저 판단하는 습관이 풀이 속도를 크게 높여줘요.",
      },
      {
        title: "평행선의 역 정리 — 두 직선이 평행임을 증명하는 도구",
        subtitle: "각의 관계로부터 평행성을 '역방향으로' 추론하는 논리를 이단 증명에 통합한다",
        terms: [
          {
            term: "동위각 공준의 역 (Converse of Corresponding Angles Postulate)",
            def: "횡단선이 두 직선과 만날 때 동위각이 합동이면, 두 직선은 평행합니다. 이 역 공준은 평행 여부를 증명하는 문제에서 핵심 이유로 사용됩니다. 증명 방향이 '각 → 평행'임에 주의하세요.",
          },
          {
            term: "엇각 정리의 역 (Converse of Alternate Interior Angles Theorem)",
            def: "횡단선이 두 직선과 만날 때 엇각이 합동이면, 두 직선은 평행합니다. 동위각 공준의 역으로부터 도출되는 정리입니다. '엇각 합동 → 평행'의 방향으로만 사용하세요.",
          },
          {
            term: "동측내각 정리의 역 (Converse of Co-interior Angles Theorem)",
            def: "횡단선이 두 직선과 만날 때 동측내각의 합이 180°이면, 두 직선은 평행합니다. 동측내각이 보각임을 확인하면 평행성을 결론으로 도출할 수 있습니다.",
          },
        ],
        traps: [
          "역 정리를 사용할 때 '어느 두 직선이 평행한가'를 명확히 명시하세요. 횡단선이 세 직선과 만나는 복잡한 다이어그램에서는 어떤 쌍이 평행한지 혼동하기 쉬워요. 근거로 쓰는 역 정리의 이름 뒤에 반드시 '∴ l ∥ m'처럼 구체적인 직선 이름을 결론으로 써야 이단 증명에서 감점을 피할 수 있어요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-geometry-u2-l2",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 2,
    lessonNum: 2,
    unitName: "삼각형의 합동과 닮음 (Triangle Congruence & Similarity)",
    title: "삼각형 합동 — SSS·SAS·ASA·AAS·HL과 CPCTC",
    subtitle: "다섯 가지 합동 조건을 외우는 것이 아니라, '최소 정보로 삼각형이 유일하게 결정되는 이유'를 이해하는 수업",
    overview:
      "기하 증명에서 가장 많이 나오는 패턴이 '두 삼각형이 합동 → 따라서 이 변(또는 각)이 같다'는 흐름이에요. 그런데 학생들이 자주 저지르는 실수가 있어요 — 합동을 먼저 쓰고 CPCTC를 결론으로 내리는 것까지는 맞는데, 합동 조건 자체를 잘못 적용하는 거예요. SSS(세 변), SAS(두 변·끼인각), ASA(두 각·끼인변), AAS(두 각·이웃하지 않은 변), HL(직각삼각형의 빗변과 한 변) — 이 다섯 조건은 외우는 것이 아니라 '왜 이 정보만으로 삼각형이 유일하게 결정되는가'를 이해해야 증명에서 올바르게 선택할 수 있습니다. SSA와 AAA가 합동 조건이 아닌 이유도 함께 마스터해봐요.",
    objectives: [
      "SSS·SAS·ASA·AAS·HL 다섯 가지 삼각형 합동 조건을 각각 정의하고 어떤 정보가 주어졌을 때 적용 가능한지 판단할 수 있다",
      "두 삼각형이 합동임을 이단 증명에서 단계별 근거와 함께 완성할 수 있다",
      "CPCTC(Corresponding Parts of Congruent Triangles are Congruent)를 합동 증명 이후의 결론 단계에서 올바르게 사용할 수 있다",
      "SSA와 AAA가 합동 조건이 되지 않는 반례를 설명할 수 있다",
      "반사 성질(Reflexive Property)을 이용해 두 삼각형의 공통 변 또는 공통 각이 합동임을 정당화할 수 있다",
    ],
    sections: [
      {
        title: "다섯 가지 합동 조건 — SSS, SAS, ASA, AAS, HL",
        subtitle: "어떤 조건이 삼각형을 유일하게 결정하는가 — 각 조건의 논리와 적용 기준",
        terms: [
          {
            term: "SSS 합동 (SSS Congruence Postulate)",
            def: "두 삼각형의 세 쌍의 대응하는 변이 모두 합동이면 두 삼각형은 합동입니다. AB = DE, BC = EF, CA = FD이면 △ABC ≅ △DEF. 세 변의 길이가 삼각형의 모양과 크기를 완전히 결정하기 때문에 성립합니다.",
          },
          {
            term: "SAS 합동 (SAS Congruence Postulate)",
            def: "두 쌍의 대응하는 변이 합동이고 그 끼인각(included angle, 두 변 사이의 각)이 합동이면 두 삼각형은 합동입니다. AB = DE, ∠B = ∠E, BC = EF이면 △ABC ≅ △DEF. '끼인각'이 핵심 — 두 변 사이에 있지 않은 각이면 SAS가 아닙니다.",
          },
          {
            term: "ASA 합동 (ASA Congruence Postulate)",
            def: "두 쌍의 대응하는 각이 합동이고 그 끼인변(included side, 두 각 사이의 변)이 합동이면 두 삼각형은 합동입니다. ∠A = ∠D, AB = DE, ∠B = ∠E이면 △ABC ≅ △DEF. 끼인변은 두 각 모두에 인접한 변입니다.",
          },
          {
            term: "AAS 합동 (AAS Congruence Theorem)",
            def: "두 쌍의 대응하는 각이 합동이고 그 끼인변이 아닌 한 쌍의 대응하는 변이 합동이면 두 삼각형은 합동입니다. ∠A = ∠D, ∠B = ∠E, BC = EF이면 △ABC ≅ △DEF. 삼각형 내각의 합이 180°이므로 세 번째 각도 결정되어 ASA로 환원됩니다.",
          },
          {
            term: "HL 합동 (HL Congruence Theorem)",
            def: "직각삼각형에서 빗변(hypotenuse)과 한 쌍의 다리(leg)가 합동이면 두 직각삼각형은 합동입니다. 직각삼각형임을 먼저 명시해야 적용 가능하며, 피타고라스 정리로 세 번째 변을 결정할 수 있기 때문에 성립합니다.",
          },
        ],
        traps: [
          "SAS와 SSA를 혼동하지 마세요. SAS는 두 변 사이에 각이 있어야 하고, SSA(두 변과 끼인각이 아닌 각)는 삼각형을 유일하게 결정하지 못합니다 — 주어진 정보에 부합하는 삼각형이 두 개 존재할 수 있어서 합동 조건이 아니에요. 증명에서 두 변과 한 각이 나왔을 때 '각이 두 변 사이에 있는가'를 반드시 확인하고 SAS를 적용하세요.",
          "합동 표기에서 꼭짓점 순서가 곧 대응 관계입니다. △ABC ≅ △DEF라고 쓰면 A↔D, B↔E, C↔F가 대응함을 선언하는 거예요. 순서가 다른 합동 표기(예: △ABC ≅ △EDF)는 다른 대응 관계를 의미하므로, 증명에서 합동 표기를 쓸 때 대응 꼭짓점 순서를 신중하게 맞추세요. 이 순서를 틀리면 후속 CPCTC 단계에서 틀린 변·각을 주장하게 됩니다.",
        ],
        example:
          "주어진 정보: $\\overline{AB} \\cong \\overline{DC}$, $\\overline{BC} \\cong \\overline{CB}$ (공통변), ∠ABC와 ∠DCB는 직각. 증명: △ABC ≅ △DCB, 그리고 AC = DB.\n\n| 진술 | 이유 |\n|---|---|\n| 1. ∠ABC = 90°, ∠DCB = 90° | 1. Given |\n| 2. △ABC와 △DCB는 직각삼각형 | 2. 직각삼각형의 정의 |\n| 3. $\\overline{AB} \\cong \\overline{DC}$ | 3. Given |\n| 4. $\\overline{BC} \\cong \\overline{CB}$ | 4. 반사 성질 (Reflexive Property) |\n| 5. △ABC ≅ △DCB | 5. HL 합동 정리 |\n| 6. $\\overline{AC} \\cong \\overline{DB}$ | 6. CPCTC |\n\n이 증명의 핵심 흐름은 '직각 확인 → 빗변·다리 확인 → HL → CPCTC'입니다. CPCTC는 반드시 합동 확정 이후 단계에서만 쓸 수 있어요.",
      },
      {
        title: "CPCTC와 증명 전략",
        subtitle: "합동이 확정된 순간 열리는 도구 — CPCTC를 증명의 마지막 단계로 설계하는 방법",
        terms: [
          {
            term: "CPCTC (Corresponding Parts of Congruent Triangles are Congruent)",
            def: "두 삼각형이 합동임이 증명된 이후, 대응하는 변이나 각이 합동임을 주장하는 근거. 증명의 흐름은 항상 '(1) 두 삼각형 합동 증명 → (2) CPCTC로 원하는 변·각 합동 도출'의 순서입니다. CPCTC는 합동 선언 이전에 단독으로 사용할 수 없습니다.",
          },
          {
            term: "반사 성질 (Reflexive Property of Congruence)",
            def: "어떤 선분 또는 각이든 자기 자신과 합동입니다($\\overline{AB} \\cong \\overline{AB}$). 두 삼각형이 변을 공유할 때 그 공통변이 합동임을 정당화하는 유일한 근거입니다. 증명 다이어그램에서 두 삼각형이 같은 변을 공유하면 반사 성질을 반드시 한 단계로 명시하세요.",
          },
          {
            term: "합동 삼각형의 대응 (Correspondence in congruent triangles)",
            def: "두 삼각형이 합동일 때 대응하는 꼭짓점·변·각의 쌍. △ABC ≅ △PQR이면 ∠A ↔ ∠P, ∠B ↔ ∠Q, ∠C ↔ ∠R이고 $\\overline{AB} \\cong \\overline{PQ}$, $\\overline{BC} \\cong \\overline{QR}$, $\\overline{CA} \\cong \\overline{RP}$. 합동 기호의 꼭짓점 순서가 대응 관계를 완전히 정의합니다.",
          },
        ],
        traps: [
          "CPCTC를 합동 증명의 도중에 사용하려는 실수를 피하세요. 예를 들어 '이 각이 같으니 SAS를 쓸 수 있다'고 주장하면서 그 근거로 CPCTC를 사용하면 순환 논리(circular reasoning)가 됩니다. CPCTC는 반드시 합동이 완전히 확정된 다음 줄부터만 사용할 수 있어요. 증명을 쓸 때 마지막에서 두 번째 줄이 합동 조건, 마지막 줄이 CPCTC가 되도록 계획하고 시작하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "honors-geometry-u2-l3",
    courseId: "honors-geometry",
    subjectLabel: "Honors Geometry",
    emoji: "📐",
    unit: 2,
    lessonNum: 3,
    unitName: "삼각형의 합동과 닮음 (Triangle Congruence & Similarity)",
    title: "삼각형 닮음 — AA·SAS·SSS 닮음, 비율, 닮음비",
    subtitle: "합동이 '크기까지 같다'라면, 닮음은 '모양만 같다' — 그 차이 하나가 비율·비례 계산 전체를 바꾼다",
    overview:
      "닮음(similarity)은 합동의 완화된 버전처럼 보이지만, 실제로는 더 넓은 범위에서 활용되는 강력한 도구예요. 닮음비(scale factor)만 알면 대응하는 변의 길이를 모두 계산할 수 있고, 도달할 수 없는 높이나 거리를 간접 측정하는 데도 쓰입니다. AA(두 쌍의 각이 같으면 닮음)는 각이 두 개만 일치해도 삼각형의 모양이 완전히 결정된다는 놀라운 원리에서 출발합니다. 이 수업에서는 세 가지 닮음 조건, 비례식 설정 방법, 그리고 닮음 삼각형에서 자주 나오는 비례 관계(평행선 비례 정리 포함)까지 완성해봐요.",
    objectives: [
      "AA·SAS·SSS 세 가지 삼각형 닮음 조건을 각각 정의하고, 주어진 정보에서 어떤 조건이 적용 가능한지 판단할 수 있다",
      "두 닮음 삼각형의 대응하는 변 사이의 비율(닮음비, scale factor)을 구하고, 이를 이용해 미지의 변 길이를 계산할 수 있다",
      "비례식(proportion)을 세우고 교차 곱셈(cross-multiplication)으로 미지수를 풀 수 있다",
      "평행선 비례 정리(Triangle Proportionality Theorem)를 적용해 삼각형 내부에서 비례 관계를 분석할 수 있다",
      "닮음 삼각형의 둘레·넓이 비가 닮음비 및 닮음비의 제곱에 각각 비례함을 설명하고 계산에 적용할 수 있다",
    ],
    formulas: [
      "닮음비 (Scale factor): k = (대응하는 변의 길이의 비) e.g. AB/DE = BC/EF = CA/FD = k",
      "둘레의 비 = 닮음비 k",
      "넓이의 비 = 닮음비의 제곱 k²",
      "평행선 비례 정리: △ABC에서 DE ∥ BC이면 AD/DB = AE/EC",
    ],
    sections: [
      {
        title: "세 가지 닮음 조건 — AA, SAS 닮음, SSS 닮음",
        subtitle: "각이 둘만 같아도 닮음이 결정되는 이유 — 닮음 조건의 논리 구조와 적용 기준",
        terms: [
          {
            term: "AA 닮음 (AA Similarity Postulate)",
            def: "두 삼각형에서 두 쌍의 대응하는 각이 합동이면 두 삼각형은 닮음입니다. 삼각형의 내각의 합이 180°이므로 두 각이 결정되면 세 번째 각도 자동으로 결정됩니다 — 그래서 AA만으로 닮음이 성립해요. △ABC ~ △DEF로 표기합니다.",
          },
          {
            term: "SAS 닮음 (SAS Similarity Theorem)",
            def: "두 쌍의 대응하는 변의 비가 같고(비율 동일) 그 끼인각이 합동이면 두 삼각형은 닮음입니다. AB/DE = AC/DF이고 ∠A = ∠D이면 △ABC ~ △DEF. 합동의 SAS와 달리 변이 '같다'가 아니라 '비율이 같다'는 점에 주의하세요.",
          },
          {
            term: "SSS 닮음 (SSS Similarity Theorem)",
            def: "세 쌍의 대응하는 변의 비가 모두 같으면 두 삼각형은 닮음입니다. AB/DE = BC/EF = CA/FD이면 △ABC ~ △DEF. 비율이 모두 k(닮음비)로 일치함을 확인한 후 닮음 결론을 내립니다.",
          },
          {
            term: "닮음비와 비례식 (Scale factor & Proportion)",
            def: "닮음 삼각형에서 대응하는 변의 비가 모두 동일한 값 k를 닮음비(scale factor)라 합니다. 미지의 변 x를 구할 때는 비례식 a/b = c/x를 세우고 교차 곱셈(cross-multiplication, ax = bc)으로 풀어요.",
          },
        ],
        traps: [
          "SAS 닮음과 SAS 합동을 혼동하지 마세요. SAS 합동은 두 변의 '길이가 같고' 끼인각이 합동이지만, SAS 닮음은 두 변의 '비율이 같고' 끼인각이 합동입니다. 비율을 계산하지 않고 변의 길이만 비교해서 'SAS 닮음'이라고 쓰면 감점이에요. 반드시 두 비율 값을 계산해 일치함을 먼저 보이고, 그 다음 끼인각 합동을 확인하세요.",
          "닮음 표기의 꼭짓점 순서는 합동 표기와 동일하게 대응 관계를 정의합니다. △ABC ~ △DEF에서 AB에 대응하는 변은 DE이지 EF나 FD가 아니에요. 비례식을 세울 때 대응 꼭짓점 순서를 따르지 않으면 완전히 다른 비율이 나와요. 닮음 기호 '~'를 쓰기 전에 꼭 대응 순서를 맞췄는지 다이어그램에서 한 번 더 확인하세요.",
        ],
        example:
          "△ABC에서 DE ∥ BC, AD = 6, DB = 4, AE = 9입니다. EC를 구하고 △ADE ~ △ABC를 증명해봐요.\n\n**EC 구하기**: 평행선 비례 정리에 의해 AD/DB = AE/EC이므로 6/4 = 9/EC, 교차 곱셈: 6·EC = 4·9 = 36, EC = 6.\n\n**닮음 증명 (이단)**:\n| 진술 | 이유 |\n|---|---|\n| 1. DE ∥ BC | 1. Given |\n| 2. ∠ADE = ∠ABC | 2. 동위각 (Corresponding Angles Postulate), DE ∥ BC |\n| 3. ∠A = ∠A | 3. 반사 성질 (Reflexive Property) |\n| 4. △ADE ~ △ABC | 4. AA 닮음 공준 |\n\n평행선이 등장하면 AA 닮음으로 연결하는 패턴은 시험에서 매우 자주 나오므로 이 흐름을 통째로 외워두세요.",
      },
      {
        title: "닮음비 응용 — 둘레·넓이 비와 간접 측정",
        subtitle: "닮음비 k 하나에서 둘레는 k배, 넓이는 k² 배가 나오는 이유와 실생활 활용",
        terms: [
          {
            term: "둘레와 넓이의 닮음비 (Perimeter and area ratios)",
            def: "닮음비가 k인 두 닮음 삼각형에서 둘레의 비는 k:1이고, 넓이의 비는 k²:1입니다. 예: 닮음비가 3:2이면 둘레의 비는 3:2이지만 넓이의 비는 9:4. 이 성질은 닮음 다각형 전체에 적용됩니다.",
          },
          {
            term: "평행선 비례 정리 (Triangle Proportionality Theorem)",
            def: "삼각형의 두 변에 각각 평행선을 그으면, 나뉜 선분의 비가 같습니다. △ABC에서 DE ∥ BC이면 AD/DB = AE/EC. 역으로, AD/DB = AE/EC이면 DE ∥ BC입니다(역 정리 사용 가능).",
          },
          {
            term: "간접 측정 (Indirect measurement)",
            def: "직접 측정할 수 없는 높이나 거리를 닮음 삼각형의 비례 관계로 구하는 방법. 예: 햇빛이 만드는 그림자의 비례, 지도의 축척(scale), 건물의 높이 측정. 현실 문제에서는 AA 닮음(평행 광선 + 직각)을 가장 많이 사용합니다.",
          },
        ],
        traps: [
          "넓이 비를 닮음비와 동일하게 쓰는 실수가 매우 흔해요. 닮음비가 2:3이면 넓이의 비는 2:3이 아니라 4:9입니다. '닮음비 = 길이의 비, 넓이의 비 = 닮음비의 제곱'을 공식으로 외우되, 문제에서 '두 도형의 넓이 비를 이용해 닮음비를 구하라'고 하면 제곱근을 취해야 한다는 점도 기억하세요. 즉, 넓이의 비가 25:36이면 닮음비는 5:6입니다.",
        ],
        example:
          "두 닮음 삼각형 △ABC ~ △DEF에서 닮음비(scale factor)가 3:5입니다. △ABC의 넓이가 27 cm²일 때, △DEF의 넓이를 구해봐요. 넓이의 비 = 닮음비의 제곱 = 3²:5² = 9:25. 비례식: 27/x = 9/25, 교차 곱셈: 9x = 27 × 25 = 675, x = 75 cm². 따라서 △DEF의 넓이는 75 cm²입니다. 닮음비가 분수 형태로 주어질 때도 같은 방법으로 제곱한 뒤 비례식을 세우면 돼요.",
      },
    ],
  },
];
