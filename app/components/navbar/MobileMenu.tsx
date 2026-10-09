"use client";

import { Box, Button, Center, HStack, IconButton, Portal, Stack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LuChevronRight, LuMenu, LuX } from "react-icons/lu";
import { useI18n } from "@/i18n/client";
import { NAV_ICON_BUTTON } from "./ColorModeButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { isActiveLink, navCta, navLinks } from "./navLinks";

const MotionBox = motion.create(Box);

// Navbar height (phones / tablet and up). The menu card opens just below it.
export const NAVBAR_HEIGHT = { base: "4rem", md: "4.5rem" };

/**
 * Mobile menu (phones and tablets only): the ☰ button turns into ✕ and a
 * rounded card drops down under the navbar, with the page dimmed behind.
 * Closes on ✕, a tap outside, the Escape key, choosing a link, or when the
 * window becomes desktop-sized. While open, Tab stays inside the menu.
 */
export function MobileMenu() {
  const pathname = usePathname();
  const { t, href } = useI18n();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = () => setOpen(false);

  // While open: lock page scroll, close on Escape, focus the first link,
  // keep Tab inside the menu, and close if the window becomes desktop-sized
  // (the menu is hidden there, so the page would stay locked).
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        // Cycle through the ✕ button and the menu's links/buttons. Done by
        // hand: the menu sits at the end of the page (Portal), away from ✕,
        // so the browser's own Tab order would jump into the page.
        const items = [
          toggleRef.current,
          ...(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []),
        ].filter((el): el is HTMLElement => !!el);
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length;
        e.preventDefault();
        items[next]?.focus();
      }
    };
    // Chakra's "lg" breakpoint (64rem = 1024px), where the desktop links show.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <>
      <IconButton
        ref={toggleRef}
        aria-label={open ? t.common.closeMenu : t.common.openMenu}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        variant="ghost"
        colorPalette="gray"
        {...NAV_ICON_BUTTON}
        borderRadius="full"
        display={{ base: "inline-flex", lg: "none" }}
      >
        {open ? <LuX /> : <LuMenu />}
      </IconButton>

      <Portal>
        <AnimatePresence>
          {open && (
            // Dimmed page behind the card (the navbar stays above it)
            <MotionBox
              key="backdrop"
              display={{ lg: "none" }}
              position="fixed"
              top={NAVBAR_HEIGHT}
              insetX="0"
              bottom="0"
              zIndex="dropdown"
              bg="blackAlpha.500"
              backdropFilter="blur(2px)"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
          {open && (
            // The card
            <MotionBox
              key="panel"
              ref={panelRef}
              id="mobile-menu"
              display={{ lg: "none" }}
              position="fixed"
              top={{ base: "calc(4rem + 8px)", md: "calc(4.5rem + 8px)" }}
              insetX={{ base: "3", md: "6" }}
              zIndex="dropdown"
              bg="bg.panel"
              borderWidth="1px"
              borderColor="border"
              borderRadius="l4"
              boxShadow="2xl"
              p="2"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top center" }}
            >
              <Stack as="nav" aria-label={t.nav.mobileAria} gap="0.5">
                {navLinks.map((link, i) => {
                  const active = isActiveLink(pathname, link.href);
                  const Icon = link.icon;
                  return (
                    <NextLink
                      key={link.href}
                      href={href(link.href)}
                      ref={i === 0 ? firstLinkRef : undefined}
                      aria-current={active ? "page" : undefined}
                      onClick={close}
                    >
                      <HStack
                        gap="3"
                        px="3"
                        py="2.5"
                        borderRadius="l3"
                        bg={active ? "brand.subtle" : undefined}
                        _hover={{ bg: active ? "brand.subtle" : "bg.muted" }}
                        transition="background 0.15s"
                      >
                        <Center
                          boxSize="9"
                          borderRadius="l2"
                          bg={active ? "brand.muted" : "bg.muted"}
                          color={active ? "brand.fg" : "fg.muted"}
                          fontSize="lg"
                          flexShrink={0}
                        >
                          <Icon />
                        </Center>
                        <Text
                          flex="1"
                          fontWeight="semibold"
                          fontSize="lg"
                          color={active ? "brand.fg" : "fg"}
                        >
                          {t.nav[link.label]}
                        </Text>
                        <Box color={active ? "brand.fg" : "fg.subtle"} aria-hidden="true">
                          <LuChevronRight />
                        </Box>
                      </HStack>
                    </NextLink>
                  );
                })}
              </Stack>

              {/* Language switch (the navbar hides it on small phones) */}
              <HStack justify="space-between" px="3" pt="3" pb="1" borderTopWidth="1px" borderColor="border.subtle" mt="2">
                <Text fontSize="sm" color="fg.muted">
                  {t.common.language}
                </Text>
                <LanguageSwitcher size="md" />
              </HStack>
              <Box px="1" pt="2" pb="1">
                <Button asChild size="lg" w="full" onClick={close}>
                  <NextLink href={href(navCta.href)}>{t.nav[navCta.label]}</NextLink>
                </Button>
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
