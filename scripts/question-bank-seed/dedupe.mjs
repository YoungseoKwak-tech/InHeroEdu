// One-off: remove duplicate rows in `questions` (same subject + question_text),
// keeping the earliest id. Caused by upload.mjs not checking the DB before insert.
import { createClient } from "@supabase/supabase-js";
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const subs = ["ap-calculus-bc","ap-statistics","ap-computer-science-a","ap-psychology","ap-world-history","ap-environmental-science","ap-macroeconomics","ap-microeconomics","ap-us-government","ap-english-language","ap-human-geography"];

async function fetchAll(subject) {
  const rows = []; let from = 0;
  for (;;) {
    const { data, error } = await sb.from("questions").select("id, question_text").eq("subject", subject).order("id", { ascending: true }).range(from, from + 999);
    if (error) throw error;
    if (!data.length) break;
    rows.push(...data); if (data.length < 1000) break; from += 1000;
  }
  return rows;
}

let grandDeleted = 0;
for (const s of subs) {
  const rows = await fetchAll(s);
  const seen = new Set(); const toDelete = [];
  for (const r of rows) { if (seen.has(r.question_text)) toDelete.push(r.id); else seen.add(r.question_text); }
  for (let i = 0; i < toDelete.length; i += 200) {
    const batch = toDelete.slice(i, i + 200);
    const { error } = await sb.from("questions").delete().in("id", batch);
    if (error) throw error;
  }
  grandDeleted += toDelete.length;
  console.log(`${s.replace("ap-","").padEnd(20)} kept ${seen.size}, deleted ${toDelete.length}`);
}
console.log("total deleted:", grandDeleted);
