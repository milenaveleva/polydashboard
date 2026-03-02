"use client";

/* eslint-disable @next/next/no-img-element */

import { useProfile } from "@/hooks/use-profile";
import { truncateAddress } from "@/lib/utils";
import { POLYMARKET_PROFILE_URL } from "@/lib/constants";
import { ExternalLink, BadgeCheck, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface WalletHeaderProps {
  address: string;
}

export function WalletHeader({ address }: WalletHeaderProps) {
  const { data: profile } = useProfile(address);
  const [copied, setCopied] = useState(false);

  const displayName =
    profile?.name ??
    profile?.pseudonym ??
    truncateAddress(address);
  const profileUrl = `${POLYMARKET_PROFILE_URL}/${address}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center gap-4">
      {profile?.profileImage ? (
        <img
          src={profile.profileImage}
          alt=""
          className="w-12 h-12 rounded-full border border-border object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full border border-border bg-surface flex items-center justify-center text-lg font-semibold text-accent-gold">
          {address[2]?.toUpperCase() ?? "?"}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-foreground truncate">
            {displayName}
          </h1>
          {profile?.verifiedBadge && (
            <BadgeCheck className="w-5 h-5 text-accent-gold shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-mono text-xs text-muted-foreground truncate">
            {address}
          </span>
          <button
            onClick={handleCopy}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            {copied ? (
              <Check className="w-3 h-3 text-accent-teal" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>
        {profile?.bio && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {profile.bio}
          </p>
        )}
      </div>

      <Button variant="outline" size="sm" asChild className="shrink-0">
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">
          Polymarket
          <ExternalLink className="w-3 h-3 ml-1.5" />
        </a>
      </Button>
    </div>
  );
}
