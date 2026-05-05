import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const keys = [
  "MODAL_TEXTBOOK_URL",
  "ANTHROPIC_API_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "TOSS_CLIENT_KEY",
  "TOSS_SECRET_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_PRELAUNCH_MODE",
  "ADMIN_EMAILS",
  "ADMIN_ROLE_VALUES",
];

const mode = process.argv[2] === "prod" ? "prod" : "preview";
const args = ["deploy", "--yes"];
const linkedProject = JSON.parse(
  readFileSync(resolve(".vercel/project.json"), "utf8")
);

if (mode === "prod") {
  args.push("--prod");
}

for (const key of keys) {
  const value = process.env[key];
  if (!value) continue;

  if (mode === "prod" && key.startsWith("TOSS_") && value.startsWith("test_")) {
    console.warn(`Skipping ${key} for production deploy because the local value is a Toss test key.`);
    continue;
  }

  args.push("--build-env", `${key}=${value}`);
  args.push("--env", `${key}=${value}`);
}

const result = spawnSync("vercel", args, {
  stdio: "inherit",
  env: {
    ...process.env,
    VERCEL_ORG_ID: process.env.VERCEL_ORG_ID || linkedProject.orgId,
    VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID || linkedProject.projectId,
  },
});

process.exit(result.status ?? 1);
