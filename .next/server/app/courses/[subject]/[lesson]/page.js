(()=>{var e={};e.id=4862,e.ids=[4862],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},54967:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>a.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>d,routeModule:()=>u,tree:()=>c}),t(38785),t(78439),t(35866);var o=t(23191),s=t(88716),n=t(37922),a=t.n(n),l=t(95231),i={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(i[e]=()=>l[e]);t.d(r,i);let c=["",{children:["courses",{children:["[subject]",{children:["[lesson]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,38785)),"/Users/kathleenk/Desktop/Education/novaiq/app/courses/[subject]/[lesson]/page.tsx"]}]},{}]},{}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,78439)),"/Users/kathleenk/Desktop/Education/novaiq/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,35866,23)),"next/dist/client/components/not-found-error"]}],d=["/Users/kathleenk/Desktop/Education/novaiq/app/courses/[subject]/[lesson]/page.tsx"],p="/courses/[subject]/[lesson]/page",m={require:t,loadChunk:()=>Promise.resolve()},u=new o.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/courses/[subject]/[lesson]/page",pathname:"/courses/[subject]/[lesson]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},50816:(e,r,t)=>{Promise.resolve().then(t.bind(t,47456)),Promise.resolve().then(t.bind(t,88577)),Promise.resolve().then(t.bind(t,9411)),Promise.resolve().then(t.t.bind(t,79404,23))},47456:(e,r,t)=>{"use strict";t.d(r,{default:()=>S});var o=t(10326),s=t(17577),n=t(90434),a=t(36788);function l({videoId:e,onEnded:r,blocked:t}){let n=(0,s.useRef)(null);return(0,s.useRef)(null),(0,s.useRef)(r),o.jsx("div",{ref:n,className:"absolute inset-0",style:{pointerEvents:t?"none":"auto"}})}function i({src:e,onEnded:r,blocked:t}){return o.jsx("video",{src:e,controls:!0,autoPlay:!0,playsInline:!0,onEnded:r,className:"absolute inset-0 w-full h-full object-contain bg-black",style:{pointerEvents:t?"none":"auto"}},e)}function c({part:e,onSubmit:r}){let[t,n]=(0,s.useState)("");return(0,o.jsxs)("div",{className:"lp-overlay-card",children:[o.jsx("div",{className:"lp-badge lp-badge-spark",children:"⚡ SPARK"}),o.jsx("p",{className:"lp-overlay-hint",children:"No right or wrong — just think out loud"}),o.jsx("p",{className:"lp-overlay-prompt",children:e.prompt}),o.jsx("textarea",{rows:3,value:t,onChange:e=>n(e.target.value),placeholder:"Your thoughts…",autoFocus:!0,className:"lp-textarea"}),o.jsx("button",{onClick:()=>t.trim()&&r(t.trim()),disabled:!t.trim(),className:"lp-btn lp-btn-spark",children:"Continue →"})]})}function d({part:e,onSubmit:r}){let[t,n]=(0,s.useState)(null),[a,l]=(0,s.useState)(!1),i=e.options.indexOf(e.correct),c=a&&t===i;return(0,o.jsxs)("div",{className:"lp-overlay-card",children:[o.jsx("div",{className:"lp-badge lp-badge-gap",children:"⚡ GAP CRUNCH"}),o.jsx("p",{className:"lp-overlay-hint",children:"Spot the correct framing"}),(0,o.jsxs)("div",{className:"lp-gap-statement",children:[o.jsx("p",{className:"lp-gap-label",children:"KEY INSIGHT"}),o.jsx("p",{className:"lp-gap-text",children:e.statement})]}),o.jsx("p",{className:"lp-overlay-hint",style:{marginBottom:"0.5rem"},children:"Which statement is correct?"}),o.jsx("div",{className:"lp-options",children:e.options.map((e,r)=>{let s="lp-option";return a?s+=r===i?" lp-option-correct":r===t?" lp-option-wrong":" lp-option-dim":t===r&&(s+=" lp-option-selected-gap"),o.jsx("button",{disabled:a,onClick:()=>n(r),className:s,children:e},r)})}),a&&o.jsx("p",{className:`lp-feedback ${c?"lp-feedback-ok":"lp-feedback-err"}`,children:c?"✓ Correct! You identified the right framing.":"✗ The correct answer is highlighted in green above."}),a?o.jsx("button",{onClick:()=>r(e.options[t],c),className:`lp-btn ${c?"lp-btn-ok":"lp-btn-gap"}`,children:c?"Continue →":"Continue Anyway →"}):o.jsx("button",{onClick:()=>null!==t&&l(!0),disabled:null===t,className:"lp-btn lp-btn-gap",children:"Check Answer"})]})}function p({part:e,onSubmit:r}){let[t,n]=(0,s.useState)(""),a=t.trim().length>=30;return(0,o.jsxs)("div",{className:"lp-overlay-card",children:[o.jsx("div",{className:"lp-badge lp-badge-teach",children:"\uD83C\uDF93 TEACH BACK"}),o.jsx("p",{className:"lp-overlay-hint",children:"Explain it in your own words"}),o.jsx("p",{className:"lp-overlay-prompt",children:e.prompt}),o.jsx("textarea",{rows:4,value:t,onChange:e=>n(e.target.value),placeholder:"Explain it as if you're teaching someone else…",autoFocus:!0,className:"lp-textarea"}),(0,o.jsxs)("p",{className:"lp-char-hint",children:[t.trim().length,"/30 min characters"]}),o.jsx("button",{onClick:()=>a&&r(t.trim()),disabled:!a,className:"lp-btn lp-btn-teach",children:"Submit Explanation →"})]})}let m=["A","B","C","D","E"];function u({part:e,onSubmit:r}){let[t,n]=(0,s.useState)(null),[a,l]=(0,s.useState)("selecting"),[i,c]=(0,s.useState)(!1),[d,p]=(0,s.useState)(null);return(0,o.jsxs)("div",{className:"lp-overlay-card",children:[o.jsx("div",{className:"lp-badge lp-badge-sprint",children:"\uD83C\uDFC3 QUESTION SPRINT"}),o.jsx("p",{className:"lp-overlay-prompt",style:{fontSize:"0.9rem"},children:e.question}),o.jsx("div",{className:"lp-options",children:e.options.map((r,s)=>(0,o.jsxs)("button",{disabled:"selecting"!==a,onClick:()=>n(s),className:function(r){let o="lp-option";return"selecting"===a?t===r?`${o} lp-option-selected-sprint`:o:r===e.correct?`${o} lp-option-correct`:r===d&&r!==e.correct?`${o} lp-option-wrong`:`${o} lp-option-dim`}(s),children:[o.jsx("span",{className:"lp-opt-label",children:m[s]}),r]},s))}),"correct"===a&&(0,o.jsxs)("div",{className:"lp-feedback-box lp-feedback-box-ok",children:[o.jsx("p",{className:"lp-feedback lp-feedback-ok",children:"✓ Correct!"}),o.jsx("p",{className:"lp-feedback-body",children:e.explanation})]}),"wrong"===a&&(0,o.jsxs)("div",{className:"lp-feedback-box lp-feedback-box-err",children:[o.jsx("p",{className:"lp-feedback lp-feedback-err",children:"✗ Not quite"}),o.jsx("p",{className:"lp-feedback-body",children:e.wrongPattern})]}),"selecting"===a&&o.jsx("button",{onClick:function(){if(null===t)return;let r=t===e.correct;p(t),l(r?"correct":"wrong")},disabled:null===t,className:"lp-btn lp-btn-sprint",children:"Submit Answer"}),"correct"===a&&o.jsx("button",{onClick:()=>r(e.options[d],!0),className:"lp-btn lp-btn-ok",children:"Continue →"}),"wrong"===a&&(0,o.jsxs)("div",{className:"lp-row",children:[!i&&o.jsx("button",{onClick:function(){c(!0),n(null),l("selecting")},className:"lp-btn lp-btn-ghost",children:"Try Again"}),o.jsx("button",{onClick:()=>r(e.options[d],!1),className:`lp-btn lp-btn-gap ${i?"":"lp-btn-half"}`,children:"Move On →"})]})]})}let g={"CONCEPT GAP":{bg:"rgba(59,130,246,0.08)",border:"rgba(59,130,246,0.28)",color:"#60A5FA",icon:"\uD83E\uDDE0"},"LANGUAGE GAP":{bg:"rgba(168,85,247,0.08)",border:"rgba(168,85,247,0.28)",color:"#C084FC",icon:"\uD83D\uDCAC"},"LOGIC GAP":{bg:"rgba(249,115,22,0.08)",border:"rgba(249,115,22,0.28)",color:"#FB923C",icon:"\uD83D\uDD17"},"APPLICATION GAP":{bg:"rgba(16,185,129,0.08)",border:"rgba(16,185,129,0.28)",color:"#34D399",icon:"\uD83C\uDFAF"}};function h({part:e,onContinue:r}){let t=g[e.gapType]??g["CONCEPT GAP"];return(0,o.jsxs)("div",{className:"lp-overlay-card",children:[o.jsx("div",{className:"lp-badge lp-badge-analyzer",children:"\uD83D\uDD2C ANALYZER"}),o.jsx("p",{className:"lp-overlay-hint",children:"Pattern detected in your responses"}),(0,o.jsxs)("div",{className:"lp-analyzer-box",style:{background:t.bg,borderColor:t.border},children:[(0,o.jsxs)("div",{className:"lp-analyzer-head",children:[o.jsx("span",{className:"lp-analyzer-icon",children:t.icon}),o.jsx("span",{className:"lp-analyzer-gap",style:{color:t.color},children:e.gapType})]}),o.jsx("p",{className:"lp-analyzer-msg",children:e.message})]}),o.jsx("p",{className:"lp-char-hint",style:{textAlign:"center"},children:"Saved to your learning profile."}),o.jsx("button",{onClick:r,className:"lp-btn",style:{background:t.border,color:"#fff"},children:"Got it →"})]})}function f({lesson:e,onComplete:r,onVideoPartEnd:t}){let[n,m]=(0,s.useState)(0),[g,f]=(0,s.useState)(!1),b=(0,s.useRef)(0),x=n>=e.parts.length,y=x?null:e.parts[n],v=!!y&&"video"!==y.type,j=(0,s.useMemo)(()=>{for(let r=Math.min(n,e.parts.length-1);r>=0;r--)if("video"===e.parts[r].type)return e.parts[r];return null},[e.parts,n]),N=(0,s.useMemo)(()=>y?.type==="video"?y:j,[y,j]),k=(0,s.useMemo)(()=>N?N.youtubeId??function(e){let r=e.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);return r?.[1]??null}(N.src??""):null,[N]),w=e.parts.length,C=x?100:n/w*100,S=e.parts.filter(e=>"video"!==e.type),_=e.parts.slice(0,n).filter(e=>"video"!==e.type).length,E=e.parts.filter(e=>"video"===e.type).length,A=e.parts.slice(0,n).filter(e=>"video"===e.type).length;function z(){f(!1),setTimeout(()=>m(e=>e+1),280)}let P=(0,s.useCallback)((r,t,o,s)=>{(0,a.S)("/api/lesson-progress",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({lessonId:e.id,partId:r,overlayType:t,studentResponse:o,isCorrect:s})}).catch(()=>{})},[e.id]);function T(){let e=b.current;b.current+=1,t?t(e,z):z()}return(0,o.jsxs)("div",{className:"lp-root",children:[o.jsx("div",{className:"lp-topbar",children:(0,o.jsxs)("div",{className:"lp-topbar-inner",children:[o.jsx("span",{className:"lp-topbar-title",children:e.title}),o.jsx("div",{className:"lp-progress-track",children:o.jsx("div",{className:"lp-progress-fill",style:{width:`${C}%`}})}),o.jsx("span",{className:"lp-topbar-count",children:v?`Check-in ${_+1}/${S.length}`:`Part ${A+1}/${E}`})]})}),o.jsx("div",{className:"lp-body",children:x?(0,o.jsxs)("div",{className:"lp-complete",children:[o.jsx("div",{className:"lp-complete-icon",children:"\uD83C\uDF93"}),o.jsx("h2",{className:"lp-complete-title",children:"Lesson Complete"}),(0,o.jsxs)("p",{className:"lp-complete-sub",children:["You finished all ",S.length," check-in",1!==S.length?"s":""," for this lesson."]}),o.jsx("button",{onClick:()=>{m(0),f(!1)},className:"lp-btn lp-btn-ghost lp-btn-replay",children:"↺ Replay Lesson"})]}):(0,o.jsxs)("div",{className:"lp-player-wrap",children:[(0,o.jsxs)("div",{className:"lp-video-shell",children:[N?k?o.jsx(l,{videoId:k,onEnded:T,blocked:v},N.id):o.jsx(i,{src:N.src??"",onEnded:T,blocked:v},N.id):o.jsx("div",{className:"lp-no-video",children:o.jsx("span",{style:{color:"#444"},children:"No video"})}),v&&o.jsx("div",{className:"lp-overlay-backdrop",style:{opacity:g?1:0,transform:g?"translateY(0)":"translateY(10px)"},children:(0,o.jsxs)("div",{className:"lp-overlay-scroll",children:["SPARK"===y.type&&o.jsx(c,{part:y,onSubmit:function(e){P(y.id,"SPARK",e,!0),z()}}),"GAP_CRUNCH"===y.type&&o.jsx(d,{part:y,onSubmit:function(e,r){P(y.id,"GAP_CRUNCH",e,r),z()}}),"TEACH_BACK"===y.type&&o.jsx(p,{part:y,onSubmit:function(e){P(y.id,"TEACH_BACK",e,!0),z()}}),"QUESTION_SPRINT"===y.type&&o.jsx(u,{part:y,onSubmit:function(e,r){P(y.id,"QUESTION_SPRINT",e,r),z()}}),"ANALYZER"===y.type&&o.jsx(h,{part:y,onContinue:function(){P(y.id,"ANALYZER","",!0),z()}})]})})]}),o.jsx("div",{className:"lp-status-strip",children:v||y?.type!=="video"?v?(0,o.jsxs)(o.Fragment,{children:[o.jsx("span",{className:"lp-dot-yellow"}),(0,o.jsxs)("span",{className:"lp-status-text",children:["SPARK"===y.type&&"Spark — reflection","GAP_CRUNCH"===y.type&&"Gap Crunch — spot the misconception","TEACH_BACK"===y.type&&"Teach Back — explain in your own words","QUESTION_SPRINT"===y.type&&"Question Sprint — test your knowledge","ANALYZER"===y.type&&"Analyzer — reviewing your pattern"]})]}):null:(0,o.jsxs)(o.Fragment,{children:[o.jsx("span",{className:"lp-pulse"}),(0,o.jsxs)("span",{className:"lp-status-text",children:["Playing part ",A+1," of ",E,y.duration?` \xb7 ${y.duration}`:""]})]})})]})}),o.jsx("style",{children:`
        .lp-root {
          background: #0a0a0a;
          min-height: 100vh;
          font-family: 'Inter', system-ui, sans-serif;
          color: #fff;
        }

        /* Top bar — offset by 4rem (64px) to sit below the site Navbar */
        .lp-topbar {
          position: sticky;
          top: 4rem;
          z-index: 30;
          background: #111;
          border-bottom: 1px solid #1f1f1f;
          padding: 0.6rem 1rem;
        }
        .lp-topbar-inner {
          max-width: 52rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .lp-topbar-title {
          font-size: 0.7rem;
          color: #555;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 180px;
        }
        .lp-progress-track {
          flex: 1;
          height: 4px;
          border-radius: 9999px;
          background: #222;
          overflow: hidden;
        }
        .lp-progress-fill {
          height: 100%;
          border-radius: 9999px;
          background: linear-gradient(90deg, #00FFB2, #00D9FF);
          transition: width 0.5s ease;
        }
        .lp-topbar-count {
          font-size: 0.7rem;
          color: #555;
          white-space: nowrap;
        }

        /* Body */
        .lp-body {
          max-width: 52rem;
          margin: 0 auto;
          padding: 1.5rem 1rem 3rem;
        }

        /* Video shell */
        .lp-player-wrap { display: flex; flex-direction: column; gap: 0.75rem; }
        .lp-video-shell {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
          border-radius: 1rem;
          overflow: hidden;
        }
        .lp-no-video {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: #0f0f0f;
        }

        /* Overlay backdrop */
        .lp-overlay-backdrop {
          position: absolute; inset: 0;
          background: rgba(10, 10, 10, 0.92);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          transition: opacity 0.28s ease, transform 0.28s ease;
          z-index: 10;
          overflow-y: auto;
        }
        .lp-overlay-scroll {
          width: 100%;
          max-width: 28rem;
        }

        /* Overlay card shared */
        .lp-overlay-card {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .lp-overlay-hint {
          font-size: 0.7rem;
          color: #555;
          margin-top: 0.3rem;
          margin-bottom: 0.9rem;
        }
        .lp-overlay-prompt {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.55;
          color: #f1f1f1;
          margin-bottom: 1rem;
        }

        /* Badges */
        .lp-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          border: 1px solid;
          width: fit-content;
        }
        .lp-badge-spark   { background: rgba(255,214,0,0.1);  color: #FFD600; border-color: rgba(255,214,0,0.25); }
        .lp-badge-gap     { background: rgba(239,68,68,0.1);  color: #F87171; border-color: rgba(239,68,68,0.25); }
        .lp-badge-teach   { background: rgba(59,130,246,0.1); color: #60A5FA; border-color: rgba(59,130,246,0.25); }
        .lp-badge-sprint  { background: rgba(167,139,250,0.1);color: #A78BFA; border-color: rgba(167,139,250,0.25); }
        .lp-badge-analyzer{ background: rgba(255,255,255,0.05);color: #888;   border-color: rgba(255,255,255,0.12); }

        /* Textarea */
        .lp-textarea {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #2a2a2a;
          background: #141414;
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
          color: #e5e5e5;
          resize: none;
          outline: none;
          transition: border-color 0.15s;
          font-family: inherit;
        }
        .lp-textarea:focus { border-color: #3a3a3a; }
        .lp-textarea::placeholder { color: #3a3a3a; }
        .lp-char-hint { font-size: 0.65rem; color: #444; margin-top: 0.3rem; margin-bottom: 0.75rem; }

        /* Options list */
        .lp-options { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
        .lp-option {
          width: 100%;
          text-align: left;
          padding: 0.7rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #222;
          background: #111;
          color: #ddd;
          font-size: 0.83rem;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .lp-option:not(:disabled):hover { border-color: #333; background: #161616; }
        .lp-option:disabled { cursor: default; }
        .lp-option-selected-gap    { border-color: #F87171 !important; background: rgba(239,68,68,0.1) !important; }
        .lp-option-selected-sprint { border-color: #A78BFA !important; background: rgba(167,139,250,0.1) !important; }
        .lp-option-correct { border-color: #4ade80 !important; background: rgba(74,222,128,0.08) !important; color: #4ade80 !important; }
        .lp-option-wrong   { border-color: #f87171 !important; background: rgba(248,113,113,0.08) !important; color: #f87171 !important; }
        .lp-option-dim     { opacity: 0.35; }
        .lp-opt-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 50%;
          font-size: 0.65rem;
          font-weight: 700;
          flex-shrink: 0;
          background: rgba(255,255,255,0.07);
          color: #aaa;
        }

        /* GAP statement block */
        .lp-gap-statement {
          padding: 0.85rem 1rem;
          border-radius: 0.75rem;
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.18);
          margin-bottom: 0.85rem;
        }
        .lp-gap-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; color: #666; margin-bottom: 0.35rem; font-family: 'Space Mono', monospace; }
        .lp-gap-text  { font-size: 0.9rem; font-weight: 700; color: #fff; }

        /* Feedback inline */
        .lp-feedback { font-size: 0.8rem; font-weight: 600; margin-bottom: 0.5rem; }
        .lp-feedback-ok  { color: #4ade80; }
        .lp-feedback-err { color: #f87171; }

        /* Feedback box */
        .lp-feedback-box {
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          margin-bottom: 0.75rem;
          border: 1px solid;
        }
        .lp-feedback-box-ok  { background: rgba(74,222,128,0.06);  border-color: rgba(74,222,128,0.2); }
        .lp-feedback-box-err { background: rgba(248,113,113,0.06); border-color: rgba(248,113,113,0.2); }
        .lp-feedback-body { font-size: 0.8rem; color: #bbb; line-height: 1.5; }

        /* Buttons */
        .lp-btn {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.85rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s, filter 0.15s;
          margin-top: 0.25rem;
        }
        .lp-btn:disabled { opacity: 0.35; cursor: default; }
        .lp-btn:not(:disabled):hover { filter: brightness(1.1); }

        .lp-btn-spark  { background: #FFD600; color: #0a0a0a; }
        .lp-btn-gap    { background: #dc2626; color: #fff; }
        .lp-btn-teach  { background: #2563eb; color: #fff; }
        .lp-btn-sprint { background: #7c3aed; color: #fff; }
        .lp-btn-ok     { background: #16a34a; color: #fff; }
        .lp-btn-ghost  { background: transparent; color: #aaa; border: 1px solid #2a2a2a; }
        .lp-btn-replay { width: auto; margin-top: 1rem; padding: 0.6rem 1.5rem; }
        .lp-btn-half   { flex: 1; width: auto; }

        /* Row layout for side-by-side buttons */
        .lp-row { display: flex; gap: 0.5rem; }
        .lp-row .lp-btn { margin-top: 0; }

        /* Analyzer */
        .lp-analyzer-box {
          padding: 1.1rem 1.1rem;
          border-radius: 1rem;
          border: 1px solid;
          margin-bottom: 0.75rem;
        }
        .lp-analyzer-head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem; }
        .lp-analyzer-icon { font-size: 1.3rem; }
        .lp-analyzer-gap  { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.07em; }
        .lp-analyzer-msg  { font-size: 0.88rem; color: #ccc; line-height: 1.55; }

        /* Status strip */
        .lp-status-strip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 0.25rem;
        }
        .lp-status-text { font-size: 0.75rem; color: #555; }
        .lp-pulse {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4ade80;
          animation: lp-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        .lp-dot-yellow {
          width: 6px; height: 6px; border-radius: 50%;
          background: #FFD600;
          flex-shrink: 0;
        }

        /* Complete screen */
        .lp-complete {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 1rem;
          text-align: center;
        }
        .lp-complete-icon  { font-size: 3.5rem; margin-bottom: 1.25rem; }
        .lp-complete-title { font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .lp-complete-sub   { font-size: 0.875rem; color: #555; margin-bottom: 0; }

        /* Animations */
        @keyframes lp-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .lp-overlay-backdrop { padding: 0.75rem; }
          .lp-overlay-prompt { font-size: 0.9rem; }
          .lp-video-shell { border-radius: 0.5rem; }
          .lp-topbar-title { display: none; }
        }
      `})]})}let b={spark:{label:"SPARK",icon:"⚡",accent:"#C9A84C",bg:"#0d1a10",dim:"#C9A84C22"},gap_crunch:{label:"GAP CRUNCH",icon:"\uD83D\uDD34",accent:"#E85A4A",bg:"#120a0a",dim:"#E85A4A22"},teach_back:{label:"TEACH BACK",icon:"\uD83C\uDF93",accent:"#5DCAA5",bg:"#091410",dim:"#5DCAA522"},question_sprint:{label:"QUESTION SPRINT",icon:"\uD83C\uDFC3",accent:"#9F97ED",bg:"#0c0b18",dim:"#9F97ED22"},analyzer:{label:"ANALYZER",icon:"\uD83D\uDD2C",accent:"#5DAAF0",bg:"#090f18",dim:"#5DAAF022"}};function x(e){(0,a.S)("/api/overlay-responses",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).catch(()=>{})}function y({score:e}){return(0,o.jsxs)("div",{className:"op-stars",children:[[1,2,3,4,5].map(r=>o.jsx("span",{className:r<=e?"op-star op-star-on":"op-star",children:"★"},r)),(0,o.jsxs)("span",{className:"op-stars-label",children:[e,"/5"]})]})}function v({overlay:e,lessonId:r,accent:t,dim:s,onDone:n}){let a=e.data,l=a.connectedConcepts??[];return(0,o.jsxs)("div",{className:"op-card-body",children:[o.jsx("div",{className:"op-concept-unlock",style:{color:t},children:String(a.conceptUnlocked??"")}),o.jsx("p",{className:"op-why",children:String(a.whyItMatters??"")}),o.jsx("p",{className:"op-memory-anchor",children:String(a.memoryAnchor??"")}),l.length>0&&o.jsx("div",{className:"op-pills",children:l.map((e,r)=>o.jsx("span",{className:"op-pill",style:{borderColor:t+"55",color:t},children:e},r))}),o.jsx("p",{className:"op-exam-connection",children:String(a.examConnection??"")}),o.jsx("button",{className:"op-btn",style:{background:t,color:"#0a0a0a"},onClick:function(){x({lessonId:r,overlayId:e.id,overlayType:e.type}),n()},children:"Got it →"})]})}function j({overlay:e,lessonId:r,accent:t,onDone:n}){let l=e.data,[i,c]=(0,s.useState)("read"),[d,p]=(0,s.useState)(""),[m,u]=(0,s.useState)("");async function g(){if(d.trim()){c("evaluating");try{let e=await (0,a.S)("/api/overlay/evaluate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"gap_crunch",fixPrompt:String(l.fixPrompt??""),studentResponse:d,gapType:String(l.gapType??"")})}),r=await e.json();u(r.feedback??"")}catch{u("Keep working on distinguishing when each case applies.")}c("result")}}return(0,o.jsxs)("div",{className:"op-card-body",children:[o.jsx("div",{className:"op-gap-type-badge",style:{borderColor:t+"55",color:t},children:String(l.gapType??"")}),o.jsx("h2",{className:"op-gap-headline",style:{color:t},children:String(l.headline??"")}),(0,o.jsxs)("div",{className:"op-two-col",children:[(0,o.jsxs)("div",{className:"op-col",children:[o.jsx("div",{className:"op-col-label",children:"What students think"}),o.jsx("p",{className:"op-col-text",children:String(l.whatStudentsThink??"")})]}),o.jsx("div",{className:"op-col-divider",style:{borderColor:t+"33"}}),(0,o.jsxs)("div",{className:"op-col",children:[o.jsx("div",{className:"op-col-label op-col-label-right",children:"What is actually true"}),o.jsx("p",{className:"op-col-text",children:String(l.whatIsActuallyTrue??"")})]})]}),(0,o.jsxs)("div",{className:"op-trap-box",style:{borderLeftColor:"#E85A4A"},children:[o.jsx("span",{className:"op-trap-label",children:"⚠ EXAM TRAP"}),o.jsx("p",{className:"op-trap-text",children:String(l.examTrap??"")})]}),"read"===i&&(0,o.jsxs)(o.Fragment,{children:[o.jsx("p",{className:"op-fix-prompt",children:String(l.fixPrompt??"")}),o.jsx("button",{className:"op-btn op-btn-outline",style:{borderColor:t,color:t},onClick:()=>c("typing"),children:"I see the gap — answer this"})]}),("typing"===i||"evaluating"===i)&&(0,o.jsxs)(o.Fragment,{children:[o.jsx("p",{className:"op-fix-prompt",children:String(l.fixPrompt??"")}),o.jsx("textarea",{className:"op-textarea",rows:3,autoFocus:!0,placeholder:"Type your answer…",value:d,onChange:e=>p(e.target.value),disabled:"evaluating"===i}),o.jsx("button",{className:"op-btn",style:{background:"evaluating"===i?"#222":t,color:"#0a0a0a"},disabled:!d.trim()||"evaluating"===i,onClick:g,children:"evaluating"===i?(0,o.jsxs)(o.Fragment,{children:[o.jsx("span",{className:"op-spinner",style:{borderTopColor:t}})," Checking…"]}):"Check my thinking →"})]}),"result"===i&&(0,o.jsxs)(o.Fragment,{children:[o.jsx("div",{className:"op-eval-result",style:{borderColor:t+"44"},children:o.jsx("p",{className:"op-eval-text",children:m})}),o.jsx("button",{className:"op-btn",style:{background:t,color:"#0a0a0a"},onClick:function(){x({lessonId:r,overlayId:e.id,overlayType:e.type,response:d,gapType:String(l.gapType??"")}),n()},children:"Continue →"})]})]})}function N({overlay:e,lessonId:r,accent:t,onDone:n}){let l=e.data,[i,c]=(0,s.useState)("writing"),[d,p]=(0,s.useState)(""),[m,u]=(0,s.useState)(!1),[g,h]=(0,s.useState)(0),[f,b]=(0,s.useState)(""),v=d.trim().length>=40;async function j(){if(v){c("evaluating");try{let e=await (0,a.S)("/api/overlay/evaluate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"teach_back",aiEvalPrompt:String(l.aiEvalPrompt??"Evaluate the student's teach-back on a 1-5 scale."),studentResponse:d})}),r=await e.json();h(Number(r.score)||3),b(r.feedback??"")}catch{h(3),b("Your explanation shows understanding. Try to be more precise about the mechanism.")}c("result")}}return(0,o.jsxs)("div",{className:"op-card-body",children:[o.jsx("div",{className:"op-tb-concept",style:{borderColor:t+"55",color:t},children:String(l.targetConcept??"")}),o.jsx("h2",{className:"op-tb-prompt",children:String(l.teachPrompt??"")}),"writing"===i&&(0,o.jsxs)(o.Fragment,{children:[o.jsx("textarea",{className:"op-textarea",rows:5,autoFocus:!0,placeholder:"Explain it as if you're teaching a confused classmate…",value:d,onChange:e=>p(e.target.value)}),(0,o.jsxs)("div",{className:"op-tb-footer",children:[(0,o.jsxs)("span",{className:"op-char-hint",children:[d.trim().length," / 40 min"]}),o.jsx("button",{className:"op-hint-toggle",onClick:()=>u(e=>!e),children:m?"Hide hint ▲":"Need a hint? ▼"})]}),m&&(0,o.jsxs)("div",{className:"op-hint-box",style:{borderColor:t+"33"},children:[o.jsx("span",{className:"op-hint-label",children:"HINT"}),o.jsx("p",{className:"op-hint-text",children:String(l.ifTheyStruggle??"")})]}),o.jsx("button",{className:"op-btn",style:{background:v?t:"#1a1a1a",color:v?"#0a0a0a":"#333"},disabled:!v,onClick:j,children:"Submit explanation →"})]}),"evaluating"===i&&(0,o.jsxs)("div",{className:"op-eval-loading",children:[o.jsx("span",{className:"op-spinner op-spinner-lg",style:{borderTopColor:t}}),o.jsx("p",{className:"op-eval-loading-text",children:"Evaluating your explanation…"})]}),"result"===i&&(0,o.jsxs)(o.Fragment,{children:[o.jsx("div",{className:"op-student-response",children:o.jsx("p",{className:"op-sr-text",children:d})}),o.jsx(y,{score:g}),o.jsx("div",{className:"op-eval-result",style:{borderColor:t+"44"},children:o.jsx("p",{className:"op-eval-text",children:f})}),(0,o.jsxs)("p",{className:"op-success-signal",children:[o.jsx("span",{className:"op-ss-label",children:"STRONG ANSWER INCLUDES:"})," ",String(l.successSignal??"")]}),o.jsx("button",{className:"op-btn",style:{background:t,color:"#0a0a0a"},onClick:function(){x({lessonId:r,overlayId:e.id,overlayType:e.type,response:d,score:g}),n()},children:"Continue →"})]})]})}function k({overlay:e,lessonId:r,accent:t,onDone:n}){let a=e.data,l=a.questions??[],[i,c]=(0,s.useState)(0),[d,p]=(0,s.useState)(null),[m,u]=(0,s.useState)(!1),[g,h]=(0,s.useState)([]),f=l[i],b=null!=d&&null!=f&&d.charAt(0)===f.correct,y=i>=l.length,v=g.filter(e=>e.correct).length;return!f||y?(0,o.jsxs)("div",{className:"op-card-body",children:[(0,o.jsxs)("div",{className:"op-sprint-score",children:[o.jsx("span",{className:"op-sprint-score-num",style:{color:t},children:v}),(0,o.jsxs)("span",{className:"op-sprint-score-denom",children:["/",l.length]})]}),o.jsx("p",{className:"op-sprint-focus",children:String(a.sprintFocus??"")}),o.jsx("div",{className:"op-sprint-breakdown",children:g.map((e,r)=>(0,o.jsxs)("div",{className:"op-sprint-result-row",children:[o.jsx("span",{className:e.correct?"op-dot-ok":"op-dot-err",children:e.correct?"✓":"✗"}),(0,o.jsxs)("span",{className:"op-sprint-q-label",children:["Q",r+1]}),o.jsx("span",{className:"op-sprint-gap",children:e.gapType})]},r))}),o.jsx("button",{className:"op-btn",style:{background:t,color:"#0a0a0a"},onClick:function(){n()},children:"Continue →"})]}):(0,o.jsxs)("div",{className:"op-card-body",children:[(0,o.jsxs)("div",{className:"op-sprint-progress",children:[(0,o.jsxs)("span",{className:"op-sprint-idx",style:{color:t},children:["Q",i+1]}),(0,o.jsxs)("span",{className:"op-sprint-total",children:["of ",l.length]}),o.jsx("div",{className:"op-sprint-dots",children:l.map((e,r)=>o.jsx("span",{className:"op-sprint-dot",style:{background:r<i?g[r]?.correct?"#4ade80":"#ef4444":r===i?t:"#1a1a1a"}},r))})]}),o.jsx("p",{className:"op-sprint-q",children:f.q}),o.jsx("div",{className:"op-choices",children:f.choices.map((e,r)=>{let t=e.charAt(0),s=t===f.correct,n="op-choice";return m?s?n+=" op-choice-correct":e===d?n+=" op-choice-wrong":n+=" op-choice-dim":e===d&&(n+=" op-choice-picked"),(0,o.jsxs)("button",{className:n,disabled:m,onClick:()=>p(e),style:m&&s?{borderColor:"#4ade80"}:void 0,children:[o.jsx("span",{className:"op-choice-letter",children:t}),o.jsx("span",{className:"op-choice-text",children:e.slice(3)})]},r)})}),m&&(0,o.jsxs)("div",{className:`op-sprint-feedback ${b?"op-sfb-ok":"op-sfb-err"}`,children:[o.jsx("span",{className:"op-sfb-icon",children:b?"✓ Correct":"✗ Not quite"}),o.jsx("p",{className:"op-sfb-trap",children:f.trap})]}),m?o.jsx("button",{className:"op-btn",style:{background:t,color:"#0a0a0a"},onClick:function(){if(!f)return;let e=null!=d&&d.charAt(0)===f.correct;h(r=>[...r,{correct:e,gapType:f.gapType}]),p(null),u(!1),c(e=>e+1)},children:i+1<l.length?"Next question →":"See results →"}):o.jsx("button",{className:"op-btn",style:{background:d?t:"#1a1a1a",color:d?"#0a0a0a":"#333"},disabled:!d,onClick:function(){if(!d||!f)return;let t=d.charAt(0)===f.correct;u(!0),x({lessonId:r,overlayId:e.id,overlayType:e.type,correct:t,gapType:f.gapType,questionIdx:i})},children:"Check answer"})]})}function w({overlay:e,lessonId:r,accent:t,onDone:n}){let a=e.data,l=a.conceptMap??[],i=a.prerequisiteCheck??[],[c,d]=(0,s.useState)(i.map(()=>!1)),p={high:"100%",medium:"60%",low:"30%"},m={high:"#ef4444",medium:"#f97316",low:"#555"};return(0,o.jsxs)("div",{className:"op-card-body",children:[o.jsx("h2",{className:"op-analyzer-headline",style:{color:t},children:String(a.lessonInOneLine??"")}),(0,o.jsxs)("div",{className:"op-analyzer-stats",children:[(0,o.jsxs)("div",{className:"op-stat",children:[o.jsx("span",{className:"op-stat-num",style:{color:t},children:String(a.coreConceptCount??0)}),o.jsx("span",{className:"op-stat-label",children:"core concepts"})]}),o.jsx("div",{className:"op-stat-divider"}),o.jsx("div",{className:"op-stat",children:o.jsx("span",{className:"op-stat-label",children:String(a.examFrequency??"")})})]}),l.length>0&&(0,o.jsxs)("div",{className:"op-concept-map",children:[o.jsx("div",{className:"op-section-label",children:"CONCEPT MAP"}),l.map((e,r)=>(0,o.jsxs)("div",{className:"op-cm-row",children:[o.jsx("span",{className:"op-cm-name",children:e.concept}),o.jsx("div",{className:"op-cm-bar-track",children:o.jsx("div",{className:"op-cm-bar-fill",style:{width:p[e.weight]??"50%",background:m[e.weight]??"#555"}})}),o.jsx("span",{className:"op-cm-gap",children:e.likelyGap})]},r))]}),(0,o.jsxs)("div",{className:"op-hardest",style:{borderColor:t+"44"},children:[o.jsx("span",{className:"op-section-label",children:"HARDEST MOMENT"}),o.jsx("p",{className:"op-hardest-text",children:String(a.hardestMoment??"")})]}),i.length>0&&(0,o.jsxs)("div",{className:"op-prereqs",children:[o.jsx("div",{className:"op-section-label",children:"PREREQUISITE CHECK"}),i.map((e,r)=>(0,o.jsxs)("label",{className:"op-prereq-row",children:[o.jsx("input",{type:"checkbox",checked:c[r],onChange:()=>d(e=>{let t=[...e];return t[r]=!t[r],t}),className:"op-prereq-check"}),o.jsx("span",{style:{color:c[r]?"#4ade80":"#888"},children:e})]},r))]}),o.jsx("button",{className:"op-btn",style:{background:t,color:"#0a0a0a"},onClick:function(){x({lessonId:r,overlayId:e.id,overlayType:e.type}),n()},children:"Let's go →"})]})}function C({overlays:e,lessonId:r,onComplete:t}){let[n,a]=(0,s.useState)(0),[l,i]=(0,s.useState)(!1),c=(0,s.useCallback)(()=>{i(!1),setTimeout(()=>{n+1>=e.length?t():a(e=>e+1)},150)},[n,e.length,t]);if(!e.length)return null;let d=e[n];if(!d)return null;let p=d.type,m=b[p]??b.spark;return(0,o.jsxs)("div",{className:"op-backdrop",children:[(0,o.jsxs)("div",{className:"op-card",style:{borderColor:m.accent+"44",background:m.bg,opacity:l?1:0,transform:l?"translateY(0)":"translateY(14px)"},children:[(0,o.jsxs)("div",{className:"op-card-header",style:{borderBottomColor:m.accent+"22"},children:[(0,o.jsxs)("span",{className:"op-type-badge",style:{color:m.accent,borderColor:m.accent+"55"},children:[m.icon," ",m.label]}),d.script_section_ref&&o.jsx("span",{className:"op-section-tag",children:d.script_section_ref}),(0,o.jsxs)("span",{className:"op-progress-tag",children:[n+1," / ",e.length]})]}),(0,o.jsxs)("div",{className:"op-card-scroll",children:["spark"===p&&o.jsx(v,{overlay:d,lessonId:r,accent:m.accent,dim:m.dim,onDone:c},d.id),"gap_crunch"===p&&o.jsx(j,{overlay:d,lessonId:r,accent:m.accent,onDone:c},d.id),"teach_back"===p&&o.jsx(N,{overlay:d,lessonId:r,accent:m.accent,onDone:c},d.id),"question_sprint"===p&&o.jsx(k,{overlay:d,lessonId:r,accent:m.accent,onDone:c},d.id),"analyzer"===p&&o.jsx(w,{overlay:d,lessonId:r,accent:m.accent,onDone:c},d.id)]})]}),o.jsx("style",{children:`
        /* ── Backdrop ── */
        .op-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 17, 23, 0.96);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 1.5rem;
        }

        /* ── Card ── */
        .op-card {
          width: 100%;
          max-width: 640px;
          border: 1px solid;
          border-radius: 1.25rem;
          display: flex;
          flex-direction: column;
          max-height: calc(100dvh - 3rem);
          overflow: hidden;
          transition: opacity 0.2s ease-out, transform 0.2s ease-out;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .op-card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-bottom: 1px solid;
          flex-shrink: 0;
        }
        .op-type-badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          padding: 0.2rem 0.55rem;
          border: 1px solid;
          border-radius: 4px;
        }
        .op-section-tag {
          font-size: 0.6rem;
          color: #3a3a3a;
          font-family: monospace;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .op-progress-tag {
          font-size: 0.62rem;
          color: #444;
          font-family: monospace;
          flex-shrink: 0;
        }
        .op-card-scroll {
          overflow-y: auto;
          padding: 1.5rem 1.5rem;
          flex: 1;
        }
        @media (max-width: 640px) {
          .op-card-scroll { padding: 1.25rem; }
        }

        /* ── Shared card body ── */
        .op-card-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          color: #e5e5e5;
        }

        /* ── Button ── */
        .op-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 0.7rem;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: filter 0.15s, opacity 0.15s;
          width: 100%;
        }
        .op-btn:disabled { opacity: 0.35; cursor: default; }
        .op-btn:not(:disabled):hover { filter: brightness(1.08); }
        .op-btn-outline {
          background: transparent !important;
          border: 1px solid !important;
          color: inherit;
        }

        /* ── Textarea ── */
        .op-textarea {
          width: 100%;
          background: #0a0a0a;
          border: 1px solid #1e1e1e;
          border-radius: 0.6rem;
          padding: 0.75rem;
          font-size: 0.88rem;
          color: #ddd;
          outline: none;
          resize: vertical;
          font-family: inherit;
          line-height: 1.6;
          transition: border-color 0.15s;
        }
        .op-textarea:focus { border-color: #333; }

        /* ── Spinner ── */
        .op-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid transparent;
          border-radius: 50%;
          animation: op-spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        .op-spinner-lg { width: 32px; height: 32px; border-width: 3px; }
        @keyframes op-spin { to { transform: rotate(360deg); } }

        /* ── Eval result box ── */
        .op-eval-result {
          border: 1px solid;
          border-radius: 0.65rem;
          padding: 0.85rem 1rem;
          background: #0a0a0a;
        }
        .op-eval-text {
          font-size: 0.88rem;
          color: #ccc;
          line-height: 1.65;
        }
        .op-eval-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem 0;
        }
        .op-eval-loading-text { font-size: 0.82rem; color: #444; }

        /* ── Stars ── */
        .op-stars {
          display: flex;
          align-items: center;
          gap: 0.15rem;
        }
        .op-star { font-size: 1.35rem; color: #222; }
        .op-star-on { color: #f59e0b; }
        .op-stars-label {
          font-size: 0.75rem;
          color: #666;
          margin-left: 0.35rem;
          font-family: monospace;
        }

        /* ── SPARK ── */
        .op-concept-unlock {
          font-size: 1.55rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .op-why {
          font-size: 0.9rem;
          color: #ccc;
          line-height: 1.6;
        }
        .op-memory-anchor {
          font-size: 0.85rem;
          color: #777;
          font-style: italic;
          line-height: 1.6;
        }
        .op-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .op-pill {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border: 1px solid;
          border-radius: 9999px;
          background: transparent;
        }
        .op-exam-connection {
          font-size: 0.75rem;
          color: #444;
          font-style: italic;
        }

        /* ── GAP CRUNCH ── */
        .op-gap-type-badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          padding: 0.2rem 0.55rem;
          border: 1px solid;
          border-radius: 4px;
          width: fit-content;
        }
        .op-gap-headline {
          font-size: 1.15rem;
          font-weight: 800;
          line-height: 1.3;
        }
        .op-two-col {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 0.75rem;
          align-items: start;
        }
        .op-col-divider {
          border-left: 1px solid;
          align-self: stretch;
        }
        .op-col-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 0.25rem;
        }
        .op-col-label-right { text-align: right; }
        .op-col-text {
          font-size: 0.83rem;
          color: #aaa;
          line-height: 1.6;
        }
        .op-trap-box {
          border-left: 3px solid;
          padding: 0.6rem 0.85rem;
          background: #110a0a;
          border-radius: 0 0.4rem 0.4rem 0;
        }
        .op-trap-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          color: #E85A4A;
          display: block;
          margin-bottom: 0.2rem;
        }
        .op-trap-text { font-size: 0.82rem; color: #aaa; line-height: 1.55; }
        .op-fix-prompt { font-size: 0.9rem; color: #ccc; font-weight: 500; }

        /* ── TEACH BACK ── */
        .op-tb-concept {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          padding: 0.22rem 0.6rem;
          border: 1px solid;
          border-radius: 4px;
          width: fit-content;
        }
        .op-tb-prompt {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.4;
        }
        .op-tb-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .op-char-hint { font-size: 0.7rem; color: #444; }
        .op-hint-toggle {
          font-size: 0.72rem;
          color: #555;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.15s;
        }
        .op-hint-toggle:hover { color: #aaa; }
        .op-hint-box {
          border: 1px solid;
          border-radius: 0.5rem;
          padding: 0.65rem 0.85rem;
          background: #0a0a0a;
        }
        .op-hint-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          color: #444;
          display: block;
          margin-bottom: 0.2rem;
        }
        .op-hint-text { font-size: 0.82rem; color: #888; line-height: 1.55; }
        .op-student-response {
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 0.5rem;
          padding: 0.65rem 0.85rem;
        }
        .op-sr-text { font-size: 0.83rem; color: #777; line-height: 1.6; font-style: italic; }
        .op-success-signal {
          font-size: 0.75rem;
          color: #444;
          line-height: 1.5;
        }
        .op-ss-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          color: #333;
          margin-right: 0.25rem;
        }

        /* ── QUESTION SPRINT ── */
        .op-sprint-progress {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .op-sprint-idx { font-size: 0.85rem; font-weight: 800; }
        .op-sprint-total { font-size: 0.72rem; color: #444; }
        .op-sprint-dots { display: flex; gap: 0.3rem; margin-left: auto; }
        .op-sprint-dot {
          width: 8px; height: 8px; border-radius: 50%;
          transition: background 0.2s;
        }
        .op-sprint-q {
          font-size: 0.98rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.5;
        }
        .op-choices { display: flex; flex-direction: column; gap: 0.4rem; }
        .op-choice {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          text-align: left;
          background: #0a0a0a;
          border: 1px solid #1e1e1e;
          border-radius: 0.6rem;
          padding: 0.6rem 0.75rem;
          cursor: pointer;
          color: #bbb;
          font-size: 0.85rem;
          transition: border-color 0.12s, background 0.12s;
        }
        .op-choice:hover:not(:disabled) { border-color: #333; background: #111; }
        .op-choice:disabled { cursor: default; }
        .op-choice-picked { border-color: #444; background: #111; color: #fff; }
        .op-choice-correct { border-color: #4ade80; background: #0a1f12; color: #4ade80; }
        .op-choice-wrong { border-color: #ef4444; background: #1a0808; color: #ef4444; }
        .op-choice-dim { opacity: 0.35; }
        .op-choice-letter {
          font-size: 0.7rem;
          font-weight: 700;
          font-family: monospace;
          flex-shrink: 0;
          color: #444;
          padding-top: 0.1rem;
        }
        .op-choice-text { line-height: 1.5; }
        .op-sprint-feedback {
          border-radius: 0.6rem;
          padding: 0.65rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .op-sfb-ok { background: #0a1f12; border: 1px solid #4ade8033; }
        .op-sfb-err { background: #1a0808; border: 1px solid #ef444433; }
        .op-sfb-icon { font-size: 0.78rem; font-weight: 700; }
        .op-sfb-ok .op-sfb-icon { color: #4ade80; }
        .op-sfb-err .op-sfb-icon { color: #ef4444; }
        .op-sfb-trap { font-size: 0.8rem; color: #888; line-height: 1.5; }

        /* Sprint score screen */
        .op-sprint-score {
          text-align: center;
          padding: 0.5rem 0;
        }
        .op-sprint-score-num {
          font-size: 4rem;
          font-weight: 900;
          line-height: 1;
        }
        .op-sprint-score-denom {
          font-size: 1.5rem;
          color: #444;
          font-weight: 600;
        }
        .op-sprint-focus {
          font-size: 0.85rem;
          color: #777;
          font-style: italic;
          text-align: center;
          line-height: 1.55;
        }
        .op-sprint-breakdown { display: flex; flex-direction: column; gap: 0.35rem; }
        .op-sprint-result-row {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.8rem;
        }
        .op-dot-ok { color: #4ade80; font-weight: 700; }
        .op-dot-err { color: #ef4444; font-weight: 700; }
        .op-sprint-q-label { color: #555; font-family: monospace; font-size: 0.72rem; }
        .op-sprint-gap { color: #444; font-size: 0.72rem; }

        /* ── ANALYZER ── */
        .op-analyzer-headline {
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.4;
        }
        .op-analyzer-stats {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 0;
          border-top: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
        }
        .op-stat { display: flex; flex-direction: column; gap: 0.1rem; }
        .op-stat-num { font-size: 1.6rem; font-weight: 900; line-height: 1; }
        .op-stat-label { font-size: 0.7rem; color: #555; }
        .op-stat-divider {
          width: 1px;
          height: 2rem;
          background: #1e1e1e;
          flex-shrink: 0;
        }
        .op-section-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #3a3a3a;
          margin-bottom: 0.35rem;
        }
        .op-concept-map { display: flex; flex-direction: column; gap: 0.45rem; }
        .op-cm-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .op-cm-name { font-size: 0.78rem; color: #999; min-width: 8rem; }
        .op-cm-bar-track {
          flex: 1;
          height: 4px;
          background: #1a1a1a;
          border-radius: 2px;
          overflow: hidden;
        }
        .op-cm-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease-out;
        }
        .op-cm-gap { font-size: 0.65rem; color: #3a3a3a; min-width: 5rem; text-align: right; }
        .op-hardest {
          border: 1px solid;
          border-radius: 0.5rem;
          padding: 0.7rem 0.85rem;
          background: #0a0a0a;
        }
        .op-hardest-text { font-size: 0.83rem; color: #aaa; line-height: 1.55; }
        .op-prereqs { display: flex; flex-direction: column; gap: 0.45rem; }
        .op-prereq-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.83rem;
          transition: color 0.15s;
        }
        .op-prereq-check { accent-color: #4ade80; cursor: pointer; }
      `})]})}function S({playerData:e,courseId:r,courseName:t,nextLessonId:a}){let[l,i]=(0,s.useState)("loading"),[c,d]=(0,s.useState)(!1),[p,m]=(0,s.useState)([]),[u,g]=(0,s.useState)(null),h=(0,s.useRef)(null),b=(0,s.useCallback)((e,r)=>{let t=p.filter(r=>r.position===e);t.length>0?(h.current=r,g(t)):r()},[p]);return"loading"===l?o.jsx("div",{className:"lpg-root lpg-center",children:o.jsx("div",{className:"lpg-spinner"})}):"guest"===l?(0,o.jsxs)("div",{className:"lpg-root lpg-center",children:[(0,o.jsxs)("div",{className:"lpg-locked-card",children:[o.jsx("div",{className:"lpg-lock-icon",children:"\uD83D\uDD12"}),o.jsx("h2",{className:"lpg-locked-title",children:"Preview Locked"}),(0,o.jsxs)("p",{className:"lpg-locked-body",children:["Sign in to access the full interactive lesson for"," ",o.jsx("strong",{children:e.title}),"."]}),(0,o.jsxs)("div",{className:"lpg-locked-actions",children:[o.jsx(n.default,{href:"/auth/login?redirect=/courses/ap-biology/cell-structure",className:"lpg-btn-primary",children:"Sign In to Watch"}),(0,o.jsxs)(n.default,{href:`/courses/${r}`,className:"lpg-btn-ghost",children:["← Back to ",t]})]})]}),o.jsx("style",{children:`
          .lpg-root {
            background: #0a0a0a;
            min-height: calc(100vh - 4rem);
            font-family: 'Inter', system-ui, sans-serif;
          }
          .lpg-center {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3rem 1rem;
          }
          .lpg-spinner {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            border: 2px solid #222;
            border-top-color: #00FFB2;
            animation: lpg-spin 0.75s linear infinite;
          }
          @keyframes lpg-spin { to { transform: rotate(360deg); } }
          .lpg-locked-card {
            max-width: 22rem;
            width: 100%;
            background: #111;
            border: 1px solid #1f1f1f;
            border-radius: 1.25rem;
            padding: 2.5rem 2rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
          }
          .lpg-lock-icon  { font-size: 2.5rem; margin-bottom: 1rem; }
          .lpg-locked-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #fff;
            margin-bottom: 0.6rem;
          }
          .lpg-locked-body {
            font-size: 0.85rem;
            color: #666;
            line-height: 1.6;
            margin-bottom: 1.75rem;
          }
          .lpg-locked-body strong { color: #aaa; }
          .lpg-locked-actions { display: flex; flex-direction: column; gap: 0.6rem; width: 100%; }
          .lpg-btn-primary {
            display: block;
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            background: #00FFB2;
            color: #0a0a0a;
            font-size: 0.85rem;
            font-weight: 700;
            text-align: center;
            text-decoration: none;
            transition: filter 0.15s;
          }
          .lpg-btn-primary:hover { filter: brightness(1.1); }
          .lpg-btn-ghost {
            display: block;
            padding: 0.7rem 1rem;
            border-radius: 0.75rem;
            border: 1px solid #222;
            color: #666;
            font-size: 0.82rem;
            font-weight: 500;
            text-align: center;
            text-decoration: none;
            transition: border-color 0.15s, color 0.15s;
          }
          .lpg-btn-ghost:hover { border-color: #333; color: #aaa; }
        `})]}):c?(0,o.jsxs)("div",{className:"lpg-root lpg-center",children:[(0,o.jsxs)("div",{className:"lpg-locked-card",style:{gap:0},children:[o.jsx("div",{className:"lpg-lock-icon",children:"\uD83C\uDF93"}),o.jsx("h2",{className:"lpg-locked-title",children:"You finished the lesson!"}),o.jsx("p",{className:"lpg-locked-body",children:"Your responses have been saved to your learning profile."}),(0,o.jsxs)("div",{className:"lpg-locked-actions",children:[a?o.jsx(n.default,{href:`/courses/${r}/${a}`,className:"lpg-btn-primary",children:"Next Lesson →"}):o.jsx(n.default,{href:`/courses/${r}`,className:"lpg-btn-primary",children:"Back to Course →"}),o.jsx("button",{onClick:()=>d(!1),className:"lpg-btn-ghost",style:{cursor:"pointer",background:"none",width:"100%"},children:"↺ Replay Lesson"})]})]}),o.jsx("style",{children:`
          .lpg-root {
            background: #0a0a0a;
            min-height: calc(100vh - 4rem);
            font-family: 'Inter', system-ui, sans-serif;
          }
          .lpg-center {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3rem 1rem;
          }
          .lpg-locked-card {
            max-width: 22rem;
            width: 100%;
            background: #111;
            border: 1px solid #1f1f1f;
            border-radius: 1.25rem;
            padding: 2.5rem 2rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .lpg-lock-icon  { font-size: 2.5rem; margin-bottom: 1rem; }
          .lpg-locked-title { font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 0.6rem; }
          .lpg-locked-body { font-size: 0.85rem; color: #666; line-height: 1.6; margin-bottom: 1.75rem; }
          .lpg-locked-actions { display: flex; flex-direction: column; gap: 0.6rem; width: 100%; }
          .lpg-btn-primary {
            display: block; padding: 0.75rem 1rem; border-radius: 0.75rem;
            background: #00FFB2; color: #0a0a0a; font-size: 0.85rem; font-weight: 700;
            text-align: center; text-decoration: none; transition: filter 0.15s;
          }
          .lpg-btn-primary:hover { filter: brightness(1.1); }
          .lpg-btn-ghost {
            display: block; padding: 0.7rem 1rem; border-radius: 0.75rem;
            border: 1px solid #222; color: #666; font-size: 0.82rem; font-weight: 500;
            text-align: center; text-decoration: none; transition: border-color 0.15s, color 0.15s;
          }
          .lpg-btn-ghost:hover { border-color: #333; color: #aaa; }
          @keyframes lpg-spin { to { transform: rotate(360deg); } }
          .lpg-spinner {
            width: 2rem; height: 2rem; border-radius: 50%;
            border: 2px solid #222; border-top-color: #00FFB2;
            animation: lpg-spin 0.75s linear infinite;
          }
        `})]}):(0,o.jsxs)(o.Fragment,{children:[o.jsx("div",{className:"lpg-breadcrumb",children:(0,o.jsxs)("div",{className:"lpg-breadcrumb-inner",children:[(0,o.jsxs)(n.default,{href:`/courses/${r}`,className:"lpg-back-link",children:["← ",t]}),o.jsx("span",{className:"lpg-breadcrumb-sep",children:"/"}),o.jsx("span",{className:"lpg-breadcrumb-current",children:e.title})]})}),o.jsx(f,{lesson:e,onComplete:()=>d(!0),onVideoPartEnd:p.length>0?b:void 0}),u&&o.jsx(C,{overlays:u,lessonId:e.id,onComplete:function(){g(null);let e=h.current;h.current=null,e?.()}}),o.jsx("style",{children:`
        .lpg-breadcrumb {
          background: #0d0d0d;
          border-bottom: 1px solid #1a1a1a;
          padding: 0.55rem 1rem;
        }
        .lpg-breadcrumb-inner {
          max-width: 52rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
        }
        .lpg-back-link {
          color: #555;
          text-decoration: none;
          transition: color 0.15s;
        }
        .lpg-back-link:hover { color: #00FFB2; }
        .lpg-breadcrumb-sep { color: #333; }
        .lpg-breadcrumb-current {
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 20rem;
        }
      `})]})}},88577:(e,r,t)=>{"use strict";t.d(r,{default:()=>l});var o=t(10326),s=t(17577),n=t(90434);let a=(0,t(33265).default)(async()=>{},{loadableGenerated:{modules:["components/lesson/SectionLessonGate.tsx -> @/components/lesson/SectionLessonPlayer"]},ssr:!1});function l({playlist:e,lessonId:r,title:t,courseId:l,courseName:c,nextLessonId:d}){let[p,m]=(0,s.useState)("loading"),[u,g]=(0,s.useState)(!1);return"loading"===p?(0,o.jsxs)("div",{className:"slg-center",children:[o.jsx("div",{className:"slg-spinner"}),o.jsx("style",{children:i})]}):"guest"===p?(0,o.jsxs)("div",{className:"slg-center",children:[(0,o.jsxs)("div",{className:"slg-card",children:[o.jsx("div",{className:"slg-icon",children:"\uD83D\uDD12"}),o.jsx("h2",{className:"slg-title",children:"Preview Locked"}),(0,o.jsxs)("p",{className:"slg-body",children:["Sign in to watch ",o.jsx("strong",{children:t}),"."]}),(0,o.jsxs)("div",{className:"slg-actions",children:[o.jsx(n.default,{href:"/auth/login",className:"slg-btn-primary",children:"Sign In to Watch"}),(0,o.jsxs)(n.default,{href:`/courses/${l}`,className:"slg-btn-ghost",children:["← Back to ",c]})]})]}),o.jsx("style",{children:i})]}):u?(0,o.jsxs)("div",{className:"slg-center",children:[(0,o.jsxs)("div",{className:"slg-card",children:[o.jsx("div",{className:"slg-icon",children:"\uD83C\uDF93"}),o.jsx("h2",{className:"slg-title",style:{color:"#C9A84C"},children:"Lesson Complete"}),o.jsx("p",{className:"slg-body",children:"Your responses have been saved."}),(0,o.jsxs)("div",{className:"slg-actions",children:[d?o.jsx(n.default,{href:`/courses/${l}/${d}`,className:"slg-btn-primary",children:"Next Lesson →"}):o.jsx(n.default,{href:`/courses/${l}`,className:"slg-btn-primary",children:"Back to Course →"}),o.jsx("button",{className:"slg-btn-ghost",style:{cursor:"pointer",background:"none",width:"100%"},onClick:()=>g(!1),children:"↺ Replay"})]})]}),o.jsx("style",{children:i})]}):(0,o.jsxs)(o.Fragment,{children:[o.jsx("div",{className:"slg-breadcrumb",children:(0,o.jsxs)("div",{className:"slg-breadcrumb-inner",children:[(0,o.jsxs)(n.default,{href:`/courses/${l}`,className:"slg-back",children:["← ",c]}),o.jsx("span",{className:"slg-sep",children:"/"}),o.jsx("span",{className:"slg-current",children:t})]})}),o.jsx(a,{playlist:e,lessonId:r,onComplete:()=>g(!0)}),o.jsx("style",{children:`
        .slg-breadcrumb {
          background: #0d0d0d;
          border-bottom: 1px solid #1a1a1a;
          padding: 0.55rem 1rem;
        }
        .slg-breadcrumb-inner {
          max-width: 52rem; margin: 0 auto;
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.75rem; font-family: 'Inter', system-ui, sans-serif;
        }
        .slg-back { color: #555; text-decoration: none; transition: color 0.15s; }
        .slg-back:hover { color: #00FFB2; }
        .slg-sep { color: #333; }
        .slg-current { color: #888; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 20rem; }
      `})]})}let i=`
  .slg-center {
    background: #0a0a0a;
    min-height: calc(100vh - 4rem);
    display: flex; align-items: center; justify-content: center;
    padding: 3rem 1rem;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .slg-spinner {
    width: 2rem; height: 2rem; border-radius: 50%;
    border: 2px solid #222; border-top-color: #00FFB2;
    animation: slg-spin 0.75s linear infinite;
  }
  @keyframes slg-spin { to { transform: rotate(360deg); } }
  .slg-card {
    max-width: 22rem; width: 100%;
    background: #111; border: 1px solid #1f1f1f;
    border-radius: 1.25rem; padding: 2.5rem 2rem;
    text-align: center;
    display: flex; flex-direction: column; align-items: center;
  }
  .slg-icon  { font-size: 2.5rem; margin-bottom: 1rem; }
  .slg-title { font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 0.6rem; }
  .slg-body  { font-size: 0.85rem; color: #666; line-height: 1.6; margin-bottom: 1.75rem; }
  .slg-body strong { color: #aaa; }
  .slg-actions { display: flex; flex-direction: column; gap: 0.6rem; width: 100%; }
  .slg-btn-primary {
    display: block; padding: 0.75rem 1rem; border-radius: 0.75rem;
    background: #00FFB2; color: #0a0a0a; font-size: 0.85rem; font-weight: 700;
    text-align: center; text-decoration: none; transition: filter 0.15s; border: none;
  }
  .slg-btn-primary:hover { filter: brightness(1.1); }
  .slg-btn-ghost {
    display: block; padding: 0.7rem 1rem; border-radius: 0.75rem;
    border: 1px solid #222; color: #666; font-size: 0.82rem; font-weight: 500;
    text-align: center; text-decoration: none; transition: border-color 0.15s, color 0.15s;
  }
  .slg-btn-ghost:hover { border-color: #333; color: #aaa; }
`},9411:(e,r,t)=>{"use strict";t.d(r,{default:()=>x});var o=t(10326),s=t(17577),n=t(90434),a=t(36788);let l={SPARK:{color:"#C9A84C",bg:"#0d1a10",label:"SPARK"},GAP_CRUNCH:{color:"#E85A4A",bg:"#120a0a",label:"GAP CRUNCH"},TEACH_BACK:{color:"#5DCAA5",bg:"#091410",label:"TEACH BACK"},QUESTION_SPRINT:{color:"#9F97ED",bg:"#0c0b18",label:"QUESTION SPRINT"},ANALYZER:{color:"#5DAAF0",bg:"#090f18",label:"ANALYZER"},CONFIDENCE_CHECK:{color:"#D4537E",bg:"#130a0e",label:"◈ CONFIDENCE CHECK"},NEXT_MOVE:{color:"#7F77DD",bg:"#0c0b18",label:"→ NEXT MOVE"}};function i(e){(0,a.S)("/api/overlay-responses",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).catch(()=>{})}function c({overlay:e,lessonId:r,onComplete:t}){let n=e.data,[a,c]=(0,s.useState)(""),[d,p]=(0,s.useState)(!1),m=l.SPARK;return(0,o.jsxs)("div",{className:"oc-card",style:{background:m.bg,borderColor:m.color+"33"},children:[o.jsx("div",{className:"oc-label",style:{color:m.color},children:m.label}),o.jsx("p",{className:"oc-prompt",children:n.prompt??"What do you notice?"}),d?o.jsx("p",{className:"oc-saved",style:{color:m.color},children:"Saved ✓"}):(0,o.jsxs)(o.Fragment,{children:[o.jsx("textarea",{className:"oc-textarea",placeholder:"Type your thoughts…",value:a,onChange:e=>c(e.target.value),rows:3,style:{borderColor:m.color+"44"}}),o.jsx("button",{className:"oc-btn",style:{background:m.color,color:"#0a0a0a"},onClick:function(){a.trim()&&(p(!0),i({lessonId:r,overlayId:e.id,overlayType:"SPARK",response:a.trim()}),setTimeout(t,800))},disabled:!a.trim(),children:"Submit →"})]})]})}function d({overlay:e,lessonId:r,onComplete:t}){let n=e.data,c=n.options??[n.trap??"",n.correct??""].filter(Boolean),[d,p]=(0,s.useState)(null),[m,u]=(0,s.useState)("choose"),[g,h]=(0,s.useState)(""),f=l.GAP_CRUNCH;async function b(t){p(t),u("evaluating");try{let e=await (0,a.S)("/api/overlay/evaluate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"gap_crunch",fixPrompt:n.fixPrompt??n.statement??"",studentResponse:t,gapType:n.gapType??"CONCEPT GAP"})}),r=await e.json();h(r.feedback??"")}catch{h("Keep working on distinguishing these cases.")}let o=t===n.correct;i({lessonId:r,overlayId:e.id,overlayType:"GAP_CRUNCH",response:t,correct:o,gapType:n.gapType??""}),u("result")}return(0,o.jsxs)("div",{className:"oc-card",style:{background:f.bg,borderColor:f.color+"33"},children:[o.jsx("div",{className:"oc-label",style:{color:f.color},children:f.label}),o.jsx("p",{className:"oc-prompt",children:n.statement??"Which is correct?"}),"choose"===m&&o.jsx("div",{className:"oc-options",children:c.map(e=>o.jsx("button",{className:"oc-option",style:{borderColor:f.color+"44"},onClick:()=>b(e),children:e},e))}),"evaluating"===m&&o.jsx("p",{className:"oc-evaluating",children:"Evaluating…"}),"result"===m&&(0,o.jsxs)(o.Fragment,{children:[o.jsx("div",{className:"oc-result-badge",style:{color:d===n.correct?"#00FFB2":f.color,background:d===n.correct?"rgba(0,255,178,0.08)":f.color+"18"},children:d===n.correct?"Correct ✓":"Not quite"}),g&&o.jsx("p",{className:"oc-feedback",children:g}),o.jsx("button",{className:"oc-btn",style:{background:f.color,color:"#0a0a0a"},onClick:t,children:"Continue →"})]})]})}function p({overlay:e,lessonId:r,onComplete:t}){let n=e.data,[c,d]=(0,s.useState)(""),[p,m]=(0,s.useState)("write"),[u,g]=(0,s.useState)(0),[h,f]=(0,s.useState)(""),b=l.TEACH_BACK;async function x(){if(c.trim()){m("evaluating");try{let e=await (0,a.S)("/api/overlay/evaluate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"teach_back",aiEvalPrompt:n.aiEvalPrompt??`Evaluate this explanation of: ${n.prompt??"the concept"}. Score 1-5.`,studentResponse:c.trim()})}),r=await e.json();g(r.score??3),f(r.feedback??"")}catch{g(3),f("Your explanation covers the basics. Try to be more specific.")}i({lessonId:r,overlayId:e.id,overlayType:"TEACH_BACK",response:c.trim(),score:u}),m("result")}}return(0,o.jsxs)("div",{className:"oc-card",style:{background:b.bg,borderColor:b.color+"33"},children:[o.jsx("div",{className:"oc-label",style:{color:b.color},children:b.label}),o.jsx("p",{className:"oc-prompt",children:n.prompt??"Explain this concept in your own words."}),"write"===p&&(0,o.jsxs)(o.Fragment,{children:[o.jsx("textarea",{className:"oc-textarea",placeholder:"Explain as if teaching a friend…",value:c,onChange:e=>d(e.target.value),rows:4,style:{borderColor:b.color+"44"}}),o.jsx("button",{className:"oc-btn",style:{background:b.color,color:"#0a0a0a"},onClick:x,disabled:!c.trim(),children:"Submit for Evaluation →"})]}),"evaluating"===p&&o.jsx("p",{className:"oc-evaluating",children:"Evaluating…"}),"result"===p&&(0,o.jsxs)(o.Fragment,{children:[o.jsx("div",{className:"oc-stars",children:[1,2,3,4,5].map(e=>o.jsx("span",{style:{color:e<=u?b.color:"#333",fontSize:"1.4rem"},children:"★"},e))}),h&&o.jsx("p",{className:"oc-feedback",children:h}),o.jsx("button",{className:"oc-btn",style:{background:b.color,color:"#0a0a0a"},onClick:t,children:"Continue →"})]})]})}function m({overlay:e,lessonId:r,onComplete:t}){let n=e.data.questions??[],[a,c]=(0,s.useState)(0),[d,p]=(0,s.useState)(n.map(()=>null)),[m,u]=(0,s.useState)(!1),[g,h]=(0,s.useState)(!1),f=l.QUESTION_SPRINT,b=n[a],x=null!==d[a],y=x&&d[a]===b?.correct;if(0===n.length)return(0,o.jsxs)("div",{className:"oc-card",style:{background:f.bg,borderColor:f.color+"33"},children:[o.jsx("div",{className:"oc-label",style:{color:f.color},children:f.label}),o.jsx("p",{className:"oc-prompt",children:"No questions available."}),o.jsx("button",{className:"oc-btn",style:{background:f.color,color:"#0a0a0a"},onClick:t,children:"Continue →"})]});if(g){let e=d.filter((e,r)=>e===n[r]?.correct).length;return(0,o.jsxs)("div",{className:"oc-card",style:{background:f.bg,borderColor:f.color+"33"},children:[o.jsx("div",{className:"oc-label",style:{color:f.color},children:f.label}),(0,o.jsxs)("p",{className:"oc-score-title",style:{color:f.color},children:[e,"/",n.length," correct"]}),o.jsx("p",{className:"oc-feedback",children:e===n.length?"Perfect score!":e>=n.length/2?"Good work — review any missed concepts.":"Review this section before continuing."}),o.jsx("button",{className:"oc-btn",style:{background:f.color,color:"#0a0a0a"},onClick:t,children:"Continue →"})]})}return(0,o.jsxs)("div",{className:"oc-card",style:{background:f.bg,borderColor:f.color+"33"},children:[(0,o.jsxs)("div",{className:"oc-label",style:{color:f.color},children:[f.label," \xb7 ",a+1,"/",n.length]}),o.jsx("p",{className:"oc-prompt",children:b.question}),o.jsx("div",{className:"oc-options",children:b.options.map((e,r)=>{let t=f.color+"44",s="transparent",n="#ccc";return x&&(r===b.correct?(t="#00FFB2",s="rgba(0,255,178,0.08)",n="#00FFB2"):r===d[a]&&(t=f.color,s=f.color+"18",n=f.color)),o.jsx("button",{className:"oc-option",style:{borderColor:t,background:s,color:n},onClick:()=>(function(e){if(x)return;let r=[...d];r[a]=e,p(r),u(!0)})(r),disabled:x,children:e},r)})}),m&&(0,o.jsxs)(o.Fragment,{children:[o.jsx("p",{className:"oc-result-badge",style:{color:y?"#00FFB2":f.color,background:y?"rgba(0,255,178,0.08)":f.color+"18"},children:y?"Correct ✓":"Incorrect"}),o.jsx("p",{className:"oc-feedback",children:b.explanation}),o.jsx("button",{className:"oc-btn",style:{background:f.color,color:"#0a0a0a"},onClick:function(){if(u(!1),a+1<n.length)c(a+1);else{let t=d.filter((e,r)=>e===n[r]?.correct).length;i({lessonId:r,overlayId:e.id,overlayType:"QUESTION_SPRINT",response:JSON.stringify(d),score:t}),h(!0)}},children:a+1<n.length?"Next →":"See Score →"})]})]})}function u({overlay:e,onComplete:r}){let t=e.data,s=t.concepts??[],n=t.prerequisites??[],a=l.ANALYZER;return(0,o.jsxs)("div",{className:"oc-card",style:{background:a.bg,borderColor:a.color+"33"},children:[o.jsx("div",{className:"oc-label",style:{color:a.color},children:a.label}),t.gapType&&o.jsx("div",{className:"oc-gap-badge",style:{color:a.color,background:a.color+"18"},children:t.gapType}),t.message&&o.jsx("p",{className:"oc-prompt",children:t.message}),s.length>0&&o.jsx("div",{className:"oc-concepts",children:s.map(e=>(0,o.jsxs)("div",{className:"oc-concept-row",children:[o.jsx("span",{className:"oc-concept-label",children:e.label}),o.jsx("div",{className:"oc-concept-bar-bg",children:o.jsx("div",{className:"oc-concept-bar",style:{width:`${Math.min(100,e.weight)}%`,background:a.color}})})]},e.label))}),n.length>0&&(0,o.jsxs)("div",{className:"oc-prereqs",children:[o.jsx("p",{className:"oc-prereq-title",children:"Prerequisites"}),n.map(e=>(0,o.jsxs)("div",{className:"oc-prereq-row",children:[o.jsx("span",{style:{color:e.mastered?"#00FFB2":"#555"},children:e.mastered?"✓":"○"}),o.jsx("span",{style:{color:e.mastered?"#aaa":"#555"},children:e.label})]},e.label))]}),o.jsx("button",{className:"oc-btn",style:{background:a.color,color:"#0a0a0a"},onClick:r,children:"Got it →"})]})}function g({overlay:e,lessonId:r,onComplete:t}){let n=e.data,[a,c]=(0,s.useState)(""),[d,p]=(0,s.useState)(!1),m=l.CONFIDENCE_CHECK;return(0,o.jsxs)("div",{className:"oc-card",style:{background:m.bg,borderColor:m.color+"33"},children:[o.jsx("div",{className:"oc-label",style:{color:m.color},children:m.label}),n.identityBelief&&(0,o.jsxs)("div",{className:"oc-cc-belief-wrap",children:[o.jsx("span",{className:"oc-cc-belief-tag",children:"What you think"}),o.jsx("p",{className:"oc-cc-belief",children:n.identityBelief})]}),n.evidenceFromPattern&&(0,o.jsxs)("div",{className:"oc-cc-evidence",children:[o.jsx("span",{className:"oc-cc-evidence-tag",children:"What the data says"}),o.jsx("p",{className:"oc-cc-evidence-text",children:n.evidenceFromPattern})]}),n.reframe&&o.jsx("p",{className:"oc-cc-reframe",children:n.reframe}),n.probeQuestion&&o.jsx("div",{className:"oc-cc-probe",children:o.jsx("p",{className:"oc-cc-probe-text",children:n.probeQuestion})}),d?o.jsx("p",{className:"oc-saved",style:{color:m.color},children:"Saved ✓"}):(0,o.jsxs)(o.Fragment,{children:[o.jsx("textarea",{className:"oc-textarea",placeholder:"Your honest answer… (optional)",value:a,onChange:e=>c(e.target.value),rows:2,style:{borderColor:m.color+"44"}}),n.actionBridge&&o.jsx("p",{className:"oc-cc-bridge",children:n.actionBridge}),o.jsx("button",{className:"oc-btn",style:{background:m.color,color:"#fff"},onClick:function(){i({lessonId:r,overlayId:e.id,overlayType:"CONFIDENCE_CHECK",response:a.trim()||"(acknowledged)",conceptName:n.reframe?.slice(0,80)??null}),p(!0),setTimeout(t,600)},children:"Got it →"})]})]})}function h({overlay:e,lessonId:r,onComplete:t}){let s=e.data,n=l.NEXT_MOVE;return(0,o.jsxs)("div",{className:"oc-card",style:{background:n.bg,borderColor:n.color+"33"},children:[o.jsx("div",{className:"oc-label",style:{color:n.color},children:n.label}),s.predictionHeadline&&o.jsx("p",{className:"oc-nm-headline",children:s.predictionHeadline}),s.predictedFailure&&(0,o.jsxs)("div",{className:"oc-nm-failure",children:[o.jsx("span",{className:"oc-nm-failure-tag",children:"Where it breaks:"}),o.jsx("p",{className:"oc-nm-failure-text",children:s.predictedFailure})]}),s.whyYouWillBreak&&o.jsx("div",{className:"oc-nm-why",children:o.jsx("p",{className:"oc-nm-why-text",children:s.whyYouWillBreak})}),s.preventionDrill&&(0,o.jsxs)("div",{className:"oc-nm-drill",children:[o.jsx("span",{className:"oc-nm-drill-tag",children:"Do this now:"}),o.jsx("p",{className:"oc-nm-drill-text",children:s.preventionDrill})]}),s.memoryTag&&(0,o.jsxs)("div",{className:"oc-nm-tag-wrap",children:[o.jsx("span",{className:"oc-nm-tag-label",children:"Save this:"}),o.jsx("div",{className:"oc-nm-tag",children:s.memoryTag})]}),o.jsx("button",{className:"oc-btn",style:{background:n.color,color:"#fff"},onClick:function(){i({lessonId:r,overlayId:e.id,overlayType:"NEXT_MOVE",response:s.memoryTag??null}),t()},children:"Noted →"})]})}function f({overlay:e,lessonId:r,onComplete:t}){let s;let n=(e.type??"").toUpperCase();return s="SPARK"===n?o.jsx(c,{overlay:e,lessonId:r,onComplete:t}):"GAP_CRUNCH"===n?o.jsx(d,{overlay:e,lessonId:r,onComplete:t}):"TEACH_BACK"===n?o.jsx(p,{overlay:e,lessonId:r,onComplete:t}):"QUESTION_SPRINT"===n?o.jsx(m,{overlay:e,lessonId:r,onComplete:t}):"ANALYZER"===n?o.jsx(u,{overlay:e,onComplete:t}):"CONFIDENCE_CHECK"===n?o.jsx(g,{overlay:e,lessonId:r,onComplete:t}):"NEXT_MOVE"===n?o.jsx(h,{overlay:e,lessonId:r,onComplete:t}):(0,o.jsxs)("div",{className:"oc-card",children:[(0,o.jsxs)("p",{className:"oc-prompt",children:["Unknown overlay type: ",n]}),o.jsx("button",{className:"oc-btn",onClick:t,children:"Continue →"})]}),(0,o.jsxs)(o.Fragment,{children:[s,o.jsx("style",{children:`
        .oc-card {
          width: 100%;
          max-width: 32rem;
          background: #111;
          border: 1px solid #1f1f1f;
          border-radius: 1.25rem;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .oc-label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .oc-prompt {
          font-size: 0.95rem;
          font-weight: 600;
          color: #e5e5e5;
          line-height: 1.5;
          margin: 0;
        }
        .oc-textarea {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid #222;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #e5e5e5;
          font-size: 0.85rem;
          font-family: inherit;
          resize: vertical;
          outline: none;
          line-height: 1.5;
          box-sizing: border-box;
        }
        .oc-textarea:focus { border-color: #444; }
        .oc-btn {
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 0.75rem;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: filter 0.15s, opacity 0.15s;
          text-align: center;
          font-family: inherit;
        }
        .oc-btn:hover:not(:disabled) { filter: brightness(1.1); }
        .oc-btn:disabled { opacity: 0.4; cursor: default; }
        .oc-options { display: flex; flex-direction: column; gap: 0.5rem; }
        .oc-option {
          padding: 0.65rem 1rem;
          background: transparent;
          border: 1px solid #222;
          border-radius: 0.65rem;
          color: #ccc;
          font-size: 0.82rem;
          font-family: inherit;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .oc-option:hover:not(:disabled) { background: rgba(255,255,255,0.04); }
        .oc-option:disabled { cursor: default; }
        .oc-evaluating {
          font-size: 0.8rem;
          color: #555;
          font-style: italic;
          margin: 0;
          animation: oc-pulse 1s ease-in-out infinite;
        }
        @keyframes oc-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        .oc-result-badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
          margin: 0;
        }
        .oc-feedback {
          font-size: 0.82rem;
          color: #888;
          line-height: 1.6;
          margin: 0;
        }
        .oc-saved {
          font-size: 0.8rem;
          font-weight: 700;
          margin: 0;
        }
        .oc-stars { display: flex; gap: 0.25rem; }
        .oc-score-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0;
          text-align: center;
        }
        .oc-gap-badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          align-self: flex-start;
        }
        .oc-concepts { display: flex; flex-direction: column; gap: 0.5rem; }
        .oc-concept-row { display: flex; align-items: center; gap: 0.65rem; }
        .oc-concept-label { font-size: 0.75rem; color: #888; min-width: 7rem; }
        .oc-concept-bar-bg {
          flex: 1;
          height: 4px;
          background: #1a1a1a;
          border-radius: 2px;
          overflow: hidden;
        }
        .oc-concept-bar {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease;
        }
        .oc-prereqs { display: flex; flex-direction: column; gap: 0.35rem; }
        .oc-prereq-title {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #444;
          margin: 0 0 0.2rem;
        }
        .oc-prereq-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; }

        /* ── Confidence Check ── */
        .oc-cc-belief-wrap { display: flex; flex-direction: column; gap: 0.2rem; }
        .oc-cc-belief-tag {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #444;
        }
        .oc-cc-belief {
          font-size: 0.88rem; color: #555;
          text-decoration: line-through;
          margin: 0; line-height: 1.5;
        }
        .oc-cc-evidence {
          border-left: 2px solid #5DCAA5;
          padding-left: 0.75rem;
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .oc-cc-evidence-tag {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #5DCAA5;
        }
        .oc-cc-evidence-text { font-size: 0.82rem; color: #888; margin: 0; line-height: 1.5; }
        .oc-cc-reframe {
          font-size: 1rem; font-weight: 700; color: #fff;
          margin: 0; line-height: 1.4;
        }
        .oc-cc-probe {
          background: rgba(212,83,126,0.1);
          border-radius: 0.6rem;
          padding: 0.7rem 0.9rem;
        }
        .oc-cc-probe-text { font-size: 0.83rem; color: #D4537E; font-style: italic; margin: 0; line-height: 1.5; }
        .oc-cc-bridge { font-size: 0.75rem; color: #555; margin: 0; line-height: 1.5; }

        /* ── Next Move ── */
        .oc-nm-headline { font-size: 1rem; font-weight: 700; color: #fff; margin: 0; line-height: 1.4; }
        .oc-nm-failure {
          background: rgba(194,130,40,0.12);
          border-radius: 0.6rem;
          padding: 0.7rem 0.9rem;
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .oc-nm-failure-tag {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #C9A84C;
        }
        .oc-nm-failure-text { font-size: 0.82rem; color: #b8922a; margin: 0; line-height: 1.5; }
        .oc-nm-why {
          border-left: 2px solid #E85A4A;
          padding-left: 0.75rem;
        }
        .oc-nm-why-text { font-size: 0.8rem; color: #888; margin: 0; line-height: 1.5; }
        .oc-nm-drill {
          background: rgba(93,202,165,0.08);
          border-radius: 0.6rem;
          padding: 0.7rem 0.9rem;
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .oc-nm-drill-tag {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #5DCAA5;
        }
        .oc-nm-drill-text { font-size: 0.82rem; color: #5DCAA5; margin: 0; line-height: 1.5; }
        .oc-nm-tag-wrap {
          display: flex; flex-direction: column; align-items: center; gap: 0.35rem;
        }
        .oc-nm-tag-label {
          font-size: 0.6rem; color: #555;
          text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;
        }
        .oc-nm-tag {
          background: rgba(127,119,221,0.15);
          color: #9F97ED;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 10px 24px;
          border-radius: 20px;
          text-align: center;
        }
      `})]})}function b({lessonId:e,videoUrl:r,overlays:t,onComplete:n}){let a=(0,s.useRef)(null),l=(0,s.useRef)(new Set),[i,c]=(0,s.useState)(null),[d,p]=(0,s.useState)(!1),m=[...t].sort((e,r)=>e.triggerAt-r.triggerAt);return(0,s.useCallback)(()=>{let e=a.current;if(!e||i)return;let r=e.currentTime;for(let t of m)if(!l.current.has(t.id)&&r>=t.triggerAt){e.pause(),l.current.add(t.id),c(t),requestAnimationFrame(()=>{requestAnimationFrame(()=>p(!0))});return}},[m,i]),(0,o.jsxs)("div",{className:"vlp-root",children:[o.jsx("div",{className:"vlp-video-wrap",children:o.jsx("video",{ref:a,className:"vlp-video",src:r,controls:!0,playsInline:!0,onEnded:function(){n?.()}})}),i&&o.jsx("div",{className:`vlp-overlay-layer ${d?"vlp-overlay-visible":""}`,children:o.jsx("div",{className:"vlp-overlay-inner",children:o.jsx(f,{overlay:i,lessonId:e,onComplete:function(){p(!1),setTimeout(()=>{c(null),a.current?.play().catch(()=>{})},200)}})})}),o.jsx("style",{children:`
        .vlp-root {
          position: relative;
          width: 100%;
          background: #000;
        }
        .vlp-video-wrap {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vlp-video {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
        }
        .vlp-overlay-layer {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.82);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          opacity: 0;
          transform: translateY(1.5rem);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .vlp-overlay-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .vlp-overlay-inner {
          width: 100%;
          max-width: 34rem;
        }
      `})]})}function x({lessonId:e,videoUrl:r,script:t,title:a,courseId:l,courseName:i,nextLessonId:c}){let[d,p]=(0,s.useState)("loading"),[m,u]=(0,s.useState)(!1),[g,h]=(0,s.useState)([]);return"loading"===d?(0,o.jsxs)("div",{className:"vlg-center",children:[o.jsx("div",{className:"vlg-spinner"}),o.jsx("style",{children:y})]}):"guest"===d?(0,o.jsxs)("div",{className:"vlg-center",children:[(0,o.jsxs)("div",{className:"vlg-locked-card",children:[o.jsx("div",{className:"vlg-lock-icon",children:"\uD83D\uDD12"}),o.jsx("h2",{className:"vlg-locked-title",children:"Preview Locked"}),(0,o.jsxs)("p",{className:"vlg-locked-body",children:["Sign in to watch ",o.jsx("strong",{children:a}),"."]}),(0,o.jsxs)("div",{className:"vlg-locked-actions",children:[o.jsx(n.default,{href:"/auth/login",className:"vlg-btn-primary",children:"Sign In to Watch"}),(0,o.jsxs)(n.default,{href:`/courses/${l}`,className:"vlg-btn-ghost",children:["← Back to ",i]})]})]}),o.jsx("style",{children:v})]}):m?(0,o.jsxs)("div",{className:"vlg-center",children:[(0,o.jsxs)("div",{className:"vlg-locked-card",children:[o.jsx("div",{className:"vlg-lock-icon",children:"\uD83C\uDF93"}),o.jsx("h2",{className:"vlg-locked-title",children:"Lesson complete!"}),o.jsx("p",{className:"vlg-locked-body",children:"Your responses have been saved."}),(0,o.jsxs)("div",{className:"vlg-locked-actions",children:[c?o.jsx(n.default,{href:`/courses/${l}/${c}`,className:"vlg-btn-primary",children:"Next Lesson →"}):o.jsx(n.default,{href:`/courses/${l}`,className:"vlg-btn-primary",children:"Back to Course →"}),o.jsx("button",{onClick:()=>u(!1),className:"vlg-btn-ghost",style:{cursor:"pointer",background:"none",width:"100%"},children:"↺ Replay"})]})]}),o.jsx("style",{children:v})]}):(0,o.jsxs)(o.Fragment,{children:[o.jsx("div",{className:"vlg-breadcrumb",children:(0,o.jsxs)("div",{className:"vlg-breadcrumb-inner",children:[(0,o.jsxs)(n.default,{href:`/courses/${l}`,className:"vlg-back-link",children:["← ",i]}),o.jsx("span",{className:"vlg-sep",children:"/"}),o.jsx("span",{className:"vlg-current",children:a})]})}),o.jsx(b,{lessonId:e,videoUrl:r,overlays:g,onComplete:()=>u(!0)}),o.jsx("style",{children:`
        .vlg-breadcrumb {
          background: #0d0d0d;
          border-bottom: 1px solid #1a1a1a;
          padding: 0.55rem 1rem;
        }
        .vlg-breadcrumb-inner {
          max-width: 52rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
        }
        .vlg-back-link { color: #555; text-decoration: none; transition: color 0.15s; }
        .vlg-back-link:hover { color: #00FFB2; }
        .vlg-sep { color: #333; }
        .vlg-current {
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 20rem;
        }
      `})]})}let y=`
  .vlg-center {
    background: #0a0a0a;
    min-height: calc(100vh - 4rem);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .vlg-spinner {
    width: 2rem; height: 2rem;
    border-radius: 50%;
    border: 2px solid #222;
    border-top-color: #00FFB2;
    animation: vlg-spin 0.75s linear infinite;
  }
  @keyframes vlg-spin { to { transform: rotate(360deg); } }
`,v=`
  .vlg-center {
    background: #0a0a0a;
    min-height: calc(100vh - 4rem);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .vlg-locked-card {
    max-width: 22rem; width: 100%;
    background: #111;
    border: 1px solid #1f1f1f;
    border-radius: 1.25rem;
    padding: 2.5rem 2rem;
    text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 0;
  }
  .vlg-lock-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .vlg-locked-title { font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 0.6rem; }
  .vlg-locked-body { font-size: 0.85rem; color: #666; line-height: 1.6; margin-bottom: 1.75rem; }
  .vlg-locked-body strong { color: #aaa; }
  .vlg-locked-actions { display: flex; flex-direction: column; gap: 0.6rem; width: 100%; }
  .vlg-btn-primary {
    display: block; padding: 0.75rem 1rem; border-radius: 0.75rem;
    background: #00FFB2; color: #0a0a0a; font-size: 0.85rem; font-weight: 700;
    text-align: center; text-decoration: none; transition: filter 0.15s;
  }
  .vlg-btn-primary:hover { filter: brightness(1.1); }
  .vlg-btn-ghost {
    display: block; padding: 0.7rem 1rem; border-radius: 0.75rem;
    border: 1px solid #222; color: #666; font-size: 0.82rem; font-weight: 500;
    text-align: center; text-decoration: none; transition: border-color 0.15s, color 0.15s;
  }
  .vlg-btn-ghost:hover { border-color: #333; color: #aaa; }
`},33265:(e,r,t)=>{"use strict";t.d(r,{default:()=>s.a});var o=t(43353),s=t.n(o)},43353:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return n}});let o=t(91174);t(10326),t(17577);let s=o._(t(77028));function n(e,r){var t;let o={loading:e=>{let{error:r,isLoading:t,pastDelay:o}=e;return null}};"function"==typeof e&&(o.loader=e);let n={...o,...r};return(0,s.default)({...n,modules:null==(t=n.loadableGenerated)?void 0:t.modules})}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},933:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"BailoutToCSR",{enumerable:!0,get:function(){return s}});let o=t(94129);function s(e){let{reason:r,children:t}=e;throw new o.BailoutToCSRError(r)}},77028:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return c}});let o=t(10326),s=t(17577),n=t(933),a=t(46618);function l(e){return{default:e&&"default"in e?e.default:e}}let i={loader:()=>Promise.resolve(l(()=>null)),loading:null,ssr:!0},c=function(e){let r={...i,...e},t=(0,s.lazy)(()=>r.loader().then(l)),c=r.loading;function d(e){let l=c?(0,o.jsx)(c,{isLoading:!0,pastDelay:!0,error:null}):null,i=r.ssr?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a.PreloadCss,{moduleIds:r.modules}),(0,o.jsx)(t,{...e})]}):(0,o.jsx)(n.BailoutToCSR,{reason:"next/dynamic",children:(0,o.jsx)(t,{...e})});return(0,o.jsx)(s.Suspense,{fallback:l,children:i})}return d.displayName="LoadableComponent",d}},46618:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"PreloadCss",{enumerable:!0,get:function(){return n}});let o=t(10326),s=t(54580);function n(e){let{moduleIds:r}=e,t=(0,s.getExpectedRequestStore)("next/dynamic css"),n=[];if(t.reactLoadableManifest&&r){let e=t.reactLoadableManifest;for(let t of r){if(!e[t])continue;let r=e[t].files.filter(e=>e.endsWith(".css"));n.push(...r)}}return 0===n.length?null:(0,o.jsx)(o.Fragment,{children:n.map(e=>(0,o.jsx)("link",{precedence:"dynamic",rel:"stylesheet",href:t.assetPrefix+"/_next/"+encodeURI(e),as:"style"},e))})}},38785:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>w,dynamicParams:()=>v,generateMetadata:()=>N,generateStaticParams:()=>k});var o=t(19510),s=t(54740),n=t(34939),a=t(81181),l=t(85662),i=t(86345),c=t(90558),d=t(16367);function p(e){return(0,d.xP)(e)}var m=t(57371);function u({badge:e,title:r,description:t,backHref:s="/courses",backLabel:n="Back to courses"}){return o.jsx("div",{className:"min-h-[60vh] flex items-center justify-center px-4 py-16",children:(0,o.jsxs)("div",{className:"max-w-2xl w-full rounded-[2rem] border border-slate-200 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.08)] p-8 sm:p-10 text-center",children:[o.jsx("span",{className:"inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[11px] font-bold tracking-[0.24em] text-amber-700",children:e}),o.jsx("div",{className:"mt-6 text-5xl",children:"\uD83D\uDEA7"}),o.jsx("h1",{className:"mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950",children:r}),o.jsx("p",{className:"mt-4 text-base leading-7 text-slate-600",children:t}),(0,o.jsxs)("div",{className:"mt-8 flex flex-col sm:flex-row gap-3 justify-center",children:[o.jsx(m.default,{href:s,className:"inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5",children:n}),o.jsx(m.default,{href:"/waitlist?source=course_preview",className:"inline-flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50",children:"Join Course Waitlist"})]})]})})}var g=t(68570);let h=(0,g.createProxy)(String.raw`/Users/kathleenk/Desktop/Education/novaiq/components/lesson/LessonPlayerGate.tsx#default`),f=(0,g.createProxy)(String.raw`/Users/kathleenk/Desktop/Education/novaiq/components/lesson/VideoLessonGate.tsx#default`),b=(0,g.createProxy)(String.raw`/Users/kathleenk/Desktop/Education/novaiq/components/lesson/SectionLessonGate.tsx#default`),x={badge:"FIRST COHORT PREVIEW",title:"This chapter is coming soon",description:"We are preparing the full guided lesson, pattern tracking, and AI support for early users. Join the first cohort to unlock the complete experience."};var y=t(58585);let v=!0;async function j(e,r){let t=s.K[e];if(t)return t.courseId!==r?null:{titleEn:t.titleEn,courseId:t.courseId,nextLessonId:t.nextLessonId};try{let t=(0,l.i)(),{data:o}=await t.from("lessons").select("id, course_id, title").eq("id",e).maybeSingle();if(!o||o.course_id!==r)return null;return{titleEn:o.title,courseId:o.course_id,nextLessonId:null}}catch{return null}}async function N({params:e}){let r=s.K[e.lesson];return r?{title:`${r.titleEn} | NovaIQ`,description:`${r.titleEn} — AP Biology lesson with AI-guided support`}:{title:"Lesson | NovaIQ"}}async function k(){return Object.values(s.K).map(e=>({subject:e.courseId,lesson:e.id}))}async function w({params:e}){let r=(0,a.Y)(e.lesson),t=await j(r,e.subject);t||(0,y.notFound)();let s=n.r.find(r=>r.id===e.subject);s||(0,y.notFound)();try{let e=await (0,i.qb)(r);if(e.some(e=>e.clip_url)){let n=(0,l.i)(),{data:a}=await n.from("lesson_scripts").select("script").eq("lesson_id",r).maybeSingle(),i=await (0,c.$c)(r),m=function(e){if(!e)return[];let r=e.split("\n"),t=[],o=null;for(let e of r){let r=e.match(/^##\s+(.+?)(?:\s+\(([^)]+)\))?\s*$/);r?(o&&t.push({...o,content:o.content.trimEnd()}),o={title:r[1].trim(),timestamp:r[2]??"",content:""}):o&&(o.content+=e+"\n")}return o&&t.push({...o,content:o.content.trimEnd()}),t}(a?.script??""),u=function(e,r,t=[]){let o=[],s=new Set,n=new Map(t.map((e,r)=>[p(e.title),r])),a=r.map((e,r)=>({overlay:e,originalIndex:r,sectionOrder:function(e,r,t){let o=p(e);if(!o)return null;let s=r.get(o);if(null!=s)return s;for(let e=0;e<t.length;e++){let r=p(t[e].title);if(r&&(r.includes(o)||o.includes(r)))return e}return null}(e.script_section_ref,n,t)})).sort((e,r)=>null==e.sectionOrder&&null==r.sectionOrder?e.overlay.position-r.overlay.position||e.originalIndex-r.originalIndex:null==e.sectionOrder?1:null==r.sectionOrder?-1:e.sectionOrder-r.sectionOrder||e.overlay.position-r.overlay.position);for(let r=0;r<e.length;r++){let t=e[r];t.clip_url&&o.push({kind:"clip",sectionTitle:(0,d.Qj)(t.section_title),clipUrl:t.clip_url,index:o.length});let n=t.section_index,l=e[r+1]?.section_index??Number.POSITIVE_INFINITY;for(let e of a)!s.has(e.overlay.id)&&null!=e.sectionOrder&&e.sectionOrder>n&&e.sectionOrder<=l&&(s.add(e.overlay.id),o.push({kind:"overlay",overlay:e.overlay,index:o.length}))}let l=r.filter(e=>!s.has(e.id)).sort((e,r)=>e.position-r.position);if(l.length>0&&e.length>0){let e=o.map((e,r)=>"clip"===e.kind?r:-1).filter(e=>-1!==e),r=e.length+1,t=0;l.forEach((s,n)=>{let a=Math.min(r-1,Math.floor(n/l.length*r)),i=0===a?0+t:(e[a-1]??o.length-1)+1+t;o.splice(i,0,{kind:"overlay",overlay:s,index:i}),t+=1})}else for(let e of l)o.push({kind:"overlay",overlay:e,index:o.length});return o.map((e,r)=>({...e,index:r}))}(e,i,m);return o.jsx(b,{playlist:u,lessonId:r,title:t.titleEn,courseId:s.id,courseName:s.subjectEn,nextLessonId:t.nextLessonId??void 0})}}catch{}try{let e=(0,l.i)(),{data:n}=await e.from("lesson_scripts").select("video_url, script").eq("lesson_id",r).maybeSingle();if(n?.video_url)return o.jsx(f,{lessonId:r,videoUrl:n.video_url,script:n.script??"",title:t.titleEn,courseId:s.id,courseName:s.subjectEn,nextLessonId:t.nextLessonId??void 0});if(n?.script)return o.jsx("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_45%),linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)]",children:o.jsx(u,{badge:x.badge,title:t.titleEn,description:"This lesson's video is being recorded. Check back soon!",backHref:`/courses/${s.id}`,backLabel:`Back to ${s.subjectEn}`})})}catch{}let m=(0,a.b)(e.lesson);return m?o.jsx(h,{playerData:m,courseId:s.id,courseName:s.subjectEn,nextLessonId:t.nextLessonId??void 0}):o.jsx("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_45%),linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)]",children:o.jsx(u,{badge:x.badge,title:x.title,description:x.description,backHref:`/courses/${s.id}`,backLabel:`Back to ${s.subjectEn}`})})}},54740:(e,r,t)=>{"use strict";t.d(r,{K:()=>o,e:()=>s});let o={};function s(e){return Object.values(o).filter(r=>r.courseId===e).sort((e,r)=>e.order-r.order)}},16367:(e,r,t)=>{"use strict";t.d(r,{E8:()=>i,O0:()=>a,Qj:()=>s,wI:()=>n,xP:()=>l});let o=/__PART_(\d+)$/i;function s(e){return e.replace(o,"").trim()}function n(e){let r=e.match(o);return r?Number(r[1]):1}function a(e,r){let t=s(e);return r<=1?t:`${t}__PART_${r}`}function l(e){return s(e??"").trim().toUpperCase()}function i(e,r){let t=l(r),o=e.filter(e=>l(e)===t).map(n);return 0===o.length?1:Math.max(...o)+1}},86345:(e,r,t)=>{"use strict";t.d(r,{Wy:()=>d,qb:()=>c,sS:()=>p});var o=t(85662),s=t(16367);let n="lesson-clips",a=`/storage/v1/object/public/${n}/`;function l(e){return[...e].sort((e,r)=>e.section_index-r.section_index||(0,s.wI)(e.section_title)-(0,s.wI)(r.section_title)||e.created_at.localeCompare(r.created_at))}async function i(e,r,t){let n=(0,o.i)(),{data:a,error:i}=await n.from("lesson_clips").select("id, section_title, section_index, created_at").eq("lesson_id",e).eq("section_index",r);if(i)throw Error(i.message);let c=(0,s.xP)(t),d=l((a??[]).filter(e=>(0,s.xP)(e.section_title)===c));for(let e=0;e<d.length;e+=1){let r=d[e],o=(0,s.O0)(t,e+1);if(r.section_title===o)continue;let{error:a}=await n.from("lesson_clips").update({section_title:o}).eq("id",r.id);if(a)throw Error(a.message)}}async function c(e){let r=(0,o.i)(),{data:t,error:s}=await r.from("lesson_clips").select("*").eq("lesson_id",e).order("section_index",{ascending:!0}).order("created_at",{ascending:!0});return s?(console.error("[lessonClips] getLessonClips error:",s.message),[]):l(t??[])}async function d(e,r,t,n){let a=(0,o.i)(),{data:l,error:i}=await a.from("lesson_clips").select("section_title").eq("lesson_id",e).eq("section_index",t);if(i)throw Error(i.message);let c=(0,s.E8)((l??[]).map(e=>e.section_title),r),d=(0,s.O0)(r,c),{data:p,error:m}=await a.from("lesson_clips").insert({lesson_id:e,section_title:d,section_index:t,clip_url:n}).select().single();if(m)throw Error(m.message);return p}async function p(e){let r=(0,o.i)(),{data:t,error:s}=await r.from("lesson_clips").select("id, lesson_id, section_title, section_index, clip_url, created_at").eq("id",e).single();if(s||!t)throw Error(s?.message??"Clip not found");let{error:l}=await r.from("lesson_clips").delete().eq("id",e);if(l)throw Error(l.message);await i(t.lesson_id,t.section_index,t.section_title);let d=function(e){if(!e)return null;try{let r=new URL(e).pathname,t=r.indexOf(a);if(-1===t)return null;return decodeURIComponent(r.slice(t+a.length))}catch{return null}}(t.clip_url);if(d){let{error:e}=await r.storage.from(n).remove([d]);e&&console.warn("[lessonClips] storage remove warning:",e.message)}return c(t.lesson_id)}},81181:(e,r,t)=>{"use strict";t.d(r,{b:()=>a,Y:()=>n});let o={"cell-structure":{id:"cell-structure",title:"Cell Structure and Function",parts:[{id:"part-1",type:"video",youtubeId:"dQw4w9WgXcQ",duration:"2:30"},{id:"spark-1",type:"SPARK",prompt:"If every compartment in a cell shares the same environment, what's the point of having separate organelles?"},{id:"part-2",type:"video",youtubeId:"dQw4w9WgXcQ",duration:"2:45"},{id:"gap-crunch-1",type:"GAP_CRUNCH",statement:"Prokaryotes have NO nucleus — but they still have DNA.",trap:"No nucleus = no DNA",correct:"No nucleus = no membrane-bound organelles",options:["No nucleus = no DNA","No nucleus = no membrane-bound organelles"]},{id:"part-3",type:"video",youtubeId:"dQw4w9WgXcQ",duration:"3:00"},{id:"question-1",type:"QUESTION_SPRINT",question:"Which of the following structures is found in BOTH prokaryotic and eukaryotic cells?",options:["Nucleus","Mitochondria","Ribosome","Golgi apparatus"],correct:2,explanation:"Ribosomes are present in all living cells — every cell needs ribosomes to synthesize proteins. The nucleus, mitochondria, and Golgi apparatus are all membrane-bound organelles exclusive to eukaryotes.",wrongPattern:"Don't confuse membrane-bound organelles (nucleus, mitochondria, Golgi) with ribosomes. Ribosomes are NOT membrane-bound and are universal to all cells."},{id:"analyzer-1",type:"ANALYZER",gapType:"CONCEPT GAP",message:"You recalled the vocabulary but may have missed the key boundary: 'no nucleus' means no membrane-bound organelles — not the absence of genetic material. Watch for this distinction on AP FRQs."}]}},s={"cell-structure":"ap-biology-u1-l1"};function n(e){return s[e]??e}function a(e){return o[e]??null}},90558:(e,r,t)=>{"use strict";t.d(r,{$c:()=>s,C2:()=>n,Np:()=>a,iP:()=>l});var o=t(85662);async function s(e){let r=(0,o.i)(),{data:t,error:s}=await r.from("overlays").select("*").eq("lesson_id",e).order("position",{ascending:!0});if(s)throw console.error("[overlays] getOverlays error:",JSON.stringify(s)),Error(s.message);return t??[]}async function n(e,r,t,s=""){let n=(0,o.i)(),{data:a}=await n.from("overlays").select("position").eq("lesson_id",e).order("position",{ascending:!1}).limit(1).maybeSingle(),l=(a?.position??-1)+1,{data:i,error:c}=await n.from("overlays").insert({lesson_id:e,type:r,data:t,script_section_ref:s,position:l}).select().single();if(c)throw Error(c.message);return i}async function a(e){let r=(0,o.i)(),{error:t}=await r.from("overlays").delete().eq("id",e);if(t)throw Error(t.message)}async function l(e,r){let t=(0,o.i)();await Promise.all(r.map((r,o)=>t.from("overlays").update({position:o,updated_at:new Date().toISOString()}).eq("id",r).eq("lesson_id",e)))}},85662:(e,r,t)=>{"use strict";t.d(r,{i:()=>s});var o=t(88336);function s(){return globalThis.__inheroAdminSupabase||(globalThis.__inheroAdminSupabase=(0,o.eI)("https://pxxdduhtnulwmseygojv.supabase.co",process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{autoRefreshToken:!1,persistSession:!1}})),globalThis.__inheroAdminSupabase}},57371:(e,r,t)=>{"use strict";t.d(r,{default:()=>s.a});var o=t(670),s=t.n(o)},58585:(e,r,t)=>{"use strict";var o=t(61085);t.o(o,"notFound")&&t.d(r,{notFound:function(){return o.notFound}})},61085:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{ReadonlyURLSearchParams:function(){return a},RedirectType:function(){return o.RedirectType},notFound:function(){return s.notFound},permanentRedirect:function(){return o.permanentRedirect},redirect:function(){return o.redirect}});let o=t(83953),s=t(16399);class n extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class a extends URLSearchParams{append(){throw new n}delete(){throw new n}set(){throw new n}sort(){throw new n}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},16399:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{isNotFoundError:function(){return s},notFound:function(){return o}});let t="NEXT_NOT_FOUND";function o(){let e=Error(t);throw e.digest=t,e}function s(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===t}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},8586:(e,r)=>{"use strict";var t;Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RedirectStatusCode",{enumerable:!0,get:function(){return t}}),function(e){e[e.SeeOther=303]="SeeOther",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect"}(t||(t={})),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},83953:(e,r,t)=>{"use strict";var o;Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{RedirectType:function(){return o},getRedirectError:function(){return i},getRedirectStatusCodeFromError:function(){return g},getRedirectTypeFromError:function(){return u},getURLFromRedirectError:function(){return m},isRedirectError:function(){return p},permanentRedirect:function(){return d},redirect:function(){return c}});let s=t(54580),n=t(72934),a=t(8586),l="NEXT_REDIRECT";function i(e,r,t){void 0===t&&(t=a.RedirectStatusCode.TemporaryRedirect);let o=Error(l);o.digest=l+";"+r+";"+e+";"+t+";";let n=s.requestAsyncStorage.getStore();return n&&(o.mutableCookies=n.mutableCookies),o}function c(e,r){void 0===r&&(r="replace");let t=n.actionAsyncStorage.getStore();throw i(e,r,(null==t?void 0:t.isAction)?a.RedirectStatusCode.SeeOther:a.RedirectStatusCode.TemporaryRedirect)}function d(e,r){void 0===r&&(r="replace");let t=n.actionAsyncStorage.getStore();throw i(e,r,(null==t?void 0:t.isAction)?a.RedirectStatusCode.SeeOther:a.RedirectStatusCode.PermanentRedirect)}function p(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let[r,t,o,s]=e.digest.split(";",4),n=Number(s);return r===l&&("replace"===t||"push"===t)&&"string"==typeof o&&!isNaN(n)&&n in a.RedirectStatusCode}function m(e){return p(e)?e.digest.split(";",3)[2]:null}function u(e){if(!p(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function g(e){if(!p(e))throw Error("Not a redirect error");return Number(e.digest.split(";",4)[3])}(function(e){e.push="push",e.replace="replace"})(o||(o={})),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},670:(e,r,t)=>{"use strict";let{createProxy:o}=t(68570);e.exports=o("/Users/kathleenk/Desktop/Education/novaiq/node_modules/next/dist/client/link.js")}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[8948,781,6297,1701,4939],()=>t(54967));module.exports=o})();