"use client";

import { useQuery } from "@tanstack/react-query";
import { listMarkets } from "@/lib/api/gamma";
import type { MarketFilters } from "@/lib/types";
import { MARKET_LIST_POLL_MS } from "@/lib/constants";

function buildListParams(filters: MarketFilters | undefined) {
  const params: Parameters<typeof listMarkets>[0] = {
    active: true,
    closed: false,
    limit: 100,
  };
  if (!filters) return params;
  if (filters.volumeNumMin != null) params.volume_num_min = filters.volumeNumMin;
  if (filters.volumeNumMax != null) params.volume_num_max = filters.volumeNumMax;
  if (filters.liquidityNumMin != null) params.liquidity_num_min = filters.liquidityNumMin;
  if (filters.liquidityNumMax != null) params.liquidity_num_max = filters.liquidityNumMax;
  if (filters.endDateMin) params.end_date_min = filters.endDateMin;
  if (filters.endDateMax) params.end_date_max = filters.endDateMax;
  if (filters.tagSlug?.length) params.tag_slug = filters.tagSlug;
  switch (filters.sort) {
    case "volume":
      params.order = "volumeNum";
      params.ascending = false;
      break;
    case "newest":
      params.order = "startDateIso";
      params.ascending = false;
      break;
    case "contested":
      params.order = "outcomePrices";
      params.ascending = true;
      break;
    default:
      params.order = "volumeNum";
      params.ascending = false;
  }
  return params;
}

export function useMarkets(filters: MarketFilters | undefined) {
  const listParams = buildListParams(filters);
  return useQuery({
    queryKey: ["markets", listParams],
    queryFn: () => listMarkets(listParams),
    refetchInterval: MARKET_LIST_POLL_MS,
  });
}
