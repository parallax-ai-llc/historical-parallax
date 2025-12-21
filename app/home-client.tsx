"use client";

import * as React from "react";
import { Search, GitPullRequest, MapIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchDialog, SearchItem } from "@/components/search-dialog";
import { RecentArticles } from "@/components/recent-articles";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArticleMeta } from "@/lib/articles";
import { createRandomStream, take } from "@/lib/lisp/utils";
import Link from "next/link";

interface HomeClientProps {
  articles: ArticleMeta[];
}

export function HomeClient({ articles }: HomeClientProps) {
  const [mounted, setMounted] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  // SearchDialog expects SearchItem[], which is compatible with ArticleMeta[] based on usage
  const searchItems: SearchItem[] = articles;
  const stream = createRandomStream(articles);
  const randomArticles = take(stream, 10);

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
          Contribute
        </Link>
        <Link
          href="/maps/ufo-mysteries"
          className="hidden sm:inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-9 w-9"
          title="View Incident Maps"
        >
          <MapIcon className="h-4 w-4" />
          <span className="sr-only">Maps</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-xl space-y-8 text-center">
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl leading-[1.2] min-h-[1.2em] text-primary">
              Historical Parallax
            </h1>
            <p className="text-muted-foreground text-sm md:text-base italic leading-relaxed">
              &ldquo;Every history creates a parallax&rdquo;
            </p>
            {articles.length > 0 && (
              <p className="mt-2 text-xs text-muted-foreground/60">
                {articles.length.toLocaleString()} documents archived
              </p>
            )}
          </div>

          <Button
            variant="outline"
            className="h-12 w-full justify-start px-4 text-muted-foreground"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="mr-3 h-5 w-5" />
            <span>Search articles...</span>
            <kbd className="pointer-events-none ml-auto hidden h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium sm:flex">
              <span>Ctrl</span>K
            </kbd>
          </Button>

          <RecentArticles articles={randomArticles} />
        </div>
      </main>

      <Footer />

      {mounted && (
        <div suppressHydrationWarning>
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} items={searchItems} />
        </div>
      )}
    </div>
  );
}
