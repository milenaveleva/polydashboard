import { API_BASE } from "@/lib/constants";
import { getFetchUrl } from "@/lib/api/proxy";
import type { PriceHistoryResponse } from "@/lib/types";
import type { PriceHistoryInterval } from "@/lib/constants";

export interface GetPricesHistoryParams {
  market: string;
  interval?: PriceHistoryInterval | string;
  startTs?: number;
  endTs?: number;
  fidelity?: number;
}

export async function getPricesHistory(
  params: GetPricesHistoryParams
): Promise<PriceHistoryResponse> {
  const search = new URLSearchParams();
  search.set("market", params.market);
  if (params.interval) search.set("interval", params.interval);
  if (params.startTs != null) search.set("startTs", String(params.startTs));
  if (params.endTs != null) search.set("endTs", String(params.endTs));
  if (params.fidelity != null) search.set("fidelity", String(params.fidelity));

  const url = `${API_BASE.CLOB}/prices-history?${search.toString()}`;
  const res = await fetch(getFetchUrl(url));
  if (!res.ok) throw new Error(`CLOB API error: ${res.status} ${res.statusText}`);
  return res.json();
}
