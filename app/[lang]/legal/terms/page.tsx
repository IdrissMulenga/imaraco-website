import type { Metadata } from "next";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument, type LegalContent } from "../LegalDocument";

const content: Record<Locale, LegalContent> = {
  en: {
    title: "Terms of Service",
    description: "The terms that apply when you use the Imara Company Limited website, apps and services.",
    intro: "The rules that apply when you use our website, apps and services.",
    updated: "7 October 2026",
    sections: [
      {
        heading: "Agreement",
        paragraphs: [
          `By using this website or any service from ${site.name} ("Imara"), you agree to these terms. If you don't agree, please don't use our services.`,
        ],
      },
      {
        heading: "Our services",
        paragraphs: [
          "We offer software products (such as Imara Afya, Duka POS, our School Management System and Imara Pay) and software services (such as web and mobile development, design and training). Specific products or projects may have additional terms or a separate agreement, which apply alongside these terms.",
        ],
      },
      {
        heading: "Using our services",
        list: [
          "Give accurate information when you contact us, order or sign up.",
          "Don't misuse our services, attempt to break their security, or use them for anything illegal.",
          "Keep any account details safe; you are responsible for activity under your account.",
        ],
      },
      {
        heading: "Imara Pay",
        paragraphs: [
          "Imara Pay is an independent service that pays third-party subscriptions on your behalf. We are not affiliated with those third parties, and their own terms apply to the subscriptions. We confirm the full price in BIF before you pay. Refunds, if any, depend on the circumstances and the third party's policy.",
        ],
      },
      {
        heading: "Health information (Imara Afya)",
        paragraphs: [
          "Imara Afya is a wellness tool, not a medical device. It does not provide medical advice, diagnosis or treatment. Cycle predictions are estimates and must not be used as contraception, and explanations of blood pressure, blood sugar and pulse readings are general information, not a diagnosis. Always consult a qualified health professional about medical concerns.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Our website, apps, brand and content belong to Imara or our licensors. Ownership of software we build for clients is set out in each project agreement.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "We work hard to keep our services reliable, but they are provided “as is”. To the extent allowed by law, Imara is not liable for indirect or consequential losses arising from your use of our services.",
        ],
      },
      { heading: "Changes", paragraphs: ["We may update these terms. The date at the top shows the latest version."] },
      {
        heading: "Governing law & contact",
        paragraphs: [`These terms are governed by the laws of ${site.location.country}. Questions? Email ${site.email}.`],
      },
    ],
  },
  fr: {
    title: "Conditions d'utilisation",
    description: "Les conditions applicables à l'utilisation du site, des applications et des services d'Imara Company Limited.",
    intro: "Les règles qui s'appliquent lorsque vous utilisez notre site web, nos applications et nos services.",
    updated: "7 octobre 2026",
    sections: [
      {
        heading: "Acceptation",
        paragraphs: [
          `En utilisant ce site web ou tout service de ${site.name} (« Imara »), vous acceptez ces conditions. Si vous ne les acceptez pas, merci de ne pas utiliser nos services.`,
        ],
      },
      {
        heading: "Nos services",
        paragraphs: [
          "Nous proposons des produits logiciels (comme Imara Afya, Duka POS, notre Système de gestion scolaire et Imara Pay) et des services logiciels (comme le développement web et mobile, le design et la formation). Certains produits ou projets peuvent faire l'objet de conditions supplémentaires ou d'un contrat distinct, qui s'appliquent en complément des présentes conditions.",
        ],
      },
      {
        heading: "Utilisation de nos services",
        list: [
          "Donnez des informations exactes lorsque vous nous contactez, passez commande ou vous inscrivez.",
          "N'utilisez pas nos services de manière abusive, ne tentez pas d'en contourner la sécurité et ne les utilisez pas à des fins illégales.",
          "Protégez vos identifiants ; vous êtes responsable de l'activité sur votre compte.",
        ],
      },
      {
        heading: "Imara Pay",
        paragraphs: [
          "Imara Pay est un service indépendant qui règle des abonnements de tiers en votre nom. Nous ne sommes pas affiliés à ces tiers, dont les propres conditions s'appliquent aux abonnements. Nous confirmons le prix total en BIF avant tout paiement. Les remboursements éventuels dépendent des circonstances et de la politique du tiers.",
        ],
      },
      {
        heading: "Informations de santé (Imara Afya)",
        paragraphs: [
          "Imara Afya est un outil de bien-être, pas un dispositif médical. Il ne fournit ni avis médical, ni diagnostic, ni traitement. Les prévisions du cycle sont des estimations et ne doivent pas servir de contraception, et les explications sur la tension artérielle, la glycémie et le pouls sont des informations générales, pas un diagnostic. Consultez toujours un professionnel de santé qualifié pour toute question médicale.",
        ],
      },
      {
        heading: "Propriété intellectuelle",
        paragraphs: [
          "Notre site web, nos applications, notre marque et nos contenus appartiennent à Imara ou à ses concédants. La propriété des logiciels que nous développons pour nos clients est définie dans chaque contrat de projet.",
        ],
      },
      {
        heading: "Limitation de responsabilité",
        paragraphs: [
          "Nous faisons tout pour que nos services soient fiables, mais ils sont fournis « en l'état ». Dans la mesure permise par la loi, Imara n'est pas responsable des pertes indirectes ou consécutives liées à l'utilisation de nos services.",
        ],
      },
      { heading: "Modifications", paragraphs: ["Nous pouvons mettre à jour ces conditions. La date en haut de la page indique la dernière version."] },
      {
        heading: "Droit applicable et contact",
        paragraphs: [`Ces conditions sont régies par le droit du ${site.location.country}. Une question ? Écrivez à ${site.email}.`],
      },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const c = content[await getLang()];
  return pageMetadata({ path: "/legal/terms", title: c.title, description: c.description });
}

// Terms of Service: "/[lang]/legal/terms"
export default async function TermsPage() {
  const c = content[await getLang()];
  return <LegalDocument title={c.title} intro={c.intro} updated={c.updated} sections={c.sections} />;
}
