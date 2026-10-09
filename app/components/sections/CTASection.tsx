import { Box, Button, Circle, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { LuArrowDown, LuArrowRight } from "react-icons/lu";
import { PiRocketLaunchDuotone } from "react-icons/pi";
import { Float, Reveal } from "@/components/motion/Reveal";
import { whatsappLink } from "@/data/site";
import { getI18n } from "@/i18n/server";

export type CTASectionProps = {
  title: string;
  subtitle: string;
  whatsappLabel: string;
  whatsappMessage?: string;
  /** Secondary action, e.g. jump to the form on the same page. */
  secondary?: { href: string; label: string };
  /** Optional "what happens next" steps shown beside the text. */
  steps?: { title: string; text: string }[];
};

const smooth = "cubic-bezier(.22,1,.36,1)";

/**
 * Full-width call-to-action band in deep Imara orange: glowing orbs, dot
 * pattern and a big floating rocket, with WhatsApp + a secondary action.
 */
export async function CTASection({
  title,
  subtitle,
  whatsappLabel,
  whatsappMessage,
  secondary,
  steps,
}: CTASectionProps) {
  // Internal links ("/contact") get the current language added.
  const { href } = await getI18n();
  return (
    <Box as="section" aria-labelledby="cta-title" px={{ base: "4", md: "6" }} py={{ base: "8", md: "12" }}>
      <Container maxW="7xl" px="0">
        <Reveal>
          <Box
            position="relative"
            overflow="hidden"
            color="white"
            borderRadius="l4"
            px={{ base: "6", md: "14" }}
            py={{ base: "10", md: "16" }}
            bgImage={{
              _light: "linear-gradient(135deg, #C2650B 0%, #964C0C 55%, #5F2F07 100%)",
              _dark: "linear-gradient(135deg, #964C0C 0%, #5F2F07 60%, #301804 100%)",
            }}
            boxShadow="0 40px 80px -40px rgba(194,101,11,.55)"
          >
            {/* Decoration */}
            <Box
              aria-hidden="true"
              position="absolute"
              inset="0"
              opacity={0.25}
              bgImage="radial-gradient(rgba(255,255,255,.55) 1px, transparent 1px)"
              bgSize="22px 22px"
              css={{ maskImage: "linear-gradient(to left, black, transparent 60%)" }}
            />
            <Box aria-hidden="true" position="absolute" top="-30%" right="-10%" boxSize="96" borderRadius="full" bg="#F7931E" opacity={0.55} filter="blur(90px)" />
            <Box aria-hidden="true" position="absolute" bottom="-40%" left="20%" boxSize="80" borderRadius="full" bg="#FFC93C" opacity={0.18} filter="blur(90px)" />
            <Box
              aria-hidden="true"
              position="absolute"
              right={{ base: "-10", md: "4%" }}
              top={{ base: "-6", md: "50%" }}
              mt={{ md: "-24" }}
              fontSize={{ base: "9rem", md: "12rem" }}
              lineHeight="1"
              color="white"
              opacity={0.12}
              display={steps ? { base: "block", lg: "none" } : "block"}
            >
              <Float>
                <Box transform="rotate(12deg)">
                  <PiRocketLaunchDuotone />
                </Box>
              </Float>
            </Box>

            <Grid
              position="relative"
              templateColumns={steps ? { base: "1fr", lg: "1.1fr 0.9fr" } : "1fr"}
              gap={{ base: "10", lg: "16" }}
              alignItems="center"
            >
              <Stack gap="5" maxW="2xl">
                <Heading as="h2" id="cta-title" size={{ base: "2xl", md: "4xl" }} color="inherit" letterSpacing="-0.02em">
                  {title}
                </Heading>
                <Text textStyle="lead" color="whiteAlpha.900">
                  {subtitle}
                </Text>
                <Stack direction={{ base: "column", sm: "row" }} gap="3" pt="2">
                  <Button
                    asChild
                    size="lg"
                    bg="white"
                    color="#964C0C"
                    _hover={{ bg: "#FFF7EB", transform: "translateY(-2px)" }}
                    boxShadow="0 10px 24px -10px rgba(0,0,0,.4)"
                  >
                    <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp />
                      {whatsappLabel}
                    </a>
                  </Button>
                  {secondary && (
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      color="white"
                      borderColor="whiteAlpha.600"
                      _hover={{ bg: "whiteAlpha.200", borderColor: "white" }}
                    >
                      <a href={href(secondary.href)}>
                        {secondary.label}
                        {secondary.href.startsWith("#") ? <LuArrowDown /> : <LuArrowRight />}
                      </a>
                    </Button>
                  )}
                </Stack>
              </Stack>

              {steps && (
                <Stack as="ol" listStyleType="none" gap="3">
                  {steps.map((step, i) => (
                    <Reveal key={step.title} delay={0.12 + i * 0.1}>
                      <HStack
                        as="li"
                        align="flex-start"
                        gap="4"
                        p="4"
                        borderRadius="l3"
                        bg="whiteAlpha.100"
                        borderWidth="1px"
                        borderColor="whiteAlpha.200"
                        backdropFilter="blur(6px)"
                        css={{
                          transition: `transform .4s ${smooth}, background .3s`,
                          "&:hover": { transform: "translateX(6px)", bg: "whiteAlpha.200" },
                          "@media (prefers-reduced-motion: reduce)": { transition: "none", "&:hover": { transform: "none" } },
                        }}
                      >
                        <Circle size="9" bg="white" color="#964C0C" fontWeight="bold" flexShrink={0}>
                          {i + 1}
                        </Circle>
                        <Box>
                          <Text fontWeight="semibold">{step.title}</Text>
                          <Text fontSize="sm" color="whiteAlpha.800">
                            {step.text}
                          </Text>
                        </Box>
                      </HStack>
                    </Reveal>
                  ))}
                </Stack>
              )}
            </Grid>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
