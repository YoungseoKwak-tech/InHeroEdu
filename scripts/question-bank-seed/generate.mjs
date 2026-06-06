// Deterministic parameterized question generator for quantitative AP subjects.
// Authored by Claude (no API). Produces genuinely distinct MCQs by varying
// numeric parameters; each has a computed-correct answer + tailored explanation.
// Usage: node generate.mjs <seed> <capPerSubject>
// Output: ap-<subject>-gen<seed>.json, consumed by upload.mjs (dedupes on question_text).

import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;

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
const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const sup = (n) => (n < 0 ? "⁻" : "") + String(Math.abs(n)).replace(/[0-9]/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[+d]);
const term = (c, n) => n === 0 ? `${c}` : n === 1 ? `${c}x` : `${c}x${sup(n)}`;

function mc(unit, topic, difficulty, question_text, correct, distractors, explanation) {
  const cstr = String(correct);
  const chosen = [cstr];
  for (const d of distractors) { const s = String(d); if (!chosen.includes(s)) chosen.push(s); if (chosen.length === 4) break; }
  const num = Number(cstr);
  if (chosen.length < 4 && Number.isFinite(num) && /^-?\d+(\.\d+)?$/.test(cstr)) {
    for (const delta of [1, -1, 2, -2, 3, -3, 4, 5]) {
      const s = String(+(num + delta).toFixed(2));
      if (!chosen.includes(s)) chosen.push(s);
      if (chosen.length === 4) break;
    }
  }
  if (chosen.length < 4) return null;
  const opts = shuffle(chosen.map((v, i) => ({ v, ok: i === 0 })));
  const L = ["A", "B", "C", "D"];
  const q = { unit, topic, difficulty, question_text };
  let correct_answer = "A";
  opts.forEach((o, i) => { q["option_" + L[i].toLowerCase()] = o.v; if (o.ok) correct_answer = L[i]; });
  q.correct_answer = correct_answer;
  q.explanation = explanation;
  return q;
}
const uniq = (qs) => { const seen = new Set(); return qs.filter((q) => { if (!q || !q.question_text) return false; if (seen.has(q.question_text)) return false; seen.add(q.question_text); return true; }); };

