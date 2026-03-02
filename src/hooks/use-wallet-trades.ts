"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrades } from "@/lib/api/data";

export function useWalletTrades(
  address: string | null,
  conditionId: string | null
) {
  return useQuery({
    queryKey: ["walletTrades", address, conditionId],
    queryFn: () =>
      address && conditionId
        ? getTrades({
            user: address,
            market: conditionId,
            limit: 10000,
          })
        : Promise.resolve([]),
    enabled: !!address && !!conditionId,
  });
}
