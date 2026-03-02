"use client";

import { useQuery } from "@tanstack/react-query";
import { getPricesHistory } from "@/lib/api/clob";
import type { PriceHistoryInterval } from "@/lib/constants";

const DEFAULT_INTERVAL_FIDELITY: Record<PriceHistoryInterval, number> = {
  "1h": 1,
  "6h": 1,
  "1d": 5,
  "1w": 60,
  "1m": 1440,
  "all": 1440,
  "max": 1440,
};

export function usePriceHistory(
  tokenId: string | null,
  interval: PriceHistoryInterval = "all",
  fidelityOverride?: number
) {
  const fidelity = fidelityOverride ?? DEFAULT_INTERVAL_FIDELITY[interval];
  return useQuery({
    queryKey: ["priceHistory", tokenId, interval, fidelity],
    queryFn: () =>
      tokenId
        ? getPricesHistory({ market: tokenId, interval, fidelity })
        : Promise.resolve({ history: [] }),
    enabled: !!tokenId,
  });
}
