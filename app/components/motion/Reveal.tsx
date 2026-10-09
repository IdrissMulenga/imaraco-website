"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

declare global {
  interface Window {
    __imaraRevealFallback?: number;
  }
}

/**
 * Fades + lifts content in when it scrolls into view (once).
 *
 * The page HTML is always visible: content is only hidden (by the CSS in
 * theme/index.ts) when the html element has the "js" class, which
 * themeScript adds before the page is painted. So visitors and link-preview
 * bots without JavaScript see everything, and if the app's JavaScript fails
 * to load, themeScript removes "js" after a few seconds to show it all.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The app has loaded: cancel themeScript's "show everything" fallback.
    window.clearTimeout(window.__imaraRevealFallback);
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.shown = "";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -64px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      style={{ height: "100%", "--reveal-y": `${y}px`, transitionDelay: `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** Gentle vertical float for decorative illustration layers. */
export function Float({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: -10 }}
      // Goes up then back down ("mirror") with a sine-shaped ease, so the
      // motion never jolts at the top or bottom. 2.4s each way.
      transition={{
        duration: 2.4,
        ease: [0.37, 0, 0.63, 1],
        repeat: Infinity,
        repeatType: "mirror",
        delay,
      }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
