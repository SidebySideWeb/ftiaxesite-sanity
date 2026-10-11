# ftiaxesite.gr · Αρχική σελίδα lead generation · Cursor build prompt

Design canvas: https://claude.ai/artifact/DzrAFYGNVuWMumXrpEftzB (Desktop 1440, Κινητό 390, Phone με sticky CTA, Φόρμα: κενή/σφάλμα/επιτυχία).
Reference files in this project folder: `ftiaxesite/design-reference/ftx.css` (all styles and animations, production-ready), `Main.html` (full page markup), `LeadForm.html` (form markup and logic).

---

## Prompt (paste into Cursor)

You are building the home page of **ftiaxesite.gr** in **Astro** (latest stable, TypeScript, static output). It is a single long lead-generation page. The ONLY goal is form submission: every section ends by pointing to `#forma`.

Attached are the design reference files `ftx.css`, `Main.html` and `LeadForm.html`. Reproduce the markup, class names, ids and copy exactly. Do not rewrite or "improve" the Greek copy. Do not add sections, reviews, client logos or statistics.

### 1. Project setup
- `npm create astro@latest`, TypeScript strict, no UI framework. Plain `.astro` components + one small vanilla TS island for the form.
- Fonts: self-host **Commissioner** (variable, 200–900, Greek + Latin subsets) and **JetBrains Mono** 400/500/600 via `@fontsource-variable/commissioner` and `@fontsource/jetbrains-mono`. `font-display: swap`, preload the Commissioner woff2.
- Global CSS: copy `ftx.css` to `src/styles/ftx.css` and import it once in the layout. It contains tokens, components, container queries and all motion. Keep it as one file or split per component with the same selectors.
- `<html lang="el">`. Wrap the page in `<div class="ftx" id="top">` (the stylesheet uses `container: page / inline-size`; responsive rules are container queries, keep them).

### 2. Design tokens (Side by Side design system, ftiaxesite is a family brand)
```
--paper #F4F6F3  --white #FFFFFF  --ink #13232E  --night #0B161D  --ink2 #1A2F3C
--slate #52616B  --muted #9AAAB2  --mist #D7DEDB
--mari #F0B429 (CTA fill, accents; never text on light)  --mari-h #FFC845 (hover)
--mari-t #8A5E08 (accent text on light)  --err #B42318  --err-bg #FDEDEB
Radii 3/6/10/14px. Headlines Commissioner 800, tracking -0.035 to -0.05em. Labels JetBrains Mono 500 uppercase, tracking .12–.14em.
Primary CTA: marigold fill, ink text, 2px ink border, 5px 5px 0 ink offset shadow (high contrast, 8.6:1 text).
```

### 3. Components (src/components/)
| Component | Section id | Notes |
|---|---|---|
| `Header.astro` | – | sticky; logo, nav links `#paketo` (Πακέτα) and `#erotiseis` (Ερωτήσεις), phone `tel:` link, CTA `#cta-header`. Under 760px: only logo + round phone button. Scroll progress bar `.hdr-progress`. |
| `Hero.astro` | `#hero` | H1 in two `.ln` lines for the mask reveal, `.hl` marigold swipe under "48 ώρες". CTA `#cta-hero`. Right: laptop + phone mockup with 3D tilt, live 48h countdown, rotating "από 490 €" badge. |
| `Marquee.astro` | – | two tilted bands, `aria-hidden`, plus `.sr` sentence for screen readers. |
| `Steps.astro` | `#vimata` | 3 cards with looping CSS illustrations, 0–48h timeline, the timer note `#timer-note` (must stay prominent), CTA `#cta-steps`. |
| `Showcase.astro` | `#deigmata` | 5 projects from a data array (below). Bento grid on desktop, horizontal scroll-snap carousel under 760px. CTA `#cta-showcase`. |
| `Included.astro` | `#paketo` | odometer price 490 €, two columns (Περιλαμβάνεται / Δεν περιλαμβάνεται), yearly cost bar `#yearly-cost`, CTA `#cta-included`. |
| `LeadForm.astro` | `#forma` | dark section; left copy, right form card (see §5). |
| `Faq.astro` | `#erotiseis` | native `<details>`/`<summary>`, first item open. Add FAQPage JSON-LD from the same data. |
| `Packages.astro` | `#megalytera` | 3 quiet cards linking to `#forma`, `data-package` attribute. Visually secondary. |
| `Footer.astro` | – | CTA `#cta-footer`, contact, privacy/cookies links, "Μέλος της οικογένειας sidebysideweb.gr" link, giant wordmark. |
| `StickyCta.astro` | – | mobile only (container < 760px), `position: sticky; bottom: 0` as the LAST child of `.ftx`; CTA `#cta-sticky` + phone `#tel-sticky`. Slides in after 180px of scroll. Hide it while `#forma` is in view (IntersectionObserver toggles `hidden` class). |

