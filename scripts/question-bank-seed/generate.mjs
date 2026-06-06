// Deterministic parameterized question generator for quantitative AP subjects.
// Authored by Claude (no API). Produces genuinely distinct MCQs by varying
// numeric parameters; each has a computed-correct answer + tailored explanation.
// Output: one JSON file per subject (ap-<subject>-genN.json) consumed by upload.mjs,
// which dedupes on question_text so any collisions with hand-authored items are skipped.

import fs from "node:fs";

const OUT = new URL(".", import.meta.url).pathname;

// Seeded PRNG so runs are reproducible and successive runs differ by seed.
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const seed = Number(process.argv[2] || 1);
const rnd = mulberry32(seed * 100003 + 7);
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// Build a question: correct value + distractors -> shuffled options + letter.
// Guarantees 4 distinct options; returns null if it can't (caller filters).
function mc(unit, topic, difficulty, question_text, correct, distractors, explanation) {
  const cstr = String(correct);
  const chosen = [cstr];
  for (const d of distractors) { const s = String(d); if (!chosen.includes(s)) chosen.push(s); if (chosen.length === 4) break; }
  // Pad with numeric perturbations if the answer is a plain number and we're short.
  const num = Number(cstr);
  if (chosen.length < 4 && Number.isFinite(num) && /^-?\d+(\.\d+)?$/.test(cstr)) {
    for (const delta of [1, -1, 2, -2, 3, num * 2 - num]) {
      const s = String(+(num + delta).toFixed(2));
      if (!chosen.includes(s)) chosen.push(s);
      if (chosen.length === 4) break;
    }
  }
  if (chosen.length < 4) return null; // can't make a clean 4-option item
  const opts = shuffle(chosen.map((v, i) => ({ v, ok: i === 0 })));
  const L = ["A", "B", "C", "D"];
  const q = { unit, topic, difficulty, question_text };
  let correct_answer = "A";
  opts.forEach((o, i) => { q["option_" + L[i].toLowerCase()] = o.v; if (o.ok) correct_answer = L[i]; });
  q.correct_answer = correct_answer;
  q.explanation = explanation;
  return q;
}
const uniq = (qs) => { const seen = new Set(); return qs.filter((q) => { if (!q) return false; if (seen.has(q.question_text)) return false; seen.add(q.question_text); return true; }); };
const sup = (n) => String(n).replace(/[0-9]/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[+d]);
const term = (c, n) => n === 0 ? `${c}` : n === 1 ? `${c}x` : `${c}x${sup(n)}`;

function calculus() {
  const qs = [];
  // Power rule
  for (let a = 2; a <= 9; a++) for (let n = 2; n <= 9; n++) {
    const d = a * n, e = n - 1;
    qs.push(mc(2, "Differentiation: Definition and Properties", "easy",
      `d/dx[${term(a, n)}] =`, term(d, e),
      [term(a * n, n), term(a, e), term(n, e)],
      `Power rule: bring down the exponent and reduce it by one: ${a}·${n}x${sup(e)} = ${term(d, e)}.`));
  }
  // Definite integral of a*x from 0 to b
  for (let a = 1; a <= 8; a++) for (let b = 2; b <= 9; b++) {
    const val = a * b * b / 2;
    if (!Number.isInteger(val)) continue;
    qs.push(mc(6, "Integration and Accumulation", "medium",
      `∫₀${sup(b)} ${a}x dx =`, val,
      [a * b * b, a * b, val + a],
      `∫${a}x dx = ${a}x²/2; evaluate from 0 to ${b}: ${a}·${b}²/2 = ${val}.`));
  }
  // Limit of rational function (same degree)
  for (let a = 2; a <= 9; a++) for (let c = 2; c <= 9; c++) {
    if (a === c) continue;
    const g = gcd(a, c);
    const frac = a / g === 1 && c / g === 1 ? "1" : `${a / g}/${c / g}`;
    qs.push(mc(1, "Limits and Continuity", "hard",
      `lim(x→∞) (${a}x² + 1)/(${c}x² + x) =`, frac,
      [`${a}/${c === a ? c + 1 : c}`, `${c}/${a}`, "∞"],
      `Same degree (2): the limit is the ratio of leading coefficients ${a}/${c}, simplified to ${frac}.`));
  }
  // Velocity from position s(t)=t^2 - k t
  for (let k = 1; k <= 9; k++) for (let t = 1; t <= 6; t++) {
    const v = 2 * t - k;
    qs.push(mc(4, "Contextual Applications", "medium",
      `If position is s(t) = t² − ${k}t, the velocity at t = ${t} is:`, v,
      [v + 1, v - 1, 2 * t + k],
      `v(t) = s'(t) = 2t − ${k}; at t = ${t}: 2(${t}) − ${k} = ${v}.`));
  }
  return uniq(qs);
}
function gcd(a, b) { return b ? gcd(b, a % b) : a; }

