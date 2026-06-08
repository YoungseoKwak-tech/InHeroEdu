/**
 * Special author personas — map a user_id (or a reserved nickname) to a
 * branded display name + badge in community surfaces (입시 Q&A 등).
 *
 * The founder account answers the parent forum as "코넬맘" (Cornell mom) with a
 * 👑 crown. Keyed by the real auth user_id so it follows the account, plus the
 * reserved nickname so already-seeded posts render the same.
 */

export interface SpecialAuthor {
  name: string;
  crown: boolean;
}

const BY_USER_ID: Record<string, SpecialAuthor> = {
  // yeongseo0802@gmail.com
  "01daac2b-7ab9-4337-88ec-ed428a221cb7": { name: "코넬맘", crown: true },
};

const BY_NICKNAME: Record<string, SpecialAuthor> = {
  "코넬맘": { name: "코넬맘", crown: true },
};

const BY_EMAIL: Record<string, SpecialAuthor> = {
  "yeongseo0802@gmail.com": { name: "코넬맘", crown: true },
};

/** Resolve the display name + crown for an author, falling back to the nickname. */
export function resolveAuthor(opts: { userId?: string | null; nickname?: string | null }): SpecialAuthor {
  if (opts.userId && BY_USER_ID[opts.userId]) return BY_USER_ID[opts.userId];
  if (opts.nickname && BY_NICKNAME[opts.nickname]) return BY_NICKNAME[opts.nickname];
  return { name: opts.nickname || "익명", crown: false };
}

/**
 * Persona for a signed-in account by email — used at POST time so everything
 * this account writes is authored as the persona (코넬맘) regardless of the
 * client-stored nickname/user_id.
 */
export function specialAuthorForEmail(email?: string | null): SpecialAuthor | null {
  if (!email) return null;
  return BY_EMAIL[email.toLowerCase()] ?? null;
}
