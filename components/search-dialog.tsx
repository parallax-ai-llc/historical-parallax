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
  summary?: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: SearchItem[];
}

export function SearchDialog({ open, onOpenChange, items }: SearchDialogProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const [search, setSearch] = React.useState("");

  const filteredItems = React.useMemo(() => {
    if (!search) return items.slice(0, 10);

    const lowerSearch = search.toLowerCase();
    return items
      .filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearch) ||
          item.nationality?.toLowerCase().includes(lowerSearch)
      )
      .slice(0, 10);
  }, [items, search]);

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
    >
      <CommandInput
        placeholder={t("search.placeholder")}
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>{t("search.empty")}</CommandEmpty>
        <CommandGroup heading={t("search.heading")}>
          {filteredItems.map((item) => (
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
