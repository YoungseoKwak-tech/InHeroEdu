-- Backfill resource IDs onto chat messages so lounge attachments can
-- jump into /library/[id]/read even if a client rehydrates from
-- chat_messages alone.

UPDATE public.chat_messages AS m
SET attachment_meta =
  COALESCE(m.attachment_meta, '{}'::jsonb)
  || jsonb_build_object('resourceId', r.id)
FROM public.lounge_resources AS r
WHERE r.chat_message_id = m.id
  AND m.context_type = 'lounge'
  AND m.type IN ('image', 'file')
  AND m.attachment_url IS NOT NULL
  AND COALESCE(m.attachment_meta->>'resourceId', '') <> r.id::text;

-- Any older attachment that never got a lounge_resources mirror can still
-- route into the reader by using the chat message id as the fallback key.
UPDATE public.chat_messages AS m
SET attachment_meta =
  COALESCE(m.attachment_meta, '{}'::jsonb)
  || jsonb_build_object('resourceId', m.id)
WHERE m.context_type = 'lounge'
  AND m.type IN ('image', 'file')
  AND m.attachment_url IS NOT NULL
  AND m.attachment_meta ? 'group'
  AND COALESCE(m.attachment_meta->>'resourceId', '') = '';
