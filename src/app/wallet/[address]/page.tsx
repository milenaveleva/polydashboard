"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { WalletHeader } from "@/components/wallet-header";
import { PositionCard } from "@/components/position-card";
import { useClosedPositionsInfinite } from "@/hooks/use-closed-positions-infinite";
import { useWalletStats } from "@/hooks/use-wallet-stats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  SortAsc,
  SortDesc,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Loader2,
} from "lucide-react";
import { formatUSD } from "@/lib/utils";

type SortField = "pnl" | "invested" | "time";

export default function WalletOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const address =
    typeof params.address === "string" ? params.address : null;

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("time");
  const [sortAsc, setSortAsc] = useState(false);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useClosedPositionsInfinite(address);
  const { data: walletStats } = useWalletStats(address);

  // Eagerly fetch every page so stats (PnL, win-rate) cover ALL positions.
  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const positions = useMemo(
    () => data?.pages.flatMap((page) => page) ?? [],
    [data]
  );

  const allLoaded = !hasNextPage && !isLoading;

  const totalPnl = useMemo(
    () => positions.reduce((sum, p) => sum + (p.realizedPnl ?? 0), 0),
    [positions]
  );
  const totalInvested = useMemo(
    () => positions.reduce((sum, p) => sum + (p.totalBought ?? 0), 0),
    [positions]
  );
  const winCount = useMemo(
    () => positions.filter((p) => p.realizedPnl > 0).length,
    [positions]
  );
  const winRate = positions.length > 0 ? winCount / positions.length : 0;

  // Infinite-scroll sentinel — triggers next page when scrolled into view as a fallback
  const sentinelRef = useRef<HTMLDivElement>(null);
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "400px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect]);

  const filtered = useMemo(() => {
    let list = positions;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        (p.title ?? "").toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => {
      let cmp = 0;
      if (sortField === "pnl") cmp = a.realizedPnl - b.realizedPnl;
      else if (sortField === "invested") cmp = a.totalBought - b.totalBought;
      else cmp = a.timestamp - b.timestamp;
      return sortAsc ? cmp : -cmp;
    });
  }, [positions, search, sortField, sortAsc]);

  const handleSortToggle = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  if (!address) {
    router.push("/");
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
        <div className="container px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back
              </Button>
            </Link>
          </div>
          <WalletHeader address={address} />
        </div>
      </header>

      <div className="container px-4 py-6 space-y-6">
        {/* Stats row — Account Equity from Polymarket snapshot; Predictions = markets traded; Realized PnL = sum of closed positions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {walletStats?.equity != null && (
            <StatCard
              label="Account Equity"
              value={formatUSD(walletStats.equity)}
              prefix={walletStats.equity >= 0 ? "" : "-"}
              color={walletStats.equity >= 0 ? "teal" : "crimson"}
              icon={walletStats.equity >= 0 ? TrendingUp : TrendingDown}
            />
          )}
          <StatCard
            label="Realized PnL"
            value={formatUSD(Math.abs(totalPnl))}
            prefix={totalPnl >= 0 ? "+" : "-"}
            color={totalPnl >= 0 ? "teal" : "crimson"}
            icon={totalPnl >= 0 ? TrendingUp : TrendingDown}
          />
          <StatCard
            label="Total Invested"
            value={formatUSD(totalInvested)}
            color="gold"
            icon={DollarSign}
          />
          <StatCard
            label="Predictions"
            value={walletStats?.traded != null ? String(walletStats.traded) : "-"}
            subtitle="markets traded"
            color="default"
          />
          <StatCard
            label="Closed Positions"
            value={String(positions.length)}
            subtitle={allLoaded ? undefined : "loading…"}
            color="default"
          />
          <StatCard
            label="Win Rate"
            value={`${(winRate * 100).toFixed(0)}%`}
            subtitle={`${winCount}W / ${positions.length - winCount}L${allLoaded ? "" : " (loading…)"}`}
            color={winRate >= 0.5 ? "teal" : "crimson"}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter positions..."
              className="pl-10 h-9 text-sm bg-surface border-border"
            />
          </div>
          <div className="flex gap-1.5">
            {(
              [
                { field: "time" as const, label: "Recent" },
                { field: "pnl" as const, label: "PnL" },
                { field: "invested" as const, label: "Size" },
              ] as const
            ).map(({ field, label }) => (
              <button
                key={field}
                onClick={() => handleSortToggle(field)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  sortField === field
                    ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
                {sortField === field &&
                  (sortAsc ? (
                    <SortAsc className="w-3 h-3" />
                  ) : (
                    <SortDesc className="w-3 h-3" />
                  ))}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-accent-crimson/50 bg-accent-crimson/10 p-4 text-accent-crimson text-sm">
            Failed to load positions. The address may not exist or the API may
            be down.
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-lg border border-border bg-surface animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Position grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((position) => (
              <PositionCard
                key={`${position.conditionId}-${position.outcomeIndex}`}
                position={position}
                walletAddress={address}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            {positions.length === 0 && allLoaded
              ? "No closed positions found for this wallet."
              : positions.length === 0
                ? "Loading positions…"
                : "No positions match your filter."}
          </p>
        )}

        {/* Sentinel for infinite scroll + loading progress */}
        <div ref={sentinelRef} />
        {(isFetchingNextPage || (hasNextPage && !error)) && (
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading positions… ({positions.length} so far)
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  prefix,
  subtitle,
  color,
  icon: Icon,
}: {
  label: string;
  value: string;
  prefix?: string;
  subtitle?: string;
  color: "teal" | "crimson" | "gold" | "default";
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const colorMap = {
    teal: "text-accent-teal",
    crimson: "text-accent-crimson",
    gold: "text-accent-gold",
    default: "text-foreground",
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-3 space-y-1">
      <div className="flex items-center gap-1.5">
        {Icon && (
          <Icon className={`w-3.5 h-3.5 ${colorMap[color]}`} />
        )}
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p className={`font-mono text-lg font-semibold ${colorMap[color]}`}>
        {prefix}
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-muted-foreground font-mono">{subtitle}</p>
      )}
    </div>
  );
}
