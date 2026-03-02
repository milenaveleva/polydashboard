"use client";

import { useState, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MarketFilters, SortOption } from "@/lib/types";
import { Filter, Save } from "lucide-react";

const PRESETS_KEY = "polydashboard-filter-presets";

function loadPresetsFromStorage(): MarketFilters[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PRESETS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function savePresetToStorage(preset: MarketFilters) {
  const presets = loadPresetsFromStorage();
  presets.unshift(preset);
  localStorage.setItem(PRESETS_KEY, JSON.stringify(presets.slice(0, 5)));
}

interface FiltersSidebarProps {
  filters: MarketFilters | undefined;
  onFiltersChange: (f: MarketFilters) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "volume", label: "Volume" },
  { value: "newest", label: "Newest" },
  { value: "contested", label: "Most Contested" },
  { value: "whaleCount", label: "Whale Bets" },
];

export function FiltersSidebar({
  filters,
  onFiltersChange,
  open,
  onOpenChange,
}: FiltersSidebarProps) {
  const [volumeRange, setVolumeRange] = useState<[number, number]>([
    filters?.volumeNumMin ?? 0,
    filters?.volumeNumMax ?? 10_000_000,
  ]);
  const [liquidityRange, setLiquidityRange] = useState<[number, number]>([
    filters?.liquidityNumMin ?? 0,
    filters?.liquidityNumMax ?? 5_000_000,
  ]);
  const [presets, setPresets] = useState<MarketFilters[]>(() => loadPresetsFromStorage());

  const update = useCallback(
    (patch: Partial<MarketFilters>) => {
      onFiltersChange({ ...filters, ...patch } as MarketFilters);
    },
    [filters, onFiltersChange]
  );

  const handleSavePreset = useCallback(() => {
    const current = { ...filters, sort: filters?.sort ?? "volume" } as MarketFilters;
    savePresetToStorage(current);
    setPresets(loadPresetsFromStorage());
  }, [filters]);

  const handleLoadPreset = useCallback(
    (index: number) => {
      const list = loadPresetsFromStorage();
      const p = list[index];
      if (p) onFiltersChange(p);
    },
    [onFiltersChange]
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div>
            <Label className="text-sm">Sort by</Label>
            <Select
              value={filters?.sort ?? "volume"}
              onValueChange={(v) => update({ sort: v as SortOption })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm">Min volume (USD)</Label>
            <Slider
              className="mt-2"
              min={0}
              max={10_000_000}
              step={100000}
              value={[volumeRange[0]]}
              onValueChange={(v) => {
                setVolumeRange([v[0], volumeRange[1]]);
                update({ volumeNumMin: v[0] });
              }}
            />
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              {formatCompact(volumeRange[0])}
            </p>
          </div>
          <div>
            <Label className="text-sm">Min liquidity (USD)</Label>
            <Slider
              className="mt-2"
              min={0}
              max={5_000_000}
              step={50000}
              value={[liquidityRange[0]]}
              onValueChange={(v) => {
                setLiquidityRange([v[0], liquidityRange[1]]);
                update({ liquidityNumMin: v[0] });
              }}
            />
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              {formatCompact(liquidityRange[0])}
            </p>
          </div>
          <div>
            <Label className="text-sm">Has whale activity</Label>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="whale"
                checked={filters?.hasWhaleActivity ?? false}
                onChange={(e) => update({ hasWhaleActivity: e.target.checked })}
                className="rounded border-border bg-surface text-accent-gold focus:ring-accent-gold"
              />
              <Label htmlFor="whale" className="text-sm font-normal cursor-pointer">
                Only markets with large bets
              </Label>
            </div>
          </div>
          <div className="pt-4 border-t border-border space-y-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleSavePreset}
            >
              <Save className="h-4 w-4 mr-2" />
              Save filter preset
            </Button>
            {presets.length > 0 && (
              <div>
                <Label className="text-sm">Load preset</Label>
                <Select onValueChange={(v) => handleLoadPreset(Number(v))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose a preset" />
                  </SelectTrigger>
                  <SelectContent>
                    {presets.slice(0, 5).map((_, i) => (
                      <SelectItem key={i} value={String(i)}>
                        Preset {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n}`;
}
