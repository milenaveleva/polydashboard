"use client";

import { WhaleFeedEntry } from "@/components/whale-feed-entry";
import type { Trade } from "@/lib/types";

interface WhaleFeedProps {
  trades: Trade[];
  onTradeClick?: (trade: Trade) => void;
  highlightedTimestamp?: number | null;
  className?: string;
}

export function WhaleFeed({
  trades,
  onTradeClick,
  highlightedTimestamp,
  className,
}: WhaleFeedProps) {
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-foreground mb-3">Whale activity</h3>
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {trades.length === 0 && (
          <p className="text-sm text-muted-foreground py-4">No large trades in this range.</p>
        )}
        {trades.map((trade) => (
          <WhaleFeedEntry
            key={`${trade.transactionHash ?? trade.timestamp}-${trade.proxyWallet}`}
            trade={trade}
            onClick={() => onTradeClick?.(trade)}
            highlighted={trade.timestamp === highlightedTimestamp}
          />
        ))}
      </div>
    </div>
  );
}
