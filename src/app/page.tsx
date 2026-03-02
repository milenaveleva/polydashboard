"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MarketGrid } from "@/components/market-grid";
import { FiltersSidebar } from "@/components/filters-sidebar";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { useMarkets } from "@/hooks/use-markets";
import type { Market, MarketFilters } from "@/lib/types";

export default function MarketBrowserPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<MarketFilters>({
    sort: "volume",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const { data: markets = [], isLoading, error } = useMarkets(filters);

  const filteredMarkets = useMemo(() => {
    if (!searchQuery.trim()) return markets;
    const q = searchQuery.toLowerCase().trim();
    return markets.filter((m) =>
      (m.question ?? "").toLowerCase().includes(q)
    );
  }, [markets, searchQuery]);

  const handleSelectMarket = useCallback(
    (market: Market) => {
      const slug = market.slug ?? market.id;
      router.push(`/market/${slug}`);
    },
    [router]
  );

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
        <div className="container flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-semibold text-foreground">
            Polymarket Whale Dashboard
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <SearchBar
                markets={markets}
                onSelect={handleSelectMarket}
                placeholder="Search markets..."
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
              />
            </div>
            <FiltersSidebar filters={filters} onFiltersChange={setFilters} />
          </div>
        </div>
        {searchQuery && (
          <div className="container px-4 pb-2">
            <span className="text-sm text-muted-foreground">
              Filtering by: &quot;{searchQuery}&quot; — {filteredMarkets.length} results
            </span>
          </div>
        )}
      </header>

      <div className="container px-4 py-6">
        {error && (
          <div className="rounded-lg border border-accent-crimson/50 bg-accent-crimson/10 p-4 text-accent-crimson">
            Failed to load markets. Please try again.
          </div>
        )}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-lg border border-border bg-surface animate-pulse"
              />
            ))}
          </div>
        )}
        {!isLoading && !error && (
          <MarketGrid markets={filteredMarkets} />
        )}
        {!isLoading && !error && filteredMarkets.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No markets match your filters.
          </p>
        )}
      </div>
    </main>
  );
}
