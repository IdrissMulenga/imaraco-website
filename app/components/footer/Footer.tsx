import { Box, Container, Flex, Grid, HStack, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import { cacheLife } from "next/cache";
import NextLink from "next/link";
import { PiArrowUpBold, PiEnvelopeSimpleFill, PiInstagramLogoFill, PiWhatsappLogoFill } from "react-icons/pi";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { NotifyForm } from "@/components/shared/NotifyForm";
import { productPalette } from "@/components/shared/ProductLogo";
import { getProducts } from "@/data/products";
import { afyaStores, routes, site, whatsappLink } from "@/data/site";
import { getI18n } from "@/i18n/server";

// Cached so pages can be built ahead of time; refreshed at least daily, so
// the © year changes on its own after New Year, without a redeploy.
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const smooth = "cubic-bezier(.22,1,.36,1)";

type FooterLink = { href: string; label: string; external?: boolean; dot?: string };

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <Stack as="nav" aria-label={title} gap="4">
      <Text fontSize="xs" fontWeight="bold" letterSpacing="0.14em" textTransform="uppercase" color="fg.subtle">
        {title}
      </Text>
      <Stack as="ul" gap="2.5" listStyleType="none">
        {links.map((l) => (
          <li key={l.label}>
            <ChakraLink
              asChild
              color="fg.muted"
              fontSize="sm"
              textDecoration="none"
              display="inline-flex"
              alignItems="center"
              gap="2"
              css={{
                transition: `color .2s, transform .3s ${smooth}`,
                "&:hover": { color: "fg", transform: "translateX(4px)", textDecoration: "none" },
                "@media (prefers-reduced-motion: reduce)": { "&:hover": { transform: "none" } },
              }}
            >
              {l.external ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.dot && <Box as="span" boxSize="2" borderRadius="full" bg={l.dot} flexShrink={0} />}
                  {l.label}
                </a>
              ) : (
                <NextLink href={l.href}>
                  {l.dot && <Box as="span" boxSize="2" borderRadius="full" bg={l.dot} flexShrink={0} />}
                  {l.label}
                </NextLink>
              )}
            </ChakraLink>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}

const socials = [
  { label: "WhatsApp", href: whatsappLink(), icon: <PiWhatsappLogoFill />, color: "#22C55E" },
  { label: `Instagram ${site.instagram.handle}`, href: site.instagram.url, icon: <PiInstagramLogoFill />, color: "#E1306C" },
  { label: `Email ${site.email}`, href: `mailto:${site.email}`, icon: <PiEnvelopeSimpleFill />, color: "#F7931E" },
];

/**
 * Site footer: light in light mode, dark in dark mode. Newsletter signup, brand + socials,
 * link columns, and a bottom bar with © and "Back to top".
 */
export async function Footer() {
  const year = await currentYear();
  const { t, href } = await getI18n();

  return (
    <Box
      as="footer"
      position="relative"
      overflow="hidden"
      bg={{ _light: "#F6F4F2", _dark: "#0F0D0C" }}
      color="fg"
      borderTopWidth="1px"
      borderColor="border.subtle"
      mt={{ base: "8", md: "12" }}
    >
      {/* Decoration: warm glow + large faded logo mark */}
      <Box aria-hidden="true" position="absolute" top="-40" left="20%" w="60%" h="72" borderRadius="full" bg="#F7931E" opacity={{ _light: 0.1, _dark: 0.18 }} filter="blur(100px)" />
      <Box aria-hidden="true" position="absolute" right={{ base: "-16", md: "-6" }} bottom={{ base: "-10", md: "-16" }} opacity={{ _light: 0.04, _dark: 0.05 }}>
        <LogoMark height={{ base: "72", md: "96" }} color="fg" />
      </Box>

      <Container maxW="7xl" px={{ base: "4", md: "6" }} position="relative">
        {/* Newsletter */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          gap="6"
          py={{ base: "10", md: "12" }}
          borderBottomWidth="1px"
          borderColor="border"
        >
          <Box maxW="md">
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" letterSpacing="-0.01em">
              {t.footer.newsletterTitle}
            </Text>
            <Text color="fg.muted" mt="1">
              {t.footer.newsletterText}
            </Text>
          </Box>
          <Box w={{ base: "full", md: "md" }} css={{ "& input": { bg: "bg.panel" } }}>
            <NotifyForm topic="news" topicName={t.notify.newsTopic} successText={t.footer.newsletterSuccess} />
          </Box>
        </Flex>

        {/* Main */}
        <Grid
          templateColumns={{ base: "1fr 1fr", lg: "1.6fr 1fr 1fr 1fr" }}
          gap={{ base: "10", lg: "12" }}
          py={{ base: "12", md: "14" }}
        >
          <Stack gap="5" gridColumn={{ base: "span 2", lg: "auto" }} maxW="sm">
            <NextLink href={href(routes.home)} aria-label={t.common.homeAria} style={{ width: "fit-content" }}>
              <Logo />
            </NextLink>
            <Text color="fg.muted" fontSize="sm">
              {t.footer.blurb}
            </Text>
            <Text fontWeight="semibold" color="brand.fg">
              {t.common.tagline}
            </Text>
            <HStack gap="2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  // mailto: opens the mail app; a new tab would just stay empty
                  {...(s.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  aria-label={s.label}
                >
                  <Box
                    boxSize="10"
                    borderRadius="full"
                    display="grid"
                    placeItems="center"
                    fontSize="lg"
                    bg="bg.panel"
                    borderWidth="1px"
                    borderColor="border"
                    color="fg.muted"
                    css={{
                      transition: `transform .35s ${smooth}, background .25s, border-color .25s`,
                      "&:hover": { transform: "translateY(-3px)", bg: s.color, borderColor: s.color, color: "white" },
                      "@media (prefers-reduced-motion: reduce)": { "&:hover": { transform: "none" } },
                    }}
                  >
                    {s.icon}
                  </Box>
                </a>
              ))}
            </HStack>
          </Stack>

          <FooterColumn
            title={t.footer.company}
            links={[
              { href: href(routes.home), label: t.nav.home },
              { href: href(routes.about), label: t.nav.about },
              { href: href(routes.services), label: t.nav.services },
              { href: href(routes.labs), label: t.nav.labs },
              { href: href(routes.blog), label: t.nav.blog },
              { href: href(routes.contact), label: t.nav.contact },
            ]}
          />
          <FooterColumn
            title={t.footer.products}
            links={getProducts(t).map((p) => ({
              // Imara Afya: store link after launch, Products page until then.
              href: p.href ? href(p.href) : afyaStores.launched ? afyaStores.playStore : href(routes.products),
              label: p.name,
              external: !p.href && afyaStores.launched,
              dot: productPalette[p.id].icon[0],
            }))}
          />
          <FooterColumn
            title={t.footer.legal}
            links={[
              { href: href(routes.privacy), label: t.footer.privacy },
              { href: href(routes.terms), label: t.footer.terms },
              { href: href(routes.cookies), label: t.footer.cookies },
            ]}
          />
        </Grid>

        {/* Bottom bar */}
        <Flex
          py="6"
          borderTopWidth="1px"
          borderColor="border"
          direction={{ base: "column-reverse", sm: "row" }}
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          gap="4"
        >
          <Text fontSize="sm" color="fg.muted">
            © {year} {t.footer.rights}
          </Text>
          <ChakraLink
            href="#main"
            display="inline-flex"
            alignItems="center"
            gap="2"
            fontSize="sm"
            fontWeight="medium"
            color="fg.muted"
            textDecoration="none"
            css={{
              "& .ft-up": { transition: `transform .35s ${smooth}` },
              "&:hover": { color: "fg", textDecoration: "none" },
              "&:hover .ft-up": { transform: "translateY(-3px)" },
            }}
          >
            {t.common.backToTop}
            <Box
              className="ft-up"
              boxSize="8"
              borderRadius="full"
              display="grid"
              placeItems="center"
              bg="bg.panel"
              borderWidth="1px"
              borderColor="border"
            >
              <PiArrowUpBold />
            </Box>
          </ChakraLink>
        </Flex>
      </Container>
    </Box>
  );
}
