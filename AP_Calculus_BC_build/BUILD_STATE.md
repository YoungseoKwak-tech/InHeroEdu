# AP Calculus BC Textbook Build State

InHero Original "AP Calculus BC — The Ultimate Guide". Content is written
directly by Claude in-session (NO Anthropic API calls, no API key needed).

## Pipeline

1. Chapter content lives in `chapters/u{NN}.json` — one JSON array per unit,
   schema below. Claude writes these directly.
2. Render: `cd modal && python3 inhero_textbook.py --data <merged json> --out ../AP_Calculus_BC_PDFs_75`
   (merge all unit files into one array first; renderer assigns unit/chapter
   numbers from `unit_name` transitions, so units must stay in TOC order).
   Renderer outputs `U01_01_Title.pdf`; rename to `UNIT01_01_Title.pdf` before
   upload (upload script expects the UNIT prefix pattern).
3. Upload: clone of `scripts/upload-ap-physics-2-textbook.ts` →
   `scripts/upload-ap-calc-bc-textbook.ts` (slug `ap-calc-bc-ultimate`).
4. Slug wiring (same 5 spots as Physics 2, see commit 622bf24c):
   OriginalsSidebar, FeaturedTextbooks, TextbookTOC, lib/textbookCatalog.ts,
   lib/data/courses.ts. Cover: user supplies PNG → 640w jpg in
   /public/textbook-covers/ap-calc-bc.jpg.

## Chapter JSON schema (per chapter object)

```json
{
  "subject": "AP Calculus BC",
  "category": "AP",
  "unit_name": "<exact unit_name from toc.json>",
  "chapter_title": "<exact title from toc.json>",
  "hook": "1-2 sentence opening hook",
  "learning_objectives": ["5 objectives"],
  "sections": [
    {
      "title": "...", "subtitle": "...",
      "body": "3-4 paragraphs separated by \\n\\n",
      "key_terms": [["term", "definition"], ...3-5 terms],
      "boxes": [["ap_alert", "one exam tip"]]
    }
    // 4 sections per chapter
  ],
  "generated_questions": {
    "mcq": [ {"question","choices":{"A".."D"},"answer","explanation"} x5 ],
    "frq": [ {"question" (multipart with \\n (a)(b)(c)), "rubric":[3-4 items], "model_answer"} x3 ]
  }
}
```

## Content conventions

- Math notation: plain text with `^` for powers (x^2), `∫ √ ∞ ≤ ≥ ≠ ≈ π θ Δ`
  OK (DejaVu + safe_text allow Greek/math-operator blocks). `lim x→a` renders
  as `lim x->a`. Em dash — is fine (renderer fixed 2026-06-07). NO LaTeX.
- Tone: InHero voice — direct, ambitious, "the last guide you'll ever need".
  AP exam alerts in every chapter. Mastery framing, no fluff.
- BC-only topics get explicit "BC ONLY" flavor in hooks/alerts where relevant
  (units 6.6-6.8, 7.3, 7.6, 8.6, all of 9 and 10).
- QUALITY GATE before merging each batch: validate 5 objectives / 4 sections /
  5 MCQ / 3 FRQ per chapter, answer key in choices, AND lint MCQ explanations
  + FRQ rubrics for leaked chain-of-thought (regex: Wait|Recheck|re-examine|
  \? No —). Twice now a question's design contradiction leaked into the
  explanation text mid-draft — design each MCQ's numbers BEFORE writing it.

## Progress

- [x] toc.json — 10 units / 75 chapters defined
- [x] Renderer verified locally (fonts fixed: DejaVuSerif*.ttf were corrupt
      HTML; replaced from dejavu-fonts 2.37 release. Em-dash mapping fixed.)
- [x] chapters/u01.json (7 ch) — DONE, rendered 63pp total (9pp each)
- [x] chapters/u02.json (7 ch) — DONE, rendered 63pp. (NOTE: standalone unit
      renders show U01 prefix — unit numbers assign by unit_name transitions,
      correct in the final all-units merge render. Lint regex updated need:
      also catch mid-sentence '...' in question text, two slipped through
      and were hand-cleaned.)
- [x] chapters/u03.json (7 ch) — DONE, rendered 63pp, lint clean
- [x] chapters/u04.json (7 ch) — DONE, rendered 63pp, lint clean.
      Lint regex (current best): \bWait\b|\bRecheck\b|re-examine|\? No —|
      \.\.\.\s+[a-z(]|accept verif|student must catch|[а-яА-Я]
      (Cyrillic check added after a stray Russian word appeared once.)
- [x] chapters/u05.json (7 ch) — DONE, rendered 63pp, lint clean
      (one math error caught in lint pass: folium y-coordinate)
- [x] chapters/u06.json (8 ch) — DONE, rendered 72pp, lint clean.
      Includes BC-only: Integration by Parts, Partial Fractions,
      Improper Integrals.
- [x] chapters/u07.json (7 ch) — DONE, rendered 63pp, lint clean.
      Includes BC-only: Euler's Method, Logistic Growth.
- [x] chapters/u08.json (7 ch) — DONE, rendered 63pp, lint clean.
      Includes BC-only: Arc Length.
- [x] chapters/u09.json (8 ch) — DONE, rendered 72pp, lint clean.
      Full BC-only unit: Parametric, Vectors, Planar Motion, Polar.
- [x] chapters/u10.json (10 ch) — DONE, all 10 chapters, lint clean.
      Full series unit through Taylor/Lagrange/series manipulation.
- [x] Render all 75 PDFs + rename to UNIT prefix → AP_Calculus_BC_PDFs_75/
- [x] Upload script written: scripts/upload-ap-calc-bc-textbook.ts
      (reads titles from toc.json, not de-slugified filenames). Dry-run
      pairs all 75/75 with correct titles, no skips.
- [ ] Cover image — USER SUPPLIES (like physics-2: PNG → 640w jpg at
      /public/textbook-covers/ap-calc-bc-bc.jpg ... actually ap-calc-bc.jpg
      is TAKEN by AB. Use ap-calc-bc-bc.jpg or ap-calculus-bc.jpg.)
- [ ] AWAITING USER: run upload script, slug-wire (5 spots like commit
      622bf24c), deploy. Loop STOPPED here per instructions — upload/
      deploy/cover need user confirmation.
