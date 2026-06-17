/**
 * AMC 10 / AMC 12 / AIME — fully COMPUTED competition-math generator.
 * Every correct answer is computed in JS (deterministic, no API), so keys are
 * guaranteed right; distractors are plausible-but-wrong and de-duped.
 *
 * Each item carries a DETAILED, AMC-solution-grade explanation in BOTH English
 * (`explanation`) and Korean (`explanation_korean`) — concept → method →
 * substitution → arithmetic → answer, with common-trap notes where natural.
 *
 * AMC items are 5-choice (A–E), matching the real contest. AIME answers are
 * integers 0–999; presented as 5-choice MCQs (near-value integer distractors)
 * so they fit the bank's MCQ UI while staying real problems.
 *
 * Output → amc-10-gen<seed>.json, amc-12-gen<seed>.json, aime-gen<seed>.json
 * each shaped { subject, questions:[...] } for upload.mjs.
 *
 *   node scripts/question-bank-seed/amc-gen.mjs 1
 */
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const seed = Number(process.argv[2] || 1);

function mulberry32(a){return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const rnd = mulberry32(seed*1000003+7);
const ri = (lo,hi) => lo + Math.floor(rnd()*(hi-lo+1));
const pick = (a) => a[Math.floor(rnd()*a.length)];

// ── math helpers ──────────────────────────────────────────────────────────
const gcd = (a,b) => { a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a; };
const lcm = (a,b) => a/gcd(a,b)*b;
function comb(n,k){ if(k<0||k>n) return 0; k=Math.min(k,n-k); let r=1; for(let i=0;i<k;i++) r=r*(n-i)/(i+1); return Math.round(r); }
function perm(n,k){ let r=1; for(let i=0;i<k;i++) r*=n-i; return r; }
function factorize(n){ const f={}; for(let p=2;p*p<=n;p++){ while(n%p===0){ f[p]=(f[p]||0)+1; n/=p; } } if(n>1) f[n]=(f[n]||0)+1; return f; }
function divisorCount(n){ const f=factorize(n); return Object.values(f).reduce((p,e)=>p*(e+1),1); }
function divisorSum(n){ const f=factorize(n); return Object.entries(f).reduce((p,[pr,e])=>p*((Math.pow(+pr,e+1)-1)/(pr-1)),1); }
function unitsDigit(a,n){ let u=a%10, r=1; for(let i=0;i<n;i++) r=(r*u)%10; return r; }
function modpow(base,exp,mod){ let r=1; base%=mod; while(exp>0){ if(exp&1) r=(r*base)%mod; base=(base*base)%mod; exp=Math.floor(exp/2);} return r; }
function factStr(n){ const f=factorize(n); return Object.entries(f).map(([p,e])=>e>1?`${p}^${e}`:`${p}`).join(" × "); }
const ord = (b)=> b>=0?`+ ${b}`:`− ${-b}`;
const sumSq = (n)=> n*(n+1)*(2*n+1)/6;            // 1²+2²+…+n²
const sumCubes = (n)=> Math.pow(n*(n+1)/2,2);     // 1³+2³+…+n³
function trailingZeros(n){ let c=0; for(let p=5;p<=n;p*=5) c+=Math.floor(n/p); return c; } // zeros of n!

// ── MCQ builder (5 choices), EN + KO explanations ───────────────────────────
function mk(subject){
  const qs=[]; const seen=new Set();
  function add(topic,question_text,correct,distractors,en,ko,difficulty="medium"){
    if(seen.has(question_text)) return;
    const opts=[String(correct)];
    for(const d of distractors){ const s=String(d); if(!opts.includes(s)) opts.push(s); if(opts.length===5) break; }
    if(opts.length<5) return; // need 5 distinct, all-wrong distractors → else drop (never a wrong key)
    const arr=opts.map((v,i)=>({v,ok:i===0}));
    for(let i=arr.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
    const L=["a","b","c","d","e"]; const q={subject,topic,difficulty,question_text}; let ca="A";
    arr.forEach((o,i)=>{ q["option_"+L[i]]=o.v; if(o.ok) ca=L[i].toUpperCase(); });
    q.correct_answer=ca; q.explanation=en.trim(); q.explanation_korean=ko.trim(); q.type="mcq";
    seen.add(question_text); qs.push(q);
  }
  return {qs,add,subject};
}

// ── shared AMC template bank. `hard` toggles the AMC-12-only harder items. ──
function fillAMC(B,{hard}){
  const D = hard ? "hard" : "medium";

  // 1) Counting multiples of d in [a,b]
  for(let k=0;k<26;k++){ const d=ri(2,9), a=ri(1,40), b=a+ri(20,120);
    const hb=Math.floor(b/d), ha=Math.floor((a-1)/d), c=hb-ha;
    B.add("Counting & Probability",`How many integers from ${a} to ${b} inclusive are divisible by ${d}?`,
      c,[c+1,c-1,Math.floor(b/d),Math.floor((b-a)/d)],
`The number of positive multiples of ${d} that are ≤ N equals ⌊N/${d}⌋. To count the multiples in the range [${a}, ${b}], subtract the count below the lower endpoint from the count up to the upper endpoint:
  ⌊${b}/${d}⌋ − ⌊(${a}−1)/${d}⌋ = ${hb} − ${ha} = ${c}.
We use ${a}−1 rather than ${a} so that the lower endpoint itself is counted whenever it is a multiple of ${d}. A common slip is to compute ⌊(${b}−${a})/${d}⌋, which miscounts the endpoints. The answer is ${c}.`,
`N 이하인 ${d}의 양의 배수의 개수는 ⌊N/${d}⌋ 입니다. 구간 [${a}, ${b}] 안의 배수의 개수를 구하려면, 상한까지의 개수에서 하한 아래의 개수를 빼면 됩니다:
  ⌊${b}/${d}⌋ − ⌊(${a}−1)/${d}⌋ = ${hb} − ${ha} = ${c}.
하한 ${a} 자신이 ${d}의 배수일 때도 포함되도록 ${a} 대신 ${a}−1을 사용합니다. ⌊(${b}−${a})/${d}⌋로 계산하면 양 끝점을 잘못 세게 되는 흔한 실수입니다. 따라서 답은 ${c}입니다.`,"easy"); }

  // 2) Two dice: ways to roll a given sum
  for(let s=2;s<=12;s++){ const ways=6-Math.abs(s-7);
    B.add("Counting & Probability",`When two standard six-sided dice are rolled, in how many of the 36 equally likely outcomes is the sum equal to ${s}?`,
      ways,[ways+1,Math.max(1,ways-1),s,Math.max(1,13-s)],
`List the ordered pairs (first die, second die) that add to ${s}. The number of such pairs for a sum s with two dice is 6 − |s − 7|, because sums are symmetric about 7 (the most likely sum, with 6 ways). Here:
  6 − |${s} − 7| = 6 − ${Math.abs(s-7)} = ${ways}.
So there are ${ways} favorable ordered outcomes out of 36.`,
`두 주사위의 눈의 합이 ${s}가 되는 (첫째, 둘째) 순서쌍을 셉니다. 두 주사위에서 합이 s가 되는 경우의 수는 6 − |s − 7| 입니다. 합은 7을 중심으로 대칭이고(가장 경우가 많아 6가지), 따라서:
  6 − |${s} − 7| = 6 − ${Math.abs(s-7)} = ${ways}.
즉 36가지 중 유리한 순서쌍은 ${ways}가지입니다.`,"easy"); }

  // 3) Combinations C(n,r)
  for(let k=0;k<20;k++){ const n=ri(5,12), r=ri(2,Math.min(5,n-1)); const c=comb(n,r);
    B.add("Counting & Probability",`In how many ways can a committee of ${r} people be chosen from a group of ${n} people?`,
      c,[perm(n,r),comb(n,r-1),comb(n+1,r),n*r],
`Order does not matter when forming a committee, so we use a combination:
  C(${n}, ${r}) = ${n}! / (${r}! · ${n-r}!) = ${c}.
The trap answer ${perm(n,r)} counts ordered selections (the permutation P(${n},${r}) = ${n}!/${n-r}!), which over-counts each committee ${r}! = ${perm(r,r)} times. Dividing by ${r}! gives the correct ${c}.`,
`위원회를 뽑을 때는 순서가 중요하지 않으므로 조합을 사용합니다:
  C(${n}, ${r}) = ${n}! / (${r}! · ${n-r}!) = ${c}.
함정 보기 ${perm(n,r)}은 순서를 구별하는 순열 P(${n},${r}) = ${n}!/${n-r}!로, 각 위원회를 ${r}! = ${perm(r,r)}번씩 중복해서 셉니다. ${r}!로 나누면 올바른 값 ${c}가 됩니다.`,D); }

  // 4) Number of positive divisors
  for(let k=0;k<18;k++){ const n=ri(12,1500); const c=divisorCount(n);
    B.add("Number Theory",`How many positive divisors does ${n} have?`,
      c,[c+1,c-1,Math.floor(n/2),c+2],
`Factor ${n} into primes: ${n} = ${factStr(n)}. If n = p₁^a₁ · p₂^a₂ ⋯, the number of positive divisors is (a₁+1)(a₂+1)⋯ — each prime's exponent can independently range from 0 up to its maximum. Applying this:
  d(${n}) = ${Object.values(factorize(n)).map(e=>`(${e}+1)`).join("·")} = ${c}.
So ${n} has ${c} positive divisors.`,
`${n}을 소인수분해합니다: ${n} = ${factStr(n)}. n = p₁^a₁ · p₂^a₂ ⋯ 일 때 양의 약수의 개수는 (a₁+1)(a₂+1)⋯ 입니다. 각 소수의 지수를 0부터 최댓값까지 독립적으로 고를 수 있기 때문입니다. 적용하면:
  d(${n}) = ${Object.values(factorize(n)).map(e=>`(${e}+1)`).join("·")} = ${c}.
따라서 ${n}의 양의 약수는 ${c}개입니다.`,D); }

  // 5) LCM
  for(let k=0;k<16;k++){ const a=ri(4,18), b=ri(4,18); if(a===b) continue; const g=gcd(a,b), l=lcm(a,b);
    B.add("Number Theory",`What is the least common multiple of ${a} and ${b}?`,
      l,[a*b,g,l+a,l-b],
`Use the identity lcm(a,b) · gcd(a,b) = a·b. First find gcd(${a}, ${b}) = ${g} (the largest integer dividing both). Then:
  lcm(${a}, ${b}) = ${a}·${b} / gcd(${a}, ${b}) = ${a*b} / ${g} = ${l}.
The trap ${a*b} is the product, which equals the lcm only when the numbers are coprime (gcd = 1); here gcd = ${g}, so we must divide it out.`,
`항등식 lcm(a,b) · gcd(a,b) = a·b 를 이용합니다. 먼저 gcd(${a}, ${b}) = ${g} (둘을 모두 나누는 가장 큰 정수)를 구합니다. 그러면:
  lcm(${a}, ${b}) = ${a}·${b} / gcd(${a}, ${b}) = ${a*b} / ${g} = ${l}.
함정 보기 ${a*b}은 두 수의 곱으로, 서로소(gcd = 1)일 때만 lcm과 같습니다. 여기서는 gcd = ${g}이므로 반드시 나누어야 합니다.`,"easy"); }

  // 6) Units digit of a^n
  for(let k=0;k<16;k++){ const a=ri(2,9), n=ri(3,400); const u=unitsDigit(a,n);
    const cyc=[]; { let x=a%10; const start=a%10; const first=a%10; do{ cyc.push(x); x=(x*start)%10; }while(x!==first && cyc.length<10); }
    const len=cyc.length, pos=((n-1)%len);
    B.add("Number Theory",`What is the units digit of ${a}^${n}?`,
      u,[(u+1)%10,(u+2)%10,(u+5)%10,(u+7)%10],
`Only the units digit of the base affects the units digit of a power, and these cycle. The units digits of ${a}¹, ${a}², ${a}³, … cycle through [${cyc.join(", ")}] with period ${len}. Since ${n} ≡ ${pos+1} (mod ${len}) in position, the units digit is the ${pos+1}${["st","nd","rd"][pos]||"th"} entry of the cycle, namely ${u}.`,
`거듭제곱의 일의 자리는 밑의 일의 자리에만 영향을 받고, 이는 주기적으로 반복됩니다. ${a}¹, ${a}², ${a}³, … 의 일의 자리는 [${cyc.join(", ")}] 로 주기 ${len}을 가지고 순환합니다. ${n}을 ${len}로 나눈 위치가 ${pos+1}번째이므로, 일의 자리는 이 주기의 ${pos+1}번째 값인 ${u}입니다.`,D); }

  // 7) Arithmetic series 1..n
  for(let k=0;k<14;k++){ const n=ri(10,300); const s=n*(n+1)/2;
    B.add("Algebra",`What is the value of the sum 1 + 2 + 3 + ⋯ + ${n}?`,
      s,[n*n,n*(n+1),(n-1)*n/2,n*(n-1)],
`Pair the first and last terms: 1 + ${n} = ${n+1}, 2 + ${n-1} = ${n+1}, and so on. There are ${n} terms forming ${n}/2 such pairs, each summing to ${n+1}. Equivalently use the closed form:
  S = n(n+1)/2 = ${n}·${n+1}/2 = ${s}.
This is Gauss's classic telescoping/pairing argument.`,
`첫 항과 끝 항을 짝지으면: 1 + ${n} = ${n+1}, 2 + ${n-1} = ${n+1}, … 입니다. 항이 ${n}개이므로 합이 ${n+1}인 짝이 ${n}/2개 만들어집니다. 공식으로 쓰면:
  S = n(n+1)/2 = ${n}·${n+1}/2 = ${s}.
가우스의 고전적인 짝짓기(텔레스코핑) 방법입니다.`,"easy"); }

  // 8) Vieta sum/product
  for(let k=0;k<16;k++){ const r1=ri(-8,8), r2=ri(-8,8); const b=-(r1+r2), c=r1*r2;
    const wantSum = (k%2===0); const tgt = wantSum ? r1+r2 : r1*r2;
    B.add("Algebra",`The quadratic x² ${ord(b)}x ${ord(c)} = 0 has roots r and s. What is the ${wantSum?"sum r + s":"product rs"} of its roots?`,
      tgt,[wantSum?r1*r2:r1+r2,-tgt,tgt+1,tgt-1],
`For a monic quadratic x² + Bx + C = 0, Vieta's formulas give r + s = −B and rs = C — no need to actually solve for the roots. Here B = ${b} and C = ${c}, so the sum of the roots is −B = ${r1+r2} and the product is C = ${r1*r2}. The requested ${wantSum?"sum":"product"} is ${tgt}. (As a check, the roots are ${r1} and ${r2}.)`,
`최고차항 계수가 1인 이차식 x² + Bx + C = 0에서 근과 계수의 관계(비에타 공식)에 의해 r + s = −B, rs = C 입니다 — 근을 직접 구할 필요가 없습니다. 여기서 B = ${b}, C = ${c}이므로 두 근의 합은 −B = ${r1+r2}, 곱은 C = ${r1*r2}입니다. 구하는 ${wantSum?"합":"곱"}은 ${tgt}입니다. (확인하면 두 근은 ${r1}, ${r2}입니다.)`,D); }

  // 9) Missing value to hit target average
  for(let k=0;k<14;k++){ const cnt=ri(4,6), target=ri(10,40);
    const nums=Array.from({length:cnt-1},()=>ri(5,50)); const have=nums.reduce((p,x)=>p+x,0);
    const missing=target*cnt-have; if(missing<1||missing>200) continue;
    B.add("Algebra",`The ${cnt} numbers ${nums.join(", ")}, and one unknown value have an average of ${target}. What is the unknown value?`,
      missing,[target,Math.round(have/(cnt-1)),missing+target,Math.abs(missing-cnt)],
`Average = (sum of all values) / (count), so the sum of all ${cnt} numbers must equal ${target} · ${cnt} = ${target*cnt}. The ${cnt-1} known numbers add to ${nums.join(" + ")} = ${have}. Therefore the unknown value is:
  ${target*cnt} − ${have} = ${missing}.`,
`평균 = (모든 값의 합) / (개수) 이므로, ${cnt}개 수의 합은 ${target} · ${cnt} = ${target*cnt} 이어야 합니다. 알려진 ${cnt-1}개의 수의 합은 ${nums.join(" + ")} = ${have} 입니다. 따라서 모르는 값은:
  ${target*cnt} − ${have} = ${missing} 입니다.`,D); }

  // 10) Shoelace / base-height triangle area
  for(let k=0;k<14;k++){ const x2=ri(2,12), x3=ri(0,12), y3=ri(2,12);
    const area=Math.abs(x2*y3)/2; if(!Number.isInteger(area)) continue;
    B.add("Geometry",`A triangle has vertices at (0, 0), (${x2}, 0), and (${x3}, ${y3}). What is its area?`,
      area,[area*2,area+x2,x2*y3,Math.max(1,area-1)],
`Take the side from (0,0) to (${x2},0) as the base; it lies on the x-axis and has length ${x2}. The height is the perpendicular distance from the third vertex (${x3}, ${y3}) to the x-axis, which is just its y-coordinate, ${y3}. Then:
  Area = ½ · base · height = ½ · ${x2} · ${y3} = ${area}.
(The shoelace formula gives the same value.) The trap ${x2*y3} forgets the factor of ½.`,
`(0,0)에서 (${x2},0)으로 가는 변을 밑변으로 잡으면, 이 변은 x축 위에 있고 길이는 ${x2}입니다. 높이는 세 번째 꼭짓점 (${x3}, ${y3})에서 x축까지의 수직 거리, 즉 y좌표 ${y3}입니다. 따라서:
  넓이 = ½ · 밑변 · 높이 = ½ · ${x2} · ${y3} = ${area}.
(신발끈 공식으로도 같은 값이 나옵니다.) 함정 보기 ${x2*y3}은 ½을 빠뜨린 것입니다.`,"easy"); }

  // 11) Pythagorean hypotenuse
  for(let k=0;k<12;k++){ const t=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]]); const sc=pick([1,1,2]);
    const A=t[0]*sc, Bl=t[1]*sc, C=t[2]*sc;
    B.add("Geometry",`A right triangle has legs of length ${A} and ${Bl}. What is the length of its hypotenuse?`,
      C,[(t[0]+t[1])*sc,(t[2]+1)*sc,(t[0]+t[2])*sc,Math.max(1,(t[2]-1)*sc)],
`By the Pythagorean theorem, hypotenuse² = leg² + leg²:
  c² = ${A}² + ${Bl}² = ${A*A} + ${Bl*Bl} = ${A*A+Bl*Bl}, so c = √${A*A+Bl*Bl} = ${C}.
These legs are a multiple of the (${t[0]}, ${t[1]}, ${t[2]}) Pythagorean triple, so the hypotenuse is exactly ${C}. The trap ${(t[0]+t[1])*sc} just adds the legs, which is never correct for a right triangle.`,
`피타고라스 정리에 의해 빗변² = 한 변² + 다른 변²:
  c² = ${A}² + ${Bl}² = ${A*A} + ${Bl*Bl} = ${A*A+Bl*Bl}, 따라서 c = √${A*A+Bl*Bl} = ${C}.
두 변은 (${t[0]}, ${t[1]}, ${t[2]}) 피타고라스 수의 배수이므로 빗변은 정확히 ${C}입니다. 함정 보기 ${(t[0]+t[1])*sc}은 두 변을 그냥 더한 것으로, 직각삼각형에서는 결코 옳지 않습니다.`,"easy"); }

  // 12) Remainder a mod m
  for(let k=0;k<12;k++){ const m=ri(3,20), q=ri(5,150), r=ri(0,m-1); const n=m*q+r;
    B.add("Number Theory",`What is the remainder when ${n} is divided by ${m}?`,
      r,[(r+1)%m,(r+2)%m,(r+m-1)%m,m-r||1],
`Divide: ${n} = ${m} · ${q} + ${r}, where 0 ≤ ${r} < ${m}. The remainder is the leftover after removing the largest multiple of ${m} not exceeding ${n} (which is ${m}·${q} = ${m*q}). Hence ${n} − ${m*q} = ${r}, so the remainder is ${r}.`,
`나눗셈을 하면 ${n} = ${m} · ${q} + ${r}, 여기서 0 ≤ ${r} < ${m}입니다. 나머지는 ${n}을 넘지 않는 가장 큰 ${m}의 배수(${m}·${q} = ${m*q})를 뺀 나머지입니다. 즉 ${n} − ${m*q} = ${r}이므로 나머지는 ${r}입니다.`,"easy"); }

  // 13) Sequence nth term (arithmetic)
  for(let k=0;k<12;k++){ const a1=ri(-15,20), dd=ri(2,12), n=ri(8,120); const an=a1+(n-1)*dd;
    B.add("Algebra",`An arithmetic sequence has first term ${a1} and common difference ${dd}. What is its ${n}th term?`,
      an,[a1+n*dd,a1+(n-1)*(dd+1),an+dd,an-dd],
`The nth term of an arithmetic sequence is aₙ = a₁ + (n − 1)d. We add the common difference (n − 1) times — not n times — because the first term already starts the count. Substituting:
  a₍${n}₎ = ${a1} + (${n} − 1)·${dd} = ${a1} + ${(n-1)*dd} = ${an}.`,
`등차수열의 일반항은 aₙ = a₁ + (n − 1)d 입니다. 공차를 n번이 아니라 (n − 1)번 더하는 이유는, 첫째 항이 이미 시작점이기 때문입니다. 대입하면:
  a₍${n}₎ = ${a1} + (${n} − 1)·${dd} = ${a1} + ${(n-1)*dd} = ${an}.`,D); }

  // 14) Probability as reduced fraction (marbles)
  for(let k=0;k<12;k++){ const fav=ri(2,7), tot=ri(fav+3,16); const g=gcd(fav,tot); const num=fav/g, den=tot/g;
    B.add("Counting & Probability",`A bag contains ${tot} marbles, ${fav} of which are red. If one marble is drawn at random, what is the probability it is red, in lowest terms?`,
      `${num}/${den}`,[`${fav}/${tot+fav}`,`${den}/${num}`,`${fav}/${tot-fav}`,`${num+1}/${den}`],
`Probability = (favorable outcomes)/(total outcomes) = ${fav}/${tot}. Reduce by the gcd of ${fav} and ${tot}, which is ${g}:
  ${fav}/${tot} = (${fav}÷${g})/(${tot}÷${g}) = ${num}/${den}.
So the probability in lowest terms is ${num}/${den}.`,
`확률 = (유리한 경우)/(전체 경우) = ${fav}/${tot}. ${fav}와 ${tot}의 최대공약수 ${g}로 약분하면:
  ${fav}/${tot} = (${fav}÷${g})/(${tot}÷${g}) = ${num}/${den}.
따라서 기약분수로 나타낸 확률은 ${num}/${den}입니다.`,D); }

  // 15) Percent increase
  for(let k=0;k<10;k++){ const base=ri(20,600), p=pick([10,12,15,20,25,40,50]); const val=base*(1+p/100); if(!Number.isInteger(val)) continue;
    B.add("Algebra",`A quantity of ${base} is increased by ${p}%. What is the new value?`,
      val,[base+p,base*p/100,base*(1-p/100),val+p],
`A ${p}% increase multiplies the original by (1 + ${p}/100) = ${1+p/100}. The increase itself is ${p}% of ${base} = ${base*p/100}, and adding it back gives:
  ${base} + ${base*p/100} = ${val}.
Equivalently ${base} × ${1+p/100} = ${val}. The trap ${base+p} adds the percent as if it were a raw number.`,
`${p}% 증가는 원래 값에 (1 + ${p}/100) = ${1+p/100}을 곱하는 것입니다. 증가량은 ${base}의 ${p}% = ${base*p/100}이고, 이를 더하면:
  ${base} + ${base*p/100} = ${val}.
즉 ${base} × ${1+p/100} = ${val}입니다. 함정 보기 ${base+p}은 퍼센트를 그냥 수처럼 더한 것입니다.`,"easy"); }

  // 16) Sum of squares 1²+…+n²
  for(let k=0;k<12;k++){ const n=ri(5,40); const s=sumSq(n), T=n*(n+1)/2;
    B.add("Algebra",`What is the value of 1² + 2² + 3² + ⋯ + ${n}²?`,
      s,[s-n*n,T,2*s,s+1],
`The sum of the first n perfect squares has the closed form 1² + 2² + ⋯ + n² = n(n+1)(2n+1)/6. Substituting n = ${n}:
  S = ${n}·${n+1}·${2*n+1}/6 = ${n*(n+1)*(2*n+1)} / 6 = ${s}.
The trap ${T} is the sum 1 + 2 + ⋯ + ${n} = n(n+1)/2 (squares vs. the numbers themselves). The answer is ${s}.`,
`처음 n개의 제곱수의 합은 1² + 2² + ⋯ + n² = n(n+1)(2n+1)/6 입니다. n = ${n}을 대입하면:
  S = ${n}·${n+1}·${2*n+1}/6 = ${n*(n+1)*(2*n+1)} / 6 = ${s}.
함정 보기 ${T}은 1 + 2 + ⋯ + ${n} = n(n+1)/2 (제곱이 아니라 수 자체의 합)입니다. 답은 ${s}입니다.`,D); }

  // 17) GCD of two numbers
  for(let k=0;k<12;k++){ const a=ri(6,90), b=ri(6,90); if(a===b) continue; const g=gcd(a,b);
    B.add("Number Theory",`What is the greatest common divisor of ${a} and ${b}?`,
      g,[lcm(a,b),Math.min(a,b),g+1,Math.abs(a-b)||1,2*g,g+2],
`The greatest common divisor is the largest integer dividing both numbers. Using the Euclidean algorithm (repeatedly replace the larger by its remainder mod the smaller), gcd(${a}, ${b}) = ${g}. The trap ${lcm(a,b)} is the least common multiple, which is the smallest number both divide — the opposite extreme. The answer is ${g}.`,
`최대공약수는 두 수를 모두 나누는 가장 큰 정수입니다. 유클리드 호제법(큰 수를 작은 수로 나눈 나머지로 반복 치환)으로 gcd(${a}, ${b}) = ${g} 입니다. 함정 보기 ${lcm(a,b)}은 최소공배수로, 두 수가 모두 나누는 가장 작은 수(정반대 개념)입니다. 답은 ${g}입니다.`,D); }

  // 18) Distance = speed × time
  for(let k=0;k<10;k++){ const v=ri(20,90), t=ri(2,9); const d=v*t;
    B.add("Algebra",`A car travels at a constant speed of ${v} miles per hour for ${t} hours. How many miles does it travel?`,
      d,[v+t,d+v,v*(t+1),Math.max(1,d-v)],
`Distance equals speed multiplied by time: d = v · t. Substituting v = ${v} mph and t = ${t} h:
  d = ${v} · ${t} = ${d} miles.
The trap ${v+t} adds the rate and time, but units (mph and hours) only combine correctly through multiplication, which cancels hours and leaves miles. The answer is ${d}.`,
`거리 = 속력 × 시간 입니다: d = v · t. v = ${v} mph, t = ${t} 시간을 대입하면:
  d = ${v} · ${t} = ${d} 마일.
함정 보기 ${v+t}은 속력과 시간을 더한 것이지만, 단위(mph와 시간)는 곱셈으로만 올바르게 결합되어 시간이 약분되고 마일이 남습니다. 답은 ${d}입니다.`,D); }

  // 19) Trailing zeros of n!
  for(let k=0;k<10;k++){ const n=ri(25,300); const z=trailingZeros(n);
    B.add("Number Theory",`How many trailing zeros does ${n}! (${n} factorial) end with?`,
      z,[z+1,z-1,Math.floor(n/5),Math.floor(n/2)],
`A trailing zero comes from a factor of 10 = 2 · 5, and 5's are scarcer than 2's, so we count factors of 5 in ${n}! (Legendre's formula):
  ⌊${n}/5⌋ + ⌊${n}/25⌋ + ⌊${n}/125⌋ + ⋯ = ${(()=>{const parts=[];for(let p=5;p<=n;p*=5)parts.push(Math.floor(n/p));return parts.join(" + ");})()} = ${z}.
The trap ⌊${n}/5⌋ = ${Math.floor(n/5)} counts only the first power of 5 and misses higher powers (25, 125, …). The answer is ${z}.`,
`끝자리 0은 10 = 2 · 5 의 인수에서 나오고, 5가 2보다 적으므로 ${n}! 속 5의 개수를 셉니다 (르장드르 공식):
  ⌊${n}/5⌋ + ⌊${n}/25⌋ + ⌊${n}/125⌋ + ⋯ = ${(()=>{const parts=[];for(let p=5;p<=n;p*=5)parts.push(Math.floor(n/p));return parts.join(" + ");})()} = ${z}.
함정 보기 ⌊${n}/5⌋ = ${Math.floor(n/5)}은 5의 1제곱만 세고 더 높은 거듭제곱(25, 125, …)을 놓친 것입니다. 답은 ${z}입니다.`,"hard"); }

  // 20) Solve a linear equation ax + b = c
  for(let k=0;k<12;k++){ const a=ri(2,9), x0=ri(-9,12), b=ri(-15,15); const c=a*x0+b;
    B.add("Algebra",`Solve for x: ${a}x ${ord(b)} = ${c}.`,
      x0,[x0+1,x0-1,c-b,a+b,x0+2],
`Isolate x. Subtract ${b} from both sides: ${a}x = ${c} ${ord(-b)} = ${c-b}. Then divide by ${a}:
  x = ${c-b} / ${a} = ${x0}.
The trap ${c-b} stops after subtracting and forgets to divide by the coefficient ${a}. The answer is x = ${x0}.`,
`x를 분리합니다. 양변에서 ${b}을 빼면: ${a}x = ${c} ${ord(-b)} = ${c-b}. 그다음 ${a}로 나누면:
  x = ${c-b} / ${a} = ${x0}.
함정 보기 ${c-b}은 빼기만 하고 계수 ${a}로 나누는 것을 잊은 값입니다. 답은 x = ${x0}입니다.`,D); }

  // 21) Number of diagonals of a convex polygon
  for(let k=0;k<10;k++){ const n=ri(5,30); const d=n*(n-3)/2;
    B.add("Counting & Probability",`How many diagonals does a convex polygon with ${n} sides have?`,
      d,[n*(n-1)/2,n*(n-3),d+n,n,n*(n-2)/2],
`Each vertex connects to ${n}−3 others by a diagonal (excluding itself and its two neighbors). That counts ${n}·(${n}−3) endpoints, but each diagonal is counted twice (once from each end), so divide by 2:
  D = ${n}(${n}−3)/2 = ${n}·${n-3}/2 = ${d}.
The trap ${n*(n-1)/2} counts all segments between vertices, including the ${n} sides. The answer is ${d}.`,
`각 꼭짓점은 자기 자신과 양 옆 두 점을 제외한 ${n}−3개의 점과 대각선으로 연결됩니다. 이는 ${n}·(${n}−3)개의 끝점을 세지만, 각 대각선이 양 끝에서 두 번 세어지므로 2로 나눕니다:
  D = ${n}(${n}−3)/2 = ${n}·${n-3}/2 = ${d}.
함정 보기 ${n*(n-1)/2}은 변 ${n}개를 포함한 꼭짓점 사이의 모든 선분을 센 것입니다. 답은 ${d}입니다.`,D); }

  // 22) Sum of interior angles of a polygon
  for(let k=0;k<8;k++){ const n=ri(3,20); const s=(n-2)*180;
    B.add("Geometry",`What is the sum of the interior angles of a convex polygon with ${n} sides, in degrees?`,
      s,[n*180,(n-1)*180,(n-2)*90,(n-2)*360,360],
`A convex n-gon can be split into n − 2 triangles by drawing diagonals from a single vertex, and each triangle's angles sum to 180°:
  Sum = (${n} − 2) · 180° = ${n-2} · 180° = ${s}°.
The trap ${n*180} forgets to subtract 2 (it would be the count of triangles times 180° if there were n triangles). The answer is ${s}°.`,
`볼록 n각형은 한 꼭짓점에서 대각선을 그어 n − 2개의 삼각형으로 나눌 수 있고, 각 삼각형의 내각의 합은 180°입니다:
  합 = (${n} − 2) · 180° = ${n-2} · 180° = ${s}°.
함정 보기 ${n*180}은 2를 빼는 것을 잊은 값입니다. 답은 ${s}°입니다.`,D); }

  // 23) Mean (average) of a list
  for(let k=0;k<10;k++){ const cnt=ri(4,7); const nums=Array.from({length:cnt},()=>ri(2,80)); const sum=nums.reduce((p,x)=>p+x,0); if(sum%cnt) continue; const mean=sum/cnt;
    B.add("Counting & Probability",`What is the average (arithmetic mean) of the numbers ${nums.join(", ")}?`,
      mean,[mean+1,mean-1,Math.max(...nums),sum,Math.round(sum/(cnt-1))],
`The arithmetic mean is the sum of the values divided by how many there are. The ${cnt} numbers add to ${nums.join(" + ")} = ${sum}, and there are ${cnt} of them:
  mean = ${sum} / ${cnt} = ${mean}.
The trap ${sum} is the total before dividing by the count. The answer is ${mean}.`,
`산술평균은 값들의 합을 개수로 나눈 것입니다. ${cnt}개의 수의 합은 ${nums.join(" + ")} = ${sum}이고 개수는 ${cnt}개입니다:
  평균 = ${sum} / ${cnt} = ${mean}.
함정 보기 ${sum}은 개수로 나누기 전의 총합입니다. 답은 ${mean}입니다.`,D); }

  if(hard){
    // 16) Logarithms
    for(let k=0;k<14;k++){ const b=ri(2,5), e=ri(2,6); const x=Math.pow(b,e);
      B.add("Logarithms",`Evaluate log_${b}(${x}).`,
        e,[e+1,e-1,x/b,b*e],
`By definition, log_${b}(${x}) is the exponent to which ${b} must be raised to obtain ${x}. Writing ${x} as a power of ${b}: ${x} = ${b}^${e}. Therefore log_${b}(${x}) = ${e}. (Check: ${b}^${e} = ${x} ✓.)`,
`정의에 의해 log_${b}(${x})은 ${b}를 몇 제곱해야 ${x}가 되는지를 나타내는 지수입니다. ${x}을 ${b}의 거듭제곱으로 쓰면: ${x} = ${b}^${e}. 따라서 log_${b}(${x}) = ${e}입니다. (확인: ${b}^${e} = ${x} ✓.)`,"hard"); }

    // 17) Geometric series sum
    for(let k=0;k<12;k++){ const a=ri(1,5), r=ri(2,3), n=ri(3,6); const s=a*(Math.pow(r,n)-1)/(r-1);
      B.add("Sequences",`Find the sum of the geometric series ${a} + ${a*r} + ${a*r*r} + ⋯ with common ratio ${r} and ${n} terms.`,
        s,[a*Math.pow(r,n),s+a,a*r*n,s-a],
`For a geometric series with first term a, ratio r ≠ 1, and n terms, the sum is S = a(rⁿ − 1)/(r − 1). Substituting a = ${a}, r = ${r}, n = ${n}:
  S = ${a}·(${r}^${n} − 1)/(${r} − 1) = ${a}·(${Math.pow(r,n)} − 1)/${r-1} = ${a}·${Math.pow(r,n)-1}/${r-1} = ${s}.`,
`첫째 항 a, 공비 r ≠ 1, 항의 개수 n인 등비수열의 합은 S = a(rⁿ − 1)/(r − 1) 입니다. a = ${a}, r = ${r}, n = ${n}을 대입하면:
  S = ${a}·(${r}^${n} − 1)/(${r} − 1) = ${a}·(${Math.pow(r,n)} − 1)/${r-1} = ${a}·${Math.pow(r,n)-1}/${r-1} = ${s}.`,"hard"); }

    // 18) Complex modulus
    for(let k=0;k<10;k++){ const t=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]]); const re=t[0],im=t[1];
      B.add("Complex Numbers",`What is the modulus |${re} + ${im}i| of the complex number ${re} + ${im}i?`,
        t[2],[re+im,t[2]+1,Math.max(re,im),Math.max(1,t[2]-1)],
`The modulus of a complex number a + bi is its distance from the origin in the complex plane: |a + bi| = √(a² + b²). Here:
  |${re} + ${im}i| = √(${re}² + ${im}²) = √(${re*re} + ${im*im}) = √${re*re+im*im} = ${t[2]}.
The values (${re}, ${im}, ${t[2]}) form a Pythagorean triple, so the modulus is exactly the integer ${t[2]}.`,
`복소수 a + bi의 절댓값(크기)은 복소평면에서 원점까지의 거리로, |a + bi| = √(a² + b²) 입니다. 여기서:
  |${re} + ${im}i| = √(${re}² + ${im}²) = √(${re*re} + ${im*im}) = √${re*re+im*im} = ${t[2]}.
(${re}, ${im}, ${t[2]})는 피타고라스 수이므로 절댓값은 정확히 정수 ${t[2]}입니다.`,"hard"); }

    // 19) Modular exponentiation
    for(let k=0;k<12;k++){ const a=ri(2,7), e=ri(5,30), m=pick([7,9,11,13]); const v=modpow(a,e,m);
      B.add("Number Theory",`What is the remainder when ${a}^${e} is divided by ${m}?`,
        v,[(v+1)%m,(v+2)%m,(v+m-1)%m,(v+3)%m],
`We reduce modulo ${m} at every step rather than computing the huge power ${a}^${e}. Repeatedly squaring and multiplying (modular exponentiation), each intermediate result is taken mod ${m}. The powers of ${a} mod ${m} are eventually periodic, and carrying out the reduction gives ${a}^${e} ≡ ${v} (mod ${m}). So the remainder is ${v}.`,
`거대한 값 ${a}^${e}을 직접 계산하지 않고, 매 단계마다 ${m}으로 나눈 나머지를 취합니다. 제곱과 곱셈을 반복하는 거듭제곱법(modular exponentiation)에서 중간 결과를 항상 ${m}으로 나눕니다. ${a}의 거듭제곱은 ${m}에 대해 주기적이며, 이를 따라 계산하면 ${a}^${e} ≡ ${v} (mod ${m}) 입니다. 따라서 나머지는 ${v}입니다.`,"hard"); }

    // 20) Sum of cubes 1³+…+n³
    for(let k=0;k<12;k++){ const n=ri(5,30); const s=sumCubes(n), T=n*(n+1)/2;
      B.add("Sequences",`What is the value of 1³ + 2³ + 3³ + ⋯ + ${n}³?`,
        s,[sumSq(n),T,s+T,2*s,s+1],
`Nicomachus's theorem says the sum of the first n cubes equals the square of the n-th triangular number: 1³ + ⋯ + n³ = (n(n+1)/2)². First, n(n+1)/2 = ${n}·${n+1}/2 = ${T}. Then:
  S = ${T}² = ${s}.
So the sum is the square of the plain sum 1 + ⋯ + ${n} = ${T}. The answer is ${s}.`,
`니코마코스 정리에 의해 처음 n개의 세제곱의 합은 n번째 삼각수의 제곱과 같습니다: 1³ + ⋯ + n³ = (n(n+1)/2)². 먼저 n(n+1)/2 = ${n}·${n+1}/2 = ${T}. 그러면:
  S = ${T}² = ${s}.
즉 1 + ⋯ + ${n} = ${T}의 제곱입니다. 답은 ${s}입니다.`,"hard"); }

    // 21) Evaluate a quadratic polynomial
    for(let k=0;k<12;k++){ const a=ri(1,5), b=ri(-6,6), c=ri(-6,6), x0=ri(-5,6); const v=a*x0*x0+b*x0+c;
      B.add("Algebra",`If f(x) = ${a}x² ${ord(b)}x ${ord(c)}, what is f(${x0})?`,
        v,[a*x0+b*x0+c,a*x0*x0-b*x0+c,v+1,v-1,a*(x0+1)*(x0+1)+b*(x0+1)+c],
`Substitute x = ${x0} into f(x) = ${a}x² ${ord(b)}x ${ord(c)}, squaring before multiplying (order of operations):
  f(${x0}) = ${a}·(${x0})² ${ord(b)}·(${x0}) ${ord(c)} = ${a*x0*x0} ${ord(b*x0)} ${ord(c)} = ${v}.
The trap ${a*x0+b*x0+c} drops the square on the first term. The answer is ${v}.`,
`f(x) = ${a}x² ${ord(b)}x ${ord(c)} 에 x = ${x0}을 대입하되, 연산 순서에 따라 먼저 제곱합니다:
  f(${x0}) = ${a}·(${x0})² ${ord(b)}·(${x0}) ${ord(c)} = ${a*x0*x0} ${ord(b*x0)} ${ord(c)} = ${v}.
함정 보기 ${a*x0+b*x0+c}은 첫 항의 제곱을 빠뜨린 값입니다. 답은 ${v}입니다.`,"hard"); }
  }
}

