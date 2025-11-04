"use client";

import * as React from "react";

import { Badge, type BadgeProps } from "@/components/primitives/Badge";
import { cn } from "@/lib/utils";

export type TagProps = BadgeProps & {
  leadingIcon?: React.ReactNode;
};

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, leadingIcon, children, tone = "accent", variant = "subtle", ...props }, ref) => (
    <Badge
      ref={ref}
      tone={tone}
      variant={variant}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-bluewhale/6 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-wide text-bluewhale/80",
        className,
      )}
      {...props}
    >
      {leadingIcon && <span className="text-bluewhale/60">{leadingIcon}</span>}
      {children}
    </Badge>
  ),
);
Tag.displayName = "Tag";

