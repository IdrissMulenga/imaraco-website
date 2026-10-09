"use client";

import { Box, Button, Container, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { routes } from "@/data/site";
import { useI18n } from "@/i18n/client";
import { ColorModeButton } from "./ColorModeButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu, NAVBAR_HEIGHT } from "./MobileMenu";
import { isActiveLink, navCta, navLinks } from "./navLinks";

/**
 * The bar at the top of every page:
 * logo (left) · links (center, desktop only) · light/dark + CTA + mobile menu (right).
 */
export function Navbar() {
  const pathname = usePathname();
  const { t, href } = useI18n();

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg={{ _light: "rgba(255,255,255,0.85)", _dark: "rgba(15,13,12,0.85)" }}
      backdropFilter="saturate(180%) blur(12px)"
      borderBottomWidth="1px"
      borderColor="border.subtle"
    >
      <Container maxW="7xl" px={{ base: "4", md: "6" }}>
        <HStack h={NAVBAR_HEIGHT} justify="space-between" gap="4">
          {/* Logo */}
          <NextLink href={href(routes.home)} aria-label={t.common.homeAria}>
            <Logo size="lg" />
          </NextLink>

          {/* Links: desktop only */}
          <HStack as="nav" aria-label={t.nav.mainAria} gap="1" display={{ base: "none", lg: "flex" }}>
            {navLinks.map((link) => {
              const active = isActiveLink(pathname, link.href);
              return (
                <Button
                  key={link.href}
                  asChild
                  variant="ghost"
                  colorPalette="gray"
                  size="md"
                  // Tighter on laptops (1024px) so longer French labels fit.
                  px={{ lg: "2.5", xl: "4" }}
                  fontSize={{ lg: "sm", xl: "md" }}
                  fontWeight="medium"
                  color={active ? "brand.fg" : "fg.muted"}
                  _hover={{ color: "fg", bg: "bg.muted" }}
                >
                  <NextLink href={href(link.href)} aria-current={active ? "page" : undefined}>
                    {t.nav[link.label]}
                  </NextLink>
                </Button>
              );
            })}
          </HStack>

          {/* Right side */}
          <HStack gap="1">
            <Box display={{ base: "none", sm: "block" }}>
              <LanguageSwitcher />
            </Box>
            <ColorModeButton />
            <Button asChild size="md" px={{ base: "5", lg: "4", xl: "5" }} fontSize={{ base: "md", lg: "sm", xl: "md" }} ml="2" display={{ base: "none", md: "inline-flex" }}>
              <NextLink href={href(navCta.href)}>{t.nav[navCta.label]}</NextLink>
            </Button>
            <MobileMenu />
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
