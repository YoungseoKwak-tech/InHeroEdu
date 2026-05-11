/**
 * Complimentary textbook access — env allowlist + DB allowlist.
 *
 * Layers (any match grants comp access):
 *   1. ADMIN_EMAILS env (auto-included)
 *   2. COMP_TEXTBOOK_EMAILS env (static, requires redeploy to change)
 *   3. textbook_comp_emails DB table (managed via /admin/comp-emails)
 *
 * Server-side only — never expose to the client.
 */

import { createAdminClient } from "@/lib/supabase";

function parseEmailList(raw: string | undefined): string[] {
  return (raw ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getStaticCompEmails(): string[] {
  const comp = parseEmailList(process.env.COMP_TEXTBOOK_EMAILS);
  const admins = parseEmailList(process.env.ADMIN_EMAILS ?? "yk777@cornell.edu");
  return Array.from(new Set([...comp, ...admins]));
}

function normalize(email: string | null | undefined): string | null {
  if (!email) return null;
  const trimmed = email.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : null;
}

export async function hasComplimentaryTextbookAccess(
  email: string | null | undefined
): Promise<boolean> {
  const normalized = normalize(email);
  if (!normalized) return false;

  // Layer 1+2: env-driven
  if (getStaticCompEmails().includes(normalized)) return true;

  // Layer 3: DB allowlist (admin-managed)
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("textbook_comp_emails")
      .select("email")
      .eq("email", normalized)
      .maybeSingle();
    if (error) {
      // Missing table or transient error — fall back to env-only.
      return false;
    }
    return !!data;
  } catch {
    return false;
  }
}

export interface CompEmailRow {
  email: string;
  note: string | null;
  added_by: string | null;
  created_at: string;
}

export async function listDbCompEmails(): Promise<CompEmailRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("textbook_comp_emails")
    .select("email, note, added_by, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as CompEmailRow[];
}

export async function addDbCompEmail(args: {
  email: string;
  note?: string | null;
  addedBy: string;
}): Promise<CompEmailRow> {
  const email = normalize(args.email);
  if (!email) throw new Error("email is required");
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("textbook_comp_emails")
    .upsert(
      {
        email,
        note: args.note?.trim() || null,
        added_by: args.addedBy,
      },
      { onConflict: "email" }
    )
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as CompEmailRow;
}

export async function removeDbCompEmail(emailRaw: string): Promise<void> {
  const email = normalize(emailRaw);
  if (!email) throw new Error("email is required");
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("textbook_comp_emails")
    .delete()
    .eq("email", email);
  if (error) throw new Error(error.message);
}
