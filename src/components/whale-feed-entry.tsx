"use client";

/* eslint-disable @next/next/no-img-element -- data URL avatars */

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Trade } from "@/lib/types";
import { truncateAddress, formatUSD, formatRelativeTime } from "@/lib/utils";
import { POLYMARKET_MARKET_URL } from "@/lib/constants";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhaleFeedEntryProps {
  trade: Trade;
  onClick?: () => void;
  highlighted?: boolean;
}

function avatarFromAddress(address: string): string {
  const hash = address.slice(2).padStart(40, "0").slice(0, 40);
  const r = parseInt(hash.slice(0, 8), 16) % 256;
  const g = parseInt(hash.slice(8, 16), 16) % 256;
  const b = parseInt(hash.slice(16, 24), 16) % 256;
  const l = (r * 299 + g * 587 + b * 114) / 1000;
  const fg = l > 128 ? "#0a0a0f" : "#e4e4e7";
  const bg = `rgb(${r},${g},${b})`;
  const initial = address[2]?.toUpperCase() ?? "?";
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" fill="${bg}"/><text x="16" y="22" text-anchor="middle" fill="${fg}" font-family="sans-serif" font-size="14" font-weight="600">${initial}</text></svg>`
  )}`;
}

export function WhaleFeedEntry({ trade, onClick, highlighted }: WhaleFeedEntryProps) {
  const isYes = trade.side === "BUY";
  const sizeUsd = trade.size * trade.price;
  const slug = trade.slug ?? trade.eventSlug;
  const copyTradeUrl = slug
    ? `${POLYMARKET_MARKET_URL}/${slug}`
    : "https://polymarket.com";

  return (
    <Card
      className={cn(
        "transition-all cursor-pointer",
        highlighted && "border-accent-gold shadow-glow ring-1 ring-accent-gold/50"
      )}
      onClick={onClick}
    >
      <CardContent className="p-3 flex items-start gap-3">
        {/* Data URL avatar - img is intentional */}
        <img
          src={avatarFromAddress(trade.proxyWallet)}
          alt=""
          className="w-8 h-8 rounded-full shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-foreground">
              {truncateAddress(trade.proxyWallet)}
            </span>
            <Badge variant={isYes ? "yes" : "no"} className="text-xs">
              {isYes ? "YES" : "NO"}
            </Badge>
          </div>
          <p className="font-mono text-sm font-medium text-foreground mt-0.5">
            {formatUSD(sizeUsd)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatRelativeTime(trade.timestamp)}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            asChild
            onClick={(e) => e.stopPropagation()}
          >
            <a href={copyTradeUrl} target="_blank" rel="noopener noreferrer">
              Copy trade
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
