"use client";

import * as React from "react";
import { motion, type MotionProps } from "framer-motion";

import {
  Card as BaseCard,
  CardContent as BaseCardContent,
  CardDescription as BaseCardDescription,
  CardFooter as BaseCardFooter,
  CardHeader as BaseCardHeader,
  CardTitle as BaseCardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MotionCard = motion(BaseCard);

export type CardProps = React.ComponentPropsWithoutRef<typeof BaseCard> & MotionProps;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, whileHover, whileTap, transition, ...props }, ref) => (
    <MotionCard
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/4 bg-white shadow-m",
        "transition-shadow duration-220 ease-entrance will-change-transform",
        className,
      )}
      whileHover={whileHover ?? { y: -6, scale: 1.01 }}
      whileTap={whileTap ?? { scale: 0.995 }}
      transition={
        transition ?? {
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1],
        }
      }
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseCardHeader>
>(({ className, ...props }, ref) => (
  <BaseCardHeader ref={ref} className={cn("space-y-3 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof BaseCardTitle>
>(({ className, ...props }, ref) => (
  <BaseCardTitle
    ref={ref}
    className={cn("text-[1.375rem] font-semibold tracking-tight text-bluewhale", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof BaseCardDescription>
>(({ className, ...props }, ref) => (
  <BaseCardDescription
    ref={ref}
    className={cn("text-sm leading-relaxed text-bluewhale/70", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseCardContent>
>(({ className, ...props }, ref) => (
  <BaseCardContent ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseCardFooter>
>(({ className, ...props }, ref) => (
  <BaseCardFooter ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };

