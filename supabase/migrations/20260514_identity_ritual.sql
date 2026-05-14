-- ============================================================
-- Phase 6 — step 3: Identity ritual
--   Onboarding becomes a 4-step ritual. The last step asks 4 questions
--   that make the platform feel like an ambitious-student room, not a
--   signup form. Completing all 4 + being in the first 100 = Founding
--   Circle badge (tier above Founding Cohort).
-- ============================================================

ALTER TABLE profiles_public
  ADD COLUMN IF NOT EXISTS dream_school       text,
  ADD COLUMN IF NOT EXISTS intended_field     text,
  ADD COLUMN IF NOT EXISTS current_obsession  text,
  ADD COLUMN IF NOT EXISTS building_what      text;

-- Light length sanity (allow nulls so the ritual is opt-in for now).
ALTER TABLE profiles_public
  DROP CONSTRAINT IF EXISTS profiles_public_ritual_length_check;

ALTER TABLE profiles_public
  ADD CONSTRAINT profiles_public_ritual_length_check
  CHECK (
    (dream_school       IS NULL OR length(dream_school)       <= 120) AND
    (intended_field     IS NULL OR length(intended_field)     <= 120) AND
    (current_obsession  IS NULL OR length(current_obsession)  <= 240) AND
    (building_what      IS NULL OR length(building_what)      <= 400)
  );
