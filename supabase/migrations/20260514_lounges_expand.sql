-- ============================================================
-- Expand lounges catalog + tier infrastructure
--   1) Add is_premium boolean to lounges (default false). Tier flag for
--      future paywalled lounges.
--   2) Seed 17 additional free Public Lounges to bring the catalog to 21.
-- ============================================================

ALTER TABLE lounges
  ADD COLUMN IF NOT EXISTS is_premium boolean NOT NULL DEFAULT false;

INSERT INTO lounges (slug, name, subject_category, description, is_premium) VALUES
  ('sat',                     'SAT Lounge',                        'COLLEGE',    'Trap-list calibration. Reading misdirections, math grid-in traps, and the questions that quietly wreck good scores.',                false),
  ('admissions',              'Admissions Lounge',                 'COLLEGE',    'Strategy room for applicants who already know it''s hard. Activity positioning, school list logic, application timing, the parts your counselor doesn''t cover.', false),
  ('essay-writing',           'Essay & Writing Lounge',            'COLLEGE',    'Drafts that sound like a person, not a personal statement template. Openings, cuts, the line that makes a reader pause.',         false),
  ('college-results',         'College Results Lounge',            'COLLEGE',    'Decisions threads + breakdowns of why. Anonymized where useful. No glorifying — pattern recognition only.',                       false),
  ('summer-programs',         'Summer Programs Lounge',            'COLLEGE',    'RSI, MITES, SSP, Telluride, BLI, SHTEM, Garcia, Clark — what''s actually worth applying to and what gets people in.',           false),
  ('scholarship',             'Scholarship Lounge',                'COLLEGE',    'Major awards (Coca-Cola, Davidson, Regeneron prize, etc.) — what the winning applications actually looked like.',               false),

  ('research',                'Research Lounge',                   'TRACK',      'Independent research, lab cold emails, paper drafts, conference scrambles. Work-in-progress posts welcome.',                   false),
  ('cs-ai',                   'CS & AI Lounge',                    'TRACK',      'Building with code. ML experiments, side projects, the actual stack you use — not the one influencers say to use.',          false),
  ('pre-med',                 'Pre-med Lounge',                    'TRACK',      'Pre-med trajectory from AP Bio through clinical hours and MCAT. The non-obvious version of the path.',                         false),
  ('engineering',             'Engineering Lounge',                'TRACK',      'ECE, ME, CS, BME, AERO. What you''re building, what you wish you''d known, summer programs that actually move the needle.',     false),
  ('olympiad',                'Olympiad Lounge',                   'TRACK',      'USAMO, USAPHO, USABO, USACO, NACLO, USCO. Past medals are filters, not trophies — the work is what counts.',                  false),
  ('startup-projects',        'Startup & Projects Lounge',         'TRACK',      'Side projects shipping real users. Hackathon entries that became products. Build logs, founder questions, brutal feedback.',  false),

  ('productivity-study',      'Productivity & Study Lounge',       'COHORT',     'Systems that survive week 12 of a hard semester. What you actually do, not what you tell people you do.',                    false),
  ('international-students',  'International Students Lounge',     'COHORT',     'Visa, school choice, parents'' expectations, what a US application looks like from outside the US.',                          false),
  ('debate-humanities',       'Debate / Humanities Lounge',        'COHORT',     'Policy, LD, PF, philosophy, history. For the part of the cohort that argues for sport and writes for stakes.',                 false),
  ('qna',                     'Q&A Lounge',                        'COHORT',     'Generic asks that don''t fit anywhere else. Use sparingly — better to ask in the right room.',                                false),
  ('weekly-drops',            'Weekly Drops Lounge',               'COHORT',     'The cohort''s drops index — survival sheets, frameworks, top posts, mentor picks. Curated weekly.',                            false)
ON CONFLICT (slug) DO NOTHING;
