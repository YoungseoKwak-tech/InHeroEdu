"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getStoredUserId } from "@/lib/username";

interface Card {
  id: string;
  set_id: string;
  front_text: string;
  back_text_korean: string;
  back_text_english: string | null;
  example: string | null;
}

interface FlashcardSet {
  id: string;
  subject: string;
  title: string;
  card_count: number;
}

type Mode     = "select" | "study" | "test";
type Status   = "unseen" | "hard" | "maybe" | "know";
type TestPhase = "question" | "result";

const STATUS_CONFIG = {
  unseen: { label: "미학습",  color: "bg-gray-100 dark:bg-gray-700",   text: "text-gray-500" },
  hard:   { label: "어려워요", color: "bg-red-100 dark:bg-red-900/30",   text: "text-red-500"  },
  maybe:  { label: "애매해요", color: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-500" },
  know:   { label: "알아요",  color: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-500" },
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ── Sample data (shown when Supabase tables don't exist yet) ─────────────

const SAMPLE_SET_INFO: Record<string, FlashcardSet> = {
  s1: { id: "s1", subject: "AP Biology",   title: "미토콘드리아 핵심 용어", card_count: 5 },
  s2: { id: "s2", subject: "AP Biology",   title: "DNA 복제 핵심 용어",    card_count: 5 },
  s3: { id: "s3", subject: "AP Chemistry", title: "원소 주기율",            card_count: 6 },
  s4: { id: "s4", subject: "AP Calculus",  title: "미분 공식",              card_count: 6 },
  s5: { id: "s5", subject: "AMC",          title: "핵심 공식 모음",         card_count: 5 },
  s6: { id: "s6", subject: "SAT",          title: "고빈도 어휘",            card_count: 6 },
};

const SAMPLE_CARDS: Record<string, Card[]> = {
  s1: [
    { id: "c1", set_id: "s1", front_text: "Mitochondria",           back_text_korean: "세포의 발전소 — ATP를 생산하는 세포 소기관", back_text_english: "Powerhouse of the cell that produces ATP", example: "미토콘드리아는 이중막 구조를 가지며 자체 DNA를 보유한다." },
    { id: "c2", set_id: "s1", front_text: "ATP Synthase",           back_text_korean: "ATP를 합성하는 효소 — 미토콘드리아 내막에 위치", back_text_english: "Enzyme that synthesizes ATP using proton gradient", example: "ADP + Pi → ATP 반응을 촉진한다." },
    { id: "c3", set_id: "s1", front_text: "Cellular Respiration",   back_text_korean: "포도당을 ATP로 변환하는 과정 — 3단계로 구성", back_text_english: "Process converting glucose into ATP", example: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP" },
    { id: "c4", set_id: "s1", front_text: "Krebs Cycle",            back_text_korean: "TCA 회로 — 미토콘드리아 기질에서 진행", back_text_english: "Citric acid cycle in mitochondrial matrix", example: "아세틸-CoA 1분자당 3 NADH, 1 FADH₂, 1 GTP 생성" },
    { id: "c5", set_id: "s1", front_text: "Electron Transport Chain", back_text_korean: "내막의 단백질 복합체 — ATP 대량 생산", back_text_english: "Series of protein complexes producing ATP", example: "NADH → Complex I → Ubiquinone → Complex III → O₂" },
  ],
  s2: [
    { id: "c6",  set_id: "s2", front_text: "DNA Replication",      back_text_korean: "DNA를 복제하는 과정 — S기에 진행", back_text_english: "Process of copying DNA during S phase", example: "반보존적 복제 (semi-conservative)" },
    { id: "c7",  set_id: "s2", front_text: "Helicase",             back_text_korean: "DNA 이중나선을 푸는 효소", back_text_english: "Enzyme that unwinds the double helix", example: "복제 포크(replication fork) 형성에 필수" },
    { id: "c8",  set_id: "s2", front_text: "DNA Polymerase",       back_text_korean: "새로운 DNA 가닥을 합성하는 효소", back_text_english: "Enzyme that synthesizes new DNA strands", example: "5'→3' 방향으로만 합성 가능" },
    { id: "c9",  set_id: "s2", front_text: "Okazaki Fragments",    back_text_korean: "지연 가닥에서 불연속적으로 합성되는 짧은 DNA 조각", back_text_english: "Short DNA fragments on the lagging strand", example: "RNA 프라이머로 시작하며 나중에 연결됨" },
    { id: "c10", set_id: "s2", front_text: "Primase",              back_text_korean: "RNA 프라이머를 합성하는 효소", back_text_english: "Enzyme that synthesizes RNA primers", example: "DNA 중합효소가 작업을 시작하기 위해 필요" },
  ],
  s3: [
    { id: "c11", set_id: "s3", front_text: "Electronegativity",    back_text_korean: "원자가 공유전자쌍을 끌어당기는 능력", back_text_english: "Ability of an atom to attract shared electrons", example: "F > O > N > Cl 순으로 전기음성도 높음" },
    { id: "c12", set_id: "s3", front_text: "Ionization Energy",    back_text_korean: "기체 상태 원자에서 전자 1개를 제거하는 에너지", back_text_english: "Energy required to remove an electron from a gaseous atom", example: "같은 주기에서 오른쪽으로 갈수록 증가" },
    { id: "c13", set_id: "s3", front_text: "Atomic Radius",        back_text_korean: "원자핵에서 최외각 전자까지의 거리", back_text_english: "Distance from nucleus to outermost electrons", example: "같은 주기에서 오른쪽으로 갈수록 감소" },
    { id: "c14", set_id: "s3", front_text: "Periodic Law",         back_text_korean: "원소를 원자 번호 순으로 배열하면 성질이 주기적으로 반복", back_text_english: "Properties repeat periodically when elements are arranged by atomic number", example: "Mendeleev가 처음 발견" },
    { id: "c15", set_id: "s3", front_text: "Valence Electrons",    back_text_korean: "최외각 전자 — 화학 결합에 참여", back_text_english: "Outermost electrons involved in bonding", example: "그룹 번호 = 원자가 전자 수 (전이 금속 제외)" },
    { id: "c16", set_id: "s3", front_text: "Electron Affinity",    back_text_korean: "기체 원자가 전자를 얻을 때 방출되는 에너지", back_text_english: "Energy released when an atom gains an electron", example: "할로겐족이 일반적으로 가장 높음" },
  ],
  s4: [
    { id: "c17", set_id: "s4", front_text: "Power Rule",           back_text_korean: "xⁿ의 도함수 = nxⁿ⁻¹", back_text_english: "Derivative of xⁿ = nxⁿ⁻¹", example: "d/dx(x³) = 3x²" },
    { id: "c18", set_id: "s4", front_text: "Chain Rule",           back_text_korean: "합성함수의 미분 — f(g(x))' = f'(g(x))·g'(x)", back_text_english: "Derivative of composite function", example: "d/dx(sin(x²)) = cos(x²)·2x" },
    { id: "c19", set_id: "s4", front_text: "Product Rule",         back_text_korean: "(fg)' = f'g + fg'", back_text_english: "Derivative of a product of two functions", example: "d/dx(x²·sinx) = 2x·sinx + x²·cosx" },
    { id: "c20", set_id: "s4", front_text: "Quotient Rule",        back_text_korean: "(f/g)' = (f'g − fg') / g²", back_text_english: "Derivative of a quotient of two functions", example: "d/dx(sinx/x) = (cosx·x − sinx)/x²" },
    { id: "c21", set_id: "s4", front_text: "L'Hôpital's Rule",     back_text_korean: "0/0 또는 ∞/∞ 꼴 극한 → 분자·분모 각각 미분", back_text_english: "For indeterminate forms, differentiate numerator and denominator", example: "lim(sinx/x) as x→0 = lim(cosx/1) = 1" },
    { id: "c22", set_id: "s4", front_text: "Fundamental Theorem", back_text_korean: "미분과 적분은 역연산 — ∫f(x)dx 미분하면 f(x)", back_text_english: "Differentiation and integration are inverse operations", example: "d/dx ∫₀ˣ f(t)dt = f(x)" },
  ],
  s5: [
    { id: "c23", set_id: "s5", front_text: "Arithmetic Sequence",  back_text_korean: "등차수열 — aₙ = a₁ + (n−1)d", back_text_english: "Sequence with constant difference between terms", example: "1, 4, 7, 10, ... (공차 d=3)" },
    { id: "c24", set_id: "s5", front_text: "Geometric Sequence",   back_text_korean: "등비수열 — aₙ = a₁ · rⁿ⁻¹", back_text_english: "Sequence with constant ratio between terms", example: "2, 6, 18, 54, ... (공비 r=3)" },
    { id: "c25", set_id: "s5", front_text: "Quadratic Formula",    back_text_korean: "ax²+bx+c=0 의 해: x = (−b ± √(b²−4ac)) / 2a", back_text_english: "Solution to quadratic equation ax²+bx+c=0", example: "b²−4ac > 0: 두 실근, = 0: 중근, < 0: 허근" },
    { id: "c26", set_id: "s5", front_text: "Pythagorean Theorem",  back_text_korean: "직각삼각형에서 a² + b² = c²", back_text_english: "In a right triangle, a² + b² = c²", example: "3-4-5, 5-12-13 피타고라스 수" },
    { id: "c27", set_id: "s5", front_text: "Combinations",         back_text_korean: "C(n,k) = n! / (k!(n−k)!)", back_text_english: "Number of ways to choose k items from n without order", example: "C(5,2) = 10" },
  ],
  s6: [
    { id: "c28", set_id: "s6", front_text: "Ambiguous",     back_text_korean: "모호한, 불분명한", back_text_english: "Open to more than one interpretation", example: "The ambiguous wording confused the students." },
    { id: "c29", set_id: "s6", front_text: "Advocate",      back_text_korean: "지지하다, 옹호하다 / 지지자", back_text_english: "To publicly support or recommend", example: "She advocates for environmental protection." },
    { id: "c30", set_id: "s6", front_text: "Concede",       back_text_korean: "인정하다, 양보하다", back_text_english: "To admit something is true or to yield", example: "He conceded that his argument had flaws." },
    { id: "c31", set_id: "s6", front_text: "Disparate",     back_text_korean: "본질적으로 다른, 이질적인", back_text_english: "Fundamentally different and unable to be compared", example: "The two theories were disparate in their approaches." },
    { id: "c32", set_id: "s6", front_text: "Ephemeral",     back_text_korean: "단명하는, 순간적인", back_text_english: "Lasting for a very short time", example: "The ephemeral beauty of cherry blossoms." },
    { id: "c33", set_id: "s6", front_text: "Pragmatic",     back_text_korean: "실용적인, 현실적인", back_text_english: "Dealing with things sensibly and realistically", example: "A pragmatic solution to a complex problem." },
  ],
};

export default function FlashcardSetPage({ params }: { params: Promise<{ setId: string }> }) {
  const { setId } = use(params);
  const [userId]  = useState(() => getStoredUserId());

  const [set, setSet]         = useState<FlashcardSet | null>(null);
  const [cards, setCards]     = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode]       = useState<Mode>("select");

  // Study mode state
  const [studyCards, setStudyCards] = useState<Card[]>([]);
  const [studyIdx, setStudyIdx]     = useState(0);
  const [flipped, setFlipped]       = useState(false);
  const [progress, setProgress]     = useState<Record<string, Status>>({});
  const [studyDone, setStudyDone]   = useState(false);

  // Test mode state
  const [testCards, setTestCards]   = useState<Card[]>([]);
  const [testIdx, setTestIdx]       = useState(0);
  const [choices, setChoices]       = useState<string[]>([]);
  const [selected, setSelected]     = useState<string | null>(null);
  const [phase, setPhase]           = useState<TestPhase>("question");
  const [score, setScore]           = useState(0);
  const [testDone, setTestDone]     = useState(false);
  const [testDirection, setTestDirection] = useState<"front" | "back">("front");

  useEffect(() => {
    loadData();
  }, [setId]);

  async function loadData() {
    setLoading(true);
    let foundSet: FlashcardSet | null = null;
    let loadedCards: Card[] = [];
    try {
      const [setsRes, cardsRes] = await Promise.all([
        fetch(`/api/flashcards/sets`),
        fetch(`/api/flashcards/cards?setId=${setId}`),
      ]);
      const setsData  = await setsRes.json();
      const cardsData = await cardsRes.json();
      foundSet    = (setsData.sets ?? []).find((s: FlashcardSet) => s.id === setId) ?? null;
      loadedCards = cardsData.cards ?? [];
    } catch { /* network error — fall through to sample data */ }

    // Fall back to sample data if DB not set up yet
    if (!foundSet && SAMPLE_SET_INFO[setId])    foundSet    = SAMPLE_SET_INFO[setId];
    if (loadedCards.length === 0 && SAMPLE_CARDS[setId]) loadedCards = SAMPLE_CARDS[setId];
    setSet(foundSet);
    setCards(loadedCards);

    // Load progress
    const progRes  = await fetch(`/api/flashcards/progress?userId=${userId}&setId=${setId}`);
    const progData = await progRes.json();
    const progMap: Record<string, Status> = {};
    for (const p of (progData.progress ?? [])) {
      progMap[p.card_id] = p.status as Status;
    }
    setProgress(progMap);
    setLoading(false);
  }

  // ── Study mode ──────────────────────────────────────────

  function startStudy() {
    const queue = shuffle(cards);
    setStudyCards(queue);
    setStudyIdx(0);
    setFlipped(false);
    setStudyDone(false);
    setMode("study");
  }

  async function handleStatus(status: Status) {
    const card = studyCards[studyIdx];
    if (!card) return;

    const newProgress = { ...progress, [card.id]: status };
    setProgress(newProgress);

    // Save to DB
    await fetch("/api/flashcards/progress", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ userId, cardId: card.id, status }),
    });

    if (studyIdx + 1 >= studyCards.length) {
      setStudyDone(true);
    } else {
      setStudyIdx(studyIdx + 1);
      setFlipped(false);
    }
  }

  function restartStudy(onlyHard = false) {
    const queue = onlyHard
      ? shuffle(cards.filter((c) => progress[c.id] === "hard" || progress[c.id] === "maybe" || !progress[c.id]))
      : shuffle(cards);
    setStudyCards(queue);
    setStudyIdx(0);
    setFlipped(false);
    setStudyDone(false);
  }

  // ── Test mode ────────────────────────────────────────────

  function startTest(direction: "front" | "back") {
    const queue = shuffle(cards);
    setTestCards(queue);
    setTestIdx(0);
    setScore(0);
    setTestDone(false);
    setTestDirection(direction);
    setPhase("question");
    setSelected(null);
    setTestDirection(direction);
    generateChoices(queue[0], direction, cards);
    setMode("test");
  }

  function generateChoices(card: Card, direction: "front" | "back", allCards: Card[]) {
    const correct = direction === "front" ? card.back_text_korean : card.front_text;
    const others  = shuffle(allCards.filter((c) => c.id !== card.id))
      .slice(0, 3)
      .map((c) => direction === "front" ? c.back_text_korean : c.front_text);
    setChoices(shuffle([correct, ...others]));
  }

  function handleChoice(choice: string) {
    if (phase !== "question") return;
    setSelected(choice);
    setPhase("result");
    const card    = testCards[testIdx];
    const correct = testDirection === "front" ? card.back_text_korean : card.front_text;
    if (choice === correct) setScore((s) => s + 1);
  }

  function handleNext() {
    const nextIdx = testIdx + 1;
    if (nextIdx >= testCards.length) {
      setTestDone(true);
      return;
    }
    setTestIdx(nextIdx);
    setSelected(null);
    setPhase("question");
    generateChoices(testCards[nextIdx], testDirection, cards);
  }

  // ── Progress stats ──────────────────────────────────────

  const knowCount  = cards.filter((c) => progress[c.id] === "know").length;
  const maybeCount = cards.filter((c) => progress[c.id] === "maybe").length;
  const hardCount  = cards.filter((c) => progress[c.id] === "hard").length;
  const doneCount  = knowCount + maybeCount + hardCount;

  // ── Render ───────────────────────────────────────────────

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-1.5">{[0,1,2].map(i => <div key={i} className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}</div>
    </div>
  );

  if (!set) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      <div className="text-center">
        <p className="text-4xl mb-3">🔍</p><p>세트를 찾을 수 없어요</p>
        <Link href="/flashcards" className="btn-primary text-sm mt-4 inline-block">돌아가기</Link>
      </div>
    </div>
  );

  // Mode: SELECT
  if (mode === "select") return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link href="/flashcards" className="text-gray-400 hover:text-primary-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="font-extrabold text-gray-900 dark:text-white">{set.title}</h1>
            <p className="text-xs text-gray-400">{cards.length}장 · {set.subject}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Progress summary */}
        {doneCount > 0 && (
          <div className="card p-5">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3">내 학습 현황</p>
            <div className="flex gap-1 mb-3 h-2 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <div className="bg-emerald-400 transition-all" style={{ width: `${(knowCount / cards.length) * 100}%` }} />
              <div className="bg-amber-400 transition-all"   style={{ width: `${(maybeCount / cards.length) * 100}%` }} />
              <div className="bg-red-400 transition-all"     style={{ width: `${(hardCount / cards.length) * 100}%` }} />
            </div>
            <div className="flex gap-4 text-xs">
              <span className="text-emerald-500 font-semibold">😊 알아요 {knowCount}</span>
              <span className="text-amber-500 font-semibold">🤔 애매 {maybeCount}</span>
              <span className="text-red-500 font-semibold">😅 어려워요 {hardCount}</span>
              <span className="text-gray-400 ml-auto">{doneCount}/{cards.length} 완료</span>
            </div>
          </div>
        )}

        {/* Mode cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={startStudy} className="card p-6 text-left hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-extrabold text-gray-900 dark:text-white mb-1">학습 모드</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">카드를 뒤집으며 암기 — 😅😊🤔 버튼으로 분류해요</p>
            <div className="mt-4 btn-primary text-xs py-2 text-center rounded-xl">시작하기 →</div>
          </button>

          <div className="card p-6">
            <div className="text-3xl mb-3">✏️</div>
            <h3 className="font-extrabold text-gray-900 dark:text-white mb-1">테스트 모드</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">4지선다로 얼마나 외웠는지 확인해요</p>
            <div className="flex gap-2">
              <button onClick={() => startTest("front")} className="flex-1 text-xs py-2 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors">용어 → 뜻</button>
              <button onClick={() => startTest("back")}  className="flex-1 text-xs py-2 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors">뜻 → 용어</button>
            </div>
          </div>
        </div>

        {/* Card list */}
        <div>
          <h2 className="font-extrabold text-gray-900 dark:text-white mb-3">전체 카드 목록</h2>
          <div className="space-y-2">
            {cards.map((card, i) => {
              const s = progress[card.id] as Status | undefined;
              const cfg = s ? STATUS_CONFIG[s] : STATUS_CONFIG.unseen;
              return (
                <div key={card.id} className="card p-4 flex items-start gap-3">
                  <span className="text-xs font-bold text-gray-300 w-5 flex-shrink-0 mt-0.5">{i + 1}</span>
                  <div className="flex-1 grid grid-cols-2 gap-3 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{card.front_text}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{card.back_text_korean}</p>
                  </div>
                  {s && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.color} ${cfg.text}`}>{cfg.label}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // Mode: STUDY
  if (mode === "study") {
    const card = studyCards[studyIdx];
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setMode("select")} className="text-gray-400 hover:text-primary-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-bold text-gray-900 dark:text-white text-sm">{set.title}</span>
          <span className="ml-auto text-xs text-gray-400">{studyIdx + 1} / {studyCards.length}</span>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100 dark:bg-gray-800">
          <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${((studyIdx) / studyCards.length) * 100}%` }} />
        </div>

        {studyDone ? (
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center max-w-sm">
              <p className="text-5xl mb-4">🎉</p>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">완료!</h2>
              <div className="flex gap-4 justify-center text-sm mb-6">
                <span className="text-emerald-500 font-semibold">😊 {cards.filter((c) => progress[c.id] === "know").length}개</span>
                <span className="text-amber-500 font-semibold">🤔 {cards.filter((c) => progress[c.id] === "maybe").length}개</span>
                <span className="text-red-500 font-semibold">😅 {cards.filter((c) => progress[c.id] === "hard").length}개</span>
              </div>
              <div className="flex gap-2 flex-col sm:flex-row justify-center">
                <button onClick={() => restartStudy(true)} className="btn-primary text-sm py-2 px-5">😅 어려운 것만 다시</button>
                <button onClick={() => restartStudy(false)} className="btn-secondary text-sm py-2 px-5">전체 다시</button>
                <button onClick={() => setMode("select")} className="btn-secondary text-sm py-2 px-5">목록으로</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
            {/* Flip card */}
            <div
              className="w-full max-w-lg cursor-pointer select-none mb-8"
              style={{ perspective: "1200px" }}
              onClick={() => setFlipped(!flipped)}
            >
              <div style={{
                transition: "transform 0.5s",
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                position: "relative",
                minHeight: 260,
              }}>
                {/* Front */}
                <div style={{ backfaceVisibility: "hidden", position: "absolute", inset: 0 }}
                  className="card flex flex-col items-center justify-center text-center p-8">
                  <p className="text-xs text-gray-400 mb-4 font-semibold uppercase tracking-widest">앞면 — 영어 용어</p>
                  <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{card?.front_text}</p>
                  <p className="text-xs text-gray-400 mt-6">탭해서 뒤집기 👆</p>
                </div>
                {/* Back */}
                <div style={{ backfaceVisibility: "hidden", position: "absolute", inset: 0, transform: "rotateY(180deg)" }}
                  className="card flex flex-col items-center justify-center text-center p-8 bg-primary-50 dark:bg-primary-900/10">
                  <p className="text-xs text-primary-400 mb-4 font-semibold uppercase tracking-widest">뒷면</p>
                  <p className="text-xl font-extrabold text-gray-900 dark:text-white mb-3">{card?.back_text_korean}</p>
                  {card?.back_text_english && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{card.back_text_english}</p>
                  )}
                  {card?.example && (
                    <div className="mt-3 bg-white dark:bg-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-600 dark:text-gray-300 max-w-sm leading-relaxed">
                      💡 {card.example}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status buttons */}
            {flipped && (
              <div className="flex gap-3 justify-center w-full max-w-lg">
                <button onClick={() => handleStatus("hard")} className="flex-1 card py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-center">
                  <p className="text-2xl">😅</p>
                  <p className="text-xs font-semibold text-red-500 mt-1">어려워요</p>
                  <p className="text-xs text-gray-400">다시 나옴</p>
                </button>
                <button onClick={() => handleStatus("maybe")} className="flex-1 card py-3 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors text-center">
                  <p className="text-2xl">🤔</p>
                  <p className="text-xs font-semibold text-amber-500 mt-1">애매해요</p>
                  <p className="text-xs text-gray-400">나중에 다시</p>
                </button>
                <button onClick={() => handleStatus("know")} className="flex-1 card py-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors text-center">
                  <p className="text-2xl">😊</p>
                  <p className="text-xs font-semibold text-emerald-500 mt-1">알아요</p>
                  <p className="text-xs text-gray-400">완료</p>
                </button>
              </div>
            )}
            {!flipped && (
              <p className="text-xs text-gray-400">카드를 클릭해서 뒷면을 확인하세요</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // Mode: TEST
  if (mode === "test") {
    const card    = testCards[testIdx];
    const correct = card ? (testDirection === "front" ? card.back_text_korean : card.front_text) : "";
    const question = card ? (testDirection === "front" ? card.front_text : card.back_text_korean) : "";

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setMode("select")} className="text-gray-400 hover:text-primary-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-bold text-gray-900 dark:text-white text-sm">테스트 모드</span>
          <span className="ml-auto text-xs text-gray-400">{testIdx + 1} / {testCards.length} · 🎯 {score}점</span>
        </div>
        <div className="h-1 bg-gray-100 dark:bg-gray-800">
          <div className="h-full bg-violet-500 transition-all" style={{ width: `${(testIdx / testCards.length) * 100}%` }} />
        </div>

        {testDone ? (
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center max-w-sm">
              <p className="text-5xl mb-4">{score >= testCards.length * 0.8 ? "🏆" : score >= testCards.length * 0.5 ? "👍" : "📚"}</p>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">테스트 완료!</h2>
              <p className="text-4xl font-black text-primary-500 mb-1">{score} / {testCards.length}</p>
              <p className="text-sm text-gray-500 mb-6">{Math.round((score / testCards.length) * 100)}% 정답률</p>
              <div className="flex gap-2 flex-col sm:flex-row justify-center">
                <button onClick={() => startTest(testDirection)} className="btn-primary text-sm py-2 px-5">다시 테스트</button>
                <button onClick={() => setMode("select")} className="btn-secondary text-sm py-2 px-5">목록으로</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-lg mx-auto w-full">
            <div className="card p-6 w-full mb-6 text-center">
              <p className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-widest">
                {testDirection === "front" ? "이 용어의 뜻은?" : "이 뜻에 해당하는 용어는?"}
              </p>
              <p className="text-xl font-extrabold text-gray-900 dark:text-white">{question}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 w-full">
              {choices.map((choice) => {
                let btnClass = "card p-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 transition-colors cursor-pointer";
                if (phase === "result") {
                  if (choice === correct) btnClass = "card p-4 text-left text-sm font-bold bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 ring-2 ring-emerald-400";
                  else if (choice === selected) btnClass = "card p-4 text-left text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-500 ring-2 ring-red-400";
                }
                return (
                  <button key={choice} onClick={() => handleChoice(choice)} disabled={phase === "result"} className={btnClass}>
                    {choice}
                  </button>
                );
              })}
            </div>

            {phase === "result" && (
              <button onClick={handleNext} className="mt-5 btn-primary text-sm py-2.5 px-8">
                {testIdx + 1 >= testCards.length ? "결과 보기" : "다음 →"}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}
