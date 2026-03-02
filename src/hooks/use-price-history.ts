"use client";

import { useQuery } from "@tanstack/react-query";
import { getPricesHistory } from "@/lib/api/clob";
import type { PriceHistoryInterval } from "@/lib/constants";

// Minimum fidelity (minutes) required by the CLOB API per interval
const INTERVAL_FIDELITY: Record<PriceHistoryInterval, number> = {
  "1h": 1,
  "6h": 5,
  "1d": 5,
  "1w": 60,
  "1m": 1440,
  "all": 1440,
  "max": 1440,
};

export function usePriceHistory(
  tokenId: string | null,
  interval: PriceHistoryInterval = "1w"
) {
  return useQuery({
    queryKey: ["priceHistory", tokenId, interval],
    queryFn: () =>
      tokenId
        ? getPricesHistory({ market: tokenId, interval, fidelity: INTERVAL_FIDELITY[interval] })
        : Promise.resolve({ history: [] }),
    enabled: !!tokenId,
  });
}
