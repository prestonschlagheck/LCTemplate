"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Learning Center", href: "#hero" },
  { label: "Key Statistics", href: "#key-statistics" },
  { label: "Activities", href: "#activities" },
  { label: "Resources", href: "#resources" },
  { label: "Expert Faculty", href: "#faculty" },
  { label: "Conferences", href: "#events" },
];

export const Header: React.FC = () => {
  const [isOverHero, setIsOverHero] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        // Header is over hero if hero's bottom edge is below the header's bottom (accounting for header height + margin)
        setIsOverHero(heroRect.bottom > 120);
      }
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full left-0 right-0">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "flex h-[88px] items-center justify-between border relative",
            "transition-all duration-300 ease-in-out",
            // Mobile: fit to top with bottom rounding only, add extra right padding for arrow spacing
            "mt-0 rounded-b-[28px] -mx-[clamp(var(--gutter-mobile),5vw,var(--gutter-desktop))] pl-[clamp(var(--gutter-mobile),5vw,var(--gutter-desktop))] pr-8",
            // Desktop: original styling with margin, full rounding, and reset margins
            "lg:mt-6 lg:rounded-[28px] lg:w-[1236px] lg:mx-auto lg:px-6",
            isOverHero
              ? "glass-light glass-grain bg-white/20 backdrop-blur-xl border-white/20"
              : "glass-light glass-grain bg-bluewhale/15 backdrop-blur-xl border-bluewhale/30"
          )}
          style={{ 
            paddingTop: '0rem', 
            paddingBottom: '0rem'
          }}
        >
        <Link href="#hero" className="flex items-center gap-3 shrink-0" aria-label="GLC Learning Center home">
          <Image
            src="/Images/Logos/GLCLogo.png"
            alt="GLC logo"
            width={140}
            height={140}
            className={cn(
              "h-[158px] w-[158px] object-contain transition-all duration-300",
              isOverHero && "brightness-0 invert"
            )}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                isOverHero
                  ? "text-white"
                  : "text-bluewhale"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center bg-transparent transition-colors duration-300 lg:hidden shrink-0",
            isOverHero ? "text-white hover:text-white/80" : "text-bluewhale hover:text-bluewhale/80"
          )}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className={cn("h-6 w-6 transition-transform duration-200", isMenuOpen && "rotate-180")}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                // Full width of bar; extends bar downward
                "absolute inset-x-0 top-full w-full rounded-t-none rounded-b-[20px] border p-4 lg:hidden",
                // Stronger blur, less translucency so text behind isn't readable
                isOverHero
                  ? "bg-white/80 backdrop-blur-2xl border-white/40 text-bluewhale"
                  : "bg-bluewhale/85 backdrop-blur-2xl border-bluewhale/50 text-white"
              )}
            >
              <nav className="flex flex-col gap-3 text-center" aria-label="Mobile primary">
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1], delay: 0.03 * idx }}
                  >
                    <Link
                      href={link.href}
                      className="text-base font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </div>
    </header>
  );
};

