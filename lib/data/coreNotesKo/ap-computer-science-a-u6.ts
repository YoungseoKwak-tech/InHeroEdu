/**
 * Core Notes 한국어 일타강사 버전 — AP Computer Science A Unit 6 (Array, 6.1–6.4).
 * 원본 내용 전량 보존(overview·objectives·body·keyIdea·table·terms·traps·example 포함) + 일타강사 내러티브.
 * 코딩 과목: Java 코드·키워드·타입명·식별자는 영어 그대로 유지하고, 설명 산문만 한국어로 번역.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_COMPUTER_SCIENCE_A_U6_KO: CoreNote[] = [
  {
    lessonId: "ap-computer-science-a-u6-l1",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 6,
    lessonNum: 1,
    unitName: "Array",
    title: "배열 생성과 접근 (Array Creation and Access)",
    subtitle: null,
    overview: null,
    objectives: [
      "인덱스는 0부터 arr.length-1까지 — 이 범위를 벗어나면 ArrayIndexOutOfBoundsException이 발생한다.",
      "배열 대입은 값 복사가 아니라 별칭(alias, 참조 복사)을 만든다.",
    ],
    formulas: ["valid index 0..length−1", "last: arr[arr.length−1]"],
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
            term: "int[] arr = new int[n]; 의 기본값 (default values)",
            def: "배열을 new로 만들면 각 원소가 타입별 기본값으로 채워집니다: 0, 0.0, false, null.",
          },
        ],
        traps: [
          "arr.length() 처럼 메서드 호출이라고 착각하는 것 — 배열은 arr.length (괄호 없음)를 쓰고, String은 s.length() (괄호 있는 메서드)를 씁니다. AP는 배열 접근 코드를 주고 바로 이 문법 차이를 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u6-l2",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 6,
    lessonNum: 2,
    unitName: "Array",
    title: "배열 순회 — 세 가지 반복문 (Traversing Arrays — All Three Loop Types)",
    subtitle: null,
    overview: null,
    objectives: [
      "수정 또는 임의 접근(random access)이 필요할 때는 인덱스를 쓰는 표준 for loop를 사용한다.",
    ],
    formulas: ["valid index 0..length−1", "last: arr[arr.length−1]"],
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
            term: "읽기 전용 순회를 위한 for-each loop (for-each loop for read-only traversal)",
            def: "for(int x : arr) 형태로 원소를 차례로 읽기만 할 때 씁니다.",
          },
          {
            term: "하나 차이 오류 (Off-by-one)",
            def: "유효한 마지막 인덱스는 arr.length - 1 입니다.",
          },
        ],
        traps: [
          "원소를 수정해야 하는 작업에 for-each를 쓰는 것 — for(int x: arr) 안에서 'x'를 바꿔도 배열은 바뀌지 않습니다. 인덱스를 쓰는 반복문으로 arr[i] = newValue; 처럼 해야 합니다. AP는 인덱스 접근이 필요한 배열 수정을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u6-l3",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 6,
    lessonNum: 3,
    unitName: "Array",
    title: "배열 알고리즘 — 탐색과 정렬 (Array Algorithms — Search and Sort)",
    subtitle: null,
    overview: null,
    objectives: [
      "배열을 순회하며 max, min, sum, average를 구한다.",
    ],
    formulas: ["valid index 0..length−1", "last: arr[arr.length−1]"],
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
            term: "순차 탐색 (Sequential search)",
            def: "O(n)입니다. binary search는 O(log n)이지만 정렬된 배열(sorted array)을 요구합니다.",
          },
          {
            term: "선택 정렬과 삽입 정렬 (Selection sort and insertion sort)",
            def: "둘 다 O(n²)입니다.",
          },
        ],
        traps: [
          "정렬되지 않은 배열에 binary search를 적용하는 것 — binary search는 정렬된 배열에서만 동작합니다. AP는 정렬되지 않은 배열을 주고 binary search가 올바른 답을 내는지(못 낼 수도 있음)를 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u6-l4",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 6,
    lessonNum: 4,
    unitName: "Array",
    title: "메서드에 배열 전달하기 (Passing Arrays to Methods)",
    subtitle: null,
    overview: null,
    objectives: [
      "메서드에서 배열을 반환(return)한다.",
    ],
    formulas: ["valid index 0..length−1", "last: arr[arr.length−1]"],
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
            term: "배열은 참조 타입 (Arrays are reference types)",
            def: "메서드는 참조(reference)를 받으므로, 메서드 안에서 가한 변경이 원본에도 반영됩니다.",
          },
          {
            term: "배열 매개변수 vs. 기본형 매개변수 (Array as a parameter vs. primitive parameter)",
            def: "변경 가시성(mutation visibility)의 차이 — 배열은 변경이 밖에서 보이고, primitive는 보이지 않습니다.",
          },
        ],
        traps: [
          "배열도 primitive처럼 값으로 전달(passed by value)된다고 가정하는 것 — 배열을 받아 원소를 수정하는 메서드는 원본 배열을 실제로 수정합니다. AP는 helper 메서드 안에서 가한 변경이 호출 이후에도 보이는지를 시험합니다.",
        ],
        example: null,
      },
    ],
  },
];
