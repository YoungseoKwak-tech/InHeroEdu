/**
 * Computed science problems for IB Physics/Chemistry + AP Physics 1/Chemistry.
 * Every answer is COMPUTED → guaranteed correct. Output one JSON per subject.
 *   node scripts/question-bank-seed/science-calc-gen.mjs 1
 */
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const seed = Number(process.argv[2] || 1);
function mulberry32(a){return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const rnd = mulberry32(seed*7368787+29);
const ri=(lo,hi)=>lo+Math.floor(rnd()*(hi-lo+1));
const fmt=(n)=>Number.isInteger(n)?String(n):(Math.round(n*100)/100).toString();
function mk(subject){const qs=[];const seen=new Set();
  function add(topic,question_text,correct,distractors,explanation,difficulty="medium",level){
    if(seen.has(question_text))return;const opts=[String(correct)];for(const d of distractors){const s=String(d);if(!opts.includes(s))opts.push(s);if(opts.length===4)break;}if(opts.length<4)return;
    const arr=opts.map((v,i)=>({v,ok:i===0}));for(let i=arr.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
    const L=["a","b","c","d"];const q={topic:level?`${level} · ${topic}`:topic,difficulty,question_text};let ca="A";arr.forEach((o,i)=>{q["option_"+L[i]]=o.v;if(o.ok)ca=L[i].toUpperCase();});q.correct_answer=ca;q.explanation=explanation;seen.add(question_text);qs.push(q);}
  return {qs,add,subject};
}
function physics(B,level){
  // F = ma
  for(let k=0;k<40;k++){const m=ri(2,40),a=ri(1,15);const F=m*a;
    B.add("Mechanics",`A ${m} kg object accelerates at ${a} m/s². What net force acts on it?`,`${F} N`,[`${m+a} N`,`${fmt(m/a)} N`,`${m*a*2} N`],`F = ma = ${m}×${a} = ${F} N.`,"easy",level);}
  // KE
  for(let k=0;k<30;k++){const m=ri(2,12),v=ri(2,10);const KE=0.5*m*v*v;
    B.add("Mechanics",`Find the kinetic energy of a ${m} kg object moving at ${v} m/s.`,`${fmt(KE)} J`,[`${fmt(m*v)} J`,`${fmt(m*v*v)} J`,`${fmt(0.5*m*v)} J`],`KE = ½mv² = ½×${m}×${v}² = ${fmt(KE)} J.`,"easy",level);}
  // GPE
  for(let k=0;k<25;k++){const m=ri(1,10),h=ri(2,20),g=10;const E=m*g*h;
    B.add("Mechanics",`A ${m} kg mass is lifted to ${h} m (g = 10 m/s²). Its gravitational PE is:`,`${E} J`,[`${m*h} J`,`${fmt(m*g*h/2)} J`,`${m*g} J`],`PE = mgh = ${m}×10×${h} = ${E} J.`,"easy",level);}
  // momentum
  for(let k=0;k<25;k++){const m=ri(2,15),v=ri(2,12);const p=m*v;
    B.add("Mechanics",`Find the momentum of a ${m} kg object moving at ${v} m/s.`,`${p} kg·m/s`,[`${m+v} kg·m/s`,`${fmt(0.5*m*v)} kg·m/s`,`${m*v*v} kg·m/s`],`p = mv = ${m}×${v} = ${p} kg·m/s.`,"easy",level);}
  // kinematics v = u + at
  for(let k=0;k<25;k++){const u=ri(0,10),a=ri(1,6),t=ri(2,8);const v=u+a*t;
    B.add("Mechanics",`An object starts at ${u} m/s and accelerates at ${a} m/s² for ${t} s. Its final velocity is:`,`${v} m/s`,[`${a*t} m/s`,`${u+a} m/s`,`${u*t+a} m/s`],`v = u + at = ${u} + ${a}×${t} = ${v} m/s.`,level);}
  // Ohm's law V=IR
  for(let k=0;k<25;k++){const I=ri(1,9),R=ri(2,20);const V=I*R;
    B.add("Electricity",`A current of ${I} A flows through a ${R} Ω resistor. The voltage across it is:`,`${V} V`,[`${fmt(R/I)} V`,`${I+R} V`,`${fmt(I*R/2)} V`],`V = IR = ${I}×${R} = ${V} V.`,"easy",level);}
  // Power P=VI
  for(let k=0;k<20;k++){const V=ri(2,24),I=ri(1,9);const P=V*I;
    B.add("Electricity",`A device operates at ${V} V drawing ${I} A. Its power is:`,`${P} W`,[`${V+I} W`,`${fmt(V/I)} W`,`${V*I*2} W`],`P = VI = ${V}×${I} = ${P} W.`,"easy",level);}
  // wave speed v=fλ
  for(let k=0;k<20;k++){const f=ri(2,20),lam=ri(1,10);const v=f*lam;
    B.add("Waves",`A wave has frequency ${f} Hz and wavelength ${lam} m. Its speed is:`,`${v} m/s`,[`${f+lam} m/s`,`${fmt(f/lam)} m/s`,`${fmt(lam/f)} m/s`],`v = fλ = ${f}×${lam} = ${v} m/s.`,"easy",level);}
  // density
  for(let k=0;k<15;k++){const m=ri(10,100),V=ri(2,10);const d=m/V;
    B.add("Mechanics",`An object has mass ${m} g and volume ${V} cm³. Its density is:`,`${fmt(d)} g/cm³`,[`${fmt(V/m)} g/cm³`,`${m*V} g/cm³`,`${m-V} g/cm³`],`ρ = m/V = ${m}/${V} = ${fmt(d)} g/cm³.`,"easy",level);}
}
function chemistry(B,level){
  // moles = mass/Mr
  for(let k=0;k<35;k++){const Mr=ri(2,18)*ri(2,14),mass=Mr*ri(1,9);const n=mass/Mr;
    B.add("Stoichiometry",`How many moles are in ${mass} g of a substance with molar mass ${Mr} g/mol?`,`${fmt(n)} mol`,[`${fmt(Mr/mass)} mol`,`${mass*Mr} mol`,`${fmt(n*2)} mol`],`n = mass/Mr = ${mass}/${Mr} = ${fmt(n)} mol.`,"easy",level);}
  // mass = n*Mr
  for(let k=0;k<25;k++){const Mr=ri(10,60),n=ri(1,6);const mass=n*Mr;
    B.add("Stoichiometry",`What is the mass of ${n} mol of a substance with molar mass ${Mr} g/mol?`,`${mass} g`,[`${fmt(Mr/n)} g`,`${n+Mr} g`,`${fmt(mass/2)} g`],`mass = n×Mr = ${n}×${Mr} = ${mass} g.`,"easy",level);}
  // concentration = n/V
  for(let k=0;k<25;k++){const n=ri(1,8),V=ri(1,4);const c=n/V;
    B.add("Solutions",`${n} mol of solute is dissolved in ${V} dm³ of solution. The concentration is:`,`${fmt(c)} mol/dm³`,[`${fmt(V/n)} mol/dm³`,`${n*V} mol/dm³`,`${n+V} mol/dm³`],`c = n/V = ${n}/${V} = ${fmt(c)} mol/dm³.`,"easy",level);}
  // pH = -log[H+] for simple powers
  for(let k=0;k<20;k++){const p=ri(1,6);const conc=`1×10⁻${p}`;
    B.add("Acids & Bases",`A solution has [H⁺] = ${conc} mol/dm³. What is its pH?`,`${p}`,[`${p+1}`,`${p-1}`,`${14-p}`],`pH = −log[H⁺] = −log(10⁻${p}) = ${p}.`,level);}
  // number of particles n*NA
  for(let k=0;k<15;k++){const n=ri(1,5);
    B.add("Stoichiometry",`How many particles are in ${n} mol of a substance? (Nₐ = 6.02×10²³)`,`${fmt(n*6.02)}×10²³`,[`${fmt(6.02/n)}×10²³`,`${n}×10²³`,`${fmt(n*6.02*2)}×10²³`],`N = n×Nₐ = ${n}×6.02×10²³ = ${fmt(n*6.02)}×10²³.`,level);}
  // percentage by mass
  for(let k=0;k<15;k++){const part=ri(2,20),whole=part*ri(2,5);const pct=part/whole*100;
    B.add("Stoichiometry",`An element of mass ${part} g is in a ${whole} g compound. Its percentage by mass is:`,`${fmt(pct)}%`,[`${fmt(whole/part)}%`,`${part+whole}%`,`${fmt(pct*2)}%`],`% = ${part}/${whole}×100 = ${fmt(pct)}%.`,level);}
}

// IB Physics
const ibP = mk("ib-physics"); physics(ibP,"SL"); fs.writeFileSync(`${OUT}ib-physics-calc${seed}.json`,JSON.stringify({subject:"ib-physics",questions:ibP.qs},null,1));
// IB Chemistry
const ibC = mk("ib-chemistry"); chemistry(ibC,"SL"); fs.writeFileSync(`${OUT}ib-chemistry-calc${seed}.json`,JSON.stringify({subject:"ib-chemistry",questions:ibC.qs},null,1));
// AP Physics 1
const apP = mk("ap-physics-1"); physics(apP); fs.writeFileSync(`${OUT}ap-physics-1-calc${seed}.json`,JSON.stringify({subject:"ap-physics-1",questions:apP.qs},null,1));
// AP Chemistry
const apC = mk("ap-chemistry"); chemistry(apC); fs.writeFileSync(`${OUT}ap-chemistry-calc${seed}.json`,JSON.stringify({subject:"ap-chemistry",questions:apC.qs},null,1));
console.log(`ib-physics ${ibP.qs.length} | ib-chemistry ${ibC.qs.length} | ap-physics-1 ${apP.qs.length} | ap-chemistry ${apC.qs.length}`);
