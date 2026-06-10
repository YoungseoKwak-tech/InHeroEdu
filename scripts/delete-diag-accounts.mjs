/**
 * Delete synthetic diagnostic/test auth accounts (payment smoke-tests).
 * Targets: email endsWith ".test" OR includes "@inhero-diag.".
 *
 * DRY RUN by default. Pass --apply to actually delete (irreversible).
 *   node --env-file=.env.local scripts/delete-diag-accounts.mjs
 *   node --env-file=.env.local scripts/delete-diag-accounts.mjs --apply
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error("Missing SUPABASE env"); process.exit(1); }

const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
const APPLY = process.argv.includes("--apply");

const isDiag = (e) => {
  e = (e || "").toLowerCase();
  return e.endsWith(".test") || e.includes("@inhero-diag.");
};

// Page through all auth users.
let page = 1;
const all = [];
while (true) {
  const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
  if (error) { console.error("listUsers error:", error.message); process.exit(1); }
  all.push(...data.users);
  if (!data.nextPage || data.users.length === 0) break;
  page = data.nextPage;
}

const targets = all.filter((u) => isDiag(u.email));
console.log(`Total auth users: ${all.length}`);
console.log(`Diagnostic/test targets: ${targets.length}`);
targets.slice(0, 20).forEach((u) => console.log("  -", u.email, u.created_at));
if (targets.length > 20) console.log(`  …and ${targets.length - 20} more`);

if (!APPLY) {
  console.log("\nDRY RUN — no deletions. Re-run with --apply to delete.");
  process.exit(0);
}

console.log("\nDeleting…");
let ok = 0, fail = 0;
for (const u of targets) {
  const { error } = await supabase.auth.admin.deleteUser(u.id);
  if (error) { fail++; console.error("  FAIL", u.email, error.message); }
  else { ok++; }
}
console.log(`\nDone. Deleted: ${ok}, Failed: ${fail}, Remaining real users: ${all.length - targets.length}`);
