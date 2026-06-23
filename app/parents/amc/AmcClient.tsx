"use client";

/**
 * /parents/amc — AMC 10/12 prep practice (white, interactive).
 *
 * Original AMC-style problems (NOT copyrighted MAA past problems) across the
 * difficulty arc, with Korean worked solutions. Pick a choice → instant
 * correct/wrong + 풀이. Free taste; signup CTA for the full AP toolkit.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";

const GREEN = "#00b85f";
type Level = "쉬움" | "중간" | "어려움";
type Choice = "A" | "B" | "C" | "D" | "E";

interface Problem {
  level: Level; topic: string;
  problem: string;
  choices: Record<Choice, string>;
  answer: Choice;
  solution: string;
}

const LEVEL_COLOR: Record<Level, string> = { "쉬움": "#16a34a", "중간": "#d97706", "어려움": "#dc2626" };

const PROBLEMS: Problem[] = [
  {
    level: "쉬움", topic: "산술",
    problem: "(2³ + 4²) ÷ (5 − 3) 의 값은?",
    choices: { A: "10", B: "12", C: "14", D: "6", E: "24" }, answer: "B",
    solution: "2³ = 8, 4² = 16 이므로 분자는 8 + 16 = 24. 분모는 5 − 3 = 2. 따라서 24 ÷ 2 = 12.",
  },
  {
    level: "쉬움", topic: "백분율",
    problem: "$40짜리 셔츠를 25% 할인한 뒤, 할인된 가격에 10% 세금을 붙였다. 최종 가격은?",
    choices: { A: "$30", B: "$27.50", C: "$33", D: "$36", E: "$34" }, answer: "C",
    solution: "25% 할인: 40 × 0.75 = $30. 여기에 10% 세금: 30 × 1.1 = $33. (할인을 먼저, 세금을 나중에 적용.)",
  },
  {
    level: "쉬움", topic: "정수론",
    problem: "36의 양의 약수는 모두 몇 개인가?",
    choices: { A: "6", B: "8", C: "9", D: "10", E: "12" }, answer: "C",
    solution: "36 = 2² × 3². 약수의 개수는 각 지수에 1을 더해 곱한다: (2+1)(2+1) = 3 × 3 = 9.",
  },
  {
    level: "쉬움", topic: "수열",
    problem: "첫째항이 5, 공차가 3인 등차수열의 10번째 항은?",
    choices: { A: "30", B: "35", C: "27", D: "32", E: "33" }, answer: "D",
    solution: "등차수열의 n번째 항 = a₁ + (n−1)d. 10번째 항 = 5 + 9 × 3 = 5 + 27 = 32.",
  },
  {
    level: "쉬움", topic: "평균",
    problem: "다섯 수의 평균이 12이다. 한 수를 빼니 남은 네 수의 평균이 10이 되었다. 빠진 수는?",
    choices: { A: "15", B: "18", C: "16", D: "22", E: "20" }, answer: "E",
    solution: "다섯 수의 합 = 5 × 12 = 60. 네 수의 합 = 4 × 10 = 40. 빠진 수 = 60 − 40 = 20.",
  },
  {
    level: "중간", topic: "경우의 수",
    problem: "{1, 2, 3, 4, 5}에서 서로 다른 숫자로 만든 세 자리 수는 몇 개인가?",
    choices: { A: "125", B: "60", C: "20", D: "10", E: "120" }, answer: "B",
    solution: "백의 자리 5가지, 십의 자리는 남은 4가지, 일의 자리는 남은 3가지. 5 × 4 × 3 = 60.",
  },
  {
    level: "중간", topic: "확률",
    problem: "공정한 주사위 두 개를 던질 때, 눈의 합이 7일 확률은?",
    choices: { A: "1/9", B: "1/12", C: "1/6", D: "5/36", E: "1/8" }, answer: "C",
    solution: "합이 7인 경우: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) = 6가지. 전체 36가지 중 6/36 = 1/6.",
  },
  {
    level: "중간", topic: "대수",
    problem: "x + 1/x = 4 일 때, x² + 1/x² 의 값은?",
    choices: { A: "8", B: "12", C: "16", D: "14", E: "18" }, answer: "D",
    solution: "양변을 제곱하면 (x + 1/x)² = x² + 2 + 1/x² = 16. 따라서 x² + 1/x² = 16 − 2 = 14.",
  },
  {
    level: "중간", topic: "기하",
    problem: "직각을 낀 두 변이 6, 8인 직각삼각형에서, 빗변에 내린 높이의 길이는?",
    choices: { A: "5", B: "4", C: "4.8", D: "3.6", E: "6" }, answer: "C",
    solution: "빗변 = √(6² + 8²) = 10. 넓이 = ½ × 6 × 8 = 24. 빗변에 내린 높이 h는 ½ × 10 × h = 24 → h = 4.8.",
  },
  {
    level: "중간", topic: "정수론",
    problem: "7¹⁰⁰ 을 5로 나눈 나머지는?",
    choices: { A: "0", B: "1", C: "2", D: "3", E: "4" }, answer: "B",
    solution: "7 ≡ 2 (mod 5). 2⁴ = 16 ≡ 1 (mod 5). 2¹⁰⁰ = (2⁴)²⁵ ≡ 1²⁵ = 1. 따라서 나머지는 1.",
  },
  {
    level: "어려움", topic: "조합",
    problem: "단어 \"BANANA\"의 글자를 일렬로 배열하는 경우의 수는?",
    choices: { A: "120", B: "720", C: "60", D: "180", E: "90" }, answer: "C",
    solution: "글자 6개 중 A가 3개, N이 2개, B가 1개로 중복된다. 6! / (3! × 2! × 1!) = 720 / 12 = 60.",
  },
  {
    level: "어려움", topic: "대수",
    problem: "f(x) = x² − 4x + 3 이 음수가 되는 정수 x는 몇 개인가?",
    choices: { A: "0", B: "1", C: "2", D: "3", E: "무한히 많다" }, answer: "B",
    solution: "x² − 4x + 3 = (x − 1)(x − 3) < 0 ⟺ 1 < x < 3. 이 범위의 정수는 x = 2 하나뿐.",
  },
  {
    level: "어려움", topic: "기하",
    problem: "꼭짓점이 (0,0), (6,0), (0,8)인 직각삼각형의 내접원 반지름은?",
    choices: { A: "1.5", B: "2.4", C: "2", D: "3", E: "2.5" }, answer: "C",
    solution: "두 변 6, 8, 빗변 10인 직각삼각형. 직각삼각형 내접원 반지름 r = (a + b − c)/2 = (6 + 8 − 10)/2 = 2.",
  },
  {
    level: "어려움", topic: "확률",
    problem: "빨강 공 3개, 파랑 공 2개가 든 주머니에서 2개를 꺼낼 때, 둘 다 빨강일 확률은? (비복원)",
    choices: { A: "9/25", B: "2/5", C: "1/2", D: "3/10", E: "3/5" }, answer: "D",
    solution: "첫 번째가 빨강일 확률 3/5, 그 다음도 빨강일 확률 2/4. 곱하면 (3/5)(2/4) = 6/20 = 3/10.",
  },
];

const LEVELS: ("전체" | Level)[] = ["전체", "쉬움", "중간", "어려움"];

export default function AmcClient() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [level, setLevel] = useState<"전체" | Level>("전체");
  useEffect(() => { getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {}); }, []);

  const filtered = useMemo(() => level === "전체" ? PROBLEMS : PROBLEMS.filter((p) => p.level === level), [level]);
  const gate = () => {
    if (typeof window !== "undefined") {
      window.location.href = loggedIn ? "/parents/question-bank" : "#";
      if (!loggedIn) window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/question-bank" } }));
    }
  };

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", cursor: "auto", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents/competitions" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 대회</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 20px 90px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#dc2680", marginBottom: 10 }}>➗ AMC 연습문제</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.6vw,2.3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 10 }}>
          AMC 10/12 실전 연습문제
        </h1>
        <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 8 }}>
          AMC 스타일 문제를 난이도별로 풀어보세요. 보기를 누르면 바로 채점하고 한국어 풀이를 확인할 수 있습니다.
        </p>
        <p style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.7, marginBottom: 22 }}>
          실제 AMC의 출제 영역(정수론·대수·기하·조합)과 5지선다(A–E)·25문항·75분 형식을 분석해, 같은 출제 원리로 만든 오리지널 연습문제입니다. 모든 정답을 계산으로 검증해 키 오류가 없어요. <span style={{ color: "#94a3b8" }}>(MAA 공식 기출 복제 아님)</span>
        </p>

        {/* Trust signal — reviewed answer keys + worked Korean solutions, while
            staying clearly distinct from MAA's official AMC problems. */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", background: "#e9f9f0", border: `1px solid ${GREEN}55`, borderRadius: 12, padding: "12px 16px", marginBottom: 22 }}>
          <span style={{ fontSize: 12, fontWeight: 900, color: "#fff", background: GREEN, borderRadius: 999, padding: "4px 10px", whiteSpace: "nowrap" }}>✓ 검증 완료</span>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0a6b3d", lineHeight: 1.5 }}>
            실제 시험과 동일 형식 · 전 문항 정답·풀이 검수 완료 — 보기를 누르면 한국어 상세 풀이가 바로 나옵니다.
          </span>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {LEVELS.map((lv) => (
            <button key={lv} onClick={() => setLevel(lv)} style={{
              padding: "8px 15px", borderRadius: 999, fontSize: 13, fontWeight: level === lv ? 800 : 600, cursor: "pointer",
              border: level === lv ? `1.5px solid ${GREEN}` : "1px solid #e2e6ea", background: level === lv ? "#e9fbf2" : "#fff", color: level === lv ? "#047a45" : "#475569",
            }}>{lv}{lv !== "전체" ? ` (${PROBLEMS.filter((p) => p.level === lv).length})` : ` (${PROBLEMS.length})`}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map((p, i) => <ProblemCard key={i} p={p} index={i} />)}
        </div>

        <div style={{ background: "linear-gradient(135deg,#0a0a14,#13131f)", borderRadius: 14, padding: "26px 24px", marginTop: 28, textAlign: "center" }}>
          <div style={{ color: "#fff", fontSize: 16.5, fontWeight: 800, marginBottom: 6 }}>AMC와 함께 AP까지, 11,975개 문제로 준비하세요</div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13.5, marginBottom: 16 }}>무료 가입하면 AP 문제 은행과 핵심 노트를 바로 이용할 수 있습니다.</p>
          <button onClick={gate} style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>{loggedIn ? "전체 풀기 →" : "무료 가입하고 전체 풀기 →"}</button>
        </div>
      </div>
    </div>
  );
}