function calculus() {
  const qs = [];
  for (let a = 2; a <= 16; a++) for (let n = 2; n <= 12; n++)
    qs.push(mc(2, "Differentiation: Definition and Properties", "easy", `d/dx[${term(a, n)}] =`, term(a * n, n - 1),
      [term(a * n, n), term(a, n - 1), term(n, n - 1)], `Power rule: ${a}·${n}x${sup(n - 1)} = ${term(a * n, n - 1)}.`));
  for (let a = 1; a <= 8; a++) for (let b = 2; b <= 9; b++) { const v = a * b * b / 2; if (!Number.isInteger(v)) continue;
    qs.push(mc(6, "Integration and Accumulation", "medium", `∫₀${sup(b)} ${a}x dx =`, v, [a * b * b, a * b, v + a],
      `∫${a}x dx = ${a}x²/2; from 0 to ${b}: ${a}·${b}²/2 = ${v}.`)); }
  for (let a = 1; a <= 6; a++) for (let b = 2; b <= 6; b++) { const v = a * b * b * b / 3; if (!Number.isInteger(v)) continue;
    qs.push(mc(6, "Integration and Accumulation", "medium", `∫₀${sup(b)} ${a}x² dx =`, v, [a * b * b, v + b, a * b * b * b],
      `∫${a}x² dx = ${a}x³/3; from 0 to ${b}: ${a}·${b}³/3 = ${v}.`)); }
  for (let a = 2; a <= 9; a++) for (let c = 2; c <= 9; c++) { if (a === c) continue; const g = gcd(a, c);
    const frac = (a / g === 1 && c / g === 1) ? "1" : `${a / g}/${c / g}`;
    qs.push(mc(1, "Limits and Continuity", "hard", `lim(x→∞) (${a}x² + 1)/(${c}x² + x) =`, frac, [`${a}/${c + 1}`, `${c}/${a}`, "∞"],
      `Same degree: ratio of leading coefficients ${a}/${c} = ${frac}.`)); }
  for (let k = 1; k <= 15; k++) for (let t = 1; t <= 9; t++) { const v = 2 * t - k;
    qs.push(mc(4, "Contextual Applications", "medium", `If position is s(t) = t² − ${k}t, the velocity at t = ${t} is:`, v,
      [v + 1, v - 1, 2 * t + k], `v(t) = 2t − ${k}; at t = ${t}: ${v}.`)); }
  // trig/exp/log derivatives
  for (let k = 2; k <= 9; k++) {
    qs.push(mc(3, "Composite, Implicit, Inverse Differentiation", "medium", `d/dx[sin(${k}x)] =`, `${k}cos(${k}x)`,
      [`cos(${k}x)`, `${k}sin(${k}x)`, `−${k}cos(${k}x)`], `Chain rule: cos(${k}x)·${k} = ${k}cos(${k}x).`));
    qs.push(mc(3, "Composite, Implicit, Inverse Differentiation", "medium", `d/dx[cos(${k}x)] =`, `−${k}sin(${k}x)`,
      [`${k}sin(${k}x)`, `−sin(${k}x)`, `${k}cos(${k}x)`], `Chain rule: −sin(${k}x)·${k} = −${k}sin(${k}x).`));
    qs.push(mc(3, "Composite, Implicit, Inverse Differentiation", "medium", `d/dx[e^(${k}x)] =`, `${k}e^(${k}x)`,
      [`e^(${k}x)`, `${k}x·e^(${k}x)`, `e^(${k})`], `Chain rule: e^(${k}x)·${k} = ${k}e^(${k}x).`));
  }
  // evaluate derivative of polynomial at a point: f=ax^2+bx, f'=2ax+b
  for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) for (const x of [1, 2, 3, 4, 5]) { const v = 2 * a * x + b;
    qs.push(mc(2, "Differentiation: Definition and Properties", "medium", `If f(x) = ${a}x² + ${b}x, then f'(${x}) =`, v,
      [a * x * x + b * x, 2 * a + b, v + b], `f'(x) = ${2 * a}x + ${b}; at x = ${x}: ${2 * a}·${x} + ${b} = ${v}.`)); }
  // geometric series sum a/(1-r)
  for (const a of [2, 3, 4, 6, 8]) for (const r of [0.5, 0.25, 0.2, 0.1]) { const v = +(a / (1 - r)).toFixed(2);
    qs.push(mc(10, "Infinite Sequences and Series", "medium", `The sum of the geometric series with first term ${a} and ratio ${r} is:`, v,
      [+(a * (1 - r)).toFixed(2), +(a / r).toFixed(2), a], `Sum = a/(1 − r) = ${a}/(1 − ${r}) = ${v}.`)); }
  // average value of x^2 on [0,b]
  for (let b = 2; b <= 9; b++) { const v = +(b * b / 3).toFixed(2);
    qs.push(mc(8, "Applications of Integration", "hard", `The average value of f(x) = x² on [0, ${b}] is:`, v,
      [b * b, +(b / 3).toFixed(2), +(b * b * b / 3).toFixed(2)], `Average = (1/${b})∫₀${sup(b)} x² dx = (1/${b})(${b}³/3) = ${v}.`)); }
  return uniq(qs);
}

