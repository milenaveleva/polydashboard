"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrades } from "@/lib/api/data";
import { WHALE_TRADES_POLL_MS } from "@/lib/constants";

export function useWhaleTrades(
  conditionId: string | null,
  thresholdUsd: number,
  enabled = true
) {
  return useQuery({
    queryKey: ["whaleTrades", conditionId, thresholdUsd],
    queryFn: () =>
      conditionId
        ? getTrades({
            market: conditionId,
            filterType: "CASH",
            filterAmount: thresholdUsd,
            limit: 100,
          })
        : Promise.resolve([]),
    enabled: !!conditionId && enabled,
    refetchInterval: WHALE_TRADES_POLL_MS,
  });
}
