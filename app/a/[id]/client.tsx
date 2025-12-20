"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { SearchDialog, SearchItem } from "@/components/search-dialog";
import { SidebarToc, TocItem } from "@/components/sidebar-toc";
import { ArticleContent, ArticleMeta } from "@/components/article-content";
import { Footer } from "@/components/footer";

const GITHUB_REPO = "https://github.com/joshephan/historical-parallax";

interface Article {
  meta: ArticleMeta;
  content: string;
  toc: TocItem[];
}

interface ArticlePageClientProps {
  article: Article;
  searchIndex: SearchItem[];
}

export function ArticlePageClient({ article, searchIndex }: ArticlePageClientProps) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const editUrl = `${GITHUB_REPO}/edit/main/content/articles/${article.meta.id}.md`;

  return (
    <div className="flex min-h-screen flex-col">
      <Header onSearchClick={() => setSearchOpen(true)} editUrl={editUrl} />

      <div className="container flex flex-1 gap-8 py-8">
        <SidebarToc items={article.toc} articleTitle={article.meta.name} />

        <ArticleContent meta={article.meta} content={article.content} />
      </div>

      <Footer />

      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        items={searchIndex}
      />
    </div>
  );
}
