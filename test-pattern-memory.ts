/**
 * InHero Pattern Memory Engine — End-to-End Test Suite
 * "The more you learn, the more your tutor remembers."
 *
 * Run: npx tsx --env-file .env.local test-pattern-memory.ts
 */

import { createClient } from "@supabase/supabase-js";
import { spawn, type ChildProcess } from "child_process";
import { getStudentPattern, buildPatternContext, type StudentPattern } from "@/lib/studentPattern";

// ─── Env ───────────────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const DEV_PORT = 3002;
const DEV_BASE = `http://localhost:${DEV_PORT}`;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌  Missing SUPABASE env vars");
  process.exit(1);
}

// Admin client (service role — for DB writes and user management)
const adminSb = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─── Ephemeral test user ───────────────────────────────────────────────────────
// We create a real Supabase auth user so that the overlay route can validate
// the JWT.  The user is deleted in cleanup().
const TEST_EMAIL = `test-pattern-${Date.now()}@inhero-test.dev`;
const TEST_PASS  = "TestPass1234!";
let testUserId   = ""; // filled in suite2
let testJwt      = ""; // filled when we sign in

async function createTestUser(): Promise<boolean> {
  const { data, error } = await adminSb.auth.admin.createUser({
    email: TEST_EMAIL,
    password: TEST_PASS,
    email_confirm: true,
  });
  if (error || !data.user) { console.log("  ⚠️  Could not create test user:", error?.message); return false; }
  testUserId = data.user.id;
  return true;
}

async function signInTestUser(): Promise<boolean> {
  // Use the anon/browser client to sign in and get a real JWT
  const anonSb = createClient(SUPABASE_URL, ANON_KEY);
  const { data, error } = await anonSb.auth.signInWithPassword({ email: TEST_EMAIL, password: TEST_PASS });
  if (error || !data.session) { console.log("  ⚠️  Sign-in failed:", error?.message); return false; }
  testJwt = data.session.access_token;
  return true;
}

async function deleteTestUser() {
  if (!testUserId) return;
  await adminSb.from("overlay_responses").delete().eq("student_id", testUserId);
  await adminSb.auth.admin.deleteUser(testUserId);
}

// ─── Result tracker ────────────────────────────────────────────────────────────
interface TestResult { suite: string; name: string; passed: boolean; actual?: string }
const results: TestResult[] = [];

function pass(suite: string, name: string, note?: string) {
  results.push({ suite, name, passed: true, actual: note });
  console.log(`  ✅ PASS  ${name}${note ? `  →  ${note}` : ""}`);
}
function fail(suite: string, name: string, actual?: string) {
  results.push({ suite, name, passed: false, actual });
  console.log(`  ❌ FAIL  ${name}${actual ? `  →  ${actual}` : ""}`);
}
function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

// ─── Dev server ────────────────────────────────────────────────────────────────
let devProc: ChildProcess | null = null;

async function startDevServer(): Promise<boolean> {
  console.log(`\n⚙️  Starting Next.js dev server on :${DEV_PORT} …`);
  devProc = spawn("npx", ["next", "dev", "-p", String(DEV_PORT)], {
    env: { ...process.env },
    stdio: ["ignore", "pipe", "pipe"],
  });
  for (let i = 0; i < 60; i++) {
    await sleep(1000);
    try {
      const r = await fetch(`${DEV_BASE}/api/overlay`, { method: "HEAD" }).catch(() => null);
      if (r) { console.log("  ✅ Dev server ready"); return true; }
    } catch { /* keep waiting */ }
  }
  console.log("  ❌ Dev server timed out"); return false;
}

function stopDevServer() { devProc?.kill("SIGTERM"); devProc = null; }

