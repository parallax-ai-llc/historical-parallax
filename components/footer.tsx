"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border/40 py-6" role="contentinfo" aria-label={t("footerAriaLabel")}>
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          {t("poweredBy")}{" "}
          <a
            href="https://parallax.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label={t("poweredByAriaLabel")}
          >
            Parallax AI, LLC
          </a>
        </p>
        <nav
          aria-label={t("navAriaLabel")}
          className="flex items-center gap-4 text-sm text-muted-foreground"
        >
          <a
            href="https://legal.parallax.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {t("legal")}
          </a>
          <a
            href="https://truth.parallax.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Truth Parallax
          </a>
          <Link
            href="/terms-of-service"
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {t("terms")}
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {t("privacy")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
