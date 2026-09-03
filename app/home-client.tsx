"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Search, GitPullRequest, MapIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { RecentArticles, RecentArticle } from "@/components/recent-articles";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { GraygateMark } from "@/components/graygate-mark";
import { cn } from "@/lib/utils";
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
          href="https://graygate.app/?utm_source=historical-parallax&utm_medium=cta&utm_campaign=get-graygate"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get graygate — end-to-end encrypted messenger"
          className={cn(
            "group mt-12 inline-flex h-12 items-center gap-3 rounded-full border pl-3 pr-5",
            "font-graygate text-[1.35rem] leading-none tracking-wide [font-variation-settings:'opsz'_72]",
            "transition-all duration-200 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
            // 라이트 모드 시안: graygate 브랜드 다크 배경 + 아이보리 잉크 (graygate.app 원본 룩)
            "border-[#0b0d12] bg-[#0b0d12] text-[#E8EAF2] shadow-[0_8px_24px_-12px_rgba(11,13,18,0.7)]",
            "hover:-translate-y-0.5 hover:bg-[#161a24] hover:shadow-[0_14px_28px_-12px_rgba(11,13,18,0.8)]",
            // 다크 모드 시안: 아이보리 배경 + 다크 잉크 (반전 로크업), 은은한 글로우
            "dark:border-[#E8EAF2]/80 dark:bg-[#E8EAF2] dark:text-[#0b0d12] dark:shadow-[0_0_0_1px_rgba(232,234,242,0.15),0_10px_30px_-14px_rgba(232,234,242,0.45)]",
            "dark:hover:bg-white dark:hover:shadow-[0_0_0_1px_rgba(232,234,242,0.3),0_16px_36px_-14px_rgba(232,234,242,0.6)]"
          )}
        >
          <GraygateMark className="size-7 shrink-0 transition-transform duration-300 group-hover:rotate-12" />
          <span className="flex items-baseline gap-1.5">
            <span className="font-medium">Get</span>
            <span className="font-bold uppercase tracking-[0.12em]">graygate</span>
          </span>
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
