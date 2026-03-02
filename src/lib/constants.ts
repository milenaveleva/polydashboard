export const API_BASE = {
  GAMMA: "https://gamma-api.polymarket.com",
  CLOB: "https://clob.polymarket.com",
  DATA: "https://data-api.polymarket.com",
} as const;

export const POLYMARKET_MARKET_URL = "https://polymarket.com/event";

export const DEFAULT_WHALE_THRESHOLD_USD = 1000;

export const PRICE_HISTORY_INTERVALS = ["1h", "6h", "1d", "1w", "1m", "max", "all"] as const;
export type PriceHistoryInterval = (typeof PRICE_HISTORY_INTERVALS)[number];

export const MARKET_LIST_POLL_MS = 60_000;
export const WHALE_TRADES_POLL_MS = 15_000;

export const COLORS = {
  gold: "#c9a84c",
  crimson: "#c94c4c",
  teal: "#4cc9a8",
  background: "#0a0a0f",
  surface: "#111118",
  border: "#1e1e2e",
} as const;
