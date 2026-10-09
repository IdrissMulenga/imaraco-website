import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { PiCodeDuotone, PiMagnifyingGlassDuotone, PiPencilRulerDuotone, PiRocketLaunchDuotone } from "react-icons/pi";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/sections/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { getServices } from "@/data/services";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ path: routes.services, title: t.meta.servicesTitle, description: t.meta.servicesDescription });
}

// Icon + colour for each step; the text is in the dictionary (servicesPage.process).
const processStyle = [
  { icon: <PiMagnifyingGlassDuotone />, color: ["#38BDF8", "#0369A1"] },
  { icon: <PiPencilRulerDuotone />, color: ["#A78BFA", "#6D28D9"] },
  { icon: <PiCodeDuotone />, color: ["#34D399", "#047857"] },
  { icon: <PiRocketLaunchDuotone />, color: ["#F9A43A", "#C2650B"] },
];
const smooth = "cubic-bezier(.22,1,.36,1)";

// Services page: "/[lang]/services"
export default async function ServicesPage() {
  const { t } = await getI18n();
  const services = getServices(t);
  const process = t.servicesPage.process.map((p, i) => ({ ...p, ...processStyle[i] }));
  return (
    <>
      <PageHeader
        eyebrow={t.servicesPage.eyebrow}
        title={t.servicesPage.title}
        subtitle={t.servicesPage.subtitle}
      />

      <Section aria-label={t.servicesPage.gridAria}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="5">
          {services.map((service, i) => (
            // The featured (AI) card spans the full row.
            <Box key={service.id} gridColumn={service.featured ? "1 / -1" : undefined}>
              <Reveal delay={(i % 3) * 0.06}>
                <ServiceCard service={service} detailed />
              </Reveal>
            </Box>
          ))}
        </SimpleGrid>
      </Section>

      <Section tone="subtle" aria-labelledby="process-title">
        <Box mb={{ base: "10", md: "12" }}>
          <SectionHeading id="process-title" eyebrow={t.servicesPage.howEyebrow} title={t.servicesPage.howTitle} />
        </Box>
        <SimpleGrid as="ol" listStyleType="none" columns={{ base: 1, sm: 2, lg: 4 }} gap="5" position="relative">
          {/* Dashed line linking the steps (desktop) */}
          <Box
            aria-hidden="true"
            display={{ base: "none", lg: "block" }}
            position="absolute"
            top="12"
            left="10%"
            right="10%"
            borderTopWidth="2px"
            borderStyle="dashed"
            borderColor="border.emphasized"
          />
          {process.map((step, i) => (
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
                    "&:hover": { transform: "translateY(-5px)", boxShadow: `0 24px 44px -24px ${step.color[1]}99`, borderColor: `${step.color[0]}88` },
                    "& .hw-icon": { transition: `transform .55s cubic-bezier(.34,1.56,.64,1)` },
                    "&:hover .hw-icon": { transform: "rotate(-8deg) scale(1.08)" },
                    "@media (prefers-reduced-motion: reduce)": { "&, & *": { transition: "none !important" }, "&:hover, &:hover *": { transform: "none !important" } },
                  }}
                >
                  {/* Big faded step number */}
                  <Text
                    aria-hidden="true"
                    position="absolute"
                    top="-2"
                    right="3"
                    fontSize="7xl"
                    fontWeight="bold"
                    lineHeight="1"
                    color={{ _light: step.color[1], _dark: step.color[0] }}
                    opacity={0.1}
                  >
                    {i + 1}
                  </Text>
                  <Box
                    className="hw-icon"
                    boxSize="12"
                    borderRadius="28%"
                    bgImage={`linear-gradient(145deg, ${step.color[0]}, ${step.color[1]})`}
                    boxShadow={`0 10px 20px -10px ${step.color[1]}`}
                    color="white"
                    display="grid"
                    placeItems="center"
                    fontSize="2xl"
                    aria-hidden="true"
                  >
                    {step.icon}
                  </Box>
                  <Text fontSize="xs" fontWeight="bold" letterSpacing="0.12em" color={{ _light: step.color[1], _dark: step.color[0] }}>
                    {t.servicesPage.step.toUpperCase()} {i + 1}
                  </Text>
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

      <CTASection
        title={t.servicesPage.ctaTitle}
        subtitle={t.servicesPage.ctaSubtitle}
        whatsappLabel={t.common.contactUsWhatsApp}
        whatsappMessage={t.servicesPage.whatsappMessage}
        secondary={{ href: routes.contact, label: t.servicesPage.ctaSecondary }}
      />
    </>
  );
}
