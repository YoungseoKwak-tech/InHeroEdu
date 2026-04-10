"use strict";(()=>{var e={};e.id=7918,e.ids=[7918],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},7147:e=>{e.exports=require("fs")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},7561:e=>{e.exports=require("node:fs")},4492:e=>{e.exports=require("node:stream")},2477:e=>{e.exports=require("node:stream/web")},1017:e=>{e.exports=require("path")},5477:e=>{e.exports=require("punycode")},2781:e=>{e.exports=require("stream")},7310:e=>{e.exports=require("url")},3837:e=>{e.exports=require("util")},1267:e=>{e.exports=require("worker_threads")},9796:e=>{e.exports=require("zlib")},1506:(e,t,n)=>{n.r(t),n.d(t,{originalPathname:()=>g,patchFetch:()=>x,requestAsyncStorage:()=>c,routeModule:()=>l,serverHooks:()=>h,staticGenerationAsyncStorage:()=>d});var r={};n.r(r),n.d(r,{POST:()=>p});var o=n(9303),s=n(8716),a=n(3131);let i=new(n(4588)).ZP({apiKey:process.env.ANTHROPIC_API_KEY}),u=`You are a bilingual learning analyst for Korean students studying AP subjects in English.

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
}`;async function p(e){let{subject:t,question:n,studentAnswer:r,correctAnswer:o,reasoning:s=""}=await e.json(),a=`Subject: ${t}

Question (as given to student, in English):
${n}

Student's answer: ${r}
Correct answer: ${o}
Student's reasoning: ${s||"(not provided)"}`;try{let e=await i.messages.create({model:"claude-sonnet-4-6",max_tokens:700,system:u,messages:[{role:"user",content:a}]}),t=("text"===e.content[0].type?e.content[0].text:"{}").replace(/```json\n?/g,"").replace(/```\n?/g,"").trim(),n=JSON.parse(t);return Response.json(n)}catch(e){return console.error("[thinking-analyzer]",e),Response.json({error:"분석 실패"},{status:500})}}let l=new o.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/ai/thinking-analyzer/route",pathname:"/api/ai/thinking-analyzer",filename:"route",bundlePath:"app/api/ai/thinking-analyzer/route"},resolvedPagePath:"/Users/kathleenk/Desktop/Education/novaiq/app/api/ai/thinking-analyzer/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:c,staticGenerationAsyncStorage:d,serverHooks:h}=l,g="/api/ai/thinking-analyzer/route";function x(){return(0,a.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:d})}},9303:(e,t,n)=>{e.exports=n(517)}};var t=require("../../../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),r=t.X(0,[8948,4588],()=>n(1506));module.exports=r})();