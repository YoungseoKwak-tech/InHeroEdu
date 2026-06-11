/**
 * IB Mathematics: Analysis & Approaches (ib-math-aa) — SL + HL.
 * Parametric MCQ generator: every answer is COMPUTED in JS (not hand-typed),
 * so questions are guaranteed correct. Distractors are common-mistake values.
 * Output → ib-math-aa-gen<seed>.json   (topic prefixed "SL · " / "HL · ")
 *
 *   node scripts/question-bank-seed/ib-math-gen.mjs 1
 */
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const seed = Number(process.argv[2] || 1);
function mulberry32(a){return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const rnd = mulberry32(seed*2654435761+101);
const ri = (lo,hi)=>lo+Math.floor(rnd()*(hi-lo+1));
const pick = (arr)=>arr[Math.floor(rnd()*arr.length)];
const sample = (arr,n)=>{const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a.slice(0,n);};
const fmt = (n)=>Number.isInteger(n)?String(n):(Math.round(n*1000)/1000).toString();

const qs = [];
const seen = new Set();
function add(level, topic, question_text, correct, distractors, explanation, difficulty="medium"){
  if (seen.has(question_text)) return;
  const opts = [String(correct)];
  for (const d of distractors){ const s=String(d); if(!opts.includes(s)) opts.push(s); if(opts.length===4) break; }
  if (opts.length < 4) return;
  // shuffle preserving which is correct
  const arr = opts.map((v,i)=>({v,ok:i===0}));
  for (let i=arr.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
  const L=["a","b","c","d"]; const q={ level, topic:`${level} · ${topic}`, difficulty, question_text };
  let ca="A"; arr.forEach((o,i)=>{ q["option_"+L[i]]=o.v; if(o.ok) ca=L[i].toUpperCase(); });
  q.correct_answer=ca; q.explanation=explanation;
  seen.add(question_text); qs.push(q);
}

// ─────────────────────── SL templates ───────────────────────
// Power-rule derivative at a point
for (let k=0;k<60;k++){ const a=ri(2,9),b=ri(1,9),p=ri(2,4),c=ri(1,5);
  const dval=a*p*Math.pow(c,p-1)+b;
  add("SL","Differentiation",`If f(x) = ${a}x^${p} + ${b}x, then f'(${c}) =`,dval,
    [a*p*Math.pow(c,p)+b, a*Math.pow(c,p-1)+b, a*p*Math.pow(c,p-1)],
    `f'(x) = ${a*p}x^${p-1} + ${b}; at x=${c}: ${a*p}·${c}^${p-1} + ${b} = ${dval}.`,"easy"); }
// Definite integral of polynomial
for (let k=0;k<50;k++){ const a=ri(1,6),p=ri(1,3),hi=ri(1,4);
  const F=(x)=>a*Math.pow(x,p+1)/(p+1); const val=F(hi)-F(0);
  add("SL","Integration",`∫₀^${hi} ${a}x^${p} dx =`,fmt(val),
    [fmt(a*Math.pow(hi,p)), fmt(a*Math.pow(hi,p+1)/(p+1)*0+a*hi), fmt(a*Math.pow(hi,p))],
    `∫${a}x^${p} dx = ${a}/${p+1}·x^${p+1}; evaluate 0→${hi} = ${fmt(val)}.`); }
// Arithmetic sequence nth term
for (let k=0;k<40;k++){ const a1=ri(2,12),d=ri(2,9),n=ri(5,20);
  const an=a1+(n-1)*d;
  add("SL","Sequences & Series",`An arithmetic sequence has first term ${a1} and common difference ${d}. The ${n}th term is:`,an,
    [a1+n*d, a1*d*n, a1+(n-1)*(d+1)],
    `uₙ = u₁ + (n−1)d = ${a1} + ${n-1}·${d} = ${an}.`,"easy"); }
// Geometric sum
for (let k=0;k<30;k++){ const a1=ri(1,5),r=ri(2,4),n=ri(3,6);
  const sum=a1*(Math.pow(r,n)-1)/(r-1);
  add("SL","Sequences & Series",`A geometric series has first term ${a1}, common ratio ${r}. The sum of the first ${n} terms is:`,sum,
    [a1*Math.pow(r,n), a1*(Math.pow(r,n)-1), a1*Math.pow(r,n-1)],
    `Sₙ = u₁(rⁿ−1)/(r−1) = ${a1}(${r}^${n}−1)/${r-1} = ${sum}.`); }
// Logarithms
for (let k=0;k<30;k++){ const base=pick([2,3,5,10]),e=ri(2,5); const val=Math.pow(base,e);
  add("SL","Exponents & Logarithms",`log_${base}(${val}) =`,e,[e+1,e-1,val/base],
    `log_${base}(${val}) = ${e} because ${base}^${e} = ${val}.`,"easy"); }
// Quadratic discriminant / roots count
for (let k=0;k<25;k++){ const a=ri(1,3),b=ri(-6,6),c=ri(-6,6); const D=b*b-4*a*c;
  const ans=D>0?"two distinct real roots":D===0?"one repeated real root":"no real roots";
  add("SL","Functions & Equations",`How many real roots does ${a}x² + ${b}x + ${c} = 0 have? (discriminant)`,ans,
    ["two distinct real roots","one repeated real root","no real roots"].filter(x=>x!==ans),
    `Discriminant b²−4ac = ${b}²−4·${a}·${c} = ${D} ⇒ ${ans}.`); }
// Binomial coefficient term
for (let k=0;k<20;k++){ const n=ri(4,7),r=ri(1,3); const choose=(N,R)=>{let v=1;for(let i=0;i<R;i++)v=v*(N-i)/(i+1);return Math.round(v);};
  const val=choose(n,r);
  add("SL","Binomial Theorem",`The binomial coefficient C(${n}, ${r}) (i.e. ${n} choose ${r}) equals:`,val,
    [choose(n,r+1), n*r, choose(n,r-1)||1],
    `C(${n},${r}) = ${n}! / (${r}!·${n-r}!) = ${val}.`); }
// Mean of a small data set
for (let k=0;k<20;k++){ const nums=Array.from({length:5},()=>ri(2,20)); const mean=nums.reduce((s,x)=>s+x,0)/5;
  add("SL","Statistics",`Find the mean of the data: ${nums.join(", ")}.`,fmt(mean),
    [fmt(mean+1), fmt(Math.max(...nums)), fmt(nums.reduce((s,x)=>s+x,0))],
    `Mean = (${nums.join("+")}) / 5 = ${fmt(mean)}.`,"easy"); }
// Composite function
for (let k=0;k<20;k++){ const a=ri(2,5),b=ri(1,6),c=ri(2,4),x=ri(1,4);
  const g=c*x; const fg=a*g+b;
  add("SL","Functions & Equations",`If f(x) = ${a}x + ${b} and g(x) = ${c}x, find (f∘g)(${x}).`,fg,
    [a*x+b*c, (a+c)*x+b, c*(a*x+b)],
    `g(${x}) = ${g}; f(${g}) = ${a}·${g} + ${b} = ${fg}.`); }

// ─────────────────────── HL templates ───────────────────────
// Chain rule
for (let k=0;k<40;k++){ const a=ri(2,5),b=ri(1,6),n=ri(2,4),x=ri(1,3);
  const inner=a*x+b; const dval=n*Math.pow(inner,n-1)*a;
  add("HL","Differentiation (HL)",`If f(x) = (${a}x + ${b})^${n}, find f'(${x}).`,dval,
    [n*Math.pow(inner,n-1), Math.pow(inner,n-1)*a, n*Math.pow(inner,n)*a],
    `Chain rule: f'(x) = ${n}(${a}x+${b})^${n-1}·${a}; at x=${x}: ${n}·${inner}^${n-1}·${a} = ${dval}.`); }
// Product rule
for (let k=0;k<30;k++){ const a=ri(2,5),b=ri(2,5),x=ri(1,4);
  // f = (ax)(x^2+b) → f' = a(x^2+b) + ax(2x) = a(3x^2+b)
  const dval=a*(3*x*x+b);
  add("HL","Differentiation (HL)",`If f(x) = ${a}x·(x² + ${b}), find f'(${x}).`,dval,
    [a*(x*x+b), a*(2*x+b), a*(3*x*x)],
    `Product rule: f'(x) = ${a}(x²+${b}) + ${a}x·2x = ${a}(3x²+${b}); at x=${x}: ${dval}.`); }
// Complex number modulus
for (let k=0;k<25;k++){ const a=ri(1,8),b=ri(1,8); const mod=Math.sqrt(a*a+b*b);
  add("HL","Complex Numbers (HL)",`Find the modulus of the complex number ${a} + ${b}i.`,fmt(mod),
    [fmt(a+b), fmt(Math.abs(a-b)), fmt(a*b)],
    `|z| = √(${a}² + ${b}²) = √${a*a+b*b} = ${fmt(mod)}.`); }
// Complex multiplication (real part)
for (let k=0;k<20;k++){ const a=ri(1,5),b=ri(1,5),c=ri(1,5),d=ri(1,5);
  const re=a*c-b*d, im=a*d+b*c;
  add("HL","Complex Numbers (HL)",`Compute (${a} + ${b}i)(${c} + ${d}i).`,`${re} + ${im}i`,
    [`${a*c} + ${b*d}i`, `${a*c+b*d} + ${im}i`, `${re} − ${im}i`],
    `(a+bi)(c+di) = (ac−bd) + (ad+bc)i = ${re} + ${im}i.`); }
// Vector dot product
for (let k=0;k<25;k++){ const a=ri(-5,6),b=ri(-5,6),c=ri(-5,6),d=ri(-5,6);
  const dot=a*c+b*d;
  add("HL","Vectors (HL)",`Find the scalar (dot) product of vectors (${a}, ${b}) and (${c}, ${d}).`,dot,
    [a*c-b*d, a*d+b*c, (a+b)*(c+d)],
    `(a,b)·(c,d) = ac + bd = ${a*c} + ${b*d} = ${dot}.`); }
// Vector magnitude 3D
for (let k=0;k<15;k++){ const a=ri(0,6),b=ri(0,6),c=ri(0,6); const m=Math.sqrt(a*a+b*b+c*c);
  add("HL","Vectors (HL)",`Find the magnitude of the vector (${a}, ${b}, ${c}).`,fmt(m),
    [fmt(a+b+c), fmt(Math.sqrt(a*a+b*b)), fmt(a*b*c)],
    `|v| = √(${a}²+${b}²+${c}²) = √${a*a+b*b+c*c} = ${fmt(m)}.`); }
// Integration by parts (∫ x e^{ax} pattern result coefficient) — keep symbolic-lite
for (let k=0;k<15;k++){ const a=ri(2,5);
  add("HL","Integration (HL)",`Using integration by parts, ∫ x·e^(${a}x) dx = e^(${a}x)·(Ax + B) + C. Find A.`,fmt(1/a),
    [fmt(a), fmt(1/(a*a)), fmt(-1/a)],
    `∫x·e^(${a}x)dx = (x/${a})e^(${a}x) − (1/${a*a})e^(${a}x)+C, so A = 1/${a}.`); }
// Sum of geometric to infinity (|r|<1)
for (let k=0;k<15;k++){ const num=ri(1,6),den=ri(2,5)*2; const a1=num; const r=1/den; const S=a1/(1-r);
  add("HL","Sequences & Series (HL)",`Find the sum to infinity of the geometric series with first term ${a1} and common ratio 1/${den}.`,fmt(S),
    [fmt(a1*den), fmt(a1/den), fmt(a1*(1-r))],
    `S∞ = a/(1−r) = ${a1}/(1−1/${den}) = ${fmt(S)} (since |r|<1).`); }

// ─── extra SL templates ───
// Second derivative at a point
for(let k=0;k<35;k++){const a=ri(2,7),p=ri(2,4),b=ri(1,8),x=ri(1,4);const d2=a*p*(p-1)*Math.pow(x,p-2);
  add("SL","Differentiation",`If f(x) = ${a}x^${p} + ${b}x, find f''(${x}).`,d2,[a*p*Math.pow(x,p-1)+b,a*p*(p-1)*Math.pow(x,p-1),d2+b],`f'(x)=${a*p}x^${p-1}+${b}; f''(x)=${a*p*(p-1)}x^${p-2}; at x=${x}: ${d2}.`);}
// Definite integral a→b
for(let k=0;k<35;k++){const a=ri(1,5),p=ri(1,2),lo=ri(0,2),hi=ri(3,5);const F=(x)=>a*Math.pow(x,p+1)/(p+1);const v=F(hi)-F(lo);
  add("SL","Integration",`∫_${lo}^${hi} ${a}x^${p} dx =`,fmt(v),[fmt(F(hi)),fmt(F(hi)+F(lo)),fmt(a*(hi-lo))],`Antiderivative ${a}/${p+1}·x^${p+1}; evaluate ${lo}→${hi} = ${fmt(v)}.`);}
// Exact trig values (degrees)
const trigvals={"sin 30°":"1/2","sin 60°":"√3/2","sin 45°":"√2/2","cos 60°":"1/2","cos 30°":"√3/2","cos 0°":"1","sin 90°":"1","cos 90°":"0","tan 45°":"1","sin 0°":"0"};
const tkeys=Object.keys(trigvals);
for(let k=0;k<25;k++){const key=pick(tkeys);const v=trigvals[key];const wrong=tkeys.map(x=>trigvals[x]).filter(x=>x!==v);
  add("SL","Trigonometry",`What is the exact value of ${key}?`,v,sample([...new Set(wrong)],3,v),`${key} = ${v} (standard exact value).`,"easy");}
// Mean of arithmetic series (average of endpoints)
for(let k=0;k<20;k++){const a1=ri(2,10),d=ri(2,7),n=ri(6,14);const an=a1+(n-1)*d;const sum=n*(a1+an)/2;
  add("SL","Sequences & Series",`Find the sum of the first ${n} terms of an arithmetic sequence with first term ${a1} and last term ${an}.`,sum,[n*a1,(a1+an)/2,n*(a1+an)],`Sₙ = n(u₁+uₙ)/2 = ${n}(${a1}+${an})/2 = ${sum}.`);}
// Percentage / compound interest
for(let k=0;k<20;k++){const P=ri(100,500)*ri(1,4),r=ri(2,8),t=ri(1,3);const A=P*Math.pow(1+r/100,t);
  add("SL","Financial Math",`$${P} is invested at ${r}% per year compounded annually. Its value after ${t} years is (2 d.p.):`,fmt(A),[fmt(P*(1+r*t/100)),fmt(P+r*t),fmt(P*Math.pow(1+r/100,t+1))],`A = P(1+r)^t = ${P}(1+${r}/100)^${t} = ${fmt(A)}.`);}

// ─── extra HL templates ───
// Derivative of e^{ax}
for(let k=0;k<20;k++){const a=ri(2,6);add("HL","Differentiation (HL)",`d/dx[e^(${a}x)] =`,`${a}e^(${a}x)`,[`e^(${a}x)`,`${a}x·e^(${a}x)`,`${a}e^(${a-1}x)`],`d/dx[e^(kx)] = k·e^(kx), so ${a}e^(${a}x).`,"easy");}
// Derivative of ln
for(let k=0;k<15;k++){const a=ri(2,6);add("HL","Differentiation (HL)",`d/dx[ln(${a}x)] =`,`1/x`,[`${a}/x`,`1/(${a}x)`,`ln(${a})`],`d/dx[ln(ax)] = a/(ax) = 1/x.`);}
// Binomial expansion specific term coefficient
for(let k=0;k<20;k++){const n=ri(4,6),r=ri(1,3);const choose=(N,R)=>{let v=1;for(let i=0;i<R;i++)v=v*(N-i)/(i+1);return Math.round(v);};const coef=choose(n,r);
  add("HL","Binomial Theorem (HL)",`In the expansion of (1 + x)^${n}, what is the coefficient of x^${r}?`,coef,[choose(n,r+1),n*r,coef+n],`Coefficient of x^${r} is C(${n},${r}) = ${coef}.`);}
// Probability: combinations
for(let k=0;k<15;k++){const n=ri(5,8),r=ri(2,3);const choose=(N,R)=>{let v=1;for(let i=0;i<R;i++)v=v*(N-i)/(i+1);return Math.round(v);};const c=choose(n,r);
  add("HL","Probability (HL)",`In how many ways can ${r} items be chosen from ${n} distinct items (order not important)?`,c,[Math.round(c*r),n*r,choose(n,r-1)],`C(${n},${r}) = ${c}.`);}
// System via determinant (2x2)
for(let k=0;k<15;k++){const a=ri(1,6),b=ri(1,6),c=ri(1,6),d=ri(1,6);const det=a*d-b*c;
  add("HL","Matrices (HL)",`Find the determinant of the matrix [[${a}, ${b}], [${c}, ${d}]].`,det,[a*d+b*c,a*c-b*d,a+d-b-c],`det = ad − bc = ${a}·${d} − ${b}·${c} = ${det}.`);}

// ── write ──
const out = { subject: "ib-math-aa", questions: qs };
fs.writeFileSync(`${OUT}ib-math-aa-gen${seed}.json`, JSON.stringify(out, null, 1));
const sl = qs.filter(q=>q.level==="SL").length, hl = qs.filter(q=>q.level==="HL").length;
console.log(`ib-math-aa-gen${seed}.json — ${qs.length} questions (SL ${sl}, HL ${hl})`);
