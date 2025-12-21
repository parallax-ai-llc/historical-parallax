"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: string;
  name: string;
  date?: string;
  description?: string;
}

interface MapTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function MapTimeline({ items, className }: MapTimelineProps) {
  // Sort items by date ascending (oldest first)
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.date || "9999-12-31").getTime();
      const dateB = new Date(b.date || "9999-12-31").getTime();
      return dateA - dateB;
    });
  }, [items]);

  return (
    <div className={cn("w-80 bg-background/50 flex flex-col min-h-0", className)}>
      <ScrollArea className="flex-1 w-full min-h-0">
        <div className="relative pr-4 pb-4 space-y-6">
          {/* Timeline vertical line - Centered at 12px (left-3) */}
          <div className="timeline-line absolute left-3 top-2 bottom-2 w-0.5 bg-border" />

          {sortedItems.map((item, index) => (
            <div key={item.id} className="relative pl-7">
              {/* Timeline dot - Centered at 12px (left-3) */}
              <div className="timeline-dot absolute left-3 top-1 h-2 w-2 rounded-full border border-primary bg-background group-hover:bg-primary transition-colors z-10 -translate-x-1/2" />

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-mono text-muted-foreground leading-none mb-0.5 block">
                  {item.date ? item.date.split("-")[0] : "Unknown"}
                </span>
                <Link
                  href={`/a/${item.id}`}
                  className="text-sm font-medium hover:underline hover:text-primary transition-colors line-clamp-2 leading-tight"
                >
                  {item.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