function statistics() {
  const qs = [];
  // z-scores
  for (const mean of [50, 60, 70, 80, 100]) for (const sd of [2, 4, 5, 10]) for (const z of [-2, -1, 1, 2]) {
    const x = mean + z * sd;
    qs.push(mc(1, "Exploring One-Variable Data", "medium",
      `A value of ${x} comes from a distribution with mean ${mean} and standard deviation ${sd}. Its z-score is:`, z,
      [z + 1, -z, z * sd],
      `z = (x − mean)/sd = (${x} − ${mean})/${sd} = ${z}. The z-score gives distance from the mean in standard deviations.`));
  }
  // independent probability
  for (const pa of [0.2, 0.3, 0.4, 0.5, 0.6]) for (const pb of [0.2, 0.5, 0.4, 0.3]) {
    const v = +(pa * pb).toFixed(2);
    qs.push(mc(4, "Probability and Random Variables", "medium",
      `If A and B are independent with P(A) = ${pa} and P(B) = ${pb}, then P(A and B) =`, v,
      [+(pa + pb).toFixed(2), +(pa + pb - v).toFixed(2), pa],
      `For independent events, P(A and B) = P(A)·P(B) = ${pa} × ${pb} = ${v}.`));
  }
  // regression prediction yhat = a + b x
  for (let a = 1; a <= 6; a++) for (let b = 2; b <= 5; b++) for (const x of [4, 5, 6, 10]) {
    const v = a + b * x;
    qs.push(mc(9, "Inference for Slopes", "medium",
      `For the regression line ŷ = ${a} + ${b}x, the predicted value when x = ${x} is:`, v,
      [a * b * x, a + x, b * x],
      `Substitute: ŷ = ${a} + ${b}(${x}) = ${v}.`));
  }
  // margin of error: half interval width
  for (let lo = 10; lo <= 40; lo += 5) for (const w of [4, 6, 10]) {
    const hi = lo + w, moe = w / 2, mid = lo + w / 2;
    qs.push(mc(6, "Inference for Proportions", "medium",
      `A confidence interval is (${lo}, ${hi}). The margin of error is:`, moe,
      [w, mid, lo],
      `Margin of error is half the width: (${hi} − ${lo})/2 = ${moe}.`));
  }
  // df for one-sample t
  for (let n = 5; n <= 40; n++) {
    qs.push(mc(7, "Inference for Means", "easy",
      `The degrees of freedom for a one-sample t-test with n = ${n} is:`, n - 1,
      [n, n + 1, Math.floor(n / 2)],
      `For a one-sample t-test, df = n − 1 = ${n - 1}.`));
  }
  return uniq(qs);
}

function csa() {
  const qs = [];
  // modulus
  for (let a = 7; a <= 40; a++) for (const b of [2, 3, 4, 5]) {
    qs.push(mc(1, "Primitive Types", "easy",
      `What is ${a} % ${b} in Java?`, a % b,
      [Math.floor(a / b), (a % b) + 1, b],
      `The modulus operator returns the remainder: ${a} ÷ ${b} = ${Math.floor(a / b)} remainder ${a % b}, so ${a} % ${b} = ${a % b}.`));
  }
  // integer division
  for (let a = 8; a <= 40; a++) for (const b of [2, 3, 4, 5]) {
    qs.push(mc(1, "Primitive Types", "medium",
      `What is ${a} / ${b} (integer division) in Java?`, Math.floor(a / b),
      [+(a / b).toFixed(1), Math.ceil(a / b), a % b],
      `Integer division truncates the decimal: ${a} / ${b} = ${Math.floor(a / b)} (remainder discarded).`));
  }
  // loop sum 1..n
  for (let n = 3; n <= 25; n++) {
    const v = n * (n + 1) / 2;
    qs.push(mc(4, "Iteration", "medium",
      `What does total hold? int total=0; for(int i=1;i<=${n};i++) total+=i;`, v,
      [n, v - n, n * n],
      `This sums 1 to ${n}: n(n+1)/2 = ${n}·${n + 1}/2 = ${v}.`));
  }
  // string length
  for (const w of ["cat", "java", "hello", "program", "compiler", "variable", "iteration", "recursion", "boolean", "array"]) {
    qs.push(mc(2, "Using Objects", "easy",
      `What does "${w}".length() return?`, w.length,
      [w.length - 1, w.length + 1, 0],
      `length() counts the characters in "${w}", which is ${w.length}.`));
  }
  // power of 2 doubling loop count
  for (let n = 4; n <= 12; n++) {
    let count = 0, x = 1; while (x < (1 << n)) { x *= 2; count++; }
    qs.push(mc(4, "Iteration", "hard",
      `How many times does the body run? int x=1; while(x < ${1 << n}) x*=2;`, count,
      [count + 1, count - 1, 1 << n],
      `x doubles from 1 until reaching ${1 << n}: it runs ${count} times (2^${count} = ${1 << n}).`));
  }
  return uniq(qs);
}

