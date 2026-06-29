import { CORE_NOTES_EN } from "../lib/data/coreNotesEn/index.ts";
import { CORE_NOTES_KO } from "../lib/data/coreNotesKo/index.ts";

const courseOf = (n) => n.courseId || (n.lessonId||"").replace(/-u\d+-l\d+.*$/,"").replace(/-l\d+$/,"");
const enByCourse = new Map(), koByCourse = new Map();
for (const n of CORE_NOTES_EN.values()){ const c=courseOf(n); if(!enByCourse.has(c))enByCourse.set(c,[]); enByCourse.get(c).push(n); }
for (const n of CORE_NOTES_KO.values()){ const c=courseOf(n); if(!koByCourse.has(c))koByCourse.set(c,[]); koByCourse.get(c).push(n); }

const courses=[...new Set([...enByCourse.keys(),...koByCourse.keys()])].sort();
let broken=[];
for(const c of courses){
  const en=enByCourse.get(c)||[], ko=koByCourse.get(c)||[];
  const enIds=new Set(en.map(n=>n.lessonId)), koIds=new Set(ko.map(n=>n.lessonId));
  const enOnly=[...enIds].filter(x=>!koIds.has(x));
  const koOnly=[...koIds].filter(x=>!enIds.has(x));
  const flag=(enOnly.length||koOnly.length)?"  <-- MISMATCH":"";
  console.log(`${c}: EN=${en.length} KO=${ko.length} enOnly=${enOnly.length} koOnly=${koOnly.length}${flag}`);
  if(enOnly.length||koOnly.length) broken.push({c,enOnly,koOnly});
}
console.log("\n=== BROKEN DETAIL ===");
for(const b of broken){ console.log(b.c,"| EN-only:",b.enOnly.slice(0,8).join(",")," | KO-only:",b.koOnly.slice(0,8).join(",")); }
console.log("\nTotal courses:",courses.length,"Broken:",broken.length);
