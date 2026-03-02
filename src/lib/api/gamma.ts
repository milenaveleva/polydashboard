import { API_BASE } from "@/lib/constants";
import { getFetchUrl } from "@/lib/api/proxy";
import type { WalletProfile } from "@/lib/types";

export async function getProfile(address: string): Promise<WalletProfile | null> {
  const search = new URLSearchParams({ address });
  const url = `${API_BASE.GAMMA}/public-profile?${search.toString()}`;
  const res = await fetch(getFetchUrl(url));
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Gamma API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
