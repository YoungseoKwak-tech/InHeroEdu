#!/bin/bash
# Parallel question-bank generation loop. Runs the three computed generators
# (ib-math, sat, science) CONCURRENTLY per seed — they write disjoint subject
# files, so parallelism is race-free. Uploads stay SERIAL (one upload.mjs at a
# time) because the de-dupe check is not safe under concurrent inserts.
#
#   bash scripts/question-bank-seed/parallel-loop.sh [START] [END]
cd "$(dirname "$0")/../.."
DIR="scripts/question-bank-seed"
SUBJECTS="ib-math-aa sat-math sat-reading ib-physics ib-chemistry ap-physics-1 ap-chemistry"
START=${1:-141}
END=${2:-400}
CHUNK=15

echo "[par] generating seeds $START..$END (3-way parallel)"
s=$START
while [ "$s" -le "$END" ]; do
  e=$((s + CHUNK - 1)); [ "$e" -gt "$END" ] && e=$END
  for x in $(seq "$s" "$e"); do
    node "$DIR/ib-math-gen.mjs"     "$x" >/dev/null 2>&1 &
    node "$DIR/sat-gen.mjs"         "$x" >/dev/null 2>&1 &
    node "$DIR/science-calc-gen.mjs" "$x" >/dev/null 2>&1 &
    wait   # 3 generators run together per seed, then advance
  done
  # Avoid colliding with any other loop's upload (concurrent inserts dup).
  while pgrep -f "upload.mjs" >/dev/null 2>&1; do sleep 2; done
  echo "[par] uploading through seed $e ..."
  node --env-file=.env.local "$DIR/upload.mjs" $SUBJECTS 2>&1 | tail -1
  s=$((e + 1))
done
echo "[par] DONE seeds $START..$END"
