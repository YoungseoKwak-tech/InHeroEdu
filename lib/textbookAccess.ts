/**
 * Complimentary textbook access — env-driven allowlist.
 *
 * Set the env var `COMP_TEXTBOOK_EMAILS` to a comma-separated list of
 * emails that should see every published textbook as already purchased,
 * with no payment required. Admins (`ADMIN_EMAILS`) are auto-included.
 *
 * Example:
 *   COMP_TEXTBOOK_EMAILS=friend@x.com, tester@y.com
 *
 * This is a server-side helper — never expose it to the client.
 */

function parseEmailList(raw: string | undefined): string[] {
  return (raw ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function getCompEmails(): string[] {
  const comp = parseEmailList(process.env.COMP_TEXTBOOK_EMAILS);
  const admins = parseEmailList(process.env.ADMIN_EMAILS ?? "yk777@cornell.edu");
  return Array.from(new Set([...comp, ...admins]));
}

export function hasComplimentaryTextbookAccess(
  email: string | null | undefined
): boolean {
  if (!email) return false;
  return getCompEmails().includes(email.trim().toLowerCase());
}
