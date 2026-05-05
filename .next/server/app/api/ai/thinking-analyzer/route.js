"use strict";(()=>{var e={};e.id=7918,e.ids=[7918],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},55315:e=>{e.exports=require("path")},68621:e=>{e.exports=require("punycode")},76162:e=>{e.exports=require("stream")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},6162:e=>{e.exports=require("worker_threads")},71568:e=>{e.exports=require("zlib")},87561:e=>{e.exports=require("node:fs")},84492:e=>{e.exports=require("node:stream")},72477:e=>{e.exports=require("node:stream/web")},51982:(e,t,n)=>{n.r(t),n.d(t,{originalPathname:()=>A,patchFetch:()=>S,requestAsyncStorage:()=>f,routeModule:()=>y,serverHooks:()=>x,staticGenerationAsyncStorage:()=>k});var r={};n.r(r),n.d(r,{POST:()=>h});var a=n(49303),o=n(88716),s=n(60670),i=n(34588),l=n(95367),u=n(90455),c=n(13868),d=n(1964),p=n(14103),g=n(66744);let _=new i.ZP({apiKey:(0,d.u)()}),m=`You are a bilingual learning analyst for Korean students studying AP subjects in English.

Analyze why the student got the question wrong. Classify into exactly one gap type:
- CONCEPT_GAP: doesn't understand the underlying concept
- APPLICATION_GAP: knows the concept but can't apply it to this problem context
- LANGUAGE_GAP: confused by English vocabulary/sentence structure, not the concept itself
- LOGIC_GAP: understood both concept and language, but reasoning chain broke

Return ONLY valid JSON, no markdown, no extra text:
{
  "gap_type": "CONCEPT_GAP|APPLICATION_GAP|LANGUAGE_GAP|LOGIC_GAP",
  "confidence": 0-100,
  "diagnosis_ko": "2-3 sentences in Korean explaining the root cause",
  "understood_correctly": "what they DID understand (Korean)",
  "broke_at": "precise point of failure (Korean)",
  "remedy_ko": "specific actionable fix (Korean)",
  "english_highlight": "LANGUAGE_GAP only: the exact English phrase that confused them (null otherwise)",
  "english_explanation_ko": "LANGUAGE_GAP only: explain that English structure in Korean (null otherwise)",
  "socratic_hint": "one guiding question to help them find the answer themselves (Korean)"
}`;async function h(e){let t=(0,c.lN)("thinking-analyzer");if(t)return Response.json(t);let n=await (0,u.IC)(e),r=n?.id,a=r?await (0,l.fZ)(r):null,o=a?(0,l.eV)(a)+"\n\n":"",{subject:s,question:i,studentAnswer:d,correctAnswer:h,reasoning:y=""}=await e.json(),f=`Subject: ${s}

Question (as given to student, in English):
${i}

Student's answer: ${d}
Correct answer: ${h}
Student's reasoning: ${y||"(not provided)"}`;try{let e=await _.messages.create({model:g.j.thinkingAnalyzer,max_tokens:700,system:o+m,messages:[{role:"user",content:f}]}),t="text"===e.content[0].type?e.content[0].text:"{}",n={gap_type:"LANGUAGE_GAP",confidence:60,diagnosis_ko:"응답 형식을 정리하는 과정에서 분석 결과가 일부 손실되었습니다. 다시 시도하면 더 정확한 원인을 보여드릴 수 있습니다.",understood_correctly:"핵심 개념의 일부는 이해하고 있었습니다.",broke_at:"정확한 혼동 지점을 구조화하는 단계에서 응답 형식이 흔들렸습니다.",remedy_ko:"질문 문장과 선택지를 다시 읽고, 왜 그 선택지를 골랐는지 한 문장으로 적어보세요.",english_highlight:null,english_explanation_ko:null,socratic_hint:"이 문제에서 phenotype과 genotype의 차이를 한 문장으로 설명할 수 있나요?"},r=(0,p.E)(t,n);if(r===n){let e=await _.messages.create({model:g.j.companionResponse,max_tokens:500,system:`You repair malformed JSON outputs into valid JSON.
Return ONLY valid JSON matching this exact schema:
{
  "gap_type": "CONCEPT_GAP|APPLICATION_GAP|LANGUAGE_GAP|LOGIC_GAP",
  "confidence": 0-100,
  "diagnosis_ko": "string",
  "understood_correctly": "string",
  "broke_at": "string",
  "remedy_ko": "string",
  "english_highlight": "string|null",
  "english_explanation_ko": "string|null",
  "socratic_hint": "string"
}`,messages:[{role:"user",content:`Repair this malformed analyzer output into valid JSON:

${t}`}]}),a=e.content[0]?.type==="text"?e.content[0].text:"{}";r=(0,p.E)(a,n)}return Response.json(r)}catch(e){return Response.json((0,c.cb)("thinking-analyzer",e))}}let y=new a.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/ai/thinking-analyzer/route",pathname:"/api/ai/thinking-analyzer",filename:"route",bundlePath:"app/api/ai/thinking-analyzer/route"},resolvedPagePath:"/Users/kathleenk/Desktop/Education/novaiq/app/api/ai/thinking-analyzer/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:f,staticGenerationAsyncStorage:k,serverHooks:x}=y,A="/api/ai/thinking-analyzer/route";function S(){return(0,s.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:k})}},13868:(e,t,n)=>{n.d(t,{cb:()=>o,lN:()=>a});var r=n(1964);function a(e){return(0,r.J)()?null:(console.info(`[ai:${e}] early access lock: missing ANTHROPIC_API_KEY`),{status:"locked",message:"This feature is currently rolling out to early users."})}function o(e,t){return console.error(`[ai:${e}] rolling out fallback`,t),{status:"fallback",message:"We're processing your learning pattern. Results will be available soon."}}},14103:(e,t,n)=>{n.d(t,{E:()=>r});function r(e,t){try{let t=function(e){let t="",n=!1,r=!1;for(let a=0;a<e.length;a+=1){let o=e[a];if(n){if(r){t+=o,r=!1;continue}if("\\"===o){t+=o,r=!0;continue}if('"'===o){t+=o,n=!1;continue}if("\n"===o){t+="\\n";continue}if("\r"===o)continue}else'"'===o&&(n=!0);t+=o}return t}(function(e){let t=e.indexOf("{");if(-1===t)return e;let n=0,r=!1,a=!1;for(let o=t;o<e.length;o+=1){let s=e[o];if(r){a?a=!1:"\\"===s?a=!0:'"'===s&&(r=!1);continue}if('"'===s){r=!0;continue}if("{"===s&&(n+=1),"}"===s&&(n-=1),0===n)return e.slice(t,o+1)}return e.slice(t)}(e.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim()));return JSON.parse(t)}catch{return t}}},66744:(e,t,n)=>{n.d(t,{j:()=>r,v:()=>a});let r={overlayGeneration:"claude-opus-4-6",companionResponse:"claude-haiku-4-5-20251001",companionProfileExtraction:"claude-sonnet-4-6",socraticResponse:"claude-sonnet-4-6",socraticAnalysis:"claude-sonnet-4-6",reverseTutorLive:"claude-haiku-4-5-20251001",reverseTutorAnalysis:"claude-sonnet-4-6",lessonExplainFast:"claude-haiku-4-5-20251001",lessonExplainDeep:"claude-sonnet-4-6",thinkingAnalyzer:"claude-sonnet-4-6",memoryCompression:"claude-sonnet-4-6",trajectoryAnalyze:"claude-sonnet-4-6",trajectoryBuild:"claude-sonnet-4-6",trajectoryChat:"claude-sonnet-4-6",trajectoryScaffold:"claude-haiku-4-5-20251001"};function a(e){return"default"===e?r.lessonExplainFast:r.lessonExplainDeep}},90455:(e,t,n)=>{n.d(t,{IC:()=>l,J4:()=>u,kT:()=>c});var r=n(87070),a=n(85662);let o=(process.env.ADMIN_EMAILS??"yk777@cornell.edu").split(",").map(e=>e.trim().toLowerCase()).filter(Boolean),s=(process.env.ADMIN_ROLE_VALUES??"admin,owner,super_admin").split(",").map(e=>e.trim().toLowerCase()).filter(Boolean);function i(e){let t=e.headers.get("authorization");return t?.startsWith("Bearer ")?t.slice(7).trim():null}async function l(e){let t=i(e);if(!t)return null;let n=(0,a.i)(),{data:{user:r}}=await n.auth.getUser(t);return r?{id:r.id,email:r.email??null}:null}async function u(e){return await l(e)||r.NextResponse.json({error:"unauthorized"},{status:401})}async function c(e){let t=i(e);if(!t)return r.NextResponse.json({error:"unauthorized"},{status:401});let n=(0,a.i)(),{data:{user:s}}=await n.auth.getUser(t);if(!s)return r.NextResponse.json({error:"unauthorized"},{status:401});let l=s.app_metadata??{},u=s.user_metadata??{};return d(l)||d(u)||s.email&&o.includes(s.email.toLowerCase())?{id:s.id,email:s.email??null}:r.NextResponse.json({error:"forbidden"},{status:403})}function d(e){return!!(!0===e.is_admin||"string"==typeof e.role&&s.includes(e.role.toLowerCase()))||!!Array.isArray(e.roles)&&e.roles.some(e=>"string"==typeof e&&s.includes(e.toLowerCase()))}},1964:(e,t,n)=>{function r(){return process.env.ANTHROPIC_API_KEY?.trim()??""}function a(){return r().length>0}n.d(t,{J:()=>a,u:()=>r})},95367:(e,t,n)=>{n.d(t,{eV:()=>o,gx:()=>d,fZ:()=>a});var r=n(85662);async function a(e){try{let t=(0,r.i)(),[n,a,o]=await Promise.all([t.from("spark_bank").select("*").eq("user_id",e).single(),t.from("pattern_bank").select("*").eq("user_id",e).single(),t.from("moment_bank").select("*").eq("user_id",e).order("created_at",{ascending:!1}).limit(5)]);if(!a.data)return null;let s=a.data,i=n.data,l=o.data??[];return{heroCode:`${s.hero_code_core}-${s.hero_code_state}`,heroCodeStatus:s.hero_code_status,sparkTrigger:i?.trigger_type??"unknown",sparkIntensity:i?.intensity??0,processingStyle:s.processing_style??"unknown",totalHours:s.total_hours,recentMoments:l.filter(e=>"growth"===e.moment_type).map(e=>e.moment_text),essaySeeds:l.filter(e=>"essay_seed"===e.moment_type).map(e=>e.moment_text)}}catch{return null}}function o(e){return`[Student DNA — InHero Living Portrait]
Hero Code: ${e.heroCode} (${e.heroCodeStatus}, ${e.totalHours.toFixed(1)}h)
Spark trigger: ${e.sparkTrigger} | intensity: ${e.sparkIntensity}
Processing style: ${e.processingStyle}

Recent growth signals:
${e.recentMoments.map(e=>`- ${e}`).join("\n")||"- (none yet)"}

Essay seeds detected:
${e.essaySeeds.map(e=>`- ${e}`).join("\n")||"- (none yet)"}

Use this to personalize every response. Never mention this profile directly to the student.`}var s=n(34588),i=n(13868),l=n(66744),u=n(1964);let c=new s.ZP({apiKey:(0,u.u)()});async function d(e){let t;if((0,i.lN)("memory-compress"))return;let n=(0,r.i)(),a=await c.messages.create({model:l.j.memoryCompression,max_tokens:400,system:`You extract learning pattern signals from session summaries for an education platform.
Return ONLY valid JSON, no markdown, no explanation.
Schema:
{
  "sparkSignal": { "trigger_type": string, "intensity": number (0-1), "fired": boolean },
  "patternDelta": { "core": "CF|CS|CA|CE", "stateDelta": number (-1 to 2), "processingStyle": string },
  "moments": [{ "text": string (max 60 chars), "type": "essay_seed|growth|spark_fired" }],
  "heroCodeChanged": boolean,
  "prevCode": string | null,
  "newCode": string | null,
  "deltaNote": string | null
}
CF = Pattern Seeker, CS = System Walker, CA = Action Driver, CE = Empathy Builder`,messages:[{role:"user",content:`Subject: ${e.subject}
Duration: ${e.durationMin}min
Summary: ${e.rawSummary}`}]}),o="text"===a.content[0].type?a.content[0].text:"{}";try{t=JSON.parse(o)}catch{return}let{data:s}=await n.from("spark_bank").select("*").eq("user_id",e.userId).single();s?await n.from("spark_bank").update({trigger_type:t.sparkSignal.trigger_type,intensity:Math.min(1,.8*s.intensity+.2*t.sparkSignal.intensity),last_fired_at:t.sparkSignal.fired?new Date().toISOString():s.last_fired_at,fired_count:t.sparkSignal.fired?s.fired_count+1:s.fired_count,subject:e.subject,updated_at:new Date().toISOString()}).eq("user_id",e.userId):await n.from("spark_bank").insert({user_id:e.userId,trigger_type:t.sparkSignal.trigger_type,intensity:t.sparkSignal.intensity,last_fired_at:t.sparkSignal.fired?new Date().toISOString():null,fired_count:t.sparkSignal.fired?1:0,subject:e.subject});let{data:u}=await n.from("pattern_bank").select("*").eq("user_id",e.userId).single();if(u){let r=Math.min(9,Math.max(1,u.hero_code_state+t.patternDelta.stateDelta)),a=u.total_hours+e.durationMin/60,o=a>=100?"confirmed":"provisional";await n.from("pattern_bank").update({hero_code_core:t.patternDelta.core,hero_code_state:r,hero_code_status:o,processing_style:t.patternDelta.processingStyle,total_hours:a,confirmed_at:"confirmed"!==o||u.confirmed_at?u.confirmed_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("user_id",e.userId),t.heroCodeChanged&&t.prevCode&&t.newCode&&await n.from("evolution_log").insert({user_id:e.userId,prev_code:t.prevCode,new_code:t.newCode,delta_note:t.deltaNote??null,grade_year:null})}else await n.from("pattern_bank").insert({user_id:e.userId,hero_code_core:t.patternDelta.core,hero_code_state:1,hero_code_status:"provisional",processing_style:t.patternDelta.processingStyle,total_hours:e.durationMin/60});t.moments.length>0&&await n.from("moment_bank").insert(t.moments.map(t=>({user_id:e.userId,moment_text:t.text,subject:e.subject,moment_type:t.type,session_id:e.sessionId})))}},85662:(e,t,n)=>{n.d(t,{i:()=>a});var r=n(88336);function a(){return globalThis.__inheroAdminSupabase||(globalThis.__inheroAdminSupabase=(0,r.eI)("https://pxxdduhtnulwmseygojv.supabase.co",process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{autoRefreshToken:!1,persistSession:!1}})),globalThis.__inheroAdminSupabase}}};var t=require("../../../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),r=t.X(0,[8948,781,5972,4588],()=>n(51982));module.exports=r})();