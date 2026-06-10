import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

const AUTH_USER_TIMEOUT_MS = 5_000;

// Owner-email fallback — these two accounts are always treated as
// admin, regardless of environment. The Vercel ADMIN_EMAILS env var
// can still extend the list for other team members without touching
// code.
const OWNER_EMAIL_FALLBACK = "yk777@cornell.edu,junginlee0904@gmail.com,yeongseo0802@gmail.com";

const ADMIN_EMAILS = (
  [process.env.ADMIN_EMAILS ?? "", OWNER_EMAIL_FALLBACK].join(",")
)
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const ADMIN_ROLE_VALUES = (process.env.ADMIN_ROLE_VALUES ?? "admin,owner,super_admin")
  .split(",")
  .map((value) => value.trim().toLowerCase())
  .filter(Boolean);

export interface AuthedUser {
  id: string;
  email: string | null;
}

type MetadataShape = {
  role?: unknown;
  roles?: unknown;
  is_admin?: unknown;
};

function getBearerToken(req: Request | NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice("Bearer ".length).trim();
}

async function getUserWithTimeout(token: string) {
  const supabase = createAdminClient();
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  try {
    return await Promise.race([
      supabase.auth.getUser(token),
      new Promise<null>((resolve) => {
        timeoutId = setTimeout(() => resolve(null), AUTH_USER_TIMEOUT_MS);
      }),
    ]);
  } catch (err) {
    console.warn("[auth] Supabase getUser failed", err);
    return null;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function getAuthenticatedUser(
  req: Request | NextRequest
): Promise<AuthedUser | null> {
  const token = getBearerToken(req);
  if (!token) return null;

  const authResult = await getUserWithTimeout(token);
  const user = authResult?.data.user ?? null;

  if (!user) return null;
  return { id: user.id, email: user.email ?? null };
}

export async function requireAuthenticatedUser(
  req: Request | NextRequest
): Promise<AuthedUser | NextResponse> {
  const user = await getAuthenticatedUser(req);
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return user;
}

export async function requireAdminUser(
  req: Request | NextRequest
): Promise<AuthedUser | NextResponse> {
  const token = getBearerToken(req);
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const authResult = await getUserWithTimeout(token);
  const user = authResult?.data.user ?? null;

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const appMeta = (user.app_metadata ?? {}) as MetadataShape;
  const userMeta = (user.user_metadata ?? {}) as MetadataShape;
  const hasAdminClaim =
    metadataHasAdminClaim(appMeta) ||
    metadataHasAdminClaim(userMeta) ||
    (!!user.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));

  if (!hasAdminClaim) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  return { id: user.id, email: user.email ?? null };
}

function metadataHasAdminClaim(meta: MetadataShape): boolean {
  if (meta.is_admin === true) return true;

  if (typeof meta.role === "string" && ADMIN_ROLE_VALUES.includes(meta.role.toLowerCase())) {
    return true;
  }

  if (Array.isArray(meta.roles)) {
    return meta.roles.some(
      (role) => typeof role === "string" && ADMIN_ROLE_VALUES.includes(role.toLowerCase())
    );
  }

  return false;
}
