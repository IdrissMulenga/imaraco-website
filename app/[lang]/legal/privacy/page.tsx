import type { Metadata } from "next";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument, type LegalContent } from "../LegalDocument";

const content: Record<Locale, LegalContent> = {
  en: {
    title: "Privacy Policy",
    description:
      "How Imara Company Limited collects, uses and protects personal data on its website and in the Imara Afya app.",
    intro: "How we collect, use and protect your information on this website and in our apps, including Imara Afya.",
    updated: "7 October 2026",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          `${site.name} ("Imara", "we", "us") is a technology company based in ${site.location.city}, ${site.location.country}. This policy applies to this website and to our apps, including Imara Afya. Contact: ${site.email}.`,
        ],
      },
      {
        heading: "Information we collect on this website",
        list: [
          "Information you send us through forms: name, email, phone/WhatsApp number, your area of interest and your message.",
          "Email addresses you give us to be notified about new products.",
          "Basic technical data needed to run the site securely (for example, IP address in server logs, used to prevent spam and abuse).",
          "If analytics are enabled, we use privacy-friendly, cookie-free analytics that count visits without identifying you.",
        ],
      },
      {
        heading: "Information in the Imara Afya app",
        paragraphs: [
          "Imara Afya helps you track your health habits. Depending on the features you use, the app may process: water intake, steps, sleep and sleep schedule, weight and height (to calculate BMI), daily mood and energy check-ins, menstrual cycle and period information, and blood pressure, blood sugar and pulse readings.",
          "This is sensitive health information. We only use it to provide the app's features to you. We do not sell it, and we do not use it for advertising.",
        ],
      },
      {
        heading: "How we use information",
        list: [
          "To reply to your messages, quotes, orders and pilot requests.",
          "To notify you about products you asked to hear about.",
          "To provide, maintain and improve our apps and services.",
          "To keep our services secure and prevent fraud and spam.",
          "To meet legal obligations.",
        ],
      },
      {
        heading: "Sharing",
        paragraphs: [
          "We do not sell your personal data. We share it only with service providers who help us run our services (for example, email delivery and hosting), under agreements that require them to protect it, or when the law requires us to.",
        ],
      },
      {
        heading: "Retention",
        paragraphs: [
          "We keep your information only as long as needed for the purposes above, or as required by law. You can ask us to delete it at any time.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          `You can ask to access, correct or delete your personal data, or withdraw consent, by emailing ${site.email}. In the Imara Afya app, you can also delete your data from within the app or by contacting us.`,
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "We use reasonable technical and organisational measures to protect your information. No system is completely secure, but we work to protect your data and will inform you of any breach as required by law.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "Our services are not directed at children under 13, and we do not knowingly collect their personal data. If you believe a child has given us data, please contact us and we will delete it.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "We may update this policy. We will change the date at the top and, for important changes, let you know through the website or app.",
        ],
      },
      { heading: "Contact", paragraphs: [`Questions about privacy? Email ${site.email}.`] },
    ],
  },
  fr: {
    title: "Politique de confidentialité",
    description:
      "Comment Imara Company Limited collecte, utilise et protège les données personnelles sur son site web et dans l'application Imara Afya.",
    intro:
      "Comment nous collectons, utilisons et protégeons vos informations sur ce site web et dans nos applications, dont Imara Afya.",
    updated: "7 octobre 2026",
    sections: [
      {
        heading: "Qui sommes-nous",
        paragraphs: [
          `${site.name} (« Imara », « nous ») est une entreprise technologique basée à ${site.location.city}, au ${site.location.country}. Cette politique s'applique à ce site web et à nos applications, dont Imara Afya. Contact : ${site.email}.`,
        ],
      },
      {
        heading: "Informations collectées sur ce site",
        list: [
          "Les informations que vous nous envoyez via les formulaires : nom, e-mail, numéro de téléphone/WhatsApp, votre domaine d'intérêt et votre message.",
          "Les adresses e-mail que vous nous donnez pour être informé(e) de nos nouveaux produits.",
          "Des données techniques de base nécessaires au fonctionnement sécurisé du site (par exemple l'adresse IP dans les journaux du serveur, utilisée pour prévenir le spam et les abus).",
          "Si des statistiques sont activées, nous utilisons un outil respectueux de la vie privée, sans cookies, qui compte les visites sans vous identifier.",
        ],
      },
      {
        heading: "Informations dans l'application Imara Afya",
        paragraphs: [
          "Imara Afya vous aide à suivre vos habitudes de santé. Selon les fonctionnalités utilisées, l'application peut traiter : l'hydratation, les pas, le sommeil et les horaires de sommeil, le poids et la taille (pour calculer l'IMC), les bilans quotidiens d'humeur et d'énergie, les informations sur le cycle menstruel et les règles, ainsi que les mesures de tension artérielle, de glycémie et de pouls.",
          "Ce sont des informations de santé sensibles. Nous les utilisons uniquement pour vous fournir les fonctionnalités de l'application. Nous ne les vendons pas et ne les utilisons pas à des fins publicitaires.",
        ],
      },
      {
        heading: "Utilisation des informations",
        list: [
          "Répondre à vos messages, demandes de devis, commandes et demandes de projet pilote.",
          "Vous informer des produits dont vous avez demandé à être averti(e).",
          "Fournir, maintenir et améliorer nos applications et services.",
          "Assurer la sécurité de nos services et prévenir la fraude et le spam.",
          "Respecter nos obligations légales.",
        ],
      },
      {
        heading: "Partage",
        paragraphs: [
          "Nous ne vendons pas vos données personnelles. Nous les partageons uniquement avec des prestataires qui nous aident à faire fonctionner nos services (par exemple l'envoi d'e-mails et l'hébergement), dans le cadre d'accords qui les obligent à les protéger, ou lorsque la loi l'exige.",
        ],
      },
      {
        heading: "Conservation",
        paragraphs: [
          "Nous conservons vos informations uniquement le temps nécessaire aux finalités ci-dessus, ou selon ce qu'exige la loi. Vous pouvez nous demander de les supprimer à tout moment.",
        ],
      },
      {
        heading: "Vos droits",
        paragraphs: [
          `Vous pouvez demander l'accès, la correction ou la suppression de vos données personnelles, ou retirer votre consentement, en écrivant à ${site.email}. Dans l'application Imara Afya, vous pouvez aussi supprimer vos données depuis l'application ou en nous contactant.`,
        ],
      },
      {
        heading: "Sécurité",
        paragraphs: [
          "Nous appliquons des mesures techniques et organisationnelles raisonnables pour protéger vos informations. Aucun système n'est totalement sûr, mais nous travaillons à protéger vos données et vous informerons de toute violation comme l'exige la loi.",
        ],
      },
      {
        heading: "Enfants",
        paragraphs: [
          "Nos services ne s'adressent pas aux enfants de moins de 13 ans, et nous ne collectons pas sciemment leurs données personnelles. Si vous pensez qu'un enfant nous a transmis des données, contactez-nous et nous les supprimerons.",
        ],
      },
      {
        heading: "Modifications",
        paragraphs: [
          "Nous pouvons mettre à jour cette politique. Nous modifierons la date en haut de la page et, pour les changements importants, vous en informerons via le site ou l'application.",
        ],
      },
      { heading: "Contact", paragraphs: [`Une question sur la confidentialité ? Écrivez à ${site.email}.`] },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const c = content[await getLang()];
  return pageMetadata({ path: "/legal/privacy", title: c.title, description: c.description });
}

// Privacy Policy: "/[lang]/legal/privacy"
// This URL is the one to give the Google Play Store for Imara Afya.
export default async function PrivacyPage() {
  const c = content[await getLang()];
  return <LegalDocument title={c.title} intro={c.intro} updated={c.updated} sections={c.sections} />;
}