function statistics() {
  const qs = [];
  for (const mean of [50, 60, 70, 80, 100, 75, 90]) for (const sd of [2, 4, 5, 10, 8]) for (const z of [-2, -1, 1, 2, 1.5, -1.5]) {
    const x = mean + z * sd; if (!Number.isInteger(x)) continue;
    qs.push(mc(1, "Exploring One-Variable Data", "medium", `A value of ${x} comes from a distribution with mean ${mean} and standard deviation ${sd}. Its z-score is:`, z,
      [z + 1, -z, +(z * sd).toFixed(1)], `z = (${x} − ${mean})/${sd} = ${z}.`)); }
  for (const pa of [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]) for (const pb of [0.2, 0.5, 0.4, 0.3, 0.6]) {
    const v = +(pa * pb).toFixed(2);
    qs.push(mc(4, "Probability and Random Variables", "medium", `If A and B are independent with P(A) = ${pa} and P(B) = ${pb}, then P(A and B) =`, v,
      [+(pa + pb).toFixed(2), +(pa + pb - v).toFixed(2), pa], `Independent: P(A and B) = ${pa} × ${pb} = ${v}.`)); }
  for (let a = 1; a <= 9; a++) for (let b = 2; b <= 7; b++) for (const x of [3, 4, 5, 6, 7, 8, 10, 12]) { const v = a + b * x;
    qs.push(mc(9, "Inference for Slopes", "medium", `For the regression line ŷ = ${a} + ${b}x, the predicted value when x = ${x} is:`, v,
      [a * b * x, a + x, b * x], `ŷ = ${a} + ${b}(${x}) = ${v}.`)); }
  for (let lo = 10; lo <= 45; lo += 5) for (const w of [4, 6, 10, 8]) { const hi = lo + w;
    qs.push(mc(6, "Inference for Proportions", "medium", `A confidence interval is (${lo}, ${hi}). The margin of error is:`, w / 2,
      [w, lo + w / 2, lo], `Margin of error = half the width = (${hi} − ${lo})/2 = ${w / 2}.`)); }
  for (let lo = 10; lo <= 45; lo += 5) for (const w of [4, 6, 10, 8]) { const hi = lo + w;
    qs.push(mc(7, "Inference for Means", "medium", `A confidence interval for a mean is (${lo}, ${hi}). The sample mean (point estimate) is:`, lo + w / 2,
      [lo, hi, w], `The center is the point estimate: (${lo} + ${hi})/2 = ${lo + w / 2}.`)); }
  for (let n = 5; n <= 45; n++)
    qs.push(mc(7, "Inference for Means", "easy", `The degrees of freedom for a one-sample t-test with n = ${n} is:`, n - 1,
      [n, n + 1, Math.floor(n / 2)], `df = n − 1 = ${n - 1}.`));
  // binomial mean np
  for (const n of [10, 20, 25, 40, 50, 100]) for (const p of [0.1, 0.2, 0.3, 0.4, 0.5]) { const v = +(n * p).toFixed(1);
    qs.push(mc(4, "Probability and Random Variables", "medium", `For a binomial distribution with n = ${n} and p = ${p}, the expected number of successes is:`, v,
      [+(n / p).toFixed(1), +(n * (1 - p)).toFixed(1), n], `Mean of a binomial = np = ${n} × ${p} = ${v}.`)); }
  // complement
  for (const p of [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.6, 0.7, 0.8]) { const v = +(1 - p).toFixed(2);
    qs.push(mc(4, "Probability and Random Variables", "easy", `If P(A) = ${p}, then P(not A) =`, v, [p, +(p / 2).toFixed(2), 1],
      `Complement rule: P(not A) = 1 − ${p} = ${v}.`)); }
  // standard error sigma/sqrt(n)
  for (const sd of [10, 12, 20, 30, 6]) for (const n of [4, 9, 16, 25, 36]) { const v = +(sd / Math.sqrt(n)).toFixed(2);
    qs.push(mc(5, "Sampling Distributions", "medium", `The standard error of the mean when σ = ${sd} and n = ${n} is:`, v,
      [sd, +(sd / n).toFixed(2), +(sd * Math.sqrt(n)).toFixed(2)], `Standard error = σ/√n = ${sd}/√${n} = ${sd}/${Math.sqrt(n)} = ${v}.`)); }
  return uniq(qs);
}

