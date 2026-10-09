import { Grid, Stack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { ContactDetails, ContactFormCard } from "@/components/sections/ContactSection";
import { Section } from "@/components/sections/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ path: routes.contact, title: t.meta.contactTitle, description: t.meta.contactDescription });
}

// Contact page: "/[lang]/contact"
export default async function ContactPage() {
  const { t } = await getI18n();
  return (
    <>
      <PageHeader
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        subtitle={t.contactPage.subtitle}
      />

      <Section aria-label={t.contactPage.aria} pt={{ base: "8", md: "10" }}>
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: "10", lg: "16" }}>
          <Stack gap="8" order={{ base: 2, lg: 1 }}>
            <ContactDetails />
          </Stack>
          <Stack order={{ base: 1, lg: 2 }} id="message" scrollMarginTop="24">
            <ContactFormCard />
          </Stack>
        </Grid>
      </Section>
    </>
  );
}
