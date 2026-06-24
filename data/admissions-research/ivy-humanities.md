# Ivy League + peers — humanities & social-science admit benchmarks

*Stream: `ivy-humanities` · generated 2026-06-14 · 13 schools*

Admit benchmarks for humanities and social-science applicants at the eight Ivies plus
Stanford, Duke, UChicago, Georgetown, and Northwestern. Numeric figures come from each
school's most recent **Common Data Set (CDS)** where available; admissions-office news
releases and CDS-mirroring aggregators fill gaps. Every figure in the companion
`ivy-humanities.json` carries a source URL.

## How to read these numbers

- **Admit rate is school-wide.** The CDS does not break out admit rate by intended major,
  so a humanities or social-science applicant faces the same headline rate shown here.
  There is no separate, lower "humanities admit rate" to cite — treat these as the
  realistic baseline.
- **GPA is never a mean.** No school on this list publishes an average GPA; the CDS records
  class-rank bands (e.g. "% in top tenth"), usually from a small self-reporting subset
  (often under 30% of admits). Northwestern reports neither rank nor GPA at all.
- **p50 is frequently null.** Only Yale, UChicago, Northwestern, and Dartmouth report a true
  SAT/ACT median in their CDS. Harvard, Princeton, Brown, Columbia, Penn, Cornell, Stanford,
  Duke, and Georgetown report only the 25th/75th percentiles, so p50 is left null.

## The numbers at a glance

| School | Admit rate (cycle) | SAT 25/50/75 | ACT 25/50/75 | Test policy (current) |
|---|---|---|---|---|
| Stanford | ~3.6% (C2028) | 1510 / — / 1570 | 34 / — / 35 | **Required** (reinstated FA25) |
| Harvard | ~3.65% (C2028) | 1510 / — / 1580 | 34 / 35 / 36 | **Required** (C2029) |
| Yale | ~3.87% (C2028) | 1480 / 1530 / 1560 | 33 / 34 / 35 | Test-flexible → required C2031 |
| Columbia | ~3.9% (C2027) | 1500 / — / 1560 | 34 / — / 35 | Test-optional (permanent) |
| UChicago | ~4.48% (C2028) | 1510 / 1540 / 1560 | 34 / 35 / 35 | Test-optional |
| Princeton | ~4.62% (C2028) | 1500 / — / 1560 | 34 / — / 35 | Test-optional → required FA28 |
| Duke | ~5.1% (C2028) | 1500 / — / 1570 | 34 / — / 35 | Test-optional |
| Brown | ~5.2% (C2028) | 1500 / 1530 / 1560 | 34 / — / 35 | **Required** (FA24+) |
| Penn | ~5.4% (FA24) | 1500 / — / 1570 | 34 / — / 35 | **Required** (FA26) |
| Dartmouth | 6.02% (C2029) | 1440 / 1520 / 1550 | 32 / 34 / 35 | **Required** (C2029) |
| Northwestern | ~7.7% (C2028) | 1510 / 1540 / 1560 | 34 / 34 / 35 | Test-optional |
| Georgetown | 12.9% (C2028) | 1400 / — / 1540 | 31 / — / 35 | **Required** |
| Cornell | suppressed (~8.4% est.) | 1510 / — / 1560 | 33 / — / 35 | Mixed FA25 → required FA26 |

*(— = p50 not reported in that school's CDS.)*

## What the data says

**The score bar is nearly flat across the group.** SAT 25th percentiles cluster at
1480–1510 and 75th at 1550–1580 for almost every school. A 1500+ SAT does not distinguish
an applicant here; it is table stakes. **Georgetown is the one structural outlier** — a 25th
percentile near 1400 and a ~12.9% admit rate make it the most realistic "reach" on the list
for a strong humanities applicant, especially one targeting the School of Foreign Service.

**Test policy is in active flux — pin it to the entry year.** Required now: Harvard
(Class of 2029), Brown (FA24), Dartmouth (Class of 2029), Stanford (FA25), Georgetown,
and Penn (FA26). Cornell goes all-colleges-required FA26. Required soon: Yale (Class of 2031)
and Princeton (FA28). Still test-optional: Columbia (permanently), UChicago, Duke, and
Northwestern. Several recent CDS cohorts predate their school's policy change, so the
percentile bands above reflect partly self-selected submitters — always confirm the rule
for the specific year a student will apply.

**Every school has a signature humanities/social-science draw** worth naming explicitly in a
"why us" essay:

- **Georgetown — Walsh School of Foreign Service (SFS):** International Relations, ranked #1
  in Foreign Policy; the clearest IR/policy destination on the list.
- **Princeton — SPIA** plus a required graded written paper in the application (writing is
  load-bearing here).
- **Cornell — ILR:** applied social science (labor economics, HR, labor relations/law),
  with its own debate program.
- **Northwestern — Medill:** the only top-10 university with an undergraduate journalism
  degree.
- **Duke — Sanford School:** one of the largest undergraduate public-policy programs.
- **Penn — PPE**, **Yale — Ethics, Politics & Economics (EPE)**, **Harvard — Social Studies**:
  signature interdisciplinary social-science honors tracks.
- **Brown — Open Curriculum:** rewards a self-directed humanities path over checkbox breadth.
- **UChicago:** humanities-heavy Core for all students; rewards intellectual depth and
  published/independent work.

Economics is the most popular major at nearly every school on this list, so it is the most
competitive social-science entry point rather than a soft one.

**EC patterns are remarkably consistent.** Across all 13 schools the same depth-over-breadth
"spike" recurs: debate / Model UN / Mock Trial, mentored or independent research,
writing / publication / journalism (literary magazines, essay competitions), and policy or
civic engagement (internships, campaigns, public service). Leadership and tangible impact in
two to four sustained activities beat a long, shallow list. Where a school has a flagship
program, aligning the EC spike to it (Model UN → Georgetown SFS, journalism → Medill, debate
→ Cornell ILR) reinforces fit.

## Caveats & sourcing notes

- **Best-sourced (read directly from official .edu CDS PDFs):** Yale, Dartmouth, UChicago,
  Northwestern — and Harvard/Cornell for the figures pulled straight from their PDFs.
- **Aggregator-dependent (confirm against primary PDFs before publishing):** Princeton, Brown,
  Columbia, Penn, Stanford, Duke, Georgetown — direct PDF fetch was blocked or gated; figures
  are cross-consistent but should be verified. Flagged inline in the JSON: Duke SAT 25th
  (1500 vs 1490) and Georgetown SAT band (1400–1540 vs 1410–1560).
- **Cycle mismatch:** most figures are 2024–2025 CDS (Class of 2028); Dartmouth is newer
  (2025–26 / Class of 2029) and Columbia is older (2023–24 / Class of 2027, no newer
  undergraduate CDS posted).
- **Cornell's admit rate is genuinely unavailable** — Cornell suppresses applicant/admit
  counts. The ~8.4% figure is a third-party estimate, not official, and is recorded as
  `null` in the JSON.
- **No Reddit used.** Per the shared schema, sourcing relies on Common Data Sets, college
  sites, and reputable aggregators only.
