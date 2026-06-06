// English Language: identify-the-device generator (authored by Claude, no API).
// Each device has many example sentences; generates "Which device is used in: '...'?"
// plus the reverse "Which sentence uses <device>?". upload.mjs dedupes.
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
function mulberry32(a){return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
const seed=Number(process.argv[2]||1);const rnd=mulberry32(seed*40503+11);
const shuffle=(arr)=>{const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const sample=(arr,n,not)=>shuffle(arr.filter(x=>x!==not)).slice(0,n);
function opt(question_text,correct,distractors,explanation){const chosen=[String(correct)];for(const d of distractors){const s=String(d);if(!chosen.includes(s))chosen.push(s);if(chosen.length===4)break;}if(chosen.length<4)return null;
 const arr=shuffle(chosen.map((v,i)=>({v,ok:i===0})));const L=["A","B","C","D"];const q={unit:7,topic:"Style: Reading",difficulty:"medium",question_text};let ca="A";arr.forEach((o,i)=>{q["option_"+L[i].toLowerCase()]=o.v;if(o.ok)ca=L[i];});q.correct_answer=ca;q.explanation=explanation;return q;}
const uniq=(qs)=>{const seen=new Set();return qs.filter(q=>{if(!q)return false;if(seen.has(q.question_text))return false;seen.add(q.question_text);return true;});};

const devices={
"alliteration":["The wild winds whipped the weary walkers.","Silly Sally swiftly shooed seven sheep.","The big bad bear bellowed below.","Peter picked a peck of pickled peppers.","Fortune favors the fierce and faithful.","Dreadful disasters dogged the doomed ship.","The slippery snake slithered silently south.","Crisp cool currents carried the canoe.","Brave Brian battled the bitter blizzard.","The murmuring mourners made their mark."],
"a metaphor":["Time is a thief that steals our days.","Her words were daggers to his heart.","The classroom was a zoo by noon.","He is the black sheep of the family.","Life is a winding road with no map.","The city is a jungle of steel and glass.","Their marriage was a battlefield.","My memory is a sieve these days.","The internet is a vast ocean of noise.","Hope was the anchor that held her steady."],
"a simile":["She was as brave as a lion in the storm.","His temper flared like a struck match.","The lake was as smooth as glass.","They fought like cats and dogs all evening.","Her smile was like sunshine after rain.","The crowd roared like a stormy sea.","He runs as fast as the wind.","The news spread like wildfire.","My hands were as cold as ice.","The idea hit me like a bolt of lightning."],
"personification":["The wind whispered secrets through the trees.","The old house groaned in the night.","Opportunity knocked at her door.","The sun smiled down on the meadow.","The waves danced along the shore.","Time marches on without mercy.","The thunder grumbled in the distance.","The flowers nodded their heads in the breeze.","Death stalked the battlefield.","The camera loves her."],
"hyperbole":["I've told you a million times to clean your room.","This bag weighs a ton.","I'm so hungry I could eat a horse.","Her smile stretched a mile wide.","I waited an eternity for the bus.","He has a brain the size of a planet.","This is the worst day in the history of the world.","I have a thousand things to do today.","The silence was deafening for centuries.","My backpack is heavier than a car."],
"understatement":["The hurricane caused a little water damage.","Losing the championship was a minor setback.","Being struck by lightning is somewhat unpleasant.","The billion-dollar loss was a bit inconvenient.","Mount Everest is a fairly tall hill.","The erupting volcano was a slight concern.","Getting fired was not ideal.","The shark attack ruined his afternoon, somewhat.","A nuclear meltdown is rather bad.","The flood was a touch wet."],
"a rhetorical question":["Who doesn't want to be happy?","Is the sky not blue?","How many times must we repeat this mistake?","What is the point of even trying?","Could anything be more obvious?","Are we not all human?","Why should the innocent suffer?","Isn't it time for a change?","Who could resist such an offer?","Do we really have a choice?"],
"anaphora":["We shall fight on the beaches, we shall fight in the fields, we shall fight in the streets.","Every day, every hour, every minute I think of you.","I have a dream that one day... I have a dream that my children...","Let freedom ring from the hills, let freedom ring from the valleys.","She is strong, she is kind, she is unstoppable.","Go big, go bold, go home a winner.","First they ignore you, first they laugh, first they fight.","We remember the fallen, we remember the brave, we remember the lost.","Stay hungry, stay foolish, stay true.","No more lies, no more fear, no more silence."],
"a paradox":["Less is more in elegant design.","I must be cruel only to be kind.","The only constant is change.","This statement is false.","You have to spend money to make money.","The more you know, the more you realize you don't know.","Standing still, she moved everyone deeply.","To lead is to serve.","The child is father of the man.","Deafening silence filled the room."],
"an oxymoron":["It was an open secret among the staff.","They shared a bittersweet farewell.","The deafening silence unnerved her.","He gave a clearly confusing answer.","It was an act of organized chaos.","She found a kind of cruel kindness in his words.","The plan was an original copy.","They reached an uneasy peace.","It was a small crowd of giants.","He offered a definite maybe."],
"a metonymy":["The White House issued a statement today.","The crown will not tolerate dissent.","Hollywood released its summer slate.","Wall Street reacted nervously to the news.","The pen is mightier than the sword.","Let me give you a hand with that.","The press hounded the senator.","Silicon Valley is betting on AI.","The throne passed to her youngest son.","Washington remains gridlocked."],
"synecdoche":["All hands on deck before the storm.","She just bought a new set of wheels.","Nice threads you're wearing tonight.","The factory needs more boots on the ground.","Lend me your ears for a moment.","Many mouths to feed in that household.","Check out my new ride.","The captain counted fifty sails on the horizon.","They hired some fresh faces this year.","Put some bread on the table."],
"verbal irony":["'What lovely weather,' she said as rain poured down.","'Great, another flat tire,' he muttered, thrilled.","'You've been so helpful,' she told the rude clerk.","After the disaster he sighed, 'Well, that went perfectly.'","'I just love waiting in line,' he groaned.","'Nice job,' she said, staring at the broken vase.","'What a genius idea,' he scoffed at the obvious error.","'I'm so glad it's Monday,' she yawned.","'Lovely,' he said, finding his car towed.","'How wonderful,' she sighed at the cancelled flight."],
"asyndeton":["I came, I saw, I conquered.","She was tired, hungry, afraid, alone.","Read, write, learn, grow.","He bought eggs, milk, bread, cheese.","Fast, cheap, reliable—pick two.","They ran, jumped, climbed, fell.","Hope, courage, faith carried them on.","Lights, camera, action.","We laughed, we cried, we lived.","Cold, dark, endless—the cave stretched on."],
"polysyndeton":["We have ships and men and money and stores.","She bought apples and oranges and pears and plums.","He ran and stumbled and rose and ran again.","It was cold and wet and dark and miserable.","They sang and danced and laughed and cried.","Day and night and rain and shine they worked.","I will not lie or cheat or steal or betray.","There was fire and smoke and ash and ruin.","He spoke and paused and spoke and paused.","Land and sea and sky all turned gray."],
"a simile (extended)":["Her courage was like a candle: small, flickering, yet refusing to go out in the wind.","The economy is like a tide that lifts some boats while leaving others stranded.","His anger was like a kettle, building pressure until it screamed for release.","Memory is like a photograph that fades a little more each year.","The team moved like a single machine, each gear turning the next.","Doubt crept in like fog, softening every certain edge until nothing was clear.","Their friendship was like an old coat, worn but warm and familiar.","The crowd surged like a river breaking through a dam.","Her patience wore thin like fabric rubbed too many times.","Ambition burned in him like a furnace that demanded constant fuel."],
};

const names=Object.keys(devices);
const qs=[];
for(const dev of names){
  for(const ex of devices[dev]){
    const ds=sample(names,3,dev);
    if(ds.length===3) qs.push(opt(`Which rhetorical or literary device is used in: "${ex}"?`,dev,ds,`"${ex}" is an example of ${dev}.`));
  }
}
// reverse: which sentence uses <device>?
for(const dev of names){
  const correctEx=devices[dev];
  const otherEx=names.filter(n=>n!==dev).flatMap(n=>devices[n]);
  for(let k=0;k<6;k++){
    const c=correctEx[k%correctEx.length];
    const ds=sample(otherEx,3,null);
    if(ds.length===3) qs.push(opt(`Which sentence is an example of ${dev}?`,c,ds,`"${c}" uses ${dev}.`));
  }
}
const out=uniq(shuffle(qs));
fs.writeFileSync(`${OUT}ap-english-language-examples${seed}.json`,JSON.stringify({subject:"ap-english-language",questions:out},null,1));
console.log(`ap-english-language examples: ${out.length} questions from ${names.length} devices`);