function csa() {
  const qs = [];
  for (let a = 7; a <= 95; a++) for (const b of [2, 3, 4, 5, 6, 7, 8, 9])
    qs.push(mc(1, "Primitive Types", "easy", `What is ${a} % ${b} in Java?`, a % b, [Math.floor(a / b), (a % b) + 1, b],
      `${a} ÷ ${b} = ${Math.floor(a / b)} remainder ${a % b}, so ${a} % ${b} = ${a % b}.`));
  for (let a = 8; a <= 95; a++) for (const b of [2, 3, 4, 5, 6, 7, 8, 9])
    qs.push(mc(1, "Primitive Types", "medium", `What is ${a} / ${b} (integer division) in Java?`, Math.floor(a / b),
      [+(a / b).toFixed(1), Math.ceil(a / b), a % b], `Integer division truncates: ${a} / ${b} = ${Math.floor(a / b)}.`));
  for (let n = 3; n <= 60; n++) { const v = n * (n + 1) / 2;
    qs.push(mc(4, "Iteration", "medium", `What does total hold? int total=0; for(int i=1;i<=${n};i++) total+=i;`, v, [n, v - n, n * n],
      `Sum 1..${n} = n(n+1)/2 = ${v}.`)); }
  for (const w of ["cat", "java", "hello", "program", "compiler", "variable", "iteration", "recursion", "boolean", "array", "method", "object", "class", "static", "public", "integer", "double", "string"])
    qs.push(mc(2, "Using Objects", "easy", `What does "${w}".length() return?`, w.length, [w.length - 1, w.length + 1, 0],
      `"${w}" has ${w.length} characters.`));
  for (let n = 4; n <= 14; n++) { let count = 0, x = 1; while (x < (1 << n)) { x *= 2; count++; }
    qs.push(mc(4, "Iteration", "hard", `How many times does the body run? int x=1; while(x < ${1 << n}) x*=2;`, count, [count + 1, count - 1, 1 << n],
      `x doubles from 1 to ${1 << n}: ${count} iterations.`)); }
  // factorial recursion values
  for (let n = 2; n <= 8; n++) { let f = 1; for (let i = 2; i <= n; i++) f *= i;
    qs.push(mc(10, "Recursion", "medium", `What does factorial(${n}) return? int factorial(int n){ if(n<=1) return 1; return n*factorial(n-1);}`, f,
      [f - 1, n * n, n * (n - 1)], `factorial(${n}) = ${n}! = ${f}.`)); }
  // Math.max/min/pow
  for (let a = 1; a <= 14; a++) for (let b = 1; b <= 14; b++) { if (a === b) continue;
    qs.push(mc(2, "Using Objects", "easy", `Math.max(${a}, ${b}) returns:`, Math.max(a, b), [Math.min(a, b), a + b, a * b],
      `Math.max returns the larger value: ${Math.max(a, b)}.`));
    qs.push(mc(2, "Using Objects", "easy", `Math.min(${a}, ${b}) returns:`, Math.min(a, b), [Math.max(a, b), a + b, Math.abs(a - b)],
      `Math.min returns the smaller value: ${Math.min(a, b)}.`)); }
  for (let base = 2; base <= 5; base++) for (let exp = 2; exp <= 5; exp++) { const v = Math.pow(base, exp);
    qs.push(mc(2, "Using Objects", "medium", `What is (int) Math.pow(${base}, ${exp})?`, v, [base * exp, v + base, base + exp],
      `Math.pow(${base}, ${exp}) = ${base}^${exp} = ${v}.`)); }
  // string concatenation number + number after string
  for (let a = 1; a <= 12; a++) for (let b = 1; b <= 12; b++)
    qs.push(mc(1, "Primitive Types", "medium", `What is "X=" + ${a} + ${b}?`, `"X=${a}${b}"`, [`"X=${a + b}"`, `${a}${b}`, `"X=${a * b}"`],
      `Once a String appears, + concatenates left to right: "X=" + ${a} = "X=${a}", then + ${b} = "X=${a}${b}".`));
  for (let a = 1; a <= 12; a++) for (let b = 1; b <= 12; b++)
    qs.push(mc(1, "Primitive Types", "medium", `What is ${a} + ${b} + "!"?`, `"${a + b}!"`, [`"${a}${b}!"`, `${a + b}`, `"${a * b}!"`],
      `Left to right: ${a} + ${b} = ${a + b} (both ints), then + "!" concatenates: "${a + b}!".`));
  return uniq(qs);
}

