"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTranslations } from "@/components/i18n-provider";

export interface SearchItem {
  id: string;
  name: string;
  nationality?: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState<SearchItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Fetch matches from /api/search (debounced) whenever the dialog is open and
  // the query changes. The index is no longer shipped with the page; it is
  // fetched lazily here, so each page's HTML stays tiny.
  React.useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(search)}`, { signal: controller.signal })
        .then((r) => r.json())
        .then((data: SearchItem[]) => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => {
          // Ignore aborted requests; a newer keystroke owns the state now.
          if (!controller.signal.aborted) setLoading(false);
        });
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, open]);

  const handleSelect = (id: string) => {
    router.push(`/a/${id}`);
    onOpenChange(false);
    setSearch("");
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("search.title")}
      description={t("search.description")}
      // Results are already filtered server-side; don't let cmdk re-filter and
      // hide valid matches (its default filter matches against item value/id).
      shouldFilter={false}
    >
      <CommandInput
        placeholder={t("search.placeholder")}
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>{loading ? "…" : t("search.empty")}</CommandEmpty>
        <CommandGroup heading={t("search.heading")}>
          {results.map((item) => (
            <CommandItem
              key={item.id}
              value={item.id}
              onSelect={() => handleSelect(item.id)}
              className="cursor-pointer"
            >
              <Search className="mr-2 h-4 w-4" />
              <span className="font-medium">{item.name}</span>
              {item.nationality && (
                <span className="ml-auto text-xs text-muted-foreground">{item.nationality}</span>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
