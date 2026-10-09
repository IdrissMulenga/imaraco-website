import { Badge, Box, Button, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { PiGlobeHemisphereEastDuotone, PiHandCoinsDuotone, PiLightbulbFilamentDuotone, PiTruckDuotone } from "react-icons/pi";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/sections/Section";
import { IconCard } from "@/components/shared/IconCard";
import { NotifyForm } from "@/components/shared/NotifyForm";
import { PageHeader } from "@/components/shared/PageHeader";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ path: routes.labs, title: t.meta.labsTitle, description: t.meta.labsDescription });
}

// Icon + colour per project; the text is in the dictionary (labs.vikoba, …).
const projects: { key: "vikoba" | "logistics" | "remittance"; icon: React.ReactNode; color: [string, string] }[] = [
  { key: "vikoba", icon: <PiHandCoinsDuotone />, color: ["#34D399", "#047857"] },
  { key: "logistics", icon: <PiTruckDuotone />, color: ["#38BDF8", "#0369A1"] },
  { key: "remittance", icon: <PiGlobeHemisphereEastDuotone />, color: ["#A78BFA", "#6D28D9"] },
];

// Labs page: "/[lang]/labs"
export default async function LabsPage() {
  const { t, href } = await getI18n();
  return (
    <>
      <PageHeader
        eyebrow={t.labs.eyebrow}
        title={t.labs.title}
        subtitle={t.labs.subtitle}
      />
      <Section aria-label={t.labs.aria} pt={{ base: "8", md: "10" }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="5">
          {projects.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.08}>
              <IconCard
                as="h2"
                icon={p.icon}
                color={p.color}
                title={t.labs[p.key].name}
                text={t.labs[p.key].text}
                badge={
                  <Badge variant="subtle" colorPalette="gray">
                    {t.common.comingSoon}
                  </Badge>
                }
              >
                <Stack gap="2" pt="2" borderTopWidth="1px" borderColor="border.subtle">
                  <Text fontSize="sm" fontWeight="medium" color="fg.muted" pt="3">
                    {t.labs.notifyLabel}
                  </Text>
                  <NotifyForm topic={p.key} topicName={t.labs[p.key].name} />
                </Stack>
              </IconCard>
            </Reveal>
          ))}
        </SimpleGrid>

        {/* Idea / partnership prompt */}
        <Reveal delay={0.2}>
          <Flex
            mt="8"
            p={{ base: "6", md: "8" }}
            gap="5"
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            justify="space-between"
            borderRadius="l4"
            borderWidth="1px"
            borderStyle="dashed"
            borderColor="border.emphasized"
            bg="bg.subtle"
          >
            <Flex gap="4" align="center">
              <Box
                boxSize="12"
                borderRadius="28%"
                bgImage="linear-gradient(145deg, #F9A43A, #C2650B)"
                color="white"
                display="grid"
                placeItems="center"
                fontSize="2xl"
                flexShrink={0}
                aria-hidden="true"
              >
                <PiLightbulbFilamentDuotone />
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  {t.labs.ideaTitle}
                </Text>
                <Text color="fg.muted">{t.labs.ideaText}</Text>
              </Box>
            </Flex>
            <Button asChild flexShrink={0}>
              <NextLink href={href(routes.contact)}>
                {t.labs.ideaCta}
                <LuArrowRight />
              </NextLink>
            </Button>
          </Flex>
        </Reveal>
      </Section>
    </>
  );
}
