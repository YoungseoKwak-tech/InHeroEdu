/**
 * Core Notes 한국어 스토리텔링 버전 — AP Computer Science A Unit 7 (7.1–7.3).
 * 원본 내용 전량 보존(overview·objectives·terms·traps 포함) + 일타강사 내러티브.
 * 코딩 과목: Java 코드/타입명/키워드/식별자는 영어 그대로 유지, 설명 산문만 한국어로.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_COMPUTER_SCIENCE_A_U7_KO: CoreNote[] = [
  {
    lessonId: "ap-computer-science-a-u7-l1",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 7,
    lessonNum: 1,
    unitName: "ArrayList",
    title: "ArrayList vs. Array — When to Use Each",
    subtitle: null,
    overview:
      "array는 크기가 한 번 정해지면 못 바꿔요 — 처음 만들 때 길이를 박아넣으면 끝입니다. 반면 ArrayList는 살아 움직이는 리스트예요. add로 늘리고 remove로 줄이고, 크기는 size()가 알아서 따라옵니다. 그래서 '원소 개수를 모를 때, 자주 추가·삭제할 때'는 ArrayList, '개수가 고정이고 속도가 중요할 때'는 array를 씁니다. 시험 함정: ArrayList<int>처럼 primitive를 넣으면 컴파일 에러예요 — ArrayList는 객체 타입만 받으니 반드시 wrapper인 ArrayList<Integer>를 써야 합니다.",
    objectives: [
      "ArrayList는 크기 조절이 가능하고, array는 크기가 고정이다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "ArrayList와 array의 본질적 차이는 '크기를 바꿀 수 있느냐'입니다. array는 선언 시 길이가 고정되지만 ArrayList는 실행 중에 자유롭게 커지고 줄어들어요. 그리고 ArrayList는 객체(object)만 저장할 수 있어 primitive 타입은 직접 못 담습니다 — 대신 wrapper 클래스를 쓰고, autoboxing이 int ↔ Integer 변환을 자동으로 처리해 줘요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "ArrayList는 객체를 저장 (primitive 아님) (ArrayList stores objects, not primitives)",
            def: "ArrayList<int>가 아니라 ArrayList<Integer>를 써야 합니다. primitive 타입은 직접 담을 수 없고, wrapper 클래스로 감싸야 해요.",
          },
          {
            term: "ArrayList 메서드 (ArrayList methods)",
            def: "add, get, set, remove, size — 추가·조회·변경·삭제·크기 확인의 핵심 메서드들입니다.",
          },
        ],
        traps: [
          "ArrayList<int>를 쓰는 실수 — ArrayList는 객체 타입을 요구하므로 wrapper인 ArrayList<Integer>를 써야 합니다. autoboxing이 값 변환은 자동으로 처리해 주지만, 타입 매개변수(type parameter) 자체는 반드시 Integer여야 해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u7-l2",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 7,
    lessonNum: 2,
    unitName: "ArrayList",
    title: "ArrayList Traversal and Removal Pitfalls",
    subtitle: null,
    overview:
      "ArrayList를 순회하면서 동시에 원소를 지우는 것 — 여기서 학생들이 가장 많이 무너집니다. for-each 루프로 돌면서 remove를 하면 ConcurrentModificationException이 터져요. for-each는 '읽기 전용 순회'라고 생각하세요. 인덱스 루프로 삭제할 때도 함정이 있습니다: i번째를 지우면 뒤 원소들이 한 칸씩 당겨지면서 원래 i+1이 i 자리로 와요. 그래서 그냥 i++ 하면 한 칸을 건너뛰는 off-by-one이 생깁니다. 시험 단골 함정이에요.",
    objectives: [
      "원소를 제거할 때는 for-each 루프를 사용할 수 없다.",
      "for-each 순회 도중 수정하면 ConcurrentModificationException이 발생한다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "ArrayList에서 원소를 삭제하면 그 뒤의 원소들이 앞으로 한 칸씩 이동(shift)합니다. 이 '당겨짐'이 순회 로직을 망가뜨려요. for-each 루프 중에 리스트를 수정하면 ConcurrentModificationException이 발생하고, 인덱스 루프에서는 삭제 후 인덱스 처리를 잘못하면 원소를 건너뛰게 됩니다. 안전한 방법은 인덱스 루프에서 삭제 후 카운터를 감소시키거나, 뒤에서 앞으로(backward) 순회하는 거예요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "인덱스로 순회하며 원소 제거하기 (Removing elements while iterating with index)",
            def: "뒤에서 앞으로 순회(iterate backward)하거나, 삭제 후 인덱스를 조정(adjust index)하세요.",
          },
        ],
        traps: [
          "인덱스로 앞쪽부터(forward) 순회하면서 ArrayList에서 삭제하는 실수 — 인덱스 i에서 삭제하면 원래 i+1에 있던 원소가 i로 당겨집니다. 따라서 삭제 후 루프 카운터를 감소시키거나(decrement) 뒤에서 앞으로 순회해야 해요. AP 시험은 이 삭제와 관련된 고전적인 off-by-one을 출제합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u7-l3",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 7,
    lessonNum: 3,
    unitName: "ArrayList",
    title: "ArrayList Methods and Autoboxing",
    subtitle: null,
    overview:
      "ArrayList의 메서드들과 autoboxing — 여기서 진짜 무서운 건 remove의 오버로딩(overloading)입니다. list.remove(2)는 '인덱스 2의 원소'를 지우지만, list.remove(Integer.valueOf(2))는 '값이 2인 첫 원소'를 지워요. 똑같이 2를 넣었는데 동작이 완전히 달라지는 거죠. int를 넣으면 인덱스, Integer 객체를 넣으면 값 — 이걸 헷갈리면 답이 통째로 틀립니다. autoboxing이 Integer ↔ int를 자동 변환해 주지만, 이 remove 오버로딩만큼은 자동으로 구해주지 못해요. AP 단골 출제 포인트입니다.",
    objectives: [
      "ArrayList 연산에서의 Integer autoboxing과 unboxing.",
      "Sublist와 일부 구간(partial range) 순회하기.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "ArrayList의 add는 끝에 덧붙이거나(append) 특정 인덱스에 삽입(insert)할 수 있고, remove는 인덱스 또는 값으로 제거할 수 있습니다. 핵심은 매개변수 타입에 따라 동작이 달라진다는 점이에요 — int는 인덱스로, Integer 객체는 값으로 해석됩니다. autoboxing/unboxing은 int와 Integer를 자동 변환해 주지만, 바로 이 오버로딩 구분 때문에 어떤 타입을 넘기는지 항상 의식해야 합니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "list.add(e)",
            def: "끝에 덧붙입니다(appends). list.add(i,e)는 인덱스 i에 삽입하고, list.remove(i)는 인덱스 i의 원소를 제거합니다.",
          },
        ],
        traps: [
          "list.remove(int index)와 list.remove(Object o)를 혼동하는 실수 — list.remove(2)는 인덱스 2에 있는 원소를 제거하고, list.remove(Integer.valueOf(2))는 값이 2인 첫 번째 원소를 제거합니다. AP 시험은 이 메서드 오버로딩 혼동을 출제합니다.",
        ],
        example: null,
      },
    ],
  },
];
