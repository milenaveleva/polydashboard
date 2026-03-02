"use client";

import type { TradeWithImpact } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  formatUSD,
  formatPercent,
  formatSignedPercent,
  formatDateTime,
  cn,
} from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus, Eye } from "lucide-react";

interface TradeImpactTableProps {
  trades: TradeWithImpact[];
  onHighlight?: (ts: number) => void;
  highlightedTs?: number | null;
  /** Market duration in seconds — drives which impact columns to show */
  marketDurationSeconds?: number | null;
}

const ALL_IMPACT_COLUMNS: Array<{
  key: "impact5m" | "impact15m" | "impact1h" | "impact6h" | "impact24h";
  label: string;
}> = [
  { key: "impact5m",  label: "+5m"  },
  { key: "impact15m", label: "+15m" },
  { key: "impact1h",  label: "+1h"  },
  { key: "impact6h",  label: "+6h"  },
  { key: "impact24h", label: "+24h" },
];

/**
 * Show all impact windows that have at least one non-null value in the trades.
 * Falls back to the duration-based defaults if nothing has data yet.
 */
function getImpactColumns(
  trades: TradeWithImpact[],
  _durationSeconds: number | null
): typeof ALL_IMPACT_COLUMNS {
  const withData = ALL_IMPACT_COLUMNS.filter((col) =>
    trades.some((t) => t[col.key] != null)
  );
  return withData.length > 0 ? withData : ALL_IMPACT_COLUMNS.slice(0, 3);
}

function ImpactCell({ value }: { value: number | null }) {
  if (value == null)
    return <span className="text-muted-foreground text-xs">—</span>;

  const isPositive = value > 0.001;
  const isNegative = value < -0.001;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 font-mono text-xs",
        isPositive && "text-accent-teal",
        isNegative && "text-accent-crimson",
        !isPositive && !isNegative && "text-muted-foreground"
      )}
    >
      {isPositive ? (
        <ArrowUpRight className="w-3 h-3" />
      ) : isNegative ? (
        <ArrowDownRight className="w-3 h-3" />
      ) : (
        <Minus className="w-3 h-3" />
      )}
      {formatSignedPercent(value)}
    </span>
  );
}

function ImpactDirection({ trade }: { trade: TradeWithImpact }) {
  // Use the best (longest-window) available impact
  const bestImpact =
    trade.impact24h ?? trade.impact6h ?? trade.impact1h ??
    trade.impact15m ?? trade.impact5m;

  if (bestImpact == null) return null;

  const isBuy = trade.side === "BUY";
  const movedFavorably = isBuy ? bestImpact > 0.005 : bestImpact < -0.005;
  const movedAgainst   = isBuy ? bestImpact < -0.005 : bestImpact > 0.005;

  if (movedFavorably)
    return (
      <span className="text-[10px] font-medium text-accent-teal bg-accent-teal/10 px-1.5 py-0.5 rounded">
        Moved market
      </span>
    );
  if (movedAgainst)
    return (
      <span className="text-[10px] font-medium text-accent-crimson bg-accent-crimson/10 px-1.5 py-0.5 rounded">
        Absorbed
      </span>
    );
  return (
    <span className="text-[10px] font-medium text-muted-foreground bg-surface px-1.5 py-0.5 rounded">
      Neutral
    </span>
  );
}

export function TradeImpactTable({
  trades,
  onHighlight,
  highlightedTs,
  marketDurationSeconds,
}: TradeImpactTableProps) {
  if (!trades.length) {
    return (
      <p className="text-sm text-muted-foreground py-4">
        No trades found for this position.
      </p>
    );
  }

  const impactColumns = getImpactColumns(trades, marketDurationSeconds ?? null);
  const sorted = [...trades].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            <th className="text-left py-2 px-2 font-medium">Time</th>
            <th className="text-left py-2 px-2 font-medium">Side</th>
            <th className="text-right py-2 px-2 font-medium">Size</th>
            <th className="text-right py-2 px-2 font-medium">Price</th>
            {impactColumns.map((col) => (
              <th key={col.key} className="text-right py-2 px-2 font-medium">
                {col.label}
              </th>
            ))}
            <th className="text-center py-2 px-2 font-medium">Effect</th>
            <th className="py-2 px-2" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((trade, i) => {
            const sizeUsd = trade.size * trade.price;
            const isHighlighted = trade.timestamp === highlightedTs;
            return (
              <tr
                key={`${trade.transactionHash ?? trade.timestamp}-${i}`}
                className={cn(
                  "border-b border-border/50 transition-colors hover:bg-surface/80",
                  isHighlighted && "bg-accent-gold/5 border-accent-gold/30"
                )}
              >
                <td className="py-2.5 px-2 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {formatDateTime(trade.timestamp)}
                </td>
                <td className="py-2.5 px-2">
                  <Badge
                    variant={trade.side === "BUY" ? "yes" : "no"}
                    className="text-[10px] px-1.5"
                  >
                    {trade.side}
                  </Badge>
                </td>
                <td className="py-2.5 px-2 text-right font-mono text-xs">
                  {formatUSD(sizeUsd)}
                </td>
                <td className="py-2.5 px-2 text-right font-mono text-xs">
                  {formatPercent(trade.priceAtTrade)}
                </td>
                {impactColumns.map((col) => (
                  <td key={col.key} className="py-2.5 px-2 text-right">
                    <ImpactCell value={trade[col.key] as number | null} />
                  </td>
                ))}
                <td className="py-2.5 px-2 text-center">
                  <ImpactDirection trade={trade} />
                </td>
                <td className="py-2.5 px-2">
                  <button
                    onClick={() => onHighlight?.(trade.timestamp)}
                    className="p-1 text-muted-foreground hover:text-accent-gold transition-colors rounded"
                    title="Zoom chart to this trade"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