function macro() {
  const qs = [];
  // spending multiplier
  for (const mpc of [0.5, 0.6, 0.75, 0.8, 0.9]) {
    const m = +(1 / (1 - mpc)).toFixed(2);
    qs.push(mc(3, "National Income and Price Determination", "medium",
      `If the marginal propensity to consume (MPC) is ${mpc}, the spending multiplier is:`, m,
      [mpc, +(1 / mpc).toFixed(2), +(1 - mpc).toFixed(2)],
      `Spending multiplier = 1/(1 − MPC) = 1/(1 − ${mpc}) = ${m}.`));
    for (const s of [20, 40, 50, 100]) {
      const dg = +(s * m).toFixed(0);
      qs.push(mc(3, "National Income and Price Determination", "hard",
        `With an MPC of ${mpc}, a $${s} billion increase in government spending raises real GDP by up to:`, `$${dg} billion`,
        [`$${s} billion`, `$${s * 2} billion`, `$${Math.round(s * mpc)} billion`],
        `Multiplier = 1/(1 − ${mpc}) = ${m}; ${s} × ${m} = $${dg} billion.`));
    }
  }
  // unemployment rate
  for (const lf of [100, 150, 200, 120, 250]) for (const u of [6, 9, 12, 15, 20]) {
    if (u >= lf) continue;
    const rate = +((u / lf) * 100).toFixed(1);
    qs.push(mc(2, "Economic Indicators and Business Cycle", "medium",
      `If the labor force is ${lf} million and ${u} million are unemployed, the unemployment rate is:`, `${rate}%`,
      [`${(u / (lf + u) * 100).toFixed(1)}%`, `${u}%`, `${(lf / u).toFixed(1)}%`],
      `Unemployment rate = unemployed ÷ labor force = ${u}/${lf} = ${rate}%.`));
  }
  // real wage / inflation
  for (const nom of [3, 4, 5, 6, 7]) for (const inf of [2, 3, 1]) {
    const r = nom - inf;
    qs.push(mc(2, "Economic Indicators and Business Cycle", "medium",
      `If nominal wages rise ${nom}% and inflation is ${inf}%, the real wage change is approximately:`, `${r}%`,
      [`${nom + inf}%`, `${inf - nom}%`, `${nom}%`],
      `Real change ≈ nominal − inflation = ${nom}% − ${inf}% = ${r}%.`));
  }
  return uniq(qs);
}

function micro() {
  const qs = [];
  // price elasticity classification
  for (const e of [0.2, 0.5, 0.8, 1.2, 1.5, 2.0]) {
    const ans = e < 1 ? "inelastic" : e > 1 ? "elastic" : "unit elastic";
    qs.push(mc(2, "Supply and Demand", "medium",
      `If the price elasticity of demand is ${e}, demand is:`, ans,
      [ans === "inelastic" ? "elastic" : "inelastic", "unit elastic", "perfectly elastic"],
      `Elasticity ${e} is ${e < 1 ? "less than" : "greater than"} 1, so demand is ${ans}.`));
  }
  // total revenue test
  for (const e of [0.4, 0.6, 0.8]) {
    qs.push(mc(2, "Supply and Demand", "hard",
      `Demand has elasticity ${e}. If the firm raises price, total revenue will:`, "rise",
      ["fall", "stay the same", "drop to zero"],
      `With inelastic demand (${e} < 1), quantity falls less than price rises, so total revenue rises.`));
  }
  for (const e of [1.4, 1.8, 2.5]) {
    qs.push(mc(2, "Supply and Demand", "hard",
      `Demand has elasticity ${e}. If the firm raises price, total revenue will:`, "fall",
      ["rise", "stay the same", "double"],
      `With elastic demand (${e} > 1), quantity falls more than price rises, so total revenue falls.`));
  }
  // consumer/producer surplus midpoint (perfect price discrimination conceptual) - skip numeric
  // marginal cost decisions: produce if P >= AVC
  for (const p of [8, 10, 12, 15]) for (const avc of [6, 9, 11]) {
    const ans = p >= avc ? "operate" : "shut down";
    qs.push(mc(3, "Production, Cost, and Perfect Competition", "medium",
      `In the short run, if price is $${p} and minimum average variable cost is $${avc}, the firm should:`, ans,
      [ans === "operate" ? "shut down" : "operate", "raise price", "exit immediately"],
      `Operate in the short run if price ≥ min AVC. Here $${p} ${p >= avc ? "≥" : "<"} $${avc}, so the firm should ${ans}.`));
  }
  return uniq(qs);
}

const builders = {
  "ap-calculus-bc": calculus,
  "ap-statistics": statistics,
  "ap-computer-science-a": csa,
  "ap-macroeconomics": macro,
  "ap-microeconomics": micro,
};

const cap = Number(process.argv[3] || 120);
for (const [subject, fn] of Object.entries(builders)) {
  const all = shuffle(fn()).slice(0, cap);
  const file = `${OUT}${subject}-gen${seed}.json`;
  fs.writeFileSync(file, JSON.stringify({ subject, questions: all }, null, 1));
  console.log(`${subject}: wrote ${all.length} -> ${subject}-gen${seed}.json`);
}
