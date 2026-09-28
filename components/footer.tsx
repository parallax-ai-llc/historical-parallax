"use client";

import Link from "next/link";
import { useTranslations } from "@/components/i18n-provider";

type FooterLink = {
  href: string;
  /** literal label (brand names) — takes precedence over labelKey */
  label?: string;
  /** i18n key for translated labels */
  labelKey?: string;
  /** true for this site's own pages (rendered with next/link, same tab) */
  internal?: boolean;
};

// Parallax 서비스 — parallax.kr 하단 서비스 섹션과 동일한 순서, 끝에 graygate 추가
const SERVICE_LINKS: FooterLink[] = [
  { label: "Soulmate", href: "https://soulmate.parallax.kr" },
  { label: "Storage", href: "https://storage.parallax.kr" },
  { label: "Docs", href: "https://docs.parallax.kr" },
  { label: "Forms", href: "https://forms.parallax.kr" },
  { label: "Cloud", href: "https://cloud.parallax.kr" },
  { label: "DEX", href: "https://dex.parallax.kr" },
  { label: "Playground", href: "https://playground.parallax.kr" },
  { label: "Graygate", href: "https://graygate.app" },
];

const WIKI_LINKS: FooterLink[] = [
  { label: "Law", href: "https://legal.parallax.kr" },
  { label: "Truth", href: "https://truth.parallax.kr" },
  { label: "History", href: "/", internal: true },
  { label: "News", href: "https://pan.parallax.kr" },
  { label: "Orb", href: "https://orb.parallax.kr" },
];

const DOCUMENT_LINKS: FooterLink[] = [
  { labelKey: "footer.terms", href: "/terms-of-service", internal: true },
  { labelKey: "footer.privacy", href: "/privacy-policy", internal: true },
  { labelKey: "footer.contact", href: "https://cs.parallax.kr" },
  { labelKey: "footer.status", href: "https://status.parallax.kr" },
];

const linkClassName =
  "rounded-sm hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export function Footer() {
  const { t } = useTranslations();

  const sections = [
    { id: "services", title: t("footer.services"), links: SERVICE_LINKS },
    { id: "wiki", title: t("footer.wiki"), links: WIKI_LINKS },
    { id: "documents", title: t("footer.documents"), links: DOCUMENT_LINKS },
  ];

  return (
    <footer
      className="border-t border-border/40 py-10"
      role="contentinfo"
      aria-label={t("footer.footerAriaLabel")}
    >
      <div className="container flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 self-start rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand-mark.svg" alt="" width={24} height={24} className="size-6" />
            <span className="font-serif text-lg font-semibold">Historical Parallax</span>
          </Link>
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
        </div>
        <nav
          aria-label={t("footer.navAriaLabel")}
          className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:gap-16"
        >
          {sections.map((section) => (
            <div key={section.id}>
              <h2 id={`footer-${section.id}`} className="mb-3 font-semibold text-foreground">
                {section.title}
              </h2>
              <ul aria-labelledby={`footer-${section.id}`} className="flex flex-col gap-2 text-muted-foreground">
                {section.links.map((link) => {
                  const label = link.label ?? t(link.labelKey!);
                  return (
                    <li key={link.href}>
                      {link.internal ? (
                        <Link href={link.href} className={linkClassName}>
                          {label}
                        </Link>
                      ) : (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                          {label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
