"use client";

import * as React from "react";
import Link from "next/link";

export interface RecentArticle {
  id: string;
  name: string;
  nationality?: string;
  lastUpdated?: string;
}

interface RecentArticlesProps {
  articles: RecentArticle[];
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function RecentArticles({ articles }: RecentArticlesProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Limit to 10 articles
  const displayArticles = articles.slice(0, 10);

  React.useEffect(() => {
    if (displayArticles.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % displayArticles.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayArticles.length]);

  if (displayArticles.length === 0) {
    return null;
  }

  const currentArticle = displayArticles[currentIndex];

  return (
    <div className="w-full max-w-xl">
      <div className="relative h-20 overflow-hidden">
        <Link
          href={`/a/${currentArticle.id}`}
          className={`
            absolute inset-0 flex items-center justify-between
            rounded-lg border border-border/50 bg-card px-5 py-4
            transition-all duration-300 ease-out
            hover:bg-accent hover:border-border
            ${isAnimating
              ? "opacity-0 scale-95 -translate-y-2"
              : "opacity-100 scale-100 translate-y-0"
            }
          `}
        >
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground truncate">
              {currentArticle.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {currentArticle.nationality || "Historical Figure"}
            </p>
          </div>
          {currentArticle.lastUpdated && (
            <span className="text-xs text-muted-foreground ml-4 flex-shrink-0">
              {getRelativeTime(currentArticle.lastUpdated)}
            </span>
          )}
        </Link>
      </div>

      {/* Progress indicators */}
      {displayArticles.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {displayArticles.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsAnimating(false);
                }, 150);
              }}
              className={`
                h-1.5 rounded-full transition-all duration-300
                ${index === currentIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }
              `}
              aria-label={`Go to article ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
