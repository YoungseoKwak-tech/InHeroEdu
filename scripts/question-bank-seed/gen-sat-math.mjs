/**
 * Procedural SAT Math question generator — real computed problems with correct
 * answers, plausible distractors, and explanations. No API, fully deterministic.
 * Usage: node scripts/question-bank-seed/gen-sat-math.mjs <count> <outFile> [seed]
 */
import fs from "node:fs";

const count = parseInt(process.argv[2] || "200", 10);
const out = process.argv[3] || "/tmp/qbatch/sat-math.json";
const seed = parseInt(process.argv[4] || "1", 10);

function mulberry32(a){return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const rnd = mulberry32(seed * 2654435761 + 17);
const ri = (lo, hi) => lo + Math.floor(rnd() * (hi - lo + 1));
const pick = (a) => a[Math.floor(rnd() * a.length)];
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// Build a question: pick 3 distinct distractors, randomize letter.
function mk(topic, unit, difficulty, q, correct, distractors, explanation) {
  const set = [String(correct)];
  for (const d of distractors) { const s = String(d); if (!set.includes(s)) set.push(s); if (set.length === 4) break; }
  if (set.length < 4) return null;
  const arr = shuffle(set.map((v, i) => ({ v, ok: i === 0 })));
  const L = ["A", "B", "C", "D"];
  const o = {}; let ca = "A";
  arr.forEach((x, i) => { o["option_" + L[i].toLowerCase()] = x.v; if (x.ok) ca = L[i]; });
  return { subject: "sat-math", topic, unit, difficulty, type: "mcq", question_text: q, ...o, correct_answer: ca, explanation };
}

const templates = [
  // 1) Linear equation ax + b = c
  () => { const a = ri(2, 9), x = ri(-6, 9), b = ri(-9, 9); const c = a * x + b;
    return mk("Heart of Algebra", 1, "easy", `If ${a}x ${b >= 0 ? "+ " + b : "- " + -b} = ${c}, what is the value of x?`, x, [x + 1, x - 1, c - b], `Move the constant to the other side: ${a}x = ${c} ${b >= 0 ? "- " + b : "+ " + -b} = ${c - b}. Divide by ${a}: x = ${x}.`); },
  // 2) Percent of a number
  () => { const p = pick([5, 10, 12, 15, 20, 25, 30, 40, 60, 75]); const n = ri(2, 40) * 5; const ans = (p / 100) * n;
    return mk("Problem Solving & Data", 3, "easy", `What is ${p}% of ${n}?`, ans, [ans * 2, ans / 2, n - ans], `${p}% = ${p / 100}. ${p / 100} × ${n} = ${ans}.`); },
  // 3) N is p% of what
  () => { const p = pick([10, 20, 25, 40, 50]); const whole = ri(4, 30) * 10; const part = (p / 100) * whole;
    return mk("Problem Solving & Data", 3, "medium", `${part} is ${p}% of what number?`, whole, [part * (p / 100), whole / 2, part + p], `Let the number be n. ${p / 100}·n = ${part} → n = ${part} ÷ ${p / 100} = ${whole}.`); },
  // 4) Slope between two points
  () => { let x1 = ri(-5, 5), x2 = ri(-5, 5); if (x1 === x2) x2 += 1; const y1 = ri(-6, 6), y2 = ri(-6, 6); const m = (y2 - y1) / (x2 - x1);
    if (!Number.isInteger(m)) return null;
    return mk("Heart of Algebra", 2, "medium", `What is the slope of the line through the points (${x1}, ${y1}) and (${x2}, ${y2})?`, m, [-m, m + 1, (x2 - x1) === 0 ? 0 : (x2 - x1) / (y2 - y1)], `Slope = (y₂−y₁)/(x₂−x₁) = (${y2}−${y1})/(${x2}−${x1}) = ${m}.`); },
  // 5) Evaluate line y = mx + b at x
  () => { const m = ri(-4, 5), b = ri(-7, 7), x = ri(-4, 5); const y = m * x + b;
    return mk("Heart of Algebra", 2, "easy", `The line y = ${m}x ${b >= 0 ? "+ " + b : "- " + -b}. What is y when x = ${x}?`, y, [m + b, y + m, m * x - b], `Substitute x = ${x}: y = ${m}(${x}) ${b >= 0 ? "+ " + b : "- " + -b} = ${y}.`); },
  // 6) System of equations (x+y, x-y)
  () => { const x = ri(-5, 8), y = ri(-5, 8); const s = x + y, d = x - y;
    return mk("Heart of Algebra", 1, "medium", `If x + y = ${s} and x − y = ${d}, what is the value of x?`, x, [y, s, d], `Add the two equations: 2x = ${s + d} → x = ${x}.`); },
  // 7) Exponent product a^m · a^n
  () => { const a = ri(2, 5), m = ri(2, 4), n = ri(2, 4); const ans = m + n;
    return mk("Passport to Advanced Math", 4, "easy", `Simplify ${a}^${m} · ${a}^${n}. The result equals ${a} raised to what power?`, ans, [m * n, m + n + 1, Math.abs(m - n)], `When multiplying powers with the same base, add exponents: ${m} + ${n} = ${ans}.`); },
  // 8) Quadratic solutions (x - r1)(x - r2) = 0 → sum of roots
  () => { const r1 = ri(-6, 6), r2 = ri(-6, 6); const b = -(r1 + r2), c = r1 * r2;
    return mk("Passport to Advanced Math", 4, "medium", `What is the sum of the solutions to x² ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c} = 0?`, r1 + r2, [r1 * r2, -(r1 + r2), Math.abs(r1) + Math.abs(r2)], `For x² + bx + c, the sum of roots is −b = ${r1 + r2} (roots are ${r1} and ${r2}).`); },
  // 9) Mean of a set
  () => { const k = ri(4, 5); const nums = Array.from({ length: k }, () => ri(2, 20)); const sum = nums.reduce((a, c) => a + c, 0); if (sum % k !== 0) nums[0] += (k - (sum % k)); const total = nums.reduce((a, c) => a + c, 0); const mean = total / k;
    return mk("Problem Solving & Data", 3, "easy", `What is the arithmetic mean (average) of the numbers ${nums.join(", ")}?`, mean, [total, mean + 1, Math.round(total / (k + 1))], `Mean = sum ÷ count = ${total} ÷ ${k} = ${mean}.`); },
  // 10) Pythagorean hypotenuse (common triples)
  () => { const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25]]); const sc = pick([1, 1, 2]);
    return mk("Geometry & Trigonometry", 5, "medium", `A right triangle has legs of length ${a * sc} and ${b * sc}. What is the length of the hypotenuse?`, c * sc, [(a + b) * sc, (c + 1) * sc, (a * a + b * b) * sc], `Hypotenuse = √(${a * sc}² + ${b * sc}²) = √${(a * sc) ** 2 + (b * sc) ** 2} = ${c * sc}.`); },
  // 11) Rectangle area
  () => { const w = ri(3, 18), h = ri(3, 18); const ar = w * h;
    return mk("Geometry & Trigonometry", 5, "easy", `A rectangle has width ${w} and height ${h}. What is its area?`, ar, [2 * (w + h), w + h, ar + w], `Area = width × height = ${w} × ${h} = ${ar}.`); },
  // 12) Function evaluation f(x)=ax^2+bx+c
  () => { const a = ri(1, 3), b = ri(-4, 4), c = ri(-5, 5), k = ri(-3, 3); const fk = a * k * k + b * k + c;
    return mk("Passport to Advanced Math", 4, "medium", `If f(x) = ${a}x² ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}, what is f(${k})?`, fk, [a * k + b + c, fk + a, a * k * k - b * k + c], `f(${k}) = ${a}(${k})² ${b >= 0 ? "+ " + b : "- " + -b}(${k}) ${c >= 0 ? "+ " + c : "- " + -c} = ${fk}.`); },
  // 13) Rate: distance = rate × time
  () => { const r = ri(30, 70), t = ri(2, 8); const dist = r * t;
    return mk("Problem Solving & Data", 3, "easy", `A car travels at ${r} miles per hour for ${t} hours. How many miles does it travel?`, dist, [r + t, dist / 2, r * (t + 1)], `Distance = rate × time = ${r} × ${t} = ${dist} miles.`); },
  // 14) Proportion
  () => { const a = ri(2, 6), b = ri(2, 6), mult = ri(2, 6); const c = a * mult, x = b * mult;
    return mk("Problem Solving & Data", 3, "medium", `If ${a} is to ${b} as ${c} is to x, what is x?`, x, [c - a + b, a * b, c + b], `Set up the proportion ${a}/${b} = ${c}/x. Cross-multiply: x = ${c} × ${b} ÷ ${a} = ${x}.`); },
  // 15) Percent increase
  () => { const base = ri(4, 20) * 5; const p = pick([10, 20, 25, 50]); const ans = base + base * p / 100;
    return mk("Problem Solving & Data", 3, "medium", `A price of $${base} increases by ${p}%. What is the new price?`, ans, [base * p / 100, base - base * p / 100, base + p], `Increase = ${p}% of ${base} = ${base * p / 100}. New price = ${base} + ${base * p / 100} = ${ans}.`); },
];

const out_arr = [];
const seen = new Set();
let guard = 0;
while (out_arr.length < count && guard < count * 40) {
  guard++;
  const q = pick(templates)();
  if (!q) continue;
  if (seen.has(q.question_text)) continue;
  seen.add(q.question_text);
  out_arr.push(q);
}

fs.mkdirSync(out.replace(/\/[^/]+$/, ""), { recursive: true });
fs.writeFileSync(out, JSON.stringify(out_arr, null, 1));
console.log(`SAT Math: wrote ${out_arr.length} questions to ${out}`);
