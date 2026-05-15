-- ============================================================
-- Resource folder taxonomy: collapse 11 doc groups down to 6.
--
-- Storage shape: chat_messages.attachment_meta is JSONB, the .group key holds
-- the folder slug. This migration only rewrites those JSON values; no schema
-- changes. Wrapped in a transaction — ROLLBACK if the post-check counts look
-- wrong. Idempotent: re-running after a clean pass is a no-op.
-- ============================================================

BEGIN;

-- Pre-check (eyeball this before COMMIT):
-- SELECT attachment_meta->>'group' AS slug, COUNT(*) AS n
-- FROM chat_messages
-- WHERE attachment_meta ? 'group'
-- GROUP BY 1 ORDER BY 2 DESC;

-- field-manuals, lecture-notes, survival-sheets → notes
-- Deprecated catch-all: mentor-archives, research-vault, founder-systems → notes
UPDATE chat_messages
SET attachment_meta = jsonb_set(attachment_meta, '{group}', '"notes"')
WHERE attachment_meta->>'group' IN (
  'field-manuals', 'lecture-notes', 'survival-sheets',
  'mentor-archives', 'research-vault', 'founder-systems'
);

UPDATE chat_messages
SET attachment_meta = jsonb_set(attachment_meta, '{group}', '"visual-guides"')
WHERE attachment_meta->>'group' = 'mechanism-maps';

UPDATE chat_messages
SET attachment_meta = jsonb_set(attachment_meta, '{group}', '"practice-frqs"')
WHERE attachment_meta->>'group' = 'problem-sets';

UPDATE chat_messages
SET attachment_meta = jsonb_set(attachment_meta, '{group}', '"study-plans"')
WHERE attachment_meta->>'group' = 'blueprint-archives';

UPDATE chat_messages
SET attachment_meta = jsonb_set(attachment_meta, '{group}', '"essays-writing"')
WHERE attachment_meta->>'group' = 'admissions-intelligence';

UPDATE chat_messages
SET attachment_meta = jsonb_set(attachment_meta, '{group}', '"this-week"')
WHERE attachment_meta->>'group' = 'weekly-drops';

-- Post-check (should show only the 6 new slugs, or none if no uploads yet):
-- SELECT attachment_meta->>'group' AS slug, COUNT(*) AS n
-- FROM chat_messages
-- WHERE attachment_meta ? 'group'
-- GROUP BY 1 ORDER BY 2 DESC;

COMMIT;
