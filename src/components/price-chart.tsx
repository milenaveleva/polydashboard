"use client";

import { useEffect, useRef, useCallback } from "react";
import { createChart } from "lightweight-charts";
import type { IChartApi, ISeriesApi } from "lightweight-charts";
import type { PricePoint } from "@/lib/types";
import type { Trade } from "@/lib/types";
import type { PriceHistoryInterval } from "@/lib/constants";
import { COLORS } from "@/lib/constants";
import { formatUSD } from "@/lib/utils";

interface PriceChartProps {
  priceData: PricePoint[];
  whaleTrades: Trade[];
  interval: PriceHistoryInterval;
  onIntervalChange: (interval: PriceHistoryInterval) => void;
  highlightedTradeTimestamp?: number | null;
  className?: string;
}

const INTERVAL_BUTTONS: { value: PriceHistoryInterval; label: string }[] = [
  { value: "1d", label: "1D" },
  { value: "1w", label: "1W" },
  { value: "1m", label: "1M" },
  { value: "all", label: "All" },
];

export function PriceChart({
  priceData,
  whaleTrades,
  interval,
  onIntervalChange,
  highlightedTradeTimestamp,
  className,
}: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !priceData.length) return;

    const chart = createChart(chartContainerRef.current, {
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
        scaleMargins: { top: 0.1, bottom: 0.2 },
      },
      timeScale: {
        borderColor: "#1e1e2e",
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        vertLine: { color: "#c9a84c" },
        horzLine: { color: "#c9a84c" },
      },
    });

    const areaSeries = chart.addAreaSeries({
      lineColor: COLORS.teal,
      topColor: "rgba(76, 201, 168, 0.4)",
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

    chartRef.current = chart;
    seriesRef.current = areaSeries;

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [priceData]);

  useEffect(() => {
    const series = seriesRef.current;
    if (!series || !whaleTrades.length) return;

    const markers = whaleTrades.map((t) => {
      const isYes = t.side === "BUY";
      const sizeUsd = t.size * t.price;
      return {
        time: t.timestamp as unknown as import("lightweight-charts").UTCTimestamp,
        position: (isYes ? "aboveBar" : "belowBar") as "aboveBar" | "belowBar",
        color: isYes ? COLORS.gold : COLORS.crimson,
        shape: (isYes ? "arrowUp" : "arrowDown") as "arrowUp" | "arrowDown",
        text: formatUSD(sizeUsd),
      };
    });
    series.setMarkers(markers.sort((a, b) => (a.time as number) - (b.time as number)));
  }, [whaleTrades]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || highlightedTradeTimestamp == null) return;
    const from = highlightedTradeTimestamp - 6 * 3600;
    const to = highlightedTradeTimestamp + 6 * 3600;
    chart.timeScale().setVisibleRange({
      from: from as unknown as import("lightweight-charts").UTCTimestamp,
      to: to as unknown as import("lightweight-charts").UTCTimestamp,
    });
  }, [highlightedTradeTimestamp]);

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-2">
        {INTERVAL_BUTTONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onIntervalChange(value)}
            className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
              interval === value
                ? "border-accent-gold bg-accent-gold/20 text-accent-gold"
                : "border-border bg-surface text-muted-foreground hover:bg-surface/80"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div ref={chartContainerRef} className="w-full h-[360px]" />
    </div>
  );
}
