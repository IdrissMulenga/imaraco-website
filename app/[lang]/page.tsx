import type { Metadata } from "next";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ContactSection } from "@/components/sections/ContactSection";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyImara } from "@/components/sections/WhyImara";
import { getI18n } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return {
    ...(await pageMetadata({ path: "/", title: t.meta.homeTitle, description: t.meta.homeDescription })),
    title: { absolute: t.meta.homeTitle },
  };
}

// Home page: "/en" or "/fr"
export default async function HomePage() {
  const { t } = await getI18n();
  return (
    <>
      <Hero />
      <ProductHighlights />
      <ServicesOverview />
      <WhyImara />
      <TrustBar />
      <AboutTeaser />
      <CTASection
        title={t.cta.title}
        subtitle={t.cta.subtitle}
        whatsappLabel={t.common.contactUsWhatsApp}
        secondary={{ href: "#contact", label: t.cta.form }}
        steps={t.cta.steps}
      />
      <ContactSection />
    </>
  );
}
