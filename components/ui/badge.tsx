import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-pill)] border px-3 py-1 text-xs font-medium transition-colors duration-150",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-lagoon/12 text-lagoon hover:bg-lagoon/16",
        outline:
          "border-bluewhale/20 text-bluewhale hover:bg-bluewhale/8",
        subtle: "border-transparent bg-bluewhale/6 text-bluewhale",
        muted: "border-transparent bg-white/70 text-bluewhale/70",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn("tracking-wide", badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

