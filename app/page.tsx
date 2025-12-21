"use client";

import * as React from "react";
import Link from "next/link";
import { Search, GitPullRequest } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchDialog, SearchItem } from "@/components/search-dialog";
import { RecentArticles, RecentArticle } from "@/components/recent-articles";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [mounted, setMounted] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchItems, setSearchItems] = React.useState<SearchItem[]>([]);
  const [recentArticles, setRecentArticles] = React.useState<RecentArticle[]>([]);

  React.useEffect(() => {
    setMounted(true);
    fetch("/api/search")
      .then((res) => res.json())
      .then((data) => {
        setSearchItems(data);
        setRecentArticles(data.slice(0, 10));
      })
      .catch(() => {
        setSearchItems([]);
        setRecentArticles([]);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="absolute right-4 top-4 z-50 flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/contribute">
            <GitPullRequest className="mr-2 h-4 w-4" />
            Contribute
          </Link>
        </Button>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-xl space-y-8 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
            Historical Parallax
          </h1>
          <p className="text-muted-foreground text-sm md:text-base italic">
            &ldquo;Every history creates a parallax&rdquo;
          </p>

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

          <RecentArticles articles={recentArticles} />
        </div>
      </main>

      <Footer />

      {/* 클라이언트에서만 SearchDialog 렌더링 */}
      {mounted && (
        <SearchDialog
          open={searchOpen}
          onOpenChange={setSearchOpen}
          items={searchItems}
        />
      )}
    </div>
  );
}


