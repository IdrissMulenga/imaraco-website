"use client";

import { Box, HStack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { LuGlobe } from "react-icons/lu";
import { useI18n } from "@/i18n/client";
import { LOCALE_COOKIE, localeNames, locales, type Locale } from "@/i18n/config";

/** Remembers the choice so "/" opens in this language next time. */
function remember(lang: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * On click: remember the language and keep the rest of the address, e.g.
 * "?interest=service:web" or "#order", so the visitor stays where they were.
 * (Read at click time: the server-rendered link can't know them.)
 */
function onSwitch(e: React.MouseEvent<HTMLAnchorElement>, lang: Locale) {
  remember(lang);
  const { search, hash } = window.location;
  if (search || hash) e.currentTarget.href = `${e.currentTarget.pathname}${search}${hash}`;
}

/**
 * EN | FR switch. Keeps you on the same page in the other language,
 * e.g. /en/products → /fr/products.
 *
 * Uses a normal link (full page load), not Next's client navigation:
 * changing language swaps the whole page including <html lang> and the
 * <head> scripts, which React can't re-render in the browser.
 */
export function LanguageSwitcher({ size = "sm" }: { size?: "sm" | "md" }) {
  const { lang, t } = useI18n();
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(en|fr)(?=\/|$)/, "");

  return (
    <HStack
      role="group"
      aria-label={t.common.language}
      gap="0"
      p="0.5"
      borderRadius="full"
      borderWidth="1px"
      borderColor="border"
      bg="bg.panel"
    >
      <Box px="1.5" color="fg.muted" display={{ base: "none", sm: "block", lg: "none", xl: "block" }} aria-hidden="true">
        <LuGlobe />
      </Box>
      {locales.map((l) => {
        const active = l === lang;
        return (
          <a
            key={l}
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-label={localeNames[l]}
            aria-current={active ? "true" : undefined}
            onClick={(e) => onSwitch(e, l)}
          >
            <Box
              as="span"
              display="block"
              px={size === "md" ? "3.5" : "2.5"}
              py={size === "md" ? "1.5" : "1"}
              borderRadius="full"
              fontSize={size === "md" ? "sm" : "xs"}
              fontWeight="bold"
              letterSpacing="0.04em"
              bg={active ? "brand.solid" : "transparent"}
              color={active ? "brand.contrast" : "fg.muted"}
              _hover={active ? undefined : { color: "fg" }}
              transition="background .2s, color .2s"
            >
              {l.toUpperCase()}
            </Box>
          </a>
        );
      })}
    </HStack>
  );
}
