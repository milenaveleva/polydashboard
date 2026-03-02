import { NextRequest, NextResponse } from "next/server";
import { API_BASE } from "@/lib/constants";

type LeaderboardCategory =
  | "OVERALL"
  | "POLITICS"
  | "SPORTS"
  | "CRYPTO"
  | "CULTURE"
  | "MENTIONS"
  | "WEATHER"
  | "ECONOMICS"
  | "TECH"
  | "FINANCE";

type LeaderboardTimePeriod = "DAY" | "WEEK" | "MONTH" | "ALL";

interface LeaderboardEntry {
  rank: string;
  proxyWallet: string;
  userName?: string;
  vol?: number;
  pnl?: number;
  profileImage?: string;
  verifiedBadge?: boolean;
}

type LeaderboardOrderBy = "PNL" | "VOL";

interface ClosedPosition {
  realizedPnl: number;
}

interface WalletWinRateRow {
  rank: number;
  proxyWallet: string;
  userName: string | null;
  profileImage: string | null;
  verifiedBadge: boolean;
  wins: number;
  totalBets: number;
  winRate: number;
  /** Sum of realizedPnl across all closed positions (should align with Polymarket) */
  totalPnlFromClosed: number;
  pnlFromLeaderboard: number | null;
  volumeFromLeaderboard: number | null;
}

const LEADERBOARD_PAGE_SIZE = 50;
const CLOSED_POSITIONS_PAGE_SIZE = 50;

const RESULT_COUNT = 100;
const TARGET_SCANNED_WALLETS = 10000;
const DEFAULT_MIN_BETS = 100;
const DEFAULT_SCAN_PAGES = 100;
const DEFAULT_MAX_WALLETS = 10000;
/** Max pages to fetch per wallet. Pagination stops earlier when a page returns fewer items. */
const MAX_CLOSED_POSITION_PAGES = 10000;

const LEADERBOARD_CATEGORIES: LeaderboardCategory[] = [
  "OVERALL",
  "POLITICS",
  "SPORTS",
  "CRYPTO",
  "CULTURE",
  "TECH",
  "FINANCE",
  "ECONOMICS",
];

const LEADERBOARD_TIME_PERIODS: LeaderboardTimePeriod[] = ["ALL", "MONTH"];
const LEADERBOARD_ORDER_BY: LeaderboardOrderBy[] = ["PNL", "VOL"];

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Polydashboard/1.0",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Data API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

function toPositiveInt(
  value: string | null,
  fallback: number,
  max: number
): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.min(Math.floor(parsed), max);
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const result: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const current = nextIndex++;
      result[current] = await mapper(items[current], current);
    }
  }

  await Promise.all(
    Array.from({ length: Math.max(1, Math.min(concurrency, items.length)) }, () =>
      worker()
    )
  );

  return result;
}

function buildLeaderboardUrl(
  category: LeaderboardCategory,
  timePeriod: LeaderboardTimePeriod,
  orderBy: LeaderboardOrderBy,
  offset: number
): string {
  const search = new URLSearchParams({
    category,
    timePeriod,
    orderBy,
    limit: String(LEADERBOARD_PAGE_SIZE),
    offset: String(offset),
  });
  return `${API_BASE.DATA}/v1/leaderboard?${search.toString()}`;
}

function buildClosedPositionsUrl(wallet: string, offset: number): string {
  const search = new URLSearchParams({
    user: wallet,
    limit: String(CLOSED_POSITIONS_PAGE_SIZE),
    offset: String(offset),
    sortBy: "TIMESTAMP",
    sortDirection: "DESC",
  });
  return `${API_BASE.DATA}/closed-positions?${search.toString()}`;
}

async function getWalletWinStats(
  wallet: string
): Promise<{ wins: number; totalBets: number; totalPnl: number }> {
  let wins = 0;
  let totalBets = 0;
  let totalPnl = 0;

  for (let page = 0; page < MAX_CLOSED_POSITION_PAGES; page += 1) {
    const offset = page * CLOSED_POSITIONS_PAGE_SIZE;
    const data = await fetchJson<ClosedPosition[]>(buildClosedPositionsUrl(wallet, offset));

    if (data.length === 0) break;

    totalBets += data.length;
    wins += data.filter((p) => (p.realizedPnl ?? 0) > 0).length;
    totalPnl += data.reduce((sum, p) => sum + (p.realizedPnl ?? 0), 0);

    if (data.length < CLOSED_POSITIONS_PAGE_SIZE) break;
  }

  return { wins, totalBets, totalPnl };
}

