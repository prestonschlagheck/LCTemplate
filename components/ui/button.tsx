"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-pill)] font-semibold tracking-tight transition duration-220 ease-entrance focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-bluewhale text-white shadow-m hover:bg-lagoon hover:shadow-l focus-visible:outline-persian",
        secondary:
          "bg-white text-midnight border border-bluewhale/15 shadow-s hover:border-bluewhale/30 hover:shadow-m focus-visible:outline-persian",
        tertiary:
          "bg-transparent text-bluewhale underline-offset-4 hover:underline focus-visible:outline-persian",
        ghost:
          "bg-transparent text-bluewhale/80 hover:bg-bluewhale/6 focus-visible:outline-persian",
      },
      size: {
        sm: "h-[var(--button-height-sm)] px-4 text-sm",
        md: "h-[var(--button-height-md)] px-6 text-base",
        lg: "h-[var(--button-height-lg)] px-8 text-lg",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "group will-change-transform focus-visible:ring-0",
          buttonVariants({ variant, size }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

