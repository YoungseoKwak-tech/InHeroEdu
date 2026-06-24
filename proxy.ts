import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Locale injection for SSR.
 *
 * The root layout's `cookies()` read does not reliably surface the
 * `inhero_lang` cookie into server rendering on Vercel, so a returning
 * Korean visitor's first paint was English (then the client reconciled —
 * a visible flash). Middleware, however, reads request cookies reliably,
 * so we read the locale here and forward it as the `x-inhero-lang` request
 * header. The layout reads that header (see app/layout.tsx) and renders the
 * correct language server-side — no flash.
 */
export function proxy(request: NextRequest) {
  const langCookie = request.cookies.get("inhero_lang")?.value;
  const lang = langCookie === "ko" ? "ko" : "en";

  // Korean inbound (e.g. the Korean Google result for inheroedu.com) should land
  // on the Korean parent portal, not the English student home. A returning
  // Korean visitor (cookie=ko) or a first-timer whose browser prefers Korean
  // (Accept-Language ko) is redirected from the root to /parents. Explicitly
  // choosing English (cookie=en) opts out, so the student home stays reachable.
  if (request.nextUrl.pathname === "/") {
    const acceptsKo = (request.headers.get("accept-language")?.toLowerCase() ?? "").startsWith("ko");
    if (langCookie === "ko" || (!langCookie && acceptsKo)) {
      return NextResponse.redirect(new URL("/parents", request.url), 307);
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-inhero-lang", lang);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Run on page routes only: skip Next internals, API routes, and any file
  // with an extension (static assets). Keeps the middleware cheap.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/|.*\\..*).*)"],
};
