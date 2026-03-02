export const API_BASE = {
  GAMMA: "https://gamma-api.polymarket.com",
  CLOB: "https://clob.polymarket.com",
  DATA: "https://data-api.polymarket.com",
} as const;

export const POLYMARKET_PROFILE_URL = "https://polymarket.com/profile";
export const POLYMARKET_MARKET_URL = "https://polymarket.com/event";

export const PRICE_HISTORY_INTERVALS = ["1h", "6h", "1d", "1w", "1m", "max", "all"] as const;
export type PriceHistoryInterval = (typeof PRICE_HISTORY_INTERVALS)[number];

export const CLOSED_POSITIONS_POLL_MS = 120_000;
export const WALLET_TRADES_POLL_MS = 30_000;

export const COLORS = {
  gold: "#c9a84c",
  crimson: "#c94c4c",
  teal: "#4cc9a8",
  background: "#0a0a0f",
  surface: "#111118",
  border: "#1e1e2e",
} as const;

export const IMPACT_WINDOWS = [
  { key: "1h" as const, label: "1h", seconds: 3600 },
  { key: "6h" as const, label: "6h", seconds: 21600 },
  { key: "24h" as const, label: "24h", seconds: 86400 },
];
