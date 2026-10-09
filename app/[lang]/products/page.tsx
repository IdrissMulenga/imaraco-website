import { Box, SimpleGrid } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { AfyaSpotlight } from "@/components/sections/AfyaSpotlight";
import { BandShowcase } from "@/components/sections/BandShowcase";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/sections/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getProducts } from "@/data/products";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ path: routes.products, title: t.meta.productsTitle, description: t.meta.productsDescription });
}

// Products page: "/[lang]/products"
export default async function ProductsPage() {
  const { t } = await getI18n();
  const otherProducts = getProducts(t).filter((p) => p.id !== "afya");
  return (
    <>
      <PageHeader
        eyebrow={t.productsPage.eyebrow}
        title={t.productsPage.title}
        subtitle={t.productsPage.subtitle}
      />

      {/* Imara Afya Band: coming soon (top), then the Imara Afya app */}
      <Section aria-labelledby="band-title" pt={{ base: "8", md: "10" }} pb={{ base: "0", md: "0" }}>
        <BandShowcase />
      </Section>
      <Section aria-labelledby="afya-title" pt={{ base: "5", md: "6" }}>
        <AfyaSpotlight showDisclaimer showBandNote={false} />
      </Section>

      <Section tone="subtle" aria-labelledby="more-title">
        <Box mb={{ base: "10", md: "12" }}>
          <SectionHeading
            id="more-title"
            eyebrow={t.productsPage.moreEyebrow}
            title={t.productsPage.moreTitle}
          />
        </Box>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="5">
          {otherProducts.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </SimpleGrid>
      </Section>

      <CTASection
        title={t.productsPage.ctaTitle}
        subtitle={t.productsPage.ctaSubtitle}
        whatsappLabel={t.common.contactUsWhatsApp}
        secondary={{ href: routes.services, label: t.productsPage.ctaSecondary }}
      />
    </>
  );
}
