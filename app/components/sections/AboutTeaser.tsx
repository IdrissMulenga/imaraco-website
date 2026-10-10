import { Box, Button, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { PiHeartDuotone, PiLightbulbDuotone, PiShieldCheckDuotone } from "react-icons/pi";
import { Float, Reveal } from "@/components/motion/Reveal";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { Section } from "./Section";

// Imara brand teal (from the official logo).
const TEAL = "#0C5856";
const smooth = "cubic-bezier(.22,1,.36,1)";

const values = [
  // Icons for the three values; their text is in the dictionary (aboutTeaser.values).
  <PiShieldCheckDuotone key="a" />,
  <PiHeartDuotone key="b" />,
  <PiLightbulbDuotone key="c" />,
];

/** Small floating label on the logo card. */
function FloatingLabel({ children }: { children: React.ReactNode }) {
  return (
    <HStack
      gap="2"
      px="3.5"
      py="2"
      bg="bg.panel"
      borderRadius="full"
      borderWidth="1px"
      borderColor="border"
      boxShadow="lg"
      fontSize="sm"
      fontWeight="medium"
      whiteSpace="nowrap"
    >
      {children}
    </HStack>
  );
}

export async function AboutTeaser() {
  const { t, href } = await getI18n();
  return (
    <Section aria-labelledby="about-title">
      <Grid
        templateColumns={{ base: "1fr", md: "0.9fr 1.1fr" }}
        gap={{ base: "12", md: "16" }}
        alignItems="center"
      >
        {/* The official Imara Co logo on brand teal */}
        <Reveal>
          <Box position="relative" maxW={{ base: "sm", md: "md" }} mx="auto" px={{ base: "4", md: "6" }}>
            <Box
              position="relative"
              aspectRatio="1"
              borderRadius="l4"
              overflow="hidden"
              bg={TEAL}
              boxShadow={`0 40px 70px -35px ${TEAL}`}
              css={{
                transition: `transform .6s ${smooth}`,
                "&:hover": { transform: "rotate(-1.5deg) scale(1.02)" },
                "& .ab-glow": { transition: `transform 1s ${smooth}` },
                "&:hover .ab-glow": { transform: "scale(1.3)" },
                "@media (prefers-reduced-motion: reduce)": {
                  "&, & *": { transition: "none !important" },
                  "&:hover, &:hover *": { transform: "none !important" },
                },
              }}
            >
              <Image
                src="/brand/imara-logo-full.webp"
                alt={t.aboutTeaser.logoAlt}
                fill
                sizes="(max-width: 768px) 80vw, 440px"
                style={{ objectFit: "cover" }}
              />
              {/* Soft light glow */}
              <Box
                className="ab-glow"
                position="absolute"
                top="-20%"
                right="-20%"
                boxSize="70%"
                borderRadius="full"
                bg="whiteAlpha.300"
                filter="blur(60px)"
                pointerEvents="none"
              />
            </Box>

            {/* Floating labels */}
            <Box position="absolute" top={{ base: "-5", md: "6%" }} left={{ base: "0", md: "-4" }}>
              <Float delay={0.4}>
                <FloatingLabel>
                  <Text as="span" fontWeight="bold" color="brand.fg">
                    Imara
                  </Text>
                  <Text as="span" color="fg.muted">
                    {t.aboutTeaser.means}
                  </Text>
                </FloatingLabel>
              </Float>
            </Box>
          </Box>
        </Reveal>

        {/* Story */}
        <Stack gap="6">
          <Reveal delay={0.08}>
            <Stack gap="4">
              <Text textStyle="eyebrow" color="brand.fg">
                {t.aboutTeaser.eyebrow}
              </Text>
              <Heading as="h2" id="about-title" size={{ base: "2xl", md: "4xl" }}>
                {t.aboutTeaser.title}
              </Heading>
              <Text textStyle="lead" color="fg.muted">
                {t.aboutTeaser.text}
              </Text>
            </Stack>
          </Reveal>

          {/* Key values */}
          <Stack as="ul" listStyleType="none" gap="3">
            {t.aboutTeaser.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={0.14 + i * 0.07}>
                <HStack
                  gap="4"
                  p="3"
                  borderRadius="l3"
                  borderWidth="1px"
                  borderColor="border.subtle"
                  bg="bg.subtle"
                  css={{
                    transition: `transform .35s ${smooth}, border-color .3s, background .3s`,
                    "&:hover": { transform: "translateX(6px)", borderColor: "brand.emphasized", bg: "bg.panel" },
                    "@media (prefers-reduced-motion: reduce)": { transition: "none", "&:hover": { transform: "none" } },
                  }}
                >
                  <Box
                    boxSize="11"
                    flexShrink={0}
                    borderRadius="28%"
                    bgImage={`linear-gradient(145deg, #13807D, ${TEAL})`}
                    boxShadow={`0 8px 18px -8px ${TEAL}`}
                    color="white"
                    display="grid"
                    placeItems="center"
                    fontSize="2xl"
                    aria-hidden="true"
                  >
                    {values[i]}
                  </Box>
                  <Box>
                    <Text fontWeight="semibold">{v.title}</Text>
                    <Text fontSize="sm" color="fg.muted">
                      {v.text}
                    </Text>
                  </Box>
                </HStack>
              </Reveal>
            ))}
          </Stack>

          <Reveal delay={0.35}>
            <HStack gap="3" flexWrap="wrap">
              <Button asChild size="lg">
                <NextLink href={href(routes.about)}>
                  {t.aboutTeaser.cta}
                  <LuArrowRight />
                </NextLink>
              </Button>
            </HStack>
          </Reveal>
        </Stack>
      </Grid>
    </Section>
  );
}
