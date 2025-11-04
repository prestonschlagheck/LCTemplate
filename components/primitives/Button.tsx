"use client";

import * as React from "react";
import { motion, type MotionProps } from "framer-motion";

import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
  buttonVariants,
} from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MotionButtonProps = BaseButtonProps & MotionProps;

const ButtonBase = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseButton ref={ref} className={cn(className)} {...props}>
        {children}
      </BaseButton>
    );
  }
);
ButtonBase.displayName = "ButtonBase";

const MotionButton = motion(ButtonBase);

export type ButtonProps = MotionButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, whileHover, whileTap, transition, ...props }, ref) => {
    return (
      <MotionButton
        ref={ref}
        variant={variant}
        size={size}
        className={className}
        whileHover={whileHover ?? { scale: 1.015 }}
        whileTap={whileTap ?? { scale: 0.985 }}
        transition={
          transition ?? {
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }
        }
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };

