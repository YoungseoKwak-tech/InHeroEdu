/**
 * Lounge access gate.
 *
 * Posting / chatting in lounges ("chat with Ivy League mentors") is an
 * Elite perk: it requires at least One Subject Elite ($49/mo,
 * one_subject:* order) or All Subjects Elite ($199/mo, all_subjects /
 * novapass). Reading lounges stays open to every signed-in member — only
 * the WRITE actions (send message, post, comment, upload) are gated.
 *
 * Honors comp emails / admins and the FREE_FOR_ALL flag, same as the
 * course + textbook gates, so a comp account or a fully-open launch is
 * never accidentally locked out.
 *
 * Server-side only.
 */
import { createAdminClient } from "@/lib/supabase";
import { FREE_FOR_ALL } from "@/lib/config";
import { isAdminEmail } from "@/lib/auth";
import { hasComplimentaryTextbookAccess } from "@/lib/textbookAccess";
import { listStoredOrdersForUser } from "@/lib/orderStore";

export async function hasLoungeAccess(
  userId: string,
  email: string | null | undefined
): Promise<boolean> {
  // Open launch — everyone in.
  if (FREE_FOR_ALL) return true;

  // Admins / comp accounts always in (mirrors course + textbook gates).
  if (isAdminEmail(email)) return true;
  if (await hasComplimentaryTextbookAccess(email)) return true;

  try {
    const supabase = createAdminClient();
    const orders = await listStoredOrdersForUser(supabase, userId);
    return orders.some((order) => {
      if (order.status !== "paid") return false;
      const serviceId = order.serviceId.toLowerCase();
      if (!serviceId) return false;
      const base = serviceId.split(":")[0];
      // Any Elite plan (one subject or all subjects) unlocks lounges.
      return base === "one_subject" || base === "all_subjects" || base === "novapass";
    });
  } catch {
    // Fail closed on a transient orders error — a paying member can retry,
    // a free user shouldn't slip through.
    return false;
  }
}

/** Standard 403 body the lounge write routes return when access is denied. */
export const loungeLockedResponse = {
  error: "elite_required",
  message:
    "Lounge chat is an Elite perk. Upgrade to One Subject Elite ($49/mo) or All Subjects ($199/mo) to post and chat with Ivy League mentors.",
} as const;