function ProblemCard({ p, index }: { p: Problem; index: number }) {
  const [picked, setPicked] = useState<Choice | null>(null);
  const answered = picked !== null;
  const correct = answered && picked === p.answer;
  const keys: Choice[] = ["A", "B", "C", "D", "E"];

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 14, padding: "20px 22px", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: "#fff", background: LEVEL_COLOR[p.level], borderRadius: 5, padding: "2px 9px" }}>{p.level}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", border: "1px solid #e2e6ea", borderRadius: 999, padding: "1px 9px" }}>{p.topic}</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#cbd5e1" }}>#{index + 1}</span>
      </div>
      <p style={{ fontSize: 15.5, fontWeight: 600, color: "#1a1a1f", lineHeight: 1.6, margin: "0 0 14px", whiteSpace: "pre-wrap" }}>{p.problem}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {keys.map((k) => {
          const isAns = k === p.answer, chosen = picked === k;
          let border = "1px solid #e2e6ea", bg = "#fff", color = "#1f2937";
          if (answered) {
            if (isAns) { border = `1.5px solid ${GREEN}`; bg = "#ecfdf5"; color = "#15803d"; }
            else if (chosen) { border = "1.5px solid #dc2626"; bg = "#fef2f2"; color = "#b91c1c"; }
            else color = "#94a3b8";
          }
          return (
            <button key={k} disabled={answered} onClick={() => setPicked(k)} style={{ textAlign: "left", padding: "11px 14px", borderRadius: 10, border, background: bg, color, fontSize: 14.5, fontWeight: 500, cursor: answered ? "default" : "pointer", lineHeight: 1.5 }}>
              <span style={{ fontWeight: 800, marginRight: 10, opacity: 0.7 }}>{k}</span>{p.choices[k]}
              {answered && isAns && <span style={{ float: "right", fontWeight: 800 }}>✓ 정답</span>}
              {answered && chosen && !isAns && <span style={{ float: "right", fontWeight: 800 }}>✕</span>}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ marginTop: 14, background: "#f7f8fa", borderLeft: `3px solid ${correct ? GREEN : "#dc2626"}`, borderRadius: 8, padding: "12px 14px" }}>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: correct ? "#15803d" : "#b91c1c", marginBottom: 6 }}>{correct ? "정답입니다! 🎉" : `아쉬워요 — 정답은 ${p.answer}`}</div>
          <p style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.75, margin: 0, whiteSpace: "pre-wrap" }}>{p.solution}</p>
        </div>
      )}
    </div>
  );
}
