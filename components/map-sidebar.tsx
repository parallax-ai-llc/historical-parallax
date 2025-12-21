"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MAP_CATEGORIES } from "@/lib/maps";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MapSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 left-0 z-0 hidden h-[calc(100vh-3.5rem)] bg-background lg:block lg:w-72">
      <ScrollArea className="h-full py-6 pr-6 pl-4">
        <div className="mb-4 px-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Maps</h2>
          <div className="space-y-1">
            {MAP_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/maps/${category.id}`}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:underline",
                  pathname === `/maps/${category.id}`
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
