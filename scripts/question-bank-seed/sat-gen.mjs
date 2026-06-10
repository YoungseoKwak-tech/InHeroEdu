/**
 * SAT — sat-math (computed) + sat-reading (grammar/writing rules).
 * Math answers are COMPUTED in JS → guaranteed correct. Writing items are
 * authored rule/concept MCQs. Output → sat-math-gen<seed>.json, sat-reading-gen<seed>.json
 *   node scripts/question-bank-seed/sat-gen.mjs 1
 */
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const seed = Number(process.argv[2] || 1);
function mulberry32(a){return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const rnd = mulberry32(seed*99991+13);
const ri=(lo,hi)=>lo+Math.floor(rnd()*(hi-lo+1));
const fmt=(n)=>Number.isInteger(n)?String(n):(Math.round(n*100)/100).toString();
function mk(){ const qs=[]; const seen=new Set();
  function add(topic,question_text,correct,distractors,explanation,difficulty="medium"){
    if(seen.has(question_text))return;
    const opts=[String(correct)];for(const d of distractors){const s=String(d);if(!opts.includes(s))opts.push(s);if(opts.length===4)break;}
    if(opts.length<4)return;
    const arr=opts.map((v,i)=>({v,ok:i===0}));for(let i=arr.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
    const L=["a","b","c","d"];const q={topic,difficulty,question_text};let ca="A";arr.forEach((o,i)=>{q["option_"+L[i]]=o.v;if(o.ok)ca=L[i].toUpperCase();});
    q.correct_answer=ca;q.explanation=explanation;seen.add(question_text);qs.push(q);}
  return {qs,add};
}

// ───────── SAT MATH (computed) ─────────
const M = mk();
// Linear equation solve
for(let k=0;k<60;k++){const a=ri(2,9),b=ri(1,20),c=ri(b+1,60);const x=(c-b)/a;if(!Number.isInteger(x))continue;
  M.add("Heart of Algebra",`If ${a}x + ${b} = ${c}, what is the value of x?`,x,[x+1,x-1,(c+b)/a],`${a}x = ${c}−${b} = ${c-b}; x = ${c-b}/${a} = ${x}.`,"easy");}
// Slope from two points
for(let k=0;k<40;k++){const x1=ri(-4,4),y1=ri(-4,4),dx=ri(1,4),dy=ri(-6,6);const x2=x1+dx,y2=y1+dy;const m=dy/dx;if(!Number.isInteger(m))continue;
  M.add("Heart of Algebra",`What is the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2})?`,m,[dx/dy||0,-m,m+1],`slope = (${y2}−${y1})/(${x2}−${x1}) = ${dy}/${dx} = ${m}.`);}
// Percent
for(let k=0;k<40;k++){const p=ri(5,90),base=ri(20,400);const val=p/100*base;if(!Number.isInteger(val))continue;
  M.add("Problem Solving & Data",`What is ${p}% of ${base}?`,val,[val*1.1,base-val,p],`${p}% of ${base} = ${p}/100 × ${base} = ${val}.`,"easy");}
// Percent increase
for(let k=0;k<25;k++){const orig=ri(20,200),pct=ri(5,50);const nw=orig*(1+pct/100);if(!Number.isInteger(nw))continue;
  M.add("Problem Solving & Data",`A price of $${orig} increases by ${pct}%. What is the new price?`,nw,[orig+pct,orig*(1-pct/100),nw+orig],`New = ${orig} × (1 + ${pct}/100) = ${nw}.`);}
// Ratio
for(let k=0;k<25;k++){const a=ri(2,8),b=ri(2,8),tot=(a+b)*ri(2,6);const partA=tot*a/(a+b);if(!Number.isInteger(partA))continue;
  M.add("Problem Solving & Data",`A total of ${tot} is split in the ratio ${a}:${b}. How large is the first part?`,partA,[tot-partA,tot*a/b,tot/(a+b)],`First part = ${tot} × ${a}/(${a}+${b}) = ${partA}.`);}
// System of equations (solve for x)
for(let k=0;k<30;k++){const x=ri(1,8),y=ri(1,8);const a1=ri(1,4),b1=ri(1,4),a2=ri(1,4),b2=ri(1,4);if(a1*b2-a2*b1===0)continue;
  const c1=a1*x+b1*y,c2=a2*x+b2*y;
  M.add("Heart of Algebra",`Solve the system: ${a1}x + ${b1}y = ${c1} and ${a2}x + ${b2}y = ${c2}. What is x?`,x,[y,x+1,x+y],`Solving simultaneously gives x = ${x}, y = ${y}.`);}
// Quadratic root (factorable)
for(let k=0;k<25;k++){const r1=ri(-6,6),r2=ri(-6,6);const b=-(r1+r2),c=r1*r2;
  M.add("Advanced Math",`One solution of x² ${b>=0?'+ '+b:'− '+(-b)}x ${c>=0?'+ '+c:'− '+(-c)} = 0 is x = ${r1}. What is the other solution?`,r2,[-r2,r1,c],`Factors as (x−${r1})(x−${r2}); the other root is ${r2}.`);}
// Exponent eval
for(let k=0;k<20;k++){const base=ri(2,5),e=ri(2,4);const val=Math.pow(base,e);
  M.add("Advanced Math",`Evaluate ${base}^${e}.`,val,[base*e,Math.pow(base,e-1),val+base],`${base}^${e} = ${val}.`,"easy");}
// Function evaluation
for(let k=0;k<25;k++){const a=ri(2,6),b=ri(1,9),c=ri(-3,5),x=ri(-3,5);const val=a*x*x+b*x+c;
  M.add("Advanced Math",`If f(x) = ${a}x² + ${b}x ${c>=0?'+ '+c:'− '+(-c)}, what is f(${x})?`,val,[a*x+b*x+c,a*x*x+b+c,val+x],`f(${x}) = ${a}·${x}² + ${b}·${x} ${c>=0?'+ '+c:'− '+(-c)} = ${val}.`);}
// Geometry: Pythagorean
for(let k=0;k<20;k++){const trip=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[7,24,25]][ri(0,5)];
  M.add("Geometry & Trig",`A right triangle has legs ${trip[0]} and ${trip[1]}. What is the hypotenuse?`,trip[2],[trip[0]+trip[1],trip[2]+1,Math.round(Math.sqrt(trip[0]*trip[0]+trip[1]*trip[1]))+2],`Hypotenuse = √(${trip[0]}² + ${trip[1]}²) = ${trip[2]}.`,"easy");}
// Circle area/circumference
for(let k=0;k<15;k++){const r=ri(2,9);const area=Math.PI*r*r;
  M.add("Geometry & Trig",`A circle has radius ${r}. Its area is (use π ≈ 3.14):`,fmt(3.14*r*r),[fmt(2*3.14*r),fmt(3.14*r),fmt(3.14*r*r*2)],`Area = πr² ≈ 3.14 × ${r}² = ${fmt(3.14*r*r)}.`);}
// Mean
for(let k=0;k<15;k++){const nums=Array.from({length:5},()=>ri(10,90));const mean=nums.reduce((s,x)=>s+x,0)/5;if(!Number.isInteger(mean))continue;
  M.add("Problem Solving & Data",`Find the mean of: ${nums.join(", ")}.`,mean,[mean+2,Math.max(...nums),mean-1],`Mean = sum/5 = ${nums.reduce((s,x)=>s+x,0)}/5 = ${mean}.`,"easy");}
// Probability
for(let k=0;k<15;k++){const fav=ri(1,5),tot=ri(fav+3,12);const g=(a,b)=>b?g(b,a%b):a;const d=g(fav,tot);
  M.add("Problem Solving & Data",`A bag has ${tot} marbles, ${fav} of which are red. What is the probability of drawing a red marble?`,`${fav/d}/${tot/d}`,[`${tot/d}/${fav/d}`,`${fav}/${tot+fav}`,`${fav-1}/${tot}`],`P(red) = ${fav}/${tot} = ${fav/d}/${tot/d}.`);}

// ───────── SAT READING & WRITING (grammar rules) ─────────
const R = mk();
const grammar=[
 ["Subject-verb agreement","The team of researchers ___ publishing its findings.","is","are","were","be","A singular collective subject 'team' takes a singular verb 'is'."],
 ["Pronoun-antecedent","Each student must submit ___ own essay.","his or her","their","its","they're","'Each' is singular, so a singular pronoun 'his or her' agrees."],
 ["Comma splice","Choose the correctly punctuated sentence.","She studied hard; she passed the exam.","She studied hard, she passed the exam.","She studied hard she passed the exam.","She studied hard: she passed, the exam.","Two independent clauses need a semicolon (or conjunction), not just a comma."],
 ["Apostrophes","Which is correct?","The dogs' bowls were empty.","The dogs bowls were empty.","The dog's bowls' were empty.","The dogs's bowls were empty.","Plural possessive of 'dogs' is 'dogs'' (apostrophe after the s)."],
 ["Modifier placement","Walking to school, ___","Maria saw a rainbow.","a rainbow was seen by Maria.","the rainbow appeared to Maria walking.","it was a rainbow Maria saw.","The modifier 'walking to school' must attach to 'Maria', the one walking."],
 ["Parallel structure","She likes hiking, swimming, and ___.","cycling","to cycle","cycle","cycled","Parallel lists keep the same form: hiking, swimming, cycling."],
 ["Transitions (contrast)","The plan was popular; ___, it was never funded.","however","therefore","moreover","thus","'However' signals the contrast between popularity and lack of funding."],
 ["Transitions (cause)","Sales fell sharply; ___, the store closed.","therefore","however","nevertheless","instead","'Therefore' signals the cause-and-effect result."],
 ["Verb tense","By next year, she ___ for a decade.","will have taught","will teach","taught","has taught","The future-perfect 'will have taught' fits 'by next year ... for a decade'."],
 ["Its vs it's","Choose the correct sentence.","The cat licked its paw.","The cat licked it's paw.","The cat licked its' paw.","The cat licked it is paw.","'Its' is the possessive; 'it's' means 'it is'."],
 ["Who vs whom","To ___ should I address the letter?","whom","who","whose","who's","'Whom' is the object of the preposition 'to'."],
 ["Colon usage","Which sentence uses the colon correctly?","She packed three things: a map, water, and snacks.","She packed: a map, water, and snacks.","She packed three things; a map, water, and snacks.","She packed three things, a map: water, and snacks.","A colon follows a complete clause to introduce a list."],
 ["Concision","Choose the most concise option.","Because of the rain, we left.","Due to the fact that it was raining, we left.","On account of the rain that was falling, we left.","In light of the raining situation, we left.","'Because of the rain' is the clearest, most concise."],
 ["Dangling modifier","Which is correct?","Having finished the test, the students left.","Having finished the test, the room emptied.","Finishing the test, the desks were cleared.","The test finished, leaving was done.","The modifier must attach to 'the students', who finished the test."],
 ["Comparison (than)","She is taller than ___.","I","me","mine","myself","In a comparison the subject pronoun 'I' is correct (taller than I am)."],
 ["Subject-verb (intervening)","The box of chocolates ___ on the table.","is","are","were","have","The subject is singular 'box', so 'is' agrees (ignore 'of chocolates')."],
 ["Possessive vs plural","Which is correct?","The students' projects were graded.","The students projects were graded.","The student's projects were graded by all.","The studentss projects were graded.","Plural possessive 'students'' shows projects belonging to multiple students."],
 ["Semicolon list","Which correctly separates list items with internal commas?","We visited Paris, France; Rome, Italy; and Bern, Switzerland.","We visited Paris, France, Rome, Italy, and Bern, Switzerland.","We visited Paris; France, Rome; Italy.","We visited: Paris, France, Rome, Italy.","Semicolons separate list items that themselves contain commas."],
 ["Redundancy","Choose the best revision.","They returned the gift.","They returned the gift back.","They returned back the gift again.","They gave back the gift in return.","'Returned' already means 'gave back', so 'back' is redundant."],
 ["Faulty parallelism","Choose the parallel version.","The job requires writing reports and answering calls.","The job requires writing reports and to answer calls.","The job requires to write reports and answering calls.","The job requires reports written and calls answered.","Both gerunds 'writing' and 'answering' keep the list parallel."],
];
for(const [topic,stem,correct,d1,d2,d3,exp] of grammar){ R.add(topic, stem, correct, [d1,d2,d3], exp); }

fs.writeFileSync(`${OUT}sat-math-gen${seed}.json`, JSON.stringify({subject:"sat-math",questions:M.qs},null,1));
fs.writeFileSync(`${OUT}sat-reading-gen${seed}.json`, JSON.stringify({subject:"sat-reading",questions:R.qs},null,1));
console.log(`sat-math-gen${seed}: ${M.qs.length} | sat-reading-gen${seed}: ${R.qs.length}`);
