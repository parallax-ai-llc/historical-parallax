"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface SidebarTocProps {
  items: TocItem[];
  activeId?: string;
  articleTitle?: string;
}

export function SidebarToc({ items, activeId, articleTitle }: SidebarTocProps) {
  const [currentActive, setCurrentActive] = React.useState(activeId);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-20">
        <ScrollArea className="h-[calc(100vh-6rem)]">
          <nav className="pr-4">
            {articleTitle && (
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                {articleTitle}
              </h4>
            )}
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleClick(item.id)}
                    className={cn(
                      "block w-full text-left text-sm transition-colors hover:text-foreground",
                      item.level === 2 && "py-1",
                      item.level === 3 && "py-0.5 pl-4 text-xs",
                      item.level === 4 && "py-0.5 pl-8 text-xs",
                      currentActive === item.id
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