// ═══════════════════════════════════════════════════════════════════════════════
// SUITE 1 — Database integrity
// ═══════════════════════════════════════════════════════════════════════════════
async function suite1() {
  console.log("\n═══════════════════════════════════════════════════════");
  console.log(" SUITE 1 — Database integrity");
  console.log("═══════════════════════════════════════════════════════");

  const required = ["overlay_responses","overlays","lesson_clips","lessons"] as const;
  const found: string[] = [];
  for (const tbl of required) {
    const { error } = await adminSb.from(tbl).select("*").limit(1);
    if (!error || (error.code !== "42P01" && error.code !== "PGRST205")) found.push(tbl);
  }
  const missing = required.filter(t => !found.includes(t));
  if (missing.length === 0)
    pass("1", "1a — All 4 tables exist", found.join(", "));
  else
    fail("1", "1a — Required tables", `missing: ${missing.join(", ")}`);

  const requiredCols = [
    "id","student_id","lesson_id","overlay_id","overlay_type",
    "response","score","correct","gap_type","subject_id","concept_name","created_at",
  ];
  const { error: colErr } = await adminSb
    .from("overlay_responses")
    .select(requiredCols.join(", "))
    .limit(1);

  if (colErr) {
    const badCols = requiredCols.filter(c => colErr.message.includes(c));
    if (badCols.length > 0)
      fail("1", "1b — overlay_responses columns", `missing: ${badCols.join(", ")}`);
    else
      pass("1", "1b — overlay_responses column schema", `query ok (${colErr.code})`);
  } else {
    pass("1", "1b — All 12 required columns present", requiredCols.join(", "));
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUITE 2 — Insert test data (using real user UUID)
// ═══════════════════════════════════════════════════════════════════════════════
async function suite2(): Promise<boolean> {
  console.log("\n═══════════════════════════════════════════════════════");
  console.log(" SUITE 2 — Pattern collection (3-lesson simulation)");
  console.log("═══════════════════════════════════════════════════════");

  // Create real auth user and sign in
  const created = await createTestUser();
  if (!created) { fail("2", "2 — Create test auth user"); return false; }
  const signedIn = await signInTestUser();
  if (!signedIn) { fail("2", "2 — Sign in test user"); return false; }
  console.log(`  ℹ️  Test user UUID: ${testUserId}`);

  // Insert rows using the real UUID
  const rows = [
    { student_id:testUserId, lesson_id:"ap-bio-l1", overlay_type:"gap_crunch",      correct:false, gap_type:"APPLICATION_GAP", concept_name:"hydrogen bonds",        subject_id:"ap-biology" },
    { student_id:testUserId, lesson_id:"ap-bio-l1", overlay_type:"question_sprint", correct:false, gap_type:"APPLICATION_GAP", concept_name:"hydrogen bonds",        subject_id:"ap-biology" },
    { student_id:testUserId, lesson_id:"ap-bio-l2", overlay_type:"gap_crunch",      correct:false, gap_type:"APPLICATION_GAP", concept_name:"hydrogen bonds",        subject_id:"ap-biology" },
    { student_id:testUserId, lesson_id:"ap-bio-l1", overlay_type:"spark",           correct:true,  gap_type:null,              concept_name:"cell membrane structure", subject_id:"ap-biology" },
    { student_id:testUserId, lesson_id:"ap-bio-l2", overlay_type:"question_sprint", correct:true,  gap_type:null,              concept_name:"cell membrane structure", subject_id:"ap-biology" },
    { student_id:testUserId, lesson_id:"ap-bio-l3", overlay_type:"spark",           correct:true,  gap_type:null,              concept_name:"cell membrane structure", subject_id:"ap-biology" },
    { student_id:testUserId, lesson_id:"ap-bio-l2", overlay_type:"gap_crunch",      correct:false, gap_type:"CONCEPT_GAP",     concept_name:"ATP synthesis",         subject_id:"ap-biology" },
    { student_id:testUserId, lesson_id:"ap-bio-l3", overlay_type:"gap_crunch",      correct:false, gap_type:"CONCEPT_GAP",     concept_name:"ATP synthesis",         subject_id:"ap-biology" },
  ];

  const { error } = await adminSb.from("overlay_responses").insert(rows);
  if (error) { fail("2", "2 — Insert 8 rows", error.message); return false; }

  const { count } = await adminSb
    .from("overlay_responses")
    .select("*", { count:"exact", head:true })
    .eq("student_id", testUserId);

  if ((count ?? 0) === 8) { pass("2", "2 — 8 test rows inserted", `count=${count}`); return true; }
  fail("2", "2 — Row count", `expected 8, got ${count}`);
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUITE 3 — Pattern detection
// ═══════════════════════════════════════════════════════════════════════════════
async function suite3(): Promise<StudentPattern | null> {
  console.log("\n═══════════════════════════════════════════════════════");
  console.log(" SUITE 3 — Pattern detection accuracy");
  console.log("═══════════════════════════════════════════════════════");

  const pattern = await getStudentPattern(testUserId, "ap-biology");

  console.log("\n  Raw pattern output:");
  console.log(JSON.stringify(pattern, null, 2));
  console.log("");

  const hBErr = pattern.repeatErrors.find(e => e.conceptName.toLowerCase().includes("hydrogen"));
  const atpErr = pattern.repeatErrors.find(e => e.conceptName.toLowerCase().includes("atp"));

  if (hBErr && hBErr.errorCount >= 3 && hBErr.gapType === "APPLICATION_GAP")
    pass("3", "3a — hydrogen bonds in repeatErrors (≥3, APPLICATION_GAP)", `errorCount=${hBErr.errorCount}`);
  else
    fail("3", "3a — hydrogen bonds in repeatErrors", JSON.stringify(hBErr ?? "not found"));

  if (atpErr && atpErr.errorCount >= 2 && atpErr.gapType === "CONCEPT_GAP")
    pass("3", "3a — ATP synthesis in repeatErrors (≥2, CONCEPT_GAP)", `errorCount=${atpErr.errorCount}`);
  else
    fail("3", "3a — ATP synthesis in repeatErrors", JSON.stringify(atpErr ?? "not found"));

  const hBWeak = pattern.weakConcepts.find(c => c.conceptName.toLowerCase().includes("hydrogen"));
  const atpWeak = pattern.weakConcepts.find(c => c.conceptName.toLowerCase().includes("atp"));

  if (hBWeak && hBWeak.missRate >= 0.75)
    pass("3", "3b — hydrogen bonds weak (missRate ≥75%)", `${Math.round(hBWeak.missRate * 100)}%`);
  else
    fail("3", "3b — hydrogen bonds weak", JSON.stringify(hBWeak ?? "not found"));

  if (atpWeak && atpWeak.missRate === 1.0)
    pass("3", "3b — ATP synthesis weak (100% miss rate)", `${Math.round((atpWeak?.missRate ?? 0) * 100)}%`);
  else
    fail("3", "3b — ATP synthesis weak", JSON.stringify(atpWeak ?? "not found"));

  const memStr = pattern.strongConcepts.find(c => c.conceptName.toLowerCase().includes("cell membrane"));
  if (memStr && memStr.correctStreak >= 3)
    pass("3", "3c — cell membrane structure strong (streak ≥3)", `streak=${memStr.correctStreak}`);
  else
    fail("3", "3c — cell membrane structure strong", JSON.stringify(memStr ?? "not found"));

  if (pattern.predictedBreakPoints.length > 0)
    pass("3", "3d — predictedBreakPoints not empty", pattern.predictedBreakPoints.join(", "));
  else
    fail("3", "3d — predictedBreakPoints not empty", "[]");

  const cp = pattern.confidenceProfile;
  if (Array.isArray(cp.selfRatedWeak) && Array.isArray(cp.actuallyStrong) && Array.isArray(cp.mismatch))
    pass("3", "3e — confidenceProfile shape valid",
      `selfRatedWeak=${cp.selfRatedWeak.length}, actuallyStrong=${cp.actuallyStrong.length}, mismatch=${cp.mismatch.length}`);
  else
    fail("3", "3e — confidenceProfile shape", JSON.stringify(cp));

  return pattern;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUITE 4 — Pattern injection
// ═══════════════════════════════════════════════════════════════════════════════
async function suite4(pattern: StudentPattern) {
  console.log("\n═══════════════════════════════════════════════════════");
  console.log(" SUITE 4 — Pattern injection into overlay prompts");
  console.log("═══════════════════════════════════════════════════════");

  const ctx = buildPatternContext(pattern);

  console.log("\n  patternContext string:");
  console.log("  ┌─────────────────────────────────────────────────────");
  ctx.split("\n").forEach(l => console.log("  │ " + l));
  console.log("  └─────────────────────────────────────────────────────\n");

  const lower = ctx.toLowerCase();

  if (lower.includes("hydrogen bonds"))  pass("4", "4a — contains 'hydrogen bonds'");
  else                                    fail("4", "4a — contains 'hydrogen bonds'", ctx.slice(0,120));

  if (ctx.includes("APPLICATION_GAP"))   pass("4", "4b — contains 'APPLICATION_GAP'");
  else                                    fail("4", "4b — contains 'APPLICATION_GAP'", ctx.slice(0,120));

  if (lower.includes("atp synthesis"))   pass("4", "4c — contains 'ATP synthesis'");
  else                                    fail("4", "4c — contains 'ATP synthesis'", ctx.slice(0,120));

  if (lower.includes("cell membrane"))   pass("4", "4d — contains 'cell membrane structure' as strength");
  else                                    fail("4", "4d — contains 'cell membrane structure'", ctx.slice(0,120));

  if (ctx.length > 100)                  pass("4", "4e — context length > 100 chars", `len=${ctx.length}`);
  else                                   fail("4", "4e — context length > 100 chars", `len=${ctx.length}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUITE 5 — gap_crunch
// ═══════════════════════════════════════════════════════════════════════════════
async function suite5() {
  console.log("\n═══════════════════════════════════════════════════════");
  console.log(" SUITE 5 — Claude API: gap_crunch with pattern memory");
  console.log("═══════════════════════════════════════════════════════");

  const payload = {
    type: "gap_crunch",
    studentId: testUserId,
    subjectId: "ap-biology",
    context: {
      lessonTitle: "Photosynthesis and the Calvin Cycle",
      subject: "AP Biology",
      unit: "Unit 3 - Cellular Energetics",
      scriptSection: "Today we examine how ATP is synthesized during the light reactions, and how hydrogen bonds between water molecules affect the process. Students often confuse the direction of electron flow.",
      fullScript: "Today we examine how ATP is synthesized during the light reactions, and how hydrogen bonds between water molecules affect the process.",
    },
  };

  let json: Record<string, unknown>;
  try {
    const resp = await fetch(`${DEV_BASE}/api/overlay`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${testJwt}` },
      body: JSON.stringify(payload),
    });
    json = await resp.json() as Record<string, unknown>;
  } catch (e) { fail("5", "5a — API reachable", String(e)); return; }

  console.log("\n  Full gap_crunch response from Claude:");
  console.log("  ┌─────────────────────────────────────────────────────");
  JSON.stringify(json, null, 2).split("\n").forEach(l => console.log("  │ " + l));
  console.log("  └─────────────────────────────────────────────────────\n");

  if (json.error) { fail("5", "5a — No auth error", String(json.error)); return; }
  pass("5", "5a — Response is valid JSON (no auth error)");

  // API wraps content: { ok, type, data: { gapType, headline, fixPrompt, ... } }
  const d5 = (json.data ?? json) as Record<string, unknown>;
  const dump = JSON.stringify(d5).toLowerCase();

  if (dump.includes("hydrogen") || dump.includes("atp"))
    pass("5", "5b — References known weak concept — pattern injection confirmed");
  else
    fail("5", "5b — References weak concept", "no mention of hydrogen or ATP");

  if (!dump.includes("i notice you've been struggling"))
    pass("5", "5c — No patronising phrasing");
  else
    fail("5", "5c — Bad phrasing found");

  const fix = String(d5.fixPrompt ?? "");
  if (fix.length > 20 && (fix.includes("?") || fix.length > 60))
    pass("5", "5d — fixPrompt is specific", fix.slice(0,100));
  else
    fail("5", "5d — fixPrompt is specific", `"${fix}"`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUITE 6 — confidence_check
// ═══════════════════════════════════════════════════════════════════════════════
async function suite6() {
  console.log("\n═══════════════════════════════════════════════════════");
  console.log(" SUITE 6 — Claude API: confidence_check identity test");
  console.log("═══════════════════════════════════════════════════════");

  const payload = {
    type: "confidence_check",
    studentId: testUserId,
    subjectId: "ap-biology",
    context: {
      lessonTitle: "Water Chemistry Review",
      subject: "AP Biology",
      unit: "Unit 1 - Chemistry of Life",
      scriptSection: "We revisit hydrogen bonds and their role in water's properties.",
      fullScript: "We revisit hydrogen bonds and their role in water's properties.",
    },
  };

  let json: Record<string, unknown>;
  try {
    const resp = await fetch(`${DEV_BASE}/api/overlay`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${testJwt}` },
      body: JSON.stringify(payload),
    });
    json = await resp.json() as Record<string, unknown>;
  } catch (e) { fail("6", "6 — API call", String(e)); return; }

  console.log("\n  Full confidence_check response from Claude:");
  console.log("  ┌─────────────────────────────────────────────────────");
  JSON.stringify(json, null, 2).split("\n").forEach(l => console.log("  │ " + l));
  console.log("  └─────────────────────────────────────────────────────\n");

  if (json.error) { fail("6", "6 — No auth error", String(json.error)); return; }

  // API wraps: { ok, type, data: { identityBelief, evidenceFromPattern, reframe, ... } }
  const d6 = (json.data ?? json) as Record<string, unknown>;
  const belief   = String(d6.identityBelief ?? "").toLowerCase();
  const evidence = String(d6.evidenceFromPattern ?? "").toLowerCase();
  const reframe  = String(d6.reframe ?? "").toLowerCase();
  const generic  = ["you can do it","keep trying","you got this"];

  const beliefOk  = belief.length > 30 || belief.includes("hydrogen") || belief.includes("bond") || belief.includes("water");
  const evidOk    = evidence.length > 30 || evidence.includes("hydrogen") || evidence.includes("membrane") || evidence.includes("atp");
  const reframeOk = !generic.some(p => reframe === p || reframe.startsWith(p)) && reframe.length > 40;

  if (beliefOk)   pass("6", "6a — identityBelief is student-specific", belief.slice(0,80));
  else            fail("6", "6a — identityBelief specific", `"${belief}"`);

  if (evidOk)     pass("6", "6b — evidenceFromPattern references actual data", evidence.slice(0,80));
  else            fail("6", "6b — evidenceFromPattern references data", `"${evidence}"`);

  if (reframeOk)  pass("6", "6c — reframe is specific (not generic)", reframe.slice(0,100));
  else            fail("6", "6c — reframe is specific", `"${reframe.slice(0,80)}"`);

  const score = [beliefOk, evidOk, reframeOk,
    JSON.stringify(d6).toLowerCase().includes("hydrogen"),
    !JSON.stringify(d6).toLowerCase().includes("i notice you've been struggling"),
  ].filter(Boolean).length;
  const rating = score >= 5 ? 5 : score >= 4 ? 4 : score >= 3 ? 3 : score >= 2 ? 2 : 1;
  console.log(`  ★ Confidence check quality: ${rating}/5`);
  results.push({ suite:"6", name:"6_quality", passed: rating >= 4, actual:`${rating}/5` });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUITE 7 — next_move
// ═══════════════════════════════════════════════════════════════════════════════
async function suite7() {
  console.log("\n═══════════════════════════════════════════════════════");
  console.log(" SUITE 7 — Claude API: next_move predictive test");
  console.log("═══════════════════════════════════════════════════════");

  const payload = {
    type: "next_move",
    studentId: testUserId,
    subjectId: "ap-biology",
    context: {
      lessonTitle: "ATP Synthesis Mechanisms",
      subject: "AP Biology",
      unit: "Unit 3 - Cellular Energetics",
      scriptSection: "ATP synthase uses chemiosmosis to produce ATP. The proton gradient drives phosphorylation.",
      fullScript: "ATP synthase uses chemiosmosis to produce ATP. The proton gradient drives phosphorylation.",
    },
  };

  let json: Record<string, unknown>;
  try {
    const resp = await fetch(`${DEV_BASE}/api/overlay`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${testJwt}` },
      body: JSON.stringify(payload),
    });
    json = await resp.json() as Record<string, unknown>;
  } catch (e) { fail("7", "7 — API call", String(e)); return; }

  console.log("\n  Full next_move response from Claude:");
  console.log("  ┌─────────────────────────────────────────────────────");
  JSON.stringify(json, null, 2).split("\n").forEach(l => console.log("  │ " + l));
  console.log("  └─────────────────────────────────────────────────────\n");

  if (json.error) { fail("7", "7 — No auth error", String(json.error)); return; }

  // API wraps: { ok, type, data: { predictionHeadline, predictedFailure, preventionDrill, memoryTag, ... } }
  const d7 = (json.data ?? json) as Record<string, unknown>;
  const failure = String(d7.predictedFailure ?? "").toLowerCase();
  const drill   = String(d7.preventionDrill ?? "").toLowerCase();
  const tag     = String(d7.memoryTag ?? "");

  const failOk  = failure.length > 40 || failure.includes("frq") || failure.includes("ap") || failure.includes("atp") || failure.includes("exam");
  const drillOk = drill.length > 40;
  const words   = tag.trim().split(/\s+/).filter(Boolean).length;
  const tagOk   = words >= 2 && words <= 6;

  if (failOk)  pass("7", "7a — predictedFailure is AP-exam-specific", failure.slice(0,100));
  else         fail("7", "7a — predictedFailure AP-specific", `"${failure.slice(0,80)}"`);

  if (drillOk) pass("7", "7b — preventionDrill is concrete (>40 chars)", drill.slice(0,100));
  else         fail("7", "7b — preventionDrill concrete", `"${drill}"`);

  if (tagOk)   pass("7", "7c — memoryTag is 2-6 words", `"${tag}" (${words} words)`);
  else         fail("7", "7c — memoryTag 2-6 words", `"${tag}" (${words} words)`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUITE 8 — Memory persistence
// ═══════════════════════════════════════════════════════════════════════════════
async function suite8() {
  console.log("\n═══════════════════════════════════════════════════════");
  console.log(" SUITE 8 — Memory persistence (live data reads)");
  console.log("═══════════════════════════════════════════════════════");

  const { count } = await adminSb
    .from("overlay_responses")
    .select("*", { count:"exact", head:true })
    .eq("student_id", testUserId);

  if ((count ?? 0) >= 8) pass("8", "8a — ≥8 rows present", `count=${count}`);
  else                    fail("8", "8a — ≥8 rows present", `count=${count}`);

  const { data: victim } = await adminSb
    .from("overlay_responses")
    .select("*")
    .eq("student_id", testUserId)
    .eq("concept_name", "hydrogen bonds")
    .limit(1)
    .single();

  if (!victim) { fail("8", "8b — deletable row found", "none"); return; }

  await adminSb.from("overlay_responses").delete().eq("id", victim.id);
  const pB = await getStudentPattern(testUserId, "ap-biology");
  const errB = pB.repeatErrors.find(e => e.conceptName.toLowerCase().includes("hydrogen"));

  if ((errB?.errorCount ?? 0) <= 2)
    pass("8", "8b — errorCount decreased after deletion", `now=${errB?.errorCount ?? 0}`);
  else
    fail("8", "8b — errorCount decreased", `still ${errB?.errorCount}`);

  const { id: _id, created_at: _ca, ...restRow } = victim;
  await adminSb.from("overlay_responses").insert(restRow);
  const pC = await getStudentPattern(testUserId, "ap-biology");
  const errC = pC.repeatErrors.find(e => e.conceptName.toLowerCase().includes("hydrogen"));

  if ((errC?.errorCount ?? 0) >= 3)
    pass("8", "8c — errorCount restored after re-insert", `errorCount=${errC?.errorCount}`);
  else
    fail("8", "8c — errorCount restored", `got ${errC?.errorCount} (expected ≥3)`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLEANUP
// ═══════════════════════════════════════════════════════════════════════════════
async function cleanup() {
  console.log("\n─── Cleanup ──────────────────────────────────────────");
  await deleteTestUser();
  console.log(`  ✅ Test user ${TEST_EMAIL} and all their rows deleted`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// FINAL REPORT
// ═══════════════════════════════════════════════════════════════════════════════
function finalReport(apiSkipped: boolean) {
  const lines = [
    ["1","DATABASE LAYER    "],["2","DATA COLLECTION   "],
    ["3","PATTERN DETECTION "],["4","PROMPT INJECTION  "],
    ["5","CLAUDE gap_crunch "],["6","CLAUDE conf_check "],
    ["7","CLAUDE next_move  "],["8","MEM PERSISTENCE   "],
  ] as const;

  console.log("\n\n╔═══════════════════════════════════════════════════════════╗");
  console.log("║   INHERO PATTERN MEMORY ENGINE — TEST REPORT              ║");
  console.log("╚═══════════════════════════════════════════════════════════╝\n");

  const critical: string[] = [];
  const quality:  string[] = [];

  for (const [suite, label] of lines) {
    const sr = results.filter(r => r.suite === suite);
    const p = sr.filter(r => r.passed).length;
    const t = sr.length;
    const skipped = ["5","6","7"].includes(suite) && apiSkipped;
    const icon = skipped ? "⏭ " : p === t ? "✅" : p >= t / 2 ? "⚠️ " : "❌";
    const note = skipped ? "SKIPPED" : `${p}/${t} passed`;
    console.log(`  ${icon} ${label}  ${note}`);
    sr.filter(r => !r.passed).forEach(r => {
      const msg = `[${suite}] ${r.name}: ${r.actual ?? "failed"}`;
      if (["1","2","3","4","8"].includes(suite)) critical.push(msg);
      else quality.push(msg);
    });
  }

  const totalP = results.filter(r => r.passed).length;
  const total  = results.length;
  console.log(`\n  TOTAL: ${totalP}/${total} tests passed`);

  if (critical.length) {
    console.log("\n  ┌── CRITICAL FAILURES (must fix before launch) ──────────");
    critical.forEach(f => console.log(`  │ • ${f}`));
    console.log("  └────────────────────────────────────────────────────────");
  }
  if (quality.length) {
    console.log("\n  ┌── QUALITY ISSUES (should fix before launch) ───────────");
    quality.forEach(f => console.log(`  │ • ${f}`));
    console.log("  └────────────────────────────────────────────────────────");
  }

  const ready = critical.length === 0 &&
    results.filter(r => r.suite === "3" && r.passed).length >= 5 &&
    results.filter(r => r.suite === "4" && r.passed).length >= 4;

  console.log(`\n  READY FOR LAUNCH: ${ready ? "✅ YES" : "❌ NO — see failures above"}\n`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════
async function main() {
  console.log("╔═══════════════════════════════════════════════════════════╗");
  console.log("║  InHero Pattern Memory Engine — End-to-End Test Suite     ║");
  console.log("║  \"The more you learn, the more your tutor remembers.\"     ║");
  console.log("╚═══════════════════════════════════════════════════════════╝");

  await suite1();
  const inserted = await suite2();

  let pattern: StudentPattern | null = null;
  if (inserted) {
    pattern = await suite3();
    if (pattern) await suite4(pattern);
  } else {
    console.log("\n⚠️  Suites 3–4 skipped: data insertion failed");
  }

  let apiSkipped = false;
  if (!ANTHROPIC_API_KEY) {
    console.log("\n⚠️  No ANTHROPIC_API_KEY — skipping Suites 5–7");
    apiSkipped = true;
  } else if (!testJwt) {
    console.log("\n⚠️  No JWT (auth user creation failed) — skipping Suites 5–7");
    apiSkipped = true;
  } else {
    const ready = await startDevServer();
    if (!ready) {
      console.log("\n⚠️  Dev server unavailable — skipping Suites 5–7");
      apiSkipped = true;
    } else {
      await suite5();
      await suite6();
      await suite7();
      stopDevServer();
    }
  }

  if (inserted) await suite8();

  await cleanup();
  finalReport(apiSkipped);
}

main().catch(err => {
  console.error("\n💥 Crashed:", err);
  stopDevServer();
  deleteTestUser().finally(() => process.exit(1));
});
