import { Badge, Box, Grid, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  PiEyeDuotone,
  PiHandshakeDuotone,
  PiHeartDuotone,
  PiLightningDuotone,
  PiMapPinDuotone,
  PiShieldCheckDuotone,
  PiTargetDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/sections/Section";
import { IconCard } from "@/components/shared/IconCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ path: routes.about, title: t.meta.aboutTitle, description: t.meta.aboutDescription });
}

// Imara brand teal (from the official logo).
const TEAL = "#0C5856";

// Icon + colour per value; the text is in the dictionary (aboutPage.values).
const valueStyle: { icon: React.ReactNode; color: [string, string] }[] = [
  { icon: <PiShieldCheckDuotone />, color: ["#38BDF8", "#0369A1"] },
  { icon: <PiHeartDuotone />, color: ["#F472B6", "#BE185D"] },
  { icon: <PiEyeDuotone />, color: ["#A78BFA", "#6D28D9"] },
  { icon: <PiHandshakeDuotone />, color: ["#34D399", "#047857"] },
  { icon: <PiLightningDuotone />, color: ["#FBBF24", "#D97706"] },
  { icon: <PiMapPinDuotone />, color: ["#FB923C", "#C2410C"] },
];

// About page: "/[lang]/about"
export default async function AboutPage() {
  const { t } = await getI18n();
  const a = t.aboutPage;
  const values = a.values.map((v, i) => ({ ...v, ...valueStyle[i] }));
  return (
    <>
      <PageHeader
        eyebrow={a.eyebrow}
        title={a.title}
        subtitle={a.subtitle}
      />

      {/* Mission & vision */}
      <Section aria-label={a.missionAria} pt={{ base: "8", md: "10" }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
          <Reveal>
            <IconCard
              as="h2"
              icon={<PiTargetDuotone />}
              color={["#F7883F", "#B44C0D"]}
              title={a.missionTitle}
              text={a.missionText}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <IconCard
              as="h2"
              icon={<PiEyeDuotone />}
              color={["#13807D", TEAL]}
              title={a.visionTitle}
              text={a.visionText}
            />
          </Reveal>
        </SimpleGrid>
      </Section>

      {/* Story */}
      <Section tone="subtle" aria-labelledby="story-title">
        <Grid templateColumns={{ base: "1fr", md: "1.1fr 0.9fr" }} gap={{ base: "10", md: "16" }} alignItems="center">
          <Reveal>
            <Stack gap="5">
              <SectionHeading id="story-title" eyebrow={a.storyEyebrow} title={a.storyTitle} />
              {/* PLACEHOLDER: replace with the founder's own story. */}
              <Text color="fg.muted" textStyle="lead">
                {a.story1}
              </Text>
              <Text color="fg.muted">
                {a.story2}
              </Text>
            </Stack>
          </Reveal>
          <Reveal delay={0.1}>
            <Box
              position="relative"
              maxW="sm"
              mx="auto"
              w="full"
              aspectRatio="1"
              borderRadius="l4"
              overflow="hidden"
              bg={TEAL}
              boxShadow={`0 40px 70px -35px ${TEAL}`}
              css={{
                transition: "transform .6s cubic-bezier(.22,1,.36,1)",
                "&:hover": { transform: "rotate(-1.5deg) scale(1.02)" },
                "@media (prefers-reduced-motion: reduce)": { transition: "none", "&:hover": { transform: "none" } },
              }}
            >
              <Image
                src="/brand/imara-logo-full.webp"
                alt={t.aboutTeaser.logoAlt}
                fill
                sizes="(max-width: 768px) 80vw, 380px"
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Reveal>
        </Grid>
      </Section>

      {/* Values */}
      <Section aria-labelledby="values-title">
        <Box mb={{ base: "10", md: "12" }}>
          <SectionHeading id="values-title" eyebrow={a.valuesEyebrow} title={a.valuesTitle} />
        </Box>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="5">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 0.08}>
              <IconCard icon={v.icon} color={v.color} title={v.title} text={v.text} />
            </Reveal>
          ))}
        </SimpleGrid>
      </Section>

      {/* Founder & team */}
      <Section tone="subtle" aria-labelledby="team-title">
        <Box mb={{ base: "10", md: "12" }}>
          <SectionHeading id="team-title" eyebrow={a.teamEyebrow} title={a.teamTitle} />
        </Box>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="5">
          <Reveal>
            <Stack
              gap="4"
              h="full"
              p="7"
              bg="bg.panel"
              borderWidth="1px"
              borderColor="border"
              borderRadius="l4"
              position="relative"
              overflow="hidden"
            >
              <Box h="1" position="absolute" top="0" left="0" right="0" bgImage="linear-gradient(90deg, #F37421, #FFC24D)" />
              <Box
                boxSize="16"
                borderRadius="full"
                bgImage={`linear-gradient(145deg, #13807D, ${TEAL})`}
                color="white"
                fontWeight="bold"
                fontSize="xl"
                display="grid"
                placeItems="center"
                boxShadow={`0 12px 24px -12px ${TEAL}`}
                aria-hidden="true"
              >
                IM
              </Box>
              <div>
                <Heading as="h3" size="md">
                  Idriss Murenga
                </Heading>
                <Text color="brand.fg" fontWeight="medium">
                  {a.founderRole}
                </Text>
              </div>
              {/* PLACEHOLDER: founder bio. */}
              <Text color="fg.muted" fontSize="sm">
                {a.founderBio}
              </Text>
            </Stack>
          </Reveal>
          {/* PLACEHOLDER: add team members here once they agree to be listed. */}
          <Reveal delay={0.08}>
            <Stack
              gap="3"
              h="full"
              p="7"
              justify="center"
              borderWidth="1px"
              borderStyle="dashed"
              borderColor="border.emphasized"
              borderRadius="l4"
            >
              <Box color="fg.muted" fontSize="3xl" aria-hidden="true">
                <PiUsersThreeDuotone />
              </Box>
              <Badge variant="subtle" alignSelf="flex-start">
                {a.growing}
              </Badge>
              <Text color="fg.muted" fontSize="sm">
                {a.growingText}
              </Text>
            </Stack>
          </Reveal>
        </SimpleGrid>
      </Section>

      <CTASection
        title={a.ctaTitle}
        subtitle={a.ctaSubtitle}
        whatsappLabel={t.common.contactUsWhatsApp}
        secondary={{ href: routes.contact, label: t.common.contactUs }}
      />
    </>
  );
}
