import { Box, Link as ChakraLink } from "@chakra-ui/react";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import { lang as rootLang } from "next/root-params";
import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { Analytics } from "@/components/providers/Analytics";
import { Providers } from "@/components/providers/Providers";
import { themeScript } from "@/components/providers/themeScript";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { I18nProvider } from "@/i18n/client";
import { isLocale, locales } from "@/i18n/config";
import { clientKeys, type ClientDictionary } from "@/i18n/dictionaries/en";
import { getI18n } from "@/i18n/server";
import { organizationJsonLd } from "@/lib/seo";

// Outfit: the font for the whole website (headings and text).
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Bricolage Grotesque: only for the "imara" wordmark next to the logo.
const logoFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
  weight: "700",
});

// Build every page once per language.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.siteTitle, template: "%s · Imara" },
    description: t.meta.siteDescription,
    applicationName: site.name,
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0D0C" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Only /en and /fr exist: anything else ("/api", "/old.html"…) is a 404,
  // not a copy of the English site.
  if (!isLocale(await rootLang())) notFound();
  const { lang, t } = await getI18n();
  // Only the text needed by interactive parts goes to the browser.
  const clientText = Object.fromEntries(clientKeys.map((k) => [k, t[k]])) as ClientDictionary;
  return (
    // suppressHydrationWarning: themeScript adds a light/dark class to <html>
    // before React loads, which is expected.
    <html lang={lang} className={`${outfit.variable} ${logoFont.variable}`} suppressHydrationWarning>
      <head>
        {/* Applies the saved light/dark mode before the page is painted. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>
          <I18nProvider lang={lang} t={clientText}>
          <ChakraLink
            href="#main"
            position="absolute"
            left="4"
            top="-20"
            zIndex="skipLink"
            bg="bg.panel"
            px="4"
            py="2"
            borderRadius="l2"
            boxShadow="md"
            _focus={{ top: "4" }}
          >
            {t.common.skipToContent}
          </ChakraLink>
          <Navbar />
          <Box as="main" id="main" tabIndex={-1} _focus={{ outline: "none" }}>
            {children}
          </Box>
          <Footer />
          </I18nProvider>
        </Providers>
        <JsonLd data={organizationJsonLd(t.meta.siteDescription)} />
        <Analytics />
      </body>
    </html>
  );
}
