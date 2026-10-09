import { Alert, Box, Card, Grid, List, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  PiClockDuotone,
  PiDeviceMobileDuotone,
  PiReceiptDuotone,
  PiSealCheckDuotone,
  PiTelevisionSimpleDuotone,
  PiWalletDuotone,
} from "react-icons/pi";
import { ContactFormCard } from "@/components/sections/ContactSection";
import { Section } from "@/components/sections/Section";
import { ProductPage } from "@/components/shared/ProductPage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getProducts } from "@/data/products";
import { getI18n } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

// One icon per feature, in the same order as pay.features in the dictionary.
const icons = [
  <PiWalletDuotone key="0" />,
  <PiDeviceMobileDuotone key="1" />,
  <PiTelevisionSimpleDuotone key="2" />,
  <PiReceiptDuotone key="3" />,
  <PiSealCheckDuotone key="4" />,
  <PiClockDuotone key="5" />,
];

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ path: "/products/imara-pay", title: "Imara Pay", description: t.meta.payDescription });
}

// Imara Pay page: "/[lang]/products/imara-pay"
export default async function ImaraPayPage() {
  const { t } = await getI18n();
  const product = getProducts(t).find((p) => p.id === "pay")!;
  return (
    <ProductPage
      product={product}
      intro={t.pay.intro}
      primaryCta={{ label: t.pay.cta, href: "#order" }}
      features={t.pay.features.map((f, i) => ({ ...f, icon: icons[i] }))}
      steps={t.pay.steps}
      faq={t.pay.faq}
    >
      <Section id="pricing" aria-labelledby="pricing-title">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: "8", lg: "16" }} alignItems="start">
          <SectionHeading
            id="pricing-title"
            eyebrow={t.pay.pricingEyebrow}
            title={t.pay.pricingTitle}
            subtitle={t.pay.pricingSubtitle}
          />
          <Card.Root variant="soft">
            <Card.Body gap="4">
              <Text fontWeight="semibold">{t.pay.includesTitle}</Text>
              <List.Root gap="2" ps="5">
                {t.pay.includes.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List.Root>
              <Text color="fg.muted" fontSize="sm">
                {t.pay.pricingNote}
              </Text>
            </Card.Body>
          </Card.Root>
        </Grid>
      </Section>

      <Section id="order" tone="subtle" aria-labelledby="order-title" scrollMarginTop="20">
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: "8", lg: "16" }}>
          <Stack gap="6">
            <SectionHeading
              id="order-title"
              eyebrow={t.pay.orderEyebrow}
              title={t.pay.orderTitle}
              subtitle={t.pay.orderSubtitle}
            />
            <Alert.Root status="info" variant="subtle" borderRadius="l3">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Description fontSize="sm">{t.pay.orderWarning}</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          </Stack>
          <Box>
            <ContactFormCard
              title={t.contact.orderTitle}
              interest="product:pay"
              submitLabel={t.pay.orderSubmit}
              messagePlaceholder={t.pay.orderPlaceholder}
            />
          </Box>
        </Grid>
      </Section>
    </ProductPage>
  );
}
