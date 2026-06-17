#!/usr/bin/env bash
# Render + upload every converted Core Notes book to Supabase.
# Reads scripts/textbook/build/<courseId>/{manifest.json,chapters_data.json}
# (produced by corenotes-to-book.ts), renders per-chapter PDFs with the
# Korean-safe renderer, then uploads via upload-textbook-generic.ts.
#
# Idempotent: re-running re-renders + re-upserts. ap-statistics is skipped
# (already published) — pass it as $1 to force-include.
set -uo pipefail
cd "$(dirname "$0")/../.."
BUILD=scripts/textbook/build
SKIP="${1:-ap-statistics}"

ok=0; fail=0
for dir in "$BUILD"/*/; do
  cid=$(basename "$dir")
  [ "$cid" = "$SKIP" ] && { echo "— skip $cid (already published)"; continue; }
  title=$(node -e "console.log(require('./$BUILD/$cid/manifest.json').title)")
  echo "═══ $cid : $title ═══"
  rm -rf "$dir/pdfs"
  if ! python3 scripts/textbook/inhero_textbook.py \
        --input "$dir/chapters_data.json" --output-dir "$dir/pdfs" \
        --subject-name "$title" --no-practice >/dev/null 2>"$dir/render.err"; then
    echo "  RENDER FAILED — see $dir/render.err"; fail=$((fail+1)); continue
  fi
  if npx tsx scripts/upload-textbook-generic.ts "$cid" 2>&1 | tail -2; then
    ok=$((ok+1))
  else
    echo "  UPLOAD FAILED"; fail=$((fail+1))
  fi
done
echo "════════ batch complete: ok=$ok fail=$fail ════════"
