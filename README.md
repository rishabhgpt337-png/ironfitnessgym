# Iron Temple Gym — Mulund East, Mumbai

A single-page website for **Iron Temple Gym**, a strength-first gym on the podium level at HS Pearl,
V.B. Phadake Road, Mulund East, Mumbai 400081.

Dark industrial art direction, condensed display type, one hot-orange accent, and editorial layouts
built around photographs of the actual gym floor.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| Motion | Framer Motion 11 |
| Icons | lucide-react |
| Images | `next/image` + local WebP assets |
| Fonts | `next/font/google` — Anton, Oswald, Inter |
| Form delivery | `/api/inquiry` → Web3Forms |

---

## Quick start

Requirements: **Node.js 20+** and npm.

```bash
npm install
cp .env.example .env.local   # PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Open the URL printed by Next.js (usually <http://localhost:3000>).

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint
```

---

## Verified business information

Everything in the header, visit section, footer and structured data comes from the gym's public
Google Business Profile and Instagram:

- **Name** — Iron Temple Gym (आयरन टेम्पल जिम)
- **Address** — Podium 3, HS Pearl, V.B. Phadake Road, Sane Guruji Nagar, Mulund East, Mumbai 400081
- **Phone / WhatsApp** — +91 91676 82222
- **Instagram** — [@irontemple_mulund](https://www.instagram.com/irontemple_mulund/)
- **Rating** — 4.9 from 177 Google reviews
- **Hours** — Mon–Fri 5 AM–11 PM, Sat 5 AM–10 PM, Sun 7 AM–3 PM

No prices, membership tiers or invented trainer identities are published. The site deliberately has
no pricing section.

All editable content lives in [`data/gym.ts`](data/gym.ts). Components read from it, so copy, hours,
contact details and image paths can be changed in one place.

---

## Imagery

Photographs in `public/images` are of the real gym, sourced from its public Google Business listing.
The hero image is a licensed stock photograph of an athlete training, used only as the hero visual —
it is not presented as the gym itself. There is no hotlinking at runtime.

| File | Used for |
| --- | --- |
| `hero.webp` | Hero (stock athlete photograph) |
| `about.webp` | About section |
| `facility-strength.webp`, `facility-cardio.webp`, `facility-wall.webp` | Facilities |
| `gym-exterior.webp` | Visit / location |
| `gallery-1.webp` … `gallery-7.webp` | Extra floor photography (unused while the gallery section is off) |
| `brand-mark.webp` | Logo mark cropped from the gym's own logo artwork |
| `og.webp` | Social preview (1200×630) |

To swap a photo, replace the file with the same name (WebP recommended) and update the `alt` text in
`data/gym.ts`.

---

## Enquiry form

- Name and 10-digit Indian mobile are required; email is optional but validated.
- Inline errors are linked with `aria-describedby`; the first invalid field is focused.
- A honeypot plus a 30-second `localStorage` rate limit reduce spam; the API route rate-limits by IP.
- Loading, success and error states are announced to screen readers.
- A secondary **Send via WhatsApp** action pre-fills the message from the form.

### Web3Forms

Add the access key to `.env.local` and to the hosting provider's environment:

```env
WEB3FORMS_KEY=your-access-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Without a key the route runs in demo mode: it logs the submission server-side and returns success so
the UI can be tested. Demo mode does not send email — configure the key before launch.

---

## SEO

- Metadata, canonical URL, Open Graph and Twitter cards are generated in `app/layout.tsx`.
- `app/robots.ts` and `app/sitemap.ts` produce `/robots.txt` and `/sitemap.xml`.
- JSON-LD (`ExerciseGym`) with address, geo, hours and aggregate rating is built in
  `lib/structured-data.ts`.
- Set `NEXT_PUBLIC_SITE_URL` in production so absolute URLs are correct.

---

## Accessibility and performance

- Semantic landmarks, a skip link, visible focus rings and a keyboard-operable menu and accordion.
- Mobile drawer closes on Escape and restores focus to the trigger.
- Motion respects `prefers-reduced-motion`.
- All meaningful images have descriptive alt text.
- Images are sized, lazy-loaded below the fold and served as WebP through `next/image`.
- Fonts are self-hosted through `next/font` with `display: swap`.

`scripts/audit.mjs` is a Playwright + axe QA pass; it expects a server on `http://localhost:3000`.
It was written for the previous content set, so treat it as a starting point rather than a full
regression suite.

---

## Project structure

```text
app/
  api/inquiry/route.ts   Form validation + Web3Forms forwarding
  globals.css            Theme tokens, utilities, field styles
  layout.tsx             Fonts, metadata, skip link
  page.tsx               Section composition + JSON-LD
  robots.ts / sitemap.ts SEO routes
components/              One component per section + shared primitives
data/gym.ts              Single source of truth for content
lib/                     Hours, enquiry helpers, structured data, gym status
public/images/           Local WebP photography
scripts/audit.mjs        Playwright + axe QA pass
```

---

## Deploying

### Vercel

1. Push this repository to GitHub.
2. Import it at <https://vercel.com/new>.
3. Add `WEB3FORMS_KEY` and `NEXT_PUBLIC_SITE_URL` under **Project → Settings → Environment Variables**.
4. Deploy. The site is static apart from `/api/inquiry`.

### Any Node host

```bash
npm ci
npm run build
npm start
```

Node 20+ is required.
