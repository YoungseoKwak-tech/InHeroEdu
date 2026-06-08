/**
 * Core Notes 한국어 스토리텔링 버전 — AP Computer Science A Unit 2 (2.1–2.4).
 * 원본 내용 전량 보존(objectives·terms·traps 등) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기. 코딩 과목이므로 Java 코드·키워드·식별자·타입명은 영어 그대로 유지.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_COMPUTER_SCIENCE_A_U2_KO: CoreNote[] = [
  {
    lessonId: "ap-computer-science-a-u2-l1",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 2,
    lessonNum: 1,
    unitName: "Using Objects",
    title: "Objects, References, and the null Value",
    subtitle: null,
    overview: null,
    objectives: [
      "객체는 참조(reference)를 통해 접근합니다 — 두 변수가 같은 객체를 가리킬 수 있어요.",
      "new 키워드가 객체를 생성하고 생성자(constructor)를 호출합니다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "Key concepts",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "null 참조 (null reference)",
            def: "어떤 객체도 가리키지 않는 상태예요. null에 대해 메서드를 호출하면 NullPointerException이 터집니다.",
          },
        ],
        traps: [
          "값이 같은 두 변수가 곧 같은 객체라고 단정하지 마세요 — 아닐 수 있어요. .equals()는 값이 같은지를 검사하고, ==는 참조(메모리 주소)가 같은지를 검사합니다. AP는 이걸 String 비교로 즐겨 물어봐요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u2-l2",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 2,
    lessonNum: 2,
    unitName: "Using Objects",
    title: "String Methods and Immutability",
    subtitle: null,
    overview: null,
    objectives: [
      "+ 연산자를 이용한 String 연결(concatenation)과 String으로의 자동 변환(auto-conversion).",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "Key concepts",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "String은 불변 (String is immutable)",
            def: "메서드는 새로운 String을 반환할 뿐, 원본을 절대 수정하지 않아요.",
          },
          {
            term: "핵심 메서드 (Key methods)",
            def: "length(), substring(a,b), indexOf(), equals(), compareTo().",
          },
        ],
        traps: [
          "s.toUpperCase()가 s를 바꿔준다고 생각하면 안 돼요 — 안 바뀝니다. s를 '갱신'하려면 반드시 s = s.toUpperCase()처럼 반환값을 다시 담아야 해요(실제로는 새 String 객체가 만들어지는 거예요). AP는 반환값을 받지 않고 String 메서드만 호출한 코드를 주고 출력을 물어봅니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u2-l3",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 2,
    lessonNum: 3,
    unitName: "Using Objects",
    title: "Math Class Static Methods",
    subtitle: null,
    overview: null,
    objectives: [
      "Math.abs(), Math.pow(), Math.sqrt(), Math.random().",
      "Math.random()은 [0.0, 1.0) 범위를 반환합니다 — 특정 범위의 정수를 만들어내는 법.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "Key concepts",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "정적 메서드 (Static methods)",
            def: "인스턴스가 아니라 클래스 자체에 대고 호출하는 메서드예요.",
          },
        ],
        traps: [
          "Math.random() 범위 계산에서 한 칸씩 어긋나는(off-by-one) 실수를 조심하세요. 1부터 n까지 정수는 (int)(Math.random() * n) + 1, 0부터 n-1까지는 (int)(Math.random() * n)입니다. AP는 [min, max] 양끝 포함 범위를 주고 공식을 신중하게 세우게 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u2-l4",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 2,
    lessonNum: 4,
    unitName: "Using Objects",
    title: "Wrapper Classes and Autoboxing",
    subtitle: null,
    overview: null,
    objectives: [
      "컬렉션(collection)에서 사용하기 위해 기본형(primitive)을 감싸는 Integer, Double.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "Key concepts",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "오토박싱 (Autoboxing)",
            def: "int와 Integer 사이의 자동 변환이에요.",
          },
          {
            term: "Integer 메서드 (Integer methods)",
            def: "Integer.parseInt(), Integer.MAX_VALUE.",
          },
        ],
        traps: [
          "int(기본형)와 Integer(객체)를 헷갈리지 마세요 — Integer는 null이 될 수 있지만 int는 안 됩니다. null인 Integer를 int로 언박싱하면 NullPointerException이 터져요. AP는 null 언박싱이 오류를 일으키는 상황을 물어봅니다.",
        ],
        example: null,
      },
    ],
  },
];
