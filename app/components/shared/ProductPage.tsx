import { Badge, Box, Button, Container, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuArrowDown, LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Float, Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/sections/Section";
import type { Product } from "@/data/products";
import { routes } from "@/data/site";
import { fill } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { FAQ, type FAQItem } from "./FAQ";
import type { Feature } from "./FeatureGrid";
import { IconCard } from "./IconCard";
import { ProductLogo, productIconsDuotone, productPalette } from "./ProductLogo";
import { SectionHeading } from "./SectionHeading";

const smooth = "cubic-bezier(.22,1,.36,1)";

/**
 * Shared layout for a product page (Duka POS, School, Imara Pay), styled in
 * the product's own colours: hero → features → how it works → extra
 * content → FAQ → CTA.
 */
export async function ProductPage({
  product,
  intro,
  primaryCta,
  features,
  steps,
  faq,
  children,
}: {
  product: Product;
  intro: string;
  primaryCta: { label: string; href: string };
  features: Feature[];
  steps?: { title: string; text: string }[];
  faq?: FAQItem[];
  /** Product-specific sections, shown after "How it works". */
  children?: React.ReactNode;
}) {
  const { t, href } = await getI18n();
  // Links like "/contact?interest=…" get the language added; "#order" stays.
  const ctaHref = href(primaryCta.href);
  const pal = productPalette[product.id];
  const [from, to] = pal.icon;
  const accent = { _light: pal.text.light, _dark: pal.text.dark };
  // Three features float as chips on the hero picture.
  const chips = features.slice(0, 3);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <Box
        as="header"
        position="relative"
        overflow="hidden"
        borderBottomWidth="1px"
        borderColor="border.subtle"
        bgImage={`radial-gradient(circle at 85% 20%, ${from}30, transparent 45%)`}
      >
        <Container maxW="7xl" px={{ base: "4", md: "6" }} py={{ base: "8", md: "12" }}>
          <Grid templateColumns={{ base: "1fr", lg: "1.1fr 0.9fr" }} gap={{ base: "10", lg: "14" }} alignItems="center">
            <Stack gap="5">
              <NextLink href={href(routes.products)} style={{ width: "fit-content" }}>
                <HStack gap="1.5" fontSize="sm" color="fg.muted" _hover={{ color: "fg" }}>
                  <LuArrowLeft />
                  {t.common.allProducts}
                </HStack>
              </NextLink>
              <HStack gap="4">
                <ProductLogo id={product.id} size={{ base: "14", md: "16" }} />
                <Stack gap="0.5">
                  <Text fontSize="xs" fontWeight="bold" letterSpacing="0.14em" textTransform="uppercase" color={accent}>
                    {product.category}
                  </Text>
                  <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.05" letterSpacing="-0.025em">
                    {product.name}
                  </Heading>
                </Stack>
              </HStack>
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold" color={accent}>
                {product.tagline}
              </Text>
              <Text textStyle="lead" color="fg.muted" maxW="xl">
                {intro}
              </Text>
              <HStack gap="2" flexWrap="wrap">
                {product.meta.split(" · ").map((m) => (
                  <Badge
                    key={m}
                    variant="outline"
                    size="lg"
                    borderRadius="full"
                    color={accent}
                    boxShadow="none"
                    borderWidth="1px"
                    borderColor={{ _light: pal.border.light, _dark: pal.border.dark }}
                  >
                    {m}
                  </Badge>
                ))}
              </HStack>
              <Stack direction={{ base: "column", sm: "row" }} gap="3" pt="1">
                <Button asChild size="lg" bgImage={`linear-gradient(135deg, ${from}, ${to})`} color="white" _hover={{ opacity: 0.92 }}>
                  <NextLink href={ctaHref}>
                    {primaryCta.label}
                    <LuArrowRight />
                  </NextLink>
                </Button>
                <Button asChild size="lg" variant="outline" colorPalette="gray">
                  <a href="#features">
                    {t.common.seeFeatures}
                    <LuArrowDown />
                  </a>
                </Button>
              </Stack>
            </Stack>

            {/* Picture: product colours, big logo, floating feature chips */}
            <Reveal>
              <Box
                position="relative"
                aspectRatio={{ base: "4 / 3", lg: "1" }}
                maxW={{ lg: "md" }}
                mx="auto"
                w="full"
                borderRadius="l4"
                overflow="hidden"
                borderWidth="1px"
                borderColor={{ _light: pal.border.light, _dark: pal.border.dark }}
                bgImage={{
                  _light: `linear-gradient(135deg, ${pal.soft.light[0]}, ${pal.soft.light[1]})`,
                  _dark: `linear-gradient(135deg, ${pal.soft.dark[0]}, ${pal.soft.dark[1]})`,
                }}
                aria-hidden="true"
              >
                <Box position="absolute" inset="0" opacity={0.45} bgImage={`radial-gradient(${to}33 1.2px, transparent 1.2px)`} bgSize="18px 18px" />
                <Box position="absolute" top="-15%" right="-15%" boxSize="70%" borderRadius="full" bg={from} opacity={0.35} filter="blur(60px)" />
                <Box
                  position="absolute"
                  right="-8%"
                  bottom="-10%"
                  fontSize={{ base: "12rem", md: "16rem" }}
                  lineHeight="1"
                  color={{ _light: to, _dark: from }}
                  opacity={0.12}
                  transform="rotate(-12deg)"
                >
                  {productIconsDuotone[product.id]}
                </Box>
                <Box position="absolute" inset="0" display="grid" placeItems="center">
                  <Float>
                    <ProductLogo id={product.id} size={{ base: "24", md: "32" }} />
                  </Float>
                </Box>
                {chips.map((c, i) => {
                  const pos = [
                    { top: "10%", left: "6%" },
                    { top: "42%", right: "6%", display: { base: "none", md: "block" } },
                    { bottom: { base: "8%", md: "10%" }, left: { base: "auto", md: "10%" }, right: { base: "6%", md: "auto" } },
                  ][i];
                  return (
                    <Box key={c.title} position="absolute" {...pos}>
                      <Float delay={0.6 + i * 0.7}>
                        <HStack
                          gap="2.5"
                          px="3"
                          py="2"
                          bg="bg.panel"
                          borderRadius="full"
                          borderWidth="1px"
                          borderColor="border"
                          boxShadow="lg"
                        >
                          <Box boxSize="7" borderRadius="full" display="grid" placeItems="center" color="white" fontSize="md" bgImage={`linear-gradient(145deg, ${from}, ${to})`}>
                            {c.icon}
                          </Box>
                          <Text fontSize="sm" fontWeight="semibold" whiteSpace="nowrap">
                            {c.title}
                          </Text>
                        </HStack>
                      </Float>
                    </Box>
                  );
                })}
              </Box>
            </Reveal>
          </Grid>
        </Container>
      </Box>

      {/* ---------- Features ---------- */}
      <Section id="features" aria-labelledby="features-title" scrollMarginTop="20">
        <Box mb={{ base: "10", md: "12" }}>
          <SectionHeading id="features-title" eyebrow={t.productPage.featuresEyebrow} title={t.productPage.featuresTitle} />
        </Box>
        <SimpleGrid as="ul" listStyleType="none" columns={{ base: 1, sm: 2, lg: 3 }} gap="5">
          {features.map((f, i) => (
            <Box as="li" key={f.title}>
              <Reveal delay={(i % 3) * 0.08}>
                <IconCard icon={f.icon} color={pal.icon} title={f.title} text={f.text} />
              </Reveal>
            </Box>
          ))}
        </SimpleGrid>
      </Section>

      {/* ---------- How it works ---------- */}
      {steps && (
        <Section tone="subtle" aria-labelledby="steps-title">
          <Box mb={{ base: "10", md: "12" }}>
            <SectionHeading id="steps-title" eyebrow={t.productPage.howEyebrow} title={t.productPage.howTitle} />
          </Box>
          <SimpleGrid as="ol" listStyleType="none" columns={{ base: 1, md: steps.length }} gap="5" position="relative">
            <Box
              aria-hidden="true"
              display={{ base: "none", md: "block" }}
              position="absolute"
              top="12"
              left="12%"
              right="12%"
              borderTopWidth="2px"
              borderStyle="dashed"
              borderColor={{ _light: pal.border.light, _dark: pal.border.dark }}
            />
            {steps.map((step, i) => (
              <Box as="li" key={step.title} position="relative">
                <Reveal delay={i * 0.08}>
                  <Stack
                    gap="3"
                    h="full"
                    p="6"
                    position="relative"
                    overflow="hidden"
                    bg="bg.panel"
                    borderWidth="1px"
                    borderColor="border"
                    borderRadius="l4"
                    css={{
                      transition: `transform .45s ${smooth}, box-shadow .45s ${smooth}, border-color .3s`,
                      "&:hover": { transform: "translateY(-5px)", boxShadow: `0 24px 44px -24px ${to}99`, borderColor: `${from}88` },
                      "@media (prefers-reduced-motion: reduce)": { transition: "none", "&:hover": { transform: "none" } },
                    }}
                  >
                    <Text aria-hidden="true" position="absolute" top="-2" right="3" fontSize="7xl" fontWeight="bold" lineHeight="1" color={accent} opacity={0.1}>
                      {i + 1}
                    </Text>
                    <Box
                      boxSize="12"
                      borderRadius="full"
                      display="grid"
                      placeItems="center"
                      color="white"
                      fontWeight="bold"
                      fontSize="lg"
                      bgImage={`linear-gradient(145deg, ${from}, ${to})`}
                      boxShadow={`0 10px 20px -10px ${to}`}
                    >
                      {i + 1}
                    </Box>
                    <Text fontWeight="bold" fontSize="lg">
                      {step.title}
                    </Text>
                    <Text color="fg.muted" fontSize="sm">
                      {step.text}
                    </Text>
                  </Stack>
                </Reveal>
              </Box>
            ))}
          </SimpleGrid>
        </Section>
      )}

      {children}

      {/* ---------- FAQ ---------- */}
      {faq && (
        <Section aria-labelledby="faq-title">
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: "8", lg: "12" }}>
            <SectionHeading id="faq-title" eyebrow={t.productPage.faqEyebrow} title={t.productPage.faqTitle} />
            <Box gridColumn={{ lg: "span 2" }}>
              <FAQ items={faq} />
            </Box>
          </SimpleGrid>
        </Section>
      )}

      <CTASection
        title={fill(t.productPage.ctaTitle, { name: product.name })}
        subtitle={t.productPage.ctaSubtitle}
        whatsappLabel={t.common.contactUsWhatsApp}
        whatsappMessage={fill(t.productPage.whatsappMessage, { name: product.name })}
      />
    </>
  );
}