function macro() {
  const qs = [];
  for (const mpc of [0.5, 0.6, 0.75, 0.8, 0.9]) { const m = +(1 / (1 - mpc)).toFixed(2);
    qs.push(mc(3, "National Income and Price Determination", "medium", `If the marginal propensity to consume (MPC) is ${mpc}, the spending multiplier is:`, m,
      [mpc, +(1 / mpc).toFixed(2), +(1 - mpc).toFixed(2)], `Multiplier = 1/(1 − MPC) = 1/(1 − ${mpc}) = ${m}.`));
    const tm = +(-mpc / (1 - mpc)).toFixed(2);
    qs.push(mc(3, "National Income and Price Determination", "hard", `If the MPC is ${mpc}, the tax multiplier is:`, tm,
      [+(1 / (1 - mpc)).toFixed(2), +(mpc).toFixed(2), +(-1 / (1 - mpc)).toFixed(2)], `Tax multiplier = −MPC/(1 − MPC) = −${mpc}/${(1 - mpc).toFixed(2)} = ${tm}.`));
    for (const s of [20, 40, 50, 100, 60]) { const dg = +(s / (1 - mpc)).toFixed(0);
      qs.push(mc(3, "National Income and Price Determination", "hard", `With an MPC of ${mpc}, a $${s} billion increase in government spending raises real GDP by up to:`, `$${dg} billion`,
        [`$${s} billion`, `$${s * 2} billion`, `$${Math.round(s * mpc)} billion`], `${s} × 1/(1 − ${mpc}) = ${s} × ${(1 / (1 - mpc)).toFixed(2)} = $${dg} billion.`)); }
  }
  for (const rr of [0.1, 0.2, 0.25, 0.05, 0.5]) { const m = +(1 / rr).toFixed(2);
    qs.push(mc(4, "Financial Sector", "medium", `If the reserve requirement is ${rr * 100}%, the maximum money multiplier is:`, m,
      [rr, +(rr * 100).toFixed(0), +(1 - rr).toFixed(2)], `Money multiplier = 1/reserve ratio = 1/${rr} = ${m}.`)); }
  for (const lf of [100, 150, 200, 120, 250, 160]) for (const u of [6, 9, 12, 15, 20, 8]) { if (u >= lf) continue; const rate = +((u / lf) * 100).toFixed(1);
    qs.push(mc(2, "Economic Indicators and Business Cycle", "medium", `If the labor force is ${lf} million and ${u} million are unemployed, the unemployment rate is:`, `${rate}%`,
      [`${(u / (lf + u) * 100).toFixed(1)}%`, `${u}%`, `${(lf / u).toFixed(1)}%`], `Rate = ${u}/${lf} = ${rate}%.`)); }
  for (const nom of [3, 4, 5, 6, 7, 8]) for (const inf of [2, 3, 1, 4]) { const r = nom - inf;
    qs.push(mc(2, "Economic Indicators and Business Cycle", "medium", `If nominal wages rise ${nom}% and inflation is ${inf}%, the real wage change is approximately:`, `${r}%`,
      [`${nom + inf}%`, `${inf - nom}%`, `${nom}%`], `Real ≈ nominal − inflation = ${nom}% − ${inf}% = ${r}%.`)); }
  // GDP = C + I + G + Xn
  for (const C of [60, 70, 80]) for (const I of [15, 20, 25]) for (const G of [20, 30]) for (const Xn of [-5, 5, 10]) { const v = C + I + G + Xn;
    qs.push(mc(2, "Economic Indicators and Business Cycle", "medium", `Given C = ${C}, I = ${I}, G = ${G}, and net exports = ${Xn}, GDP equals:`, v,
      [C + I + G, C + I + G - Xn, C + I], `GDP = C + I + G + Xn = ${C} + ${I} + ${G} + (${Xn}) = ${v}.`)); }
  // real GDP growth approx
  for (const nom of [5, 6, 7, 8]) for (const inf of [2, 3, 4]) { const v = nom - inf;
    qs.push(mc(2, "Economic Indicators and Business Cycle", "hard", `If nominal GDP grows ${nom}% and inflation is ${inf}%, real GDP grows approximately:`, `${v}%`,
      [`${nom + inf}%`, `${nom}%`, `${inf}%`], `Real growth ≈ nominal growth − inflation = ${nom}% − ${inf}% = ${v}%.`)); }
  return uniq(qs);
}

