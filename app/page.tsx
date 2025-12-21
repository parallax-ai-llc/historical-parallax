"use client"

import * as React from "react"
import { Search, GitPullRequest } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchDialog, SearchItem } from "@/components/search-dialog"
import { RecentArticles, RecentArticle } from "@/components/recent-articles"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [mounted, setMounted] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchItems, setSearchItems] = React.useState<SearchItem[]>([])
  const [recentArticles, setRecentArticles] = React.useState<RecentArticle[]>([])

  React.useEffect(() => {
    console.log("HomePage Mounted at:", new Date().toISOString())
    setMounted(true);
    fetch(`/api/search`)
      .then((res) => res.json())
      .then((data) => {
        setSearchItems(data)
        setRecentArticles(data.slice(0, 10))
      })
      .catch(() => {
        setSearchItems([])
        setRecentArticles([])
      })
  }, [])

  return (
    <div className="flex min-h-screen flex-col" suppressHydrationWarning>
      <header className="absolute right-4 top-4 z-50 flex items-center gap-2" suppressHydrationWarning>
        <a
          href="/contribute"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
        >
          <GitPullRequest className="h-4 w-4" />
          Contribute
        </a>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-xl space-y-8 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl leading-[1.2] min-h-[1.2em] text-primary">
            Historical Parallax
          </h1>
          <p className="text-muted-foreground text-sm md:text-base italic leading-relaxed min-h-[1.625em]">
            &ldquo;Every history creates a parallax&rdquo;
          </p>

          {/* <Button
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

          <RecentArticles articles={recentArticles} /> */}
        </div>
      </main>

      <Footer />

      {/* 클라이언트에서만 SearchDialog 렌더링 */}
      {mounted && (
        <div suppressHydrationWarning>
          <SearchDialog
            open={searchOpen}
            onOpenChange={setSearchOpen}
            items={searchItems}
          />
        </div>
      )}
    </div>
  )
}
