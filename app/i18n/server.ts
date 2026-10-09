import { lang as rootLang } from "next/root-params";
import { defaultLocale, isLocale, localePath, type Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";

const dictionaries: Record<Locale, Dictionary> = { en, fr };

/** Current language, read from the URL (/en/… or /fr/…). Server only. */
export async function getLang(): Promise<Locale> {
  const value = await rootLang();
  return isLocale(value) ? value : defaultLocale;
}

/**
 * Everything a server component needs for the current language:
 * `t` = the text, `href("/products")` = "/fr/products" etc.
 */
export async function getI18n() {
  const lang = await getLang();
  return {
    lang,
    t: dictionaries[lang],
    href: (path: string) => localePath(lang, path),
  };
}

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
