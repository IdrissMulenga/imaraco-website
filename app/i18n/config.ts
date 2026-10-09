// Languages of the site. Every page lives under /en/… or /fr/….
// To add a language later: add it here, then create a dictionary
// (copy dictionaries/en.ts) and register it in i18n/server.ts.

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = { en: "English", fr: "Français" };

/** Cookie that remembers the visitor's chosen language. */
export const LOCALE_COOKIE = "lang";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Adds the language to a path: localePath("fr", "/products") → "/fr/products". */
export function localePath(lang: Locale, path: string) {
  if (path.startsWith("#") || /^[a-z]+:/i.test(path)) return path; // anchors, mailto:, https:
  return `/${lang}${path === "/" ? "" : path}`;
}

/** Fills {placeholders}: fill("Hi {name}", { name: "Ana" }) → "Hi Ana". */
export function fill(text: string, values: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? `{${k}}`);
}
