// Gamma API — Market (from list markets / get by slug)
export interface Market {
  id: string;
  question: string | null;
  conditionId: string;
  slug: string | null;
  endDate: string | null;
  category: string | null;
  liquidity: string | null;
  volume: string | null;
  volumeNum: number | null;
  liquidityNum: number | null;
  outcomePrices: string | null;
  outcomes: string | null;
  active: boolean | null;
  closed: boolean | null;
  description: string | null;
  resolutionSource: string | null;
  clobTokenIds: string | null;
  volume24hr: number | null;
  volume1wk: number | null;
  volume1mo: number | null;
  endDateIso: string | null;
  startDateIso: string | null;
  [key: string]: unknown;
}

// CLOB API — price history
export interface PriceHistoryResponse {
  history: Array<{ t: number; p: number }>;
}

export type PricePoint = { t: number; p: number };

// Data API — Trade (for whale feed)
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
  outcome?: string;
  outcomeIndex?: number;
  name?: string;
  pseudonym?: string;
  profileImage?: string;
  profileImageOptimized?: string;
  eventSlug?: string;
  transactionHash?: string;
  [key: string]: unknown;
}

// Data API — leaderboard / holder (for future use)
export interface Holder {
  proxyWallet: string;
  amount: number;
  outcomeIndex?: number;
  name?: string;
  pseudonym?: string;
  profileImage?: string;
  profileImageOptimized?: string;
  bio?: string;
  displayUsernamePublic?: boolean;
}

export interface MetaHolder {
  token: string;
  holders: Holder[];
}

// Filter/sort state for market browser
export interface MarketFilters {
  tagSlug?: string[];
  volumeNumMin?: number;
  volumeNumMax?: number;
  liquidityNumMin?: number;
  liquidityNumMax?: number;
  endDateMin?: string;
  endDateMax?: string;
  hasWhaleActivity?: boolean;
  sort?: "volume" | "newest" | "contested" | "whaleCount";
  searchQuery?: string;
}

export type SortOption = "volume" | "newest" | "contested" | "whaleCount";
