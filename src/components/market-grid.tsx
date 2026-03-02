"use client";

import { MarketCard } from "@/components/market-card";
import type { Market } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MarketGridProps {
  markets: Market[];
  className?: string;
  showSparklineForFirst?: number;
}

export function MarketGrid({
  markets,
  className,
  showSparklineForFirst = 12,
}: MarketGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {markets.map((market, i) => (
        <MarketCard
          key={market.id}
          market={market}
          showSparkline={i < showSparklineForFirst}
        />
      ))}
    </div>
  );
}
