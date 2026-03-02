"use client";

import { useQuery } from "@tanstack/react-query";
import { getMarketBySlug } from "@/lib/api/gamma";

export function useMarket(slug: string | null) {
  return useQuery({
    queryKey: ["market", slug],
    queryFn: () => (slug ? getMarketBySlug(slug) : Promise.resolve(null)),
    enabled: !!slug,
  });
}