export async function GET(request: NextRequest) {
  try {
    const minBets = Math.max(
      DEFAULT_MIN_BETS,
      toPositiveInt(request.nextUrl.searchParams.get("minBets"), DEFAULT_MIN_BETS, 5000)
    );
    const scanPages = toPositiveInt(
      request.nextUrl.searchParams.get("scanPages"),
      DEFAULT_SCAN_PAGES,
      21
    );
    const maxWallets = toPositiveInt(
      request.nextUrl.searchParams.get("maxWallets"),
      DEFAULT_MAX_WALLETS,
      30000
    );
    const leaderboardTasks: Array<{
      category: LeaderboardCategory;
      timePeriod: LeaderboardTimePeriod;
      orderBy: LeaderboardOrderBy;
      offset: number;
    }> = [];

    for (const category of LEADERBOARD_CATEGORIES) {
      for (const timePeriod of LEADERBOARD_TIME_PERIODS) {
        for (const orderBy of LEADERBOARD_ORDER_BY) {
          for (let page = 0; page < scanPages; page += 1) {
            leaderboardTasks.push({
              category,
              timePeriod,
              orderBy,
              offset: page * LEADERBOARD_PAGE_SIZE,
            });
          }
        }
      }
    }

    const leaderboardPages = await mapWithConcurrency(
      leaderboardTasks,
      8,
      async (task): Promise<LeaderboardEntry[]> =>
        fetchJson<LeaderboardEntry[]>(
          buildLeaderboardUrl(task.category, task.timePeriod, task.orderBy, task.offset)
        ).catch(() => [])
    );

    const walletMap = new Map<string, LeaderboardEntry>();

    for (const page of leaderboardPages) {
      for (const row of page) {
        const wallet = row.proxyWallet?.toLowerCase();
        if (!wallet) continue;

        const existing = walletMap.get(wallet);
        if (!existing) {
          walletMap.set(wallet, row);
          continue;
        }

        const rowPnl = row.pnl ?? Number.NEGATIVE_INFINITY;
        const existingPnl = existing.pnl ?? Number.NEGATIVE_INFINITY;
        if (rowPnl > existingPnl) {
          walletMap.set(wallet, row);
        }
      }
    }

    const candidateWallets = [...walletMap.entries()]
      .sort((a, b) => (b[1].pnl ?? 0) - (a[1].pnl ?? 0))
      .slice(0, Math.max(TARGET_SCANNED_WALLETS, maxWallets));

    if (candidateWallets.length < TARGET_SCANNED_WALLETS) {
      return NextResponse.json(
        {
          error: "Insufficient unique wallets available for required scan size",
          summary: {
            targetScannedWallets: TARGET_SCANNED_WALLETS,
            candidateWalletsFound: walletMap.size,
            candidateWalletsAnalyzed: candidateWallets.length,
          },
        },
        { status: 503 }
      );
    }

    const stats = await mapWithConcurrency(candidateWallets, 6, async ([wallet, profile]) => {
      try {
        const { wins, totalBets, totalPnl } = await getWalletWinStats(wallet);
        return {
          wallet,
          profile,
          wins,
          totalBets,
          totalPnl,
          errored: false,
        };
      } catch {
        return {
          wallet,
          profile,
          wins: 0,
          totalBets: 0,
          totalPnl: 0,
          errored: true,
        };
      }
    });

    const filtered = stats
      .filter((s) => !s.errored && s.totalBets >= minBets)
      .map((s) => ({
        proxyWallet: s.wallet,
        userName: s.profile.userName ?? null,
        profileImage: s.profile.profileImage ?? null,
        verifiedBadge: Boolean(s.profile.verifiedBadge),
        wins: s.wins,
        totalBets: s.totalBets,
        winRate: s.totalBets > 0 ? s.wins / s.totalBets : 0,
        totalPnlFromClosed: s.totalPnl,
        pnlFromLeaderboard: s.profile.pnl ?? null,
        volumeFromLeaderboard: s.profile.vol ?? null,
      }))
      .sort((a, b) => {
        if (b.winRate !== a.winRate) return b.winRate - a.winRate;
        if (b.totalBets !== a.totalBets) return b.totalBets - a.totalBets;
        return b.wins - a.wins;
      })
      .slice(0, RESULT_COUNT)
      .map((row, index): WalletWinRateRow => ({ rank: index + 1, ...row }));

    if (filtered.length < RESULT_COUNT) {
      return NextResponse.json(
        {
          error: "Insufficient qualified wallets to return required top 100",
          summary: {
            requiredResults: RESULT_COUNT,
            minBets,
            qualifiedWallets: filtered.length,
            candidateWalletsAnalyzed: candidateWallets.length,
          },
        },
        { status: 503 }
      );
    }

    const erroredWallets = stats.filter((s) => s.errored).length;
    const noPositions = stats.filter((s) => !s.errored && s.totalBets === 0).length;

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      summary: {
        resultCount: RESULT_COUNT,
        minBets,
        scanPages,
        maxWallets,
        categoriesScanned: LEADERBOARD_CATEGORIES,
        timePeriodsScanned: LEADERBOARD_TIME_PERIODS,
        orderByScanned: LEADERBOARD_ORDER_BY,
        candidateWalletsFound: walletMap.size,
        candidateWalletsAnalyzed: candidateWallets.length,
        walletsErrored: erroredWallets,
        walletsWithNoClosedPositions: noPositions,
        targetScannedWallets: TARGET_SCANNED_WALLETS,
      },
      results: filtered,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to compute wallet win rates",
      },
      { status: 500 }
    );
  }
}
