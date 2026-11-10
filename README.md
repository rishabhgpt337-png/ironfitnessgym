# Iron Temple Gym — Mumbai

A production-ready single-page website for a strength-focused gym in Mumbai. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion.

The design is dark, industrial and editorial: near-black surfaces, a single hot-orange accent, condensed display type and a layout that stays readable from 360 px phones to 1440 px desktops.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| Motion | Framer Motion 11 |
| Icons | lucide-react |
| Images | `next/image` + locally generated WebP assets |
| Fonts | `next/font/google` — Anton, Oswald, Inter |
| Form delivery | `/api/inquiry` → Web3Forms |

No external UI kit, CSS framework or stock-photo CDN is used at runtime.

---

## Quick start

Requirements: **Node.js 20+** and npm.

```bash
npm install
cp .env.example .env.local   # PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

Production check:

```bash
npm run build
npm start
```

Other scripts:

```bash
npm run lint             # ESLint / next lint
npm run generate:images  # Regenerate the local WebP artwork
```

---

## Editing content

**All editable content lives in [`data/gym.ts`](data/gym.ts).** Components read from it; you should not need to touch JSX for copy, prices, contact details or images.

The file is grouped and typed:

| Export | What it controls |
| --- | --- |
| `brand` | Gym name, city, tagline, description, canonical site URL |
| `contact` | Address, phone, WhatsApp, email, Instagram, coordinates, map URLs |
| `hours` | Per-day opening hours (24-hour, Asia/Kolkata) |
| `hoursNote` | Note shown under the weekly timetable |
| `rating` | Google rating and review count |
| `stats` | The four numbers in the stats strip |
| `programs` | Six training programmes |
| `aboutFeatures` | Four “what you get” points |
| `facilities` | Six facility cards and their images |
| `trainers` | Coach names, specialities, bios, photos, Instagram |
| `billingCycles` | Monthly / quarterly / half-yearly / yearly toggle |
| `plans` | Three membership plans and their prices |
| `pricePlaceholder` | Text shown when a price is `null` |
| `testimonials` | Review carousel content |
| `faqs` | Accordion questions and answers |
| `gallery` | Eight gallery images, captions and grid spans |
| `navLinks` | Header, footer and mobile navigation |
| `inquiryGoals` / `inquiryTimings` | Form dropdown options |
| `copy` | All marketing copy, labels and button text |
| `seo` | Meta title, description, keywords, OG image |

Anything marked `TODO` in that file is a placeholder and must be replaced before launch.

### Prices

Plans ship with `null` prices so the site shows **“Contact for pricing”** instead of inventing numbers. To publish real prices, replace the `null` values in INR:

```ts
prices: {
  monthly: 2500,
  quarterly: 6500,
  "half-yearly": 12000,
  yearly: 22000,
},
```

Prices are formatted with `Intl.NumberFormat("en-IN")`, so `2500` renders as `₹2,500`.

### Hours and live status

Opening hours are 24-hour strings in `data/gym.ts` and are interpreted in **Asia/Kolkata**. The hero, timings section and footer all derive from the same data. The live “Open now / Closed” badge updates on the client and handles overnight or closed days.

---

## Images

All images are local files in [`public/images`](public/images). They are original, generated abstract industrial compositions — no hotlinked stock photography and no licensing dependencies.

| File | Used for |
| --- | --- |
| `hero.webp` | Hero background |
| `about.webp` | About section |
| `inquiry.webp` | Enquiry section |
| `og.webp` | Open Graph / social preview (1200×630) |
| `facility-1.webp` … `facility-6.webp` | Facilities grid |
| `trainer-1.webp` … `trainer-3.webp` | Coach portraits |
| `gallery-1.webp` … `gallery-8.webp` | Gallery and lightbox |

To use real photography, drop replacements into `public/images` using the **same filenames** and update the `alt` text in `data/gym.ts`. The `SmartImage` component handles loading, sizes, blur placeholders and an on-brand fallback if a file is missing.

To regenerate the bundled artwork:

```bash
npm run generate:images
```

Requires `sharp` (already a dev dependency). The script writes WebP files into `public/images`.

---

## Enquiry form

The form is client-validated, accessible and progressively enhanced:

- Name and 10-digit Indian mobile are required; email is optional but validated when present.
- Inline errors are linked with `aria-describedby`; the first invalid field is focused.
- A hidden honeypot field plus a 30-second `localStorage` rate limit reduce spam.
- The API route independently validates, applies an in-memory IP rate limit and forwards to Web3Forms.
- Loading, success and error states are announced to screen readers.
- A secondary **Send via WhatsApp** action pre-fills the message from the form.

### Web3Forms setup

1. Create an access key at <https://web3forms.com> for the gym’s inbox.
2. Add it to `.env.local` (and to your hosting provider’s environment variables):

   ```env
   WEB3FORMS_KEY=your-access-key
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

3. Restart the dev server or redeploy.

**Without a key the route runs in demo mode:** it logs the submission on the server and returns success so the UI can be tested. Demo mode does **not** send email — configure the key before launch.

