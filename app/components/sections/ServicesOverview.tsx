import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { getServices } from "@/data/services";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { Section } from "./Section";

export async function ServicesOverview() {
  const { t, href } = await getI18n();
  const services = getServices(t);
  return (
    <Section tone="subtle" aria-labelledby="services-title">
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "flex-end" }}
        direction={{ base: "column", md: "row" }}
        gap="6"
        mb={{ base: "10", md: "12" }}
      >
        <SectionHeading
          id="services-title"
          eyebrow={t.homeServices.eyebrow}
          title={t.homeServices.title}
          subtitle={t.homeServices.subtitle}
        />
        <Button
          asChild
          variant="plain"
          px="0"
          color="brand.fg"
          _hover={{ textDecoration: "underline" }}
          flexShrink={0}
        >
          <NextLink href={href(routes.services)}>
            {t.homeServices.viewAll}
            <LuArrowRight />
          </NextLink>
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="5">
        {services.map((service, i) => (
          // The featured (AI) card spans the full row.
          <Box key={service.id} gridColumn={service.featured ? "1 / -1" : undefined}>
            <Reveal delay={i * 0.05}>
              <ServiceCard service={service} />
            </Reveal>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  );
}
