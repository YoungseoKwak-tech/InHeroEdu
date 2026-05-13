-- Wave B: 3 more lounges to expand beyond AP Bio.
INSERT INTO lounges (slug, name, subject_category, description) VALUES
  (
    'ap-chem',
    'AP Chemistry Lounge',
    'AP',
    'Equilibrium, kinetics, thermo, redox — the cohort''s common room for AP Chem. Drop the trap you almost fell for. Find the explanation that actually clicks.'
  ),
  (
    'ap-physics',
    'AP Physics Lounge',
    'AP',
    'Mechanics through E&M. For students who want to see the derivation, not just memorize the formula. Bring your hardest problem.'
  ),
  (
    'ap-calc-bc',
    'AP Calc BC Lounge',
    'AP',
    'Series, convergence, parametrics, polar — and the harder problems your textbook ducks. Show your work, get a real critique.'
  )
ON CONFLICT (slug) DO NOTHING;
