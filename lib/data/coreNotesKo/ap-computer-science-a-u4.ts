/**
 * Core Notes 한국어 스토리텔링 버전 — AP Computer Science A Unit 4 (Iteration, 4.1–4.7).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram·traps·terms 포함) + 일타강사 내러티브.
 * 코딩 과목: Java 코드·키워드·타입명·식별자는 영문 그대로 유지, 설명 산문만 한국어로 번역.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_COMPUTER_SCIENCE_A_U4_KO: CoreNote[] = [
  {
    lessonId: "ap-computer-science-a-u4-l1",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 4,
    lessonNum: 1,
    unitName: "Iteration",
    title: "while 루프 — 추적하고 예측하기",
    subtitle: null,
    overview: null,
    objectives: [
      "while 조건은 매 반복 직전에 평가되고, 조건이 false가 되면 루프를 빠져나간다.",
      "조건이 절대 false가 되지 않으면 무한 루프(infinite loop)가 발생한다.",
      "루프 종료를 보장하려면 루프 변수(loop variable)를 갱신해야 한다.",
    ],
    formulas: ["sum(1..n)=n(n+1)/2", "while checks before each pass"],
    diagram: null,
    sections: [
      {
        title: "while 루프 — 추적하고 예측하기",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "while 조건이 '매 반복 직전'에 검사된다는 사실을 잊지 마세요 — 루프에 처음 들어갈 때만 검사하는 게 아닙니다. 루프 몸체 중간에서 갱신이 조건을 false로 만들더라도, 그 반복의 나머지 몸체는 끝까지 실행됩니다. 검사는 어디까지나 루프 맨 위(top)에서 일어나니까요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u4-l2",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 4,
    lessonNum: 2,
    unitName: "Iteration",
    title: "for 루프 — 구조와 등가성",
    subtitle: null,
    overview: null,
    objectives: [
      "Iteration 단원의 핵심 — for 루프의 구조와 등가성(Structure and Equivalence)을 완전히 익힌다.",
    ],
    formulas: ["sum(1..n)=n(n+1)/2", "while checks before each pass"],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "for(init; condition; update)",
            def: "세 부분(초기화·조건·갱신)과 그 실행 순서.",
          },
          {
            term: "하나 차이 오류 (Off-by-one errors)",
            def: "조건에서 < 와 <= 의 차이.",
          },
          {
            term: "중첩 for 루프 (Nested for loops)",
            def: "총 반복 횟수 = 바깥 루프 횟수 × 안쪽 루프 횟수.",
          },
        ],
        traps: [
          "루프 경계에서의 하나 차이(off-by-one) 오류 — for(int i=0; i<n; i++) 는 n번 실행됩니다(0부터 n-1까지). for(int i=1; i<=n; i++) 도 n번 실행되고요(1부터 n까지). AP는 배열 순회 루프를 자주 내는데, 여기서 < 냐 <= 냐가 마지막 원소를 처리하느냐 마느냐를 결정합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u4-l3",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 4,
    lessonNum: 3,
    unitName: "Iteration",
    title: "루프를 이용한 String 순회",
    subtitle: null,
    overview: null,
    objectives: [
      "루프 안에서 concatenation으로 결과 문자열을 쌓는 방식 vs. StringBuilder 사용.",
    ],
    formulas: ["sum(1..n)=n(n+1)/2", "while checks before each pass"],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "String 인덱싱 (String indexing)",
            def: "0 부터 length()-1 까지.",
          },
          {
            term: "순회하기 (Iterating)",
            def: "for(int i=0; i<s.length(); i++) 와 charAt(i).",
          },
        ],
        traps: [
          "루프 조건에 <= s.length() 를 쓰는 것 — 유효한 인덱스는 0부터 length()-1까지입니다. <= 를 쓰면 마지막 반복에서 StringIndexOutOfBoundsException 이 터져요. AP는 문자열 루프의 경계 조건(boundary condition)을 콕 집어 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u4-l4",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 4,
    lessonNum: 4,
    unitName: "Iteration",
    title: "루프 패턴 — 누적, 탐색, 카운트",
    subtitle: null,
    overview: null,
    objectives: [
      "Iteration 단원의 핵심 — 루프 패턴(누적·탐색·카운트, Accumulator, Search, Count)을 완전히 익힌다.",
    ],
    formulas: ["sum(1..n)=n(n+1)/2", "while checks before each pass"],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "누적 패턴 (Accumulator pattern)",
            def: "sum = 0; sum += element 처럼 값을 차곡차곡 쌓는다.",
          },
          {
            term: "탐색 패턴 (Search pattern)",
            def: "boolean found = false; 로 시작해 찾으면 true 로 설정한다.",
          },
          {
            term: "카운트 패턴 (Count pattern)",
            def: "조건이 충족될 때마다 count++ 한다.",
          },
        ],
        traps: [
          "누적 변수를 루프 시작 전에 초기화하지 않는 것 — sum 을 루프 '안'에서 선언하면 매 반복마다 0으로 리셋됩니다. AP는 초기화를 엉뚱한 위치에 둔 코드를 주고 그 버그 출력(buggy output)을 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u4-l5",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 4,
    lessonNum: 5,
    unitName: "Iteration",
    title: "중첩 루프 — 패턴과 출력",
    subtitle: null,
    overview: null,
    objectives: [
      "안쪽 루프의 반복 횟수가 바깥 루프 변수에 따라 달라진다.",
    ],
    formulas: ["sum(1..n)=n(n+1)/2", "while checks before each pass"],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "중첩 루프의 출력 패턴 (Output patterns from nested loops)",
            def: "삼각형(triangles), 격자(grids), 표(tables).",
          },
          {
            term: "중첩 루프의 시간 복잡도 (Time complexity of nested loops)",
            def: "n×n 순회의 경우 O(n²).",
          },
        ],
        traps: [
          "중첩 루프 출력을 잘못 추적하는 것 — 바깥 루프 변수와 안쪽 루프 변수를 '동시에' 따라가야 합니다. AP는 중첩 루프를 주고 정확히 무엇이 출력되는지를 묻는데, 흔한 실수가 줄바꿈(newline)과 공백(space)을 헷갈려 순서를 놓치는 것입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u4-l6",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 4,
    lessonNum: 6,
    unitName: "Iteration",
    title: "do-while 와 break/continue",
    subtitle: null,
    overview: null,
    objectives: [
      "Iteration 단원의 핵심 — do-while 과 break/continue 를 완전히 익힌다.",
    ],
    formulas: ["sum(1..n)=n(n+1)/2", "while checks before each pass"],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "do-while",
            def: "몸체가 최소 한 번은 실행된다. 조건은 끝(end)에서 검사된다.",
          },
          {
            term: "break",
            def: "가장 안쪽 루프(innermost loop)를 즉시 빠져나간다.",
          },
          {
            term: "continue",
            def: "가장 안쪽 루프의 다음 반복으로 건너뛴다.",
          },
        ],
        traps: [
          "break 가 모든 중첩 루프를 빠져나간다고 착각하는 것 — break 는 자신이 속한 '가장 안쪽' 루프만 빠져나갑니다. 여러 단계의 중첩을 한 번에 탈출하려면 플래그(flag) 변수나 라벨이 붙은 break(labeled break)가 필요해요. AP는 이중 중첩 루프로 이걸 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u4-l7",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 4,
    lessonNum: 7,
    unitName: "Iteration",
    title: "for-each 루프와 그 한계",
    subtitle: null,
    overview: null,
    objectives: [
      "for-each 로는 배열 원소를 수정할 수 없다(인덱스가 필요함).",
      "for-each 로는 거꾸로 순회하거나 원소를 건너뛸 수 없다.",
    ],
    formulas: ["sum(1..n)=n(n+1)/2", "while checks before each pass"],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "for(Type item",
            def: "collection): 인덱스 없이 간결하게 순회하는 방식.",
          },
        ],
        traps: [
          "인덱스가 필요한 루프에 for-each 를 쓰는 것 — for-each 는 위치(position)가 아니라 '값(value)'을 줍니다. 원소를 수정하거나 인덱스로 접근해야 한다면 일반 인덱스 for 루프를 써야 해요. AP는 인덱스 접근이 꼭 필요한 과제를 줍니다.",
        ],
        example: null,
      },
    ],
  },
];
