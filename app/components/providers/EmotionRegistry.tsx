"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

/**
 * Makes Chakra's styles (Emotion) work cleanly with server rendering.
 *
 * Without this, Emotion writes <style> tags in the middle of the page during
 * server rendering but not in the browser, so the two HTML versions differ
 * and React reports a hydration error. Here, every style generated on the
 * server is collected and sent in the page <head> instead.
 */
// Styles already written during the current flush. When Next.js prerenders
// a page it renders it more than once, and each render registers its own
// copy of the callback below; all copies then run back to back in one flush
// and would each write the full set of styles (doubling the page's HTML).
// The set is cleared right after the flush (microtask), so it never spans
// two flushes or two requests.
const writtenThisFlush = new Set<string>();
let clearScheduled = false;
function notYetWritten(name: string) {
  if (!clearScheduled) {
    clearScheduled = true;
    queueMicrotask(() => {
      writtenThisFlush.clear();
      clearScheduled = false;
    });
  }
  if (writtenThisFlush.has(name)) return false;
  writtenThisFlush.add(name);
  return true;
}

export function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [registry] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;
    const insert = cache.insert;
    let inserted: { name: string; isGlobal: boolean }[] = [];
    cache.insert = (...args) => {
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({ name: serialized.name, isGlobal: !selector });
      }
      return insert(...args);
    };
    const flush = () => {
      const flushed = inserted;
      inserted = [];
      return flushed;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = registry.flush().filter(({ name }) => notYetWritten(name));
    if (names.length === 0) return null;

    const globals: { name: string; style: string }[] = [];
    let styles = "";
    let dataEmotion = registry.cache.key;
    for (const { name, isGlobal } of names) {
      const style = registry.cache.inserted[name];
      if (typeof style !== "string") continue;
      if (isGlobal) {
        globals.push({ name, style });
      } else {
        styles += style;
        dataEmotion += ` ${name}`;
      }
    }

    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${registry.cache.key}-global ${name}`}
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles && <style data-emotion={dataEmotion} dangerouslySetInnerHTML={{ __html: styles }} />}
      </>
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
