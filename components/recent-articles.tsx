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
  const [direction, setDirection] = React.useState<"left" | "right">("left");

  // Drag state
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStartX, setDragStartX] = React.useState(0);
  const [dragOffset, setDragOffset] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Limit to 10 articles
  const displayArticles = articles.slice(0, 10);

  const goToIndex = React.useCallback((index: number, dir: "left" | "right") => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const goNext = React.useCallback(() => {
    const nextIndex = (currentIndex + 1) % displayArticles.length;
    goToIndex(nextIndex, "left");
  }, [currentIndex, displayArticles.length, goToIndex]);

  const goPrev = React.useCallback(() => {
    const prevIndex = (currentIndex - 1 + displayArticles.length) % displayArticles.length;
    goToIndex(prevIndex, "right");
  }, [currentIndex, displayArticles.length, goToIndex]);

  // Auto-advance
  React.useEffect(() => {
    if (displayArticles.length <= 1 || isDragging) return;

    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [displayArticles.length, isDragging, goNext]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStartX;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const threshold = 50;
    if (dragOffset > threshold) {
      goPrev();
    } else if (dragOffset < -threshold) {
      goNext();
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const offset = e.touches[0].clientX - dragStartX;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const threshold = 50;
    if (dragOffset > threshold) {
      goPrev();
    } else if (dragOffset < -threshold) {
      goNext();
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  // SSR 대응: 클라이언트에서만 렌더링
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || displayArticles.length === 0) {
    return (
      <div className="w-full max-w-xl">
        <div className="h-20 rounded-lg border border-border/50 bg-card animate-pulse" />
      </div>
    );
  }

  const currentArticle = displayArticles[currentIndex];

  // Animation classes based on direction
  const getAnimationClass = () => {
    if (!isAnimating) return "opacity-100 translate-x-0";
    return direction === "left"
      ? "opacity-0 -translate-x-4"
      : "opacity-0 translate-x-4";
  };

  return (
    <div className="w-full max-w-xl">
      <div
        ref={containerRef}
        className="relative h-20 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Link
          href={`/a/${currentArticle.id}`}
          onClick={(e) => {
            // Prevent navigation if dragging
            if (Math.abs(dragOffset) > 5) {
              e.preventDefault();
            }
          }}
          className={`
            absolute inset-0 flex items-center
            rounded-lg border border-border/50 bg-card px-4 py-4 md:px-5
            transition-all duration-300 ease-out
            hover:bg-accent hover:border-border
            ${getAnimationClass()}
          `}
          style={{
            transform: isDragging
              ? `translateX(${dragOffset}px)`
              : undefined,
            transition: isDragging ? "none" : undefined,
          }}
        >
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground truncate text-left">
              {currentArticle.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-sm text-muted-foreground">
                {currentArticle.nationality || "Historical Figure"}
              </p>
              {currentArticle.lastUpdated && (
                <span className="text-xs text-muted-foreground/70">
                  · {getRelativeTime(currentArticle.lastUpdated)}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Progress indicators */}
      {displayArticles.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {displayArticles.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const dir = index > currentIndex ? "left" : "right";
                goToIndex(index, dir);
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
