"use client";

import { createContext, useContext } from "react";
import { localePath, type Locale } from "./config";
import type { ClientDictionary } from "./dictionaries/en";

const I18nContext = createContext<{ lang: Locale; t: ClientDictionary } | null>(null);

/** Gives client components the current language and its (client) text. */
export function I18nProvider({
  lang,
  t,
  children,
}: {
  lang: Locale;
  t: ClientDictionary;
  children: React.ReactNode;
}) {
  return <I18nContext.Provider value={{ lang, t }}>{children}</I18nContext.Provider>;
}

/** In client components: const { lang, t, href } = useI18n(); */
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return { ...ctx, href: (path: string) => localePath(ctx.lang, path) };
}
