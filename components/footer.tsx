"use client";

import Link from "next/link";
import { useTranslations } from "@/components/i18n-provider";

export function Footer() {
  const { t } = useTranslations();

  return (
    <footer
      className="border-t border-border/40 py-6"
      role="contentinfo"
      aria-label={t("footer.footerAriaLabel")}
    >
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          {t("footer.poweredBy")}{" "}
          <a
            href="https://parallax.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label={t("footer.poweredByAriaLabel")}
          >
            Parallax AI, LLC
          </a>
        </p>
        <nav
          aria-label={t("footer.navAriaLabel")}
          className="flex items-center gap-4 text-sm text-muted-foreground"
        >
          <a
            href="https://legal.parallax.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {t("footer.legal")}
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
            {t("footer.terms")}
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {t("footer.privacy")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
