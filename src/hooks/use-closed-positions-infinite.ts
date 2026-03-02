"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getClosedPositions } from "@/lib/api/data";
import type { GetClosedPositionsParams } from "@/lib/api/data";
import { CLOSED_POSITIONS_POLL_MS } from "@/lib/constants";

/** Must match Polymarket API max limit (50) so pagination correctly detects when more pages exist */
const PAGE_SIZE = 50;

export function useClosedPositionsInfinite(
  address: string | null,
  options?: Partial<Omit<GetClosedPositionsParams, "user" | "limit" | "offset">>
) {
  return useInfiniteQuery({
    queryKey: ["closedPositionsInfinite", address, options],
    queryFn: ({ pageParam = 0 }) =>
      address
        ? getClosedPositions({
            user: address,
            limit: PAGE_SIZE,
            offset: pageParam as number,
            sortBy: options?.sortBy ?? "TIMESTAMP",
            sortDirection: options?.sortDirection ?? "DESC",
            ...options,
          })
        : Promise.resolve([]),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE;
    },
    enabled: !!address,
    refetchInterval: CLOSED_POSITIONS_POLL_MS,
  });
}
