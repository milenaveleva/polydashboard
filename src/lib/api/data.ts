import { API_BASE } from "@/lib/constants";
import { getFetchUrl } from "@/lib/api/proxy";
import type { Trade, MetaHolder } from "@/lib/types";

export interface GetTradesParams {
  market?: string;
  filterType?: "CASH" | "TOKENS";
  filterAmount?: number;
  limit?: number;
  offset?: number;
  user?: string;
  side?: "BUY" | "SELL";
  takerOnly?: boolean;
}

export async function getTrades(params: GetTradesParams = {}): Promise<Trade[]> {
  const search = new URLSearchParams();
  if (params.market) search.set("market", params.market);
  if (params.filterType) search.set("filterType", params.filterType);
  if (params.filterAmount != null) search.set("filterAmount", String(params.filterAmount));
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.offset != null) search.set("offset", String(params.offset));
  if (params.user) search.set("user", params.user);
  if (params.side) search.set("side", params.side);
  if (params.takerOnly !== undefined) search.set("takerOnly", String(params.takerOnly));

  const url = `${API_BASE.DATA}/trades?${search.toString()}`;
  const res = await fetch(getFetchUrl(url));
  if (!res.ok) throw new Error(`Data API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export interface GetHoldersParams {
  market: string;
  limit?: number;
  minBalance?: number;
}

export async function getHolders(params: GetHoldersParams): Promise<MetaHolder[]> {
  const search = new URLSearchParams();
  search.set("market", params.market);
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.minBalance != null) search.set("minBalance", String(params.minBalance));

  const url = `${API_BASE.DATA}/holders?${search.toString()}`;
  const res = await fetch(getFetchUrl(url));
  if (!res.ok) throw new Error(`Data API error: ${res.status} ${res.statusText}`);
  return res.json();
}
