// Company details used across the site.
// Values marked PLACEHOLDER must be replaced (or set via environment
// variables in .env.local / Vercel) before launch.

export const site = {
  name: "Imara Company Limited",
  shortName: "Imara",
  // The name we want people (and Google) to use: page titles, search results.
  brand: "Imara Company",
  tagline: "Technology built to last.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production" ? "https://imaracompany.com" : "http://localhost:3000"),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "support@imaracompany.com",
  // International format, digits only (country code + number).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "25761228778",
  location: { city: "Bujumbura", country: "Burundi", countryCode: "BI" },
  instagram: { handle: "@imaraco.ltd", url: "https://www.instagram.com/imaraco.ltd" },
} as const;

// Imara Afya on the app stores.
// While `launched` is false, the site shows "Coming soon" store badges that
// aren't clickable. At launch: set the real URLs below, then `launched: true`.
export const afyaStores = {
  launched: false,
  playStore:
    process.env.NEXT_PUBLIC_AFYA_PLAY_STORE_URL ??
    "https://play.google.com/store/search?q=Imara%20Afya&c=apps",
  appStore: process.env.NEXT_PUBLIC_AFYA_APP_STORE_URL ?? "https://apps.apple.com/",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Every page on the site. Header, footer and sitemap read from here,
// so add a new page in this list once and it shows up everywhere.
export const routes = {
  home: "/",
  products: "/products",
  services: "/services",
  labs: "/labs",
  about: "/about",
  contact: "/contact",
  blog: "/blog",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  cookies: "/legal/cookies",
} as const;