Showcase data (`src/data/projects.ts`):
```ts
[
 { id:'baroque', name:'Baroque le Bistrot', type:'ΕΣΤΙΑΣΗ', url:'https://baroquelebistrot.gr', size:'xl' },
 { id:'casa-enastron', name:'Casa Enastron', type:'ΒΙΛΑ', url:'https://casaenastron.gr' },
 { id:'al-anastasiou', name:'Al. Anastasiou', type:'ΚΟΥΦΩΜΑΤΑ ΑΛΟΥΜΙΝΙΟΥ', url:'https://al-anastasiou.gr' },
 { id:'kallitechnia', name:'Kallitechnia', type:'ΣΥΛΛΟΓΟΣ', url:'https://kallitechnia.gr' },
 { id:'moutaki', name:'Moutaki', type:'ΡΟΥΧΑ', url:'https://moutaki.com' },
]
```
Screenshots: the design uses faux page blocks (`.fx`) as placeholders. Replace each with a real **full-page** screenshot (1440px wide desktop, 390px wide mobile for the hero phone) in `src/assets/work/`, rendered with Astro `<Image>` (AVIF/WebP, lazy except the hero). Keep the `.screen` box and the hover effect: the image is taller than the box and translates up on hover (`.wk:hover img { transform: translateY(-38%) }`, 4s), and the hero screen auto-scrolls (`ftxPage` keyframes). Capture script suggestion: Playwright `page.screenshot({ fullPage: true })`.

### 4. Motion (all in ftx.css, keep it)
- Time-based: H1 line reveal, marigold swipe, hero rise, floating laptop/phone, timer pop + pulse, badge spin, button shine sweep, marquees, step illustrations, form shake on error, success check draw + bar burst.
- Scroll-driven (`animation-timeline: view() / scroll()` inside `@supports`): `.rv`, `.rv-l`, `.rv-s` reveals, timeline fill, odometer, header progress, sticky CTA entrance, footer wordmark.
- Add a tiny fallback for browsers without scroll-driven animations (Safari < 26, Firefox): an IntersectionObserver that adds `.in` to `.rv, .rv-l, .rv-s, .tl, .price` once, with matching transition-based CSS behind `@supports not (animation-timeline: view())`.
- Hero tilt: `pointermove` on `.hv` sets `--rx/--ry` on `.hv-stage` (see `onTilt` in Main.html), only for `(pointer: fine)`.
- Countdown: client script, starts at 48:00:00 and ticks every second; ring shows seconds. Purely decorative (`aria-hidden`).
- `prefers-reduced-motion: reduce` disables everything (already in the CSS). Animate only `transform`/`opacity` except the noted exceptions.

### 5. LeadForm (the conversion point)
Markup ids: form `#lead-form` (name `lead-form`), fields `#lead-name` (name `name`), `#lead-contact` (name `contact`), `#lead-business` (name `business`, optional), chips `[data-chip]`, submit `#lead-submit` (`data-cta="form-submit"`), error summary `#lead-error-summary`, field errors `#lead-name-error` / `#lead-contact-error`, success panel `#lead-success`, call link `#cta-book-call`, reset `#lead-reset`.

