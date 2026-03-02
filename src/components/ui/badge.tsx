import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-accent-gold/20 text-accent-gold shadow-glow",
        secondary:
          "border-transparent bg-surface text-foreground",
        destructive:
          "border-transparent bg-accent-crimson/20 text-accent-crimson",
        outline: "text-foreground border-border",
        yes: "border-transparent bg-accent-gold/20 text-accent-gold",
        no: "border-transparent bg-accent-crimson/20 text-accent-crimson",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
