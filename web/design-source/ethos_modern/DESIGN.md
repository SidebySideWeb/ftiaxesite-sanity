---
name: Ethos Modern
colors:
  surface: '#f9f9f7'
  surface-dim: '#dadad8'
  surface-bright: '#f9f9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f2'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e2e3e1'
  on-surface: '#1a1c1b'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#715a3e'
  on-secondary: '#ffffff'
  secondary-container: '#fdddb9'
  on-secondary-container: '#786044'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1c17'
  on-tertiary-container: '#86847e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#fdddb9'
  secondary-fixed-dim: '#e0c29f'
  on-secondary-fixed: '#281803'
  on-secondary-fixed-variant: '#584329'
  tertiary-fixed: '#e6e2db'
  tertiary-fixed-dim: '#cac6bf'
  on-tertiary-fixed: '#1c1c17'
  on-tertiary-fixed-variant: '#484742'
  background: '#f9f9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e1'
typography:
  display-lg:
    fontFamily: GFS Didot
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: GFS Didot
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: GFS Didot
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-sm:
    fontFamily: GFS Didot
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: GFS Didot
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: GFS Didot
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

This design system is built for high-end editorial, cultural institutions, and premium publishing platforms that require a sophisticated Hellenic aesthetic. The brand personality is authoritative yet graceful, bridging the gap between classical antiquity and contemporary digital refinement.

The design style follows a **Modern Minimalist** approach with **Neo-Classical** accents. It prioritizes vast white space (or deep tonal space in dark mode) to allow the intricate serif typography to breathe. The emotional response should be one of quiet confidence, intellectual rigor, and timeless elegance. All interface elements remain secondary to the content, acting as a refined gallery frame for text and imagery.

## Colors

The palette is rooted in an "Architectural Neutral" scheme. 
- **Primary:** A deep, near-black Onyx used for maximum legibility of the serif typeface and core structural elements.
- **Secondary:** A muted Gold-Leaf/Bronze tone used sparingly for accents, text links, and active states to evoke a sense of heritage.
- **Tertiary/Neutral:** A range of warm "Parchment" and "Stone" greys that provide a softer, more organic background than pure white, reducing eye strain for long-form reading.

Color application should be restrained. Use the secondary color only to draw attention to primary actions or meaningful highlights.

## Typography

The system utilizes **GFS Didot** as the cornerstone for all content-bearing text. This font honors the neoclassical tradition of Greek type design, offering exceptional elegance for both Latin and Greek scripts. 

- **Headlines:** Use GFS Didot with generous leading. For large display sizes, a slight negative letter-spacing enhances the "editorial" feel.
- **Body Text:** GFS Didot is maintained for body copy to ensure a consistent literary atmosphere. The line height is intentionally loose (1.5x - 1.6x) to preserve legibility of the delicate serifs.
- **Functional UI:** **Inter** is introduced as a secondary utilitarian typeface for labels, buttons, and micro-copy. This provides a necessary "modern" contrast to the serif headings and ensures clarity in dense functional areas. Labels should often use uppercase styling with tracking to distinguish them from narrative text.

## Layout & Spacing

The layout philosophy follows a **Fixed-Centered Grid** for desktop and a **Fluid Content Model** for mobile. 

- **Grid:** A 12-column grid is used for desktop (1280px max-width). In editorial views, content should ideally occupy the center 8 columns to optimize the reading measure (line length).
- **Rhythm:** An 8px base unit drives all spacing. For component-level spacing, use 16px (2x) and 24px (3x). For section-level breathing room, use 80px (10x) or 120px (15x).
- **Mobile:** Margins scale down to 20px. Vertical rhythm remains consistent with desktop to maintain the "luxury" of space.

## Elevation & Depth

To maintain the minimalist and elegant aesthetic, this design system avoids heavy shadows. 

1.  **Tonal Layering:** Depth is primarily conveyed through subtle shifts in background color (e.g., a Parchment container on a Stone background).
2.  **Hairline Outlines:** Use 1px borders in a low-contrast neutral (10-15% opacity primary color) to define cards and input fields.
3.  **Soft Ambient Shadows:** For floating elements like menus or modals, use a "Whisper Shadow"—a very large blur (32px+) with extremely low opacity (4-6%), tinted with the primary color to avoid a "dirty" grey look.

## Shapes

The shape language is **Rounded**, providing a soft, approachable counterpoint to the sharp, high-contrast serifs of the typography.

- **Standard Elements:** Buttons, input fields, and chips use a 0.5rem (8px) corner radius.
- **Large Containers:** Cards and modals use 1rem (16px) to emphasize a "contained" and friendly feel.
- **Media:** Images should follow the container roundedness (rounded-lg) to feel integrated into the UI.

## Components

- **Buttons:** Primary buttons use a solid Primary Color fill with Inter (Label-MD) text in Neutral. Secondary buttons use a Hairline Outline. The 8px roundedness is mandatory.
- **Input Fields:** Use a subtle Parchment fill with a bottom-only border or a full light outline. Focus states should transition the border color to the Secondary (Bronze) tone.
- **Chips/Tags:** Small, pill-shaped or rounded-sm elements using the Tertiary color as a background with Label-SM typography.
- **Cards:** Low-elevation cards with a 1px neutral border and 16px (rounded-lg) corners. Use generous internal padding (24px or 32px) to maintain the editorial feel.
- **Lists:** Use simple dividers (1px hairline) with ample vertical padding (16px+). Avoid icons unless they are strictly functional, using thin-stroke (1px) weights.
- **Navigation:** Top-level navigation uses Inter (Label-MD) with increased letter spacing. Active states are indicated by a small Bronze dot or a subtle underline.