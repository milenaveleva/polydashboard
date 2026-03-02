"use client";

import { useMemo, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { Market } from "@/lib/types";

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const t = text.toLowerCase();
  let i = 0;
  for (let j = 0; j < t.length && i < q.length; j++) {
    if (t[j] === q[i]) i++;
  }
  return i === q.length;
}

interface SearchBarProps {
  markets: Market[];
  onSelect: (market: Market) => void;
  placeholder?: string;
  className?: string;
  searchQuery?: string;
  onSearchQueryChange?: (q: string) => void;
}

export function SearchBar({
  markets,
  onSelect,
  placeholder = "Search markets...",
  className,
  searchQuery: controlledQuery,
  onSearchQueryChange,
}: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [internalQuery, setInternalQuery] = useState("");
  const query = controlledQuery !== undefined ? controlledQuery : internalQuery;
  const setQuery = (v: string) => {
    if (onSearchQueryChange) onSearchQueryChange(v);
    else setInternalQuery(v);
  };

  const filtered = useMemo(() => {
    if (!query.trim()) return markets.slice(0, 50);
    return markets.filter((m) =>
      fuzzyMatch(query, m.question ?? "")
    ).slice(0, 50);
  }, [markets, query]);

  return (
    <Command
      className={className}
      shouldFilter={false}
    >
      <CommandInput
        placeholder={placeholder}
        value={query}
        onValueChange={setQuery}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
      />
      {open && (
        <CommandList className="absolute top-full left-0 right-0 z-50 mt-1 border border-border rounded-md bg-surface shadow-lg max-h-[300px]">
          <CommandEmpty>No markets found.</CommandEmpty>
          <CommandGroup heading="Markets">
            {filtered.map((market) => (
              <CommandItem
                key={market.id}
                value={market.id}
                onSelect={() => {
                  onSelect(market);
                  setOpen(false);
                  setQuery("");
                }}
                className="cursor-pointer"
              >
                <span className="line-clamp-2">{market.question ?? "Unknown"}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}
