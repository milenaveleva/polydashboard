"use client";

import { useQuery } from "@tanstack/react-query";
import { getClosedPositions } from "@/lib/api/data";
import type { GetClosedPositionsParams } from "@/lib/api/data";
import { CLOSED_POSITIONS_POLL_MS } from "@/lib/constants";

export function useClosedPositions(
  address: string | null,
  options?: Partial<Omit<GetClosedPositionsParams, "user">>
) {
  return useQuery({
    queryKey: ["closedPositions", address, options],
    queryFn: () =>
      address
        ? getClosedPositions({
            user: address,
            limit: options?.limit ?? 50,
            sortBy: options?.sortBy ?? "TIMESTAMP",
            sortDirection: options?.sortDirection ?? "DESC",
            ...options,
          })
        : Promise.resolve([]),
    enabled: !!address,
    refetchInterval: CLOSED_POSITIONS_POLL_MS,
  });
}
