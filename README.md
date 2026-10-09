# Imara Company Limited: website

Next.js 16 (App Router) · TypeScript · Chakra UI v3 · Framer Motion · react-hook-form + zod · Vercel.

```bash
yarn install        # also regenerates Chakra theme types
cp .env.example .env.local
yarn dev            # http://localhost:3000
yarn build && yarn start
yarn typecheck && yarn lint
```

## Folder structure

Everything lives in `app/`. **A folder with a `page.tsx` is a page on the site**;
folders without one (components, data, lib…) are just code.

```
app/
├── [lang]/                   ← every page, once per language: /en/… and /fr/…
│   ├── layout.tsx            ← wraps every page: navbar, footer, fonts, theme
│   ├── page.tsx              ← Home                       /en  /fr
│   ├── not-found.tsx         ← 404 page
│   ├── products/
│   │   ├── page.tsx          ← Products (Imara Afya featured)
│   │   ├── duka-pos/         ← Duka POS
│   │   ├── school/           ← School Management System
│   │   └── imara-pay/        ← Imara Pay + order form
│   ├── services/  labs/  about/  contact/  blog/
│   └── legal/                ← privacy/  terms/  cookies/  (EN + FR text inside)
│
├── i18n/                     ← LANGUAGES
│   ├── dictionaries/en.ts    ← all English text
│   ├── dictionaries/fr.ts    ← all French text
│   └── config.ts             ← list of languages
│
├── data/                     ← site.ts (email, WhatsApp, links), products.ts, services.ts
├── components/
│   ├── navbar/  footer/      ← top bar (with EN/FR switch) and footer
│   ├── sections/             ← big page blocks: Hero, CTASection, ContactSection…
│   ├── shared/               ← reusable pieces: cards, forms, FAQ…
│   └── illustrations/  motion/  brand/  providers/  seo/
├── actions/                  ← form handlers that run on the server (send email)
├── lib/                      ← validation, email, spam checks, SEO
├── theme/index.ts            ← colours, fonts, button & card styles
└── sitemap.ts  robots.ts  icon.png

proxy.ts                      ← sends "/" to /en or /fr
```

Files outside `app/` are config that Next.js requires at the root
(`package.json`, `next.config.ts`, `tsconfig.json`) plus `public/` for static files.

## Adding a page
1. Create `app/[lang]/<name>/page.tsx` (copy `app/[lang]/blog/page.tsx` as a starting point).
2. Add its text to both dictionaries (`app/i18n/dictionaries/en.ts` and `fr.ts`).
3. Add it to `routes` in `app/data/site.ts`. The sitemap picks it up automatically.
4. Add a link in `app/components/navbar/navLinks.ts` or the footer if needed.

## Languages (English / French)

Every page exists twice: `/en/...` and `/fr/...`. Visiting `/` sends people to
their saved choice, or their browser's language (English by default).

- **All page text** lives in `app/i18n/dictionaries/en.ts` and `fr.ts`.
  Both files have the same shape — change a line in one, change it in the other
  (TypeScript reports anything missing).
- **Legal pages** keep their EN and FR text inside each page file
  (`app/[lang]/legal/*/page.tsx`).
- **In code:** server components use `const { t, href } = await getI18n()`;
  interactive (client) components use `const { t, href } = useI18n()`.
  `href("/products")` gives `/fr/products` on French pages.
- **Adding a language later** (e.g. Swahili): add it to `app/i18n/config.ts`,
  copy `en.ts` to `sw.ts` and translate it, then register it in `app/i18n/server.ts`.
