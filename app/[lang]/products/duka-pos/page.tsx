import type { Metadata } from "next";
import {
  PiBuildingsDuotone,
  PiChartBarDuotone,
  PiPackageDuotone,
  PiReceiptDuotone,
  PiUserGearDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import { ProductPage } from "@/components/shared/ProductPage";
import { getProducts } from "@/data/products";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

// One icon per feature, in the same order as duka.features in the dictionary.
const icons = [
  <PiReceiptDuotone key="0" />,
  <PiPackageDuotone key="1" />,
  <PiBuildingsDuotone key="2" />,
  <PiUsersDuotone key="3" />,
  <PiChartBarDuotone key="4" />,
  <PiUserGearDuotone key="5" />,
];

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ path: "/products/duka-pos", title: "Duka POS", description: t.meta.dukaDescription });
}

// Duka POS page: "/[lang]/products/duka-pos"
export default async function DukaPosPage() {
  const { t } = await getI18n();
  const product = getProducts(t).find((p) => p.id === "duka")!;
  return (
    <ProductPage
      product={product}
      intro={t.duka.intro}
      primaryCta={{ label: t.duka.cta, href: `${routes.contact}?interest=product:duka` }}
      features={t.duka.features.map((f, i) => ({ ...f, icon: icons[i] }))}
      steps={t.duka.steps}
      faq={t.duka.faq}
    />
  );
}
