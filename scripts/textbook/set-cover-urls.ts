/**
 * Set textbooks.cover_url for every Original so the TOC hero (and any API
 * consumer) renders a real cover. New Core-Notes books point at the generated
 * /public/textbook-covers/<slug>.png; the original six keep their JPGs.
 *
 *   npx tsx scripts/textbook/set-cover-urls.ts [--dry-run]
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

(function loadEnv() {
  const text = readFileSync(".env.local", "utf8");
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const k = line.slice(0, eq);
    if (!process.env[k]) process.env[k] = line.slice(eq + 1).replace(/^"|"$/g, "");
  }
})();

const DRY = process.argv.includes("--dry-run");
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Original six (existing JPG covers).
const COVERS: Record<string, string> = {
  "ap-bio-ultimate": "/textbook-covers/ap-bio.jpg",
  "ap-chem-ultimate": "/textbook-covers/ap-chem.jpg",
  "ap-physics-ultimate": "/textbook-covers/ap-physics-1.jpg",
  "ap-physics-2-ultimate": "/textbook-covers/ap-physics-2.jpg",
  "ap-calc-ab-ultimate": "/textbook-covers/ap-calc-ab.jpg",
  "ap-calc-bc-ultimate": "/textbook-covers/ap-calculus-bc.jpg",
};

// New Core-Notes books (generated PNGs, keyed by manifest slug).
const BUILD = join(process.cwd(), "scripts", "textbook", "build");
for (const cid of readdirSync(BUILD)) {
  try {
    const m = JSON.parse(readFileSync(join(BUILD, cid, "manifest.json"), "utf8"));
    COVERS[m.slug] = `/textbook-covers/${m.slug}.png`;
  } catch { /* skip dirs without manifest */ }
}

async function main() {
  let ok = 0, miss = 0;
  for (const [slug, url] of Object.entries(COVERS)) {
    if (DRY) { console.log(`(dry) ${slug} → ${url}`); continue; }
    const { data, error } = await sb.from("textbooks").update({ cover_url: url }).eq("slug", slug).select("slug");
    if (error) { console.warn(`! ${slug}: ${error.message}`); miss++; continue; }
    if (!data?.length) { console.warn(`! ${slug}: no row`); miss++; continue; }
    ok++;
  }
  console.log(`[done] updated=${ok} missing=${miss} total=${Object.keys(COVERS).length} dry=${DRY}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
