-- ============================================================
-- admin_notifications: append-only feed for admin alerts.
-- A trigger on chat_messages writes a denormalized row each time a real
-- user posts in a lounge or club. The bell API reads from this table,
-- gated by isAdminEmail() on the server — no per-row recipient column,
-- so a single admin list (ADMIN_EMAILS env) remains the source of truth.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.admin_notifications (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source                 text NOT NULL,
  context_type           text,
  context_id             uuid,
  context_slug           text,
  context_name           text,
  source_id              uuid,
  preview_author_handle  text,
  preview_text           text,
  is_read                boolean NOT NULL DEFAULT false,
  created_at             timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS admin_notifications_unread_idx
  ON public.admin_notifications (created_at DESC)
  WHERE is_read = false;

CREATE INDEX IF NOT EXISTS admin_notifications_created_idx
  ON public.admin_notifications (created_at DESC);

ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access — admin_notifications" ON public.admin_notifications;
CREATE POLICY "Service role full access — admin_notifications"
  ON public.admin_notifications
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Trigger function: write a notification row for each non-system chat
-- message authored by a real user. We do NOT filter by author = admin
-- here because the bell API drops admin-authored rows at read time;
-- doing it in SQL would require hardcoding the admin uuid.
CREATE OR REPLACE FUNCTION public.notify_admin_on_chat_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  ctx_slug text;
  ctx_name text;
  handle   text;
BEGIN
  IF NEW.author_id IS NULL OR NEW.type = 'system' OR NEW.is_deleted = true THEN
    RETURN NEW;
  END IF;

  IF NEW.context_type = 'lounge' THEN
    SELECT slug, name INTO ctx_slug, ctx_name
    FROM public.lounges WHERE id = NEW.context_id;
  ELSIF NEW.context_type = 'club' THEN
    SELECT slug, name INTO ctx_slug, ctx_name
    FROM public.clubs WHERE id = NEW.context_id;
  END IF;

  SELECT display_handle INTO handle
  FROM public.profiles_public
  WHERE user_id = NEW.author_id;

  INSERT INTO public.admin_notifications (
    source,
    context_type, context_id, context_slug, context_name,
    source_id,
    preview_author_handle, preview_text
  ) VALUES (
    'chat_message',
    NEW.context_type, NEW.context_id, ctx_slug, ctx_name,
    NEW.id,
    handle,
    LEFT(COALESCE(NEW.content, ''), 140)
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_admin_notifications_on_chat ON public.chat_messages;
CREATE TRIGGER trg_admin_notifications_on_chat
  AFTER INSERT ON public.chat_messages
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_on_chat_message();
