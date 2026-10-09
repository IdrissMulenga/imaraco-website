import type { Metadata } from "next";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument, type LegalContent } from "../LegalDocument";

const content: Record<Locale, LegalContent> = {
  en: {
    title: "Cookie notice",
    description: "How the Imara website uses cookies and similar storage.",
    intro: "We keep cookies to a minimum. Here's exactly what this website stores.",
    updated: "8 October 2026",
    sections: [
      {
        heading: "No advertising or tracking cookies",
        paragraphs: [
          "This website does not use advertising cookies or cross-site tracking. If analytics are enabled, we use a cookie-free analytics tool that counts visits without identifying you.",
        ],
      },
      {
        heading: "What we store",
        list: [
          "Your light/dark display preference, saved in your browser's local storage so the site remembers your choice. It never leaves your device.",
          "Your language choice (English or French), saved in a small cookie so the site opens in your language next time.",
        ],
      },
      {
        heading: "Third-party links",
        paragraphs: [
          "Links to WhatsApp, Instagram, Google Play and the App Store take you to those services, which have their own cookie policies.",
        ],
      },
      {
        heading: "Managing storage",
        paragraphs: [
          "You can clear cookies and local storage at any time in your browser settings. The site will still work; it will simply forget your preferences.",
        ],
      },
      { heading: "Contact", paragraphs: [`Questions? Email ${site.email}.`] },
    ],
  },
  fr: {
    title: "Avis sur les cookies",
    description: "Comment le site d'Imara utilise les cookies et le stockage similaire.",
    intro: "Nous limitons les cookies au strict minimum. Voici exactement ce que ce site enregistre.",
    updated: "8 octobre 2026",
    sections: [
      {
        heading: "Aucun cookie publicitaire ni de suivi",
        paragraphs: [
          "Ce site n'utilise ni cookies publicitaires ni suivi entre sites. Si des statistiques sont activées, nous utilisons un outil sans cookies qui compte les visites sans vous identifier.",
        ],
      },
      {
        heading: "Ce que nous enregistrons",
        list: [
          "Votre préférence d'affichage clair/sombre, enregistrée dans le stockage local de votre navigateur pour que le site s'en souvienne. Elle ne quitte jamais votre appareil.",
          "Votre choix de langue (anglais ou français), enregistré dans un petit cookie pour que le site s'ouvre dans votre langue la prochaine fois.",
        ],
      },
      {
        heading: "Liens vers des services tiers",
        paragraphs: [
          "Les liens vers WhatsApp, Instagram, Google Play et l'App Store vous mènent vers ces services, qui ont leurs propres politiques en matière de cookies.",
        ],
      },
      {
        heading: "Gérer le stockage",
        paragraphs: [
          "Vous pouvez effacer les cookies et le stockage local à tout moment dans les réglages de votre navigateur. Le site fonctionnera toujours ; il oubliera simplement vos préférences.",
        ],
      },
      { heading: "Contact", paragraphs: [`Une question ? Écrivez à ${site.email}.`] },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const c = content[await getLang()];
  return pageMetadata({ path: "/legal/cookies", title: c.title, description: c.description });
}

// Cookie notice: "/[lang]/legal/cookies"
export default async function CookiesPage() {
  const c = content[await getLang()];
  return <LegalDocument title={c.title} intro={c.intro} updated={c.updated} sections={c.sections} />;
}