// ── AIME: integer answers 0–999, shown as MCQ with near-value distractors. ──
function fillAIME(B){
  const near=(v)=>{ const set=new Set(); while(set.size<6){ const off=ri(-50,50); if(off!==0) set.add(Math.max(0,Math.min(999,v+off))); } return [...set].filter(x=>x!==v); };

  // Sum of divisors mod 1000
  for(let k=0;k<16;k++){ const n=ri(50,400); const full=divisorSum(n), v=full%1000;
    B.add("Number Theory",`Let σ(n) denote the sum of the positive divisors of n. Find the remainder when σ(${n}) is divided by 1000.`,
      v,near(v),
`Factor ${n} = ${factStr(n)}. The sum of divisors is multiplicative: for a prime power p^a, σ(p^a) = 1 + p + ⋯ + p^a = (p^(a+1) − 1)/(p − 1), and σ is the product of these over the distinct primes. This gives σ(${n}) = ${full}. Reducing mod 1000, ${full} ≡ ${v} (mod 1000), so the answer is ${v}.`,
`${n} = ${factStr(n)} 로 소인수분해합니다. 약수의 합 함수 σ는 곱셈적입니다. 소수의 거듭제곱 p^a에 대해 σ(p^a) = 1 + p + ⋯ + p^a = (p^(a+1) − 1)/(p − 1) 이고, σ(${n})은 서로 다른 소수들에 대한 이 값들의 곱입니다. 그러면 σ(${n}) = ${full} 입니다. 1000으로 나누면 ${full} ≡ ${v} (mod 1000) 이므로 답은 ${v}입니다.`,"hard"); }

  // C(n,k) mod 1000
  for(let k=0;k<14;k++){ const n=ri(10,17), r=ri(3,Math.min(6,n-1)); const full=comb(n,r), v=full%1000;
    B.add("Combinatorics",`Let N be the number of ways to choose ${r} objects from ${n} distinct objects. Find the remainder when N is divided by 1000.`,
      v,near(v),
`The count is the binomial coefficient C(${n}, ${r}) = ${n}!/(${r}!·${n-r}!) = ${full}. Taking the last three digits (mod 1000): ${full} ≡ ${v} (mod 1000). So N mod 1000 = ${v}.`,
`경우의 수는 이항계수 C(${n}, ${r}) = ${n}!/(${r}!·${n-r}!) = ${full} 입니다. 마지막 세 자리(1000으로 나눈 나머지)를 취하면 ${full} ≡ ${v} (mod 1000). 따라서 N mod 1000 = ${v}입니다.`,"hard"); }

  // Ordered pairs x+y=S
  for(let k=0;k<12;k++){ const S=ri(50,990); const v=S-1;
    B.add("Combinatorics",`How many ordered pairs of positive integers (x, y) satisfy x + y = ${S}?`,
      v,near(v),
`Choose x freely to be any positive integer from 1 to ${S}−1; then y = ${S} − x is automatically a positive integer (since x ≤ ${S}−1 forces y ≥ 1). That is ${S}−1 = ${v} valid choices of x, each giving exactly one ordered pair. So there are ${v} ordered pairs. (Note x = ${S} would force y = 0, which is not positive, so it's excluded.)`,
`x를 1부터 ${S}−1까지의 양의 정수로 자유롭게 정하면, y = ${S} − x 는 자동으로 양의 정수가 됩니다 (x ≤ ${S}−1 이면 y ≥ 1). 따라서 x의 선택은 ${S}−1 = ${v}가지이고 각각 하나의 순서쌍을 줍니다. 그러므로 순서쌍은 ${v}개입니다. (x = ${S}이면 y = 0이 되어 양의 정수가 아니므로 제외합니다.)`,"hard"); }

  // Last three digits a^n
  for(let k=0;k<14;k++){ const a=ri(2,9), n=ri(5,120); const v=modpow(a,n,1000);
    B.add("Number Theory",`Find the last three digits of ${a}^${n} (equivalently, ${a}^${n} mod 1000).`,
      v,near(v),
`The last three digits of an integer are its residue mod 1000. Compute ${a}^${n} mod 1000 by modular exponentiation — square-and-multiply while reducing mod 1000 at each step, so the numbers never blow up. The result is ${a}^${n} ≡ ${v} (mod 1000), so the last three digits are ${String(v).padStart(3,"0")}.`,
`정수의 마지막 세 자리는 1000으로 나눈 나머지와 같습니다. ${a}^${n} mod 1000을 거듭제곱법으로 계산합니다 — 매 단계 제곱·곱셈 후 1000으로 나눠 수가 커지지 않게 합니다. 결과는 ${a}^${n} ≡ ${v} (mod 1000) 이므로 마지막 세 자리는 ${String(v).padStart(3,"0")}입니다.`,"hard"); }

  // Block sum mod 1000
  for(let k=0;k<12;k++){ const a=ri(1,300), b=a+ri(20,300); const full=(a+b)*(b-a+1)/2, v=full%1000;
    B.add("Algebra",`Let S be the sum of all integers from ${a} to ${b}, inclusive. Find the remainder when S is divided by 1000.`,
      v,near(v),
`The sum of consecutive integers from ${a} to ${b} is (first + last)·(number of terms)/2. There are ${b}−${a}+1 = ${b-a+1} terms, so S = (${a}+${b})·${b-a+1}/2 = ${a+b}·${b-a+1}/2 = ${full}. Then S mod 1000 = ${full} mod 1000 = ${v}.`,
`${a}부터 ${b}까지 연속한 정수의 합은 (첫 항 + 끝 항)·(항의 개수)/2 입니다. 항의 개수는 ${b}−${a}+1 = ${b-a+1}이므로 S = (${a}+${b})·${b-a+1}/2 = ${a+b}·${b-a+1}/2 = ${full} 입니다. 그러면 S mod 1000 = ${full} mod 1000 = ${v}입니다.`,"hard"); }

  // Number of divisors
  for(let k=0;k<12;k++){ const n=ri(120,900); const v=divisorCount(n);
    B.add("Number Theory",`Find the number of positive integer divisors of ${n}.`,
      v,
      [...new Set([v+1,v-1,v+2,v-2,v+3,v+4])].filter(x=>x>0&&x!==v),
`Write the prime factorization ${n} = ${factStr(n)}. If n = p₁^a₁ ⋯ p_k^a_k, the number of positive divisors is (a₁+1)(a₂+1)⋯(a_k+1), since each divisor independently chooses an exponent from 0 to aᵢ for each prime. This yields ${Object.values(factorize(n)).map(e=>`(${e}+1)`).join("·")} = ${v} divisors.`,
`소인수분해 ${n} = ${factStr(n)} 를 씁니다. n = p₁^a₁ ⋯ p_k^a_k 일 때 양의 약수의 개수는 (a₁+1)(a₂+1)⋯(a_k+1) 입니다. 각 약수가 소수마다 지수를 0부터 aᵢ까지 독립적으로 고르기 때문입니다. 따라서 ${Object.values(factorize(n)).map(e=>`(${e}+1)`).join("·")} = ${v}개입니다.`,"hard"); }

  // Sum of an arithmetic sub-block with step
  for(let k=0;k<10;k++){ const a=ri(2,9), d=ri(2,6), n=ri(10,25); const last=a+(n-1)*d; const full=n*(a+last)/2, v=full%1000;
    B.add("Algebra",`The arithmetic sequence starts at ${a}, has common difference ${d}, and has ${n} terms. Let S be the sum of all ${n} terms. Find S mod 1000.`,
      v,near(v),
`The last term is a + (n−1)d = ${a} + ${n-1}·${d} = ${last}. The sum of an arithmetic series is (number of terms)·(first + last)/2 = ${n}·(${a} + ${last})/2 = ${n}·${a+last}/2 = ${full}. Therefore S mod 1000 = ${v}.`,
`마지막 항은 a + (n−1)d = ${a} + ${n-1}·${d} = ${last} 입니다. 등차수열의 합은 (항의 개수)·(첫 항 + 끝 항)/2 = ${n}·(${a} + ${last})/2 = ${n}·${a+last}/2 = ${full} 입니다. 따라서 S mod 1000 = ${v}입니다.`,"hard"); }

  // Sum of squares mod 1000
  for(let k=0;k<12;k++){ const n=ri(30,400); const full=sumSq(n), v=full%1000;
    B.add("Algebra",`Let S = 1² + 2² + ⋯ + ${n}². Find the remainder when S is divided by 1000.`,
      v,near(v),
`Use the closed form for the sum of the first n squares: S = n(n+1)(2n+1)/6. With n = ${n}: S = ${n}·${n+1}·${2*n+1}/6 = ${full}. Reducing modulo 1000, ${full} ≡ ${v} (mod 1000), so the answer is ${v}.`,
`처음 n개의 제곱의 합 공식 S = n(n+1)(2n+1)/6 을 사용합니다. n = ${n}: S = ${n}·${n+1}·${2*n+1}/6 = ${full}. 1000으로 나누면 ${full} ≡ ${v} (mod 1000) 이므로 답은 ${v}입니다.`,"hard"); }

  // Sum of cubes mod 1000
  for(let k=0;k<12;k++){ const n=ri(20,300); const T=n*(n+1)/2, full=sumCubes(n), v=full%1000;
    B.add("Algebra",`Let S = 1³ + 2³ + ⋯ + ${n}³. Find the remainder when S is divided by 1000.`,
      v,near(v),
`By Nicomachus's theorem, S = (n(n+1)/2)² = (the n-th triangular number)². Here n(n+1)/2 = ${T}, so S = ${T}² = ${full}. Then S mod 1000 = ${v}.`,
`니코마코스 정리에 의해 S = (n(n+1)/2)² = (n번째 삼각수)² 입니다. 여기서 n(n+1)/2 = ${T}이므로 S = ${T}² = ${full}. 따라서 S mod 1000 = ${v}입니다.`,"hard"); }

  // Trailing zeros of n!
  for(let k=0;k<12;k++){ const n=ri(100,800); const v=trailingZeros(n);
    B.add("Number Theory",`Find the number of trailing zeros at the end of ${n}! (${n} factorial).`,
      v,[...new Set([v+1,v-1,v+2,Math.floor(n/5),v-2,v+5])].filter(x=>x>0&&x!==v),
`Trailing zeros count factors of 10 = 2·5 in ${n}!; since 5's are rarer, count them with Legendre's formula: ⌊${n}/5⌋ + ⌊${n}/25⌋ + ⌊${n}/125⌋ + ⋯ = ${(()=>{const parts=[];for(let p=5;p<=n;p*=5)parts.push(Math.floor(n/p));return parts.join(" + ");})()} = ${v}. The answer is ${v}.`,
`끝자리 0은 ${n}! 속 10 = 2·5 의 개수이고, 5가 더 적으므로 르장드르 공식으로 셉니다: ⌊${n}/5⌋ + ⌊${n}/25⌋ + ⌊${n}/125⌋ + ⋯ = ${(()=>{const parts=[];for(let p=5;p<=n;p*=5)parts.push(Math.floor(n/p));return parts.join(" + ");})()} = ${v}. 답은 ${v}입니다.`,"hard"); }
}

const amc10 = mk("amc-10"); fillAMC(amc10,{hard:false});
const amc12 = mk("amc-12"); fillAMC(amc12,{hard:true});
const aime  = mk("aime");   fillAIME(aime);

for(const B of [amc10,amc12,aime]){
  const file = `${OUT}${B.subject}-gen${seed}.json`;
  fs.writeFileSync(file, JSON.stringify({subject:B.subject,questions:B.qs},null,1));
}
console.log(`amc-10:${amc10.qs.length} | amc-12:${amc12.qs.length} | aime:${aime.qs.length} (seed ${seed})`);
