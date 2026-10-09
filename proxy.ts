import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, locales, type Locale } from "./app/i18n/config";

/** The visitor's language: saved choice → browser language → English. */
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;

  const header = request.headers.get("accept-language") ?? "";
  // e.g. "fr-FR,fr;q=0.9,en;q=0.8" → ["fr", "fr", "en"] in order of preference
  for (const part of header.split(",")) {
    const code = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    if (isLocale(code)) return code;
  }
  return defaultLocale;
}

/**
 * Adds the language to addresses that don't have one:
 * "/" → "/fr", "/products" → "/en/products".
 * Unknown addresses ("/old-page.html", "/api") get one too, so they end on
 * our own "Page not found" (app/[lang]/not-found.tsx) in the right language.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Runs on every address except Next.js internals and our real files:
  // public/brand/*, public/products/imara-afya/* and the icons, sitemap and
  // robots made by app/. Add new top-level files or folders in public/ here.
  matcher: [
    "/((?!_next/|brand/|products/imara-afya/|icon\\.png|apple-icon\\.png|sitemap\\.xml|robots\\.txt|favicon\\.ico).*)",
  ],
};
