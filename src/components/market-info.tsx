"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Market } from "@/lib/types";
import { formatPercent, formatUSD } from "@/lib/utils";

interface MarketInfoProps {
  market: Market;
  className?: string;
}

function parseJsonArrayString(s: string): string[] {
  try {
    const parsed = JSON.parse(s);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // fall through
  }
  return s.split(",").map((v) => v.trim());
}

function parseOutcomePrices(market: Market): { yes: number; no: number } {
  const p = market.outcomePrices;
  if (!p) return { yes: 0.5, no: 0.5 };
  const parts = parseJsonArrayString(p).map((v) => parseFloat(v));
  return {
    yes: Number.isFinite(parts[0]) ? parts[0] : 0.5,
    no: Number.isFinite(parts[1]) ? parts[1] : 0.5,
  };
}

export function MarketInfo({ market, className }: MarketInfoProps) {
  const prices = parseOutcomePrices(market);
  const volume = market.volumeNum ?? 0;
  const liquidity = market.liquidityNum ?? 0;
  const endDate = market.endDateIso ?? market.endDate;

  return (
    <div className={className}>
      <Tabs defaultValue="description">
        <TabsList className="w-full">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-3">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-6">
            {market.description ?? "No description."}
          </p>
          {market.resolutionSource && (
            <p className="text-xs text-muted-foreground mt-2">
              Resolution: {market.resolutionSource}
            </p>
          )}
          {endDate && (
            <p className="text-xs text-muted-foreground mt-1">
              End date: {new Date(endDate).toLocaleString()}
            </p>
          )}
        </TabsContent>
        <TabsContent value="stats" className="mt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">YES</span>
            <span className="font-mono text-accent-gold">{formatPercent(prices.yes)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">NO</span>
            <span className="font-mono text-accent-crimson">{formatPercent(prices.no)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Volume</span>
            <span className="font-mono">{formatUSD(volume)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Liquidity</span>
            <span className="font-mono">{formatUSD(liquidity)}</span>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
