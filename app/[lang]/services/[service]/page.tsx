import { Box, Button, Container, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LuArrowDown, LuArrowLeft, LuArrowRight, LuCheck } from "react-icons/lu";
import {
  PiArrowsClockwiseDuotone,
  PiChartLineUpDuotone,
  PiChatsCircleDuotone,
  PiClockDuotone,
  PiCursorClickDuotone,
  PiDevicesDuotone,
  PiEyeDuotone,
  PiHandTapDuotone,
  PiLightningDuotone,
  PiLockKeyDuotone,
  PiMagnifyingGlassDuotone,
  PiPlugsConnectedDuotone,
  PiPulseDuotone,
  PiRocketLaunchDuotone,
  PiSealCheckDuotone,
  PiShieldCheckDuotone,
  PiStackDuotone,
  PiStairsDuotone,
  PiSwatchesDuotone,
  PiTargetDuotone,
  PiTimerDuotone,
  PiTrendUpDuotone,
  PiUsersThreeDuotone,
  PiWhatsappLogoDuotone,
  PiWifiSlashDuotone,
  PiWrenchDuotone,
} from "react-icons/pi";
import { Float, Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/sections/Section";
import { IconCard } from "@/components/shared/IconCard";
import { serviceIcons } from "@/components/shared/icons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceIcon, servicePalette } from "@/components/shared/ServiceCard";
import { getServices, serviceIds, type ServiceId } from "@/data/services";
import { routes } from "@/data/site";
import { fill } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ service: string }> };

const smooth = "cubic-bezier(.22,1,.36,1)";

// One icon per benefit, in the same order as serviceDetails[id].benefits.
const benefitIcons: Record<ServiceId, React.ReactNode[]> = {
  ai: [<PiClockDuotone key="0" />, <PiLightningDuotone key="1" />, <PiArrowsClockwiseDuotone key="2" />, <PiTrendUpDuotone key="3" />],
  web: [<PiMagnifyingGlassDuotone key="0" />, <PiSealCheckDuotone key="1" />, <PiDevicesDuotone key="2" />, <PiClockDuotone key="3" />],
  mobile: [<PiHandTapDuotone key="0" />, <PiWifiSlashDuotone key="1" />, <PiStackDuotone key="2" />, <PiTrendUpDuotone key="3" />],
  support: [<PiTimerDuotone key="0" />, <PiChatsCircleDuotone key="1" />, <PiShieldCheckDuotone key="2" />, <PiWhatsappLogoDuotone key="3" />],
  backend: [<PiPulseDuotone key="0" />, <PiLockKeyDuotone key="1" />, <PiChartLineUpDuotone key="2" />, <PiPlugsConnectedDuotone key="3" />],
  design: [<PiCursorClickDuotone key="0" />, <PiSwatchesDuotone key="1" />, <PiRocketLaunchDuotone key="2" />, <PiEyeDuotone key="3" />],
  training: [<PiUsersThreeDuotone key="0" />, <PiWrenchDuotone key="1" />, <PiStairsDuotone key="2" />, <PiTargetDuotone key="3" />],
};

function isServiceId(value: string): value is ServiceId {
  return (serviceIds as string[]).includes(value);
}

// Build one page per service (the layout adds each language).
export function generateStaticParams() {
  return serviceIds.map((service) => ({ service }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  if (!isServiceId(service)) return {};
  const { t } = await getI18n();
  return pageMetadata({
    path: `${routes.services}/${service}`,
    title: t.services[service].title,
    description: t.services[service].short,
  });
}

// Service page: "/[lang]/services/[service]", e.g. /en/services/web
// The service name is read inside <Suspense>, so Next.js can show the page
// shell instantly on navigation while the service's content loads.
export default function ServiceDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<Box minH="100vh" aria-busy="true" />}>
      <ServiceDetail params={params} />
    </Suspense>
  );
}

