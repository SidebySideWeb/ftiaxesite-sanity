---
name: Crafted Expertise
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  section-gap-desktop: 128px
  section-gap-mobile: 64px
  container-max-width: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is built on the persona of an **Approachable Expert**. It balances technical rigor with a welcoming, human-centric aesthetic. The goal is to evoke a sense of reliability and modern craftsmanship, distancing the product from generic "template-style" agencies.

The visual style is **Modern/Corporate with a High-End Editorial influence**. It prioritizes generous whitespace to allow content to breathe, conveying confidence through restraint. The interface uses a light-mode foundation with warm undertones to avoid a sterile, clinical feel, replacing sharp edges with soft, inviting geometry. 

Key design principles:
- **Crafted Precision:** Small details like micro-interactions and intentional alignment reflect the "Technical Craftsmanship" of the studio.
- **Warm Professionalism:** Using a warm-tinted neutral palette ensures the "Expert" persona remains "Approachable."
- **Clarity Over Urgency:** No aggressive marketing gimmicks. Information is presented with high legibility and a logical hierarchy.

## Colors

The color palette is anchored by a warm-white foundation. The primary **Confident Blue** serves as the functional driver—used for primary actions, links, and brand presence. The **Warm Amber** secondary color is used sparingly as an accent to highlight "moments of craft" or secondary call-to-actions, providing a sun-drenched contrast to the cool blue.

The neutral scale is strictly warm, utilizing an `#E7E5E4` border to create soft boundaries that feel organic rather than industrial. Text colors use a high-contrast charcoal for readability, ensuring the interface remains accessible for diverse business clients.

## Typography

Typography is the cornerstone of this design system, supporting both Greek and Latin scripts with equal weight. 

- **Sora (Headings):** Chosen for its geometric clarity and modern, tech-forward personality. It remains highly legible in Greek and provides the "Expert" voice.
- **Inter (Body):** Used for its systematic reliability. It ensures that complex technical information remains readable at small sizes.

For Greek text, avoid using "Italics" as they can often appear distorted in certain weights; prefer using font-weight shifts for emphasis. Maintain a generous line height (1.6x) for body text to improve the "Approachable" feel and reading stamina.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum container width of 1280px to maintain line-length readability. A 12-column grid is used for desktop, transitioning to a single column for mobile.

- **Vertical Rhythm:** Use multiples of 8px. Large sections should be separated by significant vertical gaps (128px on desktop) to emphasize the "Minimalist" and "Clean" brand values.
- **Whitespace:** Do not be afraid of "empty" space. It is a tool to signify premium quality.
- **Alignment:** Content should generally be left-aligned for readability, but "Request a quote" call-to-actions can be center-aligned to break the rhythm and signal a transition.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layering and Soft Ambient Shadows**. The background remains `#FAFAF9`, while primary content blocks sit on white `#FFFFFF` "Surface" cards.

- **Shadows:** Use extremely diffused shadows with a slight warm tint (e.g., `rgba(28, 25, 23, 0.05)`). Shadows should feel like a soft glow rather than a harsh drop.
- **Z-Index Strategy:** 
    - **Level 0 (Background):** `#FAFAF9`
    - **Level 1 (Surface):** White cards with a 1px border of `#E7E5E4`.
    - **Level 2 (Hover/Active):** Lifted state with a slightly more pronounced shadow (12px blur, 4px Y-offset).
- **Glassmorphism:** Use sparingly for navigation bars (backdrop-blur: 12px) to maintain context while scrolling through high-density imagery.

## Shapes

The design system uses **Pill-shaped (Level 3)** roundedness to emphasize the "Approachable" and "Modern" personality. 

- **Primary Cards:** Use a standard `rounded-xl` (1.5rem / 24px) to create a friendly, containerized look.
- **Buttons:** Use fully rounded (pill) shapes for primary actions to make them feel tactile and "clickable."
- **Small Elements:** Chips, tags, and input fields should follow the `rounded-lg` (1rem / 16px) convention.

## Components

### Buttons
- **Primary:** Pill-shaped, solid `#2563EB` with white text. High-contrast, no-nonsense.
- **Secondary:** Pill-shaped, solid `#F59E0B` with white text. Used exclusively for "Request a Quote" or secondary conversions.
- **Tertiary:** Transparent background with a `1px` border of `#E7E5E4`.

### Input Fields
Inputs use the Surface background (White) with a 1rem corner radius. The border should be `#E7E5E4`, changing to `#2563EB` (Primary) on focus with a soft outer glow.

### Cards
Cards are the primary vessel for service descriptions and portfolio items. They feature a white background, a 1.5rem corner radius, and a 1px soft border. Avoid heavy shadows; prefer a "flat lift" approach.

### Status Chips
Used to denote technologies (e.g., "Astro", "WordPress"). These should be small, capitalized labels with a light-gray background and `#57534E` text.

### Quote Request Section
A dedicated, high-contrast section. Unlike the rest of the site, this can use a dark background (`#1C1917`) with white text to signal a "Closing" or "Action" phase of the user journey.