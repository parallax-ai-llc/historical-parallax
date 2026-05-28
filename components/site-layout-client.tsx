"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";

const SearchDialog = dynamic(
  () => import("@/components/search-dialog").then((m) => m.SearchDialog),
  { ssr: false }
);

interface SiteLayoutClientProps {
  children: React.ReactNode;
}

export function SiteLayoutClient({ children }: SiteLayoutClientProps) {
  const [mounted, setMounted] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader onSearchClick={() => setSearchOpen(true)} />

      <main className="flex-1">{children}</main>

      <div className="relative z-10 bg-background">
        <Footer />
      </div>

      {mounted && (
        <div suppressHydrationWarning>
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        </div>
      )}
    </div>
  );
}
