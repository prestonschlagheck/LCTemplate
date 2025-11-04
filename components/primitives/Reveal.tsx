"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

type UseInViewOptions = Parameters<typeof useInView>[1];
type InViewMargin = UseInViewOptions extends { margin?: infer M } ? M : string;

type RevealProps = {
  as?: React.ElementType;
  delay?: number;
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  offset?: InViewMargin;
};

export const Reveal: React.FC<RevealProps> = ({
  as: Component = motion.div,
  delay = 0,
  once = true,
  offset = "0px 0px -10% 0px" as InViewMargin,
  className,
  children,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, margin: offset } as UseInViewOptions);

  return (
    <Component
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.26, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
};

