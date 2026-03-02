"use client";

import { useQuery } from "@tanstack/react-query";

interface WalletStats {
  traded: number;
  equity: number | null;
}

export function useWalletStats(address: string | null) {
  return useQuery({
    queryKey: ["walletStats", address],
    queryFn: async (): Promise<WalletStats> => {
      if (!address) throw new Error("No address");
      const res = await fetch(`/api/wallet/${address}/stats`);
      if (!res.ok) throw new Error("Failed to fetch wallet stats");
      return res.json();
    },
    enabled: !!address,
    staleTime: 1000 * 60 * 2,
  });
}
