"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PriceChart } from "@/components/price-chart";
import { WhaleFeed } from "@/components/whale-feed";
import { WhaleThreshold } from "@/components/whale-threshold";
import { MarketInfo } from "@/components/market-info";
import { Button } from "@/components/ui/button";
import { useMarket } from "@/hooks/use-market";
import { usePriceHistory } from "@/hooks/use-price-history";
import { useWhaleTrades } from "@/hooks/use-whale-trades";
import { DEFAULT_WHALE_THRESHOLD_USD } from "@/lib/constants";
import type { PriceHistoryInterval } from "@/lib/constants";
import type { Trade } from "@/lib/types";
import { ArrowLeft } from "lucide-react";

function parseJsonArrayString(s: string): string[] {
  try {
    const parsed = JSON.parse(s);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // fall through
  }
  return s.split(",").map((v) => v.trim());
}

function getYesTokenId(market: { clobTokenIds: string | null }): string | null {
  const ids = market.clobTokenIds;
  if (!ids) return null;
  const parts = parseJsonArrayString(ids);
  return parts[0]?.trim() || null;
}

export default function MarketDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : null;

  const [interval, setInterval] = useState<PriceHistoryInterval>("1w");
  const [threshold, setThreshold] = useState(DEFAULT_WHALE_THRESHOLD_USD);
  const [highlightedTradeTimestamp, setHighlightedTradeTimestamp] = useState<
    number | null
  >(null);

  const { data: market, isLoading: marketLoading, error: marketError } = useMarket(slug);
  const tokenId = market ? getYesTokenId(market) : null;
  const { data: priceHistory, isLoading: historyLoading } = usePriceHistory(
    tokenId,
    interval
  );
  const { data: whaleTrades = [], isLoading: tradesLoading } = useWhaleTrades(
    market?.conditionId ?? null,
    threshold
  );

  const priceData = useMemo(
    () => priceHistory?.history ?? [],
    [priceHistory]
  );

  const handleTradeClick = useCallback((trade: Trade) => {
    setHighlightedTradeTimestamp(trade.timestamp);
  }, []);

  if (marketError || (!marketLoading && !market)) {
    return (
      <main className="min-h-screen p-8">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to markets
          </Button>
        </Link>
        <p className="mt-4 text-muted-foreground">Market not found.</p>
      </main>
    );
  }

  if (marketLoading || !market) {
    return (
      <main className="min-h-screen p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-surface rounded" />
          <div className="h-[360px] bg-surface rounded" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
        <div className="container flex items-center gap-4 px-4 py-3">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-foreground truncate flex-1">
            {market.question ?? "Market"}
          </h1>
        </div>
      </header>

      <div className="container px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <PriceChart
              priceData={priceData}
              whaleTrades={whaleTrades}
              interval={interval}
              onIntervalChange={setInterval}
              highlightedTradeTimestamp={highlightedTradeTimestamp}
            />
            <MarketInfo market={market} />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <WhaleThreshold value={threshold} onChange={setThreshold} />
            <WhaleFeed
              trades={whaleTrades}
              onTradeClick={handleTradeClick}
              highlightedTimestamp={highlightedTradeTimestamp}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
