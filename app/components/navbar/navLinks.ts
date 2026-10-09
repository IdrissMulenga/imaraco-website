import { LuBoxes, LuFlaskConical, LuHouse, LuInfo, LuMessageCircle, LuWrench } from "react-icons/lu";
import { routes } from "@/data/site";
import type { ClientDictionary } from "@/i18n/dictionaries/en";

type NavKey = keyof ClientDictionary["nav"];

// The links shown in the navbar, in order. Used by both the desktop
// bar and the mobile menu: edit here to add, remove or reorder links.
// `label` is a key of `nav` in the dictionaries; `icon` shows in the mobile menu.
export const navLinks: { label: NavKey; href: string; icon: typeof LuHouse }[] = [
  // "Home" for visitors who don't know the logo also goes home.
  { label: "home", href: routes.home, icon: LuHouse },
  { label: "products", href: routes.products, icon: LuBoxes },
  { label: "services", href: routes.services, icon: LuWrench },
  { label: "labs", href: routes.labs, icon: LuFlaskConical },
  { label: "about", href: routes.about, icon: LuInfo },
  { label: "contact", href: routes.contact, icon: LuMessageCircle },
];

// The call-to-action button on the right.
export const navCta = { label: "workWithUs" as NavKey, href: routes.contact };

/**
 * True when `href` (without language) is the current page or a page inside
 * it. `pathname` is the full address, e.g. "/fr/products/school".
 */
export function isActiveLink(pathname: string, href: string) {
  const path = pathname.replace(/^\/(en|fr)(?=\/|$)/, "") || "/";
  if (href === "/") return path === "/"; // Home is only active on the home page
  return path === href || path.startsWith(`${href}/`);
}
