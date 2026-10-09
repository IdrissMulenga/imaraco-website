# Imara website: sitemap & wireframes

English only for now (language switching removed; French/Swahili can be added later).
Imara Afya has no page of its own: its cards link straight to Google Play and the App Store.

## Sitemap

```
/
├── /                          Home                                  ✅ built
├── /products                  Products: Imara Afya featured (store links) + 3 cards
│   ├── /products/duka-pos     Duka POS
│   ├── /products/school       School Management System  → "Request a pilot"
│   └── /products/imara-pay    Imara Pay  → how it works, fees, order form, FAQ
├── /services                  5 services, each with "Request a quote"
│   └── /services/quote        Quote request form (service pre-selected via ?service=)
├── /labs                      Coming soon: Vikoba/Rikirimba, Logistics, Diaspora remittance
│                              → one "Notify me" email capture each
├── /about                     Mission, vision, story, values, founder, team
├── /contact                   Form, WhatsApp, email, location, socials
├── /blog                      News index (structure only, empty state)
│   └── /blog/[slug]           Article template
└── /legal
    ├── /legal/privacy         Privacy Policy (Play Store requires a public URL)
    ├── /legal/terms           Terms of Service
    └── /legal/cookies         Cookie notice

System: /sitemap.xml · /robots.txt · /icon.svg · 404 page
```

**Global chrome (all pages)**
- **Header (sticky):** logo · Products · Services · Labs · About · Contact · language switcher · light/dark toggle · **Work with us** button. Below `lg`, the links collapse into a right-hand drawer, with language and theme controls at the bottom.
- **Footer:** logo, blurb, tagline, social icons (Instagram @imaraco.ltd, WhatsApp, email) · Company · Products · Legal columns · © line + language switcher.
- **Skip link** to `#main` and visible focus rings throughout.

## Page wireframes

Layout notes assume mobile first: single column on phones, expanding at `md` (768px) and `lg` (992px).

### Home ✅
1. **Hero:** eyebrow tagline → H1 (two lines, second in brand color) → subheadline → [Explore our products] [Work with us]. On the right (below the text on phones) is an HTML/SVG mockup: a laptop showing a POS dashboard plus a phone showing Afya's water ring, floating gently. The background is a soft brand glow plus a fading dot grid.
2. **Product highlights:** heading + "See all products" → 4 product cards (icon, category badge, name, tagline, short description, platform note, "Learn more"). 1 / 2 / 4 columns.
3. **Services overview** (tinted band): heading + "See all services" → 5 compact service cards.
4. **Why Imara:** 6 features in a 1 / 2 / 3 grid: offline-first, local payments, multilingual, light & fast, privacy by design, support nearby.
5. **Trust bar:** a single row of verifiable commitments with icons. No logos and no numbers. Real partner logos can be added later, with permission.
6. **About teaser:** abstract "pillars" illustration + "Imara means strong" text + [Read our story].
7. **Final CTA band** (solid brand color): [Chat on WhatsApp] [Send a message ↓].
8. **Contact:** contact details on the left (email, WhatsApp, Instagram, location), form card on the right.

### Products
- Page header: title + intro.
- 4 large product cards, alternating with mockups on desktop.
- Strip: "Need something custom?" → Services.

### Product detail (shared template, plus product-specific blocks)
- Hero: name, tagline, platform badges, primary CTA, phone or desktop mockup.
- Feature grid (6–8 features).
- "How it works" in 3 steps.
- Product-specific blocks:
  - **Imara Afya:** tracked metrics (water, steps, sleep, weight/BMI, daily check-in, cycle tracking with prediction); languages EN/FR/SW; Play Store / App Store buttons (links are placeholders); a **medical disclaimer** callout; a **privacy note** callout linking to the Privacy Policy.
  - **Duka POS:** multi-tenant, multiple branches, inventory, sales, customers and loyalty, reports, staff roles. CTA: Request a demo.
  - **School Management System:** students, classes, timetables, grades, PDF report cards (*bulletin scolaire*), fees and receipts, attendance, admin dashboard, offline-capable. CTA: **Request a pilot** (a form with school name, size and city).
  - **Imara Pay:** a how-it-works stepper (choose service → get quote → pay with Lumicash/EcoCash → receive activation). Fee explanation: no invented numbers; "fees shown before you pay / contact us for pricing". Then the **order form** (service, plan, email for the account, mobile-money number, provider), an FAQ accordion, and a "not affiliated with the listed services" note.
- FAQ (where relevant) → CTA band.

### Services
- Header → 5 service blocks (icon, title, description, what's included, typical deliverables), each with **Request a quote**. Pricing copy: "Contact us for pricing".
- Process strip: Discover → Design → Build → Launch & support.
- Quote form: name, email, phone/WhatsApp, service (pre-selected), budget range (optional, free text), timeline, details.

### Labs (Coming soon)
- Header explaining that Labs are early ideas.
- 3 cards (Vikoba/Rikirimba savings groups, logistics and shipment tracking, diaspora remittance), each with a "Coming soon" badge, a short pitch, and an inline **Notify me** email field.

### About
- Mission and vision (2 cards) → story (text + illustration) → values (4–6 icon cards) → **Founder:** Idriss Murenga, Founder, shown with an abstract avatar or monogram (no photo, per the brand rules). The bio is a placeholder for you to write → team (placeholder cards, clearly marked) → CTA.

### Contact
- The same contact block as Home, full page, plus a large WhatsApp button and a small location card (Bujumbura). No embedded map, to keep the page light.

### Legal
- Long-form readable layout (max ~70ch), last-updated date, and a table of contents on desktop.
- The Privacy Policy covers both the website and the Imara Afya app (health data, cycle data, retention, deletion requests, contact). **It should be reviewed by a lawyer before launch.**

### Blog (structure)
- Index with an empty state ("News coming soon") and a post card grid ready for MDX posts.

## Tagline options
Current: **"Technology built to last."** It's solid and matches "Imara".
Alternatives:
1. **"Strong software for real Africa."**
2. **"Built here. Built to last."** Strong local pride; good on Instagram.
3. **"Software that holds up."** Plain and confident; nods to offline-first.
4. **"Imara: strong by design."** Explains the name in three words.

## Placeholders to replace before launch
| Item | Where | Current value |
|---|---|---|
| Public email | `NEXT_PUBLIC_CONTACT_EMAIL` | hello@example.com |
| WhatsApp number | `NEXT_PUBLIC_WHATSAPP_NUMBER` | 25700000000 |
| Site URL | `NEXT_PUBLIC_SITE_URL` | http://localhost:3000 |
| Partner logos | `components/sections/TrustBar.tsx` | none (add only with permission) |
| App store links, founder bio, team | upcoming pages | marked `PLACEHOLDER` |
