/**
 * Core Notes 한국어 스토리텔링 버전 — AP Computer Science A Unit 8 (8.1–8.3).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 코딩 과목 — Java 코드/키워드/식별자/타입명은 영어 원문 그대로, 설명 산문만 한국어.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_COMPUTER_SCIENCE_A_U8_KO: CoreNote[] = [
  {
    lessonId: "ap-computer-science-a-u8-l1",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 8,
    lessonNum: 1,
    unitName: "2D Array",
    title: "2D Array Creation and Access",
    subtitle: null,
    overview:
      "2차원 배열(2D array)은 표(행과 열)처럼 생긴 데이터 구조예요. Java에서는 사실 '배열의 배열'입니다 — int[][] grid = new int[rows][cols]; 처럼 선언하면, 바깥 배열이 각 행을 가리키고 그 행 안에 열 값들이 들어가요. 메모리에는 행 우선(row-major) 방식으로, 한 행을 통째로 깔고 다음 행을 까는 식으로 저장됩니다. 시험 함정: grid[i][j]에서 i가 행(바깥 인덱스), j가 열(안쪽 인덱스)이라는 순서를 헷갈리면 행렬 문제를 통째로 틀려요. grid.length는 행 개수, grid[0].length는 열 개수라는 것도 반드시 외워두세요.",
    objectives: [
      "int[][] grid = new int[rows][cols]; row-major storage",
    ],
    formulas: [],
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
            term: "접근 (Access)",
            def: "grid[row][col] 로 한 칸에 접근합니다. grid.length 는 행(rows) 개수, grid[0].length 는 열(cols) 개수예요.",
          },
          {
            term: "들쭉날쭉 배열 (Jagged arrays)",
            def: "각 행(row)의 길이가 서로 다를 수 있는 배열입니다.",
          },
        ],
        traps: [
          "2D 접근에서 행과 열을 혼동하는 것 — grid[i][j]에서 i는 행(바깥 인덱스), j는 열(안쪽 인덱스)입니다. grid.length는 행 개수, grid[0].length는 열 개수를 줘요. AP는 행렬(matrix) 문제로 이걸 자주 출제합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u8-l2",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 8,
    lessonNum: 2,
    unitName: "2D Array",
    title: "Nested Loops for 2D Traversal",
    subtitle: null,
    overview:
      "2차원 배열의 모든 칸을 훑으려면 반복문 하나로는 부족해요 — 중첩 반복문(nested loop)이 필요합니다. 바깥 for문이 행을 돌고, 안쪽 for문이 그 행 안의 열을 도는 게 표준이에요. 표준 패턴은 바깥 = 행 = i, 안쪽 = 열 = j 입니다. 시험 함정: 중첩 반복문에서 grid[row][col] 대신 grid[col][row]로 인덱스를 뒤집으면 전치(transpose)된 순회가 돼서 완전히 다른 모양이 나와요. AP는 순회 코드를 주고 '어떤 모양/패턴이 출력되는가'를 묻는 식으로 이걸 시험합니다.",
    objectives: [
      "Master Nested Loops for 2D Traversal for the 2D Array unit.",
    ],
    formulas: [],
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
            term: "행 우선 순회 (Row-major traversal)",
            def: "바깥 반복문이 행(rows)을 돌고, 안쪽 반복문이 열(columns)을 돕니다.",
          },
          {
            term: "열 우선 순회 (Column-major traversal)",
            def: "바깥 반복문이 열(columns)을 돌고, 안쪽 반복문이 행(rows)을 돕니다.",
          },
          {
            term: "대각선 순회 (Diagonal traversal)",
            def: "행 인덱스 = 열 인덱스 일 때(즉 grid[i][i])의 칸들을 순회합니다.",
          },
        ],
        traps: [
          "중첩 반복문에서 grid[row][col] 대신 grid[col][row]로 접근하는 것 — 표준은 바깥 = 행 = i, 안쪽 = 열 = j 입니다. 뒤집으면 전치(transposed)된 순회가 돼요. AP는 순회 코드를 주고 어떤 모양/패턴이 나오는지 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u8-l3",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 8,
    lessonNum: 3,
    unitName: "2D Array",
    title: "2D Array Algorithms — Searching, Summing, Transforming",
    subtitle: null,
    overview:
      "2차원 배열의 진짜 실력은 알고리즘에서 나와요 — 특정 값 찾기, 행/열/대각선 합 구하기, 배열을 90도 회전시키기 같은 패턴이죠. 핵심은 '어디까지 도느냐(경계)'를 정확히 잡는 거예요. 전체 격자를 훑으면 값 찾기나 전체 속성 계산이 되고, 행 단위·열 단위·대각선 단위로 도는 부분 순회 패턴이 합 구하기의 뼈대입니다. 시험 함정: 부분 순회의 경계(bounds)를 잘못 잡는 것 — 대각선 합은 i를 0부터 grid.length-1까지 돌며 grid[i][i]를, 특정 행의 합은 j를 0부터 grid[row].length-1까지 돌며 grid[row][j]를 더해야 해요. AP는 바로 이 경계 패턴을 콕 집어 시험합니다.",
    objectives: [
      "Row sum, column sum, diagonal sum patterns",
      "Rotating a 2D array 90 degrees",
      "Finding a value or computing a property across the entire grid",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "2D Array Algorithms — Searching, Summing, Transforming",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "부분 순회에 잘못된 경계(bounds)를 쓰는 것 — 대각선 합은 i를 0부터 grid.length-1까지 돌며 grid[i][i]가 필요하고, 특정 행의 합은 j를 0부터 grid[row].length-1까지 돌며 grid[row][j]가 필요합니다. AP는 이런 구체적인 순회 패턴을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
];
