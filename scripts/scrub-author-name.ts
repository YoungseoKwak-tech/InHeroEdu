// One-off: replace any personal author_name on textbooks with the
// "InHero Originals" brand byline. Run:
//   npx tsx --env-file=.env.local scripts/scrub-author-name.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

async function main() {
  const { data: before, error: readErr } = await supabase
    .from("textbooks")
    .select("id, slug, author_name");
  if (readErr) throw readErr;
  console.log("before:", before);

  const { data, error } = await supabase
    .from("textbooks")
    .update({ author_name: "InHero Originals" })
    .neq("author_name", "InHero Originals")
    .select("slug, author_name");
  if (error) throw error;
  console.log("updated:", data);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
