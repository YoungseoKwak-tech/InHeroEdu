#!/usr/bin/env tsx
/**
 * One-shot smoke test for lib/ai/generate-material.ts. Loads
 * .env.local, calls Claude with a representative query, prints the
 * full JSON the model returned plus the parsed material.
 *
 * Cost: ~$0.03 per run.
 *
 *   npx tsx scripts/smoke-generate-material.ts
 *   npx tsx scripts/smoke-generate-material.ts "Hardy-Weinberg" ap-bio notes
 */

import { readFileSync } from "node:fs";

function loadEnv() {
  try {
    const text = readFileSync(".env.local", "utf8");
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const k = line.slice(0, eq);
      const v = line.slice(eq + 1);
      if (!process.env[k]) process.env[k] = v;
    }
  } catch {
    /* missing .env.local is OK if vars are already set */
  }
}
loadEnv();

async function main() {
  const { generateStudyMaterial } = await import("../lib/ai/generate-material");

  const query = process.argv[2] ?? "Chi-Square Test";
  const course = process.argv[3] ?? "ap-bio";
  const materialType = (process.argv[4] ?? "notes") as
    | "notes"
    | "practice"
    | "explanation"
    | "summary";

  console.log(`Query        : ${query}`);
  console.log(`Course       : ${course}`);
  console.log(`Material type: ${materialType}`);
  console.log(`Calling Claude…\n`);

  const t0 = Date.now();
  const result = await generateStudyMaterial({
    query,
    course,
    materialType,
  });
  const elapsedMs = Date.now() - t0;

  console.log("─── usage / cost ───");
  console.log(`input  tokens : ${result.usage.input}`);
  console.log(`output tokens : ${result.usage.output}`);
  console.log(`cost          : $${result.cost.toFixed(4)}`);
  console.log(`duration      : ${elapsedMs}ms`);
  console.log(`model         : ${result.model}`);

  console.log("\n─── parsed material (JSON) ───");
  console.log(JSON.stringify(result.material, null, 2));

  console.log("\n─── rendered content (markdown) ───");
  console.log(result.material.content);
}

void main().catch((err) => {
  console.error("FAIL:", err);
  process.exit(1);
});