The API expects JSON with `name`, `phone`, `email`, `goal`, `timing`, `plan`, `message` and the honeypot `website`.

---

## SEO and metadata

- Per-page metadata, canonical URL, Open Graph and Twitter cards are generated in `app/layout.tsx`.
- `app/robots.ts` and `app/sitemap.ts` produce `/robots.txt` and `/sitemap.xml`.
- JSON-LD structured data (`HealthClub` / `LocalBusiness`, hours, geo, offers) lives in `lib/structured-data.ts`.
- Set `NEXT_PUBLIC_SITE_URL` in production so absolute URLs are correct.
- Replace `brand.siteUrl` in `data/gym.ts` with the live domain as a fallback.
- Replace `public/images/og.webp` with a branded 1200×630 image if desired.

---

## Accessibility and performance

- Semantic landmarks, a skip link, visible focus rings and keyboard-operable menus, accordion, gallery lightbox and carousel.
- Mobile drawer traps focus, closes on Escape and restores focus to the trigger.
- Carousel autoplay pauses on hover/focus and respects `prefers-reduced-motion`.
- Decorative artwork is hidden from assistive technology; all meaningful images have alt text.
- Colour pairs target WCAG AA contrast.
- Images are sized, lazy-loaded below the fold and served as WebP via `next/image`.
- Fonts are self-hosted through `next/font` with `display: swap`.

A Playwright + axe audit script is included at `scripts/audit.mjs`. It expects a server on `http://localhost:3000` and Google Chrome installed at the default Windows path:

```bash
npm run build
npm start
# in another terminal
node scripts/audit.mjs
```

It checks horizontal overflow at 360/768/1024/1440, image loading, form validation and submission, plan prefill, gallery keyboard controls, FAQ toggles, mobile navigation and axe violations.

---

## Deploying

### Vercel (recommended)

1. Push this repository to GitHub.
2. Import it at <https://vercel.com/new>.
3. Add `WEB3FORMS_KEY` and `NEXT_PUBLIC_SITE_URL` under **Project → Settings → Environment Variables**.
4. Deploy. The site is fully static apart from `/api/inquiry`.

### Any Node host

```bash
npm ci
npm run build
npm start
```

Node 20+ is required. Ensure the environment variables above are present at build and runtime.

---

## Project structure

```text
app/
  api/inquiry/route.ts   Form validation + Web3Forms forwarding
  globals.css            Theme tokens, utilities, field styles
  icon.svg               Favicon
  layout.tsx             Fonts, metadata, skip link, JSON-LD
  page.tsx               Section composition
  robots.ts / sitemap.ts SEO routes
  template.tsx           Page transition wrapper
components/              One component per section + shared primitives
data/gym.ts              Single source of truth for all content
lib/
  enquiry.ts             Scroll + plan-prefill events
  hours.ts               Hours formatting and grouping
  structured-data.ts     JSON-LD builders
  use-gym-status.ts      Live Asia/Kolkata open/closed state
  utils.ts               cn, currency, phone, WhatsApp helpers
public/images/           21 local WebP assets
scripts/
  audit.mjs              Playwright + axe QA pass
  generate-images.mjs    Image generator
```

---

## Launch checklist

Replace every `TODO` and verify the following before going live:

- [ ] **Address** — `contact.address`, `contact.addressLines`
- [ ] **Phone** — `contact.phone` (currently `+91 00000 00000`)
- [ ] **WhatsApp** — `contact.whatsapp` (digits only, international format)
- [ ] **Email** — `contact.email` (currently `TODO@example.com`)
- [ ] **Instagram** — `contact.instagram`, `contact.instagramHandle`
- [ ] **Map** — confirm `contact.mapsUrl` / `contact.mapEmbedUrl` point to the real location, and `contact.coordinates`
- [ ] **Hours** — confirm every day in `hours`, plus `hoursNote`
- [ ] **Rating and reviews** — `rating.value`, `rating.reviewCount`, and the Google review link
- [ ] **Prices** — fill `plans[].prices` or keep “Contact for pricing”
- [ ] **Trainers** — replace all three names, specialities, bios, photos and Instagram links
- [ ] **Testimonials** — replace with real, permission-cleared Google reviews
- [ ] **Facilities / gallery** — replace generated art with real gym photography if available, and update alt text
- [ ] **Web3Forms** — set `WEB3FORMS_KEY` and send a live test enquiry
- [ ] **Site URL** — set `NEXT_PUBLIC_SITE_URL` and `brand.siteUrl`
- [ ] **Social preview** — replace `og.webp` if a branded card is preferred
- [ ] **Legal** — privacy policy / terms page if required in your jurisdiction
- [ ] **Final QA** — run the audit script, test on a real phone, and confirm the enquiry lands in the gym inbox

---

## Placeholder notice

Business details, pricing, ratings and reviews are intentionally placeholders. They are safe to render and easy to replace, but they must not be published as real information until verified by the gym owner.