function micro() {
  const qs = [];
  for (const e of [0.2, 0.5, 0.8, 1.2, 1.5, 2.0, 0.3, 0.7, 1.1, 1.8, 2.5, 0.9, 1.3]) {
    const ans = e < 1 ? "inelastic" : e > 1 ? "elastic" : "unit elastic";
    qs.push(mc(2, "Supply and Demand", "medium", `If the price elasticity of demand is ${e}, demand is:`, ans,
      [ans === "inelastic" ? "elastic" : "inelastic", "unit elastic", "perfectly elastic"], `Elasticity ${e} is ${e < 1 ? "< 1" : "> 1"}, so demand is ${ans}.`)); }
  for (const e of [0.3, 0.4, 0.5, 0.6, 0.7, 0.8])
    qs.push(mc(2, "Supply and Demand", "hard", `Demand has elasticity ${e}. If the firm raises price, total revenue will:`, "rise",
      ["fall", "stay the same", "drop to zero"], `Inelastic demand (${e} < 1): quantity falls less than price rises, so revenue rises.`));
  for (const e of [1.2, 1.4, 1.6, 1.8, 2.0, 2.5])
    qs.push(mc(2, "Supply and Demand", "hard", `Demand has elasticity ${e}. If the firm raises price, total revenue will:`, "fall",
      ["rise", "stay the same", "double"], `Elastic demand (${e} > 1): quantity falls more than price rises, so revenue falls.`));
  for (const p of [8, 10, 12, 15, 9, 14, 20]) for (const avc of [6, 9, 11, 13, 16]) { const ans = p >= avc ? "operate" : "shut down";
    qs.push(mc(3, "Production, Cost, and Perfect Competition", "medium", `In the short run, if price is $${p} and minimum average variable cost is $${avc}, the firm should:`, ans,
      [ans === "operate" ? "shut down" : "operate", "raise price", "exit immediately"], `Operate if price ≥ min AVC. $${p} ${p >= avc ? "≥" : "<"} $${avc}, so ${ans}.`)); }
  // elasticity computation
  for (const dq of [10, 20, 30]) for (const dp of [5, 10, 15]) { const e = +(dq / dp).toFixed(2); const ans = e < 1 ? "inelastic" : e > 1 ? "elastic" : "unit elastic";
    qs.push(mc(2, "Supply and Demand", "hard", `If quantity demanded falls ${dq}% when price rises ${dp}%, the price elasticity of demand is ${e}, meaning demand is:`, ans,
      [ans === "inelastic" ? "elastic" : "inelastic", "unit elastic", "perfectly inelastic"], `Elasticity = %ΔQ/%ΔP = ${dq}/${dp} = ${e}, which is ${ans}.`)); }
  // profit = (P-ATC)*Q
  for (const p of [12, 15, 20]) for (const atc of [8, 10, 14]) for (const q of [100, 200]) { const v = (p - atc) * q;
    qs.push(mc(3, "Production, Cost, and Perfect Competition", "medium", `A firm sells ${q} units at $${p} each with average total cost $${atc}. Its profit is:`, `$${v}`,
      [`$${p * q}`, `$${(p + atc) * q}`, `$${atc * q}`], `Profit = (P − ATC) × Q = ($${p} − $${atc}) × ${q} = $${v}.`)); }
  return uniq(qs);
}

const builders = { "ap-calculus-bc": calculus, "ap-statistics": statistics, "ap-computer-science-a": csa, "ap-macroeconomics": macro, "ap-microeconomics": micro };
const cap = Number(process.argv[3] || 200);
for (const [subject, fn] of Object.entries(builders)) {
  const all = shuffle(fn()).slice(0, cap);
  fs.writeFileSync(`${OUT}${subject}-gen${seed}.json`, JSON.stringify({ subject, questions: all }, null, 1));
  console.log(`${subject}: pool ${fn().length}, wrote ${all.length} -> ${subject}-gen${seed}.json`);
}