States on the root `data-state`: `idle` → `error` → `sending` → `success`.
- Validation on submit (no native browser bubbles, use `novalidate`): name required; contact must be an email (`/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`) or a phone (only `+ digits spaces ( ) . -` and ≥10 digits). After the first failed submit, re-validate live on input. Set `aria-invalid` and `aria-describedby`, move focus to the first invalid field, announce the summary with `role="alert"`.
- Error copy: «Γράψε το όνομά σου.» · «Γράψε ένα τηλέφωνο ή email για να σε βρούμε.» · «Αυτό δεν μοιάζει με τηλέφωνο ή email. Δες το ξανά.» · summary «Λείπει ένα στοιχείο…» / «Λείπουν δύο στοιχεία…».
- Valid fields show the marigold tick, the 3 progress dots in the card header fill per completed field.
- Submit: POST JSON to `/api/lead` (Astro endpoint with `export const prerender = false`, or a serverless function / Formspree, decide by hosting). Include a honeypot field `website` (visually hidden) and a 3s minimum time-on-form check. Button shows spinner + «Στέλνεται…» and is disabled.
- **Only after the server responds 2xx**: switch to `success` and push
  ```js
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'generate_lead', form_id: 'lead-form', lead_type: business ? 'with_business' : 'basic' });
  ```
  Never push name, phone or email to the dataLayer. On network/server error keep the data, show an inline error «Κάτι πήγε στραβά. Δοκίμασε ξανά ή πάρε μας τηλέφωνο.» with the phone link, and do not fire the event.
- Success panel: focus the heading, `role="status"`. Remove the `.gtm-flag` debug chip in production.
- GTM: load the container in the layout `<head>`/`<body>` (env `PUBLIC_GTM_ID`). In GTM, trigger = Custom Event `generate_lead` → GA4 event `generate_lead` + Google Ads conversion.
- Also push `{ event:'cta_click', cta_id: el.dataset.cta }` on click of any `[data-cta]` (one delegated listener) so we can see which CTA leads to the form.

### 6. SEO, performance, accessibility
- `<title>Κατασκευή ιστοσελίδας σε 48 ώρες, από 490 € | ftiaxesite.gr</title>`, meta description from the hero subtitle, canonical, OG image 1200×630 (build from the hero).
- JSON-LD: `LocalBusiness` (Περιστέρι), `Offer` 490 EUR, `FAQPage`.
- Lighthouse mobile ≥ 95 on all four. LCP is the H1 text: no hero image above it, preload the font. Ship ≤ 15 KB JS.
- Touch targets ≥ 44px, visible focus (`:focus-visible` marigold outline), contrast already checked in tokens.
- Smooth scroll to `#forma` with `scroll-margin-top` (already set), but respect reduced motion.

### 7. Placeholders to replace before launch (all marked `.ph` in the design)
- Phone `210 000 0000` and `tel:+302100000000` (header, FAQ, footer, sticky).
- Email `info@ftiaxesite.gr`.
- Street address in Peristeri (`Οδός 00`).
- Yearly domain + hosting amount `150 €` (2 places: Included, FAQ 01).
- Booking link for the 15-minute call `#book-call` (Calendly/Cal.com URL).
- `/privacy` and `/cookies` pages. Cookie consent (Consent Mode v2) before GTM marketing tags.
- Real screenshots for the 5 projects and the hero mockup.
- Remove the `.ph` styling once values are final.

### 8. Done when
- Desktop 1440 and mobile 390 match the canvas, including the sticky CTA on mobile.
- Empty submit shows the error state, valid submit shows success and exactly one `generate_lead` in the dataLayer (check with GTM Preview).
- Reduced motion shows a fully static, complete page.
