@.cursorrules @design-analysis.json

# Phase 1: Detailed Design Analysis

Project: **ftiaxesite/web**

I have design inputs under `design-source/` (HTML exports, screenshots, and/or notes from Figma).

Analyze **all** HTML files and produce a comprehensive `project-specification.json` in the project root that includes:

## 1. Page Inventory

For each HTML file in `design-source/`:

- Page name and route (match marketing URLs, not only folder names)
- Section breakdown (hero, grids, testimonials, CTA, etc.)
- Content classification: static vs WordPress-driven
- Interactive elements (menus, tabs, sliders, modals)

## 2. Component Architecture

Identify reusable UI in atomic design terms:

- **Atoms:** buttons, inputs, icons, images, badges
- **Molecules:** cards, form fields, nav links, list items
- **Organisms:** header, footer, hero, grids, forms
- **Templates:** page shells and shared layouts

## 3. WordPress Content Structure

### Custom Post Types

From repeating patterns (services, team, portfolio, FAQs), propose CPTs with supports and fields.

### ACF Field Groups

For each CPT and key template, define field groups (names, keys, types, validation).

### Menus

- Primary, footer, utility, mobile (if different)

## 4. Forms Configuration

For each detected form: fields, validation, spam strategy, notification targets, and whether submission is custom REST, WPForms, or other.

## 5. E-commerce Detection

If shop patterns exist: product model, archives, cart/checkout touchpoints, payment expectations.

## 6. Booking Detection

If booking patterns exist: services, durations, calendars, and integration approach (plugin vs custom).

## 7. Design Tokens

Extract colors, typography, spacing rhythm, and breakpoints from HTML/CSS references.

---

## Expected output

- `project-specification.json` committed at the project root next to `design-analysis.json`
- Short `SPEC-NOTES.md` only if you need human caveats (keep it brief)

Reference HTML explicitly, e.g. `@design-source/homepage/index.html`, for every major decision.
