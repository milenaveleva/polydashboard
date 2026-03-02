"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/gamma";

export function useProfile(address: string | null) {
  return useQuery({
    queryKey: ["profile", address],
    queryFn: () => (address ? getProfile(address) : Promise.resolve(null)),
    enabled: !!address,
    staleTime: 5 * 60 * 1000,
  });
}
