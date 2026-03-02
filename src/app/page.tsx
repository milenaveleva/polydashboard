"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidEthAddress } from "@/lib/utils";
import { Search, ArrowRight, Crosshair } from "lucide-react";
import Link from "next/link";

const EXAMPLE_WALLETS = [
  { label: "Theo", address: "0xd205F8aB13700E39Fa3FA87C52A05aeabd9CbfCB" },
  { label: "Domer", address: "0x3b46668dF9e04B9E7c737E05d4E26B56cF02fc52" },
  { label: "Fredi9999", address: "0x1b7eBc22F10bDB1e55A49FbC37EaF2d0e2dC5C76" },
];

export default function LandingPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (addr?: string) => {
      const target = addr ?? address.trim();
      if (!target) {
        setError("Enter a wallet address");
        return;
      }
      if (!isValidEthAddress(target)) {
        setError("Invalid Ethereum address (0x + 40 hex characters)");
        return;
      }
      setError(null);
      router.push(`/wallet/${target.toLowerCase()}`);
    },
    [address, router]
  );

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xl space-y-10">
          {/* Title block */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs text-muted-foreground tracking-wide uppercase">
              <Crosshair className="w-3 h-3 text-accent-gold" />
              Wallet Impact Tracker
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight leading-[1.1]">
              Track a wallet&apos;s
              <br />
              <span className="text-accent-gold">market impact</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Enter any Polymarket wallet to see its closed positions and measure
              how each trade moved the market price.
            </p>
          </div>

          {/* Input */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit();
                  }}
                  placeholder="0x..."
                  className="pl-10 h-12 font-mono text-sm bg-surface border-border placeholder:text-muted-foreground/50 focus:border-accent-gold focus:ring-accent-gold/20"
                />
              </div>
              <Button
                onClick={() => handleSubmit()}
                className="h-12 px-5 bg-accent-gold hover:bg-accent-gold/90 text-background font-medium"
              >
                Track
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>

            {error && (
              <p className="text-sm text-accent-crimson pl-1">{error}</p>
            )}
          </div>

          {/* Example wallets */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center uppercase tracking-wider">
              Try a known trader
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {EXAMPLE_WALLETS.map((w) => (
                <button
                  key={w.address}
                  onClick={() => {
                    setAddress(w.address);
                    handleSubmit(w.address);
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-accent-gold/40 transition-colors"
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/wallets/top-win-rate">
              <Button
                variant="outline"
                className="border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10"
              >
                Explore top wallets by win ratio
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-4 text-center">
        <p className="text-xs text-muted-foreground">
          Data from{" "}
          <a
            href="https://polymarket.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-gold hover:underline"
          >
            Polymarket
          </a>{" "}
          public APIs — no auth required
        </p>
      </footer>
    </main>
  );
}
