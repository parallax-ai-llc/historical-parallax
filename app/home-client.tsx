"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Search, GitPullRequest, MapIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { RecentArticles, RecentArticle } from "@/components/recent-articles";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/i18n-provider";

// Code-split the search dialog (cmdk + radix dialog) out of the initial
// bundle; it only loads on the client, after hydration / when first needed.
const SearchDialog = dynamic(
  () => import("@/components/search-dialog").then((m) => m.SearchDialog),
  { ssr: false }
);

interface HomeClientProps {
  recentArticles: RecentArticle[];
  totalCount: number;
}

export function HomeClient({ recentArticles, totalCount }: HomeClientProps) {
  const [mounted, setMounted] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const { t } = useTranslations();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="absolute right-4 top-4 z-50 flex items-center gap-2">
        <Link
          href="/contribute"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
        >
          <GitPullRequest className="h-4 w-4" />
          {t("header.contribute")}
        </Link>
        <Link
          href="/maps/china-history"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-9 w-9"
          title={t("maps.viewMaps")}
        >
          <MapIcon className="h-4 w-4" />
          <span className="sr-only">{t("header.maps")}</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex min-h-screen flex-1 flex-col items-center justify-center px-4 md:min-h-0">
        <div className="w-full max-w-xl space-y-8 text-center">
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl leading-[1.2] min-h-[1.2em] text-primary">
              {t("common.siteName")}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base italic leading-relaxed">
              &ldquo;{t("common.tagline")}&rdquo;
            </p>
            {totalCount > 0 && (
              <p className="mt-2 text-xs text-muted-foreground/60">
                {t("home.documentsArchived", { count: totalCount.toLocaleString() })}
              </p>
            )}
          </div>

          <Button
            variant="outline"
            className="h-12 w-full justify-start px-4 text-muted-foreground"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="mr-3 h-5 w-5" />
            <span>{t("home.searchPlaceholder")}</span>
            <kbd className="pointer-events-none ml-auto hidden h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium sm:flex">
              <span>Ctrl</span>K
            </kbd>
          </Button>

          <RecentArticles articles={recentArticles} />
        </div>

        <a
          href="https://www.producthunt.com/products/parallax-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-historical-parallax"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Historical Parallax - Explore historical figures & events from every perspective | Product Hunt"
            width={250}
            height={54}
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1168025&theme=light&t=1781059394753"
          />
        </a>
      </main>

      <Footer />

      {mounted && (
        <div suppressHydrationWarning>
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        </div>
      )}
    </div>
  );
}
