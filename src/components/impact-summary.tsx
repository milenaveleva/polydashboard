"use client";

import type { TradeWithImpact } from "@/lib/types";
import { formatSignedPercent, formatUSD, cn } from "@/lib/utils";
import { Activity, TrendingUp, TrendingDown, Zap } from "lucide-react";

interface ImpactSummaryProps {
  trades: TradeWithImpact[];
  marketDurationSeconds?: number | null;
}

/**
 * Return the shortest-window impact that has data, regardless of market
 * duration, so users always see the most granular effect available.
 */
function getBestImpactWindow(
  trades: TradeWithImpact[],
  _durationSeconds: number | null
): { label: string; values: (number | null)[] } {
  const windows: { key: keyof TradeWithImpact; label: string }[] = [
    { key: "impact5m",  label: "Avg 5m Impact"  },
    { key: "impact15m", label: "Avg 15m Impact" },
    { key: "impact1h",  label: "Avg 1h Impact"  },
    { key: "impact6h",  label: "Avg 6h Impact"  },
    { key: "impact24h", label: "Avg 24h Impact" },
  ];
  for (const w of windows) {
    const vals = trades.map((t) => t[w.key] as number | null);
    if (vals.some((v) => v != null)) {
      return { label: w.label, values: vals };
    }
  }
  return { label: "Avg Impact", values: [] };
}

/**
 * For "market mover" rate, use the best available window
 * (earliest window that has data).
 */
function getMarketMoverRate(trades: TradeWithImpact[]): number {
  const movedCount = trades.filter((t) => {
    const impact =
      t.impact5m ?? t.impact15m ?? t.impact1h ??
      t.impact6h ?? t.impact24h;
    if (impact == null) return false;
    return t.side === "BUY" ? impact > 0.005 : impact < -0.005;
  }).length;
  return trades.length > 0 ? movedCount / trades.length : 0;
}

export function ImpactSummary({ trades, marketDurationSeconds }: ImpactSummaryProps) {
  if (!trades.length) return null;

  const totalVolume = trades.reduce((s, t) => s + t.size * t.price, 0);
  const buyCount  = trades.filter((t) => t.side === "BUY").length;
  const sellCount = trades.length - buyCount;

  const { label: impactLabel, values: impactValues } = getBestImpactWindow(
    trades,
    marketDurationSeconds ?? null
  );
  const validImpacts = impactValues.filter((v): v is number => v != null);
  const avgImpact =
    validImpacts.length > 0
      ? validImpacts.reduce((s, v) => s + v, 0) / validImpacts.length
      : null;

  const moveRate = getMarketMoverRate(trades);
  const movedCount = trades.filter((t) => {
    const impact =
      t.impact5m ?? t.impact15m ?? t.impact1h ?? t.impact6h ?? t.impact24h;
    if (impact == null) return false;
    return t.side === "BUY" ? impact > 0.005 : impact < -0.005;
  }).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <SummaryCard
        icon={Activity}
        label="Total Trades"
        value={`${trades.length}`}
        subtitle={`${buyCount} buys / ${sellCount} sells`}
      />
      <SummaryCard
        icon={Zap}
        label="Volume"
        value={formatUSD(totalVolume)}
      />
      <SummaryCard
        icon={avgImpact != null && avgImpact >= 0 ? TrendingUp : TrendingDown}
        label={impactLabel}
        value={avgImpact != null ? formatSignedPercent(avgImpact) : "—"}
        valueColor={
          avgImpact == null ? "default" : avgImpact >= 0 ? "teal" : "crimson"
        }
      />
      <SummaryCard
        icon={TrendingUp}
        label="Market Mover Rate"
        value={`${(moveRate * 100).toFixed(0)}%`}
        subtitle={`${movedCount} of ${trades.length} trades`}
        valueColor={moveRate >= 0.5 ? "teal" : "default"}
      />
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  subtitle,
  valueColor = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  subtitle?: string;
  valueColor?: "teal" | "crimson" | "gold" | "default";
}) {
  const colorMap = {
    teal: "text-accent-teal",
    crimson: "text-accent-crimson",
    gold: "text-accent-gold",
    default: "text-foreground",
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-3 space-y-1">
      <div className="flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p className={cn("font-mono text-lg font-semibold", colorMap[valueColor])}>
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-muted-foreground font-mono">{subtitle}</p>
      )}
    </div>
  );
}
