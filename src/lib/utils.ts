import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PricePoint, Trade, TradeWithImpact } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddress(address: string, chars = 6): string {
  if (!address || address.length < chars * 2 + 2) return address;
  return `${address.slice(0, chars + 2)}…${address.slice(-chars)}`;
}

export function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatUSDPrecise(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatSignedPercent(value: number): string {
  const pct = (value * 100).toFixed(1);
  return value >= 0 ? `+${pct}%` : `${pct}%`;
}

export function formatRelativeTime(ts: number): string {
  const sec = Math.floor(Date.now() / 1000 - ts);
  if (sec < 60) return "just now";
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  if (sec < 604800) return `${Math.floor(sec / 86400)}d ago`;
  return new Date(ts * 1000).toLocaleDateString();
}

export function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(ts: number): string {
  return new Date(ts * 1000).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isValidEthAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Derive the market duration in seconds from price history and/or trade list.
 * Returns null if we can't determine it (single point or no data).
 */
export function inferMarketDuration(
  priceHistory: PricePoint[],
  trades: Trade[]
): number | null {
  if (priceHistory.length >= 2) {
    const sorted = [...priceHistory].sort((a, b) => a.t - b.t);
    const span = sorted[sorted.length - 1].t - sorted[0].t;
    if (span > 0) return span;
  }
  if (trades.length >= 2) {
    const sorted = [...trades].sort((a, b) => a.timestamp - b.timestamp);
    const span = sorted[sorted.length - 1].timestamp - sorted[0].timestamp;
    if (span > 0) return span;
  }
  return null;
}

/**
 * Pick the right fidelity (minutes) for a given market duration.
 * Always returns interval="all" so the CLOB API returns the full market
 * history regardless of when the market resolved (interval params like "1h"
 * are relative to *now*, so they return nothing for historical markets).
 * Client-side filtering handles the per-button zoom level.
 */
export function priceHistoryParamsForDuration(durationSeconds: number | null): {
  interval: import("@/lib/constants").PriceHistoryInterval;
  fidelity: number;
} {
  if (durationSeconds == null || durationSeconds > 7 * 86400) {
    return { interval: "all", fidelity: 1440 };
  }
  if (durationSeconds > 86400) return { interval: "all", fidelity: 60 };
  if (durationSeconds > 6 * 3600) return { interval: "all", fidelity: 5 };
  // Short/medium market (≤ 6 hours): 1-minute fidelity
  return { interval: "all", fidelity: 1 };
}

/**
 * Tolerance for nearest-price lookup, scaled to market duration so that
 * for a 5-minute market we don't accept a point that's 2 hours away.
 */
function toleranceForDuration(durationSeconds: number | null): number {
  if (durationSeconds == null) return 7200; // default 2 hours
  if (durationSeconds < 600) return 60;    // < 10 min → 1 min tolerance
  if (durationSeconds < 3600) return 300;  // < 1 hour → 5 min tolerance
  if (durationSeconds < 6 * 3600) return 900; // < 6 hours → 15 min tolerance
  return 7200; // default 2 hours
}

function findNearestPrice(
  history: PricePoint[],
  targetTs: number,
  maxTolerance: number
): number | null {
  if (!history.length) return null;
  let closest = history[0];
  let minDiff = Math.abs(history[0].t - targetTs);
  for (const point of history) {
    const diff = Math.abs(point.t - targetTs);
    if (diff < minDiff) {
      minDiff = diff;
      closest = point;
    }
  }
  if (minDiff > maxTolerance) return null;
  return closest.p;
}

export function computeTradeImpacts(
  trades: Trade[],
  priceHistory: PricePoint[],
  marketDurationSeconds?: number | null
): TradeWithImpact[] {
  // If price history hasn't loaded yet, return the trades with null impact fields
  // so the table shows trade rows (without impact data) rather than appearing empty.
  if (!priceHistory.length) {
    return trades.map((trade) => ({
      ...trade,
      priceAtTrade: trade.price,
      priceAfter5m: null,
      priceAfter15m: null,
      priceAfter1h: null,
      priceAfter6h: null,
      priceAfter24h: null,
      impact5m: null,
      impact15m: null,
      impact1h: null,
      impact6h: null,
      impact24h: null,
    }));
  }

  const sorted = [...priceHistory].sort((a, b) => a.t - b.t);
  const lastTs = sorted[sorted.length - 1].t;

  const duration = marketDurationSeconds ?? inferMarketDuration(priceHistory, trades);
  const tolerance = toleranceForDuration(duration);

  return trades.map((trade) => {
    const priceAtTrade =
      findNearestPrice(sorted, trade.timestamp, tolerance) ?? trade.price;

    const ts5m  = trade.timestamp + 300;
    const ts15m = trade.timestamp + 900;
    const ts1h  = trade.timestamp + 3600;
    const ts6h  = trade.timestamp + 21600;
    const ts24h = trade.timestamp + 86400;

    const priceAfter5m  = ts5m  <= lastTs ? findNearestPrice(sorted, ts5m,  tolerance) : null;
    const priceAfter15m = ts15m <= lastTs ? findNearestPrice(sorted, ts15m, tolerance) : null;
    const priceAfter1h  = ts1h  <= lastTs ? findNearestPrice(sorted, ts1h,  tolerance) : null;
    const priceAfter6h  = ts6h  <= lastTs ? findNearestPrice(sorted, ts6h,  tolerance) : null;
    const priceAfter24h = ts24h <= lastTs ? findNearestPrice(sorted, ts24h, tolerance) : null;

    return {
      ...trade,
      priceAtTrade,
      priceAfter5m,
      priceAfter15m,
      priceAfter1h,
      priceAfter6h,
      priceAfter24h,
      impact5m:  priceAfter5m  != null ? priceAfter5m  - priceAtTrade : null,
      impact15m: priceAfter15m != null ? priceAfter15m - priceAtTrade : null,
      impact1h:  priceAfter1h  != null ? priceAfter1h  - priceAtTrade : null,
      impact6h:  priceAfter6h  != null ? priceAfter6h  - priceAtTrade : null,
      impact24h: priceAfter24h != null ? priceAfter24h - priceAtTrade : null,
    };
  });
}
