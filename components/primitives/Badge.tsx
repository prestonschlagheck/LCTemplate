"use client";

import * as React from "react";
import type { VariantProps } from "class-variance-authority";

import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type BadgeProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants> & {
    tone?: "primary" | "neutral" | "accent";
  };

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone = "primary", variant = "default", ...props }, ref) => {
    const toneClass =
      tone === "neutral"
        ? "border border-bluewhale/15 bg-white/80 text-bluewhale"
        : tone === "accent"
          ? "bg-persian/12 text-persian"
          : "bg-lagoon/14 text-bluewhale";

    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant }),
          "inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-3 py-1 text-[0.75rem] font-medium",
          toneClass,
          className,
        )}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

