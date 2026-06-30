@.cursorrules @project-specification.json

# Phase 7: SEO & Performance

Project: **ftiaxesite/web**

## SEO

- Centralize `<head>` metadata (title, description, canonical, Open Graph, Twitter)
- Pull per-route SEO from WordPress/Rank Math when available; fall back to sane defaults
- Add structured data only when the schema matches real page content (Organization, Article, Service, Product)

## Performance

- Prefer static generation; lazy-load non-critical media
- Audit bundle weight—avoid unnecessary islands
- Run `npm run build` + `npm run preview` and capture Lighthouse scores

## Targets

- Performance ≥ 90 (adjust if heavy media is unavoidable—document why)
- Accessibility ≥ 95
- SEO ≥ 95

## Expected output

- Updated layout/SEO componentry
- Notes in `SEO-AUDIT.md` with before/after metrics and remaining risks
