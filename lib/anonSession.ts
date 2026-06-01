/**
 * lib/anonSession.ts
 *
 * Client-side anonymous attribution. On first visit we mint a UUID and
 * persist it in a long-lived cookie (`inhero_anon_id`). The same UUID is
 * sent on every anonymous attention_event POST so the funnel can be
 * stitched together pre- and post-signup.
 *
 * Cookie spec:
 *   name      inhero_anon_id
 *   value     RFC 4122 v4-ish UUID (`uuidish`)
 *   maxAge    1 year
 *   path      /
 *   sameSite  lax  (needed for OAuth round-trip back to /preview/...)
 *   secure    when on https
 *
 * No-op on SSR — every call is gated on `typeof document`.
 */

const COOKIE_NAME = "inhero_anon_id";
const MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

function uuidish(): string {
  const cryptoRef = typeof globalThis !== "undefined" ? globalThis.crypto : undefined;
  if (typeof cryptoRef?.randomUUID === "function") return cryptoRef.randomUUID();

  const bytes = new Uint8Array(16);
  if (typeof cryptoRef?.getRandomValues === "function") cryptoRef.getRandomValues(bytes);
  else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join("-");
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
}

/**
 * Returns the existing anon id, or mints a new one and persists it.
 * Safe to call repeatedly; only writes the cookie when one didn't exist.
 */
export function getOrCreateAnonId(): string | null {
  if (typeof document === "undefined") return null;
  const existing = readCookie(COOKIE_NAME);
  if (existing) return existing;
  const fresh = uuidish();
  writeCookie(COOKIE_NAME, fresh);
  return fresh;
}

/** Read without minting. Used in places where SSR-safe no-op is fine. */
export function readAnonId(): string | null {
  return readCookie(COOKIE_NAME);
}

/**
 * Clear the cookie. Called after merge_anon_into_user succeeds so the
 * post-signup client stops tagging events with the now-orphaned anon id.
 */
export function clearAnonId() {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
}
