/**
 * Read-only telemetry data audit.
 *
 * Prints enough aggregate counts to decide whether the attention pipeline has
 * real data flowing through it. This script intentionally performs no writes.
 *
 * Run:
 *   node --env-file=.env.local ./node_modules/.bin/tsx scripts/audit-attention-data.ts
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

type AuditResult = {
  attention_events: {
    total_rows: number;
    distinct_sessions: number;
    distinct_users: number;
  };
  attention_features: {
    total_rows: number;
    session_accuracy_non_null_rows: number;
    computed_at_min: string | null;
    computed_at_max: string | null;
  };
  attention_state_inferences: {
    total_rows: number;
  };
};

(function loadEnv() {
  try {
    const text = readFileSync(".env.local", "utf8");
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq);
      const value = line.slice(eq + 1).replace(/^"|"$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // Running in environments that already inject vars is fine.
  }
})();

const databaseUrl = process.env.DATABASE_URL ?? "";

if (!databaseUrl) {
  console.error("[audit] Missing DATABASE_URL. Set it in .env.local or the shell environment.");
  process.exit(1);
}

const sql = `
begin read only;

with
events as (
  select
    count(*)::bigint as total_rows,
    count(distinct session_id)::bigint as distinct_sessions,
    count(distinct user_id)::bigint as distinct_users
  from public.attention_events
),
features as (
  select
    count(*)::bigint as total_rows,
    count(*) filter (where session_accuracy is not null)::bigint as session_accuracy_non_null_rows,
    min(computed_at)::text as computed_at_min,
    max(computed_at)::text as computed_at_max
  from public.attention_features
),
states as (
  select count(*)::bigint as total_rows
  from public.attention_state_inferences
)
select jsonb_build_object(
  'attention_events', jsonb_build_object(
    'total_rows', events.total_rows,
    'distinct_sessions', events.distinct_sessions,
    'distinct_users', events.distinct_users
  ),
  'attention_features', jsonb_build_object(
    'total_rows', features.total_rows,
    'session_accuracy_non_null_rows', features.session_accuracy_non_null_rows,
    'computed_at_min', features.computed_at_min,
    'computed_at_max', features.computed_at_max
  ),
  'attention_state_inferences', jsonb_build_object(
    'total_rows', states.total_rows
  )
)::text
from events, features, states;

rollback;
`;

function runReadOnlyAudit(): AuditResult {
  const output = execFileSync(
    "psql",
    [databaseUrl, "-X", "-q", "-t", "-A", "-v", "ON_ERROR_STOP=1", "-c", sql],
    {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }
  ).trim();

  const jsonLine = output
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith("{") && line.endsWith("}"));

  if (!jsonLine) {
    throw new Error(`Audit query did not return JSON. Raw output:\n${output}`);
  }

  return JSON.parse(jsonLine) as AuditResult;
}

function formatValue(value: number | string | null): string {
  if (value === null || value === undefined) return "null";
  return String(value);
}

function printTable(result: AuditResult) {
  const rows: Array<[string, string, number | string | null]> = [
    ["attention_events", "total_rows", result.attention_events.total_rows],
    ["attention_events", "distinct_sessions", result.attention_events.distinct_sessions],
    ["attention_events", "distinct_users", result.attention_events.distinct_users],
    ["attention_features", "total_rows", result.attention_features.total_rows],
    [
      "attention_features",
      "session_accuracy_non_null_rows",
      result.attention_features.session_accuracy_non_null_rows,
    ],
    ["attention_features", "computed_at_min", result.attention_features.computed_at_min],
    ["attention_features", "computed_at_max", result.attention_features.computed_at_max],
    [
      "attention_state_inferences",
      "total_rows",
      result.attention_state_inferences.total_rows,
    ],
  ];

  const headers = ["table", "metric", "value"] as const;
  const widths = headers.map((header, idx) =>
    Math.max(
      header.length,
      ...rows.map((row) => formatValue(row[idx]).length)
    )
  );

  const divider = `|-${widths.map((width) => "-".repeat(width)).join("-|-")}-|`;
  const line = (values: readonly string[]) =>
    `| ${values.map((value, idx) => value.padEnd(widths[idx])).join(" | ")} |`;

  console.log("\nAttention telemetry data audit (read-only)");
  console.log(line(headers));
  console.log(divider);
  for (const row of rows) {
    console.log(line([row[0], row[1], formatValue(row[2])]));
  }
  console.log("");
}

try {
  printTable(runReadOnlyAudit());
} catch (error) {
  console.error("[audit] failed:", error instanceof Error ? error.message : error);
  process.exit(1);
}
