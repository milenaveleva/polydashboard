"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ClosedPosition } from "@/lib/types";
import { formatUSD, formatPercent, cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react";

interface PositionCardProps {
  position: ClosedPosition;
  walletAddress: string;
}

export function PositionCard({ position, walletAddress }: PositionCardProps) {
  const pnl = position.realizedPnl;
  const isProfit = pnl >= 0;
  const pnlColor = isProfit ? "text-accent-teal" : "text-accent-crimson";
  const pnlBgColor = isProfit ? "bg-accent-teal/10" : "bg-accent-crimson/10";
  const endDate = position.endDate
    ? new Date(position.endDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/wallet/${walletAddress}/position/${position.conditionId}?asset=${position.asset}`}
    >
      <Card className="h-full transition-all hover:border-accent-gold/50 hover:shadow-glow cursor-pointer group">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 flex-1">
              {position.title}
            </h3>
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-accent-gold transition-colors mt-0.5" />
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={position.outcome === "Yes" ? "yes" : "no"}
              className="text-xs"
            >
              {position.outcome}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              avg {formatPercent(position.avgPrice)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Invested</p>
              <p className="font-mono text-sm text-foreground">
                {formatUSD(position.totalBought)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">PnL</p>
              <div
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-mono font-medium",
                  pnlBgColor,
                  pnlColor
                )}
              >
                {isProfit ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {isProfit ? "+" : ""}
                {formatUSD(Math.abs(pnl))}
              </div>
            </div>
          </div>

          {endDate && (
            <p className="text-xs text-muted-foreground">Ended {endDate}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
