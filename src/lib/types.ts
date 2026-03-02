// Data API — Trade
export interface Trade {
  proxyWallet: string;
  side: "BUY" | "SELL";
  asset: string;
  conditionId: string;
  size: number;
  price: number;
  timestamp: number;
  title?: string;
  slug?: string;
  icon?: string;
  eventSlug?: string;
  outcome?: string;
  outcomeIndex?: number;
  name?: string;
  pseudonym?: string;
  bio?: string;
  profileImage?: string;
  profileImageOptimized?: string;
  transactionHash?: string;
  [key: string]: unknown;
}

// Data API — Closed Position
export interface ClosedPosition {
  proxyWallet: string;
  asset: string;
  conditionId: string;
  avgPrice: number;
  totalBought: number;
  realizedPnl: number;
  curPrice: number;
  timestamp: number;
  title: string;
  slug: string;
  icon?: string;
  eventSlug?: string;
  outcome: string;
  outcomeIndex: number;
  oppositeOutcome?: string;
  oppositeAsset?: string;
  endDate?: string;
  [key: string]: unknown;
}

// Data API — Current Position
export interface Position {
  proxyWallet: string;
  asset: string;
  conditionId: string;
  size: number;
  avgPrice: number;
  initialValue: number;
  currentValue: number;
  cashPnl: number;
  percentPnl: number;
  totalBought: number;
  realizedPnl: number;
  percentRealizedPnl: number;
  curPrice: number;
  redeemable: boolean;
  mergeable: boolean;
  title: string;
  slug: string;
  icon?: string;
  eventSlug?: string;
  outcome: string;
  outcomeIndex: number;
  oppositeOutcome?: string;
  oppositeAsset?: string;
  endDate?: string;
  negativeRisk?: boolean;
  [key: string]: unknown;
}

// Gamma API — Public Profile
export interface WalletProfile {
  createdAt: string | null;
  proxyWallet: string | null;
  profileImage: string | null;
  displayUsernamePublic: boolean | null;
  bio: string | null;
  pseudonym: string | null;
  name: string | null;
  xUsername: string | null;
  verifiedBadge: boolean | null;
  users?: Array<{ id: string; creator: boolean; mod: boolean }>;
}

// CLOB API — price history
export interface PriceHistoryResponse {
  history: PricePoint[];
}

export type PricePoint = { t: number; p: number };

// Trade with computed impact data (used in the UI)
export interface TradeWithImpact extends Trade {
  priceAtTrade: number;
  // Short-market windows (5 min, 15 min)
  priceAfter5m: number | null;
  priceAfter15m: number | null;
  // Standard windows (1h, 6h, 24h)
  priceAfter1h: number | null;
  priceAfter6h: number | null;
  priceAfter24h: number | null;
  impact5m: number | null;
  impact15m: number | null;
  impact1h: number | null;
  impact6h: number | null;
  impact24h: number | null;
}
