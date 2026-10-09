import { Button, Flex, SimpleGrid, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getProducts } from "@/data/products";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { AfyaSpotlight } from "./AfyaSpotlight";
import { BandShowcase } from "./BandShowcase";
import { Section } from "./Section";

export async function ProductHighlights() {
  const { t, href } = await getI18n();
  const otherProducts = getProducts(t).filter((p) => p.id !== "afya");
  return (
    <Section aria-labelledby="products-title" pt={{ base: "10", md: "12" }}>
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "flex-end" }}
        direction={{ base: "column", md: "row" }}
        gap="6"
        mb={{ base: "10", md: "12" }}
      >
        <SectionHeading
          id="products-title"
          eyebrow={t.homeProducts.eyebrow}
          title={t.homeProducts.title}
          subtitle={t.homeProducts.subtitle}
        />
        <Button
          asChild
          variant="plain"
          px="0"
          color="brand.fg"
          _hover={{ textDecoration: "underline" }}
          flexShrink={0}
        >
          <NextLink href={href(routes.products)}>
            {t.homeProducts.viewAll}
            <LuArrowRight />
          </NextLink>
        </Button>
      </Flex>

      <Stack gap="5">
        {/* Imara Afya Band (coming soon), linked to the Imara Afya card below */}
        <BandShowcase headingAs="h3" />
        <AfyaSpotlight headingAs="h3" showBandNote={false} />
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="5">
          {otherProducts.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </SimpleGrid>
      </Stack>
    </Section>
  );
}
