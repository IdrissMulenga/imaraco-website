import type { MetadataRoute } from "next";
import { routes, site } from "@/data/site";
import { localePath, locales } from "@/i18n/config";

const productPages = ["/products/duka-pos", "/products/school", "/products/imara-pay"];

// Lists every page in every language, each linking to its translations.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...Object.values(routes), ...productPages];

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${site.url}${localePath(lang, path)}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path.startsWith("/legal") ? 0.3 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${localePath(l, path)}`])),
      },
    })),
  );
}
