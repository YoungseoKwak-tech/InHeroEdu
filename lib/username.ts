// Shared username utility (localStorage-based, no auth required)
export const USERNAME_KEY = "inhero_username";
export const USERID_KEY   = "inhero_userid";

export function getStoredUsername(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(USERNAME_KEY) ?? "";
}

export function getStoredUserId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(USERID_KEY);
  if (!id) {
    id = `u_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(USERID_KEY, id);
  }
  return id;
}

export function saveUsername(name: string) {
  localStorage.setItem(USERNAME_KEY, name.trim());
}
