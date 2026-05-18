#!/usr/bin/env tsx
/**
 * One-shot duplicate cleanup for the 11x "Transport Across Cell
 * Membrane.pdf" upload retries. Hard-deletes 10 of the 11
 * lounge_resources rows (keeping the earliest by created_at) plus the
 * 10 orphaned objects in Supabase Storage.
 *
 * Order of operations:
 *   1. Re-pull rows from the DB (single source of truth for paths)
 *   2. Confirm the 10 doomed paths don't collide with the kept path
 *   3. DELETE the 10 lounge_resources rows
 *   4. DELETE the 10 storage objects from the chat-attachments bucket
 *   5. Verify a single row remains for the title
 *
 * Default: DRY RUN. Pass --apply to commit.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

function loadEnv() {
  let text: string;
  try {
    text = readFileSync(".env.local", "utf8");
  } catch {
    return;
  }
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq);
    const val = line.slice(eq + 1);
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const APPLY = process.argv.includes("--apply");

const KEPT_ID = "bd99186d-520c-4438-9fdf-80ebb6e7c78f";
const DOOMED_IDS = [
  "f98e3620-8532-467d-9c39-216f5c35b405",
  "07eec2e5-2b3c-4c41-8a08-20791229c62d",
  "9720e12a-8955-4334-bccf-0e3cc3a86c64",
  "695af1a7-d67c-4634-8eac-3816111b5fb3",
  "ac2941f2-7a87-4f86-bad7-1a73f176913e",
  "85bb41ba-351c-4c9a-b067-70fae6734597",
  "ac0fec88-62dc-4da0-8bde-db5c18883bed",
  "875bc23b-ecc2-40fd-a0ed-b11ca97b1c0a",
  "15e437d6-20a5-456c-929f-85be42ad6341",
  "a5f2c6bc-eaa5-4eaf-a36c-8f444d74f0fe",
];
const BUCKET = "chat-attachments";

function extractObjectPath(publicUrl: string): string | null {
  // public URLs look like:
  //   https://<ref>.supabase.co/storage/v1/object/public/<bucket>/<path>
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  return publicUrl.slice(idx + marker.length);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

async function main() {
  console.log(APPLY ? "APPLY MODE" : "DRY RUN (no writes)");

  // 1. Pull rows.
  const { data: rows, error } = await supabase
    .from("lounge_resources")
    .select("id, title, attachment_url, created_at")
    .in("id", [KEPT_ID, ...DOOMED_IDS]);
  if (error || !rows) {
    console.error("Failed to load rows:", error);
    process.exit(1);
  }
  const byId = new Map(rows.map((r) => [r.id, r]));
  const kept = byId.get(KEPT_ID);
  if (!kept) {
    console.error("KEPT row missing — refuse to delete anything.");
    process.exit(1);
  }
  const keptPath = extractObjectPath(kept.attachment_url);
  console.log(`\nKEPT  ${KEPT_ID.slice(0, 8)}  storage path: ${keptPath}`);

  // 2. Confirm no doomed path collides with kept.
  const doomedPaths: { id: string; path: string }[] = [];
  for (const id of DOOMED_IDS) {
    const r = byId.get(id);
    if (!r) {
      console.error(`Doomed id ${id.slice(0, 8)} not found in DB — already gone?`);
      continue;
    }
    const path = extractObjectPath(r.attachment_url);
    if (!path) {
      console.error(`  ${id.slice(0, 8)}: could not extract path from ${r.attachment_url}`);
      continue;
    }
    if (path === keptPath) {
      console.error(`  ${id.slice(0, 8)}: SHARES PATH WITH KEPT — refusing to mark for storage delete`);
      continue;
    }
    doomedPaths.push({ id, path });
  }
  console.log(`\n${doomedPaths.length} storage paths to remove (after collision filter):`);
  for (const { id, path } of doomedPaths) {
    console.log(`  DELETE storage  ${id.slice(0, 8)}  ${path}`);
  }

  if (!APPLY) {
    console.log("\n(DRY RUN — no writes. Pass --apply to commit.)");
    return;
  }

  // 3. DB delete.
  console.log("\n=== Step 3: DB hard-delete ===");
  const { error: delErr, count: delCount } = await supabase
    .from("lounge_resources")
    .delete({ count: "exact" })
    .in("id", DOOMED_IDS);
  if (delErr) {
    console.error("DB delete failed:", delErr);
    process.exit(1);
  }
  console.log(`Deleted ${delCount} DB rows.`);

  // 4. Storage delete.
  console.log("\n=== Step 4: storage delete ===");
  const pathsOnly = doomedPaths.map((p) => p.path);
  const { data: storageRes, error: storageErr } = await supabase.storage
    .from(BUCKET)
    .remove(pathsOnly);
  if (storageErr) {
    console.error("Storage delete error:", storageErr);
  }
  console.log(`Storage remove returned: ${JSON.stringify(storageRes, null, 2)}`);

  // 5. Verify single row remains.
  console.log("\n=== Step 5: verify ===");
  const { count: remaining } = await supabase
    .from("lounge_resources")
    .select("id", { count: "exact", head: true })
    .eq("title", "Transport Across Cell Membrane.pdf")
    .eq("review_status", "approved")
    .is("deleted_at", null);
  console.log(`Approved rows titled 'Transport Across Cell Membrane.pdf': ${remaining}`);
  if (remaining !== 1) {
    console.error("UNEXPECTED post-cleanup row count.");
    process.exit(1);
  }
}

void main().catch((err) => {
  console.error("Unhandled:", err);
  process.exit(1);
});
