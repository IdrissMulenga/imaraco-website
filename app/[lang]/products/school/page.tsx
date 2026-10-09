import type { Metadata } from "next";
import {
  PiCalendarDotsDuotone,
  PiClipboardTextDuotone,
  PiFileTextDuotone,
  PiReceiptDuotone,
  PiSquaresFourDuotone,
  PiUsersDuotone,
  PiWifiSlashDuotone,
} from "react-icons/pi";
import { ProductPage } from "@/components/shared/ProductPage";
import { getProducts } from "@/data/products";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

// One icon per feature, in the same order as school.features in the dictionary.
const icons = [
  <PiUsersDuotone key="0" />,
  <PiCalendarDotsDuotone key="1" />,
  <PiFileTextDuotone key="2" />,
  <PiReceiptDuotone key="3" />,
  <PiClipboardTextDuotone key="4" />,
  <PiSquaresFourDuotone key="5" />,
  <PiWifiSlashDuotone key="6" />,
];

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({
    path: "/products/school",
    title: t.products.school.name,
    description: t.meta.schoolDescription,
  });
}

// School Management System page: "/[lang]/products/school"
export default async function SchoolPage() {
  const { t } = await getI18n();
  const product = getProducts(t).find((p) => p.id === "school")!;
  return (
    <ProductPage
      product={product}
      intro={t.school.intro}
      primaryCta={{ label: t.school.cta, href: `${routes.contact}?interest=product:school` }}
      features={t.school.features.map((f, i) => ({ ...f, icon: icons[i] }))}
      steps={t.school.steps}
      faq={t.school.faq}
    />
  );
}
