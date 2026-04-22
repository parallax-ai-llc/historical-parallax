import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - API routes
    // - Next.js internals (_next/static, _next/image)
    // - Static assets (favicon, images, etc.)
    "/((?!api|_next/static|_next/image|favicon|.*\\.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webmanifest|robots\\.txt|sitemap\\.xml).*)",
  ],
};
