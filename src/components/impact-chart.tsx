"use client";

import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import type { IChartApi, ISeriesApi } from "lightweight-charts";
import type { PricePoint, TradeWithImpact } from "@/lib/types";
import { COLORS } from "@/lib/constants";
import { formatUSD } from "@/lib/utils";

interface ImpactChartProps {
  priceData: PricePoint[];
  trades: TradeWithImpact[];
  highlightedTradeTs?: number | null;
  marketDurationSeconds?: number | null;
  className?: string;
}

/**
 * Zoom half-window around a trade click.
 * For a 5-min market we zoom ±5 min; for long markets ±12 hours.
 */
function zoomHalfWindow(durationSeconds: number | null): number {
  if (durationSeconds == null) return 12 * 3600;
  if (durationSeconds < 600) return 300;      // < 10 min → ±5 min
  if (durationSeconds < 3600) return 900;     // < 1 hour → ±15 min
  if (durationSeconds < 6 * 3600) return 3600; // < 6 hours → ±1 hour
  return 12 * 3600; // default ±12 hours
}

export function ImpactChart({
  priceData,
  trades,
  highlightedTradeTs,
  marketDurationSeconds,
  className,
}: ImpactChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  // Show seconds on the time axis for very short markets
  const isShort = marketDurationSeconds != null && marketDurationSeconds <= 3600;

  useEffect(() => {
    if (!containerRef.current || !priceData.length) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { color: "transparent" },
        textColor: "#71717a",
        fontFamily: "var(--font-jetbrains), monospace",
      },
      grid: {
        vertLines: { color: "#1e1e2e" },
        horzLines: { color: "#1e1e2e" },
      },
      rightPriceScale: {
        borderColor: "#1e1e2e",
        scaleMargins: { top: 0.08, bottom: 0.15 },
      },
      timeScale: {
        borderColor: "#1e1e2e",
        timeVisible: true,
        // Show seconds for very short markets so you can actually see the timestamps
        secondsVisible: isShort,
        // Fit the entire range on first render
        rightOffset: 2,
      },
      crosshair: {
        vertLine: { color: COLORS.gold },
        horzLine: { color: COLORS.gold },
      },
    });

    const areaSeries = chart.addAreaSeries({
      lineColor: COLORS.teal,
      topColor: "rgba(76, 201, 168, 0.25)",
      bottomColor: "rgba(76, 201, 168, 0)",
      lineWidth: 2,
      priceFormat: {
        type: "custom",
        formatter: (p: number) => `${(p * 100).toFixed(1)}%`,
      },
    });

    const data = [...priceData]
      .sort((a, b) => a.t - b.t)
      .map((d) => ({
        time: d.t as unknown as import("lightweight-charts").UTCTimestamp,
        value: d.p,
      }));
    areaSeries.setData(data);

    // Fit all data into view on load
    chart.timeScale().fitContent();

    chartRef.current = chart;
    seriesRef.current = areaSeries;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [priceData, isShort]);

  // Trade markers — snap each trade timestamp to the nearest price data point
  // because lightweight-charts only renders markers at existing data times.
  useEffect(() => {
    const series = seriesRef.current;
    if (!series || !trades.length || !priceData.length) return;

    const sortedTimes = [...priceData].sort((a, b) => a.t - b.t).map((d) => d.t);

    function snapToNearest(ts: number): number {
      let lo = 0;
      let hi = sortedTimes.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (sortedTimes[mid] < ts) lo = mid + 1;
        else hi = mid;
      }
      if (lo === 0) return sortedTimes[0];
      const prev = sortedTimes[lo - 1];
      const next = sortedTimes[lo];
      return Math.abs(ts - prev) <= Math.abs(ts - next) ? prev : next;
    }

    const markers = trades.map((t) => {
      const isBuy = t.side === "BUY";
      const sizeUsd = t.size * t.price;
      return {
        time: snapToNearest(t.timestamp) as unknown as import("lightweight-charts").UTCTimestamp,
        position: (isBuy ? "aboveBar" : "belowBar") as "aboveBar" | "belowBar",
        color: isBuy ? COLORS.gold : COLORS.crimson,
        shape: (isBuy ? "arrowUp" : "arrowDown") as "arrowUp" | "arrowDown",
        text: `${isBuy ? "BUY" : "SELL"} ${formatUSD(sizeUsd)}`,
      };
    });
    series.setMarkers(
      markers.sort((a, b) => (a.time as number) - (b.time as number))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trades, priceData]);

  // Zoom to highlighted trade — window is proportional to market duration
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || highlightedTradeTs == null) return;
    const half = zoomHalfWindow(marketDurationSeconds ?? null);
    chart.timeScale().setVisibleRange({
      from: (highlightedTradeTs - half) as unknown as import("lightweight-charts").UTCTimestamp,
      to: (highlightedTradeTs + half) as unknown as import("lightweight-charts").UTCTimestamp,
    });
  }, [highlightedTradeTs, marketDurationSeconds]);

  return (
    <div className={className}>
      <div ref={containerRef} className="w-full h-[400px]" />
    </div>
  );
}
