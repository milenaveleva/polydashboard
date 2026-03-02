"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ImpactChart } from "@/components/impact-chart";
import { TradeImpactTable } from "@/components/trade-impact-table";
import { ImpactSummary } from "@/components/impact-summary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWalletTrades } from "@/hooks/use-wallet-trades";
import { usePriceHistory } from "@/hooks/use-price-history";
import { useClosedPositions } from "@/hooks/use-closed-positions";
import {
  computeTradeImpacts,
  inferMarketDuration,
  priceHistoryParamsForDuration,
  formatUSD,
  formatPercent,
  cn,
} from "@/lib/utils";
import { POLYMARKET_MARKET_URL } from "@/lib/constants";
import type { PriceHistoryInterval } from "@/lib/constants";
import {
  ArrowLeft,
  ExternalLink,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

type ViewInterval = "15m" | "30m" | PriceHistoryInterval;

const ALL_INTERVAL_BUTTONS: { value: ViewInterval; label: string }[] = [
  { value: "15m", label: "15M" },
  { value: "30m", label: "30M" },
  { value: "1h", label: "1H" },
  { value: "6h", label: "6H" },
  { value: "1d", label: "1D" },
  { value: "1w", label: "1W" },
  { value: "1m", label: "1M" },
  { value: "all", label: "All" },
];

// Seconds to keep when the user clicks a zoom button. Computed relative to the
// *latest* timestamp in the fetched data, so historical markets work correctly.
const VIEW_INTERVAL_SECONDS: Partial<Record<ViewInterval, number>> = {
  "15m": 900,
  "30m": 1_800,
  "1h": 3_600,
  "6h": 21_600,
  "1d": 86_400,
  "1w": 604_800,
  "1m": 2_592_000,
};

export default function PositionDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const address =
    typeof params.address === "string" ? params.address : "";
  const conditionId =
    typeof params.conditionId === "string" ? params.conditionId : "";
  const assetFromQuery = searchParams.get("asset");

  const [highlightedTs, setHighlightedTs] = useState<number | null>(null);
  // viewInterval controls only the client-side zoom window — it does NOT drive
  // the API call, so switching buttons never triggers an empty-data response for
  // historical markets (the CLOB "interval" param is relative to *now*).
  const [viewInterval, setViewInterval] = useState<ViewInterval>("all");

  // Fetch position metadata — use a high limit so wallets with many positions
  // still find the right position object.
  const { data: positions = [] } = useClosedPositions(address, { limit: 500 });
  const position = useMemo(
    () => positions.find((p) => p.conditionId === conditionId),
    [positions, conditionId]
  );

  const tokenId = assetFromQuery ?? position?.asset ?? null;

  const { data: trades = [], isLoading: tradesLoading } = useWalletTrades(
    address,
    conditionId
  );

  // Compute market duration from trade timestamps and/or position endDate
  const marketDurationSeconds = useMemo(() => {
    let durationFromTrades: number | null = null;
    if (trades.length >= 2) {
      const tsSorted = [...trades].sort((a, b) => a.timestamp - b.timestamp);
      durationFromTrades =
        tsSorted[tsSorted.length - 1].timestamp - tsSorted[0].timestamp;
    }

    // If we have the position's endDate and first trade, use those for a more accurate span
    if (position?.endDate && trades.length >= 1) {
      const endTs = Math.floor(new Date(position.endDate).getTime() / 1000);
      const firstTradeTs = Math.min(...trades.map((t) => t.timestamp));
      const durationFromPos = endTs - firstTradeTs;
      if (durationFromPos > 0) return durationFromPos;
    }

    return durationFromTrades;
  }, [trades, position]);

  // Always fetch interval=all with adaptive fidelity. The interval buttons are
  // purely a client-side zoom — they filter the already-fetched data array.
  const autoFidelity = useMemo(
    () => priceHistoryParamsForDuration(marketDurationSeconds).fidelity,
    [marketDurationSeconds]
  );

  const { data: priceHistory, isLoading: priceLoading } = usePriceHistory(
    tokenId,
    "all",
    autoFidelity
  );

  const priceData = useMemo(
    () => priceHistory?.history ?? [],
    [priceHistory]
  );

  // Client-side window filter — when a trade is highlighted, center the window
  // around that trade; otherwise anchor to the latest timestamp in the data.
  const filteredPriceData = useMemo(() => {
    const windowSecs = VIEW_INTERVAL_SECONDS[viewInterval];
    if (!windowSecs || priceData.length === 0) return priceData;

    if (highlightedTs != null) {
      const half = windowSecs / 2;
      return priceData.filter(
        (p) => p.t >= highlightedTs - half && p.t <= highlightedTs + half
      );
    }

    const maxTs = Math.max(...priceData.map((p) => p.t));
    return priceData.filter((p) => p.t >= maxTs - windowSecs);
  }, [priceData, viewInterval, highlightedTs]);

  // Finalize market duration using price data once available (more accurate than trades alone)
  const finalDuration = useMemo(
    () =>
      inferMarketDuration(priceData, trades) ?? marketDurationSeconds,
    [priceData, trades, marketDurationSeconds]
  );

  const tradesWithImpact = useMemo(
    () => computeTradeImpacts(trades, priceData, finalDuration),
    [trades, priceData, finalDuration]
  );

  const isLoading = tradesLoading || priceLoading;
  const marketUrl = position?.slug
    ? `${POLYMARKET_MARKET_URL}/${position.eventSlug ?? position.slug}`
    : null;

  const pnl = position?.realizedPnl ?? 0;
  const isProfit = pnl >= 0;

  const isShortMarket =
    finalDuration != null && finalDuration <= 3600;
  const isMediumMarket =
    finalDuration != null &&
    finalDuration > 3600 &&
    finalDuration <= 6 * 3600;

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
        <div className="container px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href={`/wallet/${address}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Positions
              </Button>
            </Link>
            <div className="min-w-0 flex-1">
              <h1 className="text-base font-semibold text-foreground truncate">
                {position?.title ?? "Loading..."}
              </h1>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                {position && (
                  <>
                    <Badge
                      variant={position.outcome === "Yes" ? "yes" : "no"}
                      className="text-[10px]"
                    >
                      {position.outcome}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">
                      avg {formatPercent(position.avgPrice)}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {formatUSD(position.totalBought)} invested
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span
                      className={cn(
                        "text-xs font-mono font-medium",
                        isProfit ? "text-accent-teal" : "text-accent-crimson"
                      )}
                    >
                      {isProfit ? (
                        <TrendingUp className="w-3 h-3 inline mr-0.5" />
                      ) : (
                        <TrendingDown className="w-3 h-3 inline mr-0.5" />
                      )}
                      {isProfit ? "+" : ""}
                      {formatUSD(pnl)} PnL
                    </span>
                    {finalDuration != null && (
                      <>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {formatDuration(finalDuration)} market
                        </span>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            {marketUrl && (
              <Button variant="outline" size="sm" asChild className="shrink-0">
                <a href={marketUrl} target="_blank" rel="noopener noreferrer">
                  View market
                  <ExternalLink className="w-3 h-3 ml-1.5" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container px-4 py-6 space-y-6">
        {/* Impact summary cards */}
        {!isLoading && (
          <ImpactSummary
            trades={tradesWithImpact}
            marketDurationSeconds={finalDuration}
          />
        )}

        {/* Chart with interval controls */}
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h2 className="text-sm font-semibold text-foreground">
              Price History & Trade Markers
            </h2>
            <div className="flex items-center gap-1.5 flex-wrap">
              {ALL_INTERVAL_BUTTONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setViewInterval(value);
                    setHighlightedTs(null);
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                    viewInterval === value
                      ? "border-accent-gold bg-accent-gold/20 text-accent-gold"
                      : "border-border bg-surface text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
              {highlightedTs && (
                <button
                  type="button"
                  onClick={() => setHighlightedTs(null)}
                  className="px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Reset zoom
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="h-[400px] rounded bg-background animate-pulse" />
          ) : filteredPriceData.length === 0 ? (
            <div className="h-[400px] flex items-center justify-center text-muted-foreground text-sm">
              No price data available for this interval.
            </div>
          ) : (
            <ImpactChart
              priceData={filteredPriceData}
              trades={tradesWithImpact}
              highlightedTradeTs={highlightedTs}
              marketDurationSeconds={finalDuration}
            />
          )}

          <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent-gold" />
              BUY (YES)
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent-crimson" />
              SELL (NO)
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-0.5 bg-accent-teal rounded" />
              Price line
            </span>
            {(isShortMarket || isMediumMarket) && (
              <span className="text-accent-gold/70">
                ⚡ Short market — fine granularity auto-enabled
              </span>
            )}
          </div>
        </div>

        {/* Trade impact table */}
        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="text-sm font-semibold text-foreground mb-1">
            Trade-by-Trade Impact Analysis
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Shows how the market price changed after each trade.{" "}
            <span className="text-accent-teal">Moved market</span> = price moved
            in the trade&apos;s direction.{" "}
            <span className="text-accent-crimson">Absorbed</span> = market
            pushed back.
            {isShortMarket && (
              <> Impact windows scaled to market duration (+5m / +15m).</>
            )}
          </p>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 rounded bg-background animate-pulse"
                />
              ))}
            </div>
          ) : (
            <TradeImpactTable
              trades={tradesWithImpact}
              onHighlight={(ts) => {
                setHighlightedTs(ts);
                // If already on a narrow interval, keep it (centered on the
                // trade). Otherwise switch to 1H so the effect is visible.
                const secs = VIEW_INTERVAL_SECONDS[viewInterval];
                if (secs == null || secs > 3600) {
                  setViewInterval("1h");
                }
              }}
              highlightedTs={highlightedTs}
              marketDurationSeconds={finalDuration}
            />
          )}
        </div>
      </div>
    </main>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)}h`;
  return `${Math.round(seconds / 86400)}d`;
}
