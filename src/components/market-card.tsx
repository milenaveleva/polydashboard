"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkline } from "@/components/sparkline";
import { usePriceHistory } from "@/hooks/use-price-history";
import type { Market } from "@/lib/types";
import { formatPercent, formatUSD } from "@/lib/utils";
import { cn } from "@/lib/utils";

function parseJsonArrayString(s: string): string[] {
  try {
    const parsed = JSON.parse(s);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // fall through to CSV split
  }
  return s.split(",").map((v) => v.trim());
}

function getYesTokenId(market: Market): string | null {
  const ids = market.clobTokenIds;
  if (!ids) return null;
  const parts = parseJsonArrayString(ids);
  return parts[0]?.trim() || null;
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

interface MarketCardProps {
  market: Market;
  showSparkline?: boolean;
}

export function MarketCard({ market, showSparkline = false }: MarketCardProps) {
  const slug = market.slug ?? market.id;
  const tokenId = getYesTokenId(market);
  const { data: history } = usePriceHistory(
    showSparkline && tokenId ? tokenId : null,
    "1w"
  );
  const prices = parseOutcomePrices(market);
  const volume = market.volumeNum ?? 0;
  const liquidity = market.liquidityNum ?? 0;
  const endDate = market.endDateIso ?? market.endDate;
  const sparklineData = history?.history ?? [];

  return (
    <Link href={slug ? `/market/${slug}` : "#"}>
      <Card
        className={cn(
          "h-full transition-all hover:border-accent-gold/50 hover:shadow-glow cursor-pointer"
        )}
      >
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-2 text-sm font-medium leading-tight">
            {market.question ?? "Unknown market"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <Badge variant="yes" className="font-mono text-xs">
                YES {formatPercent(prices.yes)}
              </Badge>
              <Badge variant="no" className="font-mono text-xs">
                NO {formatPercent(prices.no)}
              </Badge>
            </div>
            {showSparkline && (
              <Sparkline data={sparklineData} width={72} height={20} upColor />
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground font-mono">
            <span>Vol: {formatUSD(volume)}</span>
            <span>Liq: {formatUSD(liquidity)}</span>
          </div>
          {endDate && (
            <p className="text-xs text-muted-foreground">
              Ends: {new Date(endDate).toLocaleDateString()}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-semibold", className)} {...props} />;
}
