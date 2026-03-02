"use client";

import { useMemo } from "react";
import type { PricePoint } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SparklineProps {
  data: PricePoint[];
  className?: string;
  width?: number;
  height?: number;
  upColor?: boolean;
}

export function Sparkline({
  data,
  className,
  width = 80,
  height = 24,
  upColor = true,
}: SparklineProps) {
  const path = useMemo(() => {
    if (!data.length) return "";
    const minP = Math.min(...data.map((d) => d.p));
    const maxP = Math.max(...data.map((d) => d.p));
    const range = maxP - minP || 1;
    const minT = data[0].t;
    const maxT = data[data.length - 1].t;
    const tRange = maxT - minT || 1;
    const points = data
      .map(
        (d, i) =>
          `${(i / (data.length - 1 || 1)) * width},${height - ((d.p - minP) / range) * height}`
      )
      .join(" ");
    return `M ${points.replace(/\s/g, " L ")}`;
  }, [data, width, height]);

  if (!data.length) {
    return (
      <div
        className={cn("flex items-center justify-center text-muted-foreground text-xs", className)}
        style={{ width, height }}
      >
        —
      </div>
    );
  }

  const first = data[0].p;
  const last = data[data.length - 1].p;
  const isUp = last >= first;

  return (
    <svg
      width={width}
      height={height}
      className={cn("overflow-visible", className)}
      aria-hidden
    >
      <path
        d={path}
        fill="none"
        stroke={upColor ? (isUp ? "var(--accent-teal)" : "var(--accent-crimson)") : "var(--border)"}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
