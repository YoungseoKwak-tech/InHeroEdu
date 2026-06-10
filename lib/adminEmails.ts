/**
 * Single source of truth for admin emails, safe to import on the client
 * (no server-only deps). Server admin gating in lib/auth.ts also merges the
 * Vercel ADMIN_EMAILS env var; this base list is what the UI uses to grant
 * admins credit-free access to gated content.
 */
export const ADMIN_EMAILS_BASE = [
  "yk777@cornell.edu",
  "junginlee0904@gmail.com",
  "yeongseo0802@gmail.com",
];

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS_BASE.includes(email.trim().toLowerCase());
}
