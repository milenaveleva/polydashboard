"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { truncateAddress, formatUSD } from "@/lib/utils";

interface WalletWinRateRow {
  rank: number;
  proxyWallet: string;
  userName: string | null;
  profileImage: string | null;
  verifiedBadge: boolean;
  wins: number;
  totalBets: number;
  winRate: number;
  /** Sum of realizedPnl across all closed positions (aligns with Polymarket) */
  totalPnlFromClosed: number;
  pnlFromLeaderboard: number | null;
  volumeFromLeaderboard: number | null;
}

interface WalletWinRateResponse {
  generatedAt: string;
  summary: {
    resultCount: number;
    minBets: number;
    scanPages: number;
    maxWallets: number;
    categoriesScanned: string[];
    timePeriodsScanned: string[];
    orderByScanned: string[];
    candidateWalletsFound: number;
    candidateWalletsAnalyzed: number;
    walletsErrored: number;
    walletsWithNoClosedPositions: number;
    targetScannedWallets: number;
  };
  results: WalletWinRateRow[];
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function formatCompact(value: number | null): string {
  if (value == null) return "-";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function TopWalletWinRatePage() {
  const [minBets, setMinBets] = useState(100);
  const [queryMinBets, setQueryMinBets] = useState(100);

  const query = useQuery({
    queryKey: ["walletWinRates", queryMinBets],
    queryFn: async (): Promise<WalletWinRateResponse> => {
      const search = new URLSearchParams({
        minBets: String(queryMinBets),
      });

      const res = await fetch(`/api/wallets/top-win-rate?${search.toString()}`);
      if (!res.ok) {
        throw new Error(`Failed to load leaderboard: ${res.status}`);
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const generatedAtLabel = useMemo(() => {
    if (!query.data?.generatedAt) return "-";
    return new Date(query.data.generatedAt).toLocaleString();
  }, [query.data?.generatedAt]);

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/70">
        <div className="container px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Back
              </Button>
            </Link>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Copy Trading Intelligence
              </p>
              <h1 className="text-xl font-semibold text-foreground">
                Top 100 Wallets by Win Ratio
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={100}
              value={minBets}
              onChange={(e) => setMinBets(Math.max(100, Number(e.target.value) || 100))}
              className="w-28 h-9 bg-background border-border font-mono text-sm"
              aria-label="Minimum closed bets"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQueryMinBets(minBets)}
            >
              Apply Min Bets
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => query.refetch()}
              disabled={query.isFetching}
            >
              {query.isFetching ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-1.5" />
              )}
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-6 space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            label="Wallets Scanned"
            value={String(query.data?.summary.candidateWalletsAnalyzed ?? "-")}
          />
          <StatCard
            label="Target Scan Size"
            value={String(query.data?.summary.targetScannedWallets ?? "-")}
          />
          <StatCard
            label="Candidates Found"
            value={String(query.data?.summary.candidateWalletsFound ?? "-")}
          />
          <StatCard
            label="No Closed Bets"
            value={String(query.data?.summary.walletsWithNoClosedPositions ?? "-")}
          />
          <StatCard
            label="Last Updated"
            value={generatedAtLabel}
            mono={false}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Win ratio = winning closed bets / total closed bets. All closed positions are
          fetched per wallet (no sampling). Closed PnL is the sum of realized PnL across
          closed positions and should align with Polymarket. Wallets are from
          Polymarket&apos;s leaderboard; top 100 by win ratio with at least 100 closed bets.
        </p>

        {query.isLoading && (
          <div className="rounded-lg border border-border bg-surface p-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Building leaderboard from live Polymarket data...
          </div>
        )}

        {query.error && (
          <div className="rounded-lg border border-accent-crimson/50 bg-accent-crimson/10 p-4 text-sm text-accent-crimson">
            Failed to load wallet win ratios. Try refreshing in a few seconds.
          </div>
        )}

        {!query.isLoading && !query.error && (
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-surface border-b border-border">
                  <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Rank</th>
                    <th className="px-4 py-3 font-medium">Wallet</th>
                    <th className="px-4 py-3 font-medium">Win Ratio</th>
                    <th className="px-4 py-3 font-medium">Wins</th>
                    <th className="px-4 py-3 font-medium">Total Bets</th>
                    <th className="px-4 py-3 font-medium">Closed PnL</th>
                    <th className="px-4 py-3 font-medium">Leaderboard PnL</th>
                    <th className="px-4 py-3 font-medium">Leaderboard Vol</th>
                  </tr>
                </thead>
                <tbody>
                  {(query.data?.results ?? []).map((row) => (
                    <tr
                      key={row.proxyWallet}
                      className="border-b border-border/70 bg-background/60 hover:bg-surface/60 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-accent-gold">#{row.rank}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <Link
                            href={`/wallet/${row.proxyWallet}`}
                            className="font-medium text-foreground hover:text-accent-gold transition-colors"
                          >
                            {row.userName || truncateAddress(row.proxyWallet)}
                            {row.verifiedBadge ? " · verified" : ""}
                          </Link>
                          <span className="text-xs font-mono text-muted-foreground">
                            {truncateAddress(row.proxyWallet, 8)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-accent-teal">
                        {formatPercent(row.winRate)}
                      </td>
                      <td className="px-4 py-3 font-mono">{row.wins}</td>
                      <td className="px-4 py-3 font-mono">{row.totalBets}</td>
                      <td
                        className={`px-4 py-3 font-mono ${
                          row.totalPnlFromClosed >= 0 ? "text-accent-teal" : "text-accent-crimson"
                        }`}
                      >
                        {row.totalPnlFromClosed >= 0 ? "+" : ""}
                        {formatUSD(row.totalPnlFromClosed)}
                      </td>
                      <td className="px-4 py-3 font-mono">{formatCompact(row.pnlFromLeaderboard)}</td>
                      <td className="px-4 py-3 font-mono">{formatCompact(row.volumeFromLeaderboard)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!query.isLoading && !query.error && (query.data?.results?.length ?? 0) === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No wallets match the current filter. Lower the minimum bets and retry.
          </p>
        )}

        <div className="flex justify-end">
          <a
            href="https://polymarket.com/leaderboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-accent-gold transition-colors"
          >
            Open Polymarket leaderboard
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  mono = true,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3 space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-base ${mono ? "font-mono" : "text-xs sm:text-sm"}`}>{value}</p>
    </div>
  );
}
