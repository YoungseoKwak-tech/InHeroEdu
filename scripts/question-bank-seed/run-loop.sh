#!/bin/bash
# Autonomous question-bank generation loop. Runs all computed generators across
# many seeds and uploads in batches. Safe to run unattended — upload is idempotent.
set -e
cd "$(dirname "$0")/../.."
DIR="scripts/question-bank-seed"
SUBJECTS="ib-math-aa sat-math sat-reading ib-physics ib-chemistry ap-physics-1 ap-chemistry"
START=${1:-1}
END=${2:-60}

echo "[loop] generating seeds $START..$END"
for s in $(seq "$START" "$END"); do
  node "$DIR/ib-math-gen.mjs" "$s" >/dev/null 2>&1 || echo "[warn] ib-math seed $s"
  node "$DIR/sat-gen.mjs" "$s" >/dev/null 2>&1 || echo "[warn] sat seed $s"
  node "$DIR/science-calc-gen.mjs" "$s" >/dev/null 2>&1 || echo "[warn] science seed $s"
  if [ $((s % 15)) -eq 0 ]; then
    echo "[loop] uploading at seed $s ..."
    node --env-file=.env.local "$DIR/upload.mjs" $SUBJECTS 2>&1 | tail -1
  fi
done
echo "[loop] final upload ..."
node --env-file=.env.local "$DIR/upload.mjs" $SUBJECTS 2>&1 | tail -1
echo "[loop] DONE seeds $START..$END"
