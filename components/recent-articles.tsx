"use client";

import Link from "next/link";

export interface RecentArticle {
  id: string;
  name: string;
  nameKo?: string;
  lastUpdated?: string;
}

interface RecentArticlesProps {
  articles: RecentArticle[];
}

export function RecentArticles({ articles }: RecentArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-xl space-y-2">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/a/${article.id}`}
          className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-4 transition-colors hover:bg-accent"
        >
          <div>
            <h3 className="font-medium">{article.name}</h3>
            {article.nameKo && (
              <p className="text-sm text-muted-foreground">{article.nameKo}</p>
            )}
          </div>
          {article.lastUpdated && (
            <span className="text-xs text-muted-foreground">
              {article.lastUpdated}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
