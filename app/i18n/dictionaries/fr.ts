import type { Dictionary } from "./en";

// Texte français du site. Même structure que en.ts : si vous ajoutez ou
// modifiez une ligne là-bas, faites de même ici.

export const fr: Dictionary = {
  common: {
    tagline: "La technologie, faite pour durer.",
    learnMore: "En savoir plus",
    comingSoon: "Bientôt disponible",
    new: "Nouveau",
    contactUsWhatsApp: "Nous contacter sur WhatsApp",
    whatsapp: "WhatsApp",
    contactUs: "Nous contacter",
    allProducts: "Tous les produits",
    seeFeatures: "Voir les fonctionnalités",
    ourFirstProduct: "Notre premier produit",
    skipToContent: "Aller au contenu",
    homeAria: "Imara, accueil",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    switchToLight: "Passer en mode clair",
    switchToDark: "Passer en mode sombre",
    language: "Langue",
    backToTop: "Retour en haut",
  },

  nav: {
    home: "Accueil",
    products: "Produits",
    services: "Services",
    labs: "Labs",
    about: "À propos",
    contact: "Contact",
    blog: "Actualités",
    workWithUs: "Travailler avec nous",
    mainAria: "Principal",
    mobileAria: "Mobile",
  },

  meta: {
    siteTitle: "Imara Company : la technologie, faite pour durer",
    siteDescription:
      "Imara Company Limited conçoit des produits logiciels et propose des services : sites web, applications web et mobiles, solutions d'IA et assistance informatique.",
    homeTitle: "Imara Company : On le crée. On le fait tourner. On le répare.",
    homeDescription:
      "Imara Company crée des sites web, des applications web et mobiles pour les entreprises, développe ses propres produits logiciels et offre une assistance informatique accueillante pour ordinateurs et téléphones.",
    productsTitle: "Produits",
    productsDescription:
      "Imara Afya, Duka POS, Système de gestion scolaire et Imara Pay : des produits logiciels pensés pour les conditions réelles.",
    servicesTitle: "Services",
    servicesDescription:
      "Solutions d'IA et automatisation, sites web, applications web et mobiles, assistance informatique, backend/API et DevOps, design UI/UX et graphique, et formations.",
    labsTitle: "Labs : bientôt disponible",
    labsDescription:
      "Ce qu'Imara prépare : une application pour groupes d'épargne (Vikoba/Rikirimba), le suivi logistique et les transferts de la diaspora.",
    aboutTitle: "À propos",
    aboutDescription:
      "Imara signifie « fort » en swahili. Nous sommes une entreprise technologique qui conçoit des produits et services logiciels pour les particuliers et les entreprises, partout.",
    contactTitle: "Contact",
    contactDescription:
      "Contactez Imara par formulaire, e-mail ou WhatsApp. Posez vos questions sur nos produits, demandez un devis ou un projet pilote.",
    blogTitle: "Actualités",
    blogDescription: "Actualités et nouvelles d'Imara Company Limited.",
    dukaDescription:
      "Duka POS est une caisse multi-entreprises pour les commerces de toute taille : succursales, stock, ventes, clients et fidélité, rapports et rôles du personnel.",
    schoolDescription:
      "Gestion scolaire pour les écoles privées : élèves, classes, emplois du temps, notes, bulletins, frais, présences. Fonctionne hors ligne.",
    payDescription:
      "Payez vos abonnements internationaux comme Netflix, ChatGPT et Claude en francs burundais (BIF) avec Lumicash ou EcoCash.",
  },

  hero: {
    eyebrow: "Logiciels · Applications · Assistance",
    build: "On le crée.",
    run: "On le fait tourner.",
    fix: "On le répare.",
    text: "Imara, c'est une seule équipe pour tout ce qui touche au logiciel. Nous créons des sites web, des applications web et mobiles pour les entreprises, développons nos propres produits, et assurons le bon fonctionnement de vos ordinateurs et téléphones grâce à une assistance accueillante.",
    ctaPrimary: "Découvrir nos produits",
    ctaSecondary: "Travailler avec nous",
    watchAlt: "Le bracelet Imara Afya, un bracelet connecté affichant 2 031 pas sur 8 500, bientôt disponible.",
    chipSteps: "2 031 pas",
    chipStepsText: "sur 8 500 aujourd'hui",
    chipSync: "Synchronisé avec l'appli",
    chipBand: "Bracelet Imara Afya",
  },

  heroArt: {
    label:
      "On le crée, on le fait tourner, on le répare : un ordinateur portable affichant le site Imara et son code, l'application Imara Afya sur un téléphone, et une discussion avec l'assistance où un problème d'ordinateur est résolu.",
    miniText: "Une seule équipe pour les sites web, les applications, nos propres produits et l'assistance.",
    websites: "Sites et applis web",
    mobileApps: "Applis mobiles",
    helpDesk: "Assistance",
    deskName: "Assistance Imara",
    deskStatus: "À votre service",
    resolved: "Résolu",
    userMsg: "Mon ordinateur se bloque sans arrêt et refuse de se mettre à jour.",
    replyMsg: "C'est réglé ! Mises à jour installées, il est de nouveau rapide.",
  },

  homeProducts: {
    eyebrow: "Nos produits",
    title: "Les produits que nous créons et exploitons",
    subtitle: "Des outils ciblés pour la santé, le commerce, l'éducation et les paiements.",
    viewAll: "Voir tous les produits",
  },

  homeServices: {
    eyebrow: "Services",
    title: "Nous développons aussi pour vous",
    subtitle: "L'équipe derrière nos produits peut concevoir, développer et maintenir les vôtres.",
    viewAll: "Voir tous les services",
  },

  why: {
    eyebrow: "Pourquoi Imara",
    title: "Conçu pour l'Afrique telle qu'elle fonctionne",
    subtitle:
      "La plupart des logiciels sont pensés pour des réseaux rapides, des cartes bancaires et une seule langue. Pas les nôtres.",
    offline: {
      title: "Hors ligne d'abord",
      text: "Nos applications continuent de fonctionner quand le réseau coupe, et tout se synchronise dès le retour de la connexion.",
    },
    payments: {
      title: "Paiements locaux",
      text: "Le mobile money comme Lumicash et EcoCash, avec des prix en BIF : comme les gens paient vraiment.",
    },
    languages: {
      title: "Multilingue",
      text: "Anglais, français, swahili et kirundi dès le premier jour, pas ajoutés après coup.",
    },
    light: {
      title: "Léger et rapide",
      text: "Des téléchargements légers et des pages sobres qui respectent les forfaits data et les téléphones plus anciens, pour une expérience fluide pour tous.",
    },
    privacy: {
      title: "Confidentialité dès la conception",
      text: "Nous ne collectons que le nécessaire, le protégeons avec soin et expliquons simplement comment il est utilisé.",
    },
    support: {
      title: "Une équipe proche de vous",
      text: "Une vraie équipe joignable sur WhatsApp, dans votre langue.",
    },
  },

  trust: {
    label: "Ce sur quoi vous pouvez compter",
    local: "Conçu au Burundi, pour le monde",
    ai: "Solutions propulsées par l'IA",
    platforms: "Android, iOS et web",
    offline: "Hors ligne par défaut",
    mobileMoney: "Compatible mobile money",
    bilingual: "Assistance en anglais et en français",
    helpdesk: "Assistance sur WhatsApp",
    noTrackers: "Aucun traceur publicitaire",
  },

  aboutTeaser: {
    eyebrow: "À propos d'Imara",
    title: "Des logiciels solides, créés par des gens qui s'en soucient.",
    text: "Nous créons les logiciels que nous voulons utiliser nous-mêmes : des outils qui tiennent dans les conditions réelles, comme les réseaux lents, les téléphones partagés, le mobile money et plusieurs langues dans une même conversation. Nous exploitons nos propres produits et aidons les entreprises, les écoles et les organisations à créer les leurs.",
    means: "= « fort » en swahili",
    logoAlt: "Logo Imara Co",
    values: [
      { title: "Fait pour durer", text: "Des logiciels fiables qui continuent de fonctionner." },
      { title: "Les gens d'abord", text: "Pensés pour de vrais utilisateurs et de vrais téléphones." },
      { title: "Rester simple", text: "La solution la plus simple qui résout le problème." },
    ],
    cta: "Lire notre histoire",
  },

  cta: {
    title: "Vous avez un projet ?",
    subtitle:
      "Dites-nous ce que vous construisez ou quel produit vous intéresse. Nous reviendrons vers vous avec les prochaines étapes.",
    form: "Envoyer un message",
    steps: [
      { title: "Partagez votre idée", text: "Expliquez votre besoin sur WhatsApp ou via le formulaire." },
      { title: "Nous la planifions ensemble", text: "Nous répondons avec nos questions, les étapes et un devis." },
      { title: "Nous la créons et la suivons", text: "Nous livrons, formons votre équipe et restons disponibles." },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Parlons-en",
    subtitle: "Vous préférez WhatsApp ou l'e-mail ? Les deux nous conviennent. Utilisez le formulaire ou contactez-nous directement.",
    whatsappValue: "Écrire à notre équipe",
    email: "E-mail",
    instagram: "Instagram",
    location: "Adresse",
    locationValue: "Bujumbura, Burundi",
    formTitle: "Envoyez-nous un message",
    formNote: "Les champs marqués d'un * sont obligatoires.",
    orderTitle: "Votre commande",
  },

  contactPage: {
    subtitle:
      "Une question sur un produit, un devis pour un projet ou un projet pilote pour votre école ? Envoyez-nous un message et notre équipe vous répondra.",
    aria: "Formulaire et coordonnées",
  },

  afya: {
    badgeAvailable: "Disponible sur Android · iOS",
    badgeSoon: "Bientôt · Android et iOS",
    text: "Votre compagnon santé au quotidien. Prenez de bonnes habitudes grâce à un suivi quotidien simple, en anglais, français, swahili et kirundi.",
    features: [
      "Hydratation",
      "Pas",
      "Sommeil et horaires de sommeil",
      "Poids et IMC",
      "Bilan quotidien d'humeur et d'énergie",
      "Suivi du cycle avec prévision des règles",
      "Tension, glycémie et pouls",
      "Bilans hebdomadaires",
      "Succès et séries",
      "Mode clair et sombre",
    ],
    bandTitle: "Bientôt : le bracelet Imara Afya.",
    bandText: "Un bracelet connecté avec écran, relié à l'application, pour suivre votre journée directement au poignet.",
    notifyPrompt: "Soyez parmi les premiers informés du lancement :",
    disclaimerTitle: "Pas un avis médical",
    disclaimer:
      "Imara Afya est un outil de bien-être et ne diagnostique, ne traite ni ne prévient aucune maladie. Les prévisions du cycle sont des estimations et ne doivent pas servir de contraception, et les mesures de tension, de glycémie et de pouls sont destinées à votre propre suivi. Parlez à un professionnel de santé pour toute question médicale. Vos données restent privées : consultez notre",
    privacyLink: "Politique de confidentialité",
    logoAlt: "Logo Imara Afya",
    screensAlt:
      "Écrans réels de l'application Imara Afya : l'accueil sur un iPhone en mode clair et sur un téléphone Android en mode sombre.",
  },

  products: {
    afya: {
      category: "Santé",
      tagline: "Votre compagnon santé au quotidien",
      short: "Suivez l'hydratation, les pas, le sommeil, l'humeur, votre cycle et vos constantes, en anglais, français, swahili et kirundi.",
      meta: "Android · iOS",
    },
    duka: {
      category: "Commerce",
      tagline: "La caisse de tous les commerces",
      short: "Ventes, stock, succursales, personnel et fidélité au même endroit, du petit kiosque à la chaîne de magasins.",
      meta: "Multi-succursales · Multi-entreprises",
    },
    school: {
      name: "Système de gestion scolaire",
      category: "Éducation",
      tagline: "Gérez votre école, même hors ligne",
      short: "Élèves, emplois du temps, notes, bulletins, frais et présences pour les écoles privées.",
      meta: "Web · Fonctionne hors ligne",
    },
    pay: {
      category: "Paiements",
      tagline: "Vos abonnements internationaux, payés en BIF",
      short: "Utilisez Lumicash ou EcoCash pour payer des services comme Netflix, ChatGPT et Claude.",
      meta: "Lumicash · EcoCash",
    },
  },

  band: {
    eyebrow: "Bientôt disponible",
    title: "Bracelet Imara Afya",
    text: "Notre premier objet connecté : un bracelet intelligent avec écran qui fonctionne avec l'application Imara Afya, pour suivre votre journée directement au poignet.",
    points: ["Vos pas directement au poignet", "Synchronisé avec l'application Imara Afya", "Pensé pour être porté au quotidien"],
    notify: "Soyez parmi les premiers informés du lancement :",
    partOf: "Fait partie d'Imara Afya",
    connector: "Fonctionne avec l'application Imara Afya",
    withApp: "Se connecte au Bracelet Imara Afya",
  },

  productsPage: {
    eyebrow: "Produits",
    title: "Les logiciels que nous créons et exploitons",
    subtitle:
      "Des produits ciblés pour la santé, le commerce, l'éducation et les paiements, pensés pour les réseaux, les appareils et les langues du quotidien.",
    moreEyebrow: "Autres produits",
    moreTitle: "Pour les entreprises, les écoles et les paiements du quotidien",
    ctaTitle: "Besoin d'une solution sur mesure ?",
    ctaSubtitle: "Notre équipe développe aussi des applications web et mobiles pour les entreprises et les organisations.",
    ctaSecondary: "Voir nos services",
  },

  productPage: {
    featuresEyebrow: "Fonctionnalités",
    featuresTitle: "Ce que vous obtenez",
    howEyebrow: "Comment ça marche",
    howTitle: "Simple dès le premier jour",
    faqEyebrow: "FAQ",
    faqTitle: "Questions et réponses",
    ctaTitle: "{name} vous intéresse ?",
    ctaSubtitle: "Parlez-nous de vos besoins et nous reviendrons vers vous avec les prochaines étapes. Contactez-nous pour les tarifs.",
    whatsappMessage: "Bonjour Imara, je suis intéressé(e) par {name}.",
  },

  duka: {
    intro:
      "Une caisse pour les commerces de toute taille, du petit kiosque à la chaîne de magasins. Vendez plus vite, connaissez votre stock et suivez chaque succursale.",
    cta: "Demander une démo",
    features: [
      { title: "Ventes rapides", text: "Encaissez rapidement au comptoir et gardez une trace de chaque transaction." },
      { title: "Stock", text: "Sachez ce qui est en stock dans chaque succursale et ce qu'il faut réapprovisionner." },
      { title: "Plusieurs succursales", text: "Gérez plusieurs boutiques depuis un seul compte, chacune avec son stock et ses ventes." },
      { title: "Clients et fidélité", text: "Tenez une liste de clients et récompensez vos clients fidèles." },
      { title: "Rapports", text: "Consultez les ventes et les meilleurs produits par succursale et par période." },
      { title: "Rôles du personnel", text: "Donnez aux caissiers, gérants et propriétaires le bon niveau d'accès." },
    ],
    steps: [
      { title: "Configurez votre boutique", text: "Ajoutez vos succursales, produits et personnel. Nous vous aidons à démarrer." },
      { title: "Commencez à vendre", text: "Votre équipe vend au comptoir pendant que le stock se met à jour automatiquement." },
      { title: "Suivez et grandissez", text: "Consultez les rapports à tout moment pour voir ce qui se vend et où." },
    ],
    faq: [
      {
        question: "Duka POS convient-il aux petites boutiques ou aux grands magasins ?",
        answer: "Aux deux. Il fonctionne pour une seule boutique et s'adapte à plusieurs succursales d'une même entreprise.",
      },
      {
        question: "Combien ça coûte ?",
        answer: "Contactez-nous pour les tarifs. Nous vous recommanderons une offre selon la taille et les besoins de votre commerce.",
      },
      {
        question: "Pouvez-vous nous aider à démarrer ?",
        answer: "Oui. Nous vous aidons à la configuration, à l'import de vos produits et à la formation de votre personnel.",
      },
    ],
  },

  school: {
    intro:
      "Tout ce dont une école privée a besoin au quotidien : élèves, classes, notes, bulletins, frais et présences. Le système fonctionne même quand internet ne fonctionne pas.",
    cta: "Demander un projet pilote",
    features: [
      { title: "Élèves et classes", text: "Inscrivez les élèves, organisez les classes et gardez tous les dossiers au même endroit." },
      { title: "Emplois du temps", text: "Créez et partagez les emplois du temps des classes." },
      { title: "Notes et bulletins", text: "Saisissez les notes et générez les bulletins scolaires en PDF en un clic." },
      { title: "Frais et reçus", text: "Enregistrez les paiements, émettez des reçus et voyez qui doit encore quoi." },
      { title: "Présences", text: "Faites l'appel chaque jour et repérez les absences tôt." },
      { title: "Tableau de bord", text: "Voyez les inscriptions, les frais encaissés et les présences en un coup d'œil." },
      { title: "Fonctionne hors ligne", text: "Continuez à travailler pendant les coupures ; les données se synchronisent au retour de la connexion." },
    ],
    steps: [
      { title: "Demandez un projet pilote", text: "Parlez-nous de votre école : taille, classes et besoins prioritaires." },
      { title: "Nous vous installons", text: "Nous configurons vos classes et matières, et formons votre personnel." },
      { title: "Lancez votre trimestre", text: "Utilisez-le pendant un trimestre, donnez votre avis, et nous l'améliorons ensemble." },
    ],
    faq: [
      {
        question: "Fonctionne-t-il sans internet ?",
        answer: "Oui. Le système est conçu pour fonctionner hors ligne et se synchroniser au retour de la connexion.",
      },
      {
        question: "Peut-il générer nos bulletins ?",
        answer: "Oui. Il génère les bulletins scolaires en PDF à partir des notes saisies par vos enseignants.",
      },
      {
        question: "Qu'est-ce qu'un projet pilote ?",
        answer: "Un essai avec votre école sur une période convenue, pour voir si le système vous convient avant de vous engager.",
      },
      {
        question: "Combien ça coûte ?",
        answer: "Contactez-nous pour les tarifs. Cela dépend de la taille de votre école et des fonctionnalités dont vous avez besoin.",
      },
    ],
  },

  pay: {
    intro:
      "De nombreux services internationaux n'acceptent que les cartes internationales. Avec Imara Pay, vous payez en francs burundais (BIF) avec Lumicash ou EcoCash, et nous réglons l'abonnement pour vous.",
    cta: "Passer une commande",
    features: [
      { title: "Payez en BIF", text: "Pas besoin de carte internationale. Payez en monnaie locale avec le mobile money." },
      { title: "Lumicash et EcoCash", text: "Utilisez le compte mobile money que vous avez déjà." },
      { title: "Services populaires", text: "Des abonnements comme Netflix, ChatGPT et Claude. Demandez-nous pour d'autres." },
      { title: "Prix clair à l'avance", text: "Vous voyez le montant total en BIF, frais compris, avant de payer." },
      { title: "Confirmation", text: "Nous confirmons dès que votre abonnement est actif." },
      { title: "Assistance humaine", text: "Une question ? Contactez-nous sur WhatsApp." },
    ],
    steps: [
      { title: "Envoyez votre commande", text: "Indiquez le service et l'offre souhaités avec le formulaire ci-dessous." },
      { title: "Recevez votre devis", text: "Nous répondons avec le montant total en BIF, frais compris." },
      { title: "Payez par mobile money", text: "Payez avec Lumicash ou EcoCash au numéro que nous vous indiquons." },
      { title: "Profitez-en", text: "Nous réglons l'abonnement et confirmons dès qu'il est actif." },
    ],
    faq: [
      {
        question: "Quels services puis-je payer ?",
        answer:
          "Des abonnements comme Netflix, ChatGPT et Claude. Pour un autre service, envoyez une commande et nous vous dirons si nous pouvons vous aider.",
      },
      {
        question: "Combien ça coûte ?",
        answer:
          "Le prix dépend du service, de l'offre et du taux de change du jour. Nous vous envoyons toujours le montant total en BIF, nos frais compris, avant tout paiement. Contactez-nous pour les tarifs.",
      },
      { question: "Combien de temps prend l'activation ?", answer: "Nous vous confirmons le délai avec votre devis." },
      {
        question: "Avez-vous besoin de mon mot de passe ?",
        answer:
          "Nous vous expliquerons précisément ce qui est nécessaire pour votre service avec votre devis. Ne partagez jamais de mots de passe sur des canaux publics.",
      },
      {
        question: "Imara est-il affilié à Netflix, OpenAI ou Anthropic ?",
        answer:
          "Non. Imara Pay est un service de paiement indépendant. Netflix, ChatGPT, Claude et les autres noms sont des marques de leurs propriétaires respectifs.",
      },
    ],
    pricingEyebrow: "Tarifs et frais",
    pricingTitle: "Ce que vous payez",
    pricingSubtitle: "Aucun coût caché. Votre devis indique tout avant de payer.",
    includesTitle: "Votre total en BIF comprend :",
    includes: [
      "Le prix de l'abonnement, fixé par le fournisseur",
      "La conversion au taux du jour",
      "Les frais de service Imara Pay",
    ],
    pricingNote: "Contactez-nous pour les tarifs. Nous vous enverrons un devis exact pour votre service et votre offre.",
    orderEyebrow: "Commande",
    orderTitle: "Passer une commande",
    orderSubtitle: "Remplissez le formulaire et nous vous répondrons avec votre devis en BIF.",
    orderWarning: "N'envoyez aucun argent avant d'avoir reçu notre devis et nos coordonnées de paiement.",
    orderSubmit: "Envoyer la commande",
    orderPlaceholder:
      "Quel service et quelle offre ? (ex. ChatGPT Plus, mensuel). Payez-vous avec Lumicash ou EcoCash ? Autre chose à savoir ?",
  },

  services: {
    ai: {
      title: "Solutions d'IA et automatisation",
      short:
        "Mettez l'IA au service de votre entreprise : assistants intelligents, chatbots et automatisations qui libèrent votre équipe des tâches répétitives.",
      included: [
        "Chatbots IA pour votre site web et WhatsApp",
        "Fonctions d'IA dans vos applications, avec des modèles comme Claude et GPT",
        "Automatisation des documents, rapports et tâches répétitives",
        "Conseil et formation pour utiliser l'IA en toute sécurité",
      ],
    },
    web: {
      title: "Développement web sur mesure",
      short: "Des sites et applications web rapides et sécurisés, du site vitrine à la plateforme complexe.",
      included: [
        "Sites d'entreprise et pages de présentation",
        "Applications web et tableaux de bord",
        "E-commerce et commande en ligne",
        "Sites multilingues, optimisés pour le référencement",
      ],
    },
    mobile: {
      title: "Développement d'applications mobiles",
      short: "Des applications Android et iOS avec React Native, pensées pour les téléphones d'entrée de gamme et les réseaux instables.",
      included: [
        "Un seul code pour Android et iOS",
        "Données hors ligne et synchronisation",
        "Intégrations mobile money",
        "Publication sur le Play Store et l'App Store",
      ],
    },
    support: {
      title: "Assistance et support informatique",
      short: "Une aide rapide et accueillante quand un logiciel de votre ordinateur ou téléphone ne fonctionne plus comme il faut.",
      included: [
        "Correction d'erreurs, de plantages et de lenteurs",
        "Installation et mise à jour de logiciels",
        "Configuration d'e-mails, de comptes et d'applications",
        "Assistance pour particuliers et équipes d'entreprise",
      ],
    },
    backend: {
      title: "Backend, API et DevOps",
      short: "Des API, bases de données, intégrations et infrastructures cloud fiables, qui grandissent avec vous.",
      included: [
        "API REST et GraphQL",
        "Conception et migration de bases de données",
        "Hébergement cloud, CI/CD et surveillance",
        "Intégrations tierces et de paiement",
      ],
    },
    design: {
      title: "Design UI/UX et graphique",
      short: "Des interfaces comprises dès la première utilisation, ainsi que des visuels de marque et de communication.",
      included: [
        "Recherche utilisateur et maquettes",
        "Design d'interfaces web et mobiles",
        "Logos et identité de marque",
        "Visuels pour réseaux sociaux et impression",
      ],
    },
    training: {
      title: "Formations et cours de programmation",
      short: "Des formations logicielles pratiques pour les équipes et des cours de programmation pour débutants.",
      included: [
        "Formation logicielle du personnel",
        "Cours de programmation pour débutants",
        "Cours de développement web et mobile",
        "Sur place ou en ligne",
      ],
    },
  },

  servicesPage: {
    eyebrow: "Services",
    title: "Nous concevons, développons et maintenons des logiciels",
    subtitle:
      "L'équipe derrière nos propres produits peut créer les vôtres et assurer le bon fonctionnement de vos appareils : IA, sites web, applications, assistance, design et formation. Contactez-nous pour les tarifs.",
    gridAria: "Nos services",
    howEyebrow: "Notre méthode",
    howTitle: "De l'idée au lancement",
    step: "Étape",
    process: [
      { title: "Découverte", text: "Nous écoutons, posons des questions et définissons ensemble objectifs, périmètre et budget." },
      { title: "Conception", text: "Des maquettes et designs que vous validez avant que nous écrivions le code." },
      { title: "Développement", text: "Nous développons par petites étapes et montrons régulièrement l'avancement." },
      { title: "Lancement et suivi", text: "Nous publions, formons votre équipe et restons disponibles ensuite." },
    ],
    ctaTitle: "Demander un devis",
    ctaSubtitle: "Dites-nous ce dont vous avez besoin et nous répondrons avec les prochaines étapes et un devis.",
    ctaSecondary: "Utiliser le formulaire",
    whatsappMessage: "Bonjour Imara, je souhaite un devis pour un projet.",
  },

  labs: {
    eyebrow: "Labs",
    title: "Ce que nous préparons",
    subtitle: "Des idées que nous explorons. Laissez votre e-mail et nous vous préviendrons dès qu'elles seront prêtes à essayer.",
    aria: "Projets à venir",
    notifyLabel: "Être averti au lancement",
    vikoba: {
      name: "Vikoba / Rikirimba",
      text: "Une application pour les groupes d'épargne : suivez cotisations, prêts et réunions, et chaque membre voit où en est le groupe.",
    },
    logistics: {
      name: "Logistique et suivi des envois",
      text: "Suivez colis et livraisons de l'enlèvement à la remise, pensé pour les transporteurs locaux et les entreprises qui y font appel.",
    },
    remittance: {
      name: "Transferts de la diaspora",
      text: "Un moyen plus simple pour la famille à l'étranger d'envoyer de l'argent au pays.",
    },
    ideaTitle: "Une idée, ou envie de tester l'un de ces projets ?",
    ideaText: "Nous aimerions le construire avec nos premiers partenaires.",
    ideaCta: "Parlons-en",
  },

  aboutPage: {
    eyebrow: "À propos d'Imara",
    title: "Imara signifie « fort » en swahili",
    subtitle:
      "Nous sommes une entreprise technologique qui conçoit des produits logiciels et propose des services logiciels pour les particuliers et les entreprises, partout.",
    missionAria: "Mission et vision",
    missionTitle: "Notre mission",
    missionText:
      "Créer des logiciels fiables et abordables qui fonctionnent dans les conditions réelles : hors ligne d'abord, avec les paiements locaux et dans les langues que les gens parlent.",
    visionTitle: "Notre vision",
    visionText:
      "Un avenir où les entreprises, les écoles et les familles, partout, s'appuient sur une technologie conçue pour elles, et faite pour durer.",
    storyEyebrow: "Notre histoire",
    storyTitle: "Pourquoi nous avons créé Imara",
    story1:
      "Trop de logiciels sont conçus pour l'internet rapide, les cartes bancaires et une seule langue, ce qui laisse beaucoup de gens de côté. Imara est née pour créer des outils adaptés : des applications qui fonctionnent hors ligne, acceptent le mobile money et parlent anglais, français, swahili et kirundi.",
    story2:
      "Aujourd'hui, nous créons nos propres produits, de la santé au commerce, à l'éducation et aux paiements, et nous aidons d'autres entreprises et organisations à créer les leurs.",
    valuesEyebrow: "Valeurs",
    valuesTitle: "Ce qui nous guide",
    values: [
      { title: "Fait pour durer", text: "Un logiciel fiable vaut mieux qu'un logiciel tape-à-l'œil. Nous créons des outils qui continuent de fonctionner." },
      { title: "Les gens d'abord", text: "Nous concevons pour de vrais utilisateurs, sur de vrais téléphones, dans des conditions réelles." },
      { title: "Honnêtes et clairs", text: "Un langage simple, des prix clairs et aucune surprise." },
      { title: "Partenariat", text: "Nous travaillons avec nos clients, pas seulement pour eux, et restons présents après le lancement." },
      { title: "Rester simple", text: "La solution la plus simple qui résout le problème est souvent la meilleure." },
      { title: "Ancrés localement", text: "Conçu au Burundi, pour les réalités de notre région et du monde." },
    ],
    teamEyebrow: "L'équipe",
    teamTitle: "Fondateur et équipe",
    founderRole: "Fondateur",
    founderBio: "Idriss a fondé Imara pour créer des logiciels qui fonctionnent pour les gens au Burundi et dans le monde entier.",
    growing: "Nous recrutons",
    growingText: "Les profils de l'équipe arrivent bientôt. Envie de travailler avec nous ? Contactez-nous.",
    ctaTitle: "Construisons quelque chose de solide",
    ctaSubtitle: "Que vous ayez besoin de l'un de nos produits ou d'une solution sur mesure, nous serions ravis d'échanger avec vous.",
  },

  blog: {
    eyebrow: "Actualités",
    title: "Actualités et nouvelles",
    subtitle: "Lancements de produits, histoires et nouvelles de l'équipe Imara.",
    aria: "Articles",
    empty: "Aucun article pour l'instant",
    emptyText: "Nos premières nouvelles arrivent bientôt. Suivez-nous sur Instagram en attendant.",
  },

  notFound: {
    title: "Page introuvable",
    text: "La page que vous cherchez n'existe pas ou a été déplacée.",
    home: "Retour à l'accueil",
  },

  footer: {
    newsletterTitle: "Restez informé",
    newsletterText: "Lancements de produits et nouvelles d'Imara, quelques fois par an. Pas de spam.",
    newsletterSuccess: "Merci ! Vous êtes inscrit(e).",
    blurb: "Logiciels, applications et assistance : conçus au Burundi, pour le monde.",
    company: "Entreprise",
    products: "Produits",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    cookies: "Avis sur les cookies",
    rights: "Imara Company Limited. Tous droits réservés.",
  },

  legal: {
    eyebrow: "Mentions légales",
    lastUpdated: "Dernière mise à jour",
    draft: "Brouillon. Ce document est en cours de finalisation et peut changer.",
  },

  form: {
    name: "Nom complet",
    email: "E-mail",
    other: "Autre chose",
    topic: "Sujet",
    message: "Message",
    messagePlaceholder: "Parlez-nous de votre projet, de vos délais et de tout ce que nous devrions savoir.",
    privacyBefore: "En envoyant ce formulaire, vous acceptez notre",
    privacyLink: "Politique de confidentialité",
    submit: "Envoyer le message",
    sending: "Envoi…",
    successTitle: "Message envoyé. Merci !",
    successText: "Nous avons bien reçu votre message et vous répondrons rapidement.",
    sendAnother: "Envoyer un autre message",
    errorTitle: "Votre message n'a pas pu être envoyé",
    errorText: "Veuillez réessayer, ou contactez-nous par e-mail ou sur WhatsApp.",
    rateLimited: "Trop de messages en peu de temps. Merci de patienter quelques minutes avant de réessayer.",
    errors: {
      nameRequired: "Veuillez saisir votre nom.",
      nameShort: "Veuillez saisir au moins 2 caractères.",
      emailRequired: "Veuillez saisir votre e-mail.",
      email: "Veuillez saisir une adresse e-mail valide.",
      messageRequired: "Veuillez écrire un message.",
      messageShort: "Veuillez écrire au moins 10 caractères.",
      tooLong: "Ce texte est trop long.",
    },
  },

  notify: {
    placeholder: "vous@exemple.com",
    button: "M'avertir",
    label: "E-mail pour les nouvelles de {topic}",
    success: "Merci ! Nous vous écrirons dès que {topic} sera prêt.",
    rateLimited: "Trop de demandes. Veuillez réessayer dans quelques minutes.",
    error: "Une erreur est survenue. Veuillez réessayer.",
    newsTopic: "les nouvelles d'Imara",
  },

  store: {
    getItOn: "Disponible sur",
    downloadOnThe: "Télécharger dans",
    comingSoonOn: "Bientôt sur",
    comingSoonOnThe: "Bientôt dans l'",
  },

  interest: {
    afya: "Imara Afya",
    duka: "Duka POS",
    school: "Système de gestion scolaire",
    pay: "Imara Pay",
    ai: "Solutions d'IA et automatisation",
    web: "Développement web sur mesure",
    mobile: "Développement d'applications mobiles",
    support: "Assistance et support informatique",
    backend: "Backend, API et DevOps",
    design: "Design UI/UX et graphique",
    training: "Formations et cours de programmation",
  },
};
