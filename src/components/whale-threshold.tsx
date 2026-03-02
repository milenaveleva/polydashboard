"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DEFAULT_WHALE_THRESHOLD_USD } from "@/lib/constants";
import { formatUSD } from "@/lib/utils";

interface WhaleThresholdProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function WhaleThreshold({
  value,
  onChange,
  min = 500,
  max = 50_000,
  className,
}: WhaleThresholdProps) {
  return (
    <div className={className}>
      <Label className="text-sm">Whale threshold (min trade size)</Label>
      <Slider
        className="mt-2"
        min={min}
        max={max}
        step={500}
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
      />
      <p className="text-xs text-muted-foreground mt-1 font-mono">
        {formatUSD(value)}+
      </p>
    </div>
  );
}
