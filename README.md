# Little Web Company — website

Digital design & development for ambitious businesses.

Production site for Little Web Company, a two-person independent design and development studio based in India working with businesses worldwide.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4 (CSS-first tokens in `src/styles/index.css`)
- Framer Motion 12, used only for the page transition, mobile menu, contact overlay and the service preview crossfade
- React Router 7
- Self-hosted fonts via Fontsource: Bricolage Grotesque (display), Instrument Sans (body), Instrument Serif italic (accent)
- Web3Forms for the contact form (no backend required)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
npm run og         # regenerate public/og-image.png and PNG icons from the SVG sources
```

## Where to edit content

All copy and data live in `src/data/` so the site can be updated without touching components.

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Brand name, description, email, WhatsApp + call numbers, scheduling link, company social links, legal entity placeholders, navigation, footer columns |
| `src/data/services.ts` | The seven services, their "typically includes" lists and the detailed SEO & Visibility / Hosting & Care sections |
| `src/data/projects.ts` | Work cards and case-study pages (challenge, approach, design, development, result, technologies, gallery, final website) |
| `src/data/founders.ts` | Founder names, roles, photos, Instagram handles, bios and skills |
| `src/data/testimonials.ts` | Client testimonials. Empty until real, permissioned quotes exist |
| `src/data/process.ts` | The six "How we work" steps |
| `src/data/whyUs.ts` | "Why Little Web Co." points, the "What you get" benefits and the trust strip facts |
| `src/data/faq.ts` | FAQ questions and answers |
| `src/data/blog.ts` | Article outlines. Set `status: 'published'` when written |
| `src/data/legal.ts` | Legal page templates. Everything in square brackets is a placeholder |
| `src/data/contact.ts` | Contact form select options (project types, budget ranges, timelines) |

### Founder photos and Instagram handles

No founder photos or Instagram handles are in the project yet, so the cards show a monogram tile and, in development only, an `@handle-to-add` placeholder. To complete them:

1. Put the portraits in `public/team/` (square, roughly 800×800, JPG or WebP).
2. In `src/data/founders.ts` set `photo: { src: '/team/<file>', alt: 'Portrait of <Name>, Co-Founder of Little Web Company', width: 800, height: 800 }`.
3. Set `instagram: { handle: '<handle without @>', url: 'https://www.instagram.com/<handle>' }`. The handle is only rendered publicly once both values are filled in.

### Adding a real project

1. Add imagery to `public/projects/<slug>/`.
2. In `src/data/projects.ts` fill in `cover`, `gallery`, `desktopShots`, `mobileShots` and `liveUrl`.
3. Set `kind: 'client'` only for real, delivered work the client has agreed to show. Concept work stays `'concept'` or `'self-initiated'` and is labelled as such on the site.

### Testimonials

Add entries to `src/data/testimonials.ts` only when you have a real quote and permission to publish it. While the array is empty the home page shows an honest "coming soon" note in production and clearly labelled placeholder cards in development.

### Scheduling link

Set `contact.schedulingUrl` in `src/data/site.ts` to a Calendly / Cal.com URL. Every "Schedule a Call" button will open it. When empty, the buttons go to the contact page's "Schedule a call" section.

## Contact

- The navbar mail icon and every "Start a Project" / "Discuss Your Project" button open the contact overlay (`src/components/contact/ContactModal.tsx`). It traps focus, closes on Escape or backdrop click and locks page scroll.
- `/contact` keeps the full form with country, phone and timeline fields plus the schedule-a-call block.
- Both forms post to Web3Forms using `VITE_WEB3FORMS_KEY`. A honeypot field filters bots.

## Theme

- Light and dark modes with a navbar toggle. The choice is stored in `localStorage` under `lwc-theme`; with no stored choice the system preference is followed.
- An inline script in `index.html` sets `data-theme` on `<html>` before first paint, so there is no flash.
- Colour roles live in `src/styles/index.css` (`--fg`, `--bg`, `--bg-2`, `--surface`, `--fg-muted`, `--line-c`, `--accent-text`, `--accent-display`). Sections that should contrast with the page use `<Section surface="inverse">`: ink in light mode, an elevated charcoal in dark mode.

## Motion system

- Only `opacity` and `transform` are animated. UI interactions run 180–240ms, entrances and reveals 460–600ms, with the easing tokens `--ease-out` / `--ease-expo`.
- Scroll reveals use one shared IntersectionObserver (`src/hooks/useReveal.ts`) that adds `.is-visible` once and then unobserves. Wrap a block in `<Reveal>` or stagger children with `<Reveal group>` + `revealItem(i)`.
- Accordions animate `grid-template-rows`, never `height`.
- The hero laptop is CSS 3D (`src/styles/laptop.css`): the lid opens once after load, phones and reduced-motion visitors see it already open, and nothing keeps rendering afterwards. No WebGL.
- `prefers-reduced-motion: reduce` disables reveals, the headline rise and the laptop opening, and shortens every transition to effectively zero.
- Mobile uses shorter reveal distances and durations.

## Environment

`.env` holds public, build-time values only:

- `VITE_WEB3FORMS_KEY` — Web3Forms access key (public by design). Submissions arrive at the email address registered with that key.
- `VITE_SITE_URL` — canonical URL, e.g. `https://www.yourdomain.com`. Used for canonical tags, Open Graph image URLs, JSON-LD, `sitemap.xml` and `robots.txt`. On Vercel it is inferred automatically from the production URL when left empty.

## SEO

- Every route sets a unique title, description, canonical URL, Open Graph and Twitter metadata through `src/components/seo/Seo.tsx`.
- JSON-LD: Organization and WebSite on every page, an ItemList of Service entries on `/services`, FAQPage on `/faq`, BreadcrumbList on case studies and articles, and BlogPosting for published articles. No ratings or reviews are emitted.
- `sitemap.xml` and `robots.txt` are generated at build time from `src/data/routes.ts`.
- Old `/projects` and `/pricing` URLs redirect to `/work` and `/services`.

## Deployment

The site is a static single-page app. `vercel.json` (Vercel) and `public/_redirects` (Netlify) route every path to `index.html`.

```bash
npm run build
```

Deploy the `dist/` folder, or connect the repository to Vercel / Netlify with the build command `npm run build` and output directory `dist`.

## Before going live

- [ ] Connect a domain and set `VITE_SITE_URL`
- [ ] Send one test inquiry through the contact overlay and confirm it arrives
- [ ] Add founder photos and Instagram handles in `src/data/founders.ts`
- [ ] Replace concept project previews with real screenshots as work launches
- [ ] Add real testimonials only with permission
- [ ] Have the legal templates reviewed and fill in the bracketed placeholders
- [ ] Add company social links in `src/data/site.ts` if wanted
- [ ] Set up Search Console / analytics for the live domain (not configured in this repository)
