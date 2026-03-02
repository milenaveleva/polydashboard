import { API_BASE } from "@/lib/constants";
import { getFetchUrl } from "@/lib/api/proxy";
import type { Trade, ClosedPosition, Position } from "@/lib/types";

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

export interface GetClosedPositionsParams {
  user: string;
  market?: string;
  title?: string;
  limit?: number;
  offset?: number;
  sortBy?: "REALIZEDPNL" | "TITLE" | "PRICE" | "AVGPRICE" | "TIMESTAMP";
  sortDirection?: "ASC" | "DESC";
}

export async function getClosedPositions(
  params: GetClosedPositionsParams
): Promise<ClosedPosition[]> {
  const search = new URLSearchParams();
  search.set("user", params.user);
  if (params.market) search.set("market", params.market);
  if (params.title) search.set("title", params.title);
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.offset != null) search.set("offset", String(params.offset));
  if (params.sortBy) search.set("sortBy", params.sortBy);
  if (params.sortDirection) search.set("sortDirection", params.sortDirection);

  const url = `${API_BASE.DATA}/closed-positions?${search.toString()}`;
  const res = await fetch(getFetchUrl(url));
  if (!res.ok) throw new Error(`Data API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export interface GetPositionsParams {
  user: string;
  market?: string;
  limit?: number;
  offset?: number;
  sortBy?: "CURRENT" | "INITIAL" | "TOKENS" | "CASHPNL" | "PERCENTPNL" | "TITLE" | "RESOLVING" | "PRICE" | "AVGPRICE";
  sortDirection?: "ASC" | "DESC";
  sizeThreshold?: number;
}

export interface TradedResponse {
  user: string;
  traded: number;
}

export async function getTradedCount(user: string): Promise<number> {
  const url = `${API_BASE.DATA}/traded?user=${encodeURIComponent(user)}`;
  const res = await fetch(getFetchUrl(url));
  if (!res.ok) throw new Error(`Data API error: ${res.status} ${res.statusText}`);
  const data = (await res.json()) as TradedResponse;
  return data.traded ?? 0;
}

export async function getPositions(params: GetPositionsParams): Promise<Position[]> {
  const search = new URLSearchParams();
  search.set("user", params.user);
  if (params.market) search.set("market", params.market);
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.offset != null) search.set("offset", String(params.offset));
  if (params.sortBy) search.set("sortBy", params.sortBy);
  if (params.sortDirection) search.set("sortDirection", params.sortDirection);
  if (params.sizeThreshold != null) search.set("sizeThreshold", String(params.sizeThreshold));

  const url = `${API_BASE.DATA}/positions?${search.toString()}`;
  const res = await fetch(getFetchUrl(url));
  if (!res.ok) throw new Error(`Data API error: ${res.status} ${res.statusText}`);
  return res.json();
}
