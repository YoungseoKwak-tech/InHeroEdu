"use strict";(()=>{var e={};e.id=2858,e.ids=[2858],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},55315:e=>{e.exports=require("path")},68621:e=>{e.exports=require("punycode")},76162:e=>{e.exports=require("stream")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},6162:e=>{e.exports=require("worker_threads")},71568:e=>{e.exports=require("zlib")},87561:e=>{e.exports=require("node:fs")},84492:e=>{e.exports=require("node:stream")},72477:e=>{e.exports=require("node:stream/web")},19171:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>g,patchFetch:()=>x,requestAsyncStorage:()=>m,routeModule:()=>d,serverHooks:()=>f,staticGenerationAsyncStorage:()=>h});var o={};t.r(o),t.d(o,{POST:()=>c});var n=t(49303),a=t(88716),i=t(60670),s=t(34588),u=t(13868),p=t(1964);let l=new s.ZP({apiKey:(0,p.u)()});async function c(e){let r=(0,u.lN)("companion-roadmap");if(r)return Response.json(r);let{strengths:t=[],interests:o=[],college_adjustments:n={},lang:a="ko"}=await e.json(),i="ko"===a?`학생 프로필 (대화에서 추출, 민감 정보 제외됨):
강점: ${t.join(", ")||"파악 중"}
관심 분야: ${o.join(", ")||"파악 중"}
조건: ${JSON.stringify(n)}

위 프로필 기반으로 한국어로 대학 로드맵을 생성해줘:
1. 목표 대학 3곳 (reach) — 프로필 근거 포함
2. 안정 대학 3곳 (match)
3. 보험 대학 2곳 (safety)
4. 지금 당장 해야 할 3가지 액션 아이템
5. 집중해야 할 AP 과목

재정 정보는 절대 언급하지 말 것. 학생의 강점과 가능성에 집중할 것.`:`Student profile (extracted from conversation, excluding sensitive information):
Strengths: ${t.join(", ")||"Still being identified"}
Interest areas: ${o.join(", ")||"Still being identified"}
Constraints: ${JSON.stringify(n)}

Based on this profile, generate a college roadmap in English:
1. 3 reach schools with profile-based reasoning
2. 3 match schools
3. 2 safety schools
4. 3 immediate action items
5. AP subjects to prioritize

Never mention finances directly. Focus on the student's strengths and future potential.`;try{let e=await l.messages.create({model:"claude-haiku-4-5-20251001",max_tokens:900,messages:[{role:"user",content:i}]}),r="text"===e.content[0].type?e.content[0].text:"";return Response.json({roadmap:r})}catch(e){return Response.json((0,u.cb)("companion-roadmap",e))}}let d=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/ai/companion/roadmap/route",pathname:"/api/ai/companion/roadmap",filename:"route",bundlePath:"app/api/ai/companion/roadmap/route"},resolvedPagePath:"/Users/kathleenk/Desktop/Education/novaiq/app/api/ai/companion/roadmap/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:m,staticGenerationAsyncStorage:h,serverHooks:f}=d,g="/api/ai/companion/roadmap/route";function x(){return(0,i.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:h})}},13868:(e,r,t)=>{t.d(r,{cb:()=>a,lN:()=>n});var o=t(1964);function n(e){return(0,o.J)()?null:(console.info(`[ai:${e}] early access lock: missing ANTHROPIC_API_KEY`),{status:"locked",message:"This feature is currently rolling out to early users."})}function a(e,r){return console.error(`[ai:${e}] rolling out fallback`,r),{status:"fallback",message:"We're processing your learning pattern. Results will be available soon."}}},1964:(e,r,t)=>{function o(){return process.env.ANTHROPIC_API_KEY?.trim()??""}function n(){return o().length>0}t.d(r,{J:()=>n,u:()=>o})},49303:(e,r,t)=>{e.exports=t(30517)}};var r=require("../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[8948,4588],()=>t(19171));module.exports=o})();