import { API_BASE } from "@/lib/constants";
import { getFetchUrl } from "@/lib/api/proxy";
import type { Market } from "@/lib/types";

export interface ListMarketsParams {
  active?: boolean;
  closed?: boolean;
  limit?: number;
  offset?: number;
  order?: string;
  ascending?: boolean;
  tag_id?: number[];
  tag_slug?: string[];
  volume_num_min?: number;
  volume_num_max?: number;
  liquidity_num_min?: number;
  liquidity_num_max?: number;
  end_date_min?: string;
  end_date_max?: string;
}

export async function listMarkets(params: ListMarketsParams = {}): Promise<Market[]> {
  const search = new URLSearchParams();

  if (params.active !== undefined) search.set("active", String(params.active));
  if (params.closed !== undefined) search.set("closed", String(params.closed));
  if (params.limit !== undefined) search.set("limit", String(params.limit));
  if (params.offset !== undefined) search.set("offset", String(params.offset));
  if (params.order) search.set("order", params.order);
  if (params.ascending !== undefined) search.set("ascending", String(params.ascending));
  if (params.tag_id?.length) search.set("tag_id", params.tag_id.join(","));
  if (params.tag_slug?.length) search.set("tag_slug", params.tag_slug.join(","));
  if (params.volume_num_min != null) search.set("volume_num_min", String(params.volume_num_min));
  if (params.volume_num_max != null) search.set("volume_num_max", String(params.volume_num_max));
  if (params.liquidity_num_min != null) search.set("liquidity_num_min", String(params.liquidity_num_min));
  if (params.liquidity_num_max != null) search.set("liquidity_num_max", String(params.liquidity_num_max));
  if (params.end_date_min) search.set("end_date_min", params.end_date_min);
  if (params.end_date_max) search.set("end_date_max", params.end_date_max);

  const url = `${API_BASE.GAMMA}/markets?${search.toString()}`;
  const res = await fetch(getFetchUrl(url));
  if (!res.ok) throw new Error(`Gamma API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getMarketBySlug(slug: string): Promise<Market | null> {
  const search = new URLSearchParams({ slug });
  const url = `${API_BASE.GAMMA}/markets?${search.toString()}`;
  const res = await fetch(getFetchUrl(url));
  if (!res.ok) throw new Error(`Gamma API error: ${res.status} ${res.statusText}`);
  const data: Market[] = await res.json();
  return data[0] ?? null;
}

export async function getMarketById(id: string): Promise<Market | null> {
  const url = `${API_BASE.GAMMA}/markets/${id}`;
  const res = await fetch(getFetchUrl(url));
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Gamma API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
