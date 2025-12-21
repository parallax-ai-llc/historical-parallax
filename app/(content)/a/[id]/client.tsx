"use client";

import * as React from "react";
import { Search, Pencil, MapIcon } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SearchDialog, SearchItem } from "@/components/search-dialog";

interface ClientInteractionsProps {
  searchIndex: SearchItem[];
  children: React.ReactNode;
  editUrl: string;
}

export function ClientInteractions({ searchIndex, children, editUrl }: ClientInteractionsProps) {
  const [mounted, setMounted] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <HeaderClient onSearchClick={() => setSearchOpen(true)} editUrl={editUrl} />
      {children}
      {mounted && (
        <div suppressHydrationWarning>
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} items={searchIndex} />
        </div>
      )}
    </>
  );
}

interface HeaderClientProps {
  onSearchClick: () => void;
  editUrl: string;
}

function HeaderClient({ onSearchClick, editUrl }: HeaderClientProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
      suppressHydrationWarning
    >
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Historical Parallax - Go to home page"
        >
          <span className="font-serif text-xl md:text-2xl font-bold tracking-tight">
            Historical Parallax
          </span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden h-9 w-64 justify-start px-3 text-sm text-muted-foreground md:flex"
            onClick={onSearchClick}
            aria-label="Open search dialog. Press Ctrl+K to search."
            aria-haspopup="dialog"
          >
            <Search className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Search...</span>
            <kbd
              className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"
              aria-hidden="true"
            >
              <span className="text-xs">Ctrl</span>K
            </kbd>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={onSearchClick}
            aria-label="Open search"
            aria-haspopup="dialog"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </Button>

          {editUrl && (
            <a
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              aria-label="Edit this article on GitHub (opens in new tab)"
            >
              <Pencil className="h-4 w-4" aria-hidden="true" />
              <span>Edit</span>
            </a>
          )}
          <Link
            href="/maps/ufo-mysteries"
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            title="View Incident Maps"
          >
            <MapIcon className="h-4 w-4" />
            <span className="sr-only">Maps</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
