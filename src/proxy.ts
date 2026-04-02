import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "th"];
const defaultLocale = "th";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    // Read the locale preference from the NEXT_LOCALE cookie set by LanguageSwitcher
    // Or kumopack_lang if they have an old cookie
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value || request.cookies.get("kumopack_lang")?.value;
    const locale = cookieLocale && locales.includes(cookieLocale) ? cookieLocale : defaultLocale;

    const url = new URL(
      `/${locale}${pathname === "/" ? "" : pathname}`,
      request.url,
    );

    request.nextUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    return NextResponse.redirect(url);
  }
}

export const proxyConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