async function ServiceDetail({ params }: Props) {
  const { service: id } = await params;
  if (!isServiceId(id)) notFound();

  const { t, href } = await getI18n();
  const service = t.services[id];
  const details = t.serviceDetails[id];
  const s = t.servicePage;
  const pal = servicePalette[id];
  const [from, to] = pal.icon;
  const accent = { _light: pal.text.light, _dark: pal.text.dark };
  const border = { _light: pal.border.light, _dark: pal.border.dark };
  const quoteHref = href(`${routes.contact}?interest=service:${id}`);
  const others = getServices(t).filter((o) => o.id !== id);

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
          <Grid templateColumns={{ base: "1fr", lg: "1.15fr 0.85fr" }} gap={{ base: "10", lg: "14" }} alignItems="center">
            <Stack gap="5">
              <NextLink href={href(routes.services)} style={{ width: "fit-content" }}>
                <HStack gap="1.5" fontSize="sm" color="fg.muted" _hover={{ color: "fg" }}>
                  <LuArrowLeft />
                  {s.back}
                </HStack>
              </NextLink>
              <HStack gap="4">
                <ServiceIcon id={id} />
                <Stack gap="0.5">
                  <Text fontSize="xs" fontWeight="bold" letterSpacing="0.14em" textTransform="uppercase" color={accent}>
                    {s.eyebrow}
                  </Text>
                  <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.05" letterSpacing="-0.025em">
                    {service.title}
                  </Heading>
                </Stack>
              </HStack>
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold" color={accent}>
                {service.short}
              </Text>
              <Text textStyle="lead" color="fg.muted" maxW="xl">
                {details.intro}
              </Text>
              <Stack direction={{ base: "column", sm: "row" }} gap="3" pt="1">
                <Button asChild size="lg" bgImage={`linear-gradient(135deg, ${from}, ${to})`} color="white" _hover={{ opacity: 0.92 }}>
                  <NextLink href={quoteHref}>
                    {s.quote}
                    <LuArrowRight />
                  </NextLink>
                </Button>
                <Button asChild size="lg" variant="outline" colorPalette="gray">
                  <a href="#offer">
                    {s.seeOffer}
                    <LuArrowDown />
                  </a>
                </Button>
              </Stack>
            </Stack>

            {/* Picture: service colours, big icon, the card's "included" list as chips */}
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
                borderColor={border}
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
                  {serviceIcons[id]}
                </Box>
                <Box position="absolute" inset="0" display="grid" placeItems="center">
                  <Float>
                    <Box transform={{ base: "scale(1.6)", md: "scale(2)" }}>
                      <ServiceIcon id={id} />
                    </Box>
                  </Float>
                </Box>
                {service.included.slice(0, 3).map((item, i) => {
                  const pos = [
                    { top: "9%", left: "6%" },
                    { top: "67%", right: "5%", display: { base: "none", md: "block" } },
                    { bottom: { base: "8%", md: "9%" }, left: { base: "auto", md: "8%" }, right: { base: "6%", md: "auto" } },
                  ][i];
                  return (
                    <Box key={item} position="absolute" maxW="75%" {...pos}>
                      <Float delay={0.6 + i * 0.7}>
                        <HStack gap="2" px="3" py="2" bg="bg.panel" borderRadius="full" borderWidth="1px" borderColor="border" boxShadow="lg">
                          <Box boxSize="6" flexShrink={0} borderRadius="full" display="grid" placeItems="center" color="white" fontSize="xs" bgImage={`linear-gradient(145deg, ${from}, ${to})`}>
                            <LuCheck />
                          </Box>
                          <Text fontSize="sm" fontWeight="semibold" lineClamp={1}>
                            {item}
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

      {/* ---------- Why you need it ---------- */}
      <Section aria-labelledby="why-title">
        <Box mb={{ base: "10", md: "12" }}>
          <SectionHeading id="why-title" eyebrow={s.whyEyebrow} title={s.whyTitle} />
        </Box>
        <SimpleGrid as="ol" listStyleType="none" columns={{ base: 1, md: 3 }} gap="5">
          {details.why.map((w, i) => (
            <Box as="li" key={w.title}>
              <Reveal delay={i * 0.08}>
                <Stack gap="3" h="full" p={{ base: "6", md: "7" }} bg="bg.panel" borderWidth="1px" borderColor="border" borderRadius="l4" position="relative" overflow="hidden">
                  <Box h="1" position="absolute" top="0" left="0" right="0" bgImage={`linear-gradient(90deg, ${from}, ${to})`} />
                  <Text fontSize="4xl" fontWeight="bold" lineHeight="1" color={accent} opacity={0.35} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </Text>
                  <Heading as="h3" size="lg" letterSpacing="-0.015em">
                    {w.title}
                  </Heading>
                  <Text color="fg.muted">{w.text}</Text>
                </Stack>
              </Reveal>
            </Box>
          ))}
        </SimpleGrid>
      </Section>

      {/* ---------- What we can do for you ---------- */}
      <Section id="offer" tone="subtle" aria-labelledby="offer-title" scrollMarginTop="20">
        <Box mb={{ base: "10", md: "12" }}>
          <SectionHeading id="offer-title" eyebrow={s.offerEyebrow} title={s.offerTitle} />
        </Box>
        <SimpleGrid as="ul" listStyleType="none" columns={{ base: 1, sm: 2, lg: 3 }} gap="5">
          {details.offer.map((o, i) => (
            <Box as="li" key={o.title}>
              <Reveal delay={(i % 3) * 0.08}>
                <HStack
                  align="flex-start"
                  gap="4"
                  h="full"
                  p="6"
                  bg="bg.panel"
                  borderWidth="1px"
                  borderColor="border"
                  borderRadius="l4"
                  css={{
                    transition: `transform .45s ${smooth}, box-shadow .45s ${smooth}, border-color .3s`,
                    "&:hover": { transform: "translateY(-4px)", boxShadow: `0 24px 44px -26px ${to}99`, borderColor: `${from}88` },
                    "@media (prefers-reduced-motion: reduce)": { transition: "none", "&:hover": { transform: "none" } },
                  }}
                >
                  <Box
                    boxSize="9"
                    flexShrink={0}
                    borderRadius="full"
                    display="grid"
                    placeItems="center"
                    color="white"
                    fontSize="md"
                    bgImage={`linear-gradient(145deg, ${from}, ${to})`}
                    boxShadow={`0 8px 16px -8px ${to}`}
                    aria-hidden="true"
                  >
                    <LuCheck />
                  </Box>
                  <Stack gap="1.5">
                    <Heading as="h3" size="md" letterSpacing="-0.01em">
                      {o.title}
                    </Heading>
                    <Text color="fg.muted" fontSize="sm">
                      {o.text}
                    </Text>
                  </Stack>
                </HStack>
              </Reveal>
            </Box>
          ))}
        </SimpleGrid>
      </Section>

      {/* ---------- Benefits ---------- */}
      <Section aria-labelledby="benefits-title">
        <Box mb={{ base: "10", md: "12" }}>
          <SectionHeading id="benefits-title" eyebrow={s.benefitsEyebrow} title={s.benefitsTitle} />
        </Box>
        <SimpleGrid as="ul" listStyleType="none" columns={{ base: 1, sm: 2, lg: 4 }} gap="5">
          {details.benefits.map((b, i) => (
            <Box as="li" key={b.title}>
              <Reveal delay={i * 0.08}>
                <IconCard icon={benefitIcons[id][i]} color={pal.icon} title={b.title} text={b.text} />
              </Reveal>
            </Box>
          ))}
        </SimpleGrid>
      </Section>

      {/* ---------- How we work (same steps as the Services page) ---------- */}
      <Section tone="subtle" aria-labelledby="process-title">
        <Box mb={{ base: "10", md: "12" }}>
          <SectionHeading id="process-title" eyebrow={t.servicesPage.howEyebrow} title={t.servicesPage.howTitle} />
        </Box>
        <SimpleGrid as="ol" listStyleType="none" columns={{ base: 1, sm: 2, lg: 4 }} gap="5">
          {t.servicesPage.process.map((step, i) => (
            <Box as="li" key={step.title}>
              <Reveal delay={i * 0.08}>
                <Stack gap="3" h="full" p="6" bg="bg.panel" borderWidth="1px" borderColor="border" borderRadius="l4">
                  <Box
                    boxSize="11"
                    borderRadius="full"
                    display="grid"
                    placeItems="center"
                    color="white"
                    fontWeight="bold"
                    bgImage={`linear-gradient(145deg, ${from}, ${to})`}
                    aria-hidden="true"
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

      {/* ---------- Other services ---------- */}
      <Section aria-labelledby="other-title">
        <Box mb={{ base: "8", md: "10" }}>
          <SectionHeading id="other-title" eyebrow={s.otherEyebrow} title={s.otherTitle} />
        </Box>
        <SimpleGrid as="ul" listStyleType="none" columns={{ base: 1, sm: 2, lg: 3 }} gap="4">
          {others.map((o) => (
            <li key={o.id}>
              <NextLink href={href(`${routes.services}/${o.id}`)}>
                <HStack
                  gap="4"
                  p="4"
                  h="full"
                  bg="bg.panel"
                  borderWidth="1px"
                  borderColor="border"
                  borderRadius="l3"
                  css={{
                    transition: "border-color .3s, transform .3s",
                    "&:hover": { borderColor: servicePalette[o.id].border.light, transform: "translateY(-2px)" },
                    "& .os-arrow": { transition: "transform .25s ease-out" },
                    "&:hover .os-arrow": { transform: "translateX(4px)" },
                    "@media (prefers-reduced-motion: reduce)": { "&, & *": { transition: "none" }, "&:hover, &:hover *": { transform: "none" } },
                  }}
                >
                  <Box transform="scale(0.75)" transformOrigin="left center" w="12" flexShrink={0}>
                    <ServiceIcon id={o.id} />
                  </Box>
                  <Text fontWeight="semibold" flex="1">
                    {o.title}
                  </Text>
                  <Box className="os-arrow" color="fg.muted">
                    <LuArrowRight />
                  </Box>
                </HStack>
              </NextLink>
            </li>
          ))}
        </SimpleGrid>
      </Section>

      <CTASection
        title={s.ctaTitle}
        subtitle={s.ctaSubtitle}
        whatsappLabel={t.common.contactUsWhatsApp}
        whatsappMessage={fill(s.whatsappMessage, { name: service.title })}
        secondary={{ href: `${routes.contact}?interest=service:${id}`, label: s.quote }}
      />
    </>
  );
}
