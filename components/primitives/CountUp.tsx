"use client";

import * as React from "react";

export type CountUpProps = {
  target: number; // numeric value to count to (parsed, no suffix)
  durationMs?: number; // default 2000
  decimals?: number; // default 0
  prefix?: string;
  suffix?: string;
  className?: string;
};

export const CountUp: React.FC<CountUpProps> = ({
  target,
  durationMs = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}) => {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [isActive, setIsActive] = React.useState(false);
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsActive(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isActive) return;
    const start = performance.now();
    const from = 0;
    const to = target;
    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const value = from + (to - from) * eased;
      setDisplay(value);
      if (t < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [isActive, target, durationMs]);

  const formatted = React.useMemo(() => {
    return `${prefix}${display.toFixed(decimals)}${suffix}`;
  }, [display, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {formatted}
    </span>
  );
};


