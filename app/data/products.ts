import type { Dictionary } from "@/i18n/dictionaries/en";

// Our products. Names, links and order live here; the text (taglines,
// descriptions…) is in the dictionaries (i18n/dictionaries/en.ts and fr.ts).

export type ProductId = "afya" | "duka" | "school" | "pay";

export type Product = {
  id: ProductId;
  name: string;
  category: string;
  tagline: string;
  short: string;
  meta: string;
  /** Page on this site. Imara Afya has none: it's featured on its own. */
  href?: string;
  /** Shown as a highlighted badge on the card. */
  status?: string;
};

const base: { id: ProductId; name: string; href?: string; soon?: boolean }[] = [
  { id: "afya", name: "Imara Afya", soon: true },
  { id: "duka", name: "Duka POS", href: "/products/duka-pos" },
  { id: "school", name: "School Management System", href: "/products/school" },
  { id: "pay", name: "Imara Pay", href: "/products/imara-pay" },
];

/** The products with their text in the current language. */
export function getProducts(t: Dictionary): Product[] {
  return base.map((p) => {
    const text: Dictionary["products"][ProductId] & { name?: string } = t.products[p.id];
    return {
      id: p.id,
      name: text.name ?? p.name,
      href: p.href,
      status: p.soon ? t.common.comingSoon : undefined,
      category: text.category,
      tagline: text.tagline,
      short: text.short,
      meta: text.meta,
    };
  });
}

export const productIds = base.map((p) => p.id);
