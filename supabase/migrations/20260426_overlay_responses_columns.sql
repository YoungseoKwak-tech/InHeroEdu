-- Add subject_id and concept_name to overlay_responses
ALTER TABLE overlay_responses ADD COLUMN IF NOT EXISTS subject_id text;
ALTER TABLE overlay_responses ADD COLUMN IF NOT EXISTS concept_name text;

-- student_id already exists as uuid — add text alias if needed
-- (existing column is uuid; the lib now writes via student_id field directly)
