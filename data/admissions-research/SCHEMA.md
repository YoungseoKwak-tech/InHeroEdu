# Admissions Research — shared schema

Every research stream writes **two files** into this directory:

- `<stream>.json` — structured, machine-readable data
- `<stream>.md` — a short human-readable analysis (insights, patterns, caveats)

This dataset powers a future `/parents` "합격생 스펙·에세이 분석" feature. Because it
will be shown to families making real decisions, **accuracy and sourcing are
non-negotiable**.

## Hard rules

1. **Every numeric data point needs a source URL.** Prefer official **Common Data
   Sets** (each college's Office of Institutional Research) and the college's own
   admissions pages. Reputable aggregators (commondatasets.fyi, collegevine,
   niche, prepscholar) are acceptable as secondary sources.
2. **Never fabricate.** If a figure can't be sourced, omit it or mark it
   `null` with a `note`. A smaller, correct dataset beats a large, invented one.
3. **No verbatim copyrighted essays.** Do not copy applicants' essays. Analyze
   structure, theme, and technique in your own words; you may *link* to colleges'
   officially published "essays that worked" pages, but quote at most a short
   (<25-word) illustrative phrase, attributed.
4. **Reddit is blocked** in this environment — do not rely on it; use Common Data
   Sets, college sites, and aggregators instead.
5. Quality over quantity: ~8–15 schools or patterns per stream, each well-sourced.

## `<stream>.json` shape

```json
{
  "stream": "ivy-stem",
  "title": "Ivy League + MIT/Stanford — STEM admit benchmarks",
  "generatedAt": "2026-06-24",
  "schools": [
    {
      "name": "Massachusetts Institute of Technology",
      "tier": "T20",
      "admitRatePct": 4.5,
      "cycle": "2024-2025 (Class of 2029)",
      "sat": { "p25": 1520, "p50": 1560, "p75": 1580 },
      "act": { "p25": 35, "p50": null, "p75": 36 },
      "gpa": { "note": "97% in top 10% of class; CDS reports bands not a mean" },
      "testPolicy": "required",
      "topMajors": ["Computer Science", "Engineering", "Math"],
      "ecPatterns": ["research/olympiad spikes", "USACO/AMC distinction"],
      "sources": [
        { "title": "MIT CDS 2024-2025", "url": "https://..." }
      ]
    }
  ],
  "insights": [
    "Short, sourced takeaways a parent could act on."
  ],
  "sources": [
    { "title": "...", "url": "https://..." }
  ]
}
```

For the **essay** stream, use this shape instead:

```json
{
  "stream": "essay-craft",
  "title": "Essay craft — structures, themes, techniques (original analysis)",
  "generatedAt": "2026-06-24",
  "patterns": [
    {
      "name": "Montage / 'thread' structure",
      "whatItIs": "…in your own words…",
      "whyItWorks": "…",
      "whenToUse": "…",
      "originalMiniExample": "A 2–3 sentence example written from scratch (not copied).",
      "sources": [{ "title": "Johns Hopkins Essays That Worked", "url": "https://..." }]
    }
  ],
  "commonAppThemes": ["…"],
  "supplementTips": ["…"],
  "insights": ["…"]
}
```
