"use client";

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
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** "li" when it is an item of a list (<ul>/<ol> may only contain <li>). */
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);

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
    <Tag
      ref={ref}
      data-reveal=""
      style={{ height: "100%", "--reveal-y": `${y}px`, transitionDelay: `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * Gentle vertical float for decorative illustration layers: up 10px and
 * back, 2.4s each way with a sine-shaped ease. Plain CSS (the "imara-float"
 * class in theme/index.ts), switched off for "reduce motion".
 */
export function Float({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <div className="imara-float" style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
