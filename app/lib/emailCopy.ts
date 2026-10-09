import "server-only";
import type { Locale } from "@/i18n/config";

// Text of the confirmation emails sent to visitors, in their language.
// Only our own text goes in them (no name or message typed by the visitor):
// they go to whatever address was entered, so they must be useless for
// sending spam through our domain. {topic} is one of our own topic names.

export const emailCopy: Record<
  Locale,
  {
    contactSubject: string;
    orderSubject: string;
    greeting: string;
    contactBody: string;
    orderBody: string;
    signoff: string;
    notifySubject: string;
    notifyBody: string;
    newsletterSubject: string;
    newsletterBody: string;
  }
> = {
  en: {
    contactSubject: "We've received your message",
    orderSubject: "We've received your Imara Pay order",
    greeting: "Hello,",
    contactBody:
      "Thank you for contacting Imara. We've received your message and our team will get back to you soon.",
    orderBody:
      "Thank you for your Imara Pay order. We'll reply with your quote in BIF and the payment details. Please don't send any money before you receive them.",
    signoff: "The Imara team",
    notifySubject: "You're on the list",
    notifyBody: "Thanks! We'll email you as soon as {topic} is ready.",
    newsletterSubject: "Welcome to Imara news",
    newsletterBody:
      "Thanks for subscribing. You'll hear from us a few times a year about product launches and news. No spam.",
  },
  fr: {
    contactSubject: "Nous avons bien reçu votre message",
    orderSubject: "Nous avons bien reçu votre commande Imara Pay",
    greeting: "Bonjour,",
    contactBody:
      "Merci d'avoir contacté Imara. Nous avons bien reçu votre message et notre équipe vous répondra rapidement.",
    orderBody:
      "Merci pour votre commande Imara Pay. Nous vous répondrons avec votre devis en BIF et les coordonnées de paiement. Merci de n'envoyer aucun argent avant de les avoir reçus.",
    signoff: "L'équipe Imara",
    notifySubject: "Vous êtes inscrit(e)",
    notifyBody: "Merci ! Nous vous écrirons dès que {topic} sera prêt.",
    newsletterSubject: "Bienvenue dans les nouvelles d'Imara",
    newsletterBody:
      "Merci de votre inscription. Vous recevrez nos nouvelles quelques fois par an : lancements de produits et actualités. Pas de spam.",
  },
};
