# Top public universities — admit benchmarks

*Stream: `top-publics` · generated 2026-06-14 · 10 schools*

This brief covers admit benchmarks for ten of the most-targeted U.S. public
universities, with **out-of-state and international** figures surfaced wherever
the schools publish them — the numbers that matter most for InHero's Korean
international-applicant families. Every numeric figure in `top-publics.json` is
sourced; this file is the human-readable analysis.

## The four things parents should internalize

### 1. The "overall admit rate" is a trap for non-residents
Public universities are mandated (often by state law) to favor in-state students,
so the headline rate dramatically overstates the odds for out-of-state and
international applicants:

| School | In-state | Out-of-state | International |
|---|---|---|---|
| UC Berkeley | 14.9% | 7.3% | 5.5% |
| UCSD | 26% | 34%* | 22% |
| UVA | ~23% | ~9% | (bundled w/ OOS) |
| UNC-Chapel Hill | ~38% | ~8% | — (OOS capped at ~18% by NC law) |
| Georgia Tech | ~30% | ~9% | — |
| UIUC | 49.3% | 29% | 30.5% |
| UT Austin | — (top 6%→5% auto-admit) | ~10% | — (~90% seats reserved in-state) |

\*UCSD is the exception where OOS were admitted at a *higher* rate than residents in Fall 2024.

For most of these schools an international applicant faces a pool less than half
as forgiving as the published rate. UNC and UT Austin are the starkest: state law
caps non-resident enrollment (~18% at UNC; ~90% of seats reserved for Texas
residents at UT).

### 2. "Admission by major" hides the real bar for STEM
At several schools you don't apply to the university — you apply to a major, and
the competitive ones run far below the headline:

- **UIUC**: overall 36.6%, but **pure Computer Science ~7%** — more selective than most Ivies. Grainger Engineering ~21%, Gies Business ~21%.
- **UT Austin**: overall ~22%, but **CS ~8–9%** at the major level. A Texas auto-admit is *not* guaranteed their first-choice major.
- **Georgia Tech**: ~44% of admits intend engineering, so the CS/engineering pool is effectively tighter than the 12.7% campus rate.

A strong general profile is not enough; the target major is the gate.

### 3. Test policy now splits the top publics three ways
- **Test-free / test-blind (scores not used at all):** UC Berkeley, UCLA, UCSD — permanent UC Regents policy since Fall 2021. GPA + PIQ essays + activities carry the *entire* academic signal; there is no test score to offset a weaker GPA.
- **Required:** Georgia Tech (continued; USG system mandate from Fall 2026) and UT Austin (reinstated Fall 2025 — required even for auto-admits).
- **Test-optional:** Michigan (permanent, from winter 2025 matriculation), UVA (through Fall 2026), UNC (but applicants with weighted GPA below 2.8 *must* test), UIUC (through Fall 2026), UW-Madison (locked through spring 2027; self-reported scores not accepted).

For the test-optional schools, a strong submitted score still differentiates with
no penalty for withholding — submission rates are well below 100% (UW only
~15% SAT / ~29% ACT).

### 4. Selectivity is rising fast
Georgia Tech hit a record-low 12.7%. UCLA is the most-applied-to university in the
U.S. (~173k applications) and holds near 9%. UT Austin applications jumped +24%
year over year. UIUC fell from 63% (2020) to 37% (2025). The trend line is down
across the board.

## Per-school quick reference

- **UC Berkeley** — 11.4% overall (CA 14.9 / OOS 7.3 / intl 5.5). Test-blind; weighted GPA mid-50% ~4.12–4.29. EECS, Engineering, Haas. EECS far below campus rate.
- **UCLA** — ~9% overall, most-applied-to U.S. university. Test-blind; official avg unweighted GPA 3.95. Psychology, Economics, Bio.
- **UCSD** — ~27% overall (CA 26 / OOS 34 / intl 22). Test-blind; weighted GPA mid-50% ~4.11–4.29. Bioengineering, CS, Cognitive Science, Scripps.
- **Michigan** — ~16% overall on ~98k apps. Test-optional; SAT mid-50% 1360–1530, ACT 31–34. Ross (#4 undergrad business), Engineering, CS.
- **UVA** — ~16.8% overall (in-state ~23 / OOS ~9). Test-optional; SAT 1410–1520, ACT 32–35; 84% top-tenth. McIntire is #1 public undergrad business (separate internal admit ~5.5%).
- **UNC-Chapel Hill** — 15.3% overall (in-state ~38 / OOS ~8). Test-optional w/ a sub-2.8-GPA testing trigger; SAT 1400–1530, ACT 28–34; avg GPA 4.49. Kenan-Flagler, Hussman journalism, public health.
- **Georgia Tech** — 12.7% overall (in-state ~30 / OOS ~9), record low. Test **required**; SAT 1370–1530, ACT 30–34; weighted GPA 4.14. CS and Engineering.
- **UT Austin** — ~22% overall (OOS ~10). Test **required** (reinstated Fall 2025); rank-based auto-admit top 6%→5%; SAT ~1230–1490, ACT 27–33. CS, Cockrell Engineering, McCombs.
- **UIUC** — 36.6% overall (IL 49.3 / OOS 29 / intl 30.5). Test-optional; SAT 1390–1520, ACT 30–34. CS ~7% at major level, Grainger Engineering, Gies Business.
- **UW-Madison** — ~45% overall. Test-optional (through spring 2027); SAT 1370–1490, ACT 29–33. "Wisconsin Guarantee" admits in-state top 5%. CS, Business (#1 undergrad Real Estate).

## Caveats

- **Sourcing depth:** WebFetch and direct PDF download were blocked in this run, so exact CDS C9 (SAT/ACT 25/50/75) and C12 (GPA/rank) line items came from search summaries and reputable aggregators quoting the official Common Data Sets — not from opening the primary PDFs. The official CDS URLs are cited per school in the JSON and should be opened to verify exact digits before showing any figure to families.
- **UC test fields are intentionally null** — that is a policy fact (test-blind), not missing data.
- **p50 is often null** where only a discrete middle-50% (p25/p75) range was published. UVA in-state/OOS rates vary by cycle and by whether "international" is bundled with out-of-state; treat the ~23% / ~9% split as approximate.
