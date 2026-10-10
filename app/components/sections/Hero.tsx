import { Box, Button, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import NextLink from "next/link";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";

// Hero buttons: on phones they share the row, each sized to its label.
const heroButton = {
  flex: { base: "1 1 auto", sm: "0 0 auto" },
  minW: "0",
  px: { base: "3.5", sm: "7" },
  fontSize: { base: "13px", sm: "md" },
  letterSpacing: { base: "-0.01em", sm: "-0.005em" },
} as const;

export async function Hero() {
  const { lang, t, href } = await getI18n();
  return (
    <Box as="section" aria-labelledby="hero-title" position="relative" overflow="hidden">
      {/* Abstract background: soft brand glow + fading dot grid */}
      <Box
        aria-hidden="true"
        position="absolute"
        inset="0"
        pointerEvents="none"
        bgImage="radial-gradient(circle at 85% 10%, var(--chakra-colors-brand-muted), transparent 45%), radial-gradient(circle at 0% 100%, var(--chakra-colors-brand-subtle), transparent 40%)"
        css={{ maskImage: "linear-gradient(to bottom, black 60%, transparent)" }}
      />
      <Box
        aria-hidden="true"
        position="absolute"
        inset="0"
        pointerEvents="none"
        opacity={{ _light: 0.5, _dark: 0.25 }}
        bgImage="radial-gradient(var(--chakra-colors-border-emphasized) 1px, transparent 1px)"
        bgSize="22px 22px"
        css={{ maskImage: "linear-gradient(to bottom, black, transparent 85%)" }}
      />

      <Container maxW="7xl" px={{ base: "4", md: "6" }} position="relative">
        <Grid
          templateColumns={{ base: "1fr", lg: "1.05fr 1fr" }}
          gap={{ base: "12", lg: "16" }}
          alignItems={{ base: "center", lg: "start" }}
          pt={{ base: "8", md: "10", lg: "8" }}
          pb={{ base: "6", md: "8" }}
        >
          <Stack gap={{ base: "5", md: "6" }} pt={{ lg: "6" }}>
            <Text textStyle="eyebrow" color="brand.fg">
              {t.hero.eyebrow}
            </Text>
            <Heading
              as="h1"
              id="hero-title"
              // French phrases are longer, so the title is a step smaller.
              fontSize={lang === "fr" ? { base: "4xl", sm: "5xl", xl: "6xl" } : { base: "4xl", sm: "5xl", md: "6xl", xl: "7xl" }}
              lineHeight="1"
              letterSpacing="-0.02em"
            >
              {/* "Build it. Run it." side by side; on a very narrow screen the
                  two phrases wrap as whole phrases, never mid-phrase. */}
              <Box as="span" display="flex" flexWrap="wrap" columnGap="0.25em">
                <Box as="span" whiteSpace="nowrap">
                  {t.hero.build}
                </Box>
                <Box as="span" whiteSpace="nowrap">
                  {t.hero.run}
                </Box>
              </Box>
              <Box as="span" display="block" color="brand.fg">
                {t.hero.fix}
              </Box>
            </Heading>
            <Text textStyle="lead" color="fg.muted" maxW="xl">
              {t.hero.text}
            </Text>
            {/* Side by side at every width. On phones the labels stay on one
                line: smaller text, no arrow, each button as wide as its label (on
                very narrow phones the second one moves to its own line). */}
            <HStack gap={{ base: "2", sm: "3" }} pt="2" flexWrap="wrap">
              <Button asChild size={{ base: "lg", sm: "xl" }} {...heroButton}>
                <NextLink href={href(routes.products)}>
                  {t.hero.ctaPrimary}
                  <Box as="span" display={{ base: "none", sm: "inline-flex" }}>
                    <LuArrowRight />
                  </Box>
                </NextLink>
              </Button>
              <Button asChild size={{ base: "lg", sm: "xl" }} variant="outline" colorPalette="gray" {...heroButton}>
                <NextLink href={href(routes.contact)}>{t.hero.ctaSecondary}</NextLink>
              </Button>
            </HStack>
          </Stack>

          <Box maxW={{ base: "md", md: "xl", lg: "none" }} mx={{ base: "auto", lg: "0" }} w="full">
            <HeroIllustration />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
