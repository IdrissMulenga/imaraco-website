import type { Metadata } from "next";
import { site } from "@/data/site";
import { localePath, locales, type Locale } from "@/i18n/config";
import { getDictionary, getLang } from "@/i18n/server";

const ogLocale: Record<Locale, string> = { en: "en_US", fr: "fr_FR" };

/**
 * Title, description, canonical URL, language alternates (hreflang) and
 * social-share tags for a page in the current language.
 */
export async function pageMetadata({
  path,
  title,
  description,
}: {
  path: string; // without language, e.g. "/products"
  title: string;
  description: string;
}): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang);
  // Share picture drawn by app/[lang]/opengraph-image.tsx. Set on every page,
  // because a page's own openGraph settings replace the inherited picture.
  const image = {
    url: localePath(lang, "/opengraph-image"),
    width: 1200,
    height: 630,
    alt: `${site.brand}: ${t.hero.build} ${t.hero.run} ${t.hero.fix}`,
  };
  const languages = Object.fromEntries(locales.map((l) => [l, localePath(l, path)]));
  return {
    title,
    description,
    alternates: {
      canonical: localePath(lang, path),
      languages: { ...languages, "x-default": localePath("en", path) },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: localePath(lang, path),
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/**
 * The site's name for Google, shown above our search results. The owner
 * chose the web address itself ("imaracompany.com"); alternateName lists
 * the other names people may search for.
 */
export function websiteJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "imaracompany.com",
    alternateName: [site.brand, site.name, site.shortName],
    url: `${site.url}/`,
    inLanguage: lang,
  };
}

/** Company info for Google, in the page's language. */
export function organizationJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: [site.brand, site.shortName],
    url: site.url,
    logo: `${site.url}/brand/imara-icon.png`,
    description,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    sameAs: [site.instagram.url],
  };
}
