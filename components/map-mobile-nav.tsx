"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronUp, Map as MapIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MAP_CATEGORIES } from "@/lib/maps"

export function MapMobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  
  // Find current category name to display
  const currentCategory = MAP_CATEGORIES.find(c => pathname === `/maps/${c.id}`)

  return (
    <div className="lg:hidden mb-6 border rounded-lg bg-background shadow-sm">
      <Button 
        variant="ghost" 
        className="w-full flex justify-between items-center px-4 py-3 h-auto hover:bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2 font-semibold">
          <MapIcon className="h-4 w-4" />
          {currentCategory ? currentCategory.name : "Select Map"}
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="border-t px-2 py-2 bg-muted/30">
          <div className="space-y-1">
            {MAP_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/maps/${category.id}`}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === `/maps/${category.id}`
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
